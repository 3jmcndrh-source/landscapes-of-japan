/**
 * ⑦ 「画像の内容から探す」ための概念語。
 *
 * 何をしているか:
 *   写真そのものの特徴 (CLIP の画像ベクトル) と、ここに並べた概念文の特徴を
 *   突き合わせ、その近さを scripts/generate-photo-vectors.mjs が
 *   public/search-phrases.bin へ書き出す。タグの部分一致ではない。
 *
 * 概念の出どころは3種類:
 *   from: "collection"  既存のコレクション名を使う
 *   from: "season"      既存の季節ラベルを使う
 *   from: "own"         ここで語を持つ
 *
 * いずれも25言語すべてに自言語の表示名がある (2026-09-08 に不足分を補った)。
 * 英語で代用しているものは conceptHasLang が false を返すので、
 * 「対応済み」と数えずに済む。
 *
 * prompt は英語で固定する。CLIP の文章側は英語で学習されているため、
 * 利用者が入力した文をそのままモデルへ渡す方式は採っていない。
 * 入力は各言語のラベルと照合して概念へ結び付ける。
 * どの言語がどこまで自分の言葉で引けるかは conceptHasLang で判定でき、
 * 実測値は docs/search-languages.md に残す。
 */
import { COLLECTION_META, COLLECTION_SLUGS, getCollectionName } from "./collections-meta.js";
import { SEASONS, SEASON_LABELS, seasonLabel } from "./seasons.js";

/** コレクション由来の概念に与える英語の説明文 */
const COLLECTION_PROMPT = {
  "cherry-blossoms": "a photo of cherry blossom trees in full bloom",
  "autumn-foliage": "a photo of autumn leaves in red and orange",
  "snow": "a photo of a snow covered winter landscape",
  "castles": "a photo of a Japanese castle with stone walls",
  "temples-shrines": "a photo of a Japanese temple or shrine building",
  "hot-springs": "a photo of a hot spring with steam rising",
  "coastal": "a photo of the sea coast with waves and a beach",
  "night-views": "a photo of a city at night with lights",
  "waterfalls": "a photo of a waterfall falling over rocks",
  "lakes": "a photo of a calm lake surrounded by nature",
  "birds": "a close up photo of a wild bird",
  "animals": "a close up photo of a wild animal",
};

const SEASON_PROMPT = {
  spring: "a photo of a landscape in spring with fresh green and flowers",
  summer: "a photo of a landscape in summer with deep green and blue sky",
  autumn: "a photo of a landscape in autumn with warm colours",
  winter: "a photo of a landscape in winter with bare trees and snow",
};

