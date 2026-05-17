#!/usr/bin/env node
/**
 * GSC API で過去90日のtop queriesを取得 → app/seo-extras.js を更新
 * 月次自動化用。SEO_META と merge してkeywordsを動的最適化。
 */
import crypto from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const SITE_URL = "https://landscapes-of-japan.com/";
const KEY_PATH = process.env.GSC_KEY_PATH || "./gsc-service-account.json";

if (!existsSync(KEY_PATH)) {
  console.error(`✗ Key not found: ${KEY_PATH}`);
  process.exit(1);
}
const key = JSON.parse(readFileSync(KEY_PATH, "utf8"));

const b64u = (x) => Buffer.from(x).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
const now = Math.floor(Date.now() / 1000);
const unsigned = `${b64u(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64u(JSON.stringify({
  iss: key.client_email,
  scope: "https://www.googleapis.com/auth/webmasters.readonly",
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

const endDate = new Date(); endDate.setDate(endDate.getDate() - 2);
const startDate = new Date(endDate); startDate.setDate(startDate.getDate() - 90);
const fmt = (d) => d.toISOString().slice(0, 10);

console.log(`Fetching queries ${fmt(startDate)} ~ ${fmt(endDate)} (90 days)...`);

const r = await (await fetch(
  `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
  {
    method: "POST",
    headers: { Authorization: `Bearer ${tok.access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ["query", "page"],
      rowLimit: 5000,
    }),
  }
)).json();

if (!r.rows) { console.log("No queries data yet (need 1+ week of indexing)"); process.exit(0); }

console.log(`Total query-page pairs: ${r.rows.length}`);

// Group queries by lang prefix from URL
const byLang = {};
for (const row of r.rows) {
  const path = row.keys[1].replace(SITE_URL.replace(/\/$/, ""), "");
  const m = path.match(/^\/([a-z-]+)(\/|$)/);
  const lang = m ? m[1] : "en";
  if (!byLang[lang]) byLang[lang] = {};
  const q = row.keys[0];
  if (!byLang[lang][q]) byLang[lang][q] = { impressions: 0, clicks: 0 };
  byLang[lang][q].impressions += row.impressions;
  byLang[lang][q].clicks += row.clicks;
}

// Top 30 queries per lang by impressions, filter out brand-name-only
const TOP_BY_LANG = {};
for (const [lang, queries] of Object.entries(byLang)) {
  const sorted = Object.entries(queries)
    .filter(([q]) => !/^(landscapes of japan|landscapes-of-japan\.vercel\.app)$/i.test(q))
    .sort((a, b) => b[1].impressions - a[1].impressions)
    .slice(0, 30);
  if (sorted.length > 0) TOP_BY_LANG[lang] = sorted.map(([q]) => q);
}

const output = `/**
 * GSC API から自動取得 — 過去90日の top queries
 * Generated: ${new Date().toISOString()}
 * 更新: GitHub Actions で月次 (.github/workflows/monthly-kw-update.yml)
 */
export const TOP_QUERIES_BY_LANG = ${JSON.stringify(TOP_BY_LANG, null, 2)};

export function mergeWithMeta(seoMeta, lang) {
  const dynamic = TOP_QUERIES_BY_LANG[lang] || [];
  const existing = seoMeta[lang]?.keywords || [];
  // Dedupe and limit total to 50
  const merged = [...new Set([...existing, ...dynamic])].slice(0, 50);
  return merged;
}
`;

writeFileSync("./app/seo-extras.js", output, "utf-8");
console.log(`✓ Wrote app/seo-extras.js with ${Object.keys(TOP_BY_LANG).length} languages`);
for (const [lang, qs] of Object.entries(TOP_BY_LANG)) {
  console.log(`  ${lang}: ${qs.slice(0, 5).join(", ")}${qs.length > 5 ? "…" : ""}`);
}
