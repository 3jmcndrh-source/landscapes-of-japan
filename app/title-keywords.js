/**
 * Short English keyword taglines appended to <title> for high-search locations.
 * Keep under ~30 chars each — Google truncates titles around 60 chars total.
 *
 * Applied only when the page language is English; other languages keep the
 * simpler "locName - prefName" title since their localized name is already
 * the primary search term.
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

export function getLocTitleKw(locJp, lang) {
  return lang === "en" ? LOC_TITLE_KEYWORDS_EN[locJp] || "" : "";
}

export function getPrefTitleKw(prefJp, lang) {
  return lang === "en" ? PREF_TITLE_KEYWORDS_EN[prefJp] || "" : "";
}
