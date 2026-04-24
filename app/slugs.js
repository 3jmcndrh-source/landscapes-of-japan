/* ── Prefecture slugs (JP ↔ English) ── */
export const PREF_SLUGS = {
  "北海道": "hokkaido",
  "千葉県": "chiba",
  "東京都": "tokyo",
  "神奈川県": "kanagawa",
  "石川県": "ishikawa",
  "山梨県": "yamanashi",
  "長野県": "nagano",
  "岐阜県": "gifu",
  "愛知県": "aichi",
  "三重県": "mie",
  "京都府": "kyoto",
  "兵庫県": "hyogo",
  "奈良県": "nara",
  "徳島県": "tokushima",
  "香川県": "kagawa",
  "愛媛県": "ehime",
  "高知県": "kochi",
  "福岡県": "fukuoka",
  "大分県": "oita",
  "沖縄県": "okinawa",
};

/* ── Location slugs (JP ↔ English) ── */
export const LOC_SLUGS = {
  /* Hokkaido */
  "札幌": "sapporo",
  "さっぽろ雪まつり": "sapporo-snow-festival",
  "旭山動物園": "asahiyama-zoo",
  "美幌峠": "bihoro-pass",
  "知床": "shiretoko",
  "摩周湖": "lake-mashu",
  "阿寒": "akan",
  "富良野": "furano",
  "三段滝公園": "sandan-falls-park",
  "室蘭": "muroran",
  "小樽": "otaru",
  "美唄": "bibai",
  "洞爺湖": "lake-toya",
  "登別": "noboribetsu",
  "北竜町": "hokuryu",
  /* Chiba */
  "鴨川シーワールド": "kamogawa-sea-world",
  /* Tokyo */
  "東京": "tokyo-city",
  "品川": "shinagawa",
  /* Kanagawa */
  "横浜": "yokohama",
  "鎌倉": "kamakura",
  /* Ishikawa */
  "金沢": "kanazawa",
  /* Yamanashi */
  "新倉山浅間公園": "arakurayama-sengen-park",
  "河口湖": "lake-kawaguchi",
  /* Nagano */
  "松本城": "matsumoto-castle",
  "高遠城址公園": "takato-castle-park",
  "駒つなぎの桜": "komatsunagi-cherry",
  "長野県天空の楽園": "achi-stargazing",
  /* Gifu */
  "白川郷": "shirakawa-go",
  /* Aichi */
  "東山動物園": "higashiyama-zoo",
  /* Mie */
  "梅林公園": "bairin-park",
  "横山展望台": "yokoyama-observatory",
  "朝熊山展望台": "asama-observatory",
  "おはらい町・おかげ横丁": "oharaimachi-okage-yokocho",
  "伊勢神宮": "ise-jingu",
  "夫婦岩": "meoto-iwa",
  "鳥羽水族館": "toba-aquarium",
  /* Kyoto */
  "清水寺周辺": "kiyomizu-area",
  "清水寺": "kiyomizu-dera",
  "平等院鳳凰堂": "byodoin-phoenix-hall",
  "東福寺": "tofuku-ji",
  "金閣寺": "kinkaku-ji",
  /* Hyogo */
  "姫路城": "himeji-castle",
  /* Nara */
  "法隆寺 夢殿": "horyu-ji-yumedono",
  "法隆寺": "horyu-ji",
  /* Tokushima */
  "鳴門海峡": "naruto-strait",
  "大鳴門橋": "onaruto-bridge",
  /* Kagawa */
  "父母ヶ浜": "chichibugahama",
  /* Ehime */
  "亀老山展望台": "kirosan-observatory",
  "来島海峡大橋": "kurushima-kaikyo-bridge",
  "松山城": "matsuyama-castle",
  "道後温泉": "dogo-onsen",
  /* Kochi */
  "にこ淵": "nikobuchi",
  "名越屋沈下橋": "nagoya-submersible-bridge",
  "高知城": "kochi-castle",
  "桂浜": "katsurahama",
  /* Fukuoka */
  "福岡": "fukuoka-city",
  /* Oita */
  "別府": "beppu",
  "湯布院": "yufuin",
  /* Okinawa */
  "宮古島": "miyakojima",
  "沖縄": "okinawa-main",
};

/* Reverse lookups */
export const PREF_BY_SLUG = Object.fromEntries(
  Object.entries(PREF_SLUGS).map(([jp, slug]) => [slug, jp])
);
export const LOC_BY_SLUG = Object.fromEntries(
  Object.entries(LOC_SLUGS).map(([jp, slug]) => [slug, jp])
);

/* Helpers */
export const prefSlug = (jp) => PREF_SLUGS[jp];
export const locSlug = (jp) => LOC_SLUGS[jp];
export const prefFromSlug = (slug) => PREF_BY_SLUG[slug];
export const locFromSlug = (slug) => LOC_BY_SLUG[slug];
