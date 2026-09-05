#!/usr/bin/env node
/**
 * ⑤ 色で写真を探す — 実画像のピクセルから色の分布を抽出して
 * app/photo-palette.js を生成する。
 *
 * なぜ photo-colors.js を使わないか:
 *   あちらはアンビエント表示用に彩度 ≤.65 / 明度 .30-.52 へ正規化した「1色」で、
 *   白い雪も黒い夜景も中間の明度に潰れる。色検索の根拠には使えない。
 *
 * 入力: images-dist/{id}_w300.webp (ローカル生成済みの派生サイズ)
 *       無ければ原本庫 manifest.json 経由の元ファイル。
 *       ブラウザやCDNから全画像を取り直すことはしない。
 * 出力: app/photo-palette.js (コミット対象)
 *       { id: { b: {bucket: share, ...}, c: ["rrggbb", ...] } }
 *       b = 11色バケットの占有率 (0-1, 4%未満は捨てる)
 *       c = 代表色 上位3つ (UIの見本用。検索判定には b を使う)
 *
 * キャッシュ: scripts/.palette-cache.json に id → {mtime,size,v,...} を保存。
 *   写真ID・元画像の更新時刻/サイズ・アルゴリズム版が一致すれば再解析しない。
 *   新規は追加、差し替えは再計算、data.js から消えた写真は出力から除外する。
 *
 * 使い方: node scripts/generate-photo-palette.mjs [--force]
 *   upload.mjs が写真追加時に自動実行するので、通常は手で叩く必要はない。
 */
import sharp from "sharp";
import { existsSync, readFileSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import { PREFECTURES } from "../app/data.js";

const ALGO_VERSION = 2;          // 判定ルールを変えたら上げる → 全件再計算される
const DIST = "images-dist";
const ORIGINALS = "C:/Users/3jmcn/Pictures/cloudinary-originals";
const OUT = path.resolve("app", "photo-palette.js");
const CACHE = path.resolve("scripts", ".palette-cache.json");
const SAMPLE = 56;               // 解析用に縮小する一辺 (色の分布が残る程度)
const MIN_SHARE = 0.04;          // これ未満のバケットは捨てる (赤い点1つで「赤」にしない)
const CONCURRENCY = 6;

/* ---- 色の分類 ---------------------------------------------------------- */
/* 11色。色相だけで決めず、彩度と明度を先に見る。
   これをしないと「灰色が青に寄る」「暗部が全部黒の上位を占める」が起きる。 */
export function classify(r, g, b) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  h *= 360;

  /* 無彩色を先に確定させる。色相で先に振ると、
     わずかに青被りした雪が blue、夜景の暖色ノイズが brown に流れる。 */
  if (l <= 0.16) return "black";                 // 夜景の影。0.10 では暗部を拾いきれなかった
  if (l >= 0.80 && s <= 0.25) return "white";    // 曇天の雪。0.90/0.18 では雪が blue/gray になった
  if (s <= 0.14) return "gray";
  // 茶: 橙〜赤の色相で、暗く かつ ある程度色が乗っているもの。
  // 彩度の下限を入れないと、夜景の街灯まで茶に吸われる。
  if (h < 45 && l < 0.42 && s >= 0.28) return "brown";
  if (h < 15 || h >= 345) return "red";
  if (h < 45) return "orange";
  if (h < 70) return "yellow";
  if (h < 175) return "green";                   // 青緑の海は green 側に寄せ、blue の一極集中を緩める
  if (h < 255) return "blue";
  if (h < 290) return "purple";
  return "pink";
}

