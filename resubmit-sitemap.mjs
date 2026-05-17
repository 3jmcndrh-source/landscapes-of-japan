#!/usr/bin/env node
/**
 * Resubmit the sitemap to Google Search Console via API.
 * Usage:  node resubmit-sitemap.mjs
 * Requires: gsc-service-account.json (gitignored) in project root,
 *           or GSC_KEY_PATH env var pointing to the JSON key file.
 * Setup: see SETUP-GSC-API.md
 */
import crypto from "node:crypto";
import { readFileSync, existsSync } from "node:fs";

const SITE_URL = "https://landscapes-of-japan.com/";
const SITEMAP_URL = "https://landscapes-of-japan.com/sitemap.xml";
const KEY_PATH = process.env.GSC_KEY_PATH || "./gsc-service-account.json";

if (!existsSync(KEY_PATH)) {
  console.error(`✗ Service account key not found at: ${KEY_PATH}`);
  console.error(`  Set GSC_KEY_PATH env var or place gsc-service-account.json in project root.`);
  console.error(`  See SETUP-GSC-API.md for one-time setup.`);
  process.exit(1);
}

const key = JSON.parse(readFileSync(KEY_PATH, "utf8"));

const b64u = (x) =>
  Buffer.from(x).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

const now = Math.floor(Date.now() / 1000);
const header = { alg: "RS256", typ: "JWT" };
const claims = {
  iss: key.client_email,
  scope: "https://www.googleapis.com/auth/webmasters",
  aud: "https://oauth2.googleapis.com/token",
  exp: now + 3600,
  iat: now,
};
const unsigned = `${b64u(JSON.stringify(header))}.${b64u(JSON.stringify(claims))}`;
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
  console.error("✗ OAuth token fetch failed:", tok);
  process.exit(1);
}

const submitUrl = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
  SITE_URL
)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`;
const r = await fetch(submitUrl, {
  method: "PUT",
  headers: { Authorization: `Bearer ${tok.access_token}` },
});

if (r.status === 200 || r.status === 204) {
  console.log(`✓ Sitemap resubmitted: ${SITEMAP_URL}`);
  console.log(`  Google will re-crawl within minutes to hours.`);
} else {
  const body = await r.text();
  console.error(`✗ Submit failed: HTTP ${r.status}`);
  console.error(body);
  process.exit(1);
}
