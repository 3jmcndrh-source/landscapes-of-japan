#!/usr/bin/env node
/**
 * ⑦ 「見た目から探す」が何語でどこまで引けるかを実測して書き出す。
 *
 *   node scripts/report-search-languages.mjs > docs/search-languages.md
 *
 * 実装の説明ではなく、実際に matchConcepts を通した結果を並べる。
 * 各言語の概念名をそのまま入力して、その概念に当たるかどうかを見る。
 */
import { LANGS } from "../app/i18n-meta.js";
import { CONCEPTS, conceptLabel, conceptHasLang } from "../app/concepts.js";
import { matchConcepts } from "../app/concept-search.js";

const rows = [];
for (const lang of LANGS) {
  let own = 0, hit = 0;
  const misses = [];
  for (const c of CONCEPTS) {
    if (conceptHasLang(c.key, lang)) own++;
    const label = conceptLabel(c.key, lang);
    const keys = matchConcepts(label, lang).map((h) => h.key);
    if (keys.includes(c.key)) hit++; else misses.push(`${c.key}(${label})`);
  }
  rows.push({ lang, own, hit, misses });
}

const total = CONCEPTS.length;
console.log(`# 見た目から探す — 言語別の対応状況`);
console.log();
console.log(`測定: \`node scripts/report-search-languages.mjs\` / ${new Date().toISOString().slice(0, 10)}`);
console.log();
console.log(`概念 ${total} 件 (コレクション${CONCEPTS.filter((c) => c.from === "collection").length} / 季節${CONCEPTS.filter((c) => c.from === "season").length} / 独自${CONCEPTS.filter((c) => c.from === "own").length})。`);
console.log();
console.log(`- **自言語の語がある**: その言語の表示名を持っている概念の数。英語で代用しているものは数えない。`);
console.log(`- **その語で引ける**: 表示名をそのまま入力したとき、狙った概念に当たった数。`);
console.log();
console.log(`できること・できないこと:`);
console.log();
console.log(`- 概念語 (「霧」「夕焼け」「城」など) を含む入力から、写真の画像特徴で並べ替える。`);
console.log(`- 文そのものの意味は解釈しない。「霧がかった朝の湖」なら「霧」と「湖」を拾うが、`);
console.log(`  「霧が無い湖」のような否定は理解しない。`);
console.log(`- 使っているモデル (CLIP) の文章側は英語で学習されている。そのため利用者の入力を`);
console.log(`  モデルへ直接渡す方式は採らず、各言語の概念名と照合してから画像特徴を使う。`);
console.log(`- 入力した言葉は URL・GA4・Clarity のいずれにも送らない。URLに載るのは概念キーだけ。`);
console.log();
console.log(`| 言語 | 自言語の語がある | その語で引ける | 引けなかったもの |`);
console.log(`|---|---|---|---|`);
for (const r of rows) {
  console.log(`| ${r.lang} | ${r.own}/${total} | ${r.hit}/${total} | ${r.misses.length ? r.misses.join(", ") : "—"} |`);
}
console.log();
const allOwn = rows.every((r) => r.own === total);
const allHit = rows.every((r) => r.hit === total);
console.log(`まとめ: 自言語の語がすべて揃っている言語 ${rows.filter((r) => r.own === total).length}/${LANGS.length}、`);
console.log(`その語で全概念を引ける言語 ${rows.filter((r) => r.hit === total).length}/${LANGS.length}。`);
if (!allOwn || !allHit) console.log(`\n上の表で不足がある言語は、その概念を英語名かキーで引くことになる。`);
