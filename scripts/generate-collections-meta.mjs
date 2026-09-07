#!/usr/bin/env node
/**
 * ④ コレクションの「軽い部分」だけを取り出す。
 *
 *   node scripts/generate-collections-meta.mjs
 *
 * app/collections.js は 101KB あり、その大半は desc (紹介文) と
 * guide (撮影のコツ) の長文で、どちらもサーバー側 (メタ情報・JSON-LD・
 * コレクションページ本文) でしか使わない。にもかかわらず
 * 名前を引くためだけに読み込んでいた画面が多く、全ページの初期JSに
 * 約93KB 載っていた。
 *
 * そこで、画面側が実際に使う slug / 名前 / 撮影地 だけを
 * app/collections-meta.js へ書き出し、client component は
 * そちらを読むようにする。collections.js は今までどおり
 * 唯一の元データで、ここは派生物 (コミット対象)。
 *
 * ずれの検出は scripts/check-data.mjs が毎ビルド行う。
 */
import { writeFileSync, statSync } from "node:fs";
import { COLLECTIONS, COLLECTION_SLUGS } from "../app/collections.js";

const meta = {};
for (const slug of COLLECTION_SLUGS) {
  const c = COLLECTIONS[slug];
  if (!c) throw new Error(`collections.js に ${slug} がない`);
  meta[slug] = { locs: c.locs || [], name: c.name || {} };
}

const out =
`// 自動生成: node scripts/generate-collections-meta.mjs (手で編集しない)
// ④ コレクションの軽い部分だけ。画面 (client component) はこちらを読む。
// 紹介文 (desc) と撮影のコツ (guide) は入れない — サーバー側でしか使わず、
// 全ページの初期JSに約93KB 載っていたため。元データは app/collections.js。
// ずれは scripts/check-data.mjs が毎ビルド確かめる。
export const COLLECTION_SLUGS = ${JSON.stringify(COLLECTION_SLUGS)};

export const COLLECTION_META = ${JSON.stringify(meta, null, 1)};

/** コレクション名。その言語に無ければ英語、それも無ければ slug */
export function getCollectionName(slug, lang) {
  const n = COLLECTION_META[slug]?.name;
  return n ? (n[lang] || n.en || slug) : slug;
}

/** そのコレクションに割り当てた撮影地 (タグが無い写真の判定に使う) */
export const getCollectionLocs = (slug) => COLLECTION_META[slug]?.locs || [];
`;

writeFileSync("app/collections-meta.js", out, "utf-8");
console.log(
  `app/collections-meta.js: ${COLLECTION_SLUGS.length} テーマ / ` +
  `${(statSync("app/collections-meta.js").size / 1024).toFixed(0)} KB ` +
  `(元 app/collections.js は ${(statSync("app/collections.js").size / 1024).toFixed(0)} KB)`
);
