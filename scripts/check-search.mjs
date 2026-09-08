#!/usr/bin/env node
/**
 * ⑦ 見た目から探す の回帰テスト。
 *
 *   node scripts/check-search.mjs
 *
 * 見るのは「条件の結合」と「並び」の規則で、実装の説明ではなく実際の結果。
 *   - 単独の語、複合文、絞り込みボタンの複数選択が、それぞれ意図どおりか
 *   - 複合文が和集合になっていないか (これが直した不具合)
 *   - 地域などの条件と組み合わせたときに AND のままか
 *   - 語彙に無い表現で 0件 になるか (エラーとは区別する)
 *
 * 閲覧側は fetch でベクトルを取るので、ここではファイルから読んで
 * 同じ関数に注入する。
 */
import { readFileSync } from "node:fs";
import { PREFECTURES, getLocName } from "../app/data.js";
import { COLLECTION_TAGS } from "../app/photo-tags.js";
import { COLLECTION_META, COLLECTION_SLUGS } from "../app/collections-meta.js";
import { selectPhotos, loadFacets, setFacets, getFacets } from "../app/photo-model.js";
import { matchConcepts } from "../app/concept-search.js";
import * as VS from "../app/vector-search.js";
import { VECTOR_IDS, VECTOR_DIM, PHRASE_KEYS } from "../app/vector-meta.js";

/* ブラウザの fetch を、ファイル読み込みに差し替える */
const toAB = (buf) => buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
globalThis.fetch = async (url) => {
  const f = String(url).replace(/^\//, "public/");
  const buf = readFileSync(f);
  return { ok: true, arrayBuffer: async () => toAB(buf) };
};

await loadFacets();
const loaded = await VS.loadVectors();
const fail = [];
const pass = [];
const check = (name, cond, detail = "") => (cond ? pass : fail).push(`${name}${detail ? ` — ${detail}` : ""}`);

check("ベクトルを読み込める", Boolean(loaded), `写真 ${VECTOR_IDS.length} / 文 ${PHRASE_KEYS.length} / 次元 ${VECTOR_DIM}`);
if (!loaded) { console.error(fail.join("\n")); process.exit(1); }
setFacets({ ...getFacets(), concepts: VS });

const themeLocs = Object.fromEntries(COLLECTION_SLUGS.map((s) => [s, COLLECTION_META[s].locs || []]));
const opts = { themeTags: COLLECTION_TAGS, themeLocs };
const loc = {};
for (const pf of PREFECTURES) for (const p of pf.photos) loc[p.id] = p.loc;

const run = (q) => selectPhotos(q, opts);
const idsOf = (r) => new Set(r.map((p) => p.id));
const top = (r, n = 8) => r.slice(0, n).map((p) => getLocName(p.loc, "ja")).join(", ");

/** 入力文 → 条件 (ExploreClient と同じ規則) */
function queryFromText(text, lang) {
  const keys = matchConcepts(text, lang).map((h) => h.key).slice(0, 2);
  return keys.length >= 2 ? { conceptAll: keys } : { concept: keys };
}

console.log("=== 条件の結合 ===");
const mist = run({ concept: ["mist"] });
const mount = run({ concept: ["mountain"] });
const both = run(queryFromText("霧のかかった山", "ja"));
const union = new Set([...idsOf(mist), ...idsOf(mount)]);
const inter = [...idsOf(mist)].filter((x) => idsOf(mount).has(x));
console.log(`  霧            ${mist.length}枚  ${top(mist, 5)}`);
console.log(`  山            ${mount.length}枚  ${top(mount, 5)}`);
console.log(`  霧のかかった山  ${both.length}枚  ${top(both, 5)}`);
console.log(`  (参考) 和集合 ${union.size} / 積集合 ${inter.length}`);
check("複合文が和集合になっていない", both.length !== union.size || ![...idsOf(both)].every((x) => union.has(x)),
  `複合 ${both.length} / 和集合 ${union.size}`);
check("複合文が1件以上返る", both.length > 0, `${both.length}枚`);

/* 絞り込みボタンの複数選択は「どれかに当てはまる」のまま */
const orTwo = run({ concept: ["mist", "mountain"] });
check("ボタンの複数選択は和集合のまま", orTwo.length === union.size, `${orTwo.length} / ${union.size}`);

/* 地域との組み合わせは AND */
const withPref = run({ ...queryFromText("霧のかかった山", "ja"), pref: ["北海道"] });
check("地域と組み合わせると AND", withPref.length > 0 && withPref.length <= both.length,
  `霧のかかった山 ${both.length} → 北海道で ${withPref.length}`);
check("地域の複数選択は0件にならない", run({ pref: ["北海道", "沖縄県"] }).length ===
  run({ pref: ["北海道"] }).length + run({ pref: ["沖縄県"] }).length,
  `北海道+沖縄県 ${run({ pref: ["北海道", "沖縄県"] }).length}枚`);

/* 条件の解除 */
check("条件を外すと元に戻る", run({}).length === PREFECTURES.flatMap((p) => p.photos).length,
  `${run({}).length}枚`);

console.log("\n=== 語彙にない表現 ===");
for (const [lang, q] of [["ja", "夕暮れの海"], ["ja", "水面に映る建物"], ["ja", "ラーメン"], ["en", "a lighthouse"]]) {
  const keys = matchConcepts(q, lang).map((h) => h.key).slice(0, 2);
  const r = keys.length ? run(queryFromText(q, lang)) : null;
  console.log(`  ${lang} "${q}" → 概念[${keys.join(",")}] ${r ? r.length + "枚" : "一致なし (条件を作らない)"}`);
}

console.log("\n=== 並び ===");
{
  const r = run(queryFromText("霧のかかった山", "ja"));
  const dataOrder = PREFECTURES.flatMap((p) => p.photos.map((x) => x.id));
  const inDataOrder = r.map((p) => dataOrder.indexOf(p.id));
  const sortedByData = [...inDataOrder].sort((a, b) => a - b);
  check("既定の並びが地域順のままになっていない",
    JSON.stringify(inDataOrder) !== JSON.stringify(sortedByData));
  console.log(`  上位8件: ${top(r)}`);
}

console.log(`\n合格 ${pass.length}`);
for (const s of pass) console.log(`  ✓ ${s}`);
if (fail.length) {
  console.error(`\n不合格 ${fail.length}`);
  for (const s of fail) console.error(`  ✗ ${s}`);
  process.exit(1);
}
console.log("\n検索の回帰テスト: 問題なし");
