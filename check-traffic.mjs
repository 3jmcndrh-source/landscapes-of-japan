#!/usr/bin/env node
/**
 * GSC API 経由で検索流入データを取得（過去28日）
 * Usage: node check-traffic.mjs [days]
 */
import crypto from "node:crypto";
import { readFileSync, existsSync } from "node:fs";

const SITE_URL = "https://landscapes-of-japan.com/";
const DAYS = parseInt(process.argv[2] || "28", 10);
const KEY_PATH = process.env.GSC_KEY_PATH || "./gsc-service-account.json";

if (!existsSync(KEY_PATH)) {
  console.error(`✗ Key not found: ${KEY_PATH}`);
  process.exit(1);
}
const key = JSON.parse(readFileSync(KEY_PATH, "utf8"));

const b64u = (x) =>
  Buffer.from(x).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
const now = Math.floor(Date.now() / 1000);
const unsigned = `${b64u(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64u(
  JSON.stringify({
    iss: key.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  })
)}`;
const sig = crypto.sign("RSA-SHA256", Buffer.from(unsigned), key.private_key);
const jwt = `${unsigned}.${b64u(sig)}`;

const tokRes = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: jwt,
  }),
});
const tok = await tokRes.json();
if (!tok.access_token) {
  console.error("✗ OAuth failed:", tok);
  process.exit(1);
}

const endDate = new Date();
endDate.setDate(endDate.getDate() - 2); // GSC data lags ~2 days
const startDate = new Date(endDate);
startDate.setDate(startDate.getDate() - DAYS + 1);
const fmt = (d) => d.toISOString().slice(0, 10);
const start = fmt(startDate);
const end = fmt(endDate);

const query = async (body) => {
  const r = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
      SITE_URL
    )}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tok.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  return r.json();
};

console.log(`\n=== Landscapes of Japan — 検索流入 (${start} 〜 ${end}, ${DAYS}日) ===\n`);

// 1. Totals
const totals = await query({ startDate: start, endDate: end, dimensions: [] });
const t = totals.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
console.log(`■ 合計`);
console.log(`  クリック:     ${t.clicks}`);
console.log(`  表示回数:     ${t.impressions}`);
console.log(`  CTR:          ${(t.ctr * 100).toFixed(2)}%`);
console.log(`  平均掲載順位: ${t.position?.toFixed(1) || "-"}`);

// 2. Top queries
const queries = await query({
  startDate: start,
  endDate: end,
  dimensions: ["query"],
  rowLimit: 15,
});
console.log(`\n■ トップ検索クエリ`);
if (!queries.rows?.length) {
  console.log(`  (データなし)`);
} else {
  for (const r of queries.rows) {
    console.log(
      `  ${String(r.clicks).padStart(4)}click / ${String(r.impressions).padStart(
        5
      )}imp  "${r.keys[0]}"`
    );
  }
}

// 3. Top pages
const pages = await query({
  startDate: start,
  endDate: end,
  dimensions: ["page"],
  rowLimit: 15,
});
console.log(`\n■ トップページ`);
if (!pages.rows?.length) {
  console.log(`  (データなし)`);
} else {
  for (const r of pages.rows) {
    const url = r.keys[0].replace(SITE_URL.replace(/\/$/, ""), "") || "/";
    console.log(
      `  ${String(r.clicks).padStart(4)}click / ${String(r.impressions).padStart(
        5
      )}imp  ${url}`
    );
  }
}

// 4. Top countries
const countries = await query({
  startDate: start,
  endDate: end,
  dimensions: ["country"],
  rowLimit: 10,
});
console.log(`\n■ 国別`);
if (!countries.rows?.length) {
  console.log(`  (データなし)`);
} else {
  for (const r of countries.rows) {
    console.log(
      `  ${String(r.clicks).padStart(4)}click / ${String(r.impressions).padStart(
        5
      )}imp  ${r.keys[0].toUpperCase()}`
    );
  }
}

// 5. Device
const devices = await query({
  startDate: start,
  endDate: end,
  dimensions: ["device"],
});
console.log(`\n■ デバイス`);
if (!devices.rows?.length) {
  console.log(`  (データなし)`);
} else {
  for (const r of devices.rows) {
    console.log(
      `  ${String(r.clicks).padStart(4)}click / ${String(r.impressions).padStart(
        5
      )}imp  ${r.keys[0]}`
    );
  }
}

// 6. Language prefix aggregate (from URL path)
const allPages = await query({
  startDate: start,
  endDate: end,
  dimensions: ["page"],
  rowLimit: 5000,
});
const langAgg = {};
for (const r of allPages.rows || []) {
  const path = r.keys[0].replace(SITE_URL.replace(/\/$/, ""), "");
  const m = path.match(/^\/([a-z-]+)(\/|$)/);
  const lang = m ? m[1] : "(root)";
  if (!langAgg[lang]) langAgg[lang] = { clicks: 0, impressions: 0 };
  langAgg[lang].clicks += r.clicks;
  langAgg[lang].impressions += r.impressions;
}
console.log(`\n■ 言語別 (URLパスから集計)`);
const langSorted = Object.entries(langAgg).sort((a, b) => b[1].clicks - a[1].clicks);
for (const [lang, v] of langSorted) {
  console.log(
    `  ${String(v.clicks).padStart(4)}click / ${String(v.impressions).padStart(5)}imp  /${lang}`
  );
}

console.log();
