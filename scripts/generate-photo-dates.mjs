#!/usr/bin/env node
/**
 * 撮影日順表示用: 原本 EXIF (DateTimeOriginal) から全写真の撮影日を "YYYY-MM-DD" で
 * 抽出して app/photo-dates.js を生成する。
 *
 * photo-months.js (月のみ) とは別に、日単位までの撮影日を保持 → ホームの
 * 「撮影日順」表示で都道府県をまたいだ厳密な時系列ソートに使う。
 * 機材・設定値は読まない (T3 除外の決定に従う)。
 *
 * 生成物はコミットする (原本庫が無い環境でも build を通す)。写真追加後に手動再実行:
 *   node scripts/generate-photo-dates.mjs
 */
import exifr from "exifr";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const SRC = "C:/Users/3jmcn/Pictures/cloudinary-originals";
const OUT = path.resolve("app", "photo-dates.js");

const manifest = JSON.parse(readFileSync(path.join(SRC, "manifest.json"), "utf-8"));

const pad = (n) => String(n).padStart(2, "0");
const dates = {};
let done = 0, noExif = 0, missing = 0;

for (const r of manifest) {
  const file = path.join(SRC, `${r.public_id}.${r.format}`);
  if (!existsSync(file)) { missing++; continue; }
  try {
    const ex = await exifr.parse(file, ["DateTimeOriginal", "CreateDate"]);
    const dt = ex?.DateTimeOriginal || ex?.CreateDate || null;
    if (!dt) { noExif++; continue; }
    const d = new Date(dt);
    dates[r.public_id] = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    if (++done % 100 === 0) console.log(`  ${done} dates`);
  } catch {
    noExif++;
  }
}

const body = Object.entries(dates).map(([id, d]) => `"${id}":"${d}"`).join(",\n");
writeFileSync(
  OUT,
  `// 自動生成: node scripts/generate-photo-dates.mjs (編集禁止)
// 各写真の撮影日 (EXIF DateTimeOriginal, "YYYY-MM-DD")
export const PHOTO_DATES = {
${body}
};

/** id の撮影日 ("YYYY-MM-DD", 不明は null) */
export const photoDate = (id) => PHOTO_DATES[id] || null;
`,
  "utf-8"
);

console.log(`[done] ${done} dates → app/photo-dates.js (no EXIF: ${noExif}, missing source: ${missing})`);
