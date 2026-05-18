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

// Top-25 high-impression locations translated into the 6 highest-impression
// non-en/non-ja languages (per GSC May 2026 data): zh, zh-tw, ko, es, de, ar.
// Other locations / other languages fall back to the EN keyword in parens.

export const LOC_TITLE_KEYWORDS_ZH = {
  "新倉山浅間公园": "富士山+忠灵塔+樱花",  // also key handled below for zh-tw
  "新倉山浅間公園": "富士山+忠灵塔+樱花",
  "さっぽろ雪まつり": "世界最大的雪冰雕节",
  "平等院鳳凰堂": "10日元硬币上的世界遗产",
  "金閣寺": "金碧辉煌的世界遗产",
  "清水寺": "世界遗产清水舞台",
  "東福寺": "通天桥红叶名所",
  "姫路城": "白鹭城世界遗产",
  "松本城": "国宝乌城",
  "松山城": "现存12天守山城",
  "高知城": "现存12天守名城",
  "法隆寺": "世界最古木造建筑",
  "白川郷": "合掌造世界遗产村",
  "伊勢神宮": "日本人的心灵故乡",
  "知床": "世界遗产流冰圣地",
  "富良野": "薰衣草花海",
  "摩周湖": "透明度日本第一神秘湖",
  "美幌峠": "屈斜路湖绝景",
  "登別": "地狱谷温泉",
  "阿寒": "马里莫神秘湖",
  "新倉山浅間公園 ": "富士山+忠灵塔+樱花",  // tolerate trailing spaces
  "高遠城址公園": "天下第一樱花",
  "長野県天空の楽園": "日本第一星空",
  "立石公園": "诹访湖夕阳绝景",
  "諏訪湖": "诹访湖与御神渡",
  "父母ヶ浜": "日本的乌尤尼盐湖",
  "にこ淵": "仁淀蓝圣地",
  "名越屋沈下橋": "仁淀川的沉下桥",
  "桂浜": "坂本龙马之海",
  "鳴門海峡": "鸣门漩涡名所",
  "道後温泉": "日本最古老温泉",
  "別府": "别府八汤地狱巡礼",
  "湯布院": "由布院温泉小镇",
  "宮古島": "翡翠透明岛屿",
  "金沢": "加贺百万石城下町",
};

export const LOC_TITLE_KEYWORDS_ZH_TW = {
  "新倉山浅間公園": "富士山+忠靈塔+櫻花",
  "さっぽろ雪まつり": "世界最大的雪冰雕節",
  "平等院鳳凰堂": "10日圓硬幣上的世界遺產",
  "金閣寺": "金碧輝煌的世界遺產",
  "清水寺": "世界遺產清水舞台",
  "東福寺": "通天橋紅葉名所",
  "姫路城": "白鷺城世界遺產",
  "松本城": "國寶烏城",
  "松山城": "現存12天守山城",
  "高知城": "現存12天守名城",
  "法隆寺": "世界最古木造建築",
  "白川郷": "合掌造世界遺產村",
  "伊勢神宮": "日本人的心靈故鄉",
  "知床": "世界遺產流冰聖地",
  "富良野": "薰衣草花海",
  "摩周湖": "透明度日本第一神秘湖",
  "美幌峠": "屈斜路湖絕景",
  "登別": "地獄谷溫泉",
  "阿寒": "馬里莫神秘湖",
  "高遠城址公園": "天下第一櫻花",
  "長野県天空の楽園": "日本第一星空",
  "立石公園": "諏訪湖夕陽絕景",
  "諏訪湖": "諏訪湖與御神渡",
  "父母ヶ浜": "日本的烏尤尼鹽湖",
  "にこ淵": "仁淀藍聖地",
  "名越屋沈下橋": "仁淀川的沉下橋",
  "桂浜": "坂本龍馬之海",
  "鳴門海峡": "鳴門漩渦名所",
  "道後温泉": "日本最古老溫泉",
  "別府": "別府八湯地獄巡禮",
  "湯布院": "由布院溫泉小鎮",
  "宮古島": "翡翠透明島嶼",
  "金沢": "加賀百萬石城下町",
};

