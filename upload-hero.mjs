#!/usr/bin/env node
/* Hero 背景画像専用アップロード（PREFECTURES に追加しない）。
   使い方: node upload-hero.mjs <横構図.jpg> <縦構図.jpg> */
import { v2 as cloudinary } from "cloudinary";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, ".env");
if (existsSync(envPath)) {
  readFileSync(envPath, "utf-8").split("\n").forEach(line => {
    const t = line.trim();
    if (t && !t.startsWith("#") && t.includes("=")) {
      const [k, ...r] = t.split("=");
      if (!process.env[k.trim()]) process.env[k.trim()] = r.join("=").trim();
    }
  });
}

cloudinary.config({
  cloud_name: "dr53c12fo",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const targets = [
  { path: process.argv[2], public_id: "hero_landscape" },
  { path: process.argv[3], public_id: "hero_portrait" },
];

for (const t of targets) {
  if (!t.path) continue;
  console.log(`Upload ${t.path} -> ${t.public_id}`);
  const r = await cloudinary.uploader.upload(t.path, {
    public_id: t.public_id,
    overwrite: true,
    resource_type: "image",
  });
  console.log(`  OK: ${r.secure_url}`);
}
