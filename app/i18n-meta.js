export const SITE_URL = "https://landscapes-of-japan.vercel.app";
export const OG_IMAGE = "https://res.cloudinary.com/dr53c12fo/image/upload/w_1200,h_630,c_fill,f_auto,q_auto/DSC07601_cocitq.jpg";
export const DEFAULT_LANG = "en";

export const LANGS = ["ja","en","zh","zh-tw","ko","es","fr","de","pt","it","ru","ar","hi","th","vi","id","tr","nl","pl","sv"];

export const RTL_LANGS = new Set(["ar"]);

export const HREFLANG = {
  ja:"ja", en:"en", zh:"zh-Hans", "zh-tw":"zh-Hant", ko:"ko",
  es:"es", fr:"fr", de:"de", pt:"pt", it:"it", ru:"ru", ar:"ar",
  hi:"hi", th:"th", vi:"vi", id:"id", tr:"tr", nl:"nl", pl:"pl", sv:"sv",
};

// 地域別hreflang拡張: 1つの slug を複数の region tag にマッピング
// (Google等は同じURLに複数のhreflang指定OK)
export const HREFLANG_VARIANTS = {
  en: ["en-US", "en-GB", "en-CA", "en-AU"],
  "zh-tw": ["zh-HK", "zh-MO"],   // 繁体字圏
  es: ["es-MX", "es-AR", "es-CL"],
  pt: ["pt-PT", "pt-BR"],
  fr: ["fr-CA", "fr-BE"],
  de: ["de-AT", "de-CH"],
};

/**
 * hreflang map を構築するヘルパー。
 * @param {(lang: string) => string} buildUrl - lang から URL を返す関数
 * @returns {Record<string, string>} hreflang→URL のオブジェクト
 */
export function buildHreflangMap(buildUrl) {
  const map = {};
  for (const lang of LANGS) {
    const url = buildUrl(lang);
    map[HREFLANG[lang]] = url;
    const variants = HREFLANG_VARIANTS[lang] || [];
    for (const v of variants) map[v] = url;
  }
  map["x-default"] = buildUrl("en");
  return map;
}

