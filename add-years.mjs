#!/usr/bin/env node
/**
 * 全写真にyear(撮影年)を追加する
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

const content = readFileSync(PAGE_JS, "utf-8");

// 全写真IDを抽出
const idRegex = /id:\s*"([^"]+)"/g;
const allIds = [];
let m;
while ((m = idRegex.exec(content)) !== null) {
  allIds.push(m[1]);
}

// ユニークなIDのみ
const uniqueIds = [...new Set(allIds)];
console.log(`${uniqueIds.length}枚の撮影年を取得中...`);

const yearMap = new Map();
const batchSize = 5;
for (let i = 0; i < uniqueIds.length; i += batchSize) {
  const batch = uniqueIds.slice(i, i + batchSize);
  await Promise.all(batch.map(async (id) => {
    try {
      const result = await cloudinary.api.resource(id, { image_metadata: true });
      const exifDate = result.image_metadata?.DateTimeOriginal
        || result.image_metadata?.DateTime
        || result.image_metadata?.CreateDate;
      if (exifDate) {
        const year = exifDate.slice(0, 4);
        yearMap.set(id, parseInt(year));
      } else {
        const year = new Date(result.created_at).getFullYear();
        yearMap.set(id, year);
      }
    } catch (e) {
      console.warn(`  警告: ${id} 失敗: ${e.message}`);
      yearMap.set(id, 2025);
    }
  }));
  process.stdout.write(`\r  ${Math.min(i + batchSize, uniqueIds.length)}/${uniqueIds.length}`);
}
console.log();

// page.js内の各エントリに year を追加
let updated = content;
for (const [id, year] of yearMap) {
  // { id: "xxx", loc: "yyy" } → { id: "xxx", loc: "yyy", year: 2025 }
  const pattern = new RegExp(`(\\{\\s*id:\\s*"${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s*,\\s*loc:\\s*"[^"]*")\\s*\\}`, 'g');
  updated = updated.replace(pattern, `$1, year: ${year} }`);
}

writeFileSync(PAGE_JS, updated, "utf-8");
console.log("page.js に撮影年を追加しました。");
for (const [id, year] of yearMap) {
  console.log(`  ${id} → ${year}`);
}
