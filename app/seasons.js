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

/* 25言語すべて。2026-09-08 に不足17言語を補った (⑦の概念語でも使う) */
export const SEASON_LABELS = {
  spring: { ja: "春", en: "Spring", zh: "春", "zh-tw": "春", ko: "봄", de: "Frühling", es: "Primavera", ar: "الربيع" , fr: "Printemps", pt: "Primavera", it: "Primavera", ru: "Весна", hi: "वसंत", th: "ฤดูใบไม้ผลิ", vi: "Mùa xuân", id: "Musim semi", tr: "İlkbahar", nl: "Lente", pl: "Wiosna", sv: "Vår", fa: "بهار", he: "אביב", bn: "বসন্ত", tl: "Tagsibol", uk: "Весна" },
  summer: { ja: "夏", en: "Summer", zh: "夏", "zh-tw": "夏", ko: "여름", de: "Sommer", es: "Verano", ar: "الصيف" , fr: "Été", pt: "Verão", it: "Estate", ru: "Лето", hi: "ग्रीष्म", th: "ฤดูร้อน", vi: "Mùa hè", id: "Musim panas", tr: "Yaz", nl: "Zomer", pl: "Lato", sv: "Sommar", fa: "تابستان", he: "קיץ", bn: "গ্রীষ্ম", tl: "Tag-init", uk: "Літо" },
  autumn: { ja: "秋", en: "Autumn", zh: "秋", "zh-tw": "秋", ko: "가을", de: "Herbst", es: "Otoño", ar: "الخريف" , fr: "Automne", pt: "Outono", it: "Autunno", ru: "Осень", hi: "शरद", th: "ฤดูใบไม้ร่วง", vi: "Mùa thu", id: "Musim gugur", tr: "Sonbahar", nl: "Herfst", pl: "Jesień", sv: "Höst", fa: "پاییز", he: "סתיו", bn: "শরৎ", tl: "Taglagas", uk: "Осінь" },
  winter: { ja: "冬", en: "Winter", zh: "冬", "zh-tw": "冬", ko: "겨울", de: "Winter", es: "Invierno", ar: "الشتاء" , fr: "Hiver", pt: "Inverno", it: "Inverno", ru: "Зима", hi: "शीत", th: "ฤดูหนาว", vi: "Mùa đông", id: "Musim dingin", tr: "Kış", nl: "Winter", pl: "Zima", sv: "Vinter", fa: "زمستان", he: "חורף", bn: "শীত", tl: "Taglamig", uk: "Зима" },
};
export const seasonLabel = (key, lang) => SEASON_LABELS[key]?.[lang] || SEASON_LABELS[key]?.en || key;
