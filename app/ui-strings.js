/**
 * UI label strings for SEO-augmenting page sections rendered server-side
 * (separate from the in-app `TR` table which is consumed by client components).
 */

export const UI_STRINGS = {
  relatedGuides: {
    ja: "撮影ガイド", en: "Photography Guides", zh: "摄影指南", "zh-tw": "攝影指南", ko: "촬영 가이드",
    es: "Guías de fotografía", fr: "Guides de photographie", de: "Fotografie-Guides", pt: "Guias de fotografia",
    it: "Guide di fotografia", ru: "Фото-гайды", ar: "أدلة التصوير", hi: "फोटोग्राफी गाइड",
    th: "คู่มือถ่ายภาพ", vi: "Hướng dẫn chụp ảnh", id: "Panduan Fotografi", tr: "Fotoğraf Rehberleri",
    nl: "Fotografiegidsen", pl: "Przewodniki fotograficzne", sv: "Fotoguider", fa: "راهنماهای عکاسی",
    he: "מדריכי צילום", bn: "ফটোগ্রাফি গাইড", tl: "Mga Gabay sa Photography", uk: "Фото-гіди",
  },
  aboutThisLocation: {
    ja: "この撮影地について", en: "About this location", zh: "关于这个地点", "zh-tw": "關於這個地點", ko: "이 촬영지 소개",
    es: "Sobre este lugar", fr: "À propos de ce lieu", de: "Über diesen Ort", pt: "Sobre este local",
    it: "Informazioni su questo luogo", ru: "Об этом месте", ar: "حول هذا المكان", hi: "इस स्थान के बारे में",
    th: "เกี่ยวกับสถานที่นี้", vi: "Về địa điểm này", id: "Tentang lokasi ini", tr: "Bu konum hakkında",
    nl: "Over deze locatie", pl: "O tym miejscu", sv: "Om denna plats", fa: "درباره این مکان",
    he: "אודות מיקום זה", bn: "এই স্থান সম্পর্কে", tl: "Tungkol sa lokasyong ito", uk: "Про це місце",
  },
  keyFeatures: {
    ja: "撮影ポイント", en: "Key features", zh: "主要看点", "zh-tw": "主要看點", ko: "주요 포인트",
    es: "Aspectos destacados", fr: "Points forts", de: "Highlights", pt: "Destaques",
    it: "Punti salienti", ru: "Особенности", ar: "أبرز المعالم", hi: "मुख्य विशेषताएं",
    th: "จุดเด่น", vi: "Điểm nổi bật", id: "Sorotan utama", tr: "Öne çıkanlar",
    nl: "Kenmerken", pl: "Kluczowe cechy", sv: "Höjdpunkter", fa: "ویژگی‌های کلیدی",
    he: "תכונות עיקריות", bn: "মূল বৈশিষ্ট্য", tl: "Mga pangunahing tampok", uk: "Ключові особливості",
  },
};

export function ui(key, lang) {
  const m = UI_STRINGS[key];
  if (!m) return key;
  return m[lang] || m.en || key;
}
