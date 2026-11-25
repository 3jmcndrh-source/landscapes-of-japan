/**
 * 運用スクリプト (scripts/ops/) の共通部品。
 * 監査・状態管理・レポートのどれからも使う。外部ライブラリは使わない。
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
export const OUT = path.join(ROOT, "out");
/** 監査結果の置き場所 (gitignore 済み) */
export const OPS_OUT = path.join(ROOT, "ops-out");
export const IMG_HOST = "landscapes-images.pages.dev";
export const SITE_URL = "https://landscapes-of-japan.com";

export function ensureDir(d) { mkdirSync(d, { recursive: true }); return d; }
export function readJSON(p, fallback = null) {
  try { return JSON.parse(readFileSync(p, "utf-8")); } catch { return fallback; }
}
export function writeJSON(p, data) {
  ensureDir(path.dirname(p));
  writeFileSync(p, JSON.stringify(data, null, 2));
}

/** 日本時間の日付 "YYYY-MM-DD" (運用の「その日」は日本時間で数える) */
export function jstDate(d = new Date()) {
  return new Date(d.getTime() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}
/** 日本時間の曜日 0=日〜6=土 */
export function jstWeekday(d = new Date()) {
  return new Date(d.getTime() + 9 * 3600 * 1000).getUTCDay();
}

export function sha(s, n = 10) { return createHash("sha1").update(s).digest("hex").slice(0, n); }

/** URL のパスを 0〜(n-1) の組に固定的に割り当てる (毎日1組ずつ回すため) */
export function shardOf(p, n = 7) { return parseInt(sha(p, 8), 16) % n; }

const STATIC_PAGES = new Set(["album", "all-prefectures", "collections", "explore", "overview", "random", "search"]);
/**
 * パスをページの「型」にまとめる。同じ不具合が多数のページで出たとき、1件の issue にまとめるために使う。
 *   /en → /:lang  /en/hokkaido → /:lang/:pref  /en/hokkaido/biei → /:lang/:pref/:loc
 *   /en/hokkaido/biei/dsc… → /:lang/:pref/:loc/:photo  /en/collections/x → /:lang/collections/:slug
 */
export function routeTemplate(p) {
  const segs = p.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  if (segs.length === 0) return "/";
  if (segs.length === 1) return segs[0].includes(".") ? `/${segs[0]}` : "/:lang";
  const rest = segs.slice(1);
  if (rest.length === 1) return STATIC_PAGES.has(rest[0]) ? `/:lang/${rest[0]}` : (rest[0].includes(".") ? `/:lang/${rest[0]}` : "/:lang/:pref");
  if (rest[0] === "collections" || rest[0] === "gallery") return `/:lang/${rest[0]}/:slug`;
  if (rest.length === 2) return "/:lang/:pref/:loc";
  if (rest.length === 3) return "/:lang/:pref/:loc/:photo";
  return "/:lang/" + rest.map(() => ":x").join("/");
}

export function langOf(p) { return p.replace(/^\/+/, "").split("/")[0] || ""; }

/** 公開済み画像の一覧 (ops/published-images.txt)。images-dist/ がある手元ではそちらを優先 */
export function loadPublishedImages() {
  const dist = path.join(ROOT, "images-dist");
  if (existsSync(dist)) {
    return { source: "images-dist", set: new Set(readdirSyncSafe(dist)) };
  }
  const list = path.join(ROOT, "ops", "published-images.txt");
  if (existsSync(list)) {
    return { source: "ops/published-images.txt", set: new Set(readFileSync(list, "utf-8").split(/\r?\n/).filter(Boolean)) };
  }
  return { source: null, set: null };
}
function readdirSyncSafe(d) { try { return readdirSync(d); } catch { return []; } }

/** 引数 --key=value / --flag を読む */
export function args(argv = process.argv.slice(2)) {
  const o = { _: [] };
  for (const a of argv) {
    const m = a.match(/^--([^=]+)(?:=([\s\S]*))?$/); // 値に改行を含む JSON (--json="$(cat …)") も通す
    if (m) o[m[1]] = m[2] ?? true; else o._.push(a);
  }
  return o;
}
