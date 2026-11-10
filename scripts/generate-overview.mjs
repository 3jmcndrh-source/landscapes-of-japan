#!/usr/bin/env node
/**
 * 俯瞰ビュー (/overview) のデータを作る。
 *
 *   node scripts/generate-overview.mjs
 *
 * 出力 (どちらもコミット対象。ビルドチェーン外で、upload.mjs が写真追加時に作り直す):
 *   public/overview/atlas.webp … 全写真の小さな正方形サムネイルを1枚に敷き詰めた画像。
 *       930枚を1回の通信で描くため (1枚ずつ取ると 930リクエストになる)。
 *   public/overview/data.json  … 並べ替えに使う写真ごとの値。
 *       撮影地の座標 / 撮影月 / 色 (色相・明るさ) / 見た目の近さを2次元にした位置。
 *
 * 入力:
 *   images-dist/{id}_w300.webp        (サムネイルの元。ローカルにだけある)
 *   app/photo-months.js / photo-palette.js / loc-points.js (コミット済み生成物)
 *   public/search-vectors.bin + app/vector-meta.js (画像の特徴ベクトル。コミット済み)
 *
 * 「見た目の近さ」は、画像特徴 (CLIP, 512次元) を t-SNE で2次元に落としたもの。
 * 近い写真どうしが近くに来る。座標そのものに意味は無い (上下左右は任意)。
 * 乱数の種を固定しているので、同じ入力なら同じ配置になる。
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { PREFECTURES } from "../app/data.js";
import { PHOTO_MONTHS } from "../app/photo-months.js";
import { PHOTO_PALETTE } from "../app/photo-palette.js";
import { LOC_POINTS } from "../app/loc-points.js";
import { VECTOR_IDS, VECTOR_DIM, VECTOR_SCALE, VECTOR_VERSION } from "../app/vector-meta.js";
import { hexToOklch } from "./generate-photo-lite.mjs";

const DIST = "images-dist";
const OUT_DIR = path.join("public", "overview");
const CELL = 56;          /* 1枚の大きさ (px)。画面では 15〜60px 程度で描く。拡大したときは w300 を別に読む */
mkdirSync(OUT_DIR, { recursive: true });

const photos = PREFECTURES.flatMap((pf) => pf.photos.map((p) => ({ id: p.id, loc: p.loc || "", pref: pf.pref, lat: pf.lat, lng: pf.lng })));
const n = photos.length;
const COLS = Math.ceil(Math.sqrt(n));
const ROWS = Math.ceil(n / COLS);

/* ---- 1. サムネイルを敷き詰める ---- */
const tiles = [];
let missing = 0;
for (let i = 0; i < n; i++) {
  const f = path.join(DIST, `${photos[i].id}_w300.webp`);
  if (!existsSync(f)) { missing++; continue; }   /* 無いものは下地の色のまま */
  const input = await sharp(f).resize(CELL, CELL, { fit: "cover" }).toBuffer();
  tiles.push({ input, left: (i % COLS) * CELL, top: Math.floor(i / COLS) * CELL });
}
await sharp({ create: { width: COLS * CELL, height: ROWS * CELL, channels: 3, background: "#1a1a1a" } })
  .composite(tiles).webp({ quality: 68 }).toFile(path.join(OUT_DIR, "atlas.webp"));

/* ---- 2. 撮影地の座標 (写真ごとではなく撮影地ごと。無ければ都道府県の座標) ---- */
const locNames = [...new Set(photos.map((p) => p.loc || `@${p.pref}`))];
const locs = locNames.map((name) => {
  const pt = LOC_POINTS[name];
  if (pt) return { n: name, lat: +pt.lat.toFixed(3), lng: +pt.lng.toFixed(3) };
  const p = photos.find((x) => (x.loc || `@${x.pref}`) === name);
  return { n: name.startsWith("@") ? "" : name, lat: +p.lat.toFixed(3), lng: +p.lng.toFixed(3) };
});
const li = photos.map((p) => locNames.indexOf(p.loc || `@${p.pref}`));

