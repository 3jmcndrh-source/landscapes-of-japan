/**
 * GSC API から自動取得 — 過去90日の top queries
 * Generated: 2026-05-17T14:31:45.220Z
 * 更新: GitHub Actions で月次 (.github/workflows/monthly-kw-update.yml)
 */
export const TOP_QUERIES_BY_LANG = {
  "ja": [
    "名越 屋 沈下 橋",
    "小樽 夕日",
    "10 円 玉 平等 院 鳳凰 堂",
    "10円 平等院鳳凰堂",
    "10円 玉 平等院",
    "10円玉 平等院",
    "十 円玉 平等院",
    "十円玉 建物",
    "室蘭 市",
    "平等 院 鳳凰 堂",
    "平等院10円玉",
    "平等院鳳凰堂 10円 玉 いつ",
    "知床 読み方"
  ],
  "en": [
    "oita onsen",
    "furano flower fields",
    "furano lavender fields",
    "hokkaido furano",
    "furano flower fields hokkaido japan",
    "furano hokkaido japan",
    "furano in hokkaido",
    "hokkaido snow festival 2026",
    "hokkaido winter festival 2026",
    "chinkabashi",
    "chinkabashi bridge",
    "akan japan",
    "akan lake hokkaido",
    "bihoro pass",
    "bihoro pass hokkaido",
    "furano flower",
    "furano flowers",
    "furano hokkaido",
    "himeji castle in autumn",
    "lake akan",
    "lake suwa nagano japan",
    "lavender furano",
    "vercel japan",
    "左右対称？"
  ],
  "zh-tw": [
    "弘法山古墳",
    "新倉山淺間公園",
    "arakurayama sengen park",
    "新 仓 山 浅 间 公园",
    "arakurayama park",
    "japan prefectures",
    "弘法 山 古墳",
    "新 倉山 淺間 公園",
    "新倉山淺間公園 英文",
    "都道府縣查詢"
  ],
  "de": [
    "noboribetsu",
    "suwa see",
    "ishikawa japan",
    "kanazawa ishikawa",
    "nikobuchi",
    "noboribetsu onsen",
    "suwa-see",
    "bihoro pass",
    "ishikawa japanese",
    "ishikawa kanazawa",
    "japan ishikawa",
    "lake kawaguchi",
    "noboribetsu hokkaido",
    "otaru canal sunset",
    "präfektur ishikawa",
    "sapporo schneefestival 2026"
  ],
  "vi": [
    "byodo in"
  ],
  "es": [
    "muroran",
    "matsuyama castle",
    "muroran japan",
    "castillo matsuyama",
    "chiba japan",
    "joyama park nagano",
    "kamakura kanagawa",
    "kiro-san observatory",
    "muroran hokkaido",
    "okage yokocho"
  ],
  "id": [
    "festival salju sapporo 2026",
    "sapporo snow festival 2026"
  ],
  "zh": [
    "joyama park matsumoto",
    "立石公園 星空",
    "阿寒"
  ],
  "nl": [
    "noboribetsu onsen hokkaido",
    "noboribetsu onsens",
    "onsen noboribetsu"
  ],
  "it": [
    "sapporo festival della neve"
  ],
  "fr": [
    "shinagawa",
    "shinagawa tokyo"
  ],
  "ar": [
    "مهرجان سابورو للثلوج في اليابان",
    "مهرجان سابورو",
    "ubuyagasaki",
    "ضريح ايسه",
    "مهرجان سابورو للثلج",
    "مهرجان سابورو للثلوج"
  ],
  "ru": [
    "замок мацумото"
  ],
  "ko": [
    "시레토코",
    "니요도강",
    "무로란"
  ]
};

export function mergeWithMeta(seoMeta, lang) {
  const dynamic = TOP_QUERIES_BY_LANG[lang] || [];
  const existing = seoMeta[lang]?.keywords || [];
  // Dedupe and limit total to 50
  const merged = [...new Set([...existing, ...dynamic])].slice(0, 50);
  return merged;
}
