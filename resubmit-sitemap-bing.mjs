#!/usr/bin/env node
/**
 * Resubmit the sitemap to Bing Webmaster Tools via API.
 * Usage:  node resubmit-sitemap-bing.mjs
 * Requires: BING_WEBMASTER_API_KEY env var (see .env).
 */
import { readFileSync } from "node:fs";

const SITE_URL = "https://landscapes-of-japan.com/";
const SITEMAP_URL = "https://landscapes-of-japan.com/sitemap.xml";

// Tiny .env loader (no deps)
try {
  const env = readFileSync(new URL("./.env", import.meta.url), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {}

const apiKey = process.env.BING_WEBMASTER_API_KEY;
if (!apiKey) {
  console.error("✗ BING_WEBMASTER_API_KEY not set (.env or env var).");
  process.exit(1);
}

const url = `https://ssl.bing.com/webmaster/api.svc/json/SubmitFeed?apikey=${apiKey}`;
const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ siteUrl: SITE_URL, feedUrl: SITEMAP_URL }),
});

const body = await res.text();
let parsed;
try { parsed = JSON.parse(body); } catch { parsed = body; }

if (res.ok && (parsed?.d === null || parsed?.d === undefined || parsed?.ErrorCode === undefined)) {
  console.log(`✓ Sitemap resubmitted to Bing: ${SITEMAP_URL}`);
  console.log(`  Bing will re-crawl within minutes to hours.`);
} else {
  console.error(`✗ Submit failed: HTTP ${res.status}`);
  console.error(parsed);
  process.exit(1);
}
