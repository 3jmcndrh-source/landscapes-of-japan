#!/usr/bin/env node
/**
 * out/ (静的書き出し) を Cloudflare Pages と同じ規則で配信するローカルサーバ。
 * このサイトは output: "export" なので `next start` は使えない。監査はこのサーバに対してだけ行う。
 *
 *   node scripts/ops/serve.mjs [--port=4173]
 *
 * 再現している規則:
 *   - 拡張子なしの URL → {path}.html、ディレクトリ → index.html
 *   - public/_redirects の転送 (:lang などの名前付き部分と * )
 *   - public/_headers の「/*」に書かれたヘッダ (CSP を含む。CSP 違反も本番と同じく console に出る)
 *   - 無い URL は 404.html を 404 で返す
 */
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync, createReadStream } from "node:fs";
import path from "node:path";
import { OUT, args } from "./lib/common.mjs";

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".css": "text/css",
  ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff", ".wasm": "application/wasm",
  ".bin": "application/octet-stream", ".map": "application/json",
};

function loadRedirects(root) {
  const f = path.join(root, "_redirects");
  if (!existsSync(f)) return [];
  const out = [];
  for (const line of readFileSync(f, "utf-8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const [from, to, code] = t.split(/\s+/);
    if (!from || !to) continue;
    const re = new RegExp("^" + from.replace(/[.+?^${}()|[\]\\]/g, "\\$&")
      .replace(/:(\w+)/g, "(?<$1>[^/]+)").replace(/\*/g, "(?<splat>.*)") + "$");
    out.push({ re, to, code: Number(code) || 301 });
  }
  return out;
}

/** _headers のうち、パス「/*」の段落だけを読む (ホスト指定の段落やキャッシュ指定は監査に関係しない) */
function loadGlobalHeaders(root) {
  const f = path.join(root, "_headers");
  if (!existsSync(f)) return {};
  const h = {};
  let inGlobal = false;
  for (const line of readFileSync(f, "utf-8").split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    if (!/^\s/.test(line)) { inGlobal = line.trim() === "/*"; continue; }
    if (inGlobal) {
      const i = line.indexOf(":");
      if (i > 0) h[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return h;
}

function resolveFile(root, urlPath) {
  const clean = decodeURIComponent(urlPath).replace(/\/+$/, "") || "/";
  const base = path.join(root, clean);
  if (!base.startsWith(root)) return null; // ../ で外に出さない
  const cands = clean === "/" ? [path.join(root, "index.html")] : [base, base + ".html", path.join(base, "index.html")];
  for (const c of cands) {
    try { if (statSync(c).isFile()) return c; } catch { /* 次の候補 */ }
  }
  return null;
}

export function startServer({ port = 4173, root = OUT } = {}) {
  if (!existsSync(root)) throw new Error(`${root} がありません。先に npm run build を実行してください`);
  const redirects = loadRedirects(root);
  const headers = loadGlobalHeaders(root);
  const notFound = path.join(root, "404.html");

  const server = createServer((req, res) => {
    const u = new URL(req.url, "http://localhost");
    for (const r of redirects) {
      const m = u.pathname.match(r.re);
      if (!m) continue;
      let to = r.to;
      for (const [k, v] of Object.entries(m.groups || {})) to = to.replace(k === "splat" ? ":splat" : `:${k}`, v ?? "");
      res.writeHead(r.code, { Location: to + u.search });
      return res.end();
    }
    const file = resolveFile(root, u.pathname);
    const send = (status, f) => {
      res.writeHead(status, { ...headers, "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" });
      if (req.method === "HEAD") return res.end();
      createReadStream(f).pipe(res);
    };
    if (file) return send(200, file);
    if (existsSync(notFound)) return send(404, notFound);
    res.writeHead(404); res.end("not found");
  });
  return new Promise((ok, ng) => {
    server.once("error", ng);
    server.listen(port, "127.0.0.1", () => ok({ server, origin: `http://127.0.0.1:${port}` }));
  });
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
if (isMain) {
  const a = args();
  const { origin } = await startServer({ port: Number(a.port) || 4173 });
  console.log(`serving out/ at ${origin}`);
}
