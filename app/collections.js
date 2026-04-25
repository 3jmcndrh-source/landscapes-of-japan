/**
 * テーマ別コレクション定義 — 10テーマ × 20言語
 * 各テーマ: slug, name (20言語), desc (20言語), locs (該当 LOC_I18N キー配列)
 * 写真は LocClient と同じく PREFECTURES から photos.loc が locs に含まれるものを抽出
 */

export const COLLECTIONS = {
  "cherry-blossoms": {
    // 「桜」が主要被写体のlocのみ。河口湖(湖中心)、立石公園(夜景中心)、
    // 中町通り(蔵造り)、松本城(城中心)、松本市新村(田園) は除外
    locs: [
      "新倉山浅間公園", "高遠城址公園", "駒つなぎの桜",
      "城山公園(松本市)", "高島公園(諏訪市)", "弘法山古墳", "安養寺",
    ],
    name: {
      ja: "桜", en: "Cherry Blossoms", zh: "樱花", "zh-tw": "櫻花",
      ko: "벚꽃", es: "Cerezos en flor", fr: "Cerisiers en fleurs", de: "Kirschblüten",
      pt: "Cerejeiras em flor", it: "Ciliegi in fiore", ru: "Цветение сакуры",
      ar: "أزهار الكرز", hi: "चेरी के फूल", th: "ดอกซากุระ", vi: "Hoa anh đào",
      id: "Bunga Sakura", tr: "Kiraz Çiçekleri", nl: "Kersenbloesem",
      pl: "Kwitnące wiśnie", sv: "Körsbärsblommor",
    },
    desc: {
      ja: "日本の春を象徴する桜の名所。新倉山浅間公園の富士山+五重塔+桜の三段構図、天下第一と称される高遠城址公園、樹齢400年超の駒つなぎの一本桜、北アルプスを背景にした松本の桜、諏訪湖を見下ろす立石公園など、4月の絶景を集めました。",
      en: "Iconic cherry blossom spots that define Japanese spring. The three-tier composition of Mt. Fuji + Chureito Pagoda + sakura at Arakurayama Sengen Park, the «No.1 cherry under heaven» at Takato Castle Park, the 400-year-old solitary cherry at Komatsunagi, sakura framed by the Northern Alps in Matsumoto, and Tateishi Park overlooking Lake Suwa — April's finest scenes.",
      zh: "代表日本春天的樱花名所。新仓山浅间公园富士山+五重塔+樱花三段构图、被誉为「天下第一樱」的高远城址公园、树龄超过400年的驹系一本樱、以北阿尔卑斯为背景的松本樱花、俯瞰诹访湖的立石公园等，汇集4月绝景。",
      "zh-tw": "代表日本春天的櫻花名所。新倉山淺間公園富士山+五重塔+櫻花三段構圖、被譽為「天下第一櫻」的高遠城址公園、樹齡超過400年的駒繫一本櫻、以北阿爾卑斯為背景的松本櫻花、俯瞰諏訪湖的立石公園等，匯集4月絕景。",
      ko: "일본의 봄을 상징하는 벚꽃 명소. 아라쿠라야마 센겐 공원의 후지산+5층탑+벚꽃 3단 구도, 「천하제일 벚꽃」 다카토 성지 공원, 수령 400년이 넘는 고마쓰나기 한 그루 벚꽃, 북알프스를 배경으로 한 마쓰모토의 벚꽃, 스와호를 내려다보는 다테이시 공원 등 4월의 절경을 모았습니다.",
    },
  },
  "autumn-foliage": {
    // data.jsに存在しないloc(東福寺 通天橋、清水寺 紅葉ライトアップ、紅葉、紅葉ライトアップ)を除外
    locs: ["東福寺", "清水寺", "金閣寺"],
    name: {
      ja: "紅葉", en: "Autumn Foliage", zh: "红叶", "zh-tw": "紅葉",
      ko: "단풍", es: "Follaje de otoño", fr: "Feuillage d'automne", de: "Herbstlaub",
      pt: "Folhagem de outono", it: "Foliage autunnale", ru: "Осенняя листва",
      ar: "أوراق الخريف", hi: "शरद पर्णसमूह", th: "ใบไม้เปลี่ยนสี", vi: "Lá thu",
      id: "Dedaunan Musim Gugur", tr: "Sonbahar Yaprakları", nl: "Herfstkleuren",
      pl: "Jesienne liście", sv: "Höstlöv",
    },
    desc: {
      ja: "日本の秋を象徴する紅葉の名所。京都・東福寺の通天橋から眺める2,000本のモミジ、清水寺の紅葉ライトアップ、金閣寺の朱と金が織りなす11月の絶景を収録。",
      en: "Iconic autumn foliage spots of Japan. The 2,000 maples viewed from Tofuku-ji's Tsutenkyo bridge in Kyoto, the night illumination at Kiyomizu-dera, and the crimson-gold splendor of Kinkaku-ji in November.",
      zh: "代表日本秋天的红叶名所。京都东福寺通天桥俯瞰的2000棵枫树、清水寺夜间灯光秀、11月金阁寺朱红与金色辉映的绝景。",
      "zh-tw": "代表日本秋天的紅葉名所。京都東福寺通天橋俯瞰的2000棵楓樹、清水寺夜間燈光秀、11月金閣寺朱紅與金色輝映的絕景。",
      ko: "일본의 가을을 상징하는 단풍 명소. 교토 도후쿠지 쓰텐교에서 바라보는 2,000그루 단풍, 기요미즈데라 단풍 야간 조명, 11월 금각사의 주홍빛과 금빛이 어우러지는 절경을 수록.",
    },
  },
  "snow": {
    locs: ["さっぽろ雪まつり", "白川郷", "知床", "摩周湖", "洞爺湖", "登別", "美幌峠", "小樽"],
    name: {
      ja: "雪景色", en: "Snow", zh: "雪景", "zh-tw": "雪景",
      ko: "설경", es: "Nieve", fr: "Neige", de: "Schnee",
      pt: "Neve", it: "Neve", ru: "Снежные пейзажи",
      ar: "الثلوج", hi: "बर्फ़", th: "หิมะ", vi: "Tuyết",
      id: "Salju", tr: "Kar Manzaraları", nl: "Sneeuwlandschappen",
      pl: "Śnieg", sv: "Snölandskap",
    },
    desc: {
      ja: "雪国・日本の冬。札幌雪まつりの巨大雪像、世界遺産・白川郷の合掌造りに降り積もる雪、知床の流氷、摩周湖と洞爺湖の冠雪、ガス灯が灯る雪の小樽運河など、白銀の絶景を集めました。",
      en: "Winter in snow country Japan. The massive sculptures of Sapporo Snow Festival, snow-laden gassho-zukuri farmhouses of UNESCO Shirakawa-go, drift ice in Shiretoko, snow-capped Lake Mashu and Lake Toya, and gas-lit Otaru canal in winter — silver landscapes.",
      zh: "雪国日本的冬天。札幌雪祭巨大雪像、世界遗产白川乡合掌造民居积雪、知床流冰、摩周湖与洞爷湖雪冠、煤气灯下的雪小樽运河等银白绝景。",
      "zh-tw": "雪國日本的冬天。札幌雪祭巨大雪像、世界遺產白川鄉合掌造民居積雪、知床流冰、摩周湖與洞爺湖雪冠、煤氣燈下的雪小樽運河等銀白絕景。",
      ko: "설국 일본의 겨울. 삿포로 눈축제의 거대 눈조각, 세계유산 시라카와고 갓쇼즈쿠리의 눈, 시레토코의 유빙, 마슈호와 도야호의 설관, 가스등이 켜진 오타루 운하의 겨울 등 은빛 절경을 모았습니다.",
    },
  },
  "castles": {
    locs: ["姫路城", "松本城", "松山城", "高知城", "高遠城址公園", "高島公園(諏訪市)", "金沢"],
    name: {
      ja: "城", en: "Castles", zh: "城", "zh-tw": "城",
      ko: "성", es: "Castillos", fr: "Châteaux", de: "Burgen",
      pt: "Castelos", it: "Castelli", ru: "Замки",
      ar: "القلاع", hi: "किले", th: "ปราสาท", vi: "Lâu đài",
      id: "Kastil", tr: "Kaleler", nl: "Kastelen",
      pl: "Zamki", sv: "Slott",
    },
    desc: {
      ja: "日本の城。世界遺産・姫路城（白鷺城）、国宝・松本城（烏城）、現存12天守の松山城・高知城、桜の名所・高遠城址公園、諏訪の浮城・高島公園、加賀百万石の金沢城下町など、武家文化と建築美を集めました。",
      en: "Japanese castles. UNESCO Himeji «White Heron» Castle, National Treasure Matsumoto «Crow» Castle, the 12 originals of Matsuyama and Kochi, the cherry-famous Takato Castle Park, Suwa's «floating castle» Takashima, and Kanazawa's samurai town — samurai heritage and architectural beauty.",
      zh: "日本的城。世界遗产姬路城（白鹭城）、国宝松本城（乌城）、现存12天守的松山城与高知城、樱花名所高远城址公园、诹访浮城高岛公园、加贺百万石金泽城下町等武家文化与建筑美的集成。",
      "zh-tw": "日本的城。世界遺產姬路城（白鷺城）、國寶松本城（烏城）、現存12天守的松山城與高知城、櫻花名所高遠城址公園、諏訪浮城高島公園、加賀百萬石金澤城下町等武家文化與建築美的集成。",
      ko: "일본의 성. 세계유산 히메지성(백로성), 국보 마쓰모토성(까마귀성), 현존 12천수의 마쓰야마성과 고치성, 벚꽃 명소 다카토 성지 공원, 스와의 떠 있는 성 다카시마 공원, 가가 백만석 가나자와 성하도시 등 무가 문화와 건축미를 모았습니다.",
    },
  },
  "temples-shrines": {
    // data.jsに存在しないloc(清水寺 三重塔、清水寺 本堂、東福寺 通天橋、東寺、東寺 五重塔、八坂の塔)を除外
    locs: ["清水寺", "清水寺周辺", "金閣寺", "平等院鳳凰堂", "東福寺", "伊勢神宮", "おはらい町・おかげ横丁", "夫婦岩", "法隆寺", "法隆寺 夢殿", "安養寺"],
    name: {
      ja: "寺と神社", en: "Temples & Shrines", zh: "寺院与神社", "zh-tw": "寺院與神社",
      ko: "사찰과 신사", es: "Templos y santuarios", fr: "Temples et sanctuaires", de: "Tempel & Schreine",
      pt: "Templos e santuários", it: "Templi e santuari", ru: "Храмы и святилища",
      ar: "المعابد والأضرحة", hi: "मंदिर और तीर्थ", th: "วัดและศาลเจ้า", vi: "Đền chùa",
      id: "Kuil dan Wihara", tr: "Tapınaklar ve Türbeler", nl: "Tempels en heiligdommen",
      pl: "Świątynie i sanktuaria", sv: "Tempel och helgedomar",
    },
    desc: {
      ja: "日本の信仰文化を伝える寺社。世界遺産・清水寺の舞台と紅葉、金閣寺の金箔、平等院鳳凰堂、紅葉の東福寺、伊勢神宮の聖域、世界最古の木造建築・法隆寺、夫婦岩の鳥居など、千年を超える祈りの風景。",
      en: "Sacred sites of Japan's spiritual heritage. UNESCO Kiyomizu-dera with its stage and autumn leaves, gold-leafed Kinkaku-ji, Byodo-in Phoenix Hall, autumn-famed Tofuku-ji, the sanctity of Ise Jingu, Horyu-ji (the world's oldest wooden building), and Meoto-iwa's sacred torii — over a thousand years of prayerful landscapes.",
      zh: "传承日本信仰文化的寺社。世界遗产清水寺的舞台与红叶、金阁寺的金箔、平等院凤凰堂、红叶之东福寺、伊势神宫圣域、世界最古老木造建筑法隆寺、夫妇岩的鸟居等，超越千年的祈愿风景。",
      "zh-tw": "傳承日本信仰文化的寺社。世界遺產清水寺的舞台與紅葉、金閣寺的金箔、平等院鳳凰堂、紅葉之東福寺、伊勢神宮聖域、世界最古老木造建築法隆寺、夫婦岩的鳥居等，超越千年的祈願風景。",
      ko: "일본의 신앙 문화를 전하는 사찰과 신사. 세계유산 기요미즈데라의 무대와 단풍, 금각사의 금박, 뵤도인 봉황당, 단풍의 도후쿠지, 이세 신궁의 성역, 세계 최고의 목조 건축 호류지, 메오토이와의 도리이 등 천 년이 넘는 기도의 풍경.",
    },
  },
  "hot-springs": {
    locs: ["道後温泉", "別府", "湯布院", "登別", "洞爺湖"],
    name: {
      ja: "温泉", en: "Hot Springs", zh: "温泉", "zh-tw": "溫泉",
      ko: "온천", es: "Aguas termales", fr: "Sources thermales", de: "Heiße Quellen",
      pt: "Águas termais", it: "Terme", ru: "Горячие источники",
      ar: "الينابيع الساخنة", hi: "गर्म झरने", th: "ออนเซ็น", vi: "Suối nước nóng",
      id: "Pemandian Air Panas", tr: "Kaplıcalar", nl: "Warmwaterbronnen",
      pl: "Gorące źródła", sv: "Varma källor",
    },
    desc: {
      ja: "湯けむりの風景。日本最古の道後温泉、九州随一の湧出量を誇る別府の地獄、由布岳を望む湯布院、火山と海に囲まれた登別と洞爺湖。日本人の暮らしに根付く湯の風景。",
      en: "Steam-veiled landscapes. Japan's oldest Dogo Onsen, Kyushu's #1-volume Beppu Hells, Mt. Yufu-framed Yufuin, and Noboribetsu and Lake Toya cradled by volcanoes and sea — onsen scenes rooted in Japanese life.",
      zh: "雾气缭绕的风景。日本最古老的道后温泉、九州最大涌出量的别府地狱、远眺由布岳的汤布院、被火山与海环绕的登别与洞爷湖。深植日本生活的温泉风景。",
      "zh-tw": "霧氣繚繞的風景。日本最古老的道後溫泉、九州最大湧出量的別府地獄、遠眺由布岳的湯布院、被火山與海環繞的登別與洞爺湖。深植日本生活的溫泉風景。",
      ko: "김이 자욱한 풍경. 일본 최고(最古)의 도고 온천, 규슈 최대 용출량의 벳푸 지옥, 유후산을 바라보는 유후인, 화산과 바다에 둘러싸인 노보리베쓰와 도야호. 일본인의 삶에 뿌리내린 온천 풍경.",
    },
  },
  "coastal": {
    locs: ["父母ヶ浜", "桂浜", "宮古島", "沖縄", "夫婦岩", "鳴門海峡", "大鳴門橋", "来島海峡大橋", "亀老山展望台", "室蘭"],
    name: {
      ja: "海岸", en: "Coastal", zh: "海岸", "zh-tw": "海岸",
      ko: "해안", es: "Costa", fr: "Côtes", de: "Küsten",
      pt: "Costa", it: "Coste", ru: "Побережья",
      ar: "السواحل", hi: "तट", th: "ชายฝั่ง", vi: "Bờ biển",
      id: "Pesisir", tr: "Sahiller", nl: "Kustlandschappen",
      pl: "Wybrzeża", sv: "Kuster",
    },
    desc: {
      ja: "日本の海岸線。「日本のウユニ塩湖」と呼ばれる父母ヶ浜の夕景、坂本龍馬像が見守る桂浜、宮古ブルーの宮古島と沖縄の珊瑚礁、夫婦岩の鳥居と日の出、鳴門の渦潮、しまなみ海道の橋など、太平洋から東シナ海まで。",
      en: "Japan's coastlines. Chichibugahama's sunset reflections (the «Uyuni of Japan»), Katsurahama beach watched by Sakamoto Ryoma's statue, the «Miyako Blue» of Miyakojima and Okinawa's reefs, the torii and sunrise at Meoto-iwa, Naruto's whirlpools, and the Shimanami Kaido bridges — from Pacific to East China Sea.",
      zh: "日本的海岸线。被称作「日本乌尤尼盐沼」的父母滨夕景、坂本龙马像守望的桂浜、宫古蓝的宫古岛与冲绳珊瑚礁、夫妇岩的鸟居与日出、鸣门涡潮、濑户内海岛波海道桥梁，从太平洋到东海。",
      "zh-tw": "日本的海岸線。被稱作「日本烏尤尼鹽沼」的父母濱夕景、坂本龍馬像守望的桂濱、宮古藍的宮古島與沖繩珊瑚礁、夫婦岩的鳥居與日出、鳴門渦潮、瀨戶內海島波海道橋樑，從太平洋到東海。",
      ko: "일본의 해안선. 「일본의 우유니 소금사막」이라 불리는 지치부가하마의 노을, 사카모토 료마 동상이 지켜보는 가쓰라하마, 미야코 블루의 미야코지마와 오키나와의 산호초, 메오토이와의 도리이와 일출, 나루토 소용돌이, 시마나미 해도의 다리들 등 태평양에서 동중국해까지.",
    },
  },
  "night-views": {
    locs: ["横浜", "立石公園", "中町通り(松本市)", "東京", "品川", "札幌", "福岡"],
    name: {
      ja: "夜景", en: "Night Views", zh: "夜景", "zh-tw": "夜景",
      ko: "야경", es: "Vistas nocturnas", fr: "Vues nocturnes", de: "Nachtansichten",
      pt: "Vistas noturnas", it: "Viste notturne", ru: "Ночные виды",
      ar: "المناظر الليلية", hi: "रात्रि दृश्य", th: "วิวกลางคืน", vi: "Quang cảnh đêm",
      id: "Pemandangan Malam", tr: "Gece Manzaraları", nl: "Nachtaanzichten",
      pl: "Widoki nocne", sv: "Nattvyer",
    },
    desc: {
      ja: "灯りに包まれる日本の夜。横浜みなとみらいの摩天楼と赤レンガ倉庫、立石公園から眺める諏訪市の宝石箱、松本中町通りの蔵に灯る街灯、東京・品川の鉄道夜景、藻岩山から見る札幌の新3大夜景。",
      en: "Japan's nights bathed in light. Yokohama Minato Mirai skyscrapers and Red Brick Warehouse, the jewel box of Suwa City from Tateishi Park, lantern-lit kura on Matsumoto's Nakamachi Street, Tokyo and Shinagawa rail nightscapes, and Sapporo's new top-3 night view from Mt. Moiwa.",
      zh: "灯光环绕的日本夜晚。横滨港未来摩天楼与红砖仓库、立石公园眺望诹访市宝盒夜景、松本中町通土藏街灯、东京品川铁道夜景、藻岩山俯瞰札幌新三大夜景。",
      "zh-tw": "燈光環繞的日本夜晚。橫濱港未來摩天樓與紅磚倉庫、立石公園眺望諏訪市寶盒夜景、松本中町通土藏街燈、東京品川鐵道夜景、藻岩山俯瞰札幌新三大夜景。",
      ko: "빛에 감싸인 일본의 밤. 요코하마 미나토미라이의 마천루와 빨간 벽돌 창고, 다테이시 공원에서 바라보는 스와시의 보석함, 마쓰모토 나카마치 거리의 창고에 켜진 등불, 도쿄와 시나가와의 철도 야경, 모이와산에서 보는 삿포로의 신 3대 야경.",
    },
  },
  "waterfalls": {
    locs: ["三段滝公園", "にこ淵"],
    name: {
      ja: "滝", en: "Waterfalls", zh: "瀑布", "zh-tw": "瀑布",
      ko: "폭포", es: "Cascadas", fr: "Cascades", de: "Wasserfälle",
      pt: "Cachoeiras", it: "Cascate", ru: "Водопады",
      ar: "الشلالات", hi: "जलप्रपात", th: "น้ำตก", vi: "Thác nước",
      id: "Air Terjun", tr: "Şelaleler", nl: "Watervallen",
      pl: "Wodospady", sv: "Vattenfall",
    },
    desc: {
      ja: "清流と滝の風景。北海道の三段滝公園、エメラルドグリーンの淵で知られる高知のにこ淵など、日本の水の表情を集めました。",
      en: "Cascading waters of Japan. Hokkaido's Sandan Falls Park and Kochi's Niko-buchi with its emerald-green pool — Japan's water in motion.",
      zh: "清流与瀑布之景。北海道三段瀑布公园、以翠绿水潭闻名的高知仁淀蓝潭等日本之水的表情。",
      "zh-tw": "清流與瀑布之景。北海道三段瀑布公園、以翠綠水潭聞名的高知仁淀藍潭等日本之水的表情。",
      ko: "맑은 물과 폭포의 풍경. 홋카이도의 산단타키 공원, 에메랄드빛 못으로 알려진 고치의 니코부치 등 일본의 물의 표정을 모았습니다.",
    },
  },
  "lakes": {
    locs: ["摩周湖", "洞爺湖", "河口湖", "諏訪湖"],
    name: {
      ja: "湖", en: "Lakes", zh: "湖泊", "zh-tw": "湖泊",
      ko: "호수", es: "Lagos", fr: "Lacs", de: "Seen",
      pt: "Lagos", it: "Laghi", ru: "Озёра",
      ar: "البحيرات", hi: "झीलें", th: "ทะเลสาบ", vi: "Hồ",
      id: "Danau", tr: "Göller", nl: "Meren",
      pl: "Jeziora", sv: "Sjöar",
    },
    desc: {
      ja: "日本の湖。世界一級の透明度を誇る北海道・摩周湖、羊蹄山と花火の洞爺湖、富士山を映す河口湖、御神渡りで知られる諏訪湖。火山と祈りが生んだ静寂の水景。",
      en: "Japan's lakes. The world-class clarity of Hokkaido's Lake Mashu, Lake Toya with Mt. Yotei and summer fireworks, Lake Kawaguchi mirroring Mt. Fuji, and Lake Suwa with its winter «Omiwatari» ice ridges — quiet waterscapes born of volcanoes and prayer.",
      zh: "日本的湖泊。世界级透明度的北海道摩周湖、有羊蹄山与烟火的洞爷湖、倒映富士山的河口湖、以御神渡闻名的诹访湖。火山与祈祷孕育的静谧水景。",
      "zh-tw": "日本的湖泊。世界級透明度的北海道摩周湖、有羊蹄山與煙火的洞爺湖、倒映富士山的河口湖、以御神渡聞名的諏訪湖。火山與祈禱孕育的靜謐水景。",
      ko: "일본의 호수. 세계 최고 수준의 투명도를 자랑하는 홋카이도 마슈호, 요테이산과 불꽃놀이의 도야호, 후지산이 비치는 가와구치호, 「오미와타리」로 알려진 스와호. 화산과 기도가 만든 고요한 수경.",
    },
  },
};

export const COLLECTION_SLUGS = Object.keys(COLLECTIONS);

// Get all photos matching a collection's locs
export function getCollectionPhotos(slug, PREFECTURES) {
  const c = COLLECTIONS[slug];
  if (!c) return [];
  const set = new Set(c.locs);
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

// Localized helpers (en fallback)
export const getCollectionName = (slug, lang) => {
  const c = COLLECTIONS[slug];
  if (!c) return slug;
  return c.name[lang] || c.name.en || slug;
};
export const getCollectionDesc = (slug, lang) => {
  const c = COLLECTIONS[slug];
  if (!c) return "";
  return c.desc[lang] || c.desc.en || "";
};