/** ここで語を持つ概念。写真で実際に探される見た目の語だけに絞る */
const OWN = [
  {
    key: "sunset",
    prompt: "a photo of a sunset with an orange and red sky",
    label: { ja: "夕焼け", en: "sunset", zh: "日落", "zh-tw": "日落", ko: "노을", es: "atardecer", fr: "coucher de soleil", de: "Sonnenuntergang", pt: "pôr do sol", it: "tramonto", ru: "закат", ar: "غروب الشمس", hi: "सूर्यास्त", th: "พระอาทิตย์ตก", vi: "hoàng hôn", id: "matahari terbenam", tr: "gün batımı", nl: "zonsondergang", pl: "zachód słońca", sv: "solnedgång", fa: "غروب آفتاب", he: "שקיעה", bn: "সূর্যাস্ত", tl: "paglubog ng araw", uk: "захід сонця" },
  },
  {
    key: "sunrise",
    prompt: "a photo of a sunrise over the horizon",
    label: { ja: "日の出", en: "sunrise", zh: "日出", "zh-tw": "日出", ko: "일출", es: "amanecer", fr: "lever de soleil", de: "Sonnenaufgang", pt: "nascer do sol", it: "alba", ru: "рассвет", ar: "شروق الشمس", hi: "सूर्योदय", th: "พระอาทิตย์ขึ้น", vi: "bình minh", id: "matahari terbit", tr: "gün doğumu", nl: "zonsopgang", pl: "wschód słońca", sv: "soluppgång", fa: "طلوع آفتاب", he: "זריחה", bn: "সূর্যোদয়", tl: "pagsikat ng araw", uk: "схід сонця" },
  },
  {
    key: "starry-sky",
    prompt: "a photo of a starry night sky full of stars",
    label: { ja: "星空", en: "starry sky", zh: "星空", "zh-tw": "星空", ko: "별하늘", es: "cielo estrellado", fr: "ciel étoilé", de: "Sternenhimmel", pt: "céu estrelado", it: "cielo stellato", ru: "звёздное небо", ar: "سماء مرصعة بالنجوم", hi: "तारों भरा आकाश", th: "ท้องฟ้าเต็มไปด้วยดาว", vi: "bầu trời đầy sao", id: "langit berbintang", tr: "yıldızlı gökyüzü", nl: "sterrenhemel", pl: "rozgwieżdżone niebo", sv: "stjärnhimmel", fa: "آسمان پرستاره", he: "שמיים זרועי כוכבים", bn: "তারাভরা আকাশ", tl: "mabituing langit", uk: "зоряне небо" },
  },
  {
    key: "mist",
    prompt: "a photo of a misty foggy landscape",
    label: { ja: "霧", en: "mist", zh: "雾", "zh-tw": "霧", ko: "안개", es: "niebla", fr: "brume", de: "Nebel", pt: "névoa", it: "nebbia", ru: "туман", ar: "ضباب", hi: "कोहरा", th: "หมอก", vi: "sương mù", id: "kabut", tr: "sis", nl: "mist", pl: "mgła", sv: "dimma", fa: "مه", he: "ערפל", bn: "কুয়াশা", tl: "hamog", uk: "туман" },
  },
  {
    key: "mountain",
    prompt: "a photo of a mountain range with peaks",
    label: { ja: "山", en: "mountain", zh: "山", "zh-tw": "山", ko: "산", es: "montaña", fr: "montagne", de: "Berg", pt: "montanha", it: "montagna", ru: "гора", ar: "جبل", hi: "पर्वत", th: "ภูเขา", vi: "núi", id: "gunung", tr: "dağ", nl: "berg", pl: "góra", sv: "berg", fa: "کوه", he: "הר", bn: "পাহাড়", tl: "bundok", uk: "гора" },
  },
  {
    key: "forest",
    prompt: "a photo of a dense forest with trees",
    label: { ja: "森", en: "forest", zh: "森林", "zh-tw": "森林", ko: "숲", es: "bosque", fr: "forêt", de: "Wald", pt: "floresta", it: "foresta", ru: "лес", ar: "غابة", hi: "जंगल", th: "ป่า", vi: "rừng", id: "hutan", tr: "orman", nl: "bos", pl: "las", sv: "skog", fa: "جنگل", he: "יער", bn: "বন", tl: "gubat", uk: "ліс" },
  },
  {
    key: "river",
    prompt: "a photo of a river flowing through a valley",
    label: { ja: "川", en: "river", zh: "河流", "zh-tw": "河流", ko: "강", es: "río", fr: "rivière", de: "Fluss", pt: "rio", it: "fiume", ru: "река", ar: "نهر", hi: "नदी", th: "แม่น้ำ", vi: "sông", id: "sungai", tr: "nehir", nl: "rivier", pl: "rzeka", sv: "flod", fa: "رودخانه", he: "נהר", bn: "নদী", tl: "ilog", uk: "річка" },
  },
  {
    key: "flowers",
    prompt: "a close up photo of colourful flowers",
    label: { ja: "花", en: "flowers", zh: "花", "zh-tw": "花", ko: "꽃", es: "flores", fr: "fleurs", de: "Blumen", pt: "flores", it: "fiori", ru: "цветы", ar: "زهور", hi: "फूल", th: "ดอกไม้", vi: "hoa", id: "bunga", tr: "çiçekler", nl: "bloemen", pl: "kwiaty", sv: "blommor", fa: "گل‌ها", he: "פרחים", bn: "ফুল", tl: "bulaklak", uk: "квіти" },
  },
  {
    key: "reflection",
    prompt: "a photo of a landscape reflected on still water",
    label: { ja: "水鏡", en: "reflection on water", zh: "水面倒影", "zh-tw": "水面倒影", ko: "물에 비친 풍경", es: "reflejo en el agua", fr: "reflet sur l'eau", de: "Spiegelung im Wasser", pt: "reflexo na água", it: "riflesso sull'acqua", ru: "отражение в воде", ar: "انعكاس على الماء", hi: "पानी में प्रतिबिंब", th: "เงาสะท้อนบนน้ำ", vi: "phản chiếu trên mặt nước", id: "pantulan di air", tr: "suda yansıma", nl: "weerspiegeling in water", pl: "odbicie w wodzie", sv: "spegling i vatten", fa: "بازتاب در آب", he: "השתקפות במים", bn: "জলে প্রতিফলন", tl: "repleksyon sa tubig", uk: "відображення у воді" },
  },
  {
    key: "bridge",
    prompt: "a photo of a large bridge over water",
    label: { ja: "橋", en: "bridge", zh: "桥", "zh-tw": "橋", ko: "다리", es: "puente", fr: "pont", de: "Brücke", pt: "ponte", it: "ponte", ru: "мост", ar: "جسر", hi: "पुल", th: "สะพาน", vi: "cầu", id: "jembatan", tr: "köprü", nl: "brug", pl: "most", sv: "bro", fa: "پل", he: "גשר", bn: "সেতু", tl: "tulay", uk: "міст" },
  },
];