export const SEO_META = {
  ja: {
    title: "Landscapes of Japan — 日本の風景写真ポートフォリオ",
    description: "北海道から沖縄まで、日本全国の風景写真を掲載。京都、鎌倉、知床、宮古島など18都道府県、380枚以上の写真を公開中。",
    keywords: ["日本","風景写真","ポートフォリオ","京都","北海道","沖縄","鎌倉","知床","宮古島","自然","旅行"],
    ogLocale: "ja_JP",
  },
  en: {
    title: "Landscapes of Japan — Japanese Landscape Photography Portfolio",
    description: "A cinematic photography portfolio showcasing landscapes across Japan — Hokkaido, Kyoto, Kamakura, Shiretoko, Miyako Island and more. Over 380 photos from 18 prefectures.",
    keywords: ["Japan","landscape photography","portfolio","Kyoto","Hokkaido","Okinawa","Kamakura","Shiretoko","travel","nature"],
    ogLocale: "en_US",
  },
  zh: {
    title: "日本风景 — 日本风景摄影作品集",
    description: "从北海道到冲绳，收录日本各地的风景摄影作品。京都、镰仓、知床、宫古岛等18个都道府县，380张以上精选作品。",
    keywords: ["日本","风景摄影","作品集","京都","北海道","冲绳","镰仓","自然","旅行"],
    ogLocale: "zh_CN",
  },
  "zh-tw": {
    title: "日本風景 — 日本風景攝影作品集",
    description: "從北海道到沖繩，收錄日本各地的風景攝影作品。京都、鎌倉、知床、宮古島等18個都道府縣，380張以上精選作品。",
    keywords: ["日本","風景攝影","作品集","京都","北海道","沖繩","鎌倉","自然","旅行"],
    ogLocale: "zh_TW",
  },
  ko: {
    title: "일본의 풍경 — 일본 풍경 사진 포트폴리오",
    description: "홋카이도에서 오키나와까지, 일본 전역의 풍경 사진을 소개합니다. 교토, 가마쿠라, 시레토코, 미야코섬 등 18개 도도부현, 380여 장의 사진.",
    keywords: ["일본","풍경 사진","포트폴리오","교토","홋카이도","오키나와","가마쿠라","자연","여행"],
    ogLocale: "ko_KR",
  },
  es: {
    title: "Paisajes de Japón — Portafolio de Fotografía de Paisajes Japoneses",
    description: "Una colección cinematográfica de paisajes de todo Japón: Hokkaido, Kioto, Kamakura, Shiretoko, isla de Miyako y más. Más de 380 fotos de 18 prefecturas.",
    keywords: ["Japón","fotografía de paisajes","portafolio","Kioto","Hokkaido","Okinawa","viajes","naturaleza"],
    ogLocale: "es_ES",
  },
  fr: {
    title: "Paysages du Japon — Portfolio de Photographie de Paysages Japonais",
    description: "Une collection cinématographique de paysages du Japon : Hokkaido, Kyoto, Kamakura, Shiretoko, île de Miyako et plus. Plus de 380 photos de 18 préfectures.",
    keywords: ["Japon","photographie de paysages","portfolio","Kyoto","Hokkaido","Okinawa","voyage","nature"],
    ogLocale: "fr_FR",
  },
  de: {
    title: "Landschaften Japans — Portfolio japanischer Landschaftsfotografie",
    description: "Eine filmische Sammlung von Landschaften aus ganz Japan: Hokkaido, Kyoto, Kamakura, Shiretoko, Miyako-Insel und mehr. Über 380 Fotos aus 18 Präfekturen.",
    keywords: ["Japan","Landschaftsfotografie","Portfolio","Kyoto","Hokkaido","Okinawa","Reisen","Natur"],
    ogLocale: "de_DE",
  },
  pt: {
    title: "Paisagens do Japão — Portfólio de Fotografia de Paisagens Japonesas",
    description: "Uma coleção cinematográfica de paisagens de todo o Japão: Hokkaido, Kyoto, Kamakura, Shiretoko, Ilha de Miyako e mais. Mais de 380 fotos de 18 prefeituras.",
    keywords: ["Japão","fotografia de paisagens","portfólio","Kyoto","Hokkaido","Okinawa","viagem","natureza"],
    ogLocale: "pt_BR",
  },
  it: {
    title: "Paesaggi del Giappone — Portfolio di Fotografia di Paesaggi Giapponesi",
    description: "Una collezione cinematografica di paesaggi da tutto il Giappone: Hokkaido, Kyoto, Kamakura, Shiretoko, isola di Miyako e altro. Oltre 380 foto da 18 prefetture.",
    keywords: ["Giappone","fotografia di paesaggi","portfolio","Kyoto","Hokkaido","Okinawa","viaggi","natura"],
    ogLocale: "it_IT",
  },
  ru: {
    title: "Пейзажи Японии — Портфолио пейзажной фотографии Японии",
    description: "Кинематографическая коллекция пейзажей со всей Японии: Хоккайдо, Киото, Камакура, Сиретоко, остров Мияко и многое другое. Более 380 фотографий из 18 префектур.",
    keywords: ["Япония","пейзажная фотография","портфолио","Киото","Хоккайдо","Окинава","путешествия","природа"],
    ogLocale: "ru_RU",
  },
  ar: {
    title: "مناظر اليابان — معرض تصوير المناظر الطبيعية اليابانية",
    description: "مجموعة سينمائية من المناظر الطبيعية من جميع أنحاء اليابان: هوكايدو، كيوتو، كاماكورا، شيريتوكو، جزيرة مياكو وأكثر. أكثر من 380 صورة من 18 محافظة.",
    keywords: ["اليابان","تصوير المناظر الطبيعية","معرض","كيوتو","هوكايدو","أوكيناوا","سفر","طبيعة"],
    ogLocale: "ar_AR",
  },
  hi: {
    title: "जापान के दृश्य — जापानी लैंडस्केप फोटोग्राफी पोर्टफोलियो",
    description: "होक्काइडो से ओकिनावा तक, पूरे जापान के लैंडस्केप फोटो संग्रह। क्योटो, कामाकुरा, शिरेतोको, मियाको द्वीप आदि 18 प्रान्तों से 380 से अधिक तस्वीरें।",
    keywords: ["जापान","लैंडस्केप फोटोग्राफी","पोर्टफोलियो","क्योटो","होक्काइडो","ओकिनावा","यात्रा","प्रकृति"],
    ogLocale: "hi_IN",
  },
  th: {
    title: "ทิวทัศน์ญี่ปุ่น — พอร์ตโฟลิโอภาพถ่ายทิวทัศน์ญี่ปุ่น",
    description: "คอลเลกชันภาพถ่ายทิวทัศน์จากทั่วญี่ปุ่น ฮอกไกโด เกียวโต คามาคุระ ชิเรโทโกะ เกาะมิยาโกะ และอื่นๆ กว่า 380 ภาพจาก 18 จังหวัด",
    keywords: ["ญี่ปุ่น","ภาพถ่ายทิวทัศน์","พอร์ตโฟลิโอ","เกียวโต","ฮอกไกโด","โอกินาวา","ท่องเที่ยว","ธรรมชาติ"],
    ogLocale: "th_TH",
  },
  vi: {
    title: "Phong cảnh Nhật Bản — Bộ sưu tập ảnh phong cảnh Nhật Bản",
    description: "Bộ sưu tập ảnh phong cảnh điện ảnh từ khắp Nhật Bản: Hokkaido, Kyoto, Kamakura, Shiretoko, đảo Miyako và nhiều hơn nữa. Hơn 380 ảnh từ 18 tỉnh.",
    keywords: ["Nhật Bản","ảnh phong cảnh","bộ sưu tập","Kyoto","Hokkaido","Okinawa","du lịch","thiên nhiên"],
    ogLocale: "vi_VN",
  },
  id: {
    title: "Pemandangan Jepang — Portofolio Fotografi Pemandangan Jepang",
    description: "Koleksi sinematik pemandangan dari seluruh Jepang: Hokkaido, Kyoto, Kamakura, Shiretoko, Pulau Miyako dan lainnya. Lebih dari 380 foto dari 18 prefektur.",
    keywords: ["Jepang","fotografi pemandangan","portofolio","Kyoto","Hokkaido","Okinawa","wisata","alam"],
    ogLocale: "id_ID",
  },
  tr: {
    title: "Japonya Manzaraları — Japon Manzara Fotoğrafçılığı Portföyü",
    description: "Japonya'nın dört bir yanından sinematik manzaralar: Hokkaido, Kyoto, Kamakura, Shiretoko, Miyako Adası ve daha fazlası. 18 ilden 380'den fazla fotoğraf.",
    keywords: ["Japonya","manzara fotoğrafçılığı","portföy","Kyoto","Hokkaido","Okinawa","seyahat","doğa"],
    ogLocale: "tr_TR",
  },
  nl: {
    title: "Landschappen van Japan — Portfolio van Japanse Landschapsfotografie",
    description: "Een cinematische collectie landschappen uit heel Japan: Hokkaido, Kyoto, Kamakura, Shiretoko, Miyako-eiland en meer. Meer dan 380 foto's uit 18 prefecturen.",
    keywords: ["Japan","landschapsfotografie","portfolio","Kyoto","Hokkaido","Okinawa","reizen","natuur"],
    ogLocale: "nl_NL",
  },
  pl: {
    title: "Krajobrazy Japonii — Portfolio fotografii krajobrazowej Japonii",
    description: "Kinematograficzna kolekcja krajobrazów z całej Japonii: Hokkaido, Kioto, Kamakura, Shiretoko, wyspa Miyako i więcej. Ponad 380 zdjęć z 18 prefektur.",
    keywords: ["Japonia","fotografia krajobrazowa","portfolio","Kioto","Hokkaido","Okinawa","podróże","natura"],
    ogLocale: "pl_PL",
  },
  sv: {
    title: "Japans landskap — Portfolio av japansk landskapsfotografi",
    description: "En filmisk samling landskap från hela Japan: Hokkaido, Kyoto, Kamakura, Shiretoko, Miyako-ön och mer. Över 380 bilder från 18 prefekturer.",
    keywords: ["Japan","landskapsfotografi","portfolio","Kyoto","Hokkaido","Okinawa","resor","natur"],
    ogLocale: "sv_SE",
  },
};
