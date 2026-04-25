#!/usr/bin/env node
/**
 * Bing Webmaster API で URL を一括 submit (indexing 加速)
 * Rate limit: 10,000 URLs/day, 500 URLs/batch
 * Usage: node bing-submit-urls.mjs [maxUrls=500]
 */
import { readFileSync, existsSync } from "node:fs";

const SITE_URL = "https://landscapes-of-japan.vercel.app/";
const MAX = parseInt(process.argv[2] || "500", 10);

// API key from .env or env var
function loadEnv() {
  if (!existsSync(".env")) return;
  for (const line of readFileSync(".env", "utf-8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;
    const [k, ...rest] = t.split("=");
    if (!process.env[k.trim()]) process.env[k.trim()] = rest.join("=").trim();
  }
}
loadEnv();

const KEY = process.env.BING_WEBMASTER_API_KEY;
if (!KEY) { console.error("✗ BING_WEBMASTER_API_KEY not set"); process.exit(1); }

// 全URLを sitemap から取得
async function getAllUrls() {
  const idx = await (await fetch(`${SITE_URL}sitemap.xml`)).text();
  const sitemaps = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const all = [];
  for (const sm of sitemaps) {
    const body = await (await fetch(sm)).text();
    const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    all.push(...urls);
  }
  return [...new Set(all)];
}

const urls = (await getAllUrls()).slice(0, MAX);
console.log(`Submitting ${urls.length} URLs to Bing Webmaster API (max 500/batch)...`);

const BATCH = 500;
let total = 0;
for (let i = 0; i < urls.length; i += BATCH) {
  const batch = urls.slice(i, i + BATCH);
  const r = await fetch(
    `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=${KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ siteUrl: SITE_URL.replace(/\/$/, ""), urlList: batch }),
    }
  );
  const status = r.status;
  total += batch.length;
  console.log(`  [${i + 1}-${i + batch.length}/${urls.length}] HTTP ${status}`);
  if (status !== 200) {
    const err = await r.text();
    console.error(`  Error: ${err.slice(0, 200)}`);
  }
}
console.log(`\n✓ Submitted ${total} URLs to Bing`);
