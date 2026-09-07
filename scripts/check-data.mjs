#!/usr/bin/env node
/**
 * ⑧ 公開前のデータ整合チェック。
 *
 *   node scripts/check-data.mjs
 *
 * ビルドの前に走らせ、次のような「ビルドは通るが本番で壊れる」型を止める:
 *   - 掲載写真に slug / 訳語 / 寸法が無い
 *   - 生成物に、もう掲載していない写真が残っている
 *   - コレクションのタグ定義と写真タグが噛み合っていない
 *   - 撮影地の座標が無い (②地図で落ちる)
 *
 * 「落とすもの」と「知らせるだけのもの」を分ける。
 * 知らせるだけのものは、既知で許容している状態 (例: 追加日不明397枚)。
 */
import { existsSync, readFileSync } from "node:fs";
import { PREFECTURES, LOC_I18N, PREF_I18N } from "../app/data.js";
import { PREF_SLUGS, LOC_SLUGS } from "../app/slugs.js";
import { LANGS } from "../app/i18n-meta.js";
import { COLLECTIONS, COLLECTION_SLUGS } from "../app/collections.js";
import { COLLECTION_META, COLLECTION_SLUGS as META_SLUGS } from "../app/collections-meta.js";
import { COLLECTION_TAGS } from "../app/photo-tags.js";

const photos = PREFECTURES.flatMap((pf) => pf.photos.map((p) => ({ ...p, pref: pf.pref })));
const ids = photos.map((p) => p.id);
const idSet = new Set(ids);
const locs = [...new Set(photos.map((p) => p.loc).filter(Boolean))];

const fatal = [];
const notes = [];

/* ---- 1. 写真ID ---- */
if (ids.length !== idSet.size) {
  const seen = new Set(), dup = new Set();
  for (const id of ids) { if (seen.has(id)) dup.add(id); seen.add(id); }
  fatal.push(`写真IDが重複: ${[...dup].join(", ")}`);
}
const badId = ids.filter((id) => !/^[A-Za-z0-9_.-]+$/.test(id));
if (badId.length) fatal.push(`URLに使えない文字を含む写真ID: ${badId.join(", ")}`);

/* ---- 2. 撮影地・都道府県 ---- */
const noLoc = photos.filter((p) => !p.loc);
if (noLoc.length) notes.push(`撮影地が未設定の写真: ${noLoc.length}枚 (写真詳細ページが作られない)`);
const noSlug = locs.filter((l) => !LOC_SLUGS[l]);
if (noSlug.length) fatal.push(`slug未登録の撮影地: ${noSlug.join(", ")}`);
const noPrefSlug = [...new Set(photos.map((p) => p.pref))].filter((p) => !PREF_SLUGS[p]);
if (noPrefSlug.length) fatal.push(`slug未登録の都道府県: ${noPrefSlug.join(", ")}`);

/* ---- 3. 25言語の訳語 ---- */
for (const l of locs) {
  const t = LOC_I18N[l];
  if (!t) { fatal.push(`訳語が無い撮影地: ${l}`); continue; }
  const miss = LANGS.filter((lg) => !t[lg]);
  if (miss.length) notes.push(`撮影地「${l}」の訳語が無い言語: ${miss.join(",")} (日本語表記で代替される)`);
}
for (const p of [...new Set(photos.map((x) => x.pref))]) {
  const t = PREF_I18N[p];
  if (!t) { fatal.push(`訳語が無い都道府県: ${p}`); continue; }
  const miss = LANGS.filter((lg) => !t[lg]);
  if (miss.length) notes.push(`都道府県「${p}」の訳語が無い言語: ${miss.join(",")}`);
}

/* ---- 4. 生成物 ---- */
async function loadGen(file, name) {
  if (!existsSync(file)) return null;
  try { return await import(`file://${process.cwd()}/${file}`); }
  catch (e) { fatal.push(`${name} が読み込めない: ${e.message.slice(0, 80)}`); return null; }
}

const dims = await loadGen("app/photo-dims.js", "photo-dims.js");
if (!dims) fatal.push("app/photo-dims.js が無い (node scripts/generate-photo-dims.mjs を実行)");
else {
  const missing = ids.filter((id) => !dims.PHOTO_DIMS[id]);
  const known = missing.filter((id) => !(dims.PHOTO_DIMS_UNKNOWN || []).includes(id));
  if (known.length) fatal.push(`寸法が無い写真: ${known.length}枚 (${known.slice(0, 3).join(", ")}…)`);
  if ((dims.PHOTO_DIMS_UNKNOWN || []).length) notes.push(`寸法不明として扱う写真: ${dims.PHOTO_DIMS_UNKNOWN.length}枚 (縦横の絞り込み対象外)`);
  const stray = Object.keys(dims.PHOTO_DIMS).filter((id) => !idSet.has(id));
  if (stray.length) notes.push(`photo-dims.js に掲載していない写真が残存: ${stray.length}件`);
}

