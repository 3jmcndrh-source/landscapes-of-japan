#!/usr/bin/env node
/**
 * バッチアップロード — 富士山＆長野撮影分 26枚
 * Cloudinaryにアップして、結果を data.js 用 entries として標準出力
 */
import { v2 as cloudinary } from "cloudinary";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = "C:/Users/3jmcn/Pictures/2025/20260411_富士山/HP用";

const BATCHES = [
  // 山梨県
  { pref: "山梨県", loc: "新倉山浅間公園", files: ["DSC01077", "DSC01194", "DSC01209", "DSC01214", "DSC01216", "DSC01221", "DSC01222", "DSC01237"] },
  { pref: "山梨県", loc: "河口湖",         files: ["DSC01249", "DSC01271", "DSC01289", "DSC01303", "DSC01305"] },
  // 長野県
  { pref: "長野県", loc: "松本城",         files: ["DSC01314", "DSC01329", "DSC01333_1", "DSC01342", "DSC01347"] },
  { pref: "長野県", loc: "高遠城址公園",   files: ["DSC01354", "DSC01356", "DSC01358", "DSC01360", "DSC01362", "DSC01368"] },
  { pref: "長野県", loc: "駒つなぎの桜",   files: ["DSC01379"] },
  { pref: "長野県", loc: "長野県天空の楽園", files: ["DSC01406"] },
];

// .env loader
function loadEnv() {
  const envPath = resolve(__dirname, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;
    const [k, ...rest] = t.split("=");
    if (!process.env[k.trim()]) process.env[k.trim()] = rest.join("=").trim();
  }
}
loadEnv();

cloudinary.config({
  cloud_name: "dr53c12fo",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const total = BATCHES.reduce((s, b) => s + b.files.length, 0);
console.log(`=== ${total}枚アップロード開始 ===\n`);

let counter = 0;
const results = {};

for (const batch of BATCHES) {
  results[`${batch.pref}|${batch.loc}`] = [];
  for (const fname of batch.files) {
    counter++;
    const fp = `${SRC}/${fname}.jpg`;
    if (!existsSync(fp)) {
      console.log(`[${counter}/${total}] ✗ NOT FOUND: ${fname}.jpg`);
      continue;
    }
    process.stdout.write(`[${counter}/${total}] ${fname}.jpg → `);
    try {
      const r = await cloudinary.uploader.upload(fp, {
        resource_type: "image",
        overwrite: false,
        unique_filename: true,
      });
      results[`${batch.pref}|${batch.loc}`].push(r.public_id);
      console.log(r.public_id);
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
    }
  }
}

console.log(`\n=== data.js 用エントリ ===\n`);
for (const [key, ids] of Object.entries(results)) {
  const [pref, loc] = key.split("|");
  console.log(`// ${pref} / ${loc}`);
  for (const id of ids) {
    console.log(`      { id: "${id}", loc: "${loc}" },`);
  }
  console.log();
}
