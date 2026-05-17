#!/usr/bin/env node
/**
 * Get GSC Site Verification TXT token via Site Verification API.
 * Outputs the DNS TXT value to add at Cloudflare for landscapes-of-japan.com.
 */
import crypto from "node:crypto";
import { readFileSync, existsSync } from "node:fs";

const SITE = "landscapes-of-japan.com";
const KEY_PATH = process.env.GSC_KEY_PATH || "./gsc-service-account.json";

if (!existsSync(KEY_PATH)) {
  console.error(`✗ Service account key not found at: ${KEY_PATH}`);
  process.exit(1);
}
const key = JSON.parse(readFileSync(KEY_PATH, "utf8"));

const b64u = (x) =>
  Buffer.from(x).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

const now = Math.floor(Date.now() / 1000);
const header = { alg: "RS256", typ: "JWT" };
const claims = {
  iss: key.client_email,
  scope: "https://www.googleapis.com/auth/siteverification",
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
console.log("✓ Got OAuth token");

const url = `https://www.googleapis.com/siteVerification/v1/token?key=${encodeURIComponent(key.project_id || "")}`;
const body = {
  verificationMethod: "DNS_TXT",
  site: { identifier: SITE, type: "INET_DOMAIN" },
};

const r = await fetch("https://www.googleapis.com/siteVerification/v1/token", {
  method: "POST",
  headers: { Authorization: `Bearer ${tok.access_token}`, "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const text = await r.text();
console.log(`HTTP ${r.status}`);
console.log(text);
