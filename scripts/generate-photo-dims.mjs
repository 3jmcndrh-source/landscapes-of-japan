#!/usr/bin/env node
/**
 * ⑧ 実画像の寸法 → app/photo-dims.js
 *
 * 用途:
 *   ① 横写真・縦写真・正方形 の絞り込み
 *   ④ img の width/height (縦横比) を明示してレイアウトのずれを防ぐ
 *   ③ 等倍表示の基準 (配信画像の実寸)
 *
 * 入力の優先順:
 *   1. 原本庫の manifest.json (public_id / w / h) — 再解析なしで取れる
 *   2. images-dist/{id}_w300.webp の寸法から縦横比を求め、
 *      配信最大幅から推定する… ことはしない。原寸が分からないものは
 *      「配信画像の実寸」として w1200 の寸法をそのまま記録し、出典を残す。
 *
 * 推測で埋めない。どちらからも取れない写真は unknown に入れ、
 * 縦横の絞り込み対象から外す (勝手に「横」と決めない)。
 *
 * キャッシュ: 既存の app/photo-dims.js を読み、同じIDは再計算しない。
 * 差し替えは images-dist の mtime/size が変われば再計算する。
 */
import sharp from "sharp";
import { existsSync, readFileSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import { PREFECTURES } from "../app/data.js";

const ORIGINALS = "C:/Users/3jmcn/Pictures/cloudinary-originals";
const DIST = "images-dist";
const OUT = path.resolve("app", "photo-dims.js");
const force = process.argv.includes("--force");

const ids = [...new Set(PREFECTURES.flatMap((pf) => pf.photos.map((p) => p.id)))];

/* ---- 既存の記録 (再計算を避ける) ---- */
let prev = {}, prevSrc = {};
if (!force && existsSync(OUT)) {
  const mod = await import(`file://${OUT}?t=${Date.now()}`);
  prev = { ...(mod.PHOTO_DIMS || {}) };
  prevSrc = { ...(mod.PHOTO_DIMS_SOURCE || {}) };
}

/* ---- 原本庫の台帳 ---- */
let manifest = [];
const mp = path.join(ORIGINALS, "manifest.json");
if (existsSync(mp)) {
  try { manifest = JSON.parse(readFileSync(mp, "utf-8")); } catch {}
}
const byId = new Map(manifest.map((m) => [m.public_id, m]));

const dims = {}, source = {}, unknown = [];
let fromManifest = 0, fromDist = 0, reused = 0;

for (const id of ids) {
  /* 差し替え検知: images-dist の w1200 の更新時刻とサイズ */
  const probe = path.join(DIST, `${id}_w1200.webp`);
  const stamp = existsSync(probe) ? (() => { const s = statSync(probe); return `${s.mtimeMs}:${s.size}`; })() : "";
  if (prev[id] && prevSrc[id] && prevSrc[id].stamp === stamp) {
    dims[id] = prev[id]; source[id] = prevSrc[id]; reused++; continue;
  }

  const m = byId.get(id);
  if (m && m.w > 0 && m.h > 0) {
    dims[id] = [m.w, m.h];
    source[id] = { from: "manifest", stamp };
    fromManifest++;
    continue;
  }
  /* 原本庫が無い環境では、配信画像の実寸を記録する (これが等倍の基準にもなる) */
  const big = [3840, 2400, 1200, 600, 300].map((w) => path.join(DIST, `${id}_w${w}.webp`)).find(existsSync);
  if (big) {
    try {
      const meta = await sharp(big).metadata();
      if (meta.width && meta.height) {
        dims[id] = [meta.width, meta.height];
        source[id] = { from: path.basename(big), stamp };
        fromDist++;
        continue;
      }
    } catch {}
  }
  unknown.push(id);
}

const sorted = Object.keys(dims).sort();
writeFileSync(
  OUT,
  `// 自動生成: node scripts/generate-photo-dims.mjs (編集禁止)\n` +
  `// ⑧ 実画像の寸法 [幅, 高さ]。縦横の絞り込み・img の縦横比・等倍表示の基準に使う。\n` +
  `// 出典は PHOTO_DIMS_SOURCE (manifest = 原本庫の台帳 / *_w*.webp = 配信画像の実測)。\n` +
  `// 寸法が取れなかった写真は PHOTO_DIMS_UNKNOWN。縦横の判定対象から外す (推測で決めない)。\n` +
  `export const PHOTO_DIMS = {\n` +
  sorted.map((id) => `"${id}":[${dims[id][0]},${dims[id][1]}]`).join(",\n") +
  `\n};\n` +
  `export const PHOTO_DIMS_UNKNOWN = ${JSON.stringify(unknown.sort())};\n` +
  `export const PHOTO_DIMS_SOURCE = ${JSON.stringify(source)};\n\n` +
  `/* 縦横の判定は1か所だけ。閾値: 縦横比 1.05 以上=横長 / 0.95 以下=縦長 / その間=正方形に近い。\n` +
  `   閾値を変えるときはここだけ変える (画面ごとに別の判定を作らない)。 */\n` +
  `export const ORIENTATION_LANDSCAPE = 1.05;\n` +
  `export const ORIENTATION_PORTRAIT = 0.95;\n` +
  `export function orientationOf(id) {\n` +
  `  const d = PHOTO_DIMS[id];\n` +
  `  if (!d || !d[1]) return null;            // 不明は null。「横」と決めつけない\n` +
  `  const r = d[0] / d[1];\n` +
  `  if (r >= ORIENTATION_LANDSCAPE) return "landscape";\n` +
  `  if (r <= ORIENTATION_PORTRAIT) return "portrait";\n` +
  `  return "square";\n` +
  `}\n` +
  `export const aspectOf = (id) => (PHOTO_DIMS[id] ? PHOTO_DIMS[id][0] / PHOTO_DIMS[id][1] : null);\n`,
  "utf-8"
);

const counts = { landscape: 0, portrait: 0, square: 0 };
for (const id of sorted) {
  const [w, h] = dims[id];
  const r = w / h;
  counts[r >= 1.05 ? "landscape" : r <= 0.95 ? "portrait" : "square"]++;
}
console.log(`[dims] 対象 ${ids.length} 枚 / 台帳から ${fromManifest} / 配信画像から ${fromDist} / 再利用 ${reused} / 不明 ${unknown.length}`);
console.log(`  横長 ${counts.landscape} / 縦長 ${counts.portrait} / 正方形に近い ${counts.square}`);
if (unknown.length) console.log(`  寸法不明: ${unknown.slice(0, 5).join(", ")}${unknown.length > 5 ? ` ほか${unknown.length - 5}件` : ""}`);
console.log(`  出力 app/photo-dims.js  ${(statSync(OUT).size / 1024).toFixed(1)} KB`);