/* ---- 3. 撮影月・色 ---- */
const month = photos.map((p) => PHOTO_MONTHS[p.id] || 0);
const hue = [], light = [];
for (const p of photos) {
  const reps = PHOTO_PALETTE[p.id]?.c || [];
  let best = null;
  reps.slice(0, 3).forEach((hex, i) => {
    const c = hexToOklch(hex);
    if (c.C < 0.035 || c.L < 0.18) return;
    const score = c.C * [1, 0.8, 0.6][i];
    if (!best || score > best.score) best = { score, ...c };
  });
  const first = reps[0] ? hexToOklch(reps[0]) : { L: 0.5 };
  hue.push(best ? Math.round(best.H) % 360 : -1);          /* -1 = 無彩色 (雪・霧・夜景など) */
  light.push(Math.round((best ? best.L : first.L) * 100));
}

/* ---- 4. 見た目の近さ → 2次元 (t-SNE) ---- */
/* 特徴ベクトルの出どころは2つ。
     1. scripts/.vector-cache.json … generate-photo-vectors.mjs の作業用キャッシュ (ローカルのみ)。
        写真を追加した直後でも全写真ぶん入っている。
     2. public/search-vectors.bin  … 公開している検索用データ (コミット済み)。
   1 があればそちらを優先し、無い写真だけ 2 で補う。どちらにも無い写真は中央に置く。 */
const bin = readFileSync(path.join("public", "search-vectors.bin"));
const vecIndex = new Map(VECTOR_IDS.map((id, i) => [id, i]));
let cache = {};
const cachePath = path.join("scripts", ".vector-cache.json");
if (existsSync(cachePath)) {
  try {
    const c = JSON.parse(readFileSync(cachePath, "utf-8"));
    if (c.__version === VECTOR_VERSION) cache = c;
  } catch { /* 読めなければ公開データだけで作る */ }
}
const unit = (v) => {
  let s = 0;
  for (let d = 0; d < v.length; d++) s += v[d] * v[d];
  s = Math.sqrt(s) || 1;
  for (let d = 0; d < v.length; d++) v[d] /= s;
  return v;
};
const X = photos.map((p) => {
  const c = cache[p.id]?.v;
  if (Array.isArray(c) && c.length === VECTOR_DIM) return unit(Float32Array.from(c));
  const k = vecIndex.get(p.id);
  if (k === undefined) return null;
  const v = new Float32Array(VECTOR_DIM);
  for (let d = 0; d < VECTOR_DIM; d++) v[d] = bin.readInt8(k * VECTOR_DIM + d) / VECTOR_SCALE;
  return unit(v);
});
const noVec = X.filter((v) => !v).length;
const have = X.map((v, i) => (v ? i : -1)).filter((i) => i >= 0);

