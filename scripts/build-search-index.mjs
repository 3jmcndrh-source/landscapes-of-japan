#!/usr/bin/env node
/**
 * 検索索引 → public/search-index.json
 *
 * 索引の中身は app/search-core.js の buildEntries() が持つ。
 * ヘッダーの QuickSearch はこのJSONを読み、検索ページは同じ buildEntries() を
 * 直接呼ぶ。判定 (app/search-score.js) も共通なので、両者の結果が食い違わない。
 *
 *   { t:"loc",  p:prefSlug, l:locSlug, n:[25言語の名前], a:[別名], x:[都道府県名], c:枚数 }
 *   { t:"pref", p:prefSlug,            n:[25言語の名前], a:[別名],               c:枚数 }
 *   { t:"col",  s:collectionSlug,      n:[名前],         a:[別名] }
 */
import { writeFileSync } from "fs";
import { LANGS } from "../app/i18n-meta.js";
import { buildEntries } from "../app/search-core.js";

const entries = buildEntries();
const out = { langs: LANGS, entries };
writeFileSync("public/search-index.json", JSON.stringify(out), "utf-8");
console.log(`[search-index] ${entries.length} entries → public/search-index.json (${Math.round(JSON.stringify(out).length / 1024)} KB)`);