for (const [file, key, name, required] of [
  ["app/photo-dates.js", "PHOTO_DATES", "撮影日", true],
  ["app/photo-months.js", "PHOTO_MONTHS", "撮影月", true],
  ["app/photo-colors.js", "PHOTO_COLORS", "アンビエント色", true],
  ["app/photo-palette.js", "PHOTO_PALETTE", "色パレット", true],
  ["app/photo-tags.js", "PHOTO_TAGS", "被写体タグ", false],
  ["app/photo-added.js", "PHOTO_ADDED", "追加日", false],
]) {
  const mod = await loadGen(file, name);
  if (!mod) { if (required) fatal.push(`${file} が無い`); continue; }
  const map = mod[key] || {};
  const missing = ids.filter((id) => !(id in map));
  const stray = Object.keys(map).filter((id) => !idSet.has(id));
  if (required && missing.length) fatal.push(`${name}が無い掲載写真: ${missing.length}枚 (${missing.slice(0, 3).join(", ")}…)`);
  if (!required && missing.length) notes.push(`${name}が無い掲載写真: ${missing.length}枚`);
  if (stray.length) notes.push(`${name}に掲載していない写真が残存: ${stray.length}件 (再生成で掃除される)`);
}

/* ---- 5. コレクションのタグ定義 ---- */
const tagsMod = await loadGen("app/photo-tags.js", "被写体タグ");
if (tagsMod) {
  const used = new Set(Object.values(tagsMod.PHOTO_TAGS || {}).flat());
  for (const [slug, tags] of Object.entries(COLLECTION_TAGS || {})) {
    if (!COLLECTIONS[slug]) { fatal.push(`COLLECTION_TAGS に未知のコレクション: ${slug}`); continue; }
    const dead = tags.filter((t) => !used.has(t));
    if (dead.length === tags.length) fatal.push(`コレクション「${slug}」のタグが1枚も使われていない: ${tags.join(",")}`);
    else if (dead.length) notes.push(`コレクション「${slug}」の未使用タグ: ${dead.join(",")}`);
  }
  for (const slug of Object.keys(COLLECTIONS)) {
    if (!COLLECTION_TAGS || !COLLECTION_TAGS[slug]) notes.push(`コレクション「${slug}」にタグ定義が無い`);
  }
}

/* ---- 6. 撮影地の座標 (②地図) ---- */
if (existsSync("app/loc-points.js")) {
  const lp = await loadGen("app/loc-points.js", "撮影地の座標");
  if (lp) {
    const pts = lp.LOC_POINTS || {};
    const miss = locs.filter((l) => !pts[l]);
    if (miss.length) notes.push(`座標が無い撮影地: ${miss.length}件 (地図に出ない: ${miss.slice(0, 3).join(", ")}…)`);
  }
} else {
  notes.push("app/loc-points.js が無い (②地図は撮影地マーカーを出せない)");
}

/* ---- ④ collections-meta.js が collections.js とずれていないか ----
   画面側は軽いほう (collections-meta.js) を読むので、名前や撮影地が
   古いままだと「一覧には出るのにコレクションページには無い」といった
   食い違いが起きる。作り直しは
   node scripts/generate-collections-meta.mjs */
{
  const diffs = [];
  if (META_SLUGS.join(",") !== COLLECTION_SLUGS.join(",")) diffs.push("テーマの並びが違う");
  for (const slug of COLLECTION_SLUGS) {
    const a = COLLECTIONS[slug], b = COLLECTION_META[slug];
    if (!b) { diffs.push(slug + " が collections-meta.js に無い"); continue; }
    if (JSON.stringify(a.locs || []) !== JSON.stringify(b.locs || [])) diffs.push(slug + " の撮影地が違う");
    if (JSON.stringify(a.name || {}) !== JSON.stringify(b.name || {})) diffs.push(slug + " の名前が違う");
  }
  if (diffs.length) {
    fatal.push(
      "app/collections-meta.js が古い (" + diffs.join(" / ") + ") — " +
      "node scripts/generate-collections-meta.mjs で作り直してください"
    );
  }
}

/* ---- 出力 ---- */
console.log(`[check-data] 写真 ${ids.length}枚 / 撮影地 ${locs.length} / 都道府県 ${[...new Set(photos.map((p) => p.pref))].length} / 言語 ${LANGS.length}`);
if (notes.length) {
  console.log(`\n知らせるだけ (${notes.length}件):`);
  for (const n of notes) console.log(`  - ${n}`);
}
if (fatal.length) {
  console.log(`\n公開前に直すもの (${fatal.length}件):`);
  for (const f of fatal) console.log(`  ✗ ${f}`);
  process.exit(1);
}
console.log("\n整合チェック: 問題なし");
