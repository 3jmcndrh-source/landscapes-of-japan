#!/usr/bin/env node
/**
 * 1. siteVerification.webResource.insert — verify domain ownership via DNS TXT
 * 2. searchconsole.sites.add — add Domain property to GSC
 * 3. Submit sitemap
 */
import crypto from "node:crypto";
import { readFileSync, existsSync } from "node:fs";

const DOMAIN = "landscapes-of-japan.com";
const SITE_DOMAIN = `sc-domain:${DOMAIN}`;
const SITEMAP_URL = `https://${DOMAIN}/sitemap.xml`;
const KEY_PATH = process.env.GSC_KEY_PATH || "./gsc-service-account.json";

if (!existsSync(KEY_PATH)) { console.error(`✗ Key not found`); process.exit(1); }
const key = JSON.parse(readFileSync(KEY_PATH, "utf8"));

const b64u = (x) => Buffer.from(x).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

async function getToken(scope) {
  const now = Math.floor(Date.now() / 1000);
  const claims = { iss: key.client_email, scope, aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now };
  const unsigned = `${b64u(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64u(JSON.stringify(claims))}`;
  const sig = crypto.sign("RSA-SHA256", Buffer.from(unsigned), key.private_key);
  const jwt = `${unsigned}.${b64u(sig)}`;
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
  });
  const d = await r.json();
  if (!d.access_token) throw new Error(`OAuth failed: ${JSON.stringify(d)}`);
  return d.access_token;
}

// 1. Verify via siteVerification API
console.log(`[1/3] Verifying ${DOMAIN} via DNS_TXT ...`);
const verifyTok = await getToken("https://www.googleapis.com/auth/siteverification");
const verifyRes = await fetch(
  `https://www.googleapis.com/siteVerification/v1/webResource?verificationMethod=DNS_TXT`,
  {
    method: "POST",
    headers: { Authorization: `Bearer ${verifyTok}`, "Content-Type": "application/json" },
    body: JSON.stringify({ site: { identifier: DOMAIN, type: "INET_DOMAIN" } }),
  }
);
const verifyText = await verifyRes.text();
console.log(`    HTTP ${verifyRes.status}: ${verifyText.substring(0, 400)}`);
if (verifyRes.status !== 200) { console.error("✗ Verification failed"); process.exit(1); }

// 2. Add to Search Console
console.log(`[2/3] Adding ${SITE_DOMAIN} to Search Console ...`);
const wmTok = await getToken("https://www.googleapis.com/auth/webmasters");
const addRes = await fetch(
  `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_DOMAIN)}`,
  { method: "PUT", headers: { Authorization: `Bearer ${wmTok}` } }
);
console.log(`    HTTP ${addRes.status} ${addRes.status === 200 || addRes.status === 204 ? "✓" : await addRes.text()}`);

// 3. Submit sitemap
console.log(`[3/3] Submitting sitemap ${SITEMAP_URL} ...`);
const smRes = await fetch(
  `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_DOMAIN)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`,
  { method: "PUT", headers: { Authorization: `Bearer ${wmTok}` } }
);
console.log(`    HTTP ${smRes.status} ${smRes.status === 200 || smRes.status === 204 ? "✓ Sitemap submitted!" : await smRes.text()}`);
