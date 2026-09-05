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
  theater: {
    ja: "シアター", en: "Theater", zh: "剧场", "zh-tw": "劇場", ko: "시어터",
    es: "Teatro", fr: "Théâtre", de: "Theater", pt: "Teatro",
    it: "Teatro", ru: "Театр", ar: "مسرح", hi: "थिएटर",
    th: "โรงละคร", vi: "Trình chiếu", id: "Teater", tr: "Tiyatro",
    nl: "Theater", pl: "Teatr", sv: "Teater", fa: "تئاتر",
    he: "תיאטרון", bn: "থিয়েটার", tl: "Teatro", uk: "Театр",
  },
};

export function ui(key, lang) {
  const m = UI_STRINGS[key];
  if (!m) return key;
  return m[lang] || m.en || key;
}

/* ①②⑤ で追加した UI 文言 (25言語)。既存の UI_STRINGS と同じ方式。 */
UI_STRINGS.explore = { "ja": "探す", "en": "Explore", "zh": "探索", "zh-tw": "探索", "ko": "탐색", "es": "Explorar", "fr": "Explorer", "de": "Entdecken", "pt": "Explorar", "it": "Esplora", "ru": "Обзор", "ar": "استكشاف", "hi": "खोजें", "th": "สำรวจ", "vi": "Khám phá", "id": "Jelajahi", "tr": "Keşfet", "nl": "Ontdekken", "pl": "Odkrywaj", "sv": "Utforska", "fa": "کاوش", "he": "גלה", "bn": "অন্বেষণ", "tl": "Tuklasin", "uk": "Огляд" };
UI_STRINGS.collections = { "ja": "コレクション", "en": "Collections", "zh": "合集", "zh-tw": "合集", "ko": "컬렉션", "es": "Colecciones", "fr": "Collections", "de": "Kollektionen", "pt": "Coleções", "it": "Collezioni", "ru": "Коллекции", "ar": "المجموعات", "hi": "संग्रह", "th": "คอลเลกชัน", "vi": "Bộ sưu tập", "id": "Koleksi", "tr": "Koleksiyonlar", "nl": "Collecties", "pl": "Kolekcje", "sv": "Samlingar", "fa": "مجموعه‌ها", "he": "אוספים", "bn": "সংগ্রহ", "tl": "Mga Koleksyon", "uk": "Колекції" };
UI_STRINGS.search = { "ja": "検索", "en": "Search", "zh": "搜索", "zh-tw": "搜尋", "ko": "검색", "es": "Buscar", "fr": "Rechercher", "de": "Suche", "pt": "Buscar", "it": "Cerca", "ru": "Поиск", "ar": "بحث", "hi": "खोज", "th": "ค้นหา", "vi": "Tìm kiếm", "id": "Cari", "tr": "Ara", "nl": "Zoeken", "pl": "Szukaj", "sv": "Sök", "fa": "جستجو", "he": "חיפוש", "bn": "অনুসন্ধান", "tl": "Maghanap", "uk": "Пошук" };
UI_STRINGS.random = { "ja": "ランダム", "en": "Random", "zh": "随机", "zh-tw": "隨機", "ko": "랜덤", "es": "Aleatorio", "fr": "Aléatoire", "de": "Zufällig", "pt": "Aleatório", "it": "Casuale", "ru": "Случайно", "ar": "عشوائي", "hi": "यादृच्छिक", "th": "สุ่ม", "vi": "Ngẫu nhiên", "id": "Acak", "tr": "Rastgele", "nl": "Willekeurig", "pl": "Losowo", "sv": "Slumpmässigt", "fa": "تصادفی", "he": "אקראי", "bn": "এলোমেলো", "tl": "Random", "uk": "Випадково" };
UI_STRINGS.contact = { "ja": "お問い合わせ", "en": "Contact", "zh": "联系", "zh-tw": "聯絡", "ko": "문의", "es": "Contacto", "fr": "Contact", "de": "Kontakt", "pt": "Contato", "it": "Contatti", "ru": "Контакты", "ar": "اتصل بنا", "hi": "संपर्क", "th": "ติดต่อ", "vi": "Liên hệ", "id": "Kontak", "tr": "İletişim", "nl": "Contact", "pl": "Kontakt", "sv": "Kontakt", "fa": "تماس", "he": "צור קשר", "bn": "যোগাযোগ", "tl": "Kontak", "uk": "Контакти" };
UI_STRINGS.menu = { "ja": "メニュー", "en": "Menu", "zh": "菜单", "zh-tw": "選單", "ko": "메뉴", "es": "Menú", "fr": "Menu", "de": "Menü", "pt": "Menu", "it": "Menu", "ru": "Меню", "ar": "القائمة", "hi": "मेन्यू", "th": "เมนู", "vi": "Menu", "id": "Menu", "tr": "Menü", "nl": "Menu", "pl": "Menu", "sv": "Meny", "fa": "منو", "he": "תפריט", "bn": "মেনু", "tl": "Menu", "uk": "Меню" };
UI_STRINGS.close = { "ja": "閉じる", "en": "Close", "zh": "关闭", "zh-tw": "關閉", "ko": "닫기", "es": "Cerrar", "fr": "Fermer", "de": "Schließen", "pt": "Fechar", "it": "Chiudi", "ru": "Закрыть", "ar": "إغلاق", "hi": "बंद करें", "th": "ปิด", "vi": "Đóng", "id": "Tutup", "tr": "Kapat", "nl": "Sluiten", "pl": "Zamknij", "sv": "Stäng", "fa": "بستن", "he": "סגור", "bn": "বন্ধ", "tl": "Isara", "uk": "Закрити" };
UI_STRINGS.language = { "ja": "言語", "en": "Language", "zh": "语言", "zh-tw": "語言", "ko": "언어", "es": "Idioma", "fr": "Langue", "de": "Sprache", "pt": "Idioma", "it": "Lingua", "ru": "Язык", "ar": "اللغة", "hi": "भाषा", "th": "ภาษา", "vi": "Ngôn ngữ", "id": "Bahasa", "tr": "Dil", "nl": "Taal", "pl": "Język", "sv": "Språk", "fa": "زبان", "he": "שפה", "bn": "ভাষা", "tl": "Wika", "uk": "Мова" };
UI_STRINGS.findPhotos = { "ja": "写真を探す", "en": "Find photos", "zh": "查找照片", "zh-tw": "尋找照片", "ko": "사진 찾기", "es": "Buscar fotos", "fr": "Trouver des photos", "de": "Fotos finden", "pt": "Encontrar fotos", "it": "Trova foto", "ru": "Найти фото", "ar": "ابحث عن الصور", "hi": "फ़ोटो खोजें", "th": "ค้นหารูปภาพ", "vi": "Tìm ảnh", "id": "Cari foto", "tr": "Fotoğraf bul", "nl": "Fotos vinden", "pl": "Znajdź zdjęcia", "sv": "Hitta foton", "fa": "یافتن عکس", "he": "מצא תמונות", "bn": "ছবি খুঁজুন", "tl": "Maghanap ng litrato", "uk": "Знайти фото" };
UI_STRINGS.byRegion = { "ja": "地域から", "en": "By region", "zh": "按地区", "zh-tw": "按地區", "ko": "지역으로", "es": "Por región", "fr": "Par région", "de": "Nach Region", "pt": "Por região", "it": "Per regione", "ru": "По регионам", "ar": "حسب المنطقة", "hi": "क्षेत्र से", "th": "ตามภูมิภาค", "vi": "Theo vùng", "id": "Menurut wilayah", "tr": "Bölgeye göre", "nl": "Per regio", "pl": "Wedługregionu", "sv": "Efter region", "fa": "بر اساس منطقه", "he": "לפי אזור", "bn": "অঞ্চল অনুসারে", "tl": "Ayon sa rehiyon", "uk": "За регіоном" };
UI_STRINGS.byColor = { "ja": "色から", "en": "By colour", "zh": "按颜色", "zh-tw": "按顏色", "ko": "색으로", "es": "Por color", "fr": "Par couleur", "de": "Nach Farbe", "pt": "Por cor", "it": "Per colore", "ru": "По цвету", "ar": "حسب اللون", "hi": "रंग से", "th": "ตามสี", "vi": "Theo màu", "id": "Menurut warna", "tr": "Renge göre", "nl": "Op kleur", "pl": "Według koloru", "sv": "Efter färg", "fa": "بر اساس رنگ", "he": "לפי צבע", "bn": "রঙ অনুসারে", "tl": "Ayon sa kulay", "uk": "За кольором" };
UI_STRINGS.noResults = { "ja": "該当する写真がありません", "en": "No photos match", "zh": "没有匹配的照片", "zh-tw": "沒有符合的照片", "ko": "일치하는 사진이 없습니다", "es": "No hay fotos", "fr": "Aucune photo", "de": "Keine Fotos gefunden", "pt": "Nenhuma foto", "it": "Nessuna foto", "ru": "Нет фотографий", "ar": "لا توجد صور", "hi": "कोई फ़ोटो नहीं", "th": "ไม่พบรูปภาพ", "vi": "Không có ảnh", "id": "Tidak ada foto", "tr": "Fotoğraf yok", "nl": "Geen fotos", "pl": "Brak zdjęć", "sv": "Inga foton", "fa": "عکسی یافت نشد", "he": "אין תמונות", "bn": "কোনো ছবি নেই", "tl": "Walang litrato", "uk": "Немає фото" };
UI_STRINGS.clearColor = { "ja": "色の選択を解除", "en": "Clear colour", "zh": "清除颜色", "zh-tw": "清除顏色", "ko": "색상 해제", "es": "Quitar color", "fr": "Effacer la couleur", "de": "Farbe zurücksetzen", "pt": "Limpar cor", "it": "Rimuovi colore", "ru": "Сбросить цвет", "ar": "مسح اللون", "hi": "रंग हटाएं", "th": "ล้างสี", "vi": "Bỏ chọn màu", "id": "Hapus warna", "tr": "Rengi temizle", "nl": "Kleur wissen", "pl": "Wyczyść kolor", "sv": "Rensa färg", "fa": "پاک کردن رنگ", "he": "נקה צבע", "bn": "রঙ মুছুন", "tl": "Alisin ang kulay", "uk": "Скинути колір" };
UI_STRINGS.loading = { "ja": "読み込み中", "en": "Loading", "zh": "加载中", "zh-tw": "載入中", "ko": "불러오는 중", "es": "Cargando", "fr": "Chargement", "de": "Wird geladen", "pt": "Carregando", "it": "Caricamento", "ru": "Загрузка", "ar": "جارٍ التحميل", "hi": "लोड हो रहा है", "th": "กำลังโหลด", "vi": "Đang tải", "id": "Memuat", "tr": "Yükleniyor", "nl": "Laden", "pl": "Ładowanie", "sv": "Laddar", "fa": "در حال بارگذاری", "he": "טוען", "bn": "লোড হচ্ছে", "tl": "Naglo-load", "uk": "Завантаження" };

