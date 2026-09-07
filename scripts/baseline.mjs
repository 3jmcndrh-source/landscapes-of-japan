#!/usr/bin/env node
/**
 * 改修前後の比較基準を、いまのデータと out/ の実体から集計する。
 *
 *   node scripts/baseline.mjs [--out docs/baseline.json]
 *
 * URL数・リンク数は、以前の誤集計 (写真IDの _ や大文字を落とす正規表現、
 * シェルのワイルドカードによるパス深さの取り違え) を避けるため、
 * ルーティング定義 (app/ のディレクトリ構造) と out/ の実ファイル、

 * および HTML の href 属性の実解析で数える。
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { PREFECTURES, LOC_I18N } from "../app/data.js";
import { PREF_SLUGS, LOC_SLUGS } from "../app/slugs.js";
import { LANGS, PHOTO_LANGS } from "../app/i18n-meta.js";
import { COLLECTIONS } from "../app/collections.js";

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i >= 0 ? process.argv[i + 1] : d; };
const OUT = arg("out", "docs/baseline.json");
const DIST = "out";

/* ---- データ側 ---- */
const photos = PREFECTURES.flatMap((pf) => pf.photos.map((p) => ({ ...p, pref: pf.pref })));
const photoIds = photos.map((p) => p.id);
const locs = [...new Set(photos.map((p) => p.loc).filter(Boolean))];

const data = {
  写真枚数: photos.length,
  写真ID重複: photoIds.length - new Set(photoIds).size,
  都道府県数: PREFECTURES.filter((p) => p.photos.length).length,
  撮影地数: locs.length,
  言語数: LANGS.length,
  写真詳細ページのある言語: PHOTO_LANGS.length,
  コレクション数: Object.keys(COLLECTIONS).length,
  slug未登録の撮影地: locs.filter((l) => !LOC_SLUGS[l]),
  訳語未登録の撮影地: locs.filter((l) => !LOC_I18N[l]),
  大文字を含む写真ID: photoIds.filter((id) => /[A-Z]/.test(id)).length,
  アンダースコアを含む写真ID: photoIds.filter((id) => id.includes("_")).length,
};

/* ---- 生成物 (コミット済みデータファイル) ---- */
const gen = {};
for (const [name, file, key] of [
  ["撮影日", "app/photo-dates.js", "PHOTO_DATES"],
  ["撮影月", "app/photo-months.js", "PHOTO_MONTHS"],
  ["追加日", "app/photo-added.js", "PHOTO_ADDED"],
  ["色(アンビエント)", "app/photo-colors.js", "PHOTO_COLORS"],
  ["色パレット", "app/photo-palette.js", "PHOTO_PALETTE"],
  ["被写体タグ", "app/photo-tags.js", "PHOTO_TAGS"],
]) {
  if (!existsSync(file)) { gen[name] = "ファイルなし"; continue; }
  /* ファイル全体から "id": の形を拾い、実在の写真IDと突き合わせる。
     オブジェクトの終端位置に依存せず、入れ子の内側キーも実IDでないので混ざらない。 */
  const t = readFileSync(file, "utf-8");
  const found = new Set([...t.matchAll(/"([A-Za-z0-9_.-]+)"s*:/g)].map((x) => x[1]));
  const ids = [...found].filter((id) => photoIds.includes(id));
  const strayIds = [...found].filter((id) => /^[a-z0-9]{20}$|^dsc/i.test(id) && !photoIds.includes(id));
  gen[name] = { データがある掲載写真: ids.length, 掲載写真に無い残存ID: strayIds.length,
                データが無い掲載写真: photoIds.filter((id) => !ids.includes(id)).length,
                KB: Math.round(statSync(file).size / 1024) };
}

/* ---- 出力側 (out/ の実ファイルを深さで数える) ---- */
const files = [];
(function walk(d) {
  if (!existsSync(d)) return;
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else files.push(p);
  }
})(DIST);

const html = files.filter((f) => f.endsWith(".html"));
const depth = (f) => f.split(/[\\/]/).length;   // out/ja.html = 2, out/ja/kyoto.html = 3 ...
const byDepth = {};
for (const f of html) { const d = depth(f); byDepth[d] = (byDepth[d] || 0) + 1; }

/* 写真詳細ページ = out/{lang}/{pref}/{loc}/{photoId}.html (深さ5) */
const photoPages = html.filter((f) => depth(f) === 5);
const photoPagesByLang = {};
for (const f of photoPages) {
  const lang = f.split(/[\\/]/)[1];
  photoPagesByLang[lang] = (photoPagesByLang[lang] || 0) + 1;
}

/* 撮影地ページの初期HTML内にある写真詳細への実リンクを、href の実解析で数える */
function realPhotoLinks(file) {
  if (!existsSync(file)) return null;
  const t = readFileSync(file, "utf-8");
  const hrefs = [...t.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  const langs = LANGS.join("|");
  const re = new RegExp(`^/(${langs})/[^/"]+/[^/"]+/[^/"?#]+$`);
  return hrefs.filter((h) => re.test(h)).length;
}

const out = {
  記録日時: new Date().toISOString(),
  コミット: process.env.GIT_COMMIT || null,
  データ: data,
  生成物: gen,
  出力: {
    総ファイル数: files.length,
    HTML数: html.length,
    深さ別HTML: byDepth,
    写真詳細ページ数: photoPages.length,
    写真詳細ページ_言語別: photoPagesByLang,
    サンプル_知床ページの写真詳細リンク数: realPhotoLinks(path.join(DIST, "ja/hokkaido/shiretoko.html")),
    サンプル_美瑛ページの写真詳細リンク数: realPhotoLinks(path.join(DIST, "ja/hokkaido/biei.html")),
  },
};

/* ---- 初期JS (HTML内の script src の実ファイルサイズ合計) ---- */
function initialJs(file) {
  if (!existsSync(file)) return null;
  const t = readFileSync(file, "utf-8");
  const srcs = [...new Set([...t.matchAll(/<script src="(\/_next\/static\/[^"]+)"/g)].map((m) => m[1]))];
  let total = 0, n = 0;
  for (const s of srcs) { const p = path.join(DIST, s); if (existsSync(p)) { total += statSync(p).size; n++; } }
  return { KB: Math.round(total / 1024), ファイル数: n };
}
out.初期JS = {
  トップ: initialJs(path.join(DIST, "ja.html")),
  撮影地: initialJs(path.join(DIST, "ja/hokkaido/biei.html")),
  コレクション: initialJs(path.join(DIST, "ja/collections/autumn-foliage.html")),
  写真詳細: initialJs(path.join(DIST, "ja/hokkaido/shiretoko/dsc08629-2b9a68.html")),
  検索: initialJs(path.join(DIST, "ja/search.html")),
};

/* ---- 画像バリエーション ---- */
const distImg = "images-dist";
if (existsSync(distImg)) {
  const imgs = readdirSync(distImg);
  const widths = {};
  for (const f of imgs) { const m = f.match(/_w(\d+b?)\.webp$/); if (m) widths[m[1]] = (widths[m[1]] || 0) + 1; }
  out.配信画像 = { 総ファイル数: imgs.length, 幅別: widths };
}

writeFileSync(OUT, JSON.stringify(out, null, 2), "utf-8");
console.log(JSON.stringify(out, null, 2));
console.log(`\n→ ${OUT}`);
