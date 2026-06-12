#!/usr/bin/env node
/**
 * Cloudinary 脱出 Phase 1: 全原本を ~/Pictures/cloudinary-originals/ へダウンロード。
 * - Admin API は一覧取得 (max_results=500 × 2ページ) のみ — レート枠をほぼ消費しない
 * - 実体は delivery URL から並列6でダウンロード、既存ファイルはスキップ (resume 可)
 * - manifest.json に public_id → format/bytes を保存 (Phase 2 の入力)
 */
import { v2 as cloudinary } from "cloudinary";
import { createWriteStream, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { get } from "https";
import path from "path";

const OUT_DIR = "C:/Users/3jmcn/Pictures/cloudinary-originals";
mkdirSync(OUT_DIR, { recursive: true });

if (existsSync(".env")) for (const l of readFileSync(".env", "utf-8").split("\n")) {
  const t = l.trim();
  if (t && !t.startsWith("#") && t.includes("=")) {
    const [k, ...r] = t.split("=");
    if (!process.env[k.trim()]) process.env[k.trim()] = r.join("=").trim();
  }
}
cloudinary.config({ cloud_name: "dr53c12fo", api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });

// ---- list all resources (2 admin calls) ----
let resources = [];
let cursor = undefined;
do {
  const res = await cloudinary.api.resources({ resource_type: "image", type: "upload", max_results: 500, next_cursor: cursor });
  resources = resources.concat(res.resources);
  cursor = res.next_cursor;
} while (cursor);
console.log(`[list] ${resources.length} resources`);

writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(
  resources.map((r) => ({ public_id: r.public_id, format: r.format, bytes: r.bytes, w: r.width, h: r.height })), null, 1));

// ---- download with concurrency 6, resume by size ----
const dl = (url, dest) => new Promise((resolve, reject) => {
  const file = createWriteStream(dest);
  const go = (u, redirects = 0) => get(u, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects < 3) { res.resume(); return go(res.headers.location, redirects + 1); }
    if (res.statusCode !== 200) { res.resume(); file.close(); return reject(new Error(`HTTP ${res.statusCode} ${u}`)); }
    res.pipe(file);
    file.on("finish", () => file.close(resolve));
  }).on("error", (e) => { file.close(); reject(e); });
  go(url);
});

let done = 0, skipped = 0, failed = [];
const queue = [...resources];
async function worker() {
  while (queue.length) {
    const r = queue.shift();
    if (r.public_id.includes("/")) { skipped++; continue; } // Cloudinary demo assets (samples/*) — unused by the site
    const fname = `${r.public_id}.${r.format}`;
    const dest = path.join(OUT_DIR, fname);
    if (existsSync(dest) && statSync(dest).size === r.bytes) { skipped++; continue; }
    const url = `https://res.cloudinary.com/dr53c12fo/image/upload/${encodeURIComponent(r.public_id)}.${r.format}`;
    try {
      await dl(url, dest);
      done++;
      if ((done + skipped) % 50 === 0) console.log(`  ${done + skipped}/${resources.length} (dl=${done} skip=${skipped})`);
    } catch (e) {
      failed.push({ id: r.public_id, err: e.message });
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));

console.log(`[done] downloaded=${done} skipped=${skipped} failed=${failed.length}`);
if (failed.length) { console.log(JSON.stringify(failed.slice(0, 10), null, 1)); process.exitCode = 1; }
