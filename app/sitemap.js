import { LANGS, HREFLANG, SITE_URL } from "./i18n-meta.js";
import { PREFECTURES } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";

export default function sitemap() {
  const now = new Date();
  const rootLangs = {};
  for (const l of LANGS) rootLangs[HREFLANG[l]] = `${SITE_URL}/${l}`;
  rootLangs["x-default"] = `${SITE_URL}/en`;

  const entries = LANGS.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: lang === "ja" || lang === "en" ? 1.0 : 0.8,
    alternates: { languages: rootLangs },
  }));

  for (const pf of PREFECTURES) {
    const prefSlug = PREF_SLUGS[pf.pref];
    if (!prefSlug) continue;

    const prefLangs = {};
    for (const l of LANGS) prefLangs[HREFLANG[l]] = `${SITE_URL}/${l}/${prefSlug}`;
    prefLangs["x-default"] = `${SITE_URL}/en/${prefSlug}`;

    for (const lang of LANGS) {
      entries.push({
        url: `${SITE_URL}/${lang}/${prefSlug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: prefLangs },
      });
    }

    const uniqueLocs = [...new Set(pf.photos.map((p) => p.loc).filter(Boolean))];
    for (const locJp of uniqueLocs) {
      const locSlug = LOC_SLUGS[locJp];
      if (!locSlug) continue;

      const locLangs = {};
      for (const l of LANGS) locLangs[HREFLANG[l]] = `${SITE_URL}/${l}/${prefSlug}/${locSlug}`;
      locLangs["x-default"] = `${SITE_URL}/en/${prefSlug}/${locSlug}`;

      for (const lang of LANGS) {
        entries.push({
          url: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: { languages: locLangs },
        });
      }
    }
  }

  return entries;
}
