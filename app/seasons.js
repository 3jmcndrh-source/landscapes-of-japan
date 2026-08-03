/**
 * 季節の定義とラベル。
 * 旧 SeasonBar.js (loc ページの12ヶ月シーズンバー) は 2026-07 に UI ごと削除。
 * 写真ページの「この場所の他の季節」とコレクションの季節フィルタが
 * SEASONS / seasonLabel だけを使うため、それらを残してこちらに移した。
 */

export const SEASONS = [
  { key: "spring", icon: "🌸", months: [3, 4, 5] },
  { key: "summer", icon: "☀", months: [6, 7, 8] },
  { key: "autumn", icon: "🍁", months: [9, 10, 11] },
  { key: "winter", icon: "❄", months: [12, 1, 2] },
];

/* 写真ページ対応 7言語 (ja,en,zh-tw,de,es,ar,ko) + zh。他言語は en フォールバック */
export const SEASON_LABELS = {
  spring: { ja: "春", en: "Spring", zh: "春", "zh-tw": "春", ko: "봄", de: "Frühling", es: "Primavera", ar: "الربيع" },
  summer: { ja: "夏", en: "Summer", zh: "夏", "zh-tw": "夏", ko: "여름", de: "Sommer", es: "Verano", ar: "الصيف" },
  autumn: { ja: "秋", en: "Autumn", zh: "秋", "zh-tw": "秋", ko: "가을", de: "Herbst", es: "Otoño", ar: "الخريف" },
  winter: { ja: "冬", en: "Winter", zh: "冬", "zh-tw": "冬", ko: "겨울", de: "Winter", es: "Invierno", ar: "الشتاء" },
};
export const seasonLabel = (key, lang) => SEASON_LABELS[key]?.[lang] || SEASON_LABELS[key]?.en || key;
