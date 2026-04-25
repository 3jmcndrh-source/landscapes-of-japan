/**
 * GSC API から自動取得 — 過去90日の top queries
 * Generated: 2026-04-25T08:02:44.580Z
 * 更新: GitHub Actions で月次 (.github/workflows/monthly-kw-update.yml)
 */
export const TOP_QUERIES_BY_LANG = {
  "vi": [
    "byodo in"
  ],
  "en": [
    "chinkabashi",
    "chinkabashi bridge",
    "hokkaido furano",
    "oita onsen",
    "vercel japan"
  ],
  "de": [
    "noboribetsu"
  ],
  "nl": [
    "noboribetsu onsen hokkaido",
    "noboribetsu onsens",
    "onsen noboribetsu"
  ],
  "zh": [
    "阿寒"
  ]
};

export function mergeWithMeta(seoMeta, lang) {
  const dynamic = TOP_QUERIES_BY_LANG[lang] || [];
  const existing = seoMeta[lang]?.keywords || [];
  // Dedupe and limit total to 50
  const merged = [...new Set([...existing, ...dynamic])].slice(0, 50);
  return merged;
}
