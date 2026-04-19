/**
 * Prefecture-level localized content: description + FAQs.
 * Languages currently populated: ja, en, zh, zh-tw, ko.
 * Other 15 languages fall back to English via getPrefDesc helper.
 */

const d = (ja, en, zh, zhtw, ko) => ({ ja, en, zh, "zh-tw": zhtw, ko });

export const PREFECTURE_CONTENT = {
  "北海道": {
    desc: d(
      "北海道は日本最北端の島で、冬のさっぽろ雪まつりや流氷、夏のラベンダー畑、世界自然遺産・知床の原生林など、四季折々の壮大な風景が広がります。湖沼や火山、広大な農地が織りなす独特の地形は、日本他地域とは一線を画す「北の大地」の魅力そのもの。本ギャラリーには札幌・知床・摩周湖・富良野・小樽・洞爺湖など118枚を収録。",
      "Hokkaido, Japan's northernmost main island, offers dramatic seasonal landscapes — the Sapporo Snow Festival and drift ice in winter, lavender fields of Furano in summer, and the primeval forests of Shiretoko, a UNESCO World Heritage site. Its volcanic lakes, vast farmland, and dramatic coastlines set it apart from the rest of Japan. This gallery features 118 photographs from Sapporo, Shiretoko, Lake Mashu, Furano, Otaru, Lake Toya, and more.",
      "北海道是日本最北端的岛屿，拥有四季壮丽的风景——冬季的札幌雪祭和流冰，夏季富良野的薰衣草田，以及世界自然遗产知床的原始森林。火山湖泊、广袤农田和崎岖海岸线构成了独特的北国风光。本图库收录札幌、知床、摩周湖、富良野、小樽、洞爷湖等地共118张照片。",
      "北海道是日本最北端的島嶼，擁有四季壯麗的風景——冬季的札幌雪祭和流冰，夏季富良野的薰衣草田，以及世界自然遺產知床的原始森林。火山湖泊、廣袤農田和崎嶇海岸線構成了獨特的北國風光。本圖庫收錄札幌、知床、摩周湖、富良野、小樽、洞爺湖等地共118張照片。",
      "홋카이도는 일본 최북단의 섬으로 겨울 삿포로 눈축제와 유빙, 여름 후라노 라벤더 밭, 세계자연유산 시레토코의 원시림 등 사계절 웅장한 풍경을 자랑합니다. 화산 호수, 광활한 농지, 장엄한 해안선이 일본의 다른 지역과 구별되는 북녘의 땅 매력을 만듭니다. 삿포로, 시레토코, 마슈호, 후라노, 오타루, 도야호 등 118장의 사진을 수록했습니다."
    ),
    faqs: [
      {
        q: d(
          "北海道の撮影ベストシーズンは？",
          "When is the best season for photography in Hokkaido?",
          "北海道摄影的最佳季节是？",
          "北海道攝影的最佳季節是？",
          "홋카이도 촬영 최적기는 언제인가요?"
        ),
        a: d(
          "2月のさっぽろ雪まつりと流氷、7月のラベンダー、10月の紅葉、1〜3月の知床流氷が特に人気。被写体と季節の組合せで選ぶのがおすすめです。",
          "February for the Sapporo Snow Festival and drift ice, July for lavender in Furano, October for autumn foliage, and January-March for Shiretoko drift ice. Pair your subject with its peak season.",
          "2月的札幌雪祭和流冰、7月的富良野薰衣草、10月的红叶、1-3月的知床流冰最受欢迎。建议根据拍摄主题选择对应季节。",
          "2月的札幌雪祭和流冰、7月的富良野薰衣草、10月的紅葉、1-3月的知床流冰最受歡迎。建議根據拍攝主題選擇對應季節。",
          "2월 삿포로 눈축제와 유빙, 7월 후라노 라벤더, 10월 단풍, 1-3월 시레토코 유빙이 특히 인기입니다. 피사체와 계절을 조합해 선택하세요."
        ),
      },
      {
        q: d(
          "北海道の主な撮影スポットは？",
          "What are the main photography spots in Hokkaido?",
          "北海道主要拍摄地有哪些？",
          "北海道主要拍攝地有哪些？",
          "홋카이도의 주요 촬영 명소는?"
        ),
        a: d(
          "札幌市街、小樽運河、富良野の花畑、摩周湖、洞爺湖、知床半島、登別地獄谷、旭山動物園、美瑛の丘など、エリアごとに特色ある風景が楽しめます。",
          "Sapporo cityscapes, Otaru canal, Furano flower fields, Lake Mashu, Lake Toya, Shiretoko Peninsula, Noboribetsu Hell Valley, Asahiyama Zoo, and the rolling hills of Biei each offer distinct visual character.",
          "札幌市区、小樽运河、富良野花田、摩周湖、洞爷湖、知床半岛、登别地狱谷、旭山动物园、美瑛丘陵等，各区域都有独特风景。",
          "札幌市區、小樽運河、富良野花田、摩周湖、洞爺湖、知床半島、登別地獄谷、旭山動物園、美瑛丘陵等，各區域都有獨特風景。",
          "삿포로 시가지, 오타루 운하, 후라노 꽃밭, 마슈호, 도야호, 시레토코 반도, 노보리베츠 지고쿠다니, 아사히야마 동물원, 비에이 언덕 등 지역별로 특색 있는 풍경을 즐길 수 있습니다."
        ),
      },
    ],
  },

  "千葉県": {
    desc: d(
      "千葉県は東京湾と太平洋に挟まれた半島で、房総の海岸線や九十九里浜、成田山新勝寺など多彩な景観を持ちます。東京からのアクセスも良く、都心の喧騒を離れた自然と海辺の風景を楽しめる場所として人気。本ギャラリーでは鴨川シーワールドの1枚を収録。",
      "Chiba faces both Tokyo Bay and the Pacific, shaped by the Boso Peninsula's coastline, Kujukuri Beach, and the historic Naritasan Shinshoji temple. Easily accessed from Tokyo, it offers quiet nature and seascapes beyond the city buzz. This gallery includes one shot from Kamogawa Sea World.",
      "千叶县位于东京湾与太平洋之间的半岛，拥有房总海岸线、九十九里浜、成田山新胜寺等多彩景观。交通便利，是远离都市喧嚣欣赏自然海景的好去处。本图库收录鸭川海洋世界1张。",
      "千葉縣位於東京灣與太平洋之間的半島，擁有房總海岸線、九十九里濱、成田山新勝寺等多彩景觀。交通便利，是遠離都市喧囂欣賞自然海景的好去處。本圖庫收錄鴨川海洋世界1張。",
      "지바현은 도쿄만과 태평양 사이의 반도로 보소 반도 해안선, 구주쿠리 해변, 나리타산 신쇼지 등 다양한 경관을 갖추고 있습니다. 도쿄에서 접근성이 좋아 도심을 벗어나 자연과 바다 풍경을 즐길 수 있는 곳입니다. 가모가와 시월드의 사진 1장을 수록."
    ),
    faqs: [
      {
        q: d("千葉県はどんな撮影ができる？", "What kinds of photography does Chiba offer?", "千叶县适合拍什么？", "千葉縣適合拍什麼？", "지바현에서는 어떤 촬영이 가능한가요?"),
        a: d("海岸線、房総半島の田園、動物や水族館など、都市近郊の多様な被写体が揃います。", "Coastlines, rural Boso landscapes, and wildlife/aquarium subjects — a diverse mix near the metropolis.", "海岸线、房总田园、动物水族馆等，距都市较近题材多样。", "海岸線、房總田園、動物水族館等，距都市較近題材多樣。", "해안선, 보소 전원 풍경, 동물·수족관 등 도시 근교에서 다양한 피사체를 담을 수 있습니다."),
      },
    ],
  },

  "東京都": {
    desc: d(
      "世界有数のメガシティ東京は、高層ビル群と江戸の風情、先端と伝統が交差する稀有な都市景観を持ちます。品川の夜景、神社仏閣、公園の桜、ベイエリアなど、刻一刻と表情を変える都市の風景を写真で捉える醍醐味があります。本ギャラリーでは東京・品川の14枚を収録。",
      "Tokyo, one of the world's great megacities, juxtaposes glass towers with Edo-era quietude. Neon-lit Shinagawa nightscapes, shrines, cherry blossoms in parks, and the bay district offer an ever-shifting urban canvas. This gallery features 14 images from central Tokyo and Shinagawa.",
      "东京是世界级大都市，高楼大厦与江户风情交织，是独特的都市景观。品川夜景、神社古刹、公园樱花、湾区风光等，每时每刻都有不同表情。本图库收录东京与品川14张照片。",
      "東京是世界級大都市，高樓大廈與江戶風情交織，是獨特的都市景觀。品川夜景、神社古剎、公園櫻花、灣區風光等，每時每刻都有不同表情。本圖庫收錄東京與品川14張照片。",
      "세계적 메가시티 도쿄는 초고층 빌딩과 에도 시대의 정취, 첨단과 전통이 교차하는 독특한 도시 경관을 자랑합니다. 시나가와 야경, 신사·사찰, 공원의 벚꽃, 베이 지역 등 시시각각 표정을 바꾸는 도시 풍경을 담을 수 있습니다. 도쿄·시나가와에서 14장을 수록했습니다."
    ),
    faqs: [
      {
        q: d("東京の夜景撮影のコツは？", "Tips for Tokyo night photography?", "东京夜景拍摄技巧？", "東京夜景拍攝技巧？", "도쿄 야경 촬영 팁은?"),
        a: d("三脚＋低ISO＋長秒露光が基本。ブルーアワー（日没直後30分）が最も空と街の光のバランスが美しい。", "Use a tripod, low ISO, and long exposure. Blue hour (30 min after sunset) balances sky and city lights best.", "三脚+低ISO+长曝光是基础。蓝色时刻（日落后30分钟）天空与城市灯光最协调。", "三腳+低ISO+長曝光是基礎。藍色時刻（日落後30分鐘）天空與城市燈光最協調。", "삼각대+저ISO+장노출이 기본. 블루아워(일몰 후 30분)가 하늘과 도시 조명의 균형이 가장 아름답습니다."),
      },
    ],
  },

  "神奈川県": {
    desc: d(
      "神奈川県は東京の南隣、古都鎌倉と国際港湾都市横浜が共存する変化に富んだ地域。鎌倉の大仏と寺社、長谷寺の四季、横浜のベイエリア夜景・赤レンガ倉庫・中華街、みなとみらい21など、歴史と現代性の両方を撮れる稀有な場所です。50枚の写真で横浜・鎌倉を収録。",
      "Kanagawa blends the ancient capital of Kamakura with the international port city of Yokohama. From Kamakura's Great Buddha and seasonal temple gardens to Yokohama's bay-side nightscapes, Red Brick Warehouse, Chinatown, and Minato Mirai 21, it offers both heritage and modernity in one frame. 50 photos of Yokohama and Kamakura.",
      "神奈川县紧邻东京南部，古都镰仓与国际港口横滨并存。镰仓大佛、长谷寺四季、横滨湾区夜景、红砖仓库、中华街、港未来21等，历史与现代交融。本图库收录横滨与镰仓共50张照片。",
      "神奈川縣緊鄰東京南部，古都鎌倉與國際港口橫濱並存。鎌倉大佛、長谷寺四季、橫濱灣區夜景、紅磚倉庫、中華街、港未來21等，歷史與現代交融。本圖庫收錄橫濱與鎌倉共50張照片。",
      "가나가와현은 도쿄 남쪽에 위치해, 고도 가마쿠라와 국제 항만 도시 요코하마가 공존하는 다채로운 지역입니다. 가마쿠라 대불과 사찰의 사계, 하세데라, 요코하마 베이 야경, 아카렌가 창고, 차이나타운, 미나토미라이 21 등 역사와 현대를 모두 담을 수 있습니다. 요코하마·가마쿠라 50장을 수록."
    ),
    faqs: [
      {
        q: d("鎌倉と横浜のベストな周り方は？", "Best way to visit Kamakura and Yokohama?", "镰仓和横滨最佳游览方式？", "鎌倉和橫濱最佳遊覽方式？", "가마쿠라와 요코하마 최적 동선은?"),
        a: d("午前中は鎌倉の寺社（大仏・長谷寺・鎌倉大仏など）、午後は横浜へ移動してみなとみらい・赤レンガ倉庫の夕景〜夜景が王道。", "Morning at Kamakura temples (Great Buddha, Hasedera), then afternoon to Yokohama for Minato Mirai sunset and Red Brick Warehouse nightscapes.", "上午游览镰仓寺庙（大佛、长谷寺），下午移步横滨拍港未来黄昏及红砖仓库夜景最佳。", "上午遊覽鎌倉寺廟（大佛、長谷寺），下午移步橫濱拍港未來黃昏及紅磚倉庫夜景最佳。", "오전에 가마쿠라 사찰(대불·하세데라), 오후에 요코하마로 이동해 미나토미라이 일몰과 아카렌가 창고 야경을 담는 코스가 정석입니다."),
      },
    ],
  },

  "石川県": {
    desc: d(
      "石川県は日本海側の伝統文化王国。兼六園（日本三名園）、金沢城、ひがし茶屋街、武家屋敷、金箔工芸、能登半島の海岸線など、北陸の雅と自然が調和した風景が広がります。加賀百万石の城下町・金沢を中心に7枚の写真を収録。",
      "Ishikawa is a treasure trove of traditional culture on Japan's Sea of Japan side. Kenrokuen (one of Japan's Three Great Gardens), Kanazawa Castle, the Higashi Chaya geisha district, samurai houses, gold-leaf crafts, and the Noto Peninsula coastline combine refined elegance with nature. 7 photos centered on Kanazawa, the castle town of the Kaga domain.",
      "石川县是日本海侧传统文化的宝库。兼六园（日本三大名园）、金泽城、东茶屋街、武家屋敷、金箔工艺、能登半岛海岸线等，北陆雅致与自然共存。以加贺百万石城下町金泽为中心收录7张照片。",
      "石川縣是日本海側傳統文化的寶庫。兼六園（日本三大名園）、金澤城、東茶屋街、武家屋敷、金箔工藝、能登半島海岸線等，北陸雅致與自然共存。以加賀百萬石城下町金澤為中心收錄7張照片。",
      "이시카와현은 동해 쪽의 전통문화 왕국. 겐로쿠엔(일본 3대 정원), 가나자와성, 히가시차야 거리, 무가 저택, 금박 공예, 노토 반도 해안선 등 호쿠리쿠의 우아함과 자연이 조화롭게 펼쳐집니다. 가가 백만석 성하도시 가나자와 중심으로 7장을 수록."
    ),
    faqs: [
      {
        q: d("金沢で1日で回れる撮影スポットは？", "What spots can I shoot in Kanazawa in one day?", "金泽一日拍摄路线？", "金澤一日拍攝路線？", "가나자와 당일 촬영 동선은?"),
        a: d("朝イチで兼六園（光が柔らかい）→ 金沢城 → ひがし茶屋街（午後〜夕方）→ 近江町市場 → 金沢駅の鼓門で夜景、というルートが王道。", "Early morning at Kenrokuen (soft light), then Kanazawa Castle, Higashi Chaya (afternoon/evening), Omicho Market, and ending with the Tsuzumi Gate at Kanazawa Station by night.", "清晨兼六园（柔和光线）→金泽城→东茶屋街（下午至黄昏）→近江町市场→夜访金泽站鼓门，为经典路线。", "清晨兼六園（柔和光線）→金澤城→東茶屋街（下午至黃昏）→近江町市場→夜訪金澤站鼓門，為經典路線。", "이른 아침 겐로쿠엔(부드러운 빛)→가나자와성→히가시차야(오후~저녁)→오미초 시장→가나자와역 츠즈미몬 야경 순이 정석입니다."),
      },
    ],
  },

  "岐阜県": {
    desc: d(
      "岐阜県は日本アルプスと清流に恵まれた内陸県。世界遺産・白川郷の合掌造り集落、飛騨高山の古い町並み、長良川の鵜飼い、下呂温泉など、日本の原風景が色濃く残るエリア。雪化粧した白川郷の景観を中心に4枚を収録。",
      "Gifu is an inland prefecture cradled by the Japanese Alps and pristine rivers. The UNESCO-listed Shirakawa-go gassho-zukuri village, Hida-Takayama old town, cormorant fishing on the Nagara River, and Gero Onsen preserve classic rural Japan. This gallery features 4 photos, centered on snow-covered Shirakawa-go.",
      "岐阜县是被日本阿尔卑斯山脉和清流环抱的内陆县。世界遗产白川乡合掌造村落、飞驒高山老街、长良川鹈饲、下吕温泉等保留着日本原始风景。本图库以雪中白川乡为中心收录4张照片。",
      "岐阜縣是被日本阿爾卑斯山脈和清流環抱的內陸縣。世界遺產白川鄉合掌造村落、飛驒高山老街、長良川鸕鷀捕魚、下呂溫泉等保留著日本原始風景。本圖庫以雪中白川鄉為中心收錄4張照片。",
      "기후현은 일본 알프스와 맑은 강에 둘러싸인 내륙현. 세계유산 시라카와고 갓쇼즈쿠리 마을, 히다 다카야마 옛거리, 나가라강 가마우지 낚시, 게로 온천 등 일본의 원풍경이 짙게 남아 있습니다. 눈 덮인 시라카와고를 중심으로 4장을 수록."
    ),
    faqs: [
      {
        q: d("白川郷のライトアップはいつ？", "When is Shirakawa-go winter light-up?", "白川乡点灯活动是何时？", "白川鄉點燈活動是何時？", "시라카와고 라이트업 시기는?"),
        a: d("毎年1〜2月の限られた日程（例年6日程度）で開催。要予約制で、展望台から合掌造りと雪景色を撮るなら早めの計画必須。", "Held on a limited number of days (typically ~6) in January and February. Reservations required; plan early to shoot gassho houses in snow from the observatory.", "每年1-2月限定约6天举办。需预约，如在展望台拍摄合掌造雪景务必提前规划。", "每年1-2月限定約6天舉辦。需預約，如在展望台拍攝合掌造雪景務必提前規劃。", "매년 1-2월 중 약 6일만 개최됩니다. 예약제이며 전망대에서 갓쇼즈쿠리와 설경을 담으려면 미리 계획이 필요합니다."),
      },
    ],
  },

  "愛知県": {
    desc: d(
      "愛知県は名古屋を中心とする中部地方の中枢。名古屋城、熱田神宮、トヨタ産業技術記念館などの文化施設に加え、東山動植物園のゴリラ舎やコアラ館は動物写真の名所。都市と産業、自然が一体化した独特の魅力があります。本ギャラリーでは東山動物園の24枚を収録。",
      "Aichi, centered on Nagoya, is the hub of central Japan. Beyond Nagoya Castle, Atsuta Shrine, and the Toyota Industrial Museum, Higashiyama Zoo's gorilla enclosure and koala house are destinations for wildlife photographers. The prefecture blends urban life, industry, and nature. 24 photos from Higashiyama Zoo.",
      "爱知县以名古屋为中心，是中部地区枢纽。除名古屋城、热田神宫、丰田产业技术纪念馆等文化设施外，东山动植物园的大猩猩馆和考拉馆是动物摄影名所。都市、产业与自然融合。本图库收录东山动物园24张照片。",
      "愛知縣以名古屋為中心，是中部地區樞紐。除名古屋城、熱田神宮、豐田產業技術紀念館等文化設施外，東山動植物園的大猩猩館和無尾熊館是動物攝影名所。都市、產業與自然融合。本圖庫收錄東山動物園24張照片。",
      "아이치현은 나고야를 중심으로 한 주부 지역의 핵심. 나고야성, 아쓰타 신궁, 토요타 산업기술기념관 등 문화시설 외에도 히가시야마 동식물원의 고릴라관·코알라관은 동물 사진 명소입니다. 도시·산업·자연이 어우러진 매력을 지녔습니다. 히가시야마 동물원 24장을 수록."
    ),
    faqs: [
      {
        q: d("動物園で綺麗に撮るコツは？", "Tips for shooting well at zoos?", "动物园拍摄技巧？", "動物園拍攝技巧？", "동물원에서 잘 찍는 팁은?"),
        a: d("明るい単焦点（50mm f/1.8等）で背景ボケを活かし、金網越しはレンズを網にぴったり付けると消える。動物の目にピントを合わせる。", "A fast prime (e.g., 50mm f/1.8) blurs the background; press the lens against wire mesh to make it disappear. Focus on the animal's eyes.", "用明亮定焦镜头（如50mm f/1.8）营造背景虚化，镜头紧贴铁丝网可使网消失。对焦于动物眼睛。", "用明亮定焦鏡頭（如50mm f/1.8）營造背景虛化，鏡頭緊貼鐵絲網可使網消失。對焦於動物眼睛。", "밝은 단초점(50mm f/1.8 등)으로 배경을 흐리고, 철망은 렌즈를 바짝 붙이면 사라집니다. 동물 눈에 초점을 맞추세요."),
      },
    ],
  },

  "三重県": {
    desc: d(
      "三重県は日本の精神的中心・伊勢神宮を擁する地。神宮の静謐な参道、門前町おかげ横丁の賑わい、二見の夫婦岩、英虞湾の真珠養殖、志摩半島の雄大な海岸線など、神域と海の幸が同居する独特の景観。本ギャラリーでは伊勢・朝熊山・夫婦岩・鳥羽水族館など38枚を収録。",
      "Mie is home to Ise Jingu, the most sacred Shinto shrine in Japan. The tranquil shrine paths, the bustling Oharai-machi/Okage Yokocho district, the Meoto Iwa 'married couple rocks' at Futami, pearl farms of Ago Bay, and the majestic Shima Peninsula coastline together weave sacred land and seaside abundance. 38 photos from Ise, Mt. Asama, Meoto Iwa, Toba Aquarium, and more.",
      "三重县拥有日本精神中心伊势神宫。神宫静谧参道、门前町御荫横丁、二见夫妻岩、英虞湾珍珠养殖、志摩半岛壮丽海岸线等，神域与海产并存的独特景观。本图库收录伊势、朝熊山、夫妻岩、鸟羽水族馆等38张。",
      "三重縣擁有日本精神中心伊勢神宮。神宮靜謐參道、門前町御蔭橫丁、二見夫婦岩、英虞灣珍珠養殖、志摩半島壯麗海岸線等，神域與海產並存的獨特景觀。本圖庫收錄伊勢、朝熊山、夫婦岩、鳥羽水族館等38張。",
      "미에현은 일본의 정신적 중심 이세신궁이 있는 곳. 신궁의 고요한 참배길, 오하라이마치·오카게요코초의 번화함, 후타미 메오토이와, 아고만의 진주 양식, 시마 반도의 웅장한 해안선 등 성지와 해산물이 공존하는 독특한 경관. 이세, 아사마산, 메오토이와, 도바 수족관 등 38장을 수록."
    ),
    faqs: [
      {
        q: d("伊勢神宮で撮影するマナーは？", "Photography etiquette at Ise Jingu?", "伊势神宫拍摄礼仪？", "伊勢神宮拍攝禮儀？", "이세신궁 촬영 매너는?"),
        a: d("正宮（御正宮）の中は撮影禁止。鳥居から内側は節度ある撮影にとどめ、参拝者や神職を直接撮らないのが原則。", "Inside the main sanctuaries is strictly off-limits. Keep photography modest inside the torii gates, and avoid shooting worshippers or priests directly.", "正宫内部严禁拍摄。鸟居内部需克制拍摄，避免直接拍摄参拜者和神职人员。", "正宮內部嚴禁拍攝。鳥居內部需克制拍攝，避免直接拍攝參拜者和神職人員。", "정궁 내부는 촬영 금지. 도리이 안쪽은 절제해서 촬영하고 참배객·신관을 직접 찍지 않는 것이 원칙입니다."),
      },
      {
        q: d("夫婦岩の日の出時期は？", "When can I shoot sunrise between the Meoto Iwa?", "夫妻岩日出观赏期？", "夫婦岩日出觀賞期？", "메오토이와 일출 시기는?"),
        a: d("5〜7月の夏至前後のみ、2つの岩の間から日の出が見える。晴天率が高いのは6月初旬。夜明け前到着がおすすめ。", "Only near the summer solstice (May–July) does the sun rise directly between the two rocks. Early June has the best clear-sky rate; arrive before dawn.", "仅5-7月夏至前后能看到两岩之间日出。6月上旬晴率最高，建议黎明前到达。", "僅5-7月夏至前後能看到兩岩之間日出。6月上旬晴率最高，建議黎明前到達。", "5-7월 하지 무렵에만 두 바위 사이로 일출을 볼 수 있습니다. 6월 초가 맑은 날 확률이 높으며 새벽 전 도착을 권합니다."),
      },
    ],
  },

  "京都府": {
    desc: d(
      "千年の都・京都は1,600以上の寺社を擁する日本文化の核心。世界遺産の清水寺、金閣寺、10円硬貨にもなった平等院鳳凰堂、紅葉と通天橋で名高い東福寺など、四季折々の美しさが広がります。木造建築と庭園、石畳の路地が織りなす景観は写真家の聖地。清水寺・金閣寺・平等院・東福寺など18枚を収録。",
      "Kyoto, Japan's thousand-year capital, houses over 1,600 temples and shrines at the heart of Japanese culture. UNESCO sites like Kiyomizu-dera and Kinkaku-ji, Byodoin Phoenix Hall (featured on the ¥10 coin), and the autumn-foliage-famed Tofuku-ji unveil distinct seasonal beauty. Wooden architecture, gardens, and stone-paved lanes make it sacred ground for photographers. 18 photos from Kiyomizu-dera, Kinkaku-ji, Byodoin, and Tofuku-ji.",
      "千年古都京都拥有1600多座寺庙神社，是日本文化核心。世界遗产清水寺、金阁寺、10日元硬币上的平等院凤凰堂、红叶名所东福寺等，四季之美尽收。木造建筑、庭园、石板小巷构成的景观是摄影圣地。本图库收录清水寺、金阁寺、平等院、东福寺等18张。",
      "千年古都京都擁有1600多座寺廟神社，是日本文化核心。世界遺產清水寺、金閣寺、10日圓硬幣上的平等院鳳凰堂、紅葉名所東福寺等，四季之美盡收。木造建築、庭園、石板小巷構成的景觀是攝影聖地。本圖庫收錄清水寺、金閣寺、平等院、東福寺等18張。",
      "천년 고도 교토는 1,600개 이상의 사찰·신사를 가진 일본 문화의 핵심. 세계유산 기요미즈데라·긴카쿠지, 10엔 주화에 새겨진 뵤도인 호오도, 단풍 명소 도후쿠지 등 사계절의 아름다움이 펼쳐집니다. 목조 건축과 정원, 돌길이 어우러진 경관은 사진가의 성지입니다. 기요미즈데라·긴카쿠지·뵤도인·도후쿠지 등 18장을 수록."
    ),
    faqs: [
      {
        q: d("京都の紅葉撮影ベスト時期は？", "Best time for Kyoto autumn foliage photography?", "京都红叶最佳时期？", "京都紅葉最佳時期？", "교토 단풍 촬영 최적기는?"),
        a: d("例年11月下旬〜12月上旬がピーク。東福寺通天橋、永観堂、清水寺、嵐山のどこも午前中の順光が美しい。", "Peak usually falls in late November to early December. Tofuku-ji Tsuten-kyo bridge, Eikando, Kiyomizu-dera, and Arashiyama all look best in morning front-light.", "每年11月下旬至12月上旬为高峰。东福寺通天桥、永观堂、清水寺、岚山等在上午顺光下最美。", "每年11月下旬至12月上旬為高峰。東福寺通天橋、永觀堂、清水寺、嵐山等在上午順光下最美。", "매년 11월 하순~12월 초가 절정. 도후쿠지 쓰텐쿄, 에이칸도, 기요미즈데라, 아라시야마 모두 오전 순광에서 가장 아름답습니다."),
      },
      {
        q: d("人混みを避けて撮るには？", "How to avoid crowds?", "如何避开人潮拍摄？", "如何避開人潮拍攝？", "관광객 없이 찍으려면?"),
        a: d("早朝6〜8時が圧倒的におすすめ。清水寺は朝6時から、金閣寺は9時開門前の外周、平等院は開門直後を狙う。", "Early morning (6–8 AM) is by far best. Kiyomizu-dera opens at 6 AM, walk Kinkaku-ji's exterior before 9 AM opening, and arrive at Byodoin right at opening.", "清晨6-8点效果最佳。清水寺6点开放，金阁寺9点开门前外圈可拍，平等院开门即入。", "清晨6-8點效果最佳。清水寺6點開放，金閣寺9點開門前外圈可拍，平等院開門即入。", "이른 아침 6-8시가 최고. 기요미즈데라는 6시 개문, 긴카쿠지는 9시 전 외곽 산책, 뵤도인은 개문 직후가 좋습니다."),
      },
    ],
  },

  "兵庫県": {
    desc: d(
      "兵庫県には日本最高峰の木造城郭・世界遺産の姫路城が聳え立ちます。白鷺が羽を広げたような優美な姿から「白鷺城」とも呼ばれ、桜や雪景色との組合せは日本を代表する絵画的風景。神戸港夜景、有馬温泉、淡路島と多彩な魅力を持ちます。5枚の写真で姫路城を収録。",
      "Hyogo is home to Himeji Castle, Japan's greatest wooden fortress and a UNESCO World Heritage site. Its graceful silhouette — likened to a white heron spreading wings — makes it iconic in any season, especially with cherry blossoms or snow. Kobe's harbor nightscape, Arima Onsen, and Awaji Island round out the prefecture. 5 photos of Himeji Castle.",
      "兵库县拥有日本最高木造城堡——世界遗产姬路城。因洁白姿态如白鹭展翅而得名「白鹭城」，樱花或雪景相伴时堪称日本代表性画面。另有神户港夜景、有马温泉、淡路岛等魅力。本图库收录姬路城5张。",
      "兵庫縣擁有日本最高木造城堡——世界遺產姬路城。因潔白姿態如白鷺展翅而得名「白鷺城」，櫻花或雪景相伴時堪稱日本代表性畫面。另有神戶港夜景、有馬溫泉、淡路島等魅力。本圖庫收錄姬路城5張。",
      "효고현에는 일본 최고의 목조 성곽이자 세계유산인 히메지성이 우뚝 서 있습니다. 백로가 날개를 펼친 듯한 우아한 모습에서 '백로성'이라 불리며, 벚꽃이나 설경과 어우러지는 장면은 일본을 대표하는 풍경입니다. 고베항 야경, 아리마 온천, 아와지섬 등 다채로운 매력을 지녔습니다. 히메지성 5장을 수록."
    ),
    faqs: [
      {
        q: d("姫路城のベスト撮影ポイントは？", "Best photo spots for Himeji Castle?", "姬路城最佳拍摄点？", "姬路城最佳拍攝點？", "히메지성 최고 촬영 포인트는?"),
        a: d("大手門前（正面）、三の丸広場（桜と共に）、西の丸庭園（側面）、男山配水池公園（俯瞰）の4ヶ所が定番。", "Otemon front, Sannomaru Plaza (with cherry blossoms), Nishi-no-maru Garden (side view), and Otoko-yama Park (elevated view) are the four classic spots.", "大手门前（正面）、三之丸广场（配樱花）、西之丸庭园（侧面）、男山配水池公园（俯瞰）为经典4处。", "大手門前（正面）、三之丸廣場（配櫻花）、西之丸庭園（側面）、男山配水池公園（俯瞰）為經典4處。", "오테몬 앞(정면), 산노마루 광장(벚꽃과 함께), 니시노마루 정원(측면), 오토코야마 공원(부감) 네 곳이 정석입니다."),
      },
    ],
  },

  "奈良県": {
    desc: d(
      "奈良県は710〜784年の日本最初の本格的首都・平城京が置かれた古都。世界遺産の法隆寺は世界最古の木造建築（7世紀）、東大寺大仏殿、春日大社、奈良公園の鹿など、1,300年前の日本文化が今に息づきます。法隆寺とその夢殿を中心に3枚を収録。",
      "Nara hosted Japan's first permanent capital, Heijo-kyo (710–784). The UNESCO-listed Horyu-ji, dating to the 7th century, is the world's oldest wooden structure. Add Todai-ji Great Buddha Hall, Kasuga Taisha, and the deer roaming Nara Park, and 1,300-year-old Japan still breathes here. 3 photos centered on Horyu-ji and its Yumedono (Hall of Dreams).",
      "奈良县曾是710-784年日本第一个正式首都平城京所在地。世界遗产法隆寺为世界最古老木造建筑（7世纪），东大寺大佛殿、春日大社、奈良公园鹿群等，1300年前的日本文化至今鲜活。本图库以法隆寺及其梦殿为中心收录3张。",
      "奈良縣曾是710-784年日本第一個正式首都平城京所在地。世界遺產法隆寺為世界最古老木造建築（7世紀），東大寺大佛殿、春日大社、奈良公園鹿群等，1300年前的日本文化至今鮮活。本圖庫以法隆寺及其夢殿為中心收錄3張。",
      "나라현은 710-784년 일본 최초의 본격적 수도 헤이조쿄가 있던 고도. 세계유산 호류지는 세계 최고(最古) 목조 건축(7세기), 도다이지 대불전, 가스가 대사, 나라 공원의 사슴 등 1,300년 전 일본 문화가 살아 숨쉽니다. 호류지와 유메도노를 중심으로 3장을 수록."
    ),
    faqs: [
      {
        q: d("奈良の鹿と一緒に撮るコツは？", "Tips for photographing with deer in Nara?", "与奈良鹿合拍技巧？", "與奈良鹿合拍技巧？", "나라 사슴과 함께 찍는 팁은?"),
        a: d("鹿せんべいを持つと近寄ってくるが、食べ終わると離れる。朝の逆光で毛並みを浮かび上がらせる構図が人気。", "Holding shika senbei attracts them, but they leave once it's gone. Morning backlight that highlights their fur is a classic composition.", "买鹿饼时会靠近，吃完即散。早晨逆光突出毛发的构图很受欢迎。", "買鹿餅時會靠近，吃完即散。早晨逆光突出毛髮的構圖很受歡迎。", "시카센베이를 들면 다가오고 다 먹으면 떠납니다. 아침 역광으로 털을 살리는 구도가 인기입니다."),
      },
    ],
  },

  "徳島県": {
    desc: d(
      "徳島県は四国東部、世界最大級の渦潮・鳴門海峡で知られます。大鳴門橋から見下ろす渦潮は迫力満点。阿波踊り、祖谷の秘境・かずら橋、剣山など、海と山の対比が劇的。2枚の写真で鳴門海峡と大鳴門橋を収録。",
      "Tokushima, in eastern Shikoku, is known for the Naruto Strait's massive tidal whirlpools. Seen from Onaruto Bridge, the swirling water is dramatic. Awa Odori dance, the remote Iya Valley with its vine bridges, and sacred Mt. Tsurugi offer striking sea-versus-mountain contrast. 2 photos of Naruto Strait and Onaruto Bridge.",
      "德岛县位于四国东部，以世界级巨大漩涡鸣门海峡闻名。从大鸣门桥俯瞰漩涡震撼力十足。阿波舞、祖谷秘境葛藤桥、剑山等，海山对比戏剧。本图库收录鸣门海峡与大鸣门桥2张。",
      "德島縣位於四國東部，以世界級巨大漩渦鳴門海峽聞名。從大鳴門橋俯瞰漩渦震撼力十足。阿波舞、祖谷秘境葛藤橋、劍山等，海山對比戲劇。本圖庫收錄鳴門海峽與大鳴門橋2張。",
      "도쿠시마현은 시코쿠 동부, 세계 최대급 소용돌이 나루토 해협으로 유명. 오나루토 대교에서 내려다보는 소용돌이는 박력 만점. 아와오도리 춤, 이야 계곡 비경 가즈라바시, 쓰루기산 등 바다와 산의 대비가 극적입니다. 나루토 해협·오나루토 대교 2장을 수록."
    ),
    faqs: [
      {
        q: d("鳴門の渦潮が一番大きい時は？", "When are Naruto's whirlpools largest?", "鸣门漩涡最大的时刻？", "鳴門漩渦最大的時刻？", "나루토 소용돌이 최대 시기는?"),
        a: d("春・秋の大潮（新月・満月前後）の満潮／干潮前後1〜2時間。事前に潮見表を確認し、観潮船や大鳴門橋遊歩道から撮影。", "Around high/low tide (±1-2 hours) on spring/fall spring tides (near new or full moon). Check tide tables; shoot from tour boats or the Onaruto Bridge walkway.", "春秋大潮（新月/满月前后）的满潮/干潮前后1-2小时最大。查潮汐表后从观潮船或大鸣门桥步道拍摄。", "春秋大潮（新月/滿月前後）的滿潮/乾潮前後1-2小時最大。查潮汐表後從觀潮船或大鳴門橋步道拍攝。", "봄·가을 대조(신월·보름 전후)의 만조/간조 전후 1-2시간이 최대. 조석표를 확인하고 유람선 또는 오나루토 대교 산책로에서 촬영하세요."),
      },
    ],
  },

  "香川県": {
    desc: d(
      "香川県は四国北東部、日本最小の県ながら名所が凝縮。父母ヶ浜は「ウユニ塩湖」のような夕景の水鏡で一躍世界的撮影地に。栗林公園、金刀比羅宮、讃岐うどん、瀬戸内海のアートの島・直島など、海と文化の魅力が詰まっています。父母ヶ浜の2枚を収録。",
      "Kagawa, Japan's smallest prefecture in northeast Shikoku, packs an impressive density of sights. Chichibugahama beach, where sunsets reflect on tidal flats, gained global fame as Japan's 'Uyuni Salt Flat'. Ritsurin Garden, Kotohira Shrine, Sanuki udon, and art-island Naoshima on the Seto Inland Sea round out the offering. 2 photos of Chichibugahama.",
      "香川县位于四国东北部，日本最小县却名胜密集。父母浜因夕阳下的水镜效果如「玻利维亚乌尤尼盐湖」而成为世界摄影地。栗林公园、金刀比罗宫、赞岐乌冬、濑户内艺术岛直岛等海与文化的魅力密集。本图库收录父母浜2张。",
      "香川縣位於四國東北部，日本最小縣卻名勝密集。父母濱因夕陽下的水鏡效果如「玻利維亞烏尤尼鹽湖」而成為世界攝影地。栗林公園、金刀比羅宮、讚岐烏龍、瀨戶內藝術島直島等海與文化的魅力密集。本圖庫收錄父母濱2張。",
      "가가와현은 시코쿠 북동부, 일본 최소 면적이지만 명소가 응축되어 있습니다. 지치부가하마는 우유니 소금사막과 같은 노을 물거울로 세계적 촬영 명소가 되었습니다. 리쓰린 공원, 고토히라구, 사누키 우동, 세토내해 예술의 섬 나오시마 등 바다와 문화의 매력이 가득합니다. 지치부가하마 2장을 수록."
    ),
    faqs: [
      {
        q: d("父母ヶ浜で鏡面反射を撮る条件は？", "What conditions create Chichibugahama's mirror reflection?", "父母浜水镜反射条件？", "父母濱水鏡反射條件？", "지치부가하마 물거울 조건은?"),
        a: d("①干潮と日没が重なる日 ②風がほぼ無い ③空に雲（空だけだと単調）。三豊市観光協会のサイトに最適日がカレンダー表示されています。",
           "①Low tide coinciding with sunset ②Near-zero wind ③Clouds in the sky (clear sky looks flat). Mitoyo City tourism publishes optimal dates online.",
           "①干潮与日落重合 ②近无风 ③天空有云（晴空显单调）。三丰市观光协会网站有最佳日历。",
           "①乾潮與日落重合 ②近無風 ③天空有雲（晴空顯單調）。三豐市觀光協會網站有最佳日曆。",
           "①간조와 일몰이 겹치는 날 ②바람이 거의 없음 ③하늘에 구름(맑으면 단조로움). 미토요시 관광협회 사이트에서 최적일 달력을 확인할 수 있습니다."),
      },
    ],
  },

  "愛媛県": {
    desc: d(
      "愛媛県は四国西部、日本最古の温泉・道後温泉本館、現存12天守の一つ松山城、しまなみ海道の島々を繋ぐ来島海峡大橋など、歴史と海景が融合した地域。亀老山展望台からの瀬戸内海の多島美は絶景。10枚で道後温泉・松山城・来島海峡大橋・亀老山展望台を収録。",
      "Ehime, in western Shikoku, blends history and seascapes: Japan's oldest hot spring (Dogo Onsen), Matsuyama Castle (one of 12 surviving originals), and the Kurushima Kaikyo Bridges linking the Shimanami Kaido islands. The Mt. Kiro observatory offers a sweeping view of the Seto Inland Sea's scattered islands. 10 photos from Dogo Onsen, Matsuyama Castle, Kurushima Bridges, and Mt. Kiro Observatory.",
      "爱媛县位于四国西部，融合历史与海景：日本最古老温泉道后温泉本馆、现存12天守之一松山城、连接岛波海道的来岛海峡大桥等。龟老山展望台俯瞰濑户内海群岛美景绝佳。本图库收录道后温泉、松山城、来岛海峡大桥、龟老山展望台共10张。",
      "愛媛縣位於四國西部，融合歷史與海景：日本最古老溫泉道後溫泉本館、現存12天守之一松山城、連接島波海道的來島海峽大橋等。龜老山展望台俯瞰瀨戶內海群島美景絕佳。本圖庫收錄道後溫泉、松山城、來島海峽大橋、龜老山展望台共10張。",
      "에히메현은 시코쿠 서부, 일본 최고(最古) 온천 도고온천 본관, 현존 12천수 중 하나 마쓰야마성, 시마나미 가이도 섬들을 잇는 구루시마 해협 대교 등 역사와 해경이 융합된 지역. 기로산 전망대에서 바라보는 세토내해의 다도미가 절경입니다. 도고온천·마쓰야마성·구루시마 대교·기로산 전망대에서 10장을 수록."
    ),
    faqs: [
      {
        q: d("道後温泉本館は撮影可能？", "Can I photograph Dogo Onsen Honkan building?", "道后温泉本馆可以拍摄吗？", "道後溫泉本館可以拍攝嗎？", "도고온천 본관 촬영 가능한가요?"),
        a: d("外観は自由。建物裏手や夜間ライトアップも撮影可。館内は入浴客のプライバシーのため一部撮影禁止エリアあり。", "Exterior is fully open; rear angles and evening illumination shots are recommended. Some interior areas are off-limits to respect bathers' privacy.", "外观自由拍摄，后方角度和夜间灯光也推荐。内部有部分禁拍区域以保护浴客隐私。", "外觀自由拍攝，後方角度和夜間燈光也推薦。內部有部分禁拍區域以保護浴客隱私。", "외관은 자유 촬영. 건물 뒤편과 야간 조명도 추천. 내부는 입욕객 프라이버시 보호를 위해 일부 촬영 금지 구역이 있습니다."),
      },
    ],
  },

  "高知県": {
    desc: d(
      "高知県は四国南部、太平洋に面した坂本龍馬の故郷。桂浜の荒々しい海岸、高知城（現存12天守）、日本最後の清流と称される四万十川、にこ淵のエメラルドグリーンの神秘、沈下橋など、雄大で原初的な自然風景が残る地。11枚で桂浜・高知城・にこ淵・名越屋沈下橋を収録。",
      "Kochi, southern Shikoku, faces the Pacific and is the birthplace of Sakamoto Ryoma. Its rugged Katsurahama beach, Kochi Castle (one of 12 surviving originals), the Shimanto River (called Japan's last clear river), the mystical emerald waters of Nikobuchi, and submersible low-water bridges retain primal, untouched nature. 11 photos of Katsurahama, Kochi Castle, Nikobuchi, and Nagoya submersible bridge.",
      "高知县位于四国南部，面向太平洋，坂本龙马的故乡。桂浜狂野海岸、高知城（现存12天守之一）、被誉为日本最后清流的四万十川、仁淀蓝的神秘、沈下桥等，保留壮丽原始自然风景。本图库收录桂浜、高知城、仁淀蓝、名越屋沈下桥11张。",
      "高知縣位於四國南部，面向太平洋，坂本龍馬的故鄉。桂濱狂野海岸、高知城（現存12天守之一）、被譽為日本最後清流的四萬十川、仁淀藍的神秘、沈下橋等，保留壯麗原始自然風景。本圖庫收錄桂濱、高知城、仁淀藍、名越屋沈下橋11張。",
      "고치현은 시코쿠 남부, 태평양에 면한 사카모토 료마의 고향. 가쓰라하마의 거친 해안, 고치성(현존 12천수), 일본 최후의 맑은 강으로 불리는 시만토강, 니코부치의 에메랄드빛 신비, 침하교 등 웅장한 원시 자연 풍경이 남아 있습니다. 가쓰라하마·고치성·니코부치·나고야 침하교 11장을 수록."
    ),
    faqs: [
      {
        q: d("にこ淵の水の青色を撮るコツは？", "Tips for capturing Nikobuchi's blue water?", "如何拍出仁淀蓝？", "如何拍出仁淀藍？", "니코부치의 푸른빛을 찍는 팁은?"),
        a: d("晴天の正午前後、直射光が水面に届く時間帯が最も青い。PLフィルターで水面反射を抑制すると色が深まる。", "Around midday on clear days, when direct sunlight reaches the water, the blue is strongest. A polarizing filter deepens the color by cutting surface reflections.", "晴天正午前后直射光到达水面时最蓝。PL偏振镜抑制水面反光可加深色彩。", "晴天正午前後直射光到達水面時最藍。PL偏振鏡抑制水面反光可加深色彩。", "맑은 날 정오 전후 직사광이 수면에 닿는 시간대가 가장 푸릅니다. PL 필터로 수면 반사를 억제하면 색이 깊어집니다."),
      },
    ],
  },

  "福岡県": {
    desc: d(
      "福岡県は九州最大の都市圏。博多の屋台文化、太宰府天満宮、福岡タワーと博多湾の夜景、糸島半島のビーチ、能古島など、都会と海の距離が近い暮らしやすさが魅力。本ギャラリーでは福岡市街の2枚を収録。",
      "Fukuoka is Kyushu's largest urban area, famed for Hakata street-food stalls, Dazaifu Tenmangu shrine, Fukuoka Tower nightscapes over the bay, the Itoshima Peninsula beaches, and Nokonoshima Island — a city where downtown and sea sit close together. 2 photos of Fukuoka city.",
      "福冈县是九州最大都市圈。博多屋台文化、太宰府天满宫、福冈塔与博多湾夜景、糸岛半岛沙滩、能古岛等，城市与大海近距离共存。本图库收录福冈市区2张。",
      "福岡縣是九州最大都市圈。博多屋台文化、太宰府天滿宮、福岡塔與博多灣夜景、絲島半島沙灘、能古島等，城市與大海近距離共存。本圖庫收錄福岡市區2張。",
      "후쿠오카현은 규슈 최대 도시권. 하카타 포장마차 문화, 다자이후 덴만구, 후쿠오카 타워와 하카타만 야경, 이토시마 반도 해변, 노코노시마 등 도심과 바다가 가까운 살기 좋은 곳입니다. 후쿠오카 시내 2장을 수록."
    ),
    faqs: [
      {
        q: d("福岡で絶対外せない撮影地は？", "Must-see photo spots in Fukuoka?", "福冈必去拍摄地？", "福岡必去拍攝地？", "후쿠오카 필수 촬영지는?"),
        a: d("太宰府天満宮の参道と本殿、福岡タワー→百道浜→ベイサイドプレイスの夜景ラインが鉄板。", "The approach path and main hall of Dazaifu Tenmangu, plus the Fukuoka Tower–Momochi Beach–Bayside Place night view corridor.", "太宰府天满宫参道与正殿、福冈塔→百道浜→海湾广场的夜景路线是经典。", "太宰府天滿宮參道與正殿、福岡塔→百道濱→海灣廣場的夜景路線是經典。", "다자이후 덴만구 참배길과 본전, 후쿠오카 타워→모모치하마→베이사이드 플레이스 야경 루트가 정석입니다."),
      },
    ],
  },

  "大分県": {
    desc: d(
      "大分県は九州東部の温泉王国。別府は日本最大の湯量を誇り、「地獄めぐり」の血の池地獄・海地獄など非日常の光景が広がります。湯布院は由布岳を望む高原の風情ある温泉街。湯煙と山並みの共存は他にない被写体。8枚で別府・湯布院を収録。",
      "Oita is Kyushu's onsen kingdom. Beppu boasts Japan's largest hot-spring water volume; the 'Hells of Beppu' (Blood Pond, Sea Hell, etc.) offer surreal scenery. Yufuin is a highland onsen town graced by Mt. Yufu. The coexistence of steam plumes and mountains is a rare subject. 8 photos from Beppu and Yufuin.",
      "大分县是九州东部温泉王国。别府拥有日本最大涌泉量，「地狱巡游」的血池地狱、海地狱等超现实景观广布。由布院是仰望由布岳的高原温泉乡。汤烟与山峦并存是独特题材。本图库收录别府、由布院8张。",
      "大分縣是九州東部溫泉王國。別府擁有日本最大湧泉量，「地獄巡遊」的血池地獄、海地獄等超現實景觀廣布。由布院是仰望由布岳的高原溫泉鄉。湯煙與山巒並存是獨特題材。本圖庫收錄別府、由布院8張。",
      "오이타현은 규슈 동부의 온천 왕국. 벳푸는 일본 최대 용수량을 자랑하며 '지옥순례'의 피의못지옥·바다지옥 등 비일상적 광경이 펼쳐집니다. 유후인은 유후다케를 바라보는 고원 온천마을. 온천 수증기와 산능선이 공존하는 독특한 피사체를 담을 수 있습니다. 벳푸·유후인 8장을 수록."
    ),
    faqs: [
      {
        q: d("湯煙の街並みが撮れるスポットは？", "Where can I capture Beppu's steam-rising skyline?", "哪里可拍别府汤烟街景？", "哪裡可拍別府湯煙街景？", "벳푸 온천 수증기 스카이라인을 담을 수 있는 곳은?"),
        a: d("鉄輪（かんなわ）温泉の湯けむり展望台。特に冬の朝、寒暖差で湯煙が最も濃く立ち上る。", "The Yukemuri Observatory in Kannawa Onsen. Winter mornings produce the thickest steam plumes due to temperature contrast.", "铁轮温泉汤烟展望台。尤其冬季早晨温差大时汤烟最浓。", "鐵輪溫泉湯煙展望台。尤其冬季早晨溫差大時湯煙最濃。", "간나와 온천의 유케무리 전망대. 특히 겨울 아침 온도차로 수증기가 가장 진하게 피어오릅니다."),
      },
    ],
  },

  "沖縄県": {
    desc: d(
      "沖縄県は日本最南端、47もの有人離島を擁する亜熱帯。本島の首里城跡（2019年焼失後再建中）、残波岬、万座毛。宮古島のエメラルドグリーンの海と真っ白な砂浜、伊良部大橋、与那覇前浜など、日本とは思えない南国の絶景。81枚で宮古島・沖縄本島を収録。",
      "Okinawa is Japan's southernmost prefecture — 47 inhabited subtropical islands. Shurijo Castle ruins (being rebuilt after a 2019 fire), Cape Zanpa, and Manzamo Cliff on the main island; Miyakojima's emerald seas, white-sand beaches, the Irabu Bridge, and Yonaha Maehama Beach redefine what Japan can look like. 81 photos from Miyakojima and Okinawa main island.",
      "冲绳县是日本最南端，包含47座有人离岛的亚热带。本岛首里城遗址（2019年火灾后重建中）、残波岬、万座毛；宫古岛翠绿海水与纯白沙滩、伊良部大桥、与那霸前浜等，颠覆你对日本的印象。本图库收录宫古岛、冲绳本岛81张。",
      "沖繩縣是日本最南端，包含47座有人離島的亞熱帶。本島首里城遺址（2019年火災後重建中）、殘波岬、萬座毛；宮古島翠綠海水與純白沙灘、伊良部大橋、與那霸前濱等，顛覆你對日本的印象。本圖庫收錄宮古島、沖繩本島81張。",
      "오키나와현은 일본 최남단, 47개 유인 섬을 품은 아열대. 본섬의 슈리성 터(2019년 화재 후 복원 중), 잔파 곶, 만자모; 미야코지마의 에메랄드빛 바다와 순백의 모래사장, 이라부 대교, 요나하 마에하마 해변 등 일본으로 보이지 않는 남국의 절경. 미야코지마·오키나와 본섬 81장을 수록."
    ),
    faqs: [
      {
        q: d("宮古島のベストシーズンは？", "Best season for Miyakojima?", "宫古岛最佳季节？", "宮古島最佳季節？", "미야코지마 최적기는?"),
        a: d("5〜9月の海の透明度が最高（特に7〜8月）。台風シーズンは9月。12〜2月は涼しく観光地が空いているがマリン活動は限定的。", "May–September for water clarity (especially July–August). September is typhoon season. December–February is cool and less crowded but with limited marine activities.", "5-9月海水透明度最高（特别7-8月）。9月是台风季。12-2月凉爽且游客少但水上活动有限。", "5-9月海水透明度最高（特別7-8月）。9月是颱風季。12-2月涼爽且遊客少但水上活動有限。", "5-9월 바다 투명도 최고(특히 7-8월). 9월은 태풍 시즌. 12-2월은 서늘하고 관광지가 한산하지만 해양 액티비티는 제한적입니다."),
      },
      {
        q: d("透明な海を撮るベストタイム？", "Best time of day for clear sea shots?", "拍摄清澈海水最佳时段？", "拍攝清澈海水最佳時段？", "투명한 바다를 찍는 최적 시간대는?"),
        a: d("太陽が高い午前10時〜午後2時が海底まで光が入り、最もエメラルドグリーンに映る。PLフィルター必携。", "10 AM–2 PM when the sun is high and light penetrates to the seabed creates the strongest emerald green. A polarizing filter is essential.", "上午10点-下午2点太阳位置高，光可穿透海底，翠绿色最佳。必备PL偏振镜。", "上午10點-下午2點太陽位置高，光可穿透海底，翠綠色最佳。必備PL偏振鏡。", "태양이 높은 오전 10시~오후 2시에 햇빛이 해저까지 닿아 에메랄드빛이 가장 강합니다. PL 필터는 필수."),
      },
    ],
  },
};