export const LOC_TITLE_KEYWORDS_KO = {
  "新倉山浅間公園": "후지산+추레이토 5층탑+벚꽃의 절경",
  "さっぽろ雪まつり": "세계 최대 눈축제",
  "平等院鳳凰堂": "10엔 동전의 세계유산",
  "金閣寺": "황금빛 세계유산",
  "清水寺": "세계유산 기요미즈 무대",
  "東福寺": "통천교에서 보는 단풍",
  "姫路城": "백로성 세계유산",
  "松本城": "국보 검은 성",
  "松山城": "현존 12천수 산성",
  "高知城": "현존 12천수 명성",
  "法隆寺": "세계 최고(最古) 목조건축",
  "白川郷": "갓쇼즈쿠리 세계유산 마을",
  "伊勢神宮": "일본인의 마음의 고향",
  "知床": "세계유산 유빙 성지",
  "富良野": "라벤더 꽃밭",
  "摩周湖": "투명도 일본 1위 신비의 호수",
  "美幌峠": "굿샤로 호수 절경",
  "登別": "지옥계곡 온천",
  "阿寒": "마리모 신비 호수",
  "高遠城址公園": "천하제일의 벚꽃",
  "長野県天空の楽園": "일본 1위 별빛",
  "立石公園": "스와호 일몰 절경",
  "諏訪湖": "스와호와 오미와타리 빙판",
  "父母ヶ浜": "일본의 우유니 소금사막",
  "にこ淵": "니요도 블루 성지",
  "名越屋沈下橋": "니요도강 침하교",
  "桂浜": "사카모토 료마의 바다",
  "鳴門海峡": "나루토 소용돌이",
  "道後温泉": "일본 최고(最古) 온천",
  "別府": "벳푸 8탕 지옥 순례",
  "湯布院": "유후인 온천 마을",
  "宮古島": "에메랄드빛 섬",
  "金沢": "가가 백만석 성하마을",
};

export const LOC_TITLE_KEYWORDS_ES = {
  "新倉山浅間公園": "Monte Fuji + Pagoda Chureito + cerezos",
  "さっぽろ雪まつり": "Festival de nieve más grande del mundo",
  "平等院鳳凰堂": "Patrimonio Mundial de la moneda de 10 yenes",
  "金閣寺": "Pabellón Dorado Patrimonio Mundial",
  "清水寺": "Famoso escenario de madera UNESCO",
  "東福寺": "Vistas de momiji desde el puente Tsutenkyo",
  "姫路城": "Castillo Garza Blanca UNESCO",
  "松本城": "Castillo negro original, tesoro nacional",
  "松山城": "Uno de los 12 castillos originales sobrevivientes",
  "高知城": "Único con palacio honmaru original",
  "法隆寺": "Templo de madera más antiguo del mundo",
  "白川郷": "Aldea UNESCO Shirakawa-gō",
  "伊勢神宮": "Gran Santuario de Ise",
  "知床": "Hielo a la deriva UNESCO",
  "富良野": "Campos de lavanda y flores",
  "摩周湖": "Lago caldera más cristalino",
  "美幌峠": "Panorama del lago Kussharo",
  "登別": "Valle del Infierno onsen",
  "阿寒": "Lago Akan + Marimo",
  "高遠城址公園": "Top-3 sakura de Japón",
  "立石公園": "Atardecer del lago Suwa",
  "諏訪湖": "Lago Suwa + crestas Omiwatari",
  "父母ヶ浜": "Salar de Uyuni de Japón",
  "にこ淵": "Pozo sagrado azul Niyodo",
  "桂浜": "Playa de Katsurahama",
  "鳴門海峡": "Remolinos de Naruto",
  "道後温泉": "Onsen más antiguo de Japón",
  "別府": "Ocho infiernos de Beppu",
  "湯布院": "Pueblo termal Yufuin",
  "宮古島": "Playas turquesas Miyakojima",
  "亀老山展望台": "Panorama Shimanami Kaidō",
};

export const LOC_TITLE_KEYWORDS_DE = {
  "新倉山浅間公園": "Mt Fuji + Chureito-Pagode + Kirschblüten",
  "さっぽろ雪まつり": "Weltgrößtes Schnee- & Eisfestival",
  "平等院鳳凰堂": "Welterbe auf der 10-Yen-Münze",
  "金閣寺": "Goldener Pavillon UNESCO",
  "清水寺": "Berühmte hölzerne Bühne UNESCO",
  "東福寺": "Herbstahorn-Brücke Tsutenkyo",
  "姫路城": "Weißreiher-Burg UNESCO",
  "松本城": "Original schwarzer Bergfried, Nationalschatz",
  "松山城": "Eine von 12 Original-Burgen Japans",
  "高知城": "Original-Honmaru-Palast erhalten",
  "法隆寺": "Älteste Holzbauten der Welt",
  "白川郷": "Welterbe Gassho-Dorf",
  "伊勢神宮": "Großer Ise-Schrein",
  "知床": "Treibeis UNESCO",
  "富良野": "Lavendelfelder + Blumenfarmen",
  "摩周湖": "Kristallklarer Caldera-See",
  "美幌峠": "Panorama Kussharo-See",
  "登別": "Höllental-Onsen",
  "阿寒": "Akan-See + Marimo",
  "高遠城址公園": "Top-3 Kirschblüten Japans",
  "長野県天空の楽園": "Japans Nr. 1 Sternenhimmel",
  "立石公園": "Sonnenuntergang Suwa-See",
  "諏訪湖": "Suwa-See + heilige Eisrücken",
  "父母ヶ浜": "Japans Uyuni-Spiegelstrand",
  "にこ淵": "Heiliger Niyodo-Blau-Pool",
  "桂浜": "Strand Katsurahama",
  "鳴門海峡": "Naruto-Strudel",
  "道後温泉": "Ältester Onsen Japans",
  "別府": "Acht Höllen Beppu",
  "湯布院": "Yufuin Thermalstadt",
  "宮古島": "Türkisstrände Miyakojima",
};

