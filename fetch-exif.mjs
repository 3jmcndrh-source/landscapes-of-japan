#!/usr/bin/env node
/**
 * Cloudinary Admin API から全画像のEXIFを取得 → app/exif.js を生成
 * 写真個別ページで撮影機材情報を表示するため。
 * Usage: node fetch-exif.mjs
 */
import { v2 as cloudinary } from "cloudinary";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

console.log("Fetching all resources with image_metadata...");
const all = [];
let nextCursor = null;
do {
  const res = await cloudinary.api.resources({
    type: "upload",
    max_results: 500,
    image_metadata: true,
    next_cursor: nextCursor,
  });
  all.push(...res.resources);
  nextCursor = res.next_cursor;
  console.log(`  fetched ${all.length} so far${nextCursor ? "..." : " (done)"}`);
} while (nextCursor);

// EXIFから抽出するフィールド
function extractExif(meta) {
  if (!meta) return null;
  const result = {};
  // Camera
  if (meta.Make) result.make = meta.Make;
  if (meta.Model) result.model = meta.Model;
  // Lens
  if (meta.LensModel) result.lens = meta.LensModel;
  // Exposure
  if (meta.FNumber) result.fNumber = meta.FNumber;          // e.g., "11/1" → "f/11"
  if (meta.ExposureTime) result.exposure = meta.ExposureTime;  // e.g., "1/250"
  if (meta.ISOSpeedRatings) result.iso = meta.ISOSpeedRatings;
  if (meta.FocalLength) result.focalLength = meta.FocalLength; // e.g., "70/1" → "70mm"
  // Date
  if (meta.DateTimeOriginal) result.dateTime = meta.DateTimeOriginal;
  return Object.keys(result).length > 0 ? result : null;
}

const exifMap = {};
let withExif = 0;
for (const r of all) {
  const exif = extractExif(r.image_metadata);
  if (exif) {
    exifMap[r.public_id] = exif;
    withExif++;
  }
}

console.log(`\nTotal: ${all.length} resources, ${withExif} with EXIF`);

const output = `/**
 * 自動生成 — Cloudinary Admin APIから取得したEXIFメタデータ
 * Generated: ${new Date().toISOString()}
 * 更新: node fetch-exif.mjs
 */
export const EXIF = ${JSON.stringify(exifMap, null, 2)};

export function getExif(photoId) {
  return EXIF[photoId] || null;
}

// EXIF値を人間に読める形式に
export function formatFNumber(raw) {
  if (!raw) return null;
  if (typeof raw === "string" && raw.includes("/")) {
    const [n, d] = raw.split("/").map(Number);
    return d ? \`f/\${(n / d).toFixed(1).replace(/\\.0$/, "")}\` : null;
  }
  return \`f/\${raw}\`;
}

export function formatFocalLength(raw) {
  if (!raw) return null;
  if (typeof raw === "string" && raw.includes("/")) {
    const [n, d] = raw.split("/").map(Number);
    return d ? \`\${Math.round(n / d)}mm\` : null;
  }
  return \`\${raw}mm\`;
}

export function formatExposure(raw) {
  if (!raw) return null;
  return raw;
}

export function formatIso(raw) {
  if (!raw) return null;
  return \`ISO \${raw}\`;
}
`;

writeFileSync(resolve(__dirname, "app", "exif.js"), output, "utf-8");
console.log(`✓ Wrote app/exif.js with ${withExif} entries`);
