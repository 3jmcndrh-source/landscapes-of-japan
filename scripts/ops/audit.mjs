#!/usr/bin/env node
/**
 * サイト監査。ビルド済みの out/ をローカルで配信し (scripts/ops/serve.mjs)、そこに対してだけ確認する。
 * 本番 (landscapes-of-japan.com / landscapes-images.pages.dev) には一切アクセスしない。
 *
 *   node scripts/ops/audit.mjs --phase=http
 *       sitemap の全 URL の HTTP ステータス + scripts/check-links.mjs (全ページのリンク・画像の行き先)
 *   node scripts/ops/audit.mjs --phase=browser [--shard=auto|0..6|all] [--paths=/en,/ja/hokkaido | --paths=@file]
 *       Playwright で 390px と 1440px の2幅で開き、console error・ページのエラー・画像の読み込み失敗・
 *       横方向のはみ出し・alt の欠けを見る。--shard=auto は日本時間の曜日で全ページの 1/7 を選ぶ (1週間で全ページ)
 *   node scripts/ops/audit.mjs --phase=shots
 *       ops/shots.json の代表ページのスクリーンショットを撮り、ops-out/shots/baseline/ と比べる
 *       (基準画像の取得・更新は scripts/ops/visual.mjs)
 *
 * 共通: --port=4173  --concurrency=4  --max-minutes=25 (超えたら打ち切って、その旨を結果に書く)
 * 結果: ops-out/audit-{phase}.json  (集計と issue 用の整形は scripts/ops/report.mjs)
 *
 * 通信の扱い (ブラウザ):
 *   - localhost → そのまま
 *   - landscapes-images.pages.dev → 取りに行かず灰色の代替画像を返す。要求されたファイル名が
 *     公開済み画像の一覧 (ops/published-images.txt。手元では images-dist/) に無ければ「画像の読み込み失敗」
 *   - それ以外 (GA4・Clarity・天気 API など) → 遮断。監査の訪問が解析に数えられることもない
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { startServer } from "./serve.mjs";
import {
  OPS_OUT, OUT, IMG_HOST, ROOT, args, ensureDir, jstDate, jstWeekday, readJSON, shardOf, writeJSON, loadPublishedImages,
} from "./lib/common.mjs";

const a = args();
const phase = a.phase;
const PORT = Number(a.port) || 4173;
const CONC = Number(a.concurrency) || 4;
const MAX_MS = (Number(a["max-minutes"]) || 25) * 60000;
const t0 = Date.now();
ensureDir(OPS_OUT);

/* ---------- sitemap (out/ から読む。本番の sitemap は取りに行かない) ---------- */
function sitemapPaths() {
  const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const index = readFileSync(path.join(OUT, "sitemap.xml"), "utf-8");
  const paths = new Set();
  for (const sm of locs(index)) {
    const p = new URL(sm).pathname;
    const f = path.join(OUT, p);
    if (!existsSync(f)) { paths.add(`!missing-sitemap:${p}`); continue; }
    const xml = readFileSync(f, "utf-8");
    if (xml.includes("<urlset")) for (const u of locs(xml)) paths.add(new URL(u).pathname);
  }
  return [...paths];
}

async function pool(items, n, fn) {
  let i = 0, stopped = false;
  const workers = Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) {
      if (Date.now() - t0 > MAX_MS) { stopped = true; return; }
      const idx = i++;
      await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return { truncated: stopped, done: Math.min(i, items.length) };
}

const result = { phase, date: jstDate(), startedAt: new Date().toISOString(), checked: 0, findings: [], notes: [] };
const finding = (f) => result.findings.push(f);

/* ---------- http ---------- */
async function phaseHttp(origin) {
  const paths = sitemapPaths();
  for (const p of paths.filter((x) => x.startsWith("!missing-sitemap:"))) finding({ kind: "http", path: p.slice(17), status: 404, detail: "sitemap の目次にある子 sitemap が out/ に無い" });
  const targets = paths.filter((x) => !x.startsWith("!"));
  const r = await pool(targets, 16, async (p) => {
    let res;
    for (let tryNo = 0; tryNo < 3 && !res; tryNo++) {
      try { res = await fetch(origin + p, { method: "HEAD", redirect: "manual" }); await res.arrayBuffer(); }
      catch (e) { if (tryNo === 2) { finding({ kind: "http", path: p, status: 0, detail: `ローカルサーバに接続できない: ${e.cause?.code || e.message}` }); return; } res = null; }
    }
    result.checked++;
    if (res.status !== 200) finding({ kind: "http", path: p, status: res.status, detail: res.headers.get("location") ? `転送先 ${res.headers.get("location")}` : "" });
  });
  result.urls = targets.length;
  if (r.truncated) result.notes.push(`時間切れで ${targets.length - r.done} URL を確認できなかった`);

  // 全ページのリンク・画像の行き先 (既存の検査をそのまま使う)
  const json = path.join(OPS_OUT, "links.json");
  const lc = spawnSync(process.execPath, ["scripts/check-links.mjs", "--json", json], { cwd: ROOT, encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 });
  result.linkCheck = { exit: lc.status, summary: (lc.stdout || "").split("\n").slice(0, 4).join("\n") };
  const L = readJSON(json, null);
  if (!L) { finding({ kind: "link-check-failed", path: "-", detail: (lc.stderr || "").slice(0, 500) }); return; }
  const fromMap = (kind, m) => { for (const [target, v] of Object.entries(m || {})) finding({ kind, path: v.from?.[0] || "-", target, count: v.n, samples: v.from || [] }); };
  fromMap("link", L.broken);
  fromMap("link-client", L.clientBroken);
  fromMap("link-meta", L.metaBroken);
  fromMap("image-missing", L.brokenImg);
  for (const p of L.noindexInSitemap || []) finding({ kind: "noindex", path: p, detail: "sitemap に載っているのに noindex" });
}

