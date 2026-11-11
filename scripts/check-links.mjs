#!/usr/bin/env node
/**
 * リンク切れの総当たり検査。ビルド後の out/ を実ファイルとして読む。
 *
 *   npm run build && node scripts/check-links.mjs [--json 出力先]
 *
 * 見るもの:
 *   1. 書き出された全 HTML の href / src / srcset
 *      - サイト内 (相対パス・自サイトの絶対URL) … out/ に行き先があるか
 *        (拡張子なしのURLは .html、ディレクトリは index.html、public/_redirects の転送も数える)
 *      - #見出し へのリンク … 行き先のページにその id があるか
 *      - 画像配信 (landscapes-images.pages.dev) … images-dist/ に同名のファイルがあるか
 *   2. HTML には出てこない、画面の中で組み立てるリンク
 *      (検索の候補・写真ビューアのURL・ランダム・ヘッダー・俯瞰ビュー など)
 *   3. sitemap / feed / robots.txt / manifest / llms.txt が指す行き先
 *   4. どこからもリンクされていないページ (入口が無いページ)
 *
 * check-pages.mjs は「主要な入口が壊れていないか」を数ページで見る点検。
 * こちらは全ページ・全リンクを数える。数分かかるのでビルドのたびには回さない。
 *
 * fatal (exit 1) = 実際に 404 になるリンク。note = 知らせるだけ。
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { LANGS, SITE_URL, PHOTO_LANGS } from "../app/i18n-meta.js";
import { PREFECTURES } from "../app/data.js";
import { PREF_SLUGS, LOC_SLUGS } from "../app/slugs.js";
import { COLLECTION_SLUGS } from "../app/collections-meta.js";
import { GALLERIES } from "../app/galleries.js";
import { photoPath, allPhotos } from "../app/photo-ref.js";
import { entryHref } from "../app/search-score.js";

const OUT = "out";
const DIST = "images-dist";
const IMG_HOST = "landscapes-images.pages.dev";
if (!existsSync(OUT)) { console.error("out/ がありません。先に npm run build を実行してください"); process.exit(1); }

/* ---------- out/ の実ファイル一覧 ---------- */
const files = new Set();
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else files.add(path.relative(OUT, p).replace(/\\/g, "/"));
  }
})(OUT);
const htmlFiles = [...files].filter((f) => f.endsWith(".html"));
const distFiles = existsSync(DIST) ? new Set(readdirSync(DIST)) : null;

/* ---------- public/_redirects (Cloudflare Pages) ---------- */
const redirects = [];
if (existsSync(path.join(OUT, "_redirects"))) {
  for (const line of readFileSync(path.join(OUT, "_redirects"), "utf-8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const [from, to] = t.split(/\s+/);
    if (!from || !to) continue;
    const re = new RegExp("^" + from.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/:(\w+)/g, "(?<$1>[^/]+)").replace(/\*/g, "(?<splat>.*)") + "$");
    redirects.push({ re, to });
  }
}
const redirectOf = (p) => {
  for (const r of redirects) {
    const m = p.match(r.re);
    if (m) return r.to.replace(/:(\w+)/g, (_, k) => m.groups?.[k] ?? "");
  }
  return null;
};