/* ⑤ 色検索の色名。色だけで意味を伝えないための表示ラベル。 */
export const COLOR_LABELS = {
  red: { "ja": "赤", "en": "Red", "zh": "红", "zh-tw": "紅", "ko": "빨강", "es": "Rojo", "fr": "Rouge", "de": "Rot", "pt": "Vermelho", "it": "Rosso", "ru": "Красный", "ar": "أحمر", "hi": "लाल", "th": "แดง", "vi": "Đỏ", "id": "Merah", "tr": "Kırmızı", "nl": "Rood", "pl": "Czerwony", "sv": "Röd", "fa": "قرمز", "he": "אדום", "bn": "লাল", "tl": "Pula", "uk": "Червоний" },
  orange: { "ja": "橙", "en": "Orange", "zh": "橙", "zh-tw": "橙", "ko": "주황", "es": "Naranja", "fr": "Orange", "de": "Orange", "pt": "Laranja", "it": "Arancione", "ru": "Оранжевый", "ar": "برتقالي", "hi": "नारंगी", "th": "ส้ม", "vi": "Cam", "id": "Oranye", "tr": "Turuncu", "nl": "Oranje", "pl": "Pomarańczowy", "sv": "Orange", "fa": "نارنجی", "he": "כתום", "bn": "কমলা", "tl": "Kahel", "uk": "Помаранчевий" },
  yellow: { "ja": "黄", "en": "Yellow", "zh": "黄", "zh-tw": "黃", "ko": "노랑", "es": "Amarillo", "fr": "Jaune", "de": "Gelb", "pt": "Amarelo", "it": "Giallo", "ru": "Жёлтый", "ar": "أصفر", "hi": "पीला", "th": "เหลือง", "vi": "Vàng", "id": "Kuning", "tr": "Sarı", "nl": "Geel", "pl": "Żółty", "sv": "Gul", "fa": "زرد", "he": "צהוב", "bn": "হলুদ", "tl": "Dilaw", "uk": "Жовтий" },
  green: { "ja": "緑", "en": "Green", "zh": "绿", "zh-tw": "綠", "ko": "초록", "es": "Verde", "fr": "Vert", "de": "Grün", "pt": "Verde", "it": "Verde", "ru": "Зелёный", "ar": "أخضر", "hi": "हरा", "th": "เขียว", "vi": "Xanh lá", "id": "Hijau", "tr": "Yeşil", "nl": "Groen", "pl": "Zielony", "sv": "Grön", "fa": "سبز", "he": "ירוק", "bn": "সবুজ", "tl": "Berde", "uk": "Зелений" },
  blue: { "ja": "青", "en": "Blue", "zh": "蓝", "zh-tw": "藍", "ko": "파랑", "es": "Azul", "fr": "Bleu", "de": "Blau", "pt": "Azul", "it": "Blu", "ru": "Синий", "ar": "أزرق", "hi": "नीला", "th": "น้ำเงิน", "vi": "Xanh dương", "id": "Biru", "tr": "Mavi", "nl": "Blauw", "pl": "Niebieski", "sv": "Blå", "fa": "آبی", "he": "כחול", "bn": "নীল", "tl": "Asul", "uk": "Синій" },
  purple: { "ja": "紫", "en": "Purple", "zh": "紫", "zh-tw": "紫", "ko": "보라", "es": "Morado", "fr": "Violet", "de": "Violett", "pt": "Roxo", "it": "Viola", "ru": "Фиолетовый", "ar": "بنفسجي", "hi": "बैंगनी", "th": "ม่วง", "vi": "Tím", "id": "Ungu", "tr": "Mor", "nl": "Paars", "pl": "Fioletowy", "sv": "Lila", "fa": "بنفش", "he": "סגול", "bn": "বেগুনি", "tl": "Lila", "uk": "Фіолетовий" },
  pink: { "ja": "ピンク", "en": "Pink", "zh": "粉", "zh-tw": "粉", "ko": "분홍", "es": "Rosa", "fr": "Rose", "de": "Rosa", "pt": "Rosa", "it": "Rosa", "ru": "Розовый", "ar": "وردي", "hi": "गुलाबी", "th": "ชมพู", "vi": "Hồng", "id": "Merah muda", "tr": "Pembe", "nl": "Roze", "pl": "Różowy", "sv": "Rosa", "fa": "صورتی", "he": "ורוד", "bn": "গোলাপি", "tl": "Rosas", "uk": "Рожевий" },
  brown: { "ja": "茶", "en": "Brown", "zh": "棕", "zh-tw": "棕", "ko": "갈색", "es": "Marrón", "fr": "Marron", "de": "Braun", "pt": "Marrom", "it": "Marrone", "ru": "Коричневый", "ar": "بني", "hi": "भूरा", "th": "น้ำตาล", "vi": "Nâu", "id": "Cokelat", "tr": "Kahverengi", "nl": "Bruin", "pl": "Brązowy", "sv": "Brun", "fa": "قهوه‌ای", "he": "חום", "bn": "বাদামী", "tl": "Kayumanggi", "uk": "Коричневий" },
  white: { "ja": "白", "en": "White", "zh": "白", "zh-tw": "白", "ko": "하양", "es": "Blanco", "fr": "Blanc", "de": "Weiß", "pt": "Branco", "it": "Bianco", "ru": "Белый", "ar": "أبيض", "hi": "सफ़ेद", "th": "ขาว", "vi": "Trắng", "id": "Putih", "tr": "Beyaz", "nl": "Wit", "pl": "Biały", "sv": "Vit", "fa": "سفید", "he": "לבן", "bn": "সাদা", "tl": "Puti", "uk": "Білий" },
  gray: { "ja": "灰", "en": "Grey", "zh": "灰", "zh-tw": "灰", "ko": "회색", "es": "Gris", "fr": "Gris", "de": "Grau", "pt": "Cinza", "it": "Grigio", "ru": "Серый", "ar": "رمادي", "hi": "धूसर", "th": "เทา", "vi": "Xám", "id": "Abu-abu", "tr": "Gri", "nl": "Grijs", "pl": "Szary", "sv": "Grå", "fa": "خاکستری", "he": "אפור", "bn": "ধূসর", "tl": "Kulay-abo", "uk": "Сірий" },
  black: { "ja": "黒", "en": "Black", "zh": "黑", "zh-tw": "黑", "ko": "검정", "es": "Negro", "fr": "Noir", "de": "Schwarz", "pt": "Preto", "it": "Nero", "ru": "Чёрный", "ar": "أسود", "hi": "काला", "th": "ดำ", "vi": "Đen", "id": "Hitam", "tr": "Siyah", "nl": "Zwart", "pl": "Czarny", "sv": "Svart", "fa": "سیاه", "he": "שחור", "bn": "কালো", "tl": "Itim", "uk": "Чорний" },
};
export function colorLabel(key, lang) {
  const m = COLOR_LABELS[key];
  return m ? (m[lang] || m.en || key) : key;
}