/* ---------- ブラウザ共通 ---------- */
const GRAY_PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVR4nGNoaAAAAoIBgXpmBJYAAAAASUVORK5CYII=", "base64");
const IGNORE = (readJSON(path.join(ROOT, "ops/audit-ignore.json"), { console: [] }).console || []).map((x) => new RegExp(x.pattern));
const SHOTS = readJSON(path.join(ROOT, "ops/shots.json"));
const published = loadPublishedImages();
if (!published.set && phase !== "http") result.notes.push("公開済み画像の一覧が無いので、画像の有無は確かめていない");

async function launch() {
  const { chromium } = await import("playwright");
  return chromium.launch({ args: ["--disable-dev-shm-usage"] });
}

async function newContext(browser, vp, origin, { stable = false } = {}) {
  const v = SHOTS.viewports[vp];
  const ctx = await browser.newContext({
    viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1,
    isMobile: !!v.isMobile, hasTouch: !!v.hasTouch, locale: "en-US", timezoneId: "Asia/Tokyo",
    reducedMotion: stable ? "reduce" : "no-preference", serviceWorkers: "block",
  });
  const hostOf = (u) => { try { return new URL(u).host; } catch { return ""; } };
  const local = hostOf(origin);
  ctx.__external = new Map();
  ctx.__missingImg = [];
  await ctx.route("**/*", async (route) => {
    const req = route.request();
    const host = hostOf(req.url());
    if (host === local) return route.continue();
    if (host === IMG_HOST) {
      const name = decodeURIComponent(new URL(req.url()).pathname.slice(1));
      if (published.set && !published.set.has(name)) ctx.__missingImg.push({ name, page: req.frame()?.url?.() || "" });
      return route.fulfill({ status: 200, contentType: "image/png", body: GRAY_PNG });
    }
    ctx.__external.set(host, (ctx.__external.get(host) || 0) + 1);
    return route.abort("blockedbyclient");
  });
  if (stable) {
    // 日付・乱数を固定し、動きを止める (毎日の差分が「日替わりの写真」などで誤検知されないように)
    await ctx.clock.setFixedTime(new Date(SHOTS.fixedTime));
    await ctx.addInitScript(() => {
      let s = 20260115;
      Math.random = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    });
  }
  return ctx;
}

/** ページの中で: 横方向のはみ出しと、その原因の要素・alt の無い画像・読み込めなかったローカル画像 */
function inspectInPage() {
  const W = document.documentElement.clientWidth;
  const sel = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.id) s += "#" + el.id;
    const c = [...el.classList].slice(0, 2).join(".");
    if (c) s += "." + c;
    return s;
  };
  const clipsX = (el) => { const o = getComputedStyle(el).overflowX; return o === "hidden" || o === "auto" || o === "scroll" || o === "clip"; };
  let overflow = null;
  const sw = document.documentElement.scrollWidth;
  if (sw > W + 1) {
    const offenders = [];
    for (const el of document.body.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || (r.right <= W + 1 && r.left >= -1)) continue;
      let p = el.parentElement, clipped = false;
      while (p && p !== document.body) { if (clipsX(p)) { clipped = true; break; } p = p.parentElement; }
      if (clipped || getComputedStyle(el).position === "fixed") continue;
      if (offenders.some((o) => o.el.contains(el))) continue;
      offenders.push({ el, right: Math.round(r.right), left: Math.round(r.left) });
      if (offenders.length >= 3) break;
    }
    overflow = { scrollWidth: sw, width: W, offenders: offenders.map((o) => ({ selector: sel(o.el), left: o.left, right: o.right })) };
  }
  const imgs = [...document.querySelectorAll("img")];
  const noAlt = imgs.filter((i) => !i.hasAttribute("alt") && i.getAttribute("aria-hidden") !== "true").map((i) => (i.currentSrc || i.src || "").split("/").pop()).slice(0, 5);
  const brokenLocal = imgs.filter((i) => i.complete && i.naturalWidth === 0 && i.src.startsWith(location.origin)).map((i) => i.src.replace(location.origin, "")).slice(0, 5);
  return { overflow, noAlt, noAltCount: imgs.filter((i) => !i.hasAttribute("alt") && i.getAttribute("aria-hidden") !== "true").length, brokenLocal };
}

