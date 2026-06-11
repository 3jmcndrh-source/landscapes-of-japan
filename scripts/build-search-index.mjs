#!/usr/bin/env node
/**
 * P5: build-time quick-search index → public/search-index.json
 *
 * Entries (compact, no dependency):
 *   { t: "loc",  p: prefSlug, l: locSlug, n: [25 names in LANGS order], c: photoCount }
 *   { t: "pref", p: prefSlug,             n: [25 names],               c: photoCount }
 *   { t: "col",  s: collectionSlug,       n: [available names] }
 *
 * The client (TopNav quick search) lowercases the query and matches with
 * String.includes across every name, so "富士" / "fuji" / "후지" all hit the
 * same entry regardless of UI language.
 */
import { writeFileSync } from "fs";
import { PREFECTURES, LOC_I18N, PREF_I18N } from "../app/data.js";
import { PREF_SLUGS, LOC_SLUGS } from "../app/slugs.js";
import { LANGS } from "../app/i18n-meta.js";
import { COLLECTIONS } from "../app/collections.js";

const entries = [];

for (const pf of PREFECTURES) {
  const prefSlug = PREF_SLUGS[pf.pref];
  if (!prefSlug || pf.photos.length === 0) continue;

  const prefNames = LANGS.map((l) => (PREF_I18N[pf.pref]?.[l] || pf.pref));
  entries.push({ t: "pref", p: prefSlug, n: prefNames, c: pf.photos.length });

  const locCounts = new Map();
  for (const ph of pf.photos) {
    if (!ph.loc) continue;
    locCounts.set(ph.loc, (locCounts.get(ph.loc) || 0) + 1);
  }
  for (const [locJp, count] of locCounts) {
    const locSlug = LOC_SLUGS[locJp];
    if (!locSlug) continue;
    const names = LANGS.map((l) => (LOC_I18N[locJp]?.[l] || locJp));
    entries.push({ t: "loc", p: prefSlug, l: locSlug, n: names, c: count });
  }
}

for (const [slug, col] of Object.entries(COLLECTIONS)) {
  const names = LANGS.map((l) => col.name?.[l]).filter(Boolean);
  if (names.length) entries.push({ t: "col", s: slug, n: [...new Set(names)] });
}

const out = { langs: LANGS, entries };
writeFileSync("public/search-index.json", JSON.stringify(out), "utf-8");
console.log(`[search-index] ${entries.length} entries → public/search-index.json (${Math.round(JSON.stringify(out).length / 1024)} KB)`);
