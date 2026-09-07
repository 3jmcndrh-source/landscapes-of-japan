#!/usr/bin/env node
/**
 * ⑦ 画像の内容から探すためのデータを作る。
 *
 *   node scripts/generate-photo-vectors.mjs [--force]
 *
 * 使うモデル: Xenova/clip-vit-base-patch32 (量子化 ONNX)
 *   - 動くのは「このPCのビルド時」だけ。閲覧者のブラウザには載せない。
 *   - モデルは .model-cache/ に約85MB。gitignore し、配信物にも含めない。
 *   - 外部の生成AIサービスへ画像や利用者の入力を送らない
 *     (初回だけ Hugging Face からモデル本体を取得する)。
 *   - 費用は発生しない。
 *
 * 画像側は CLIPVisionModelWithProjection、文章側は CLIPTextModelWithProjection を
 * 使う。どちらも 512次元の同じ空間に投影されるので、写真どうしの近さと
 * 写真と概念文の近さを同じ尺度で測れる。
 * (pipeline("image-feature-extraction") の平均プーリングは投影前の別空間なので使わない)
 *
 * 出力 (どちらもコミット対象。閲覧時はこれだけを読む):
 *   app/photo-similar.js   写真ごとの「似た写真」上位。ビルド時に確定させるので
 *                          閲覧時の計算もモデル読み込みも要らない。
 *   app/photo-concepts.js  写真ごとの概念スコア。自然文検索はこれで並べる。
 *
 * 版の管理:
 *   MODEL_VERSION を上げると全件再計算。写真の差し替えは
 *   images-dist の更新時刻とサイズで検出するので、追加分だけを解析する。
 */
import { existsSync, writeFileSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import {
  env, AutoTokenizer, AutoProcessor, RawImage,
  CLIPTextModelWithProjection, CLIPVisionModelWithProjection,
} from "@xenova/transformers";
import { PREFECTURES } from "../app/data.js";
import { CONCEPTS } from "../app/concepts.js";

const MODEL = "Xenova/clip-vit-base-patch32";
const MODEL_VERSION = "clip-b32-proj-1";
const DIST = "images-dist";
const OUT_SIM = path.resolve("app", "photo-similar.js");
const OUT_CON = path.resolve("app", "photo-concepts.js");
const CACHE = path.resolve("scripts", ".vector-cache.json");
const TOP_N = 12;              /* 保存する類似写真の数 (画面では6枚使う) */
const PER_LOC_CAP = 2;         /* 同じ撮影地からは最大2枚 */
const MIN_SIM = 0.70;          /* これ未満は「似ている」と呼ばない */
const BATCH = 8;
const force = process.argv.includes("--force");

env.cacheDir = "./.model-cache";

const photos = PREFECTURES.flatMap((pf) => pf.photos.map((p) => ({ ...p, pref: pf.pref })));
const ids = photos.map((p) => p.id);
const locOf = Object.fromEntries(photos.map((p) => [p.id, p.loc || ""]));

const srcFor = (id) => {
  for (const w of [300, 600]) {
    const f = path.join(DIST, `${id}_w${w}.webp`);
    if (existsSync(f)) return f;
  }
  return null;
};

const norm = (arr) => {
  let s = 0;
  for (const x of arr) s += x * x;
  const n = Math.sqrt(s) || 1;
  return arr.map((x) => x / n);
};
const dot = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; };

/* ---- キャッシュ (追加分だけ解析するため) ---- */
let cache = {};
if (!force && existsSync(CACHE)) {
  try { cache = JSON.parse(readFileSync(CACHE, "utf-8")); } catch { cache = {}; }
}
if (cache.__version !== MODEL_VERSION) {
  if (Object.keys(cache).length) console.log("[vectors] モデル版が変わったので全件再計算します");
  cache = { __version: MODEL_VERSION };
}

console.log(`[vectors] モデル読み込み中 (${MODEL})…`);
const t0 = Date.now();
const processor = await AutoProcessor.from_pretrained(MODEL);
const vision = await CLIPVisionModelWithProjection.from_pretrained(MODEL, { quantized: true });
console.log(`[vectors] 読み込み ${((Date.now() - t0) / 1000).toFixed(1)}秒`);

