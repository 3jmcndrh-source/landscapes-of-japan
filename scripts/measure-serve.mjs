#!/usr/bin/env node
/**
 * 計測用の隔離配信サーバ (開発用。out/ には入らない)。
 *
 *   node scripts/measure-serve.mjs --port 8901 --root out --kbps 2000 --rtt 150 --log a.log
 *   node scripts/measure-serve.mjs --port 8901 --root out --kbps 2000 --calibrate
 *
 * なぜ自前で用意するか:
 *   ブラウザ側の開発者ツールの数字ではなく、**サーバが実際に流したバイト数**で
 *   裏を取るため。中止したときに本当に送信が止まったかも、ここで分かる。
 *
 * 2026-09-09 の訂正 (3回作り直して、最後に実測で合わせた):
 *   1. 前身 (scratchpad/serve2.mjs) は token bucket の起点をモジュール読み込み時に
 *      置いていたため、最初の1回だけ1秒ぶんのトークンが溜まった状態で始まった
 *      (2,000,000 B/s 設定で 20MiB が 理想10.49秒 → 実測9.55秒)。
 *   2. 絶対時刻の予定表に変えたら、今度は**空いていた時間が貯金になり**、
 *      ページ読み込みや入力の待ち時間のあとで一気に流れた (9% を 8.7秒)。
 *   3. 「いつまで塞がっているか」だけを持つ形にしたら、今度は setTimeout の
 *      寝坊のたびに予定を捨ててしまい 9.4% 遅くなった。
 *   → 寝坊 (250ms以内) は予定を捨てず、本当のアイドルだけ引き直す形に落ち着いた。
 *
 *   **設定値をそのまま信じず、必ず --calibrate か実ファイルで実効速度を確かめること。**
 *   最終確認 (2,000 kbit/s = 250,000 B/s 設定、8.48MB のファイル):
 *     起動直後 249,535 B/s / 60秒アイドル後 249,586 B/s / 並列2本 合計 250,268 B/s
 *
 * 帯域と遅延の意味 (取り違えないこと):
 *   --kbps  kbit/s (1000 bit/s 単位)。**サーバ全体で1つ**の予定表を共有する。
 *           接続ごと・リクエストごとの制限ではない。
 *   --rtt   応答の**1バイト目を遅らせる時間 (ms)**。往復1回ぶんを一度に足したもので、
 *           TCP のハンドシェイクや slow start、ACK ごとの往復までは再現しない。
 *           ネットワークの RTT そのものではない。
 *
 * 制限の対象は**このサーバが返すものだけ**。写真は外部CDNから来るので制限を受けない。
 * ページ全体の実効回線の再現ではない。
 */
import { createServer } from "node:http";
import { createHash } from "node:crypto";
import { readFileSync, statSync, existsSync, appendFileSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d; };
const has = (n) => args.includes(`--${n}`);
const ROOT = path.resolve(opt("root", "out"));
const PORT = Number(opt("port", 8901));
const KBPS = Number(opt("kbps", 0));
const RTT = Number(opt("rtt", 0));
const BURST = Number(opt("burst", 0));      /* 既定は初期バースト無し */
const LOG = opt("log", "");
const BYTES_PER_SEC = KBPS ? (KBPS * 1000) / 8 : 0;

const CSP =
  "default-src 'self'; " +
  "img-src 'self' landscapes-images.pages.dev res.cloudinary.com images.unsplash.com www.google-analytics.com www.googletagmanager.com c.clarity.ms c.bing.com data:; " +
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' www.clarity.ms scripts.clarity.ms www.googletagmanager.com static.cloudflareinsights.com; " +
  "style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; " +
  "connect-src 'self' formspree.io raw.githubusercontent.com api.open-meteo.com *.clarity.ms c.bing.com cloudflareinsights.com www.googletagmanager.com www.google-analytics.com *.google-analytics.com *.analytics.google.com; " +
  "frame-ancestors 'none'";

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".mjs": "application/javascript",
  ".css": "text/css; charset=utf-8", ".json": "application/json", ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg",
  ".svg": "image/svg+xml", ".ico": "image/x-icon", ".wasm": "application/wasm",
  ".woff2": "font/woff2", ".bin": "application/octet-stream", ".gz": "application/gzip",
};

