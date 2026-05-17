#!/usr/bin/env node
/**
 * GSC URL Inspection API で URLのindexing状態を確認・レポート出力
 * Rate limit: 2000 inspections/day per project
 * Usage: node gsc-inspect-urls.mjs [maxUrls=200]
 *
 * 出力: gsc-inspection-report.json (indexed/not-indexed status)
 */
import crypto from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const PROPERTY = process.env.GSC_PROPERTY || "sc-domain:landscapes-of-japan.com";
const SITE_URL = process.env.GSC_SITE_URL || "https://landscapes-of-japan.com/";
const URL_FROM = process.env.GSC_URL_FROM || "";  // optional: replace this substring in URLs
const URL_TO = process.env.GSC_URL_TO || "";
const MAX = parseInt(process.argv[2] || "200", 10);
const KEY_PATH = process.env.GSC_KEY_PATH || "./gsc-service-account.json";

if (!existsSync(KEY_PATH)) { console.error(`✗ Key not found: ${KEY_PATH}`); process.exit(1); }
const key = JSON.parse(readFileSync(KEY_PATH, "utf8"));

const b64u = (x) => Buffer.from(x).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
const now = Math.floor(Date.now() / 1000);
const unsigned = `${b64u(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64u(JSON.stringify({
  iss: key.client_email,
  scope: "https://www.googleapis.com/auth/webmasters",
  aud: "https://oauth2.googleapis.com/token",
  exp: now + 3600, iat: now,
}))}`;
const sig = crypto.sign("RSA-SHA256", Buffer.from(unsigned), key.private_key);
const jwt = `${unsigned}.${b64u(sig)}`;

const tok = await (await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
})).json();
if (!tok.access_token) { console.error("OAuth failed"); process.exit(1); }

// sitemap から全URL取得 → ランダムにMAX個サンプリング
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

let allUrls = await getAllUrls();
if (URL_FROM && URL_TO) {
  allUrls = allUrls.map(u => u.replace(URL_FROM, URL_TO));
  console.log(`URL transform: ${URL_FROM} -> ${URL_TO}`);
}
console.log(`Total URLs in sitemap: ${allUrls.length}`);
console.log(`Property: ${PROPERTY}`);

// Random sample of MAX URLs
const shuffled = [...allUrls].sort(() => Math.random() - 0.5);
const sample = shuffled.slice(0, MAX);
console.log(`Inspecting ${sample.length} URLs (random sample)...`);

const report = { inspectedAt: new Date().toISOString(), total: sample.length, indexed: 0, notIndexed: 0, errors: 0, results: [] };

for (let i = 0; i < sample.length; i++) {
  const url = sample[i];
  const r = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: { Authorization: `Bearer ${tok.access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: PROPERTY }),
  });

  if (r.status !== 200) {
    report.errors++;
    if (i < 3) console.error(`  Error ${r.status} for ${url}: ${await r.text().then(t => t.slice(0, 100))}`);
    continue;
  }

  const j = await r.json();
  const idxStatus = j?.inspectionResult?.indexStatusResult || {};
  const verdict = idxStatus.verdict || "UNKNOWN";
  const coverageState = idxStatus.coverageState || "";

  if (verdict === "PASS") report.indexed++;
  else report.notIndexed++;

  report.results.push({ url, verdict, coverageState });

  if ((i + 1) % 50 === 0) console.log(`  [${i + 1}/${sample.length}] indexed=${report.indexed}, not=${report.notIndexed}`);

  await new Promise((res) => setTimeout(res, 500));  // 0.5s delay (avoid rate limits)
}

writeFileSync("gsc-inspection-report.json", JSON.stringify(report, null, 2));
console.log(`\n=== Final Report ===`);
console.log(`Indexed: ${report.indexed}/${report.total}`);
console.log(`Not indexed: ${report.notIndexed}/${report.total}`);
console.log(`Errors: ${report.errors}/${report.total}`);
console.log(`Indexing rate: ${((report.indexed / report.total) * 100).toFixed(1)}%`);
console.log(`Full report: gsc-inspection-report.json`);