/**
 * 複合語を1つの文にするときの短い名詞句。
 * 「霧のかかった山」を mist と mountain の AND ではなく、
 * 「霧と霧に覆われた山の写真」という1つの文として画像と突き合わせるために使う。
 * 実測で、AND より入力に合う写真が上位に来た
 * (AND では富良野の花畑や石垣島が混ざっていた)。
 */
const NOUN = {
 "cherry-blossoms": "cherry blossom trees in bloom",
 "autumn-foliage": "red and orange autumn leaves",
 "snow": "deep snow",
 "castles": "a Japanese castle",
 "temples-shrines": "a Japanese temple or shrine",
 "hot-springs": "a steaming hot spring",
 "coastal": "the sea coast",
 "night-views": "city lights at night",
 "waterfalls": "a waterfall",
 "lakes": "a calm lake",
 "birds": "a wild bird",
 "animals": "a wild animal",
 "season-spring": "fresh spring green",
 "season-summer": "deep summer green",
 "season-autumn": "warm autumn colours",
 "season-winter": "a bare winter landscape",
 "sunset": "an orange sunset sky",
 "sunrise": "a sunrise over the horizon",
 "starry-sky": "a sky full of stars",
 "mist": "mist and fog",
 "mountain": "a mountain",
 "forest": "a forest of trees",
 "river": "a river",
 "flowers": "colourful flowers",
 "reflection": "a reflection on still water",
 "bridge": "a bridge"
};

/** 単独の概念文 / 2つを組み合わせた文 */
export const conceptPhrase = (keys) => {
  const ns = keys.map((k) => NOUN[k]).filter(Boolean);
  if (!ns.length) return null;
  if (ns.length === 1) return CONCEPT_BY_KEY[keys[0]]?.prompt || ("a photo of " + ns[0]);
  return "a photo of " + ns.slice(0, 3).join(" with ");
};

export const CONCEPTS = [
  ...COLLECTION_SLUGS.filter((s) => COLLECTION_PROMPT[s]).map((s) => ({
    key: s, prompt: COLLECTION_PROMPT[s], from: "collection",
  })),
  ...SEASONS.map((s) => ({
    key: `season-${s.key}`, prompt: SEASON_PROMPT[s.key], from: "season", season: s.key,
  })),
  ...OWN.map((o) => ({ ...o, from: "own" })),
];

export const CONCEPT_BY_KEY = Object.fromEntries(CONCEPTS.map((c) => [c.key, c]));

/** 概念の表示名。出どころごとに既存の訳を引く (無い言語は英語) */
export function conceptLabel(key, lang) {
  const c = CONCEPT_BY_KEY[key];
  if (!c) return key;
  if (c.from === "collection") return getCollectionName(key, lang);
  if (c.from === "season") return seasonLabel(c.season, lang);
  return c.label[lang] || c.label.en || key;
}

/**
 * その言語の言葉そのものを持っているか。
 * 英語で代用しているものは「対応済み」に数えない。
 */
export function conceptHasLang(key, lang) {
  const c = CONCEPT_BY_KEY[key];
  if (!c) return false;
  if (c.from === "collection") return Boolean(COLLECTION_META[key]?.name?.[lang]);
  if (c.from === "season") return Boolean(SEASON_LABELS[c.season]?.[lang]);
  return Boolean(c.label[lang]);
}

/** 概念を引くための語をすべて返す (自言語 + 英語 + キー) */
export function conceptTerms(key, lang) {
  const c = CONCEPT_BY_KEY[key];
  if (!c) return [];
  const out = new Set();
  const push = (v) => { if (v && typeof v === "string") out.add(v); };
  push(conceptLabel(key, lang));
  push(conceptLabel(key, "en"));
  push(key.replace(/^season-/, "").replace(/-/g, " "));
  return [...out];
}
