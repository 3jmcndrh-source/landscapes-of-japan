#!/usr/bin/env node
/**
 * 全写真の撮影日時をCloudinaryから取得し、県ごとに日付降順（新しい順）に並べ替える
 */

import { v2 as cloudinary } from "cloudinary";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PAGE_JS = resolve(__dirname, "app", "data.js");

function loadEnv() {
  const envPath = resolve(__dirname, ".env");
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, "utf-8").split("\n")) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
        const [key, ...rest] = trimmed.split("=");
        if (!process.env[key.trim()]) process.env[key.trim()] = rest.join("=").trim();
      }
    }
  }
}

loadEnv();
cloudinary.config({
  cloud_name: "dr53c12fo",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// data.js からPREFECTURESを抽出
const content = readFileSync(PAGE_JS, "utf-8");
const prefStart = content.indexOf("export const PREFECTURES = [");
// PREFECTURESの閉じ ]; を正確に見つける（ブラケットの深さを追跡）
let depth = 0, prefEnd = -1;
for (let i = prefStart + "export const PREFECTURES = [".length; i < content.length; i++) {
  if (content[i] === "[") depth++;
  else if (content[i] === "]") {
    if (depth === 0) { prefEnd = i + 1; break; }
    depth--;
  }
}
if (prefEnd < 0) { console.error("PREFECTURESの終端が見つかりません"); process.exit(1); }
// ]; の ; も含める
if (content[prefEnd] === ";") prefEnd++;
const prefBlock = content.slice(prefStart, prefEnd);

// 全写真IDを抽出
const idRegex = /id:\s*"([^"]+)"/g;
const allIds = [];
let m;
while ((m = idRegex.exec(prefBlock)) !== null) {
  allIds.push(m[1]);
}

console.log(`全${allIds.length}枚の写真の撮影日時を取得中...`);

// Cloudinary APIで各写真のメタデータを取得
async function getPhotoDate(publicId) {
  try {
    const result = await cloudinary.api.resource(publicId, {
      image_metadata: true,
      exif: true,
    });
    // EXIF撮影日時 → created_at の順で取得
    const exifDate = result.image_metadata?.DateTimeOriginal
      || result.image_metadata?.DateTime
      || result.image_metadata?.CreateDate;
    if (exifDate) {
      // "2026:03:21 14:30:00" → "2026-03-21T14:30:00"
      const normalized = exifDate.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3").replace(" ", "T");
      return new Date(normalized);
    }
    // フォールバック: Cloudinaryのアップロード日時
    return new Date(result.created_at);
  } catch (e) {
    console.warn(`  警告: ${publicId} のメタデータ取得失敗: ${e.message}`);
    return new Date(0);
  }
}

// バッチで取得（API rate limit対策）
const dateMap = new Map();
const batchSize = 5;
for (let i = 0; i < allIds.length; i += batchSize) {
  const batch = allIds.slice(i, i + batchSize);
  const results = await Promise.all(batch.map(async (id) => {
    const date = await getPhotoDate(id);
    return { id, date };
  }));
  for (const r of results) {
    dateMap.set(r.id, r.date);
    process.stdout.write(`\r  ${dateMap.size}/${allIds.length} 取得済み`);
  }
}
console.log();

// PREFECTURESの各県のphotosを日付降順にソート
// まず構造をパース
const prefRegex = /\{\s*pref:\s*"([^"]+)",\s*lat:\s*([\d.]+),\s*lng:\s*([\d.]+),\s*photos:\s*\[([\s\S]*?)\]\s*\}/g;
const prefectures = [];
let pm;
while ((pm = prefRegex.exec(prefBlock)) !== null) {
  const pref = pm[1];
  const lat = parseFloat(pm[2]);
  const lng = parseFloat(pm[3]);
  const photosBlock = pm[4];

  // 各写真エントリを抽出（year付きにも対応）
  const photoRegex = /\{\s*id:\s*"([^"]+)",\s*loc:\s*"([^"]+)"(?:,\s*year:\s*(\d+))?\s*\}/g;
  const photos = [];
  let pp;
  while ((pp = photoRegex.exec(photosBlock)) !== null) {
    photos.push({ id: pp[1], loc: pp[2], year: pp[3] ? parseInt(pp[3]) : null });
  }

  // 日付降順（新しい順）にソート
  photos.sort((a, b) => {
    const da = dateMap.get(a.id) || new Date(0);
    const db = dateMap.get(b.id) || new Date(0);
    return db.getTime() - da.getTime();
  });

  prefectures.push({ pref, lat, lng, photos });

  console.log(`${pref}: ${photos.length}枚`);
  for (const p of photos) {
    const d = dateMap.get(p.id);
    console.log(`  ${p.id} → ${d ? d.toISOString().slice(0, 19) : "不明"} (${p.loc})`);
  }
}

// page.js を更新
const photosStr = prefectures.map(pf => {
  const entries = pf.photos
    .map(p => {
      const yr = p.year || (dateMap.get(p.id) ? dateMap.get(p.id).getFullYear() : null);
      return yr ? `      { id: "${p.id}", loc: "${p.loc}", year: ${yr} },` : `      { id: "${p.id}", loc: "${p.loc}" },`;
    })
    .join("\n");
  return `  {
    pref: "${pf.pref}",
    lat: ${pf.lat}, lng: ${pf.lng},
    photos: [
${entries}
    ]
  },`;
}).join("\n");

const newPrefBlock = `export const PREFECTURES = [\n${photosStr}\n];`;

const updatedContent = content.slice(0, prefStart) + newPrefBlock + content.slice(prefEnd);
writeFileSync(PAGE_JS, updatedContent, "utf-8");

console.log("\ndata.js を更新しました（日付降順にソート済み）");
