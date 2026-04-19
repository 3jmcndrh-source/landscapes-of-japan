import { LANGS, HREFLANG, SITE_URL } from "./i18n-meta.js";

export default function sitemap() {
  const now = new Date();
  const languages = {};
  for (const l of LANGS) {
    languages[HREFLANG[l]] = `${SITE_URL}/${l}`;
  }
  languages["x-default"] = `${SITE_URL}/en`;

  return LANGS.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: lang === "ja" || lang === "en" ? 1.0 : 0.8,
    alternates: { languages },
  }));
}
