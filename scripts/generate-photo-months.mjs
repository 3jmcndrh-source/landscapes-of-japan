#!/usr/bin/env node
/**
 * T5 季節構造化: 原本 EXIF (DateTimeOriginal) から全写真の撮影月を抽出して
 * app/photo-months.js を生成する。
 *
 * 撮影月は内部利用 (シーズンバー/季節ストリップ/季節フィルタ) のみ。
 * 機材・設定値は読まない (T3 除外の決定に従う)。
 *
 * 生成物はコミットする (原本庫が無い環境でも build を通す)。写真追加後に手動再実行:
 *   node scripts/generate-photo-months.mjs
 */
import exifr from "exifr";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const SRC = "C:/Users/3jmcn/Pictures/cloudinary-originals";
const OUT = path.resolve("app", "photo-months.js");

const manifest = JSON.parse(readFileSync(path.join(SRC, "manifest.json"), "utf-8"));

const months = {};
let done = 0, noExif = 0, missing = 0;

for (const r of manifest) {
  const file = path.join(SRC, `${r.public_id}.${r.format}`);
  if (!existsSync(file)) { missing++; continue; }
  try {
    const ex = await exifr.parse(file, ["DateTimeOriginal", "CreateDate"]);
    const dt = ex?.DateTimeOriginal || ex?.CreateDate || null;
    if (!dt) { noExif++; continue; }
    months[r.public_id] = new Date(dt).getMonth() + 1;
    if (++done % 100 === 0) console.log(`  ${done} months`);
  } catch {
    noExif++;
  }
}

const body = Object.entries(months).map(([id, m]) => `"${id}":${m}`).join(",\n");
writeFileSync(
  OUT,
  `// 自動生成: node scripts/generate-photo-months.mjs (編集禁止)
// 各写真の撮影月 (EXIF DateTimeOriginal, 1-12)
export const PHOTO_MONTHS = {
${body}
};

/** id の撮影月 (1-12, 不明は null) */
export const photoMonth = (id) => PHOTO_MONTHS[id] || null;

/** 月 → 季節キー (winter: 12-2, spring: 3-5, summer: 6-8, autumn: 9-11) */
export const seasonOf = (m) =>
  !m ? null : m <= 2 || m === 12 ? "winter" : m <= 5 ? "spring" : m <= 8 ? "summer" : "autumn";
`,
  "utf-8"
);

console.log(`[done] ${done} months → app/photo-months.js (no EXIF: ${noExif}, missing source: ${missing})`);
