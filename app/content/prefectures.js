/**
 * Prefecture-level localized content: description + FAQs.
 * Languages currently populated: ja, en, zh, zh-tw, ko.
 * Other 15 languages fall back to English via getPrefDesc helper.
 */

const d = (ja, en, zh, zhtw, ko) => ({ ja, en, zh, "zh-tw": zhtw, ko });

// A14: AI Overview対応 — definition/highlights/quickAnswers (ja+en先行、他言語は順次追加)
// definition: 50-100語の「○○とは?」型定義文。AI Overviewが引用しやすい簡潔さ
// highlights: 5項目の網羅的なハイライト。リスト型はSERPでrich snippet候補
// quickAnswers: 3組の超簡潔Q&A。Featured Snippet/AI Overview 直撃用。FAQとは別物
const lh = (ja, en) => ({ ja, en });

export const PREFECTURE_CONTENT = {
  "北海道": {
    desc: d(
      "北海道は日本最北端の島で、冬のさっぽろ雪まつりや流氷、夏のラベンダー畑、世界自然遺産・知床の原生林など、四季折々の壮大な風景が広がります。湖沼や火山、広大な農地が織りなす独特の地形は、日本他地域とは一線を画す「北の大地」の魅力そのもの。本ギャラリーには札幌・知床・摩周湖・富良野・小樽・洞爺湖など118枚を収録。",
      "Hokkaido, Japan's northernmost main island, offers dramatic seasonal landscapes — the Sapporo Snow Festival and drift ice in winter, lavender fields of Furano in summer, and the primeval forests of Shiretoko, a UNESCO World Heritage site. Its volcanic lakes, vast farmland, and dramatic coastlines set it apart from the rest of Japan. This gallery features 118 photographs from Sapporo, Shiretoko, Lake Mashu, Furano, Otaru, Lake Toya, and more.",
      "北海道是日本最北端的岛屿，拥有四季壮丽的风景——冬季的札幌雪祭和流冰，夏季富良野的薰衣草田，以及世界自然遗产知床的原始森林。火山湖泊、广袤农田和崎岖海岸线构成了独特的北国风光。本图库收录札幌、知床、摩周湖、富良野、小樽、洞爷湖等地共118张照片。",
      "北海道是日本最北端的島嶼，擁有四季壯麗的風景——冬季的札幌雪祭和流冰，夏季富良野的薰衣草田，以及世界自然遺產知床的原始森林。火山湖泊、廣袤農田和崎嶇海岸線構成了獨特的北國風光。本圖庫收錄札幌、知床、摩周湖、富良野、小樽、洞爺湖等地共118張照片。",
      "홋카이도는 일본 최북단의 섬으로 겨울 삿포로 눈축제와 유빙, 여름 후라노 라벤더 밭, 세계자연유산 시레토코의 원시림 등 사계절 웅장한 풍경을 자랑합니다. 화산 호수, 광활한 농지, 장엄한 해안선이 일본의 다른 지역과 구별되는 북녘의 땅 매력을 만듭니다. 삿포로, 시레토코, 마슈호, 후라노, 오타루, 도야호 등 118장의 사진을 수록했습니다."
    ),
    definition: {
      ja: "北海道は日本最北端の本島で、面積83,424km²と日本の総面積の約22%を占める広大な土地。火山・原生林・湖沼・大農地が織りなす独自の地形に、流氷・ラベンダー・深い雪景色など本州では撮れない四季の表情が宿ります。札幌、函館、知床、富良野、小樽など個性の異なる撮影地が点在し、写真家にとって日本で最も豊かなフィールドのひとつです。",
      en: "Hokkaido is Japan's northernmost main island and, at 83,424 km², covers about 22% of the country's total land area. Its volcanoes, primeval forests, lakes, and vast farmland produce landscapes — drift ice, lavender, deep winter snow — that simply cannot be photographed elsewhere in Japan. With Sapporo, Hakodate, Shiretoko, Furano, Otaru, and many more distinct destinations, it remains one of the country's richest grounds for landscape photography.",
      zh: "北海道是日本最北端的本岛,面积83,424平方公里,占日本总面积约22%。火山、原始森林、湖泊、广袤农田构成独特地形,蕴藏着流冰、薰衣草、深雪等本州无法拍摄的四季表情。札幌、函馆、知床、富良野、小樽等个性迥异的拍摄地点缀其中,是摄影师在日本最丰富的取材地之一。",
      "zh-tw": "北海道是日本最北端的本島,面積83,424平方公里,佔日本總面積約22%。火山、原始森林、湖泊、廣袤農田構成獨特地形,蘊藏著流冰、薰衣草、深雪等本州無法拍攝的四季表情。札幌、函館、知床、富良野、小樽等個性迥異的拍攝地點綴其中,是攝影師在日本最豐富的取材地之一。",
      ko: "홋카이도는 일본 최북단의 본섬으로, 면적 83,424km²로 일본 전체 면적의 약 22%를 차지하는 광활한 땅입니다. 화산·원시림·호수·대농지가 어우러진 독특한 지형에는 유빙·라벤더·깊은 설경 등 혼슈에서는 촬영할 수 없는 사계절의 표정이 깃들어 있습니다. 삿포로·하코다테·시레토코·후라노·오타루 등 개성이 다른 촬영지가 흩어져 있어, 사진가에게 일본에서 가장 풍요로운 필드 중 하나로 꼽힙니다.",
    },
    highlights: {
      ja: [
        "世界自然遺産の知床半島 — 原生林、流氷、ヒグマ、シマフクロウなど手付かずの自然が残る最果ての聖地",
        "富良野・美瑛の花畑 — 7月のラベンダーや色とりどりのパッチワークの丘は日本屈指のフォトジェニックな農村風景",
        "2月のさっぽろ雪まつり — 大通公園に並ぶ巨大雪像と幻想的なライトアップ、冬の北国を象徴するイベント",
        "オホーツク海の流氷 — 1月下旬から3月上旬、網走・知床・紋別の沿岸を埋め尽くす流氷と夕景",
        "摩周湖・洞爺湖・支笏湖 — カルデラ湖の透明度と独特の青さは火山地形ならではの被写体",
      ],
      en: [
        "Shiretoko Peninsula (UNESCO World Heritage) — primeval forests, drift ice, brown bears, and Blakiston's fish owls in Japan's wildest corner",
        "Furano & Biei flower fields — lavender in July plus the iconic patchwork hills, the most photogenic rural landscapes in Japan",
        "Sapporo Snow Festival in February — giant snow sculptures and night illuminations across Odori Park, the symbolic winter event of northern Japan",
        "Drift ice on the Sea of Okhotsk — late January through early March along Abashiri, Shiretoko, and Monbetsu, with sunsets behind floating floes",
        "Caldera lakes Mashu, Toya, and Shikotsu — surreal blue waters carved by ancient volcanism, unique to Hokkaido's geology",
      ],
      zh: [
        "世界自然遗产知床半岛 — 原始森林、流冰、棕熊、毛脚渔鸮等未被破坏的最尽头圣地",
        "富良野·美瑛花田 — 7月薰衣草和色彩斑斓的拼布之丘是日本屈指的写真级田园风景",
        "2月札幌雪祭 — 大通公园林立的巨型雪雕和梦幻灯光,象征北国冬季的盛会",
        "鄂霍次克海流冰 — 1月下旬至3月上旬,网走·知床·纹别沿岸覆盖的流冰与夕阳",
        "摩周湖·洞爷湖·支笏湖 — 火山口湖的透明度和独特蓝色是火山地形特有的题材",
      ],
      "zh-tw": [
        "世界自然遺產知床半島 — 原始森林、流冰、棕熊、毛腳魚鴞等未被破壞的最盡頭聖地",
        "富良野·美瑛花田 — 7月薰衣草和色彩斑斕的拼布之丘是日本屈指的寫真級田園風景",
        "2月札幌雪祭 — 大通公園林立的巨型雪雕和夢幻燈光,象徵北國冬季的盛會",
        "鄂霍次克海流冰 — 1月下旬至3月上旬,網走·知床·紋別沿岸覆蓋的流冰與夕陽",
        "摩周湖·洞爺湖·支笏湖 — 火山口湖的透明度和獨特藍色是火山地形特有的題材",
      ],
      ko: [
        "세계자연유산 시레토코 반도 — 원시림, 유빙, 불곰, 시마후쿠로 등 손대지 않은 최북단의 성지",
        "후라노·비에이의 꽃밭 — 7월 라벤더와 색색의 패치워크 언덕은 일본 굴지의 포토제닉한 농촌 풍경",
        "2월 삿포로 눈축제 — 오도리 공원에 늘어선 거대 눈조각과 환상적인 조명, 북국 겨울을 상징하는 이벤트",
        "오호츠크해 유빙 — 1월 하순부터 3월 초순, 아바시리·시레토코·몬베쓰 연안을 메우는 유빙과 노을",
        "마슈호·도야호·시코쓰호 — 칼데라호의 투명도와 독특한 푸른빛은 화산 지형 특유의 피사체",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "北海道とは?", a: "日本最北端の本島で、面積は日本全土の約22%。火山・湖沼・農地・原生林が織りなす独自の風景を持ち、流氷・ラベンダー・深い雪など本州では撮れない四季が魅力です。" },
        { q: "北海道の撮影ベストシーズンはいつ?", a: "2月のさっぽろ雪まつりと流氷、7月の富良野ラベンダー、10月の紅葉、1〜3月の知床流氷が最も人気。被写体に応じて季節を選ぶのが鉄則です。" },
        { q: "主要な撮影スポットは?", a: "札幌、小樽運河、富良野・美瑛、摩周湖、洞爺湖、知床半島、函館の夜景、登別、旭山動物園など。エリアごとに性格が大きく異なるので周遊計画が重要です。" },
      ],
      en: [
        { q: "What is Hokkaido?", a: "Japan's northernmost main island, covering about 22% of the country's total area. Its volcanoes, lakes, farmland, and primeval forests produce landscapes — drift ice, lavender, deep snow — unavailable anywhere else in Japan." },
        { q: "When is the best season to photograph Hokkaido?", a: "February for the Sapporo Snow Festival and drift ice, July for Furano lavender, October for autumn colors, and January–March for Shiretoko drift ice. Match the subject to its peak season." },
        { q: "What are the main photography spots in Hokkaido?", a: "Sapporo, Otaru Canal, Furano & Biei, Lake Mashu, Lake Toya, Shiretoko Peninsula, Hakodate's night skyline, Noboribetsu, and Asahiyama Zoo. Each area has a distinct character, so plan a multi-stop itinerary." },
      ],
      zh: [
        { q: "北海道是?", a: "日本最北端的本岛,面积约占日本全土的22%。独特的火山·湖泊·农田·原始森林风景,以及流冰·薰衣草·深雪等本州无法拍摄的四季魅力。" },
        { q: "北海道摄影的最佳季节?", a: "2月的札幌雪祭和流冰、7月的富良野薰衣草、10月红叶、1-3月的知床流冰最受欢迎。根据拍摄主题选择季节为铁则。" },
        { q: "主要的拍摄地点?", a: "札幌、小樽运河、富良野·美瑛、摩周湖、洞爷湖、知床半岛、函馆夜景、登别、旭山动物园等。各区域特色不同,需要周游计划。" },
      ],
      "zh-tw": [
        { q: "北海道是?", a: "日本最北端的本島,面積約佔日本全土的22%。獨特的火山·湖泊·農田·原始森林風景,以及流冰·薰衣草·深雪等本州無法拍攝的四季魅力。" },
        { q: "北海道攝影的最佳季節?", a: "2月的札幌雪祭和流冰、7月的富良野薰衣草、10月紅葉、1-3月的知床流冰最受歡迎。根據拍攝主題選擇季節為鐵則。" },
        { q: "主要的拍攝地點?", a: "札幌、小樽運河、富良野·美瑛、摩周湖、洞爺湖、知床半島、函館夜景、登別、旭山動物園等。各區域特色不同,需要周遊計劃。" },
      ],
      ko: [
        { q: "홋카이도는?", a: "일본 최북단의 본섬으로 면적은 일본 전토의 약 22%. 화산·호수·농지·원시림이 어우러진 독특한 풍경과 유빙·라벤더·깊은 설경 등 혼슈에서는 담을 수 없는 사계절이 매력입니다." },
        { q: "홋카이도 촬영 최적기는 언제?", a: "2월 삿포로 눈축제와 유빙, 7월 후라노 라벤더, 10월 단풍, 1-3월 시레토코 유빙이 가장 인기. 피사체에 맞춰 계절을 고르는 것이 철칙입니다." },
        { q: "주요 촬영 명소는?", a: "삿포로, 오타루 운하, 후라노·비에이, 마슈호, 도야호, 시레토코 반도, 하코다테 야경, 노보리베쓰, 아사히야마 동물원 등. 지역별 특색이 크게 달라 일정 계획이 중요합니다." },
      ],
    },
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
    definition: {
      ja: "千葉県は本州中央部の太平洋側、東京湾と房総半島から成る人口620万人の関東第3の県。海岸線は460kmに及び、九十九里浜の長大なビーチ、外房の断崖、内房の穏やかな入江まで多彩。成田国際空港を擁する日本の玄関口でもあり、東京から1時間以内で訪れられる海と寺社の撮影地です。",
      en: "Chiba sits on the Pacific coast of central Honshu, formed by Tokyo Bay and the Boso Peninsula, with 6.2 million residents. Its 460 km of coastline ranges from the long sweep of Kujukuri Beach to the dramatic cliffs of the outer coast and the calm inlets of the inner bay. Home to Narita International Airport, it offers seascapes and historic temples within an hour of Tokyo.",
      zh: "千叶县位于本州中部太平洋一侧,由东京湾和房总半岛构成,人口620万,关东第3大县。460公里海岸线从九十九里浜的悠长沙滩、外房断崖到内房静谧入江变化多端。拥有成田国际机场,是日本的门户,东京1小时圈内的海与寺社拍摄地。",
      "zh-tw": "千葉縣位於本州中部太平洋一側,由東京灣和房總半島構成,人口620萬,關東第3大縣。460公里海岸線從九十九里濱的悠長沙灘、外房斷崖到內房靜謐入江變化多端。擁有成田國際機場,是日本的門戶,東京1小時圈內的海與寺社拍攝地。",
      ko: "지바현은 혼슈 중앙부 태평양 측에 위치하며 도쿄만과 보소반도로 이루어진 인구 620만 명의 간토 제3의 현. 460km에 이르는 해안선은 구주쿠리 비치의 긴 모래사장에서 외해의 단애·내해의 잔잔한 만까지 다양합니다. 나리타 국제공항을 갖춘 일본의 관문으로, 도쿄에서 1시간 권내의 바다와 사찰 촬영지입니다.",
    },
    highlights: {
      ja: [
        "九十九里浜 — 太平洋に面した日本屈指の長大ビーチ、66kmの直線海岸",
        "鴨川シーワールド — シャチのパフォーマンスを至近距離で撮影できる人気水族館",
        "成田山新勝寺 — 940年創建の真言宗大本山、節分や初詣で年間1000万人以上が訪れる",
        "犬吠埼 — 日本で最も早く初日の出が見られる本州最東端の灯台",
        "養老渓谷 — 房総半島中央の渓谷、11月下旬の紅葉は関東でも遅咲き、首都圏からの紅葉撮影地として人気",
      ],
      en: [
        "Kujukuri Beach — one of Japan's longest beaches, 66 km of straight Pacific coastline",
        "Kamogawa Sea World — popular aquarium where orca performances can be photographed up close",
        "Naritasan Shinshoji — major Shingon temple founded in 940, drawing over 10 million visitors annually for festivals",
        "Cape Inubo — easternmost point of Honshu and the first place to see the year's first sunrise",
        "Yoro Valley — central Boso ravine known for some of the Tokyo region's latest autumn colors in late November",
      ],
      zh: [
        "九十九里浜 — 面向太平洋的日本屈指可数的悠长海滩,66公里直线海岸",
        "鸭川海洋世界 — 可近距离拍摄虎鲸表演的人气水族馆",
        "成田山新胜寺 — 940年创建的真言宗大本山,节分和新年参拜年访客超过1000万人",
        "犬吠埼 — 日本最早可见初日出的本州最东端灯塔",
        "养老溪谷 — 房总半岛中部的溪谷,11月下旬红叶是关东地区较晚开放的红叶名所",
      ],
      "zh-tw": [
        "九十九里濱 — 面向太平洋的日本屈指可數的悠長海灘,66公里直線海岸",
        "鴨川海洋世界 — 可近距離拍攝虎鯨表演的人氣水族館",
        "成田山新勝寺 — 940年創建的真言宗大本山,節分和新年參拜年訪客超過1000萬人",
        "犬吠埼 — 日本最早可見初日出的本州最東端燈塔",
        "養老溪谷 — 房總半島中部的溪谷,11月下旬紅葉是關東地區較晚開放的紅葉名所",
      ],
      ko: [
        "구주쿠리 해변 — 태평양에 면한 일본 굴지의 긴 해변, 66km 직선 해안",
        "가모가와 시월드 — 범고래 퍼포먼스를 가까이에서 촬영할 수 있는 인기 수족관",
        "나리타산 신쇼지 — 940년 창건의 진언종 대본산, 세쓰분과 신년 참배에 연간 1,000만 명 이상 방문",
        "이누보사키 — 일본에서 가장 일찍 새해 일출을 볼 수 있는 혼슈 최동단의 등대",
        "요로 계곡 — 보소반도 중부의 계곡, 11월 하순의 단풍은 간토 지방에서도 늦게 피는 단풍 명소로 인기",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "千葉県とは?", a: "東京の東隣、房総半島と東京湾から成る関東の海洋県。460kmの海岸線、成田国際空港、九十九里浜・房総の自然と都市近郊のアクセスの良さが特徴です。" },
        { q: "千葉県の撮影ベストシーズンは?", a: "海岸線は通年、桜は3月下旬〜4月、紅葉は11月下旬の養老渓谷、初日の出は1月1日の犬吠埼が定番。冬は空気が澄んで富士山がよく見えます。" },
        { q: "東京からのアクセスは?", a: "東京駅から舞浜・成田まで30〜60分、外房の鴨川・勝浦は2時間。日帰り圏内のため早朝出発で朝の光を狙うのが効率的です。" },
      ],
      en: [
        { q: "What is Chiba Prefecture?", a: "An eastern neighbor of Tokyo formed by the Boso Peninsula and Tokyo Bay. Its 460 km of coastline, Narita International Airport, and proximity to the capital make it a convenient combination of nature and access." },
        { q: "When is the best season to photograph Chiba?", a: "Coastline year-round, cherry blossoms late March to April, autumn colors at Yoro Valley in late November, and the iconic January 1 sunrise from Cape Inubo. Winter offers crisp air and clear Mt. Fuji views." },
        { q: "How do I get there from Tokyo?", a: "Maihama and Narita are 30–60 min from Tokyo Station; Kamogawa and Katsuura on the outer coast are about 2 hours. Day trips are practical, especially for early-morning light." },
      ],
      zh: [
        { q: "千叶县是?", a: "东京的东邻,由房总半岛和东京湾构成的关东海洋县。460公里海岸线、成田国际机场、九十九里浜·房总的自然与都市近郊便利的交通是特色。" },
        { q: "千叶县摄影的最佳季节?", a: "海岸线全年,樱花3月下旬至4月,红叶11月下旬的养老溪谷,初日出1月1日的犬吠埼为经典。冬季空气清澈,富士山清晰可见。" },
        { q: "从东京怎么去?", a: "东京站到舞滨·成田30-60分钟,外房的鸭川·胜浦约2小时。当日往返圈内,清晨出发可捕捉早晨光线最高效。" },
      ],
      "zh-tw": [
        { q: "千葉縣是?", a: "東京的東鄰,由房總半島和東京灣構成的關東海洋縣。460公里海岸線、成田國際機場、九十九里濱·房總的自然與都市近郊便利的交通是特色。" },
        { q: "千葉縣攝影的最佳季節?", a: "海岸線全年,櫻花3月下旬至4月,紅葉11月下旬的養老溪谷,初日出1月1日的犬吠埼為經典。冬季空氣清澈,富士山清晰可見。" },
        { q: "從東京怎麼去?", a: "東京站到舞濱·成田30-60分鐘,外房的鴨川·勝浦約2小時。當日往返圈內,清晨出發可捕捉早晨光線最高效。" },
      ],
      ko: [
        { q: "지바현은?", a: "도쿄의 동쪽 이웃, 보소반도와 도쿄만으로 이루어진 간토의 해양현. 460km 해안선, 나리타 국제공항, 구주쿠리·보소의 자연과 도시 근교의 좋은 접근성이 특징입니다." },
        { q: "지바현 촬영 최적기는?", a: "해안선은 연중, 벚꽃은 3월 하순~4월, 단풍은 11월 하순 요로 계곡, 새해 일출은 1월 1일 이누보사키가 정석. 겨울은 공기가 맑아 후지산이 잘 보입니다." },
        { q: "도쿄에서 가는 법은?", a: "도쿄역에서 마이하마·나리타까지 30~60분, 외해의 가모가와·가쓰우라는 2시간. 당일치기 권내라 이른 아침 출발해 새벽 빛을 노리는 게 효율적." },
      ],
    },
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
    definition: {
      ja: "東京都は日本の首都であり、人口約1,400万人・都市圏3,800万人の世界最大級のメガシティ。江戸幕府開府(1603年)からの400年の歴史と、新宿・渋谷・東京の超高層ビル群が共存する稀有な都市景観を持ちます。神社仏閣、皇居の四季、ベイエリアの夜景、地下街と高層ビルが織りなす都市の表情は、刻一刻と変化し被写体に事欠きません。",
      en: "Tokyo is Japan's capital and one of the world's largest megacities, with 14 million residents in the prefecture and 38 million across the metropolitan area. It blends 400 years of history since the establishment of the Edo shogunate in 1603 with the high-rise skylines of Shinjuku, Shibuya, and Tokyo Station. Shrines, the Imperial Palace's four seasons, bay-side nightscapes, and the contrast of underground arcades and skyscrapers offer endlessly shifting subjects.",
      zh: "东京都是日本首都,人口约1,400万、都市圈3,800万的世界最大级别大都市。从江户幕府开府(1603年)400年的历史,到新宿·涩谷·东京站超高层楼群共存的独特都市景观。神社佛阁、皇居四季、湾区夜景、地下街与高楼交织的都市表情时刻变化,题材取之不尽。",
      "zh-tw": "東京都是日本首都,人口約1,400萬、都市圈3,800萬的世界最大級別大都市。從江戶幕府開府(1603年)400年的歷史,到新宿·澀谷·東京站超高層樓群共存的獨特都市景觀。神社佛閣、皇居四季、灣區夜景、地下街與高樓交織的都市表情時刻變化,題材取之不盡。",
      ko: "도쿄도는 일본의 수도로 인구 약 1,400만 명·도시권 3,800만 명의 세계 최대급 메가시티. 에도 막부 개부(1603년)부터의 400년 역사와 신주쿠·시부야·도쿄역의 초고층 빌딩군이 공존하는 독특한 도시 경관. 신사 사찰, 고쿄의 사계, 베이 지역 야경, 지하상가와 고층빌딩이 어우러진 도시 표정은 시시각각 변하며 피사체가 무궁무진합니다.",
    },
    highlights: {
      ja: [
        "新宿・渋谷・東京の超高層ビル群 — 都庁展望台、渋谷スクランブル交差点、丸の内の夜景は世界レベルの都市風景",
        "東京タワーとスカイツリー — 333mの赤い鉄塔と634mの世界第3位の電波塔、ライトアップの色も変化",
        "皇居・千鳥ヶ淵 — 江戸城跡を中心とした緑のオアシス、桜の名所として春は人気No.1",
        "浅草・上野 — 雷門・仲見世通り・浅草寺、上野公園の桜とアメ横、江戸の風情が残る下町",
        "お台場・豊洲 — レインボーブリッジと臨海副都心、ベイエリアの夜景とブルーアワーの絶景",
      ],
      en: [
        "Shinjuku, Shibuya, and Tokyo skyscrapers — Tokyo Metropolitan Government observatory, Shibuya scramble crossing, and Marunouchi nightscapes rival any global city",
        "Tokyo Tower and Skytree — the 333 m red tower and the 634 m broadcasting tower (world's 3rd tallest) with seasonal illumination changes",
        "Imperial Palace and Chidorigafuchi — green oasis around the former Edo Castle, Tokyo's #1 cherry blossom spot in spring",
        "Asakusa and Ueno — Kaminarimon gate, Nakamise shopping street, Sensoji temple, plus Ueno Park's cherry blossoms and Ameyoko market",
        "Odaiba and Toyosu — Rainbow Bridge and the bay-side district, exceptional nightscapes and blue-hour photography",
      ],
      zh: [
        "新宿·涩谷·东京站超高层楼群 — 都厅展望台、涩谷十字路口、丸之内夜景为世界级都市风景",
        "东京塔与晴空塔 — 333米红色铁塔与634米世界第3电波塔,灯光颜色随季节变化",
        "皇居·千鸟之渊 — 以江户城遗址为中心的绿色绿洲,春天的赏樱No.1名所",
        "浅草·上野 — 雷门、仲见世通、浅草寺,上野公园樱花与阿美横丁,保留江户风情的下町",
        "台场·丰洲 — 彩虹桥与临海副都心,湾区夜景与蓝色时刻绝景",
      ],
      "zh-tw": [
        "新宿·澀谷·東京站超高層樓群 — 都廳展望台、澀谷十字路口、丸之內夜景為世界級都市風景",
        "東京塔與晴空塔 — 333米紅色鐵塔與634米世界第3電波塔,燈光顏色隨季節變化",
        "皇居·千鳥之淵 — 以江戶城遺址為中心的綠色綠洲,春天的賞櫻No.1名所",
        "淺草·上野 — 雷門、仲見世通、淺草寺,上野公園櫻花與阿美橫丁,保留江戶風情的下町",
        "台場·豐洲 — 彩虹橋與臨海副都心,灣區夜景與藍色時刻絕景",
      ],
      ko: [
        "신주쿠·시부야·도쿄역의 초고층 빌딩군 — 도청 전망대, 시부야 스크램블 교차로, 마루노우치 야경은 세계적 수준의 도시 풍경",
        "도쿄타워와 스카이트리 — 333m의 붉은 철탑과 634m로 세계 3위인 전파탑, 조명 색상도 계절마다 변화",
        "고쿄·치도리가후치 — 에도성 터를 중심으로 한 녹색 오아시스, 봄 벚꽃 명소로 도쿄 No.1 인기",
        "아사쿠사·우에노 — 가미나리몬·나카미세도리·센소지, 우에노 공원의 벚꽃과 아메요코, 에도 정취가 남은 시타마치",
        "오다이바·도요스 — 레인보 브리지와 임해 부도심, 베이 지역의 야경과 블루아워 절경",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "東京都とは?", a: "日本の首都で人口約1,400万人。江戸の歴史と現代の超高層ビルが共存する世界最大級のメガシティ。神社仏閣、皇居の四季、ベイエリアの夜景など多様な都市風景の宝庫です。" },
        { q: "東京の撮影ベストシーズンは?", a: "桜の3月下旬〜4月上旬、紅葉の11月下旬〜12月上旬、夜景は通年(冬の方が空気が澄んで遠くまで見える)。雪は年に数回、雪化粧の都心は珍しい被写体です。" },
        { q: "東京の夜景撮影のコツは?", a: "三脚・低ISO・長秒露光が基本。ブルーアワー(日没後30分)が空と街の光のバランスがベスト。展望台は閉館時間に注意、屋上は風と寒さ対策必須です。" },
      ],
      en: [
        { q: "What is Tokyo?", a: "Japan's capital with about 14 million residents, one of the world's largest megacities. It combines 400 years of Edo-era heritage with cutting-edge skyscrapers, offering endless variety from shrines and palace seasons to bay-side nightscapes." },
        { q: "When is the best season to photograph Tokyo?", a: "Cherry blossoms late March to early April, autumn colors late November to early December, and nightscapes year-round (clearer in winter). Rare snow occasionally transforms central Tokyo into a unique subject." },
        { q: "What are tips for Tokyo night photography?", a: "Use a tripod, low ISO, and long exposure. Blue hour (30 min after sunset) balances sky and city lights best. Watch observatory closing times; rooftops require wind and cold gear." },
      ],
      zh: [
        { q: "东京都是?", a: "日本首都,人口约1,400万。江户历史与现代超高层楼并存的世界最大级别大都市。神社佛阁、皇居四季、湾区夜景等多样的都市风景宝库。" },
        { q: "东京摄影的最佳季节?", a: "樱花3月下旬至4月上旬,红叶11月下旬至12月上旬,夜景全年(冬季空气更清澈视野远)。雪是难得的题材,雪化都心罕见。" },
        { q: "东京夜景拍摄技巧?", a: "三脚架·低ISO·长曝光为基础。蓝色时刻(日落后30分钟)天空与街灯平衡最佳。展望台需注意闭馆时间,屋顶要做好防风防寒。" },
      ],
      "zh-tw": [
        { q: "東京都是?", a: "日本首都,人口約1,400萬。江戶歷史與現代超高層樓並存的世界最大級別大都市。神社佛閣、皇居四季、灣區夜景等多樣的都市風景寶庫。" },
        { q: "東京攝影的最佳季節?", a: "櫻花3月下旬至4月上旬,紅葉11月下旬至12月上旬,夜景全年(冬季空氣更清澈視野遠)。雪是難得的題材,雪化都心罕見。" },
        { q: "東京夜景拍攝技巧?", a: "三腳架·低ISO·長曝光為基礎。藍色時刻(日落後30分鐘)天空與街燈平衡最佳。展望台需注意閉館時間,屋頂要做好防風防寒。" },
      ],
      ko: [
        { q: "도쿄도는?", a: "일본의 수도로 인구 약 1,400만 명. 에도의 역사와 현대 초고층 빌딩이 공존하는 세계 최대급 메가시티. 신사 사찰, 고쿄의 사계, 베이 지역 야경 등 다양한 도시 풍경의 보고입니다." },
        { q: "도쿄 촬영 최적기는?", a: "벚꽃은 3월 하순~4월 초, 단풍은 11월 하순~12월 초, 야경은 연중(겨울이 공기가 맑아 멀리 보임). 눈은 연 몇 차례, 설경의 도심은 드문 피사체입니다." },
        { q: "도쿄 야경 촬영 팁은?", a: "삼각대·저ISO·장노출이 기본. 블루아워(일몰 후 30분)가 하늘과 도시 빛의 균형이 최고. 전망대 폐관 시간 주의, 옥상은 바람·추위 대비 필수." },
      ],
    },
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
    definition: {
      ja: "神奈川県は東京都の南に隣接する人口920万人の関東第2の県で、相模湾と太平洋に開けた地形を持ちます。源頼朝が1192年に幕府を開いた古都鎌倉、開国の歴史を持つ横浜港、富士山を仰ぐ箱根、湘南海岸、丹沢山地まで、わずか1日でアクセスできる距離に歴史・海・山が同居する稀有な撮影圏です。",
      en: "Kanagawa neighbors Tokyo to the south and is Kanto's second-most populous prefecture with 9.2 million residents, opening onto Sagami Bay and the Pacific. Within easy day-trip range it combines Kamakura — the ancient capital where Minamoto no Yoritomo founded his shogunate in 1192 — Yokohama's port (gateway during Japan's opening to the world), the Hakone hot springs with Mt. Fuji views, the Shonan coast, and the Tanzawa mountains, all in one compact photography region.",
      zh: "神奈川县位于东京都南邻,人口920万,是关东第2大县,面向相模湾和太平洋。源赖朝1192年开幕府的古都镰仓、开国历史的横滨港、远眺富士山的箱根、湘南海岸、丹泽山地等,1日内可达的距离内历史·海·山共存,是罕见的摄影圈。",
      "zh-tw": "神奈川縣位於東京都南鄰,人口920萬,是關東第2大縣,面向相模灣和太平洋。源賴朝1192年開幕府的古都鎌倉、開國歷史的橫濱港、遠眺富士山的箱根、湘南海岸、丹澤山地等,1日內可達的距離內歷史·海·山共存,是罕見的攝影圈。",
      ko: "가나가와현은 도쿄도 남쪽에 인접한 인구 920만 명의 간토 제2의 현으로, 사가미만과 태평양에 면한 지형을 지닙니다. 미나모토노 요리토모가 1192년 막부를 연 고도 가마쿠라, 개국의 역사를 지닌 요코하마항, 후지산을 바라보는 하코네, 쇼난 해안, 단자와 산지까지, 단 하루 만에 접근할 수 있는 거리에 역사·바다·산이 공존하는 보기 드문 촬영권입니다.",
    },
    highlights: {
      ja: [
        "鎌倉大仏と長谷寺 — 1252年鋳造、高さ11.4mの国宝、長谷寺はあじさい(6月)・紅葉(11月)の名所",
        "横浜みなとみらい21・赤レンガ倉庫 — 高さ296mのランドマークタワー、夜景とブルーアワーは関東屈指",
        "江ノ島と湘南海岸 — 富士山と江ノ島のシルエットは日本の海岸風景の象徴、夕景の名作多数",
        "箱根 — 芦ノ湖と富士山の組合せは絶景、大涌谷の噴煙、彫刻の森美術館、強羅温泉",
        "三浦半島と城ヶ島 — 房総半島と東京湾を望む断崖、灯台と海食洞、関東の隠れ撮影地",
      ],
      en: [
        "Great Buddha and Hasedera in Kamakura — the 11.4m bronze National Treasure cast in 1252, with Hasedera famed for hydrangeas (June) and autumn colors (November)",
        "Yokohama Minato Mirai 21 and Red Brick Warehouse — the 296m Landmark Tower, harbor nightscapes, and blue-hour shots that rival any in Kanto",
        "Enoshima and the Shonan coast — Mt. Fuji silhouetted with Enoshima island is one of Japan's iconic seascapes, especially at sunset",
        "Hakone — Lake Ashi with Mt. Fuji, the volcanic plumes of Owakudani, the Hakone Open-Air Museum, and Gora hot springs",
        "Miura Peninsula and Jogashima — cliffs with views of Boso and Tokyo Bay, a lighthouse, and sea caves; an underrated coastal photography spot",
      ],
      zh: [
        "镰仓大佛与长谷寺 — 1252年铸造,高11.4米国宝,长谷寺是绣球花(6月)·红叶(11月)的名所",
        "横滨港未来21·红砖仓库 — 296米地标大厦,夜景与蓝色时刻是关东屈指",
        "江之岛与湘南海岸 — 富士山与江之岛剪影是日本海岸风景的象征,夕景名作众多",
        "箱根 — 芦之湖与富士山组合的绝景,大涌谷喷烟、雕刻之森美术馆、强罗温泉",
        "三浦半岛与城之岛 — 远眺房总半岛与东京湾的断崖,灯塔与海蚀洞,关东的隐秘摄影地",
      ],
      "zh-tw": [
        "鎌倉大佛與長谷寺 — 1252年鑄造,高11.4米國寶,長谷寺是繡球花(6月)·紅葉(11月)的名所",
        "橫濱港未來21·紅磚倉庫 — 296米地標大廈,夜景與藍色時刻是關東屈指",
        "江之島與湘南海岸 — 富士山與江之島剪影是日本海岸風景的象徵,夕景名作眾多",
        "箱根 — 蘆之湖與富士山組合的絕景,大涌谷噴煙、雕刻之森美術館、強羅溫泉",
        "三浦半島與城之島 — 遠眺房總半島與東京灣的斷崖,燈塔與海蝕洞,關東的隱秘攝影地",
      ],
      ko: [
        "가마쿠라 대불과 하세데라 — 1252년 주조, 높이 11.4m의 국보, 하세데라는 수국(6월)·단풍(11월)의 명소",
        "요코하마 미나토미라이21·아카렌가 창고 — 296m 랜드마크 타워, 야경과 블루아워는 간토 굴지",
        "에노시마와 쇼난 해안 — 후지산과 에노시마의 실루엣은 일본 해안 풍경의 상징, 노을의 걸작 다수",
        "하코네 — 아시노호와 후지산의 조합은 절경, 오와쿠다니의 분연, 조각의 숲 미술관, 고라 온천",
        "미우라 반도와 조가시마 — 보소반도와 도쿄만을 바라보는 단애, 등대와 해식동, 간토의 숨은 촬영지",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "神奈川県とは?", a: "東京の南に位置する関東第2の県。古都鎌倉(1192年〜)と国際港湾横浜、富士山を望む箱根、湘南海岸が1日で巡れる距離にあり、歴史・海・山の全てが揃う撮影地です。" },
        { q: "鎌倉と横浜のベストな周り方は?", a: "午前は鎌倉の寺社(大仏・長谷寺・建長寺)、午後横浜へ移動して赤レンガ倉庫の夕景〜みなとみらいの夜景が王道。鎌倉から横浜までJRで25分です。" },
        { q: "撮影ベストシーズンは?", a: "鎌倉のあじさいは6月中旬、紅葉は11月下旬〜12月上旬、湘南海岸の夕景と富士山は冬(空気が澄む)、桜は4月上旬。箱根は紅葉の11月が圧倒的人気です。" },
      ],
      en: [
        { q: "What is Kanagawa Prefecture?", a: "Tokyo's southern neighbor and Kanto's second-largest prefecture, where the ancient capital of Kamakura (founded 1192), the port city of Yokohama, Hakone with Mt. Fuji views, and the Shonan coast are all within day-trip range." },
        { q: "Best way to visit Kamakura and Yokohama?", a: "Morning at Kamakura temples (Great Buddha, Hasedera, Kenchoji), then afternoon to Yokohama for Red Brick Warehouse sunset and Minato Mirai night shots. JR connects them in 25 minutes." },
        { q: "When is the best season to photograph Kanagawa?", a: "Kamakura hydrangeas mid-June, autumn colors late November to early December, Shonan sunsets with Mt. Fuji in winter (clearest air), and cherry blossoms in early April. Hakone peaks for autumn colors in November." },
      ],
      zh: [
        { q: "神奈川县是?", a: "位于东京南部的关东第2大县。古都镰仓(1192年-)与国际港湾横滨、远眺富士山的箱根、湘南海岸都在1日内可达,历史·海·山一应俱全的摄影地。" },
        { q: "镰仓与横滨的最佳游览方式?", a: "上午镰仓寺社(大佛·长谷寺·建长寺),下午移步横滨拍红砖仓库黄昏至港未来夜景为经典。镰仓到横滨JR 25分钟。" },
        { q: "摄影最佳季节?", a: "镰仓绣球花6月中旬,红叶11月下旬至12月上旬,湘南海岸夕景与富士山冬季(空气清澈),樱花4月上旬。箱根11月红叶最受欢迎。" },
      ],
      "zh-tw": [
        { q: "神奈川縣是?", a: "位於東京南部的關東第2大縣。古都鎌倉(1192年-)與國際港灣橫濱、遠眺富士山的箱根、湘南海岸都在1日內可達,歷史·海·山一應俱全的攝影地。" },
        { q: "鎌倉與橫濱的最佳遊覽方式?", a: "上午鎌倉寺社(大佛·長谷寺·建長寺),下午移步橫濱拍紅磚倉庫黃昏至港未來夜景為經典。鎌倉到橫濱JR 25分鐘。" },
        { q: "攝影最佳季節?", a: "鎌倉繡球花6月中旬,紅葉11月下旬至12月上旬,湘南海岸夕景與富士山冬季(空氣清澈),櫻花4月上旬。箱根11月紅葉最受歡迎。" },
      ],
      ko: [
        { q: "가나가와현은?", a: "도쿄 남쪽의 간토 제2의 현. 고도 가마쿠라(1192년~)와 국제 항구 요코하마, 후지산을 조망하는 하코네, 쇼난 해안이 하루에 돌 수 있는 거리에 있으며 역사·바다·산이 모두 갖춰진 촬영지입니다." },
        { q: "가마쿠라와 요코하마 동선은?", a: "오전은 가마쿠라 사찰(대불·하세데라·겐초지), 오후에 요코하마로 이동해 아카렌가 창고의 노을~미나토미라이 야경이 정석. 가마쿠라에서 요코하마까지 JR로 25분입니다." },
        { q: "촬영 최적기는?", a: "가마쿠라 수국은 6월 중순, 단풍은 11월 하순~12월 초, 쇼난 해안의 노을과 후지산은 겨울(공기 맑음), 벚꽃은 4월 초. 하코네는 11월 단풍이 압도적 인기." },
      ],
    },
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
    definition: lh(
      "石川県は日本海側中央に位置する人口110万人の北陸の県で、加賀百万石(1583〜1869年)の文化遺産が色濃く残る伝統工芸王国。日本三名園の兼六園、現存する金沢城、ひがし茶屋街などの茶屋文化、能登半島の荒々しい海岸線、山中・山代温泉まで、雅と自然が同居する稀有な撮影地です。輪島塗・九谷焼・金箔工芸も健在で、職人の手仕事も被写体になります。",
      "Ishikawa, on Japan's central Sea of Japan coast with 1.1 million residents, preserves the cultural legacy of the Kaga domain (1583–1869) — a treasury of traditional crafts. Kenrokuen (one of Japan's Three Great Gardens), the still-standing Kanazawa Castle, the Higashi Chaya geisha district, the rugged Noto Peninsula coastline, and the Yamanaka and Yamashiro hot springs combine refined elegance and nature. Wajima lacquerware, Kutani pottery, and gold leaf still thrive, offering craft scenes alongside landscapes."
    ),
    highlights: {
      ja: [
        "兼六園 — 1676年作庭、水戸偕楽園・岡山後楽園と並ぶ日本三名園、雪吊りの冬景色は北陸の象徴",
        "金沢城公園 — 加賀百万石・前田家の居城、白漆喰の海鼠壁(なまこかべ)が美しい",
        "ひがし茶屋街 — 江戸末期の茶屋建築が連なる重伝建地区、夕景の格子戸と提灯",
        "能登半島 — 千枚田、白米の千枚田、輪島の朝市、波打つ岩の海岸線",
        "金沢駅・鼓門 — 2005年完成の伝統と現代を融合した門、夜のライトアップは新たな名所",
      ],
      en: [
        "Kenrokuen — landscaped from 1676, one of Japan's Three Great Gardens (with Kairakuen and Korakuen); winter rope-suspended pines (yukitsuri) symbolize the Hokuriku coast",
        "Kanazawa Castle Park — former seat of the Maeda clan and the Kaga domain, distinguished by white-stucco namako-kabe walls",
        "Higashi Chaya district — late-Edo geisha houses preserved as a national heritage area; lattice windows and lanterns at dusk",
        "Noto Peninsula — Senmaida rice terraces of Shiroyone, Wajima morning market, rugged wave-pounded coast",
        "Kanazawa Station's Tsuzumi Gate — a 2005 fusion of traditional drum design and modern engineering, lit beautifully at night",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "石川県とは?", a: "日本海側に位置する北陸の県。加賀百万石の城下町・金沢を中心に、兼六園・金沢城・茶屋街など江戸の風情と能登半島の自然海岸が同居する伝統工芸王国です。" },
        { q: "金沢で1日で回れる撮影スポットは?", a: "朝イチ兼六園(光が柔らかい)→金沢城→ひがし茶屋街(午後〜夕方)→近江町市場→金沢駅の鼓門で夜景、が王道。徒歩+バスで全て巡れます。" },
        { q: "撮影ベストシーズンは?", a: "冬の雪吊りと雪景色(12〜2月)、新緑の5月、紅葉の11月中旬。能登の千枚田は5月の田植えと9月の稲穂、夕景が絶景です。" },
      ],
      en: [
        { q: "What is Ishikawa Prefecture?", a: "A Hokuriku prefecture on the Sea of Japan coast. Centered on Kanazawa — castle town of the Kaga domain — it pairs Edo-era atmosphere (Kenrokuen, Kanazawa Castle, geisha districts) with the natural coast of the Noto Peninsula." },
        { q: "What can I photograph in Kanazawa in one day?", a: "Early morning at Kenrokuen (soft light), then Kanazawa Castle, Higashi Chaya (afternoon to evening), Omicho Market, and the Tsuzumi Gate at Kanazawa Station for night shots — all walkable plus a short bus." },
        { q: "When is the best season to photograph Ishikawa?", a: "Winter snow and the rope-suspended pines (December–February), fresh greenery in May, autumn colors mid-November. Noto's rice terraces shine in May (planting) and September (golden ears), especially at sunset." },
      ],
    },
    faqs: [
      {
        q: d("金沢で1日で回れる撮影スポットは？", "What spots can I shoot in Kanazawa in one day?", "金泽一日拍摄路线？", "金澤一日拍攝路線？", "가나자와 당일 촬영 동선은?"),
        a: d("朝イチで兼六園（光が柔らかい）→ 金沢城 → ひがし茶屋街（午後〜夕方）→ 近江町市場 → 金沢駅の鼓門で夜景、というルートが王道。", "Early morning at Kenrokuen (soft light), then Kanazawa Castle, Higashi Chaya (afternoon/evening), Omicho Market, and ending with the Tsuzumi Gate at Kanazawa Station by night.", "清晨兼六园（柔和光线）→金泽城→东茶屋街（下午至黄昏）→近江町市场→夜访金泽站鼓门，为经典路线。", "清晨兼六園（柔和光線）→金澤城→東茶屋街（下午至黃昏）→近江町市場→夜訪金澤站鼓門，為經典路線。", "이른 아침 겐로쿠엔(부드러운 빛)→가나자와성→히가시차야(오후~저녁)→오미초 시장→가나자와역 츠즈미몬 야경 순이 정석입니다."),
      },
    ],
  },

  "山梨県": {
    desc: d(
      "山梨県は富士山の北麓に広がる内陸県。富士五湖（河口湖・山中湖・西湖・本栖湖・精進湖）、新倉山浅間公園の五重塔と桜と富士山の三段構図、武田神社、昇仙峡、ぶどう畑とワイナリーなど、富士山ビューと果樹郷の二面性を持ちます。本ギャラリーには新倉山浅間公園の桜と富士、河口湖の湖畔風景の13枚を収録。",
      "Yamanashi sits at the northern foot of Mt. Fuji. The Fuji Five Lakes (Kawaguchi, Yamanaka, Sai, Motosu, Shoji), the iconic three-tier composition of Arakurayama Sengen Park's pagoda + cherry blossoms + Mt. Fuji, Takeda Shrine, Shosenkyo Gorge, and the vineyards of Koshu give the prefecture its dual identity as Mt. Fuji's best vantage point and a fruit-and-wine country. This gallery features 13 photos from Arakurayama Sengen Park and Lake Kawaguchi.",
      "山梨县位于富士山北麓的内陆县。富士五湖（河口湖、山中湖、西湖、本栖湖、精进湖）、新仓山浅间公园的五重塔与樱花与富士山的三段构图、武田神社、升仙峡、葡萄园与酒庄等，兼具富士观景与果乡风情。本图库收录新仓山浅间公园的樱与富士、河口湖湖畔风景共13张。",
      "山梨縣位於富士山北麓的內陸縣。富士五湖（河口湖、山中湖、西湖、本栖湖、精進湖）、新倉山淺間公園的五重塔與櫻花與富士山的三段構圖、武田神社、昇仙峽、葡萄園與酒莊等，兼具富士觀景與果鄉風情。本圖庫收錄新倉山淺間公園的櫻與富士、河口湖湖畔風景共13張。",
      "야마나시현은 후지산 북쪽 기슭에 펼쳐진 내륙현. 후지 5호(가와구치호·야마나카호·사이호·모토스호·쇼지호), 아라쿠라야마 센겐 공원의 5층탑과 벚꽃과 후지산이 한 프레임에 들어오는 3단 구도, 다케다 신사, 쇼센쿄, 포도밭과 와이너리 등 후지산 조망과 과일·와인의 고장이라는 두 가지 매력. 아라쿠라야마 센겐 공원의 벚꽃과 후지, 가와구치호 호반 풍경 13장을 수록."
    ),
    definition: lh(
      "山梨県は富士山(3,776m)の北麓に広がる人口79万人の内陸県で、首都圏の水源・南アルプス・八ヶ岳など水と山に恵まれた地。富士五湖からの逆さ富士、新倉山浅間公園(忠霊塔)からの五重塔・桜・富士の三段構図、武田信玄ゆかりの武田神社、昇仙峡の渓谷美、勝沼のぶどう畑とワイナリーまで、富士山ビューと果樹郷の二面性を持つ写真の宝庫です。",
      "Yamanashi sits at Mt. Fuji's northern foot (3,776 m) with 790,000 residents — an inland prefecture rich in water and mountains, including the Southern Alps and Yatsugatake. The Fuji Five Lakes' mirror-Fuji shots, the world-famous three-tier composition at Arakurayama Sengen Park (Chureito Pagoda + cherry blossoms + Mt. Fuji), Takeda Shrine of warlord Takeda Shingen, Shosenkyo Gorge, and the vineyards of Katsunuma all crown it as both Japan's premier Fuji-viewing region and a fruit-and-wine country."
    ),
    highlights: {
      ja: [
        "新倉山浅間公園(忠霊塔) — 五重塔・桜・富士山の世界的に有名な三段構図、4月中旬がピーク",
        "富士五湖 — 河口湖・山中湖・西湖・本栖湖・精進湖、湖面に映る逆さ富士は無風の早朝が条件",
        "忍野八海 — 富士山の伏流水が湧く8つの池、水底まで見える透明度",
        "武田神社・甲府盆地 — 武田信玄を祀る神社、桃の花の春、ぶどうの秋、夜景の冬",
        "昇仙峡 — 御嶽昇仙峡は日本一の渓谷美と称され、特に紅葉の11月は壮観",
      ],
      en: [
        "Arakurayama Sengen Park — the world-famous three-tier composition of Chureito Pagoda + cherry blossoms + Mt. Fuji, peak mid-April",
        "Fuji Five Lakes — Kawaguchi, Yamanaka, Sai, Motosu, and Shoji; mirror-image Fuji on the water requires a windless dawn",
        "Oshino Hakkai — eight crystal-clear ponds fed by Mt. Fuji's underground streams, transparent to the bottom",
        "Takeda Shrine and the Kofu Basin — shrine to warlord Takeda Shingen, peach blossoms in spring, grapes in autumn, city lights in winter",
        "Shosenkyo Gorge — often called Japan's most beautiful gorge, especially during autumn foliage in November",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "山梨県とは?", a: "富士山の北麓に位置する内陸県。富士五湖、新倉山浅間公園の三段構図、忍野八海など富士ビューの聖地であり、勝沼のワイナリーや桃・ぶどうの果樹郷でもあります。" },
        { q: "富士山と桜が撮れるベストポイントは?", a: "新倉山浅間公園(忠霊塔)が世界的に有名。階段398段を上ると五重塔・桜・富士山が一枚に収まる絶景。4月上旬〜中旬がピーク、夜明け直後が理想です。" },
        { q: "逆さ富士の撮影条件は?", a: "風がほぼ無い早朝(日の出前30分〜後30分)が必須。最も成功率が高いのは10〜2月の冬季、河口湖の北岸が定番ポイントです。" },
      ],
      en: [
        { q: "What is Yamanashi Prefecture?", a: "An inland prefecture at the northern foot of Mt. Fuji. Home to the Fuji Five Lakes, Arakurayama's iconic pagoda-cherry-Fuji frame, and Oshino Hakkai — and equally a fruit-and-wine country with Katsunuma vineyards and peach orchards." },
        { q: "Best spot to photograph Mt. Fuji with cherry blossoms?", a: "Arakurayama Sengen Park's Chureito Pagoda viewing deck is world-famous. After climbing 398 steps the pagoda, cherry blossoms, and Mt. Fuji align in one frame. Peak bloom is early-to-mid April, and sunrise gives the magical light." },
        { q: "What are the conditions for mirror-image Fuji?", a: "An almost windless early morning (30 min before to 30 min after sunrise) is essential. Success rates peak from October to February; the north shore of Lake Kawaguchi is the classic spot." },
      ],
    },
    faqs: [
      {
        q: d("富士山と桜が一緒に撮れるベストポイントは？", "Best spot to photograph Mt. Fuji with cherry blossoms?", "富士山与樱花同框最佳拍摄点？", "富士山與櫻花同框最佳拍攝點？", "후지산과 벚꽃을 함께 담는 최고 포인트는?"),
        a: d("新倉山浅間公園の忠霊塔展望デッキが世界的に有名。階段398段を上ると五重塔・桜・富士山が一枚に収まる絶景。4月上旬〜中旬がピーク、夜明け直後の朝焼けが理想。", "Arakurayama Sengen Park's Chureito Pagoda viewing deck is world-famous. After climbing 398 steps, the pagoda, cherry blossoms, and Mt. Fuji align in a single frame. Peak bloom is early-to-mid April, with sunrise giving the most magical light.", "新仓山浅间公园忠灵塔观景台世界闻名。登398级台阶后，五重塔、樱花与富士山一框入镜。4月上中旬为盛花期，黎明朝霞最理想。", "新倉山淺間公園忠靈塔觀景台世界聞名。登398級台階後，五重塔、櫻花與富士山一框入鏡。4月上中旬為盛花期，黎明朝霞最理想。", "아라쿠라야마 센겐 공원의 추레이토 전망 데크가 세계적으로 유명. 계단 398개를 오르면 5층탑·벚꽃·후지산이 한 프레임에 담깁니다. 4월 상-중순이 절정이며 일출 직후의 새벽노을이 가장 환상적입니다."),
      },
    ],
  },

  "長野県": {
    desc: d(
      "長野県は日本アルプスと高原文化の中心地。国宝・松本城（現存12天守の一つで黒い壁が特徴）、桜の三大名所・高遠城址公園、上高地、地獄谷野猿公苑、戸隠神社、軽井沢、阿智村の「日本一の星空」など、山岳・歴史・天文と多彩な魅力。本ギャラリーには松本城・高遠城址・駒つなぎの桜・天空の楽園を13枚収録。",
      "Nagano is the heart of the Japanese Alps and highland culture. Matsumoto Castle (a National Treasure and one of 12 originals, distinguished by its black walls), Takato Castle Park (one of Japan's three great cherry blossom sites), Kamikochi, the Jigokudani snow monkeys, Togakushi Shrine, Karuizawa, and Achi Village's «No.1 starry sky in Japan» offer mountains, history, and astronomy in one prefecture. This gallery features 13 photos from Matsumoto Castle, Takato Castle Park, the Komatsunagi Cherry Tree, and Tenku no Rakuen.",
      "长野县是日本阿尔卑斯与高原文化的中心。国宝松本城（现存12天守之一，黑壁独具特色）、樱花三大名所之一高远城址公园、上高地、地狱谷野猴公苑、户隐神社、轻井泽、阿智村「日本第一星空」等，山岳·历史·天文兼备。本图库收录松本城、高远城址、驹系樱花、天空乐园共13张。",
      "長野縣是日本阿爾卑斯與高原文化的中心。國寶松本城（現存12天守之一，黑壁獨具特色）、櫻花三大名所之一高遠城址公園、上高地、地獄谷野猴公苑、戶隱神社、輕井澤、阿智村「日本第一星空」等，山岳·歷史·天文兼備。本圖庫收錄松本城、高遠城址、駒繫櫻花、天空樂園共13張。",
      "나가노현은 일본 알프스와 고원 문화의 중심. 국보 마쓰모토성(현존 12천수의 하나로 검은 벽이 특징), 벚꽃 3대 명소 다카토 성지 공원, 가미코치, 지고쿠다니 야생원숭이 공원, 도가쿠시 신사, 가루이자와, 아치 마을의 「일본 제일의 별하늘」 등 산악·역사·천문이 어우러진 지역. 마쓰모토성·다카토 성지·고마쓰나기 벚꽃·천공의 낙원 13장을 수록."
    ),
    definition: lh(
      "長野県は本州中央部の人口203万人の内陸県で、北アルプス・中央アルプス・南アルプスの3000m級山脈に囲まれた「日本の屋根」。1998年冬季オリンピック開催地でもあり、国宝・松本城(現存12天守の一つ)、桜の三大名所・高遠城址公園、上高地の梓川、地獄谷の温泉に入る野猿、阿智村の「日本一の星空」、戸隠神社の杉並木まで、山岳・歴史・天文の被写体が圧倒的に豊富です。",
      "Nagano is an inland prefecture of central Honshu (population 2.03 million) ringed by the 3,000-meter peaks of the Northern, Central, and Southern Alps — «the roof of Japan.» Host of the 1998 Winter Olympics, it offers Matsumoto Castle (a National Treasure and one of 12 surviving originals), Takato Castle Park (one of Japan's three great cherry blossom sites), the Azusa River at Kamikochi, the snow monkeys in the hot springs of Jigokudani, Achi Village's «No.1 starry sky in Japan,» and the cedar avenues of Togakushi Shrine — an exceptional density of mountain, historical, and astronomical subjects."
    ),
    highlights: {
      ja: [
        "国宝・松本城 — 黒漆の壁が特徴の現存12天守、桜・新緑・紅葉・雪と全季節美しい",
        "高遠城址公園 — 「天下第一の桜」、約1500本のタカトオコヒガンザクラが薄紅色に染まる4月上旬",
        "上高地 — 北アルプスの大正池・河童橋・梓川、4月下旬の開山から11月15日の閉山まで",
        "地獄谷野猿公苑 — 温泉に浸かる野生のニホンザル、冬季の雪と湯気の中の構図が世界的人気",
        "阿智村ヘブンスそのはら — 環境省認定「日本一の星空」、夏のナイトツアーは天の川撮影の聖地",
      ],
      en: [
        "Matsumoto Castle (National Treasure) — distinctive black-lacquered walls, one of Japan's 12 surviving originals, beautiful in every season",
        "Takato Castle Park — «No.1 cherry blossoms under heaven,» about 1,500 Takato Kohigan trees blooming soft pink in early April",
        "Kamikochi — Northern Alps with Taisho Pond, Kappa Bridge, and the Azusa River; open from late April to November 15",
        "Jigokudani Monkey Park — wild macaques bathing in hot springs, world-famous winter compositions of snow and rising steam",
        "Achi Village's Heavens Sonohara — government-certified as having «Japan's No.1 starry sky»; summer night tours are sacred ground for Milky Way photography",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "長野県とは?", a: "本州中央部の内陸県で「日本の屋根」と呼ばれる山岳地。3000m級の日本アルプスに囲まれ、国宝松本城、高遠城址公園の桜、上高地、地獄谷の野猿温泉、阿智村の日本一の星空など被写体が圧倒的です。" },
        { q: "高遠城址公園の桜の見頃は?", a: "4月上旬〜中旬。タカトオコヒガンザクラ約1500本が薄紅色に染まり「天下第一の桜」と称されます。夜のライトアップも幻想的、混雑回避には早朝が狙い目。" },
        { q: "地獄谷野猿公苑のベストシーズンは?", a: "12月下旬〜3月上旬の積雪期。雪と湯気の中で温泉に浸かる猿は世界的に有名な冬の被写体。長野駅からバスで約45分+徒歩30分です。" },
      ],
      en: [
        { q: "What is Nagano Prefecture?", a: "An inland prefecture in central Honshu known as «the roof of Japan,» surrounded by the 3,000-meter Japanese Alps. It is exceptionally rich in subjects — Matsumoto Castle, Takato cherry blossoms, Kamikochi, Jigokudani snow monkeys, and Achi Village's premier starry sky." },
        { q: "When are the cherry blossoms at Takato Castle Park?", a: "Early to mid-April. About 1,500 Takato Kohigan cherry trees bloom in soft pink, earning the title «No.1 cherry blossoms under heaven.» Evening illumination is dreamlike; early morning best avoids the crowds." },
        { q: "When is the best time at Jigokudani Monkey Park?", a: "Late December to early March (snow season). Monkeys bathing in hot springs amid snow and steam create the iconic winter image. About 45 minutes by bus from Nagano Station plus a 30-minute walk." },
      ],
    },
    faqs: [
      {
        q: d("高遠城址公園の桜の見頃は？", "When are the cherry blossoms at Takato Castle Park?", "高远城址公园的樱花花期？", "高遠城址公園的櫻花花期？", "다카토 성지 공원의 벚꽃 절정은?"),
        a: d("4月上旬〜中旬が見頃。「タカトオコヒガンザクラ」約1500本が薄紅色に染まり、「天下第一の桜」と称される。夜のライトアップも幻想的。混雑回避は早朝が狙い目。", "Early to mid-April. About 1,500 «Takato Kohigan» cherry trees bloom in soft pink, earning the title «No.1 cherry blossoms under heaven.» Evening illumination is dreamlike, and early morning best avoids the crowds.", "4月上中旬为盛花期。约1500棵高远小彼岸樱染成淡粉色，被誉为「天下第一樱」。夜间灯光秀梦幻，避开人潮请选清晨。", "4月上中旬為盛花期。約1500棵高遠小彼岸櫻染成淡粉色，被譽為「天下第一櫻」。夜間燈光秀夢幻，避開人潮請選清晨。", "4월 상-중순이 절정. 약 1500그루의 다카토 고히간 벚꽃이 연분홍빛으로 물들어 「천하제일 벚꽃」이라 불립니다. 야간 조명도 환상적이며 혼잡을 피하려면 이른 아침이 좋습니다."),
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
    definition: lh(
      "岐阜県は本州中央部の人口197万人の内陸県で、面積の80%を占める山地と日本三大清流の一つ・長良川が特徴。1995年に世界遺産登録された白川郷の合掌造り集落(雪の集落の幻想的な景観)、飛騨高山の江戸の町並み、夏の長良川鵜飼(1300年の伝統漁法)、下呂温泉、新穂高ロープウェイから望む北アルプスまで、日本の原風景と山岳美が凝縮された撮影地です。",
      "Gifu is an inland prefecture in central Honshu (population 1.97 million), 80% of which is mountainous, defined by the Nagara River — one of Japan's three pristine rivers. UNESCO-listed Shirakawa-go (gassho-zukuri farmhouses transformed by snow), Hida-Takayama's Edo-period townscape, the 1,300-year-old summer cormorant fishing on the Nagara, Gero Onsen, and the Northern Alps panorama from Shinhotaka Ropeway distill primal Japanese landscape and alpine beauty into one prefecture."
    ),
    highlights: {
      ja: [
        "白川郷(世界遺産) — 合掌造り農家、特に1〜2月のライトアップは予約必須の絶景",
        "飛騨高山・古い町並み — 江戸の商家が残る重伝建地区、酒蔵や朝市の朝の光が美しい",
        "新穂高ロープウェイ — 標高2156mから望む西穂高岳の岩稜、紅葉と雪のコントラスト",
        "長良川鵜飼 — 5月11日〜10月15日、夜の篝火と鵜匠の漁、千年以上続く伝統",
        "馬籠宿・妻籠宿(中山道) — 江戸時代の宿場町、石畳と格子戸の路地",
      ],
      en: [
        "Shirakawa-go (UNESCO World Heritage) — gassho-zukuri thatched farmhouses, with the January–February evening illuminations requiring advance reservations",
        "Hida-Takayama old town — preserved Edo-period merchant district, beautifully lit by morning light at sake breweries and the morning market",
        "Shinhotaka Ropeway — at 2,156 m, with views of the Western Hotaka ridges; autumn colors meet snow",
        "Nagara cormorant fishing — May 11 to October 15, ancient torchlit night fishing 1,300 years in practice",
        "Magome and Tsumago post towns (Nakasendo) — Edo-period stone-paved lanes and lattice-front houses",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "岐阜県とは?", a: "本州中央部の内陸県、面積の80%が山地。世界遺産白川郷の合掌造り、飛騨高山の江戸の町並み、長良川鵜飼、北アルプスなど、日本の原風景と山岳美の宝庫です。" },
        { q: "白川郷のライトアップはいつ?", a: "毎年1〜2月の限られた日程(年6日程度)で開催。予約必須、展望台からの撮影は早めの計画が必要。雪と灯りの合掌集落は世界的にも珍しい撮影機会です。" },
        { q: "飛騨高山と白川郷を1日で回れる?", a: "可能ですが慌ただしい。高山駅→白川郷はバスで約50分。朝高山の朝市→昼白川郷→夕方再び高山という流れが現実的、各地で1.5〜2時間が目安。" },
      ],
      en: [
        { q: "What is Gifu Prefecture?", a: "An inland prefecture in central Honshu, 80% mountainous. It hosts UNESCO Shirakawa-go gassho farmhouses, Hida-Takayama's Edo townscape, Nagara cormorant fishing, and the Northern Alps — a treasury of primal Japanese landscape and alpine subjects." },
        { q: "When is Shirakawa-go winter light-up?", a: "Held on a limited number of dates (about 6 per year) in January and February. Reservations are required, and shooting from the observatory takes early planning. The snow-and-light gassho village is a globally rare photographic event." },
        { q: "Can I visit Hida-Takayama and Shirakawa-go in one day?", a: "Possible but tight. Takayama to Shirakawa-go is about 50 minutes by bus. A realistic flow: Takayama morning market → Shirakawa-go midday → return to Takayama by evening, allowing 1.5–2 hours at each." },
      ],
    },
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
    definition: lh(
      "愛知県は本州中央太平洋側の人口754万人、日本有数の工業県であり中部地方の中枢。徳川家康の生誕地・岡崎、信長の本拠・清須、織田信長と豊臣秀吉ゆかりの土地として戦国時代の歴史が色濃く、現代でもトヨタ自動車・三菱重工など世界的製造業の集積地。名古屋城、熱田神宮、東山動植物園、香嵐渓の紅葉、犬山城、明治村まで、歴史・産業・動物・自然と被写体は多彩です。",
      "Aichi (population 7.54 million) sits on Honshu's central Pacific coast as Japan's leading industrial prefecture and the hub of the Chubu region. Historically tied to the Sengoku-era warlords — birthplace of Ieyasu Tokugawa (Okazaki) and the home base of Oda Nobunaga (Kiyosu) — it is also today the manufacturing center of Toyota and Mitsubishi Heavy Industries. Subjects span history, industry, wildlife, and nature: Nagoya Castle, Atsuta Shrine, Higashiyama Zoo, the autumn colors of Korankei, Inuyama Castle, and the Meiji-mura open-air museum."
    ),
    highlights: {
      ja: [
        "名古屋城 — 1612年築城、金の鯱で知られる徳川御三家筆頭・尾張藩の居城、桜と天守が美しい",
        "熱田神宮 — 三種の神器の一つ草薙神剣を祀る、年間650万人参拝の格式高い神社",
        "東山動植物園 — 日本有数の動物園、ゴリラのシャバーニとコアラ館で動物撮影の名所",
        "香嵐渓 — 11月中旬〜下旬、4000本の紅葉と巴川の川面、夜のライトアップ",
        "犬山城 — 現存12天守の最古、木曽川を見下ろす要害、桜の春が最も人気",
      ],
      en: [
        "Nagoya Castle — built in 1612, famous for its golden shachihoko ornaments, the seat of the Owari branch of the Tokugawa clan, breathtaking with cherry blossoms",
        "Atsuta Shrine — enshrines the sacred sword Kusanagi (one of the three Imperial Regalia), drawing 6.5 million worshippers annually",
        "Higashiyama Zoo & Botanical Gardens — one of Japan's premier zoos, home to gorilla Shabani and a famed koala house, a destination for wildlife photography",
        "Korankei Gorge — mid-to-late November, 4,000 maple trees mirrored in the Tomoe River with evening illumination",
        "Inuyama Castle — the oldest of Japan's 12 surviving original keeps, perched above the Kiso River; cherry blossom season draws the largest crowds",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "愛知県とは?", a: "本州中央太平洋側の工業大国で中部地方の中枢。戦国武将の本拠地、徳川家康の生誕地で、現代もトヨタを擁する世界的製造業地域。名古屋城、熱田神宮、東山動植物園、香嵐渓など被写体が多彩です。" },
        { q: "動物園で綺麗に撮るコツは?", a: "明るい単焦点(50mm f/1.8等)で背景ボケを活かし、金網越しはレンズを網にぴったり付けると消えます。動物の目にピントを合わせ、午前中の柔らかい光を狙うのが鉄則です。" },
        { q: "香嵐渓の紅葉ベスト時期は?", a: "11月中旬〜下旬がピーク。日中の青空、夕方の斜光、夜のライトアップ(11月限定)で表情が大きく変わります。週末は大混雑、平日早朝が狙い目です。" },
      ],
      en: [
        { q: "What is Aichi Prefecture?", a: "An industrial powerhouse on Honshu's central Pacific coast and the hub of Chubu. Tied to Sengoku-era warlords and the birthplace of Tokugawa Ieyasu, today it remains the global manufacturing base for Toyota — with subjects from Nagoya Castle to Higashiyama Zoo and Korankei Gorge." },
        { q: "Tips for shooting well at zoos?", a: "A fast prime (e.g., 50mm f/1.8) blurs the background; press the lens against the wire mesh to make it disappear. Focus on the animal's eyes, and shoot in the soft morning light." },
        { q: "When is Korankei's autumn foliage at its best?", a: "Mid-to-late November. Daytime blue skies, late-afternoon raking light, and the November-only evening illumination each give very different scenes. Weekends are crowded — weekday early morning is ideal." },
      ],
    },
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
    definition: lh(
      "三重県は紀伊半島東部の人口170万人の県で、伊勢神宮(2,000年以上の歴史を持つ日本神道の最高位の神社)を擁する精神文化の中心地。神宮の内宮・外宮、五十鈴川と神聖な森、門前町おはらい町・おかげ横丁の賑わい、二見浦の夫婦岩、英虞湾(あごわん)の真珠養殖、志摩半島・熊野古道の壮大な海岸線まで、神域と海の幸が同居する稀有な撮影地です。",
      "Mie covers the eastern Kii Peninsula (population 1.7 million) and is home to Ise Jingu — Japan's most sacred Shinto shrine with over 2,000 years of history. The Naiku and Geku sanctuaries, the Isuzu River and sacred forest, the lively Oharai-machi/Okage Yokocho district, the «married couple rocks» of Futami, the pearl farms of Ago Bay, and the dramatic coastlines of the Shima Peninsula and Kumano Kodo together fuse spiritual ground and seaside abundance into a uniquely Japanese photographic landscape."
    ),
    highlights: {
      ja: [
        "伊勢神宮(内宮・外宮) — 2,000年以上の歴史、20年ごとの式年遷宮で社殿を造り替える日本神道最高位の聖地",
        "夫婦岩(二見浦) — 5〜7月の夏至前後にしか見られない2つの岩の間からの日の出",
        "おはらい町・おかげ横丁 — 江戸・明治の町並みを再現した門前町、伝統建築と参拝後の食文化",
        "横山展望台 — 英虞湾のリアス式海岸とパールイカダを一望、夕景は西日本屈指",
        "熊野古道(伊勢路) — 世界遺産、苔むした石段と杉並木、雨上がりの神秘的な光",
      ],
      en: [
        "Ise Jingu (Naiku & Geku) — over 2,000 years of history; the most sacred Shinto site in Japan, with sanctuary buildings rebuilt every 20 years (Shikinen Sengu)",
        "Meoto Iwa at Futami — the «married couple rocks»; only near the summer solstice (May–July) does the sun rise directly between them",
        "Oharai-machi & Okage Yokocho — Edo/Meiji-era streetscape recreated as the temple-front district, blending traditional architecture with post-pilgrimage cuisine",
        "Yokoyama Observatory — sweeping view of the ria coastline of Ago Bay with pearl-cultivation rafts; one of Japan's finest western sunsets",
        "Kumano Kodo (Iseji route) — UNESCO World Heritage, mossy stone steps and cedar forests, with mystical light after rain",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "三重県とは?", a: "紀伊半島東部の県で、2,000年以上の歴史を持つ伊勢神宮を擁する精神文化の中心地。神宮の参道、夫婦岩、おはらい町、英虞湾の真珠、熊野古道など神域と海の幸が同居する撮影地です。" },
        { q: "伊勢神宮で撮影するマナーは?", a: "正宮(御正宮)の中は撮影禁止。鳥居から内側は節度ある撮影にとどめ、参拝者や神職を直接撮らないのが原則。三脚使用は事前確認、内宮の朝5時開門が最も静かで光も柔らかいです。" },
        { q: "夫婦岩の日の出時期は?", a: "5〜7月の夏至前後のみ、2つの岩の間から日の出が見えます。晴天率が高いのは6月上旬。夜明け前到着で潮位と空の色を確認しながら待ちます。" },
      ],
      en: [
        { q: "What is Mie Prefecture?", a: "A prefecture on the eastern Kii Peninsula, home to Ise Jingu — Japan's most sacred Shinto shrine with 2,000 years of history. Subjects span the shrine's sacred forest, Meoto Iwa rocks, the Edo-style temple town, Ago Bay pearl farms, and the Kumano Kodo pilgrimage route." },
        { q: "Photography etiquette at Ise Jingu?", a: "Inside the main sanctuaries is strictly off-limits. Keep photography modest within the torii gates and avoid shooting worshippers or priests directly. Confirm tripod use in advance; the Naiku opens at 5 AM with the calmest light and fewest people." },
        { q: "When can I shoot sunrise between the Meoto Iwa?", a: "Only near the summer solstice (May to July) does the sun rise directly between the two rocks. Early June has the best clear-sky odds; arrive before dawn to track tide level and sky color." },
      ],
    },
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
    definition: lh(
      "京都府は794年から1868年までの約1,000年間、日本の首都が置かれた都市・京都を擁する人口256万人の府。市内には1,600以上の寺社、世界遺産17件「古都京都の文化財」が点在し、清水寺・金閣寺・銀閣寺・伏見稲荷大社・嵐山・平等院鳳凰堂など、誰もが知る日本の象徴的風景が集中。木造建築・庭園・石畳の路地・四季の移ろいが凝縮された、写真家にとって日本最大の聖地です。",
      "Kyoto served as Japan's capital for nearly a thousand years (794–1868), and the prefecture (population 2.56 million) holds over 1,600 temples and shrines and 17 UNESCO Heritage Sites under the «Historic Monuments of Ancient Kyoto.» Kiyomizu-dera, Kinkaku-ji, Ginkaku-ji, Fushimi Inari Taisha, Arashiyama, and the Byodoin Phoenix Hall make up the country's most iconic concentration of imagery. With its wooden architecture, gardens, stone-paved lanes, and the unmistakable rhythm of the four seasons, it is Japan's premier photographic ground."
    ),
    highlights: {
      ja: [
        "清水寺 — 778年創建、本堂の「清水の舞台」は釘を一本も使わない木造建築、桜と紅葉と夜間特別拝観の三段構え",
        "金閣寺(鹿苑寺) — 1397年建立、金箔張りの三層楼閣が鏡湖池に映る世界的に有名な構図",
        "伏見稲荷大社 — 千本鳥居で知られる稲荷神信仰の総本社、24時間参拝可、深夜・早朝は無人の幻想",
        "嵐山 — 渡月橋・竹林の小径・天龍寺、特に紅葉の11月下旬は世界中から観光客が集中",
        "東福寺 — 通天橋からの紅葉は京都随一、約2,000本の楓が織りなす朱の海",
      ],
      en: [
        "Kiyomizu-dera — founded in 778; its main hall, the «Kiyomizu Stage,» is built without nails. Cherry blossoms, autumn colors, and night illuminations make it a year-round triumph",
        "Kinkaku-ji (Golden Pavilion) — built in 1397; the three-tier golden pavilion mirrored in Kyokochi Pond is one of the world's most famous compositions",
        "Fushimi Inari Taisha — the head shrine of Inari worship, famous for its «Senbon Torii» (thousand vermilion gates); open 24 hours, late night and early morning are magical with no crowds",
        "Arashiyama — Togetsukyo Bridge, the bamboo grove, and Tenryu-ji Temple; late November draws visitors from around the world",
        "Tofuku-ji — autumn foliage from Tsuten-kyo bridge is Kyoto's finest, a sea of crimson formed by some 2,000 maple trees",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "京都府とは?", a: "794年〜1868年の約1,000年間、日本の首都だった京都を擁する府。市内に1,600以上の寺社、世界遺産17件があり、清水寺・金閣寺・伏見稲荷・嵐山など日本の象徴的な被写体が集中する写真家の聖地です。" },
        { q: "京都の紅葉撮影ベスト時期は?", a: "例年11月下旬〜12月上旬がピーク。東福寺通天橋、永観堂、清水寺、嵐山どこも午前中の順光が美しい。気温の急降下で色付きが進むため、寒波到来直後の予報チェックが鍵です。" },
        { q: "人混みを避けて撮るには?", a: "早朝6〜8時が圧倒的におすすめ。清水寺は朝6時から、金閣寺は9時開門前の外周、平等院は開門直後を狙う。秋・春の週末は午前4時起きの覚悟が必要です。" },
      ],
      en: [
        { q: "What is Kyoto Prefecture?", a: "Home to Kyoto, Japan's capital for nearly 1,000 years (794–1868). The prefecture holds over 1,600 temples and shrines and 17 UNESCO Heritage sites — Kiyomizu-dera, Kinkaku-ji, Fushimi Inari, Arashiyama — making it Japan's foremost photographic ground." },
        { q: "Best time for Kyoto autumn foliage photography?", a: "Peak usually falls in late November to early December. Tofuku-ji's Tsuten-kyo bridge, Eikando, Kiyomizu-dera, and Arashiyama all look best in morning front-light. Cold snaps trigger color, so monitor the forecast right after the first chill." },
        { q: "How to avoid crowds?", a: "Early morning (6–8 AM) is by far best. Kiyomizu-dera opens at 6, walk Kinkaku-ji's exterior before 9, and arrive at Byodoin right at opening. On autumn and spring weekends, plan to be moving at 4 AM." },
      ],
    },
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
    definition: lh(
      "兵庫県は瀬戸内海と日本海の両方に面する人口540万人の関西第2の県で、世界遺産・姫路城(1346年築城、1601〜1609年大改修)を中心に多彩な顔を持ちます。白漆喰総塗籠の優美な姿から「白鷺城」と称される姫路城、国際港湾都市・神戸の夜景、日本最古の温泉の一つ有馬温泉、淡路島の渦潮、城崎温泉、播磨平野の歴史まで、城・港・温泉・海を全て揃える稀有な撮影地です。",
      "Hyogo (population 5.4 million), facing both the Inland Sea and the Sea of Japan, is Kansai's second-largest prefecture and centered on UNESCO-listed Himeji Castle (built in 1346, with major renovations in 1601–1609). Nicknamed «White Heron Castle» for its graceful white-stucco silhouette, it stands alongside the international port city of Kobe with its night skyline, the ancient hot springs of Arima, the whirlpools of Awaji Island, Kinosaki Onsen, and the Harima Plain — a rare combination of castle, port, hot springs, and sea."
    ),
    highlights: {
      ja: [
        "姫路城(世界遺産) — 現存12天守の最大、白漆喰の壁が「白鷺城」と称される、桜と雪が最高の組合せ",
        "神戸ポートタワー・モザイク・北野異人館 — 港町の夜景は日本三大夜景の一つ、明治の洋館建築",
        "有馬温泉 — 日本最古の温泉、金泉(鉄分の赤褐色)・銀泉(無色)、湯本坂の旅館街",
        "城崎温泉 — 7つの外湯巡り、柳並木の大谿川、浴衣で歩く街並み、特に雪の冬景色",
        "淡路島・大鳴門橋 — 鳴門海峡の渦潮(春・秋の大潮が大規模)、明石海峡大橋(世界最長級の吊り橋)",
      ],
      en: [
        "Himeji Castle (UNESCO) — the largest of Japan's 12 surviving keeps, its «White Heron Castle» nickname earned by its white-stucco walls; cherry blossoms and snow are the finest pairings",
        "Kobe Port Tower, Mosaic, and Kitano Foreign Settlement — one of Japan's three great night views, with Meiji-era Western residences",
        "Arima Onsen — among Japan's oldest hot springs, with «Kinsen» (rust-red iron-rich) and «Ginsen» (clear) baths and the Yumotozaka inn district",
        "Kinosaki Onsen — seven public bathhouses, the willow-lined Otani River, yukata-clad streets, especially magical in winter snow",
        "Awaji Island & the Onaruto Bridge — Naruto Strait whirlpools (largest at spring and autumn tides) and the Akashi Kaikyo Bridge, one of the world's longest suspension bridges",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "兵庫県とは?", a: "関西第2の県で、瀬戸内海と日本海の両方に面します。世界遺産姫路城、神戸の夜景、日本最古の有馬温泉、淡路島の渦潮など城・港・温泉・海を全て揃える稀有な撮影地です。" },
        { q: "姫路城のベスト撮影ポイントは?", a: "大手門前(正面)、三の丸広場(桜と共に)、西の丸庭園(側面)、男山配水池公園(俯瞰)の4箇所が定番。早朝の光と雪化粧の冬がドラマチックです。" },
        { q: "撮影ベストシーズンは?", a: "姫路城の桜は4月上旬、神戸夜景は通年(冬の方が空気が澄む)、有馬・城崎温泉の雪は12〜2月、鳴門の渦潮は春・秋の大潮日が最大規模です。" },
      ],
      en: [
        { q: "What is Hyogo Prefecture?", a: "Kansai's second-largest prefecture, facing both the Inland Sea and the Sea of Japan. It uniquely combines UNESCO Himeji Castle, Kobe's night skyline, ancient Arima Onsen, and Awaji Island's whirlpools — castles, harbors, hot springs, and the sea." },
        { q: "Best photo spots for Himeji Castle?", a: "The Otemon front, Sannomaru Plaza (with cherry blossoms), Nishi-no-maru Garden (side view), and Otoko-yama Park (elevated view) are the four classics. Early-morning light and the rare winter snow are most dramatic." },
        { q: "When is the best season to photograph Hyogo?", a: "Himeji Castle cherry blossoms in early April, Kobe nightscapes year-round (clearer in winter), snow at Arima and Kinosaki onsens December–February, Naruto whirlpools at spring and autumn high-tide days." },
      ],
    },
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
    definition: lh(
      "奈良県は710〜784年の日本最初の本格的首都・平城京が置かれた人口130万人の古都で、内陸の山間に古代日本の遺産が今も息づきます。世界遺産は8件登録され、特に法隆寺(7世紀の世界最古の木造建築)、東大寺の大仏殿(高さ48m)、春日大社、興福寺、薬師寺、唐招提寺など、京都より古い1,300年前の日本文化が現存。奈良公園の野生鹿(国の天然記念物)、吉野山の千本桜まで、写真家にとって唯一無二の歴史風景です。",
      "Nara (population 1.3 million) hosted Japan's first permanent capital, Heijo-kyo (710–784), and to this day inland Nara cradles the foundations of ancient Japan. With 8 UNESCO World Heritage Sites — Horyu-ji (the world's oldest wooden structures, 7th century), Todai-ji's Great Buddha Hall (48 m tall), Kasuga Taisha, Kofuku-ji, Yakushi-ji, Toshodai-ji — Nara preserves Japanese culture older than Kyoto's. Add the wild deer of Nara Park (a national natural treasure) and the «thousand cherry trees» of Mt. Yoshino, and the prefecture offers history unlike any other."
    ),
    highlights: {
      ja: [
        "東大寺・大仏殿 — 752年開眼、現存する世界最大級の木造建築、像高15mの盧舎那仏",
        "法隆寺(世界遺産) — 7世紀建立の世界最古の木造建築群、夢殿・五重塔・金堂",
        "春日大社 — 1300年の歴史、藤の花(5月)と万灯籠の幻想、山中に通じる参道の杉並木",
        "奈良公園の鹿 — 約1,200頭の野生鹿が共生、朝の逆光で毛並みを浮かび上がらせる構図が定番",
        "吉野山 — 桜の名所3万本、4月上旬の下千本→中千本→上千本→奥千本の順に開花",
      ],
      en: [
        "Todai-ji's Great Buddha Hall — consecrated in 752, one of the world's largest existing wooden structures, housing a 15 m bronze Vairocana Buddha",
        "Horyu-ji (UNESCO) — built in the 7th century; the world's oldest surviving wooden architecture, including the Yumedono, five-story pagoda, and Kondo",
        "Kasuga Taisha — 1,300 years old, with wisteria in May, the spectacular «Mantoro» lantern festival, and a cedar-lined approach into the sacred forest",
        "Deer of Nara Park — about 1,200 wild deer roam freely; backlit morning compositions highlight their fur",
        "Mt. Yoshino — Japan's most celebrated cherry-blossom mountain with 30,000 trees, blooming in April from Lower → Middle → Upper → Inner Senbon",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "奈良県とは?", a: "710〜784年の日本最初の本格的首都・平城京が置かれた古都。世界遺産8件、法隆寺(世界最古の木造建築)、東大寺大仏、春日大社、奈良公園の鹿、吉野山の桜など1,300年の日本文化が現存します。" },
        { q: "奈良の鹿と一緒に撮るコツは?", a: "鹿せんべいを持つと近寄ってきますが、食べ終わると離れます。朝の逆光で毛並みを浮かび上がらせる構図が定番。鹿は野生なので過度に近づきすぎず、子鹿シーズン(5〜7月)は特に注意が必要。" },
        { q: "京都との周り方は?", a: "京都駅→近鉄京都線で奈良まで45分、日帰り可能。午前奈良公園・東大寺・春日大社、午後法隆寺(別エリア、要時間配分)が定番。混雑回避は朝7時開園の奈良公園が圧倒的です。" },
      ],
      en: [
        { q: "What is Nara Prefecture?", a: "An ancient capital — Japan's first permanent seat at Heijo-kyo (710–784). With 8 UNESCO sites including Horyu-ji (world's oldest wooden architecture), Todai-ji's Great Buddha, Kasuga Taisha, Nara Park's deer, and Mt. Yoshino's cherry blossoms, it preserves 1,300 years of Japanese culture." },
        { q: "Tips for photographing with deer in Nara?", a: "Holding shika senbei (deer crackers) brings them close, but they leave once finished. Morning backlight that highlights their fur is the classic shot. Don't crowd them — the May–July fawn season demands extra care." },
        { q: "Best way to combine Nara with Kyoto?", a: "Kyoto Station to Nara is 45 minutes by Kintetsu Kyoto Line — easy as a day trip. Mornings at Nara Park, Todai-ji, and Kasuga Taisha; afternoon at Horyu-ji (separate area, allow travel time). For empty scenes, arrive at Nara Park's 7 AM opening." },
      ],
    },
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
    definition: lh(
      "徳島県は四国東部の人口72万人の県で、世界最大級の渦潮が発生する鳴門海峡を擁します。直径20mを超える渦潮は瀬戸内海と紀伊水道の潮位差から生まれ、満潮・干潮時に最大化。400年以上の歴史を持つ阿波踊り(8月12〜15日)、平家の落人伝説が残る祖谷(いや)渓谷、剣山(1955m)、四国八十八ヶ所霊場の起点・第一番札所霊山寺など、自然と祭り文化が同居する四国の入り口です。",
      "Tokushima is an eastern Shikoku prefecture (population 720,000) framed by the world-class tidal whirlpools of the Naruto Strait. Born of the tidal differential between the Inland Sea and the Kii Channel, whirlpools exceed 20 m across at peak high or low tide. The 400-year-old Awa Odori dance festival (August 12–15), the secluded Iya Valley with its Heike clan legends, sacred Mt. Tsurugi (1,955 m), and Ryozenji — the first temple of the Shikoku 88 Pilgrimage — make Tokushima the gateway to Shikoku where nature and festival culture meet."
    ),
    highlights: {
      ja: [
        "鳴門海峡の渦潮 — 世界三大潮流の一つ、春・秋の大潮で直径20m超、観潮船と大鳴門橋の遊歩道から撮影",
        "大鳴門橋 — 全長1,629m、淡路島と徳島を繋ぐ吊橋、橋脚と渦潮の組合せが象徴的構図",
        "祖谷のかずら橋 — シラクチカズラで編まれた長さ45m高さ14mの吊橋、平家落人伝説の秘境",
        "阿波踊り(8月) — 「踊る阿呆に見る阿呆」の連が街中を練り歩く400年の祭り、被写体としての動き",
        "剣山(1,955m) — 四国第2の高峰、リフトで頂上近くまで、紅葉の10月が圧倒的に美しい",
      ],
      en: [
        "Naruto Strait whirlpools — among the world's three great tidal currents; spring and autumn spring tides produce vortices over 20 m across, photographed from tour boats or the Onaruto Bridge walkway",
        "Onaruto Bridge — a 1,629 m suspension bridge linking Awaji Island and Tokushima; the iconic frame combines bridge piers with whirlpools",
        "Iya Vine Bridge — a 45 m, 14 m-high bridge woven from shirakuchi-kazura vines, deep in the secluded valley tied to Heike clan legend",
        "Awa Odori (August) — a 400-year tradition where ren dance troupes parade through the city, an irresistible moving subject",
        "Mt. Tsurugi (1,955 m) — Shikoku's second-highest peak, a lift takes you near the summit, October autumn colors are extraordinary",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "徳島県とは?", a: "四国東部の県で、世界最大級の渦潮が発生する鳴門海峡を擁します。400年の阿波踊り、祖谷渓谷の秘境、剣山、四国八十八ヶ所の起点など、自然と祭り文化が同居する撮影地です。" },
        { q: "鳴門の渦潮が一番大きい時は?", a: "春・秋の大潮(新月・満月前後)の満潮/干潮前後1〜2時間。事前に潮見表を確認し、観潮船(45分)または大鳴門橋遊歩道「渦の道」から撮影。直径20m超の渦が見られます。" },
        { q: "アクセスは?", a: "徳島阿波おどり空港から鳴門観光港まで車で30分、東京・大阪からは飛行機で1時間。明石海峡大橋・大鳴門橋経由のドライブも風景が良く人気です。" },
      ],
      en: [
        { q: "What is Tokushima Prefecture?", a: "An eastern Shikoku prefecture framed by the world-class tidal whirlpools of the Naruto Strait. With the 400-year-old Awa Odori festival, the secluded Iya Valley, sacred Mt. Tsurugi, and the start of the Shikoku 88 pilgrimage, it pairs nature with festival culture." },
        { q: "When are Naruto's whirlpools largest?", a: "Around high or low tide (±1–2 hours) on spring and autumn spring tides (near new or full moon). Check tide tables, then shoot from a 45-minute tour boat or from the «Uzu no Michi» walkway under Onaruto Bridge — vortices over 20 m occur." },
        { q: "How do I get there?", a: "30 minutes by car from Tokushima Awaodori Airport to Naruto Sightseeing Port; 1 hour by air from Tokyo or Osaka. The drive across the Akashi-Kaikyo and Onaruto bridges is itself a popular scenic route." },
      ],
    },
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
    definition: lh(
      "香川県は四国北東部・瀬戸内海に面した人口93万人の県で、面積1,876km²と日本最小ながら、密度濃く名所が並びます。父母ヶ浜は2017年頃から「日本のウユニ塩湖」としてSNSで世界的に有名になった水鏡夕景の聖地。日本三大名園の栗林公園、海抜521mの参道で知られる金刀比羅宮、讃岐うどんの本場、瀬戸内国際芸術祭の中心・直島と豊島まで、撮影と文化を凝縮した県です。",
      "Kagawa is northeastern Shikoku's prefecture on the Inland Sea (population 930,000). Despite being Japan's smallest prefecture at 1,876 km², it concentrates some of the country's best subjects. Chichibugahama, dubbed «Japan's Uyuni» since 2017, became globally known on social media for its mirror-like sunsets on tidal flats. Add Ritsurin Garden (one of Japan's three great gardens), the famed 521 m-elevation Kotohira Shrine, the heartland of Sanuki udon, and the Setouchi Triennale art islands of Naoshima and Teshima — and Kagawa packs photographic and cultural depth."
    ),
    highlights: {
      ja: [
        "父母ヶ浜 — 干潮と日没が重なる日の水鏡夕景、人物を入れたシルエット撮影が世界的に流行",
        "栗林公園 — 1625年作庭、日本三名園と並ぶ「特別名勝」、紫雲山を借景にした6つの池",
        "金刀比羅宮(こんぴらさん) — 海抜521m、本宮まで785段、奥社まで1,368段の長い参道",
        "直島・豊島(瀬戸内国際芸術祭) — 草間彌生のかぼちゃ、ベネッセハウス、地中美術館、現代アートと島景観",
        "屋島 — 源平合戦の古戦場、瀬戸内海と高松市街の絶景パノラマ、夕焼けが美しい",
      ],
      en: [
        "Chichibugahama Beach — the «mirror sunset» occurs when low tide aligns with sunset; silhouette compositions with figures on the reflective sand have become a global trend",
        "Ritsurin Garden — landscaped from 1625, Japan's «Special Place of Scenic Beauty» on par with the Three Great Gardens, six ponds borrow Mt. Shiun as backdrop",
        "Kotohira Shrine (Konpira-san) — the main hall sits at 521 m elevation, requiring a climb of 785 steps to the main shrine and 1,368 to the inner sanctuary",
        "Naoshima and Teshima (Setouchi Triennale) — Yayoi Kusama's pumpkins, Benesse House, the Chichu Art Museum; contemporary art on Inland Sea islands",
        "Yashima — historic battlefield of the Genpei War, panoramic views of the Inland Sea and Takamatsu city, with stunning sunsets",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "香川県とは?", a: "四国北東部の日本最小県(1,876km²)。父母ヶ浜の水鏡夕景、栗林公園、金刀比羅宮、讃岐うどん、瀬戸内国際芸術祭の直島・豊島など被写体が密集する撮影地です。" },
        { q: "父母ヶ浜で鏡面反射を撮る条件は?", a: "①干潮と日没が重なる日 ②風がほぼ無い ③空に雲(空だけだと単調)。三豊市観光協会のサイトに最適日カレンダーが公開されており、必ず事前確認を。日没15分前から30分後がゴールデンタイム。" },
        { q: "撮影ベストシーズンは?", a: "父母ヶ浜は通年(干潮×日没の条件次第)、栗林公園は紫雲山が緑の5月と紅葉の11月下旬、金刀比羅宮は桜の4月、直島は瀬戸内国際芸術祭の春・夏・秋会期がベストです。" },
      ],
      en: [
        { q: "What is Kagawa Prefecture?", a: "Japan's smallest prefecture (1,876 km²) on Shikoku's northeastern coast. It densely packs Chichibugahama's mirror sunsets, Ritsurin Garden, Kotohira Shrine, the heart of Sanuki udon, and the Setouchi Triennale art islands of Naoshima and Teshima." },
        { q: "What conditions create Chichibugahama's mirror reflection?", a: "①Low tide coinciding with sunset ②Near-zero wind ③Clouds in the sky (a clear sky looks flat). Mitoyo City tourism publishes optimal dates online — check before going. The golden window is 15 min before to 30 min after sunset." },
        { q: "When is the best season to photograph Kagawa?", a: "Chichibugahama is year-round (subject to tide × sunset alignment). Ritsurin is best with green Mt. Shiun in May and autumn colors in late November. Kotohira shines under cherry blossoms in April; Naoshima peaks during the Setouchi Triennale's spring, summer, and autumn sessions." },
      ],
    },
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
    definition: lh(
      "愛媛県は四国北西部の人口130万人の県で、瀬戸内海と豊後水道に面し、3,000年以上の歴史を持つ日本最古の温泉「道後温泉」の地。重要文化財の道後温泉本館(1894年築、夏目漱石『坊っちゃん』の舞台)、現存12天守の松山城、しまなみ海道(本州の尾道〜四国の今治を結ぶ7つの橋)、瀬戸内海の多島美を一望する亀老山展望台、内子の白壁の町並みなど、歴史・温泉・島景色を凝縮した撮影地です。",
      "Ehime, in northwestern Shikoku (population 1.3 million), faces the Inland Sea and the Bungo Channel and is home to «Dogo Onsen,» Japan's oldest hot spring with over 3,000 years of history. The Important Cultural Property Dogo Onsen Honkan (built in 1894, the setting of Soseki's novel «Botchan»), Matsuyama Castle (one of Japan's 12 surviving keeps), the Shimanami Kaido (seven bridges linking Onomichi in Honshu and Imabari in Shikoku), the Mt. Kiro Observatory's view over countless islands, and Uchiko's whitewashed merchant streets together distill history, hot springs, and islandscape into one photographic prefecture."
    ),
    highlights: {
      ja: [
        "道後温泉本館 — 1894年築の重要文化財、3層の唐破風が特徴、漱石『坊っちゃん』の舞台",
        "松山城 — 標高132mの勝山頂上に建つ現存12天守、ロープウェイから本丸までの登城路と桜",
        "しまなみ海道・来島海峡大橋 — 全長約60kmで7つの橋を渡り瀬戸内海の島々を縦断、自転車旅で世界的に有名",
        "亀老山展望台 — 標高307m、来島海峡大橋と瀬戸内海の多島美を360度パノラマ、夕景は西日本屈指",
        "内子の町並み — 江戸末期〜明治の漆喰白壁、木蝋(もくろう)で栄えた商家、上芳我家住宅は重伝建",
      ],
      en: [
        "Dogo Onsen Honkan — built in 1894 as an Important Cultural Property; its three-tier «karahafu» curved gables and connection to Soseki's novel «Botchan» are iconic",
        "Matsuyama Castle — perched on Mt. Katsuyama (132 m), one of Japan's 12 surviving keeps; the cherry-blossom approach by ropeway is celebrated",
        "Shimanami Kaido / Onaruto Bridge — about 60 km of seven bridges spanning the Inland Sea, world-renowned as a cycling route",
        "Mt. Kiro Observatory — at 307 m elevation, a 360° panorama of the Onaruto Bridge and the Inland Sea's island clusters, with western Japan's finest sunsets",
        "Uchiko historic streetscape — late Edo to Meiji whitewashed buildings, prosperous merchant houses from the wax-tree industry, including the Kami Haga Residence",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "愛媛県とは?", a: "四国北西部の県で、3,000年の歴史を持つ日本最古の道後温泉、現存12天守の松山城、しまなみ海道の島々と橋、瀬戸内海の多島美を望む亀老山など、歴史と海景の融合が魅力です。" },
        { q: "道後温泉本館は撮影可能?", a: "外観は自由、特に夜のライトアップ・建物裏手・路地越しの構図がおすすめ。館内は入浴客のプライバシーに配慮し一部撮影禁止区域あり。2024年12月の改修工事完了後、より整った姿に。" },
        { q: "しまなみ海道のベスト撮影地は?", a: "亀老山展望台(来島海峡大橋の俯瞰)、糸山公園(夕景)、多々羅大橋から見る生口島、伯方島の見近島など。自転車での縦断は1日で全長を体感できます。" },
      ],
      en: [
        { q: "What is Ehime Prefecture?", a: "Northwestern Shikoku's prefecture, home to 3,000-year-old Dogo Onsen (Japan's oldest), Matsuyama Castle (one of 12 surviving keeps), the Shimanami Kaido bridges, and the multi-island vistas from Mt. Kiro — a fusion of history and seascapes." },
        { q: "Can I photograph Dogo Onsen Honkan?", a: "The exterior is fully open; we recommend the evening illumination, rear angles, and alley framing. Some interior areas are off-limits to respect bathers' privacy. Following December 2024's renovation, the building looks even more refined." },
        { q: "Best photo spots on the Shimanami Kaido?", a: "Mt. Kiro Observatory (overlooking Onaruto Bridge), Itoyama Park (sunset), Tatara Bridge with Ikuchi Island in view, and Mijika Island off Hakata Island. A full bike ride lets you experience the entire 60 km in a day." },
      ],
    },
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
    definition: lh(
      "高知県は四国南部・太平洋に面した人口68万人の県で、面積の84%を森林が占め、日本最後の清流と称される四万十川や仁淀川を擁します。幕末の志士・坂本龍馬の故郷として知られ、桂浜の月の名所、現存12天守の高知城、にこ淵のエメラルドグリーン(仁淀ブルー)、49本の沈下橋、足摺岬・室戸岬の断崖など、原初の自然風景と歴史が融合する撮影地です。",
      "Kochi (population 680,000) lies on Shikoku's southern Pacific coast, with 84% of its land covered in forest and home to two of Japan's «last clear rivers» — the Shimanto and the Niyodo. Birthplace of Bakumatsu-era statesman Sakamoto Ryoma, the prefecture features Katsurahama Beach (renowned for moonlight), Kochi Castle (one of 12 surviving keeps), the emerald «Niyodo Blue» of Nikobuchi, 49 chinkabashi (submersible) bridges, and the cliffs of Capes Ashizuri and Muroto — a fusion of primal nature and historical depth."
    ),
    highlights: {
      ja: [
        "桂浜 — 太平洋を望む海岸、坂本龍馬像、月の名所として古来詠まれた約400mの弓形ビーチ",
        "高知城 — 1601年初代築、現存12天守の中で天守と本丸御殿が両方現存する唯一の城",
        "にこ淵(仁淀川支流) — 「仁淀ブルー」の代表地、晴天正午のPLフィルター撮影で深いエメラルドが出る",
        "四万十川 — 全長196km、49本の沈下橋(増水時に水没する低い橋)、川霧の朝が幻想的",
        "足摺岬・室戸岬 — 太平洋に突き出した断崖と灯台、夜明けの太平洋日の出は四国南端の象徴",
      ],
      en: [
        "Katsurahama — a 400m bow-shaped beach facing the Pacific, the Sakamoto Ryoma statue, and a famous moon-viewing spot praised in classical poetry",
        "Kochi Castle — first built in 1601, the only one of Japan's 12 original keeps where both the keep and main hall (Honmaru Goten) survive",
        "Nikobuchi (Niyodo River tributary) — the most famous «Niyodo Blue» spot; clear-sky midday with a polarizing filter brings out the deepest emerald",
        "Shimanto River — 196 km long with 49 chinkabashi submersible bridges (built to flood without breaking); morning river mist is otherworldly",
        "Capes Ashizuri and Muroto — sheer Pacific cliffs and lighthouses; dawn over the open ocean defines southern Shikoku",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "高知県とは?", a: "四国南部・太平洋に面する県で、坂本龍馬の故郷。面積の84%が森林、四万十川・仁淀川の清流、桂浜、現存12天守の高知城、仁淀ブルー(にこ淵)、49本の沈下橋など原初の自然と歴史が融合します。" },
        { q: "にこ淵の青色を撮るコツは?", a: "晴天の正午前後、直射光が水面に届く時間帯が最も青い。PLフィルターで水面反射を抑制すると色が深まります。徒歩約10分の階段下りなので滑りにくい靴が必須。" },
        { q: "撮影ベストシーズンは?", a: "にこ淵・四万十川は5〜10月の水量と緑が美しい季節、川霧の朝は秋〜冬。桂浜は通年だが秋〜冬の月が最も美しい(中秋の名月8月15日が伝統)。" },
      ],
      en: [
        { q: "What is Kochi Prefecture?", a: "A southern Shikoku prefecture on the Pacific, birthplace of Sakamoto Ryoma. With 84% forest cover, the pristine Shimanto and Niyodo rivers, Katsurahama beach, the original Kochi Castle, the emerald «Niyodo Blue» (Nikobuchi), and 49 submersible bridges, it merges primal nature and history." },
        { q: "Tips for capturing Nikobuchi's blue water?", a: "Around midday on clear days, when direct sunlight reaches the water, the blue is strongest. A polarizing filter deepens the color by suppressing surface reflections. Non-slip footwear is essential — it's a 10-minute downhill climb on stairs." },
        { q: "When is the best season to photograph Kochi?", a: "Nikobuchi and Shimanto are best from May to October when water volume and surrounding green peak; river mist forms in autumn and winter mornings. Katsurahama is year-round, but the moon over the bay is most beautiful in autumn — especially the August 15 mid-autumn full moon." },
      ],
    },
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
    definition: lh(
      "福岡県は九州最大の人口513万人の県で、九州の経済・交通・文化の中心。空港から市街地まで地下鉄で5分という日本一のアクセスを誇り、博多どんたく(5月)・博多祇園山笠(7月)などの祭り、屋台文化、太宰府天満宮(学問の神様・菅原道真を祀る)、糸島半島の海岸線、北九州市門司港のレトロ建築、関門海峡の夜景まで、都市・海・歴史が至近距離に共存する九州の玄関口です。",
      "Fukuoka, with a population of 5.13 million, is Kyushu's largest prefecture and the region's economic, transit, and cultural center. With Japan's quickest airport-to-city access — five minutes by subway — it offers Hakata Dontaku (May), Hakata Gion Yamakasa (July), the legendary food-stall culture, Dazaifu Tenmangu (shrine to Sugawara no Michizane, the deity of learning), the Itoshima Peninsula coast, the retro architecture of Kitakyushu's Mojiko Port, and Kanmon Strait nightscapes — a Kyushu gateway where city, sea, and history sit at arm's length."
    ),
    highlights: {
      ja: [
        "太宰府天満宮 — 学問の神様・菅原道真を祀る、年間1,000万人以上参拝、参道の梅と本殿の朱色",
        "博多の屋台 — 中洲川端・天神・長浜の路上に並ぶ約100軒、夜の煙と提灯の灯りは九州の象徴",
        "福岡タワー・百道浜 — 高さ234m、博多湾とシーサイドももちのパノラマ、夕景〜夜景はシームレス",
        "糸島半島 — 桜井二見ヶ浦、芥屋の大門、夫婦岩越しの夕日、ヤシの木のあるカフェ群",
        "門司港レトロ(北九州) — 1889年開港、明治・大正・昭和の洋館、関門海峡を望む港町夜景",
      ],
      en: [
        "Dazaifu Tenmangu — the head shrine to Sugawara no Michizane (deity of learning), drawing over 10 million worshippers annually; plum blossoms along the approach and the vermilion main hall",
        "Hakata food stalls — about 100 «yatai» line Nakasu-Kawabata, Tenjin, and Nagahama; their lanterns and rising smoke epitomize Kyushu nightlife",
        "Fukuoka Tower & Momochi Beach — 234 m tall with sweeping views of Hakata Bay and Seaside Momochi; sunset transitions seamlessly into city night views",
        "Itoshima Peninsula — Sakurai Futamigaura's «married rocks,» the cave of Keya no Oto, sunset behind couple-rock arches, and the palm-tree café scene",
        "Mojiko Retro (Kitakyushu) — opened in 1889; preserved Meiji, Taisho, and Showa-era Western architecture, with the Kanmon Strait providing a port-town nightscape",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "福岡県とは?", a: "九州最大の人口513万人の県で、経済・交通・文化の中心。空港から市街地まで地下鉄で5分の日本一のアクセス、博多の屋台、太宰府天満宮、糸島の海岸、門司港のレトロ建築など多彩な被写体が揃います。" },
        { q: "福岡で絶対外せない撮影地は?", a: "太宰府天満宮の参道と本殿、福岡タワー→百道浜→ベイサイドプレイスの夜景ライン、糸島の桜井二見ヶ浦の夕景、博多の屋台街(中洲川端・天神)、門司港レトロが鉄板です。" },
        { q: "撮影ベストシーズンは?", a: "太宰府の梅は2月、桜は4月上旬、糸島の夕景は通年(冬の方が空気が澄む)、屋台は通年(雨と冬の風除け対策必要)、紅葉の太宰府光明禅寺は11月下旬がピークです。" },
      ],
      en: [
        { q: "What is Fukuoka Prefecture?", a: "Kyushu's largest prefecture (5.13 million residents) and the region's economic, transit, and cultural center. With Japan's fastest airport-to-city access (5 min by subway), Hakata's food stalls, Dazaifu Tenmangu, the Itoshima coast, and Mojiko's retro architecture, it offers diverse subjects." },
        { q: "Must-see photo spots in Fukuoka?", a: "The approach and main hall of Dazaifu Tenmangu, the Fukuoka Tower → Momochi Beach → Bayside Place night-view corridor, Itoshima's Sakurai Futamigaura sunset, the Hakata food-stall districts (Nakasu-Kawabata, Tenjin), and Mojiko Retro." },
        { q: "When is the best season to photograph Fukuoka?", a: "Plum blossoms at Dazaifu in February, cherry blossoms in early April, Itoshima sunsets year-round (clearer in winter), food stalls year-round (with rain/wind protection in winter), and Komyo Zenji's autumn colors at Dazaifu peak in late November." },
      ],
    },
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
    definition: lh(
      "大分県は九州東部の人口110万人の県で、温泉源泉数約4,400・湧出量約13万kL/日と日本一を誇る「日本一の温泉県」。別府八湯(別府・鉄輪・観海寺・明礬・浜脇・堀田・亀川・柴石)は世界でも稀な温泉密集地、湯煙の街並みは独特の被写体。湯布院は由布岳(1,583m)を仰ぐ高原温泉、九重(くじゅう)連山、九重夢大吊橋(高さ173m日本一)、耶馬渓の奇岩、宇佐神宮(全国八幡宮の総本宮)など山と湯の被写体が凝縮しています。",
      "Oita, in eastern Kyushu (population 1.1 million), is Japan's «No.1 onsen prefecture» with about 4,400 hot spring sources and 130,000 kL of daily output — the highest in the country. The «Eight Hot Springs of Beppu» (Beppu, Kannawa, Kankaiji, Myoban, Hamawaki, Horita, Kamegawa, and Shibaseki) form one of the world's rare onsen clusters, with the steam-laced cityscape forming a unique photographic subject. Yufuin sits beneath Mt. Yufu (1,583 m), and the prefecture also features the Kuju mountain range, Japan's highest pedestrian suspension bridge (Kokonoe Yume Otsuribashi, 173 m), Yabakei's strange rock formations, and Usa Jingu — head of all 44,000 Hachimangu shrines nationwide."
    ),
    highlights: {
      ja: [
        "別府地獄めぐり — 海地獄(コバルトブルー)、血の池地獄(赤褐色)、龍巻地獄(間欠泉)など7つの源泉を巡る",
        "鉄輪温泉の湯けむり展望台 — 街全体から立ち上る湯煙、特に冬の朝の濃い蒸気は世界遺産級の被写体",
        "湯布院・由布岳 — 標高1,583mの山を仰ぐ温泉街、金鱗湖の朝霧と紅葉のリフレクション",
        "九重夢大吊橋 — 高さ173m長さ390m、日本一の歩行者専用吊橋、震動の滝と紅葉の組合せ",
        "耶馬渓 — 「日本三大奇勝」の一つ、青の洞門・競秀峰・一目八景、紅葉の11月が圧倒的に美しい",
      ],
      en: [
        "Beppu's «Hells» — seven distinct hot spring spots: cobalt-blue Umi Jigoku, blood-red Chinoike Jigoku, the geyser Tatsumaki Jigoku, and more",
        "Yukemuri Observatory at Kannawa Onsen — the citywide rising steam plumes, particularly thick on cold winter mornings, present an extraordinary subject",
        "Yufuin and Mt. Yufu — a hot-spring town beneath the 1,583 m peak, with Lake Kinrin's morning mist and autumn reflections",
        "Kokonoe Yume Otsuribashi — Japan's tallest pedestrian suspension bridge (173 m × 390 m), pairing well with Shindo Falls and autumn colors",
        "Yabakei — one of Japan's «Three Strange Sceneries,» including Ao no Domon, Kyoshuho rock face, and the Hitomehakkei viewpoint; November autumn colors are unforgettable",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "大分県とは?", a: "九州東部の県で、源泉数・湧出量ともに日本一の温泉王国。別府八湯の湯煙、湯布院の高原温泉、九重連山、九重夢大吊橋、耶馬渓の奇岩、宇佐神宮の総本宮など山と湯の被写体が凝縮しています。" },
        { q: "湯煙の街並みが撮れるスポットは?", a: "鉄輪(かんなわ)温泉の湯けむり展望台。特に冬の朝、寒暖差で湯煙が最も濃く立ち上る。日の出前から待ち、街に光が射す瞬間が黄金構図。展望台は無料、駐車場あり。" },
        { q: "撮影ベストシーズンは?", a: "湯煙は冬の朝が圧倒的、湯布院金鱗湖の朝霧は秋(10〜11月)、耶馬渓・九重夢大吊橋の紅葉は11月中旬〜下旬、別府地獄は通年だが冬の方が湯気が映えます。" },
      ],
      en: [
        { q: "What is Oita Prefecture?", a: "An eastern Kyushu prefecture and Japan's «No.1 onsen prefecture» — first in source count and daily output. Subjects include the steam-veiled streets of Beppu, the highland Yufuin, the Kuju mountains, Japan's tallest pedestrian suspension bridge, Yabakei's strange rocks, and Usa Jingu (head of all Hachimangu shrines)." },
        { q: "Where can I capture Beppu's steam-rising skyline?", a: "The Yukemuri Observatory in Kannawa Onsen. Winter mornings produce the thickest steam plumes due to temperature contrast. Wait from before sunrise; the moment first light strikes the streets is the golden composition. The observatory is free with parking." },
        { q: "When is the best season to photograph Oita?", a: "Steam plumes are unrivaled on winter mornings; Yufuin's Lake Kinrin morning mist peaks in October–November; Yabakei and Kokonoe Bridge autumn colors shine mid-to-late November; the Hells of Beppu look year-round but steam stands out best in winter." },
      ],
    },
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
    definition: lh(
      "沖縄県は日本最南端の県で、人口145万人、47もの有人離島から成る亜熱帯地域。1429〜1879年まで独立国「琉球王国」として中国・東南アジアと交易した独自の歴史と文化を持ち、エメラルドグリーンの海・サンゴ礁・白砂のビーチは本土とは異質の風景を生みます。本島の世界遺産・首里城跡(2019年焼失後再建中)、宮古島の透き通る海(透明度世界最高クラス)、八重山諸島の手付かずの自然、慶良間諸島の「ケラマブルー」など、日本にいながら南国を撮れる稀有な撮影地です。",
      "Okinawa is Japan's southernmost prefecture (population 1.45 million), comprising 47 inhabited subtropical islands. Independent as the «Ryukyu Kingdom» (1429–1879), it traded with China and Southeast Asia, developing a culture distinct from mainland Japan. Emerald seas, coral reefs, and white-sand beaches yield landscapes that do not look Japanese. The mainland's UNESCO Shurijo Castle ruins (rebuilding after the 2019 fire), Miyakojima's water (among the world's clearest), the untouched nature of the Yaeyama Islands, and the «Kerama Blue» of the Kerama Islands all let you photograph the tropics within Japan's borders."
    ),
    highlights: {
      ja: [
        "宮古島・与那覇前浜ビーチ — 全長7km・「東洋一の白砂」、透明度世界最高クラス、伊良部大橋(全長3,540m)も至近",
        "八重山諸島(石垣・西表・竹富) — 西表島の原生マングローブ、竹富島の赤瓦と白砂の集落、星砂の浜",
        "慶良間諸島 — 那覇から日帰り可能、世界が認めた「ケラマブルー」、慶留間島・座間味島・渡嘉敷島",
        "首里城跡(那覇) — 琉球王国の王宮、2019年火災後の再建工事中、守礼門は元通りの姿",
        "万座毛・残波岬 — 本島中部西海岸の断崖、サンセットスポット、東シナ海の雄大な景観",
      ],
      en: [
        "Yonaha Maehama Beach (Miyakojima) — 7 km of «Asia's whitest sand»; among the world's clearest waters, with the 3,540 m Irabu Bridge nearby",
        "Yaeyama Islands (Ishigaki, Iriomote, Taketomi) — Iriomote's primeval mangroves, Taketomi's red-tile-roofed white-sand villages, and the «star sand» beaches",
        "Kerama Islands — day-trippable from Naha, internationally recognized «Kerama Blue,» including Geruma, Zamami, and Tokashiki Islands",
        "Shurijo Castle Ruins (Naha) — royal palace of the Ryukyu Kingdom, currently rebuilding after the 2019 fire; the Shureimon gate is fully restored",
        "Manzamo Cliff & Cape Zanpa — west coast cliffs in central Okinawa, prime sunset spots over the East China Sea",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "沖縄県とは?", a: "日本最南端の亜熱帯県、47もの有人離島から成ります。1429〜1879年は独立国「琉球王国」だった独自の歴史を持ち、エメラルドグリーンの海・サンゴ礁・白砂のビーチで本土とは異質の風景が広がります。" },
        { q: "宮古島のベストシーズンは?", a: "5〜9月の海の透明度が最高(特に7〜8月)。9月は台風シーズンで要注意。12〜2月は涼しく観光地が空いていますがマリン活動は限定的。10月・4月の梅雨明け前後が混雑回避のベストです。" },
        { q: "透明な海を撮るベストタイム?", a: "太陽が高い午前10時〜午後2時が海底まで光が入り、最もエメラルドグリーンに映ります。PLフィルター必携で水面反射を抑制すると色が深まる。曇天では青の発色が極端に弱まるため晴天が必須条件。" },
      ],
      en: [
        { q: "What is Okinawa Prefecture?", a: "Japan's southernmost subtropical prefecture, made up of 47 inhabited islands. Independent as the «Ryukyu Kingdom» from 1429 to 1879, it developed a distinct culture and offers emerald seas, coral reefs, and white sand entirely unlike mainland Japan." },
        { q: "Best season for Miyakojima?", a: "May to September for water clarity (especially July–August). September is typhoon season — watch warnings. December to February is cool and uncrowded but with limited marine activities. October and April (around the end of the rainy season) avoid crowds best." },
        { q: "Best time of day for clear sea shots?", a: "10 AM to 2 PM, when the sun is high and light penetrates to the seabed, produces the strongest emerald green. A polarizing filter is essential to reduce surface glare. Clear skies are required — overcast skies severely flatten the blue." },
      ],
    },
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
