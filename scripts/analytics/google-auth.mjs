/**
 * Google サービスアカウントの JWT → アクセストークン。
 * gsc-verify-and-add.mjs と同じ自前実装 (依存ライブラリを増やさないため)。
 */
import crypto from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const key = JSON.parse(readFileSync(path.join(ROOT, "gsc-service-account.json"), "utf-8"));
const b64u = (s) => Buffer.from(s).toString("base64url");

export const PROJECT_ID = key.project_id;
export const CLIENT_EMAIL = key.client_email;

export async function getToken(scope) {
  const now = Math.floor(Date.now() / 1000);
  const claims = { iss: key.client_email, scope, aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now };
  const unsigned = `${b64u(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64u(JSON.stringify(claims))}`;
  const sig = crypto.sign("RSA-SHA256", Buffer.from(unsigned), key.private_key);
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${b64u(sig)}` }),
  });
  const d = await r.json();
  if (!d.access_token) throw new Error(`OAuth failed: ${JSON.stringify(d)}`);
  return d.access_token;
}