/** サイト内パス → out/ のファイル (無ければ null)。Cloudflare Pages の解決順に合わせる */
function resolvePath(p, depth = 0) {
  let clean = p.split("#")[0].split("?")[0];
  try { clean = decodeURIComponent(clean); } catch { /* そのまま */ }
  if (clean.length > 1 && clean.endsWith("/")) clean = clean.slice(0, -1);
  const rel = clean.replace(/^\//, "");
  if (rel === "") return files.has("index.html") ? "index.html" : (depth < 3 && redirectOf("/") ? resolvePath(redirectOf("/"), depth + 1) : null);
  if (files.has(rel)) return rel;
  if (files.has(rel + ".html")) return rel + ".html";
  if (files.has(rel + "/index.html")) return rel + "/index.html";
  const to = depth < 3 ? redirectOf(clean) : null;
  return to ? resolvePath(to, depth + 1) : null;
}

/* ---------- 1. 全 HTML を読む ---------- */
const ATTR = /\s(href|src|srcset|imagesrcset|poster|action)="([^"]*)"/gi;
const idsOf = new Map();          // file → Set(id)   (必要になったときだけ作る)
const getIds = (file) => {
  if (!idsOf.has(file)) {
    const html = readFileSync(path.join(OUT, file), "utf-8");
    idsOf.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsOf.get(file);
};

const broken = new Map();         // 行き先 → { n, from: [例] }
const brokenHash = new Map();
const brokenImg = new Map();
const external = new Map();       // host → 件数
const inbound = new Map();        // out のファイル → 参照されている回数 (他ページから)
const add = (map, key, from) => {
  const v = map.get(key) || { n: 0, from: [] };
  v.n++;
  if (v.from.length < 3 && !v.from.includes(from)) v.from.push(from);
  map.set(key, v);
};
let nLinks = 0, nInternal = 0, nImg = 0, nHash = 0;
const unescape = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

const t0 = Date.now();
htmlFiles.forEach((file, fi) => {
  const html = readFileSync(path.join(OUT, file), "utf-8");
  const self = "/" + file.replace(/\.html$/, "").replace(/\/index$/, "");
  for (const m of html.matchAll(ATTR)) {
    const attr = m[1].toLowerCase();
    const raw = unescape(m[2]).trim();
    if (!raw) continue;
    const urls = attr.endsWith("srcset") ? raw.split(",").map((s) => s.trim().split(/\s+/)[0]).filter(Boolean) : [raw];
    for (let u of urls) {
      nLinks++;
      if (/^(data:|mailto:|tel:|javascript:|blob:|about:)/i.test(u)) continue;
      if (u.startsWith(SITE_URL)) u = u.slice(SITE_URL.length) || "/";
      if (u.startsWith("//")) u = "https:" + u;
      if (/^https?:\/\//i.test(u)) {
        let url;
        try { url = new URL(u); } catch { add(broken, u, self); continue; }
        if (url.host === IMG_HOST) {
          nImg++;
          const name = decodeURIComponent(url.pathname.replace(/^\//, ""));
          if (!name) continue;   /* <link rel="preconnect"> など、ホストだけを指す参照 */
          if (distFiles && !distFiles.has(name)) add(brokenImg, name, self);
        } else external.set(url.host, (external.get(url.host) || 0) + 1);
        continue;
      }
      if (u.startsWith("#")) {
        nHash++;
        const id = u.slice(1);
        if (id && !getIds(file).has(id)) add(brokenHash, `${self}#${id}`, self);
        continue;
      }
      if (!u.startsWith("/")) {
        /* 相対パス (このサイトでは使っていないはず) */
        add(broken, `(相対) ${u}`, self);
        continue;
      }
      nInternal++;
      const target = resolvePath(u);
      if (!target) { add(broken, u.split("#")[0], self); continue; }
      if (target !== file) inbound.set(target, (inbound.get(target) || 0) + 1);
      const hash = u.includes("#") ? u.split("#")[1] : "";
      if (hash && target.endsWith(".html") && !getIds(target).has(hash)) add(brokenHash, `${u.split("?")[0].split("#")[0]}#${hash}`, self);
    }
  }
  if (fi % 2000 === 0 && fi) process.stdout.write(`  ${fi}/${htmlFiles.length}\r`);
});

/* ---------- 2. 画面の中で組み立てるリンク ---------- */
const clientBroken = new Map();
const need = (p, what) => { if (!resolvePath(p)) add(clientBroken, p, what); };
const photos = allPhotos();
for (const lang of LANGS) {
  for (const seg of ["", "/explore", "/collections", "/overview", "/album", "/search", "/random", "/all-prefectures"]) need(`/${lang}${seg}`, "上部バー・メニュー");
  for (const s of COLLECTION_SLUGS) need(`/${lang}/collections/${s}`, "コレクション");
  for (const g of GALLERIES) need(`/${lang}/gallery/${g.slug}`, "ギャラリー");
  for (const pf of PREFECTURES) if (pf.photos.length && PREF_SLUGS[pf.pref]) need(`/${lang}/${PREF_SLUGS[pf.pref]}`, "都道府県");
  for (const p of photos) {
    const href = photoPath(p.id, lang);       /* ビューアが履歴に積むURL・お気に入り・ランダム・今日の一枚 */
    if (href) need(href, "写真ビューア/ランダム");
    if (p.loc && LOC_SLUGS[p.loc] && PREF_SLUGS[p.pref]) need(`/${lang}/${PREF_SLUGS[p.pref]}/${LOC_SLUGS[p.loc]}`, "撮影地");
  }
}
/* 写真詳細ページは PHOTO_LANGS の言語にだけあるはず */
const strayPhoto = [];
for (const lang of LANGS) {
  if (PHOTO_LANGS.includes(lang)) continue;
  const p = photos.find((x) => x.loc && LOC_SLUGS[x.loc]);
  if (p && resolvePath(`/${lang}/${PREF_SLUGS[p.pref]}/${LOC_SLUGS[p.loc]}/${p.id}`)) strayPhoto.push(lang);
}
/* 検索の候補 */
let nSearch = 0;
if (files.has("search-index.json")) {
  const idx = JSON.parse(readFileSync(path.join(OUT, "search-index.json"), "utf-8"));
  for (const e of idx.entries) for (const lang of LANGS) { nSearch++; need(entryHref(e, lang), "検索の候補"); }
} else add(clientBroken, "/search-index.json", "検索");
/* 俯瞰ビュー・見た目検索のデータ */
for (const f of ["overview/data.json", "overview/atlas.webp", "search-vectors.bin", "search-phrases.bin", "sw.js", "manifest.json", "robots.txt"]) if (!files.has(f)) add(clientBroken, "/" + f, "データ");

/* ---------- 3. sitemap / feed / robots / manifest / llms ---------- */
const metaBroken = new Map();
const sitemapUrls = new Set();
const xmlFiles = [...files].filter((f) => f.endsWith(".xml"));
for (const f of xmlFiles) {
  const xml = readFileSync(path.join(OUT, f), "utf-8");
  for (const m of xml.matchAll(/<(?:loc|link)>([^<]+)<\/(?:loc|link)>|href="([^"]+)"/g)) {
    const u = unescape(m[1] || m[2]).trim();
    if (!u.startsWith(SITE_URL)) continue;
    const p = u.slice(SITE_URL.length) || "/";
    if (f.startsWith("sitemap")) sitemapUrls.add(p);
    if (!resolvePath(p)) add(metaBroken, p, f);
  }
}
for (const f of ["robots.txt", "llms.txt", "llms-full.txt", "llms-full-ja.txt", "ai.txt", "feed.json", "manifest.json"]) {
  if (!files.has(f)) continue;
  const txt = readFileSync(path.join(OUT, f), "utf-8");
  for (const m of txt.matchAll(new RegExp(SITE_URL.replace(/[.]/g, "\\.") + "([^\\s\"')<>\\]]*)", "g"))) {
    const p = (m[1] || "/").replace(/[.,;:`]+$/, "") || "/";
    if (p.includes("{")) continue;   /* /{lang}/{pref} のような書式の説明は実在のURLではない */
    if (!resolvePath(p)) add(metaBroken, p, f);
  }
  if (f === "manifest.json") {
    const mf = JSON.parse(txt);
    for (const u of [mf.start_url, ...(mf.shortcuts || []).map((s) => s.url)].filter(Boolean)) if (u.startsWith("/") && !resolvePath(u)) add(metaBroken, u, f);
  }
}
/* 言語ごとのマニフェスト (/ja/manifest.json など)。「ホーム画面に追加」の起動先とショートカットが実在するか、
   起動先がその言語のトップになっているか (共通の "/" に戻すと、必ず英語版で起動するようになる)。 */
for (const f of files) {
  const m = /^([a-z-]+)\/manifest\.json$/.exec(f);
  if (!m) continue;
  const mf = JSON.parse(readFileSync(path.join(OUT, f), "utf-8"));
  if (mf.start_url !== `/${m[1]}`) add(metaBroken, `start_url=${mf.start_url}`, f);
  for (const u of [mf.start_url, ...(mf.shortcuts || []).map((s) => s.url)].filter(Boolean)) if (u.startsWith("/") && !resolvePath(u)) add(metaBroken, u, f);
}
/* sitemap に載っているのに noindex のページ (検索エンジンに矛盾した指示を出す) */
const noindexInSitemap = [];
for (const p of sitemapUrls) {
  const t = resolvePath(p);
  if (!t || !t.endsWith(".html")) continue;
  const head = readFileSync(path.join(OUT, t), "utf-8").slice(0, 6000);
  if (/<meta name="robots" content="[^"]*noindex/i.test(head)) noindexInSitemap.push(p);
}

/* ---------- 4. 入口が無いページ ---------- */
const pageKind = (f) => {
  const s = f.replace(/\.html$/, "").split("/");
  if (s.length === 1) return LANGS.includes(s[0]) ? "トップ" : "その他";
  if (!LANGS.includes(s[0])) return "その他";
  if (s.length === 2) return ["explore", "collections", "overview", "album", "search", "random", "all-prefectures"].includes(s[1]) ? s[1] : "都道府県";
  if (s[1] === "collections") return "コレクション";
  if (s[1] === "gallery") return "ギャラリー";
  if (s.length === 3) return "撮影地";
  return "写真詳細";
};
const orphans = new Map();
for (const f of htmlFiles) {
  const kind = pageKind(f);
  if (kind === "その他") continue;
  if (!inbound.get(f)) orphans.set(kind, [...(orphans.get(kind) || []), f]);
}

/* ---------- 出力 ---------- */
const top = (map, n = 25) => [...map.entries()].sort((a, b) => b[1].n - a[1].n).slice(0, n);
const show = (title, map) => {
  if (!map.size) return;
  const total = [...map.values()].reduce((a, v) => a + v.n, 0);
  console.log(`\n✗ ${title}: 行き先 ${map.size}種類 / 参照 ${total}件`);
  for (const [k, v] of top(map)) console.log(`   ${k}  ×${v.n}  例: ${v.from.join(", ")}`);
  if (map.size > 25) console.log(`   … ほか ${map.size - 25}種類`);
};
console.log(`[check-links] HTML ${htmlFiles.length}ページ / 参照 ${nLinks}件 (サイト内 ${nInternal} / #見出し ${nHash} / 画像配信 ${nImg}) / ${((Date.now() - t0) / 1000).toFixed(0)}秒`);
console.log(`  画面内で組み立てるリンク: 検索の候補 ${nSearch}件 + 写真 ${photos.length}枚 × ${LANGS.length}言語 ほか`);
console.log(`  sitemap に載っているURL: ${sitemapUrls.size}件`);
console.log(`  外部の行き先: ${[...external.entries()].sort((a, b) => b[1] - a[1]).map(([h, n]) => `${h} ×${n}`).join(" / ") || "なし"}`);
if (!distFiles) console.log("  ! images-dist/ が無いので、画像の存在は確かめていません");

show("サイト内リンク切れ (HTML)", broken);
show("#見出し の行き先が無い", brokenHash);
show("配信画像が無い", brokenImg);
show("画面内で組み立てるリンクの行き先が無い", clientBroken);
show("sitemap / feed / robots などの行き先が無い", metaBroken);
if (noindexInSitemap.length) console.log(`\n✗ sitemap に載っているのに noindex: ${noindexInSitemap.length}件  例: ${noindexInSitemap.slice(0, 5).join(", ")}`);
if (strayPhoto.length) console.log(`\n✗ 写真詳細が対象外の言語に出ている: ${strayPhoto.join(", ")}`);
if (orphans.size) {
  console.log("\n知らせるだけ: 他のページの HTML からリンクされていないページ (画面内のボタンからは行ける場合がある)");
  for (const [k, v] of orphans) console.log(`   ${k}: ${v.length}ページ  例: ${v.slice(0, 3).join(", ")}`);
}

const jsonAt = process.argv.indexOf("--json");
if (jsonAt > 0 && process.argv[jsonAt + 1]) {
  const dump = (m) => Object.fromEntries(m);
  writeFileSync(process.argv[jsonAt + 1], JSON.stringify({ broken: dump(broken), brokenHash: dump(brokenHash), brokenImg: dump(brokenImg), clientBroken: dump(clientBroken), metaBroken: dump(metaBroken), noindexInSitemap, orphans: dump(orphans), external: dump(external) }, null, 1));
}
const bad = broken.size + brokenImg.size + clientBroken.size + metaBroken.size + noindexInSitemap.length + strayPhoto.length;
console.log(bad ? `\nリンク検査: 直すもの ${bad}種類` + (brokenHash.size ? ` (ほかに #見出し ${brokenHash.size}種類)` : "") : `\nリンク検査: 切れているリンクなし` + (brokenHash.size ? ` (#見出し の行き先なし ${brokenHash.size}種類は上を確認)` : ""));
process.exit(bad ? 1 : 0);