/* ---- 1枚を解析 --------------------------------------------------------- */
async function analyse(file) {
  const { data, info } = await sharp(file)
    .resize(SAMPLE, SAMPLE, { fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const counts = {};
  const swatch = new Map();          // 代表色: 粗く量子化した色 → 出現数
  const px = info.width * info.height;
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const k = classify(r, g, b);
    counts[k] = (counts[k] || 0) + 1;
    const q = `${r >> 5}_${g >> 5}_${b >> 5}`;
    const cur = swatch.get(q) || { n: 0, r: 0, g: 0, b: 0 };
    cur.n++; cur.r += r; cur.g += g; cur.b += b;
    swatch.set(q, cur);
  }

  const buckets = {};
  for (const [k, n] of Object.entries(counts)) {
    const share = n / px;
    if (share >= MIN_SHARE) buckets[k] = Math.round(share * 100) / 100;
  }
  // すべて閾値未満なら最大のものだけ残す (色なしの写真を作らない)
  if (Object.keys(buckets).length === 0) {
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    if (top) buckets[top[0]] = Math.round((top[1] / px) * 100) / 100;
  }

  const rep = [...swatch.values()]
    .sort((a, b) => b.n - a.n)
    .slice(0, 3)
    .map((c) => {
      const hex = (v) => Math.round(v / c.n).toString(16).padStart(2, "0");
      return hex(c.r) + hex(c.g) + hex(c.b);
    });

  return { b: buckets, c: rep };
}

/* ---- 入力ファイルの解決 ------------------------------------------------- */
let manifest = null;
function sourceFor(id) {
  const derived = path.join(DIST, `${id}_w300.webp`);
  if (existsSync(derived)) return derived;
  if (manifest === null) {
    const mp = path.join(ORIGINALS, "manifest.json");
    manifest = existsSync(mp) ? JSON.parse(readFileSync(mp, "utf-8")) : [];
  }
  const e = (Array.isArray(manifest) ? manifest : []).find((x) => x.public_id === id);
  if (!e) return null;
  const orig = path.join(ORIGINALS, `${id}.${e.format || "jpg"}`);
  return existsSync(orig) ? orig : null;
}

/* ---- main -------------------------------------------------------------- */
const force = process.argv.includes("--force");
const ids = [...new Set(PREFECTURES.flatMap((pf) => pf.photos.map((p) => p.id)))];
const cache = !force && existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, "utf-8")) : {};

let reused = 0, computed = 0, missing = 0;
const failed = [];
const result = {};

async function work(id) {
  const src = sourceFor(id);
  if (!src) { missing++; failed.push(id); return; }          // 未解析として記録。色は捏造しない
  const st = statSync(src);
  const hit = cache[id];
  if (hit && hit.v === ALGO_VERSION && hit.mtime === st.mtimeMs && hit.size === st.size) {
    result[id] = { b: hit.b, c: hit.c };
    reused++;
    return;
  }
  try {
    const r = await analyse(src);
    result[id] = r;
    cache[id] = { v: ALGO_VERSION, mtime: st.mtimeMs, size: st.size, b: r.b, c: r.c };
    computed++;
  } catch (e) {
    missing++; failed.push(id);
  }
}

const queue = [...ids];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const id = queue.shift();
      await work(id);
      if ((computed + reused) % 100 === 0) process.stdout.write(`  ${computed + reused}/${ids.length}\r`);
    }
  })
);

// data.js から消えた写真はキャッシュからも掃除する
for (const k of Object.keys(cache)) if (!ids.includes(k)) delete cache[k];
writeFileSync(CACHE, JSON.stringify(cache));

const lines = Object.keys(result)
  .sort()
  .map((id) => `"${id}":${JSON.stringify(result[id])}`)
  .join(",\n");

writeFileSync(
  OUT,
  `// 自動生成: node scripts/generate-photo-palette.mjs (編集禁止)\n` +
  `// 色検索用。b = 色バケットの占有率, c = 代表色(表示用)。algo v${ALGO_VERSION}\n` +
  `export const PHOTO_PALETTE = {\n${lines}\n};\n` +
  `export const PALETTE_COLORS = ["red","orange","yellow","green","blue","purple","pink","brown","white","gray","black"];\n`,
  "utf-8"
);

const bytes = statSync(OUT).size;
console.log(`\n[palette] 対象 ${ids.length} 枚 / 解析 ${computed} / キャッシュ再利用 ${reused} / 未解析 ${missing}`);
if (failed.length) console.log(`  未解析: ${failed.slice(0, 5).join(", ")}${failed.length > 5 ? ` ほか${failed.length - 5}件` : ""}`);
console.log(`  出力 app/photo-palette.js  ${(bytes / 1024).toFixed(1)} KB`);
