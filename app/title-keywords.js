/**
 * Short keyword taglines appended to <title> for high-search locations.
 * Keep under ~30 chars each — Google truncates titles around 60 chars total.
 *
 * For English (en): the tagline replaces the prefecture suffix.
 *   "Arakurayama Sengen Park: Mt Fuji + Chureito Pagoda | Landscapes of Japan"
 *
 * For Japanese (ja): a JA-native tagline replaces the prefecture suffix.
 *   "新倉山浅間公園 — 富士山+忠霊塔+桜の絶景 | Landscapes of Japan"
 *
 * For other languages: fall back to the EN tagline in parentheses, keeping the
 * native location name and prefecture as primary.
 *   "아라쿠라야마 센겐 공원 (Mt Fuji + Chureito Pagoda) - 야마나시 | Landscapes of Japan"
 *
 * Non-listed locations keep the simple "locName - prefName" form.
 */

export const LOC_TITLE_KEYWORDS_EN = {
  // Mt. Fuji icon
  "新倉山浅間公園": "Mt Fuji + Chureito Pagoda",
  "河口湖": "Lake Kawaguchi (Mt Fuji)",

  // Famous landmarks already in many searches
  "平等院鳳凰堂": "Featured on Japan's 10-Yen Coin",
  "金閣寺": "Golden Pavilion",
  "清水寺": "Kiyomizu-dera UNESCO",
  "東福寺": "Tofuku-ji Autumn Maples",
  "姫路城": "White Heron Castle UNESCO",
  "松本城": "Matsumoto Black Castle",
  "松山城": "Matsuyama Castle",
  "高知城": "Kochi Castle",
  "法隆寺": "World's Oldest Wood Temple",
  "白川郷": "UNESCO Gassho Village",
  "伊勢神宮": "Ise Grand Shrine",
  "夫婦岩": "Meoto-iwa Wedded Rocks",

  // Hokkaido — high snow/onsen search interest
  "さっぽろ雪まつり": "World's Largest Snow & Ice Sculptures",
  "知床": "UNESCO Drift Ice",
  "富良野": "Lavender + Flower Fields",
  "摩周湖": "Crystal Caldera Lake",
  "美幌峠": "Lake Kussharo Panorama",
  "登別": "Jigokudani Hell Valley",
  "阿寒": "Lake Akan + Marimo",
  "洞爺湖": "Lake Toya Crater Lake",
  "支笏湖": "Lake Shikotsu (Bluest Lake)",
  "小樽": "Otaru Historic Canal",
  "美唄": "Bibai Snow + Flowers",
  "三段滝公園": "Sandan Falls Hokkaido",
  "室蘭": "Muroran Coastal Cliffs",
  "北竜町": "Hokuryū Sunflower Fields",

  // Nagano — castles, sky, sakura
  "高遠城址公園": "Top-3 Cherry Blossom Spot",
  "駒つなぎの桜": "1000-year-old Sakura",
  "弘法山古墳": "Hilltop Sakura View",
  "長野県天空の楽園": "#1 Stargazing in Japan",
  "立石公園": "Lake Suwa Sunset View",
  "諏訪湖": "Lake Suwa + Omiwatari Ice",
  "高島公園(諏訪市)": "Suwa Castle Park",
  "城山公園(松本市)": "Matsumoto Sakura Park",
  "中町通り(松本市)": "Matsumoto Historic Street",

  // Specific viral / niche queries from GSC data
  "父母ヶ浜": "Japan's Mirror Sunset Beach",
  "にこ淵": "Niyodo Blue Sacred Pool",
  "名越屋沈下橋": "Niyodo River Submersible Bridge",
  "桂浜": "Katsurahama Beach",
  "鳴門海峡": "Naruto Whirlpools",
  "大鳴門橋": "Ōnaruto Bridge",
  "亀老山展望台": "Shimanami Kaido Panorama",
  "来島海峡大橋": "Kurushima Suspension Bridge",
  "道後温泉": "Japan's Oldest Hot Spring",

  // Onsen / Kyushu
  "別府": "Beppu Eight Hells Onsen",
  "湯布院": "Yufuin Hot Spring Town",

  // Mie spiritual
  "横山展望台": "Ago Bay Panorama",
  "朝熊山展望台": "Mt Asama Ise Bay View",
  "おはらい町・おかげ横丁": "Ise Edo-era Streetscape",
  "梅林公園": "Plum Blossom Park",
  "鳥羽水族館": "Toba Aquarium",

  // Kanagawa
  "鎌倉": "Kamakura Historic Capital",
  "横浜": "Yokohama Skyline",

  // Okinawa
  "宮古島": "Miyakojima Turquoise Beaches",
  "沖縄": "Okinawa Tropical Coast",

  // Misc
  "金沢": "Kanazawa Samurai District",
  "鴨川シーワールド": "Kamogawa Sea World",
  "東山動物園": "Higashiyama Zoo Nagoya",
};