/* ---- サーバ全体で1つの帯域 ----
   「回線がいつまで塞がっているか」だけを持つ。
   n バイトを流すと busyUntil が n/レート だけ先へ進み、そこまで待つ。
   予定はサーバ全体で1つ = 何本流しても合計が上限を超えない。
   空いていた時間を貯金にしない (貯金にすると待ち時間のあとで一気に流れる)。 */
const IDLE_MS = 250;   /* これを超えて空いていたら、本当のアイドルとみなす */
const pacer = { busyUntil: 0, credit: BURST };
async function take(n) {
  if (!BYTES_PER_SEC) return;
  const now = Date.now();
  /* 回線が空いていた時間を「貯金」にしない。
     絶対時刻で予定を積むだけだと、待ち時間 (ページ読み込み・入力中) のぶんまで
     貯まって、あとで一気に流れてしまう。実際 9% を 8.7秒 で流していた。
     「いつまで塞がっているか」だけを持ち、空いていたら今から数える。 */
  /* ただし setTimeout は必ず数ms寝坊する。寝坊のたびに「空いていた」と見なして
     予定を捨てると、その分だけ実効速度が落ちる (実測で 9.4% 遅くなった)。
     本当に空いていた場合 (IDLE_MS 超) だけ引き直す。 */
  if (pacer.busyUntil < now - IDLE_MS) pacer.busyUntil = now;
  let bytes = n;
  if (pacer.credit > 0) {                    /* 初期バーストぶんは待たない (既定 0) */
    const used = Math.min(pacer.credit, bytes);
    pacer.credit -= used;
    bytes -= used;
  }
  pacer.busyUntil += (bytes / BYTES_PER_SEC) * 1000;
  const wait = pacer.busyUntil - now;
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
}

const etags = new Map();
const etagFor = (f) => {
  if (!etags.has(f)) {
    const st = statSync(f);
    etags.set(f, `"${createHash("md5").update(`${f}:${st.size}:${st.mtimeMs}`).digest("hex")}"`);
  }
  return etags.get(f);
};

const tally = { total: 0, reqs: 0, byPath: new Map(), first: 0, last: 0 };

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]).replace(/\/+$/, "") || "/index";
  const base = path.join(ROOT, clean);
  for (const c of [base, `${base}.html`, path.join(base, "index.html")]) {
    if (existsSync(c) && statSync(c).isFile()) return c;
  }
  return null;
}

async function send(res, buf) {
  if (!BYTES_PER_SEC) { res.end(buf); return buf.length; }
  const slice = Math.max(2048, Math.floor(BYTES_PER_SEC / 20));
  let sent = 0;
  for (let at = 0; at < buf.length; at += slice) {
    if (res.destroyed) return sent;
    const part = buf.subarray(at, Math.min(at + slice, buf.length));
    await take(part.length);
    if (res.destroyed) return sent;
    if (!res.write(part)) await new Promise((r) => res.once("drain", r));
    sent += part.length;
  }
  res.end();
  return sent;
}