/* ---------- browser ---------- */
function choosePaths() {
  if (a.paths) {
    const raw = String(a.paths).startsWith("@") ? readFileSync(String(a.paths).slice(1), "utf-8") : String(a.paths);
    return raw.split(/[\s,]+/).filter(Boolean);
  }
  const all = sitemapPaths().filter((x) => !x.startsWith("!"));
  const shard = a.shard === undefined || a.shard === "auto" ? jstWeekday() : a.shard;
  result.shard = shard;
  return shard === "all" ? all : all.filter((p) => shardOf(p) === Number(shard));
}

async function phaseBrowser(origin) {
  const paths = choosePaths();
  result.paths = paths.length;
  const browser = await launch();
  try {
    for (const vp of Object.keys(SHOTS.viewports)) {
      const ctx = await newContext(browser, vp, origin);
      const pages = await Promise.all(Array.from({ length: CONC }, () => ctx.newPage()));
      const free = [...pages];
      const r = await pool(paths, CONC, async (p) => {
        const page = free.pop();
        const errors = [];
        const onConsole = (m) => {
          if (m.type() !== "error") return;
          const text = m.text();
          if (IGNORE.some((re) => re.test(text))) return;
          // ローカルの 404 は asset-404 として別に数えるので、console の同じ知らせは重ねない
          if (text.startsWith("Failed to load resource") && (m.location()?.url || "").startsWith(origin)) return;
          errors.push({ kind: "console", text: text.slice(0, 300), url: m.location()?.url || "" });
        };
        const onPageError = (e) => errors.push({ kind: "pageerror", text: String(e.message || e).slice(0, 300) });
        const onResponse = (res) => {
          if (res.status() >= 400 && res.url().startsWith(origin) && res.url() !== origin + p) errors.push({ kind: "asset-404", text: `${res.status()} ${res.url().replace(origin, "")}` });
        };
        page.on("console", onConsole); page.on("pageerror", onPageError); page.on("response", onResponse);
        try {
          const res = await page.goto(origin + p, { waitUntil: "load", timeout: 30000 });
          await page.waitForTimeout(400);
          if (res && res.status() !== 200) finding({ kind: "http", path: p, viewport: vp, status: res.status() });
          const info = await page.evaluate(inspectInPage);
          if (info.overflow) finding({ kind: "overflow", path: p, viewport: vp, detail: info.overflow });
          if (info.noAltCount) finding({ kind: "alt-missing", path: p, viewport: vp, count: info.noAltCount, samples: info.noAlt });
          for (const b of info.brokenLocal) finding({ kind: "asset-404", path: p, viewport: vp, text: `img ${b}` });
        } catch (e) {
          finding({ kind: "load-failed", path: p, viewport: vp, detail: String(e.message).split("\n")[0].slice(0, 200) });
        }
        for (const er of errors) finding({ ...er, path: p, viewport: vp });
        const mine = ctx.__missingImg.filter((m) => m.page.startsWith(origin + p) && (m.page.length === (origin + p).length || "?#".includes(m.page[(origin + p).length])));
        for (const m of new Set(mine.map((x) => x.name))) finding({ kind: "image-missing", path: p, viewport: vp, target: m });
        ctx.__missingImg = ctx.__missingImg.filter((m) => !mine.includes(m));
        page.off("console", onConsole); page.off("pageerror", onPageError); page.off("response", onResponse);
        result.checked++;
        free.push(page);
      });
      if (r.truncated) result.notes.push(`${vp}: 時間切れで ${paths.length - r.done} ページを確認できなかった`);
      result.external = Object.fromEntries([...(result.external ? Object.entries(result.external) : []), ...ctx.__external]);
      await ctx.close();
    }
  } finally { await browser.close(); }
}

