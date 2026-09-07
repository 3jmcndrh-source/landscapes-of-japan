/**
 * ① 検索の索引づくり。QuickSearch (ヘッダー) と 検索ページ が同じ索引を使う。
 * 検索窓を増やすためのものではなく、既存の2か所の判定を1つに揃えるためのもの。
 * 採点と順位づけは search-score.js を参照。
 */
import { PREFECTURES, PREF_I18N, LOC_I18N } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { LANGS } from "./i18n-meta.js";
import { COLLECTION_META } from "./collections-meta.js";
import { PREF_ALIASES, LOC_ALIASES, COLLECTION_ALIASES } from "./search-alias.js";

/* 1件 = 1つの行き先。同じ場所の25言語版を別々の結果として並べない。
   n: 全言語の表示名 (LANGS 順)  a: 別名 (かな読み + slug のローマ字)
   x: 周辺情報 (撮影地にとっての都道府県名。弱い一致にのみ使う) */
export function buildEntries() {
  const entries = [];

  for (const pf of PREFECTURES) {
    const prefSlug = PREF_SLUGS[pf.pref];
    if (!prefSlug || pf.photos.length === 0) continue;

    const prefNames = LANGS.map((l) => PREF_I18N[pf.pref]?.[l] || pf.pref);
    entries.push({
      t: "pref", p: prefSlug, n: prefNames,
      a: [prefSlug, ...(PREF_ALIASES[pf.pref] || [])],
      c: pf.photos.length,
    });

    const locCounts = new Map();
    for (const ph of pf.photos) {
      if (!ph.loc) continue;
      locCounts.set(ph.loc, (locCounts.get(ph.loc) || 0) + 1);
    }
    for (const [locJp, count] of locCounts) {
      const locSlug = LOC_SLUGS[locJp];
      if (!locSlug) continue;
      entries.push({
        t: "loc", p: prefSlug, l: locSlug,
        n: LANGS.map((lg) => LOC_I18N[locJp]?.[lg] || locJp),
        a: [locSlug, locSlug.replace(/-/g, " "), ...(LOC_ALIASES[locJp] || [])],
        x: [...new Set(prefNames)],
        c: count,
      });
    }
  }

  for (const [slug, col] of Object.entries(COLLECTION_META)) {
    const names = LANGS.map((l) => col.name?.[l]).filter(Boolean);
    if (!names.length) continue;
    entries.push({
      t: "col", s: slug, n: [...new Set(names)],
      a: [slug, slug.replace(/-/g, " "), ...(COLLECTION_ALIASES[slug] || [])],
    });
  }

  return entries;
}

export { normalizeText, compactText, scoreEntry, searchEntries, entryHref } from "./search-score.js";