function tsne(V, { perplexity = 30, iters = 700, seed = 20261110 } = {}) {
  const m = V.length;
  let a = seed >>> 0;
  const rnd = () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const gauss = () => Math.sqrt(-2 * Math.log(rnd() + 1e-12)) * Math.cos(2 * Math.PI * rnd());
  /* 距離の2乗 (正規化済みなので 2 - 2·内積) */
  const D = new Float32Array(m * m);
  for (let i = 0; i < m; i++) for (let j = i + 1; j < m; j++) {
    let dot = 0; const p = V[i], q = V[j];
    for (let d = 0; d < p.length; d++) dot += p[d] * q[d];
    D[i * m + j] = D[j * m + i] = Math.max(0, 2 - 2 * dot);
  }
  /* 各点の近傍の広さを perplexity に合わせる */
  const P = new Float32Array(m * m);
  const target = Math.log(perplexity);
  for (let i = 0; i < m; i++) {
    let lo = 0, hi = Infinity, beta = 20;
    for (let it = 0; it < 50; it++) {
      let sum = 0, h = 0;
      for (let j = 0; j < m; j++) { if (j === i) continue; const pj = Math.exp(-D[i * m + j] * beta); P[i * m + j] = pj; sum += pj; }
      sum = sum || 1e-12;
      for (let j = 0; j < m; j++) { if (j === i) continue; const pj = P[i * m + j] / sum; P[i * m + j] = pj; if (pj > 1e-12) h -= pj * Math.log(pj); }
      if (Math.abs(h - target) < 1e-4) break;
      if (h > target) { lo = beta; beta = hi === Infinity ? beta * 2 : (beta + hi) / 2; }
      else { hi = beta; beta = (beta + lo) / 2; }
    }
  }
  for (let i = 0; i < m; i++) for (let j = i + 1; j < m; j++) {
    const v = (P[i * m + j] + P[j * m + i]) / (2 * m);
    P[i * m + j] = P[j * m + i] = Math.max(v, 1e-12);
  }
  const Y = new Float64Array(m * 2), U = new Float64Array(m * 2), G = new Float64Array(m * 2).fill(1), dY = new Float64Array(m * 2);
  for (let i = 0; i < m * 2; i++) Y[i] = gauss() * 1e-4;
  const Q = new Float64Array(m * m);
  for (let it = 0; it < iters; it++) {
    const ex = it < 120 ? 4 : 1, mom = it < 250 ? 0.5 : 0.8;
    let qs = 0;
    for (let i = 0; i < m; i++) for (let j = i + 1; j < m; j++) {
      const dx = Y[i * 2] - Y[j * 2], dy = Y[i * 2 + 1] - Y[j * 2 + 1];
      const q = 1 / (1 + dx * dx + dy * dy);
      Q[i * m + j] = Q[j * m + i] = q; qs += 2 * q;
    }
    dY.fill(0);
    for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) {
      if (i === j) continue;
      const q = Q[i * m + j];
      const mult = (ex * P[i * m + j] - q / qs) * q;
      dY[i * 2] += 4 * mult * (Y[i * 2] - Y[j * 2]);
      dY[i * 2 + 1] += 4 * mult * (Y[i * 2 + 1] - Y[j * 2 + 1]);
    }
    for (let k = 0; k < m * 2; k++) {
      G[k] = Math.sign(dY[k]) === Math.sign(U[k]) ? Math.max(0.01, G[k] * 0.8) : G[k] + 0.2;
      U[k] = mom * U[k] - 200 * G[k] * dY[k];
      Y[k] += U[k];
    }
  }
  return Y;
}

const t0 = Date.now();
const Y = tsne(have.map((i) => X[i]));
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
for (let k = 0; k < have.length; k++) {
  minX = Math.min(minX, Y[k * 2]); maxX = Math.max(maxX, Y[k * 2]);
  minY = Math.min(minY, Y[k * 2 + 1]); maxY = Math.max(maxY, Y[k * 2 + 1]);
}
const ex = new Array(n).fill(500), ey = new Array(n).fill(500);   /* 特徴が無い写真は中央 */
have.forEach((i, k) => {
  ex[i] = Math.round(((Y[k * 2] - minX) / (maxX - minX || 1)) * 999);
  ey[i] = Math.round(((Y[k * 2 + 1] - minY) / (maxY - minY || 1)) * 999);
});

/* ---- 5. 書き出し ---- */
let sig = 5381;
for (const p of photos) for (let i = 0; i < p.id.length; i++) sig = ((sig << 5) + sig + p.id.charCodeAt(i)) >>> 0;
const data = {
  v: sig.toString(36) + "." + n + "." + VECTOR_VERSION,   /* atlas の取り直し判定にも使う */
  cell: CELL, cols: COLS,
  ids: photos.map((p) => p.id),
  locs, li, month, hue, light, ex, ey,
};
writeFileSync(path.join(OUT_DIR, "data.json"), JSON.stringify(data));
console.log(`overview: ${n}枚 / atlas ${COLS}x${ROWS} (${COLS * CELL}x${ROWS * CELL}px) / 撮影地 ${locs.length} / t-SNE ${((Date.now() - t0) / 1000).toFixed(1)}s` +
  (missing ? ` ! サムネイル無し ${missing}` : "") + (noVec ? ` ! 特徴ベクトル無し ${noVec}` : ""));
