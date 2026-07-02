#!/usr/bin/env node
/**
 * 写真追加パイプライン (2026-06 Cloudinary 脱出後のローカル完結版)
 *
 *   node upload.mjs <files...> --pref 北海道 --loc 積丹 [--skip-deploy]
 *
 * 各ファイルについて:
 *   1. EXIF DateTimeOriginal をローカルで読む (exifr) — 旧 sort-photos の
 *      「アップ直後は EXIF 未処理」タイミング bug は原理的に消滅
 *   2. 原本を C:/Users/3jmcn/Pictures/cloudinary-originals/ へコピー (マスター庫)
 *      + manifest.json に追記 (再生成スクリプト群が新写真を見失わないように)
 *   3. sharp で images-dist/ に 300/600/1200/2400/3840 WebP + 40b LQIP を生成
 *   4. data.js の該当 pref に「撮影日時の降順位置」へ直接挿入 (year 付き)
 *   5. photo-colors.js / photo-months.js / photo-dates.js を再生成 (色 + 季節 + 撮影日順)
 *   6. wrangler で landscapes-images へデプロイ (--skip-deploy で省略可)
 *
 * 本体サイトの反映は従来どおり: npm run build && wrangler pages deploy out ...
 * 旧 Cloudinary 版は upload-cloudinary-legacy.mjs.bak に保管。
 */
import sharp from "sharp";
import exifr from "exifr";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { createHash } from "crypto";
import path from "path";

const MASTERS = "C:/Users/3jmcn/Pictures/cloudinary-originals";
const DIST = "images-dist";
const DATA_JS = path.resolve("app", "data.js");
const WIDTHS = [300, 600, 1200, 2400, 3840];

const args = process.argv.slice(2);
const getOpt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : null;
};
const pref = getOpt("pref");
const loc = getOpt("loc");
const skipDeploy = args.includes("--skip-deploy");
const files = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--pref" && args[i - 1] !== "--loc");

if (!pref || !loc || files.length === 0) {
  console.error("Usage: node upload.mjs <files...> --pref 北海道 --loc 積丹 [--skip-deploy]");
  process.exit(1);
}

mkdirSync(MASTERS, { recursive: true });
mkdirSync(DIST, { recursive: true });

console.log(`=== Landscapes of Japan ローカル追加 ===\n  都道府県: ${pref}\n  撮影地:   ${loc}\n  写真数:   ${files.length}枚\n`);

// ---- process each file ----
const added = []; // { id, year, dt }
for (const [i, f] of files.entries()) {
  if (!existsSync(f)) { console.error(`✗ not found: ${f}`); process.exit(1); }
  const base = path.basename(f).replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9_-]/g, "");
  const hash = createHash("md5").update(readFileSync(f)).digest("hex").slice(0, 6);
  const id = `${base}-${hash}`;

  let dt = null;
  try {
    const ex = await exifr.parse(f, ["DateTimeOriginal", "CreateDate"]);
    dt = ex?.DateTimeOriginal || ex?.CreateDate || null;
  } catch {}
  if (!dt) console.warn(`  ⚠ EXIF 日時なし: ${path.basename(f)} (今日の日付で扱います)`);
  const when = dt ? new Date(dt) : new Date();
  const year = when.getFullYear();

  const ext = path.extname(f).toLowerCase() || ".jpg";
  copyFileSync(f, path.join(MASTERS, `${id}${ext}`));

  for (const w of WIDTHS) {
    await sharp(f, { failOn: "none" }).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(DIST, `${id}_w${w}.webp`));
  }
  await sharp(f, { failOn: "none" }).rotate().resize({ width: 40 }).blur(8).webp({ quality: 50 }).toFile(path.join(DIST, `${id}_w40b.webp`));

  const meta = await sharp(f, { failOn: "none" }).metadata();
  added.push({ id, year, dt: when.getTime(), format: ext.slice(1), bytes: readFileSync(f).length, w: meta.width || 0, h: meta.height || 0 });
  console.log(`[${i + 1}/${files.length}] ${path.basename(f)} → ${id} (year=${year})`);
}

// ---- manifest.json 追記 (generate-variants/colors/months の再生成対象に含める) ----
const manifestPath = path.join(MASTERS, "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
for (const a of added) {
  if (!manifest.some((m) => m.public_id === a.id)) {
    manifest.push({ public_id: a.id, format: a.format, bytes: a.bytes, w: a.w, h: a.h });
  }
}
writeFileSync(manifestPath, JSON.stringify(manifest, null, 1), "utf-8");
console.log(`manifest.json: ${manifest.length} entries`);

// ---- insert into data.js, sorted by capture datetime desc within the pref ----
// 既存写真は year しか持たないため、新規は「自分の year より大きい year の既存」の
// 後ろ・同 year 以下の先頭、に挿入して降順を保つ。新規同士は dt 厳密比較。
const content = readFileSync(DATA_JS, "utf-8");
const prefRe = new RegExp(`(pref: "${pref}",[\\s\\S]*?photos: \\[)([\\s\\S]*?)(\\n    \\])`);
const m = content.match(prefRe);
if (!m) { console.error(`✗ data.js に pref "${pref}" が見つかりません`); process.exit(1); }

const photosBlock = m[2];
const lineRe = /\{ id: "[^"]+", loc: "[^"]+"(?:, year: (\d+))? \},/g;
const lines = [];
let lm;
while ((lm = lineRe.exec(photosBlock)) !== null) {
  lines.push({ text: lm[0], year: lm[1] ? parseInt(lm[1], 10) : 0 });
}

added.sort((a, b) => a.dt - b.dt); // 古い順に処理し、各々を先頭側へ挿入 → 結果は新しい順
const merged = [...lines];
for (const a of added) {
  const text = `{ id: "${a.id}", loc: "${loc}", year: ${a.year} },`;
  let pos = 0;
  while (pos < merged.length && merged[pos].year > a.year) pos++;
  merged.splice(pos, 0, { text, year: a.year });
}

const rebuilt = merged.map((l) => `      ${l.text}`).join("\n");
writeFileSync(DATA_JS, content.replace(prefRe, (_, p1, _2, p3) => `${p1}\n${rebuilt}${p3}`), "utf-8");
console.log(`\ndata.js 更新: ${pref} に ${added.length} 枚挿入 (撮影日降順)`);

// ---- アンビエント色 + 撮影月 + 撮影日 の生成ファイルを更新 (manifest 追記済みなので全量再生成) ----
console.log("\nphoto-colors.js / photo-months.js / photo-dates.js 再生成中...");
execSync("node scripts/generate-photo-colors.mjs", { stdio: "inherit" });
execSync("node scripts/generate-photo-months.mjs", { stdio: "inherit" });
execSync("node scripts/generate-photo-dates.mjs", { stdio: "inherit" });

// ---- deploy images project ----
if (!skipDeploy) {
  console.log("\nlandscapes-images へデプロイ中 (差分のみ)...");
  execSync(
    `npx wrangler pages deploy ${DIST} --project-name=landscapes-images --branch=main --commit-dirty=true --commit-message="add ${added.length} photos (${loc})"`,
    { stdio: "inherit", env: { ...process.env, CLOUDFLARE_ACCOUNT_ID: "0373897369bf3777415ed3daa77cd538" } }
  );
}

console.log(`\n次のステップ:\n  npm run build && npx wrangler pages deploy out --project-name=landscapes-of-japan --branch=cloudflare-migration --commit-dirty=true`);