/* ---------- shots ---------- */
export function shotList() {
  const { LANGS_LIST, PHOTO_LIST } = langLists();
  const list = [];
  for (const pg of SHOTS.pages) {
    for (const lang of pg.photoOnly ? PHOTO_LIST : LANGS_LIST) {
      for (const vp of Object.keys(SHOTS.viewports)) list.push({ id: `${lang}__${pg.name}__${vp}`, path: pg.path.replace("{lang}", lang), name: pg.name, lang, vp });
    }
  }
  return list;
}
function langLists() {
  const src = readFileSync(path.join(ROOT, "app/i18n-meta.js"), "utf-8");
  const pick = (name) => JSON.parse(src.match(new RegExp(`export const ${name} = (\\[[^\\]]+\\])`))[1].replace(/'/g, '"'));
  return { LANGS_LIST: pick("LANGS"), PHOTO_LIST: pick("PHOTO_LANGS") };
}

async function phaseShots(origin) {
  const { PNG } = await import("pngjs");
  const pixelmatch = (await import("pixelmatch")).default;
  const dirs = { cur: path.join(OPS_OUT, "shots/current"), base: path.join(OPS_OUT, "shots/baseline"), diff: path.join(OPS_OUT, "shots/diff") };
  for (const d of Object.values(dirs)) mkdirSync(d, { recursive: true });
  const list = shotList();
  result.shots = list.length;
  result.newShots = [];
  result.changed = [];
  const browser = await launch();
  try {
    for (const vp of Object.keys(SHOTS.viewports)) {
      const ctx = await newContext(browser, vp, origin, { stable: true });
      const items = list.filter((s) => s.vp === vp);
      const r = await pool(items, CONC, async (s) => {
        const page = await ctx.newPage();
        try {
          const res = await page.goto(origin + s.path, { waitUntil: "load", timeout: 30000 });
          if (!res || res.status() !== 200) { finding({ kind: "shot-missing", path: s.path, viewport: vp, status: res?.status() }); return; }
          await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important;scroll-behavior:auto!important}" });
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(500);
          const h = await page.evaluate(() => document.documentElement.scrollHeight);
          const W = SHOTS.viewports[vp].width;
          const buf = await page.screenshot({ fullPage: true, clip: { x: 0, y: 0, width: W, height: Math.min(h, SHOTS.maxHeight) }, animations: "disabled" });
          writeFileSync(path.join(dirs.cur, `${s.id}.png`), buf);
          const bp = path.join(dirs.base, `${s.id}.png`);
          if (!existsSync(bp)) { result.newShots.push(s.id); return; }
          const A = PNG.sync.read(readFileSync(bp)), B = PNG.sync.read(buf);
          let ratio, dims = null;
          if (A.width !== B.width || A.height !== B.height) {
            ratio = 1; dims = `${A.width}x${A.height} → ${B.width}x${B.height}`;
            // 高さだけ変わった場合も、重なる部分の差を出しておく (原因の見当を付けやすくする)
          } else {
            const D = new PNG({ width: A.width, height: A.height });
            const n = pixelmatch(A.data, B.data, D.data, A.width, A.height, { threshold: 0.1 });
            ratio = n / (A.width * A.height);
            if (ratio > SHOTS.diffThreshold) writeFileSync(path.join(dirs.diff, `${s.id}.png`), PNG.sync.write(D));
          }
          if (ratio > SHOTS.diffThreshold) {
            result.changed.push(s.id);
            finding({ kind: "visual", path: s.path, viewport: vp, shot: s.id, name: s.name, ratio: Math.round(ratio * 10000) / 100, dims });
          }
        } catch (e) {
          finding({ kind: "load-failed", path: s.path, viewport: vp, detail: String(e.message).split("\n")[0].slice(0, 200) });
        } finally { await page.close(); result.checked++; }
      });
      if (r.truncated) result.notes.push(`${vp}: 時間切れでスクリーンショット ${items.length - r.done} 枚を撮れなかった`);
      await ctx.close();
    }
  } finally { await browser.close(); }
}

/* ---------- main ---------- */
if (!["http", "browser", "shots"].includes(phase)) {
  console.error("--phase=http|browser|shots を指定してください");
  process.exit(2);
}
if (!existsSync(OUT)) { console.error("out/ がありません。先に npm run build を実行してください"); process.exit(2); }
const { server, origin } = await startServer({ port: PORT });
try {
  if (phase === "http") await phaseHttp(origin);
  if (phase === "browser") await phaseBrowser(origin);
  if (phase === "shots") await phaseShots(origin);
} finally { server.close(); }
result.durationSec = Math.round((Date.now() - t0) / 1000);
result.publishedImages = published.source;
writeJSON(path.join(OPS_OUT, `audit-${phase}.json`), result);
const byKind = {};
for (const f of result.findings) byKind[f.kind] = (byKind[f.kind] || 0) + 1;
// 標準出力は短い要約だけ (セッションの文脈を食わないように)
console.log(JSON.stringify({ phase, checked: result.checked, durationSec: result.durationSec, findings: result.findings.length, byKind, notes: result.notes, shard: result.shard, newShots: result.newShots?.length, changed: result.changed?.length }, null, 1));