/* ---- 1. 画像の特徴 ---- */
const vecs = {};
const todo = [];
const missing = [];
let reused = 0;
for (const id of ids) {
  const src = srcFor(id);
  if (!src) { missing.push(id); continue; }
  const st = statSync(src);
  const stamp = `${st.mtimeMs}:${st.size}`;
  const hit = cache[id];
  if (hit && hit.s === stamp && Array.isArray(hit.v)) { vecs[id] = hit.v; reused++; continue; }
  todo.push({ id, src, stamp });
}
console.log(`[vectors] 解析対象 ${todo.length} 枚 / 再利用 ${reused} 枚 / 画像なし ${missing.length} 枚`);

const t1 = Date.now();
for (let i = 0; i < todo.length; i += BATCH) {
  const chunk = todo.slice(i, i + BATCH);
  try {
    const imgs = await Promise.all(chunk.map((c) => RawImage.read(c.src)));
    const out = await vision(await processor(imgs));
    const [n, d] = out.image_embeds.dims;
    for (let k = 0; k < n; k++) {
      const raw = Array.from(out.image_embeds.data.slice(k * d, (k + 1) * d));
      /* 小数4桁で十分。ファイルを不必要に太らせない */
      const v = norm(raw).map((x) => Math.round(x * 1e4) / 1e4);
      vecs[chunk[k].id] = v;
      cache[chunk[k].id] = { s: chunk[k].stamp, v };
    }
  } catch (e) {
    /* 1枚が壊れていても全体を止めない。落ちた分は missing に記録する */
    for (const c of chunk) missing.push(c.id);
    console.warn(`  ! ${chunk.map((c) => c.id).join(",")}: ${String(e.message).slice(0, 70)}`);
  }
  if ((i / BATCH) % 10 === 0) process.stdout.write(`  ${Math.min(i + BATCH, todo.length)}/${todo.length}\r`);
}
if (todo.length) console.log(`\n[vectors] 画像解析 ${((Date.now() - t1) / 1000).toFixed(1)}秒`);

/* 掲載をやめた写真をキャッシュから掃除する */
for (const k of Object.keys(cache)) if (k !== "__version" && !ids.includes(k)) delete cache[k];
writeFileSync(CACHE, JSON.stringify(cache));

const withVec = Object.keys(vecs).sort();
if (!withVec.length) {
  console.error("[vectors] 特徴が1件も作れませんでした。出力は更新しません");
  process.exit(1);
}

/* ---- 2. 似た写真 ---- */
const similar = {};
for (const id of withVec) {
  const v = vecs[id];
  const scored = [];
  for (const other of withVec) {
    if (other === id) continue;                       /* 自分自身は出さない */
    const sc = dot(v, vecs[other]);
    if (sc >= MIN_SIM) scored.push([other, sc]);
  }
  scored.sort((a, b) => b[1] - a[1]);
  /* 同じ撮影地ばかりにならないよう、上限を段階的に緩めながら選ぶ */
  const picked = [];
  const seen = new Set();
  const count = new Map();
  for (const cap of [PER_LOC_CAP, PER_LOC_CAP + 2, Infinity]) {
    for (const [oid, sc] of scored) {
      if (picked.length >= TOP_N) break;
      if (seen.has(oid)) continue;
      const l = locOf[oid] || "?";
      const n = count.get(l) || 0;
      if (n >= cap) continue;
      picked.push([oid, Math.round(sc * 1000) / 1000]);
      seen.add(oid);
      count.set(l, n + 1);
    }
    if (picked.length >= TOP_N) break;
  }
  if (picked.length) similar[id] = picked;
}

/* ---- 3. 概念スコア ---- */
console.log(`[vectors] 概念 ${CONCEPTS.length} 件の文章特徴を計算中…`);
const tokenizer = await AutoTokenizer.from_pretrained(MODEL);
const text = await CLIPTextModelWithProjection.from_pretrained(MODEL, { quantized: true });
const tOut = await text(await tokenizer(CONCEPTS.map((c) => c.prompt), { padding: true, truncation: true }));
const [, td] = tOut.text_embeds.dims;
const conceptVecs = CONCEPTS.map((c, i) =>
  norm(Array.from(tOut.text_embeds.data.slice(i * td, (i + 1) * td)))
);

