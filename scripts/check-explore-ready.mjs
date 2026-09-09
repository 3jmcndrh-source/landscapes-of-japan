#!/usr/bin/env node
/**
 * 統合探索の「一覧をいつ出してよいか」の回帰テスト。
 *
 *   node scripts/check-explore-ready.mjs
 *
 * 守りたい性質はひとつだけ:
 *   **needsFacets(q) が false なら、付随データが無くても結果が同じであること。**
 *
 * ExploreClient は、条件が付随データ (撮影日・月・タグ・寸法・色・追加日) を
 * 必要としないときに限り、データの到着を待たずに一覧を出す。
 * matches() / sortPhotos() が新しく f を見るようになったのに needsFacets を
 * 更新し忘れると、**データが無いまま判定して 0件 を出す**。それをここで捕まえる。
 *
 * 実装のなぞりはしない。「同じ条件で、付随データの有無だけを変えて結果を比べる」だけ。
 */
import { selectPhotos, needsFacets, loadFacets, getFacets } from "../app/photo-model.js";
import { readQueryFromParams } from "../app/explore-state.js";
import { COLLECTION_TAGS } from "../app/photo-tags.js";
import { COLLECTION_SLUGS, COLLECTION_META } from "../app/collections-meta.js";
import { LOC_POINTS } from "../app/loc-points.js";

const fail = [];
const pass = [];
/* 詳しい説明は落ちたときだけ添える (通った行に警告文を並べない) */
const check = (name, cond, detail = "") => cond ? pass.push(name) : fail.push(`${name}${detail ? ` — ${detail}` : ""}`);

await loadFacets();
const real = getFacets();
/* 「まだ届いていない」状態。loadFacets の失敗時と同じ形にする */
const EMPTY = { dates: null, months: null, tags: null, dims: null, palette: null, added: null, concepts: null };

const themeLocs = Object.fromEntries(COLLECTION_SLUGS.map((s) => [s, COLLECTION_META[s].locs || []]));
const base = { themeTags: COLLECTION_TAGS, themeLocs, locPoints: LOC_POINTS };
const ids = (list) => list.map((p) => p.id).join(",");

/* 代表的な条件。URL から読む形をそのまま使う (画面と同じ経路) */
const CASES = [
  ["条件なし", ""],
  ["都道府県", "?pref=北海道"],
  ["都道府県2つ (OR)", "?pref=北海道,京都府"],
  ["撮影地", "?pref=北海道&loc=知床"],
  ["地図の範囲", "?bbox=42.5,140,44,145"],
  ["並び=地域", "?sort=region"],
  ["並び=撮影日", "?sort=date"],
  ["並び=追加日", "?sort=added"],
  ["コレクション", `?theme=${COLLECTION_SLUGS[0]}`],
  ["季節", "?season=spring"],
  ["月", "?month=3"],
  ["色", "?color=blue"],
  ["縦横", "?o=portrait"],
  ["概念", "?concept=snow"],
  ["概念AND", "?conceptAll=snow"],
  ["地域 × 季節", "?pref=北海道&season=winter"],
  ["地域 × 並び=撮影日", "?pref=北海道&sort=date"],
  ["地域 × 縦横", "?pref=北海道&o=landscape"],
];

for (const [name, search] of CASES) {
  const q = readQueryFromParams(search);
  const withFacets = ids(selectPhotos(q, { ...base, facets: real }));
  const without = ids(selectPhotos(q, { ...base, facets: EMPTY }));
  const same = withFacets === without;
  if (needsFacets(q)) {
    /* 要ると宣言しているものは、待つので結果が違ってよい */
    check(`${name}: 付随データが要ると判定`, true);
  } else {
    check(`${name}: 付随データ無しでも同じ結果`, same,
      same ? "" : `件数 ${withFacets.split(",").filter(Boolean).length} vs ${without.split(",").filter(Boolean).length}`);
  }
}

/* 逆向き: 結果が変わる条件を「要らない」と言っていないか (取りこぼしの検出) */
for (const [name, search] of CASES) {
  const q = readQueryFromParams(search);
  const a = ids(selectPhotos(q, { ...base, facets: real }));
  const b = ids(selectPhotos(q, { ...base, facets: EMPTY }));
  if (a !== b) check(`${name}: 結果が変わるなら要ると宣言している`, needsFacets(q) === true,
    "needsFacets が false のまま結果が変わる = 未読込のまま判定してしまう");
}

/* 条件なしの一覧は、付随データを一切見ないこと (早く出す前提そのもの) */
{
  const q = readQueryFromParams("");
  check("条件なしは付随データを要求しない", needsFacets(q) === false);
  check("条件なしの並びは data.js の順のまま",
    ids(selectPhotos(q, { ...base, facets: EMPTY })) === ids(selectPhotos(q, { ...base, facets: real })));
}

console.log(`[check-explore-ready] 通った ${pass.length}件`);
for (const p of pass) console.log(`  ✓ ${p}`);
if (fail.length) {
  console.log(`\n直すもの (${fail.length}件):`);
  for (const f of fail) console.log(`  ✗ ${f}`);
  process.exit(1);
}
console.log("\n一覧を出す条件: 問題なし");