export const LOC_TITLE_KEYWORDS_JA = {
  "新倉山浅間公園": "富士山+忠霊塔+桜の絶景",
  "河口湖": "逆さ富士の聖地",
  "平等院鳳凰堂": "10円玉の世界遺産",
  "金閣寺": "金色に輝く世界遺産",
  "清水寺": "世界遺産・清水の舞台",
  "東福寺": "通天橋から見る紅葉名所",
  "姫路城": "白鷺城・世界遺産",
  "松本城": "国宝・烏城",
  "松山城": "現存12天守の山城",
  "高知城": "現存12天守の名城",
  "法隆寺": "世界最古の木造建築",
  "白川郷": "合掌造りの世界遺産集落",
  "伊勢神宮": "日本人の心のふるさと",
  "夫婦岩": "二見興玉神社の聖地",
  "さっぽろ雪まつり": "日本最大の雪と氷の祭典",
  "知床": "世界遺産・流氷の聖地",
  "富良野": "ラベンダーと花畑の楽園",
  "摩周湖": "透明度日本一の神秘の湖",
  "美幌峠": "屈斜路湖の絶景パノラマ",
  "登別": "地獄谷温泉",
  "阿寒": "マリモの神秘湖",
  "洞爺湖": "カルデラ湖",
  "支笏湖": "支笏ブルーの湖",
  "小樽": "ノスタルジック運河の街",
  "三段滝公園": "三段の滝・北海道",
  "室蘭": "ハイドロブルーの絶壁",
  "北竜町": "ひまわりの里",
  "高遠城址公園": "天下第一の桜",
  "駒つなぎの桜": "樹齢千年のしだれ桜",
  "弘法山古墳": "丘から望む桜雲",
  "長野県天空の楽園": "日本一の星空・阿智村",
  "立石公園": "諏訪湖サンセットの絶景",
  "諏訪湖": "諏訪湖と御神渡り",
  "父母ヶ浜": "日本のウユニ塩湖",
  "にこ淵": "仁淀ブルーの聖地",
  "名越屋沈下橋": "仁淀川の沈下橋",
  "桂浜": "坂本龍馬の海",
  "鳴門海峡": "渦潮の名所",
  "大鳴門橋": "鳴門の大橋",
  "亀老山展望台": "しまなみ海道パノラマ",
  "来島海峡大橋": "世界最大級の吊り橋",
  "道後温泉": "日本最古の温泉",
  "別府": "別府八湯の地獄めぐり",
  "湯布院": "由布院温泉の街",
  "横山展望台": "英虞湾を一望",
  "朝熊山展望台": "伊勢湾と富士山が見える",
  "おはらい町・おかげ横丁": "江戸情緒の門前町",
  "梅林公園": "梅の名所",
  "鳥羽水族館": "ジュゴンに会える水族館",
  "鎌倉": "古都・武家の里",
  "横浜": "港町の夜景",
  "宮古島": "透明エメラルドの島",
  "沖縄": "亜熱帯の楽園",
  "金沢": "加賀百万石の城下町",
  "鴨川シーワールド": "シャチに会える水族館",
  "東山動物園": "名古屋の動物園",
};

export const PREF_TITLE_KEYWORDS_EN = {
  "北海道": "Snow Festivals + Drift Ice + Flower Fields",
  "長野県": "Castles + Stargazing + Mountain Lakes",
  "沖縄県": "Tropical Beaches + Coral Islands",
  "京都府": "Temples + Cherry Blossoms + Maples",
  "山梨県": "Mt Fuji + Chureito Pagoda Views",
  "神奈川県": "Kamakura + Yokohama",
  "三重県": "Ise Grand Shrine + Coast",
  "兵庫県": "Himeji White Heron Castle UNESCO",
  "奈良県": "World's Oldest Wooden Temples",
  "石川県": "Kanazawa Samurai + Geisha District",
  "岐阜県": "Shirakawa-gō UNESCO Village",
  "愛媛県": "Hot Springs + Shimanami Kaidō",
  "高知県": "Niyodo Blue + Sub-tropical Coast",
  "大分県": "Beppu Hells + Yufuin Onsen",
  "徳島県": "Naruto Whirlpools",
  "香川県": "Mirror Sunset Beach",
  "東京都": "Tokyo Metropolis Cityscape",
  "千葉県": "Coastal + Boso Peninsula",
  "愛知県": "Nagoya + Higashiyama Zoo",
  "福岡県": "Kyushu Gateway City",
};

export const PREF_TITLE_KEYWORDS_JA = {
  "北海道": "雪まつり・流氷・花畑の絶景",
  "長野県": "城・星空・湖の絶景",
  "沖縄県": "亜熱帯の海と島",
  "京都府": "寺院と桜と紅葉",
  "山梨県": "富士山と忠霊塔の絶景",
  "神奈川県": "鎌倉と横浜の風景",
  "三重県": "伊勢神宮と海岸",
  "兵庫県": "姫路城の白鷺",
  "奈良県": "世界最古の寺院群",
  "石川県": "金沢の武家屋敷",
  "岐阜県": "白川郷の世界遺産",
  "愛媛県": "温泉としまなみ海道",
  "高知県": "仁淀ブルーと亜熱帯海岸",
  "大分県": "別府・由布院の温泉郷",
  "徳島県": "鳴門の渦潮",
  "香川県": "ウユニ塩湖のような夕景",
  "東京都": "東京の夜景",
  "千葉県": "房総半島の海岸",
  "愛知県": "名古屋と東山動物園",
  "福岡県": "九州のゲートウェイ",
};

export function getLocTitleKw(locJp, lang) {
  if (lang === "en") return LOC_TITLE_KEYWORDS_EN[locJp] || "";
  if (lang === "ja") return LOC_TITLE_KEYWORDS_JA[locJp] || "";
  return "";
}

export function getPrefTitleKw(prefJp, lang) {
  if (lang === "en") return PREF_TITLE_KEYWORDS_EN[prefJp] || "";
  if (lang === "ja") return PREF_TITLE_KEYWORDS_JA[prefJp] || "";
  return "";
}

// Fallback EN tagline used for non-en/non-ja titles (rendered in parens after locName)
export function getLocTitleKwEnFallback(locJp) {
  return LOC_TITLE_KEYWORDS_EN[locJp] || "";
}

export function getPrefTitleKwEnFallback(prefJp) {
  return PREF_TITLE_KEYWORDS_EN[prefJp] || "";
}
