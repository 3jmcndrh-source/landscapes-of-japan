#!/usr/bin/env node
/**
 * Cloudinary 脱出 Phase 2: 原本 → 配信用変換を images-dist/ に生成。
 *
 * 各リソース (public_id):
 *   {id}_w300.webp / _w600.webp / _w1200.webp / _w2400.webp  (q80, 拡大なし)
 *   {id}_w40b.webp                                            (40px + blur LQIP)
 * 特殊:
 *   hero_landscape_gray_w1920.webp / hero_portrait_gray_w768.webp (ヒーロー背景)
 *   og.jpg (1200x630 cover, DSC07601_cocitq)
 *   icon_{120,152,180,192,512}.png / icon_512_pad.png (PWA/Apple)
 *   shot_narrow.jpg (1080x1920) / shot_wide.jpg (1920x1080)   (manifest screenshots)
 *   _headers (immutable cache + CORS)
 *
 * 再実行可: 既存ファイルはスキップ。
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const SRC = "C:/Users/3jmcn/Pictures/cloudinary-originals";
const OUT = "images-dist";
mkdirSync(OUT, { recursive: true });

const manifest = JSON.parse(readFileSync(path.join(SRC, "manifest.json"), "utf-8"));
const WIDTHS = [300, 600, 1200, 2400, 3840];
const HERO_ID = "DSC07601_cocitq";

sharp.concurrency(4);

let made = 0, skipped = 0, failed = [];

async function gen(input, output, pipeline) {
  if (existsSync(path.join(OUT, output))) { skipped++; return; }
  try {
    await pipeline(sharp(input, { failOn: "none" })).toFile(path.join(OUT, output));
    made++;
    if ((made + skipped) % 200 === 0) console.log(`  ${made + skipped} files (made=${made})`);
  } catch (e) {
    failed.push({ output, err: e.message });
  }
}

for (const r of manifest) {
  const input = path.join(SRC, `${r.public_id}.${r.format}`);
  if (!existsSync(input)) { failed.push({ output: r.public_id, err: "source missing" }); continue; }
  for (const w of WIDTHS) {
    await gen(input, `${r.public_id}_w${w}.webp`, (s) => s.rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }));
  }
  await gen(input, `${r.public_id}_w40b.webp`, (s) => s.rotate().resize({ width: 40 }).blur(8).webp({ quality: 50 }));
}

/* hero grayscale backgrounds (layout preload) */
const heroL = path.join(SRC, "hero_landscape.jpg");
const heroP = path.join(SRC, "hero_portrait.jpg");
if (existsSync(heroL)) await gen(heroL, "hero_landscape_gray_w1920.webp", (s) => s.rotate().resize({ width: 1920, height: 1080, fit: "cover" }).grayscale().webp({ quality: 78 }));
if (existsSync(heroP)) await gen(heroP, "hero_portrait_gray_w768.webp", (s) => s.rotate().resize({ width: 768, height: 1024, fit: "cover" }).grayscale().webp({ quality: 78 }));
if (existsSync(heroP)) await gen(heroP, "hero_portrait_gray_w1080.webp", (s) => s.rotate().resize({ width: 1080, height: 1440, fit: "cover" }).grayscale().webp({ quality: 78 }));

/* OG + icons + screenshots from the signature photo */
const heroSrcEntry = manifest.find((m) => m.public_id === HERO_ID);
if (heroSrcEntry) {
  const hs = path.join(SRC, `${HERO_ID}.${heroSrcEntry.format}`);
  await gen(hs, "og.jpg", (s) => s.rotate().resize({ width: 1200, height: 630, fit: "cover" }).jpeg({ quality: 82 }));
  for (const px of [120, 152, 180, 192, 512]) {
    await gen(hs, `icon_${px}.png`, (s) => s.rotate().resize({ width: px, height: px, fit: "cover" }).png());
  }
  await gen(hs, "icon_512_pad.png", (s) => s.rotate().resize({ width: 512, height: 512, fit: "contain", background: { r: 10, g: 10, b: 10 } }).png());
  await gen(hs, "shot_narrow.jpg", (s) => s.rotate().resize({ width: 1080, height: 1920, fit: "cover" }).jpeg({ quality: 80 }));
  await gen(hs, "shot_wide.jpg", (s) => s.rotate().resize({ width: 1920, height: 1080, fit: "cover" }).jpeg({ quality: 80 }));
}

writeFileSync(path.join(OUT, "_headers"), `/*
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *
`);

console.log(`[done] made=${made} skipped=${skipped} failed=${failed.length}`);
if (failed.length) console.log(JSON.stringify(failed.slice(0, 10), null, 1));