const concepts = {};
for (const id of withVec) {
  const v = vecs[id];
  const row = {};
  CONCEPTS.forEach((c, i) => { row[c.key] = Math.round(dot(v, conceptVecs[i]) * 1e4) / 1e4; });
  concepts[id] = row;
}

/* ---- 出力 ---- */
const simIds = Object.keys(similar).sort();
writeFileSync(
  OUT_SIM,
  `// 自動生成: node scripts/generate-photo-vectors.mjs (手で編集しない)\n` +
  `// ⑦ 画像の特徴から求めた「似た写真」。ビルド時に確定させているので、\n` +
  `// 閲覧時にモデルを読み込む必要はない。自分自身は除外済み。\n` +
  `// 同じ撮影地からは最大${PER_LOC_CAP}枚 (候補が少ないときだけ緩める)。類似度 ${MIN_SIM} 未満は入れない。\n` +
  `// モデル: ${MODEL} (${MODEL_VERSION})\n` +
  `export const PHOTO_SIMILAR = {\n` +
  simIds.map((id) => `"${id}":${JSON.stringify(similar[id])}`).join(",\n") +
  `\n};\n` +
  `export const SIMILAR_MODEL = ${JSON.stringify(MODEL_VERSION)};\n`,
  "utf-8"
);

/* 概念ごとのしきい値。
   CLIP の類似度は概念によって水準が違うので、固定値では比べられない。
   その概念の「全写真での平均 + 1.6σ」を境にする。よく写っている概念は多く、
   ほとんど写っていない概念は少なく残る。K は実データで検証して決めた
   (桜 69枚/目視精査72枚、鳥 77/73、動物 74/69、城 51/29)。 */
const THRESH_K = 1.6;
const thresholds = {};
CONCEPTS.forEach((c, i) => {
  const v = withVec.map((id) => concepts[id][c.key]);
  const m = v.reduce((a, b) => a + b, 0) / v.length;
  const sd = Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / v.length);
  thresholds[c.key] = Math.round((m + THRESH_K * sd) * 1e4) / 1e4;
});

const conIds = Object.keys(concepts).sort();
writeFileSync(
  OUT_CON,
  `// 自動生成: node scripts/generate-photo-vectors.mjs (手で編集しない)\n` +
  `// ⑦ 写真と概念の近さ。値は画像特徴と概念文の類似度で、タグの部分一致ではない。\n` +
  `// 概念語と各言語の表示名は app/concepts.js。\n` +
  `// CONCEPT_THRESHOLD は「その概念に当てはまる」と扱う下限 (平均 + ${THRESH_K}σ)。\n` +
  `// モデル: ${MODEL} (${MODEL_VERSION})\n` +
  `export const CONCEPT_KEYS = ${JSON.stringify(CONCEPTS.map((c) => c.key))};\n` +
  `export const CONCEPT_THRESHOLD = ${JSON.stringify(thresholds)};\n` +
  `export const PHOTO_CONCEPTS = {\n` +
  conIds.map((id) => `"${id}":[${CONCEPTS.map((c) => concepts[id][c.key]).join(",")}]`).join(",\n") +
  `\n};\n` +
  `export const CONCEPT_MODEL = ${JSON.stringify(MODEL_VERSION)};\n`,
  "utf-8"
);

console.log(`[vectors] 似た写真 ${simIds.length} 件 / 概念スコア ${conIds.length} 件`);
console.log(`  app/photo-similar.js  ${(statSync(OUT_SIM).size / 1024).toFixed(0)} KB`);
console.log(`  app/photo-concepts.js ${(statSync(OUT_CON).size / 1024).toFixed(0)} KB`);
if (missing.length) console.log(`  特徴を作れなかった写真 ${missing.length} 件: ${missing.slice(0, 5).join(",")}`);
const noSim = withVec.filter((id) => !similar[id]);
if (noSim.length) console.log(`  似た写真が ${MIN_SIM} 以上で見つからなかった写真 ${noSim.length} 件`);