export const LOC_TITLE_KEYWORDS_AR = {
  "新倉山浅間公園": "جبل فوجي + باغودا تشوريتو + أزهار الكرز",
  "さっぽろ雪まつり": "أكبر مهرجان للثلج والجليد في العالم",
  "平等院鳳凰堂": "تراث عالمي على عملة 10 ينات",
  "金閣寺": "الجناح الذهبي تراث عالمي",
  "清水寺": "مسرح خشبي شهير تراث عالمي",
  "東福寺": "جسر تسوتنكيو وأوراق القيقب الخريفية",
  "姫路城": "قلعة البلشون الأبيض تراث عالمي",
  "松本城": "قلعة سوداء أصلية كنز وطني",
  "松山城": "إحدى 12 قلعة أصلية متبقية في اليابان",
  "高知城": "قلعة بقصر هونمارو الأصلي",
  "法隆寺": "أقدم بناء خشبي في العالم",
  "白川郷": "قرية شيراكاوا-غو تراث عالمي",
  "伊勢神宮": "ضريح إيسه الكبير",
  "知床": "جليد عائم تراث عالمي",
  "富良野": "حقول الخزامى والزهور",
  "摩周湖": "بحيرة الكالديرا الأنقى",
  "美幌峠": "بانوراما بحيرة كوسارو",
  "登別": "وادي الجحيم الينابيع الساخنة",
  "阿寒": "بحيرة أكان + ماريمو",
  "高遠城址公園": "أفضل 3 مواقع لأزهار الكرز",
  "長野県天空の楽園": "أفضل سماء مرصعة بالنجوم في اليابان",
  "立石公園": "غروب بحيرة سوا",
  "諏訪湖": "بحيرة سوا وحواف الجليد المقدسة",
  "父母ヶ浜": "أوياني المرآة في اليابان",
  "にこ淵": "بركة نيودو الزرقاء المقدسة",
  "桂浜": "شاطئ كاتسوراهاما",
  "鳴門海峡": "دوامات ناروتو",
  "道後温泉": "أقدم ينابيع ساخنة في اليابان",
  "別府": "ثمانية جحيم بيبو",
  "湯布院": "مدينة يوفوين الحرارية",
  "宮古島": "شواطئ فيروزية ميياكوجيما",
};

const LOC_KW_BY_LANG = {
  en: LOC_TITLE_KEYWORDS_EN,
  ja: LOC_TITLE_KEYWORDS_JA,
  zh: LOC_TITLE_KEYWORDS_ZH,
  "zh-tw": LOC_TITLE_KEYWORDS_ZH_TW,
  ko: LOC_TITLE_KEYWORDS_KO,
  es: LOC_TITLE_KEYWORDS_ES,
  de: LOC_TITLE_KEYWORDS_DE,
  ar: LOC_TITLE_KEYWORDS_AR,
};

const PREF_KW_BY_LANG = {
  en: PREF_TITLE_KEYWORDS_EN,
  ja: PREF_TITLE_KEYWORDS_JA,
};

export function getLocTitleKw(locJp, lang) {
  return (LOC_KW_BY_LANG[lang] || {})[locJp] || "";
}

export function getPrefTitleKw(prefJp, lang) {
  return (PREF_KW_BY_LANG[lang] || {})[prefJp] || "";
}

// Fallback EN tagline used for non-listed-lang titles (rendered in parens after locName)
export function getLocTitleKwEnFallback(locJp) {
  return LOC_TITLE_KEYWORDS_EN[locJp] || "";
}

export function getPrefTitleKwEnFallback(prefJp) {
  return PREF_TITLE_KEYWORDS_EN[prefJp] || "";
}

/**
 * Build a richer image alt: "<locName> (<year>) — <enKw> | <prefName> | Landscapes of Japan"
 * The EN keyword is only appended for English pages to keep non-en alts in
 * native script (avoids mixed-language alt clutter for screen readers).
 */
export function richAlt({ locName, prefName, year, locJp, lang }) {
  if (!locName) return prefName || "Landscapes of Japan";
  const parts = [locName];
  if (year) parts.push(`(${year})`);
  if (lang === "en" && locJp) {
    const kw = LOC_TITLE_KEYWORDS_EN[locJp];
    if (kw) parts.push(`— ${kw}`);
  }
  if (prefName) parts.push(`| ${prefName}`);
  parts.push("| Landscapes of Japan");
  return parts.join(" ");
}
