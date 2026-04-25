/**
 * 30タグの定義 — collections (10広めテーマ) より細かい属性ベース。
 * URL: /{lang}/tags/{slug}
 * 各タグ: 20言語の name (短い1-2語), ja+en desc (1-2文), locs配列
 */
export const TAGS = {
  // 季節 (4)
  "spring": { locs: ["新倉山浅間公園", "高遠城址公園", "駒つなぎの桜", "城山公園(松本市)", "高島公園(諏訪市)", "弘法山古墳", "姫路城", "松本城", "梅林公園", "鎌倉"],
    name: { ja:"春", en:"Spring", zh:"春", "zh-tw":"春", ko:"봄", es:"Primavera", fr:"Printemps", de:"Frühling", pt:"Primavera", it:"Primavera", ru:"Весна", ar:"الربيع", hi:"वसंत", th:"ฤดูใบไม้ผลิ", vi:"Mùa xuân", id:"Musim Semi", tr:"İlkbahar", nl:"Lente", pl:"Wiosna", sv:"Vår" },
    desc: { ja:"日本の春。桜と新緑、命が芽吹く季節の風景。", en:"Spring in Japan: cherry blossoms, fresh greenery, and landscapes of awakening." } },
  "summer": { locs: ["富良野", "宮古島", "沖縄", "知床", "洞爺湖", "三段滝公園", "諏訪湖"],
    name: { ja:"夏", en:"Summer", zh:"夏", "zh-tw":"夏", ko:"여름", es:"Verano", fr:"Été", de:"Sommer", pt:"Verão", it:"Estate", ru:"Лето", ar:"الصيف", hi:"ग्रीष्म", th:"ฤดูร้อน", vi:"Mùa hè", id:"Musim Panas", tr:"Yaz", nl:"Zomer", pl:"Lato", sv:"Sommar" },
    desc: { ja:"日本の夏。ラベンダー、エメラルドの海、花火、深い緑の風景。", en:"Summer in Japan: lavender, emerald seas, fireworks, and deep greenery." } },
  "autumn": { locs: ["東福寺", "東福寺 通天橋", "清水寺", "清水寺 紅葉ライトアップ", "金閣寺", "登別", "美幌峠", "紅葉", "紅葉ライトアップ"],
    name: { ja:"秋", en:"Autumn", zh:"秋", "zh-tw":"秋", ko:"가을", es:"Otoño", fr:"Automne", de:"Herbst", pt:"Outono", it:"Autunno", ru:"Осень", ar:"الخريف", hi:"शरद", th:"ฤดูใบไม้ร่วง", vi:"Mùa thu", id:"Musim Gugur", tr:"Sonbahar", nl:"Herfst", pl:"Jesień", sv:"Höst" },
    desc: { ja:"日本の秋。紅葉、収穫、澄んだ空気の絶景。", en:"Autumn in Japan: foliage, harvest, and crystal-clear panoramic skies." } },
  "winter": { locs: ["さっぽろ雪まつり", "白川郷", "知床", "摩周湖", "洞爺湖", "登別", "美幌峠", "小樽", "美唄"],
    name: { ja:"冬", en:"Winter", zh:"冬", "zh-tw":"冬", ko:"겨울", es:"Invierno", fr:"Hiver", de:"Winter", pt:"Inverno", it:"Inverno", ru:"Зима", ar:"الشتاء", hi:"शीत", th:"ฤดูหนาว", vi:"Mùa đông", id:"Musim Dingin", tr:"Kış", nl:"Winter", pl:"Zima", sv:"Vinter" },
    desc: { ja:"日本の冬。雪景色、流氷、温泉湯けむりの白い世界。", en:"Winter in Japan: snowscapes, drift ice, and onsen steam — a white world." } },

  // 時間帯 (4)
  "sunrise": { locs: ["新倉山浅間公園", "河口湖", "夫婦岩", "横山展望台", "立石公園", "弘法山古墳", "亀老山展望台", "美幌峠"],
    name: { ja:"日の出", en:"Sunrise", zh:"日出", "zh-tw":"日出", ko:"일출", es:"Amanecer", fr:"Lever de soleil", de:"Sonnenaufgang", pt:"Amanhecer", it:"Alba", ru:"Восход", ar:"شروق الشمس", hi:"सूर्योदय", th:"พระอาทิตย์ขึ้น", vi:"Bình minh", id:"Matahari Terbit", tr:"Gün doğumu", nl:"Zonsopgang", pl:"Wschód słońca", sv:"Soluppgång" },
    desc: { ja:"夜明けの光。富士山の朝焼け、海岸の日の出、山頂のモルゲンロート。", en:"Dawn light: Mt. Fuji's sunrise glow, coastal sunrises, alpenglow on summits." } },
  "sunset": { locs: ["父母ヶ浜", "宮古島", "沖縄", "桂浜", "洞爺湖", "立石公園", "亀老山展望台"],
    name: { ja:"夕焼け", en:"Sunset", zh:"夕阳", "zh-tw":"夕陽", ko:"석양", es:"Atardecer", fr:"Coucher de soleil", de:"Sonnenuntergang", pt:"Pôr do sol", it:"Tramonto", ru:"Закат", ar:"غروب الشمس", hi:"सूर्यास्त", th:"พระอาทิตย์ตก", vi:"Hoàng hôn", id:"Matahari Terbenam", tr:"Gün batımı", nl:"Zonsondergang", pl:"Zachód słońca", sv:"Solnedgång" },
    desc: { ja:"夕暮れの光景。父母ヶ浜の干潟、海越しの夕日、立石公園からの諏訪盆地。", en:"Sunset moments: Chichibugahama's tidepool, oceanic sunsets, the Suwa basin from Tateishi." } },
  "blue-hour": { locs: ["小樽", "横浜", "立石公園", "東京", "中町通り(松本市)", "清水寺"],
    name: { ja:"ブルーアワー", en:"Blue Hour", zh:"蓝色时刻", "zh-tw":"藍色時刻", ko:"블루아워", es:"Hora azul", fr:"Heure bleue", de:"Blaue Stunde", pt:"Hora azul", it:"Ora blu", ru:"Синий час", ar:"الساعة الزرقاء", hi:"नीला घंटा", th:"ชั่วโมงสีน้ำเงิน", vi:"Giờ xanh", id:"Jam Biru", tr:"Mavi Saat", nl:"Blauwe uur", pl:"Niebieska godzina", sv:"Blå timmen" },
    desc: { ja:"日没後10〜30分の青い時間帯。街灯の暖色と空の青のコントラストが最も美しい。", en:"The 10–30 minutes after sunset when warm streetlights meet a still-blue sky in perfect contrast." } },
  "night-sky": { locs: ["長野県天空の楽園", "駒つなぎの桜", "立石公園"],
    name: { ja:"星空", en:"Night Sky", zh:"星空", "zh-tw":"星空", ko:"밤하늘", es:"Cielo estrellado", fr:"Ciel étoilé", de:"Sternenhimmel", pt:"Céu estrelado", it:"Cielo stellato", ru:"Ночное небо", ar:"السماء الليلية", hi:"रात्रि आकाश", th:"ท้องฟ้ายามค่ำคืน", vi:"Bầu trời đêm", id:"Langit Malam", tr:"Gece Gökyüzü", nl:"Sterrenhemel", pl:"Gwiezdne niebo", sv:"Stjärnhimmel" },
    desc: { ja:"日本一の星空、阿智村と長野の暗い空の絶景。", en:"Japan's #1 starry skies, Achi Village and the dark Nagano heavens." } },

  // 自然 (8)
  "mt-fuji": { locs: ["新倉山浅間公園", "河口湖"],
    name: { ja:"富士山", en:"Mt. Fuji", zh:"富士山", "zh-tw":"富士山", ko:"후지산", es:"Monte Fuji", fr:"Mont Fuji", de:"Berg Fuji", pt:"Monte Fuji", it:"Monte Fuji", ru:"Гора Фудзи", ar:"جبل فوجي", hi:"माउंट फुजी", th:"ภูเขาฟูจิ", vi:"Núi Phú Sĩ", id:"Gunung Fuji", tr:"Fuji Dağı", nl:"Fuji-berg", pl:"Góra Fuji", sv:"Fuji-berget" },
    desc: { ja:"日本の象徴・富士山を望む撮影地と、桜・湖との絶景コンビ。", en:"Mt. Fuji, Japan's iconic peak — paired with cherry blossoms and the Five Lakes." } },
  "cherry-tree": { locs: ["新倉山浅間公園", "高遠城址公園", "駒つなぎの桜", "城山公園(松本市)", "高島公園(諏訪市)", "弘法山古墳", "姫路城", "安養寺"],
    name: { ja:"桜の木", en:"Cherry Tree", zh:"樱花树", "zh-tw":"櫻花樹", ko:"벚나무", es:"Cerezo", fr:"Cerisier", de:"Kirschbaum", pt:"Cerejeira", it:"Ciliegio", ru:"Сакура", ar:"شجرة الكرز", hi:"चेरी का पेड़", th:"ต้นซากุระ", vi:"Cây anh đào", id:"Pohon Sakura", tr:"Kiraz Ağacı", nl:"Kersenboom", pl:"Wiśnia", sv:"Körsbärsträd" },
    desc: { ja:"日本各地の名桜。一本桜、桜並木、4月の絶景。", en:"Famous cherry trees across Japan: solitary trees, blossom-lined paths, and April's finest." } },
  "autumn-leaves": { locs: ["東福寺", "東福寺 通天橋", "清水寺", "清水寺 紅葉ライトアップ", "登別", "美幌峠", "紅葉"],
    name: { ja:"紅葉", en:"Autumn Leaves", zh:"红叶", "zh-tw":"紅葉", ko:"단풍", es:"Hojas otoñales", fr:"Feuilles d'automne", de:"Herbstblätter", pt:"Folhas de outono", it:"Foglie autunnali", ru:"Осенние листья", ar:"أوراق الخريف", hi:"शरद पत्ते", th:"ใบไม้แดง", vi:"Lá thu", id:"Daun Musim Gugur", tr:"Sonbahar Yaprakları", nl:"Herfstbladeren", pl:"Jesienne liście", sv:"Höstlöv" },
    desc: { ja:"京都の寺、北海道の山岳、全国の紅葉名所。", en:"Kyoto temples, Hokkaido mountains, and great foliage spots across Japan." } },
  "snow-scape": { locs: ["さっぽろ雪まつり", "白川郷", "知床", "摩周湖", "美幌峠", "小樽", "美唄"],
    name: { ja:"雪景色", en:"Snowscape", zh:"雪景", "zh-tw":"雪景", ko:"설경", es:"Paisaje nevado", fr:"Paysage enneigé", de:"Schneelandschaft", pt:"Paisagem nevada", it:"Paesaggio innevato", ru:"Снежный пейзаж", ar:"منظر ثلجي", hi:"बर्फ़ीला दृश्य", th:"ภูมิทัศน์หิมะ", vi:"Cảnh tuyết", id:"Pemandangan Salju", tr:"Karlı Manzara", nl:"Sneeuwlandschap", pl:"Ośnieżony krajobraz", sv:"Snölandskap" },
    desc: { ja:"豪雪地帯の冬、合掌造り、流氷、雪の運河。", en:"Winters in heavy-snow regions — gassho-zukuri, drift ice, snowy canals." } },
  "lake": { locs: ["摩周湖", "洞爺湖", "河口湖", "諏訪湖"],
    name: { ja:"湖", en:"Lake", zh:"湖", "zh-tw":"湖", ko:"호수", es:"Lago", fr:"Lac", de:"See", pt:"Lago", it:"Lago", ru:"Озеро", ar:"بحيرة", hi:"झील", th:"ทะเลสาบ", vi:"Hồ", id:"Danau", tr:"Göl", nl:"Meer", pl:"Jezioro", sv:"Sjö" },
    desc: { ja:"カルデラ湖と火口湖、その水鏡の絶景。", en:"Caldera and crater lakes, with their mirror-like reflections." } },
  "ocean": { locs: ["父母ヶ浜", "桂浜", "宮古島", "沖縄", "夫婦岩", "鳴門海峡", "横浜", "室蘭"],
    name: { ja:"海", en:"Ocean", zh:"海洋", "zh-tw":"海洋", ko:"바다", es:"Océano", fr:"Océan", de:"Ozean", pt:"Oceano", it:"Oceano", ru:"Океан", ar:"المحيط", hi:"महासागर", th:"มหาสมุทร", vi:"Đại dương", id:"Samudra", tr:"Okyanus", nl:"Oceaan", pl:"Ocean", sv:"Hav" },
    desc: { ja:"太平洋から東シナ海まで、日本の海岸線。", en:"Japanese coastlines from the Pacific to the East China Sea." } },
  "waterfall": { locs: ["三段滝公園", "にこ淵"],
    name: { ja:"滝", en:"Waterfall", zh:"瀑布", "zh-tw":"瀑布", ko:"폭포", es:"Cascada", fr:"Cascade", de:"Wasserfall", pt:"Cachoeira", it:"Cascata", ru:"Водопад", ar:"شلال", hi:"जलप्रपात", th:"น้ำตก", vi:"Thác nước", id:"Air Terjun", tr:"Şelale", nl:"Waterval", pl:"Wodospad", sv:"Vattenfall" },
    desc: { ja:"日本の滝と清流、エメラルドの淵。", en:"Japan's waterfalls, pristine streams, and emerald pools." } },
  "mountain": { locs: ["美幌峠", "亀老山展望台", "朝熊山展望台", "横山展望台", "弘法山古墳", "立石公園", "知床"],
    name: { ja:"山岳", en:"Mountain", zh:"山岳", "zh-tw":"山岳", ko:"산악", es:"Montaña", fr:"Montagne", de:"Berg", pt:"Montanha", it:"Montagna", ru:"Горы", ar:"الجبال", hi:"पर्वत", th:"ภูเขา", vi:"Núi", id:"Gunung", tr:"Dağ", nl:"Berg", pl:"Góry", sv:"Berg" },
    desc: { ja:"展望台と山頂からの大パノラマ、北アルプス、日本アルプス。", en:"Observation decks and summit panoramas — Northern Alps, Japan Alps, beyond." } },

  // 建築・文化 (5)
  "castle": { locs: ["姫路城", "松本城", "松山城", "高知城", "高遠城址公園", "高島公園(諏訪市)"],
    name: { ja:"城", en:"Castle", zh:"城", "zh-tw":"城", ko:"성", es:"Castillo", fr:"Château", de:"Burg", pt:"Castelo", it:"Castello", ru:"Замок", ar:"قلعة", hi:"किला", th:"ปราสาท", vi:"Lâu đài", id:"Kastil", tr:"Kale", nl:"Kasteel", pl:"Zamek", sv:"Slott" },
    desc: { ja:"白鷺城・烏城・現存12天守、日本の城郭建築。", en:"White Heron, Crow, the 12 originals — Japan's castle architecture." } },
  "shrine": { locs: ["伊勢神宮", "夫婦岩"],
    name: { ja:"神社", en:"Shrine", zh:"神社", "zh-tw":"神社", ko:"신사", es:"Santuario", fr:"Sanctuaire", de:"Schrein", pt:"Santuário", it:"Santuario", ru:"Святилище", ar:"ضريح", hi:"मंदिर", th:"ศาลเจ้า", vi:"Đền thờ", id:"Kuil Shinto", tr:"Türbe", nl:"Heiligdom", pl:"Sanktuarium", sv:"Helgedom" },
    desc: { ja:"伊勢神宮を中心とした神道の聖域。", en:"Shinto sanctuaries centered on the supreme Ise Jingu." } },
  "temple": { locs: ["清水寺", "清水寺周辺", "金閣寺", "平等院鳳凰堂", "東福寺", "東寺", "法隆寺", "法隆寺 夢殿", "安養寺"],
    name: { ja:"寺院", en:"Temple", zh:"寺院", "zh-tw":"寺院", ko:"사찰", es:"Templo", fr:"Temple", de:"Tempel", pt:"Templo", it:"Tempio", ru:"Храм", ar:"معبد", hi:"बौद्ध मंदिर", th:"วัด", vi:"Chùa", id:"Kuil", tr:"Tapınak", nl:"Tempel", pl:"Świątynia", sv:"Tempel" },
    desc: { ja:"世界遺産の寺院、千年の祈りの場所。", en:"UNESCO temples — places of prayer for over a thousand years." } },
  "pagoda": { locs: ["新倉山浅間公園", "清水寺", "清水寺 三重塔", "東寺", "東寺 五重塔", "八坂の塔", "法隆寺"],
    name: { ja:"塔", en:"Pagoda", zh:"宝塔", "zh-tw":"寶塔", ko:"탑", es:"Pagoda", fr:"Pagode", de:"Pagode", pt:"Pagode", it:"Pagoda", ru:"Пагода", ar:"باغودا", hi:"पैगोडा", th:"เจดีย์", vi:"Tháp", id:"Pagoda", tr:"Pagoda", nl:"Pagode", pl:"Pagoda", sv:"Pagod" },
    desc: { ja:"五重塔・三重塔、日本の塔建築。", en:"Five- and three-story pagodas — Japan's signature tower architecture." } },
  "old-town": { locs: ["金沢", "中町通り(松本市)", "おはらい町・おかげ横丁", "白川郷", "鎌倉"],
    name: { ja:"古い町並み", en:"Old Town", zh:"老街", "zh-tw":"老街", ko:"옛 거리", es:"Casco antiguo", fr:"Vieille ville", de:"Altstadt", pt:"Cidade antiga", it:"Città vecchia", ru:"Старый город", ar:"البلدة القديمة", hi:"पुराना नगर", th:"เมืองเก่า", vi:"Phố cổ", id:"Kota Lama", tr:"Eski Şehir", nl:"Oude binnenstad", pl:"Starówka", sv:"Gamla stan" },
    desc: { ja:"江戸〜明治の町並み、蔵造り、参道。", en:"Edo–Meiji streetscapes, kura warehouses, and historic shrine approaches." } },

  // 撮影技法・効果 (5)
  "reflection": { locs: ["河口湖", "諏訪湖", "父母ヶ浜", "高島公園(諏訪市)", "平等院鳳凰堂", "駒つなぎの桜"],
    name: { ja:"水鏡", en:"Reflection", zh:"水镜", "zh-tw":"水鏡", ko:"수경", es:"Reflejo", fr:"Reflet", de:"Spiegelung", pt:"Reflexo", it:"Riflesso", ru:"Отражение", ar:"انعكاس", hi:"प्रतिबिंब", th:"เงาสะท้อน", vi:"Phản chiếu", id:"Refleksi", tr:"Yansıma", nl:"Weerspiegeling", pl:"Odbicie", sv:"Reflektion" },
    desc: { ja:"逆さ富士、湖の鏡面、棚田の水鏡。", en:"Inverted Fuji, mirror lakes, and rice-paddy reflections." } },
  "long-exposure": { locs: ["小樽", "三段滝公園", "横浜", "宮古島", "立石公園"],
    name: { ja:"長時間露光", en:"Long Exposure", zh:"长曝光", "zh-tw":"長曝光", ko:"장노출", es:"Larga exposición", fr:"Pose longue", de:"Langzeitbelichtung", pt:"Longa exposição", it:"Lunga esposizione", ru:"Длинная выдержка", ar:"تعريض طويل", hi:"लंबा एक्सपोज़र", th:"เปิดรับแสงนาน", vi:"Phơi sáng lâu", id:"Pencahayaan Lama", tr:"Uzun Pozlama", nl:"Lange sluitertijd", pl:"Długi czas naświetlania", sv:"Lång exponering" },
    desc: { ja:"水・雲・光跡を長秒露光で滑らかに。", en:"Smoothing water, clouds, and light trails with long exposures." } },
  "silhouette": { locs: ["父母ヶ浜", "夫婦岩", "桂浜", "立石公園"],
    name: { ja:"シルエット", en:"Silhouette", zh:"剪影", "zh-tw":"剪影", ko:"실루엣", es:"Silueta", fr:"Silhouette", de:"Silhouette", pt:"Silhueta", it:"Silhouette", ru:"Силуэт", ar:"ظلال", hi:"छायाचित्र", th:"เงา", vi:"Bóng", id:"Siluet", tr:"Silüet", nl:"Silhouet", pl:"Sylwetka", sv:"Siluett" },
    desc: { ja:"逆光の人物・建物・木のシルエット。", en:"Backlit silhouettes of figures, structures, and trees." } },
  "panorama": { locs: ["美幌峠", "立石公園", "亀老山展望台", "朝熊山展望台", "横山展望台", "弘法山古墳", "城山公園(松本市)"],
    name: { ja:"パノラマ", en:"Panorama", zh:"全景", "zh-tw":"全景", ko:"파노라마", es:"Panorama", fr:"Panorama", de:"Panorama", pt:"Panorama", it:"Panorama", ru:"Панорама", ar:"بانوراما", hi:"मनोरम", th:"พาโนรามา", vi:"Toàn cảnh", id:"Panorama", tr:"Panorama", nl:"Panorama", pl:"Panorama", sv:"Panorama" },
    desc: { ja:"展望台からの広角・パノラマ風景。", en:"Wide and panoramic views from observation decks." } },
  "macro": { locs: ["富良野", "梅林公園", "八坂の塔"],
    name: { ja:"マクロ", en:"Macro", zh:"微距", "zh-tw":"微距", ko:"매크로", es:"Macro", fr:"Macro", de:"Makro", pt:"Macro", it:"Macro", ru:"Макро", ar:"ماكرو", hi:"मैक्रो", th:"มาโคร", vi:"Macro", id:"Makro", tr:"Makro", nl:"Macro", pl:"Makro", sv:"Makro" },
    desc: { ja:"花、葉、滴のクローズアップ撮影。", en:"Close-ups of flowers, leaves, and drops." } },

  // 特殊シーン (4)
  "festival": { locs: ["さっぽろ雪まつり", "高遠城址公園", "清水寺 紅葉ライトアップ", "白川郷"],
    name: { ja:"祭り", en:"Festival", zh:"祭典", "zh-tw":"祭典", ko:"축제", es:"Festival", fr:"Festival", de:"Festival", pt:"Festival", it:"Festival", ru:"Фестиваль", ar:"مهرجان", hi:"उत्सव", th:"เทศกาล", vi:"Lễ hội", id:"Festival", tr:"Festival", nl:"Festival", pl:"Festiwal", sv:"Festival" },
    desc: { ja:"雪まつり、桜まつり、紅葉ライトアップ。", en:"Snow festivals, sakura matsuri, and autumn illuminations." } },
  "drift-ice": { locs: ["知床"],
    name: { ja:"流氷", en:"Drift Ice", zh:"流冰", "zh-tw":"流冰", ko:"유빙", es:"Hielo a la deriva", fr:"Glace dérivante", de:"Treibeis", pt:"Gelo flutuante", it:"Ghiaccio alla deriva", ru:"Дрейфующий лёд", ar:"الجليد المنجرف", hi:"बहती बर्फ़", th:"น้ำแข็งลอย", vi:"Băng trôi", id:"Es Mengapung", tr:"Sürüklenen Buz", nl:"Drijfijs", pl:"Lód dryfujący", sv:"Drivis" },
    desc: { ja:"オホーツクの流氷、北緯44度の世界。", en:"Drift ice of the Sea of Okhotsk at 44° N." } },
  "lavender": { locs: ["富良野"],
    name: { ja:"ラベンダー", en:"Lavender", zh:"薰衣草", "zh-tw":"薰衣草", ko:"라벤더", es:"Lavanda", fr:"Lavande", de:"Lavendel", pt:"Lavanda", it:"Lavanda", ru:"Лаванда", ar:"خزامى", hi:"लैवेंडर", th:"ลาเวนเดอร์", vi:"Hoa oải hương", id:"Lavender", tr:"Lavanta", nl:"Lavendel", pl:"Lawenda", sv:"Lavendel" },
    desc: { ja:"7月の富良野、紫の絨毯。", en:"July in Furano — a purple carpet." } },
  "onsen-steam": { locs: ["登別", "別府", "湯布院", "道後温泉", "洞爺湖"],
    name: { ja:"温泉湯けむり", en:"Onsen Steam", zh:"温泉蒸汽", "zh-tw":"溫泉蒸氣", ko:"온천 증기", es:"Vapor termal", fr:"Vapeur thermale", de:"Onsen-Dampf", pt:"Vapor termal", it:"Vapore termale", ru:"Пар онсэна", ar:"بخار الينابيع الساخنة", hi:"ओनसेन भाप", th:"ไอออนเซ็น", vi:"Hơi nước onsen", id:"Uap Onsen", tr:"Kaplıca Buharı", nl:"Onsen-stoom", pl:"Para onsen", sv:"Onsen-ånga" },
    desc: { ja:"湯けむり、地獄、火山と温泉郷の風景。", en:"Steam, hells, volcanoes, and onsen-town scenery." } },
};

export const TAG_SLUGS = Object.keys(TAGS);

export function getTagPhotos(slug, PREFECTURES) {
  const t = TAGS[slug];
  if (!t) return [];
  const set = new Set(t.locs);
  const result = [];
  for (const pf of PREFECTURES) {
    for (const photo of pf.photos) {
      if (photo.loc && set.has(photo.loc)) {
        result.push({ ...photo, pref: pf.pref });
      }
    }
  }
  return result;
}

export const getTagName = (slug, lang) => {
  const t = TAGS[slug];
  if (!t) return slug;
  return t.name[lang] || t.name.en || slug;
};
export const getTagDesc = (slug, lang) => {
  const t = TAGS[slug];
  if (!t) return "";
  if (lang === "ja" && t.desc.ja) return t.desc.ja;
  return t.desc.en || "";
};