createServer(async (req, res) => {
  const key = req.url.split("?")[0];
  const line = (status, bytes) => {
    tally.reqs++;
    if (bytes) {
      tally.total += bytes;
      tally.byPath.set(key, (tally.byPath.get(key) || 0) + bytes);
      if (!tally.first) tally.first = Date.now();
      tally.last = Date.now();
    }
    if (LOG) appendFileSync(LOG, `${new Date().toISOString()}\t${status}\t${bytes}\t${req.url}\n`);
  };

  if (key === "/__tally") {
    const secs = tally.first ? (tally.last - tally.first) / 1000 : 0;
    const body = JSON.stringify({
      total: tally.total, reqs: tally.reqs,
      spanSec: +secs.toFixed(3),
      observedBps: secs > 0 ? Math.round(tally.total / secs) : null,
      byPath: Object.fromEntries(tally.byPath),
    }, null, 2);
    if (req.url.includes("reset")) { tally.total = 0; tally.reqs = 0; tally.byPath.clear(); tally.first = 0; tally.last = 0; }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(body);
    return;
  }

  const file = resolveFile(req.url);
  if (!file) { res.writeHead(404, { "Content-Type": "text/plain" }); res.end("not found"); line(404, 0); return; }

  if (RTT) await new Promise((r) => setTimeout(r, RTT));
  if (res.destroyed) { line("ABORT-RTT", 0); return; }

  const ext = path.extname(file).toLowerCase();
  const tag = etagFor(file);
  /* public/_headers と同じ規則 */
  const long = key.startsWith("/models/") || /^\/ort\/.*\.wasm$/.test(key);
  const headers = {
    "Content-Type": TYPES[ext] || "application/octet-stream",
    "Content-Security-Policy": CSP,
    "X-Content-Type-Options": "nosniff",
    ETag: tag,
    "Cache-Control": long ? "public, max-age=2592000"
      : ext === ".html" ? "public, max-age=0, must-revalidate"
        : "public, max-age=14400, must-revalidate",
  };

  if (req.headers["if-none-match"] === tag) { res.writeHead(304, headers); res.end(); line(304, 0); return; }

  const buf = readFileSync(file);
  res.writeHead(200, { ...headers, "Content-Length": String(buf.length) });
  if (req.method === "HEAD") { res.end(); line(200, 0); return; }
  res.on("close", () => { if (!res.writableEnded) process.stdout.write(`ABORTED ${req.url}\n`); });
  line(200, await send(res, buf));
}).listen(PORT, async () => {
  console.log(`serving ${ROOT} on http://localhost:${PORT}`);
  console.log(`  帯域: ${KBPS ? `${KBPS} kbit/s (= ${Math.round(BYTES_PER_SEC).toLocaleString()} B/s) サーバ全体で共有` : "無制限"}`);
  console.log(`  初期バースト: ${BURST ? `${BURST.toLocaleString()} B` : "なし"}`);
  console.log(`  遅延: ${RTT ? `応答の1バイト目を ${RTT} ms 遅らせる (ネットワークRTTそのものではない)` : "なし"}`);

  if (has("calibrate")) {
    /* 既知のバイト数で、単独1本と並列2本を測る */
    const pick = (p) => (existsSync(path.join(ROOT, p)) ? p : null);
    const target = pick("/models/mclip/model.onnx.000.gz") || pick("/models/mclip/model.onnx.000");
    if (!target) { console.log("  校正: 対象ファイルが無い"); return; }
    const bytes = statSync(path.join(ROOT, target)).size;
    const fetchOne = async (q) => {
      const t0 = Date.now();
      const r = await fetch(`http://localhost:${PORT}${target}?c=${q}`);
      const b = await r.arrayBuffer();
      return { ms: Date.now() - t0, bytes: b.byteLength };
    };
    console.log(`\n  校正対象 ${target}`);
    console.log(`    実バイト数 ${bytes.toLocaleString()} B = ${(bytes / 1048576).toFixed(2)} MiB = ${(bytes / 1e6).toFixed(2)} MB(十進)`);
    const one = await fetchOne(1);
    console.log(`    単独1本   ${(one.ms / 1000).toFixed(2)} s → ${Math.round(one.bytes / (one.ms / 1000)).toLocaleString()} B/s ` +
      `(理想 ${(bytes / BYTES_PER_SEC).toFixed(2)} s)`);
    const t1 = Date.now();
    const two = await Promise.all([fetchOne(2), fetchOne(3)]);
    const wall = (Date.now() - t1) / 1000;
    const sum = two[0].bytes + two[1].bytes;
    console.log(`    並列2本   ${wall.toFixed(2)} s で ${sum.toLocaleString()} B → ${Math.round(sum / wall).toLocaleString()} B/s ` +
      `(理想 ${(sum / BYTES_PER_SEC).toFixed(2)} s)`);
    console.log(`    → 並列にしても合計速度が変わらなければ、サーバ全体で共有できている`);
  }
});
