/**
 * Location-level localized content. ja/en/zh/zh-tw/ko populated; others fall back to en.
 * A14 (definition/highlights/quickAnswers) starts ja+en first, other langs follow.
 */
const d = (ja, en, zh, zhtw, ko) => ({ ja, en, zh, "zh-tw": zhtw, ko });
const lh = (ja, en) => ({ ja, en });

export const LOCATION_CONTENT = {
  /* ── 北海道 ── */
  "知床": {
    desc: d(
      "知床半島はオホーツク海に突き出た世界自然遺産。ヒグマやシマフクロウが棲む原生林、冬の流氷、夏のカムイワッカの滝など手付かずの自然が残ります。観光船からしか見られない断崖絶壁の海岸線は圧巻。",
      "The Shiretoko Peninsula, a UNESCO World Natural Heritage site, juts into the Sea of Okhotsk. Primeval forests home to brown bears and Blakiston's fish owls, winter drift ice, and summer's Kamuiwakka Falls remain untouched. The sheer cliff coastline visible only from sightseeing boats is breathtaking.",
      "知床半岛是世界自然遗产，突入鄂霍次克海。生活着棕熊与毛脚渔鸮的原始森林、冬季流冰、夏季神威瀑布等原始自然保留完好。只能从观光船看到的绝壁海岸线震撼人心。",
      "知床半島是世界自然遺產，突入鄂霍次克海。棲息棕熊與毛腳魚鴞的原始森林、冬季流冰、夏季神威瀑布等原始自然保留完好。只能從觀光船見到的絕壁海岸線震撼人心。",
      "시레토코 반도는 오호츠크해로 돌출된 세계자연유산. 불곰과 시마후쿠로가 사는 원시림, 겨울 유빙, 여름 가무이왓카 폭포 등 손대지 않은 자연이 남아 있습니다. 관광선에서만 볼 수 있는 절벽 해안선은 압권."
    ),
    definition: {
      ja: "知床(しれとこ)は北海道東部、オホーツク海と根室海峡に挟まれた長さ約65kmの半島で、2005年に「知床」としてユネスコ世界自然遺産登録。アイヌ語の「シリエトク(地の果て)」に由来する名の通り、原生林・流氷・絶壁・滝・ヒグマ・シマフクロウなど北半球で最も南に到達する流氷帯と高密度のヒグマ生息地を併せ持つ稀有な生態系。冬は流氷ウォーク、夏は知床五湖や観光船からの絶壁海岸線、知床岬まで陸路では行けない秘境性が、地球の最果ての風景を求める写真家の最終目的地となっています。",
      en: "Shiretoko is a peninsula about 65 km long in eastern Hokkaido, between the Sea of Okhotsk and the Nemuro Strait, registered as a UNESCO World Natural Heritage Site in 2005. The name derives from the Ainu «Sir-etok» («the end of the earth»), and it lives up to that meaning: primeval forests, drift ice, sheer cliffs, waterfalls, brown bears, and Blakiston's fish owls combine in the most southerly extent of the Northern Hemisphere's drift ice and one of the world's densest brown bear habitats. Winter offers drift-ice walks; summer reveals the Shiretoko Five Lakes and cliff coastlines visible only from sightseeing boats; Cape Shiretoko itself remains unreachable by road — a final pilgrimage for photographers seeking edge-of-the-earth landscapes.",
      zh: "知床是北海道东部，鄂霍次克海与根室海峡之间长约65公里的半岛，2005年作为「知床」登录联合国教科文组织世界自然遗产。名字源自阿伊努语「シリエトク(大地尽头)」，原始林、流冰、绝壁、瀑布、棕熊、毛脚渔鸮等汇聚——北半球最南的流冰带与高密度棕熊栖息地兼有的稀有生态系统。冬有流冰漫步，夏有知床五湖与观光船看绝壁海岸，知床岬陆路不可达的秘境性，使其成为追求地球尽头风景的摄影师终极目的地。",
      "zh-tw": "知床是北海道東部，鄂霍次克海與根室海峽之間長約65公里的半島，2005年作為「知床」登錄聯合國教科文組織世界自然遺產。名字源自愛努語「シリエトク(大地盡頭)」，原始林、流冰、絕壁、瀑布、棕熊、毛腳魚鴞等匯聚——北半球最南的流冰帶與高密度棕熊棲息地兼有的稀有生態系統。冬有流冰漫步，夏有知床五湖與觀光船看絕壁海岸，知床岬陸路不可達的秘境性，使其成為追求地球盡頭風景的攝影師終極目的地。",
      ko: "시레토코는 홋카이도 동부, 오호츠크해와 네무로 해협 사이의 길이 약 65km의 반도로, 2005년 「시레토코」로서 유네스코 세계자연유산 등록. 아이누어의 「시리에토쿠(땅의 끝)」에서 유래한 이름대로 원시림·유빙·절벽·폭포·불곰·시마후쿠로 등 북반구에서 가장 남쪽까지 도달하는 유빙대와 고밀도 불곰 서식지를 함께 갖춘 희귀한 생태계. 겨울에는 유빙 워크, 여름에는 시레토코 5호와 관광선에서의 절벽 해안선, 시레토코 곶까지 육로로 갈 수 없는 비경성이 지구 끝 풍경을 찾는 사진가의 최종 목적지가 되고 있습니다.",
    },
    highlights: {
      ja: [
        "知床五湖 — 原始林に囲まれた5つの湖、高架木道で熊と遭遇せず散策可、湖面の知床連山リフレクション",
        "オホーツクの流氷 — 1月下旬〜3月上旬、世界最南端の流氷帯、流氷ウォークで氷の上を歩ける",
        "カムイワッカ湯の滝 — 温泉が流れる珍しい滝、夏季の沢登りで4の滝まで遡上可",
        "プユニ岬・夕陽台 — ウトロから車で5分、オホーツク海への日没とプユニ岬のシルエット",
        "観光船 — ウトロ港発の知床岬航路、断崖絶壁・滝・ヒグマ目撃、3.5時間コース",
      ],
      en: [
        "Shiretoko Five Lakes — five lakes ringed by primeval forest; raised boardwalks let you walk safely above bear country, with the Shiretoko range reflected in calm water",
        "Sea of Okhotsk drift ice — late January to early March, the most southerly drift-ice zone in the world; «drift-ice walks» let you stand on it",
        "Kamuiwakka Falls — a rare waterfall fed by hot springs; in summer, hike upstream to the fourth fall",
        "Cape Puyuni and Yuhi-dai — five minutes by car from Utoro; sunset over the Sea of Okhotsk silhouettes the cape",
        "Sightseeing boats — from Utoro Port to Cape Shiretoko, viewing cliffs, waterfalls, and brown bears on a 3.5-hour cruise",
      ],
      zh: [
        "知床五湖 — 原始林环绕的5个湖泊，高架木道可避熊散步，湖面映出知床连山",
        "鄂霍次克的流冰 — 1月下旬~3月上旬，世界最南端流冰带，流冰漫步可在冰上行走",
        "神威胁瀑布 — 温泉流淌的珍贵瀑布，夏季可溯溪至第四瀑布",
        "Puyuni岬·夕阳台 — 距宇登吕5分钟车程，鄂霍次克海日落与岬角剪影",
        "观光船 — 宇登吕港发知床岬航线，绝壁·瀑布·棕熊目击，3.5小时航程",
      ],
      "zh-tw": [
        "知床五湖 — 原始林環繞的5個湖泊，高架木道可避熊散步，湖面映出知床連山",
        "鄂霍次克的流冰 — 1月下旬~3月上旬，世界最南端流冰帶，流冰漫步可在冰上行走",
        "神威脅瀑布 — 溫泉流淌的珍貴瀑布，夏季可溯溪至第四瀑布",
        "Puyuni岬·夕陽台 — 距宇登呂5分鐘車程，鄂霍次克海日落與岬角剪影",
        "觀光船 — 宇登呂港發知床岬航線，絕壁·瀑布·棕熊目擊，3.5小時航程",
      ],
      ko: [
        "시레토코 5호 — 원시림에 둘러싸인 5개의 호수, 고가 목도로 곰과 마주치지 않고 산책 가능, 호수면에 비치는 시레토코 연봉",
        "오호츠크의 유빙 — 1월 하순~3월 상순, 세계 최남단 유빙대, 유빙 워크로 얼음 위를 걸을 수 있다",
        "카무이왓카 유노타키 — 온천이 흐르는 진귀한 폭포, 여름철 계곡 등반으로 제4폭포까지 거슬러 오를 수 있다",
        "푸유니 곶·유히다이 — 우토로에서 차로 5분, 오호츠크해의 일몰과 푸유니 곶의 실루엣",
        "관광선 — 우토로 항 발 시레토코 곶 항로, 절벽·폭포·불곰 목격, 3.5시간 코스",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "知床とは?", a: "北海道東部の長さ約65kmの半島で、2005年世界自然遺産登録。アイヌ語「地の果て」由来、流氷・原生林・ヒグマ・絶壁が織りなす北半球最南の流氷帯と高密度のヒグマ生息地を併せ持つ稀有な生態系の聖地です。" },
        { q: "知床へのアクセスは?", a: "女満別空港からバスで約2時間のウトロ温泉が拠点。冬期は流氷観光、夏期はクルーズ船・五湖散策が定番。札幌からは車で約7時間、レンタカー推奨です。" },
        { q: "撮影ベストシーズンは?", a: "1月下旬〜3月上旬の流氷期(最も人気)、6月の新緑、9〜10月の紅葉と五湖のリフレクションが三大シーズン。冬の流氷ウォークは予約必須、流氷の状態は年により変動します。" },
        { q: "ヒグマに遭遇したら?", a: "知床のヒグマ密度は世界トップクラス。出会ったら走らず・背を向けず、ゆっくり後退する。匂いの強い食料は密閉、ゴミは持ち帰り。撮影目的でも近づかない(20m以上保つ)。レンジャーが定期的にパトロールする「五湖高架木道」は熊と遭わずに散策可能です。" },
        { q: "知床岬まで行く方法は?", a: "陸路では行けない秘境。ウトロ港または羅臼港発の観光船(クルーズ)で海上から見るのみ。所要3.5時間〜5時間。冬は流氷で運休するため5月〜10月限定。希少なヒグマ・シャチ・イルカの目撃機会もあり。" },
        { q: "流氷ウォークとは?", a: "ドライスーツを着てオホーツク海の流氷の上を歩く2〜3時間のアクティビティ。1月下旬〜3月上旬限定、知床ネイチャーオフィス等で予約。流氷下に潜ることもでき、撮影目的なら防水ハウジング必須です。" },
      ],
      en: [
        { q: "What is Shiretoko?", a: "A 65 km peninsula in eastern Hokkaido, registered as a UNESCO World Natural Heritage Site in 2005. From the Ainu for «end of the earth,» it combines drift ice, primeval forest, brown bears, and sheer cliffs in the Northern Hemisphere's most southerly drift-ice zone — a rare ecological sanctuary." },
        { q: "How do I access Shiretoko?", a: "Fly into Memanbetsu Airport; Utoro Onsen (2 hours by bus) is the gateway. Drift-ice tours in winter, cruises and Five Lakes hiking in summer. About 7 hours by car from Sapporo — a rental car is strongly recommended." },
        { q: "When is the best season to photograph it?", a: "Late January to early March for drift ice (most popular), June for fresh greenery, September–October for autumn colors and Five Lakes reflections. Drift-ice walks require reservations; ice conditions vary year to year." },
        { q: "What if I encounter a brown bear?", a: "Shiretoko has one of the world's highest brown-bear densities. Don't run, don't turn your back — slowly retreat. Seal strong-smelling food and pack out all trash. Stay 20m+ away even for photos. The Shiretoko Five Lakes raised boardwalk lets you walk through bear country without encounters, with rangers patrolling." },
        { q: "How do I reach Cape Shiretoko?", a: "There are no roads. Sightseeing boats from Utoro or Rausu ports are the only way to see it (3.5–5 hr). Closed in winter due to drift ice — May–October only. Rare brown bear, orca, and dolphin sightings make the trip rewarding." },
        { q: "What is a «drift-ice walk»?", a: "A 2–3 hour activity walking on the Sea of Okhotsk's drift ice in a dry suit. Late January to early March only; book through Shiretoko Nature Office or similar. You can even submerge under the ice — for photography, a waterproof housing is essential." },
      ],
      zh: [
        { q: "知床是什么?", a: "北海道东部长约65公里的半岛，2005年世界自然遗产登录。源自阿伊努语「大地尽头」，流冰·原始林·棕熊·绝壁汇聚的北半球最南流冰带与高密度棕熊栖息地兼有的稀有生态系统圣地。" },
        { q: "知床怎么去?", a: "女满别机场乘巴士约2小时至宇登吕温泉为基地。冬期流冰观光，夏期游船·五湖散步为定番。札幌驾车约7小时，建议自驾。" },
        { q: "拍摄最佳季节?", a: "1月下旬~3月上旬流冰期(最受欢迎)、6月新绿、9~10月红叶与五湖倒影为三大季节。冬季流冰漫步需预约，流冰状态因年而变。" },
        { q: "遇到棕熊怎么办?", a: "知床棕熊密度世界顶级。遇到时勿跑·勿背向·缓慢后退。气味浓食物密封，垃圾带走。即使拍摄也勿靠近(保持20米以上)。「五湖高架木道」由护林员定期巡逻，可避熊散步。" },
        { q: "如何到知床岬?", a: "陆路不可达的秘境。仅可乘宇登吕港或罗臼港发观光船(游船)从海上观赏。所需3.5~5小时。冬季因流冰停航，5~10月限定。可见稀有棕熊·虎鲸·海豚。" },
        { q: "流冰漫步是什么?", a: "穿干式潜水服在鄂霍次克海流冰上行走的2~3小时活动。1月下旬~3月上旬限定，知床自然办公室等可预约。可潜入流冰下，拍摄需防水外壳。" },
      ],
      "zh-tw": [
        { q: "知床是什麼?", a: "北海道東部長約65公里的半島，2005年世界自然遺產登錄。源自愛努語「大地盡頭」，流冰·原始林·棕熊·絕壁匯聚的北半球最南流冰帶與高密度棕熊棲息地兼有的稀有生態系統聖地。" },
        { q: "知床怎麼去?", a: "女滿別機場搭巴士約2小時至宇登呂溫泉為基地。冬期流冰觀光，夏期遊船·五湖散步為定番。札幌駕車約7小時，建議自駕。" },
        { q: "拍攝最佳季節?", a: "1月下旬~3月上旬流冰期(最受歡迎)、6月新綠、9~10月紅葉與五湖倒影為三大季節。冬季流冰漫步需預約，流冰狀態因年而變。" },
        { q: "遇到棕熊怎麼辦?", a: "知床棕熊密度世界頂級。遇到時勿跑·勿背向·緩慢後退。氣味濃食物密封，垃圾帶走。即使拍攝也勿靠近(保持20米以上)。「五湖高架木道」由護林員定期巡邏，可避熊散步。" },
        { q: "如何到知床岬?", a: "陸路不可達的秘境。僅可搭宇登呂港或羅臼港發觀光船(遊船)從海上觀賞。所需3.5~5小時。冬季因流冰停航，5~10月限定。可見稀有棕熊·虎鯨·海豚。" },
        { q: "流冰漫步是什麼?", a: "穿乾式潛水服在鄂霍次克海流冰上行走的2~3小時活動。1月下旬~3月上旬限定，知床自然辦公室等可預約。可潛入流冰下，拍攝需防水外殼。" },
      ],
      ko: [
        { q: "시레토코란?", a: "홋카이도 동부의 길이 약 65km의 반도로, 2005년 세계자연유산 등록. 아이누어 「땅의 끝」에서 유래, 유빙·원시림·불곰·절벽이 어우러지는 북반구 최남단 유빙대와 고밀도 불곰 서식지를 함께 갖춘 희귀한 생태계의 성지입니다." },
        { q: "시레토코 가는 법은?", a: "메만베쓰 공항에서 버스로 약 2시간 우토로 온천이 거점. 겨울철은 유빙 관광, 여름철은 크루즈선·5호 산책이 정석. 삿포로에서 차로 약 7시간, 렌터카 추천입니다." },
        { q: "촬영 베스트 시즌은?", a: "1월 하순~3월 상순의 유빙기(가장 인기), 6월 신록, 9~10월 단풍과 5호의 반영이 3대 시즌. 겨울 유빙 워크는 예약 필수, 유빙 상태는 해마다 변동합니다." },
        { q: "불곰을 만나면?", a: "시레토코의 불곰 밀도는 세계 톱 클래스. 만나도 달리지 말고·등 돌리지 말고·천천히 후퇴. 냄새 강한 식료품은 밀폐, 쓰레기는 가지고 돌아간다. 촬영 목적이라도 가까이 가지 않기(20m 이상 유지). 레인저가 정기 순찰하는 「5호 고가 목도」는 곰과 마주치지 않고 산책 가능합니다." },
        { q: "시레토코 곶까지 가는 방법은?", a: "육로로는 갈 수 없는 비경. 우토로 항 또는 라우스 항 발 관광선(크루즈)으로 해상에서 보는 것뿐. 소요 3.5시간~5시간. 겨울은 유빙으로 휴항하므로 5월~10월 한정. 희귀한 불곰·범고래·돌고래 목격 기회도 있습니다." },
        { q: "유빙 워크란?", a: "드라이슈트를 입고 오호츠크해의 유빙 위를 걷는 2~3시간의 액티비티. 1월 하순~3월 상순 한정, 시레토코 네이처 오피스 등에서 예약. 유빙 아래로 잠수도 가능, 촬영 목적이라면 방수 하우징 필수입니다." },
      ],
    },
    faqs: [
      { q: d("知床へのアクセスは？","How do I access Shiretoko?","知床怎么去？","知床怎麼去？","시레토코 가는 법은?"),
        a: d("女満別空港からバスで約2時間のウトロ温泉が拠点。冬期は流氷観光、夏期はクルーズ船・五湖散策が定番。","Fly to Memanbetsu Airport; Utoro Onsen (2 hrs by bus) is the gateway. Drift-ice tours in winter, sightseeing cruises and Shiretoko Five Lakes walks in summer.","飞抵女满别机场后乘巴士2小时至宇登吕温泉。冬季流冰观光，夏季游船与知床五湖散步为主。","飛抵女滿別機場後乘巴士2小時至宇登呂溫泉。冬季流冰觀光，夏季遊船與知床五湖散步為主。","메만베쓰 공항에서 버스로 약 2시간 우토로 온천이 거점. 겨울 유빙 관광, 여름 유람선·시레토코 5호 산책이 정석.") },
    ],
  },
  "札幌": {
    desc: d(
      "札幌は北海道の中心都市。大通公園、すすきの、札幌時計台、北海道庁旧本庁舎（赤れんが）など近代都市と雪国情緒が共存。藻岩山山頂からの夜景は日本新三大夜景の一つ。",
      "Sapporo, Hokkaido's capital, balances modern city life with northern charm. Odori Park, Susukino, the Sapporo Clock Tower, and the Red Brick Former Prefectural Office coexist. The night view from Mt. Moiwa ranks among Japan's New Three Great Night Views.",
      "札幌是北海道中心城市。大通公园、薄野、札幌时计台、北海道厅旧本厅舍（红砖）等现代都市与雪国风情并存。藻岩山山顶夜景为日本新三大夜景之一。",
      "札幌是北海道中心城市。大通公園、薄野、札幌時計台、北海道廳舊本廳舍（紅磚）等現代都市與雪國風情並存。藻岩山山頂夜景為日本新三大夜景之一。",
      "삿포로는 홋카이도의 중심 도시. 오도리 공원, 스스키노, 삿포로 시계탑, 홋카이도청 구본청사(빨간 벽돌) 등 현대 도시와 설국 정서가 공존. 모이와산 정상의 야경은 일본 신 3대 야경 중 하나."
    ),
    definition: lh(
      "札幌(さっぽろ)は北海道の道庁所在地で、人口約197万人の北海道最大の都市、政令指定都市。アイヌ語「サッ・ポロ・ペッ(乾いた大きな川)」由来、1869年(明治2年)に開拓使が置かれ計画的な碁盤の目状の都市設計で発展した若い都市。象徴的なランドマークとして大通公園(全長1.5km)、札幌時計台(1878年築、現存最古の時計台)、北海道庁旧本庁舎「赤れんが」(1888年築)、藻岩山(531m、新日本三大夜景)、すすきの歓楽街、JRタワー展望室など、雪国の都市景観と近代建築が共存する、日本でも稀有な都市撮影地です。",
      "Sapporo, the capital of Hokkaido and Japan's fifth-largest city with about 1.97 million residents, is a designated «government ordinance city.» The name comes from the Ainu «Sat-Poro-Pet» («the dry large river»). Established in 1869 (Meiji 2) as the seat of the Hokkaido Development Commission, it grew on a planned grid pattern as one of Japan's youngest major cities. Iconic landmarks include the 1.5 km Odori Park, the Sapporo Clock Tower (built 1878, Japan's oldest surviving clock tower), the Red Brick Former Hokkaido Government Building (1888), Mt. Moiwa (531 m, one of Japan's New Three Great Night Views), the Susukino entertainment district, and the JR Tower observatory — a rare combination of snow-country urban landscape and modern architecture."
    ),
    highlights: {
      ja: [
        "藻岩山(もいわやま) — 531m、新日本三大夜景の一つ、ロープウェイで山頂、ハート型の街灯と札幌全景",
        "大通公園 — 全長1.5kmの帯状公園、2月雪まつり、5月ライラックまつり、12月ホワイトイルミネーション",
        "札幌時計台 — 1878年築、日本最古の時計台、米国製の機械式振り子時計、明治洋風建築",
        "北海道庁旧本庁舎(赤れんが庁舎) — 1888年築、ネオバロック様式、紅葉の銀杏並木との組合せ",
        "JRタワー展望室T38 — 地上160m、北海道最高の展望台、360度パノラマ夜景",
      ],
      en: [
        "Mt. Moiwa — 531 m, one of Japan's New Three Great Night Views; reach the summit by ropeway for heart-shaped lights and full Sapporo panorama",
        "Odori Park — 1.5 km of belt-shaped park hosting the February Snow Festival, May Lilac Festival, and December White Illumination",
        "Sapporo Clock Tower — built 1878, Japan's oldest surviving clock tower; the American-made pendulum still keeps time, embodying Meiji Western architecture",
        "Red Brick Former Hokkaido Government Building — built 1888 in Neo-Baroque style; pairs beautifully with the autumn ginkgo avenue",
        "JR Tower Observatory T38 — 160 m above ground, Hokkaido's highest observation deck, 360° panoramic nightscape",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "札幌とは?", a: "北海道の道庁所在地、人口約197万人の北海道最大都市。1869年に開拓使が置かれた若い計画都市で、藻岩山の新日本三大夜景、大通公園、札幌時計台、赤れんが庁舎など雪国都市と近代建築が共存する撮影地です。" },
        { q: "札幌市内観光に最適な時期は?", a: "2月さっぽろ雪まつり、6月ライラックまつり、10月の紅葉、12月ホワイトイルミネーション、年間通して表情が変わる。冬の方が空気が澄み夜景がより鮮明、夏は緑が美しい。" },
        { q: "夜景撮影のベストポイントは?", a: "藻岩山(新日本三大夜景、ロープウェイで山頂、ハート型の街灯)、JRタワー展望室T38(160m最高)、テレビ塔、旭山記念公園(穴場)。日没30分後のブルーアワーが空と街の光のバランスがベスト。" },
        { q: "札幌へのアクセスは?", a: "新千歳空港から快速エアポートで37分・1,150円。羽田から新千歳まで約1時間30分・直行便多数。札幌駅は地下鉄南北線・東西線・東豊線の交差点で市内移動も便利。雪まつり期間は宿泊予約が半年前から埋まるため早期確保を。" },
        { q: "藻岩山への登り方は?", a: "ロープウェイ+ミニケーブルカーで往復2,100円(20分間隔運行)。21:30最終運行のため夜景撮影は20:00頃登山推奨。車・タクシーで山麓まで5分、夏場はハイキングコース(約1時間)も。山頂展望台は屋内外あり、極寒冬期も安心。" },
        { q: "札幌の冬の防寒対策は?", a: "12〜2月は最高気温-3℃〜0℃、最低-15℃以下の日も。ダウン・防水ブーツ必須、地下街(ポールタウン・オーロラタウン)を活用すれば屋外時間最小化可能。カメラは結露防止のためビニール袋で密閉してから屋内へ。三脚も金属が冷たすぎるため手袋必携。" },
      ],
      en: [
        { q: "What is Sapporo?", a: "The capital of Hokkaido, Japan's fifth-largest city with about 1.97 million residents. Founded in 1869 as a planned grid-pattern city, it features Mt. Moiwa's New Three Great Night Views, Odori Park, the Sapporo Clock Tower, and the Red Brick Building — combining snow-country urbanity and modern architecture." },
        { q: "Best time to visit central Sapporo?", a: "February Snow Festival, June Lilac Festival, October foliage, December White Illumination — the city changes face year-round. Winter clarity sharpens nightscapes; summer brings vibrant green." },
        { q: "Best spots for night photography?", a: "Mt. Moiwa (one of Japan's New Three Great Night Views, ropeway to summit, heart-shaped lights), JR Tower T38 (Hokkaido's tallest at 160 m), TV Tower, Asahiyama Memorial Park (less crowded). Blue hour (30 min after sunset) is best for sky-and-city light balance." },
        { q: "How do I get to Sapporo?", a: "From New Chitose Airport, the JR Rapid Airport takes 37 min, ¥1,150. From Haneda to New Chitose is ~1hr 30min with frequent direct flights. Sapporo Station is the intersection of Namboku, Tozai, and Toho subway lines for easy city travel. Snow Festival hotels book up 6+ months ahead — reserve early." },
        { q: "How do I reach Mt. Moiwa?", a: "Ropeway + mini-cable car round trip ¥2,100 (20-min intervals). Last service 21:30, so plan a 20:00 ascent for night photography. Reach the base by car or taxi in 5 min; summer offers a 1-hour hiking trail. The summit has both indoor and outdoor decks — comfortable even in deep winter." },
        { q: "How should I dress for winter in Sapporo?", a: "December–February typical highs are -3 to 0°C, with lows below -15°C on some days. Down jackets and waterproof boots are essential. The underground passages (Pole Town, Aurora Town) minimize outdoor time. Prevent camera condensation by sealing in a plastic bag before entering warm spaces. Tripod metal gets too cold — bring gloves." },
      ],
    },
    faqs: [
      { q: d("札幌市内観光に最適な時期は？","Best time to visit central Sapporo?","札幌市内观光最佳时期？","札幌市內觀光最佳時期？","삿포로 시내 관광 최적기는?"),
        a: d("2月さっぽろ雪まつり、6月ライラックまつり、10月紅葉、12月ホワイトイルミネーション。年間通して表情が変わる。","February (Snow Festival), June (Lilac Festival), October (foliage), December (White Illumination). The city changes face year-round.","2月雪祭、6月紫丁香节、10月红叶、12月白色灯饰节。四季表情各异。","2月雪祭、6月紫丁香節、10月紅葉、12月白色燈飾節。四季表情各異。","2월 눈축제, 6월 라일락 축제, 10월 단풍, 12월 화이트 일루미네이션. 연중 표정이 다양합니다.") },
    ],
  },
  "さっぽろ雪まつり": {
    desc: d(
      "毎年2月初旬、大通公園を中心に開催される日本最大級の雪像イベント。15mを超える巨大雪像、市民雪像、氷彫刻、夜のライトアップが見どころ。200万人以上が訪れる世界的祭典です。",
      "Held in early February in Odori Park, the Sapporo Snow Festival is Japan's largest ice-and-snow event. Massive 15m+ snow sculptures, citizen-built sculptures, ice carvings, and nighttime illumination draw over 2 million visitors each year.",
      "每年2月上旬在大通公园举办的日本最大级雪像盛会。超过15米的巨型雪像、市民雪像、冰雕、夜间灯光秀是亮点。每年吸引超过200万游客。",
      "每年2月上旬在大通公園舉辦的日本最大級雪像盛會。超過15米的巨型雪像、市民雪像、冰雕、夜間燈光秀是亮點。每年吸引超過200萬遊客。",
      "매년 2월 초 오도리 공원을 중심으로 개최되는 일본 최대급 눈 축제. 15m를 넘는 거대 눈조각, 시민 조각, 얼음 조각, 야간 조명이 볼거리. 200만 명 이상이 방문합니다."
    ),
    definition: lh(
      "さっぽろ雪まつり(さっぽろゆきまつり)は毎年2月初旬の約1週間、北海道札幌市中央区の大通公園・すすきの会場・つどーむ会場の3会場で開催される日本最大規模の冬のイベントで、1950年地元の中・高校生6人が大通公園に6基の雪像を作ったことから始まりました。現在は国内外から200万人以上が訪れる世界的祭典で、自衛隊が制作する高さ15m超の巨大雪像、市民雪像、国際雪像コンクール、氷彫刻、夜のプロジェクションマッピング、つどーむのスノーアクティビティまで、北の都市が一週間「雪の芸術都市」に変身します。",
      "The Sapporo Snow Festival is held over about a week in early February each year across three Sapporo venues — Odori Park, Susukino, and Tsudome — and is Japan's largest winter event. It began in 1950 when six local middle and high school students built six snow sculptures in Odori Park; today it draws over 2 million visitors from around the world. Highlights include massive snow sculptures over 15 m built by the Japan Self-Defense Forces, citizen-made sculptures, the International Snow Sculpture Contest, ice carvings, evening projection mapping, and the snow activities at the Tsudome venue, transforming northern Sapporo into a «city of snow art» for one full week."
    ),
    highlights: {
      ja: [
        "大通会場(自衛隊大雪像) — 高さ15m級、隊員が約1か月かけて制作、国内外の名所がモチーフ",
        "国際雪像コンクール — 11カ国・地域が参加、3日間で雪像を完成させる職人の技",
        "夜のプロジェクションマッピング — 18時〜22時、巨大雪像にダイナミックな光と音楽",
        "つどーむ会場 — 体験型雪まつり、雪のすべり台、ふぶき体験、家族連れに人気",
        "すすきの氷の祭典 — 国際的な氷彫刻家による精巧な氷像、夜のライトアップが幻想的",
      ],
      en: [
        "Odori Site (JSDF Sculptures) — over 15 m tall, taking the Self-Defense Forces about a month to build, modeled on famous landmarks worldwide",
        "International Snow Sculpture Contest — 11 countries and regions compete, completing sculptures in three days",
        "Evening Projection Mapping — 18:00–22:00, with dynamic light and music projected onto the giant sculptures",
        "Tsudome Venue — interactive snow festival with slides and blizzard experiences, popular with families",
        "Susukino Ice Festival — finely crafted ice sculptures by international artists, magically illuminated at night",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "さっぽろ雪まつりとは?", a: "毎年2月初旬の約1週間、札幌市の大通公園・すすきの・つどーむの3会場で開催される日本最大の冬のイベント。1950年に学生6人で始まり、今や200万人以上が訪れる世界的祭典で、15m超の巨大雪像とライトアップが目玉です。" },
        { q: "撮影のベスト時間帯は?", a: "日没後〜21時のライトアップ時間帯が最も美しい。三脚+低ISOで雪の質感を残します。昼間は青空バックの構図も映えます。22時の消灯後は人がいない雪像を独占撮影できる隠れタイム。" },
        { q: "開催期間と場所は?", a: "毎年2月初旬の約1週間(2025年は2月4〜11日)。大通公園(西1丁目〜西12丁目)、すすきの、つどーむ(東区)の3会場。大通会場が中心で、最寄駅は札幌駅・大通駅。日没前後の混雑は最大級です。" },
        { q: "入場料は?", a: "全会場とも入場無料。つどーむ会場の有料アクティビティ(雪滑り台等)のみ別料金。プロジェクションマッピングや氷彫刻イベントも無料で観覧可。寄付や雪像支援グッズの購入で運営支援できます。" },
        { q: "三脚は使用可能?", a: "大通会場は混雑時三脚禁止のエリアあり、係員の指示に従う。すすきの会場(氷彫刻)は通行人の邪魔にならない範囲でOK。早朝開場時間外(深夜〜早朝)は雪像エリアに立入禁止のためその時間帯狙いは不可。手持ちでも十分撮れる明るいレンズと高ISOカメラを推奨。" },
        { q: "防寒対策は?", a: "札幌2月の最低気温は平均-7℃、夜間-15℃以下にもなる。屋外滞在は1〜2時間が限度。ヒートテック+セーター+ダウン+防水アウター、マフラー・耳当て・防水手袋が必須。スマホもバッテリー消耗が早く、予備バッテリーやモバイルバッテリーを内ポケットで保温。" },
      ],
      en: [
        { q: "What is the Sapporo Snow Festival?", a: "Japan's largest winter event, held over about a week in early February at three Sapporo venues (Odori Park, Susukino, Tsudome). Started in 1950 by six students, it now draws over 2 million visitors as a global festival, featuring snow sculptures over 15 m and stunning illuminations." },
        { q: "Best time to shoot the festival?", a: "Illumination from sunset to 21:00 is most photogenic — use a tripod and low ISO to preserve snow texture. Daytime works against blue skies. After lights-out at 22:00, you can photograph the sculptures uncrowded — a hidden window." },
        { q: "When and where is it held?", a: "About a week in early February each year (Feb 4–11 in 2025), at three venues: Odori Park (West 1 to West 12), Susukino, and Tsudome (Higashi Ward). Odori is the main site, accessed from Sapporo or Odori Stations. Crowds peak around sunset." },
        { q: "Is admission free?", a: "All venues are free. Only the paid activities at the Tsudome venue (snow slides, etc.) cost extra. Projection mapping and ice-sculpture events are also free. Donations and festival merchandise help support operations." },
        { q: "Can I use a tripod?", a: "Some areas at the Odori venue are tripod-restricted during peak crowds — follow staff direction. The Susukino ice-sculpture site allows tripods if you don't block walkways. Sculpture areas are off-limits late-night to early-morning, so that window isn't available. Bring a fast lens and high-ISO camera for handheld work." },
        { q: "What should I wear for the cold?", a: "Sapporo's February average lows are -7°C, with night temps below -15°C. Outdoor stays should stay 1–2 hours. Heat-tech base + sweater + down + waterproof shell, plus scarf, ear muffs, and waterproof gloves are essential. Phones drain fast — keep spare batteries and power banks in inner pockets." },
      ],
    },
    faqs: [
      { q: d("撮影のベスト時間帯は？","Best time to shoot the festival?","拍摄最佳时段？","拍攝最佳時段？","촬영 최적 시간대는?"),
        a: d("日没後〜21時のライトアップ時間帯が最も美しい。三脚＋低ISOで雪の質感を残す。昼間は青空バック構図も映える。","Illumination from sunset to 21:00 is most photogenic — use tripod and low ISO to retain snow texture. Daytime works with blue-sky backdrops.","日落后至21点的灯光时段最美，建议三脚架+低ISO保留雪质感。白天蓝天为背景也不错。","日落後至21點的燈光時段最美，建議三腳架+低ISO保留雪質感。白天藍天為背景也不錯。","일몰 후~21시 조명 시간대가 가장 아름답습니다. 삼각대+저ISO로 눈의 질감을 살려주세요. 낮에는 파란 하늘을 배경으로도 좋습니다.") },
    ],
  },
  "小樽": {
    desc: d(
      "小樽運河と石造倉庫群はノスタルジックな港町の象徴。ガス灯が灯る夜の運河、雪景色の倉庫、ガラス工芸の街並みが絵になります。札幌から電車で40分の気軽な撮影旅。",
      "Otaru Canal and its stone warehouses embody the nostalgic port town. Gas-lit canal views at night, snow-capped warehouses, and streets lined with glasscraft shops make for cinematic frames. Just 40 minutes by train from Sapporo.",
      "小樽运河与石造仓库群是怀旧港城象征。煤气灯下的夜间运河、雪景仓库、玻璃工艺街区都极具画面感。距札幌40分钟电车车程。",
      "小樽運河與石造倉庫群是懷舊港城象徵。煤氣燈下的夜間運河、雪景倉庫、玻璃工藝街區都極具畫面感。距札幌40分鐘電車車程。",
      "오타루 운하와 석조 창고군은 노스탤직한 항구 도시의 상징. 가스등이 밝혀진 야간 운하, 설경의 창고, 유리 공예 거리가 그림 같습니다. 삿포로에서 전철 40분."
    ),
    definition: lh(
      "小樽(おたる)は北海道後志総合振興局管内の市で、人口約11万人の港湾都市。明治・大正期に北海道の物流拠点として栄え、銀行・商社が立ち並ぶ「北のウォール街」と称されました。中心の小樽運河(全長1,140m、1923年完成)は、海上輸送と倉庫を結ぶために造られたが、1986年から散策路として整備、石造倉庫群と63基のガス灯がノスタルジックな夜景を生み出します。札幌から快速で約30分の至近距離で、ガラス工芸(北一硝子)、オルゴール堂、寿司・海鮮グルメ、にしん御殿、天狗山ロープウェイの夜景まで、半日〜1日で巡れる港町撮影地です。",
      "Otaru, in the Shiribeshi General Subprefectural Bureau of Hokkaido, is a port city of about 110,000 residents. It flourished as Hokkaido's logistics hub during the Meiji and Taisho eras, lined with banks and trading houses to the point of being called «the Wall Street of the North.» The 1,140 m Otaru Canal (completed 1923) was built to link sea transport and warehousing, but since 1986 has been redeveloped as a promenade where stone warehouses and 63 gas lamps create a nostalgic night view. About 30 minutes by rapid train from Sapporo, it offers glasswork (Kitaichi Glass), the Music Box Museum, sushi and seafood, the Nishin Goten herring mansion, and the night view from the Mt. Tengu ropeway — all within a half- to full-day photographic itinerary."
    ),
    highlights: {
      ja: [
        "小樽運河 — 全長1,140m、1923年完成、63基のガス灯と石造倉庫群、青の時間帯〜夜景の聖地",
        "メルヘン交差点 — 蒸気時計、北一硝子、オルゴール堂が並ぶ観光中心地、雪降る冬は別世界",
        "天狗山ロープウェイ — 標高532m、小樽と石狩湾の夜景、新日本三大夜景候補級",
        "堺町通り商店街 — 北のウォール街の旧銀行群、寿司・海鮮グルメ・ガラス工芸、雪歩きが楽しい",
        "祝津(しゅくつ)半島 — にしん御殿、青の洞窟ツアー、灯台、海岸線の絶景",
      ],
      en: [
        "Otaru Canal — 1,140 m completed in 1923, with 63 gas lamps and stone warehouses, a sacred ground for blue-hour and nightscapes",
        "Marchen Crossing — the steam clock, Kitaichi Glass, and the Music Box Museum cluster at the tourism center; in winter snow, otherworldly",
        "Mt. Tengu Ropeway — 532 m elevation, with the night view of Otaru and Ishikari Bay rivaling Japan's New Three Great Night Views",
        "Sakaimachi Street — former banks of the «Wall Street of the North,» plus sushi, seafood, and glasswork; magical to walk in falling snow",
        "Shukutsu Peninsula — the Nishin Goten herring mansion, the Blue Cave tour, lighthouses, and dramatic coastlines",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "小樽とは?", a: "北海道の港湾都市で、明治・大正期に「北のウォール街」と称された物流拠点。小樽運河と63基のガス灯、石造倉庫群が織りなすノスタルジックな夜景、ガラス工芸、北の海鮮グルメで札幌から30分の人気撮影地です。" },
        { q: "運河の撮影ベストスポットは?", a: "浅草橋と中央橋の中間地点。倉庫・運河・ガス灯が一枚に収まる構図が可能。夕暮れ〜夜の青い時間帯(日没後30分)が理想で、雪が降る冬の夜景は世界的にも稀有な被写体。" },
        { q: "ベストシーズンは?", a: "1〜2月の雪化粧した運河は世界的に有名な構図、6月のあじさい、10月の紅葉、ガラス工芸の街並みは通年。冬のキャンドルナイト(2月)は運河に小さな灯りが浮かぶ幻想的なイベント。" },
        { q: "アクセスは?", a: "札幌駅からJR函館本線快速エアポートで32分・640円。新千歳空港からは快速エアポートで小樽駅まで約75分・1,910円。小樽駅から運河は徒歩10分。タクシーやバスで天狗山ロープウェイ・祝津方面へも30分以内、レンタカーは冬の積雪・凍結に注意。" },
        { q: "雪あかりの路はいつ?", a: "毎年2月中旬の10日間限定。運河沿いと旧手宮線跡地で約30万個のキャンドル・スノーキャンドルが灯る幻想的なイベント。17:00〜21:00の点灯。雪まつり期間と重なることも多く、札幌+小樽の連泊撮影旅程が組みやすい。" },
        { q: "海鮮・グルメ撮影スポットは?", a: "三角市場(駅前、ウニ・カニ丼)、堺町通り(寿司屋通り20軒以上)、北一硝子三号館の北一ホール(167個の石油ランプの灯りでカフェ撮影)。築120年超のニシン御殿(祝津)では大正時代の暮らしが垣間見える。冬は店内の蒸気と外の雪のコントラストが絵になる。" },
      ],
      en: [
        { q: "What is Otaru?", a: "A port city in Hokkaido that flourished as a logistics hub in the Meiji and Taisho eras — once called «the Wall Street of the North.» The canal with 63 gas lamps and stone warehouses creates a nostalgic nightscape; with glasswork, seafood, and 30 minutes from Sapporo, it ranks among the region's top photography destinations." },
        { q: "Best photo spot along the canal?", a: "Midway between Asakusa Bridge and Chuo Bridge — warehouses, canal, and gas lamps fit in one frame. The blue hour (30 min after sunset) is ideal; the snowy winter canal is a world-class rare subject." },
        { q: "When is the best season to photograph?", a: "January–February's snow-clad canal is globally iconic; June for hydrangeas; October for autumn colors; glasswork streets year-round. The February «Otaru Snow Light Path» fills the canal with tiny candle flames — a magical limited-time event." },
        { q: "How do I get there?", a: "From Sapporo Station, JR Hakodate Line Rapid Airport takes 32 min, ¥640. From New Chitose Airport, the same Rapid Airport takes ~75 min to Otaru, ¥1,910. From Otaru Station to the canal is a 10-min walk. Taxis or buses reach Mt. Tengu ropeway and Shukutsu within 30 min. Rental cars require care for winter snow and ice." },
        { q: "When is the «Yuki Akari no Michi» festival?", a: "10 days each mid-February. About 300,000 candles and snow candles light the canal and old Temiya rail path — a magical event 17:00–21:00 daily. It often overlaps with the Sapporo Snow Festival, making a Sapporo+Otaru multi-day photography itinerary practical." },
        { q: "Where are the seafood and gourmet photo spots?", a: "Sankaku Market (in front of the station, sea urchin and crab bowls), Sakaimachi street (20+ sushi restaurants), and North 1 Hall in Kitaichi Glass House #3 (a café lit by 167 oil lamps — atmospheric interiors). The 120-year-old Nishin Goten in Shukutsu shows Taisho-era life. In winter, indoor steam against outdoor snow makes great frames." },
      ],
    },
    faqs: [
      { q: d("運河の撮影ベストスポットは？","Best photo spot along the canal?","运河最佳拍摄点？","運河最佳拍攝點？","운하 최고 촬영 포인트는?"),
        a: d("浅草橋と中央橋の中間地点。倉庫・運河・ガス灯が一枚に収まる構図が可能。夕暮れ〜夜の青い時間帯が理想。","Midway between Asakusa Bridge and Chuo Bridge — warehouses, canal, and gas lamps all fit in one frame. The blue hour just after sunset is ideal.","浅草桥与中央桥之间。仓库、运河、煤气灯可一并入镜。黄昏至蓝色时刻最佳。","淺草橋與中央橋之間。倉庫、運河、煤氣燈可一併入鏡。黃昏至藍色時刻最佳。","아사쿠사바시와 주오바시 중간 지점. 창고·운하·가스등을 한 프레임에 담을 수 있습니다. 블루아워가 이상적.") },
    ],
  },
  "洞爺湖": {
    desc: d(
      "洞爺湖は支笏洞爺国立公園のカルデラ湖。湖畔から羊蹄山を望み、2000年有珠山噴火跡、中島の自然、毎晩の花火大会（4〜10月）が人気。温泉街と湖畔の遊歩道からの撮影がおすすめ。",
      "Lake Toya, a caldera in Shikotsu-Toya National Park, offers views of Mt. Yotei across the water, traces of the 2000 Mt. Usu eruption, Nakajima island nature, and nightly summer fireworks (April–October). Shoot from the onsen town or lakeside promenade.",
      "洞爷湖是支笏洞爷国立公园的破火山口湖。湖畔眺望羊蹄山、2000年有珠山喷发遗迹、中岛自然、每晚烟火（4-10月）等。推荐从温泉街与湖畔步道拍摄。",
      "洞爺湖是支笏洞爺國立公園的破火山口湖。湖畔眺望羊蹄山、2000年有珠山噴發遺跡、中島自然、每晚煙火（4-10月）等。推薦從溫泉街與湖畔步道拍攝。",
      "도야호는 시코쓰도야 국립공원의 칼데라호. 호반에서 요테이산을 바라보고, 2000년 우스산 분화 흔적, 나카지마의 자연, 매일 밤 불꽃놀이(4-10월)가 인기. 온천가와 호반 산책로에서 촬영 추천."
    ),
    definition: lh(
      "洞爺湖(とうやこ)は北海道虻田郡洞爺湖町・壮瞥町にまたがるカルデラ湖で、面積70.7km²、最大水深180mの日本第3位の透明度を誇る湖。約11万年前の巨大噴火で形成され、湖の中央には4つの島(中島)が浮かびます。隣接する有珠山(737m)と昭和新山(398m)は今も活動を続ける活火山で、湖+山+温泉が一帯となった支笏洞爺国立公園の中核。2008年G8北海道洞爺湖サミット開催地としても知られ、4〜10月の毎晩開催される洞爺湖ロングラン花火大会(450発)は湖面に映る花火の絶景で日本でも屈指です。",
      "Lake Toya is a caldera lake spanning Toyako and Sobetsu in Abuta District, Hokkaido — 70.7 km² in area, 180 m at its deepest, with Japan's third-highest water clarity. Formed about 110,000 years ago by a massive eruption, four islands (Nakajima) float at the center of the lake. The neighboring Mt. Usu (737 m) and Showa-Shinzan (398 m) remain active, and the lake-mountain-onsen ensemble forms the heart of Shikotsu-Toya National Park. Known as the host of the 2008 G8 Hokkaido Toya Lake Summit, it also features the «Long-Run Fireworks» — 450 shots fired every night from April to October — whose reflection on the lake's surface ranks among Japan's finest spectacles."
    ),
    highlights: {
      ja: [
        "洞爺湖サミット記念展望台 — シレンビ岬山頂、湖と中島と羊蹄山(蝦夷富士)を一枚に俯瞰",
        "毎晩花火大会(4〜10月) — 20:45〜21:05、450発、世界一長期間の花火大会、湖面の倒影が必撮",
        "有珠山(うすざん) — 標高737mの活火山、ロープウェイで山頂、洞爺湖と内浦湾の壮大なパノラマ",
        "昭和新山 — 1944〜45年の噴火で出現した398mの新山、赤茶色の山肌が印象的、世界的にも珍しい",
        "中島(なかじま) — 湖中央の4つの島、フェリーで上陸、原生林とエゾシカの生息地",
      ],
      en: [
        "Toya Summit Memorial Observatory — atop Cape Shirenbi, capturing the lake, Nakajima, and Mt. Yotei («Ezo Fuji») in one frame",
        "Nightly Fireworks (April–October) — 20:45–21:05, 450 shots, the world's longest-running fireworks display; the reflection on the lake is essential",
        "Mt. Usu — a 737 m active volcano; a ropeway leads to the summit, offering grand views over Lake Toya and Uchiura Bay",
        "Showa-Shinzan — a 398 m «new mountain» that emerged in the 1944–45 eruption; its red-brown slopes are striking and globally rare",
        "Nakajima — four islands at the lake's center reachable by ferry, with primeval forest and Hokkaido sika deer",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "洞爺湖とは?", a: "北海道のカルデラ湖で面積70.7km²、日本第3位の透明度。11万年前の巨大噴火で形成、活火山の有珠山・昭和新山と一体の支笏洞爺国立公園の中核、2008年G8サミット開催地で、4〜10月の毎晩花火大会が名物です。" },
        { q: "花火撮影のコツは?", a: "三脚必須。ISO100・F8・シャッター4〜8秒バルブ。湖に映る花火も狙える湖畔の展望台がベスト。20:45開始、約20分間で450発。風がない日は湖面の倒影が完璧に映ります。" },
        { q: "アクセスとベストシーズンは?", a: "札幌から車で約2時間、JR洞爺駅からバスで20分。新千歳空港から車で約2時間。ベストは4〜10月の花火期、特に夏〜秋の湖面が穏やかな時期。冬の雪化粧した湖と火山も独特の美しさ。" },
        { q: "サミット記念展望台とは?", a: "シレンビ岬山頂(海抜625m)に位置し、洞爺湖・中島・羊蹄山(蝦夷富士)・有珠山を一望できる絶景ポイント。2008年G8サミット会場ザ・ウィンザーホテルの裏手で、24時間アクセス可、無料。雲海が出る朝霧の日(秋)は特に絶景。" },
        { q: "有珠山ロープウェイは?", a: "標高737mの有珠山山頂駅まで6分・往復1,800円。山頂からは洞爺湖・内浦湾・噴火湾の360度パノラマ。2000年の噴火痕跡(火口)も間近で見られる。冬期(11〜4月)は運休、夏期8:30〜18:00運行。" },
        { q: "温泉宿のおすすめは?", a: "「ザ・ウィンザーホテル洞爺リゾート&スパ」(サミット会場、湖を見下ろす最高級)、「洞爺サンパレス」(湖畔、屋外プール+花火打上席)、「ノーザンキー」(コスパ良)など。湖畔露天風呂+花火鑑賞は洞爺ならでは。日帰り入浴500〜1,500円で対応宿多数。" },
      ],
      en: [
        { q: "What is Lake Toya?", a: "A caldera lake in Hokkaido — 70.7 km² with Japan's third-highest water clarity, formed by a massive eruption 110,000 years ago. With the active volcanoes Mt. Usu and Showa-Shinzan, it forms the heart of Shikotsu-Toya National Park, hosted the 2008 G8 Summit, and is famous for nightly fireworks April through October." },
        { q: "Tips for shooting fireworks?", a: "Tripod required. ISO 100, f/8, 4–8s bulb exposure. The lakeside observation deck captures fireworks with their reflection. 450 shots in about 20 minutes from 20:45. On windless nights the reflection on the water is mirror-perfect." },
        { q: "Access and best season?", a: "About 2 hours by car from Sapporo, 20 minutes by bus from JR Toya Station, or 2 hours by car from New Chitose Airport. Best from April to October during fireworks season, especially summer–autumn when the lake is calm. Snow-clad lake and volcanoes in winter offer their own beauty." },
        { q: "What is the G8 Summit Memorial Observatory?", a: "On Cape Shirenbi (625 m elevation), with sweeping views of Lake Toya, Nakajima Islands, Mt. Yotei («Ezo Fuji»), and Mt. Usu. Behind the Windsor Hotel where the 2008 G8 was held; free, open 24 hours. Autumn morning sea-of-fog days are especially stunning." },
        { q: "Mt. Usu Ropeway?", a: "6-minute ride to the 737 m summit station; round trip ¥1,800. From the top, 360° panoramas of Lake Toya, Uchiura Bay, and Funka Bay. The 2000-eruption craters are visible up close. Closed in winter (Nov–Apr); summer hours 8:30–18:00." },
        { q: "Best onsen lodging?", a: "The Windsor Hotel Toya Resort & Spa (G8 venue, luxury views over the lake), Toya Sun Palace (lakeside with outdoor pool and fireworks-view seats), Northern Quay (good value), and others. The combination of lakeside open-air baths and fireworks is uniquely Toya. Many ryokan offer day-bath access ¥500–¥1,500." },
      ],
    },
    faqs: [
      { q: d("花火撮影のコツは？","Tips for shooting fireworks?","烟火拍摄技巧？","煙火拍攝技巧？","불꽃놀이 촬영 팁은?"),
        a: d("三脚必須。ISO100・F8・シャッター4〜8秒バルブ。湖に映る花火も狙える湖畔の展望台がベスト。","Tripod required. ISO 100, f/8, 4–8s bulb exposure. The lakeside observation deck captures fireworks with their reflection.","必备三脚架。ISO 100、F8、4-8秒B门。湖畔展望台可同时拍到花火与倒影。","必備三腳架。ISO 100、F8、4-8秒B門。湖畔展望台可同時拍到煙火與倒影。","삼각대 필수. ISO 100, F8, 4-8초 벌브. 호반 전망대에서 불꽃과 반영을 함께 담을 수 있습니다.") },
    ],
  },
  "富良野": {
    desc: d(
      "富良野は北海道中央部の大地、ファーム富田を中心にしたラベンダー畑で有名。7月中旬〜下旬が見頃で、紫の絨毯と青空のコントラストは日本屈指の絵画的風景。8月〜秋は他のハーブや花々が咲き誇る。",
      "Furano, in central Hokkaido, is famed for its lavender fields centered on Farm Tomita. Mid-to-late July is peak bloom, when the purple carpet against blue sky makes one of Japan's most painterly scenes. Other herbs and flowers bloom from August through autumn.",
      "富良野位于北海道中部，以富田农场为中心的薰衣草田而闻名。7月中下旬为盛花期，紫色花毯与蓝天的对比堪称日本代表风景。8月至秋季有其他香草与花卉接力开放。",
      "富良野位於北海道中部，以富田農場為中心的薰衣草田而聞名。7月中下旬為盛花期，紫色花毯與藍天的對比堪稱日本代表風景。8月至秋季有其他香草與花卉接力開放。",
      "후라노는 홋카이도 중앙부, 팜 도미타를 중심으로 한 라벤더 밭으로 유명합니다. 7월 중순~하순이 절정으로 보라색 융단과 파란 하늘의 대비는 일본 최고의 회화적 풍경. 8월~가을에는 다른 허브와 꽃들이 이어서 핍니다."
    ),
    definition: lh(
      "富良野(ふらの)は北海道のほぼ中央、十勝岳連峰の西麓に広がる人口約2万人の盆地都市で、隣接する美瑛(びえい)とともに「丘のまち」として知られる日本屈指の田園風景の聖地。1958年に富田忠雄氏が始めた「ファーム富田」のラベンダー栽培が、1976年JR国鉄カレンダーの表紙を飾ったことで全国的に有名となり、現在は7月のラベンダー満開期に約100万人が訪れます。ラベンダーのほか、彩りの畑(虹色のパッチワーク)、ひまわり畑、秋の紅葉、冬の樹氷とパウダースノーまで四季それぞれに代表的な日本の田園風景を提供する撮影地です。",
      "Furano lies in the heart of Hokkaido at the western foot of the Tokachi Range — a basin city of about 20,000 residents that, together with neighboring Biei, is known as the «town of hills,» a sacred ground of Japan's finest pastoral landscapes. Tadao Tomita started lavender cultivation at «Farm Tomita» in 1958, and when it appeared on the cover of the 1976 Japanese National Railways calendar, the area gained nationwide fame; today, about a million visitors arrive at peak lavender bloom in July. Beyond lavender, the «Rainbow Patchwork Fields,» sunflower fields, autumn colors, and winter rime ice with powder snow each offer iconic Japanese rural landscapes across the seasons."
    ),
    highlights: {
      ja: [
        "ファーム富田 — 1958年創業、12種類のラベンダーと「彩りの畑」、7月中旬〜下旬がピーク",
        "彩りの畑(パッチワーク) — 7色の花が虹色の縞模様に並ぶ、世界的にも珍しい構図",
        "美瑛の青い池 — 立ち枯れた白樺と青い水面、北海道電力の砂防ダムの副産物、AppleのMacBookProの壁紙",
        "四季彩の丘 — 美瑛町、15万㎡の花畑、夏〜秋の連続開花、トラクター散策可",
        "新栄の丘・パッチワークの路 — 美瑛の代表的丘風景、「ケンとメリーの木」「セブンスターの木」",
      ],
      en: [
        "Farm Tomita — founded 1958, with 12 lavender varieties and the «Rainbow Patchwork Fields,» peaking mid-to-late July",
        "Rainbow Patchwork Fields — seven colors of flowers arranged in rainbow stripes, a globally rare composition",
        "Biei Blue Pond — dead birches and blue water, a byproduct of Hokkaido Electric's sediment dams, used as Apple's MacBook Pro wallpaper",
        "Shikisai-no-Oka — 150,000 m² of flower fields in Biei, with continuous summer–autumn blooms; tractor tours available",
        "Shin-ei Hills and Patchwork Road — iconic Biei hill landscapes, including the «Ken & Mary Tree» and «Seven Star Tree»",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "富良野とは?", a: "北海道中央部、美瑛と並ぶ「丘のまち」の代表で、1958年創業のファーム富田のラベンダー畑で世界的に有名。7月の紫の絨毯、虹色のパッチワーク畑、美瑛の青い池まで、日本屈指の田園風景の聖地です。" },
        { q: "ラベンダーのベストな撮影時期は?", a: "7月15日〜25日頃が満開のピーク。早朝は光が斜めで花の立体感が出る。晴れた日の午前中が最も色が冴える。週末は混雑するため平日早朝6〜8時が狙い目です。" },
        { q: "美瑛とセットで巡れる?", a: "可能、富良野と美瑛は車で約30分、ファーム富田→四季彩の丘→青い池→パッチワークの路の周遊コースが定番。1日で巡るならレンタカー推奨、JRも利用可だが本数少ない。" },
        { q: "ファーム富田の入場料・営業時間は?", a: "入場無料・駐車場無料、年中無休。8:30〜17:30(夏季は18:00、冬季短縮)。ラベンダーソフトクリーム(450円)、ポプリ・香水(800〜3,000円)、限定の蒸留体験あり。混雑回避なら開園直後の8:30〜9:30が確実。観光バスは10時以降到着が多い。" },
        { q: "ラベンダー以外の見頃時期は?", a: "5月のチューリップ、6月のシャクヤク、7月ラベンダー、8月のひまわり・コスモス、9月のサルビア、10月の紅葉、12〜2月の樹氷とパウダースノーが順次見頃。富良野ロープウェイから望む十勝岳連峰は通年雄大、季節を問わず訪問価値あり。" },
        { q: "車なしでもアクセスできる?", a: "JR富良野線「中富良野」駅から徒歩25分でファーム富田。夏期(6〜10月)はノロッコ号(臨時列車)で「ラベンダー畑」駅(徒歩7分)が便利。札幌からツアーバスも多数(日帰り8,000〜12,000円)。富良野バスのコースは複数の主要スポットを巡回。" },
      ],
      en: [
        { q: "What is Furano?", a: "Located in central Hokkaido alongside Biei as «towns of hills,» Furano is globally famous for the lavender fields of Farm Tomita (founded 1958). With purple July carpets, rainbow patchwork fields, and Biei's Blue Pond, it remains a sacred ground for Japanese pastoral landscapes." },
        { q: "Best time for lavender photos?", a: "Peak bloom is roughly July 15–25. Early morning's low-angle light brings out floral depth; clear-sky mornings yield the richest color. Weekends are crowded — weekday early mornings 6–8 AM are ideal." },
        { q: "Can I combine Furano with Biei?", a: "Yes — about 30 minutes apart by car. The classic loop: Farm Tomita → Shikisai-no-Oka → Blue Pond → Patchwork Road. A rental car is recommended for a day trip; JR runs but with infrequent service." },
        { q: "What are Farm Tomita's hours and fees?", a: "Free admission, free parking, open daily. 8:30–17:30 (until 18:00 in summer, shorter in winter). Try lavender soft-serve (¥450), potpourri and perfume (¥800–3,000), and the limited distillation experience. Arrive at 8:30–9:30 to beat the crowds — tour buses arrive after 10:00." },
        { q: "What blooms beyond lavender?", a: "May tulips, June peonies, July lavender, August sunflowers and cosmos, September salvia, October foliage, December–February rime ice and powder snow. The Tokachi Range from the Furano ropeway is grand year-round — every season rewards a visit." },
        { q: "Can I get there without a car?", a: "From JR Furano Line «Naka-Furano» Station, Farm Tomita is a 25-minute walk. In summer (Jun–Oct), the seasonal Norokko Train stops at «Lavender Field» Station (7-min walk). Day-tour buses run from Sapporo (¥8,000–12,000). Furano Bus loops connect major sites." },
      ],
    },
    faqs: [
      { q: d("ラベンダーのベストな撮影時期は？","Best time for lavender photos?","薰衣草最佳拍摄时期？","薰衣草最佳拍攝時期？","라벤더 촬영 최적기는?"),
        a: d("7月15日〜25日頃が満開のピーク。早朝は光が斜めで花の立体感が出る。晴れた日の午前中が最も色が冴える。","Peak bloom is roughly July 15–25. Early morning's low-angle light brings out floral depth; clear-sky mornings yield the richest color.","7月15日-25日为盛开高峰。清晨斜光突出立体感，晴天上午色彩最浓。","7月15日-25日為盛開高峰。清晨斜光突出立體感，晴天上午色彩最濃。","7월 15-25일경이 절정. 이른 아침 사광이 꽃의 입체감을 살리고, 맑은 날 오전이 색이 가장 선명합니다.") },
    ],
  },

  /* ── 沖縄県 ── */
  "宮古島": {
    desc: d(
      "宮古島は沖縄県宮古諸島の主島。世界屈指の透明度を誇る「宮古ブルー」の海、与那覇前浜（東洋一の砂浜）、伊良部大橋（日本最長の無料橋3,540m）、池間大橋、砂山ビーチの天然アーチなど、亜熱帯の楽園。",
      "Miyakojima is the main island of Okinawa's Miyako archipelago. The world-class transparency of 'Miyako Blue' sea, Yonaha Maehama (Japan's best beach), the 3,540m Irabu Bridge (Japan's longest toll-free bridge), Ikema Bridge, and the natural arch at Sunayama Beach make it a subtropical paradise.",
      "宫古岛是冲绳县宫古群岛主岛。世界级透明度的「宫古蓝」海、与那霸前滨（东洋第一沙滩）、伊良部大桥（日本最长免费桥3540米）、池间大桥、砂山海滩天然拱门等，亚热带乐园。",
      "宮古島是沖繩縣宮古群島主島。世界級透明度的「宮古藍」海、與那霸前濱（東洋第一沙灘）、伊良部大橋（日本最長免費橋3540米）、池間大橋、砂山海灘天然拱門等，亞熱帶樂園。",
      "미야코지마는 오키나와현 미야코 제도의 주도(主島). 세계 최고 수준의 투명도를 자랑하는 '미야코 블루' 바다, 요나하 마에하마(동양 최고 해변), 이라부 대교(일본 최장 무료 다리 3,540m), 이케마 대교, 스나야마 비치 천연 아치 등 아열대 낙원."
    ),
    definition: lh(
      "宮古島(みやこじま)は沖縄県宮古諸島の主島で、面積約158km²・人口約5万人の珊瑚礁が隆起してできた平坦な島。沖縄本島から南西300kmに位置し、那覇から飛行機で約45分。世界屈指の透明度を誇る「宮古ブルー」と称される海と、ホワイトサンドのビーチで近年世界的観光地に。日本最長の無料橋・伊良部大橋(全長3,540m、2015年開通)、東洋一の砂浜と謳われる与那覇前浜ビーチ(全長7km)、池間大橋、来間大橋などを擁し、年間100万人以上が訪れます。",
      "Miyakojima is the main island of Okinawa's Miyako archipelago — a flat coral-uplift island of about 158 km² with roughly 50,000 residents. Located 300 km southwest of Okinawa's main island and 45 minutes by air from Naha, it has become a globally recognized destination thanks to its «Miyako Blue» waters (with some of the world's clearest visibility) and white-sand beaches. The island is home to Japan's longest toll-free bridge — the 3,540 m Irabu Bridge (opened 2015) — the 7 km Yonaha Maehama Beach (often called «Asia's whitest sand»), the Ikema Bridge, and the Kurima Bridge, drawing more than a million visitors a year."
    ),
    highlights: {
      ja: [
        "与那覇前浜ビーチ — 全長7kmの真白な砂浜、東洋一の美しさ、来間大橋を背景に夕景の名所",
        "伊良部大橋 — 2015年開通の日本最長無料橋(3,540m)、橋を駆け抜ける一直線の構図とエメラルドの海",
        "宮古ブルーの海 — 透明度40m級、晴天正午にPLフィルターでサンゴ礁と砂地のグラデーションを撮影",
        "砂山ビーチ — 天然の岩アーチがある秘境ビーチ、夕景のシルエット構図、約20分の散策",
        "池間大橋・池間島 — 全長1,425m、橋上から望む宮古島本島、池間湿原と渡り鳥の生態系",
      ],
      en: [
        "Yonaha Maehama Beach — a 7 km stretch of pure-white sand, dubbed Asia's most beautiful, with Kurima Bridge framing classic sunset scenes",
        "Irabu Bridge — Japan's longest toll-free bridge (3,540 m, opened 2015); a perfectly straight composition above an emerald sea",
        "Miyako Blue waters — visibility approaching 40 m on clear midday with a polarizing filter, the gradient of coral and sand is unmatched",
        "Sunayama Beach — a hidden cove with a natural rock arch; silhouette compositions at sunset, reachable on a ~20-minute walk",
        "Ikema Bridge and Ikemajima — 1,425 m bridge framing Miyakojima from above, plus Ikema Wetland and migratory bird habitat",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "宮古島とは?", a: "沖縄県の宮古諸島の主島、面積約158km²の平坦な珊瑚礁の島。「宮古ブルー」と称される世界屈指の透明度の海、東洋一の与那覇前浜ビーチ、伊良部大橋など、年間100万人以上が訪れる亜熱帯の楽園です。" },
        { q: "宮古ブルーが一番映える時間は?", a: "正午前後(11〜14時)の晴天時。太陽が高く光が海底まで届くため、浅瀬は白〜水色、深い所は深海ブルーの最も鮮やかなグラデーションが現れます。PLフィルターで反射を抑えると更に深い青になります。" },
        { q: "ベストシーズンと飛行時間は?", a: "5〜9月の海の透明度がピーク、特に7〜8月。9月は台風シーズン要注意。10月・4月は混雑回避のベスト。那覇から45分、東京から3時間20分(直行便あり)です。" },
        { q: "宮古島での移動は?", a: "公共交通は限られるためレンタカー必須(主要会社あり、繁忙期は3か月前予約推奨)。空港から市街まで車で15分、伊良部大橋・与那覇前浜・東平安名崎・砂山ビーチを一周するなら丸1日。原チャやレンタル自転車でも回れるが日陰なく日焼け対策必要。" },
        { q: "おすすめのビーチは?", a: "①与那覇前浜(7km白砂・東洋一)②砂山ビーチ(アーチ岩のシルエット、夕陽絶景)③吉野海岸(シュノーケリング向き)④池間島イキマビーチ(穴場、透明度抜群)⑤伊良部・佐和田の浜(干潮時の岩礁が映える)。ビーチ駐車場は早朝が無料・空きあり。" },
        { q: "シュノーケリング・ダイビング情報は?", a: "宮古島は世界屈指の透明度(40m以上)で年中ダイビング可能。八重干瀬(やびじ)はサンゴ礁の聖地、ボートで30分。ライセンス不要の体験ダイブも各ショップで実施(8,000〜15,000円/2本)。撮影目的なら水中ハウジングまたはアクションカメラを。" },
      ],
      en: [
        { q: "What is Miyakojima?", a: "The main island of Okinawa's Miyako archipelago — a flat coral-uplift island of about 158 km². Famous for its «Miyako Blue» — among the world's clearest waters — Yonaha Maehama (Asia's whitest sand), and the Irabu Bridge, it draws over a million visitors a year as a subtropical paradise." },
        { q: "When does Miyako Blue shine brightest?", a: "Midday (11–14:00) on clear days. With the sun high, light reaches the seabed and shallow water turns white-cyan while deeper water becomes deep blue, producing the most vivid gradient. A polarizing filter cuts surface glare to deepen the blue further." },
        { q: "Best season and flight time?", a: "May to September for water clarity, peaking in July and August. September is typhoon season — watch warnings. October and April best avoid crowds. 45 minutes by air from Naha; 3 hr 20 min direct from Tokyo." },
        { q: "How do I get around Miyakojima?", a: "Public transit is limited — a rental car is essential (book 3+ months ahead in peak season). Airport to town is 15 min by car. A full circuit of Irabu Bridge, Yonaha Maehama, Cape Higashi-Hennazaki, and Sunayama Beach takes a full day. Mopeds and bicycles work but offer no shade — bring strong sun protection." },
        { q: "Recommended beaches?", a: "①Yonaha Maehama (7 km of white sand — Asia's finest) ②Sunayama Beach (arch-rock silhouette, gorgeous sunsets) ③Yoshino Beach (great for snorkeling) ④Ikima Beach on Ikema Island (hidden, exceptional clarity) ⑤Sawada-no-Hama on Irabu (rocky shoals at low tide). Early morning gives free parking and empty beaches." },
        { q: "Snorkeling and diving information?", a: "Miyakojima offers world-class visibility (40m+) and year-round diving. Yabiji is a coral-reef paradise 30 min by boat. License-free trial dives are widely available at shops (¥8,000–15,000 for 2 dives). For photography, bring an underwater housing or action camera." },
      ],
    },
    faqs: [
      { q: d("宮古ブルーが一番映える時間は？","When does Miyako Blue shine brightest?","宫古蓝何时最美？","宮古藍何時最美？","미야코 블루가 가장 빛나는 시간대는?"),
        a: d("正午前後（11〜14時）の晴天時。太陽が高く光が海底まで届くため、浅瀬は白〜水色、深い所は深海ブルーのグラデーションが最も鮮やか。","Midday (11–14) on clear days. The sun is high, light reaches the seabed — shallow water looks white-cyan, deeper water deep blue, with the most vivid gradient.","正午前后（11-14点）晴天时。阳光高位直射海底，浅处呈白至水蓝、深处深蓝，渐变最生动。","正午前後（11-14點）晴天時。陽光高位直射海底，淺處呈白至水藍、深處深藍，漸變最生動。","정오 전후(11-14시) 맑은 날. 태양이 높고 빛이 해저까지 닿아 얕은 곳은 백~수색, 깊은 곳은 짙은 블루로 가장 선명한 그라데이션이 생깁니다.") },
    ],
  },
  "沖縄": {
    desc: d(
      "沖縄本島は琉球王国の歴史と亜熱帯の自然が共存する地。首里城跡（再建中）、万座毛、残波岬、古宇利大橋、美ら海水族館、やちむんの里、国際通りなど、南国らしい景観と琉球文化が詰まっています。",
      "Okinawa's main island blends Ryukyu Kingdom history with subtropical nature. Shurijo Castle ruins (under reconstruction), Manzamo Cliff, Cape Zanpa, Kouri Bridge, Churaumi Aquarium, Yachimun pottery village, and Kokusai-dori street condense Okinawan scenery and culture.",
      "冲绳本岛是琉球王国历史与亚热带自然共存之地。首里城遗址（重建中）、万座毛、残波岬、古宇利大桥、美丽海水族馆、烧物之里、国际通等，南国景观与琉球文化尽在此。",
      "沖繩本島是琉球王國歷史與亞熱帶自然共存之地。首里城遺址（重建中）、萬座毛、殘波岬、古宇利大橋、美麗海水族館、燒物之里、國際通等，南國景觀與琉球文化盡在此。",
      "오키나와 본섬은 류큐 왕국의 역사와 아열대 자연이 공존하는 곳. 슈리성 터(복원 중), 만자모, 잔파 곶, 고우리 대교, 추라우미 수족관, 야치문 도자기 마을, 국제거리 등 남국 풍경과 류큐 문화가 가득합니다."
    ),
    definition: lh(
      "沖縄(本島)は沖縄県の中心となる本島で、南北約106km・東西最大28km、人口約140万人の亜熱帯島。1429〜1879年は独立国「琉球王国」として、中国・東南アジアと交易した独自の文化を育み、首里城跡(2000年に世界遺産登録、2019年に正殿焼失後再建中)はその象徴。エメラルドグリーンの海と隆起珊瑚礁の万座毛・残波岬、海中道路で繋がる古宇利島、世界最大級の美ら海水族館、「やちむんの里」の伝統陶芸まで、南国の自然と独自文化が融合する撮影地です。",
      "The main island of Okinawa is the prefecture's heart — about 106 km north-south, up to 28 km east-west, with 1.4 million residents in a subtropical setting. From 1429 to 1879 it served as the independent «Ryukyu Kingdom,» trading with China and Southeast Asia and developing a distinct culture symbolized by Shurijo Castle (UNESCO-listed in 2000 and rebuilding after the 2019 main hall fire). With emerald seas, the uplifted coral cliffs of Manzamo and Cape Zanpa, Kouri Island connected by sea bridge, the world-class Churaumi Aquarium, and the «Yachimun no Sato» pottery village, the island fuses tropical nature with a singular indigenous culture."
    ),
    highlights: {
      ja: [
        "首里城跡 — 1429年首里王府の宮殿、世界遺産、2019年焼失後の正殿再建工事中(2026年完了予定)、守礼門は完全復元",
        "万座毛 — 隆起珊瑚礁の絶壁、「象の鼻」の形をした天然の岩、東シナ海のサンセットスポット",
        "古宇利大橋・古宇利島 — 全長1,960mの海中道路、エメラルドブルーの海と「ハートロック」、ロマンチックな撮影地",
        "美ら海水族館 — 世界最大級のアクリル水槽(高さ8.2m×幅22.5m)、ジンベエザメと巨大マンタの泳ぐ姿",
        "やちむんの里(読谷村) — 19の窯元が点在する陶芸の里、登り窯と工房の風景、伝統琉球陶器",
      ],
      en: [
        "Shurijo Castle Ruins — the royal palace of the Ryukyu Kingdom from 1429, UNESCO-listed; the main hall is being rebuilt after the 2019 fire (scheduled completion 2026), and the Shureimon gate is fully restored",
        "Manzamo Cliff — uplifted coral with a «Trunk of an Elephant» natural arch, a renowned sunset spot facing the East China Sea",
        "Kouri Bridge and Kouri Island — a 1,960 m sea-spanning bridge above emerald-blue water, with the «Heart Rock» drawing romantic photography",
        "Churaumi Aquarium — one of the world's largest acrylic tanks (8.2 m × 22.5 m) showcasing whale sharks and giant manta rays",
        "Yachimun no Sato (Yomitan) — a pottery village dotted with 19 kilns; climbing kilns, workshops, and traditional Ryukyu ceramics",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "沖縄(本島)とは?", a: "沖縄県の中心となる南北約106kmの亜熱帯本島。1429〜1879年は独立国「琉球王国」として独自の文化を育み、首里城跡、万座毛、古宇利大橋、美ら海水族館など南国自然と琉球文化が融合する撮影地です。" },
        { q: "本島で1日の撮影モデルコースは?", a: "朝:首里城跡 → 昼:万座毛・残波岬 → 夕:古宇利大橋・古宇利ビーチ → 夜:那覇国際通り、が王道。北部は車必須、移動時間が長いので南部か北部に絞る方が効率的です。" },
        { q: "ベストシーズンとアクセスは?", a: "海と空が最高なのは5〜9月(特に7〜8月、9月は台風要注意)。10月・4月は混雑回避ベスト。那覇空港から那覇市内まで車で20分、北部の美ら海水族館まで約2時間。" },
        { q: "首里城再建の現状は?", a: "2019年10月の火災で正殿・北殿・南殿が焼失。現在再建工事中で2026年秋に正殿の完成予定。再建中も「見せる復興」コンセプトで工事過程の見学・写真撮影が可能、伝統工法の再現は世界遺産技術として記録に残せる稀有な機会。守礼門・白銀堂は現存・撮影OK。" },
        { q: "美ら海水族館の撮影テクは?", a: "ジンベエザメが泳ぐ「黒潮の海」大水槽(高さ8.2m×幅22.5m)はガラス越しの撮影。明るい単焦点(50mm F1.8)で背景ボケ、ISO1600〜3200で動きを止める。フラッシュ厳禁。サンゴ礁の海ゾーンは色鮮やか。混雑前の朝9時開園直後が狙い目、年間420万人が訪れる人気施設です。" },
        { q: "琉球文化の被写体は?", a: "①首里城+守礼門(琉球建築の象徴)②那覇市第一牧志公設市場(沖縄食材の市場)③国際通り(夜の屋台と琉球料理)④やちむんの里(伝統陶芸、登り窯)⑤シーサー(屋根の獅子像、各家にある)⑥琉球紅型・芭蕉布(伝統工芸品)⑦エイサー(夏の伝統舞踊)。文化と自然の両方を1〜2日で撮影できます。" },
      ],
      en: [
        { q: "What is Okinawa Main Island?", a: "The heart of Okinawa Prefecture — a 106 km long subtropical island. From 1429 to 1879 it was the independent «Ryukyu Kingdom,» whose distinctive culture is symbolized by Shurijo Castle. With Manzamo, Kouri Bridge, Churaumi Aquarium and more, it fuses tropical nature with Ryukyu heritage." },
        { q: "Suggested one-day shooting route on the main island?", a: "Morning at Shurijo → noon at Manzamo and Cape Zanpa → sunset at Kouri Bridge and Beach → night on Kokusai-dori. A car is essential for the north; given the distances, focus on either south or north for efficiency." },
        { q: "Best season and access?", a: "May to September for sea and sky (peak July–August; watch typhoons in September). October and April best avoid crowds. From Naha Airport, central Naha is 20 min by car; the northern Churaumi Aquarium is about 2 hours." },
        { q: "Status of Shurijo Castle reconstruction?", a: "The October 2019 fire destroyed the Seiden, Hokuden, and Nanden. Reconstruction is underway, with the Seiden scheduled for autumn 2026 completion. The «visible recovery» policy allows visitors to observe and photograph the work — a rare chance to record traditional techniques as World Heritage craftsmanship. The Shureimon and Shirokane Hall remain standing and shootable." },
        { q: "Photographing Churaumi Aquarium?", a: "The Kuroshio main tank (8.2 m × 22.5 m) housing whale sharks is shot through glass. A fast prime (50mm f/1.8) blurs the background; ISO 1600–3200 freezes motion. No flash. The Coral Reef zone is rich in color. Right at 9 AM opening avoids crowds — 4.2 million annual visitors make it Okinawa's most popular site." },
        { q: "Photographing Ryukyu culture?", a: "①Shurijo + Shureimon (symbol of Ryukyu architecture) ②Naha Public Daiichi Makishi Market (Okinawan ingredients) ③Kokusai-dori (night yatai and Ryukyu cuisine) ④Yachimun no Sato (traditional pottery, climbing kilns) ⑤Shisa (lion-dog statues on every roof) ⑥Bingata and Bashofu (traditional textiles) ⑦Eisa (summer traditional dance). One to two days can capture both culture and nature." },
      ],
    },
    faqs: [
      { q: d("本島で1日の撮影モデルコースは？","Suggested one-day shooting route on the main island?","本岛一日拍摄路线？","本島一日拍攝路線？","본섬 당일 촬영 모델 코스는?"),
        a: d("朝:首里城跡 → 昼:万座毛・残波岬 → 夕:古宇利大橋・古宇利ビーチ → 夜:那覇国際通り、が王道。北部は車必須。","Morning at Shurijo → noon at Manzamo/Cape Zanpa → sunset at Kouri Bridge/Beach → night on Kokusai-dori. A car is needed for the north.","晨:首里城→午:万座毛/残波岬→夕:古宇利大桥/海滩→夜:那霸国际通。北部需自驾。","晨:首里城→午:萬座毛/殘波岬→夕:古宇利大橋/海灘→夜:那霸國際通。北部需自駕。","아침: 슈리성 → 점심: 만자모·잔파 곶 → 저녁: 고우리 대교·해변 → 밤: 나하 국제거리가 정석. 북부는 렌터카 필수.") },
    ],
  },

  /* ── 神奈川県 ── */
  "横浜": {
    desc: d(
      "横浜は開港の歴史を持つ国際港湾都市。みなとみらい21の高層ビル群、横浜赤レンガ倉庫、山下公園、横浜中華街、大さん橋からの夜景、ベイブリッジなど、近代と歴史的港湾の風景が融合。",
      "Yokohama is an international port city with a strong opening-era heritage. Minato Mirai 21's high-rises, Red Brick Warehouse, Yamashita Park, Chinatown, night views from Osanbashi Pier, and Bay Bridge fuse the modern with historic harbor scenes.",
      "横滨是开港历史的国际港口城市。港未来21高楼群、横滨红砖仓库、山下公园、横滨中华街、大栈桥夜景、湾桥等，现代与历史港口景观交融。",
      "橫濱是開港歷史的國際港口城市。港未來21高樓群、橫濱紅磚倉庫、山下公園、橫濱中華街、大棧橋夜景、灣橋等，現代與歷史港口景觀交融。",
      "요코하마는 개항 역사를 지닌 국제 항만 도시. 미나토미라이21 고층빌딩군, 요코하마 아카렌가 창고, 야마시타 공원, 요코하마 차이나타운, 오산바시 부두 야경, 베이 브릿지 등 근대와 역사적 항만 풍경이 융합됩니다."
    ),
    definition: lh(
      "横浜は神奈川県の県庁所在地で、1859年の開港以降日本の国際貿易の中心となった人口約377万人の日本第2の都市。みなとみらい21地区の超高層ビル群を中心に、1989年完成のランドマークタワー(296m)、観覧車「コスモクロック21」、1911年築の赤レンガ倉庫、横浜中華街(日本最大、約500店舗)、開国の歴史を伝える山下公園・氷川丸、大さん橋国際客船ターミナル、ベイブリッジまで、近代と歴史的港湾が共存する関東屈指の夜景・都市撮影地です。",
      "Yokohama, capital of Kanagawa Prefecture and Japan's second-largest city with about 3.77 million residents, has been the country's center of international trade since opening in 1859. With the Minato Mirai 21 district's high-rises — including the 296 m Landmark Tower (opened 1989) and the «Cosmo Clock 21» Ferris wheel — the 1911 Red Brick Warehouse, the 500-restaurant Yokohama Chinatown (Japan's largest), Yamashita Park and the Hikawa-maru ship that recall the opening era, the Osanbashi International Passenger Terminal, and Bay Bridge, Yokohama is one of Kanto's foremost subjects for nightscape and urban photography."
    ),
    highlights: {
      ja: [
        "みなとみらい21・ランドマークタワー — 1989年完成、高さ296m、日本第3位、上層階の展望台「スカイガーデン」",
        "横浜赤レンガ倉庫 — 1911年築の歴史的倉庫、現在はショップとレストラン、夜のライトアップは港の象徴",
        "大さん橋国際客船ターミナル — 屋上「くじらのせなか」から望むみなとみらい・赤レンガの夕景〜夜景",
        "横浜中華街 — 日本最大規模、約500店舗、4つの牌楼(門)、提灯と看板の夜景は別世界",
        "コスモクロック21 — 1989年設置、高さ112.5mの大観覧車、夜景撮影で必ず入る象徴的構図",
      ],
      en: [
        "Minato Mirai 21 and Landmark Tower — opened 1989 at 296 m, Japan's third tallest, with the «Sky Garden» observation deck",
        "Yokohama Red Brick Warehouse — built in 1911, now home to shops and restaurants; its evening illumination is a port-city icon",
        "Osanbashi International Passenger Terminal — the rooftop «Whale's Back» overlooks Minato Mirai and the Red Brick Warehouse at sunset and night",
        "Yokohama Chinatown — Japan's largest, with about 500 restaurants, four ornate gates, and a lantern-and-signboard night atmosphere of its own",
        "Cosmo Clock 21 — installed in 1989 at 112.5 m, an essential element of any classic Yokohama nightscape",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "横浜とは?", a: "神奈川県の県庁所在地で、1859年開港以来日本の国際貿易の中心。日本第2の都市(人口約377万人)で、みなとみらい21の超高層ビル、赤レンガ倉庫、中華街、山下公園など近代と歴史的港湾が共存する関東屈指の夜景撮影地です。" },
        { q: "横浜の夜景撮影ポイントは?", a: "大さん橋・赤レンガ倉庫前・みなとみらい汽車道・山下公園氷川丸が定番4箇所。三脚+広角でコスモクロック21を入れる構図が王道。日没30分後のブルーアワーが空と街の光のバランスがベスト。" },
        { q: "撮影ベストシーズンは?", a: "夜景は通年(冬の方が空気が澄む)、観覧車のライトアップが最も鮮やかなのも冬。横浜開港祭(6月)の花火、クリスマス時期の特別ライトアップは特に華やかです。" },
        { q: "横浜へのアクセスは?", a: "東京駅から東海道線・横須賀線で約25分・480円。羽田空港から京急線+地下鉄で約30分。みなとみらい21エリアは横浜駅からみなとみらい線で2駅・3分。観光なら一日乗車券「みなとぶらりチケット」が便利。" },
        { q: "三脚は使える?", a: "大さん橋・赤レンガ倉庫の屋外は三脚OK(混雑時は配慮要)。コスモクロック21観覧車の麓・汽車道は通行人妨害に注意。横浜港大さん橋国際客船ターミナル屋上「くじらのせなか」は三脚・撮影会OKの夜景定番スポット。" },
        { q: "横浜ベイブリッジを撮るには?", a: "大黒ふ頭スカイウォークが2024年再開、絶景の橋撮影スポット復活。本牧海づり施設からは橋全景。横浜ベイブリッジ自体は車のみ通行可、徒歩は不可。日没後ライトアップが青に変わる演出があります。" },
      ],
      en: [
        { q: "What is Yokohama?", a: "The capital of Kanagawa Prefecture and Japan's second-largest city (about 3.77 million residents). Since opening in 1859 it has been Japan's gateway for international trade. With Minato Mirai 21's skyscrapers, the Red Brick Warehouse, Chinatown, and Yamashita Park, it is one of Kanto's premier nightscape destinations." },
        { q: "Best night-view spots in Yokohama?", a: "Osanbashi, the Red Brick Warehouse area, the Kisha-michi promenade, and Yamashita Park (Hikawa-maru) are the four classics. A wide lens framing Cosmo Clock 21 is the canonical shot. Blue hour (30 min after sunset) gives the best balance of sky and city lights." },
        { q: "When is the best season to photograph Yokohama?", a: "Nightscapes work year-round (clearer in winter), and Ferris-wheel illumination is brightest in winter. The Yokohama Port Festival fireworks (June) and the Christmas-season special illumination are particularly spectacular." },
        { q: "How do I get to Yokohama?", a: "From Tokyo Station, JR Tokaido or Yokosuka line ~25 min, ¥480. From Haneda Airport, Keikyu line + subway ~30 min. The Minato Mirai 21 area is 2 stops (3 min) from Yokohama Station via the Minato Mirai Line. The «Minato Burari» day pass is convenient for sightseeing." },
        { q: "Can I use a tripod?", a: "Tripods are fine outdoors at Osanbashi and the Red Brick Warehouse area (mind crowds). At Cosmo Clock's base and Kisha-michi, watch for passersby. The «Whale's Back» rooftop of Osanbashi International Passenger Terminal is the canonical tripod-friendly nightscape spot." },
        { q: "How do I photograph Yokohama Bay Bridge?", a: "The Daikoku Pier Skywalk reopened in 2024, restoring a great vantage. Honmoku Fishing Park gives the full bridge view. Pedestrians cannot cross the bridge itself — vehicles only. After sunset, illumination shifts to blue, a signature staging." },
      ],
    },
    faqs: [
      { q: d("横浜の夜景撮影ポイントは？","Best night-view spots in Yokohama?","横滨夜景拍摄点？","橫濱夜景拍攝點？","요코하마 야경 포인트는?"),
        a: d("大さん橋・赤レンガ倉庫前・みなとみらい汽車道・山下公園氷川丸が定番4点。三脚＋魚眼/広角で観覧車込みの構図が人気。","Osanbashi, Red Brick Warehouse, Kisha-michi, and Yamashita Park (Hikawa Maru) are the 4 classic spots. Tripod with wide/fisheye to include the Ferris wheel is popular.","大栈桥、红砖仓库前、港未来汽车道、山下公园冰川丸是4大经典点。三脚架+广角/鱼眼含摩天轮构图受欢迎。","大棧橋、紅磚倉庫前、港未來汽車道、山下公園冰川丸是4大經典點。三腳架+廣角/魚眼含摩天輪構圖受歡迎。","오산바시, 아카렌가 창고 앞, 기샤미치, 야마시타 공원 히카와마루가 정석 4곳. 삼각대+광각/어안으로 관람차까지 담는 구도가 인기.") },
    ],
  },
  "鎌倉": {
    desc: d(
      "鎌倉は1185〜1333年の鎌倉幕府の都。鎌倉大仏（高徳院）、長谷寺、鶴岡八幡宮、報国寺の竹林、江ノ電の踏切、由比ヶ浜と七里ヶ浜の海岸など、歴史と海の両方が撮れる稀有な場所。",
      "Kamakura was Japan's capital from 1185–1333. The Great Buddha (Kotoku-in), Hasedera, Tsurugaoka Hachimangu, the bamboo grove of Hokokuji, the Enoden train crossing, and Yuigahama/Shichirigahama coastlines make it a rare place to shoot history and sea together.",
      "镰仓是1185-1333年镰仓幕府首都。镰仓大佛（高德院）、长谷寺、鹤冈八幡宫、报国寺竹林、江之电平交道口、由比滨与七里滨海岸等，历史与大海同框的罕见之地。",
      "鎌倉是1185-1333年鎌倉幕府首都。鎌倉大佛（高德院）、長谷寺、鶴岡八幡宮、報國寺竹林、江之電平交道口、由比濱與七里濱海岸等，歷史與大海同框的罕見之地。",
      "가마쿠라는 1185-1333년 가마쿠라 막부의 수도. 가마쿠라 대불(고토쿠인), 하세데라, 쓰루가오카 하치만구, 호코쿠지 대숲, 에노덴 건널목, 유이가하마·시치리가하마 해변 등 역사와 바다를 모두 담을 수 있는 드문 곳."
    ),
    definition: lh(
      "鎌倉は神奈川県南東部の人口約17万人の古都で、1185年に源頼朝が日本初の武家政権「鎌倉幕府」を開き、1333年まで約150年間政治の中心として栄えた地。市内には100以上の寺社が点在し、特に高徳院の鎌倉大仏(1252年鋳造、高さ11.4m、国宝)、長谷寺(あじさい・紅葉)、鶴岡八幡宮(源氏の総氏神)、報国寺(竹林の寺)が代表的。江ノ電が走る海岸線、由比ヶ浜・七里ヶ浜から望む江ノ島と富士山まで、歴史と海を1日で巡れる関東屈指の撮影地です。",
      "Kamakura is an ancient capital in southeastern Kanagawa Prefecture (population ~170,000), where Minamoto no Yoritomo founded Japan's first samurai government — the Kamakura Shogunate — in 1185. It served as the political center for about 150 years until 1333. The city contains over 100 temples and shrines, most famously the Great Buddha at Kotoku-in (cast 1252, 11.4 m tall, a National Treasure), Hasedera (hydrangeas and autumn colors), Tsurugaoka Hachimangu (the Minamoto clan's tutelary shrine), and Hokoku-ji (the «Bamboo Temple»). With the Enoden train running along the coast and views of Enoshima and Mt. Fuji from Yuigahama and Shichirigahama, Kamakura ranks among Kanto's finest one-day photographic destinations combining history and the sea."
    ),
    highlights: {
      ja: [
        "鎌倉大仏(高徳院) — 1252年鋳造、高さ11.4m・重さ約121tの青銅製阿弥陀如来坐像、国宝、像内も拝観可",
        "長谷寺 — 6月のあじさい(40種2,500株)、11月の紅葉ライトアップ、見晴台からの相模湾の絶景",
        "鶴岡八幡宮 — 1063年創建、段葛の桜並木、舞殿、大銀杏(2010年倒伏、再生中)、源氏池の蓮",
        "江ノ電・鎌倉高校前踏切 — アニメ『スラムダンク』のオープニングの聖地、海越しの江ノ島と踏切",
        "報国寺 — 「竹寺」と呼ばれる孟宗竹2,000本の竹林、抹茶を頂きながら静寂を撮影",
      ],
      en: [
        "Great Buddha at Kotoku-in — cast in 1252, an 11.4 m, 121-tonne bronze Amida Buddha; a National Treasure, with interior viewing available",
        "Hasedera — June hydrangeas (40 varieties, 2,500 plants), November illuminated maples, with sweeping views of Sagami Bay from the lookout",
        "Tsurugaoka Hachimangu — founded 1063; the Dankazura cherry-tree avenue, the Maiden stage, the great gingko (fell 2010, regrowing), and the lotus-filled Genji Pond",
        "Enoden Kamakurakokomae crossing — the «Slam Dunk» opening-credits landmark, with the level crossing in front of Enoshima across the sea",
        "Hokokuji — the «Bamboo Temple,» with a grove of 2,000 moso bamboo; sip matcha while photographing the silence",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "鎌倉とは?", a: "神奈川県南東部の古都で、1185〜1333年に源頼朝が日本初の武家政権「鎌倉幕府」を置いた地。100以上の寺社、鎌倉大仏(国宝)、長谷寺、鶴岡八幡宮、江ノ電と海岸線まで歴史と海が1日で巡れる関東屈指の撮影地です。" },
        { q: "鎌倉で外せない撮影スポットは?", a: "鎌倉大仏、長谷寺(あじさい・紅葉)、鶴岡八幡宮、報国寺の竹林、江ノ電鎌倉高校前踏切(『スラムダンク』の聖地)の5つが定番。1日で全て巡るなら午前から計画的にどうぞ。" },
        { q: "ベストシーズンは?", a: "桜の4月上旬、長谷寺のあじさいの6月中旬、紅葉の11月下旬〜12月上旬、富士山と江ノ島の冬。あじさい時期は長谷寺・明月院に長蛇の列、平日早朝が必須です。" },
        { q: "鎌倉へのアクセスは?", a: "東京駅からJR横須賀線で約1時間・940円。新宿からは湘南新宿ラインで1時間。鎌倉駅から江ノ電で各観光スポットへ。1日乗車券「のりおりくん」(800円)が便利。週末は混雑のため平日推奨。" },
        { q: "江ノ電の踏切撮影のマナーは?", a: "鎌倉高校前踏切は『スラムダンク』の聖地として外国人観光客が殺到し、近隣住民から苦情。線路への立入禁止、車道での撮影禁止、混雑時の長時間占拠不可。早朝7時前か夕方17時以降が比較的空いている。" },
        { q: "鎌倉大仏の内部に入れる?", a: "胎内拝観できます(大人20円・別途)。中は意外と狭い空間で、鋳造技術(8段の継ぎ目が見える)を学べる。8〜18時の間随時入場可、所要約5分。撮影はフラッシュ禁止、混雑時はじっくり見れない可能性あり。" },
      ],
      en: [
        { q: "What is Kamakura?", a: "An ancient capital in southeastern Kanagawa Prefecture, where Minamoto no Yoritomo founded Japan's first samurai government — the Kamakura Shogunate — in 1185. With 100+ temples and shrines, the National Treasure Great Buddha, Hasedera, Tsurugaoka Hachimangu, the Enoden coast, it offers history and sea in a single day's outing." },
        { q: "Must-see photo spots in Kamakura?", a: "The Great Buddha, Hasedera (hydrangeas, autumn colors), Tsurugaoka Hachimangu, Hokokuji's bamboo grove, and the Enoden Kamakurakokomae crossing (a «Slam Dunk» landmark). To cover all five in a day, plan an early-morning start." },
        { q: "When is the best season?", a: "Cherry blossoms early April, Hasedera's hydrangeas mid-June, autumn colors late November to early December, and Mt. Fuji with Enoshima in winter. Hasedera and Meigetsu-in see long lines during hydrangea season — go on a weekday morning." },
        { q: "How do I get to Kamakura?", a: "From Tokyo Station, JR Yokosuka Line ~1 hr, ¥940. From Shinjuku, Shonan-Shinjuku Line ~1 hr. From Kamakura Station, the Enoden serves major sights. The «Noriorikun» day pass (¥800) is convenient. Weekends are crowded — go midweek if possible." },
        { q: "Etiquette for the Enoden crossing photo?", a: "The Kamakurakokomae crossing has been overwhelmed by «Slam Dunk» pilgrims, with complaints from residents. Don't step onto the tracks, don't shoot from the road, and don't block the spot at peak times. Before 7:00 AM or after 5:00 PM is much less crowded." },
        { q: "Can I enter the Great Buddha?", a: "Yes — a small interior is open (¥20 extra for adults). The cramped space lets you see the 8-section casting joints up close. Open 8:00–18:00, 5 minutes is plenty. No flash. During crowds, viewing time may be limited." },
      ],
    },
    faqs: [
      { q: d("鎌倉で外せない撮影スポットは？","Must-see photo spots in Kamakura?","镰仓必拍景点？","鎌倉必拍景點？","가마쿠라 필수 촬영지는?"),
        a: d("鎌倉大仏、長谷寺（紫陽花・紅葉）、鶴岡八幡宮、報国寺竹林、江ノ電鎌倉高校前踏切（『スラムダンク』の聖地）の5つ。","Great Buddha, Hasedera (hydrangeas/autumn foliage), Tsurugaoka Hachimangu, Hokokuji bamboo, and the Enoden crossing at Kamakurakokomae (Slam Dunk landmark).","镰仓大佛、长谷寺（绣球花/红叶）、鹤冈八幡宫、报国寺竹林、江之电镰仓高校前平交道（《灌篮高手》圣地）5处。","鎌倉大佛、長谷寺（繡球花/紅葉）、鶴岡八幡宮、報國寺竹林、江之電鎌倉高校前平交道（《灌籃高手》聖地）5處。","가마쿠라 대불, 하세데라(수국·단풍), 쓰루가오카 하치만구, 호코쿠지 대숲, 에노덴 가마쿠라고코마에 건널목(슬램덩크 성지) 5곳.") },
    ],
  },

  /* ── 三重県 ── */
  "伊勢神宮": {
    desc: d(
      "伊勢神宮は全国約8万社の神社の頂点に位置する日本最高の聖地。天照大神を祀る内宮と豊受大神を祀る外宮からなり、20年毎の遷宮で常に瑞々しさを保つ。五十鈴川の清流、神宮杉の巨木、静謐な参道が神聖な空気を湛えます。",
      "Ise Jingu is Japan's most sacred shrine, above all 80,000 shrines nationwide. Comprising the Naiku (inner shrine to Amaterasu) and Geku (outer shrine to Toyouke), it remains ever-new through 20-year rebuilding cycles. The Isuzu River, giant cedar trees, and tranquil approach exude sacred air.",
      "伊势神宫位居日本约8万神社顶点，是最高圣地。由祭祀天照大神的内宫和祭祀丰受大神的外宫组成，每20年式年迁宫保持常新。五十铃川清流、神宫杉巨木、静谧参道充满神圣氛围。",
      "伊勢神宮位居日本約8萬神社頂點，是最高聖地。由祭祀天照大神的內宮和祭祀豐受大神的外宮組成，每20年式年遷宮保持常新。五十鈴川清流、神宮杉巨木、靜謐參道充滿神聖氛圍。",
      "이세신궁은 전국 약 8만 신사의 정점에 위치한 일본 최고 성지. 아마테라스를 모시는 내궁과 도요우케를 모시는 외궁으로 구성되며, 20년마다 신궁을 재건축해 항상 신선함을 유지합니다. 이스즈강의 맑은 물, 거대 삼나무, 고요한 참배길이 신성한 공기를 자아냅니다."
    ),
    definition: {
      ja: "伊勢神宮は三重県伊勢市にある日本神道の最高位の神社で、全国約8万社の神社の頂点に位置する天照大神(皇室の祖神)を祀る聖地。皇大神宮(内宮、ないくう)と豊受大神宮(外宮、げくう)の2つの正宮を中心に、計125の宮社から構成され、その総称が「神宮」または「伊勢神宮」。約2,000年の歴史を持ち、20年ごとに社殿・神宝・装束のすべてを造り替える「式年遷宮(しきねんせんぐう)」(西暦690年から続く、次回は2033年)により常に瑞々しさを保つ世界でも稀有な祭祀文化を継承しています。",
      en: "Ise Jingu is the highest-ranking Shinto shrine in Japan, situated in Ise City, Mie Prefecture. As the head of approximately 80,000 shrines nationwide, it enshrines Amaterasu Omikami — the imperial ancestor deity. Centered on the two main sanctuaries — Naiku (Kotai Jingu) and Geku (Toyouke Daijingu) — it comprises 125 shrines in total, all known collectively as «Jingu» or «Ise Jingu.» With about 2,000 years of history, the shrine perpetuates the «Shikinen Sengu» — the rebuilding of every sanctuary, sacred treasure, and vestment every 20 years (a tradition unbroken since 690 AD; the next occurs in 2033) — preserving a ritual culture nearly without parallel in the world.",
      zh: "伊势神宫是位于三重县伊势市的日本神道最高位神社，居全国约8万神社之首，祭祀天照大神(皇室祖神)的圣地。以皇大神宫(内宫)与丰受大神宫(外宫)两正宫为中心，由125座宫社组成，统称「神宫」或「伊势神宫」。约2,000年历史，每20年重建社殿、神宝、装束的「式年迁宫」(始于公元690年，下次2033年)使其永葆新生，是世界罕见的祭祀文化传承。",
      "zh-tw": "伊勢神宮是位於三重縣伊勢市的日本神道最高位神社，居全國約8萬神社之首，祭祀天照大神(皇室祖神)的聖地。以皇大神宮(內宮)與豐受大神宮(外宮)兩正宮為中心，由125座宮社組成，統稱「神宮」或「伊勢神宮」。約2,000年歷史，每20年重建社殿、神寶、裝束的「式年遷宮」(始於公元690年，下次2033年)使其永葆新生，是世界罕見的祭祀文化傳承。",
      ko: "이세 신궁은 미에현 이세시에 있는 일본 신토의 최고위 신사로, 전국 약 8만 신사의 정점에 위치하며 아마테라스 오미카미(황실의 조신)를 모시는 성지. 황대신궁(내궁, 나이쿠)과 도요우케 대신궁(외궁, 게쿠) 두 정궁을 중심으로 총 125개의 궁사로 구성되며, 그 총칭이 「신궁」또는「이세 신궁」. 약 2,000년의 역사를 지니며, 20년마다 신전·신보·복식 모두를 새로 만드는 「시키넨 센구(식년천궁)」(서기 690년부터 이어짐, 다음은 2033년)에 의해 항상 신선함을 유지하는 세계적으로도 드문 제사 문화를 계승하고 있습니다.",
    },
    highlights: {
      ja: [
        "内宮(皇大神宮) — 天照大神を祀る、宇治橋を渡り神苑・五十鈴川・正宮・荒祭宮の参道、最重要の聖地",
        "外宮(豊受大神宮) — 天照大神の食事を司る豊受大神を祀る、まずは外宮から参拝するのが古来の慣習",
        "宇治橋 — 内宮の入り口、長さ約100mの木造橋、20年ごとに架け替え、欄干越しの五十鈴川が美しい",
        "五十鈴川と神宮杉 — 樹齢千年級の巨木が並ぶ参道、川で身を清める「御手洗場(みたらしば)」",
        "式年遷宮御用材 — 御木曳(おきひき)行事や20年に一度の神聖な遷宮儀式、次回は2033年",
      ],
      en: [
        "Naiku (Kotai Jingu) — enshrining Amaterasu Omikami; cross Uji Bridge to enter the shrine grounds, the Isuzu River, the inner sanctuary, and the Aramatsuri-no-miya — the most sacred ground",
        "Geku (Toyouke Daijingu) — enshrines Toyouke, deity of Amaterasu's daily meals; tradition holds that worshippers visit Geku first",
        "Uji Bridge — about 100 m of wooden bridge marking Naiku's entrance, rebuilt every 20 years; the Isuzu River framed through its rails is exquisite",
        "Isuzu River and shrine cedars — millennia-old cedars line the approach, with «Mitarashiba» a place to purify hands in the river",
        "Shikinen Sengu rituals — the «Okihiki» log-pulling ceremony and the once-in-20-years sacred rebuilding; the next occurs in 2033",
      ],
      zh: [
        "内宫(皇大神宫) — 祭祀天照大神，过宇治桥进入神苑·五十铃川·正宫·荒祭宫的参道，最重要的圣地",
        "外宫(丰受大神宫) — 祭祀掌管天照大神饮食的丰受大神，古来惯例先参外宫",
        "宇治桥 — 内宫入口，长约100米的木桥，每20年重建，栏杆间望见的五十铃川极美",
        "五十铃川与神宫杉 — 千年巨木林立的参道，河中净身的「御手洗场」",
        "式年迁宫御用材 — 御木曳仪式与20年一度的神圣迁宫，下次2033年",
      ],
      "zh-tw": [
        "內宮(皇大神宮) — 祭祀天照大神，過宇治橋進入神苑·五十鈴川·正宮·荒祭宮的參道，最重要的聖地",
        "外宮(豐受大神宮) — 祭祀掌管天照大神飲食的豐受大神，古來慣例先參外宮",
        "宇治橋 — 內宮入口，長約100米的木橋，每20年重建，欄杆間望見的五十鈴川極美",
        "五十鈴川與神宮杉 — 千年巨木林立的參道，河中淨身的「御手洗場」",
        "式年遷宮御用材 — 御木曳儀式與20年一度的神聖遷宮，下次2033年",
      ],
      ko: [
        "내궁(황대신궁) — 아마테라스 오미카미를 모심, 우지바시를 건너 신원·이스즈강·정궁·아라마쓰리노미야의 참배길, 가장 중요한 성지",
        "외궁(도요우케 대신궁) — 아마테라스의 식사를 담당하는 도요우케 대신을 모심, 옛부터 외궁부터 참배하는 것이 관습",
        "우지바시 — 내궁의 입구, 길이 약 100m의 목조 다리, 20년마다 다시 놓음, 난간 너머의 이스즈강이 아름답다",
        "이스즈강과 신궁 삼나무 — 수령 천년급 거목이 늘어선 참배길, 강에서 몸을 정화하는 「미타라시바」",
        "시키넨 센구 어용재 — 오키히키 행사와 20년에 한 번의 신성한 천궁 의식, 다음은 2033년",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "伊勢神宮とは?", a: "三重県伊勢市にある日本神道の最高位の神社で、全国約8万社の神社の頂点。天照大神を祀る内宮と豊受大神を祀る外宮を中心に125の宮社から成る、約2,000年の歴史を持つ日本の精神的中心です。" },
        { q: "内宮と外宮どちらから参拝?", a: "古来の慣習では外宮→内宮の順。両宮は約5km離れ、バスで15分。早朝5時から参拝可、人の少ない朝6〜8時が撮影にも最適です。所要時間は両宮で半日程度を見込んでください。" },
        { q: "撮影マナーは?", a: "正宮(御正宮)の中は撮影禁止。鳥居から内側は節度ある撮影にとどめ、参拝者や神職を直接撮らないのが原則。三脚使用は事前確認、内宮の朝5時開門が最も静かで光も柔らかいです。" },
        { q: "式年遷宮とは?", a: "20年に一度、内宮・外宮の正殿と14所の別宮を全て新しく建て替える神道最大の祭祀。第62回が2013年、第63回は2033年。古い御用材は他の神社に再利用される循環システム。次回まで宇治橋の架け替えなど準備が進行中です。" },
        { q: "アクセスは?", a: "名古屋から近鉄特急で約1時間20分・3,070円、大阪から約1時間40分。外宮は伊勢市駅から徒歩5分、内宮は外宮からバスで15分。両宮巡るなら半日。早朝5時開門のため前日に伊勢市内泊推奨です。" },
        { q: "御朱印・お土産は?", a: "御朱印は内宮・外宮それぞれ別々に頂ける(各300円)。おかげ横丁の赤福本店(本店限定の盆まわし朝粥や持ち帰り)、伊勢うどん、てこね寿司が名物。神宮内は撮影規制があるためおはらい町・おかげ横丁での街並み撮影が中心になります。" },
      ],
      en: [
        { q: "What is Ise Jingu?", a: "The highest-ranking Shinto shrine in Japan, located in Ise City, Mie Prefecture. As the head of about 80,000 shrines nationwide, it enshrines Amaterasu Omikami at Naiku and Toyouke at Geku, comprising 125 shrines in total — Japan's spiritual heart with about 2,000 years of history." },
        { q: "Naiku or Geku first?", a: "Tradition: Geku first, then Naiku. The two sanctuaries are about 5 km apart, 15 minutes by bus. Both open from 5 AM, and 6–8 AM is best for photography with fewest visitors. Allow about half a day to visit both." },
        { q: "Photography etiquette?", a: "Inside the main sanctuaries is strictly off-limits. Keep photography modest within the torii gates, and avoid shooting worshippers or priests directly. Confirm tripod use in advance; Naiku's 5 AM opening offers the calmest, softest light." },
        { q: "What is Shikinen Sengu?", a: "Every 20 years, the main halls of Naiku and Geku and 14 auxiliary shrines are completely rebuilt — the largest Shinto ritual. The 62nd was in 2013; the 63rd is set for 2033. Old timbers are reused at other shrines in a circular system. Preparations like the Uji Bridge replacement are already underway." },
        { q: "How do I get there?", a: "From Nagoya: Kintetsu Limited Express ~1hr 20min, ¥3,070. From Osaka ~1hr 40min. Geku is 5 min walk from Iseshi Station; Naiku is 15 min by bus from Geku. Allow a half-day to visit both. The 5 AM opening means an overnight stay in Ise the night before is recommended." },
        { q: "Goshuin and souvenirs?", a: "Goshuin (shrine seals) are issued separately at Naiku and Geku (¥300 each). At Okage Yokocho: Akafuku main shop (with the bonmaWashi morning gruel and takeaway sweets), Ise udon, and tekone-zushi are local specialties. Since photography is restricted inside the shrines, the Oharaimachi/Okage Yokocho streets become the main photo subjects." },
      ],
      zh: [
        { q: "伊势神宫是什么?", a: "位于三重县伊势市的日本神道最高位神社，居全国约8万神社之首。以祭祀天照大神的内宫与丰受大神的外宫为中心，由125座宫社组成，约2,000年历史的日本精神中心。" },
        { q: "内宫外宫先参拜哪个?", a: "古来惯例先外宫后内宫。两宫相距约5公里，巴士15分钟。清晨5时起开放参拜，人少的早晨6~8时也是拍摄最佳。两宫巡游需半日。" },
        { q: "拍摄礼仪?", a: "正宫内禁止拍摄。鸟居以内须节制拍摄，不直接拍摄参拜者或神职为原则。三脚架使用需事先确认，内宫早5时开门最静且光线柔和。" },
        { q: "式年迁宫是什么?", a: "每20年将内宫·外宫的正殿与14处别宫全部重建的神道最大祭祀。第62回为2013年，第63回为2033年。旧御用材在其他神社循环再利用。下次前的宇治桥重建等准备进行中。" },
        { q: "怎么去?", a: "名古屋乘近铁特急约1小时20分、3,070日元；大阪约1小时40分。外宫距伊势市站步行5分钟，内宫距外宫巴士15分钟。巡两宫需半日，因晨5时开门，建议前夜伊势市内住宿。" },
        { q: "御朱印·土产?", a: "御朱印内宫·外宫各300日元，分别可得。御荫横丁的赤福本店(本店限定盆回朝粥与外带)，伊势乌龙面、手捏寿司为名物。神宫内拍摄受限，主要在御袚町·御荫横丁拍街景。" },
      ],
      "zh-tw": [
        { q: "伊勢神宮是什麼?", a: "位於三重縣伊勢市的日本神道最高位神社，居全國約8萬神社之首。以祭祀天照大神的內宮與豐受大神的外宮為中心，由125座宮社組成，約2,000年歷史的日本精神中心。" },
        { q: "內宮外宮先參拜哪個?", a: "古來慣例先外宮後內宮。兩宮相距約5公里，巴士15分鐘。清晨5時起開放參拜，人少的早晨6~8時也是拍攝最佳。兩宮巡遊需半日。" },
        { q: "拍攝禮儀?", a: "正宮內禁止拍攝。鳥居以內須節制拍攝，不直接拍攝參拜者或神職為原則。三腳架使用需事先確認，內宮早5時開門最靜且光線柔和。" },
        { q: "式年遷宮是什麼?", a: "每20年將內宮·外宮的正殿與14處別宮全部重建的神道最大祭祀。第62回為2013年，第63回為2033年。舊御用材在其他神社循環再利用。下次前的宇治橋重建等準備進行中。" },
        { q: "怎麼去?", a: "名古屋搭近鐵特急約1小時20分、3,070日圓；大阪約1小時40分。外宮距伊勢市站步行5分鐘，內宮距外宮巴士15分鐘。巡兩宮需半日，因晨5時開門，建議前夜伊勢市內住宿。" },
        { q: "御朱印·土產?", a: "御朱印內宮·外宮各300日圓，分別可得。御蔭橫丁的赤福本店(本店限定盆迴朝粥與外帶)，伊勢烏龍麵、手捏壽司為名物。神宮內拍攝受限，主要在御祓町·御蔭橫丁拍街景。" },
      ],
      ko: [
        { q: "이세 신궁이란?", a: "미에현 이세시에 있는 일본 신토의 최고위 신사로, 전국 약 8만 신사의 정점. 아마테라스를 모시는 내궁과 도요우케를 모시는 외궁을 중심으로 125개의 궁사로 구성, 약 2,000년 역사를 지닌 일본의 정신적 중심입니다." },
        { q: "내궁과 외궁 어느 쪽부터?", a: "옛부터의 관습은 외궁→내궁 순. 두 궁은 약 5km 떨어져 있어 버스로 15분. 이른 아침 5시부터 참배 가능, 사람 적은 아침 6~8시가 촬영에도 최적입니다. 두 궁을 도는 데 반나절 정도 예상." },
        { q: "촬영 매너는?", a: "정궁(어정궁) 내부는 촬영 금지. 도리이부터 안쪽은 절도 있는 촬영에 그치고, 참배객이나 신직을 직접 찍지 않는 것이 원칙. 삼각대 사용은 사전 확인, 내궁의 아침 5시 개문이 가장 고요하고 빛도 부드럽습니다." },
        { q: "시키넨 센구란?", a: "20년에 한 번, 내궁·외궁의 정전과 14개 별궁을 모두 새로 건축하는 신토 최대의 제사. 제62회가 2013년, 제63회는 2033년. 옛 어용재는 다른 신사에서 재이용되는 순환 시스템. 다음을 위한 우지바시 재가설 등 준비 진행 중." },
        { q: "가는 방법은?", a: "나고야에서 긴테쓰 특급으로 약 1시간 20분·3,070엔, 오사카에서 약 1시간 40분. 외궁은 이세시역에서 도보 5분, 내궁은 외궁에서 버스로 15분. 두 궁을 도는 데 반나절. 이른 아침 5시 개문이므로 전날 이세시 내 숙박 추천입니다." },
        { q: "고슈인·기념품은?", a: "고슈인은 내궁·외궁에서 따로 받을 수 있다(각 300엔). 오카게요코초의 아카후쿠 본점(본점 한정 본마와시 아침 죽이나 포장), 이세 우동, 데코네스시가 명물. 신궁 내는 촬영 규제가 있으므로 오하라이마치·오카게요코초의 거리 풍경 촬영이 중심이 됩니다." },
      ],
    },
    faqs: [
      { q: d("内宮と外宮どちらから参拝？","Naiku or Geku first?","内宫外宫先参拜哪个？","內宮外宮先參拜哪個？","내궁과 외궁 어느 쪽부터?"),
        a: d("古来の慣習では外宮→内宮の順。外宮から約5km、バスで15分。早朝6時から参拝可、人の少ない朝が撮影にも最適。","Tradition: Geku first, then Naiku. 5 km apart, 15 min by bus. Shrines open from 6 AM — early morning is both less crowded and best for photography.","传统先外宫后内宫。相距5公里，巴士15分钟。6点起开放参拜，清晨人少最宜拍摄。","傳統先外宮後內宮。相距5公里，巴士15分鐘。6點起開放參拜，清晨人少最宜拍攝。","전통은 외궁→내궁 순. 약 5km, 버스 15분. 오전 6시부터 참배 가능, 사람 적은 아침이 촬영에도 최적.") },
    ],
  },
  "夫婦岩": {
    desc: d(
      "夫婦岩は二見興玉神社前の海中に並ぶ大小2つの岩。大岩（夫）と小岩（妻）を注連縄で結び、夫婦円満の象徴。夏至前後のみ、2つの岩の間から日の出が昇る絶景が撮影できます。",
      "Meoto Iwa ('married couple rocks') are two rocks of different sizes rising from the sea before Futami Okitama Shrine. Connected by a sacred rope, they symbolize marital harmony. Only around the summer solstice does the sun rise between them — a sought-after shot.",
      "夫妻岩是二见兴玉神社前并立海中的大小两块岩石。大岩（夫）与小岩（妻）由注连绳连结，象征夫妻和睦。仅夏至前后可拍到太阳从两岩间升起的绝景。",
      "夫婦岩是二見興玉神社前並立海中的大小兩塊岩石。大岩（夫）與小岩（妻）由注連繩連結，象徵夫妻和睦。僅夏至前後可拍到太陽從兩岩間升起的絕景。",
      "메오토이와는 후타미 오키타마 신사 앞 바다에 나란히 선 크고 작은 두 바위. 큰 바위(남편)와 작은 바위(아내)를 금줄로 잇고, 부부 원만의 상징. 하지 무렵에만 두 바위 사이로 일출이 떠오르는 절경을 담을 수 있습니다."
    ),
    definition: lh(
      "夫婦岩(めおといわ)は三重県伊勢市二見町、二見興玉神社(ふたみおきたまじんじゃ)の境内前面の海中に立つ大小2つの岩で、大岩(高さ9m、男岩)と小岩(高さ4m、女岩)を全長35m・重さ40kgの大注連縄で結んでいます。夫婦円満・縁結びの象徴とされる古来の聖地で、注連縄は年3回(5月5日、9月5日、12月中旬)張り替えられる神事を伴います。5〜7月の夏至前後にのみ、2つの岩の間から日の出が昇る絶景が見られ、富士山のシルエットも遠望できる(年に数日)世界でも珍しいフォトジェニックスポットです。",
      "Meoto Iwa («married couple rocks») are two rocks of differing sizes — Otoiwa (male, 9 m) and Meiwa (female, 4 m) — rising from the sea before Futami Okitama Shrine in Futami-cho, Ise City, Mie Prefecture. They are linked by a 35 m, 40 kg sacred shimenawa rope, symbolizing marital harmony and matchmaking. The shimenawa is replaced three times each year (May 5, September 5, mid-December) in shrine rituals. Only around the summer solstice (May to July) does the sun rise directly between the two rocks, producing a world-class spectacle in which the silhouette of Mt. Fuji can also be seen on rare days — one of Japan's rarest photographic alignments."
    ),
    highlights: {
      ja: [
        "夫婦岩 — 大岩(男岩、9m)と小岩(女岩、4m)、夫婦円満の象徴、年3回の大注連縄張替神事",
        "夏至前後の日の出 — 5〜7月のみ、2つの岩の間から朝日が昇る、特に6月初旬は晴天率高",
        "富士山遠望 — 年に数日、200km先の富士山シルエットが見える奇跡の朝、冬至〜2月の特定条件",
        "二見興玉神社 — 猿田彦大神を祀る、伊勢神宮参拝前の禊ぎの社、蛙の像「無事帰る」",
        "二見浦海岸 — 古来からの禊ぎ場、明治の伊勢参詣で立ち寄り必須の聖地、白砂の海岸線",
      ],
      en: [
        "Meoto Iwa — Otoiwa (male, 9 m) and Meiwa (female, 4 m), symbol of marital harmony, with the shimenawa replaced in three annual rituals",
        "Sunrise around the solstice — only May through July does the sun rise between the two rocks; clear-sky odds peak in early June",
        "Mt. Fuji on the horizon — on rare days, Mt. Fuji's silhouette appears 200 km away; conditions align only briefly between the winter solstice and February",
        "Futami Okitama Shrine — enshrines Sarutahiko-no-Okami, the purification site visited before pilgrimage to Ise Jingu, with frog statues («buji kaeru,» a homophone for «return safely»)",
        "Futami Bay coast — an ancient ritual purification site and a mandatory stop on the Meiji-era Ise pilgrimage route, with white-sand shoreline",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "夫婦岩とは?", a: "三重県伊勢市の二見興玉神社前の海に立つ大小2つの岩で、大注連縄(35m、40kg)で結ばれた夫婦円満の象徴。5〜7月の夏至前後のみ2つの岩の間から日の出が昇る世界的にも珍しい絶景です。" },
        { q: "日の出撮影の具体的な時期と時間は?", a: "5月〜7月下旬、特に夏至(6/21前後)が中心。日の出時刻は4:40〜5:00頃。三脚+望遠レンズで1時間前到着推奨。富士山シルエットが見える奇跡の朝は12月〜2月の特定条件下のみ。" },
        { q: "アクセスは?", a: "JR二見浦駅から徒歩15分、伊勢神宮内宮から車で約15分。駐車場あり(無料)。日の出撮影は夜明け前の到着が必須なので、二見浦温泉や鳥羽の宿が便利です。" },
        { q: "撮影機材のおすすめは?", a: "三脚必須(夜明け前の長秒露光)。望遠70-200mmで岩の間に太陽を圧縮構図、広角16-35mmで海と空を広く。ND8/ハーフNDで明暗差軽減、CPLで反射調整。雲が多い日は日の出後の朝焼け色が映える。波打ち際は塩害対策(レインカバー、撮影後の真水洗浄)を。" },
        { q: "夫婦岩の注連縄張替えはいつ?", a: "毎年5月5日・9月5日・12月の年3回、二見興玉神社で「夫婦岩大注連縄張神事」を執行。長さ35m・重さ40kgの大注連縄を5本(計175m)張替える神聖な儀式。撮影は許可されており、神主が岩に登り綱を結ぶ姿は他では見られない祭事撮影の機会です。" },
        { q: "周辺の温泉・宿泊は?", a: "二見浦温泉(海岸沿いの宿、夫婦岩まで徒歩圏内)、鳥羽の海鮮宿(車15分)、伊勢市駅周辺ホテル。日の出撮影には二見浦温泉が最便利、3:30起床で4:00出発、4:30に岩前到着が確実。1泊朝食付き8,000〜15,000円程度、料理重視なら鳥羽の海女小屋料理体験(2,500円〜)も。" },
      ],
      en: [
        { q: "What are the Meoto Iwa?", a: "Two rocks rising from the sea before Futami Okitama Shrine in Ise, Mie Prefecture, joined by a 35 m, 40 kg sacred rope. Symbols of marital harmony, they offer one of the world's rarest sights: the sun rising directly between them around the summer solstice." },
        { q: "Specific dates and times for sunrise shots?", a: "Mid-May to late July, peaking around the solstice (June 21). Sunrise 4:40–5:00 AM. Arrive with tripod and telephoto lens an hour before. The miraculous mornings with Mt. Fuji silhouette occur only under specific conditions from December to February." },
        { q: "How do I get there?", a: "15 minutes on foot from JR Futaminoura Station, or 15 minutes by car from Ise Jingu Naiku. Free parking available. For sunrise shoots, arriving before dawn is essential — staying at Futamiura Onsen or Toba accommodations is most practical." },
        { q: "Recommended camera gear?", a: "Tripod essential (long exposure pre-dawn). Telephoto 70–200mm to compress the sun between rocks; wide 16–35mm for sea and sky. ND8 / graduated ND smooths exposure; CPL adjusts reflections. Cloudy days bring rich post-sunrise color. The shoreline calls for salt-spray protection (rain cover, fresh-water rinse afterwards)." },
        { q: "When are the rope-changing rituals?", a: "Three times a year — May 5, September 5, and December — Futami Okitama Shrine performs the «Meoto Iwa Onaha Hari Shinji.» Five sections of rope (35 m / 40 kg each, 175 m total) are renewed in a sacred ceremony. Photography is permitted; priests climbing the rocks to tie the ropes is a unique festival subject." },
        { q: "Onsen and lodging?", a: "Futamiura Onsen (seaside ryokan within walking distance of Meoto Iwa), Toba seafood inns (15 min by car), and Ise city hotels. Futamiura is most convenient for sunrise — 3:30 wake, 4:00 departure, 4:30 arrival at the rocks. Lodging from ¥8,000–15,000 with breakfast. For dining, ama-goya (woman diver hut) experiences in Toba (from ¥2,500) are unforgettable." },
      ],
    },
    faqs: [
      { q: d("日の出撮影の具体的な時期と時間は？","Specific dates and times for sunrise shots?","日出拍摄具体时间？","日出拍攝具體時間？","일출 촬영 구체적 시기·시간은?"),
        a: d("5月〜7月下旬、特に夏至（6/21前後）が中心。日の出時刻は4:40〜5:00頃。三脚＋望遠レンズで1時間前に到着推奨。","Mid-May to late July, peaking around the solstice (June 21). Sunrise 4:40–5:00 AM. Arrive with tripod and telephoto lens an hour before.","5月至7月下旬，夏至前后（6/21）为中心。日出4:40-5:00左右。建议携三脚架+长焦镜头提前1小时到达。","5月至7月下旬，夏至前後（6/21）為中心。日出4:40-5:00左右。建議攜三腳架+長焦鏡頭提前1小時到達。","5월~7월 하순, 특히 하지(6/21) 무렵. 일출 시각 4:40~5:00. 삼각대+망원 렌즈로 1시간 전 도착 권장.") },
    ],
  },
  "おはらい町・おかげ横丁": {
    desc: d(
      "内宮前の石畳の参道・おはらい町は江戸〜明治の町並みを再現。その中ほどにある「おかげ横丁」は参拝後の賑わいの場で、赤福本店、伊勢うどん、てこね寿司などグルメと風情が楽しめる。",
      "Oharaimachi is the stone-paved approach to Naiku, reconstructed in Edo-to-Meiji style. At its center, 'Okage Yokocho' is the lively post-worship district — enjoy Akafuku, Ise udon, and tekone-zushi amid nostalgic architecture.",
      "内宫前石板参道御祓町再现江户至明治街景。中段的「御荫横丁」是参拜后热闹区域，赤福本店、伊势乌冬、手捏寿司等美食与风情兼具。",
      "內宮前石板參道御祓町再現江戶至明治街景。中段的「御蔭橫丁」是參拜後熱鬧區域，赤福本店、伊勢烏龍、手捏壽司等美食與風情兼具。",
      "내궁 앞 돌길 참배로 오하라이마치는 에도~메이지 시대 거리를 재현. 그 중간의 '오카게요코초'는 참배 후 활기찬 구역으로 아카후쿠 본점, 이세 우동, 데코네즈시 등 먹거리와 정취를 즐길 수 있습니다."
    ),
    definition: lh(
      "おはらい町・おかげ横丁(おはらいまち・おかげよこちょう)は三重県伊勢市の伊勢神宮内宮(皇大神宮)門前に広がる石畳の参道(全長約800m)で、江戸末期から明治初期の伊勢路の町並みを再現した観光商業地区。中心部にある「おかげ横丁」(2,700坪、約50店舗)は1993年に「赤福本店」を擁する赤福が創業290周年事業として開発した伝統町並み再現エリアで、伊勢神宮参拝後の「お蔭まいり」文化を体現します。赤福本店、伊勢うどん、てこね寿司、松阪牛、神宮酒場、伊勢萬古焼など、伊勢の食文化と伝統工芸が一堂に集まり、年間約400万人が訪れる日本有数の門前町です。",
      "Oharaimachi and Okage Yokocho form an 800 m stone-paved approach to the Inner Shrine (Kotai Jingu) of Ise Jingu in Ise City, Mie Prefecture, recreating the late-Edo to early-Meiji townscape of the Ise pilgrimage route. At its heart, «Okage Yokocho» (2,700 tsubo, about 50 shops) was developed in 1993 by Akafuku as the 290th-anniversary project, embodying the post-pilgrimage «Okage-mairi» tradition. With Akafuku Honten, Ise udon, tekone-zushi, Matsusaka beef, the Jingu Sakaba, and Iseban-ko pottery all gathered in one place, this temple-front district welcomes about 4 million visitors a year and ranks among Japan's foremost approach-streets."
    ),
    highlights: {
      ja: [
        "おかげ横丁 — 江戸〜明治の町並み再現、約50店舗、赤福本店、伊勢うどん、てこね寿司の本場",
        "おはらい町通り — 内宮へ続く石畳の参道、五十鈴川沿いの木造建築の連なり",
        "赤福本店 — 1707年創業の伊勢の名物餅、店内で五十鈴川を眺めながら頂ける",
        "招き猫店・伊勢萬古焼工房 — 伝統工芸店が並び、職人の手仕事を間近で観察",
        "夜のライトアップ — 提灯と石畳のレトロな夜景、雨上がりの石畳の反射が幻想的",
      ],
      en: [
        "Okage Yokocho — recreates the Edo-to-Meiji townscape with about 50 shops, including Akafuku Honten, traditional Ise udon, and tekone-zushi",
        "Oharaimachi Street — the stone-paved approach to the Inner Shrine, lined with wooden buildings along the Isuzu River",
        "Akafuku Honten — Ise's famous mochi shop founded in 1707; enjoy it inside while gazing at the Isuzu River",
        "Maneki-neko Shop and Iseban-ko Pottery — traditional craft shops where you can watch artisans at work",
        "Evening Illumination — lanterns and stone paving create a retro nightscape, especially atmospheric when wet stone reflects light after rain",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "おはらい町・おかげ横丁とは?", a: "三重県伊勢市の伊勢神宮内宮門前に広がる全長約800mの石畳の参道で、江戸末期〜明治初期の伊勢路の町並みを再現。1993年赤福が開発した「おかげ横丁」(50店舗)を中心に、年間400万人が訪れる日本有数の門前町です。" },
        { q: "ベストな時間帯は?", a: "早朝7〜9時は観光客が少なく、木造建築の陰影が美しい撮影タイム。夕方〜夜のライトアップは提灯の灯りと石畳の組合せが情緒的。雨天の石畳も被写体として秀逸です。" },
        { q: "アクセスと参拝後の流れは?", a: "近鉄宇治山田駅・伊勢市駅からバスで内宮前まで20分。内宮参拝(早朝)→おはらい町・おかげ横丁(朝食〜昼食)が定番ルート。半日で十分に巡れます。" },
        { q: "赤福本店とは?", a: "1707年(宝永4年)創業の伊勢の老舗和菓子店で、おかげ横丁中央の本店は大正期築の木造建築。あんこ餅3個入り300円、赤福氷(夏期)・赤福ぜんざい(冬期)など季節限定メニューも。本店2階の畳席は宇治川を望む絶景、撮影と休憩に最適。朝5時開店。" },
        { q: "おすすめのグルメは?", a: "①伊勢うどん(ぶっといコシなし麺、たまり醤油タレ、550円)②てこね寿司(漁師飯由来の漬けカツオ寿司、1,500円)③伊勢牛串焼き(地元黒毛和牛、1,000円)④松阪牛にぎり(贅沢、1貫1,000円〜)⑤豚捨のコロッケ(100円)。食べ歩きしながら町並み撮影を楽しめます。" },
        { q: "店舗の撮影マナーは?", a: "店内の撮影は店主・スタッフに一声かければ概ね可。商品の単独撮影は控えるのが礼儀(撮影前に購入)。観光客やお店の人物を画面に入れる場合は配慮。三脚は通行妨害になるため使用不可、ストラップも狭い通路で気を付けて。早朝7〜8時は店舗の準備風景も良い被写体に。" },
      ],
      en: [
        { q: "What are Oharaimachi and Okage Yokocho?", a: "An 800 m stone-paved approach to the Inner Shrine of Ise Jingu in Ise City, Mie Prefecture, recreating the late-Edo to early-Meiji Ise pilgrimage townscape. Anchored by «Okage Yokocho» (50 shops, developed by Akafuku in 1993), it welcomes 4 million visitors a year and ranks among Japan's foremost temple-front districts." },
        { q: "Best time of day?", a: "Early morning (7–9 AM) has fewer tourists and beautiful shadows on wooden buildings — the prime photo window. Evening illumination is atmospheric with lanterns and stone paving. Wet stone after rain also photographs well." },
        { q: "Access and post-shrine flow?", a: "From Kintetsu Ujiyamada Station or Iseshi Station, 20 minutes by bus to the Inner Shrine entrance. Classic flow: shrine visit (early morning) → Oharaimachi and Okage Yokocho (breakfast/lunch). Half a day is plenty." },
        { q: "What is Akafuku Honten?", a: "Founded in 1707, Ise's iconic wagashi shop. Its main store at the center of Okage Yokocho is a Taisho-period wooden building. Three-piece red-bean mochi sets ¥300; seasonal specials include akafuku-gori (summer shaved ice) and akafuku-zenzai (winter sweet bean soup). The 2nd-floor tatami seats overlook the Isuzu River — perfect for photography and a break. Opens 5 AM." },
        { q: "Recommended foods?", a: "①Ise udon (fat soft noodles in tamari sauce, ¥550) ②Tekone-zushi (fisherman-style marinated bonito sushi, ¥1,500) ③Ise beef skewers (local Black Wagyu, ¥1,000) ④Matsusaka beef nigiri (luxe, ¥1,000+ per piece) ⑤Buta-sute croquettes (¥100). Walking-and-eating pairs naturally with townscape photography." },
        { q: "Etiquette for photographing inside shops?", a: "Inside-shop photography is generally OK with a quick word to staff. Avoid photographing products without buying. Be considerate when including tourists or shopkeepers. Tripods aren't usable on narrow streets; mind your strap in tight aisles. Early morning 7–8 AM offers the bonus of shopkeepers preparing — beautiful subjects." },
      ],
    },
    faqs: [
      { q: d("ベストな時間帯は？","Best time of day?","最佳时段？","最佳時段？","최적 시간대는?"),
        a: d("早朝7〜9時は観光客が少なく、木造建築の陰影が美しい。夕方〜夜のライトアップも情緒的。雨天の石畳も被写体として秀逸。","Early morning (7–9 AM) has fewer tourists and beautiful shadows on wooden buildings. Evening illumination is atmospheric. Wet stone paving after rain also photographs well.","清晨7-9点人少，木造建筑光影美。傍晚灯饰有情调。雨后石板路也很上镜。","清晨7-9點人少，木造建築光影美。傍晚燈飾有情調。雨後石板路也很上鏡。","이른 아침 7-9시는 관광객이 적고 목조 건축의 음영이 아름답습니다. 저녁 조명도 운치 있고, 비 온 후 돌길도 훌륭한 피사체.") },
    ],
  },
  "朝熊山展望台": {
    desc: d(
      "朝熊山（あさまやま）展望台は標高555m、伊勢志摩国立公園内で最高峰。晴れた日は伊勢湾、富士山、鳥羽湾、そして地上800mの絶景パノラマが一望。天空のポストや足湯もあり。",
      "The Mt. Asama observatory, within Ise-Shima National Park, is the area's highest peak at 555 m. On clear days, it offers panoramic views of Ise Bay, Mt. Fuji, and Toba Bay — 800 m above sea level. A 'Sky Post' and footbath add charm.",
      "朝熊山展望台海拔555米，是伊势志摩国立公园最高峰。晴天可眺望伊势湾、富士山、鸟羽湾的800米高空全景。有天空邮筒和足汤。",
      "朝熊山展望台海拔555米，是伊勢志摩國立公園最高峰。晴天可眺望伊勢灣、富士山、鳥羽灣的800米高空全景。有天空郵筒和足湯。",
      "아사마산 전망대는 해발 555m, 이세시마 국립공원 내 최고봉. 맑은 날에는 이세만, 후지산, 도바만, 지상 800m 절경 파노라마를 조망. '천공 우체통'과 족욕탕도 있습니다."
    ),
    definition: lh(
      "朝熊山(あさまやま)展望台は三重県伊勢市朝熊町、標高555mの朝熊ヶ岳山頂付近にある展望台で、伊勢志摩国立公園内の最高峰。伊勢志摩スカイライン(1964年開通の有料道路、全長16.3km)を通って車・バイクでアクセス可能で、晴天時には眼下に伊勢湾の島々、北西方向に富士山(直線距離約200km)、南には鳥羽湾と志摩半島のリアス式海岸線まで一望できる西日本屈指のパノラマスポット。「天空のポスト」と称される赤いポスト、足湯、開運招福朝熊岳金剛證寺など、伊勢神宮参拝者が「奥の院」として参拝する古来の聖地でもあります。",
      "The Mt. Asama Observatory in Asama-cho, Ise City, Mie Prefecture, sits near the summit of Asamagatake at 555 m — the highest peak within Ise-Shima National Park. Accessible by car or motorcycle via the Ise-Shima Skyline (a 16.3 km toll road opened in 1964), on clear days it commands the islands of Ise Bay below, Mt. Fuji to the northwest about 200 km in the distance, and Toba Bay and the Shima Peninsula's ria coastline to the south — one of western Japan's premier panoramas. With its red «Sky Post,» foot bath, and Kongoshoji Temple (the «inner sanctuary» of Ise Jingu, traditionally visited together with the main shrines), it serves as a sacred site as well as a viewpoint."
    ),
    highlights: {
      ja: [
        "山頂展望台 — 標高555m、東に伊勢湾と富士山、南に鳥羽湾と志摩半島の360度パノラマ",
        "天空のポスト — 山頂の赤いポスト、ハガキを投函できる、富士山との写真が定番",
        "金剛證寺(こんごうしょうじ) — 平安時代創建、伊勢神宮の「奥の院」、宮大工による江戸期の本堂",
        "足湯 — 山頂のレストラン横、伊勢湾を眺めながら無料で利用可、冬の絶景",
        "伊勢志摩スカイライン — 全長16.3km、1964年開通の絶景ドライブ、桜・新緑・紅葉と四季",
      ],
      en: [
        "Summit Observatory — 555 m elevation, 360° panorama with Ise Bay and Mt. Fuji to the east, Toba Bay and the Shima Peninsula to the south",
        "Sky Post — the red mailbox at the summit, where you can drop a postcard; the classic shot pairs it with Mt. Fuji",
        "Kongoshoji Temple — founded in the Heian period, the «inner sanctuary» of Ise Jingu; the Edo-period main hall was built by master shrine carpenters",
        "Foot Bath — beside the summit restaurant, free to use while gazing over Ise Bay; especially memorable in winter",
        "Ise-Shima Skyline — a 16.3 km scenic drive opened in 1964, with cherry blossoms, fresh green, and autumn colors across the seasons",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "朝熊山展望台とは?", a: "三重県伊勢市の標高555mの朝熊ヶ岳山頂付近の展望台で、伊勢志摩国立公園の最高峰。伊勢志摩スカイラインで車アクセス、晴天時に富士山(200km)、伊勢湾、鳥羽湾を一望、「天空のポスト」と足湯のある絶景スポットです。" },
        { q: "富士山が見える条件は?", a: "冬〜春の空気が乾燥した晴天早朝(特に11〜2月)。年間50〜60日程度。日の出前後の逆光シルエットが美しい。降水後の翌日は空気がクリアで富士見え率が上がります。" },
        { q: "アクセスは?", a: "伊勢志摩スカイライン(有料1,270円)を通って車・バイクで山頂まで。伊勢神宮内宮から車で約30分。バス便もあるが本数少なめ。営業時間は7〜19時(季節で変動)、夜は閉鎖されます。" },
        { q: "金剛證寺とは?", a: "山頂近くの真言宗智山派の寺院で、平安時代創建。伊勢神宮の鬼門(東北)を守護する「神宮の奥の院」とされる神仏習合の聖地。江戸時代築の本堂は重要文化財、境内に名工によって作られた仁王門も。神宮参拝後にこの寺へ参るのが伊勢参りの正式な流れでした。撮影は静かに、境内では帽子を脱ぐ礼儀を。" },
        { q: "天空のポストの使い方は?", a: "山頂レストハウス前の赤いポストで、絵はがき(レストハウスで300円)を投函できる本物の郵便ポスト。「朝熊山頂郵便局」の消印が押されて配達される。富士山と一緒に撮る構図が王道、季節限定の朝熊山特別消印もあり、撮影と記念の組合せに最適です。" },
        { q: "周辺の連続観光ルートは?", a: "①伊勢神宮(早朝)→②おはらい町・おかげ横丁(朝食)→③朝熊山展望台(午前、富士山見えれば◎)→④夫婦岩(夕方、または翌朝の日の出)→⑤鳥羽水族館・パールロード(車で1時間)。1泊2日で伊勢志摩の絶景・グルメ・神社をすべて満喫できる定番コースです。" },
      ],
      en: [
        { q: "What is the Mt. Asama Observatory?", a: "An observatory at 555 m near the summit of Asamagatake in Ise City, Mie Prefecture — the highest peak of Ise-Shima National Park. Reached by the Ise-Shima Skyline, on clear days it offers Mt. Fuji (200 km away), Ise Bay, and Toba Bay panoramas, plus the «Sky Post» and a foot bath." },
        { q: "When can Mt. Fuji be seen?", a: "Clear, dry winter-to-spring mornings, especially November to February — about 50–60 days per year. Silhouettes against sunrise are stunning. The day after rain has the cleanest air and the highest odds of seeing Fuji." },
        { q: "Access?", a: "Drive or ride a motorcycle via the Ise-Shima Skyline (toll ¥1,270) to the summit; about 30 minutes by car from Ise Jingu Inner Shrine. Limited bus service available. Hours 7–19 (seasonal); the road closes at night." },
        { q: "What is Kongoshoji Temple?", a: "A Shingon Chizan-school temple near the summit, founded in the Heian period — the «Okunoin» (innermost sanctuary) protecting Ise Jingu from the northeastern «demon gate.» This Shinto-Buddhist syncretic site has an Edo-era main hall (Important Cultural Property) and Niomon gate by master craftsmen. The traditional Ise pilgrimage formally concluded with a visit here after the shrine. Photograph quietly; remove caps within the precincts." },
        { q: "How do I use the Sky Post?", a: "The red mailbox in front of the summit rest house is a real working post box — buy a postcard inside (¥300) and mail it. Cards receive the «Asamasanchodai Post Office» postmark. The classic shot pairs it with Mt. Fuji. Seasonal limited postmarks are also issued — perfect blend of photography and souvenir." },
        { q: "Combined sightseeing route?", a: "①Ise Jingu (early morning) → ②Oharaimachi/Okage Yokocho (breakfast) → ③Mt. Asama Observatory (morning, especially good if Fuji is visible) → ④Meoto Iwa (evening or next morning sunrise) → ⑤Toba Aquarium / Pearl Road (1 hr by car). A two-day itinerary covers Ise-Shima's vistas, cuisine, and shrines." },
      ],
    },
    faqs: [
      { q: d("富士山が見える条件は？","When can Mt. Fuji be seen?","何时能看到富士山？","何時能看到富士山？","후지산이 보이는 조건은?"),
        a: d("冬〜春の空気が乾燥した晴天早朝（特に11〜2月）。年間50〜60日程度。日の出前後の逆光シルエットが美しい。","Clear dry winter-to-spring mornings, especially Nov–Feb, about 50–60 days per year. Silhouette against sunrise is stunning.","冬春空气干燥的晴天清晨（尤其11-2月）。每年约50-60天。日出前后剪影极美。","冬春空氣乾燥的晴天清晨（尤其11-2月）。每年約50-60天。日出前後剪影極美。","겨울~봄 공기가 건조한 맑은 아침(특히 11-2월). 연간 약 50-60일. 일출 전후 실루엣이 아름답습니다.") },
    ],
  },
  "横山展望台": {
    desc: d(
      "横山展望台は英虞湾の多島美を一望できる三重県屈指の絶景ポイント。リアス式海岸に点在する60以上の小島と真珠養殖筏が織りなす風景は、まさに日本の地中海。バリアフリー展望デッキからの撮影が楽しめる。",
      "Yokoyama Observatory overlooks the multi-island beauty of Ago Bay — arguably Mie's most iconic view. Sixty-plus islets dot the ria coastline amid pearl-farming rafts, like a Japanese Mediterranean. Barrier-free deck makes it easy to shoot.",
      "横山展望台可眺望英虞湾多岛美景，是三重县代表绝景。里亚式海岸散落60余座小岛与珍珠养殖筏，宛如日本的地中海。无障碍展望台便于拍摄。",
      "橫山展望台可眺望英虞灣多島美景，是三重縣代表絕景。里亞式海岸散落60餘座小島與珍珠養殖筏，宛如日本的地中海。無障礙展望台便於拍攝。",
      "요코야마 전망대는 아고만의 다도해 절경을 한눈에 담을 수 있는 미에현 대표 전망대. 리아스식 해안에 흩어진 60여 개 섬과 진주 양식 뗏목이 어우러져 일본의 지중해 같습니다. 배리어프리 전망대에서 편하게 촬영 가능."
    ),
    definition: lh(
      "横山展望台(よこやまてんぼうだい)は三重県志摩市阿児町鵜方、標高140mの横山山頂付近にある展望台で、英虞湾(あごわん)のリアス式海岸の多島美を一望できる伊勢志摩国立公園内の代表的な絶景スポット。2018年に横山ビジターセンター・スカイテラスとして大規模リニューアルされ、バリアフリーの木造ウッドデッキ「天空カフェテラス」「桜広場」「見晴らし展望台」など複数のデッキが整備されました。眼下には英虞湾の60を超える小さな島々と真珠養殖の筏が広がり、日本のミコノス島とも称される風景。2016年G7伊勢志摩サミット記念碑も設置されています。",
      "Yokoyama Observatory, atop Mt. Yokoyama (about 140 m) in Ago-cho Ukata, Shima City, Mie Prefecture, is the iconic viewpoint within Ise-Shima National Park overlooking the multi-island beauty of the Ago Bay ria coastline. Following a major 2018 renovation as the «Yokoyama Visitor Center & Sky Terrace,» the site now offers barrier-free wooden boardwalks across multiple decks — the «Sky Café Terrace,» «Sakura Plaza,» and the original observatory. Below, more than 60 small islands and pearl-cultivation rafts dot Ago Bay, earning comparisons to Mykonos. A monument also commemorates the 2016 G7 Ise-Shima Summit."
    ),
    highlights: {
      ja: [
        "天空カフェテラス — 2018年新設のバリアフリーウッドデッキ、英虞湾を見下ろすカフェ併設",
        "見晴らし展望台 — 元からある定番展望台、雲海の朝(秋〜冬)が幻想的",
        "桜広場 — 約200本のソメイヨシノ、4月上旬は桜越しの英虞湾の絶景",
        "G7伊勢志摩サミット記念碑 — 2016年首脳会議開催地として設置",
        "夕景〜ブルーアワー — 真珠筏越しの夕日、島影のシルエット、西日本屈指の夕景スポット",
      ],
      en: [
        "Sky Café Terrace — a barrier-free wooden deck added in 2018, with a café overlooking Ago Bay",
        "Original Observatory — the long-standing main lookout, with autumn-to-winter morning sea-of-clouds turning the bay otherworldly",
        "Sakura Plaza — about 200 Yoshino cherry trees framing Ago Bay in early April",
        "G7 Ise-Shima Summit Monument — installed to commemorate the 2016 leaders' meeting held here",
        "Sunset to Blue Hour — sun setting beyond the pearl rafts and silhouetted islands; one of West Japan's finest sunset spots",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "横山展望台とは?", a: "三重県志摩市の標高140mの横山山頂の展望台で、英虞湾のリアス式海岸と60を超える小島・真珠筏を一望できる伊勢志摩国立公園の代表絶景スポット。2018年バリアフリー化され、日本のミコノス島と称される風景です。" },
        { q: "おすすめ撮影時間は?", a: "日の出〜朝、もしくは夕日に染まる時間帯。特に夕日〜ブルーアワーは島影と真珠筏のシルエットが幻想的。秋〜冬の朝は雲海が出ることもあり、その日のうちは海と空がオレンジ色に。" },
        { q: "アクセスは?", a: "近鉄志摩線「鵜方駅」から車で10分、シャトルバスもあり(夏季のみ)。駐車場あり(無料)。階段なしのバリアフリー設計で、車椅子・ベビーカーでも展望台まで容易にアクセスできます。" },
        { q: "撮影機材は?", a: "広角(16-35mm)で英虞湾全景、標準ズーム(24-105mm)で島と真珠筏のディテール、望遠(70-200mm)で遠方の島々の圧縮構図。三脚OK(混雑時は配慮)。日没〜ブルーアワー撮影は2時間滞在を想定し、防寒装備とヘッドライトを忘れずに。" },
        { q: "雲海の発生条件は?", a: "10〜2月の早朝、晴天で気温が低く無風、前夜に雨や霧があった日。日の出前の30分〜1時間がピーク。雲海の確率は年間20〜30日程度と低めだが、出現したら島々が雲の上に浮かぶ「天空の島」のような構図が撮れます。" },
        { q: "G7サミットと真珠の関係は?", a: "2016年G7伊勢志摩サミットの会場(賢島)はこの英虞湾内。真珠養殖の発祥地として、御木本幸吉が1893年に世界初の真円真珠養殖に成功した歴史も。展望台から見える筏は今も真珠養殖が行われている現役、海の美しさは真珠を育む自然条件の証でもあります。" },
      ],
      en: [
        { q: "What is Yokoyama Observatory?", a: "Atop Mt. Yokoyama (about 140 m) in Shima City, Mie Prefecture — the iconic viewpoint of Ise-Shima National Park overlooking Ago Bay's ria coast with 60+ small islands and pearl rafts. The 2018 barrier-free renewal added new wooden decks; the landscape is often compared to Mykonos." },
        { q: "Recommended time to shoot?", a: "Sunrise to morning, or golden hour to sunset. Sunset-to-blue-hour turns silhouetted islands and pearl rafts into dream-like shapes. Autumn-to-winter mornings sometimes bring sea-of-clouds; the day after often glows orange." },
        { q: "Access?", a: "10 minutes by car from Kintetsu Ukata Station; a shuttle bus runs in summer only. Free parking. The barrier-free design makes the observatory accessible by wheelchair or stroller without stairs." },
        { q: "Camera gear?", a: "Wide angle (16–35mm) for full Ago Bay panorama, standard zoom (24–105mm) for island and raft detail, telephoto (70–200mm) to compress distant islands. Tripods OK (consider crowds). Plan a 2-hour stay for sunset to blue hour, with warm clothing and headlamp." },
        { q: "Conditions for sea-of-clouds?", a: "Cool, clear, windless mornings October–February, especially after rain or fog the night before. Peak 30 min to 1 hour before sunrise. About 20–30 mornings per year — when it appears, islands floating above the clouds («sky islands») make a stunning composition." },
        { q: "G7 summit and pearl history?", a: "The 2016 G7 Ise-Shima Summit was held on Kashikojima within this same Ago Bay. The bay is the birthplace of pearl aquaculture — in 1893 Kokichi Mikimoto here succeeded with the world's first cultured spherical pearls. The rafts you see from the observatory still cultivate pearls today; the bay's beauty itself is testament to the conditions that nurture them." },
      ],
    },
    faqs: [
      { q: d("おすすめ撮影時間は？","Recommended time to shoot?","推荐拍摄时段？","推薦拍攝時段？","추천 촬영 시간대는?"),
        a: d("日の出〜朝、もしくは夕日に染まる時間帯。特に夕日〜ブルーアワーは島影と真珠筏のシルエットが幻想的。","Sunrise to morning, or golden hour to sunset. Golden-to-blue-hour turns islet silhouettes and pearl rafts into dreamy shapes.","日出至清晨，或夕阳时段。黄昏至蓝时刻岛影与珍珠筏剪影梦幻。","日出至清晨，或夕陽時段。黃昏至藍時刻島影與珍珠筏剪影夢幻。","일출~아침 또는 석양 시간대. 특히 저녁~블루아워의 섬 실루엣과 진주 뗏목은 환상적입니다.") },
    ],
  },

  /* ── 京都府 ── */
  "清水寺": {
    desc: d(
      "清水寺は778年創建、世界遺産の京都を代表する寺院。本堂の「清水の舞台」は釘を一本も使わず組まれた木造建築で、高さ13mから京都市街を一望できます。春の桜、秋の紅葉、冬の雪景色、夜間特別拝観とライトアップの光景は息を呑む美しさ。",
      "Kiyomizu-dera, founded in 778 and a UNESCO site, represents Kyoto. The 'Kiyomizu Stage' uses no nails in its wooden framework and overlooks central Kyoto from 13 m up. Cherry blossoms in spring, autumn foliage, winter snow, and evening illumination offer breathtaking scenes.",
      "清水寺创建于778年，世界遗产，京都代表寺院。正殿「清水舞台」为不用一钉的木造建筑，从13米高处俯瞰京都市区。春樱、秋红叶、冬雪、夜间特别拜观与灯光秀令人屏息。",
      "清水寺創建於778年，世界遺產，京都代表寺院。正殿「清水舞台」為不用一釘的木造建築，從13米高處俯瞰京都市區。春櫻、秋紅葉、冬雪、夜間特別拜觀與燈光秀令人屏息。",
      "기요미즈데라는 778년 창건, 세계유산 교토 대표 사찰. 본당 '기요미즈 무대'는 못을 하나도 사용하지 않은 목조 건축으로 13m 높이에서 교토 시가지를 조망. 봄 벚꽃, 가을 단풍, 겨울 설경, 야간 특별 참배와 라이트업이 숨이 멎을 정도로 아름답습니다."
    ),
    definition: {
      ja: "清水寺は778年創建、京都府京都市東山区の真言宗系の単立寺院で、世界遺産「古都京都の文化財」の構成資産の一つ。本堂(国宝)の「清水の舞台」は釘を一本も使わない懸造り(かけづくり)技法による木造建築で、高さ13mの崖上から京都市街を一望できます。年間600万人以上が訪れる京都最大の集客地で、千手観音菩薩を本尊とし、平安時代から続く観音信仰の聖地として、また春の桜・秋の紅葉・冬の雪・夜のライトアップで日本写真の象徴的存在です。",
      en: "Kiyomizu-dera, founded in 778 in Kyoto's Higashiyama Ward, is an independent Shingon-school temple and a constituent property of the UNESCO «Historic Monuments of Ancient Kyoto.» Its National Treasure main hall — the famous «Kiyomizu Stage» — was built without a single nail using the kakezukuri stilt-construction method, projecting 13 m above a hillside with panoramic Kyoto views. Drawing more than 6 million visitors a year, it is Kyoto's most visited site. Enshrining a thousand-armed Kannon, it has been a center of Kannon worship since the Heian period, and its cherry blossoms, autumn colors, winter snow, and night illumination make it iconic in Japanese photography.",
      zh: "清水寺创建于778年，京都府京都市东山区的真言宗单立寺院，世界遗产「古都京都的文化财产」的组成部分之一。本堂(国宝)的「清水舞台」采用不使用一根钉子的悬造(挂造)技法木造建筑，从13米高的崖上俯瞰京都市区。年间访客超过600万人，是京都最大的集客地。以千手观音菩萨为本尊，自平安时代起就是观音信仰的圣地，春樱、秋红叶、冬雪、夜间灯光秀使其成为日本摄影的象征性存在。",
      "zh-tw": "清水寺創建於778年，京都府京都市東山區的真言宗單立寺院，世界遺產「古都京都的文化財產」的組成部分之一。本堂(國寶)的「清水舞台」採用不使用一根釘子的懸造(掛造)技法木造建築，從13米高的崖上俯瞰京都市區。年間訪客超過600萬人，是京都最大的集客地。以千手觀音菩薩為本尊，自平安時代起就是觀音信仰的聖地，春櫻、秋紅葉、冬雪、夜間燈光秀使其成為日本攝影的象徵性存在。",
      ko: "기요미즈데라는 778년 창건, 교토부 교토시 히가시야마구의 진언종계 단립 사찰로, 세계유산 「고도 교토의 문화재」 구성자산 중 하나. 본당(국보)의 「기요미즈 무대」는 못을 하나도 사용하지 않는 카케즈쿠리(挂造) 기법의 목조 건축으로, 13m 높이의 절벽 위에서 교토 시가지를 조망할 수 있습니다. 연간 600만 명 이상이 방문하는 교토 최대의 집객지로, 천수관음보살을 본존으로 모시며 헤이안 시대부터 이어지는 관음 신앙의 성지, 또한 봄의 벚꽃·가을의 단풍·겨울의 눈·야간 라이트업으로 일본 사진의 상징적 존재입니다.",
    },
    highlights: {
      ja: [
        "本堂「清水の舞台」 — 国宝、釘を一本も使わない懸造り、高さ13mから京都市街と桜・紅葉を一望",
        "三重塔(さんじゅうのとう) — 高さ31mの朱塗り三重塔、京都を象徴する写真フレーム、桜と紅葉の借景",
        "仁王門と西門 — 鮮やかな朱の二層門、参道(産寧坂・二年坂)からの登り口、夕陽が差す西門は絶景",
        "音羽の瀧 — 寺名の由来となった三筋の清水、それぞれ「学業」「恋愛」「延命」のご利益",
        "地主神社(じしゅじんじゃ) — 清水寺本堂背後の縁結びの神社、桜の名所(地主桜)、現在は工事のため2025年まで閉鎖",
      ],
      en: [
        "Main Hall and «Kiyomizu Stage» — National Treasure, built without nails using kakezukuri stilt construction, with a 13 m drop overlooking Kyoto and the cherry/maple canopy",
        "Three-Story Pagoda (Sanjunoto) — 31 m vermilion pagoda, an iconic Kyoto frame paired with cherry blossoms and autumn foliage",
        "Niomon and West Gate — vivid two-tier vermilion gates at the top of the Sannenzaka and Ninenzaka approach; the West Gate at sunset is unforgettable",
        "Otowa Falls — the «sound-of-feathers» triple stream that gave the temple its name; each thread offers a different blessing (study, love, longevity)",
        "Jishu Shrine — the «matchmaking» shrine behind the main hall, famous for jishu-zakura cherry trees; closed for renovation through 2025",
      ],
      zh: [
        "本堂「清水舞台」— 国宝，不使用一根钉子的悬造，从13米高度俯瞰京都市区与樱花·红叶",
        "三重塔 — 高31米朱漆三重塔，京都象征性的摄影画框，与樱花和红叶借景",
        "仁王门与西门 — 鲜艳朱漆二层门，参道(产宁坂·二年坂)的登门口，夕阳下的西门绝景",
        "音羽之瀑 — 寺名由来的三股清水，分别有「学业」「恋爱」「长寿」的功德",
        "地主神社 — 清水寺本堂背后的结缘神社，樱花名所(地主樱)，现因施工至2025年关闭",
      ],
      "zh-tw": [
        "本堂「清水舞台」— 國寶，不使用一根釘子的懸造，從13米高度俯瞰京都市區與櫻花·紅葉",
        "三重塔 — 高31米朱漆三重塔，京都象徵性的攝影畫框，與櫻花和紅葉借景",
        "仁王門與西門 — 鮮豔朱漆二層門，參道(產寧坂·二年坂)的登門口，夕陽下的西門絕景",
        "音羽之瀑 — 寺名由來的三股清水，分別有「學業」「戀愛」「長壽」的功德",
        "地主神社 — 清水寺本堂背後的結緣神社，櫻花名所(地主櫻)，現因施工至2025年關閉",
      ],
      ko: [
        "본당 「기요미즈 무대」 — 국보, 못을 하나도 사용하지 않는 카케즈쿠리, 13m 높이에서 교토 시가지와 벚꽃·단풍을 조망",
        "삼중탑 — 높이 31m의 주칠 삼중탑, 교토를 상징하는 사진 프레임, 벚꽃과 단풍을 차경",
        "니오몬과 서문 — 선명한 주칠 이층문, 참배길(산넨자카·니넨자카)에서 오르는 입구, 석양이 비치는 서문은 절경",
        "오토와 폭포 — 절 이름의 유래가 된 세 갈래의 청수, 각각 「학업」「연애」「장수」의 영험",
        "지슈 신사 — 기요미즈데라 본당 뒤편의 결연 신사, 벚꽃 명소(지슈자쿠라), 현재 공사 중으로 2025년까지 폐쇄",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "清水寺とは?", a: "778年創建、京都市東山区の世界遺産寺院。本堂「清水の舞台」は釘を一本も使わない懸造りの木造建築で、高さ13mから京都市街を一望。年間600万人以上が訪れる京都最大の集客地です。" },
        { q: "拝観時間と料金は?", a: "通常6:00開門、18:00閉門(時期で変動)、大人400円。春・夏・秋の特別夜間拝観時は21時頃まで(別途700円程度)。早朝6時開門時が人が最も少なく光も柔らかい撮影タイムです。" },
        { q: "撮影ベストシーズンは?", a: "桜の3月下旬〜4月上旬、新緑の5月、紅葉の11月下旬〜12月初旬がピーク。夜間ライトアップは特別期間のみで圧倒的に幻想的。雪が積もる冬は年に数回だけのレア構図です。" },
        { q: "アクセス方法は?", a: "京都駅からバス206系統で「五条坂」または「清水道」下車徒歩10分。タクシーで約15分2,000円。京阪電車「清水五条」駅から徒歩約25分。混雑期は地下鉄+バスより徒歩がスムーズです。" },
        { q: "三脚は使用可能?", a: "境内は三脚禁止。本堂内部・夜間ライトアップ時も同様。手持ち撮影が前提のため、F2.8〜F4の明るいレンズと高ISO耐性カメラを推奨。一脚も同じく禁止です。" },
        { q: "「清水の舞台から飛び降りる」の由来は?", a: "江戸時代、舞台から飛び降りて命があれば願いが叶うという俗信があり、234人が飛び降りた記録(生存率85%)。現在は欄干が高くされ立入禁止。この故事が「重大な決断」の慣用句となりました。" },
      ],
      en: [
        { q: "What is Kiyomizu-dera?", a: "A UNESCO World Heritage temple founded in 778 in Kyoto's Higashiyama Ward. The «Kiyomizu Stage» of the main hall — built without a single nail in kakezukuri stilt construction — projects 13 m above the hillside, offering panoramic city views. Over 6 million visitors annually make it Kyoto's most popular site." },
        { q: "What are opening hours and fees?", a: "Generally 6:00 to 18:00 (varies seasonally), ¥400 for adults. Special evening illumination periods in spring, summer, and autumn extend to ~21:00 (additional ¥700). The 6 AM opening is the quietest and offers the softest light for photography." },
        { q: "When is the best season to photograph it?", a: "Cherry blossoms peak late March to early April, fresh greenery in May, autumn colors late November to early December. The night illumination, held only during special periods, is the most magical. Winter snow shots are rare — possible only a few times a year." },
        { q: "How do I get there?", a: "From Kyoto Station, Bus 206 to «Gojozaka» or «Kiyomizu-michi,» then 10 min walk. Taxi about 15 min, ¥2,000. From Keihan «Kiyomizu-Gojo» Station, ~25 min walk. During peak season, walking is often smoother than the subway+bus combo." },
        { q: "Can I use a tripod?", a: "Tripods are forbidden on the grounds, inside the main hall, and during night illumination. Plan for handheld shooting — bring a fast lens (f/2.8–f/4) and a camera with strong high-ISO performance. Monopods are also forbidden." },
        { q: "What is the origin of «leaping from the Kiyomizu stage»?", a: "In the Edo period, surviving a leap from the stage was said to grant your wish — 234 jumps were recorded (85% survival). Today high railings prevent access. The phrase has become Japanese idiom for «taking a momentous decision.»" },
      ],
      zh: [
        { q: "清水寺是什么?", a: "778年创建，京都市东山区的世界遗产寺院。本堂「清水舞台」是不使用一根钉子的悬造木造建筑，从13米高俯瞰京都市区。年间访客超过600万人，是京都最大的集客地。" },
        { q: "参拜时间与门票?", a: "通常6:00开门、18:00闭门(随季节变动)，大人400日元。春·夏·秋的特别夜间参拜时延至21时左右(另收700日元左右)。清晨6点开门时人最少光线也柔和，是最佳拍摄时段。" },
        { q: "拍摄最佳季节?", a: "樱花的3月下旬~4月上旬、新绿的5月、红叶的11月下旬~12月初旬为高峰。夜间灯光只在特别期间举办，幻想感压倒性。积雪的冬天每年只有数次，是稀有构图。" },
        { q: "怎么去?", a: "京都站乘巴士206系统至「五条坂」或「清水道」下车步行10分钟。出租车约15分钟2,000日元。京阪电车「清水五条」站步行约25分钟。拥堵期步行比地铁+巴士更顺畅。" },
        { q: "可以使用三脚架吗?", a: "境内禁用三脚架。本堂内部、夜间灯光时同样禁用。手持拍摄为前提，建议F2.8~F4大光圈镜头和高ISO耐性相机。一脚架也同样禁止。" },
        { q: "「从清水舞台跳下」的由来?", a: "江户时代，从舞台跳下若幸存愿望就能实现的迷信，记录有234人跳下(生存率85%)。现在栏杆增高已禁止进入。这个故事成为「重大决断」的惯用语。" },
      ],
      "zh-tw": [
        { q: "清水寺是什麼?", a: "778年創建，京都市東山區的世界遺產寺院。本堂「清水舞台」是不使用一根釘子的懸造木造建築，從13米高俯瞰京都市區。年間訪客超過600萬人，是京都最大的集客地。" },
        { q: "參拜時間與門票?", a: "通常6:00開門、18:00閉門(隨季節變動)，大人400日圓。春·夏·秋的特別夜間參拜時延至21時左右(另收700日圓左右)。清晨6點開門時人最少光線也柔和，是最佳拍攝時段。" },
        { q: "拍攝最佳季節?", a: "櫻花的3月下旬~4月上旬、新綠的5月、紅葉的11月下旬~12月初旬為高峰。夜間燈光只在特別期間舉辦，幻想感壓倒性。積雪的冬天每年只有數次，是稀有構圖。" },
        { q: "怎麼去?", a: "京都車站搭巴士206系統至「五條坂」或「清水道」下車步行10分鐘。計程車約15分鐘2,000日圓。京阪電車「清水五條」站步行約25分鐘。擁堵期步行比地鐵+巴士更順暢。" },
        { q: "可以使用三腳架嗎?", a: "境內禁用三腳架。本堂內部、夜間燈光時同樣禁用。手持拍攝為前提，建議F2.8~F4大光圈鏡頭和高ISO耐性相機。一腳架也同樣禁止。" },
        { q: "「從清水舞台跳下」的由來?", a: "江戶時代，從舞台跳下若倖存願望就能實現的迷信，記錄有234人跳下(生存率85%)。現在欄杆增高已禁止進入。這個故事成為「重大決斷」的慣用語。" },
      ],
      ko: [
        { q: "기요미즈데라란?", a: "778년 창건, 교토시 히가시야마구의 세계유산 사찰. 본당 「기요미즈 무대」는 못을 하나도 사용하지 않는 카케즈쿠리 목조 건축으로 13m 높이에서 교토 시가지를 조망. 연간 600만 명 이상이 방문하는 교토 최대의 집객지입니다." },
        { q: "참배 시간과 요금은?", a: "일반적으로 6:00 개문, 18:00 폐문(시기에 따라 변동), 어른 400엔. 봄·여름·가을의 특별 야간 참배 시는 21시경까지(별도 700엔 정도). 이른 아침 6시 개문 시간이 가장 사람이 적고 빛도 부드러운 촬영 타임입니다." },
        { q: "촬영 베스트 시즌은?", a: "벚꽃의 3월 하순~4월 상순, 신록의 5월, 단풍의 11월 하순~12월 초순이 절정. 야간 라이트업은 특별 기간에만 개최되어 압도적으로 환상적. 눈 쌓이는 겨울은 연 몇 번뿐인 레어 구도입니다." },
        { q: "가는 방법은?", a: "교토역에서 버스 206계통으로 「고조자카」또는「기요미즈미치」하차 도보 10분. 택시로 약 15분 2,000엔. 게이한 전철 「기요미즈고조」역에서 도보 약 25분. 혼잡기는 지하철+버스보다 도보가 원활합니다." },
        { q: "삼각대 사용 가능?", a: "경내는 삼각대 금지. 본당 내부·야간 라이트업 시도 마찬가지. 핸드헬드 촬영이 전제이므로 F2.8~F4의 밝은 렌즈와 고ISO 내성 카메라를 추천. 일각대도 마찬가지로 금지입니다." },
        { q: "「기요미즈 무대에서 뛰어내린다」의 유래는?", a: "에도 시대, 무대에서 뛰어내려 목숨을 건지면 소원이 이루어진다는 속신이 있어 234명이 뛰어내린 기록(생존율 85%). 현재는 난간이 높아져 출입 금지. 이 고사가 「중대한 결단」의 관용구가 되었습니다." },
      ],
    },
    faqs: [
      { q: d("清水寺の夜間拝観はいつ？","When is the evening illumination?","清水寺夜间参拜何时？","清水寺夜間參拜何時？","기요미즈데라 야간 참배는 언제?"),
        a: d("春（3月末の桜）、夏（8月千日詣り）、秋（11月末〜12月初の紅葉）の限定期間のみ。18時〜21時頃、要個別チェック。","Limited periods in spring (late March cherry blossoms), summer (Sennichi-mairi in August), and autumn (late Nov–early Dec foliage), roughly 18:00–21:00. Check dates.","限春（3月末樱花）、夏（8月千日诣）、秋（11月末至12月初红叶）开放。18-21点前后，需查具体日期。","限春（3月末櫻花）、夏（8月千日詣）、秋（11月末至12月初紅葉）開放。18-21點前後，需查具體日期。","봄(3월 말 벚꽃), 여름(8월 센니치마이리), 가을(11월 말~12월 초 단풍) 한정. 18-21시경, 날짜 확인 필요.") },
    ],
  },
  "金閣寺": {
    desc: d(
      "金閣寺（鹿苑寺）は1397年建立、全面を金箔で覆った3層の楼閣が鏡湖池に映る絶景で知られます。世界遺産。雪が積もった『雪の金閣』は一生に一度見られるかの名場面。池越しの王道構図が必撮。",
      "Kinkaku-ji, built in 1397, is the Golden Pavilion — a three-story structure covered in gold leaf reflected in Kyoko-chi pond. A UNESCO site. The 'Snow-capped Kinkaku' is a once-in-a-lifetime vista; the classic shot is from across the pond.",
      "金阁寺（鹿苑寺）建于1397年，整体贴金箔的三层楼阁倒映于镜湖池。世界遗产。雪中的「雪金阁」一生难遇。池畔经典构图是必拍镜头。",
      "金閣寺（鹿苑寺）建於1397年，整體貼金箔的三層樓閣倒映於鏡湖池。世界遺產。雪中的「雪金閣」一生難遇。池畔經典構圖是必拍鏡頭。",
      "긴카쿠지(로쿠온지)는 1397년 건립, 전면을 금박으로 덮은 3층 누각이 교코치 연못에 비치는 절경으로 유명. 세계유산. 눈 덮인 '설금각'은 일생에 한 번 볼까 말까 한 명장면. 연못 너머의 정석 구도는 반드시 찍어야 할 장면."
    ),
    definition: lh(
      "金閣寺(正式名称・鹿苑寺(ろくおんじ))は1397年に室町幕府3代将軍・足利義満が造営した山荘「北山殿」を起源とする臨済宗相国寺派の禅寺で、世界遺産「古都京都の文化財」の構成資産。三層の楼閣全面を金箔で覆った舎利殿が「金閣」と呼ばれ、寺院全体の通称になっています。鏡湖池(きょうこち)に映る逆さ金閣は世界中で最も有名な日本建築の構図の一つで、1950年放火事件により焼失後、1955年に再建、1987年と2003年に金箔の張り替えが行われました。",
      "Kinkaku-ji (formally Rokuon-ji) is a Rinzai Zen temple of the Shokoku-ji branch, founded on the site of the Kitayama Villa established in 1397 by Ashikaga Yoshimitsu, third shogun of the Muromachi shogunate, and a constituent property of UNESCO's «Historic Monuments of Ancient Kyoto.» Its three-tier reliquary hall, completely covered in gold leaf, is known as the «Golden Pavilion» (Kinkaku) and gives the entire temple its popular name. The inverted reflection in Kyoko-chi pond is one of the world's most famous frames of Japanese architecture; the original burned in a 1950 arson and was rebuilt in 1955, with the gold leaf renewed in 1987 and 2003."
    ),
    highlights: {
      ja: [
        "金閣(舎利殿) — 三層構造、上二層に金箔約20kg分、最上層は禅宗様、頂部に鳳凰像、鏡湖池への倒影が王道構図",
        "鏡湖池(きょうこち) — 池に浮かぶ9つの島と岩を借景に、無風時は完璧な水鏡、雨上がりは更に鮮明",
        "陸舟(りくしゅう)の松 — 義満手植えと伝わる樹齢約600年の松、舟の形に剪定された名木",
        "夕佳亭(せっかてい) — 江戸時代の茶室、後水尾天皇行幸の場、「夕日に映える金閣を眺める」名前の由来",
        "雪化粧の金閣 — 京都中心部の積雪は年数回のみ、雪と金箔のコントラストは「一生に一度」の被写体",
      ],
      en: [
        "Kinkaku (Reliquary Hall) — three tiers, with about 20 kg of gold leaf on the upper two; topped by a phoenix in the Zen Buddhist style. The reflection in Kyoko-chi pond is the classic frame",
        "Kyoko-chi Pond — punctuated by nine borrowed islands and stones; on a windless day, a perfect mirror, especially after rain",
        "Rikushu Pine — said to have been planted by Yoshimitsu, this ~600-year-old pine is pruned to resemble a boat",
        "Sekkatei Tearoom — an Edo-period tea pavilion visited by Emperor Gomizunoo; its name evokes «watching the Golden Pavilion glow at sunset»",
        "Snow-capped Kinkaku — central Kyoto sees snow only a handful of times a year, making the snow-and-gold contrast a once-in-a-lifetime subject",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "金閣寺とは?", a: "1397年に足利義満が造営した山荘「北山殿」を起源とする臨済宗の禅寺、正式名称は鹿苑寺(ろくおんじ)。三層楼閣の全面を金箔で覆った舎利殿が「金閣」と呼ばれ、世界遺産「古都京都の文化財」の構成資産です。" },
        { q: "金閣を綺麗に撮るコツは?", a: "朝9時開門直後、順光(南向き)の時間帯がベスト。PLフィルターで水面反射を調整すると金閣の倒影が鮮やかに。雨上がりの水鏡も狙えます。三脚は禁止区域あり、要事前確認。" },
        { q: "ベストシーズンは?", a: "通年美しいですが、桜の3月末、新緑の5月、紅葉の11月中旬〜下旬が華やか。雪の金閣は12月下旬〜2月の数日のみ。冬の早朝は気温0℃以下で池の水が澄み、最高の水鏡が現れます。" },
        { q: "拝観時間と料金は?", a: "通年9:00〜17:00開門、年中無休。大人500円、小中学生300円。御朱印は別途300円。混雑回避なら開門直後の9:00〜10:00または閉門前の16:00〜17:00。修学旅行が多い春・秋は平日でも10時以降混雑します。" },
        { q: "アクセスは?", a: "京都駅から市バス101または205系統で「金閣寺道」下車徒歩3分・所要40分・230円。地下鉄烏丸線「北大路駅」からバス12分。タクシーで京都駅から約20分・1,800円。観覧後、徒歩10分の龍安寺(石庭で有名)への組合せ訪問が定番。" },
        { q: "1950年放火事件と現在の建物の関係は?", a: "1950年7月2日、見習い僧侶の放火で当時の金閣(鎌倉時代の創建)は焼失。1955年に再建、1987年と2003年に金箔を張り替え、現存の金閣はこの再建物。三島由紀夫の小説「金閣寺」(1956年)はこの事件を題材にした近代日本文学の代表作です。" },
      ],
      en: [
        { q: "What is Kinkaku-ji?", a: "A Rinzai Zen temple — formally Rokuon-ji — founded on the site of the Kitayama Villa built in 1397 by shogun Ashikaga Yoshimitsu. Its three-tier reliquary hall covered entirely in gold leaf is called «Kinkaku» (Golden Pavilion) and the temple is a constituent property of UNESCO's «Historic Monuments of Ancient Kyoto.»" },
        { q: "Tips for photographing Kinkaku?", a: "Right at 9 AM opening in forward light (facing south) is best. A polarizing filter helps tune the water reflection for a vivid mirror image. After rain also yields beautiful mirror shots. Tripod use is restricted in some zones — confirm in advance." },
        { q: "When is the best season to visit?", a: "Beautiful year-round, but cherry blossoms in late March, fresh green in May, and autumn colors mid-to-late November all add color. Snow-capped Kinkaku is rare — only a few days from late December to February. Winter mornings below 0 °C produce the clearest pond mirror." },
        { q: "Hours and admission?", a: "9:00–17:00 daily, year-round. Adults ¥500, elementary/middle school ¥300. Goshuin (shrine seal) ¥300 extra. To avoid crowds, visit 9:00–10:00 right at opening or 16:00–17:00 before closing. Spring and autumn (school trip seasons) are crowded even on weekdays after 10 AM." },
        { q: "How do I get there?", a: "From Kyoto Station, City Bus 101 or 205 to «Kinkakuji-michi» stop, then 3-min walk — 40 min total, ¥230. From Karasuma Subway Line «Kitaoji» Station, 12-min bus. Taxi from Kyoto Station ~20 min, ¥1,800. After visiting, the 10-min walk to Ryoan-ji (famous rock garden) is a classic pairing." },
        { q: "What about the 1950 fire and the current building?", a: "On July 2, 1950, a novice monk set the original (Kamakura-era) Kinkaku ablaze, destroying it. The current building was reconstructed in 1955, with gold leaf renewed in 1987 and 2003. Yukio Mishima's 1956 novel «Kinkaku-ji» fictionalized the event and remains a touchstone of modern Japanese literature." },
      ],
    },
    faqs: [
      { q: d("金閣を綺麗に撮るコツは？","Tips for photographing Kinkaku?","金阁拍摄技巧？","金閣拍攝技巧？","긴카쿠 촬영 팁은?"),
        a: d("朝9時開門直後、順光（南向き）の時間帯がベスト。PLフィルターで水面反射を調整すると金閣の倒影が鮮やかに。雨上がりの水鏡も狙える。","Right at 9 AM opening in forward light (facing south) is best. PL filter helps control water reflection for vivid mirror image. After rain also yields mirror shots.","上午9点开门后顺光（朝南）时段最佳。PL滤镜调整水面反光使倒影更清。雨后水镜也可拍。","上午9點開門後順光（朝南）時段最佳。PL濾鏡調整水面反光使倒影更清。雨後水鏡也可拍。","오전 9시 개문 직후 순광(남향) 시간대가 최고. PL 필터로 수면 반사를 조정하면 금각의 반영이 선명해집니다. 비온 뒤 수경도 노릴 수 있습니다.") },
    ],
  },
  "平等院鳳凰堂": {
    desc: d(
      "平等院鳳凰堂は1053年創建の世界遺産、10円硬貨の裏面に描かれた日本を代表する建造物。阿字池に浮かぶように建つ左右対称の優美な姿は、極楽浄土を地上に写したもの。春の藤、夏の緑、秋の紅葉、冬の静寂、どの季節も絵になる。",
      "Byodoin Phoenix Hall, a UNESCO site built in 1053, is depicted on the reverse of the ¥10 coin — an icon of Japan. Its symmetrical form appears to float on Aji Pond, a vision of the Pure Land made earthly. Wisteria in spring, green in summer, autumn foliage, and winter silence all photograph beautifully.",
      "平等院凤凰堂创建于1053年，世界遗产，10日元硬币背面所绘日本代表建筑。左右对称的优雅身姿浮于阿字池，如将极乐净土再现于地上。春紫藤、夏绿意、秋红叶、冬静寂皆入画。",
      "平等院鳳凰堂創建於1053年，世界遺產，10日圓硬幣背面所繪日本代表建築。左右對稱的優雅身姿浮於阿字池，如將極樂淨土再現於地上。春紫藤、夏綠意、秋紅葉、冬靜寂皆入畫。",
      "뵤도인 호오도는 1053년 창건 세계유산, 10엔 주화 뒷면에 그려진 일본 대표 건축물. 아지 연못에 떠 있듯 좌우대칭으로 서 있는 우아한 자태는 극락정토를 지상에 옮긴 것. 봄 등나무, 여름 녹음, 가을 단풍, 겨울 정적 모두 그림이 됩니다."
    ),
    definition: lh(
      "平等院鳳凰堂(ほうおうどう)は京都府宇治市にある藤原氏ゆかりの天台宗・浄土宗の単立寺院・平等院の主要建築で、1053年に藤原頼通が父・道長から譲り受けた別荘を寺院に改めた際の阿弥陀堂。世界遺産「古都京都の文化財」の構成資産で国宝。屋根に一対の鳳凰像を戴く左右対称の優美な姿は10円硬貨の裏面に描かれ、日本人にとって最も馴染み深い古建築の一つ。阿字池(あじいけ)の対岸から望む正面構図は、平安貴族が憧れた「極楽浄土」を地上に再現した姿として、1000年を超えて愛され続けています。",
      "Byodoin Phoenix Hall (Hoodo) is the central building of Byodoin Temple in Uji, Kyoto Prefecture — an independent temple of mixed Tendai and Jodo affiliations linked to the Fujiwara clan. Built in 1053 by Fujiwara no Yorimichi when he converted his father Michinaga's villa into a temple, it served as the Amida Hall and is both a constituent property of the UNESCO «Historic Monuments of Ancient Kyoto» and a National Treasure. With its symmetrical silhouette crowned by a pair of phoenix figures, it appears on the reverse of the ¥10 coin and is among the most familiar pieces of historic architecture for Japanese people. The frontal view from across Aji Pond — a Heian aristocrat's vision of the Pure Land made earthly — has been cherished for over a thousand years."
    ),
    highlights: {
      ja: [
        "鳳凰堂(国宝) — 阿字池に向かう左右対称の翼廊、屋根の一対の鳳凰像、10円硬貨の裏面の構図",
        "阿字池(あじいけ) — 鳳凰堂の前面に広がる池、無風の早朝は完璧な水鏡、紅葉と桜の借景",
        "鳳翔館(博物館) — 国宝阿弥陀如来坐像と雲中供養菩薩像26躯を展示、平安美術の最高傑作",
        "藤(ふじ) — 鳳凰堂前の樹齢280年超の藤、4月下旬〜5月上旬の花期は紫の藤と朱の鳳凰堂が幻想的",
        "夜間ライトアップ — 春・秋の限定期間に開催、闇に浮かぶ朱と金の鳳凰堂が水面に映る景色",
      ],
      en: [
        "Phoenix Hall (National Treasure) — symmetrical wings facing Aji Pond, a pair of phoenix figures on the roof, the very view depicted on the reverse of the ¥10 coin",
        "Aji Pond — pool spreading before the Phoenix Hall; on a windless dawn it forms a perfect mirror, with cherry blossoms and autumn colors as borrowed scenery",
        "Hosho-kan Museum — displays the National Treasure Amida Buddha statue and 26 «Cloud-borne Bodhisattvas,» peak masterpieces of Heian art",
        "Wisteria — over 280 years old, blooming in late April to early May; the purple wisteria with the vermilion Phoenix Hall is otherworldly",
        "Evening Illumination — held in limited spring and autumn periods; the vermilion-and-gold hall floating in darkness reflects across the pond",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "平等院鳳凰堂とは?", a: "1053年に藤原頼通が建立した京都府宇治市の世界遺産。阿字池に浮かぶ左右対称の優美な姿は10円硬貨の裏面に描かれ、平安貴族が憧れた極楽浄土を地上に再現した日本古建築の最高峰の一つです。" },
        { q: "ベスト撮影ポジションは?", a: "阿字池の対岸(南向き)から順光での正面構図が王道。朝一番(8時半開門)は池の水鏡が静かで最も美しい。藤の4月下旬、紅葉の11月下旬、雪の冬は特別な被写体になります。" },
        { q: "拝観料と所要時間は?", a: "庭園+鳳翔館で大人600円、鳳凰堂内部拝観は別途300円(時間予約制、定員50名)。撮影中心なら庭園のみで2時間、内部含めれば3時間程度を見ておくと余裕です。" },
        { q: "アクセスは?", a: "京都駅からJR奈良線「宇治駅」下車徒歩10分・所要18分・250円。京阪電車「宇治駅」からも徒歩10分。宇治駅から平等院までの参道は宇治茶の老舗(中村藤吉本店、辻利)が並び、撮影前後の散策にも最適。京都市内から日帰りで往復可能です。" },
        { q: "鳳凰堂内部の拝観は?", a: "予約制で1日数十回開催、各回50名限定で別途300円。内陣に阿弥陀如来坐像(国宝、定朝作1053年)と52体の雲中供養菩薩像(国宝)が安置。内部は撮影禁止だが、博物館の鳳翔館で堂内のレプリカや本物の鳳凰像、梵鐘を間近で見られ、撮影も可能です。" },
        { q: "宇治の他の見どころは?", a: "①宇治上神社(世界遺産、平安時代の神社建築の最古例)②宇治川の鵜飼(夏期7〜9月夜間)③茶業歴史公園で茶摘み体験(5月)④紫式部「源氏物語」宇治十帖の舞台。平等院から徒歩〜車5分圏内に集まり、半日〜1日で世界遺産2件+源氏物語の世界が回れます。" },
      ],
      en: [
        { q: "What is Byodoin Phoenix Hall?", a: "A UNESCO World Heritage temple in Uji, Kyoto Prefecture, built in 1053 by Fujiwara no Yorimichi. Its symmetrical silhouette floating on Aji Pond — depicted on the reverse of the ¥10 coin — is one of Japan's foremost works of historic architecture, embodying the Pure Land that Heian aristocrats yearned for." },
        { q: "Best photo position?", a: "The classic shot is from the south side of Aji Pond, in forward light. The 8:30 AM opening offers the calmest water and brightest mirror reflection. Wisteria in late April, autumn colors in late November, and rare winter snow each add unique character." },
        { q: "What are admission fees and time required?", a: "Garden plus Hosho-kan Museum is ¥600 for adults; interior tours of Phoenix Hall are an additional ¥300 (timed entry, capacity 50). Plan two hours for the gardens, three including the interior." },
        { q: "How do I get there?", a: "From Kyoto Station, JR Nara Line to «Uji» Station, then 10-min walk — 18 min total, ¥250. Keihan «Uji» Station is also a 10-min walk away. The path from Uji Station to Byodoin is lined with historic Uji-tea shops (Nakamura Tokichi Honten, Tsujiri) — perfect for strolling before or after the shoot. Day trip from central Kyoto is easy." },
        { q: "About the Phoenix Hall interior tour?", a: "Reservation-only, multiple times daily, 50 people per slot, ¥300 extra. Inside sit the National Treasure Amida statue (by Jocho, 1053) and 52 «Cloud-borne Bodhisattva» figures (also National Treasure). Photography forbidden inside, but the Hosho-kan Museum displays interior replicas, the original phoenix figures, and the temple bell — photographable." },
        { q: "Other attractions in Uji?", a: "①Ujigami Shrine (UNESCO, oldest extant Heian-period shrine architecture) ②Uji River cormorant fishing (summer evenings July–September) ③Tea-leaf picking experience at Tea Industry Heritage Park (May) ④Murasaki Shikibu's «Tale of Genji» Uji Ten Chapters' setting. All within a 5-min walk or drive of Byodoin — half a day covers two World Heritage sites and Genji's world." },
      ],
    },
    faqs: [
      { q: d("ベスト撮影ポジションは？","Best photo position?","最佳拍摄位置？","最佳拍攝位置？","최고 촬영 위치는?"),
        a: d("阿字池の対岸（南向き）から順光での正面構図が王道。朝一番（8時半開門）は池の水鏡が静かで最も美しい。","Classic shot: from the south side of Aji Pond in forward light. First entry (8:30 AM) has the calmest water for mirror reflections.","阿字池对岸（朝南）顺光正面构图为经典。8:30开门时池面最静，倒影最美。","阿字池對岸（朝南）順光正面構圖為經典。8:30開門時池面最靜，倒影最美。","아지 연못 건너편(남향) 순광 정면 구도가 정석. 개문(8:30) 직후 연못이 잔잔해 반영이 가장 아름답습니다.") },
    ],
  },
  "東福寺": {
    desc: d(
      "東福寺は1236年創建の臨済宗大本山。紅葉の名所として「通天橋」からの景観は京都屈指。2,000本のカエデが描く真紅の海は、日本の秋を象徴する絶景。新緑の初夏も清々しい。",
      "Tofuku-ji, a Rinzai Zen head temple founded in 1236, is among Kyoto's most famous autumn foliage spots. The view from Tsuten-kyo Bridge over a sea of 2,000 maple trees defines Japanese autumn. Early-summer fresh greenery is equally refreshing.",
      "东福寺创建于1236年，临济宗大本山。红叶名所，从「通天桥」眺望的景色为京都首屈一指。2000株枫叶构成的深红之海象征日本之秋。初夏新绿亦清爽。",
      "東福寺創建於1236年，臨濟宗大本山。紅葉名所，從「通天橋」眺望的景色為京都首屈一指。2000株楓葉構成的深紅之海象徵日本之秋。初夏新綠亦清爽。",
      "도후쿠지는 1236년 창건 임제종 대본산. 단풍 명소로 '쓰텐쿄' 다리에서 바라보는 경관은 교토 최고. 2,000그루 단풍이 그리는 붉은 바다는 일본 가을을 상징하는 절경. 초여름 신록도 상쾌합니다."
    ),
    definition: lh(
      "東福寺は京都府京都市東山区にある臨済宗東福寺派の大本山で、1236年に九条道家が奈良の東大寺と興福寺から一字ずつ取って命名した京都最大級の禅寺。三門(国宝、1425年再建、現存最古最大の禅寺三門)、本堂、方丈、開山堂など25の塔頭と広大な伽藍を有し、特に「通天橋(つうてんきょう)」から望む洗玉澗(せんぎょくかん)の渓谷は約2,000本のカエデが織りなす紅葉の絶景として日本随一。重森三玲(しげもりみれい)作の方丈庭園は近代日本庭園の最高傑作の一つです。",
      "Tofuku-ji is the head temple of the Tofuku-ji school of Rinzai Zen Buddhism in Kyoto's Higashiyama Ward. Founded in 1236 by Kujo Michiie — who took one character each from Nara's Todai-ji and Kofuku-ji to name it — it is one of Kyoto's largest Zen temples. Its Sanmon Gate (a National Treasure rebuilt in 1425) is the oldest and largest surviving Zen temple gate. With 25 sub-temples and a vast precinct, it is most famous for the «Tsuten-kyo Bridge» overlooking the Sengyokukan ravine, a sea of about 2,000 maple trees that form Japan's premier autumn foliage view. The hojo (abbot's quarters) garden, designed by Mirei Shigemori, is among the great masterpieces of modern Japanese garden art."
    ),
    highlights: {
      ja: [
        "通天橋(つうてんきょう) — 全長100mの渡り廊下橋、洗玉澗を渡り開山堂へ、紅葉の海に浮かぶ構図",
        "三門(国宝) — 1425年再建、現存最古最大の禅寺三門、高さ22m、特別公開時のみ楼上拝観可",
        "方丈庭園(重森三玲作) — 北・南・西・東の4庭で構成、現代と古典が融合した近代日本庭園の最高傑作",
        "本堂と仏殿 — 1934年再建の昭和大伽藍、天井の堂本印象作「蒼龍図」は圧巻",
        "塔頭 — 25の塔頭が点在、特に光明院「波心の庭」、勝林寺、芬陀院は知る人ぞ知る紅葉名所",
      ],
      en: [
        "Tsuten-kyo Bridge — a 100 m covered walkway across the Sengyokukan ravine to the Founder's Hall, framing a sea of crimson maples",
        "Sanmon Gate (National Treasure) — rebuilt in 1425, the oldest and largest surviving Zen temple gate at 22 m tall; the upper level opens only during special exhibitions",
        "Hojo Garden by Mirei Shigemori — four gardens (north, south, west, east) blending modern and classical motifs, a masterpiece of modern Japanese garden design",
        "Main Hall and Butsuden — Showa-era reconstruction (1934) with Domoto Insho's overwhelming «Sōryū-zu» (Azure Dragon) ceiling painting",
        "Sub-temples — 25 in total; Komyo-in's «Hashin no Niwa,» Shorin-ji, and Funda-in are insider autumn foliage destinations",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "東福寺とは?", a: "1236年創建、京都府京都市東山区の臨済宗東福寺派大本山。京都最大級の禅寺で、国宝の三門、通天橋からの紅葉の海、重森三玲作の方丈庭園、25の塔頭を擁する京都屈指の名刹です。" },
        { q: "紅葉のベスト時期は?", a: "例年11月下旬〜12月上旬がピーク。通天橋は11月の混雑期は撮影禁止時期あり(混雑緩和のため)。早朝開門直後(8:30〜)が人が少なく狙い目。一斉に色づくため気温の急降下を狙います。" },
        { q: "拝観料と所要時間は?", a: "通天橋・開山堂400円、方丈庭園400円、共通券では1,000円程度。塔頭巡りも含めれば2〜3時間。混雑期は特別な交通規制と入場制限があるため事前確認必須です。" },
        { q: "アクセスは?", a: "JR奈良線・京阪電車「東福寺駅」から徒歩10分。京都駅からはJR奈良線で1駅・所要3分・150円と非常に便利。紅葉期(11月)はJR臨時急行が運行、駅から東福寺まで臨時バスもあり。歩いて泉涌寺・三十三間堂方面に抜けることも可能。" },
        { q: "通天橋撮影の現状制限は?", a: "近年は紅葉ピーク時(11月20日〜12月初旬)に通天橋上での撮影禁止(立止り禁止)、欄干撮影禁止、自撮り棒禁止が実施。橋を歩く順路通行のみ。混雑緩和のため。撮影は橋手前の臥雲橋(無料エリア)から、または開山堂方面から橋を望む構図に切り替える必要あり。" },
        { q: "通天橋以外の隠れた紅葉スポットは?", a: "①光明院「波心の庭」(無料、波模様の苔石庭、青紅葉も美しい)②龍吟庵(国宝方丈、特別公開時のみ)③芬陀院(雪舟の作と伝わる鶴亀の庭)④勝林寺(秘仏・毘沙門天の特別公開、紅葉の少なさが落ち着き)。混雑する本堂エリアを避けて塔頭巡りで紅葉を独占できます。" },
      ],
      en: [
        { q: "What is Tofuku-ji?", a: "A Rinzai Zen head temple founded in 1236 in Kyoto's Higashiyama Ward. One of Kyoto's largest Zen temples, with a National Treasure Sanmon Gate, the famous «sea of maples» from Tsuten-kyo Bridge, the Mirei Shigemori-designed hojo garden, and 25 sub-temples." },
        { q: "When are autumn colors at their best?", a: "Peak is typically late November to early December. Photography from Tsuten-kyo is restricted during peak weeks to ease congestion. Early morning right after the 8:30 opening offers thin crowds. Track sudden cold snaps that trigger color." },
        { q: "What are admission fees and time required?", a: "About ¥400 for Tsuten-kyo and the Founder's Hall, ¥400 for the hojo garden, ~¥1,000 for the combined ticket. Including sub-temples, allow 2–3 hours. During peak weeks, traffic and entry restrictions apply — check in advance." },
        { q: "How do I get there?", a: "From JR Nara Line or Keihan «Tofuku-ji» Station, 10-min walk. From Kyoto Station, JR Nara Line is one stop, 3 min, ¥150 — exceptionally convenient. During autumn (November), JR runs additional rapid services and shuttle buses to the temple. You can also walk to Sennyu-ji or Sanjusangen-do afterwards." },
        { q: "Current Tsuten-kyo restrictions?", a: "Recently, during peak weeks (~Nov 20 to early Dec), photography on Tsuten-kyo Bridge is forbidden — no stopping, no rail-side photography, no selfie sticks. Walk through only. Shoot from the free Garyukyo Bridge before, or look back at Tsuten-kyo from the Founder's Hall side instead." },
        { q: "Hidden foliage spots besides Tsuten-kyo?", a: "①Komyo-in's «Hashin no Niwa» (free entry, wave-pattern moss garden, beautiful even in summer green) ②Ryogin-an (National Treasure abbot's quarters, special openings only) ③Funda-in (crane-and-tortoise garden attributed to Sesshu) ④Shorin-ji (special opening of Bishamonten, less crowded). Visit sub-temples to escape the main-hall crush." },
      ],
    },
    faqs: [
      { q: d("紅葉のベスト時期は？","Best time for autumn foliage?","红叶最佳时期？","紅葉最佳時期？","단풍 절정기는?"),
        a: d("例年11月下旬〜12月上旬がピーク。通天橋は11月は撮影禁止時期あり（混雑対策）。早朝開門直後が人が少なく狙い目。","Peak is typically late Nov to early Dec. Photography is banned from Tsuten-kyo during peak weeks due to crowds. Early morning at opening is ideal.","每年11月下旬至12月上旬高峰。通天桥在11月部分日禁拍（防拥堵）。清晨开门为最佳时机。","每年11月下旬至12月上旬高峰。通天橋在11月部分日禁拍（防擁堵）。清晨開門為最佳時機。","매년 11월 하순~12월 초순이 절정. 쓰텐쿄는 11월 일부 촬영 금지(혼잡 방지). 개문 직후 이른 아침이 좋습니다.") },
    ],
  },

  /* ── その他主要撮影地 ── */
  "東山動物園": {
    desc: d(
      "東山動物園は1937年開園の名古屋市の動物園。ニシゴリラの「シャバーニ」が「イケメンすぎる」と話題になり全国的人気に。自然光が入る獣舎設計と広々とした展示で動物写真に最適。隣接する東山植物園との合わせ技も◎。",
      "Higashiyama Zoo, opened in 1937 in Nagoya, gained nationwide fame for its western lowland gorilla 'Shabani', dubbed 'too handsome'. Naturally lit enclosures and spacious exhibits suit wildlife photography. Pair with Higashiyama Botanical Garden for a full day.",
      "东山动物园1937年开园的名古屋动物园。西部低地大猩猩「夏巴尼」因「太帅」走红全国。自然光设计的展馆与宽阔展示区适合动物摄影。可与东山植物园同游。",
      "東山動物園1937年開園的名古屋動物園。西部低地大猩猩「夏巴尼」因「太帥」走紅全國。自然光設計的展館與寬闊展示區適合動物攝影。可與東山植物園同遊。",
      "히가시야마 동물원은 1937년 개원 나고야의 동물원. 서부로랜드고릴라 '샤바니'가 '너무 잘생겼다'며 전국적 인기. 자연광이 드는 수조 설계와 넓은 전시장이 동물 사진에 최적. 인접한 히가시야마 식물원과 함께 즐기는 것도 좋습니다."
    ),
    definition: lh(
      "東山動植物園(ひがしやまどうしょくぶつえん)は愛知県名古屋市千種区東山元町3-70にある総合動植物園で、1937年(昭和12年)開園、面積約60ヘクタール、年間来園者数約240万人と日本トップクラス。動物園は約500種類17,000点超の生物を飼育する日本有数の規模で、ニシゴリラのオス「シャバーニ」が「世界で最もイケメンなゴリラ」として2015年に世界的話題に、年間入園者数を急増させた立役者として有名。コアラ館、アジアゾウ舎、自然動物園など飼育環境にこだわった展示で動物写真に最適、隣接する植物園は日本最大級5,000種を栽培しています。",
      "Higashiyama Zoo and Botanical Gardens, located at 3-70 Higashiyama-Motomachi, Chikusa-ku, Nagoya City, Aichi Prefecture, opened in 1937 (Showa 12) and covers about 60 hectares — drawing roughly 2.4 million visitors a year, among Japan's top-tier zoos. The zoo houses over 17,000 individuals across about 500 species, with the male western lowland gorilla «Shabani» becoming a global sensation in 2015 as «the world's most handsome gorilla,» credited with the surge in visitor numbers. With dedicated environments like the Koala House, Asian Elephant Zone, and Natural Zoo, it is ideal for wildlife photography; the adjoining Botanical Gardens cultivates about 5,000 plant species — among Japan's largest collections."
    ),
    highlights: {
      ja: [
        "ニシゴリラ「シャバーニ」 — 2015年「世界で最もイケメンなゴリラ」として世界的話題、ガラス越し撮影",
        "コアラ館 — 8頭のコアラ、餌のユーカリ、夕方の活動的な時間がベスト撮影タイム",
        "アジアゾウ舎・自然動物園 — 開放的展示、群れ行動が撮れる、平日朝が活発",
        "東山植物園 — 5,000種を栽培する日本最大級の植物園、桜・ハナミズキ・紫陽花の四季",
        "東山スカイタワー(134m) — 名古屋市街と動植物園を一望、夕景〜夜景の名所",
      ],
      en: [
        "Western lowland gorilla «Shabani» — became globally famous in 2015 as «the world's most handsome gorilla»; shoot through the glass",
        "Koala House — eight koalas, eucalyptus feed, with the most active hours in the late afternoon",
        "Asian Elephant Zone and Natural Zoo — open enclosures showing herd behavior; weekday mornings are most active",
        "Higashiyama Botanical Garden — about 5,000 cultivated species, one of Japan's largest, with cherry blossoms, dogwood, and hydrangeas across the seasons",
        "Higashiyama Sky Tower (134 m) — overlooks the Nagoya cityscape and the gardens; renowned for sunset and night views",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "東山動物園とは?", a: "1937年開園の名古屋市の総合動植物園で、面積約60ヘクタール、年間来園者数約240万人。動物約500種17,000点、植物約5,000種を擁し、世界的に話題のゴリラ「シャバーニ」を擁する日本トップクラスの動植物園です。" },
        { q: "シャバーニを見るには?", a: "ゴリラ・チンパンジー舎で平日午前中が最も活発。ガラス越しの撮影なのでレンズを近づけて反射を抑える、明るい単焦点(50mm f/1.8等)で背景ボケを活かすと良い構図に。週末は混雑が激しいため平日朝一番がおすすめです。" },
        { q: "アクセスと所要時間は?", a: "地下鉄東山線「東山公園駅」3番出口から徒歩3分。入園料500円、年間パス2,000円(2回で元が取れる)。動物園+植物園+スカイタワー全部見るなら半日〜1日。閉園16:30(夏季17時)。" },
        { q: "撮影機材のおすすめは?", a: "①明るい単焦点(50mm F1.8)で背景ボケ・暗い室内②望遠ズーム(70-300mm)で遠くの動物・コアラ③標準ズーム(24-105mm)で全景・植物園。ガラス越しの撮影が多いためレンズフードでフレア軽減。フラッシュは動物に有害で全面禁止、ISO1600〜3200で動きを止めます。" },
        { q: "東山スカイタワーの夜景は?", a: "高さ134m・地上100mの展望室から名古屋市街と動植物園を一望、特に夕景〜ブルーアワーは絶景。入場500円(動物園共通券700円)、9:00〜21:30営業。混雑回避は平日夜が確実。三脚OK、ガラス反射対策に黒い服や暗幕活用。" },
        { q: "おすすめ訪問時期は?", a: "桜の3月下旬〜4月、新緑の5月、ばらの5月下旬、紫陽花の6月、紅葉の11月、雪景色の1〜2月と四季それぞれ。コアラの活動的な時間は朝9:30〜11:30、もぐもぐタイムは飼育員の動物解説で被写体が活発。年間パス2,000円で複数回訪問可能、季節ごとの撮影に最適。" },
      ],
      en: [
        { q: "What is Higashiyama Zoo?", a: "Nagoya's combined zoo and botanical garden, opened in 1937, covering about 60 hectares with roughly 2.4 million annual visitors. Home to about 500 animal species (17,000+ individuals) and 5,000 plant species, it features the globally famous gorilla «Shabani» — one of Japan's top-tier zoological gardens." },
        { q: "How to see Shabani?", a: "Most active in the mornings on weekdays at the Gorilla & Chimp enclosure. Press the lens against glass to cut reflections; a fast prime (50mm f/1.8) blurs the background. Weekends are very crowded — go early on a weekday morning." },
        { q: "Access and time required?", a: "3 minutes on foot from Higashiyama-koen Station (Higashiyama Subway Line), Exit 3. Admission ¥500, annual pass ¥2,000 (pays for itself in two visits). Half a day to a full day for zoo + gardens + Sky Tower. Closes 16:30 (17:00 in summer)." },
        { q: "Recommended camera gear?", a: "①Fast prime (50mm f/1.8) for background bokeh and dim interiors ②Telephoto zoom (70–300mm) for distant animals and koalas ③Standard zoom (24–105mm) for wide views and the botanical garden. Glass-tank shooting is common — bring a lens hood. Flash is harmful to animals and forbidden; ISO 1600–3200 freezes motion." },
        { q: "Higashiyama Sky Tower at night?", a: "At 134 m tall (100 m observation deck), the tower commands a panorama of Nagoya and the zoo grounds — sunset and blue hour are spectacular. Admission ¥500 (¥700 zoo combo), open 9:00–21:30. Weekday evenings are best for avoiding crowds. Tripods OK; bring dark clothes or a hood to cut glass reflection." },
        { q: "Recommended seasons?", a: "Cherry blossoms late March–April, fresh greenery in May, roses in late May, hydrangeas in June, autumn colors in November, winter snow January–February — each season offers something. Koalas are most active 9:30–11:30 AM. Mogu-mogu (feeding) time brings out keeper talks and active subjects. The ¥2,000 annual pass enables seasonal repeat visits." },
      ],
    },
    faqs: [
      { q: d("シャバーニを見るには？","How to see Shabani?","如何见到夏巴尼？","如何見到夏巴尼？","샤바니를 보려면?"),
        a: d("ゴリラ・チンパンジー舎で平日午前中が最も活発。ガラス越しの撮影なのでレンズを近づけて反射を抑える。","Most active in the mornings on weekdays at the Gorilla & Chimp enclosure. Press the lens against glass to cut reflections.","大猩猩/黑猩猩馆，平日上午最活跃。镜头贴玻璃减少反光。","大猩猩/黑猩猩館，平日上午最活躍。鏡頭貼玻璃減少反光。","고릴라·침팬지 우리, 평일 오전이 가장 활발합니다. 렌즈를 유리에 밀착시켜 반사를 줄이세요.") },
    ],
  },
  "東京": {
    desc: d(
      "東京の中心部は丸の内、銀座、新宿、渋谷、六本木など撮影題材の宝庫。東京駅丸の内駅舎、スカイツリー、東京タワー、皇居周辺、渋谷スクランブル交差点など、近代と伝統の都市景観が無数に存在。",
      "Central Tokyo — Marunouchi, Ginza, Shinjuku, Shibuya, Roppongi — is a trove of photographic subjects. Tokyo Station's Marunouchi facade, Skytree, Tokyo Tower, the Imperial Palace vicinity, Shibuya Scramble Crossing: countless urban scenes span modern and traditional.",
      "东京中心（丸之内、银座、新宿、涩谷、六本木等）是拍摄题材宝库。东京站丸之内站舍、晴空塔、东京塔、皇居周边、涩谷十字路口等，现代与传统都市景观无数。",
      "東京中心（丸之內、銀座、新宿、澀谷、六本木等）是拍攝題材寶庫。東京站丸之內站舍、晴空塔、東京塔、皇居周邊、澀谷十字路口等，現代與傳統都市景觀無數。",
      "도쿄 중심부(마루노우치, 긴자, 신주쿠, 시부야, 롯폰기 등)는 촬영 소재의 보고. 도쿄역 마루노우치 역사, 스카이트리, 도쿄타워, 고쿄 주변, 시부야 스크램블 교차로 등 근대와 전통이 어우러진 도시 경관이 무수히 많습니다."
    ),
    definition: lh(
      "東京(中心部)は東京都の23区の中央部、千代田区・中央区・港区・新宿区・渋谷区など主要オフィス・商業地区を含む撮影対象地で、丸の内のレンガ駅舎(東京駅、1914年開業、2012年復原)、東京タワー(333m、1958年完成、戦後復興のシンボル)、東京スカイツリー(634m、世界第3位の電波塔、2012年開業)、皇居の四季、銀座・新宿・渋谷の繁華街、お台場のレインボーブリッジまで、世界最大級メガシティの近代建築・夜景・文化が集約。年間訪日外国人観光客の約7割が東京を訪れる、日本最大の都市撮影地です。",
      "Tokyo's central area covers the heart of the 23 wards — including Chiyoda, Chuo, Minato, Shinjuku, and Shibuya — encompassing the city's main business and shopping districts. Subjects span the Marunouchi brick station of Tokyo Station (opened 1914, restored 2012), Tokyo Tower (333 m, completed 1958, a symbol of postwar reconstruction), Tokyo Skytree (634 m, the world's third-tallest broadcasting tower, opened 2012), the four seasons of the Imperial Palace, the entertainment districts of Ginza, Shinjuku, and Shibuya, and Odaiba's Rainbow Bridge. About 70% of international visitors to Japan come to Tokyo, making it the country's largest urban photographic destination."
    ),
    highlights: {
      ja: [
        "東京駅丸の内駅舎 — 1914年開業の赤レンガ駅舎、2012年に大正期の姿に復原、夜のライトアップは丸ビル・KITTE屋上から撮影",
        "東京タワー — 1958年完成、333m、エッフェル塔より高い世界最高自立鉄塔だった戦後復興の象徴",
        "東京スカイツリー — 2012年開業、634m、世界第3位の電波塔、夜は色の異なるライティング",
        "渋谷スクランブル交差点 — 1日延べ50万人が交差、世界一忙しい交差点、SHIBUYA SKYからの俯瞰",
        "皇居・千鳥ヶ淵 — 江戸城跡の緑のオアシス、桜・新緑・紅葉の四季、皇居前広場と二重橋",
      ],
      en: [
        "Tokyo Station Marunouchi facade — the 1914 red-brick station, restored in 2012 to its Taisho-era form; capture the night illumination from the Marunouchi Building or KITTE rooftop",
        "Tokyo Tower — completed 1958 at 333 m, once the world's tallest self-supporting tower (taller than the Eiffel Tower), a symbol of postwar reconstruction",
        "Tokyo Skytree — opened 2012 at 634 m, the world's third-tallest broadcasting tower, with seasonal color illuminations at night",
        "Shibuya Scramble Crossing — half a million people cross daily, the world's busiest intersection; capture the bird's-eye view from SHIBUYA SKY",
        "Imperial Palace and Chidorigafuchi — green oasis on the Edo Castle site, with cherry blossoms, fresh green, autumn colors; includes the Imperial Plaza and Niju-bashi Bridge",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "東京(中心部)とは?", a: "東京都23区の中央部の主要オフィス・商業地区で、東京駅・東京タワー(333m)・スカイツリー(634m)・皇居・銀座・新宿・渋谷・お台場など、世界最大級メガシティの近代建築・夜景・文化が集約された日本最大の都市撮影地です。" },
        { q: "東京で1日の撮影ルートは?", a: "朝:皇居→東京駅→丸の内、昼:浅草雷門・スカイツリー、夕:渋谷スクランブル→六本木ヒルズ夜景、が王道。地下鉄1日券800円で全部回れます。早朝の皇居・浅草が最も人少なく光柔らか。" },
        { q: "東京の夜景撮影のコツは?", a: "三脚+低ISO+長秒露光が基本。ブルーアワー(日没後30分)が空と街の光のバランスがベスト。展望台は閉館時間に注意、屋上は風と寒さ対策必須。SHIBUYA SKY(229m)・東京シティビュー(238m)・カレッタ汐留が穴場。" },
        { q: "おすすめの展望台は?", a: "①SHIBUYA SKY(229m、屋上開放、2,500円、夕景〜夜景の聖地)②東京シティビュー(六本木ヒルズ、238m、2,500円)③東京スカイツリー(634m、3,500円)④東京タワー(333m、1,500円)⑤都庁北・南展望台(202m、無料、22:30まで)。混雑期は事前予約必須、平日夕方〜夜が穴場です。" },
        { q: "桜の撮影ベストスポットは?", a: "①千鳥ヶ淵(皇居西側、約260本のソメイヨシノ、夜のライトアップ、3月下旬)②上野恩賜公園(約1,200本、宴会場として最大規模)③目黒川(約800本の桜並木、夜景)④新宿御苑(様々な品種が長期間楽しめる)⑤六本木ヒルズ周辺(都市と桜)。早朝6〜8時着が混雑回避に必須。" },
        { q: "アクセスとお得な切符は?", a: "成田空港から東京駅まで成田エクスプレスで約60分・3,070円、羽田から都心まで地下鉄で約30分・480円。地下鉄1日券800円(東京メトロ24時間券、複数路線対応)、JR都区内パス760円、Suica/ICカード(2,000円〜)が便利。観光は車より地下鉄+徒歩が圧倒的に効率的です。" },
      ],
      en: [
        { q: "What is central Tokyo?", a: "The heart of Tokyo's 23 wards — its main business and shopping districts. Subjects include Tokyo Station, Tokyo Tower (333 m), Skytree (634 m), the Imperial Palace, Ginza, Shinjuku, Shibuya, and Odaiba — Japan's largest urban photographic destination, where modern architecture, nightscapes, and culture all converge." },
        { q: "One-day shooting route in Tokyo?", a: "Morning: Imperial Palace → Tokyo Station → Marunouchi. Noon: Asakusa Kaminarimon, Skytree. Evening: Shibuya Scramble → Roppongi Hills nightscape. The ¥800 subway day pass covers it all. Early morning at the Imperial Palace and Asakusa is least crowded with softest light." },
        { q: "Tips for Tokyo night photography?", a: "Use a tripod, low ISO, and long exposure. Blue hour (30 min after sunset) balances sky and city lights best. Watch observatory closing times; rooftops require wind and cold gear. SHIBUYA SKY (229 m), Tokyo City View (238 m), and Caretta Shiodome are insider picks." },
        { q: "Recommended observatories?", a: "①SHIBUYA SKY (229 m, rooftop, ¥2,500, sacred for sunset to night views) ②Tokyo City View (Roppongi Hills, 238 m, ¥2,500) ③Tokyo Skytree (634 m, ¥3,500) ④Tokyo Tower (333 m, ¥1,500) ⑤Tokyo Metropolitan Government Bldg North/South (202 m, free, until 22:30). Peak times need reservations; weekday evening to night is the secret window." },
        { q: "Best cherry blossom photo spots?", a: "①Chidorigafuchi (west of the Imperial Palace, ~260 Yoshino trees, night illumination, late March) ②Ueno Park (~1,200 trees, largest hanami gathering) ③Meguro River (~800 cherry-lined trees, night view) ④Shinjuku Gyoen (multiple varieties bloom over a long period) ⑤Around Roppongi Hills (urban + cherry). Arrive 6–8 AM to beat crowds." },
        { q: "Access and useful passes?", a: "From Narita to Tokyo Station, Narita Express ~60 min, ¥3,070. From Haneda to central Tokyo, subway ~30 min, ¥480. Useful passes: Tokyo Metro 24-hour pass ¥800 (multi-line), JR Tokunai Pass ¥760, Suica/IC card (¥2,000+). Subway + walking is far more efficient than driving for sightseeing." },
      ],
    },
    faqs: [
      { q: d("東京で1日の撮影ルートは？","One-day shooting route in Tokyo?","东京一日拍摄路线？","東京一日拍攝路線？","도쿄 당일 촬영 루트는?"),
        a: d("朝:皇居→東京駅→丸の内。昼:浅草雷門・スカイツリー。夕:渋谷スクランブル→六本木ヒルズ夜景。効率的な一日。","Morning: Imperial Palace, Tokyo Station, Marunouchi. Noon: Asakusa Kaminarimon, Skytree. Evening: Shibuya Scramble, Roppongi Hills nightscape. Efficient.","晨:皇居→东京站→丸之内。午:浅草雷门·晴空塔。晚:涩谷十字→六本木之丘夜景。","晨:皇居→東京站→丸之內。午:淺草雷門·晴空塔。晚:澀谷十字→六本木之丘夜景。","아침: 고쿄→도쿄역→마루노우치. 점심: 아사쿠사 가미나리몬·스카이트리. 저녁: 시부야 스크램블→롯폰기힐즈 야경. 효율적 일정.") },
    ],
  },
  "金沢": {
    desc: d(
      "金沢は加賀百万石の城下町。兼六園（日本三名園の一つ）、金沢城公園、ひがし茶屋街、長町武家屋敷跡、近江町市場、金沢21世紀美術館など、江戸の町並みと現代アートが共存。夜の茶屋街は幻想的。",
      "Kanazawa is the castle town of the Kaga domain's one-million-koku wealth. Kenrokuen (one of Japan's Three Great Gardens), Kanazawa Castle Park, the Higashi Chaya geisha district, Nagamachi samurai house ruins, Omicho Market, and the 21st Century Museum pair Edo streets with modern art. The evening tea district is magical.",
      "金泽是加贺百万石城下町。兼六园（日本三大名园之一）、金泽城公园、东茶屋街、长町武家屋敷迹、近江町市场、金泽21世纪美术馆等，江户街景与当代艺术共存。夜茶屋街梦幻。",
      "金澤是加賀百萬石城下町。兼六園（日本三大名園之一）、金澤城公園、東茶屋街、長町武家屋敷跡、近江町市場、金澤21世紀美術館等，江戶街景與當代藝術共存。夜茶屋街夢幻。",
      "가나자와는 가가 백만석의 성하도시. 겐로쿠엔(일본 3대 정원 중 하나), 가나자와성 공원, 히가시차야 거리, 나가마치 무가 저택지, 오미초 시장, 가나자와21세기미술관 등 에도 거리와 현대 미술이 공존. 밤의 차야 거리는 환상적입니다."
    ),
    definition: lh(
      "金沢(かなざわ)は石川県の県庁所在地で、人口約46万人の北陸最大の都市。1583年に前田利家が入城し、加賀百万石の城下町として明治維新まで約290年間繁栄、「加賀百万石文化」を花開かせました。1676年作庭の兼六園(日本三名園の一つ、特別名勝)、1583年築の金沢城、ひがし茶屋街・主計町・にし茶屋街の3つの茶屋街(重伝建)、武家屋敷跡・長町、日本三大市場の一つ近江町市場、金沢21世紀美術館まで、江戸の町並みと現代アート、伝統工芸(金箔・九谷焼・加賀友禅)が共存する日本でも稀有な城下町です。",
      "Kanazawa, the capital of Ishikawa Prefecture and the largest city in the Hokuriku region with about 460,000 residents, became a Maeda-clan castle town in 1583 when Maeda Toshiie took residence. For about 290 years until the Meiji Restoration, it flourished as the seat of the Kaga domain's «one-million-koku» wealth, blooming into «Kaga Hyakumangoku» culture. With Kenrokuen (landscaped from 1676, one of Japan's Three Great Gardens and a Special Place of Scenic Beauty), Kanazawa Castle (1583), three preserved tea-house districts (Higashi Chaya, Kazuemachi, Nishi Chaya), the Nagamachi samurai houses, the Omicho Market (one of Japan's three great markets), and the 21st Century Museum, it remains a rare castle town where Edo-period streetscapes, contemporary art, and traditional crafts (gold leaf, Kutani pottery, Kaga Yuzen dyeing) coexist."
    ),
    highlights: {
      ja: [
        "兼六園 — 1676年作庭、日本三名園の一つ、特別名勝、雪吊りの冬景色、霞ヶ池の徽軫(ことじ)灯籠が象徴",
        "金沢城公園 — 加賀百万石・前田家の居城、白漆喰の海鼠壁(なまこかべ)、夜のライトアップ",
        "ひがし茶屋街 — 1820年制定の最大級茶屋街、重伝建、紅殻格子の町家、夕暮れの提灯",
        "金沢駅・鼓門 — 2005年完成の高さ13.7mの伝統的な門と現代ガラスドームの融合、夜のライトアップ",
        "金沢21世紀美術館 — 2004年開館、SANAA設計の円形ガラス建築、レアンドロ・エルリッヒ「スイミング・プール」",
      ],
      en: [
        "Kenrokuen — landscaped from 1676, one of Japan's Three Great Gardens and a Special Place of Scenic Beauty; the winter rope-suspended pines (yukitsuri) and the Kotoji Lantern at Kasumigaike Pond are emblematic",
        "Kanazawa Castle Park — the seat of the Kaga domain's Maeda clan, with white-stucco namako-kabe walls and dramatic evening illumination",
        "Higashi Chaya District — established in 1820 as a major tea-house district, a Designated Important Preservation District, with red-lattice machiya and lanterns at dusk",
        "Kanazawa Station Tsuzumi Gate — opened 2005, fusing a 13.7 m traditional drum-shaped gate with a modern glass dome, beautifully lit at night",
        "21st Century Museum of Contemporary Art — opened 2004, designed by SANAA as a circular glass building, including Leandro Erlich's «Swimming Pool»",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "金沢とは?", a: "石川県の県庁所在地で、人口約46万人の北陸最大の都市。1583年から1868年まで加賀百万石の城下町として栄え、兼六園・金沢城・3つの茶屋街・21世紀美術館など、江戸の町並みと現代アート、伝統工芸が共存する稀有な街です。" },
        { q: "兼六園のベスト撮影時期は?", a: "冬の雪吊り(11月〜3月)、春の桜(4月)、秋の紅葉(11月中旬〜下旬)、初夏のカキツバタ(6月)。早朝開園(7時)直後が人も少なく光も柔らか。冬の雪吊りと雪景色は北陸の象徴的構図です。" },
        { q: "1日で回れる定番ルートは?", a: "朝イチ兼六園(光が柔らかい)→金沢城→ひがし茶屋街(午後〜夕方)→近江町市場→金沢駅の鼓門で夜景、徒歩+城下まちバス(1日券500円)で全て巡れます。距離が近いコンパクトな観光地です。" },
        { q: "金沢へのアクセスは?", a: "東京から北陸新幹線「かがやき」で2時間30分・14,180円。大阪から特急サンダーバードで2時間30分・8,000円。金沢駅東口の鼓門は夜のライトアップが象徴的なので到着時に必ず撮影を。" },
        { q: "金箔体験ができる場所は?", a: "金沢は日本の金箔生産の99%を担う街。金箔工芸 箔一(ひがし茶屋街本店)・金箔屋さくだ・かなざわカタニで金箔貼り体験(箸・小物などに貼る、所要30分〜1時間、1,500〜3,000円)。お土産としても人気です。" },
        { q: "ひがし茶屋街での撮影マナーは?", a: "茶屋街は現役のお店が並ぶ通り(芸妓が暮らす)。建物の中・玄関・窓を覗くなど私有空間の撮影は厳禁。観光客の少ない朝7〜9時が落ち着いた撮影時間。雨の日は石畳が艶やかに光って絵になります。" },
      ],
      en: [
        { q: "What is Kanazawa?", a: "Capital of Ishikawa Prefecture and Hokuriku's largest city (about 460,000 residents). From 1583 to 1868 it flourished as the Maeda-clan castle town of the Kaga domain, and today combines Kenrokuen, Kanazawa Castle, three tea-house districts, the 21st Century Museum, and traditional crafts in a uniquely layered cityscape." },
        { q: "Best time for Kenrokuen photos?", a: "Winter yukitsuri tree supports (Nov–Mar), spring cherry blossoms (April), autumn foliage (mid–late Nov), early summer iris (June). Early morning at the 7 AM opening has fewer people and soft light. The yukitsuri-and-snow combination is the iconic Hokuriku composition." },
        { q: "Classic one-day route?", a: "Early morning at Kenrokuen (soft light), then Kanazawa Castle, Higashi Chaya (afternoon to evening), Omicho Market, and the Tsuzumi Gate at Kanazawa Station for night shots — all walkable plus the «Castle Town Loop Bus» (¥500 day pass). The sights are compact and close together." },
        { q: "How do I get to Kanazawa?", a: "From Tokyo, Hokuriku Shinkansen «Kagayaki» 2hr 30min, ¥14,180. From Osaka, Limited Express «Thunderbird» 2hr 30min, ¥8,000. The illuminated Tsuzumi Gate at Kanazawa Station's east exit is iconic at night — shoot it on arrival." },
        { q: "Where can I try gold-leaf crafts?", a: "Kanazawa produces 99% of Japan's gold leaf. Try gold-leaf application at Hakuichi (Higashi Chaya main shop), Kinpaku-ya Sakuda, or Kanazawa Katani — apply leaf to chopsticks or small items (30–60 min, ¥1,500–3,000). Popular as a souvenir." },
        { q: "Photography etiquette in Higashi Chaya?", a: "The chaya district has working shops where geisha still live. Never photograph interiors, entrances, or through windows — these are private spaces. Quiet hours are 7:00–9:00 AM. Rainy days make the cobblestones gleam beautifully." },
      ],
    },
    faqs: [
      { q: d("兼六園のベスト撮影時期は？","Best time for Kenrokuen photos?","兼六园最佳拍摄时期？","兼六園最佳拍攝時期？","겐로쿠엔 촬영 최적기는?"),
        a: d("冬の雪吊り（11月〜3月）、春の桜（4月）、秋の紅葉（11月中旬〜下旬）、初夏のカキツバタ（6月）。早朝開園直後が人も少なく光も柔らか。","Winter yukitsuri tree supports (Nov–Mar), spring cherry blossoms (April), autumn foliage (mid–late Nov), early summer iris (June). Early morning at opening has fewer people and soft light.","冬雪吊（11-3月）、春樱（4月）、秋红叶（11月中下旬）、初夏菖蒲（6月）。开园清晨人少光柔。","冬雪吊（11-3月）、春櫻（4月）、秋紅葉（11月中下旬）、初夏菖蒲（6月）。開園清晨人少光柔。","겨울 유키즈리(11-3월), 봄 벚꽃(4월), 가을 단풍(11월 중·하순), 초여름 제비붓꽃(6월). 개장 직후 이른 아침은 한적하고 빛이 부드럽습니다.") },
    ],
  },

  /* ── 愛媛県 ── */
  "道後温泉": {
    desc: d(
      "道後温泉は3000年の歴史を持つ日本最古級の温泉。1894年築の木造3階建て「道後温泉本館」は国の重要文化財で、『千と千尋の神隠し』の湯屋のモデルの一つ。夜のライトアップは幻想的。",
      "Dogo Onsen is one of Japan's oldest hot springs, with 3,000 years of history. The 1894 wooden three-story Dogo Onsen Honkan is an Important Cultural Property and one of the models for 'Spirited Away's' bathhouse. Nighttime illumination is magical.",
      "道后温泉是日本最古老温泉之一，已有3000年历史。1894年建造的木造三层「道后温泉本馆」为国家重要文化财，是《千与千寻》汤屋原型之一。夜间灯饰梦幻。",
      "道後溫泉是日本最古老溫泉之一，已有3000年歷史。1894年建造的木造三層「道後溫泉本館」為國家重要文化財，是《千與千尋》湯屋原型之一。夜間燈飾夢幻。",
      "도고 온천은 3000년 역사를 가진 일본 최고(最古)급 온천. 1894년 건축된 목조 3층 '도고 온천 본관'은 중요문화재이며 '센과 치히로의 행방불명' 목욕탕 모델 중 하나. 야간 조명은 환상적입니다."
    ),
    definition: lh(
      "道後温泉(どうごおんせん)は愛媛県松山市にある約3,000年の歴史を持つ日本最古級の温泉で、『日本書紀』『万葉集』にも登場する古来の名湯。中心となる「道後温泉本館」は1894年に建築された木造三層の重要文化財で、夏目漱石の小説『坊っちゃん』の舞台、宮崎駿『千と千尋の神隠し』の油屋のモデルの一つともされます。アルカリ性単純温泉(肌に優しい)、本館・椿の湯・飛鳥乃湯泉の3公衆浴場と道後温泉駅周辺の温泉旅館街が作る情緒は、四国の温泉文化の象徴です。",
      "Dogo Onsen, in Matsuyama City, Ehime Prefecture, is one of Japan's oldest hot springs with about 3,000 years of history — appearing in the «Nihon Shoki» and «Manyoshu.» Its centerpiece, Dogo Onsen Honkan, is a wooden three-story Important Cultural Property built in 1894, the setting of Soseki's novel «Botchan» and considered one of the inspirations for the bathhouse in Hayao Miyazaki's «Spirited Away.» With alkaline simple spring water (gentle on skin) and three public bathhouses — Honkan, Tsubaki-no-Yu, and Asuka-no-Yu Spring — plus the surrounding ryokan-lined district, it embodies the hot-spring culture of Shikoku."
    ),
    highlights: {
      ja: [
        "道後温泉本館 — 1894年築、重要文化財、唐破風と千鳥破風が織りなす木造三層、夜のライトアップは幻想的",
        "椿の湯・飛鳥乃湯泉 — 別棟の公衆浴場、本館より空いていて入浴しやすい、撮影は外観のみ",
        "道後温泉駅 — 1895年開業の坊っちゃん列車の終着駅、レトロな駅舎と路面電車",
        "湯神社・伊佐爾波神社 — 道後温泉を見守る古社、伊佐爾波神社の朱塗り本殿は1667年築の重要文化財",
        "湯築城跡公園 — 道後温泉裏手の中世山城跡、桜の名所、本館を含む街並みを俯瞰",
      ],
      en: [
        "Dogo Onsen Honkan — built 1894, an Important Cultural Property; a wooden three-story building blending karahafu and chidori-hafu gables, with magical evening illumination",
        "Tsubaki-no-Yu and Asuka-no-Yu Spring — annex public baths; less crowded than the Honkan, easier to bathe in. Photography permitted only of exteriors",
        "Dogo Onsen Station — 1895 terminus of the Botchan Train, with a retro station house and tramway",
        "Yu Shrine and Isaniwa Shrine — old shrines watching over Dogo Onsen; Isaniwa's vermilion main hall (1667) is an Important Cultural Property",
        "Yuzuki Castle Ruins Park — the medieval mountain castle behind the onsen; cherry blossom site offering an overhead view including the Honkan",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "道後温泉とは?", a: "愛媛県松山市の3,000年の歴史を持つ日本最古級の温泉。重要文化財の道後温泉本館(1894年築)は『坊っちゃん』の舞台、『千と千尋の神隠し』の油屋のモデルの一つで、四国の温泉文化の象徴です。" },
        { q: "本館は現在入れる?", a: "2019年から大規模保存修理中で、2024年12月に全館完全再開予定。工事中も一部階で入浴・見学可。撮影は外観・夜景共におすすめ、特に夕方〜夜の木造三層のライトアップが圧巻です。" },
        { q: "撮影のベストタイムとマナーは?", a: "外観は早朝(人少ない)と夕方〜夜のライトアップが二大ベスト。建物裏手の路地越し構図がおすすめ。館内は入浴客のプライバシー配慮で撮影禁止区域あり、要注意。" },
        { q: "アクセスは?", a: "松山空港から空港リムジンバスで約45分・780円。JR松山駅から伊予鉄道路面電車5系統「道後温泉駅」下車、所要約30分・170円。松山城・坂の上の雲ミュージアムから車で15分。坊っちゃん列車(伊予鉄の歴史的車両、1日数本運行)で道後温泉駅着の体験も。" },
        { q: "宿泊と入浴料は?", a: "本館入浴料(神の湯コース460円〜霊の湯3階個室1,690円)。日帰り入浴は朝6:00〜23:00開館。道後温泉郷には30軒以上の温泉旅館、椿館・大和屋本店・道後舘などが代表(1泊2食付15,000〜45,000円)。建物見学のみなら無料エリアもあり。" },
        { q: "周辺の連続観光は?", a: "①道後温泉本館(早朝・夜両方撮影)②道後ハイカラ通り(明治レトロ商店街)③湯神社・伊佐爾波神社(温泉守護の神社、急な石段から本館を俯瞰)④松山城(車・市電で15分、現存12天守)⑤坂の上の雲ミュージアム(車5分)。徒歩+市電で1日コースが組める松山観光の中心地です。" },
      ],
      en: [
        { q: "What is Dogo Onsen?", a: "One of Japan's oldest hot springs (about 3,000 years) in Matsuyama City, Ehime. Dogo Onsen Honkan (built 1894) is an Important Cultural Property, the setting of Soseki's «Botchan» and one of the inspirations for the bathhouse in «Spirited Away» — the very symbol of Shikoku hot-spring culture." },
        { q: "Can I bathe at the Honkan now?", a: "Under major restoration since 2019, with full reopening expected December 2024. Some floors remain open for bathing and viewing during works. The exterior is photogenic both day and night, especially the wooden three-tier illumination in the evening." },
        { q: "Best photography times and etiquette?", a: "Exteriors at dawn (few visitors) and evening/night illumination are the two best windows. Try alley-framed compositions behind the building. Some interior areas are off-limits to respect bathers' privacy — check signage carefully." },
        { q: "How do I get there?", a: "From Matsuyama Airport, the limousine bus takes ~45 min, ¥780. From JR Matsuyama Station, Iyotetsu tram line 5 to «Dogo Onsen» Station, ~30 min, ¥170. 15 min by car from Matsuyama Castle and the Saka no Ue no Kumo Museum. The Botchan Train (a historic Iyotetsu railcar, a few daily) terminates at Dogo Onsen Station for a memorable arrival." },
        { q: "Lodging and bath fees?", a: "Honkan bathing fees range from ¥460 (Kami-no-Yu basic) to ¥1,690 (Tama-no-Yu private 3rd-floor room). Day-bath open 6:00–23:00. Dogo Onsen has 30+ ryokan including Tsubakikan, Yamatoya Honten, and Dogokan (¥15,000–45,000/night with two meals). Free building-tour areas are also available." },
        { q: "What other sights are nearby?", a: "①Dogo Onsen Honkan (shoot both early morning and evening) ②Dogo Haikara-dori (Meiji-retro shopping street) ③Yu Shrine and Isaniwa Shrine (the onsen's guardian shrines; steep stone stairs offer overhead views of the Honkan) ④Matsuyama Castle (15 min by car or tram, one of 12 originals) ⑤Saka no Ue no Kumo Museum (5 min by car). A walk-and-tram day plan covers the center of Matsuyama tourism." },
      ],
    },
    faqs: [
      { q: d("本館は現在入れる？","Can I bathe at the Honkan now?","本馆现在可以入浴吗？","本館現在可以入浴嗎？","본관은 지금 입욕 가능한가요?"),
        a: d("2019年から大規模保存修理中。2024年末〜2025年に全館完全再開予定。工事中でも一部階は入浴・見学可。","Under major restoration since 2019. Full reopening expected 2024/2025. Part of the building remains open for bathing and viewing during works.","自2019年起大规模保存修缮。2024年末-2025年预计全面重开。工期中仍有部分楼层可入浴参观。","自2019年起大規模保存修繕。2024年末-2025年預計全面重開。工期中仍有部分樓層可入浴參觀。","2019년부터 대규모 보존 수리 중. 2024년 말~2025년 전관 재개 예정. 공사 중에도 일부 층은 입욕·견학 가능.") },
    ],
  },
  "松山城": {
    desc: d(
      "松山城は標高132mの勝山山頂に建つ現存12天守の一つ（1627年）。黒と白のコントラストが美しい連立式天守で、桜の名所100選。ロープウェイまたはリフトで登頂し、瀬戸内海を望む天守閣からの眺望は必撮。",
      "Matsuyama Castle, atop Mt. Katsuyama (132 m), is one of 12 surviving original tenshu (1627). Its striking black-and-white connected keep ranks among Japan's top 100 cherry blossom sites. Take the ropeway or chairlift up — the view from the keep over the Seto Inland Sea is essential.",
      "松山城位于海拔132米的胜山山顶，现存12天守之一（1627年）。黑白对比分明的连立式天守，赏樱百选名所。可乘缆车或吊椅登顶，天守阁俯瞰濑户内海必拍。",
      "松山城位於海拔132米的勝山山頂，現存12天守之一（1627年）。黑白對比分明的連立式天守，賞櫻百選名所。可乘纜車或吊椅登頂，天守閣俯瞰瀨戶內海必拍。",
      "마쓰야마성은 해발 132m 가쓰야마 산 정상의 현존 12천수 중 하나(1627년). 검정·흰색 대비가 아름다운 연립식 천수로 벚꽃 명소 100선. 로프웨이 또는 리프트로 오르며, 천수각에서 바라보는 세토내해 전망은 필촬영."
    ),
    definition: lh(
      "松山城(まつやまじょう)は愛媛県松山市の標高132m・勝山(かつやま)山頂に建つ平山城で、現存12天守の一つ。慶長7年(1602年)から築城を開始し、寛永4年(1627年)に完成、寛永12年(1635年)から松平氏15代が居城とした伊予国の拠点。連立式天守(本壇に大天守・小天守・南隅櫓・北隅櫓を渡櫓で連結する独特の構造)で、安政元年(1854年)に再建された大天守をはじめ21の建造物が国の重要文化財。「日本の100名城」「桜名所100選」「日本100名山」(背景の石鎚山系)に選定された四国を代表する名城です。",
      "Matsuyama Castle is a flatland-mountain castle atop the 132 m Mt. Katsuyama in Matsuyama City, Ehime Prefecture, and one of Japan's 12 surviving original tenshu. Construction began in 1602 and was completed in 1627; from 1635 it served 15 generations of the Matsudaira clan as the seat of the Iyo domain. Its rare connected keep — combining a great keep, lesser keep, southern corner turret, and northern corner turret via passage turrets around a central platform — and 21 structures including the great keep (rebuilt 1854) are designated Important Cultural Properties. Selected for «Japan's Top 100 Castles,» «Top 100 Cherry Blossom Sites,» and (with the Ishizuchi range as backdrop) «Top 100 Mountains,» it stands as Shikoku's representative castle."
    ),
    highlights: {
      ja: [
        "大天守・連立式天守 — 1854年再建の大天守、本壇に小天守・南隅櫓・北隅櫓を配する全国でも稀な連結構造",
        "ロープウェイ・リフト乗り場 — 街中から城山頂まで3分、屋根のないリフトは絶景を全身で感じる",
        "桜の名所 — 1854年再建の天守と500本のソメイヨシノ、4月上旬の本丸広場は日本100名城屈指の桜風景",
        "瀬戸内海の眺望 — 天守閣展望台から松山平野・瀬戸内海・石鎚山(西日本最高峰、1,982m)まで一望",
        "石垣群 — 慶長期の高石垣、戸無門、太鼓門、隠門続櫓など21の重要文化財、石垣ファン必見",
      ],
      en: [
        "Great Keep and Connected Keep — the 1854 great keep, with lesser keep, southern and northern corner turrets connected around a central platform, a rare structure nationwide",
        "Ropeway and Chairlift — three minutes from town to summit; the open chairlift offers an immersive panoramic ride",
        "Cherry blossom site — the rebuilt 1854 keep paired with 500 Yoshino cherry trees; the Honmaru plaza in early April rivals any in the Top 100 Castles",
        "Seto Inland Sea view — the keep's observation deck commands the Matsuyama Plain, the Inland Sea, and the Ishizuchi range (West Japan's tallest at 1,982 m)",
        "Stone walls — Keicho-period high stonework, plus the Tonashimon, Taikomon, and other 21 Important Cultural Property structures — a paradise for fortification fans",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "松山城とは?", a: "愛媛県松山市の標高132m勝山山頂に建つ平山城で、現存12天守の一つ。1627年完成、1854年再建の大天守、連立式天守の独特構造、21の重要文化財建造物を擁する四国を代表する名城です。" },
        { q: "ロープウェイとリフトどっち?", a: "天候が良ければ屋根のないリフトの方が景色を全身で感じられるのでおすすめ。所要約3分、共通券でどちらにも乗れます。雨天や強風時はロープウェイが安全です。" },
        { q: "撮影ベストシーズンは?", a: "桜の4月上旬(本丸広場500本のソメイヨシノ)、紅葉の11月下旬、雪の松山城は年に数回のレア構図、夜間ライトアップ(年間通年)は通年絶景。早朝6時開門時が人少なく光柔らか。" },
        { q: "天守の入場料・営業時間は?", a: "天守入場520円、ロープウェイ・リフト往復520円(共通券セット1,040円)。9:00〜17:00(8月のみ17:30まで)、年中無休。本丸広場は無料エリアで24時間開放、夜景撮影は本丸広場まで上がる徒歩道(約30分)を利用、夜景時は特に防寒装備を。" },
        { q: "アクセスは?", a: "JR松山駅から市電「大街道駅」まで10分・170円、徒歩5分でロープウェイ・リフト乗り場。山頂までロープウェイ3分・リフト6分(屋根なし、天気いい日のみ)。徒歩道(東雲口・古町口・県庁口・黒門口の4ルート)も整備、所要20〜45分の散策コース。" },
        { q: "三脚・撮影機材は?", a: "場内は三脚OK(他の観光客への配慮)。望遠70-200mmで天守ディテール、広角16-35mmで石垣と天守の組合せ、本丸広場からは標準ズーム1本でほぼカバー可。日没後のライトアップ撮影は冷え込むため防寒、夜景の場合カメラの結露対策(ビニール袋)も。" },
      ],
      en: [
        { q: "What is Matsuyama Castle?", a: "A flatland-mountain castle in Matsuyama City, Ehime, built atop the 132 m Mt. Katsuyama and one of Japan's 12 surviving original keeps. Completed in 1627 with the keep rebuilt in 1854, its connected keep structure, 21 Important Cultural Property buildings, and Shikoku-leading status make it remarkable." },
        { q: "Ropeway or chairlift?", a: "If weather permits, the open chairlift offers a more immersive ride for the panorama (about 3 minutes). A combined ticket covers both. The ropeway is safer in rain or strong wind." },
        { q: "When is the best season to photograph it?", a: "Cherry blossoms in early April (500 Yoshino cherries on the Honmaru plaza), autumn colors in late November, rare winter snow shots, and year-round night illumination. Arrive at the 6 AM opening for thin crowds and softest light." },
        { q: "Keep admission and hours?", a: "Keep entry ¥520; ropeway/lift round trip ¥520 (combo ticket ¥1,040). 9:00–17:00 daily (until 17:30 in August). The Honmaru plaza is free 24/7 — for night photography, take the walking path up (~30 min) and dress warmly for evening shoots." },
        { q: "Access?", a: "From JR Matsuyama Station, the tram to «Okaido» takes 10 min, ¥170, then a 5-min walk to the ropeway/lift base. To the summit: ropeway 3 min, lift 6 min (open-air, weather permitting). Four maintained walking routes (Shinonome-guchi, Furumachi-guchi, Kencho-guchi, Kuromon-guchi), 20–45 min each." },
        { q: "Tripod and gear?", a: "Tripods allowed within the grounds (be considerate of crowds). Telephoto 70–200mm for keep details, wide 16–35mm for stone walls plus keep, a single standard zoom covers most of the Honmaru area. Evening illumination shoots get cold — bring warm clothes, and prevent camera condensation (plastic bag) when re-entering warm rooms." },
      ],
    },
    faqs: [
      { q: d("ロープウェイとリフトどっち？","Ropeway or chairlift?","缆车还是吊椅？","纜車還是吊椅？","로프웨이와 리프트 중 추천은?"),
        a: d("天候が良ければ屋根のないリフトの方が景色を全身で感じられる。所要5分。共通券でどちらにも乗れる。","If weather permits, the open chairlift offers better panoramic immersion (5 min). A combined ticket covers both.","天气好时选吊椅更能感受风景（5分钟）。共通票可乘两者。","天氣好時選吊椅更能感受風景（5分鐘）。共通票可乘兩者。","날씨가 좋으면 지붕 없는 리프트가 풍경을 온몸으로 느낄 수 있어 추천. 약 5분. 공통권으로 둘 다 이용 가능.") },
    ],
  },
  "来島海峡大橋": {
    desc: d(
      "来島海峡大橋は瀬戸内海の来島海峡に架かる3連の吊り橋（総延長4,105m）。しまなみ海道の象徴的存在で、世界初の3連吊り橋。急潮の海峡と壮大な橋梁は、瀬戸内海の最も劇的な風景。",
      "The Kurushima-Kaikyo Bridge is a three-in-a-row suspension bridge (total 4,105 m) spanning the Kurushima Strait. An icon of the Shimanami Kaido, it was the world's first three-structure suspension bridge. The rushing strait currents beneath and massive spans above create the Seto Inland Sea's most dramatic scene.",
      "来岛海峡大桥是横跨濑户内海来岛海峡的3连吊桥（总长4105米）。岛波海道的标志性建筑，世界首座3连吊桥。急潮海峡与壮丽桥梁构成濑户内海最戏剧性风景。",
      "來島海峽大橋是橫跨瀨戶內海來島海峽的3連吊橋（總長4105米）。島波海道的標誌性建築，世界首座3連吊橋。急潮海峽與壯麗橋樑構成瀨戶內海最戲劇性風景。",
      "구루시마 해협 대교는 세토내해의 구루시마 해협에 놓인 3연속 현수교(총연장 4,105m). 시마나미 가이도의 상징으로 세계 최초 3연 현수교. 거센 해협 조류와 장대한 교량은 세토내해 최고의 드라마틱한 풍경."
    ),
    definition: lh(
      "来島海峡大橋(くるしまかいきょうおおはし)は愛媛県今治市と大島の間の来島海峡に架かる総延長4,105mの3連の長大吊り橋で、1999年5月の本州四国連絡橋・尾道今治ルート(しまなみ海道)の全線開通と同時に開業した世界初の3連吊り橋。第一(960m)・第二(1,515m)・第三(1,570m)の三つの吊り橋が連続する独特の形状で、橋の下では日本三大急潮の一つ「来島海峡」の最大時速10ノットの潮流が流れます。橋上には自転車・歩行者専用道路もあり、しまなみ海道は世界的に有名なサイクリングルート、亀老山展望台や糸山公園からの俯瞰が瀬戸内海最高峰のドラマチックな構図を生み出します。",
      "The Kurushima-Kaikyo Bridge connects Imabari City in Ehime Prefecture to Oshima Island across the Kurushima Strait — a three-in-a-row suspension bridge with a total length of 4,105 m. It opened in May 1999 with the completion of the Honshu-Shikoku Onomichi-Imabari route (Shimanami Kaido), as the world's first three-section suspension bridge. The first (960 m), second (1,515 m), and third (1,570 m) suspension structures connect in distinctive sequence; beneath them flow currents of up to 10 knots in the Kurushima Strait — one of Japan's three great fast-current straits. With a bicycle and pedestrian path along the deck, Shimanami Kaido is a globally renowned cycling route, and the views from Mt. Kiro Observatory and Itoyama Park form the Inland Sea's most dramatic compositions."
    ),
    highlights: {
      ja: [
        "3連吊り橋構造 — 第一・第二・第三吊り橋が連続する世界初の形状、全長4,105m、海峡を一直線に貫く",
        "亀老山展望台からの俯瞰 — 標高307m、橋全体と来島海峡・島々を360度パノラマ、夕日の絶景",
        "糸山公園(今治側) — 橋の起点を間近に望む公園、斜陽の橋脚と海面の煌めきが美しい",
        "サイクリング道路 — 橋上6.5kmの自転車道、海上70mの絶景ライド、しまなみ海道の象徴",
        "急潮の海峡 — 橋下の最大時速10ノットの潮流、白波と渦の動的な被写体",
      ],
      en: [
        "Three-section suspension structure — a world-first sequence of First, Second, and Third bridges, totaling 4,105 m and slicing across the strait in a straight line",
        "View from Mt. Kiro Observatory — at 307 m, a 360° panorama of the entire bridge, the strait, and surrounding islands; spectacular at sunset",
        "Itoyama Park (Imabari side) — a park beside the bridge's foot, where the slanting late-day light and the shimmering surface combine beautifully",
        "Cycling deck — a 6.5 km cycling path on top of the bridge, riding 70 m above the sea — the symbol of the Shimanami Kaido route",
        "Fast strait currents — up to 10 knots beneath the bridge, with whitecaps and eddies that animate the shot",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "来島海峡大橋とは?", a: "愛媛県今治市と大島の間の来島海峡に架かる総延長4,105mの世界初の3連吊り橋で、1999年しまなみ海道全線開通と同時に開業。第一・第二・第三の三つの吊り橋が連続する独特の形状で、橋上を自転車・歩行者が通行できる世界的サイクリングルートの象徴です。" },
        { q: "橋の撮影ベストポイントは?", a: "亀老山展望台(今治市大島)からの俯瞰が最強。夕日で橋がオレンジに染まる時間帯と、ブルーアワーの青の2つを撮るのが王道。糸山公園からは橋を間近で、自転車道からは海上70mのライド視点と多彩。" },
        { q: "アクセスとサイクリング情報は?", a: "今治駅から亀老山展望台まで車で約30分、サイクリングは今治港レンタルサイクルから橋まで約20km。しまなみ海道全線サイクリングは70km、初心者は1日、本格派は半日で完走可。" },
        { q: "車で渡る場合の通行料は?", a: "今治IC〜大島南ICで普通車1,000円(ETC割引800円)。橋上はサイクリング道・歩道があり、車両は中央車道のみ。徒歩・自転車は無料(2024年4月から有料化、自転車100円・歩行者は無料継続)。サイクリングは橋全長5kmを所要15〜20分、絶景の連続。" },
        { q: "潮流の見頃は?", a: "来島海峡は日本三大急潮の一つで、瀬戸内海と燧灘の干満差から最大10ノットの激流が発生。撮影のベストは大潮の干満時刻±1時間以内、白波と渦を立てる迫力。亀老山展望台からは潮の動きと橋を一枚に収められ、特に春秋の大潮日が条件揃いやすい。" },
        { q: "周辺の見どころは?", a: "①糸山公園(橋の真下、迫力のロー視点)②吉海バラ公園(5月、薔薇と橋のコラボ)③大島石採石場跡(白い石壁の独特風景)④よしうみいきいき館(海鮮グルメ、橋を見ながら食事)⑤村上水軍博物館(中世の海賊文化)。1〜2日かけて橋周辺を多角度から撮影できます。" },
      ],
      en: [
        { q: "What is the Kurushima-Kaikyo Bridge?", a: "A 4,105 m three-section suspension bridge connecting Imabari (Ehime) to Oshima Island, opened in 1999 with the completion of the Shimanami Kaido — the world's first three-section suspension structure. With its bicycle and pedestrian path, it has become the symbol of one of the world's premier cycling routes." },
        { q: "Best spot to photograph the bridge?", a: "Mt. Kiro Observatory (Oshima, Imabari) provides the definitive overview. Capture both the orange-lit bridge at sunset and the blue hour afterward. Itoyama Park puts you near the bridge's foot, and the cycling deck offers an in-flight view 70 m above the sea." },
        { q: "Access and cycling information?", a: "About 30 minutes by car from Imabari Station to Mt. Kiro Observatory. By bike, it's about 20 km from Imabari Port (rental bikes available) to the bridge. Riding the entire 70 km Shimanami Kaido takes one day for casual riders or half a day for fast cyclists." },
        { q: "Toll for crossing by car?", a: "Imabari IC to Oshima-Minami IC is ¥1,000 for standard cars (¥800 with ETC). The bridge has a bicycle/pedestrian deck — vehicles use the central lanes. Bicycle/pedestrian was free until April 2024, when bicycles became ¥100 (pedestrians remain free). Cycling the 5 km takes 15–20 minutes of nonstop spectacle." },
        { q: "When to see the tidal currents?", a: "The Kurushima Strait is one of Japan's three great tidal currents, with up to 10 knots driven by the level gap between the Inland Sea and Hiuchi-nada. Shoot within ±1 hour of peak tides — whitecaps and whirlpools at their most dramatic. Mt. Kiro Observatory captures bridge and currents in one frame, especially during spring and autumn ohshio (great tides)." },
        { q: "Other nearby attractions?", a: "①Itoyama Park (under the bridge, low-angle drama) ②Yoshiumi Rose Park (May, roses + bridge) ③Oshima Stone Quarry Ruins (white rock walls) ④Yoshiumi Iki-iki Kan (seafood with bridge view dining) ⑤Murakami Suigun Museum (medieval pirate culture). A 1–2 day stay covers the bridge from many angles." },
      ],
    },
    faqs: [
      { q: d("橋の撮影ベストポイントは？","Best spot to photograph the bridge?","桥梁最佳拍摄点？","橋梁最佳拍攝點？","다리 최고 촬영 포인트는?"),
        a: d("亀老山展望台（今治市大島）からの俯瞰が最強。夕日で橋がオレンジに染まる時間帯と、ブルーアワーの青の2つを撮るのが王道。","Mt. Kiro Observatory (Oshima, Imabari) provides the definitive overview. Capture both the orange-lit bridge at sunset and the blue hour afterward.","龟老山展望台（今治市大岛）俯瞰最佳。傍晚桥身橙染与蓝色时刻各拍一张。","龜老山展望台（今治市大島）俯瞰最佳。傍晚橋身橙染與藍色時刻各拍一張。","기로산 전망대(이마바리시 오시마)의 부감이 최고. 일몰에 오렌지빛으로 물드는 다리와 블루아워를 모두 담는 것이 정석.") },
    ],
  },
  "亀老山展望台": {
    desc: d(
      "亀老山（きろうさん）展望台は今治市大島の標高307m。隈研吾設計の地形に埋もれた展望台から、来島海峡大橋と瀬戸内海の多島美を俯瞰できる絶景ポイント。夕日とブルーアワーが特に有名。",
      "Mt. Kiro Observatory, at 307 m on Oshima Island in Imabari, is an earth-integrated lookout designed by Kengo Kuma. It offers a bird's-eye view of the Kurushima-Kaikyo Bridge and the Seto Inland Sea's scattered islands. Sunset and blue hour are especially famed.",
      "龟老山展望台位于今治市大岛，海拔307米。由隈研吾设计、埋入地形的展望台可俯瞰来岛海峡大桥与濑户内海多岛美景。夕阳与蓝色时刻尤为著名。",
      "龜老山展望台位於今治市大島，海拔307米。由隈研吾設計、埋入地形的展望台可俯瞰來島海峽大橋與瀨戶內海多島美景。夕陽與藍色時刻尤為著名。",
      "기로산 전망대는 이마바리시 오시마의 해발 307m. 구마 켄고 설계로 지형에 묻힌 전망대에서 구루시마 해협 대교와 세토내해 다도미를 부감할 수 있는 절경 포인트. 일몰과 블루아워가 특히 유명합니다."
    ),
    definition: lh(
      "亀老山(きろうさん)展望台は愛媛県今治市吉海町南浦487-4、大島南端の標高307mの亀老山山頂に整備された展望公園で、世界的建築家・隈研吾が設計した「地形に埋もれる」展望デッキとして1994年に完成、ARCASIA建築賞ゴールドメダル(1995年)受賞作品。展望台は山頂の輪郭を崩さないよう地中に埋め込まれ、上から見ると公園のように見える革新的なデザイン。眼下には来島海峡大橋(全長4,105mの3連吊り橋)、瀬戸内海の多島美、晴れた日には西日本最高峰の石鎚山(1,982m)まで一望でき、夕日と橋・海・島々が織りなす光景は瀬戸内海屈指のサンセットスポットです。",
      "Mt. Kiro Observatory, located at 487-4 Minamiura, Yoshiumi-cho, Imabari City, Ehime Prefecture, sits atop the 307 m summit of Mt. Kiro at the southern tip of Oshima Island. Designed by world-renowned architect Kengo Kuma as an «earth-integrated» viewing deck, it was completed in 1994 and won the ARCASIA Gold Medal for Architecture in 1995. The observatory is buried into the ground so that the mountain's outline remains intact — viewed from above, it appears as a park, an innovative design. Below lie the 4,105 m Kurushima-Kaikyo Bridge (the three-section suspension bridge), the Inland Sea's countless islands, and on clear days even Mt. Ishizuchi (1,982 m, West Japan's tallest peak). The interplay of sunset, bridge, sea, and islands makes it one of the Inland Sea's premier sunset locations."
    ),
    highlights: {
      ja: [
        "隈研吾設計の地中埋設展望台 — 1994年完成、ARCASIA金賞受賞、地形を残す革新的デザイン",
        "来島海峡大橋の俯瞰 — 全長4,105m・3連吊り橋を真上から、夕日に染まる時間帯が王道",
        "瀬戸内海の多島美 — 大三島・伯方島・大島・芸予諸島の島々が連なる、青い海と緑の島の絶景",
        "石鎚山遠望 — 西日本最高峰1,982m、晴れた日のみ、特に冬の空気が澄んだ朝",
        "夕景〜ブルーアワー — 西日本屈指のサンセットスポット、橋・海・島・空のオレンジから青への変化",
      ],
      en: [
        "Earth-integrated observatory by Kengo Kuma — completed 1994, ARCASIA Gold Medal winner; an innovative design that preserves the mountain's silhouette",
        "Bird's-eye view of the Kurushima-Kaikyo Bridge — the 4,105 m three-section suspension bridge from above, with sunset light as the canonical window",
        "Inland Sea's multi-island beauty — Omishima, Hakatajima, Oshima, and the Geiyo Islands strung together, blue sea against green islands",
        "Distant Mt. Ishizuchi — West Japan's tallest peak (1,982 m), visible only on clear days, especially crisp winter mornings",
        "Sunset to blue hour — among West Japan's finest sunset spots; bridge, sea, islands, and sky shift from orange to blue",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "亀老山展望台とは?", a: "愛媛県今治市大島の標高307mの亀老山山頂に建つ、世界的建築家・隈研吾設計の地中埋設型展望台(1994年完成、ARCASIA金賞受賞)。来島海峡大橋と瀬戸内海の多島美を360度パノラマで俯瞰でき、西日本屈指のサンセットスポットです。" },
        { q: "アクセス方法は?", a: "しまなみ海道バス(今治駅または福山駅から「亀老山展望公園入口」下車、徒歩30分)、自転車で(駐輪場あり)、車で(駐車場頂上近くまで)。今治駅からレンタカーで約30分、アクセスはしまなみ海道経由でドライブもおすすめ。" },
        { q: "撮影ベストタイムは?", a: "夕日が来島海峡大橋を照らす時間帯と、その後のブルーアワー(日没後30分)の2回が圧倒的。冬は空気が澄んで石鎚山も見え、夕焼けの色も鮮やか。混雑回避は平日朝。" },
        { q: "隈研吾の建築の特徴は?", a: "「山を破壊せず景観に溶け込む」というコンセプトで設計された地中型展望台。コンクリート構造を山に埋め込み、屋上を芝生で覆って山頂線を保ったため遠景からは展望台の存在が見えない。展望デッキが山頂にぽっかり開いた縁のような構造で、来島海峡大橋を「絵画の額縁」のように切り取る建築自体が芸術作品です。" },
        { q: "三脚・撮影機材は?", a: "展望台は混雑時を除き三脚OK。広角(16-35mm)で展望台と橋を一枚に、望遠(70-200mm)で橋のディテールと島々を圧縮、超広角(14mm)で建築の幾何学美を強調。夕景〜夜景は2時間滞在を想定、防寒装備とヘッドライト、レンズの結露対策も。駐車場から展望台まで徒歩5分。" },
        { q: "石鎚山が見える日は?", a: "西日本最高峰の石鎚山(1,982m、亀老山から約60km西)は晴天で空気が澄んだ日のみ。冬(11〜2月)が最も確率高い、特に降水翌日の朝は空気がクリア。展望台から南西方向に望遠70-200mmで撮影、石鎚山と来島海峡大橋を一枚に収めるレア構図は冬の特権です。" },
      ],
      en: [
        { q: "What is Mt. Kiro Observatory?", a: "An earth-integrated observatory atop the 307 m Mt. Kiro on Oshima Island, Imabari, Ehime, designed by world-renowned architect Kengo Kuma (completed 1994, ARCASIA Gold Medal). It offers a 360° panorama of the Kurushima-Kaikyo Bridge and the Inland Sea — among West Japan's finest sunset destinations." },
        { q: "How do I get there?", a: "Shimanami Kaido bus from Imabari or Fukuyama (alight at Kiro-san Tenbo Park-iriguchi, then 30 minutes on foot), by bicycle (with bike parking), or by car (with a parking lot near the summit). About 30 minutes by rental car from Imabari Station; the Shimanami Kaido drive itself is recommended." },
        { q: "Best photography times?", a: "Two windows are unmatched: when sunset light strikes the Kurushima-Kaikyo Bridge, and the blue hour 30 minutes after. In winter, the air is clear enough to see Mt. Ishizuchi, and sunset colors are richest. Weekday mornings best avoid crowds." },
        { q: "What's special about Kuma's architecture?", a: "Designed under the concept «integrate, don't destroy» — the concrete structure is buried in the mountain with a turf-covered roof, so from afar the observatory disappears into the silhouette. The deck rim opens like an aperture in the summit, framing the Kurushima-Kaikyo Bridge like a painting. The building itself is a work of art." },
        { q: "Tripod and gear?", a: "Tripods are OK except during peak crowds. Wide angle (16–35mm) for the observatory + bridge in one frame; telephoto (70–200mm) compresses bridge details and islands; ultra-wide (14mm) emphasizes the architecture's geometry. Plan a 2-hour stay for sunset to night; bring warm clothes, a headlamp, and condensation prevention. 5-min walk from parking to observatory." },
        { q: "When is Mt. Ishizuchi visible?", a: "West Japan's tallest peak (1,982 m, ~60 km west of Mt. Kiro) is visible only on clear, dry days. Winter (Nov–Feb) is most likely, especially the morning after rain when air is cleanest. Shoot southwest with a 70–200mm; capturing Mt. Ishizuchi with the Kurushima-Kaikyo Bridge in one frame is a rare winter privilege." },
      ],
    },
    faqs: [
      { q: d("アクセス方法は？","How do I get there?","交通方式？","交通方式？","접근 방법은?"),
        a: d("しまなみ海道バス（今治駅または福山駅から）または自転車で。駐車場は頂上近くまで車で行ける。","Shimanami Kaido bus from Imabari or Fukuyama, or by bicycle. Parking is close to the summit.","岛波海道巴士（今治站或福山站）或自行车前往。停车场近山顶。","島波海道巴士（今治站或福山站）或自行車前往。停車場近山頂。","시마나미 가이도 버스(이마바리역 또는 후쿠야마역) 또는 자전거. 주차장은 정상 가까이까지 갈 수 있습니다.") },
    ],
  },

  /* ── 高知県 ── */
  "にこ淵": {
    desc: d(
      "にこ淵は仁淀川水系枝川川上流にある神秘の淵。太陽光が水面に差し込むと翡翠色〜コバルトブルーの「仁淀ブルー」が現れる。地元では水神が棲む神聖な場所とされ、水着や飲食は禁止。",
      "Nikobuchi is a mystical pool upstream on the Edagawa River in the Niyodo River system. When sunlight hits the water, it glows in 'Niyodo Blue' — jade to cobalt. Locally considered sacred (home to a water deity), swimming and eating are prohibited.",
      "仁淀渊是仁淀川水系枝川川上游的神秘水潭。阳光洒下时水面呈翡翠至钴蓝「仁淀蓝」。当地视为水神栖息地，禁止戏水与饮食。",
      "仁淀淵是仁淀川水系枝川川上游的神秘水潭。陽光灑下時水面呈翡翠至鈷藍「仁淀藍」。當地視為水神棲息地，禁止戲水與飲食。",
      "니코부치는 니요도강 수계 에다가와강 상류의 신비한 못. 햇빛이 수면에 비치면 비취~코발트블루의 '니요도 블루'가 나타납니다. 현지에서는 물의 신이 사는 신성한 장소로 여겨지며 수영·음식은 금지."
    ),
    definition: lh(
      "にこ淵(にこぶち)は高知県吾川郡いの町、仁淀川水系の支流・枝川川(えだがわがわ)上流にある神秘の淵で、日本最後の清流と称される仁淀川の透明度を最も鮮明に体現する場所。太陽光が水面に差し込む条件が揃うと、翡翠色からコバルトブルーへと変わる「仁淀ブルー(におどブルー)」と呼ばれる神秘の色彩を見せます。地元では古来から水神が棲む神聖な場所として崇められ、水着や入水・飲食・キャンプは全面禁止。アクセスは駐車場から急な階段(約10分)を下る必要があり、滑らない靴が必須です。",
      "Nikobuchi is a sacred pool on the upper Edagawa River — a tributary of the Niyodo River system — in Ino Town, Agawa District, Kochi Prefecture. It most vividly embodies the transparency of the Niyodo, often called Japan's last truly clear river. When sunlight strikes the water under the right conditions, it transforms from jade green to cobalt blue — a phenomenon known as «Niyodo Blue.» Locally revered as the dwelling of a water deity, the pool prohibits swimming, eating, and camping. Access requires descending steep stairs (about 10 minutes) from the parking lot — non-slip footwear is essential."
    ),
    highlights: {
      ja: [
        "仁淀ブルーの水面 — 晴天正午前後に最も濃い青、PLフィルターで反射を抑えるとさらに深い色合いに",
        "急な階段(約10分) — 駐車場から淵まで100段以上の急階段、滑りやすいので注意",
        "周辺の自然 — 仁淀川源流の清流、苔むした岩、原生林、雨上がりは霧と苔が幻想的",
        "撮影ルール — 三脚は混雑時要配慮、水中撮影は不可、ドローン禁止、地元のルールを尊重",
        "アクセス難易度 — 高知市から車で1時間、最寄駅は土佐久礼駅、レンタカー推奨",
      ],
      en: [
        "Niyodo Blue waters — deepest blue around midday on clear days; a polarizing filter further intensifies the color by cutting reflections",
        "Steep stairs (about 10 minutes) — over 100 slippery stone steps from the parking lot; non-slip footwear is essential",
        "Surrounding nature — the headwaters of the Niyodo, mossy boulders, primeval forest; mist and moss after rain are otherworldly",
        "Photography rules — be considerate with tripods when busy, no underwater photography, drones prohibited; respect local protocols",
        "Access difficulty — about 1 hour by car from Kochi City; nearest station is Tosa Kure, with a rental car strongly recommended",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "にこ淵とは?", a: "高知県いの町、仁淀川水系・枝川川上流の神秘の淵。日本最後の清流と称される仁淀川の透明度を最も鮮明に体現する「仁淀ブルー」の聖地で、地元では水神が棲む神聖な場所として崇められています。" },
        { q: "青色がよく出る時期は?", a: "晴天の正午前後(10〜14時)、特に夏〜初秋。雨の翌日は水量多く濁るので晴天続きが理想。PLフィルター必携、水面反射を抑制すると色が深まります。" },
        { q: "アクセスと注意点は?", a: "高知市から車で1時間、駐車場から急階段約10分の徒歩。滑りやすいので非滑り靴必須。水着・入水・飲食・キャンプ・ドローンは全面禁止、地元の聖地として静かに撮影してください。" },
        { q: "撮影機材のおすすめは?", a: "PLフィルター必携(水面反射カットで青が濃くなる)。広角(16-35mm)で淵全体と滝を、標準ズーム(24-105mm)で水面のディテール、望遠で滝のシャワー部分を切り取り。三脚はOKだが他の人の通行を妨げないこと。スローシャッター(1/4秒)で水流の表情も撮れます。" },
        { q: "周辺の他の仁淀ブルースポットは?", a: "①安居渓谷(車30分、青い淵が連続、遊歩道整備)②中津渓谷(雨竜の滝、紅葉名所)③吾川川上流の各淵(地元のみ知る秘境)④仁淀川河口の沈下橋。にこ淵だけでなく仁淀川全域が青の宝庫、半日〜1日で複数の青を巡るドライブが可能です。" },
        { q: "ベストアプローチ時期は?", a: "5〜10月が水温上昇で青さ最大、特に7〜8月が深い青。春の新緑(5月)+青、秋の紅葉(11月)+青の組合せも美しい。冬(12〜2月)は周辺の落葉で水量減少、青さもやや控えめだが静寂感が増す。雨後3〜5日の晴天続きが最適です。" },
      ],
      en: [
        { q: "What is Nikobuchi?", a: "A sacred pool on the upper Edagawa River (a tributary of the Niyodo River system) in Ino Town, Kochi Prefecture. It is the most vivid spot to witness «Niyodo Blue,» the phenomenon born of Japan's last clear river, and locally revered as a water deity's dwelling." },
        { q: "When is the blue strongest?", a: "Clear midday (10:00–14:00), especially summer to early autumn. After rain the water is high and turbid — dry weather is ideal. Carry a polarizing filter; suppressing surface reflections deepens the blue." },
        { q: "Access and precautions?", a: "About 1 hour by car from Kochi City; from the parking lot, descend ~10 minutes of steep stairs. Non-slip footwear required. Swimming, eating, camping, and drones are strictly forbidden — photograph quietly out of respect for this sacred site." },
        { q: "Recommended camera gear?", a: "Polarizing filter is essential — cutting surface reflection deepens the blue. Wide angle (16–35mm) for the whole pool and falls; standard zoom (24–105mm) for water surface detail; telephoto for waterfall spray. Tripods OK but don't block paths. Slow shutter (1/4s) reveals water motion." },
        { q: "Other Niyodo Blue spots nearby?", a: "①Yasui Gorge (30 min by car, sequence of blue pools with maintained trails) ②Nakatsu Gorge (Uryu Falls, autumn foliage) ③Various less-known pools in the upper Agawa system (locals' secret) ④Sinkabashi (sinking bridges) at the Niyodo's mouth. The whole Niyodo basin is a treasury of blue — a half-to-full-day drive can visit several pools." },
        { q: "Best approach season?", a: "May to October: water warmer, bluest, peaking July–August. Pair with new greenery (May) or autumn foliage (November) for stunning combinations. Winter (Dec–Feb) sees lower water from leaf-fall and slightly muted blue, but the silence intensifies. Three to five days of dry weather after rain is optimal." },
      ],
    },
    faqs: [
      { q: d("青色がよく出る時期は？","When is the blue strongest?","什么时候蓝色最明显？","什麼時候藍色最明顯？","푸른빛이 가장 뚜렷한 시기는?"),
        a: d("晴天の正午前後（10〜14時）、特に夏〜初秋。雨の翌日は水量多く濁るので晴天続きが理想。PLフィルター必携。","Clear midday (10 AM–2 PM), especially summer to early autumn. After rain, turbidity reduces the effect — dry weather ideal. Bring a PL filter.","晴天正午前后（10-14点），尤其夏至初秋。雨后浑浊，连晴最佳。必备PL镜。","晴天正午前後（10-14點），尤其夏至初秋。雨後渾濁，連晴最佳。必備PL鏡。","맑은 날 정오 전후(10-14시), 특히 여름~초가을. 비 온 다음날은 탁해지니 연속 맑은 날이 이상적. PL 필터 필수.") },
    ],
  },
  "桂浜": {
    desc: d(
      "桂浜は太平洋に面した月の名所として古来詩歌に詠まれた美しい海岸。五色の小石、黒潮の荒波、坂本龍馬像（昭和3年建立、身長5.3m）が印象的。一帯は桂浜公園で、水族館や龍馬記念館もある。",
      "Katsurahama is a beach on the Pacific, celebrated in classical poetry as a famed moon-viewing spot. Five-colored pebbles, Kuroshio-current waves, and the 5.3-m statue of Sakamoto Ryoma (erected 1928) make it iconic. The area is Katsurahama Park, with an aquarium and Ryoma Memorial Museum.",
      "桂浜是面向太平洋的赏月名所，古来诗歌咏。五色小石、黑潮浪涛、坂本龙马像（1928年立，高5.3米）印象深刻。周边为桂浜公园，有水族馆与龙马纪念馆。",
      "桂濱是面向太平洋的賞月名所，古來詩歌詠。五色小石、黑潮浪濤、坂本龍馬像（1928年立，高5.3米）印象深刻。周邊為桂濱公園，有水族館與龍馬紀念館。",
      "가쓰라하마는 태평양에 면한 달의 명소로 예로부터 시가에 읊어진 아름다운 해안. 오색 조약돌, 구로시오 조류의 거친 파도, 사카모토 료마 동상(1928년 건립, 높이 5.3m)이 인상적. 일대는 가쓰라하마 공원으로 수족관과 료마 기념관도 있습니다."
    ),
    definition: lh(
      "桂浜(かつらはま)は高知県高知市浦戸湾の入口に位置する全長約400mの弓状海岸で、太平洋に面した荒々しい海岸線と五色の小石で知られる古来からの名所。古今集にも詠われた月の名所で、土佐の月見の地として「桂浜の月」は古来から日本三大名月の一つに数えられます。坂本龍馬像(1928年建立、台座含め13.5m、像高5.3m)は太平洋を見据える姿で、幕末維新の志士・坂本龍馬の故郷土佐の象徴。一帯は桂浜公園として整備され、桂浜水族館、坂本龍馬記念館、龍王岬展望台などを擁します。",
      "Katsurahama is a 400 m bow-shaped beach at the mouth of Urado Bay in Kochi City, Kochi Prefecture, known since ancient times for its rugged Pacific coast and five-colored pebbles. Praised in the «Kokin Wakashu» as a moon-viewing site, the «moon over Katsurahama» counts among Japan's three classic moon-viewing locations. The bronze statue of Sakamoto Ryoma (erected 1928; 13.5 m including the pedestal, 5.3 m for the figure) gazes out over the Pacific as a symbol of the Bakumatsu reformist's homeland of Tosa. The area forms Katsurahama Park and includes Katsurahama Aquarium, the Sakamoto Ryoma Memorial Museum, and the Ryuomisaki Observatory."
    ),
    highlights: {
      ja: [
        "坂本龍馬像 — 1928年建立、像高5.3m、太平洋を見据える維新の志士、台座裏の階段から海側ローアングル",
        "弓状の砂浜 — 全長約400mの白砂海岸、五色の小石(チャート、メノウ、紫水晶など)が散らばる",
        "龍王岬・龍宮神社 — 桂浜の岬に立つ朱塗りの神社、太平洋越しの荒波と岬のコントラスト",
        "中秋の名月 — 古来「桂浜の月」と呼ばれる名月、9月中秋に「名月絵金祭り」開催",
        "桂浜水族館 — 1931年開業の老舗、太平洋を背景にしたショースタジアム、撮影映え",
      ],
      en: [
        "Sakamoto Ryoma Statue — erected 1928, 5.3 m tall; the Bakumatsu reformist gazing across the Pacific. Climb stairs behind the pedestal for the seaside low-angle composition",
        "Bow-shaped Beach — about 400 m of white sand strewn with multicolored stones (chert, agate, amethyst, and more)",
        "Cape Ryuo and Ryugu Shrine — a vermilion shrine on the headland, contrasting the surf with the cape itself",
        "Mid-Autumn Moon — the «moon over Katsurahama,» celebrated for centuries; the «Meigetsu Ekin Festival» is held in mid-autumn",
        "Katsurahama Aquarium — opened in 1931; with a Pacific Ocean backdrop, the show stadium photographs spectacularly",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "桂浜とは?", a: "高知県高知市の太平洋に面した全長約400mの弓状海岸。古今集にも詠われた月の名所で、坂本龍馬像が立つ「土佐の象徴」。一帯は桂浜公園として水族館・龍馬記念館・展望台を擁する高知最大の観光地です。" },
        { q: "龍馬像の撮影ベストアングルは?", a: "台座裏の階段を登った海側からのローアングル。龍馬と太平洋を背景にした構図が定番。夕日の時間帯は逆光シルエット、晴天日中は青空との順光ポートレートが両方撮れます。" },
        { q: "撮影ベストタイムは?", a: "日の出前後(東向きの太平洋から朝日)、夕暮れ時(西陽が龍馬像を照らす)が最高。中秋の名月(9月)は古来「桂浜の月」、月光と海の構図は希少。荒波の冬は迫力ある波撮影に最適。" },
        { q: "アクセスは?", a: "JR高知駅からとさでん「高知駅前」から「桂浜」行直行バスで30分・490円。高知市街から車で20分、駐車場(普通車500円・大型1,000円)。「桂浜花海道」(海岸沿いの観光道路)を通ると景色も楽しめる。観光は半日(2〜3時間)、龍馬記念館・水族館も含めると丸1日。" },
        { q: "五色の小石は持ち帰り可能?", a: "原則禁止。桂浜の小石は天然記念物の一部で持ち帰りは禁止条例あり、見つけたら必ず元の場所に戻す。撮影は自由(マクロレンズで小石のディテールを撮ると面白い)。チャート・メノウ・紫水晶など多彩な岩石が混ざる成因は、四国山地の地質と黒潮の流れの作用。" },
        { q: "周辺の連続観光は?", a: "①桂浜本体(早朝〜午前、龍馬像)②龍馬記念館(車5分、坂本龍馬の生涯展示)③桂浜水族館(隣接、レトロ建築の老舗)④高知市街(車20分、ひろめ市場でカツオのたたき)⑤高知城(現存12天守、車30分)。1日コースで土佐の歴史・文化・自然を満喫できる定番ルートです。" },
      ],
      en: [
        { q: "What is Katsurahama?", a: "A 400 m bow-shaped beach in Kochi City facing the Pacific, celebrated in the Kokin Wakashu as a great moon-viewing site. The Sakamoto Ryoma statue makes it «the symbol of Tosa,» and the surrounding Katsurahama Park includes an aquarium, the Ryoma Memorial Museum, and observatories — Kochi's largest sightseeing site." },
        { q: "Best angle for the Ryoma statue?", a: "From low angle on the seaside, reached by climbing the stairs behind the pedestal — pairs Ryoma with the Pacific backdrop. Sunset gives a striking silhouette; clear daytime light produces a sky-blue portrait. Both work." },
        { q: "Best photography times?", a: "Sunrise (with the sun rising over the Pacific to the east) and twilight (with the western sun illuminating the statue) are best. The mid-autumn full moon (September) is especially rare — moonlight over the sea. Winter's pounding surf is also dramatic." },
        { q: "How do I get there?", a: "From JR Kochi Station, the «MY Yu Bus» direct from «Kochi Eki-mae» to «Katsurahama» takes 30 min, ¥490. From central Kochi, 20 min by car (parking ¥500 / large vehicles ¥1,000). The Katsurahama Hanakaido coastal road offers great scenery. Allow 2–3 hours for the beach itself, or a full day with the Ryoma Memorial and Aquarium." },
        { q: "Can I take the colorful stones home?", a: "No — the colorful stones are part of the natural monument and an ordinance forbids removal. If you pick one up, return it. Photography is free; macro lenses capture the stones beautifully. Their mix of chert, agate, amethyst, and other minerals reflects the geology of Shikoku's mountains and Kuroshio current dynamics." },
        { q: "Combined sightseeing route?", a: "①Katsurahama itself (early morning, Ryoma statue) ②Ryoma Memorial Museum (5 min by car) ③Katsurahama Aquarium (adjacent, retro architecture) ④Central Kochi (20 min by car, Hirome Market for Tosa-style bonito tataki) ⑤Kochi Castle (one of 12 originals, 30 min by car). A standard one-day route covering Tosa's history, culture, and nature." },
      ],
    },
    faqs: [
      { q: d("龍馬像の撮影ベストアングルは？","Best angle for Ryoma statue?","龙马像最佳拍摄角度？","龍馬像最佳拍攝角度？","료마상 최고 촬영 각도는?"),
        a: d("台座裏の階段を登った海側からのローアングル。龍馬と太平洋を背景にした構図が定番。夕日の時間帯は逆光シルエットに。","From low angle on the seaside, reached by climbing stairs behind the pedestal — pairs Ryoma with the Pacific backdrop. Sunset gives a striking silhouette.","基座后方阶梯登顶，从海侧低角度拍摄。龙马与太平洋背景为经典构图。夕阳时段剪影绝佳。","基座後方階梯登頂，從海側低角度拍攝。龍馬與太平洋背景為經典構圖。夕陽時段剪影絕佳。","받침대 뒤 계단을 올라 바다 쪽 로우앵글. 료마와 태평양을 함께 담는 구도가 정석. 일몰에는 역광 실루엣이 극적입니다.") },
    ],
  },
  "高知城": {
    desc: d(
      "高知城は1611年に築城、1747年再建の現存12天守の一つ。本丸全体が残る唯一の城で、本丸御殿と天守閣がセットで残っているのは全国でここだけ。春の桜と共に撮るのが王道。",
      "Kochi Castle, built in 1611 and rebuilt in 1747, is one of 12 surviving original tenshu. It is the only castle retaining its entire honmaru (inner bailey), the only place where both the main keep and the honmaru palace survive together. A classic shot pairs it with spring cherry blossoms.",
      "高知城1611年筑城、1747年重建，现存12天守之一。唯一保留完整本丸的城堡，本丸御殿与天守阁并存全国仅此一处。春樱同框为经典。",
      "高知城1611年築城、1747年重建，現存12天守之一。唯一保留完整本丸的城堡，本丸御殿與天守閣並存全國僅此一處。春櫻同框為經典。",
      "고치성은 1611년 축성, 1747년 재건된 현존 12천수 중 하나. 혼마루 전체가 남아 있는 유일한 성으로 혼마루 어전과 천수각이 함께 남아 있는 곳은 전국에 이곳뿐. 봄 벚꽃과 함께 담는 것이 정석."
    ),
    definition: lh(
      "高知城(こうちじょう)は高知県高知市丸ノ内にある平山城で、慶長6年(1611年)に山内一豊が築城を完成、現存12天守の一つで国の重要文化財。1727年の城下大火で天守を含む大半を焼失、寛延2年(1749年)に再建された天守(高さ18.5m)と本丸御殿が現存し、本丸内の天守と御殿が両方現存するのは日本でここ高知城のみという稀有な存在。15棟の重要文化財建造物を擁し、城内のソメイヨシノ約220本は「日本さくら名所100選」、夜のライトアップと相まって四国を代表する城撮影地です。山内氏は明治維新まで14代244年間、土佐藩主として高知を治めました。",
      "Kochi Castle, in Marunouchi, Kochi City, Kochi Prefecture, is a flatland-mountain castle whose construction was completed by Yamauchi Kazutoyo in 1611 (Keicho 6); it is one of Japan's 12 surviving original tenshu and a designated Important Cultural Property. Most of the castle, including the keep, was lost in the 1727 great fire of the castle town; the surviving keep (18.5 m tall) and Honmaru Palace both date to a 1749 reconstruction. Kochi Castle is the only one in Japan where both the keep and the Honmaru Palace remain together within the inner bailey. With 15 Important Cultural Property structures and about 220 Yoshino cherry trees within the grounds (selected among Japan's «Top 100 Cherry Blossom Sites»), the castle — paired with its evening illumination — is Shikoku's foremost castle for photography. The Yamauchi clan ruled Tosa for 14 generations and 244 years until the Meiji Restoration."
    ),
    highlights: {
      ja: [
        "本丸天守(高さ18.5m) — 1749年再建、現存12天守の一つ、入母屋造り、内部公開、市街パノラマ",
        "本丸御殿 — 高知城のみ残る天守と御殿のセット、書院造の華やかな空間、京間の畳",
        "追手門(おうてもん) — 国指定重要文化財、1801年再建、桜のシーズンは天守との「桜と城」フレーム",
        "ソメイヨシノ約220本 — 日本さくら名所100選、3月下旬〜4月上旬満開、夜のライトアップ",
        "杉ノ段の石垣 — 黒い珪岩を多用した堅牢な石垣、苔と相まって独特の景観",
      ],
      en: [
        "Honmaru keep (18.5 m) — rebuilt 1749, one of Japan's 12 surviving originals, with an irimoya hip-and-gable roof; interior open, with a city panorama from the top",
        "Honmaru Palace — uniquely at Kochi, both keep and palace survive together within the inner bailey, in elegant shoin-zukuri style with kyo-ma tatami",
        "Otemon Gate — a designated Important Cultural Property rebuilt in 1801; during cherry-blossom season it frames the keep in the classic «sakura and castle» composition",
        "About 220 Yoshino cherry trees — selected among Japan's «Top 100 Cherry Blossom Sites,» in full bloom late March to early April with evening illumination",
        "Sugi-no-Dan stonework — robust black quartzite walls, especially distinctive when overgrown with moss",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "高知城とは?", a: "1611年に山内一豊が築城を完成、1749年再建の現存12天守の一つで、本丸の天守と御殿が両方現存するのは全国でここだけ。日本さくら名所100選の桜220本、15棟の重要文化財を擁する四国を代表する城撮影地です。" },
        { q: "城まで上る時間は?", a: "入口の追手門から天守まで階段で約15分。最初の追手門が桜の名フレーム、天守からの市街眺望も撮りたい。城内の所要時間は天守見学含めて1〜1.5時間、桜期は混雑するため早朝6時開門時が狙い目。" },
        { q: "撮影ベストシーズンは?", a: "桜の3月下旬〜4月上旬(夜間ライトアップあり)、紅葉の11月下旬、雪の高知城は年に数回のレア構図。早朝の追手門+天守の構図が定番、夜は天守ライトアップで黄金色に染まる絶景。" },
        { q: "天守の入場料・営業時間は?", a: "天守入場420円(高校生以下無料)、9:00〜17:00(最終入館16:30)、年末年始のみ休館。本丸広場・追手門は無料で24時間開放、夜の天守ライトアップ撮影は外側からのアプローチで可能。桜期(3月下旬〜4月上旬)は夜間ライトアップ実施。" },
        { q: "アクセスは?", a: "JR高知駅から市内電車「高知城前」下車徒歩5分・所要15分・210円。とさでんの市電で観光ルート最便利。空港から車で50分、駐車場(360円/時間)。城下街(高知公園)は市街中心地で他観光地への基点として理想、ひろめ市場・はりまや橋まで徒歩10分。" },
        { q: "本丸御殿とは?", a: "高知城は本丸の天守と御殿(藩主の居館)が両方現存する全国唯一の城。御殿内は江戸時代の暮らしを再現、上段の間(藩主専用)、納戸構え(隠し部屋)など武家建築の精髄が見られる。撮影は内部OKだが御物保護のためフラッシュ禁止、暗いため明るいレンズ+高ISOで対応。" },
      ],
      en: [
        { q: "What is Kochi Castle?", a: "A castle in Kochi City completed in 1611 by Yamauchi Kazutoyo, with the surviving keep dating to a 1749 reconstruction. It is the only castle in Japan where both the keep and the Honmaru Palace remain together within the inner bailey. With about 220 cherry trees (selected as a Top 100 Cherry Blossom Site) and 15 Important Cultural Property buildings, it is Shikoku's premier castle for photography." },
        { q: "How long to climb up?", a: "About 15 minutes by stairs from the Otemon entrance to the keep. The Otemon gate is a classic cherry-blossom frame, and don't miss the city view from the keep. Allow 1 to 1.5 hours including the keep tour; during cherry season, the 6 AM opening best avoids crowds." },
        { q: "When is the best season to photograph?", a: "Cherry blossoms late March to early April (with evening illumination), autumn colors in late November, and rare winter snow shots. The Otemon-and-keep frame at dawn is classic; the evening keep illumination glows gold." },
        { q: "Keep admission and hours?", a: "Keep entry ¥420 (free for high school and younger). 9:00–17:00 (last entry 16:30); closed only at year-end. Honmaru plaza and Otemon are free and open 24/7 — night-time keep illumination can be photographed from outside. Evening illumination during cherry season (late March–early April)." },
        { q: "Access?", a: "From JR Kochi Station, the city tram («Kochi Castle Mae») takes 15 min, ¥210, then a 5-min walk. Tosa Den's tram is the most convenient sightseeing route. From the airport, 50 min by car (parking ¥360/hour). The castle district sits at the city center — Hirome Market and Harimaya Bridge are a 10-min walk away." },
        { q: "What is the Honmaru Palace?", a: "Kochi is the only castle in Japan where both the keep and the lord's palace survive together in the inner bailey. The palace recreates Edo-period daily life, with the upper-rank room (lord's private space) and «nando-gamae» (hidden rooms) showcasing samurai architecture. Photography allowed; flash forbidden to protect artifacts. Bring a fast lens and high-ISO body for the dim interior." },
      ],
    },
    faqs: [
      { q: d("城まで上る時間は？","How long to climb up?","登城耗时？","登城耗時？","성까지 오르는 시간은?"),
        a: d("入口から天守まで階段で約15分。最初の追手門が桜の名フレーム。天守からの市街眺望も撮りたい。","About 15 min on stairs from entrance to keep. The Otemon gate is a classic cherry-blossom frame. Don't miss the view of the city from the keep.","入口至天守阶梯约15分钟。追手门是樱花名框。天守俯瞰市区亦可拍。","入口至天守階梯約15分鐘。追手門是櫻花名框。天守俯瞰市區亦可拍。","입구에서 천수까지 계단으로 약 15분. 오테몬이 벚꽃 명소 프레임. 천수에서 시가지 전망도 꼭 담으세요.") },
    ],
  },
  "名越屋沈下橋": {
    desc: d(
      "名越屋沈下橋（なごやちんかばし）は仁淀川に架かる沈下橋。増水時に水没することで橋が流されないよう欄干がない素朴な造り。清流・仁淀川の風景と合わせ、日本原風景の象徴的被写体。",
      "Nagoya submersible bridge spans the Niyodo River. Built without railings so rising floodwaters pass over without sweeping it away, it pairs starkly with the pristine Niyodo to create an iconic 'original Japan' scene.",
      "名越屋沈下桥横跨仁淀川。无护栏以防洪水冲走，朴素造型与清流仁淀川共构日本原风景。",
      "名越屋沈下橋橫跨仁淀川。無護欄以防洪水沖走，樸素造型與清流仁淀川共構日本原風景。",
      "나고야 침하교는 니요도강에 놓인 침하교. 증수 시 침수되어 다리가 쓸려가지 않도록 난간 없이 소박하게 지어졌습니다. 맑은 니요도강 풍경과 어우러져 일본 원풍경의 상징적 피사체."
    ),
    definition: lh(
      "名越屋沈下橋(なごやちんかばし)は高知県吾川郡いの町、日本最後の清流と称される仁淀川(によどがわ、全長124km)に架かる全長191m・幅2.5mの沈下橋(ちんかばし)で、1965年(昭和40年)架橋。沈下橋とは増水時に水没することで橋桁・橋脚に水流の抵抗を受けず流失を防ぐ独特の構造の橋で、欄干がないシンプルな橋面が特徴。仁淀川には大小48本の沈下橋が架かりますが、名越屋沈下橋はその代表格で、橋の下を流れる「仁淀ブルー」の透明な川面、河原の石、対岸の山々が織りなす景色は日本の原風景そのもの。地元では生活道として現役で使用される橋上を、車・自転車・歩行者が共用する素朴な日常風景です。",
      "Nagoya Submersible Bridge (Nagoya Chinkabashi), located in Ino Town, Agawa District, Kochi Prefecture, is a 191 m long, 2.5 m wide submersible bridge spanning the 124 km Niyodo River — Japan's «last clear river» — built in 1965 (Showa 40). Submersible bridges (chinkabashi) are uniquely engineered to flood with rising water rather than resist the current, preventing the bridge from being swept away; they have no railings, only a simple deck. The Niyodo carries 48 chinkabashi of various sizes; Nagoya is the most representative. Beneath it flows transparent «Niyodo Blue» water, with riverside stones and mountains on the far bank forming a scene that is the very picture of rural Japan. Locally still in active use as a road, with cars, bicycles, and pedestrians sharing the deck, it remains an unfussy daily-life landscape."
    ),
    highlights: {
      ja: [
        "全長191m・欄干なし — 沈下橋特有のシンプルな造形、増水時に水没する独特の機能美",
        "仁淀ブルー — 日本最後の清流と称される仁淀川の透明な川面、橋越しに見下ろすエメラルドグリーン",
        "車・自転車との共用 — 地元の生活道として現役、ローカルな日常風景が画面に入る",
        "新緑〜紅葉の四季 — 5月の新緑、7〜8月の水遊び、10〜11月の紅葉、冬の朝霧",
        "周辺の沈下橋網 — 仁淀川には48本の沈下橋、佐川沈下橋・蓮根沈下橋・小川沈下橋など組合せ可",
      ],
      en: [
        "191 m long with no railings — the simple form unique to submersible bridges, with functional beauty hidden in their flood-tolerant design",
        "Niyodo Blue — the transparent waters of Japan's «last clear river,» with emerald-green visible looking down from the bridge",
        "Shared with cars and bicycles — still active as a local road, with everyday life lending the frame its charm",
        "Four seasons from fresh greens to autumn colors — May's new growth, summer river play (July–August), October–November foliage, winter morning mist",
        "A network of submersible bridges — the Niyodo carries 48 chinkabashi; consider combining Sagawa, Renkon, or Ogawa Submersible Bridges",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "名越屋沈下橋とは?", a: "高知県いの町、日本最後の清流・仁淀川に架かる全長191mの沈下橋(1965年架橋)。増水時に水没することで橋を守る独特の構造で、欄干のない素朴な橋面が特徴。仁淀ブルーの川面と素朴な日常風景は日本の原風景そのものです。" },
        { q: "撮影に良い季節は?", a: "新緑の5月、夏の水遊び時期(7〜8月)、秋(10〜11月)の紅葉時。朝霧が出る冬の朝も幻想的。仁淀ブルーの濃さは晴天正午前後がピーク、橋上から撮るときはPLフィルターで反射を抑制すると深い色合いに。" },
        { q: "アクセスと注意点は?", a: "高知市から車で40分、JR波川駅から車で10分。沈下橋上は車道なので、撮影時は通行車両に注意。橋の幅2.5mで対向車とすれ違いにくい、地元住民の生活道優先で長居しない配慮を。" },
        { q: "撮影アングルとテクニックは?", a: "①橋を真横から撮る(下流側の河原から、橋全体と川を一枚に)②橋上から川面を見下ろす(欄干なしの不安感が伝わる)③望遠で人や車が橋を渡る瞬間(動感)。広角16-35mmが定番、ND8〜32で雲や水の動きをスローシャッターで表現。雨後3〜5日後の晴天が透明度・水量バランス最適。" },
        { q: "沈下橋の歴史と仕組みは?", a: "高知県には48基の沈下橋(別名・潜水橋)があり、世界的にも珍しい構造。台風や豪雨で川が増水しても流木や土砂が引っかからないよう欄干を設けず、橋自体が水没することで構造を守る知恵。1965年架橋の名越屋は今も地元の生活道路として現役で、近隣に「佐川沈下橋」「蓮根沈下橋」など兄弟橋が連なる。" },
        { q: "周辺の連続観光は?", a: "①名越屋沈下橋(早朝〜午前)②にこ淵(車30分、仁淀ブルー神秘の淵)③安居渓谷(車1時間、青の連続淵)④土佐和紙工芸村(土佐和紙体験・1,500円〜)⑤高知市街(車40分、ひろめ市場・高知城)。仁淀川流域全体を1日かけて巡る撮影旅程で、清流の四季の表情を多角的に捉えられます。" },
      ],
      en: [
        { q: "What is the Nagoya Submersible Bridge?", a: "A 191 m chinkabashi spanning the Niyodo River — Japan's «last clear river» — in Ino Town, Kochi Prefecture, built in 1965. Designed without railings to flood with rising water rather than resist it, the simple deck and surrounding daily scenery embody rural Japan." },
        { q: "Best season to shoot?", a: "Fresh greens in May, summer river play (July–August), autumn foliage (October–November), and winter mornings with mist. The «Niyodo Blue» is at its richest around clear-sky midday; from the bridge, a polarizing filter cuts surface glare and deepens the color." },
        { q: "Access and precautions?", a: "About 40 minutes by car from Kochi City, or 10 minutes from JR Hakawa Station. The bridge is a vehicle road, so watch for traffic when shooting. The deck is only 2.5 m wide, making it tight to pass; respect locals using it as a daily-life road and avoid lingering." },
        { q: "Shooting angles and techniques?", a: "①Side-on from the downstream riverbed (whole bridge with river in one frame) ②Looking down from the bridge (the railing-less feel of vertigo) ③Telephoto capturing people or cars crossing (dynamic). Wide angle 16–35mm is standard; ND 8–32 enables slow shutter for cloud and water motion. Three to five days after rain in clear weather offers the best clarity-water-balance." },
        { q: "History and design of submersible bridges?", a: "Kochi Prefecture has 48 chinkabashi («submersible bridges»), a structure rare worldwide. The lack of railings keeps debris from catching during typhoons and floods, with the bridge itself submerging to preserve its structure. Built in 1965, Nagoya remains an active local road today; sister bridges «Sagawa,» «Renkon,» and others stand nearby on the Niyodo." },
        { q: "Combined sightseeing route?", a: "①Nagoya Submersible Bridge (early morning) ②Nikobuchi (30 min by car, sacred Niyodo Blue pool) ③Yasui Gorge (1 hr by car, sequence of blue pools) ④Tosa Washi Craft Village (papermaking experience from ¥1,500) ⑤Central Kochi (40 min by car, Hirome Market and Kochi Castle). A full-day Niyodo basin loop captures the river's four-seasonal moods from multiple angles." },
      ],
    },
    faqs: [
      { q: d("撮影に良い季節は？","Best season to shoot?","最佳拍摄季节？","最佳拍攝季節？","촬영 최적 계절은?"),
        a: d("新緑の5月、夏の水遊び時期（7〜8月）、秋（10〜11月）の紅葉時。朝霧が出る冬の朝も幻想的。","Fresh greens in May, summer swimming season (July–Aug), autumn foliage (Oct–Nov). Winter mornings with mist are also dreamy.","5月新绿、7-8月戏水、10-11月红叶。冬晨有雾时亦梦幻。","5月新綠、7-8月戲水、10-11月紅葉。冬晨有霧時亦夢幻。","5월 신록, 7-8월 물놀이, 10-11월 단풍. 겨울 아침 안개 낀 날도 환상적입니다.") },
    ],
  },

  /* ── 大分県 ── */
  "別府": {
    desc: d(
      "別府温泉は日本一の湧出量と源泉数を誇る温泉王国。血の池地獄、海地獄、かまど地獄など7つの『地獄』と呼ばれる源泉は自然の驚異。湯けむり展望台からの街並みは世界に二つとない風景。",
      "Beppu boasts Japan's largest hot-spring output and number of sources. The seven 'Hells' — Blood Pond, Sea, Kamado, and others — are natural wonders. The steam-plumed townscape from the Yukemuri Observatory is unmatched worldwide.",
      "别府温泉以日本第一的涌出量和源泉数闻名。血池地狱、海地狱、灶地狱等七个「地狱」为大自然奇观。汤烟展望台所见的街景世界独一。",
      "別府溫泉以日本第一的湧出量和源泉數聞名。血池地獄、海地獄、灶地獄等七個「地獄」為大自然奇觀。湯煙展望台所見的街景世界獨一。",
      "벳푸 온천은 일본 최대 용수량과 원천 수를 자랑하는 온천 왕국. 피의못지옥, 바다지옥, 가마도지옥 등 7개의 '지옥' 원천은 자연의 경이. 유케무리 전망대에서 바라보는 거리 풍경은 세계에 둘도 없는 풍경."
    ),
    definition: lh(
      "別府(べっぷ)は大分県別府市の温泉地で、源泉数約2,288・湧出量1日約87,000kLと日本一を誇る世界有数の温泉郷。八つの温泉地(別府八湯)から成り、街全体から立ち上る湯けむりは「世界に二つとない」と称される独特の風景。観光地として「地獄めぐり」(海地獄、血の池地獄、龍巻地獄など7つの源泉、いずれも自然湧出する高温の水・蒸気・泥のスペクタクル)が代表的。鉄輪温泉(かんなわおんせん)の湯けむり展望台からは特に冬の朝に湯煙が街全体を包む幻想的な光景が見られます。",
      "Beppu, in Beppu City, Oita Prefecture, is a world-class hot-spring resort with about 2,288 sources and 87,000 kL of daily output — both Japan's greatest. Comprising eight hot-spring districts known as «Beppu Hatto,» the citywide steam plumes form a landscape often described as «unmatched anywhere on earth.» Its signature attraction, the «Hells of Beppu» tour, includes seven naturally erupting sources — Sea Hell, Blood Pond Hell, Tatsumaki Geyser Hell, and others — each producing high-temperature water, steam, or mud spectacles. The Yukemuri Observatory at Kannawa Onsen offers especially mystical views on winter mornings, when steam wraps the entire town."
    ),
    highlights: {
      ja: [
        "海地獄(うみじごく) — コバルトブルーの温泉、98℃の硫酸鉄含有泉、別府を象徴する一枚",
        "血の池地獄(ちのいけじごく) — 酸化鉄により赤褐色に染まる温泉、日本最古の天然地獄",
        "龍巻地獄 — 30〜40分間隔で噴出する間欠泉、噴出時150℃の蒸気と熱湯が立ち上る",
        "鉄輪温泉湯けむり展望台 — 街全体から立ち上る湯煙のパノラマ、冬の朝に最も濃厚",
        "別府八湯 — 別府・鉄輪・観海寺・明礬・浜脇・堀田・亀川・柴石、それぞれ異なる泉質と街並み",
      ],
      en: [
        "Umi Jigoku (Sea Hell) — cobalt-blue, 98 °C iron-sulfate-rich pool; the iconic image of Beppu",
        "Chinoike Jigoku (Blood Pond Hell) — colored deep red-brown by iron oxide, Japan's oldest natural hell",
        "Tatsumaki Jigoku (Geyser Hell) — erupts every 30–40 minutes with 150 °C steam and water bursting upward",
        "Kannawa Yukemuri Observatory — panoramic city-wide steam plumes, densest on winter mornings",
        "The Beppu Eight Hot Springs — Beppu, Kannawa, Kankaiji, Myoban, Hamawaki, Horita, Kamegawa, and Shibaseki, each with distinct water quality and townscape",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "別府とは?", a: "大分県別府市の温泉地で、源泉数約2,288・湧出量日本一の世界有数の温泉郷。8つの温泉地(別府八湯)、海地獄・血の池地獄など7つの「地獄めぐり」、世界に二つとない湯けむりの街並みを擁する独特の撮影地です。" },
        { q: "地獄巡りの所要時間は?", a: "7地獄すべてで2〜3時間。共通チケット(地獄共通観覧券、大人2,200円)がお得。海地獄・血の池地獄・龍巻地獄が写真映えする三大名所で、龍巻地獄は噴出時刻に合わせる必要あり。" },
        { q: "湯けむりが最も濃い時期は?", a: "冬(12〜2月)の朝、特に氷点下の早朝に外気と湯の温度差で湯煙が最も濃く立ち上ります。鉄輪温泉湯けむり展望台で日の出前から待ち、街に光が射す瞬間が黄金構図。" },
        { q: "アクセスは?", a: "大分空港からエアライナーバスで約45分・1,500円。大分駅からJR日豊本線で12分・280円。福岡から特急ソニックで2時間。地獄めぐりエリア(鉄輪温泉)は別府駅からバスで20〜30分・340円、または「別府地獄めぐり共通乗車券」(2,500円)が便利です。" },
        { q: "立ち寄り入浴は可能?", a: "別府温泉100軒以上で日帰り入浴可。代表的な「竹瓦温泉」(100年超の木造、入浴300円・砂湯1,500円)、「鉄輪むし湯」(地獄蒸し体験、約1,000円)、「明礬温泉湯の里」(白濁の硫黄泉)など個性豊か。タオルは持参または有料貸出。" },
        { q: "撮影マナーは?", a: "地獄や温泉の浴場は撮影OKだが、入浴客が映らないよう配慮。鉄輪温泉のけむり展望台は早朝でも住民が居るので静かに。三脚は地獄敷地内・展望台ともOK。湯気で機材が結露しやすいため吸水クロスとレンズ拭きは多めに準備。" },
      ],
      en: [
        { q: "What is Beppu?", a: "A hot-spring resort in Beppu City, Oita Prefecture, with about 2,288 sources and Japan's greatest output. Comprising eight districts (Beppu Hatto), seven naturally erupting Hells like Sea Hell and Blood Pond Hell, and citywide steam plumes, Beppu offers a photographic landscape unmatched anywhere." },
        { q: "How long does the Hells tour take?", a: "All 7 Hells take 2–3 hours; the combined ticket (Jigoku Kyotsu, ¥2,200 for adults) saves money. Sea Hell, Blood Pond Hell, and Tatsumaki Geyser are the top three photo spots — time your visit around the geyser's eruption schedule." },
        { q: "When are steam plumes thickest?", a: "On winter (December–February) mornings, especially below freezing, when the gap between air and water temperature produces the densest steam. Wait at the Kannawa Yukemuri Observatory before sunrise — the moment first light strikes the town is the golden shot." },
        { q: "How do I get there?", a: "From Oita Airport, the airliner bus takes about 45 min, ¥1,500. From Oita Station, JR Nippo Line is 12 min, ¥280. From Fukuoka, Limited Express «Sonic» 2 hr. The Hells (Kannawa) area is 20–30 min by bus from Beppu Station (¥340), or use the «Beppu Jigoku Meguri Combo Pass» (¥2,500)." },
        { q: "Are day-baths available?", a: "Over 100 spots offer day bathing. Key picks: «Takegawara Onsen» (100+ year wooden bathhouse, bath ¥300, sand bath ¥1,500), «Kannawa Mushiyu» (steam-bath experience, ~¥1,000), «Myoban Onsen Yu-no-Sato» (sulfuric milky waters). Towels — bring your own or rent for a fee." },
        { q: "Photography etiquette?", a: "Hells and onsen baths permit photography, but ensure bathers aren't in frame. Kannawa Yukemuri observatory has residents nearby — be quiet. Tripods OK in Hells grounds and observatories. Steam fogs gear easily — bring plenty of absorbent cloths and lens wipes." },
      ],
    },
    faqs: [
      { q: d("地獄巡りの所要時間は？","How long does the Hells tour take?","地狱巡游耗时？","地獄巡遊耗時？","지옥 순례 소요시간?"),
        a: d("7地獄すべてで2〜3時間。共通チケットがお得。海地獄・血の池地獄・龍巻地獄が写真映えする三大名所。","All 7 Hells take 2–3 hours. The combo ticket saves money. Sea Hell, Blood Pond Hell, and Tatsumaki Hell are the top-3 photo spots.","全7处地狱需2-3小时，共通票划算。海、血池、龙卷地狱为三大拍摄名所。","全7處地獄需2-3小時，共通票划算。海、血池、龍卷地獄為三大拍攝名所。","7개 지옥 모두 2-3시간. 공통권이 유리. 바다·피의못·다쓰마키 지옥이 3대 촬영 명소.") },
    ],
  },
  "湯布院": {
    desc: d(
      "湯布院は由布岳を望む高原の温泉地。湯の坪街道、金鱗湖、朝霧に包まれる街並み、静寂な森のアート空間など、別府と対照的な落ち着いた温泉郷。秋〜冬早朝の「朝霧の金鱗湖」は必撮。",
      "Yufuin is a highland onsen town graced by Mt. Yufu. Yunotsubo-kaido, Kinrin Lake, morning-mist streetscapes, and serene forest art spaces offer a quiet alternative to Beppu. Autumn-winter dawn mist over Kinrin Lake is a must-shoot.",
      "由布院是仰望由布岳的高原温泉。汤之坪街道、金鳞湖、晨雾街景、静谧森林艺术空间等，与别府对照的静雅温泉乡。秋冬清晨「金鳞湖晨雾」必拍。",
      "由布院是仰望由布岳的高原溫泉。湯之坪街道、金鱗湖、晨霧街景、靜謐森林藝術空間等，與別府對照的靜雅溫泉鄉。秋冬清晨「金鱗湖晨霧」必拍。",
      "유후인은 유후다케를 바라보는 고원 온천지. 유노쓰보 거리, 긴린 호수, 아침 안개에 싸인 거리, 조용한 숲의 예술 공간 등 벳푸와 대조적인 차분한 온천 마을. 가을~겨울 이른 아침의 '아침 안개의 긴린 호수'는 꼭 담아야 할 장면."
    ),
    definition: lh(
      "湯布院(ゆふいん)は大分県由布市湯布院町の温泉地で、由布岳(ゆふだけ、1,583mの双峰の活火山)を仰ぐ標高400〜500mの高原に広がります。1995年から中谷健太郎ら町長を中心とする「自分達の町は自分達で」のまちづくり運動の結果、ホテル建設規制・看板規制で日本屈指の品格ある温泉街として発展。中心の金鱗湖(きんりんこ)は温泉と冷水が混じる珍しい池で、秋〜冬の早朝には水温と外気の温度差で立ち上る朝霧の絶景が有名。湯布院温泉は源泉数852で日本2位、女性に人気の優雅な温泉郷です。",
      "Yufuin is a hot-spring town in Yufu City, Oita Prefecture, set on a plateau of 400–500 m beneath the twin-peaked active volcano Mt. Yufu (1,583 m). Since 1995, a community-led development movement (initiated by figures like Kentaro Nakaya) has restricted hotel construction and signage, growing Yufuin into one of Japan's most refined hot-spring towns. At its heart, Lake Kinrin — a rare pond where hot springs mix with cold water — is famous for the autumn-to-winter dawn mist born of the temperature gap. With 852 sources (Japan's second-most), Yufuin is a graceful onsen popular especially with women travelers."
    ),
    highlights: {
      ja: [
        "金鱗湖(きんりんこ) — 温泉と冷水が混じる珍しい湖、秋〜冬早朝の朝霧は別世界、湖畔1周徒歩15分",
        "由布岳 — 1,583mの双峰活火山、湯布院盆地のシンボル、湯の坪街道からの構図が王道",
        "湯の坪街道 — 由布院駅から金鱗湖までの約1km、町家・カフェ・工芸店が並ぶレトロな商店街",
        "由布院温泉旅館街 — 看板規制と低層建築で品格を保つ街並み、夜の灯りが温かい",
        "由布見通り(由布院駅前) — 1990年磯崎新設計の由布院駅、駅前から由布岳を望む撮影地",
      ],
      en: [
        "Lake Kinrin — a rare pond where hot springs and cold water mix; the autumn-to-winter dawn mist transports you to another world (15-minute lakeside walk)",
        "Mt. Yufu — a 1,583 m twin-peaked active volcano, the symbol of the Yufuin Basin; the classic frame is from Yunotsubo-kaido",
        "Yunotsubo-kaido — about 1 km from Yufuin Station to Lake Kinrin, lined with traditional townhouses, cafés, and craft shops",
        "Ryokan district — strict signage rules and low-rise architecture preserve the elegant streetscape; warm lighting at night",
        "Yufu-mi-dori (Yufuin Station front) — Arata Isozaki designed the 1990 Yufuin Station; a great spot for Mt. Yufu compositions",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "湯布院とは?", a: "大分県由布市の温泉地で、由布岳(1,583m)を仰ぐ標高400〜500mの高原。1995年からの規制まちづくりで日本屈指の品格ある温泉街として発展、源泉数日本2位の852本、金鱗湖の朝霧で有名な女性に人気の温泉郷です。" },
        { q: "金鱗湖の朝霧が出る条件は?", a: "11〜3月の晴れた朝、気温5度以下。温泉水と外気の温度差で発生します。日の出直前〜1時間が濃い。湖畔の足湯から望むと、湯気と朝霧が二重に立ち上る幻想的な光景に。" },
        { q: "別府との違いは?", a: "別府は湯量・地獄めぐりの迫力、湯布院は静寂と高原の品格。別府から車で約1時間、由布院IC近く。半日ずつで両方を巡るのも可能、湯布院は宿泊して夜と朝霧を狙うのが理想です。" },
        { q: "アクセスは?", a: "JR久大本線「由布院駅」から徒歩で温泉街中心部、特急「ゆふいんの森」(博多〜由布院、約2時間20分)が観光列車として人気。福岡空港から車で1時間50分、別府から車で1時間。レンタカーがあれば由布岳ドライブと組合せ可能。" },
        { q: "おすすめの宿は?", a: "高級:「亀の井別荘」「玉の湯」「無量塔」(湯布院御三家、1泊50,000〜100,000円)。中級:「鞠智」「ゆふいん花由」(20,000〜30,000円)。リーズナブル:「ゆふいん旅亭一壷天」(15,000円)。日帰り入浴は1,500〜2,000円、複数の宿で湯巡りも可能。素朴な品格と料理の質が湯布院の宿の特徴です。" },
        { q: "湯の坪街道のグルメは?", a: "①「ヴィラージュ・スリジエ」(プリン専門店)②「Bスピーク」(ロールケーキ)③「金賞コロッケ」(揚げ物の名物)④「Theomurata」(チョコレート)⑤「みつばち」(蜂蜜専門店)⑥「鶏天」(地鶏の天ぷら)。徒歩のみで巡れ、撮影と食べ歩きを楽しめる温泉街の散策コース。" },
      ],
      en: [
        { q: "What is Yufuin?", a: "A hot-spring town in Yufu City, Oita Prefecture, on a 400–500 m plateau beneath Mt. Yufu (1,583 m). Since 1995, regulated community-led development has shaped one of Japan's most refined onsen towns. With 852 sources (Japan's second-most) and the famous Lake Kinrin morning mist, it is especially popular with women travelers." },
        { q: "Conditions for morning mist at Lake Kinrin?", a: "Clear mornings November to March with temperatures below 5 °C. The thermal gap between hot-spring water and air creates the mist, densest from just before sunrise to one hour after. From the lakeside foot bath you can see steam and mist rising in double layers — pure fantasy." },
        { q: "How does Yufuin differ from Beppu?", a: "Beppu impresses with sheer onsen volume and the dramatic Hells; Yufuin offers quiet, highland refinement. About 1 hour by car from Beppu, near Yufuin IC. You can visit both in a single day, but staying overnight in Yufuin is ideal to capture the night and morning mist." },
        { q: "Access?", a: "From JR Kyudai Main Line «Yufuin» Station, the town center is walkable. The Limited Express «Yufuin no Mori» (Hakata–Yufuin, ~2 hr 20 min) is popular as a sightseeing train. From Fukuoka Airport, ~1 hr 50 min by car. From Beppu, 1 hr by car. With a rental car, pair with a Mt. Yufu drive." },
        { q: "Recommended ryokan?", a: "Luxury: Kamenoi Bessou, Tama-no-Yu, Murata (the «Big Three of Yufuin,» ¥50,000–100,000/night). Mid-range: Kokuchi, Yufuin Hanayoshi (¥20,000–30,000). Budget: Yufuin Ryotei Ikkoten (¥15,000). Day-bath access ¥1,500–2,000 — you can crawl multiple ryokan. Yufuin's signature is unpretentious refinement and dining quality." },
        { q: "Yunotsubo-kaido gourmet?", a: "①Village Cerisier (pudding specialist) ②B-Speak (roll cakes) ③Kinsho Korokke (croquettes) ④Theomurata (chocolate) ⑤Mitsubachi (honey) ⑥Toriten (local-chicken tempura). All walkable, perfect for a photography-and-snacking onsen-town stroll." },
      ],
    },
    faqs: [
      { q: d("金鱗湖の朝霧が出る条件は？","Conditions for morning mist at Kinrin Lake?","金鳞湖晨雾出现条件？","金鱗湖晨霧出現條件？","긴린 호수 아침 안개 조건은?"),
        a: d("11〜3月の晴れた朝、気温5度以下。温泉水と外気の温度差で発生。日の出直前〜1時間が濃い。","Clear mornings in Nov–Mar with temperatures below 5°C — the thermal gap between hot spring water and air produces mist. Densest from just before sunrise to one hour after.","11-3月晴朗清晨、气温5度以下。温泉与空气温差产生雾。日出前1小时最浓。","11-3月晴朗清晨、氣溫5度以下。溫泉與空氣溫差產生霧。日出前1小時最濃。","11-3월 맑은 아침, 기온 5도 이하. 온천수와 외기의 온도차로 발생. 일출 직전~1시간이 가장 짙습니다.") },
    ],
  },

  /* ── 兵庫県 ── */
  "姫路城": {
    desc: d(
      "姫路城は1609年築、世界遺産・国宝の名城。白漆喰の外壁が白鷺の如く美しく「白鷺城」と呼ばれ、現存する日本最大級の木造城郭。2009〜2015年の大修理で真っ白に蘇った姿は圧巻。",
      "Himeji Castle, completed 1609, is a UNESCO World Heritage site and National Treasure. Its white-plastered walls resemble a white heron in flight, earning the nickname 'White Heron Castle'. The largest surviving wooden castle in Japan was stunningly restored to pristine white between 2009 and 2015.",
      "姬路城建于1609年，世界遗产、国宝级名城。白漆喰外壁如白鹭般美丽而得名「白鹭城」，是现存日本最大级木造城堡。2009-2015年大修缮后洁白复活，气势磅礴。",
      "姬路城建於1609年，世界遺產、國寶級名城。白漆喰外壁如白鷺般美麗而得名「白鷺城」，是現存日本最大級木造城堡。2009-2015年大修繕後潔白復活，氣勢磅礴。",
      "히메지성은 1609년 건축, 세계유산·국보 명성. 백회반 외벽이 백로처럼 아름답다 하여 '백로성'이라 불리며, 현존 일본 최대급 목조 성곽. 2009~2015년 대수리 후 순백으로 되살아난 모습은 압권."
    ),
    definition: {
      ja: "姫路城(ひめじじょう)は兵庫県姫路市本町68番地に位置する平山城で、1346年に赤松貞範が築いた砦が起源、1601〜1609年に池田輝政が現在の大規模な大改築を行った日本最大級の木造城郭。1993年に法隆寺と並んで日本初の世界文化遺産として登録、現存12天守の中でも唯一の世界遺産であり国宝。白漆喰総塗籠の優美な姿が白鷺(しらさぎ)が羽を広げたようだとして「白鷺城(はくろじょう)」と称されます。2009〜2015年の「平成の大修理」で漆喰を塗り直し、純白の姿を取り戻した今、桜・新緑・雪との組合せは日本を代表する絵画的風景です。",
      en: "Himeji Castle, located at 68 Honmachi, Himeji City, Hyogo Prefecture, is a flatland-mountain castle whose origins trace to a 1346 fort built by Akamatsu Sadanori, with Ikeda Terumasa carrying out the major reconstruction we see today between 1601 and 1609. One of Japan's largest wooden castles, it was registered in 1993 as Japan's first World Cultural Heritage site (alongside Horyu-ji), making it both the only UNESCO-listed castle among the 12 surviving original keeps and a National Treasure. Its white-stucco silhouette is likened to a white heron spreading its wings, earning the name «White Heron Castle» (Hakuro-jo). After the 2009–2015 «Heisei Restoration» renewed the plaster, its now-pristine white form combined with cherry blossoms, fresh greenery, or snow creates a portrait of Japan that few other places can match.",
      zh: "姬路城位于兵库县姬路市本町68号的平山城，1346年赤松贞范筑砦为始，1601~1609年池田辉政进行现在的大规模改建，是日本最大级的木造城郭。1993年与法隆寺一同作为日本首批世界文化遗产登录，是现存12天守中唯一的世界遗产、国宝。白漆喰整体涂笼的优美姿态如白鹭展翅，故称「白鹭城」。2009~2015年「平成大修缮」重新涂抹漆喰，恢复纯白姿态，与樱花、新绿、雪景的组合是日本代表性的画意风景。",
      "zh-tw": "姬路城位於兵庫縣姬路市本町68號的平山城，1346年赤松貞範築砦為始，1601~1609年池田輝政進行現在的大規模改建，是日本最大級的木造城郭。1993年與法隆寺一同作為日本首批世界文化遺產登錄，是現存12天守中唯一的世界遺產、國寶。白漆喰整體塗籠的優美姿態如白鷺展翅，故稱「白鷺城」。2009~2015年「平成大修繕」重新塗抹漆喰，恢復純白姿態，與櫻花、新綠、雪景的組合是日本代表性的畫意風景。",
      ko: "히메지성은 효고현 히메지시 혼마치 68번지에 위치한 평산성으로, 1346년 아카마쓰 사다노리가 쌓은 요새를 기원으로, 1601~1609년에 이케다 테루마사가 현재의 대규모 대개축을 진행한 일본 최대급 목조 성곽. 1993년 호류지와 함께 일본 최초의 세계문화유산으로 등록, 현존 12천수 중 유일한 세계유산이자 국보. 백회반 전체를 발라 만든 우아한 모습이 백로(시라사기)가 날개를 펼친 것 같다고 하여 「백로성(하쿠로조)」이라 불립니다. 2009~2015년 「헤이세이의 대수리」로 회반죽을 다시 발라 순백의 모습을 되찾은 지금, 벚꽃·신록·눈과의 조합은 일본을 대표하는 회화적 풍경입니다.",
    },
    highlights: {
      ja: [
        "大天守 — 1601〜1609年池田輝政の大改修、五重六階地下一階の連立式天守、現存12天守の最大",
        "三の丸広場と桜 — 例年4月上旬の桜ピーク時、約1,000本のソメイヨシノと白漆喰の天守が織りなす王道構図",
        "西の丸庭園 — 千姫(豊臣秀頼夫人)が暮らした化粧櫓、紅葉と天守の側面構図",
        "シロトピア記念公園 — 城北東の公園、桜と天守の俯瞰、観光客が少ない穴場",
        "男山配水池公園 — 城北西の高台、姫路城を真正面から俯瞰できる隠れスポット",
      ],
      en: [
        "Great Keep — Ikeda Terumasa's major reconstruction (1601–1609), the connected five-story-six-floor-plus-basement keep, the largest of Japan's 12 surviving originals",
        "Sannomaru Plaza and cherry blossoms — at peak bloom in early April, about 1,000 Yoshino cherry trees frame the white keep in the canonical composition",
        "Nishi-no-Maru Garden — where Princess Sen (wife of Toyotomi Hideyori) lived; the Keshou Yagura turret with autumn colors and the keep's side profile",
        "Shirotopia Memorial Park — northeast of the castle, a less-crowded vantage with cherry blossoms and the keep from above",
        "Otoko-yama Park — a hilltop northwest of the castle offering a hidden frontal aerial view of Himeji Castle",
      ],
      zh: [
        "大天守 — 1601~1609年池田辉政大改修，五重六阶地下一阶的连立式天守，现存12天守最大",
        "三之丸广场与樱 — 4月上旬樱花高峰，约1,000棵染井吉野与白漆天守的王道构图",
        "西之丸庭园 — 千姬(丰臣秀赖夫人)居住的化妆橹，红叶与天守侧面构图",
        "白鹭纪念公园 — 城东北公园，樱花与天守俯瞰，游客少的穴场",
        "男山配水池公园 — 城西北高台，从正面俯瞰姬路城的隐藏景点",
      ],
      "zh-tw": [
        "大天守 — 1601~1609年池田輝政大改修，五重六階地下一階的連立式天守，現存12天守最大",
        "三之丸廣場與櫻 — 4月上旬櫻花高峰，約1,000棵染井吉野與白漆天守的王道構圖",
        "西之丸庭園 — 千姬(豐臣秀賴夫人)居住的化妝櫓，紅葉與天守側面構圖",
        "白鷺紀念公園 — 城東北公園，櫻花與天守俯瞰，遊客少的穴場",
        "男山配水池公園 — 城西北高台，從正面俯瞰姬路城的隱藏景點",
      ],
      ko: [
        "대천수 — 1601~1609년 이케다 테루마사의 대개수, 5중 6계 지하 1계의 연립식 천수, 현존 12천수 중 최대",
        "산노마루 광장과 벚꽃 — 매년 4월 상순 벚꽃 피크 시 약 1,000그루의 소메이요시노와 백회반 천수의 정석 구도",
        "니시노마루 정원 — 센히메(도요토미 히데요리 부인)가 살았던 화장 야구라, 단풍과 천수의 측면 구도",
        "시로토피아 기념공원 — 성 북동의 공원, 벚꽃과 천수의 부감, 관광객이 적은 비밀 스폿",
        "오토코야마 배수지 공원 — 성 북서의 고대, 히메지성을 정면에서 부감할 수 있는 숨은 스폿",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "姫路城とは?", a: "兵庫県姫路市の平山城で、1601〜1609年に池田輝政が大改築した日本最大級の木造城郭。1993年に日本初の世界文化遺産・国宝、現存12天守唯一の世界遺産で、白漆喰の優美な姿から「白鷺城」と呼ばれる名城です。" },
        { q: "桜と姫路城を撮るベスト時期は?", a: "例年4月上旬、特に3月末〜4月第1週がピーク。三の丸広場、西の丸庭園、シロトピア記念公園、男山配水池公園の4箇所が定番。早朝6時開門時が人少なく光柔らか、夕焼けの白鷺城も絶景。" },
        { q: "撮影ベストポイントは?", a: "大手門前(正面)、三の丸広場(桜と共に)、西の丸庭園(側面)、シロトピア記念公園(俯瞰)、男山配水池公園(真正面の俯瞰、知る人ぞ知る穴場)。1日かけて全方位から撮ると圧巻です。" },
        { q: "アクセスは?", a: "JR姫路駅北口から大手前通りを徒歩15分または神姫バスで5分・100円(姫路城ループバス)。新幹線「のぞみ」で東京から3時間20分・15,290円、新大阪から30分・3,400円。駅と城を結ぶ大手前通りからも姫路城が見える絶景アプローチです。" },
        { q: "三脚は使用可能?", a: "城内・天守内は三脚禁止。三の丸広場と西の丸庭園は屋外のため可、ただし混雑時は配慮を。一脚も天守内禁止。屋外撮影は問題ないが、観光客の多い10〜15時は避けて朝6〜9時または夕方17時以降の撮影が推奨です。" },
        { q: "天守の中に入れる?", a: "可。大人1,000円(西の丸庭園共通券1,050円)。天守内は急な階段(7段の梯子状階段)を昇り最上階の展望スペースから姫路市街を一望。混雑期は入場制限あり、平日早朝が確実。所要時間は約1〜2時間です。" },
      ],
      en: [
        { q: "What is Himeji Castle?", a: "A flatland-mountain castle in Himeji City, Hyogo, with the major reconstruction we see today carried out by Ikeda Terumasa between 1601 and 1609. One of Japan's largest wooden castles, it was registered in 1993 as Japan's first World Cultural Heritage site, is a National Treasure, and is the only UNESCO castle among the 12 surviving originals — nicknamed «White Heron Castle» for its graceful white silhouette." },
        { q: "Best time to shoot the castle with cherry blossoms?", a: "Typically early April, especially late March to first week of April. Classic spots: Sannomaru Plaza, Nishi-no-Maru Garden, Shirotopia Memorial Park, and Otoko-yama Park. The 6 AM opening offers thin crowds and soft light. The white silhouette at sunset is also exceptional." },
        { q: "Best photography spots?", a: "Front of Otemon (frontal), Sannomaru Plaza (with cherry blossoms), Nishi-no-Maru Garden (side view), Shirotopia Memorial Park (elevated view), and Otoko-yama Park (a hidden hilltop vantage). A full-day circuit yields stunning variety." },
        { q: "How do I get there?", a: "From JR Himeji Station's north exit, 15 min walk along Otemae-dori, or 5 min / ¥100 by Shinki Bus (Himeji Castle Loop Bus). Tokyo to Himeji on Nozomi shinkansen: 3hr 20min, ¥15,290. Shin-Osaka: 30 min, ¥3,400. The Otemae-dori approach itself shows the castle as you walk." },
        { q: "Can I use a tripod?", a: "Forbidden inside the castle and the keep. Outdoors at Sannomaru Plaza and Nishi-no-Maru Garden is fine — be considerate of crowds. Monopods also forbidden inside. Tourist crowds peak 10:00–15:00, so 6:00–9:00 AM or after 17:00 are recommended." },
        { q: "Can I enter the keep?", a: "Yes. Adults ¥1,000 (¥1,050 with Nishi-no-Maru combo). The keep features 7 ladder-like staircases up to the top floor with city views. Entry capped during busy seasons — weekday mornings are safest. Allow 1–2 hours total." },
      ],
      zh: [
        { q: "姬路城是什么?", a: "兵库县姬路市的平山城，1601~1609年池田辉政大改建的日本最大级木造城郭。1993年日本首批世界文化遗产·国宝，是现存12天守中唯一的世界遗产，白漆优美姿态而被誉为「白鹭城」的名城。" },
        { q: "拍樱花与姬路城的最佳时期?", a: "通常4月上旬，尤其3月末~4月第1周为高峰。三之丸广场、西之丸庭园、白鹭纪念公园、男山配水池公园4处为定番。清晨6时开门时人少光柔，夕阳下的白鹭城也是绝景。" },
        { q: "最佳拍摄点?", a: "大手门前(正面)、三之丸广场(配樱)、西之丸庭园(侧面)、白鹭纪念公园(俯瞰)、男山配水池公园(正面俯瞰，知者寡的穴场)。一天巡游全方位拍摄气势磅礴。" },
        { q: "怎么去?", a: "JR姬路站北口沿大手前通步行15分钟，或神姬巴士5分钟·100日元(姬路城环线巴士)。新干线「希望」从东京3小时20分·15,290日元，新大阪30分·3,400日元。从车站到城堡的大手前通路上也可见姬路城绝景。" },
        { q: "可以使用三脚架吗?", a: "城内·天守内禁用三脚架。三之丸广场与西之丸庭园室外可，但拥挤时请配合。独脚架也禁入天守内。室外拍摄无问题，但10~15时游客多，建议6~9时或17时后拍摄。" },
        { q: "可以进入天守吗?", a: "可。大人1,000日元(西之丸庭园联票1,050日元)。天守内需爬陡峭阶梯(7段梯状阶梯)至最上层展望，俯瞰姬路市区。拥挤期有入场限制，平日早晨确实。所需1~2小时。" },
      ],
      "zh-tw": [
        { q: "姬路城是什麼?", a: "兵庫縣姬路市的平山城，1601~1609年池田輝政大改建的日本最大級木造城郭。1993年日本首批世界文化遺產·國寶，是現存12天守中唯一的世界遺產，白漆優美姿態而被譽為「白鷺城」的名城。" },
        { q: "拍櫻花與姬路城的最佳時期?", a: "通常4月上旬，尤其3月末~4月第1週為高峰。三之丸廣場、西之丸庭園、白鷺紀念公園、男山配水池公園4處為定番。清晨6時開門時人少光柔，夕陽下的白鷺城也是絕景。" },
        { q: "最佳拍攝點?", a: "大手門前(正面)、三之丸廣場(配櫻)、西之丸庭園(側面)、白鷺紀念公園(俯瞰)、男山配水池公園(正面俯瞰，知者寡的穴場)。一天巡遊全方位拍攝氣勢磅礴。" },
        { q: "怎麼去?", a: "JR姬路站北口沿大手前通步行15分鐘，或神姬巴士5分鐘·100日圓(姬路城環線巴士)。新幹線「希望」從東京3小時20分·15,290日圓，新大阪30分·3,400日圓。從車站到城堡的大手前通路上也可見姬路城絕景。" },
        { q: "可以使用三腳架嗎?", a: "城內·天守內禁用三腳架。三之丸廣場與西之丸庭園室外可，但擁擠時請配合。獨腳架也禁入天守內。室外拍攝無問題，但10~15時遊客多，建議6~9時或17時後拍攝。" },
        { q: "可以進入天守嗎?", a: "可。大人1,000日圓(西之丸庭園聯票1,050日圓)。天守內需爬陡峭階梯(7段梯狀階梯)至最上層展望，俯瞰姬路市區。擁擠期有入場限制，平日早晨確實。所需1~2小時。" },
      ],
      ko: [
        { q: "히메지성이란?", a: "효고현 히메지시의 평산성으로, 1601~1609년 이케다 테루마사가 대개축한 일본 최대급 목조 성곽. 1993년 일본 최초의 세계문화유산·국보, 현존 12천수 중 유일한 세계유산으로, 백회반의 우아한 모습에서 「백로성」이라 불리는 명성입니다." },
        { q: "벚꽃과 히메지성을 찍는 베스트 시기는?", a: "매년 4월 상순, 특히 3월 말~4월 첫째 주가 절정. 산노마루 광장, 니시노마루 정원, 시로토피아 기념공원, 오토코야마 배수지 공원의 4곳이 정석. 이른 아침 6시 개문 시간이 인적이 적고 빛이 부드러우며, 석양의 백로성도 절경." },
        { q: "촬영 베스트 포인트는?", a: "오테몬 앞(정면), 산노마루 광장(벚꽃과 함께), 니시노마루 정원(측면), 시로토피아 기념공원(부감), 오토코야마 배수지 공원(정면 부감, 아는 사람만 아는 비밀 스폿). 하루 종일 전방위로 촬영하면 압권입니다." },
        { q: "가는 방법은?", a: "JR 히메지역 북쪽 출구에서 오테마에 도리를 따라 도보 15분 또는 신키 버스로 5분·100엔(히메지성 루프 버스). 신칸센 「노조미」로 도쿄에서 3시간 20분·15,290엔, 신오사카에서 30분·3,400엔. 역과 성을 잇는 오테마에 도리에서도 히메지성이 보이는 절경 어프로치입니다." },
        { q: "삼각대 사용 가능?", a: "성내·천수 내는 삼각대 금지. 산노마루 광장과 니시노마루 정원은 옥외라 가능하지만 혼잡 시는 배려를. 일각대도 천수 내 금지. 옥외 촬영은 문제 없지만, 관광객 많은 10~15시는 피하고 아침 6~9시 또는 저녁 17시 이후의 촬영이 권장됩니다." },
        { q: "천수에 들어갈 수 있나?", a: "가능. 어른 1,000엔(니시노마루 정원 공통권 1,050엔). 천수 내에는 가파른 계단(7단의 사다리 같은 계단)을 올라 최상층 전망 공간에서 히메지 시가지를 한눈에. 혼잡기는 입장 제한 있어 평일 이른 아침이 확실. 소요 시간은 약 1~2시간입니다." },
      ],
    },
    faqs: [
      { q: d("桜と姫路城を撮るベスト時期は？","Best time to shoot castle with cherry blossoms?","姬路城与樱花合拍时期？","姬路城與櫻花合拍時期？","벚꽃과 히메지성 촬영 최적기?"),
        a: d("例年4月上旬、特に3月末〜4月第1週。三の丸広場、西の丸庭園、シロトピア記念公園の3カ所が定番ポイント。","Typically early April, especially late March to first week of April. Classic spots: Sannomaru Plaza, Nishi-no-maru Garden, and Shirotopia Memorial Park.","通常4月上旬，3月末-4月第1周最佳。三之丸广场、西之丸庭园、白鹭纪念公园为3处经典。","通常4月上旬，3月末-4月第1週最佳。三之丸廣場、西之丸庭園、白鷺紀念公園為3處經典。","보통 4월 초순, 특히 3월 말~4월 첫째 주. 산노마루 광장, 니시노마루 정원, 시로토피아 기념공원이 3대 정석 포인트.") },
    ],
  },

  /* ── 岐阜県 ── */
  "白川郷": {
    desc: d(
      "白川郷は世界遺産の合掌造り集落。急勾配のかやぶき屋根（60度）が雪の重みに耐える独特の建築で、1世帯に多世代が住む大家族制度を支えた。冬のライトアップは期間限定で予約必須。",
      "Shirakawa-go is a UNESCO-listed village of gassho-zukuri ('praying hands') farmhouses. The steep 60-degree thatched roofs shed heavy snow and once supported multi-generation households. Winter illumination is limited and requires reservation.",
      "白川乡是世界遗产合掌造聚落。60度陡坡的茅草屋顶能承受雪重，支撑多代同住的大家族制度。冬季点灯限定期间需预约。",
      "白川鄉是世界遺產合掌造聚落。60度陡坡的茅草屋頂能承受雪重，支撐多代同住的大家族制度。冬季點燈限定期間需預約。",
      "시라카와고는 세계유산 갓쇼즈쿠리 마을. 60도 급경사 초가지붕이 눈의 무게를 견디는 독특한 건축으로, 한 세대 여러 세대가 함께 사는 대가족 제도를 지탱했습니다. 겨울 라이트업은 한정 기간 예약 필수."
    ),
    definition: lh(
      "白川郷(しらかわごう)は岐阜県大野郡白川村にある合掌造り集落で、1995年に五箇山(富山県)とともに「白川郷・五箇山の合掌造り集落」として世界文化遺産登録。中心の荻町(おぎまち)集落には114棟の合掌造り家屋が現存し、急勾配約60度の茅葺き屋根が手を合わせた形に似ることから「合掌造り(がっしょうづくり)」の名が付きました。世帯一族が3〜4世代同居する大家族制度を支えた独特の建築で、屋根裏では蚕の飼育が行われた歴史も。冬の積雪と夜のライトアップ(年6回程度の限定開催、要事前予約)は世界中の写真家が憧れる日本の原風景です。",
      "Shirakawa-go is a settlement of gassho-zukuri farmhouses in Shirakawa Village, Ono District, Gifu Prefecture, registered in 1995 as a UNESCO World Cultural Heritage Site («Historic Villages of Shirakawa-go and Gokayama,» the latter in Toyama Prefecture). At its center, the Ogimachi village preserves 114 gassho farmhouses; their steeply pitched 60° thatched roofs resemble hands held in prayer — the source of the name «gassho-zukuri» (palms-together construction). The architecture supported large extended families across three or four generations, with attic spaces historically used for silkworm rearing. The winter snow and the limited evening illuminations (about six dates per year, advance reservations required) form the Japanese rural landscape of which photographers worldwide dream."
    ),
    highlights: {
      ja: [
        "荻町城跡展望台 — 集落全体を俯瞰できる定番ポイント、徒歩20分または送迎バス、雪化粧の朝が最高",
        "合掌造り民家園 — 移築・保存された26棟の合掌造り、内部見学可、屋根裏の蚕飼育空間も体験",
        "明善寺(みょうぜんじ) — 集落唯一の合掌造り寺院、1827年築の本堂、鐘楼も合掌造りで珍しい",
        "和田家(わだけ) — 国指定重要文化財、約300年の歴史、内部見学可、合掌造りの構造を学べる",
        "冬季ライトアップ — 例年1〜2月の限定6日程度、雪と灯りの幻想的光景、要事前予約必須",
      ],
      en: [
        "Ogimachi Castle Ruins Observatory — the classic vantage overlooking the entire village; reach by 20-minute walk or shuttle bus; snowy mornings are peak",
        "Gassho-zukuri Folk Park — 26 relocated and preserved gassho farmhouses with interior tours, including the silkworm-rearing attic spaces",
        "Myozen-ji — the village's only gassho-zukuri temple, with the 1827 main hall and a rare gassho bell tower",
        "Wada Family House — a nationally designated Important Cultural Property over 300 years old; interior tours reveal the gassho structure",
        "Winter illumination — held on about six dates each January–February; the snow-and-light scene is dreamlike and requires advance reservation",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "白川郷とは?", a: "岐阜県白川村の合掌造り集落で、1995年に世界遺産登録。荻町集落には114棟の合掌造り家屋(60度の茅葺き屋根)が現存し、3〜4世代同居の大家族制度を支えた独特の建築で日本の原風景です。" },
        { q: "展望台からの撮影ポイントは?", a: "荻町城跡展望台が村全体を俯瞰できる定番。朝霧が出る秋〜冬、雪景色の1〜2月、新緑の5月、それぞれ名作を生む。徒歩20分または有料シャトルバス、駐車場あり。" },
        { q: "ライトアップはいつ?", a: "毎年1〜2月の限定日程(例年6日程度)で開催。展望台からの撮影は完全予約制(2024年から有料化)、村内宿泊者または抽選当選者のみ入場可。早めの計画必須です。" },
        { q: "アクセスは?", a: "高速バスが最も便利。金沢駅から1時間15分(2,000円)、富山駅から1時間20分、高山駅から50分。マイカーは冬季スタッドレス必須、白川IC直結のせせらぎ公園駐車場(1,000円/日)。冬は1〜2時間の駐車待ちあり。" },
        { q: "宿泊は可能?", a: "合掌造りの民宿が約20軒、外国人観光客に大人気で半年〜1年前から予約必須。1泊2食付き10,000〜20,000円。冬季ライトアップ抽選にも宿泊者枠あり。村内コンビニなし、必要品は事前準備を。" },
        { q: "撮影マナーは?", a: "民家は現役で住民が暮らす生活空間。家屋の中・玄関先・室内を覗くのは絶対NG。私有地に立ち入らない、ドローンは禁止、ライトアップ時は三脚撮影が混雑する展望台で長時間占拠不可。住民が見えても撮影しない配慮を。" },
      ],
      en: [
        { q: "What is Shirakawa-go?", a: "A gassho-zukuri village in Shirakawa Village, Gifu, UNESCO-listed in 1995. The Ogimachi village preserves 114 farmhouses with 60° thatched roofs that supported extended families across 3–4 generations — the embodiment of the Japanese rural landscape." },
        { q: "Shooting from the observatory?", a: "Ogimachi Castle Ruins Observatory overlooks the entire village — the classic vantage. Autumn-winter mist, January–February snow, and May greenery each yield masterpieces. Reach by a 20-minute walk or paid shuttle, with parking nearby." },
        { q: "When is the light-up?", a: "Held on a limited number of dates (about six per year) in January and February. Observatory access is reservation-only (paid since 2024); only village guests or lottery winners may enter. Early planning is essential." },
        { q: "How do I get there?", a: "Highway bus is most practical. From Kanazawa Station: 1hr 15min, ¥2,000. From Toyama Station: 1hr 20min. From Takayama Station: 50 min. By car, snow tires are mandatory in winter; Seseragi Park lot at Shirakawa IC (¥1,000/day). In winter, expect 1–2 hour waits to park." },
        { q: "Can I stay overnight?", a: "About 20 gassho-zukuri minshuku run as inns; hugely popular with international visitors, often booked 6–12 months ahead. ¥10,000–20,000/night with two meals. Overnight guests get priority in the winter illumination lottery. No convenience stores in the village — bring what you need." },
        { q: "Photography etiquette?", a: "These are working homes where residents live. Never enter private property, never look into entrances or windows, never use drones. During illumination, don't monopolize the crowded observatory. If you see residents, don't photograph them." },
      ],
    },
    faqs: [
      { q: d("展望台からの撮影ポイントは？","Shooting from the observatory?","展望台拍摄点？","展望台拍攝點？","전망대에서 촬영은?"),
        a: d("荻町城跡展望台が村全体を俯瞰できる定番。朝霧が出る秋〜冬、雪景色の1〜2月、新緑の5月がそれぞれ名作を生む。","Ogimachi Castle Ruins Observatory overlooks the entire village — the classic vantage. Autumn-winter mist, Jan-Feb snow, and May greenery each yield masterpieces.","荻町城迹展望台俯瞰全村为经典。秋冬晨雾、1-2月雪景、5月新绿各出名作。","荻町城跡展望台俯瞰全村為經典。秋冬晨霧、1-2月雪景、5月新綠各出名作。","오기마치 성터 전망대에서 마을 전체를 부감하는 것이 정석. 가을~겨울 아침 안개, 1-2월 설경, 5월 신록 각각 명작을 만듭니다.") },
    ],
  },

  /* ── 香川県 ── */
  "父母ヶ浜": {
    desc: d(
      "父母ヶ浜（ちちぶがはま）は三豊市の遠浅の砂浜。干潮時に残る潮だまりが夕日を反射し、「日本のウユニ塩湖」として世界的に有名に。風のない夕刻、空と人影が水面に鏡のように映る絶景が撮れる。",
      "Chichibugahama is a wide, shallow beach in Mitoyo City. At low tide, tidal pools reflect sunset, earning the nickname 'Japan's Uyuni Salt Flat'. On calm evenings, sky and silhouettes appear as a perfect mirror on the wet sand.",
      "父母浜是三丰市的浅滩。退潮时残留的水洼反射夕阳，被誉为「日本的乌尤尼盐湖」而享誉世界。无风傍晚天空与人影如镜般倒映。",
      "父母濱是三豐市的淺灘。退潮時殘留的水窪反射夕陽，被譽為「日本的烏尤尼鹽湖」而享譽世界。無風傍晚天空與人影如鏡般倒映。",
      "지치부가하마는 미토요시의 얕은 백사장. 간조 시 남은 물웅덩이가 석양을 반사해 '일본의 우유니 소금사막'으로 세계적으로 유명해졌습니다. 바람 없는 저녁 하늘과 사람 그림자가 수면에 거울처럼 비치는 절경을 담을 수 있습니다."
    ),
    definition: lh(
      "父母ヶ浜(ちちぶがはま)は香川県三豊市仁尾町(にお)にある瀬戸内海に面した全長約1kmの遠浅の砂浜で、2017年頃からSNSで「日本のウユニ塩湖」として世界的に有名になった水鏡夕景の聖地。干潮時に砂浜に残るタイドプール(潮だまり)が、空と夕陽を完璧に映し出す鏡となり、人物のシルエットを反転構図で撮影することで、まるでボリビアのウユニ塩湖のような神秘的な写真が撮れます。三豊市観光交流局が「天空の鏡カレンダー」で最適日を公開しており、世界中の写真愛好家が訪れる人気急上昇の撮影地です。",
      "Chichibugahama is a 1 km stretch of shallow beach on the Inland Sea coast of Nio, Mitoyo City, Kagawa Prefecture, that became a globally famous «mirror sunset» destination from around 2017 — dubbed «Japan's Uyuni Salt Flat.» At low tide, residual tidal pools form a perfect mirror reflecting sky and setting sun, and photographing silhouettes mirrored in the wet sand produces images reminiscent of Bolivia's Uyuni Salt Flat. Mitoyo City Tourism publishes a «Sky Mirror Calendar» listing optimal dates, and the beach has rapidly risen as a sought-after destination for photo enthusiasts worldwide."
    ),
    highlights: {
      ja: [
        "水鏡の夕景 — 干潮と日没が重なる日に出現、空・人物・雲が水面に完璧に映る世界的構図",
        "シルエット撮影 — 人物が両手を上げてジャンプ、跳ねる、横になるなど多彩なポーズで反転構図",
        "天空の鏡カレンダー — 三豊市観光交流局公式サイトで最適日(干潮+日没+晴天)を月別に公開",
        "周辺ダイニング — 砂浜目の前に「父母ヶ浜カフェ」、撮影後の食事と夕日鑑賞に最適",
        "アクセス — 高松市から車で約1時間、JR詫間駅からタクシーまたはコミュニティバス",
      ],
      en: [
        "Mirror sunset — appears on days when low tide and sunset coincide, perfectly reflecting sky, figures, and clouds",
        "Silhouette photography — figures with raised arms, jumping, crouching, or lying down all reverse beautifully on the water surface",
        "Sky Mirror Calendar — Mitoyo City Tourism publishes a monthly schedule of optimal days (low tide + sunset + clear weather) on its official site",
        "Beachfront dining — «Chichibugahama Café» faces the beach directly, ideal for dining and watching the sunset after the shoot",
        "Access — about 1 hour by car from Takamatsu City; from JR Takuma Station, taxi or community bus",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "父母ヶ浜とは?", a: "香川県三豊市仁尾町の遠浅の砂浜で、2017年頃から「日本のウユニ塩湖」としてSNSで世界的に有名になった水鏡夕景の聖地。干潮時のタイドプールが空と夕陽を映し、シルエット撮影で神秘的な写真が撮れます。" },
        { q: "鏡面反射を撮る条件は?", a: "①干潮と日没が重なる日 ②風がほぼ無い ③空に雲(空だけだと単調)。三豊市観光協会の「天空の鏡カレンダー」で最適日を公開、必ず事前確認を。日没15分前から30分後がゴールデンタイム。" },
        { q: "シルエット撮影のコツは?", a: "両手を広げて跳ぶ、夕陽を持つポーズ、寝そべる等のアクションが映えます。撮影者は地面ぎりぎりまでカメラを下げてローアングル、被写体は水たまりの奥(後ろ)に立つと反転がきれいです。" },
        { q: "アクセスは?", a: "高松市から車で約1時間、瀬戸中央道経由。最寄り駅はJR詫間駅でタクシー15分・約3,000円(コミュニティバス三豊市たくちゃん号もあり)。駐車場は無料・3か所、夕方は満車になるため日没90分前到着が安心。" },
        { q: "持ち物・服装は?", a: "サンダルか防水靴(干潟は濡れる)、靴下のままで歩くのもOK。三脚は必須(夕陽の時間にスローシャッターを使う)。タオル、レンズ拭きクロス、塩分が機材につきやすいので帰宅後の手入れ用品。秋〜冬は防寒対策も。" },
        { q: "天気が悪い日は?", a: "雨や強風で水鏡は見えませんが、雲が多い日は実は最高(夕焼け色が水面に映る)。完全な無雲晴天は意外に映え難い。曇りで雲底に夕焼け色が宿ると最高の構図。前日にwindyや気象庁の風予報で5m/s以下を確認。" },
      ],
      en: [
        { q: "What is Chichibugahama?", a: "A shallow beach in Nio, Mitoyo City, Kagawa Prefecture, that rose to global fame as «Japan's Uyuni Salt Flat» from around 2017. Tidal pools at low tide reflect sky and setting sun, enabling silhouette photography that produces almost otherworldly images." },
        { q: "What conditions create the mirror reflection?", a: "①Low tide coinciding with sunset ②Near-zero wind ③Clouds in the sky (a clear sky looks flat). Mitoyo City Tourism publishes the «Sky Mirror Calendar» — confirm before going. The golden window is 15 minutes before to 30 minutes after sunset." },
        { q: "Tips for silhouette photography?", a: "Spread arms and jump, hold the sun in a pinch, or lie down — dynamic poses photograph best. Lower the camera nearly to ground level for a low angle. Have your subject stand behind the puddle so the reflection is clean." },
        { q: "How do I get there?", a: "About 1 hour by car from Takamatsu via the Seto-Chuo Expressway. Nearest station is JR Takuma — 15 min / ¥3,000 by taxi (the «Takuchan-go» community bus also runs). Three free lots; evening fills fast, so arrive 90 min before sunset." },
        { q: "What should I bring?", a: "Sandals or waterproof shoes (the flats get wet); walking in socks is fine too. Tripod essential for slow-shutter sunset work. Towels, lens cloths, and post-shoot care kit (salt sticks to gear). Bring warm clothes from autumn to winter." },
        { q: "What if the weather is bad?", a: "Heavy rain or wind kills the mirror, but cloudy days are actually ideal — sunset color reflects on the water. Pure clear skies tend to look flat. Clouds catching sunset colors at their base produce the best frames. Check Windy or JMA the day before for winds under 5 m/s." },
      ],
    },
    faqs: [
      { q: d("絶景日の予約方法は？","How to book for optimal day?","如何预约最佳日？","如何預約最佳日？","최적일 예약 방법은?"),
        a: d("予約不要だが三豊市観光交流局が「天空の鏡カレンダー」で最適日を公開。干潮と日没が重なる日を選んで訪問。","No reservation, but Mitoyo City Tourism publishes a 'Sky Mirror Calendar' with optimal days. Plan for days when low tide and sunset coincide.","无需预约，三丰市观光交流局公布「天空之镜日历」。选择干潮与日落重合日前往。","無需預約，三豐市觀光交流局公布「天空之鏡日曆」。選擇乾潮與日落重合日前往。","예약 불필요. 미토요시 관광교류국이 '천공의 거울 캘린더'로 최적일을 공개. 간조와 일몰이 겹치는 날을 선택해 방문.") },
    ],
  },

  /* ── 奈良県 ── */
  "法隆寺": {
    desc: d(
      "法隆寺は607年に聖徳太子が創建した世界最古の木造建築群。金堂・五重塔を含む西院伽藍は7世紀末〜8世紀初の創建時のまま現存。ユネスコ世界遺産第1号として1993年に登録された日本仏教美術の至宝。",
      "Horyu-ji, founded in 607 by Prince Shotoku, contains the world's oldest surviving wooden structures. The Sai-in complex, including the kondo and five-story pagoda, survives from the late 7th / early 8th century. It was among Japan's first UNESCO World Heritage sites (1993), a treasure of Buddhist art.",
      "法隆寺是607年圣德太子创建的世界最古木造建筑群。金堂、五重塔等西院伽蓝为7世纪末-8世纪初创建原貌。1993年作为日本首个世界遗产登录，是日本佛教美术至宝。",
      "法隆寺是607年聖德太子創建的世界最古木造建築群。金堂、五重塔等西院伽藍為7世紀末-8世紀初創建原貌。1993年作為日本首個世界遺產登錄，是日本佛教美術至寶。",
      "호류지는 607년 쇼토쿠 태자가 창건한 세계 최고(最古) 목조 건축군. 금당과 5중탑을 포함한 사이인 가람은 7세기 말~8세기 초 창건 당시의 모습 그대로 현존. 1993년 유네스코 세계유산 제1호로 등록된 일본 불교 미술의 지보."
    ),
    definition: lh(
      "法隆寺(ほうりゅうじ)は奈良県生駒郡斑鳩町(いかるがちょう)にある聖徳宗の総本山で、推古天皇15年(607年)に聖徳太子と推古天皇が建立したと伝わる世界最古の木造建築群。1993年に姫路城と並んで日本初の世界文化遺産として登録、世界遺産登録第1号の一つです。西院伽藍(さいいんがらん)の金堂・五重塔は7世紀後半から8世紀初頭の創建時の姿のまま約1,300年に渡って現存し、世界最古の現存木造建築としてユネスコに認定。東院伽藍の夢殿(739年)、約100棟の建造物中38棟が国宝、約4,600件の国宝・重要文化財を擁する日本仏教美術の至宝です。",
      "Horyu-ji is the head temple of the Shotoku sect, located in Ikaruga Town, Ikoma District, Nara Prefecture. Tradition holds that it was founded by Prince Shotoku and Empress Suiko in the 15th year of Empress Suiko's reign (607 CE), and it preserves the world's oldest surviving wooden architecture. Registered in 1993 as one of Japan's first World Cultural Heritage sites (alongside Himeji Castle), it stands as one of the original UNESCO World Heritage entries. The Sai-in complex's Kondo and five-story pagoda survive from the late 7th to early 8th century — nearly 1,300 years — and are recognized by UNESCO as the world's oldest extant wooden buildings. With the To-in complex's Yumedono (Hall of Dreams, built 739), 38 of about 100 buildings designated as National Treasures, and roughly 4,600 designated cultural assets, Horyu-ji is the supreme repository of Japanese Buddhist art."
    ),
    highlights: {
      ja: [
        "金堂(こんどう) — 7世紀建立の世界最古の木造建築、釈迦三尊像(国宝)を安置、エンタシス柱の美",
        "五重塔(ごじゅうのとう) — 高さ31.5m、世界最古の五重塔、1〜5層の屋根のバランスが完璧",
        "夢殿(ゆめどの)・東院伽藍 — 739年建立の八角円堂、聖徳太子等身大の救世観音菩薩像(秘仏)",
        "中門(ちゅうもん) — 西院伽藍の正面門、エンタシスの柱、2体の金剛力士像",
        "百済観音像(国宝) — 大宝蔵院に安置、高さ2.1mの飛鳥時代の木造仏像、独特の細長い姿",
      ],
      en: [
        "Kondo (Main Hall) — built in the 7th century, the world's oldest wooden building, enshrining the Shaka Triad (a National Treasure); admire the entasis columns",
        "Five-Story Pagoda — 31.5 m tall, the world's oldest pagoda; the proportional balance from the first to fifth tiers is exquisite",
        "Yumedono (Hall of Dreams) and To-in Precinct — built in 739 as an octagonal hall, with the secret Guze Kannon, said to be a life-sized image of Prince Shotoku",
        "Chumon (Central Gate) — the main gate to the Sai-in Precinct, with entasis columns and two Niou (Vajra Warrior) guardians",
        "Kudara Kannon (National Treasure) — enshrined in the Daihozoin, a 2.1 m wooden Asuka-period image with a uniquely elongated form",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "法隆寺とは?", a: "奈良県斑鳩町の聖徳宗総本山で、607年に聖徳太子が創建したと伝わる世界最古の木造建築群。1993年に日本初の世界文化遺産登録、金堂・五重塔は約1,300年前の創建時の姿のまま現存し、約4,600件の国宝・重要文化財を擁する日本仏教美術の至宝です。" },
        { q: "写真撮影のルールは?", a: "境内の建築は撮影可。堂内の仏像はほぼ撮影禁止。三脚・フラッシュは境内でも不可、参拝者の邪魔にならないよう配慮を。早朝(8時開門)・夕方は人が少なく光が柔らかい絶好の撮影時間です。" },
        { q: "アクセスと拝観料は?", a: "JR法隆寺駅から徒歩20分またはバスで約7分。拝観料は西院伽藍・大宝蔵院・東院伽藍の共通券で1,500円。所要時間2〜3時間。京都・奈良からの日帰り可、京都駅から快速で約45分。" },
        { q: "ベスト撮影シーズンは?", a: "梅雨明けの7月の青空+白雲+白壁の組合せが最も鮮やか。秋の柿(11月)・桜(4月初旬)も季節感の被写体。雪化粧した法隆寺は年に数回のレア構図、冬の早朝に運が良ければ撮れる。塔と門のシルエットは夕焼け時に映え、空の色が刻々と変化する瞬間が見どころ。" },
        { q: "撮影機材のおすすめは?", a: "①広角(16-35mm)で五重塔と回廊の全景②望遠(70-200mm)で塔の細部・組物・装飾③標準ズームで建築のディテール。鉄道写真感覚で「日本の原風景」を切り取る。柿渋色の柱と白漆喰のコントラストはCPLフィルターで色彩を強化、低彩度でも独特の風情。" },
        { q: "周辺の観光連携は?", a: "①法隆寺(早朝〜午前)②法輪寺・法起寺(車5分、三重塔の三井寺)③中宮寺(法隆寺隣接、菩薩半跏像で有名)④薬師寺・唐招提寺(車30分、奈良市内・西ノ京エリア)⑤奈良公園(車40分、東大寺・春日大社)。1日で奈良の世界遺産5件を巡る撮影旅程が組める、午後遅くは奈良公園の鹿が活発。" },
      ],
      en: [
        { q: "What is Horyu-ji?", a: "The head temple of the Shotoku sect in Ikaruga, Nara, said to have been founded in 607 by Prince Shotoku — preserving the world's oldest wooden architecture. Registered in 1993 as one of Japan's first World Cultural Heritage sites, its Kondo and five-story pagoda still stand from about 1,300 years ago, and the temple holds some 4,600 designated cultural assets — the supreme repository of Japanese Buddhist art." },
        { q: "Photography rules?", a: "The exterior buildings are open for photography; statues inside the halls are mostly off-limits. No tripods or flashes even outdoors; be mindful of worshippers. Early morning (8 AM opening) and late afternoon offer thin crowds and soft light." },
        { q: "Access and admission fees?", a: "From JR Horyu-ji Station: 20-minute walk or 7-minute bus. The combined ticket (Sai-in, Daihozoin, To-in) is ¥1,500. Allow 2–3 hours. Day trips from Kyoto or Nara are easy — about 45 minutes from Kyoto Station by rapid train." },
        { q: "Best photography seasons?", a: "Post-monsoon July with blue sky + white clouds + white walls is the most vivid pairing. Persimmons in November and cherry blossoms in early April add seasonal character. Snow-clad Horyu-ji is a rare frame appearing only a few days each winter — early-morning chance shots. Pagoda and gate silhouettes shine at sunset, with the sky color changing minute by minute." },
        { q: "Recommended camera gear?", a: "①Wide angle (16–35mm) for the full pagoda and corridor view ②Telephoto (70–200mm) for tower details, brackets, and ornaments ③Standard zoom for architectural detail. Shoot it like rail-photography, framing «classic Japan.» CPL filter strengthens the contrast of persimmon-toned columns and white plaster; even low saturation conveys unique mood." },
        { q: "Combined sightseeing route?", a: "①Horyu-ji (early morning–morning) ②Horinji and Hokiji (5 min by car, three-tier pagodas) ③Chuguji (next to Horyu-ji, famous for the half-lotus Bodhisattva) ④Yakushiji and Toshodaiji (30 min by car, Nishinokyo area in Nara) ⑤Nara Park (40 min by car, Todaiji and Kasuga Taisha). A full-day route covers five Nara World Heritage sites; late afternoon brings out active deer in Nara Park." },
      ],
    },
    faqs: [
      { q: d("写真撮影のルールは？","Photography rules?","拍摄规则？","拍攝規則？","촬영 규칙은?"),
        a: d("境内は撮影可。堂内の仏像はほぼ撮影禁止。三脚・フラッシュは境内でも不可。早朝・夕方は人が少なく光が柔らかい。","Grounds are OK to photograph; Buddha statues inside halls are mostly off-limits. No tripods or flashes even outdoors. Early mornings and late afternoons are calmer and softer.","院内可拍摄，堂内佛像基本禁拍。院内也禁三脚架与闪光灯。清晨傍晚人少光柔。","院內可拍攝，堂內佛像基本禁拍。院內也禁三腳架與閃光燈。清晨傍晚人少光柔。","경내 촬영 가능, 불상 내부는 대부분 금지. 삼각대·플래시는 경내에서도 불가. 이른 아침·저녁이 한적하고 빛이 부드러움.") },
    ],
  },

  /* ── 徳島県 ── */
  "鳴門海峡": {
    desc: d(
      "鳴門海峡は徳島県と淡路島の間、世界三大潮流の一つで最大幅1.3km。春秋の大潮時には直径20mに達する巨大渦潮が発生し、観潮船や大鳴門橋遊歩道「渦の道」から撮影できる。",
      "The Naruto Strait, between Tokushima and Awaji Island, is among the world's three largest tidal currents (max width 1.3 km). Spring and autumn spring tides produce whirlpools up to 20 m across — photograph from sightseeing boats or the Uzu-no-Michi walkway under the Onaruto Bridge.",
      "鸣门海峡位于德岛与淡路岛之间，世界三大潮流之一，最宽1.3公里。春秋大潮期直径20米巨大漩涡形成，可从观潮船或大鸣门桥步道「涡之道」拍摄。",
      "鳴門海峽位於德島與淡路島之間，世界三大潮流之一，最寬1.3公里。春秋大潮期直徑20米巨大漩渦形成，可從觀潮船或大鳴門橋步道「渦之道」拍攝。",
      "나루토 해협은 도쿠시마현과 아와지섬 사이, 세계 3대 조류 중 하나로 최대 폭 1.3km. 봄·가을 대조 시 지름 20m에 달하는 거대 소용돌이가 발생하며, 유람선이나 오나루토 대교 산책로 '우즈노미치'에서 촬영 가능."
    ),
    definition: lh(
      "鳴門海峡(なるとかいきょう)は徳島県鳴門市と兵庫県南あわじ市(淡路島)の間にある幅約1.3kmの狭い海峡で、瀬戸内海と紀伊水道を結ぶ位置にあります。瀬戸内海と紀伊水道の干満差(最大1.5m)と狭い海峡地形が組み合わさり、海水が時速約20km(最大10ノット)で流れる日本三大急潮の一つ、世界的にも珍しい巨大渦潮現象が発生。直径20mを超える渦潮は満潮・干潮前後の1〜2時間に最大となり、特に春・秋の大潮(新月・満月前後)は世界三大潮流(メッシーナ海峡・セイモア海峡と並ぶ)。観潮船または大鳴門橋遊歩道「渦の道」(海上45m)から撮影可能です。",
      "The Naruto Strait, between Naruto City in Tokushima Prefecture and Minamiawaji City in Hyogo Prefecture (Awaji Island), is a narrow channel about 1.3 km wide that connects the Inland Sea to the Kii Channel. The combination of a tidal differential of up to 1.5 m and the narrow geography drives water through at about 20 km/h (max 10 knots), producing one of Japan's three great tidal currents — and one of the world's three (alongside the Strait of Messina and Seymour Narrows). Whirlpools over 20 m across reach maximum size 1–2 hours around high or low tide, especially during the spring tides of spring and autumn (near new and full moons). They can be photographed from sightseeing boats or from «Uzu-no-Michi,» the walkway 45 m above the strait beneath the Onaruto Bridge."
    ),
    highlights: {
      ja: [
        "渦潮(うずしお) — 直径20m超、世界三大潮流、満潮/干潮前後1〜2時間で最大化",
        "観潮船 — 鳴門観光港から発着、約30分、迫力満点で渦潮の中まで近づく",
        "渦の道(うずのみち) — 大鳴門橋下450mの遊歩道、海上45m、ガラス床から渦を直視",
        "千畳敷展望台・鳴門公園 — 徳島側の俯瞰スポット、桜と海峡の組合せが春の絶景",
        "道の駅うずしお(淡路島側) — 大鳴門橋と海峡の俯瞰、夕日に染まる瞬間が美しい",
      ],
      en: [
        "Whirlpools — over 20 m across, one of the world's three great tidal currents; largest 1–2 hours around high or low tide",
        "Sightseeing boat — departs from Naruto Sightseeing Port; a 30-minute cruise approaches the whirlpools at full intensity",
        "Uzu-no-Michi — a 450 m walkway under the Onaruto Bridge, 45 m above the strait, with glass floors offering direct views of the whirlpools",
        "Senjojiki Observatory and Naruto Park — overlooks on the Tokushima side; cherry blossoms with the strait make a stunning spring scene",
        "Michi-no-Eki Uzushio (Awaji side) — sweeping view of the bridge and strait; the sunset moment is unforgettable",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "鳴門海峡とは?", a: "徳島県と淡路島の間の幅1.3kmの狭い海峡で、世界三大潮流の一つ。瀬戸内海と紀伊水道の干満差で時速20kmの潮流が発生し、直径20m超の渦潮を生む世界的にも珍しい現象が見られる撮影地です。" },
        { q: "観潮船と遊歩道どっちがおすすめ?", a: "迫力は観潮船(海面まで近づく)、俯瞰と安全性は遊歩道「渦の道」(海上45mから真下を見下ろす)。船は波しぶきを浴びる覚悟が必要、両方乗ると渦潮を360度楽しめます。" },
        { q: "撮影ベストタイムは?", a: "春・秋の大潮(新月・満月前後)、満潮/干潮前後1〜2時間が最大。事前に潮見表を確認、観光協会の「渦潮見頃カレンダー」が便利。観潮船は時刻指定で予約推奨です。" },
        { q: "観潮船と渦の道の料金・営業時間は?", a: "観潮船「うずしお汽船」「うずしおクルーズ」(亀浦観光港・福良港発、所要約30分・1,800〜2,500円)。渦の道(大鳴門橋遊歩道、9:00〜18:00、入場510円・夏期延長)。両方の共通券は割引あり、観光協会窓口で。混雑期は事前予約必須です。" },
        { q: "撮影機材のおすすめは?", a: "①望遠70-300mm(渦潮の細部を切り取る)②NDフィルター(スローシャッターで渦の動きを表現)③CPL(海面反射カット、渦の見え方UP)④広角(橋全景+海峡の大景)。観潮船は揺れるため手ブレ補正必須、レンズフードで波しぶき防止、撮影後は塩分洗浄を忘れずに。" },
        { q: "周辺の連携観光は?", a: "①鳴門海峡(午前、観潮船)②大鳴門橋遊歩道「渦の道」(午後、俯瞰撮影)③淡路島・道の駅うずしお(夕景)④鳴門公園(千畳敷展望台、桜の名所)⑤鳴門市ドイツ館(板東俘虜収容所跡、ベートーヴェン第九初演地)。1日で渦潮を多角度から撮影、淡路島宿泊で翌朝の海も。" },
      ],
      en: [
        { q: "What is the Naruto Strait?", a: "A 1.3 km-wide channel between Tokushima and Awaji Island, one of the world's three great tidal currents. The tidal gap between the Inland Sea and the Kii Channel pushes water at about 20 km/h, producing whirlpools over 20 m across — a globally rare phenomenon for photographers." },
        { q: "Tour boat or walkway?", a: "Boats for intensity (up close to the surface), the «Uzu-no-Michi» walkway for safety and overhead views (45 m above the strait, looking straight down). Boat riders should expect spray; doing both lets you photograph the whirlpools from every angle." },
        { q: "Best photography time?", a: "Spring and autumn spring tides (near new and full moons), 1–2 hours around high or low tide are the peak. Check tide tables; the tourism association's «Whirlpool Calendar» is helpful. Reserving a boat slot in advance is recommended." },
        { q: "Boat and walkway fees and hours?", a: "Sightseeing boats «Uzushio Kisen» and «Uzushio Cruise» (from Kameura Port or Fukura Port, ~30 min, ¥1,800–2,500). Uzu-no-Michi (Onaruto Bridge walkway, 9:00–18:00, ¥510, summer extended hours). Combo discounts available at tourism offices. Reservations required during peak periods." },
        { q: "Recommended camera gear?", a: "①Telephoto 70–300mm (to crop whirlpool detail) ②ND filter (slow shutter for whirlpool motion) ③CPL (cuts surface reflection, makes whirlpools more visible) ④Wide angle (bridge + strait grand vista). Boats rock — image stabilization helps. Use a lens hood against spray and rinse off salt afterwards." },
        { q: "Combined sightseeing route?", a: "①Naruto Strait (morning, sightseeing boat) ②Uzu-no-Michi walkway (afternoon, overhead views) ③Awaji Michi-no-Eki Uzushio (sunset) ④Naruto Park (Senjojiki Observatory, cherry-blossom site) ⑤Naruto German House (the Bando POW camp where Beethoven's 9th had its Japanese premiere). One full day for many whirlpool angles; stay on Awaji for next-morning sea." },
      ],
    },
    faqs: [
      { q: d("観潮船と遊歩道どっちがおすすめ？","Tour boat or walkway?","游船还是步道？","遊船還是步道？","유람선과 산책로 중 추천은?"),
        a: d("迫力は観潮船、俯瞰と安全性は遊歩道。渦の道はガラス床から真下に渦を見られる。観潮船は波しぶきを浴びる覚悟が必要。","Boats for intensity, walkway for overhead safety. Uzu-no-Michi's glass floor shows whirlpools directly below. Boat riders should expect sea spray.","游船更震撼，步道更俯瞰安全。涡之道玻璃地板可直视漩涡。游船需防浪花。","遊船更震撼，步道更俯瞰安全。渦之道玻璃地板可直視漩渦。遊船需防浪花。","박력은 유람선, 부감과 안전성은 산책로. 우즈노미치 유리 바닥에서 바로 아래 소용돌이를 볼 수 있습니다. 유람선은 물보라 각오 필요.") },
    ],
  },

  /* ── 千葉県 ── */
  "鴨川シーワールド": {
    desc: d(
      "鴨川シーワールドは千葉県鴨川市の水族館。日本で数少ないシャチの飼育展示と迫力あるパフォーマンスが名物。イルカ、ベルーガのショーも充実。太平洋を背景にしたショースタジアムは撮影映えする。",
      "Kamogawa Sea World, in Kamogawa City (Chiba), is one of few Japanese aquariums housing orcas, with powerful performances. Dolphin and beluga shows round out the lineup. The show stadium with the Pacific backdrop makes for striking photos.",
      "鸭川海洋世界位于千叶县鸭川市。日本少数展示虎鲸的水族馆，震撼表演为其名物。海豚、白鲸表演也丰富。以太平洋为背景的表演场十分上镜。",
      "鴨川海洋世界位於千葉縣鴨川市。日本少數展示虎鯨的水族館，震撼表演為其名物。海豚、白鯨表演也豐富。以太平洋為背景的表演場十分上鏡。",
      "가모가와 시월드는 지바현 가모가와시의 수족관. 일본에서 드물게 범고래를 사육·전시하는 곳으로 박력 있는 공연이 명물. 돌고래, 벨루가 공연도 풍부. 태평양을 배경으로 한 공연장은 촬영 명소."
    ),
    definition: lh(
      "鴨川シーワールド(かもがわシーワールド)は千葉県鴨川市東町1464-18にある総合海洋テーマパークで、1970年(昭和45年)開業の老舗水族館。約11,000匹800種類の海洋生物を飼育・展示し、特に日本では現在2施設のみ(名古屋港水族館と当館)というシャチ(オルカ)の飼育・パフォーマンスで知られます。シャチショーは2,000席のメインプール「オーシャンスタジアム」で1日3〜4回開催され、太平洋を背景にした圧巻のスケール。ベルーガ(シロイルカ)、バンドウイルカ、アシカ、ペンギンなどのショーも充実、東京から特急で約2時間という近さで家族連れや写真愛好家が訪れる海洋撮影の名所です。",
      "Kamogawa Sea World, located at 1464-18 Higashi-machi, Kamogawa City, Chiba Prefecture, is a comprehensive marine theme park and one of Japan's longest-running aquariums, opened in 1970 (Showa 45). Housing about 11,000 marine creatures across 800 species, it is one of only two Japanese facilities currently keeping orcas (the other being the Port of Nagoya Public Aquarium) and is renowned for its orca performances. Three to four times a day, the orca show is held in the «Ocean Stadium» main pool with 2,000 seats, set against the Pacific Ocean for spectacular scale. With strong beluga, bottlenose dolphin, sea lion, and penguin shows, and just 2 hours from Tokyo by limited express, it is a favorite of families and photographers."
    ),
    highlights: {
      ja: [
        "シャチショー(オーシャンスタジアム) — 2,000席、太平洋を背景に1日3〜4回、迫力満点の演技",
        "ベルーガ(シロイルカ)ショー — シャチに次ぐ人気、白い体と青い水のコントラストが幻想的",
        "バンドウイルカショー — 大ジャンプの瞬間、太平洋とイルカ、SS1/1000以上で水しぶき凍結",
        "ロッキーワールド(アシカ・ペンギン) — 北極圏の生態系を再現、自然光が入る撮影に最適な空間",
        "太平洋ビュー — 鴨川市の海岸線に立地、ショースタジアムの背景は本物の太平洋",
      ],
      en: [
        "Orca Show (Ocean Stadium) — 2,000 seats, three to four times daily against the Pacific, a spectacular performance",
        "Beluga Show — second only to the orcas in popularity; the white body against the blue water is dreamlike",
        "Bottlenose Dolphin Show — the moment of a great leap, with the Pacific behind; freeze splashes at 1/1000s+ shutter",
        "Rocky World (Sea Lions and Penguins) — recreates the polar ecosystem, with natural light making the perfect photographic space",
        "Pacific View — the city's coastal setting means the Ocean Stadium's backdrop is the real Pacific",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "鴨川シーワールドとは?", a: "千葉県鴨川市の1970年開業の総合海洋テーマパーク。約11,000匹800種類の海洋生物を擁し、日本では2施設のみのシャチ飼育・パフォーマンスで有名。太平洋を背景にしたショースタジアムは家族連れ・写真愛好家に大人気の撮影地です。" },
        { q: "シャチ撮影のコツは?", a: "SS1/1000以上で水しぶき凍結、連写モード必須。最前列は濡れるので座席選びに注意(防水対策必須)。ジャンプの瞬間は予測撮影、ガラス越しよりオープン水面の方が映えます。" },
        { q: "アクセスとベストタイミングは?", a: "東京から特急わかしお号で約2時間、JR安房鴨川駅から無料シャトルバスで10分。ショーは1日3〜4回、午前中の方が照明が柔らかく撮影向き。混雑回避は平日朝の最初のショーが狙い目。" },
        { q: "入場料と所要時間は?", a: "大人(高校生以上)3,300円、子供(小・中学生)2,000円、幼児(4歳以上)1,300円。年中無休、9:00〜17:00(季節変動)。ショーや展示を全て見ると半日〜1日。年間パスポート(7,800円〜)もあり、リピーターには断然お得です。" },
        { q: "おすすめの撮影機材は?", a: "①望遠ズーム70-300mmまたは100-400mm(シャチ・イルカのジャンプを切り取る)②防水カメラまたはレインカバー(前列は濡れる)③高ISO耐性ボディ(屋内水槽の暗さ対応)。三脚は通行妨害になるため一脚推奨、フラッシュは動物保護で禁止です。" },
        { q: "シャチパフォーマンスの裏側体験は?", a: "1日2回開催の「シャチパフォーマンス」(無料、要事前予約)に加えて、有料の「シャチに会いに行こう!」ツアー(3,000円)ではバックステージで触れあい、トレーナーの解説を聞ける。撮影もOK、家族連れに大人気で予約は1週間前が目安です。" },
      ],
      en: [
        { q: "What is Kamogawa Sea World?", a: "A comprehensive marine theme park in Kamogawa City, Chiba Prefecture, opened in 1970, with about 11,000 marine creatures across 800 species. As one of only two facilities in Japan keeping orcas, with shows set against the Pacific, it is hugely popular with families and photographers." },
        { q: "Tips for orca photography?", a: "Shutter speed 1/1000+ to freeze splashes; burst mode is essential. Front rows get soaked — choose seats carefully (rain protection required). Anticipate the leap moments. Open-water surfaces photograph better than through glass." },
        { q: "Access and best timing?", a: "From Tokyo, the Wakashio limited express runs about 2 hours; from JR Awa-Kamogawa Station, a free shuttle bus runs 10 minutes. Shows are held 3–4 times daily; morning lighting is softer for photography. The first weekday-morning show best avoids crowds." },
        { q: "Admission and time required?", a: "Adults (high-school and up) ¥3,300, children (elementary/middle) ¥2,000, kids (4+) ¥1,300. Open year-round, 9:00–17:00 (seasonal variation). Allow half a day to a full day to see all shows and exhibits. Annual passes (from ¥7,800) are great for repeat visits." },
        { q: "Recommended camera gear?", a: "①Telephoto zoom 70–300mm or 100–400mm (to crop orca/dolphin jumps) ②Weatherproof camera or rain cover (front rows get wet) ③High-ISO-tolerant body (for dim indoor tanks). Tripods can block paths — a monopod is preferred. Flash is forbidden to protect the animals." },
        { q: "Behind-the-scenes orca experience?", a: "Beyond the twice-daily free Orca Performance (reservation required), the paid «Meet the Orcas» tour (¥3,000) goes backstage with hands-on encounters and trainer commentary. Photography OK; very popular with families — book about a week ahead." },
      ],
    },
    faqs: [
      { q: d("シャチ撮影のコツは？","Tips for orca photography?","虎鲸拍摄技巧？","虎鯨拍攝技巧？","범고래 촬영 팁은?"),
        a: d("SS1/1000以上で水しぶき凍結、連写モード必須。最前列は濡れるので座席選びに注意。","Shutter speed 1/1000+ to freeze splashes; burst mode essential. Front rows get soaked — choose seats carefully.","快门1/1000以上凝固水花，需连拍。前排会湿，选座需注意。","快門1/1000以上凝固水花，需連拍。前排會濕，選座需注意。","셔터 1/1000 이상으로 물보라 동결, 연사 모드 필수. 앞줄은 젖으니 좌석 선택 주의.") },
    ],
  },

  /* ── 北海道 残り ── */
  "旭山動物園": {
    desc: d(
      "旭山動物園は旭川市の市立動物園。「行動展示」という手法で、動物本来の生態・能力が見られる展示設計が革新的。ペンギンの散歩、ホッキョクグマの飛び込み、アザラシの円筒水槽など、動物写真に最適。",
      "Asahiyama Zoo in Asahikawa pioneered 'behavioral display' — enclosures designed to showcase animals' natural abilities. Penguin walks, polar bear dives, and seal cylinder tanks make it a wildlife photographer's delight.",
      "旭山动物园是旭川市立动物园。「行动展示」手法让动物展现本能行为，展馆设计革新。企鹅散步、北极熊跳水、海豹圆筒水槽等都适合动物摄影。",
      "旭山動物園是旭川市立動物園。「行動展示」手法讓動物展現本能行為，展館設計革新。企鵝散步、北極熊跳水、海豹圓筒水槽等都適合動物攝影。",
      "아사히야마 동물원은 아사히카와 시립 동물원. '행동 전시' 기법으로 동물 본래의 생태·능력을 볼 수 있는 혁신적 전시 설계. 펭귄 산책, 북극곰 다이빙, 바다표범 원통 수조 등 동물 사진에 최적."
    ),
    definition: lh(
      "旭山動物園(あさひやまどうぶつえん)は北海道旭川市東旭川町倉沼にある日本最北の動物園で、1967年(昭和42年)開園。1990年代に経営危機に陥り廃園寸前まで追い込まれましたが、1997年から飼育員主導で「行動展示(こうどうてんじ)」という独創的な展示手法を導入。動物を見せ物にするのではなく、動物本来の生態・運動能力を引き出す展示設計が革新的と評価され、2004年には上野動物園を抜き月間入園者数日本一に。ペンギンの散歩(冬季)、ホッキョクグマの飛び込み、アザラシの円筒水槽「マリンウェイ」など、動物の自然な動きを至近距離で撮影できる「日本の動物園のあり方」を変えた施設です。",
      "Asahiyama Zoo, in Higashi-Asahikawa-cho Kuranuma, Asahikawa City, Hokkaido, is Japan's northernmost zoo, opened in 1967 (Showa 42). Driven to the brink of closure in the 1990s, it pioneered «behavioral display» from 1997 — an innovative approach designed not to exhibit animals as spectacles but to draw out their natural behavior and abilities. By 2004, monthly attendance had surpassed Tokyo's Ueno Zoo, making it Japan's most visited. Penguin walks in winter, polar bear dives, and the «Marine Way» seal cylinder tank let visitors photograph animals in natural motion at close range — a facility that transformed the concept of the Japanese zoo."
    ),
    highlights: {
      ja: [
        "ペンギンの散歩(冬季限定) — 12月中旬〜3月、雪上の一列行進、キングペンギンが圧倒的に人気",
        "ホッキョクグマ館 — 飛び込みプール、頭上を泳ぐ姿が見えるカプセル型観察ドーム",
        "あざらし館「マリンウェイ」 — 円筒型水槽を行き来するアザラシ、世界初の革新的展示",
        "ぺんぎん館 — 360度水中観察、空を飛ぶように泳ぐ姿、自然光が美しい",
        "もぐもぐタイム — 飼育員が動物の生態を解説しながら餌やり、シャッターチャンスの宝庫",
      ],
      en: [
        "Penguin Walk (winter only) — mid-December to March, a single-file procession through snow; the king penguin parade is overwhelmingly popular",
        "Polar Bear Hall — a diving pool with capsule-shaped observation domes that show the bears swimming overhead",
        "Seal Hall «Marine Way» — seals shuttling through cylinder-shaped tanks, a world-first innovation in display",
        "Penguin Hall — 360° underwater observation; penguins appear to «fly» as they swim, beautifully lit by natural light",
        "Mogu-mogu (feeding) Time — keepers explain animal behavior during feedings, offering rich photo opportunities",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "旭山動物園とは?", a: "北海道旭川市の日本最北の動物園で、1967年開園。1997年から「行動展示」を導入、動物本来の生態・能力を引き出す展示で2004年に月間入園者数日本一を達成。ペンギンの散歩、ホッキョクグマ館など動物の自然な動きを至近距離で撮影できる革新的施設です。" },
        { q: "ペンギンの散歩は?", a: "12月中旬〜3月、雪が積もる冬季限定で1日2回開催。キングペンギンの一列歩きは冬の風物詩で世界的に有名。早朝の最初の散歩(11時頃)が混雑前で撮影に最適、白い雪と黒白のペンギンのコントラストが映えます。" },
        { q: "アクセスは?", a: "JR旭川駅からバスで約40分、旭川空港から車で35分。札幌から特急で約1時間20分+バス。冬季は雪道の運転に注意、レンタカーよりJR・バスの方が安全です。所要時間は半日〜1日。" },
        { q: "入園料・営業時間は?", a: "大人1,000円・小学生未満無料。夏期(4/29〜11/3)9:30〜17:15、冬期(11/11〜4/7)10:30〜15:30、夜の動物園(8月のみ)21:00まで延長。年4回の休園期間あり、公式サイトで要確認。混雑する正午前後を避け、開園直後または閉園前1時間が撮影狙い目。" },
        { q: "撮影機材の制限は?", a: "アマチュア撮影はOK、商用利用や三脚・自撮り棒は事前申請必要。フラッシュは動物への影響を避けるため禁止が原則。望遠レンズ(70-300mmなど)は必携、ガラス越し撮影が多いため反射対策(レンズフード、黒い服)が有効。雪上での撮影は防水カバーも。" },
        { q: "おすすめの撮影スポットは?", a: "①ペンギン館の水中トンネル(ペンギンが頭上を「飛ぶ」)②ホッキョクグマ館のシールズアイ(熊が泳ぐ姿を真下から)③オランウータン舎の17m空中綱渡り④もぐもぐタイム(飼育員の動物解説、被写体の動きが活発)。冬限定でペンギンの散歩は必撮。" },
      ],
      en: [
        { q: "What is Asahiyama Zoo?", a: "Japan's northernmost zoo, in Asahikawa City, Hokkaido — opened in 1967. From 1997 it pioneered «behavioral display» to draw out animals' natural abilities, and by 2004 it surpassed Tokyo's Ueno Zoo in monthly attendance. With penguin walks, polar bear halls, and other innovations, it lets visitors photograph natural animal motion at close range." },
        { q: "Penguin walk schedule?", a: "Held twice daily from mid-December to March — winter only, when snow is on the ground. The king penguin parade is a globally famous winter staple. The first walk (around 11 AM) is best for photography before crowds; the contrast of white snow and black-and-white penguins is striking." },
        { q: "Access?", a: "About 40 minutes by bus from JR Asahikawa Station, 35 minutes by car from Asahikawa Airport, or about 1 hour 20 minutes from Sapporo by limited express plus bus. In winter, snow-road driving is risky — JR and buses are safer than rental cars. Allow half a day to a full day." },
        { q: "Admission and hours?", a: "Adults ¥1,000, children under elementary age free. Summer (Apr 29–Nov 3): 9:30–17:15. Winter (Nov 11–Apr 7): 10:30–15:30. The night zoo extends to 21:00 (August only). The zoo closes for cleaning four times a year — check the official site. Avoid the noon crowd; the first and last hour are best for shooting." },
        { q: "Are there restrictions on equipment?", a: "Personal photography is allowed; commercial use, tripods, and selfie sticks require advance permission. Flash is forbidden to protect the animals. A telephoto (70–300mm or longer) is essential. Glass-tank reflections are common — bring a lens hood or wear dark clothes. Bring rain covers for snow shooting." },
        { q: "Best photo spots inside?", a: "①Penguin Hall underwater tunnel (penguins «fly» overhead) ②Polar Bear Hall's seal-eye dome (bears swim above you) ③Orangutan enclosure's 17 m aerial rope ④Mogu-mogu (feeding) time — animals are most active during keeper talks. The winter-only penguin walk is essential." },
      ],
    },
    faqs: [
      { q: d("ペンギンの散歩は？","Penguin walk schedule?","企鹅散步何时？","企鵝散步何時？","펭귄 산책은?"),
        a: d("12月中旬〜3月、雪が積もる冬季限定で1日2回開催。キングペンギンの一列歩きは冬の風物詩。","Held twice daily in mid-December through March — winter only, when snow is on the ground. The king penguin parade is a winter staple.","12月中旬至3月雪季限定，每天2次。帝企鹅列队是冬季风物。","12月中旬至3月雪季限定，每天2次。帝企鵝列隊是冬季風物。","12월 중순~3월 눈이 쌓인 겨울 한정으로 하루 2회. 킹펭귄의 열 지어 걷기는 겨울의 풍물시.") },
    ],
  },
  "美幌峠": {
    desc: d(
      "美幌峠は標高525m、屈斜路湖を一望する国道243号の峠。カルデラ湖の壮大なパノラマは北海道でも屈指の絶景ポイント。雲海、朝霧、夕焼けと四季折々表情を変える。",
      "Bihoro Pass, at 525 m on Route 243, overlooks Lake Kussharo. The grand caldera panorama is among Hokkaido's finest vistas. Sea-of-clouds mornings, mist, and sunset give it many seasonal faces.",
      "美幌峠海拔525米，位于国道243号，俯瞰屈斜路湖。火山口湖的壮丽全景是北海道绝景之一。云海、晨雾、夕阳四季变化。",
      "美幌峠海拔525米，位於國道243號，俯瞰屈斜路湖。火山口湖的壯麗全景是北海道絕景之一。雲海、晨霧、夕陽四季變化。",
      "비호로 고개는 해발 525m, 굿샤로 호수를 한눈에 담는 국도 243호의 고개. 칼데라호의 웅장한 파노라마는 홋카이도 최고 수준의 절경. 운해, 아침 안개, 노을이 사계절 표정을 바꿉니다."
    ),
    definition: lh(
      "美幌峠(びほろとうげ)は北海道美幌町と弟子屈町の境界、国道243号線上に位置する標高525mの峠で、阿寒摩周国立公園の中核展望地。眼下にカルデラ湖の屈斜路湖(全周57km、北海道最大の湖、日本最大のカルデラ湖)、その向こうに摩周岳(857m)・斜里岳(1,547m)、晴天時には知床連山まで望める北海道屈指の絶景パノラマスポット。9〜11月の早朝、晴天で気温差が大きく無風の日には、屈斜路湖から立ち上る雲海が峠下まで広がり、その上に頭を出す摩周岳の姿は「天空の楽園」と称される幻想的な光景です。展望台はバリアフリー、道の駅ぐるっとパノラマ美幌峠も併設。",
      "Bihoro Pass, on Route 243 at the boundary between Bihoro and Teshikaga in Hokkaido, sits at 525 m elevation as the central viewpoint of Akan-Mashu National Park. Below lies the caldera lake Kussharo (57 km in circumference, Hokkaido's largest lake and Japan's largest caldera lake), with Mt. Mashu (857 m) and Mt. Shari (1,547 m) beyond, and on clear days even the Shiretoko Range — making this one of Hokkaido's most spectacular panoramic spots. From September to November on clear, windless mornings with a big temperature differential, a sea of clouds rises from Lake Kussharo and spreads beneath the pass, with Mt. Mashu's peak emerging above — a phenomenon often called «paradise in the sky.» The barrier-free observatory adjoins Michi-no-Eki «Gurutto Panorama Bihoro-toge.»"
    ),
    highlights: {
      ja: [
        "屈斜路湖の俯瞰 — 全周57km・日本最大のカルデラ湖、520段階段の上にある展望台",
        "雲海(9〜11月) — 早朝、晴天・気温差・無風の3条件で出現、摩周岳が雲海の上に浮かぶ",
        "夕焼けの摩周岳 — 西陽が摩周岳を黄金色に染める、屈斜路湖との対比が絶景",
        "アトサヌプリ(硫黄山) — 噴煙立ち上る活火山、屈斜路湖の対岸の火山地形",
        "道の駅ぐるっとパノラマ美幌峠 — レストラン・売店・無料展望デッキ、銘菓「あげいも」",
      ],
      en: [
        "Bird's-eye view of Lake Kussharo — Japan's largest caldera lake (57 km circumference), seen from the observatory atop a 520-step climb",
        "Sea of Clouds (September–November) — appears on clear, windless mornings with a big temperature gap; Mt. Mashu floats above the clouds",
        "Mt. Mashu at sunset — the western sun gilds the peak, contrasting with Lake Kussharo for a stunning composition",
        "Mt. Atosanupuri (Mt. Iou) — an active volcano emitting plumes, on the opposite shore of Lake Kussharo",
        "Michi-no-Eki Gurutto Panorama Bihoro-toge — restaurant, shop, and free observation deck; famous «Age-imo» fried potato dumplings",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "美幌峠とは?", a: "北海道阿寒摩周国立公園の中核展望地で、標高525mの峠。眼下に日本最大のカルデラ湖・屈斜路湖、その向こうに摩周岳・斜里岳・知床連山まで望める北海道屈指の絶景パノラマスポットです。" },
        { q: "雲海はいつ見られる?", a: "9〜11月の朝、晴天で無風、気温差が大きい日。日の出前から30分程度が最盛。摩周湖は霧の確率が高いが美幌峠は雲海の確率が高い、相互補完的な撮影地です。" },
        { q: "アクセスは?", a: "女満別空港から車で1時間、JR北見駅・網走駅から車で40分。冬季は雪道で凍結注意、レンタカーは4WD推奨。札幌からは車で5時間と遠いので、阿寒・知床と組合せた周遊が現実的。" },
        { q: "冬期は通れる?", a: "国道243号線は冬期も通行可能(除雪あり)だが、吹雪・ホワイトアウト・凍結に注意。展望台駐車場は除雪されるが滑りやすい。冬の屈斜路湖は結氷+「御神渡り」が見られる年もあり、雪の上に立つ撮影者の足跡だけの構図が映える。" },
        { q: "あげいもとは?", a: "道の駅ぐるっとパノラマ美幌峠の名物。北海道産じゃがいもを丸ごと衣に包んで揚げた串だんご(3個・350円)。50年以上の歴史で年間50万本売れる。バターとシナモンソースが付き、撮影前後のエネルギー補給に最適。寒さで冷えた体に染みる。" },
        { q: "夜の星空撮影は?", a: "周辺に光害がほぼなく、晴天の新月期は天の川が肉眼でくっきり。屈斜路湖を前景に星空のリフレクションを撮れば珍しい構図が得られる。冬は気温-15℃以下の極寒ながら空気が澄み天体撮影には最適、防寒装備とカメラの結露対策を徹底。" },
      ],
      en: [
        { q: "What is Bihoro Pass?", a: "The central viewpoint of Akan-Mashu National Park in Hokkaido, a 525 m pass overlooking Japan's largest caldera lake — Kussharo — with Mt. Mashu, Mt. Shari, and even the Shiretoko Range visible beyond. One of Hokkaido's most spectacular panoramic spots." },
        { q: "When do sea-of-clouds occur?", a: "Mornings in September–November on clear, windless days with big temperature gaps. Peak roughly 30 min around sunrise. Lake Mashu has a higher chance of mist, while Bihoro Pass favors sea of clouds — they complement each other for photographers." },
        { q: "Access?", a: "About 1 hour by car from Memanbetsu Airport; 40 minutes by car from JR Kitami or Abashiri Stations. Watch for icy roads in winter; a 4WD rental is recommended. From Sapporo it's 5 hours by car — practical only as part of an Akan/Shiretoko loop." },
        { q: "Is the pass open in winter?", a: "Route 243 is plowed and stays open year-round, but watch for blizzards, whiteouts, and ice. The observatory parking is plowed but slippery. The frozen Lake Kussharo with «omi-watari» ice ridges (some years) makes for unique compositions where only your footprints break the snow." },
        { q: "What is «age-imo»?", a: "The signature dish of Michi-no-Eki Gurutto Panorama Bihoro-toge. Whole Hokkaido potatoes wrapped in batter and deep-fried on a skewer (3 pieces, ¥350). Half a century of history, with 500,000 sticks sold per year. Served with butter and cinnamon sauce — perfect fuel before or after shooting in the cold." },
        { q: "Stargazing photography?", a: "Light pollution is nearly absent; on clear new-moon nights the Milky Way is visible to the naked eye. Compositions with starfield reflected on Lake Kussharo are rare and stunning. Winter offers air clarity (-15°C nights) ideal for astrophotography — bring full cold-weather gear and condensation prevention." },
      ],
    },
    faqs: [
      { q: d("雲海はいつ見られる？","When do sea-of-clouds occur?","云海何时出现？","雲海何時出現？","운해는 언제 볼 수 있나요?"),
        a: d("9〜11月の朝、晴天で無風、気温差が大きい日。日の出前から30分程度が最盛。","Mornings in Sept–Nov on clear, windless days with big temperature gaps. Peak roughly 30 min around sunrise.","9-11月晴朗无风、温差大的清晨。日出前后30分钟为高峰。","9-11月晴朗無風、溫差大的清晨。日出前後30分鐘為高峰。","9-11월 맑고 바람 없이 기온차가 큰 아침. 일출 전후 30분이 절정.") },
    ],
  },
  "摩周湖": {
    desc: d(
      "摩周湖は世界屈指の透明度を誇るカルデラ湖。「霧の摩周湖」として知られ、湖面を霧が覆う光景は神秘的。晴天時のコバルトブルーは「摩周ブルー」と呼ばれ、展望台から俯瞰できる。",
      "Lake Mashu, with world-class water clarity, is a caldera lake famed as the 'Misty Mashu'. Mist blanketing the surface is otherworldly; on clear days, the cobalt blue ('Mashu Blue') viewed from lookouts is mesmerizing.",
      "摩周湖是世界级透明度的火山口湖，有「雾之摩周湖」之称。雾笼湖面的景象神秘。晴天钴蓝称「摩周蓝」，展望台俯瞰最佳。",
      "摩周湖是世界級透明度的火山口湖，有「霧之摩周湖」之稱。霧籠湖面的景象神秘。晴天鈷藍稱「摩周藍」，展望台俯瞰最佳。",
      "마슈호는 세계 최고 수준 투명도의 칼데라호. '안개의 마슈호'로 알려져 호수면을 덮는 안개가 신비롭습니다. 맑은 날 코발트블루는 '마슈 블루'라 불리며 전망대에서 부감할 수 있습니다."
    ),
    definition: lh(
      "摩周湖(ましゅうこ)は北海道川上郡弟子屈町の阿寒摩周国立公園内、約7,000年前の巨大噴火によって形成された二重カルデラ湖で、面積19.6km²・最大水深211m、湖周囲は20kmの双子のカルデラ湖。流出河川がない独立した湖で、流入する水が透明度を損なわないため、1931年の調査で透明度41.6mを記録、当時世界一(現在も世界第2位、ロシアのバイカル湖に次ぐ)。湖を取り囲む高さ200m級の急峻な外輪山(カムイヌプリ・摩周岳857m等)、その底に湛えられたコバルトブルーの湖面は「摩周ブルー」と称され、晴天時の青さは他の追随を許しません。霧が湖面を覆うことが多く「霧の摩周湖」の別名でも知られ、1965年布施明の歌で全国的に有名になりました。",
      "Lake Mashu lies within Akan-Mashu National Park in Teshikaga, Kawakami District, Hokkaido — a double caldera lake formed by a massive eruption about 7,000 years ago, with an area of 19.6 km², a maximum depth of 211 m, and a 20 km perimeter. With no outflowing river, the lake's transparency goes undisturbed; in a 1931 survey it recorded 41.6 m of clarity, then the world's deepest reading (still second only to Lake Baikal). The 200 m-high outer rim — Mt. Kamuinupuri, Mt. Mashu (857 m), and others — surrounds a cobalt-blue water known as «Mashu Blue» that, on clear days, no other lake can match. Often shrouded in mist, it is also called «Misty Mashu,» and became nationally famous in 1965 through the song by Akira Fuse."
    ),
    highlights: {
      ja: [
        "摩周湖第一展望台 — 標高670m、湖を見下ろす定番展望台、駐車場とレストハウス併設",
        "摩周湖第三展望台 — 標高800m、第一より高所、冬季閉鎖、屈斜路湖まで望める",
        "摩周ブルー — 晴天時のコバルトブルー、特に正午前後の太陽高度が高い時間帯",
        "霧の摩周湖 — 湖面が霧で覆われる神秘的光景、年間70%が霧、見えるのが約30%のレア度",
        "摩周岳(857m) — カルデラ外輪山、登山可能(往復4時間)、湖を見下ろす独特の角度",
      ],
      en: [
        "Mashu Daiichi Tenbodai (First Observatory) — at 670 m elevation, the standard overlook with parking and a rest house",
        "Mashu Daisan Tenbodai (Third Observatory) — at 800 m, higher than the first; closed in winter, but offers views all the way to Lake Kussharo",
        "Mashu Blue — the cobalt-blue water on clear days, especially around midday when the sun is highest",
        "«Misty Mashu» — the mystical sight of mist covering the surface, present about 70% of the year (with only 30% clear viewing)",
        "Mt. Mashu (857 m) — the outer caldera rim, climbable (4-hour round trip) for a unique angle looking down on the lake",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "摩周湖とは?", a: "北海道阿寒摩周国立公園の二重カルデラ湖で、面積19.6km²・最大水深211m。1931年に透明度41.6mで世界一を記録した湖で、晴天時の「摩周ブルー」と霧に覆われる「霧の摩周湖」が交互に現れる神秘的な撮影地です。" },
        { q: "見える確率は?", a: "年間の晴天率は約30%。特に夏は霧の日が多く、冬〜春が比較的晴れやすい。諦めずに第一・第三展望台と裏摩周展望台の3ヶ所を回ると見える確率が上がります。早朝より昼前後がベスト。" },
        { q: "アクセスは?", a: "女満別空港から車で1時間半、JR摩周駅から車で30分。冬季は第三展望台閉鎖、第一展望台のみ。標高800mの第三展望台は屈斜路湖も望める絶景、夏季限定の特別な体験です。" },
        { q: "3つの展望台の違いは?", a: "第一展望台(海抜670m、駐車場500円、レストハウス・売店あり、通年開放)、第三展望台(海抜800m、無料駐車場、屈斜路湖も望める絶景、冬期閉鎖)、裏摩周展望台(海抜585m、北側からの眺め、霧の発生確率が低い)。3ヶ所巡って摩周湖を捉えるのが定石。" },
        { q: "湖畔に降りられる?", a: "湖畔へのアクセスは厳しく制限。摩周湖は周囲全域が「特別保護地区」で原則立入禁止、湖面に降りる正規ルートは存在しない。アイヌ民族は神聖な湖として古来神事の場とした歴史背景もあり、展望台からの撮影が唯一の方法です。" },
        { q: "周辺の温泉は?", a: "川湯温泉(車で15分、強酸性硫黄泉、湯気の立つ温泉街)、屈斜路湖畔の和琴・砂湯(湖底から温泉湧出、誰でも入れる無料露天)、摩周湖温泉(湖近くで唯一の温泉)。冬季は雪見露天が幻想的、湯気と雪のコントラストが映える。" },
      ],
      en: [
        { q: "What is Lake Mashu?", a: "A double caldera lake in Akan-Mashu National Park, Hokkaido — 19.6 km² with a maximum depth of 211 m. In 1931 it recorded a transparency of 41.6 m, then the world's deepest. The alternating «Mashu Blue» on clear days and the «Misty Mashu» when shrouded in fog make it a mystical photographic destination." },
        { q: "What are the odds of seeing the lake?", a: "Annual clear-view rate ~30%. Summer is especially misty; winter and spring offer better clarity. Visit all three observatories (Daiichi, Daisan, and Ura-Mashu) to increase your chances. Late morning to midday is best, more so than dawn." },
        { q: "Access?", a: "About 1.5 hours by car from Memanbetsu Airport, 30 minutes by car from JR Mashu Station. The Third Observatory closes in winter — only the First is open then. The Third (800 m) commands views of Lake Kussharo too, a special summer experience." },
        { q: "Difference between the three observatories?", a: "First (670 m, ¥500 parking, with rest house and shop, open year-round); Third (800 m, free parking, panoramic view including Lake Kussharo, closed in winter); Ura-Mashu (585 m, north-side view, lower fog probability). The standard practice is to visit all three." },
        { q: "Can I walk down to the lakeshore?", a: "Access is strictly restricted. The entire perimeter is a Special Protection Zone — no legitimate route to the water exists. As a sacred lake to the Ainu people, used for ancient rituals, only views from the observatories are possible." },
        { q: "Onsen nearby?", a: "Kawayu Onsen (15 min by car, strong acid sulfur, steam-rising town), Wakoto and Sunayu on Lake Kussharo (free wild baths welling up from the lakebed, anyone can enter), and Mashuko Onsen (the only onsen near the lake). In winter, snow-bath views are dreamlike, with steam and snow in stunning contrast." },
      ],
    },
    faqs: [
      { q: d("見える確率は？","What are the odds of seeing the lake?","能看到湖面的概率？","能看到湖面的概率？","호수면을 볼 확률은?"),
        a: d("年間の晴天率は約30%。特に夏は霧の日が多く、冬〜春が比較的晴れやすい。諦めずに複数展望台を回る。","Annual clear-view rate ~30%. Summer is especially misty; winter and spring offer better clarity. Visit multiple observatories to increase chances.","年晴率约30%。夏季多雾，冬春较清。多处展望台轮换尝试。","年晴率約30%。夏季多霧，冬春較清。多處展望台輪換嘗試。","연간 맑은 날 확률 약 30%. 특히 여름은 안개 많고, 겨울~봄이 비교적 맑음. 여러 전망대를 돌며 시도.") },
    ],
  },
  "阿寒": {
    desc: d(
      "阿寒湖はマリモ（特別天然記念物）の生息地として知られるカルデラ湖。湖畔の阿寒湖温泉、アイヌコタンでの伝統文化、夏のまりも祭り、冬の結氷と天体観測など、四季を通じた撮影地。",
      "Lake Akan, a caldera lake, is famed as the habitat of marimo (a Special Natural Monument). The Akanko Onsen town, Ainu Kotan cultural village, summer Marimo Festival, and winter ice-over / stargazing make it a year-round photo destination.",
      "阿寒湖是火山口湖，以毬藻（特别天然纪念物）栖息地著名。湖畔阿寒湖温泉、阿伊努村传统文化、夏季毬藻祭、冬季湖面结冰与观星等四季可拍。",
      "阿寒湖是火山口湖，以毬藻（特別天然紀念物）棲息地著名。湖畔阿寒湖溫泉、阿伊努村傳統文化、夏季毬藻祭、冬季湖面結冰與觀星等四季可拍。",
      "아칸호는 마리모(특별천연기념물) 서식지로 알려진 칼데라호. 호반의 아칸코 온천, 아이누 코탄에서의 전통 문화, 여름 마리모 축제, 겨울 결빙과 천체 관측 등 사계절을 통한 촬영지."
    ),
    definition: lh(
      "阿寒湖(あかんこ)は北海道釧路市阿寒町の阿寒摩周国立公園内、雄阿寒岳(1,371m)と雌阿寒岳(1,499m)の間にある面積13.3km²・最大水深45mのカルデラ湖。湖底に生息する球状の藻「マリモ(毬藻)」は阿寒湖でしか天然に見られない世界で唯一の生態系で、1921年に天然記念物、1952年に特別天然記念物に指定された日本独自の貴重な種。湖畔の阿寒湖温泉街は北海道最大級のアイヌコタン(集落)を擁し、アイヌ古式舞踊(国指定重要無形民俗文化財)や木彫り工芸が継承されています。冬期はワカサギ釣り、湖面結氷、夜の星空観察、夏期はマリモ祭り(10月)と、四季を通じて自然と文化の撮影地です。",
      "Lake Akan, in Akan-cho, Kushiro City, Hokkaido, lies within Akan-Mashu National Park between Mt. Oakan (1,371 m) and Mt. Meakan (1,499 m) — a caldera lake of 13.3 km² with a maximum depth of 45 m. The spherical algae «marimo» found at its bottom occur naturally nowhere else in the world; designated a Natural Monument in 1921 and a Special Natural Monument in 1952, marimo are uniquely Japanese. The lakeside Akanko Onsen hosts one of Hokkaido's largest Ainu Kotan (settlements), where Ainu Old-Style Dance (a designated Important Intangible Folk Cultural Property) and wood carving are still practiced. Winter brings smelt fishing, an ice-covered lake, and stargazing, while summer offers the October Marimo Festival — the lake is a year-round destination for nature and culture photography."
    ),
    highlights: {
      ja: [
        "マリモ展示観察センター(チュウルイ島) — 遊覧船で渡る、特別天然記念物の球状の藻を間近で観察",
        "アイヌコタン — 北海道最大級のアイヌ集落、古式舞踊鑑賞、木彫り工芸店、伝統文化の継承",
        "阿寒湖畔遊歩道 — ボッケ(泥火山)を巡る湖畔散策、湖面と火山地形の対比",
        "冬の阿寒湖氷上フェスティバル — 1〜3月、ワカサギ釣り、雪上スポーツ、花火、満天の星空",
        "マリモ祭り(10月) — アイヌの儀式とともにマリモを湖に返す伝統行事、神秘的な被写体",
      ],
      en: [
        "Marimo Exhibition Observation Center (Churui Island) — reached by sightseeing boat; close-up views of the Special Natural Monument spherical algae",
        "Ainu Kotan — one of Hokkaido's largest Ainu settlements, with Old-Style Dance performances, wood carving shops, and living tradition",
        "Lakeside Promenade — a walking path past «Bokke» mud volcanoes, contrasting the lake surface with volcanic terrain",
        "Winter Ice Festival (January–March) — smelt fishing, snow sports, fireworks, and skies full of stars",
        "Marimo Festival (October) — an Ainu ritual returning marimo to the lake, a mystical subject for photography",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "阿寒湖とは?", a: "北海道釧路市の阿寒摩周国立公園内のカルデラ湖で、世界で唯一マリモが天然に生息する湖。北海道最大級のアイヌコタンも擁し、自然と文化の双方が撮影できる稀有な撮影地です。" },
        { q: "マリモは見られる?", a: "阿寒湖畔のマリモ展示観察センター(チュウルイ島)で観察可能。遊覧船で渡る必要あり、所要時間は約1時間20分(船+島内見学)、運航期間は4〜11月。冬は湖面が結氷するため運休です。" },
        { q: "ベストシーズンは?", a: "新緑の5〜6月、紅葉の10月(マリモ祭り)、冬の氷上フェスティバル(1〜3月)が三大シーズン。冬は満天の星空と凍結湖面が幻想的、夜のオーロラ観測会も時々開催されます。" },
        { q: "アイヌコタンの撮影マナーは?", a: "アイヌの方々の生活空間でもあるため、家屋・人物の無断撮影は厳禁。古式舞踊「カムイユーカラ」(夜公演、入場料1,200円)は会場内撮影OK(フラッシュ・三脚は禁止が多い)。木彫り工芸店の作品撮影は店主に確認を。アイヌ料理(オハウ・ルイベ)も独特の被写体。" },
        { q: "アクセスと宿泊は?", a: "釧路空港から車で1時間、釧路駅からバス(あかんバス)2時間・2,750円、札幌から特急+バス約4時間。阿寒湖温泉街には鶴雅・あかん遊久の里など30軒の温泉宿、1泊2食付15,000円〜。スノーモービル・ワカサギ釣り体験は宿のパッケージプラン利用が便利。" },
        { q: "氷上フェスティバルとは?", a: "1月下旬〜3月中旬、結氷した阿寒湖で開催される冬のイベント。ワカサギ釣り(竿付き貸出1,000円)、バナナボート、スノーモービル、20:30〜の花火大会(週末・ハイシーズン)が目玉。氷上花火は北海道でも珍しく、湖面に映る花火と星空の三重奏は唯一無二の構図です。" },
      ],
      en: [
        { q: "What is Lake Akan?", a: "A caldera lake in Akan-Mashu National Park, Kushiro City, Hokkaido — the only lake in the world where marimo (spherical algae, a Special Natural Monument) occur naturally. Hosting one of Hokkaido's largest Ainu Kotan settlements, it offers both nature and living culture for photographers." },
        { q: "Can I see marimo?", a: "At the Marimo Exhibition Observation Center on Churui Island — reached by sightseeing boat. Total time is about 1 hour 20 minutes (boat + island tour); operating from April to November. Boats halt in winter when the lake freezes over." },
        { q: "Best seasons?", a: "Three peak seasons: fresh greens of May–June, October foliage (with the Marimo Festival), and the Winter Ice Festival (January–March). Winter combines a star-filled sky with a frozen surface in dream-like compositions; aurora viewing events are occasionally held at night." },
        { q: "Photography etiquette in Ainu Kotan?", a: "It is a living Ainu community — never photograph homes or people without permission. The Old-Style «Kamuy Yukar» dance (evening, ¥1,200 admission) allows photography inside the venue (no flash or tripods in most cases). Ask the artisan before shooting wood-carving works. Ainu cuisine (ohau soup, ruibe frozen fish) makes distinctive subjects." },
        { q: "Access and lodging?", a: "1 hour by car from Kushiro Airport, 2 hours by Akan Bus from Kushiro Station (¥2,750), or about 4 hours from Sapporo by limited express plus bus. Akanko Onsen has ~30 ryokan including Tsuruga and Akan Yuku-no-Sato (from ¥15,000/night with two meals). Snowmobile and ice-fishing tours are easiest as ryokan package plans." },
        { q: "What is the Ice Festival?", a: "Late January to mid-March, on the frozen Lake Akan. Smelt fishing (rod rental ¥1,000), banana boats, snowmobiles, and 20:30 fireworks (weekends and high season) are highlights. Fireworks-on-ice are rare even for Hokkaido — the trio of fireworks reflected on the lake plus the star-filled sky creates a unique composition." },
      ],
    },
    faqs: [
      { q: d("マリモは見られる？","Can I see marimo?","能看到毬藻吗？","能看到毬藻嗎？","마리모를 볼 수 있나요?"),
        a: d("阿寒湖畔のマリモ展示観察センター（チュウルイ島）で観察可能。遊覧船で渡る必要あり。","At the Marimo Exhibition Observation Center on Churui Island — accessible by sightseeing boat.","阿寒湖畔的毬藻展示观察中心（中鲽岛）可观察，需乘游船前往。","阿寒湖畔的毬藻展示觀察中心（中鰈島）可觀察，需乘遊船前往。","아칸 호반의 마리모 전시 관찰 센터(추루이섬)에서 관찰 가능. 유람선으로 이동 필요.") },
    ],
  },
  "三段滝公園": {
    desc: d(
      "三段滝公園は芦別市の渓流沿いに位置し、幅15mに広がる三段の滝が見どころ。新緑の5〜6月、紅葉の10月、氷瀑になる冬と、四季で全く異なる表情を見せる。駐車場から滝まで徒歩3分の手軽さも魅力。",
      "Sandan Falls Park in Ashibetsu features a 15 m-wide three-tiered waterfall along a mountain stream. Fresh greens in May–June, October foliage, and winter ice give it four distinct faces. Just a 3-min walk from the parking lot.",
      "三段瀑公园位于芦别市溪流畔，15米宽的三段瀑布为亮点。5-6月新绿、10月红叶、冬季冰瀑四季表情各异。停车场步行3分钟即可抵达。",
      "三段瀑公園位於蘆別市溪流畔，15米寬的三段瀑布為亮點。5-6月新綠、10月紅葉、冬季冰瀑四季表情各異。停車場步行3分鐘即可抵達。",
      "산단 폭포 공원은 아시베쓰시의 계류 옆에 위치, 폭 15m에 펼쳐진 3단 폭포가 볼거리. 5~6월 신록, 10월 단풍, 겨울 빙폭 등 사계절 완전히 다른 표정. 주차장에서 폭포까지 도보 3분으로 편리합니다."
    ),
    definition: lh(
      "三段滝公園(さんだんたきこうえん)は北海道芦別市西芦別の芦別川支流・三段ノ沢沿いに整備された自然公園で、3段に流れ落ちる幅約15m・落差合計約26mの三段滝が見どころ。1段目・2段目・3段目と段階的に流れ落ちる構造で、上部からの水流が中段で岩盤に当たり水しぶきを上げる迫力ある光景。新緑の5〜6月、紅葉の10月、結氷する1〜2月と四季ごとに完全に異なる表情を見せる撮影地で、駐車場から滝の正面まで徒歩3分という手軽さも魅力です。芦別市は1万人規模の小さな町だが、空知地方の隠れた自然撮影地として写真愛好家に支持されています。",
      "Sandan Falls Park is a natural park in Nishi-Ashibetsu, Ashibetsu City, Hokkaido, set along the Sandan-no-Sawa tributary of the Ashibetsu River. Its highlight is a three-tiered waterfall about 15 m wide with a total drop of about 26 m, falling in three stages. Water from the upper tier strikes bedrock at the middle level, throwing up dramatic spray. Fresh greens in May–June, foliage in October, and freezing in January–February give the falls four entirely different faces, and the 3-minute walk from the parking lot makes it remarkably accessible. Although Ashibetsu is a small city of about 10,000, the falls have become a cherished hidden photography destination in the Sorachi region."
    ),
    highlights: {
      ja: [
        "三段の滝(幅15m・落差26m) — 3段に流れ落ちる構造、中段で水しぶきを上げる迫力ある光景",
        "新緑(5〜6月) — 周囲のミズナラ・カエデの緑と滝の白が爽やかなコントラスト",
        "紅葉(10月中旬〜下旬) — 黄・赤・橙の三色紅葉と滝、北海道屈指の隠れた紅葉名所",
        "結氷の冬(1〜2月) — 完全結氷すると青白い氷の彫刻のような幻想的な姿、要冬装備",
        "駐車場から徒歩3分 — 手軽にアクセス、滝の正面まで観瀑橋で渡れる",
      ],
      en: [
        "The Three-Tiered Falls (15 m wide, 26 m drop) — three stages of cascade, with dramatic spray rising as water strikes the middle bedrock",
        "Fresh greens (May–June) — the surrounding oaks and maples make a refreshing contrast with the white falls",
        "Autumn (mid-to-late October) — yellow, red, and orange tri-color foliage with the falls, a hidden gem among Hokkaido's autumn destinations",
        "Frozen winter (January–February) — fully frozen, the falls become a bluish-white ice sculpture; winter gear required",
        "Three minutes' walk from the parking lot — exceptionally accessible, with a viewing bridge crossing to the front of the falls",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "三段滝公園とは?", a: "北海道芦別市の三段ノ沢沿いの自然公園で、幅15m・落差26mの3段滝が見どころ。新緑・紅葉・結氷と四季で全く異なる表情を見せる、空知地方の隠れた自然撮影地として写真愛好家に支持されています。" },
        { q: "冬の氷瀑はいつ見られる?", a: "1月中旬〜2月下旬、厳寒期のみ。完全結氷すると青白い氷の彫刻のような幻想的な姿になります。気温-15℃以下が連続する日が結氷の目安、要冬装備(防寒・滑り止め)、駐車場まで除雪あります。" },
        { q: "アクセスは?", a: "JR芦別駅から車で約20分、札幌から車で約2時間。駐車場(無料)から滝まで徒歩3分の遊歩道整備、観瀑橋から滝を正面に眺められます。冬季は道路凍結注意、4WD推奨。" },
        { q: "撮影機材のおすすめは?", a: "三脚必須(ND8〜64で長秒露光、滝のシルキーな表現)。広角(16-35mm)で滝全体、中望遠(70-200mm)で水しぶきの細部。CPLフィルターで岩の反射抑制と紅葉の発色強調。雨後は岩・苔の彩度が上がるため最適、レインカバーも忘れずに。" },
        { q: "周辺の見どころは?", a: "芦別の隣町・赤平市の旧炭鉱施設(立坑櫓と巻揚機室、産業遺産)、芦別市営「星の降る里百年記念館」、夕張市の幸福の黄色いハンカチ想い出ひろば(高倉健映画)など、レトロな炭鉱街と組合せた撮影旅程が組める。三段滝→旧炭鉱→夕張は1日コース。" },
        { q: "近隣の宿泊施設は?", a: "公園周辺に宿泊施設は乏しく、芦別市内の「星の降る里 芦別ホテル五千尺」(温泉付・1泊8,000円〜)が定番。富良野まで車で約1時間で、富良野温泉と組合せて拠点にすると北海道中央部の周遊が便利。日帰り入浴は芦別温泉「スターライトホテル」(800円)が利用可。" },
      ],
      en: [
        { q: "What is Sandan Falls Park?", a: "A natural park along the Sandan-no-Sawa tributary in Ashibetsu City, Hokkaido, featuring a three-tiered waterfall 15 m wide with a 26 m drop. With four entirely different faces across the seasons, it has become a beloved hidden photography destination among enthusiasts in the Sorachi region." },
        { q: "When to see winter ice falls?", a: "Mid-January to late February only, during the deep freeze. Fully frozen, the falls become a bluish-white ice sculpture. Multiple consecutive days below -15 °C are the threshold; winter gear (warm clothing and crampons) is required. The parking lot is plowed." },
        { q: "Access?", a: "About 20 minutes by car from JR Ashibetsu Station, 2 hours by car from Sapporo. From the free parking lot, it's a 3-minute walk on a maintained path, with a viewing bridge facing the falls. In winter, watch for icy roads — 4WD is recommended." },
        { q: "Recommended camera gear?", a: "Tripod essential (ND 8–64 for long exposure, silken water effect). Wide angle (16–35mm) for the whole falls; medium tele (70–200mm) for spray details. CPL filter cuts rock reflection and boosts foliage color. Post-rain peaks rock and moss saturation — bring a rain cover too." },
        { q: "Nearby attractions?", a: "Akabira's former coal-mine facilities (mineshaft frame and winch hall, industrial heritage), Ashibetsu's «Hoshi-no-Furusato Centennial Hall,» and Yubari's «Yellow Handkerchief of Happiness Square» (Ken Takakura film) make for nostalgic mining-town pairings. Sandan Falls → former mines → Yubari fills a single day." },
        { q: "Nearby lodging?", a: "Lodging is sparse near the park itself. «Hoshi-no-Furusato Ashibetsu Hotel Gosenjaku» in town (with onsen, from ¥8,000/night) is the standard pick. Furano is 1 hour by car, making a base in Furano practical for touring central Hokkaido. Day-baths at Ashibetsu Onsen «Starlight Hotel» (¥800) are open to non-guests." },
      ],
    },
    faqs: [
      { q: d("冬の氷瀑はいつ見られる？","When to see winter ice falls?","冰瀑何时出现？","冰瀑何時出現？","겨울 빙폭은 언제?"),
        a: d("1月中旬〜2月下旬、厳寒期のみ。完全結氷すると青白い氷の彫刻のような幻想的な姿になる。","Mid-January to late February only, during the deep freeze. Fully frozen, it becomes a bluish-white ice sculpture.","1月中旬至2月下旬严寒期。完全结冰时如蓝白冰雕。","1月中旬至2月下旬嚴寒期。完全結冰時如藍白冰雕。","1월 중순~2월 하순 혹한기 한정. 완전 결빙되면 푸른빛 얼음 조각 같은 환상적 모습.") },
    ],
  },
  "室蘭": {
    desc: d(
      "室蘭市は北海道南部の工業港湾都市。夜景の「室蘭工場夜景」は日本夜景遺産に認定され、白鳥大橋、地球岬の絶景、測量山からの眺望など、海と工業のコントラストが撮影意欲を刺激する。",
      "Muroran, an industrial port in southern Hokkaido, offers the 'Muroran Factory Night View' — a Japan Night View Heritage site. The Hakucho Bridge, Cape Chikyu (Earth Cape), and views from Mt. Sokuryo contrast sea and industry in photogenic ways.",
      "室兰市是北海道南部工业港口城市。「室兰工厂夜景」被认定为日本夜景遗产。白鸟大桥、地球岬绝景、测量山眺望等，海与工业的对比激发创作欲。",
      "室蘭市是北海道南部工業港口城市。「室蘭工廠夜景」被認定為日本夜景遺產。白鳥大橋、地球岬絕景、測量山眺望等，海與工業的對比激發創作欲。",
      "무로란시는 홋카이도 남부의 공업 항만 도시. '무로란 공장 야경'은 일본 야경 유산으로 지정되었으며, 하쿠초 대교, 지큐미사키, 소쿠료산 조망 등 바다와 공업의 대비가 촬영 욕구를 자극합니다."
    ),
    definition: lh(
      "室蘭(むろらん)は北海道南西部、太平洋に突き出た絵鞆(えとも)半島に位置する人口約7.5万人の港湾工業都市。明治期に石炭積出港として発展、戦後は鉄鋼業(日本製鉄室蘭製鉄所、現存)を中心とする重工業都市として知られ、その夜景は「日本五大工場夜景」(室蘭・北九州・川崎・周南・四日市)の一つに2012年認定。地球岬(チキウみさき)の140mの断崖、白鳥大橋(全長1,380m、北海道一の吊橋、1998年完成)、測量山(標高200m)からの全景、絵鞆半島の入江と工場群が織りなす独特の景観で、海と工業のコントラストが写真家を魅了する道南屈指の撮影地です。",
      "Muroran is a port-and-industrial city of about 75,000 residents on the Etomo Peninsula jutting into the Pacific in southwestern Hokkaido. It grew during the Meiji era as a coal-export port, and remains known after the war as a heavy-industrial city centered on steel (Nippon Steel's Muroran Plant still operates). Its industrial nightscape was certified in 2012 as one of «Japan's Five Great Factory Nightscapes» (alongside Kitakyushu, Kawasaki, Shunan, and Yokkaichi). The 140 m cliffs of Cape Chikyu, the 1,380 m Hakucho Bridge (Hokkaido's longest suspension bridge, completed 1998), the panorama from Mt. Sokuryo (200 m), and the inlets and factory complexes of the Etomo Peninsula combine to make Muroran a leading southern Hokkaido subject for photographers fascinated by the contrast of sea and industry."
    ),
    highlights: {
      ja: [
        "工場夜景 — 日本五大工場夜景の一つ、祝津展望台・測量山展望台・白鳥大橋からの撮影が定番",
        "白鳥大橋 — 全長1,380mの北海道一の吊橋、夜のライトアップは7色に変化、絵鞆半島と本土を結ぶ",
        "地球岬(チキウみさき) — 140mの断崖、太平洋を望む新日本観光地100選1位の絶景",
        "測量山展望台(標高200m) — 室蘭の街と港、白鳥大橋、太平洋まで一望、夜景の名所",
        "イルカ・クジラウォッチング — 5〜10月の太平洋でミンククジラ・イルカ・シャチに遭遇",
      ],
      en: [
        "Industrial nightscape — one of Japan's Five Great Factory Nightscapes; the classic shoots are from Iwaizumi Observatory, Mt. Sokuryo, and Hakucho Bridge",
        "Hakucho Bridge — Hokkaido's longest suspension bridge at 1,380 m, with night illumination cycling through seven colors; links the Etomo Peninsula to the mainland",
        "Cape Chikyu — 140 m cliffs over the Pacific, ranked first among «Japan's New 100 Tourist Destinations»",
        "Mt. Sokuryo Observatory (200 m) — overlooks the Muroran cityscape, port, Hakucho Bridge, and the Pacific; an iconic night-view location",
        "Dolphin and Whale Watching — May to October, Minke whales, dolphins, and orcas appear in the Pacific waters",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "室蘭とは?", a: "北海道南西部の港湾工業都市で、人口約7.5万人。日本五大工場夜景の一つに認定された工場夜景、北海道一の吊橋・白鳥大橋、地球岬の140m断崖、測量山からの絶景パノラマで、海と工業のコントラストが写真家を魅了する撮影地です。" },
        { q: "工場夜景のベストポイントは?", a: "祝津展望台、測量山展望台、白鳥大橋の3ヶ所が定番。ブルーアワー(日没後30分)に白鳥大橋(7色ライト)と工場の煙突の光を同時に収める構図が王道。三脚必須、冬は防寒対策。" },
        { q: "アクセスは?", a: "新千歳空港から車で約1時間20分、JR東室蘭駅から各展望台まで車・バスで15〜30分。札幌からは特急で約1時間半。市内主要観光地は車での移動が便利、レンタカー推奨です。" },
        { q: "地球岬の撮影は?", a: "海抜140mの断崖から太平洋を望む絶景。「日本の灯台50選」のチキウ岬灯台と組合せた構図、特に晴天の日の海平線(200km先まで)、新月期の星空、冬期の流氷接近時(稀)が見どころ。駐車場から展望台まで徒歩5分、撮影は通年可能。" },
        { q: "工場夜景クルーズは?", a: "「室蘭工場夜景クルーズ」(海風号、4〜10月運航、4,500円・90分)が日没前から夜まで運航。海上から工場を見上げる構図は陸上展望台では撮れない迫力。要事前予約、悪天候時は中止。三脚は船上不可、高ISOカメラと明るいレンズで対応。" },
        { q: "撮影シーズンは?", a: "工場夜景は通年撮影可だが、空気が澄む冬(12〜2月)が最もシャープ。地球岬の海平線は5〜10月が穏やか、冬は荒波の迫力。秋(9〜11月)はイルカ・クジラウォッチング(クルーズ船あり、6,000円・3時間)が狙い目で、自然と工業の両方を1日で撮れる。" },
      ],
      en: [
        { q: "What is Muroran?", a: "A port-and-industrial city of about 75,000 residents in southwestern Hokkaido. Its industrial nightscape is among Japan's Five Great Factory Nightscapes; with Hokkaido's longest suspension bridge (Hakucho), the 140 m cliffs of Cape Chikyu, and the Mt. Sokuryo panorama, it draws photographers captivated by the sea-and-industry contrast." },
        { q: "Best factory night-view spot?", a: "Iwaizumi Observatory, Mt. Sokuryo Observatory, and Hakucho Bridge are the three classics. Capture Hakucho Bridge (cycling through seven colors) and the factory smokestacks during blue hour (30 min after sunset). Tripod essential; bundle up in winter." },
        { q: "Access?", a: "About 1 hour 20 minutes by car from New Chitose Airport, 15–30 minutes by car or bus from JR Higashi-Muroran Station to each viewing spot. From Sapporo, about 1.5 hours by limited express. A rental car is recommended for navigating the main viewpoints." },
        { q: "Photographing Cape Chikyu?", a: "From 140 m cliffs over the Pacific. The Chikyu Cape Lighthouse (one of Japan's Top 50 Lighthouses) framed with the horizon (visible 200 km out on clear days), starfields on new-moon nights, and winter drift-ice (rare) are the prime shots. From the parking lot, a 5-minute walk to the deck — shootable year-round." },
        { q: "What about the factory night cruise?", a: "The Muroran Factory Night Cruise (vessel «Kaifu-go,» April–October, ¥4,500 / 90 min) sails from sunset into the night. Looking up at factories from the water gives drama no shore observatory can match. Reservations required; cancelled in bad weather. No tripods on board — bring a high-ISO body and a fast lens." },
        { q: "When to shoot?", a: "Factory nightscapes work year-round, but clear-air winter (Dec–Feb) is sharpest. Cape Chikyu's horizon is calm May–October; winter brings dramatic surf. Autumn (Sept–Nov) offers dolphin and whale watching (cruises available, ¥6,000 / 3 hr) — nature and industry in one day." },
      ],
    },
    faqs: [
      { q: d("工場夜景のベストポイントは？","Best factory night-view spot?","工厂夜景最佳点？","工廠夜景最佳點？","공장 야경 최고 포인트는?"),
        a: d("祝津展望台、測量山展望台、白鳥大橋の3ヶ所が定番。ブルーアワーに白鳥大橋と工場の光を同時に収めるのが王道。","Iwaizumi Observatory, Mt. Sokuryo, and Hakucho Bridge are the three classics. Capture the bridge with factory lights during blue hour.","祝津展望台、测量山展望台、白鸟大桥三处经典。蓝时刻同时拍桥与工厂灯光。","祝津展望台、測量山展望台、白鳥大橋三處經典。藍時刻同時拍橋與工廠燈光。","이와이즈미 전망대, 소쿠료산 전망대, 하쿠초 대교 3곳이 정석. 블루아워에 다리와 공장 불빛을 함께 담는 것이 왕도.") },
    ],
  },
  "美唄": {
    desc: d(
      "美唄市は石狩平野の田園地帯。広大な田園、アルテピアッツァ美唄（彫刻家安田侃の野外美術館）、アンガス牧場のワイルドフラワー、雪景色のサイロなど、牧歌的な北海道らしい風景が広がる。",
      "Bibai, in the Ishikari Plain, features vast farmlands. Arte Piazza Bibai (an outdoor sculpture museum by Kan Yasuda), wildflowers at Angus Farm, and silos in snow represent Hokkaido's pastoral charm.",
      "美唄市位于石狩平原田园地带。辽阔田园、阿尔泰皮亚扎美唄（雕塑家安田侃户外美术馆）、安格斯牧场野花、雪中谷仓等，呈现北海道牧歌风光。",
      "美唄市位於石狩平原田園地帶。遼闊田園、阿爾泰皮亞扎美唄（雕塑家安田侃戶外美術館）、安格斯牧場野花、雪中穀倉等，呈現北海道牧歌風光。",
      "비바이시는 이시카리 평야의 전원 지대. 광활한 논밭, 알테피아차 비바이(조각가 야스다 칸의 야외 미술관), 앵거스 목장의 야생화, 설경의 사일로 등 목가적인 홋카이도다운 풍경이 펼쳐집니다."
    ),
    definition: lh(
      "美唄(びばい)は北海道空知総合振興局管内、石狩平野中央部に広がる人口約2万人の都市で、かつて炭鉱で栄えた歴史を持ち、現在は広大な田園地帯と独特のアート文化が共存。中心施設のアルテピアッツァ美唄(1992年開園)は世界的彫刻家・安田侃(やすだかん)が故郷美唄に開設した野外美術館で、廃校となった旧栄小学校の校舎を活用、白大理石の彫刻作品約40点が雪原や草原に点在する世界でも稀な空間。日本で唯一のラベンダー園以外の安田侃作品鑑賞地として、また石狩平野の田園・サイロ・牛・冬の雪景色など北海道らしい牧歌的な風景が楽しめる撮影地です。",
      "Bibai is a city of about 20,000 residents in the central Ishikari Plain, within the Sorachi General Subprefectural Bureau of Hokkaido. Once thriving on coal mining, today it pairs vast farmland with a distinctive art culture. Its centerpiece, Arte Piazza Bibai (opened 1992), is an outdoor sculpture park created by world-renowned Italian-Japanese sculptor Kan Yasuda in his hometown — repurposing the former Sakae Elementary School, with about 40 white-marble works scattered across grasslands and snow fields. As one of the few places to see Yasuda's work outside lavender gardens, and with the Ishikari Plain's farmland, silos, cattle, and winter snow making for archetypal Hokkaido pastoral scenery, Bibai is a beloved photographic destination."
    ),
    highlights: {
      ja: [
        "アルテピアッツァ美唄 — 1992年開園、安田侃の野外美術館、白大理石の彫刻約40点、入場無料",
        "旧栄小学校校舎 — 1981年閉校の木造校舎を活用、ノスタルジックな木造建築と現代彫刻の融合",
        "雪原と彫刻 — 1〜3月の雪景色、白大理石と白雪の組合せは異世界、星空観察も可能",
        "石狩平野の田園 — 広大な水田、サイロ、牛、北海道らしい牧歌的風景、夏の積乱雲が映える",
        "やきとり美唄 — 全国に知られる「美唄やきとり」発祥の地、約30軒の名店が市内に",
      ],
      en: [
        "Arte Piazza Bibai — opened 1992, Kan Yasuda's outdoor sculpture park with about 40 white-marble works, free admission",
        "Former Sakae Elementary School — a wooden 1981-shuttered school building repurposed, blending nostalgic architecture with contemporary sculpture",
        "Snow Field with Sculptures — January–March, when white marble meets white snow in an otherworldly composition, with stargazing possible",
        "Ishikari Plain farmland — vast paddies, silos, cattle, and archetypal Hokkaido pastoral scenes; summer thunderclouds enhance the frame",
        "Bibai Yakitori — birthplace of nationally known «Bibai Yakitori,» with about 30 famous shops across town",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "美唄とは?", a: "北海道空知地方、石狩平野中央部の人口約2万人の都市。かつて炭鉱で栄え、現在はアルテピアッツァ美唄(安田侃の野外美術館)と広大な田園地帯が共存する独特の街、北海道らしい牧歌的風景が楽しめる撮影地です。" },
        { q: "アルテピアッツァの魅力は?", a: "1992年開園の入場無料の野外彫刻美術館。世界的彫刻家・安田侃の白大理石作品約40点と、廃校となった旧木造校舎、雪景色の組合せが絵画的。冬の雪原と白大理石彫刻の構図は世界でもここだけの撮影地です。" },
        { q: "アクセスは?", a: "JR美唄駅から車で15分、または季節運行のシャトルバス。札幌から車で1時間。アルテピアッツァは年中開園、冬季は雪景色、夏は緑の草原と多様な表情。所要時間2〜3時間。" },
        { q: "撮影マナーは?", a: "アルテピアッツァは入場無料・撮影自由(個人利用)。三脚は混雑時は配慮を、自撮り棒・ドローンは禁止。彫刻に触れる、座る、登るのはNG。商用利用は事前申請。雪原に新雪のままの足跡を残したい場合は「ピアチェンツァ広場」周辺を1番手で狙う。" },
        { q: "ベストシーズンは?", a: "冬(1〜2月)の雪と白大理石彫刻の組合せが最も絵画的、晴天の青空が加わると神々しい。新緑の5〜6月、紅葉の10月も別の魅力。夏は緑の草原と彫刻、夕焼けの空と組合せられる。雨上がりの石の質感も独特、訪問の時間と季節の組合せで無限の構図。" },
        { q: "美唄やきとり店のおすすめは?", a: "「福よし」「三船」「美唄焼き鳥本店」が有名。美唄焼き鳥は1串に肉とモツが交互に刺さる独特スタイル(「動・植・動・植」)、たれは秘伝の塩。1人前1,000円〜、夜の店内雰囲気は撮影映え。アルテピアッツァ撮影後の夕食に組合せると満足度高い。" },
      ],
      en: [
        { q: "What is Bibai?", a: "A city of about 20,000 residents in central Hokkaido's Ishikari Plain, once a coal-mining hub. Today it combines Arte Piazza Bibai (Kan Yasuda's outdoor sculpture park) with vast pastoral farmland — a distinctive setting where Hokkaido's archetypal rural scenes can be photographed." },
        { q: "What's special about Arte Piazza?", a: "A free outdoor sculpture museum opened in 1992 with about 40 white-marble works by world-renowned Kan Yasuda, paired with a former wooden schoolhouse. The contrast of white marble and white snow in winter is uniquely photogenic — found nowhere else in the world." },
        { q: "Access?", a: "15 minutes by car from JR Bibai Station, or by seasonal shuttle bus. About 1 hour by car from Sapporo. Arte Piazza is open year-round; winter brings snow scenes, summer green meadows. Allow 2–3 hours." },
        { q: "Photography etiquette?", a: "Arte Piazza is free, with personal photography allowed. Tripods OK with consideration during crowds — selfie sticks and drones forbidden. Don't touch, sit on, or climb the sculptures. Commercial use requires pre-approval. To capture pristine snow before footprints, head to «Piacenza Plaza» first thing in the morning." },
        { q: "Best season?", a: "Winter (Jan–Feb), when white marble meets white snow against blue sky, is the most painterly. May–June fresh greens and October foliage offer different appeals. Summer pairs sculpture with green meadows and sunset skies. Post-rain stone texture is also distinctive — endless compositions across times and seasons." },
        { q: "Best Bibai Yakitori shops?", a: "«Fukuyoshi,» «Mifune,» and «Bibai Yakitori Honten» are famed. Bibai-style alternates meat and offal on each skewer («animal-plant-animal-plant»), with a signature salt sauce. From ¥1,000/person; the evening shop atmosphere photographs beautifully. Pairs naturally with dinner after Arte Piazza shooting." },
      ],
    },
    faqs: [
      { q: d("アルテピアッツァの魅力は？","What's special about Arte Piazza?","阿尔泰皮亚扎魅力？","阿爾泰皮亞扎魅力？","알테피아차 매력은?"),
        a: d("廃校を活用した無料の野外彫刻美術館。白大理石の作品と木造校舎、雪景色の組み合わせが絵画的。","A free outdoor sculpture museum in a repurposed school. White marble works, the wooden schoolhouse, and snow together look painterly.","改建废校的免费户外雕塑美术馆。白大理石作品、木校舍、雪景如画。","改建廢校的免費戶外雕塑美術館。白大理石作品、木校舍、雪景如畫。","폐교를 활용한 무료 야외 조각 미술관. 백대리석 작품, 목조 교사, 설경의 조합이 회화적.") },
    ],
  },
  "登別": {
    desc: d(
      "登別温泉は9種類の泉質を持つ「温泉のデパート」。登別地獄谷は火山活動で生まれた遊歩道のある巨大火口。湯気立ち上る渓谷、奥の湯、大湯沼川の天然足湯など、ダイナミックな温泉風景。",
      "Noboribetsu Onsen is the 'department store of hot springs' with nine water types. Noboribetsu Jigokudani ('Hell Valley') is a massive volcanic crater with walking paths; the valley, Oku-no-yu, and the Oyunuma River natural footbath form dynamic onsen scenery.",
      "登别温泉拥有9种泉质，是「温泉百货店」。登别地狱谷是火山活动形成的大型火口，有步道。蒸汽升腾的峡谷、奥之汤、大汤沼川天然足汤等温泉景观震撼。",
      "登別溫泉擁有9種泉質，是「溫泉百貨店」。登別地獄谷是火山活動形成的大型火口，有步道。蒸汽升騰的峽谷、奧之湯、大湯沼川天然足湯等溫泉景觀震撼。",
      "노보리베쓰 온천은 9종 수질을 가진 '온천의 백화점'. 노보리베쓰 지고쿠다니는 화산 활동으로 생긴 산책로 있는 거대 화구. 수증기 피어오르는 계곡, 오쿠노유, 오유누마강 천연 족욕탕 등 다이내믹한 온천 풍경."
    ),
    definition: lh(
      "登別(のぼりべつ)は北海道胆振総合振興局管内の登別市にある日本屈指の温泉郷で、9種類の異なる泉質の源泉が湧き出ることから「温泉のデパート」と称される温泉地。湯量は1日約10,000トン(東京ドーム約1.5杯分)、自然湧出量は世界トップクラス。中心となる登別地獄谷(じごくだに)は約1万年前の倶多楽火山の噴火で形成された直径約450m・面積11ヘクタールの火口跡で、現在も水蒸気・火山ガス・温泉水が噴出する活火山地帯。鉄分を含む湯が川となって流れる大湯沼川天然足湯、奥の湯(7,000m²の硫黄泉湖)、湯気立ち上る渓谷の遊歩道、夜の鬼花火(7〜8月)など、ダイナミックな温泉風景が楽しめます。",
      "Noboribetsu, in Noboribetsu City within the Iburi General Subprefectural Bureau of Hokkaido, is one of Japan's premier hot spring towns — earning the nickname «department store of hot springs» because of its nine distinct water types. Producing about 10,000 tonnes of hot spring water daily (roughly 1.5 Tokyo Domes), its natural outflow ranks among the world's largest. The main landmark, Noboribetsu Jigokudani («Hell Valley»), is a roughly 450 m-wide, 11-hectare crater formed by the eruption of Mt. Kuttara about 10,000 years ago — an active volcanic zone where steam, volcanic gas, and hot spring water continue to vent. With the natural footbath of Oyunuma River (where iron-rich water flows like a stream), Oku-no-Yu (a 7,000 m² sulfur-spring lake), walking paths through steaming valleys, and the «Oni Hanabi» fireworks of July–August, it offers dynamic onsen photography."
    ),
    highlights: {
      ja: [
        "登別地獄谷 — 直径450m・11ヘクタールの火口跡、湯気立ち上る渓谷、遊歩道で巡れる",
        "大湯沼(おおゆぬま) — 周囲1km・面積7,000m²の硫黄泉湖、表面温度40〜50℃、青白く神秘的",
        "大湯沼川天然足湯 — 大湯沼から流れる温泉川、無料で足湯、森の中の天然温泉体験",
        "奥の湯 — 大湯沼隣接の灰黒色の湖、地獄谷の奥に広がる別世界の景観",
        "夜間ライトアップ・鬼花火(7〜8月) — 地獄谷の遊歩道がライトアップ、7〜8月は鬼の花火大会",
      ],
      en: [
        "Noboribetsu Jigokudani — a 450 m-wide, 11-hectare crater with steaming valleys and walking paths",
        "Oyunuma — a 1 km-perimeter, 7,000 m² sulfur-spring lake with surface temperatures of 40–50 °C, mystical pale-blue waters",
        "Oyunuma River Natural Footbath — a hot spring stream flowing from Oyunuma, free to enjoy as a forest footbath",
        "Oku-no-Yu — adjacent to Oyunuma, an ash-gray pond extending the Jigokudani's otherworldly landscape",
        "Evening Illumination and Oni Hanabi (July–August) — the Jigokudani path is illuminated at night, with the «demon fireworks» festival in summer",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "登別とは?", a: "北海道胆振地方の温泉郷で、9種類の異なる泉質を持つ「温泉のデパート」。1日約10,000トンの湯量は世界トップクラス、登別地獄谷の火口跡、大湯沼、大湯沼川天然足湯など火山地形と温泉が織りなすダイナミックな撮影地です。" },
        { q: "地獄谷の撮影時間帯は?", a: "朝〜午前中が光が柔らかく湯気も映える。夜間ライトアップ(5〜10月)も幻想的、特に冬の朝の湯気が最も濃厚で寒暖差が立ち上る蒸気を強調します。三脚で長秒露光すると湯気の流れが見えます。" },
        { q: "アクセスは?", a: "新千歳空港から車で約1時間、JR登別駅からバスで15分。札幌から車で1時間半、特急バス・JRも便利。地獄谷から大湯沼までは徒歩30分の遊歩道、奥の湯まで含めて2〜3時間の散策コース。" },
        { q: "9種類の泉質とは?", a: "硫黄泉(白濁、肌に良い)、食塩泉(保温)、芒硝泉(切り傷に効く)、明礬泉(美肌)、緑礬泉(造血)、ラジウム泉(婦人病)、鉄泉(貧血)、酸性泉(殺菌)、重曹泉(美肌)の9種が登別温泉郷で楽しめる世界的に稀な特徴。各旅館で泉質が違うため複数の宿で湯巡りが楽しい。" },
        { q: "おすすめの宿は?", a: "「第一滝本館」(1858年創業の登別老舗、35の浴槽)、「登別グランドホテル」(地獄谷至近、和洋折衷)、「滝乃家」(高級和風、料理評価高)、「登別万世閣」(コスパ良し)など。1泊2食付15,000〜35,000円。日帰り入浴1,500〜2,000円も可能、3〜4軒巡る湯めぐりが定番。" },
        { q: "周辺の観光は?", a: "①登別地獄谷+大湯沼遊歩道(徒歩2時間)②倶多楽湖(摩周湖に並ぶ透明度・カルデラ湖、車15分)③のぼりべつクマ牧場(ヒグマ約100頭、ロープウェイ)④登別マリンパークニクス(水族館、デンマーク城のレトロ建築)。1泊2日で温泉撮影と観光が両立。" },
      ],
      en: [
        { q: "What is Noboribetsu?", a: "A hot spring town in the Iburi region of Hokkaido — the «department store of hot springs» with nine different water types. With about 10,000 tonnes of daily output (one of the world's largest natural flows), the Jigokudani crater, Oyunuma, and the Oyunuma River footbath form a dynamic photographic landscape of volcanic terrain and onsen." },
        { q: "Best time to shoot Jigokudani?", a: "Morning is best for soft light and visible steam. Evening illumination (May–October) is atmospheric. Winter mornings produce the densest steam due to the temperature gap; long exposures with a tripod reveal the flow of vapor." },
        { q: "Access?", a: "About 1 hour by car from New Chitose Airport, 15 minutes by bus from JR Noboribetsu Station. From Sapporo, about 1.5 hours by car or by limited-express bus/JR. From Jigokudani, walk 30 minutes to Oyunuma; include Oku-no-Yu for a 2–3 hour stroll." },
        { q: "What are the nine water types?", a: "Sulfur (cloudy white, skin), saline (warming), Glauber's (cuts), alum (skin beauty), iron sulfate (blood-forming), radium (women's health), iron (anemia), acidic (sterilizing), and bicarbonate (skin beauty). It is rare worldwide to have all nine in one resort. Each ryokan features different waters — visit several." },
        { q: "Recommended ryokan?", a: "Dai-ichi Takimotokan (founded 1858, the historic landmark with 35 baths), Noboribetsu Grand Hotel (near Jigokudani, Japanese-Western fusion), Takinoya (luxury Japanese, top cuisine), Noboribetsu Manseikaku (good value). ¥15,000–35,000/night with two meals. Day-bath access ¥1,500–2,000 — visiting 3–4 ryokan as a «bath crawl» is the standard." },
        { q: "Nearby attractions?", a: "①Jigokudani + Oyunuma trail (2 hr walk) ②Lake Kuttara (caldera lake rivaling Mashu's clarity, 15 min by car) ③Noboribetsu Bear Park (~100 brown bears, ropeway access) ④Noboribetsu Marine Park Nixe (aquarium with retro Danish-castle architecture). A 2-day stay covers onsen photography and sightseeing." },
      ],
    },
    faqs: [
      { q: d("地獄谷の撮影時間帯は？","Best time to shoot Jigokudani?","地狱谷最佳拍摄时段？","地獄谷最佳拍攝時段？","지고쿠다니 최적 시간대는?"),
        a: d("朝〜午前中が光が柔らかく湯気も映える。夜間ライトアップ（5〜10月）も幻想的。","Morning for soft light and visible steam. The nighttime illumination (May–October) is atmospheric.","清晨至上午光柔，蒸汽明显。5-10月夜间灯光亦梦幻。","清晨至上午光柔，蒸汽明顯。5-10月夜間燈光亦夢幻。","아침~오전이 빛이 부드럽고 수증기도 돋보입니다. 5-10월 야간 조명도 환상적.") },
    ],
  },
  "北竜町": {
    desc: d(
      "北竜町は北海道空知郡、23万本のヒマワリ畑「ひまわりの里」が有名。7月下旬〜8月中旬の開花期は一面の黄金色が山裾まで広がり、日本最大級のヒマワリ畑として圧倒的な景観。",
      "Hokuryu Town, in Sorachi, Hokkaido, is famed for its 'Himawari no Sato' — 230,000 sunflowers. In late July to mid-August, the golden sea stretches to the foothills, one of Japan's largest sunflower fields.",
      "北龙町位于北海道空知郡，23万株向日葵田「向日葵之里」闻名。7月下旬至8月中旬花期时，金色海洋延展至山脚，日本最大级向日葵田。",
      "北龍町位於北海道空知郡，23萬株向日葵田「向日葵之里」聞名。7月下旬至8月中旬花期時，金色海洋延展至山腳，日本最大級向日葵田。",
      "호쿠류초는 홋카이도 소라치군, 23만 송이 해바라기 밭 '해바라기의 마을'로 유명. 7월 하순~8월 중순 개화기에는 온통 황금빛이 산기슭까지 펼쳐지는 일본 최대급 해바라기 밭으로 압도적 경관."
    ),
    definition: lh(
      "北竜町(ほくりゅうちょう)は北海道空知総合振興局管内、雨竜郡北竜町にある人口約1,700人の小さな町で、日本最大級のひまわり畑「ひまわりの里」(東京ドーム約5個分・約23ヘクタール)で知られます。1987年(昭和62年)、町おこしの一環としてヨーロッパ視察で見たひまわり畑から着想を得てスタート、現在は約23万本のひまわり(品種数12種類以上)が植えられ、毎年7月中旬〜8月下旬の「北竜町ひまわりまつり」期間中に100万人以上が訪れる北海道の夏の風物詩。一面の黄金色が山裾まで広がる景観は日本でも稀有で、満開期はひまわりの絨毯を上空から眺めるパラグライダー体験も人気です。",
      "Hokuryu Town, in the Sorachi General Subprefectural Bureau of Hokkaido (Uryu District), has a population of about 1,700 — and is known for «Himawari no Sato,» one of Japan's largest sunflower fields (about 23 hectares, equivalent to roughly five Tokyo Domes). Inspired by sunflower fields seen on a European study tour in 1987 (Showa 62) as a town-revitalization project, the field today contains about 230,000 sunflowers across more than 12 varieties. During the «Hokuryu Sunflower Festival» from mid-July to late August, over a million visitors arrive, making it Hokkaido's quintessential summer scene. The sea of gold extending to the foothills is rare even by Japanese standards, and during peak bloom paragliding tours offer aerial views of the flower carpet."
    ),
    highlights: {
      ja: [
        "ひまわりの里(23ヘクタール) — 約23万本のひまわり、東京ドーム5個分、日本最大級",
        "8月第1週〜10日頃の満開期 — ひまわりまつり開催、迷路・お土産・グルメも揃う",
        "12種類以上のひまわり品種 — 黄色だけでなくレモン色・赤系・マルチカラーも、品種ガイド付き",
        "展望台・ひまわり迷路 — 高所から全景を撮れる、迷路は子ども連れに人気",
        "パラグライダー体験 — 上空からひまわり畑を俯瞰、夏季限定の特別体験",
      ],
      en: [
        "Himawari no Sato (23 hectares) — about 230,000 sunflowers, equivalent to five Tokyo Domes, one of Japan's largest sunflower fields",
        "Peak bloom early August — the Sunflower Festival features mazes, souvenirs, and gourmet food",
        "More than 12 sunflower varieties — beyond yellow, lemon-yellow, red-tinged, and multicolor varieties, with a guide to each",
        "Observatory and Sunflower Maze — overhead shots from the platform, with the maze popular among families",
        "Paragliding — aerial views of the sunflower field, available only in summer",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "北竜町とは?", a: "北海道空知地方の人口約1,700人の小さな町で、日本最大級のひまわり畑「ひまわりの里」(23ヘクタール、約23万本)で有名。1987年から町おこしで始まり、毎年7〜8月のひまわりまつりに100万人以上が訪れる北海道の夏の風物詩です。" },
        { q: "開花のピークは?", a: "例年8月第1週〜10日頃。展望台から全景を撮るのが定番。午前の順光が最も黄色が鮮やか、青空との組合せが王道。年により1週間ずれることがあるので公式サイトの開花情報を確認してください。" },
        { q: "アクセスは?", a: "JR札幌駅から特急で約1時間20分、深川駅で乗換え留萌本線「碧水駅」→車で5分。札幌から車では約2時間。駐車場(無料)あり、まつり期間中は混雑するため早朝6〜8時着がおすすめです。" },
        { q: "撮影テクニックは?", a: "①展望台から全景パノラマ(広角16-35mm) ②人物を入れて規模感(中望遠70-200mm) ③ひまわりの立体感は朝の斜光 ④下から空を入れる花一輪のクローズアップ(マクロ90mm) ⑤ひまわり迷路の上空からドローン(申請要)。雨上がりの晴天は色が最も冴える。" },
        { q: "ひまわりまつりとは?", a: "毎年7月中旬〜8月20日頃の約1ヶ月開催。入場無料、駐車場500円。期間中は屋台、ひまわり迷路(高校生以下無料、大人300円)、ひまわり姫コンテスト、夜のライトアップ(限定日)などのイベント満載。8月7〜8日のメインイベント期は混雑するため早朝が確実。" },
        { q: "周辺と連続撮影プランは?", a: "雨竜沼湿原(車30分・ラムサール条約登録、6〜9月の高山植物)、滝川市の菜の花畑(5月)、留萌市の海(車1時間)など道北の自然撮影地と組合せ可能。札幌から旭川・富良野経由で訪問する1泊2日の周遊コースが定番、ラベンダー(7月)+ひまわり(8月)のW花畑撮影旅程も。" },
      ],
      en: [
        { q: "What is Hokuryu Town?", a: "A small town of about 1,700 residents in the Sorachi region of Hokkaido, famous for «Himawari no Sato» — one of Japan's largest sunflower fields (23 hectares, about 230,000 sunflowers). Started in 1987 as a town-revitalization project, the July–August Sunflower Festival now draws over a million visitors as Hokkaido's summer signature." },
        { q: "When is peak bloom?", a: "Typically from the first week of August to about August 10. The classic shot is a full-field panorama from the observatory. Morning front-light makes the yellow most vivid; pairing with blue sky is the canonical composition. Bloom can shift by a week year to year — check the official forecast." },
        { q: "Access?", a: "About 1 hour 20 minutes from JR Sapporo Station by limited express, then transfer at Fukagawa to the Rumoi Main Line at Hekisui Station, then 5 minutes by car. About 2 hours by car from Sapporo. Free parking; during the festival, arrive 6–8 AM to beat the crowds." },
        { q: "Photography techniques?", a: "①Full-field panorama from the observatory (wide 16–35mm) ②Include people for scale (medium-tele 70–200mm) ③Morning side-light gives floral depth ④Single-flower closeups against sky from below (macro 90mm) ⑤Aerial above the sunflower maze (drone, permit required). Post-rain sunny days produce the richest color." },
        { q: "What is the Sunflower Festival?", a: "Held about a month from mid-July to August 20. Free entry; parking ¥500. Stalls, sunflower maze (free for under 16, ¥300 adults), Sunflower Princess contest, and limited-day evening illuminations. August 7–8 is the festival peak — arrive early to beat the crowds." },
        { q: "Combine with other shoots?", a: "Pair with Uryunuma Wetland (30 min by car, Ramsar-registered, alpine flora June–September), Takikawa rapeseed fields (May), or Rumoi coast (1 hr by car). The standard 2-day loop departs Sapporo via Asahikawa and Furano. A double-flower itinerary — lavender (July) + sunflowers (August) — is also popular." },
      ],
    },
    faqs: [
      { q: d("開花のピークは？","When is peak bloom?","盛花期？","盛花期？","개화 절정기는?"),
        a: d("例年8月第1週〜10日頃。展望台から全景を撮るのが定番。午前の順光が最も黄色が鮮やか。","Typically first week to ~10 August. Classic shot is full-field panorama from the observatory. Morning front-light is most vivid.","通常8月第1周至10日前后。展望台拍摄全景为经典。上午顺光黄色最艳。","通常8月第1週至10日前後。展望台拍攝全景為經典。上午順光黃色最豔。","보통 8월 첫째 주~10일경. 전망대에서 전경 촬영이 정석. 오전 순광이 가장 노랑이 선명.") },
    ],
  },

  /* ── 東京 品川 ── */
  "品川": {
    desc: d(
      "品川は江戸時代の東海道53次の第1宿場町に由来する東京の交通ハブ。高層ビル群と新幹線・山手線の走るプラットフォームが撮影題材。朝夕の通勤ラッシュ、夜の駅ビルの光、運河と倉庫街のコントラストが都市写真として秀逸。",
      "Shinagawa traces its origins to the first post-station on the Edo-era Tokaido road and is now a key Tokyo transport hub. Skyscrapers and bustling Shinkansen/Yamanote Line platforms provide urban subjects. Rush-hour crowds, station illumination, and canal-warehouse contrasts are strong compositions.",
      "品川源自江户时代东海道53次第一宿场町，现为东京交通枢纽。高层楼群与新干线、山手线站台为拍摄题材。早晚通勤、夜间站前灯光、运河与仓库对比为都市摄影佳作。",
      "品川源自江戶時代東海道53次第一宿場町，現為東京交通樞紐。高層樓群與新幹線、山手線站台為拍攝題材。早晚通勤、夜間站前燈光、運河與倉庫對比為都市攝影佳作。",
      "시나가와는 에도시대 도카이도 53차의 제1 역참 마을에서 유래한 도쿄의 교통 허브. 고층빌딩군과 신칸센·야마노테선이 달리는 플랫폼이 촬영 소재. 아침저녁 출퇴근 러시, 밤의 역 빌딩 조명, 운하와 창고 거리의 대비가 도시 사진으로 뛰어남."
    ),
    definition: lh(
      "品川(しながわ)は東京都港区南部から品川区北部にかけてのエリアで、JR東日本の主要ターミナル駅「品川駅」を中心とする東京の交通ハブ。1872年(明治5年)日本最初の鉄道として新橋〜横浜間に開業した時の中継駅で、150年以上の歴史を持つ重要拠点。現在は東海道新幹線・JR山手線・京浜東北線・東海道線・横須賀線・京急本線が乗り入れ、1日約36万人が利用、東京駅・新宿駅に次ぐ重要ターミナル。江戸時代の東海道53次の第1宿場町「品川宿」から発展した歴史と、品川インターシティ(157m)、KDDI大手町ビル、グランドプリンスホテル新高輪などの超高層ビル群、運河と倉庫街、天王洲アイルのウォーターフロントなど、近代都市・歴史・水辺が共存する都市撮影地です。",
      "Shinagawa covers the southern part of Minato Ward and northern Shinagawa Ward in central Tokyo, anchored by the major JR East terminal of Shinagawa Station. As a midway station of Japan's first railway, opened between Shinbashi and Yokohama in 1872 (Meiji 5), it has 150+ years of history and serves about 360,000 passengers a day across the Tokaido Shinkansen, JR Yamanote Line, Keihin-Tohoku Line, Tokaido Line, Yokosuka Line, and the Keikyu Main Line — Tokyo's third-busiest hub after Tokyo and Shinjuku Stations. Originating as «Shinagawa-juku,» the first post station on the Edo-period Tokaido road, the area now combines that history with the skyscrapers of Shinagawa Intercity (157 m), the KDDI Otemachi Building, and Grand Prince Hotel New Takanawa, alongside canals, warehouses, and the Tennozu Isle waterfront — a multi-layered urban photographic destination."
    ),
    highlights: {
      ja: [
        "品川駅高輪口・港南口 — 東海道新幹線の発着、新幹線と高層ビルの組合せ、夕方の通勤ラッシュ",
        "新幹線俯瞰 — 高輪口歩道橋から東海道新幹線の高速通過を捉える、シャッタースピード勝負",
        "天王洲アイル — 東京湾とオフィスビルが融合するウォーターフロント、運河の夜景が幻想的",
        "品川インターシティ — ガラス回廊と高層ビル群、現代建築の幾何学的構図",
        "東京湾岸・大井ふ頭 — コンテナ埠頭の物流景観、夕日と港湾クレーンの対比",
      ],
      en: [
        "Shinagawa Station Takanawa and Konan Exits — Tokaido Shinkansen arrivals and departures; combinations of bullet trains with skyscrapers; evening rush hour",
        "Shinkansen Bird's-Eye View — capture high-speed passings of the Tokaido Shinkansen from the Takanawa pedestrian bridge — a shutter-speed challenge",
        "Tennozu Isle — a waterfront where Tokyo Bay meets office towers; the canal nightscape is otherworldly",
        "Shinagawa Intercity — glass corridors and skyscraper clusters; geometric compositions of contemporary architecture",
        "Tokyo Bay-side and Oi Wharf — the logistics landscape of a container terminal, with sunset against gantry cranes",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "品川とは?", a: "東京都港区南部から品川区北部のエリアで、東海道新幹線・JR山手線等が乗り入れる東京の交通ハブ。江戸時代の東海道53次第1宿場町「品川宿」から発展、現在は超高層ビル群と運河・倉庫街、ウォーターフロントが共存する都市撮影地です。" },
        { q: "品川駅周辺の撮影ポイントは?", a: "高輪口歩道橋からの新幹線俯瞰、港南口のビル群、品川インターシティのガラス回廊、天王洲アイルの運河夜景。日没前後のブルーアワーが空と街の光のバランスがベストです。" },
        { q: "撮影マナーは?", a: "駅構内・ホームでは三脚・大型機材禁止、JR規定遵守必須。歩道橋・公道は基本可、人物撮影は許可必要。深夜の撮影は警備員に声をかけ、不審な行動と思われないよう注意。" },
        { q: "新幹線撮影のテクニックは?", a: "高輪口歩道橋から望遠70-200mmで新幹線の高速走行を切り取る。シャッタースピード1/1000秒以上で凍結、1/30〜1/60秒で流し撮り(動感)。日中の通過頻度は5分に1本程度、東海道新幹線「のぞみ」「ひかり」「こだま」が次々と通過。早朝の始発前後と夕方ラッシュが最も多彩な車両を撮れます。" },
        { q: "アクセスは?", a: "東京駅からJR山手線で約7分・170円、または東海道線で5分。羽田空港から京急線で約12分・380円。新幹線「のぞみ」で大阪から約2時間20分、品川駅は東海道新幹線の主要停車駅。タクシーは混雑、地下鉄+徒歩が圧倒的に便利です。" },
        { q: "天王洲アイルの夜景は?", a: "品川駅から東京モノレールで2駅・3分・170円、ゆりかもめ線でもアクセス可。運河沿いのウッドデッキ「ボードウォーク」がメイン撮影スポット、レストランの灯りと運河の反射が映える。日没後30分のブルーアワーが最高、三脚OKだが歩行者通行に配慮を。レインボーブリッジを背景にする構図も狙えます。" },
      ],
      en: [
        { q: "What is Shinagawa?", a: "A district stretching from southern Minato Ward to northern Shinagawa Ward in Tokyo, anchored by the Shinagawa Station hub on the Tokaido Shinkansen and JR lines. Originating as «Shinagawa-juku,» the first Edo-period post station on the Tokaido, it now combines skyscrapers with canals, warehouses, and waterfronts — a layered urban photographic destination." },
        { q: "Photo spots near Shinagawa Station?", a: "Shinkansen view from the Takanawa pedestrian bridge, Kohnan-side skyscrapers, Shinagawa Intercity glass corridor, and the canal nightscape at Tennozu Isle. Blue hour around sunset offers the best balance of sky and city lights." },
        { q: "Photography etiquette?", a: "Tripods and large gear are prohibited inside the station and on platforms — follow JR rules. Pedestrian bridges and public roads are generally fine; photographing individuals requires permission. At night, speak to security to avoid suspicion." },
        { q: "Shinkansen photography techniques?", a: "From the Takanawa pedestrian bridge, use a 70–200mm to crop high-speed bullet trains. Shutter 1/1000s+ to freeze, 1/30–1/60s for panning (motion). Daytime sees a Shinkansen pass every ~5 min — Tokaido Nozomi, Hikari, and Kodama in succession. Early morning around first runs and evening rush capture the most variety." },
        { q: "Access?", a: "From Tokyo Station, JR Yamanote Line takes ~7 min, ¥170, or Tokaido Line ~5 min. From Haneda Airport, Keikyu Line ~12 min, ¥380. Shinkansen «Nozomi» from Osaka takes ~2 hr 20 min — Shinagawa is a major Tokaido Shinkansen stop. Taxis are crowded; subway + walking is the easy choice." },
        { q: "Tennozu Isle nightscape?", a: "Two stops from Shinagawa on the Tokyo Monorail (3 min, ¥170); Yurikamome also reaches it. The canalside boardwalk is the main photo spot — restaurant lights reflecting on water are gorgeous. Blue hour 30 min after sunset is best; tripods OK but be considerate of pedestrians. Compositions with Rainbow Bridge as backdrop are also possible." },
      ],
    },
    faqs: [
      { q: d("品川駅周辺の撮影ポイントは？","Photo spots near Shinagawa Station?","品川站周边拍摄点？","品川站周邊拍攝點？","시나가와역 주변 촬영 포인트는?"),
        a: d("高輪口歩道橋からの新幹線、港南口のビル群、品川インターシティのガラス回廊、天王洲アイルの運河夜景。","Shinkansen view from the Takanawa side pedestrian bridge, Kohnan-side skyscrapers, Shinagawa Intercity glass corridor, and canal nightscape at Tennozu Isle.","高轮口天桥俯拍新干线、港南口楼群、品川Intercity玻璃回廊、天王洲运河夜景。","高輪口天橋俯拍新幹線、港南口樓群、品川Intercity玻璃迴廊、天王洲運河夜景。","다카나와 출구 보도교에서 신칸센, 고난 출구 빌딩군, 시나가와 인터시티 유리 회랑, 덴노즈 아일 운하 야경.") },
    ],
  },

  /* ── 三重 残り ── */
  "梅林公園": {
    desc: d(
      "三重県の梅林公園（津市結城神社など複数）は、早春2〜3月に梅の花が咲き誇る名所。紅梅・白梅・枝垂れ梅の競演と、霞む伊勢湾や周辺の山並みを背景にした構図が春の訪れを告げる。",
      "Mie's plum groves (including Yuki Shrine in Tsu City) are famous for early-spring plum blossoms in February and March. Red, white, and weeping plums bloom together against hazy Ise Bay and mountain backdrops, heralding spring.",
      "三重县梅林公园（津市结城神社等）是早春2-3月梅花盛开名所。红梅、白梅、垂枝梅齐放，远眺伊势湾与山峦，宣告春的到来。",
      "三重縣梅林公園（津市結城神社等）是早春2-3月梅花盛開名所。紅梅、白梅、垂枝梅齊放，遠眺伊勢灣與山巒，宣告春的到來。",
      "미에현의 매림 공원(쓰시 유키신사 등)은 이른 봄 2~3월 매화가 만개하는 명소. 홍매·백매·수양매화가 어우러지고 흐릿한 이세만과 주변 산봉우리를 배경으로 봄의 도래를 알립니다."
    ),
    definition: lh(
      "梅林公園(ばいりんこうえん)は三重県の梅の名所の総称で、特に津市の結城神社境内梅園(約300本、樹齢300年超の枝垂れ梅含む)と、いなべ市農業公園梅林(約4,500本、東海地区最大級)が代表的。早春2〜3月に紅梅・白梅・枝垂れ梅が次々と開花し、桜より一足早い春の訪れを告げる伝統的な被写体です。結城神社は南北朝時代の忠臣・結城宗広を祀る古社で、梅の名所としても古来詠まれ、いなべ市梅林はパッチワーク状の白とピンクの絨毯が圧巻。",
      "Plum Grove Parks (Bairin-koen) is the collective name for Mie Prefecture's plum-blossom destinations, most notably Yuki Shrine in Tsu City (about 300 trees including weeping plums over 300 years old) and Inabe City Agricultural Park's plum grove (about 4,500 trees, the largest in the Tokai region). From mid-February through early March, red, white, and weeping plums bloom in succession, heralding spring earlier than cherry blossoms. Yuki Shrine, an old shrine venerating the Nanboku-cho-era loyalist Munehiro Yuki, has been celebrated in poetry as a plum-viewing site, while Inabe's grove unfolds a patchwork carpet of white and pink across its hillsides."
    ),
    highlights: {
      ja: [
        "結城神社梅園(津市) — 約300本、樹齢300年超の枝垂れ梅が境内を彩る、神社建築との組合せ",
        "いなべ市農業公園梅林 — 東海地区最大級、約4,500本、白とピンクのパッチワーク状の丘",
        "枝垂れ梅 — 梅の中でも特に絵画的な品種、地面に届くほどの花房は写真映えする",
        "鈴鹿の森庭園 — 200本以上の枝垂れ梅、3月のライトアップは幻想的",
        "雪輪・八重咲き品種 — 多彩な品種が混じり合い、紅・白・薄桃のグラデーションが楽しめる",
      ],
      en: [
        "Yuki Shrine Plum Grove (Tsu) — about 300 trees, including weeping plums over 300 years old, paired with shrine architecture",
        "Inabe Agricultural Park Plum Grove — the largest in the Tokai region with about 4,500 trees forming a patchwork of white and pink across the hills",
        "Weeping Plums — among plum varieties, the most painterly; flower clusters dropping nearly to the ground photograph spectacularly",
        "Suzuka no Mori Garden — over 200 weeping plums, with magical illumination in March",
        "Yukiwa and Yae-zaki Varieties — many cultivars mingle, offering gradients of red, white, and pale pink",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "梅林公園とは?", a: "三重県の梅の名所の総称で、結城神社境内梅園(津市、樹齢300年超の枝垂れ梅)、いなべ市農業公園梅林(東海最大、約4,500本)、鈴鹿の森庭園などが代表。早春2〜3月の紅梅・白梅・枝垂れ梅で、桜より一足早い春の被写体です。" },
        { q: "見頃はいつ?", a: "2月中旬〜3月上旬がピーク。早咲き・遅咲きの品種があるため、2月末頃が最も多種が揃う。寒の戻りで開花が遅れる年もあるため、各公園公式サイトの開花情報の確認が必須です。" },
        { q: "アクセスは?", a: "結城神社は近鉄津駅からバスで20分。いなべ市梅林公園は近鉄阿下喜駅から車で15分(梅まつり期間中はシャトルバスあり)。両方を1日で巡るならレンタカー推奨です。" },
        { q: "梅まつりの料金と特典は?", a: "結城神社梅まつり(2月上旬〜3月中旬):大人500円・小学生300円。お茶接待や梅花茶碗での抹茶提供(別途500円)など。いなべ市梅林公園梅まつり(2月末〜3月中旬):大人500円・小中学生200円、夜間ライトアップ実施日は別途料金。両方とも撮影可、商用利用は事前申請が必要です。" },
        { q: "おすすめ撮影テクニックは?", a: "①マクロ(90mm)で梅花のディテール ②望遠70-200mmで枝の重なりを圧縮 ③広角16-35mmで梅林全景と空 ④背景に神社建築や山を入れた借景構図。曇天は花の発色UP、晴天は枝のシルエットが映える。雨上がりは水滴が乗った花びらが映え、メジロ・ヒヨドリと一緒に撮れる早朝が狙い目。" },
        { q: "鈴鹿の森庭園と特別な点は?", a: "200本以上の枝垂れ梅専門の私設庭園で、3月の20日間限定開園(年により開園期間変動)、入園料1,500円。日本一の枝垂れ梅と称される樹齢百年級の名木が複数あり、夜間ライトアップ(別途料金)では闇に浮かぶ梅の幻想的な姿が撮れる。撮影マナーが厳格(写真家には朝の優先入場制度も)。" },
      ],
      en: [
        { q: "What are Plum Grove Parks?", a: "A collective term for Mie Prefecture's plum destinations — including Yuki Shrine in Tsu (300+ trees with weeping plums over 300 years old), Inabe Agricultural Park (Tokai's largest at 4,500 trees), and Suzuka no Mori Garden. From mid-February to early March, plums bloom before cherry blossoms, marking the earliest spring." },
        { q: "When is peak bloom?", a: "Mid-February to early March. Early- and late-blooming cultivars overlap, so late February offers the widest variety. Cold spells can delay bloom — check the official forecasts for each park before visiting." },
        { q: "Access?", a: "Yuki Shrine: 20 minutes by bus from Kintetsu Tsu Station. Inabe Plum Grove Park: 15 minutes by car from Kintetsu Agaki Station (with shuttle buses during the festival). A rental car is recommended for visiting both in a day." },
        { q: "Festival fees and perks?", a: "Yuki Shrine Plum Festival (early Feb–mid Mar): adults ¥500, elementary school ¥300. Tea service and matcha in plum-themed bowls (¥500 extra). Inabe Plum Grove Festival (late Feb–mid Mar): adults ¥500, students ¥200; night illumination days have separate pricing. Photography is allowed; commercial use requires pre-approval." },
        { q: "Recommended shooting techniques?", a: "①Macro (90mm) for blossom detail ②Telephoto 70–200mm to compress overlapping branches ③Wide 16–35mm for the whole grove with sky ④Borrowed scenery using shrine buildings or mountains. Overcast saturates color; sunny days highlight branch silhouettes. Post-rain water-drop shots and dawn pairings with Japanese white-eye and brown-eared bulbul birds are ideal." },
        { q: "What's special about Suzuka no Mori Garden?", a: "A private garden specializing in over 200 weeping plums, open just 20 days each March (period varies yearly), admission ¥1,500. Multiple century-old «finest weeping plums in Japan» trees; night illumination (additional fee) shows blossoms floating in darkness. Photography etiquette is strict (early-bird priority entry available for photographers)." },
      ],
    },
    faqs: [
      { q: d("見頃はいつ？","When is peak bloom?","盛开期？","盛開期？","절정기는?"),
        a: d("2月中旬〜3月上旬がピーク。早咲き・遅咲きの品種があるため、2月末頃が最も多種が揃う。","Mid-February to early March. With early- and late-blooming varieties, late February offers the widest variety.","2月中旬至3月上旬。早晚品种并存，2月末最丰富。","2月中旬至3月上旬。早晚品種並存，2月末最豐富。","2월 중순~3월 초. 조생·만생 품종이 있어 2월 말이 가장 다양합니다.") },
    ],
  },
  "鳥羽水族館": {
    desc: d(
      "鳥羽水族館は1,200種類3万点を超える日本最多の展示生物を誇る総合水族館。ジュゴン、マナティ、ラッコなど他では見られない貴重な生物も。12の生態系ゾーンに分かれた展示は順路が自由で、子ども連れにも最適。",
      "Toba Aquarium houses over 30,000 creatures across 1,200 species — Japan's largest variety. Dugongs, manatees, and sea otters are among the rarities. Twelve ecosystem zones with free-flow pathways welcome families of all ages.",
      "鸟羽水族馆拥有1200种3万余件日本最多展示生物。儒艮、海牛、海獭等珍稀生物亦可见。12个生态区自由路线，适合全家游览。",
      "鳥羽水族館擁有1200種3萬餘件日本最多展示生物。儒艮、海牛、海獺等珍稀生物亦可見。12個生態區自由路線，適合全家遊覽。",
      "도바 수족관은 1,200종 3만 점이 넘는 일본 최다 전시 생물을 자랑하는 종합 수족관. 듀공, 매너티, 해달 등 다른 곳에서 볼 수 없는 귀한 생물도 있습니다. 12개 생태계 구역으로 나뉜 전시는 자유 동선으로 가족 단위에도 최적."
    ),
    definition: lh(
      "鳥羽水族館(とばすいぞくかん)は三重県鳥羽市鳥羽3丁目3-6にある総合水族館で、1955年開業の老舗。飼育種類数は約1,200種(国内最多)、飼育数約30,000匹に達する西日本最大級の水族館。日本で唯一ジュゴン(現在は1頭、セレナ)を飼育・展示する施設として知られ、ラッコ、マナティ、スナメリ、アフリカマナティ、コウテイペンギンの仲間など、他では見られない貴重な海洋生物を多数展示。展示は12のテーマゾーンに分かれ、決まった順路がなく自由に巡れる「フリーフロー」方式。鳥羽駅から徒歩10分、伊勢神宮参拝とセットで訪れる人気の観光地です。",
      "Toba Aquarium, located at 3-6 3-chome Toba in Toba City, Mie Prefecture, opened in 1955 and is one of Japan's most established aquariums. With about 1,200 species — the most of any Japanese aquarium — and roughly 30,000 individuals, it ranks as one of West Japan's largest. It is the only Japanese facility that houses a dugong (currently a single individual, Serena), alongside sea otters, manatees, finless porpoises, African manatees, emperor-penguin relatives, and many other rare marine creatures unavailable elsewhere. Its 12 themed zones use a free-flow design, letting visitors explore at their own pace. Located 10 minutes on foot from Toba Station, it is a popular destination paired with Ise Jingu pilgrimages."
    ),
    highlights: {
      ja: [
        "ジュゴン「セレナ」 — 日本で唯一の飼育、餌やり時間(11時・15時)に活発、ガラス越しの近接撮影",
        "ラッコ — 国内では数少ない貴重種、貝割り行動の瞬間、餌やりタイムが見どころ",
        "マナティ・スナメリ — のんびりした泳ぎが愛らしい、家族連れに大人気",
        "古代の海ゾーン — シーラカンス、オウムガイなど生きた化石、青い照明のバックが幻想的",
        "ペンギンの散歩 — 日替わり開催、館内を歩くペンギンの行進、子どもの目線で撮影が映える",
      ],
      en: [
        "Dugong «Serena» — the only one in Japan; most active at feeding times (11 AM, 3 PM); close-up shots through the glass",
        "Sea Otter — a rare species in Japan; the shell-cracking moments and feeding time are highlights",
        "Manatee and Finless Porpoise — their leisurely swimming charms families",
        "Ancient Seas Zone — coelacanths, nautiluses, and other living fossils against a magical blue-lit backdrop",
        "Penguin Walk — held on rotating days; a parade of penguins through the aquarium photographs delightfully at child-eye level",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "鳥羽水族館とは?", a: "三重県鳥羽市の1955年開業の総合水族館で、飼育種類数約1,200種は日本最多。日本で唯一ジュゴン「セレナ」を飼育、ラッコやマナティなど他では見られない貴重な海洋生物を展示。12テーマゾーンを自由に巡る西日本最大級の水族館です。" },
        { q: "ジュゴンは何時に活発?", a: "餌やりタイム(11時・15時頃)が最も動きます。ガラス越しにピタリと寄ってくる珍しい瞬間を狙うとシャッターチャンス。日中はゆったり泳ぐ姿が多く、暗めの水槽でISO上げ目に。" },
        { q: "撮影テクニックは?", a: "ガラス越しの撮影なので、レンズを反射防止フードのように水槽ガラスに密着させ反射を消す。明るい単焦点(50mm f/1.8)で背景ボケ、ISO800〜3200で動きを止める。フラッシュは生物に有害で禁止。" },
        { q: "入館料・営業時間は?", a: "大人2,800円・小中学生1,600円・幼児800円。年中無休、9:00〜17:00(7-8月の夏期は19:00まで延長)。最終入館は閉館1時間前。所要時間2〜3時間、12ゾーン全部回るなら半日。混雑回避なら開館直後または夕方が狙い目。" },
        { q: "アクセスは?", a: "近鉄・JR「鳥羽駅」から徒歩10分・連絡通路あり。名古屋から近鉄特急で約1時間40分・3,950円。伊勢神宮から車で15分・電車で30分。佐田浜西駐車場(1日800円)。鳥羽湾めぐりとセットでマリンランドが定番、伊勢志摩観光の組合せに最適です。" },
        { q: "ラッコの撮影タイミングは?", a: "日本国内で飼育するラッコは現存約3頭(全国)で、鳥羽水族館の「メイ」「キラ」は希少。餌やりタイム(10:30・15:30)に活発に動く。貝を石で割る「道具使用」の珍しい行動は撮影必修。狭い水槽のためアクリル越し近距離での撮影が必要、明るいレンズ必携です。" },
      ],
      en: [
        { q: "What is Toba Aquarium?", a: "An aquarium in Toba City, Mie Prefecture, opened in 1955 with about 1,200 species — the most in Japan. It is the only facility in Japan housing a dugong («Serena») and showcases rare marine creatures like sea otters and manatees in 12 themed zones with a free-flow layout — one of West Japan's largest aquariums." },
        { q: "When is the dugong most active?", a: "Around feeding times (approx. 11 AM and 3 PM). It sometimes swims right up to the glass — a prized moment. During the day it moves leisurely; raise your ISO in the dim tank lighting." },
        { q: "Photography techniques?", a: "Press the lens against the tank glass like an anti-reflection hood to eliminate reflections. A fast prime (50mm f/1.8) blurs the background; ISO 800–3200 freezes movement. Flash is harmful to the animals and prohibited." },
        { q: "Admission and hours?", a: "Adults ¥2,800, elementary/middle school ¥1,600, children ¥800. Open daily 9:00–17:00 (extended to 19:00 in July–August). Last entry 1 hour before closing. Allow 2–3 hours; covering all 12 zones takes a half day. Right at opening or late afternoon is best for avoiding crowds." },
        { q: "Access?", a: "10-minute walk from Kintetsu/JR Toba Station, via direct walkway. From Nagoya, Kintetsu limited express ~1 hr 40 min, ¥3,950. From Ise Jingu: 15 min by car, 30 min by train. Sata-hama West Parking ¥800/day. Pairs naturally with Toba Bay cruises and Marineland — perfect for an Ise-Shima itinerary." },
        { q: "When to photograph the sea otters?", a: "Japan currently houses about 3 sea otters total nationwide; Toba's «Mei» and «Kira» are precious. Feeding times (10:30 and 15:30) bring the most activity. The rare «tool use» — breaking shells with stones — is a must-shoot. The tank is small, so close-range through-acrylic shooting is needed; a fast lens is essential." },
      ],
    },
    faqs: [
      { q: d("ジュゴンは何時に活発？","When is the dugong most active?","儒艮何时活跃？","儒艮何時活躍？","듀공은 언제 활발한가요?"),
        a: d("餌やりタイム（11時・15時頃）が最も動く。ガラス越しにピタリと寄ってくる珍しい瞬間を狙う。","Around feeding times (approx. 11 AM and 3 PM). It sometimes swims right up to the glass — a prized moment.","投喂时段（11、15点左右）最活跃，偶尔贴近玻璃。","投喂時段（11、15點左右）最活躍，偶爾貼近玻璃。","먹이 시간(11시·15시경)이 가장 활동적. 유리에 바짝 다가오는 귀한 순간을 노려보세요.") },
    ],
  },

  /* ── 京都 清水寺周辺 ── */
  "清水寺周辺": {
    desc: d(
      "清水寺周辺の二年坂・三年坂・清水坂は石畳と伝統的町家が並ぶ重要伝統的建造物群保存地区。八坂の塔（法観寺）を借景にした構図は京都の定番。早朝の観光客が少ない時間帯がおすすめ。",
      "The lanes around Kiyomizu-dera — Ninenzaka, Sannenzaka, and Kiyomizuzaka — are stone-paved streets lined with traditional townhouses, designated as an Important Preservation District. The view with Yasaka Pagoda (Hokan-ji) as backdrop is a classic Kyoto composition. Best photographed in early morning.",
      "清水寺周边的二年坂、三年坂、清水坂是石板路与传统町家并排的重要传统建筑群保护区。以八坂塔（法观寺）为借景构图为京都经典。清晨游客少时最佳。",
      "清水寺周邊的二年坂、三年坂、清水坂是石板路與傳統町家並排的重要傳統建築群保護區。以八坂塔（法觀寺）為借景構圖為京都經典。清晨遊客少時最佳。",
      "기요미즈데라 주변의 니넨자카·산넨자카·기요미즈자카는 돌길과 전통 마치야가 늘어선 중요 전통건조물군 보존지구. 야사카 탑(호칸지)을 차경한 구도는 교토의 정석. 이른 아침 관광객이 적은 시간대가 추천."
    ),
    definition: lh(
      "清水寺周辺(きよみずでらしゅうへん)は京都府京都市東山区にある清水寺へと続く参道地区で、三年坂(産寧坂)・二年坂(二寧坂)・清水坂・八坂通など江戸〜明治期の町家と石畳が連なる重要伝統的建造物群保存地区(重伝建)。エリアの象徴である八坂の塔(法観寺、高さ46mの五重塔、5世紀末聖徳太子創建伝、現在の塔は1440年再建)は京都市街のスカイラインに古都の顔を与えています。狭い石畳の坂道、格子戸の町家、和服姿の観光客と八坂の塔を組み合わせた構図は世界中の写真家に愛され、京都を象徴する撮影地として年間数百万人が訪れます。",
      "The lanes around Kiyomizu-dera (Kiyomizu-dera shu-hen) form the approach district to the temple in Kyoto's Higashiyama Ward, including Sannenzaka, Ninenzaka, Kiyomizuzaka, and Yasaka-dori — a Designated Important Preservation District for Groups of Traditional Buildings, where Edo-to-Meiji-era machiya houses line stone-paved streets. The district's icon, the Yasaka Pagoda (Hokan-ji), is a 46 m five-story pagoda — said to have been founded by Prince Shotoku in the late 5th century, with the current structure dating to 1440 — that defines Kyoto's old-city skyline. Compositions combining narrow stone-paved slopes, lattice-fronted machiya, kimono-clad visitors, and the pagoda are beloved by photographers worldwide, drawing several million visitors a year as Kyoto's quintessential photographic district."
    ),
    highlights: {
      ja: [
        "三年坂(産寧坂) — 1740年代整備の石段坂、江戸の町並みと八坂の塔越しの構図、桜と紅葉の借景",
        "二年坂(二寧坂) — 三年坂より緩やかな坂、明治の町家と石畳、夕暮れの提灯の灯りが情緒",
        "八坂の塔(法観寺) — 高さ46mの五重塔、八坂通の坂道下方から見上げる構図が世界的に有名",
        "ねねの道 — 高台寺へと続く石畳の小径、ねね(豊臣秀吉夫人)ゆかりの道、和服の着付け体験で人気",
        "清水坂 — 清水寺への正面参道、土産物店と京都らしい風情、夕方の混雑が消えた頃が狙い目",
      ],
      en: [
        "Sannenzaka — a stone-stepped slope laid out in the 1740s; framing the Yasaka Pagoda over Edo-era streetscapes makes a classic shot, with cherry blossoms or autumn colors as borrowed scenery",
        "Ninenzaka — a gentler slope above Sannenzaka, with Meiji-era machiya, stone paving, and atmospheric lantern light at dusk",
        "Yasaka Pagoda (Hokan-ji) — the 46 m five-story tower; looking up from below on Yasaka-dori is the iconic worldwide composition",
        "Nene-no-Michi — a stone-paved path leading to Kodai-ji, named for Nene (wife of Toyotomi Hideyoshi), popular for kimono dressing experiences",
        "Kiyomizuzaka — the main approach to Kiyomizu-dera, with souvenir shops and Kyoto-style atmosphere; photograph after the evening crowds disperse",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "清水寺周辺とは?", a: "京都市東山区にある清水寺への参道地区(三年坂・二年坂・清水坂・八坂通)で、江戸〜明治期の町家と石畳が連なる重要伝統的建造物群保存地区。八坂の塔(法観寺)を借景した構図は京都を象徴する撮影地です。" },
        { q: "八坂の塔の撮影ポイントは?", a: "八坂通の坂道下方から見上げるアングルが世界的に有名な定番。朝6〜7時は観光客ほぼゼロで、和服姿のポートレート撮影にも最適。雨上がりの石畳が反射する夕方も独特の情緒があります。" },
        { q: "ベストな撮影時間帯は?", a: "早朝6〜8時が圧倒的に空いていて光も柔らか、和服姿の観光客が画面を彩る午後3時頃も◎。日没前後の青の時間帯は提灯と石畳の組合せが幻想的、雨の日の濡れた石畳も外国人写真家に大人気。" },
        { q: "三年坂・二年坂の歴史は?", a: "三年坂は大同3年(808年)に整備されたという伝承から名付けられたが、実際は1740年代の整備。「ここで転ぶと3年で死ぬ」という俗信から、転倒厄除けの瓢箪を売る店が今も残る。1976年に重要伝統的建造物群保存地区に指定、京都の町家保存の代表的成功例です。" },
        { q: "和服レンタル・着付け体験は?", a: "祇園・東山周辺に和服レンタル店約30軒。半日プラン3,000〜6,000円(着付け+ヘアセット込)、写真撮影プラン15,000円〜。「夢京都祇園店」「岡本」が大手。早朝出発で人混み前の撮影、夕方返却が効率的。和服を着ての参道撮影は京都の風物詩。" },
        { q: "周辺の見どころ連続コースは?", a: "①清水寺(8時開門)→②三年坂・二年坂(石畳と八坂の塔)→③八坂神社(縁結び、夜のライトアップ)→④祇園白川(町家と桜・夜景)→⑤花見小路(舞妓さんに会えるかも)。徒歩ですべて回れる京都ゴールデンルート、半日〜1日で撮影可能です。" },
      ],
      en: [
        { q: "What is the Kiyomizu-dera district?", a: "The approach district to Kiyomizu-dera in Kyoto's Higashiyama Ward (Sannenzaka, Ninenzaka, Kiyomizuzaka, Yasaka-dori) — a Designated Important Preservation District lined with Edo-to-Meiji machiya and stone-paved streets, where compositions framing the Yasaka Pagoda epitomize Kyoto in photography." },
        { q: "Best spot for the Yasaka Pagoda?", a: "Looking up the Yasaka-dori slope from below is the world-famous classic angle. 6–7 AM is virtually empty — ideal also for kimono portraits. After rain, when stone paving reflects evening light, the atmosphere is unique." },
        { q: "Best time of day to shoot?", a: "Early morning (6–8 AM) is uncrowded with soft light. Around 3 PM, kimono-clad visitors add color. Blue hour around sunset combines lanterns and stone paving for a magical scene; wet stones after rain are especially loved by international photographers." },
        { q: "History of Sannenzaka and Ninenzaka?", a: "Sannenzaka is named for legend that it was built in Daido 3 (808 AD), though actual paving dates to the 1740s. From the folk belief «trip here, die in three years,» shops still sell gourd-shaped charms against falls. Designated Important Preservation District in 1976, it remains an iconic success story of Kyoto machiya preservation." },
        { q: "Kimono rental and dressing experiences?", a: "Around 30 kimono rental shops in Gion and Higashiyama. Half-day plans ¥3,000–6,000 (kimono + hair); plus a photo session, ¥15,000+. «Yumeyakata Gion» and «Okamoto» are major chains. Pick up early, shoot before the crowds, return in the evening — that's the efficient pattern. Kimono on the approach paths is a Kyoto signature." },
        { q: "Combine with nearby attractions?", a: "①Kiyomizu-dera (8 AM opening) → ②Sannenzaka/Ninenzaka (stone paving + Yasaka Pagoda) → ③Yasaka Shrine (matchmaking, night illumination) → ④Gion Shirakawa (machiya + cherry/night) → ⑤Hanami-koji (you might glimpse maiko). The Kyoto golden route, all walkable; covers half a day to a full day." },
      ],
    },
    faqs: [
      { q: d("八坂の塔の撮影ポイントは？","Best spot for Yasaka Pagoda?","八坂塔最佳拍摄点？","八坂塔最佳拍攝點？","야사카 탑 최고 촬영 포인트는?"),
        a: d("八坂通の坂道を下方から見上げるアングルが定番。朝6〜7時は観光客ほぼゼロで着物姿のポートレートにも最適。","Looking up the Yasaka-dori slope from below is the classic angle. 6–7 AM has almost no tourists — ideal for kimono portraits too.","八坂通道下方仰拍为经典。6-7点几乎无游客，适合和服人像。","八坂通道下方仰拍為經典。6-7點幾乎無遊客，適合和服人像。","야사카도리 비탈길 아래에서 올려다보는 앵글이 정석. 아침 6~7시는 관광객이 거의 없어 기모노 포트레이트에도 최적.") },
    ],
  },

  /* ── 奈良 法隆寺夢殿 ── */
  "法隆寺 夢殿": {
    desc: d(
      "法隆寺東院の夢殿は、聖徳太子の斑鳩宮跡に739年建立された八角円堂。中央に秘仏・救世観音（飛鳥時代）を安置し、春秋のみ特別公開。均整のとれた八角形のシルエットは日本建築の至宝。",
      "The Yumedono (Hall of Dreams) in Horyu-ji's East Precinct is an octagonal hall built in 739 on the site of Prince Shotoku's Ikaruga Palace. It enshrines the hidden Guze Kannon statue (Asuka period), viewable only in limited spring and autumn openings. The balanced octagonal silhouette is a treasure of Japanese architecture.",
      "法隆寺东院梦殿建于739年圣德太子斑鸠宫故址上的八角圆堂。中央安置秘藏救世观音（飞鸟时代），仅春秋特别公开。均衡的八角形剪影是日本建筑至宝。",
      "法隆寺東院夢殿建於739年聖德太子斑鳩宮故址上的八角圓堂。中央安置秘藏救世觀音（飛鳥時代），僅春秋特別公開。均衡的八角形剪影是日本建築至寶。",
      "호류지 동원의 유메도노는 쇼토쿠 태자의 이카루가 궁터에 739년 건립된 팔각원당. 중앙에 비불 구세관음(아스카시대)을 안치하며, 봄·가을에만 특별 공개. 균형 잡힌 팔각형 실루엣은 일본 건축의 지보."
    ),
    definition: lh(
      "法隆寺夢殿(ほうりゅうじゆめどの)は奈良県斑鳩町にある法隆寺東院の中心建築で、天平11年(739年)に行信僧都(ぎょうしんそうず)が聖徳太子の住まい「斑鳩宮(いかるがのみや)」の遺址に建立した八角形の円堂。直径12mの八角形プラン、檜皮葺の屋根、宝珠の頂部から成る均整のとれた優美な形姿で、日本最古の八角円堂として国宝に指定されています。中央には聖徳太子の等身像と伝わる救世観音菩薩立像(秘仏、飛鳥時代の楠木一木造、像高178.8cm)を安置し、長らく白布に包まれ祟りを恐れて開帳禁止だったところ、1884年にフェノロサと岡倉天心が初めて開帳しました。春と秋の特別公開期間のみ拝観可能です。",
      "Yumedono (the Hall of Dreams) of Horyu-ji, in Ikaruga Town, Nara Prefecture, is the central building of Horyu-ji's East Precinct. It was built in 739 by the priest Gyoshin Sozu on the site of Prince Shotoku's «Ikaruga Palace.» An octagonal hall 12 m across with a hinoki-bark-shingled roof and a jewel-shaped finial, it is the oldest octagonal hall in Japan and a National Treasure. At its center stands the Guze Kannon — said to be a life-sized image of Prince Shotoku, carved from a single block of camphor wood in the Asuka period (statue height 178.8 cm). For centuries it was wrapped in white cloth and not displayed, due to fears of curses; in 1884, Ernest Fenollosa and Tenshin Okakura unveiled it for the first time. It is visible only during limited spring and autumn openings."
    ),
    highlights: {
      ja: [
        "夢殿外観 — 八角形プラン直径12m、均整の取れた檜皮葺の優美な姿、外観は通年撮影可",
        "救世観音菩薩立像(国宝、秘仏) — 飛鳥時代の楠木一木造、像高178.8cm、聖徳太子の等身像と伝わる",
        "中宮寺・絵殿(東院伽藍) — 夢殿に隣接、聖徳太子作と伝わる天寿国繍帳の写しを展示",
        "鎌倉時代の補修 — 1230年代に礼堂が増築され、現在の建物は天平の意匠を保ちつつ鎌倉の手が入っている",
        "春・秋の特別公開 — 春期4月11日〜5月18日、秋期10月22日〜11月22日、内陣と救世観音を間近で拝観",
      ],
      en: [
        "Yumedono Exterior — an octagonal plan 12 m across, with a balanced hinoki-bark-shingled roof; the exterior may be photographed year-round",
        "Guze Kannon (National Treasure, hidden statue) — a single-block camphor sculpture from the Asuka period, 178.8 cm tall, said to be a life-sized image of Prince Shotoku",
        "Chuguji and the Edono of the East Precinct — adjacent to Yumedono, displaying replicas of the Tenjukoku Shucho thought to have been designed by Prince Shotoku",
        "Kamakura-Era Renovation — a worship hall was added in the 1230s; the current building preserves Tenpyo design while bearing Kamakura-period touches",
        "Spring and Autumn Special Openings — Spring April 11–May 18, Autumn October 22–November 22; the inner sanctum and Guze Kannon become viewable up close",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "法隆寺夢殿とは?", a: "奈良県斑鳩町の法隆寺東院の中心建築で、739年に聖徳太子の斑鳩宮跡に建立された日本最古の八角円堂(国宝)。聖徳太子等身大と伝わる秘仏・救世観音(飛鳥時代の楠木一木造)を安置し、春秋限定公開で世界中から拝観者が訪れます。" },
        { q: "救世観音の公開時期は?", a: "春期4月11日〜5月18日、秋期10月22日〜11月22日の年2回限定。1884年にフェノロサと岡倉天心が初開帳した秘仏で、像内部の撮影は禁止です。建物外観と境内は通年撮影可。" },
        { q: "アクセスと拝観料は?", a: "JR法隆寺駅から徒歩20分またはバス7分。法隆寺西院伽藍と共通券で1,500円(東院伽藍・夢殿含む)。所要時間は東院伽藍だけで30分、法隆寺全体で2〜3時間。京都駅から快速で約45分の日帰り圏内。" },
        { q: "八角円堂の建築美は?", a: "夢殿は日本最古の八角円堂で、直径約12m・高さ約9.5m。八角形のプランは聖徳太子を礼拝する記念建築として選ばれた特殊な形状で、檜皮葺の優美な屋根、軒下の組物、扇垂木など天平時代の木造建築技術の粋を凝縮。1230年代の鎌倉時代に礼堂が増築されて現在の姿、外観は四方のどの角度からも均整美が撮影できます。" },
        { q: "聖徳太子伝説とフェノロサの開帳は?", a: "聖徳太子の等身像と伝わる救世観音は、明治時代まで「決して扉を開けてはならない秘仏」として千年近く封印されていた。1884年(明治17年)、米国人東洋美術研究家アーネスト・フェノロサと弟子の岡倉天心が初開帳に成功、500本以上の包帯を解いて姿を現した瞬間が日本美術史の転機となりました。今も春秋のみ公開、写真撮影は厳禁。" },
        { q: "周辺の見どころは?", a: "①夢殿(早朝〜午前、八角形外観)②中宮寺(隣接、菩薩半跏像が国宝)③法隆寺西院伽藍(金堂・五重塔)④法輪寺・法起寺(車5分、姉妹寺院の三重塔)⑤奈良市内(車30分、東大寺・春日大社)。1日で奈良の世界遺産5件を巡る撮影旅程、夢殿は東院伽藍の最奥にあるため最後に静寂の中で訪問するのが良い。" },
      ],
      en: [
        { q: "What is Yumedono?", a: "The central building of Horyu-ji's East Precinct in Ikaruga Town, Nara — built in 739 on Prince Shotoku's «Ikaruga Palace» site, Japan's oldest octagonal hall and a National Treasure. It enshrines the secret Guze Kannon, a single-block camphor sculpture from the Asuka period believed to be a life-sized image of Prince Shotoku, viewable only in limited spring and autumn openings." },
        { q: "When is Guze Kannon shown?", a: "Twice a year only: Spring April 11–May 18, Autumn October 22–November 22. The hidden statue was first unveiled by Fenollosa and Tenshin Okakura in 1884. Photography of the statue is prohibited; the exterior building and grounds are open year-round." },
        { q: "Access and admission?", a: "20 minutes on foot from JR Horyu-ji Station or 7 minutes by bus. Combined ticket with the West Precinct (including East Precinct and Yumedono) is ¥1,500. The East Precinct alone takes 30 minutes; all of Horyu-ji takes 2–3 hours. Easy day trip from Kyoto Station — about 45 minutes by rapid train." },
        { q: "Architectural beauty of the octagonal hall?", a: "Yumedono is Japan's oldest octagonal hall, ~12 m across and 9.5 m tall. The octagonal plan was chosen as a memorial form to venerate Prince Shotoku — an unusual shape distilling Tenpyo-era wooden architecture: graceful hinoki-bark roofing, eave brackets, and fan rafters. The current form was extended with a worship hall in the 1230s; the exterior reveals balanced beauty from any of its four cardinal angles." },
        { q: "The Shotoku legend and the Fenollosa unveiling?", a: "Said to be Prince Shotoku's life-sized portrait, the Guze Kannon was sealed as «a hidden statue whose doors must never open» for nearly a thousand years until the Meiji era. In 1884, the American Orientalist Ernest Fenollosa and his student Tenshin Okakura succeeded in opening it, unwinding over 500 bandages — a turning point in Japanese art history. Still shown only in spring and autumn; photography of the statue is strictly forbidden." },
        { q: "Nearby attractions?", a: "①Yumedono (early-morning to morning, octagonal exterior) ②Chuguji (adjacent, National Treasure half-lotus Bodhisattva) ③Horyu-ji West Precinct (Kondo and pagoda) ④Horinji and Hokiji (5 min by car, sister-temple three-tier pagodas) ⑤Central Nara (30 min by car, Todaiji and Kasuga Taisha). A full-day five-World-Heritage route — Yumedono sits at the deepest end of the East Precinct, ideal as the final, contemplative stop." },
      ],
    },
    faqs: [
      { q: d("救世観音の公開時期は？","When is Guze Kannon shown?","救世观音何时公开？","救世觀音何時公開？","구세관음 공개 시기는?"),
        a: d("春期4月11日〜5月18日、秋期10月22日〜11月22日の限定公開。像内部は撮影禁止。","Spring: April 11–May 18; autumn: October 22–November 22. Photography of the statue is prohibited.","春季4月11日-5月18日、秋季10月22日-11月22日限定公开。禁止拍摄佛像。","春季4月11日-5月18日、秋季10月22日-11月22日限定公開。禁止拍攝佛像。","봄 4월 11일~5월 18일, 가을 10월 22일~11월 22일 한정 공개. 불상 촬영 금지.") },
    ],
  },

  /* ── 徳島 大鳴門橋 ── */
  "大鳴門橋": {
    desc: d(
      "大鳴門橋は鳴門海峡を跨ぐ全長1,629mの吊り橋（1985年開通）。橋の直下の遊歩道「渦の道」ではガラス床から真下45mにある渦潮を見下ろせる。橋自体の美しい曲線と海峡の組合せは絶景。",
      "The Onaruto Bridge, a 1,629 m suspension bridge (opened 1985), spans the Naruto Strait. The 'Uzu-no-Michi' walkway beneath has glass floors showing whirlpools 45 m below. The bridge's graceful curves paired with the strait make a spectacular view.",
      "大鸣门桥是跨鸣门海峡的1629米吊桥（1985年开通）。桥下步道「涡之道」玻璃地板可俯瞰45米下的漩涡。桥身曲线与海峡相映绝景。",
      "大鳴門橋是跨鳴門海峽的1629米吊橋（1985年開通）。橋下步道「渦之道」玻璃地板可俯瞰45米下的漩渦。橋身曲線與海峽相映絕景。",
      "오나루토 대교는 나루토 해협을 가로지르는 전장 1,629m 현수교(1985년 개통). 다리 바로 아래 산책로 '우즈노미치'에서는 유리 바닥을 통해 45m 아래 소용돌이를 내려다볼 수 있습니다. 다리의 아름다운 곡선과 해협의 조합이 절경."
    ),
    definition: lh(
      "大鳴門橋(おおなるときょう)は徳島県鳴門市と兵庫県南あわじ市(淡路島)を繋ぐ全長1,629m・主塔高さ144mの吊り橋で、1985年に本州四国連絡橋・神戸鳴門ルートとして開通。鳴門海峡の最も狭い部分(幅約1.3km)を一跨ぎし、橋下では世界三大潮流の一つ・直径20mに及ぶ巨大渦潮が発生します。橋の徳島側橋脚部分には全長450mの遊歩道「渦の道(うずのみち)」(1階下、海上45m)が設けられ、ガラス床から真下の渦潮を覗き込める日本でも稀有な体験施設。橋自体の優美な曲線と海峡・淡路島の組合せは瀬戸内海最高峰のドラマチックな風景です。",
      "Onaruto Bridge is a 1,629 m suspension bridge with 144 m towers connecting Naruto City in Tokushima Prefecture to Minamiawaji City in Hyogo Prefecture (Awaji Island). Opened in 1985 as part of the Honshu-Shikoku Bridge Project's Kobe-Naruto route, it spans the narrowest section of the Naruto Strait (about 1.3 km wide), beneath which whirlpools up to 20 m across — one of the world's three great tidal currents — form. On the Tokushima side, beneath the bridge, the 450 m «Uzu-no-Michi» promenade (one level down, 45 m above the sea) lets visitors look directly down through glass floors at whirlpools — a rare experience even by Japanese standards. The bridge's graceful curves combined with the strait and Awaji Island make for the Inland Sea's most dramatic scenery."
    ),
    highlights: {
      ja: [
        "大鳴門橋本体 — 全長1,629m、主塔高さ144m、優美な吊り橋曲線、淡路島側からの全景が王道",
        "渦の道(うずのみち) — 橋下の450m遊歩道、海上45m、ガラス床から渦潮を見下ろせる",
        "鳴門公園・千畳敷展望台 — 橋を間近に望む観光拠点、桜と橋の組合せが春の絶景",
        "道の駅うずしお(淡路島側) — 橋の俯瞰スポット、夕日に染まる橋と海峡のコントラスト",
        "鳴門スカイライン — 橋を望むドライブコース、複数の展望台、ブルーアワーの絶景",
      ],
      en: [
        "Onaruto Bridge itself — 1,629 m total length, 144 m towers; the elegant suspension curves are best framed from the Awaji side",
        "Uzu-no-Michi — the 450 m walkway beneath the bridge, 45 m above the sea, with glass floors offering direct views down to the whirlpools",
        "Naruto Park and Senjojiki Observatory — a viewing hub close to the bridge; cherry blossoms paired with the bridge make a stunning spring scene",
        "Michi-no-Eki Uzushio (Awaji side) — a sweeping overlook of the bridge, with sunset igniting bridge and strait in vivid contrast",
        "Naruto Skyline — a scenic drive route with multiple observatories overlooking the bridge; especially exquisite at blue hour",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "大鳴門橋とは?", a: "徳島県鳴門市と淡路島を繋ぐ全長1,629mの吊り橋で1985年開通。主塔高さ144m、世界三大潮流の鳴門海峡を跨ぎ、橋下の遊歩道「渦の道」(海上45m)からガラス床で渦潮を見下ろせる稀有な観光地です。" },
        { q: "橋の撮影ポイントは?", a: "亀老山展望台級の俯瞰なら淡路島側「道の駅うずしお」がベスト。夕日に染まる橋と海峡のコントラストが美しい。徳島側からは鳴門公園・千畳敷展望台で橋を間近に望め、桜と橋の組合せが春の絶景。" },
        { q: "渦の道のアクセスは?", a: "JR鳴門駅からバスで「鳴門公園」下車、徒歩5分。営業時間9:00〜18:00(夏季)、入場料520円。渦潮ピークは大潮の日(春・秋の新月・満月前後)、満潮/干潮前後1〜2時間が最大。" },
        { q: "車で渡る場合の通行料は?", a: "神戸淡路鳴門自動車道の一部で、淡路島南IC〜鳴門北ICで普通車1,140円(ETC割引860円)。本州からは明石海峡大橋(神戸〜淡路島)+大鳴門橋(淡路島〜徳島)の2橋連続でアクセス、本四連絡橋を一気に渡る楽しいドライブコース。バスは高速道路経由で本州〜四国を直結します。" },
        { q: "撮影機材のおすすめは?", a: "①広角(16-35mm)で橋全景と海峡②望遠70-200mmで主塔のディテール・吊り橋の幾何学美③NDフィルター(海面のスローシャッター・雲の流れ)。海風が強いため三脚は重めのものか風防ストーンで安定確保、塩害対策としてレンズ前ガラス保護フィルター推奨です。" },
        { q: "明石海峡大橋との比較は?", a: "明石海峡大橋(神戸〜淡路島、1998年開通)は世界最長級の吊り橋(中央径間1,991m)、大鳴門橋(1985年)はその先輩格で中央径間876m。両橋とも本四連絡橋公団による設計で、シャープなライン、機能美が共通。明石は超高層、大鳴門は中規模ながら「渦の道」のユニークな体験で勝る、橋好きはぜひ両方の撮影を。" },
      ],
      en: [
        { q: "What is the Onaruto Bridge?", a: "A 1,629 m suspension bridge with 144 m towers connecting Naruto in Tokushima to Awaji Island, opened in 1985. It spans the Naruto Strait — one of the world's three great tidal currents — and the «Uzu-no-Michi» walkway beneath (45 m above the sea) lets you look through a glass floor at the whirlpools below — a globally rare experience." },
        { q: "Best spot to shoot the bridge?", a: "For a sweeping overhead view, Michi-no-Eki Uzushio on Awaji side is best. The bridge and strait glowing at sunset are beautiful. From the Tokushima side, Naruto Park and Senjojiki Observatory put you close to the bridge; cherry blossoms paired with the bridge create a stunning spring scene." },
        { q: "How do I access Uzu-no-Michi?", a: "From JR Naruto Station, take a bus to «Naruto Park» and walk 5 minutes. Hours 9:00–18:00 (summer); admission ¥520. Whirlpools peak around spring tides (near new and full moons in spring and autumn), strongest about 1–2 hours before/after high or low tide." },
        { q: "Toll for crossing by car?", a: "As part of the Kobe-Awaji-Naruto Expressway, Awaji-Minami IC to Naruto-Kita IC costs ¥1,140 for standard cars (¥860 with ETC). From Honshu, drivers cross the Akashi-Kaikyo Bridge (Kobe→Awaji) then the Onaruto Bridge (Awaji→Tokushima) — a great two-bridge expressway run. Buses use the same route to link Honshu and Shikoku." },
        { q: "Recommended camera gear?", a: "①Wide angle (16–35mm) for bridge + strait grand vista ②Telephoto 70–200mm for tower details and the geometry of the suspension cables ③ND filter (slow shutter for surface and cloud motion). Sea winds are strong — bring a heavy tripod or windbreak stones. A protective lens filter helps against salt spray." },
        { q: "Comparison with the Akashi-Kaikyo Bridge?", a: "The Akashi-Kaikyo Bridge (Kobe–Awaji, opened 1998) is among the world's longest suspension bridges (central span 1,991 m). Onaruto (1985) is its predecessor, with an 876 m central span. Both share Honshu-Shikoku Bridge Authority design language — sharp lines, functional beauty. Akashi wins on scale; Onaruto wins on the unique «Uzu-no-Michi» walkway. Bridge enthusiasts should photograph both." },
      ],
    },
    faqs: [
      { q: d("橋の撮影ポイントは？","Best spot to shoot the bridge?","桥梁拍摄点？","橋樑拍攝點？","다리 촬영 포인트는?"),
        a: d("淡路島側の道の駅うずしおからの俯瞰がベスト。夕日に染まる橋と海峡のコントラストが美しい。","Michi-no-Eki Uzushio on Awaji side for the best overview. The bridge and strait glowing at sunset is beautiful.","淡路岛侧道之站涡潮俯瞰最佳，夕阳下桥与海峡对比美。","淡路島側道之站渦潮俯瞰最佳，夕陽下橋與海峽對比美。","아와지섬 쪽 '미치노에키 우즈시오'에서의 부감이 최고. 석양에 물드는 다리와 해협의 대비가 아름답습니다.") },
    ],
  },

  /* ── 福岡 ── */
  "福岡": {
    desc: d(
      "福岡市は九州最大の都市。博多・天神・中洲の繁華街、博多ラーメン・うどんの屋台文化、博多湾と福岡タワー、大濠公園の桜、糸島半島のビーチなど、現代都市と自然が近距離に共存する独特の街。",
      "Fukuoka is Kyushu's largest city. Hakata, Tenjin, and Nakasu entertainment districts; Hakata ramen and udon street-food culture; Hakata Bay with Fukuoka Tower; cherry blossoms at Ohori Park; and Itoshima Peninsula beaches — modern city and nature sit side by side here.",
      "福冈市是九州最大都市。博多、天神、中洲商圈，博多拉面与乌冬屋台文化，博多湾与福冈塔，大濠公园樱花，糸岛半岛沙滩等，现代都市与自然近距共存。",
      "福岡市是九州最大都市。博多、天神、中洲商圈，博多拉麵與烏龍屋台文化，博多灣與福岡塔，大濠公園櫻花，絲島半島沙灘等，現代都市與自然近距共存。",
      "후쿠오카시는 규슈 최대 도시. 하카타·덴진·나카스 번화가, 하카타 라멘과 우동의 포장마차 문화, 하카타만과 후쿠오카 타워, 오호리 공원의 벚꽃, 이토시마 반도의 해변 등 현대 도시와 자연이 가까이 공존하는 독특한 도시."
    ),
    definition: lh(
      "福岡(ふくおか)は九州北部・福岡県の県庁所在地で、人口約164万人の九州最大の政令指定都市。古来「博多(はかた)」と呼ばれた商業の地と、1601年に福岡藩主黒田長政が築いた「福岡」の城下町が合併して現在の福岡市となった、博多と福岡という二つの顔を持つ街。福岡空港から市街地まで地下鉄5分という日本一のアクセス、博多どんたく(5月、220万人動員の日本最大級祭り)、博多祇園山笠(7月)、中洲川端の屋台街(全国の約4割、約100軒)、太宰府天満宮、糸島半島など、コンパクトに観光資源が凝縮した九州の玄関口です。",
      "Fukuoka, capital of Fukuoka Prefecture in northern Kyushu, is the region's largest designated «government ordinance city» with about 1.64 million residents. The city formed when «Hakata» — the historic merchant district — merged with «Fukuoka,» the castle town built by feudal lord Kuroda Nagamasa in 1601, leaving the city with two distinct identities. Notable for Japan's quickest airport-to-city transit (5 minutes by subway from Fukuoka Airport), it hosts the Hakata Dontaku festival in May (drawing 2.2 million attendees, one of Japan's largest), the Hakata Gion Yamakasa in July, the Nakasu-Kawabata food-stall district (about 100 yatai — roughly 40% of all Japan's stalls), Dazaifu Tenmangu, and the Itoshima Peninsula — the gateway to Kyushu, packing tourism into a compact city."
    ),
    highlights: {
      ja: [
        "中洲屋台街 — 全国の屋台の約4割、約100軒、夜の煙と提灯の灯りは九州の象徴",
        "太宰府天満宮 — 学問の神様・菅原道真を祀る、年間1,000万人参拝、参道の梅と本殿の朱色",
        "福岡タワー(234m)・百道浜 — 博多湾とシーサイドももちのパノラマ、夕景〜夜景の名所",
        "大濠公園 — 1929年開園の都市オアシス、満開の桜(4月上旬)、池に映る逆さビル",
        "博多どんたく(5月)・博多祇園山笠(7月) — 動員数日本最大級の祭り、勢いある被写体",
      ],
      en: [
        "Nakasu Yatai District — about 40% of all yatai food stalls in Japan (~100 stalls); evening smoke and lanterns epitomize Kyushu nights",
        "Dazaifu Tenmangu — head shrine to deity-of-learning Sugawara no Michizane; 10 million worshippers annually, plums lining the approach and the vermilion main hall",
        "Fukuoka Tower (234 m) and Momochi Beach — panorama of Hakata Bay and Seaside Momochi; renowned for sunsets and nightscapes",
        "Ohori Park — opened 1929 as an urban oasis, with cherry blossoms in early April and skyscrapers reflected upside-down on the pond",
        "Hakata Dontaku (May) and Hakata Gion Yamakasa (July) — among Japan's largest festivals by attendance, energetic subjects to photograph",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "福岡とは?", a: "九州北部の県庁所在地で人口約164万人の九州最大の政令指定都市。商業の地「博多」と城下町「福岡」が合併した二つの顔を持つ街。博多どんたく・山笠、屋台街、太宰府、糸島半島まで観光資源が凝縮した九州の玄関口です。" },
        { q: "屋台撮影のマナーは?", a: "店員・客への許可が基本。食事中の人や調理場のクローズアップは一声かけてから。外観と町並みは自由に撮影可。中洲川端・天神・長浜の3エリアが屋台街、夜の風物詩を撮るなら20〜23時頃が最も活気あります。" },
        { q: "1日の撮影モデルコースは?", a: "朝:大濠公園で桜or池の朝景。昼:太宰府天満宮の参道。夕:福岡タワー(展望台)→百道浜で夕景。夜:中洲川端の屋台街。1日でほぼ網羅でき、地下鉄1日券700円が便利です。" },
        { q: "アクセスは?", a: "福岡空港から博多駅まで地下鉄空港線で5分・260円(日本一の都心アクセス)。新幹線「のぞみ」で東京から約4時間50分・23,150円、大阪から2時間半・14,750円。博多どんたく・山笠期間は宿泊予約が困難なため半年前から確保を、地下鉄1日券900円・西鉄バス1日券900円が観光に便利。" },
        { q: "ベストシーズンは?", a: "桜の3月下旬〜4月上旬(舞鶴公園・大濠公園)、博多どんたく(5/3〜4)、博多祇園山笠(7/1〜15、特に15日早朝の「追い山」が最高潮)、紅葉の11月(光明禅寺・舞鶴公園)、糸島半島は通年。冬は太宰府の梅(2月)とイルミネーションが見どころ、1年中撮影可能な被写体豊富なエリアです。" },
        { q: "夜景の撮影スポットは?", a: "①福岡タワー234m(夜景特等席、シーサイドももちと博多湾)②シーサイドももちビーチ(夕景〜ブルーアワー、福岡タワーを入れた構図)③中洲川端の屋台街(運河と提灯)④博多駅前イルミネーション(冬期12月〜2月)⑤大濠公園(街灯と池)。三脚OKだが歩行者通行に配慮、塩害対策(海近く)も必要です。" },
      ],
      en: [
        { q: "What is Fukuoka?", a: "Capital of Fukuoka Prefecture in northern Kyushu and the region's largest designated «ordinance city» with about 1.64 million residents. The city has two faces: «Hakata,» the historic merchant district, and «Fukuoka,» the castle town. Highlights include Hakata Dontaku and Yamakasa festivals, food-stall districts, Dazaifu, and the Itoshima Peninsula — Kyushu's gateway packed with tourism." },
        { q: "Yatai photography etiquette?", a: "Ask staff and customers first. Close-ups of diners or kitchen work require permission. Exteriors and streetscapes are free to shoot. The three yatai districts are Nakasu-Kawabata, Tenjin, and Nagahama — the most lively for photography is 20:00–23:00." },
        { q: "One-day photography route?", a: "Morning at Ohori Park (cherry blossoms or sunrise on the pond). Noon at Dazaifu Tenmangu. Evening at Fukuoka Tower (observation deck) → Momochi Beach for sunset. Night at the Nakasu-Kawabata yatai. Most can be covered in a day; the ¥700 subway day pass is convenient." },
        { q: "Access?", a: "From Fukuoka Airport to Hakata Station takes 5 min on the Kuko Subway Line, ¥260 — Japan's quickest airport-to-city access. Shinkansen «Nozomi» from Tokyo ~4 hr 50 min, ¥23,150; from Osaka 2.5 hr, ¥14,750. Reserve lodging 6 months ahead during Hakata Dontaku and Yamakasa. The ¥900 subway day pass and ¥900 Nishitetsu bus day pass are useful." },
        { q: "Best seasons?", a: "Cherry blossoms late March–early April (Maizuru Park, Ohori Park); Hakata Dontaku (May 3–4); Hakata Gion Yamakasa (July 1–15, especially the dawn «Oiyama» on the 15th); autumn colors in November (Komyo Zenji, Maizuru Park); Itoshima year-round. Winter brings Dazaifu plums (February) and city illuminations — Fukuoka offers diverse subjects in every season." },
        { q: "Best night photography spots?", a: "①Fukuoka Tower 234 m (premier nightscape, Seaside Momochi and Hakata Bay) ②Seaside Momochi Beach (sunset to blue hour with the tower in frame) ③Nakasu-Kawabata yatai district (canal and lanterns) ④Hakata Station illuminations (December–February) ⑤Ohori Park (streetlights and pond). Tripods OK but be considerate of pedestrians; bring salt-air protection near the sea." },
      ],
    },
    faqs: [
      { q: d("屋台撮影のマナーは？","Yatai photography etiquette?","屋台拍摄礼仪？","屋台拍攝禮儀？","포장마차 촬영 매너는?"),
        a: d("店員・客への許可が基本。食事中の人や調理場のクローズアップは一声かけてから。外観と町並みは自由。","Ask staff/customers first. Close-ups of diners or kitchen work should be after asking. Exteriors and streetscapes are free to shoot.","需向店主/客人打招呼。特写用餐者或厨房前请求许可。外观街景可自由拍摄。","需向店主/客人打招呼。特寫用餐者或廚房前請求許可。外觀街景可自由拍攝。","직원·손님에게 허락이 기본. 식사 중인 사람이나 조리장 클로즈업은 말을 건네고. 외관과 거리는 자유.") },
    ],
  },

  /* ── 山梨県 ── */
  "新倉山浅間公園": {
    desc: d(
      "新倉山浅間公園は富士吉田市の山腹にある桜の名所。398段の階段を上った先の展望デッキから、忠霊塔（五重塔）・桜・富士山を一枚に収める三段構図は世界中の写真家を魅了する日本を象徴する眺望。4月中旬の桜と冬の冠雪富士のコントラストは別格。",
      "Arakurayama Sengen Park, on a hillside in Fujiyoshida, is a celebrated cherry-blossom spot. After climbing 398 steps to the viewing deck, the Chureito Pagoda, cherry blossoms, and Mt. Fuji align in a single iconic three-tier frame that draws photographers worldwide. The contrast between the mid-April blooms and snow-capped Fuji is unmatched.",
      "新仓山浅间公园位于富士吉田市山腰，是樱花名所。登398级台阶后的观景台可将忠灵塔（五重塔）、樱花与富士山三段同框，是吸引全球摄影师的日本象征性景观。4月中旬樱花与雪富士的对比尤为震撼。",
      "新倉山淺間公園位於富士吉田市山腰，是櫻花名所。登398級台階後的觀景台可將忠靈塔（五重塔）、櫻花與富士山三段同框，是吸引全球攝影師的日本象徵性景觀。4月中旬櫻花與雪富士的對比尤為震撼。",
      "아라쿠라야마 센겐 공원은 후지요시다시 산 중턱의 벚꽃 명소. 398계단을 오르면 추레이토(5층탑)·벚꽃·후지산이 한 프레임에 담기는 3단 구도가 세계 사진가들을 매료시키는 일본의 상징적 풍경. 4월 중순 벚꽃과 설관 후지의 대비는 압권."
    ),
    definition: lh(
      "新倉山浅間公園(あらくらやませんげんこうえん)は山梨県富士吉田市の新倉山(標高約650m)中腹にある公園で、705年創建の新倉富士浅間神社の境内地に整備された桜の名所。中心となる「忠霊塔(ちゅうれいとう)」は1962年に第一次・第二次世界大戦戦没者慰霊のために建立された朱塗りの五重塔(高さ19.5m)で、神社境内から398段の急な階段を上った先の展望デッキから、忠霊塔・約650本のソメイヨシノ・富士山を一枚に収める「三段構図」は世界中の写真家とインバウンド観光客が憧れる日本を象徴する撮影地。海外で「富士山と桜と五重塔の写真」と言えば必ずこの場所、台湾・タイ・欧米のSNSで爆発的に拡散されました。",
      "Arakurayama Sengen Park stands on the mid-slope of Mt. Arakura (about 650 m) in Fujiyoshida City, Yamanashi Prefecture, on the precincts of the Niikura Fuji Sengen Shrine, founded in 705. The centerpiece is the «Chureito Pagoda» — a 19.5 m vermilion five-story tower built in 1962 to honor the war dead of World Wars I and II. From the shrine grounds, climbing 398 steep steps brings you to the viewing deck, where the pagoda, about 650 Yoshino cherry trees, and Mt. Fuji align in the world-famous «three-tier composition.» When the phrase «Mt. Fuji with cherry blossoms and a pagoda» appears anywhere in international media, it almost always points to this spot — explosively shared across social media in Taiwan, Thailand, and the West, drawing global photographers and inbound visitors."
    ),
    highlights: {
      ja: [
        "三段構図(忠霊塔・桜・富士山) — 4月中旬桜満開時、忠霊塔と約650本のソメイヨシノと冠雪富士が一枚に",
        "忠霊塔(五重塔) — 1962年建立の朱塗り五重塔(高さ19.5m)、第一次・第二次世界大戦戦没者慰霊塔",
        "398段の階段 — 神社境内から展望デッキへの急な階段、混雑期は登り順番待ち、迂回坂道もあり",
        "夜明けの朝焼け富士 — 日の出前30分のマジックアワー、空が紫〜オレンジに染まる絶景、4月の早朝は寒い",
        "新倉富士浅間神社 — 705年創建の古社、富士信仰の聖地、本殿前から望む富士山も絶景",
      ],
      en: [
        "The three-tier composition (Pagoda + Cherry Blossoms + Mt. Fuji) — at peak bloom in mid-April, the pagoda, about 650 Yoshino cherry trees, and snow-capped Fuji align perfectly",
        "Chureito Pagoda — a 19.5 m vermilion five-story tower built in 1962 to honor the dead of World Wars I and II",
        "The 398 steps — a steep climb from the shrine grounds to the viewing deck; expect queues during peak season, with a gentler slope path also available",
        "Pre-dawn pink-purple Fuji — the magic hour 30 minutes before sunrise turns the sky purple to orange; April mornings are cold but unforgettable",
        "Niikura Fuji Sengen Shrine — founded in 705, a sacred site of Fuji worship; the view of Mt. Fuji from before the main hall is itself spectacular",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "新倉山浅間公園とは?", a: "山梨県富士吉田市の新倉山中腹の桜の名所で、忠霊塔(1962年建立、高さ19.5mの朱塗り五重塔)・約650本の桜・富士山が一枚に収まる「三段構図」が世界中の写真家に愛される日本を象徴する撮影地です。" },
        { q: "桜のベスト時期は?", a: "例年4月上旬〜中旬がピーク、特に4月10〜15日前後の満開時が王道。寒の戻りや春の温暖差で年により2週間ずれることも。富士吉田市公式サイトの開花情報を確認、夜明け直後の朝焼け富士が理想。" },
        { q: "展望デッキへの行き方は?", a: "富士急行線「下吉田駅」から徒歩約10分。神社境内から398段の階段を上る(高齢者向けに迂回坂道あり)。混雑期は階段下に長蛇の列、早朝5〜6時着が必須。新宿から特急で約2時間。" },
        { q: "桜以外のベストシーズンは?", a: "雪化粧した富士山+忠霊塔は12〜2月の冬期、桜より少ない人出でも富士の存在感は最大。秋(11月)は紅葉と忠霊塔、夕暮れ時のオレンジ色の富士+塔も美しい。新緑(5月)も新緑の柔らかい色が忠霊塔の朱と対比。富士山は四季それぞれの美しさあり。" },
        { q: "三脚使用は?", a: "展望デッキは混雑時三脚禁止のことあり、桜期は特に注意。デッキ手前の階段途中の踊り場や、神社境内からの構図はOK。場所取りは早朝の暗い時間帯から行われる、5時前到着が確実。三脚スパイクは桜の根を傷めないよう樹木付近では使用回避。" },
        { q: "周辺の連続観光は?", a: "①新倉山浅間公園(早朝・桜+富士)②忍野八海(車30分、湧水と富士)③河口湖(車20分、逆さ富士)④富士山五合目(車1時間、夏期のみ)⑤吉田うどん本店巡り(地元グルメ)。1日コースで富士周辺の絶景を網羅できます、桜期は中央道渋滞回避のため早朝出発推奨。" },
      ],
      en: [
        { q: "What is Arakurayama Sengen Park?", a: "A cherry blossom site on the mid-slope of Mt. Arakura in Fujiyoshida City, Yamanashi. The Chureito Pagoda (built 1962, a 19.5 m vermilion five-story tower), about 650 cherry trees, and Mt. Fuji align in a «three-tier composition» beloved by photographers worldwide as an icon of Japan." },
        { q: "When are cherry blossoms at their best?", a: "Typically peak from early to mid-April, especially around April 10–15 at full bloom. Cold-weather returns or warm springs can shift bloom by up to two weeks. Check Fujiyoshida City's official forecast; the magic moment is just-before-sunrise pink-Fuji." },
        { q: "How do I reach the viewing deck?", a: "From Shimo-Yoshida Station on the Fuji Kyuko Line, 10 minutes on foot. From the shrine grounds, climb 398 steep steps (a gentler bypass slope is available for seniors). During peak season, the queue at the foot of the stairs is long — arrive at 5–6 AM. About 2 hours from Shinjuku by limited express." },
        { q: "Best seasons besides cherry blossoms?", a: "Snow-capped Fuji with the Chureito Pagoda in December–February has fewer crowds and Fuji at its most commanding. November autumn foliage and a sunset orange-Fuji-and-pagoda are also magnificent. May's fresh greenery contrasts with the pagoda's vermilion. Fuji has four-season beauty here." },
        { q: "Are tripods allowed?", a: "Tripods are sometimes restricted on the viewing deck during crowds, especially cherry season. Compositions from the steps' platform partway up or from the shrine grounds are fine. Spots fill up well before dawn — arrive before 5 AM to be sure. Avoid using tripod spikes near tree roots." },
        { q: "Combined sightseeing route?", a: "①Arakurayama Sengen Park (early morning, cherry+Fuji) ②Oshino Hakkai (30 min by car, springs+Fuji) ③Lake Kawaguchi (20 min by car, inverted Fuji) ④Fuji 5th Station (1 hr by car, summer only) ⑤Yoshida udon shop tour. A full-day route covers Fuji's classic vistas. During cherry season, leave early to beat Chuo Expressway traffic." },
      ],
    },
    faqs: [
      { q: d("展望デッキへの行き方は？","How do I reach the viewing deck?","观景台怎么去？","觀景台怎麼去？","전망 데크 가는 법은?"),
        a: d("富士急行線「下吉田駅」から徒歩約10分。神社境内から398段の階段を上る（迂回坂道もあり）。早朝5〜6時着が空いていて朝焼け富士に間に合う。","From «Shimo-Yoshida» on the Fujikyu Line, about 10 min on foot. From the shrine grounds, climb the 398 steps (a gentler slope path is also available). Arrive at 5-6 AM to beat the crowds and catch the sunrise on Fuji.","富士急行线「下吉田站」步行约10分钟。从神社境内登398级台阶（也有缓坡可绕行）。清晨5-6点抵达可避开人潮并赶上朝阳富士。","富士急行線「下吉田站」步行約10分鐘。從神社境內登398級台階（也有緩坡可繞行）。清晨5-6點抵達可避開人潮並趕上朝陽富士。","후지큐 행 「시모요시다역」에서 도보 약 10분. 신사 경내에서 398계단을 올라갑니다(완만한 우회로도 있음). 이른 아침 5-6시 도착이 한산하고 아침놀 후지를 볼 수 있습니다.") },
    ],
  },
  "河口湖": {
    desc: d(
      "河口湖は富士五湖のひとつで、富士山の北麓に広がる湖。湖面に映る「逆さ富士」の代表的な撮影地として知られ、春の桜（産屋ヶ崎・八木崎公園）、夏の花火、秋の紅葉回廊、冬の冠雪富士と四季を通じて表情豊か。湖畔は宿泊・温泉・カフェも充実。",
      "Lake Kawaguchi is one of the Fuji Five Lakes, set at the northern foot of Mt. Fuji. It is the most famous spot for the «inverted Fuji» mirror reflection, with cherry blossoms at Ubuyagasaki and Yagisaki Park in spring, fireworks in summer, an autumn maple corridor, and snow-capped Fuji in winter. The shore offers ample lodging, hot springs, and cafés.",
      "河口湖是富士五湖之一，位于富士山北麓。以湖面倒映的「逆富士」闻名于世，春有产屋崎与八木崎公园樱花、夏有花火大会、秋有红叶回廊、冬有雪冠富士，四季皆美。湖畔住宿、温泉、咖啡馆齐全。",
      "河口湖是富士五湖之一，位於富士山北麓。以湖面倒映的「逆富士」聞名於世，春有產屋崎與八木崎公園櫻花、夏有花火大會、秋有紅葉迴廊、冬有雪冠富士，四季皆美。湖畔住宿、溫泉、咖啡館齊全。",
      "가와구치호는 후지 5호의 하나로 후지산 북쪽 기슭에 펼쳐진 호수. 호수면에 비친 「역 후지」 촬영지로 가장 유명하며, 봄에는 우부야가사키·야기사키 공원의 벚꽃, 여름에는 불꽃놀이, 가을에는 단풍 회랑, 겨울에는 설관 후지로 사계절 모두 아름답습니다. 호반은 숙박·온천·카페가 충실."
    ),
    definition: lh(
      "河口湖(かわぐちこ)は山梨県南都留郡富士河口湖町、富士山の北麓に広がる富士五湖の一つで、面積5.7km²・最大水深15m・湖面標高833mの堰止湖。約1,200万年前の富士山(1707年最後の噴火)の溶岩流によって形成された湖で、湖の中央に「鵜の島」(うのしま、富士五湖唯一の島)が浮かびます。湖面に映る「逆さ富士」の代表的な撮影地として世界的に有名で、特に湖北岸の大石公園・産屋ヶ崎・八木崎公園からの構図は世界中で複製される日本の象徴的風景。春の桜、夏の紅葉花火大会(8月)、秋の紅葉回廊、冬の冠雪富士と四季を通じて表情豊か、富士急行河口湖駅周辺は宿泊・温泉・カフェも充実しています。",
      "Lake Kawaguchi is a barrier lake at the northern foot of Mt. Fuji in Fujikawaguchiko Town, Yamanashi Prefecture — one of the Fuji Five Lakes (5.7 km², up to 15 m deep, surface 833 m above sea level). Formed by lava flows from Mt. Fuji's eruptions over the last 12 million years (the most recent in 1707), it is the only one of the Five Lakes to host an island, Uno-shima, at its center. As the most famous spot for the «inverted Fuji» mirror reflection, the views from Oishi Park, Ubuyagasaki, and Yagisaki Park on the northern shore have been replicated worldwide as iconic Japanese imagery. With spring cherry blossoms, the Kojo Festival fireworks of August, an autumn maple corridor, and snow-capped Fuji in winter, it changes with the seasons; the Fujikyu Kawaguchiko Station area offers ample lodging, hot springs, and cafés."
    ),
    highlights: {
      ja: [
        "逆さ富士 — 風がない朝6〜8時の鏡面状態が条件、湖北の大石公園・産屋ヶ崎が定番",
        "大石公園 — 北岸の人気撮影地、ラベンダー(7月)・コキア(秋紅葉)と富士山の組合せ",
        "もみじ回廊(11月) — 北岸の紅葉トンネル、夜のライトアップと冠雪富士の絶景",
        "湖北の桜並木(4月) — 産屋ヶ崎・八木崎公園、桜と富士山の三段構図",
        "冬の冠雪富士 — 12〜2月、空気が澄む早朝、湖面の透明度も最高",
      ],
      en: [
        "Inverted Fuji — requires a windless mirror surface at dawn (6–8 AM); Oishi Park and Ubuyagasaki on the northern shore are the classics",
        "Oishi Park — the most popular north-shore spot, with lavender (July) and kochia (autumn red) paired with Mt. Fuji",
        "Momiji Corridor (November) — the autumn maple tunnel on the north shore; evening illumination paired with snow-capped Fuji",
        "Cherry-Lined North Shore (April) — Ubuyagasaki and Yagisaki Park, with blossoms framing Mt. Fuji",
        "Snow-Capped Fuji in Winter — December–February, with the clearest air at dawn and peak lake transparency",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "河口湖とは?", a: "山梨県の富士五湖の一つで、富士山北麓に広がる面積5.7km²の堰止湖。湖面に映る「逆さ富士」の代表的撮影地として世界的に有名、春の桜、夏の花火、秋の紅葉、冬の冠雪富士と四季を通じて表情豊かで、富士山ビューの聖地です。" },
        { q: "逆さ富士を撮るベストポイントは?", a: "湖北の大石公園・産屋ヶ崎が定番。風がない朝6〜8時の鏡面状態を狙う。冬は空気が澄み透明度が最高、月に数日の絶好条件。富士急行河口湖駅から大石公園まで車で15分、レンタカー推奨です。" },
        { q: "ベストシーズンは?", a: "桜と富士の4月上旬、新緑の5月、ラベンダーと富士の7月、紅葉と富士の11月、冠雪富士の12〜2月。逆さ富士は風が穏やかな冬〜春が最も成功率高、夜の星空と富士の組合せは新月の冬が絶景。" },
        { q: "アクセスは?", a: "新宿バスタから高速バスで河口湖駅まで約2時間・2,200円。電車はJR大月駅で富士急行線に乗換え、約3時間・3,500円。レンタカー(富士急行河口湖駅前で借りられる)が湖周辺の機動性に最適。週末の中央道は渋滞、特に紅葉期(11月)・桜期(4月)は早朝出発を。" },
        { q: "おすすめ宿泊施設は?", a: "ハイクラス:「富士ビューホテル」(湖畔・1泊25,000円〜、館内露天風呂から富士)、「秀峰閣 湖月」(全室富士山ビュー)。中価格帯:「サニーデビレッジ」「湖楽おんやど富士吟景」(両方20,000円程度)。リーズナブル:「Hotel Mt. Fuji」「ベスト・ウェスタン」(8,000円〜)。撮影地ベストアクセス重視なら大石公園周辺。" },
        { q: "湖でのアクティビティは?", a: "①遊覧船「アンソレイユ号」(20分、1,000円、湖上から富士を眺める)②ロープウェイ「天上山公園」(山頂から逆さ富士+市街)③カヤック・SUP(夏期、湖中央から360度の富士)④ワカサギ釣り(冬期、屋形船から)。撮影と組合せて1日中楽しめます。" },
      ],
      en: [
        { q: "What is Lake Kawaguchi?", a: "One of Yamanashi's Fuji Five Lakes — a barrier lake of 5.7 km² spreading at the northern foot of Mt. Fuji. As the most famous spot for the «inverted Fuji» reflection, it is globally renowned, varying its faces season by season — cherry blossoms, fireworks, autumn colors, and snow-capped Fuji — the sacred ground for Mt. Fuji photography." },
        { q: "Best spot for the inverted Fuji reflection?", a: "Oishi Park and Ubuyagasaki on the northern shore are classics. Aim for windless mornings 6–8 AM when the lake mirrors. Winter offers the clearest air and best transparency — ideal conditions occur a few times a month. From Fujikyu Kawaguchiko Station, Oishi Park is 15 minutes by car — a rental car is recommended." },
        { q: "Best season?", a: "Cherry blossoms with Fuji in early April, fresh greenery in May, lavender with Fuji in July, autumn colors with Fuji in November, snow-capped Fuji December–February. The inverted Fuji has the highest success rate in calm winter-to-spring weather; the night Milky Way with Fuji at the new moon in winter is sublime." },
        { q: "How do I get there?", a: "From Shinjuku Bus Terminal, ~2 hr to Kawaguchiko Station, ¥2,200. By train: JR Otsuki Station, transfer to Fujikyu Line, ~3 hr, ¥3,500. A rental car (available at Kawaguchiko Station) gives the best mobility around the lake. Weekend Chuo Expressway traffic is heavy — leave very early during cherry (April) or autumn (November) seasons." },
        { q: "Recommended lodging?", a: "High-end: Fuji View Hotel (lakeside, from ¥25,000/night, indoor open-air bath with Fuji), Shuhokaku Kogetsu (all rooms with Fuji view). Mid-range: Sunny Day Village, Korakuen Onyado Fujiginkei (~¥20,000). Budget: Hotel Mt. Fuji, Best Western (from ¥8,000). For best photography access, stay around Oishi Park." },
        { q: "Lake activities?", a: "①Sightseeing boat «Ansoleil» (20 min, ¥1,000, Fuji from the water) ②Mt. Tenjo Ropeway (top-of-mountain inverted Fuji + townscape) ③Kayaking/SUP (summer, 360° Fuji from lake center) ④Smelt fishing (winter, from a houseboat). Combine with photography for a full day." },
      ],
    },
    faqs: [
      { q: d("逆さ富士を撮るベストポイントは？","Best spot for the inverted Fuji reflection?","拍逆富士最佳点？","拍逆富士最佳點？","역 후지 촬영 최고 포인트는?"),
        a: d("湖北の大石公園・産屋ヶ崎が定番。風がない朝6〜8時の鏡面状態を狙う。冬は空気が澄み透明度が最高。","Oishi Park and Ubuyagasaki on the northern shore are classics. Aim for windless mornings 6-8 AM when the lake mirrors. Winter offers the clearest air and best transparency.","湖北大石公园、产屋崎为经典。无风的清晨6-8点湖面呈镜面。冬季空气通透度最佳。","湖北大石公園、產屋崎為經典。無風的清晨6-8點湖面呈鏡面。冬季空氣通透度最佳。","호수 북쪽 오이시 공원과 우부야가사키가 정석. 바람 없는 오전 6-8시 거울처럼 잔잔한 호수면을 노리세요. 겨울이 공기가 맑아 투명도가 가장 좋습니다.") },
    ],
  },

  /* ── 長野県 ── */
  "松本城": {
    desc: d(
      "松本城は長野県松本市にある国宝・現存12天守の一つ。漆黒の壁から「烏城」とも呼ばれる五重六階の天守は、戦国期の威容を今に伝える。背後にそびえる北アルプスの白い稜線、内堀の水鏡、桜・新緑・紅葉・雪と四季それぞれの表情が美しい。",
      "Matsumoto Castle in Nagano City is a National Treasure and one of Japan's 12 surviving original keeps. Its jet-black walls have earned the nickname «Crow Castle.» The five-tier, six-story keep evokes Sengoku-era grandeur. The white ridges of the Northern Alps behind it, mirror-still inner moat, and cherry blossoms / fresh greens / autumn leaves / snow give it four-season beauty.",
      "松本城位于长野县松本市，国宝、现存12天守之一。漆黑墙壁让其也被称为「乌城」。五重六阶天守再现战国时代雄姿。背靠北阿尔卑斯雪岭，内护城河水镜与樱花、新绿、红叶、雪景四季各异。",
      "松本城位於長野縣松本市，國寶、現存12天守之一。漆黑牆壁讓其也被稱為「烏城」。五重六階天守再現戰國時代雄姿。背靠北阿爾卑斯雪嶺，內護城河水鏡與櫻花、新綠、紅葉、雪景四季各異。",
      "마쓰모토성은 나가노현 마쓰모토시의 국보·현존 12천수 중 하나. 칠흑의 벽에서 「까마귀성」이라고도 불립니다. 5중 6층 천수는 센고쿠 시대의 위용을 전합니다. 뒤쪽으로 우뚝 솟은 북알프스의 흰 능선, 내해자의 거울 같은 수면, 벚꽃·신록·단풍·눈 등 사계절 모두 아름답습니다."
    ),
    definition: lh(
      "松本城(まつもとじょう)は長野県松本市丸の内4-1にある平城で、現存12天守の中で最も古い1593〜1594年(文禄2〜3年)に石川数正・康長親子が建造した五重六階の大天守を持つ国宝。2015年の解体修理を経た現在も創建当時の姿を留め、漆黒の下見板張りと白漆喰のコントラストから「烏城(からすじょう)」とも呼ばれます(姫路城の「白鷺城」と対比)。日本の城で天守が国宝に指定されているのは姫路城・松本城・犬山城・彦根城・松江城の5城のみ。背後にそびえる北アルプスの白い稜線、内堀の水鏡、桜(4月中旬)・新緑・紅葉・雪と四季それぞれの表情が、松本市の象徴として愛されています。",
      "Matsumoto Castle, located at 4-1 Marunouchi, Matsumoto City, Nagano Prefecture, is a flatland castle whose great keep — built in 1593–1594 (Bunroku 2–3) by Ishikawa Kazumasa and his son Yasunaga — is the oldest of Japan's 12 surviving original tenshu and a National Treasure. Even after the 2015 restoration, it retains its founding form. Its black lacquered weatherboards and white plaster create the contrast that earned it the nickname «Crow Castle» (in opposition to Himeji's «White Heron Castle»). Only five Japanese castle keeps are designated National Treasures — Himeji, Matsumoto, Inuyama, Hikone, and Matsue — and Matsumoto's combination with the white ridges of the Northern Alps behind it, the mirror-still inner moat, and four-season changes (cherry blossoms in mid-April, fresh greens, autumn leaves, and snow) makes it the city's beloved symbol."
    ),
    highlights: {
      ja: [
        "国宝大天守 — 1593〜94年築、現存12天守の最古、五重六階、漆黒の壁が特徴の「烏城」",
        "内堀と埋橋(うずみばし) — 北西側の朱色の橋と天守の構図、桜の4月中旬は王道",
        "北アルプスの借景 — 天守背後の白い稜線、特に4月の冠雪と桜が織りなす絶景",
        "夜のライトアップ — 通年実施(日没〜22時)、ブルーアワーと黒い天守のコントラスト",
        "本丸庭園 — 牡丹・藤・蓮など季節の花、城内見学コースの庭園美",
      ],
      en: [
        "Great Keep (National Treasure) — built 1593–94, the oldest of Japan's 12 surviving originals; its black walls earn the «Crow Castle» nickname",
        "Inner Moat and Uzumi Bridge — the vermilion bridge on the northwest side framing the keep; mid-April cherry blossoms are the canonical composition",
        "Northern Alps Borrowed Backdrop — the white ridges behind the keep, especially stunning paired with cherry blossoms in April",
        "Evening Illumination — year-round from sunset to 22:00; the blue hour against the black keep is striking",
        "Honmaru Garden — seasonal flowers (peonies, wisteria, lotus) within the castle tour route",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "松本城とは?", a: "長野県松本市の平城で、1593〜94年築の現存12天守の最古。漆黒の下見板張りと白漆喰のコントラストから「烏城」と呼ばれ、国宝。日本で天守が国宝の5城の一つ、北アルプスを借景に四季それぞれの絶景を見せる撮影地です。" },
        { q: "天守と桜・北アルプスを一枚に撮るには?", a: "内堀北西側の埋橋(うずみばし)周辺がベスト。望遠で天守と稜線を圧縮し、桜(4月中旬)を前ボケに。早朝は逆光が柔らかい、夜のライトアップは黒い天守と空のコントラストが幻想的。" },
        { q: "アクセスとベストシーズンは?", a: "JR松本駅から徒歩15分または周遊バスで5分。桜の4月中旬、新緑の5月、紅葉の10月下旬〜11月中旬、雪の松本城は年に数回のレア構図。早朝6時開門時が人少なく光柔らか、夜のライトアップは22時まで。" },
        { q: "天守内部の入場料・営業時間は?", a: "天守入場700円(小中学生300円)、9:00〜17:00(8月のみ18:00まで)。年末年始のみ休館。本丸広場・公園内は無料・24時間開放、夜のライトアップ撮影は外側からアプローチ。混雑期(桜・夏期)は入場待ち1〜2時間あり、早朝開門前到着が確実です。" },
        { q: "周辺の観光連携は?", a: "①松本城(早朝〜午前)②中町通り・縄手通り(古い蔵造りと商店街、徒歩10分)③松本市美術館(草間彌生作品)④旧開智学校(明治洋館)⑤上高地・乗鞍高原(車1〜2時間)。1日コースで国宝・町並み・芸術を巡るほか、上高地と組合せれば北アルプス絶景まで網羅可能です。" },
        { q: "夜景撮影のコツは?", a: "天守ライトアップは日没〜22時通年実施。撮影は内堀対岸(東側)からの順光、または埋橋近くから天守側面構図が定番。三脚必須、ISO400・F8・10〜30秒。冬は氷点下になるためカメラの結露対策(ビニール袋)・防寒具・予備バッテリー必携。本丸広場は夜間立入禁止のため公園内のみ。" },
      ],
      en: [
        { q: "What is Matsumoto Castle?", a: "A flatland castle in Matsumoto City, Nagano Prefecture, with the oldest of Japan's 12 surviving original keeps (built 1593–94). The contrast of black lacquered weatherboards with white plaster earned it the nickname «Crow Castle.» As one of only five National Treasure keeps in Japan, with the Northern Alps as backdrop, it offers seasonal masterpieces year-round." },
        { q: "How to frame the keep with cherry blossoms and the Alps?", a: "Around Uzumi Bridge on the northwest side of the inner moat is best. Use a telephoto to compress the keep and Alps ridges, with mid-April cherry blossoms as foreground bokeh. Early morning offers softer backlight; the evening illumination dramatizes the black keep against the sky." },
        { q: "Access and best season?", a: "From JR Matsumoto Station, 15 minutes on foot or 5 minutes by loop bus. Cherry blossoms mid-April, fresh greenery in May, autumn colors late October to mid-November, and rare winter snow shots. Arrive at the 6 AM opening for thin crowds and soft light; evening illumination runs until 22:00." },
        { q: "Keep admission and hours?", a: "Keep entry ¥700 (¥300 elementary/middle school). 9:00–17:00 (until 18:00 in August). Closed only at year-end. Honmaru plaza and the park are free and open 24/7 — night illumination is shot from outside. During peak seasons (cherry, summer), entry waits run 1–2 hours — arrive before opening." },
        { q: "Combined sightseeing?", a: "①Matsumoto Castle (early morning) ②Nakamachi-dori and Nawate-dori (old kura-style storehouses and shopping streets, 10-min walk) ③Matsumoto City Museum of Art (Yayoi Kusama works) ④Old Kaichi School (Meiji-era Western-style building) ⑤Kamikochi/Norikura Plateau (1–2 hr by car). A full day covers National Treasure, townscape, and art; pair with Kamikochi for Northern Alps panoramas too." },
        { q: "Night photography tips?", a: "Keep illumination runs sunset–22:00 year-round. Shoot from across the inner moat (east side) for front light, or from near Uzumi Bridge for side composition. Tripod essential; ISO 400, f/8, 10–30s. Winter brings sub-zero temps — bring condensation prevention (plastic bag), warm clothes, spare batteries. Honmaru plaza closes at night; only park-area shooting." },
      ],
    },
    faqs: [
      { q: d("天守と桜・北アルプスを一枚に撮るには？","How to frame the keep with cherry blossoms and the Alps?","如何同框天守、樱花与北阿尔卑斯？","如何同框天守、櫻花與北阿爾卑斯？","천수와 벚꽃·북알프스를 한 프레임에?"),
        a: d("内堀北西側の埋橋（うずみばし）周辺がベスト。望遠で天守と稜線を圧縮し、桜（4月中旬）を前ボケに。早朝は逆光が柔らかい。","Around Uzumi Bridge on the northwest side of the inner moat is best. Use a telephoto to compress the keep and Alps ridges, with mid-April cherry blossoms as foreground bokeh. Early morning offers softer backlight.","内护城河西北埋桥周边最佳。用长焦压缩天守与雪岭，4月中旬樱花作前景虚化。清晨逆光柔和。","內護城河西北埋橋周邊最佳。用長焦壓縮天守與雪嶺，4月中旬櫻花作前景虛化。清晨逆光柔和。","내해자 북서쪽 우즈미바시 주변이 최고. 망원으로 천수와 알프스 능선을 압축하고 4월 중순 벚꽃을 전경 보케로. 이른 아침의 부드러운 역광이 좋습니다.") },
    ],
  },
  "高遠城址公園": {
    desc: d(
      "高遠城址公園は伊那市高遠町、武田氏ゆかりの古城跡。固有種「タカトオコヒガンザクラ」約1500本が4月上〜中旬に淡紅色に染まり、「天下第一の桜」と称される。日本さくら名所100選・三大桜の名所の一つ。夜のライトアップ「さくら祭り」は幻想的で、中央アルプスを背景にした絶景が広がる。",
      "Takato Castle Park in Ina City sits on the ruins of a castle once held by the Takeda clan. About 1,500 endemic «Takato Kohigan» cherry trees bloom soft pink in early-to-mid April, earning the title «No.1 cherry blossoms under heaven.» It is one of Japan's three great cherry sites and listed in the 100 Best Sakura Spots. Evening illumination during the «Sakura Festival» is dreamlike, with the Central Alps as backdrop.",
      "高远城址公园位于伊那市高远町，武田氏旧城遗迹。约1500棵特有「高远小彼岸樱」于4月上中旬染成淡粉色，被誉为「天下第一樱」。日本樱花名所100选、三大樱花胜地之一。夜间「樱花祭」灯光秀梦幻，中央阿尔卑斯为背景的绝景令人沉醉。",
      "高遠城址公園位於伊那市高遠町，武田氏舊城遺跡。約1500棵特有「高遠小彼岸櫻」於4月上中旬染成淡粉色，被譽為「天下第一櫻」。日本櫻花名所100選、三大櫻花勝地之一。夜間「櫻花祭」燈光秀夢幻，中央阿爾卑斯為背景的絕景令人沉醉。",
      "다카토 성지 공원은 이나시 다카토마치의 다케다씨 옛 성터. 고유종 「다카토 고히간자쿠라」 약 1500그루가 4월 상-중순 연분홍빛으로 물들어 「천하제일 벚꽃」이라 불립니다. 일본 벚꽃 명소 100선·3대 벚꽃 명소 중 하나. 밤의 「벚꽃 축제」 조명은 환상적이며, 중앙알프스를 배경으로 한 절경이 펼쳐집니다."
    ),
    definition: lh(
      "高遠城址公園(たかとうじょうしこうえん)は長野県伊那市高遠町、戦国時代の武田信玄ゆかりの古城・高遠城跡を整備した公園で、城跡指定面積14ヘクタール。1547年に武田信玄が築城、1582年武田勝頼の時代に織田信長の侵攻で落城した歴史を持ち、現在は約1,500本の固有種「タカトオコヒガンザクラ(高遠小彼岸桜)」が4月上〜中旬に淡紅色に染まり「天下第一の桜」と称されます。「日本さくら名所100選」、青森県弘前公園・奈良県吉野山と並ぶ「日本三大桜の名所」。夜のライトアップ「さくら祭り」は幻想的で、中央アルプスを背景にした絶景が広がる、長野県を代表する春の撮影地です。",
      "Takato Castle Park, in Takato-machi, Ina City, Nagano Prefecture, occupies the 14-hectare ruins of Takato Castle — a Sengoku-era fortress with ties to warlord Takeda Shingen. Built by Shingen in 1547, it fell in 1582 during Oda Nobunaga's invasion under Takeda Katsuyori. Today, about 1,500 endemic Takato Kohigan cherry trees bloom soft pink in early to mid-April, earning the title «No.1 cherry blossoms under heaven.» The park is selected for Japan's «Top 100 Cherry Blossom Sites» and ranked alongside Hirosaki Park (Aomori) and Mt. Yoshino (Nara) as one of Japan's «Three Great Cherry Blossom Sites.» Evening illumination during the «Sakura Festival» is dreamlike, and with the Central Alps as backdrop, the park stands as Nagano's representative spring photography destination."
    ),
    highlights: {
      ja: [
        "タカトオコヒガンザクラ — 高遠原産の固有種、約1,500本、淡紅色の小ぶりな花、満開時は雲のような姿",
        "桜雲橋(おううんきょう) — 公園の象徴的赤い橋、桜と橋の組合せが撮影定番",
        "中央アルプスの借景 — 西駒ケ岳(2,956m)・木曽駒ケ岳の白い稜線、桜越しの絶景",
        "夜のライトアップ — さくら祭り期間、ぼんぼり1,000個の暖色光、青の時間帯が幻想的",
        "高遠閣(こうえんかく) — 1936年築の木造2階建て休憩所、レトロな建築と桜の組合せ",
      ],
      en: [
        "Takato Kohigan Cherry — endemic to Takato; about 1,500 trees, smaller pale-pink blooms forming a cloud-like canopy at peak",
        "Oun Bridge — the park's iconic red bridge; the bridge with cherry blossoms is the canonical shot",
        "Central Alps backdrop — the white ridges of Nishi-Komagatake (2,956 m) and Kiso-Komagatake; spectacular through the cherry blossoms",
        "Evening Illumination — during the Sakura Festival, about 1,000 warm-toned bonbori lanterns make the blue hour magical",
        "Koen-kaku — a 1936 two-story wooden rest house; the retro architecture pairs beautifully with the cherry blossoms",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "高遠城址公園とは?", a: "長野県伊那市の武田信玄ゆかりの古城跡公園で、固有種「タカトオコヒガンザクラ」約1,500本が「天下第一の桜」と称される。日本さくら名所100選・三大桜の名所の一つで、中央アルプスを背景にした絶景は長野県を代表する春の撮影地です。" },
        { q: "高遠の桜のベスト撮影時間は?", a: "早朝6時前の青い光と人がいない時間帯が王道。午後はライトアップ前の夕方〜青の時間帯が華やかで、夜は提灯の暖色光と桜の対比が美しい。混雑回避は平日早朝が必須です。" },
        { q: "アクセスとベスト時期は?", a: "JR伊那市駅からバスで25分、または高遠駅(JR高遠駅)から徒歩15分。例年4月上旬〜中旬がピークで「天下第一の桜」と称されます。早朝の薄明〜日の出が逆光柔らかく狙い目、混雑回避は平日早朝です。" },
        { q: "入園料・営業時間は?", a: "桜まつり期間(4月上〜中旬)のみ有料・大人500円・小中学生250円(JAF・観光協会割引あり)。期間外は無料・常時開放。営業時間は8:00〜21:00(ライトアップは18:00〜)。混雑期は近隣の駐車場満車になるためバス利用を推奨、シャトルバスも運行されます。" },
        { q: "三脚使用と撮影マナーは?", a: "公園内は三脚OKだが、混雑時の通路占有は禁止。商用利用は事前申請。桜の枝に触れる、踏み込み立入禁止区域に入るのは厳禁。早朝6時前は照明が暗いためライト撮影禁止区域あり、係員の指示に従う。ドローンは桜の保全のため全面禁止です。" },
        { q: "周辺の観光連携は?", a: "①高遠城址公園(早朝〜午前、桜)②勝間薬師堂(車5分、樹齢400年の枝垂れ桜)③信州高遠美術館(車5分、地元画家の作品)④杖突峠(車30分、伊那谷の俯瞰絶景)⑤駒つなぎの桜(車1時間、樹齢400年の一本桜)。1日コースで伊那谷の桜名所を網羅、宿泊は高遠町内の旅館(温泉付15,000円〜)。" },
      ],
      en: [
        { q: "What is Takato Castle Park?", a: "A 14-hectare park on the ruins of a Sengoku-era castle linked to Takeda Shingen, in Ina City, Nagano. About 1,500 endemic Takato Kohigan cherry trees earn it the title «No.1 cherry blossoms under heaven.» It is selected for Japan's «Top 100 Cherry Blossom Sites» and counted among Japan's «Three Great Cherry Blossom Sites» — Nagano's signature spring photography destination." },
        { q: "Best time of day to shoot Takato cherry blossoms?", a: "Before 6 AM offers crowdless blue light. Afternoon transitions through the blue hour into illumination, when warm lantern light meets pink blossoms beautifully. Plan a weekday early-morning visit to avoid crowds." },
        { q: "Access and best timing?", a: "About 25 minutes by bus from JR Ina-shi Station, or 15 minutes on foot from Takato Station. Peak typically falls in early to mid-April under the «No.1 cherry blossoms under heaven.» Twilight to sunrise gives the softest backlight; weekday early mornings best avoid the crowds." },
        { q: "Admission and hours?", a: "Paid only during the cherry-blossom festival (early–mid April): adults ¥500, elementary/middle school ¥250 (JAF and tourism-association discounts available). Free outside the festival, open at all hours. Festival hours 8:00–21:00 (illumination from 18:00). Local parking fills up — take buses or the festival shuttle." },
        { q: "Tripod use and etiquette?", a: "Tripods OK within the park but don't block paths during crowds. Commercial use requires permission. Never touch branches or enter restricted areas. Some areas are off-limits to flashlights pre-dawn — follow staff direction. Drones are entirely forbidden to protect the cherry trees." },
        { q: "Combined sightseeing route?", a: "①Takato Castle Park (early morning, cherry) ②Katsuma Yakushi-do (5 min by car, 400-year weeping cherry) ③Shinshu Takato Museum (5 min by car, local painters) ④Tsuetsuki Pass (30 min by car, Ina Valley panorama) ⑤Komatsunagi solitary cherry (1 hr by car, 400-year tree). A full day covers Ina Valley's cherry sites; ryokan in Takato (with onsen, from ¥15,000) provide lodging." },
      ],
    },
    faqs: [
      { q: d("高遠の桜のベスト撮影時間は？","Best time of day to shoot Takato cherry blossoms?","高远樱花最佳拍摄时段？","高遠櫻花最佳拍攝時段？","다카토 벚꽃 최고 촬영 시간대는?"),
        a: d("早朝6時前の青い光と人がいない時間帯が王道。午後はライトアップ前の夕方〜青の時間帯が華やかで、夜は提灯の暖色光と桜の対比が美しい。","Before 6 AM offers crowdless blue light. Afternoon transitions through the blue hour into illumination, when warm lantern light meets pink blossoms beautifully.","清晨6点前蓝调光与无人时段为佳。午后黄昏至蓝色时刻华丽，夜间灯笼暖光与樱花对比迷人。","清晨6點前藍調光與無人時段為佳。午後黃昏至藍色時刻華麗，夜間燈籠暖光與櫻花對比迷人。","이른 아침 6시 전의 푸른빛과 인적 없는 시간대가 정석. 오후는 점등 전 황혼-블루아워가 화려하고 밤은 등불의 따뜻한 빛과 벚꽃의 대비가 아름답습니다.") },
    ],
  },
  "駒つなぎの桜": {
    desc: d(
      "駒つなぎの桜は阿智村智里の山あいにそびえる樹齢400年超のエドヒガンザクラ。源義経が奥州下向の際に馬を繋いだとの伝説からこの名がついた。山田の畔にぽつんと立つ姿は古武士のような風格。4月中下旬の満開時、棚田の水面に映る逆さ桜と星空のコラボは長野県を代表する一本桜の絶景。",
      "The Komatsunagi Cherry Tree is a 400+ year-old Edohigan in the mountain hamlet of Chisato in Achi Village. Legend says Minamoto no Yoshitsune tied his horse to it on his journey to Oshu, giving the tree its name («Horse-Tying Cherry»). It stands alone by terraced rice fields with the dignity of an old warrior. At full bloom in mid-to-late April, its reflection in flooded paddies under the stars is one of Nagano's iconic single-tree views.",
      "驹系樱花是阿智村智里深山中树龄超过400年的江户彼岸樱。相传源义经赴奥州时曾在此系马，故得此名。孤立于山田畔，气概如老武士。4月中下旬盛花期，倒映在棚田水面的逆樱与星空同框是长野代表性的一本樱绝景。",
      "駒繫櫻花是阿智村智里深山中樹齡超過400年的江戶彼岸櫻。相傳源義經赴奧州時曾在此繫馬，故得此名。孤立於山田畔，氣概如老武士。4月中下旬盛花期，倒映在棚田水面的逆櫻與星空同框是長野代表性的一本櫻絕景。",
      "고마쓰나기 벚꽃은 아치 마을 치사토의 산속에 우뚝 선 수령 400년이 넘는 에도히간자쿠라. 미나모토노 요시쓰네가 오슈로 향할 때 말을 매어 두었다는 전설에서 이름이 붙었습니다. 산 논두렁에 홀로 서 있는 모습은 노무사 같은 풍격. 4월 중-하순 만개 시 다랑논에 비친 역 벚꽃과 별하늘이 어우러지는 풍경은 나가노를 대표하는 한 그루 벚꽃 절경입니다."
    ),
    definition: lh(
      "駒つなぎの桜(こまつなぎのさくら)は長野県下伊那郡阿智村智里(あちむらちさと)の標高約950mの山あいにそびえる、樹齢約400年(推定)・樹高約20m・幹周約3.5mのエドヒガンザクラの一本桜。1189年に源義経が奥州へ下向する際、ここで馬を繋いだという伝説から「駒つなぎ」の名が付き、長野県の天然記念物に指定されています。山の棚田の畔にぽつんと立つ姿は古武士のような風格を漂わせ、4月中旬〜下旬の満開期には、田植え時期の水を張った棚田に映る逆さ桜と、阿智村の「日本一の星空」を組み合わせた構図が長野県を代表する一本桜の絶景。撮影マナー(畔の踏み荒らし禁止・三脚位置等)が整備されており、早朝の人がいない時間帯が狙い目です。",
      "The Komatsunagi Cherry Tree, in mountainous Chisato of Achi Village, Shimoina District, Nagano Prefecture, stands at about 950 m elevation — an Edohigan cherry estimated to be about 400 years old, around 20 m tall, with a trunk circumference of 3.5 m. According to legend, in 1189 Minamoto no Yoshitsune tied his horse to it on his journey to Oshu, giving the tree its name («Horse-Tying Cherry»). It is a designated Nagano Prefecture Natural Monument. Standing alone beside terraced rice fields with the dignity of an old warrior, in mid- to late April it pairs at full bloom with the surrounding paddies — flooded for planting — to mirror the cherry tree, often combined with Achi Village's «No.1 starry sky in Japan» for one of Nagano's signature single-tree compositions. Photography etiquette (no trampling paddy ridges, designated tripod positions) is in place; early morning before the crowds is the prime window."
    ),
    highlights: {
      ja: [
        "樹齢約400年のエドヒガンザクラ — 樹高約20m、長野県天然記念物、源義経伝説の歴史",
        "棚田の水鏡 — 4月中下旬の田植え時期、逆さ桜が水面に完璧に映る",
        "夜の星空と桜 — 阿智村は「日本一の星空」、新月期の天の川と桜の組合せが絶景",
        "早朝の薄明 — 日の出前の青い時間帯、人が少なく桜のシルエットが美しい",
        "周辺の散策路 — 駒つなぎの桜以外にも阿智村には桜の名所多数(暮白の滝桜・浪合関所跡)",
      ],
      en: [
        "About 400-year-old Edohigan Cherry — 20 m tall, a Nagano Prefecture Natural Monument linked to the Minamoto no Yoshitsune legend",
        "Paddy Reflection — when paddies flood for planting in mid-to-late April, the cherry mirrors perfectly on the water",
        "Stars and Cherry at Night — Achi Village holds Japan's «No.1 starry sky» certification; the Milky Way at new moon paired with cherry blossoms is unforgettable",
        "Pre-Dawn Twilight — the blue hour before sunrise, when crowds are absent and the cherry's silhouette is most beautiful",
        "Nearby Trails — beyond Komatsunagi, Achi Village offers other cherry spots like Kurahaku Falls Cherry and the Namiai Checkpoint ruins",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "駒つなぎの桜とは?", a: "長野県阿智村智里の標高950mの山あいにそびえる樹齢約400年のエドヒガンザクラ。源義経が奥州下向時に馬を繋いだ伝説から名がつき、長野県天然記念物。4月中下旬の棚田の水鏡と逆さ桜、星空との組合せが絶景の一本桜です。" },
        { q: "水鏡撮影に必要な条件は?", a: "4月中下旬の田植え時期で水が張られ、無風の早朝〜薄明が必須。三脚と広角〜標準レンズ、星と桜なら高感度耐性のあるボディが推奨。撮影マナー遵守(畔を踏み荒らさない、三脚位置を守る)が必須です。" },
        { q: "アクセスは?", a: "JR飯田駅から車で約1時間、中央自動車道飯田山本ICから車で30分。アクセスは車一択、駐車場は限られるため早朝5時着が必須。星と桜の撮影は新月期の4月中下旬の特定夜のみ、年に数日のレアタイミングです。" },
        { q: "源義経伝説とは?", a: "1189年、兄・頼朝に追われた源義経が奥州藤原氏のもとに下向する途中、阿智村の山道でこの桜に馬を繋いで休んだという伝承が「駒つなぎ」の由来。義経の波乱の生涯と一本桜の孤独な姿が重なり、地元では古くから「義経桜」とも呼ばれ歌や絵画の題材になっています。撮影時にこの物語に思いを馳せると、桜の風格が一層深く感じられます。" },
        { q: "撮影マナーの詳細は?", a: "①棚田の畔(あぜ道)に立入らない②三脚位置は地元設定スポット内のみ③長時間占有禁止(他の撮影者と交代)④商用撮影は事前申請⑤車のヘッドライトは早朝消灯(他撮影者の星空撮影妨害防止)⑥ドローン全面禁止。地元住民が農地を維持しているからこそ撮影できる景観、敬意を持って静かに撮影してください。" },
        { q: "近隣の桜名所は?", a: "①暮白の滝桜(同じ阿智村、樹齢300年級)②浪合関所跡(中山道脇宿、桜と歴史)③伊那市の高遠城址公園(車1時間)④飯田市の麻績の里舞台桜(駅すぐ、樹齢250年)⑤天竜峡(船下り体験+渓谷桜)。1〜2泊で阿智村〜伊那谷〜天竜峡まで桜と星空の撮影旅程が組めます。" },
      ],
      en: [
        { q: "What is the Komatsunagi Cherry Tree?", a: "An approximately 400-year-old Edohigan cherry standing at about 950 m elevation in Chisato, Achi Village, Nagano. Named for the legend that Minamoto no Yoshitsune tied his horse to it on his way to Oshu, it is a designated Nagano Natural Monument. In mid-to-late April it offers a paddy mirror reflection paired with the village's «No.1 starry sky» — a signature single-tree spectacle." },
        { q: "What's needed for the paddy reflection shot?", a: "Mid-to-late April when paddies are flooded for planting, on a windless dawn or early twilight. Bring a tripod and wide-to-standard lens; for stars and blossoms a high-ISO-tolerant body is recommended. Strict etiquette — no trampling paddy ridges, designated tripod positions — is essential." },
        { q: "Access?", a: "About 1 hour by car from JR Iida Station, or 30 minutes by car from the Iida-Yamamoto Interchange of the Chuo Expressway. A car is essentially required; parking is limited so arrive at 5 AM. The combined stars-and-cherry shot is possible only on new-moon nights in mid-to-late April — only a few days per year." },
        { q: "What is the Yoshitsune legend?", a: "In 1189, Minamoto no Yoshitsune — pursued by his brother Yoritomo — paused on the mountain trail through Achi to tie his horse to this cherry on his journey to the Northern Fujiwara, giving the tree the name «Horse-Tying.» Yoshitsune's turbulent life and the lone tree resonate; locals call it «Yoshitsune Cherry,» and it has long inspired songs and paintings. Photographing it with this story in mind deepens its presence." },
        { q: "Detailed photography etiquette?", a: "①Don't step onto paddy ridges ②Tripods only at designated local positions ③Don't monopolize a spot — rotate with other photographers ④Commercial shots require pre-approval ⑤Turn off car headlights early in the morning (so others can shoot stars) ⑥Drones forbidden entirely. The local landscape exists because villagers maintain the paddies — photograph respectfully and quietly." },
        { q: "Nearby cherry sites?", a: "①Kurahaku Falls Cherry (same Achi Village, 300+ years) ②Namiai Checkpoint ruins (Nakasendo waki-shuku) ③Takato Castle Park (1 hr by car) ④Omi-no-Sato Butai Cherry in Iida (next to the station, 250 years) ⑤Tenryukyo Gorge (boat ride + valley cherry). A 1–2 night itinerary covers Achi/Ina/Tenryukyo cherry-and-star scenes." },
      ],
    },
    faqs: [
      { q: d("水鏡撮影に必要な条件は？","What's needed for the paddy reflection shot?","拍水镜倒影需要什么条件？","拍水鏡倒影需要什麼條件？","수면 반영 촬영에 필요한 조건은?"),
        a: d("4月中下旬の田植え時期で水が張られ、無風の早朝〜薄明が必須。三脚と広角〜標準レンズ、星と桜なら高感度耐性のあるボディが推奨。","Mid-to-late April when paddies are flooded for planting, on a windless dawn or early twilight. Bring a tripod and wide-to-standard lens; for stars+blossoms a high-ISO-tolerant body is recommended.","4月中下旬插秧水满期，无风的清晨或薄明必备。三脚架与广角到标准镜头，拍星空与樱花建议高感性能好的机身。","4月中下旬插秧水滿期，無風的清晨或薄明必備。三腳架與廣角到標準鏡頭，拍星空與櫻花建議高感性能好的機身。","4월 중-하순 모내기 시기에 물이 차고, 바람 없는 새벽이나 박명이 필수. 삼각대와 광각-표준 렌즈, 별과 벚꽃을 함께라면 고감도 내성이 좋은 바디가 좋습니다.") },
    ],
  },
  "長野県天空の楽園": {
    desc: d(
      "長野県阿智村は環境省が「日本一の星空」に認定した日本屈指のスターウォッチングスポット。スタービレッジ阿智「天空の楽園 ナイトツアー」では、ゴンドラで標高1400m富士見台高原に登り、街灯のない山頂で満点の星空に包まれる。新月期の天の川と冬の星座が圧巻。",
      "Achi Village in Nagano is certified by Japan's Ministry of the Environment as the «No.1 starry sky in Japan,» one of the country's premier stargazing destinations. The Star Village Achi «Tenku no Rakuen Night Tour» takes visitors by gondola up to Fujimidai Highlands at 1,400 m, where lights vanish and the entire sky fills with stars. The Milky Way during new moon and the winter constellations are jaw-dropping.",
      "长野县阿智村被环境省认证为「日本第一星空」，是全国顶级观星地。星之村阿智「天空乐园夜游」乘缆车登海拔1400米富士见台高原，山顶无光害，群星满天。新月期银河与冬季星座尤为震撼。",
      "長野縣阿智村被環境省認證為「日本第一星空」，是全國頂級觀星地。星之村阿智「天空樂園夜遊」乘纜車登海拔1400米富士見台高原，山頂無光害，群星滿天。新月期銀河與冬季星座尤為震撼。",
      "나가노현 아치 마을은 환경성이 「일본 제일의 별하늘」로 인정한 일본 굴지의 별 관측지. 스타빌리지 아치 「천공의 낙원 나이트 투어」는 곤돌라로 해발 1400m 후지미다이 고원까지 올라가 가로등 없는 산정에서 만점 별하늘에 둘러싸입니다. 신월기 은하수와 겨울 별자리가 압권."
    ),
    definition: lh(
      "長野県天空の楽園(てんくうのらくえん)は長野県下伊那郡阿智村智里、ヘブンスそのはらスキー場が運営する標高1,400m富士見台高原の星空観賞ツアーの愛称で、2006年に環境省「全国星空継続観察」で「日本一星空が綺麗な場所」に認定された日本屈指のスターウォッチング聖地。ゴンドラで約15分、夜の山頂に上がると周囲は街灯ゼロの完全な暗闇となり、満点の星空に360度包まれます。新月期の天の川、夏の夏の大三角形、冬のオリオン座と冬の大六角形まで、肉眼でも見える星の数は季節により6,000〜10,000個。年間来場者は約14万人、日本のアストロツーリズムを牽引する代表的存在です。",
      "«Tenku no Rakuen» (Paradise in the Sky) is the brand name for stargazing tours at Fujimidai Highlands (1,400 m) operated by Heavens Sonohara ski resort in Chisato, Achi Village, Shimoina District, Nagano Prefecture. In 2006, the area was certified by Japan's Ministry of the Environment as having the «most beautiful starry sky in Japan» (under the National Star-Sky Continuous Observation program). After about a 15-minute gondola ride, visitors reach the summit, where light pollution is eliminated and a 360° panorama of stars surrounds them. Depending on season, 6,000 to 10,000 stars are visible to the naked eye — the Milky Way at new moon, the Summer Triangle, Orion in winter, and the Winter Hexagon. Drawing about 140,000 visitors annually, it leads Japanese astrotourism."
    ),
    highlights: {
      ja: [
        "ナイトツアー — ゴンドラで15分、標高1,400mの星空観賞、年間約14万人来場",
        "新月期の天の川 — 4〜10月の新月前後、夏の天の川中心部が肉眼でも雲のように見える",
        "ペルセウス座流星群(8月) — 年間最多の流星群、星空観賞には最高のタイミング",
        "冬の星座(11〜2月) — オリオン座、冬の大六角形、空気が澄み透明度が極高",
        "ヘブンスそのはらスキー場 — 冬季はスキー場、夜は星空ツアー、夏はマウンテンバイクと多彩",
      ],
      en: [
        "Night Tour — a 15-minute gondola ride to 1,400 m for stargazing, drawing about 140,000 visitors a year",
        "Milky Way at New Moon — around new moon from April to October, the summer Milky Way's core is visible to the naked eye like a cloud",
        "Perseid Meteor Shower (August) — Japan's busiest meteor shower, the best stargazing timing of the year",
        "Winter Constellations (November–February) — Orion, the Winter Hexagon, with the clearest air and exceptional transparency",
        "Heavens Sonohara Ski Resort — ski runs in winter, star tours at night, mountain biking in summer — varied year-round",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "長野県天空の楽園とは?", a: "長野県阿智村のヘブンスそのはらスキー場運営の標高1,400m富士見台高原の星空観賞ツアー。2006年環境省「日本一星空が綺麗な場所」認定、年間約14万人が訪れる日本屈指のアストロツーリズムの聖地です。" },
        { q: "星空撮影の最適時期は?", a: "新月の前後・空気が澄む冬(11月〜2月)が銀河は弱まるが星の鋭さは最高。夏は天の川が中心(7〜8月の新月前後がピーク)。ペルセウス座流星群(8月12〜13日)は年間最大、ナイトツアーは予約必須です。" },
        { q: "アクセスとツアー予約は?", a: "JR飯田駅から車で約25分、中央自動車道園原ICから車で5分。ナイトツアーは公式サイトから予約必須(大人2,500円)、運行は4〜10月の特定日。雨天・濃霧時は中止、リスケジュールサービスあり。" },
        { q: "撮影機材のおすすめは?", a: "①明るい広角レンズ(F2.8以下、14〜24mm)②高感度耐性カメラ(ISO3200〜6400常用可)③しっかりした三脚④リモートシャッター(30秒以上の長秒露光)⑤予備バッテリー2〜3個(冬は冷気で消耗早い)⑥赤色LEDライト(暗闇順応した目を保護)。星景写真ならポータブル赤道儀があると更に高品質。" },
        { q: "ツアー内容は?", a: "山麓駅から「天空の遊覧ゴンドラ」で約15分かけて山頂駅へ。山頂で約2時間滞在、星空ガイド解説(プラネタリウム的ナレーション)、レーザーポインターでの星座紹介、消灯タイム(完全暗闇で星空を見る5分間)。冬は星空の替わりに「冬のナイトツアー」(雪上ライトアップ)を実施。" },
        { q: "防寒・服装は?", a: "標高1,400mで夏でも夜間気温10〜15℃、冬は-10℃以下。ダウン・厚手のフリース・防水靴・手袋・帽子・耳当て必携。山頂は屋外、座って観賞するため毛布・寒さ対策のホットドリンクも持参。冬期(12〜3月)はスノーブーツ必須、無料ブランケット貸出もあり。" },
      ],
      en: [
        { q: "What is «Paradise in the Sky»?", a: "A stargazing tour brand operated by the Heavens Sonohara ski resort at the 1,400 m Fujimidai Highlands in Achi Village, Nagano. Certified in 2006 by Japan's Ministry of the Environment as the «most beautiful starry sky in Japan,» it draws about 140,000 visitors a year as Japan's leading astrotourism destination." },
        { q: "Best time of year for stargazing?", a: "Around new moon. Winter (Nov–Feb) gives the sharpest stars (the Milky Way is fainter). Summer is best for the Milky Way's core (peaks around new moon in July–August). The Perseid meteor shower (August 12–13) is the year's busiest. Night tours require advance booking." },
        { q: "Access and tour reservations?", a: "About 25 minutes by car from JR Iida Station; 5 minutes by car from the Sonohara Interchange of the Chuo Expressway. Reservations are required (¥2,500 for adults); tours run on selected dates April–October. Rain or fog cancels, with rescheduling available." },
        { q: "Recommended camera gear?", a: "①Fast wide-angle lens (f/2.8 or faster, 14–24mm) ②High-ISO-tolerant body (clean ISO 3200–6400) ③Sturdy tripod ④Remote shutter (for 30+ second exposures) ⑤2–3 spare batteries (cold drains them fast) ⑥Red LED headlamp (preserves dark-adapted vision). For higher quality, a portable equatorial mount is excellent." },
        { q: "What does the tour include?", a: "Mountain-base station to the summit station via the «Tenku Yuran Gondola» (about 15 min). Roughly 2-hour summit stay with a stargazing guide (planetarium-style narration), laser-pointer constellation tour, and a «lights-off moment» (5 minutes of complete darkness to see the stars). In winter, a «Winter Night Tour» substitutes snowfield illumination." },
        { q: "Cold-weather wear?", a: "At 1,400 m, summer night temps run 10–15°C; winter drops below -10°C. Bring down jacket, thick fleece, waterproof boots, gloves, hat, and ear muffs. The summit is outdoor seated viewing — bring a blanket and warm drinks. Winter (Dec–Mar) requires snow boots; free blanket loans are available." },
      ],
    },
    faqs: [
      { q: d("星空撮影の最適時期は？","Best time of year for stargazing?","观星最佳时期？","觀星最佳時期？","별 관측 최적기는?"),
        a: d("新月の前後・空気が澄む冬（11月〜2月）が銀河は弱まるが星の鋭さは最高。夏は天の川が中心。ナイトツアーは予約必須。","Around new moon. Winter (Nov-Feb) gives the sharpest stars (the Milky Way is fainter). Summer is best for the Milky Way's core. The night tour requires advance booking.","新月前后、空气清澈的冬季（11-2月）银河淡但星象最锐利；夏季银河中心最美。夜游须提前预约。","新月前後、空氣清澈的冬季（11-2月）銀河淡但星象最銳利；夏季銀河中心最美。夜遊須提前預約。","신월 전후. 공기가 맑은 겨울(11-2월)은 은하수는 약하지만 별이 가장 또렷합니다. 여름은 은하수 중심부가 절경. 나이트 투어는 사전 예약 필수.") },
    ],
  },
  "弘法山古墳": {
    desc: d(
      "弘法山古墳は松本市にある東日本最古級の前方後方墳（3世紀末築造）。標高650mの弘法山頂上に位置し、約4000本の桜が4月中旬に咲き誇る。山頂からは松本市街と北アルプスの絶景が広がり、桜越しに残雪の峰々を望む構図は松本随一の春の風景。",
      "Kobo Mountain Tumulus in Matsumoto is one of eastern Japan's oldest «zenpo-koho-fun» keyhole-style burial mounds (built late 3rd century). Sitting at 650 m on Mt. Kobo's summit, about 4,000 cherry trees burst into bloom in mid-April. The summit panorama of Matsumoto city and the Northern Alps — snow-capped peaks framed by cherry blossoms — is one of Matsumoto's finest spring views.",
      "弘法山古坟位于松本市，是东日本最古老的前方后方坟之一（3世纪末建造）。位于海拔650米弘法山顶，约4000棵樱花4月中旬盛放。山顶可俯瞰松本市区与北阿尔卑斯绝景，樱花之间残雪峰峦的构图是松本春景代表。",
      "弘法山古墳位於松本市，是東日本最古老的前方後方墳之一（3世紀末建造）。位於海拔650米弘法山頂，約4000棵櫻花4月中旬盛放。山頂可俯瞰松本市區與北阿爾卑斯絕景，櫻花之間殘雪峰巒的構圖是松本春景代表。",
      "고보산 고분은 마쓰모토시에 있는 동일본 최고급 전방후방분(3세기 말 축조). 해발 650m 고보산 정상에 위치하며 약 4000그루의 벚꽃이 4월 중순 만개합니다. 정상에서는 마쓰모토 시가지와 북알프스의 절경이 펼쳐지고, 벚꽃 너머 잔설의 봉우리들을 바라보는 구도는 마쓰모토 봄의 대표 풍경입니다."
    ),
    definition: lh(
      "弘法山古墳(こうぼうやまこふん)は長野県松本市並柳の標高約650mの弘法山(こうぼうやま)山頂部に築造された全長約66mの東日本最古級の前方後方墳(ぜんぽうこうほうふん)で、3世紀末築造と推定される国の史跡。1974年(昭和49年)に長野県・松本市の発掘調査で「弘法山古墳出土品」(三角縁神獣鏡など)が確認され、4世紀代の畿内文化が早期に北信地方に伝わった証拠として古代史学的に重要。山頂周辺には約4,000本のソメイヨシノ・ヤマザクラが植えられ、4月中旬の満開期には松本市街と北アルプス連峰(乗鞍岳・穂高連峰・常念岳など)が一望できる絶景が広がります。桜越しに残雪のアルプスの稜線を望む構図は松本随一の春の風景として全国的に知られています。",
      "Kobo-yama Tumulus, atop the 650 m Mt. Kobo in Namiyanagi, Matsumoto City, Nagano Prefecture, is a roughly 66 m «zenpo-koho-fun» — a square-front, square-back keyhole-style tomb — and one of eastern Japan's oldest, estimated to date from the late 3rd century. Designated a National Historic Site, the tumulus yielded Triangular-Rim Mythical-Beast Mirrors and other artifacts during a 1974 excavation by Nagano and Matsumoto, providing crucial evidence that 4th-century Kinai culture had reached the northern Shinano region remarkably early. About 4,000 Yoshino and yamazakura cherry trees encircle the summit; in mid-April at peak bloom, sweeping views unfold of downtown Matsumoto and the Northern Alps — Mt. Norikura, the Hotaka Range, Mt. Jonen — making the snow-capped peaks framed by cherry blossoms one of Matsumoto's most celebrated spring scenes nationally."
    ),
    highlights: {
      ja: [
        "東日本最古級の前方後方墳 — 全長66m、3世紀末築造、国指定史跡、古代史の重要遺跡",
        "山頂の桜(約4,000本) — ソメイヨシノとヤマザクラ、4月中旬満開、松本市街を見下ろす",
        "北アルプスの大パノラマ — 乗鞍岳・穂高連峰・常念岳の稜線、桜越しの構図が王道",
        "朝焼けのモルゲンロート — 日の出時に北アルプスがピンク色に染まる、桜と組合せ最高峰",
        "登山道(15〜20分) — バス停から徒歩、整備された山道、家族連れも気軽に登れる",
      ],
      en: [
        "Among Eastern Japan's Oldest Keyhole Tombs — 66 m long, late-3rd-century, National Historic Site, key archaeological evidence",
        "About 4,000 Cherry Trees at the Summit — Yoshino and yamazakura at peak bloom in mid-April, overlooking Matsumoto",
        "Northern Alps Panorama — the ridges of Mt. Norikura, the Hotaka Range, and Mt. Jonen; the canonical shot frames them through cherry blossoms",
        "Morning «Alpenglow» — at sunrise the Alps blush pink; combined with cherry blossoms, the peak photographic moment",
        "Trail (15–20 min) — from the bus stop on foot via a maintained trail, accessible even for families",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "弘法山古墳とは?", a: "長野県松本市の標高650m弘法山山頂の3世紀末築造の前方後方墳(全長66m)で、東日本最古級・国指定史跡。山頂周囲の約4,000本の桜と北アルプスの絶景が織りなす松本随一の春景撮影地です。" },
        { q: "弘法山古墳のアクセスと撮影ポイントは?", a: "松本駅からバス約20分・徒歩約20分で登山口。山頂までは坂道15〜20分。早朝の薄明〜日出が逆光柔らかく北アルプスが映え、混雑回避にも有効。朝焼けのモルゲンロート(雪山がピンクに染まる)が最高峰のタイミングです。" },
        { q: "桜のベスト時期は?", a: "例年4月中旬がピーク。松本市街地より標高があるため平地より数日遅れて満開。ピーク時の早朝は薄霧と桜と北アルプスの3要素が揃う奇跡の時間、写真愛好家が集まります。" },
        { q: "古墳の歴史的意義は?", a: "3世紀末の前方後方墳としては東日本最古級で、1974年の発掘調査で出土した三角縁神獣鏡などから「畿内文化が早期に北信地方に伝わった証拠」と古代史学的に重要。国の史跡指定。古墳説明板で文化的背景を学んでから撮影するとより深い表現が可能、考古学好きにも興味深い場所です。" },
        { q: "撮影機材のおすすめは?", a: "①広角(16-35mm)で桜と北アルプスの大景②望遠(70-200mm)で雪山稜線と桜の圧縮③標準ズームで山頂の散策路と桜のディテール。三脚OK(混雑時配慮)。早朝のモルゲンロート狙いは予備バッテリーと防寒具必携、4月でも標高650mは気温5℃以下になることも。" },
        { q: "周辺の連携観光は?", a: "①弘法山古墳(早朝、桜+北アルプス)②松本城(車15分、現存12天守の最古)③中町通り(車20分、蔵造りの古い町並み)④城山公園(車20分、桜と松本市街俯瞰)⑤美ヶ原高原(車1時間、夏期高原ドライブ)。1日コースで松本市内の桜名所を巡り、夜は中町通りで信州そば・地酒の食事も。" },
      ],
      en: [
        { q: "What is Kobo-yama Tumulus?", a: "A late-3rd-century keyhole-style tumulus (66 m long) atop the 650 m Mt. Kobo in Matsumoto City, Nagano — among eastern Japan's oldest, designated a National Historic Site. With about 4,000 cherry trees encircling the summit and the Northern Alps in the distance, it is Matsumoto's most spectacular spring photography location." },
        { q: "How to access and where to shoot?", a: "From Matsumoto Station, about 20 minutes by bus and 20 minutes on foot to the trailhead, then 15–20 minutes uphill to the summit. Dawn to sunrise gives soft backlight on the Northern Alps and avoids the crowds; the «alpenglow» moment when snow peaks blush pink is the absolute peak." },
        { q: "Best timing for cherry blossoms?", a: "Peak in mid-April. The summit's altitude delays bloom by a few days compared to the city below. Early mornings at peak combine light mist, cherry blossoms, and the Northern Alps in a miraculous trifecta that draws serious photographers." },
        { q: "Historical significance of the tumulus?", a: "Among eastern Japan's oldest late-3rd-century keyhole tombs. The 1974 excavation yielded Triangular-Rim Mythical-Beast Mirrors, evidence that Kinai culture reached the northern Shinano region remarkably early — significant in ancient history. National Historic Site. Reading the explanatory boards before shooting deepens your visual interpretation; rewarding for those who love archaeology too." },
        { q: "Recommended camera gear?", a: "①Wide angle (16–35mm) for cherry+Alps grand vista ②Telephoto (70–200mm) compressing snow ridges and cherry ③Standard zoom for summit-trail cherry detail. Tripods OK (mind crowds). For dawn alpenglow, bring spare batteries and warm clothing — at 650 m even April mornings can drop below 5°C." },
        { q: "Combined sightseeing route?", a: "①Kobo-yama (early morning, cherry + Alps) ②Matsumoto Castle (15 min by car, oldest of 12 originals) ③Nakamachi-dori (20 min, old kura townscape) ④Joyama Park (20 min, cherry + city panorama) ⑤Utsukushigahara Highlands (1 hr, summer drive). A full-day Matsumoto cherry circuit; evenings can include shinshu soba and local sake on Nakamachi-dori." },
      ],
    },
    faqs: [
      { q: d("弘法山古墳のアクセスと撮影ポイントは？","How to access and where to shoot?","怎么去？最佳拍摄点？","怎麼去？最佳拍攝點？","접근 방법과 촬영 포인트?"),
        a: d("松本駅からバス約20分・徒歩約20分で登山口。山頂までは坂道15〜20分。早朝の薄明〜日出が逆光柔らかく北アルプスが映え、混雑回避にも有効。","From Matsumoto Station, ~20 min by bus + ~20 min walk to the trailhead, then 15-20 min uphill to the summit. Dawn to sunrise gives soft backlight on the Northern Alps and avoids the crowds.","松本站乘巴士约20分钟+步行20分钟到登山口，山顶15-20分钟。清晨薄明至日出逆光柔和，北阿尔卑斯尤其美，亦可避开人潮。","松本站乘巴士約20分鐘+步行20分鐘到登山口，山頂15-20分鐘。清晨薄明至日出逆光柔和，北阿爾卑斯尤其美，亦可避開人潮。","마쓰모토역에서 버스 약 20분+도보 약 20분으로 등산로 입구, 정상까지 15-20분. 새벽 박명-일출이 역광이 부드럽고 북알프스가 돋보이며 혼잡 회피에도 유효합니다.") },
    ],
  },
  "安養寺": {
    desc: d(
      "安養寺は松本市にある真宗大谷派の古刹。境内のしだれ桜は樹齢百年超で、4月中旬に淡紅色の花房を地面まで垂らす姿が圧巻。本堂・鐘楼の落ち着いた木造建築と桜のコントラストは絵画的で、地元で愛される静かな桜の名所。",
      "Anyo-ji is an old Jodo Shinshu Otani-ha temple in Matsumoto. Its century-old weeping cherry tree drapes pale-pink cascades to the ground in mid-April — a breathtaking sight. The contrast of cherry blossoms with the serene wooden Main Hall and bell tower creates a painterly scene, beloved by locals as a quiet sakura spot.",
      "安养寺位于松本市，是真宗大谷派古刹。境内百年以上垂枝樱4月中旬粉花垂地，蔚为壮观。本堂、钟楼的沉稳木造建筑与樱花的对比如画，是当地人喜爱的静谧赏樱名所。",
      "安養寺位於松本市，是真宗大谷派古剎。境內百年以上垂枝櫻4月中旬粉花垂地，蔚為壯觀。本堂、鐘樓的沉穩木造建築與櫻花的對比如畫，是當地人喜愛的靜謐賞櫻名所。",
      "안요지는 마쓰모토시의 진종 오타니파 고찰. 경내의 수양벚나무는 수령 100년이 넘으며 4월 중순 연분홍 꽃송이가 땅까지 늘어지는 모습이 압권. 본당과 종루의 차분한 목조 건축과 벚꽃의 대비는 회화적이며, 현지인이 사랑하는 조용한 벚꽃 명소입니다."
    ),
    definition: lh(
      "安養寺(あんようじ)は長野県松本市島内にある真宗大谷派の寺院で、創建年代は不詳ながら松本城下町の歴史を伝える古刹。境内に立つ樹齢約100年のしだれ桜は、4月中旬に淡紅色の花房を地面まで垂らす圧巻の姿で、地元では「安養寺のしだれ桜」として静かに愛され続けています。境内に面した本堂と鐘楼の落ち着いた木造建築と、優美な滝のように咲き誇るしだれ桜のコントラストは絵画的。観光地化されていない隠れた桜名所として、人混みを避けたい写真愛好家に支持される松本市の春の撮影地です。",
      "Anyo-ji is a Jodo Shinshu Otani-ha temple in Shimauchi, Matsumoto City, Nagano Prefecture; though its founding date is unrecorded, it preserves the heritage of Matsumoto's castle-town history. Within its grounds, an approximately 100-year-old weeping cherry tree drapes pale-pink blossoms to the ground in mid-April — a breathtaking sight known affectionately as «Anyo-ji's weeping cherry.» The contrast of the serene wooden Main Hall and bell tower with the cherry tree blooming like an elegant cascade creates a painterly scene. Untouched by mass tourism, it is a hidden cherry-blossom destination cherished by photographers seeking calmer alternatives to Matsumoto's busier sites."
    ),
    highlights: {
      ja: [
        "樹齢約100年のしだれ桜 — 淡紅色の花房が地面まで垂れる優美な姿、4月中旬満開",
        "本堂と鐘楼との対比 — 落ち着いた木造建築と桜の華やかさが絵画的構図",
        "観光地化されていない隠れ名所 — 地元の人が訪れる静かな桜寺、ゆっくり撮影できる",
        "夕方の桜 — 西陽が桜と本堂を黄金色に染める時間帯、人がいない静寂な雰囲気",
        "境内の小径 — 苔むした石段、参道、写真にしたくなる和の風景",
      ],
      en: [
        "Around 100-year-old weeping cherry — pale-pink blossoms drape to the ground in an elegant cascade at peak bloom in mid-April",
        "Contrast with Main Hall and Bell Tower — the serene wooden architecture against the lush cherry creates a painterly composition",
        "Hidden, Uncrowded Spot — a quiet cherry temple visited mostly by locals, where you can shoot at leisure",
        "Evening Cherry — the western sun gilds tree and hall, with no crowds and a meditative stillness",
        "Within the Grounds — moss-covered stone steps and paths offer countless quintessentially Japanese photographic moments",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "安養寺とは?", a: "長野県松本市島内の真宗大谷派の寺院で、樹齢約100年のしだれ桜が4月中旬に圧巻の姿を見せる隠れた桜名所。観光地化されておらず人混みを避けたい写真愛好家に愛される、松本市の静謐な春の撮影地です。" },
        { q: "安養寺のしだれ桜の見頃は?", a: "4月中旬。早朝〜午前は順光で花の色が鮮やか。夕方は本堂と桜のシルエットが映える。境内は静かな宗教施設なのでマナーを守って撮影を、お参りの方の邪魔にならないよう配慮してください。" },
        { q: "アクセスは?", a: "JR松本駅から車で約15分、または北松本駅から徒歩30分。駐車場あり(寺の駐車場、参拝者用)。松本城・弘法山古墳と組合せた市内桜巡りの一環として訪問するのがおすすめ、撮影所要時間30分〜1時間。" },
        { q: "撮影マナーは?", a: "現役の宗教施設のため、本堂内・墓地は撮影禁止。境内の枝垂れ桜のみ撮影可、フラッシュ・三脚使用は事前に住職に相談を。商用撮影は要事前申請。お参りの方が撮影者を避けて遠回りするような状況は避けて、静かに敬意を持って撮影してください。" },
        { q: "撮影テクニックは?", a: "①広角(16-35mm)で本堂・鐘楼と枝垂れ桜の全景②望遠(70-200mm)で枝垂れの花房クローズアップ③マクロ(90mm)で個々の花のディテール。早朝の柔らかい光が花の繊細な色合いを最も美しく写す。雨後は花びらに水滴が残り、より風情ある写真に。" },
        { q: "他の松本の桜名所との違いは?", a: "松本城は迫力ある国宝の城+桜の組合せ、弘法山古墳は北アルプスを借景にした大景、安養寺は静謐な禅寺の境内+一本の枝垂れ桜という対照的な3つ。同じ松本市内で全く異なる桜の表情を1日で撮れるため、組合せ訪問が定番。安養寺が一番空いていて落ち着いた撮影が可能。" },
      ],
      en: [
        { q: "What is Anyo-ji?", a: "A Jodo Shinshu Otani-ha temple in Shimauchi, Matsumoto City, Nagano. Its approximately 100-year-old weeping cherry tree at peak bloom in mid-April makes it a hidden cherry-blossom destination. Uncommercialized, it is cherished by photographers seeking quiet alternatives to Matsumoto's busy sites." },
        { q: "When is peak bloom?", a: "Mid-April. Morning offers front-lit, vivid blossom colors. Evening gives stunning silhouettes of the hall and tree. The grounds are a quiet religious site — please shoot respectfully and avoid disturbing worshippers." },
        { q: "Access?", a: "From JR Matsumoto Station, about 15 minutes by car, or 30 minutes on foot from Kita-Matsumoto Station. Temple parking (for worshippers) is available. Combine with Matsumoto Castle and Kobo-yama for a city cherry-blossom circuit; allow 30 minutes to 1 hour at Anyo-ji." },
        { q: "Photography etiquette?", a: "An active religious site — the main hall interior and cemetery are off-limits. Only the weeping cherry in the precincts may be photographed. Consult the head priest before using flash or a tripod. Commercial use requires advance approval. Don't make worshippers detour around you — shoot quietly and respectfully." },
        { q: "Photography techniques?", a: "①Wide angle (16–35mm) for the main hall, bell tower, and weeping cherry ②Telephoto (70–200mm) for cascading flower-cluster closeups ③Macro (90mm) for individual blossom detail. Soft early-morning light captures the tree's delicate hues most beautifully. Post-rain water droplets on petals add atmosphere." },
        { q: "How does Anyo-ji compare to Matsumoto's other cherry sites?", a: "Matsumoto Castle pairs the National Treasure keep with cherry; Kobo-yama uses the Northern Alps as a borrowed backdrop; Anyo-ji offers a quiet Zen-temple setting with a single weeping cherry. The contrast across the three is striking — pair them in one day to capture different cherry moods. Anyo-ji is the least crowded and most contemplative." },
      ],
    },
    faqs: [
      { q: d("安養寺のしだれ桜の見頃は？","When is peak bloom?","垂枝樱花期？","垂枝櫻花期？","수양벚나무 절정은?"),
        a: d("4月中旬。早朝〜午前は順光で花の色が鮮やか。夕方は本堂と桜のシルエットが映える。境内は静かなのでマナーを守って撮影を。","Mid-April. Morning offers front-lit, vivid blossom colors. Evening gives stunning silhouettes of the hall and tree. The grounds are quiet — please shoot respectfully.","4月中旬。清晨至上午顺光，花色鲜艳。傍晚本堂与樱花剪影迷人。境内安静，请保持礼仪。","4月中旬。清晨至上午順光，花色鮮豔。傍晚本堂與櫻花剪影迷人。境內安靜，請保持禮儀。","4월 중순. 아침-오전은 순광이라 꽃 색이 선명. 저녁은 본당과 벚꽃의 실루엣이 돋보입니다. 경내는 조용하니 매너를 지켜 촬영하세요.") },
    ],
  },
  "松本市新村": {
    desc: d(
      "松本市新村（にいむら）は松本市西部の田園地域。アルピコ交通上高地線が走り、田んぼ・果樹園・水路と北アルプスの稜線が織りなす素朴な里の風景が残る。春は桜並木、初夏は青田、秋は稲穂と冠雪のアルプスといった日本の原風景を撮影できる。",
      "Niimura, in western Matsumoto, is a rural area where the Alpico Kotsu Kamikochi Line runs past rice paddies, orchards, and irrigation channels framed by the ridges of the Northern Alps — a quiet, classic Japanese countryside. Spring brings cherry-lined paths, early summer green paddies, and autumn ripe rice with snow-capped Alps.",
      "松本市新村位于松本西部田园区。阿尔皮可交通上高地线穿行，稻田、果园、水渠与北阿尔卑斯山脊构成质朴里山风景。春季樱花路、初夏青田、秋季稻穗与雪岭的搭配可拍下日本原风景。",
      "松本市新村位於松本西部田園區。阿爾皮可交通上高地線穿行，稻田、果園、水渠與北阿爾卑斯山脊構成質樸里山風景。春季櫻花路、初夏青田、秋季稻穗與雪嶺的搭配可拍下日本原風景。",
      "마쓰모토시 니이무라는 마쓰모토시 서부의 농촌 지역. 알피코 교통 가미코치선이 지나가고 논·과수원·수로와 북알프스 능선이 어우러지는 소박한 시골 풍경이 남아 있습니다. 봄에는 벚꽃길, 초여름에는 푸른 논, 가을에는 벼 이삭과 설관 알프스 등 일본의 원풍경을 촬영할 수 있습니다."
    ),
    definition: lh(
      "松本市新村(まつもとしにいむら)は長野県松本市西部の田園地域で、JR松本駅から西に約4kmの場所に位置し、アルピコ交通上高地線(松本電気鉄道)の小さな新村駅(にいむらえき)を中心とする旧新村地区。1954年(昭和29年)に松本市と合併する以前は東筑摩郡新村村として独立した農村で、現在もリンゴ園・水田・果樹園・石州瓦の蔵が残る素朴な里の風景が松本市街中心部とは対照的な日本の原風景を形成。北アルプス連峰(乗鞍岳・常念岳・穂高連峰)を借景に、上高地線のレトロな2両編成電車が田園を走り抜ける情景は、鉄道写真と田園風景の両方を愛する写真家に支持される松本市西郊の隠れた撮影地です。",
      "Matsumoto City Niimura is a rural area in western Matsumoto City, Nagano Prefecture, about 4 km west of JR Matsumoto Station, centered on the small Niimura Station of the Alpico Kotsu Kamikochi Line (the former Matsumoto Electric Railway). Until merging with Matsumoto City in 1954, it was the independent farming village of Niimura in Higashi-Chikuma District. Today, apple orchards, paddy fields, fruit groves, and Sekishu-tile-roofed kura storehouses preserve the simple village landscape that contrasts with the city center, embodying classic rural Japan. With the Northern Alps — Mt. Norikura, Mt. Jonen, the Hotaka Range — as borrowed scenery, the retro two-car Kamikochi Line train threading through the paddies is beloved by photographers who appreciate both railway and pastoral imagery — a hidden gem in Matsumoto's western suburbs."
    ),
    highlights: {
      ja: [
        "上高地線の田園風景 — 2両編成のレトロ電車と北アルプス、鉄道写真の聖地",
        "桜並木(4月) — 新村駅周辺の桜、電車と桜のコラボ、地元密着の春景",
        "青田(6〜8月) — 田植え後の水田、夕日と稲が織りなす緑の田園",
        "稲穂(9〜10月) — 黄金色の稲、北アルプスの白い稜線とのコントラスト",
        "旧三溝駅舎 — 木造の小さな駅、廃線跡、ノスタルジックな建築被写体",
      ],
      en: [
        "Pastoral Kamikochi Line — the two-car retro train against the Northern Alps, sacred ground for railway photography",
        "Cherry-Lined Paths (April) — cherry blossoms around Niimura Station, the train-and-blossom combo capturing local spring",
        "Green Paddies (June–August) — flooded paddies after planting; setting sun and rice form vibrant green landscapes",
        "Ripe Rice (September–October) — golden ears against the white ridges of the Northern Alps",
        "Former Mitsumizo Station — a small wooden station and disused line, a nostalgic architectural subject",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "松本市新村とは?", a: "長野県松本市西部の田園地域で、アルピコ交通上高地線の新村駅を中心とする旧新村地区。リンゴ園・水田・果樹園と北アルプスの組合せが日本の原風景を形成、レトロな上高地線電車が走り抜ける鉄道写真の聖地です。" },
        { q: "新村駅周辺の見どころは?", a: "旧三溝駅の木造駅舎、田園とアルプス、桜並木、稲穂期の朝霧。鉄道写真とランドスケープ両方楽しめる隠れた撮影地。レトロな電車の通過時刻表を事前確認、列車本数は1時間に1〜2本。" },
        { q: "ベスト時期と撮影テクは?", a: "桜の4月中旬、青田の6〜8月、稲穂と冠雪アルプスの9〜10月、雪景色の1〜2月、四季それぞれ被写体豊富。望遠レンズで電車と山を圧縮、広角で田園と空の組合せ。早朝の朝霧は秋〜冬の特別な被写体です。" },
        { q: "アクセスは?", a: "JR松本駅からアルピコ交通上高地線で新村駅まで約20分・340円。レンタカーで松本駅から約15分。新村駅周辺は徒歩や自転車が便利、田園地帯のため広域移動には車推奨。撮影地まで徒歩10〜30分、季節の見どころで複数の撮影スポット巡り可能。" },
        { q: "上高地線の電車情報は?", a: "アルピコ交通上高地線は松本駅〜新島々駅を結ぶローカル線で、ハイデッカーやノスタルジックな2両編成電車が走る。鉄道ファンに人気、アングルによっては「日本一短い区間でアルプスをバックに撮れる路線」とも。電車と田園の組合せはランドスケープ撮影者にもおすすめ。" },
        { q: "撮影スポットの選び方は?", a: "①新村駅から徒歩10分の田園地帯(踏切込みの大景)②旧三溝駅周辺(木造駅舎+電車)③下島駅近くの桜並木(4月)④梓川沿いの稲田(秋)。地元住民の生活地域でもあるため、私有地への立入禁止・農作業の妨害厳禁。鉄道撮影マナーも遵守(線路立入禁止)。" },
      ],
      en: [
        { q: "What is Niimura?", a: "A rural area in western Matsumoto City, Nagano, centered on Niimura Station of the Alpico Kotsu Kamikochi Line. Apple orchards, paddies, and orchards combine with the Northern Alps to form a classic rural Japan landscape — a sacred ground for photographers loving the retro Kamikochi Line train." },
        { q: "What's near Niimura Station?", a: "The wooden former Mitsumizo Station, paddies with the Alps, cherry-lined lanes, morning mist over rice fields. A hidden gem combining train and landscape photography. Confirm the train timetable in advance — service runs 1–2 trains per hour." },
        { q: "Best timing and techniques?", a: "Cherry blossoms mid-April, green paddies June–August, ripe rice with snow-capped Alps September–October, winter snow January–February — every season offers rich subjects. A telephoto compresses train and mountains; a wide lens combines paddies with sky. Autumn-to-winter morning mist is a special subject." },
        { q: "Access?", a: "From JR Matsumoto Station, the Alpico Kamikochi Line to Niimura Station takes ~20 min, ¥340. By rental car, ~15 min from Matsumoto Station. The Niimura area is best on foot or bicycle; a car is preferable for wider-area movement. Walking from 10–30 min reaches multiple seasonal photo spots." },
        { q: "About the Kamikochi Line train?", a: "Alpico's Kamikochi Line connects Matsumoto Station with Shin-Shimashima Station — a local line with high-decker cars and nostalgic 2-car retro consists. Popular among rail fans; with the right angle, it's been called «Japan's shortest line offering the Alps as backdrop.» The train + paddies pairing also appeals to landscape photographers." },
        { q: "Choosing photo spots?", a: "①Paddies 10 min on foot from Niimura Station (level-crossing grand vistas) ②Around former Mitsumizo Station (wooden depot + train) ③Cherry-lined paths near Shimojima Station (April) ④Azusa River paddies (autumn). It's also residents' daily life — never enter private land or interfere with farm work. Observe rail photography etiquette (no track trespass)." },
      ],
    },
    faqs: [
      { q: d("新村駅周辺の見どころは？","What's near Niimura Station?","新村站附近看点？","新村站附近看點？","니이무라역 주변 볼거리는?"),
        a: d("旧三溝駅の木造駅舎、田園とアルプス、桜並木、稲穂期の朝霧。鉄道写真とランドスケープ両方楽しめる隠れた撮影地。","Wooden former Mitsumizo Station, paddies with the Alps, cherry-lined lanes, morning mist over rice fields — a hidden gem combining train and landscape photography.","旧三沟站木造站舍、田园与阿尔卑斯、樱花路、稻穗期晨雾。铁道与风景兼得的隐秘拍摄点。","舊三溝站木造站舍、田園與阿爾卑斯、櫻花路、稻穗期晨霧。鐵道與風景兼得的隱秘拍攝點。","구 미쓰미조역의 목조 역사, 논과 알프스, 벚꽃길, 벼이삭기의 새벽 안개. 철도와 풍경 둘 다 즐길 수 있는 숨은 촬영지.") },
    ],
  },
  "城山公園(松本市)": {
    desc: d(
      "松本市の城山公園は標高約650m、市内屈指の桜の名所で「日本さくら名所100選」にも選定。約400本の桜が咲き誇り、展望広場からは松本市街・北アルプス連峰・乗鞍岳までの大パノラマが広がる。春の桜と冠雪アルプスの組み合わせは松本ならではの春景。",
      "Joyama Park in Matsumoto, at 650 m elevation, is one of the city's premier cherry-blossom spots and is listed in Japan's «100 Best Sakura Spots.» About 400 cherry trees bloom here, while the observation plaza offers a panorama of downtown Matsumoto, the Northern Alps, and Mt. Norikura. Spring blossoms with the snow-capped Alps make a uniquely Matsumoto spring view.",
      "松本市城山公园海拔约650米，是市内顶级赏樱名所，入选「日本樱花名所100选」。约400棵樱花盛放，展望广场可远眺松本市区、北阿尔卑斯山脉与乘鞍岳。春樱与雪岭组合是松本独有的春景。",
      "松本市城山公園海拔約650米，是市內頂級賞櫻名所，入選「日本櫻花名所100選」。約400棵櫻花盛放，展望廣場可遠眺松本市區、北阿爾卑斯山脈與乘鞍岳。春櫻與雪嶺組合是松本獨有的春景。",
      "마쓰모토시의 조야마 공원은 해발 약 650m, 시내 최고 벚꽃 명소로 「일본 벚꽃 명소 100선」에 선정. 약 400그루 벚꽃이 만개하며, 전망 광장에서는 마쓰모토 시가지·북알프스 연봉·노리쿠라다케까지 대 파노라마가 펼쳐집니다. 봄 벚꽃과 설관 알프스의 조합은 마쓰모토만의 봄 풍경."
    ),
    definition: lh(
      "城山公園(じょうやまこうえん)は長野県松本市蟻ケ崎の標高約650mの城山(じょうやま)山頂部に整備された松本市の総合公園で、戦国時代に小笠原氏の出城(林大城)が置かれた歴史を持つ場所。「日本さくら名所100選」に選定された松本市屈指の桜名所で、約400本のソメイヨシノと約30本のしだれ桜が4月中旬に咲き誇ります。標高があるため平地より数日遅れて満開になるのが特徴。展望広場からは松本市街・北アルプス連峰(乗鞍岳・穂高連峰・常念岳)・乗鞍岳までの大パノラマが広がり、桜と冠雪の北アルプスを一枚に収める春の構図は松本ならではの絶景。市民憩いの公園で、桜・新緑・紅葉・雪と四季それぞれの表情が楽しめます。",
      "Joyama Park is a comprehensive municipal park atop the 650 m Mt. Joyama in Arigasaki, Matsumoto City, Nagano Prefecture. The site once held a Sengoku-era branch castle (Hayashi Daijo) of the Ogasawara clan. Listed among Japan's «Top 100 Cherry Blossom Sites,» the park is one of Matsumoto's premier cherry-blossom destinations, with about 400 Yoshino cherries and about 30 weeping cherries blooming in mid-April; due to its elevation, peak comes a few days later than on the plain. The observation plaza commands a sweeping panorama of downtown Matsumoto, the Northern Alps (Mt. Norikura, the Hotaka Range, Mt. Jonen), and Mt. Norikura itself. Combining cherry blossoms with the snow-capped Alps in a single frame yields a uniquely Matsumoto spring scene. A beloved municipal park, it offers different faces across the four seasons — cherry blossoms, fresh greens, autumn colors, and snow."
    ),
    highlights: {
      ja: [
        "桜の名所(約430本) — 日本さくら名所100選、ソメイヨシノとしだれ桜の混植、4月中旬満開",
        "展望広場の大パノラマ — 松本市街・北アルプス・乗鞍岳まで一望、桜と山の組合せが王道",
        "朝焼けのモルゲンロート — 日の出時に北アルプスが赤く染まる、桜と組合せ最高峰",
        "桜トンネル — 約2kmの桜並木、車道沿いの桜のトンネルが圧巻",
        "夜桜ライトアップ — 桜の季節限定、ぼんぼりの暖色光と桜",
      ],
      en: [
        "Cherry-Blossom Spot (about 430 trees) — listed in Japan's «Top 100 Cherry Blossom Sites,» with mixed Yoshino and weeping cherry trees blooming mid-April",
        "Observation Plaza Panorama — sweeping views of Matsumoto, the Northern Alps, and Mt. Norikura; cherry blossoms with mountains is the classic frame",
        "Morning Alpenglow — at sunrise the Alps blush red; combined with cherry blossoms, the absolute peak",
        "Cherry Tunnel — about 2 km of cherry-lined road, a roadside tunnel of blossoms",
        "Evening Cherry-Blossom Illumination — only during cherry season; warm bonbori-lantern light against the blossoms",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "城山公園(松本市)とは?", a: "長野県松本市の標高約650mの城山山頂の総合公園で、戦国時代の出城跡。日本さくら名所100選に選定、約430本の桜と北アルプスの大パノラマが楽しめる、松本市屈指の春の撮影地です。" },
        { q: "展望広場でのベスト構図は?", a: "桜を前ボケに北アルプスの稜線を入れる縦構図が王道。早朝のモルゲンロート(朝焼けで赤く染まる雪山)と桜の組み合わせが最高潮。望遠で山を引き寄せ、桜の前ボケで奥行き表現。" },
        { q: "アクセスとベスト時期は?", a: "JR松本駅から車で約15分または上高地線「西松本駅」から徒歩30分。例年4月中旬の桜が満開、平地の市街地よりも数日遅れて咲くため見逃しても狙い直しが可能。夜桜ライトアップは桜祭り期間のみ。" },
        { q: "夜桜ライトアップの時間は?", a: "毎年4月上旬〜中旬の桜まつり期間限定、18:00〜21:00頃。約100基のぼんぼり提灯が点灯し、暖色光と桜のコントラストが幻想的。三脚必須、ISO400・F8・10〜30秒。混雑期は19時以降は人混みのため、18時前か20時以降が比較的空いています。" },
        { q: "撮影機材のおすすめは?", a: "①広角(16-35mm)で桜と北アルプスの大景②望遠(70-200mm)でアルプス雪山稜線と桜の圧縮③標準ズームで桜トンネル散策路。CPLフィルターで空の青を強調・桜の白い色を際立たせる。早朝のモルゲンロート狙いは予備バッテリー(冷気で消耗)と防寒具必携。" },
        { q: "桜以外の見どころは?", a: "新緑(5月)・あじさい(6月)・紅葉(11月)・雪景色(1〜2月)、四季それぞれの表情。山頂展望広場からは年間通して松本市街・北アルプス・乗鞍岳の大パノラマ、夜は松本市街の夜景も。野鳥観察(夏のオオルリ、冬のシジュウカラ等)もマニア向け被写体。" },
      ],
      en: [
        { q: "What is Joyama Park?", a: "A municipal park atop the 650 m Mt. Joyama in Matsumoto, Nagano — once the site of a Sengoku-era branch castle. Listed among Japan's «Top 100 Cherry Blossom Sites,» it offers about 430 cherry trees and a sweeping panorama of the Northern Alps — one of Matsumoto's premier spring photography spots." },
        { q: "Best framing from the observation plaza?", a: "A vertical frame with cherry blossoms in foreground and the Alps ridge behind is classic. The morning alpenglow (snow peaks turning red at sunrise) with sakura is the absolute peak. A telephoto pulls the mountains forward; cherry blossoms in the foreground create depth." },
        { q: "Access and best timing?", a: "About 15 minutes by car from JR Matsumoto Station, or 30 minutes on foot from Nishi-Matsumoto Station. Cherry blossoms peak in mid-April, a few days later than the plain — leaving second chances if missed. Evening illumination runs only during the Cherry Blossom Festival." },
        { q: "Evening illumination hours?", a: "During the Cherry Blossom Festival in early-to-mid April, 18:00–21:00. About 100 bonbori lanterns light up, creating a magical contrast of warm light and blossoms. Tripod essential, ISO 400, f/8, 10–30s. Crowds peak after 19:00; before 18:00 or after 20:00 is comparatively quiet." },
        { q: "Recommended camera gear?", a: "①Wide angle (16–35mm) for cherry + Northern Alps grand vista ②Telephoto (70–200mm) compressing snow ridges and cherry ③Standard zoom for cherry-tunnel paths. CPL filter deepens sky blue and crisps the white cherry tones. For dawn alpenglow, bring spare batteries (cold drain) and warm clothing." },
        { q: "Other seasonal attractions?", a: "Fresh greenery (May), hydrangeas (June), autumn colors (November), winter snow (Jan–Feb) — every season offers something. Year-round, the summit plaza commands a panorama of Matsumoto city, the Northern Alps, and Mt. Norikura, with city night views in the evening. Birdwatching (blue-and-white flycatcher in summer, tits in winter) for enthusiasts." },
      ],
    },
    faqs: [
      { q: d("展望広場でのベスト構図は？","Best framing from the observation plaza?","展望广场最佳构图？","展望廣場最佳構圖？","전망 광장 최고 구도?"),
        a: d("桜を前ボケに北アルプスの稜線を入れる縦構図が王道。早朝のモルゲンロート（朝焼けで赤く染まる雪山）と桜の組み合わせが最高潮。","A vertical frame with cherry blossoms in foreground and the Alps ridge behind is classic. The morning «alpenglow» (snow peaks turning red at sunrise) with sakura is the absolute peak.","樱花前景虚化加北阿尔卑斯山脊纵构图为王道。清晨「朝霞红雪山」与樱花的搭配最为震撼。","櫻花前景虛化加北阿爾卑斯山脊縱構圖為王道。清晨「朝霞紅雪山」與櫻花的搭配最為震撼。","벚꽃을 전경 보케로 북알프스 능선을 넣는 세로 구도가 정석. 이른 아침의 알펜글로(설산이 붉게 물드는 현상)와 벚꽃의 조합이 최고조.") },
    ],
  },
  "中町通り(松本市)": {
    desc: d(
      "中町通りは松本市の旧城下町に残る蔵造りの町並み。白漆喰と黒なまこ壁の土蔵が連なり、江戸末〜明治の風情が色濃く残る。蔵を改装したカフェ・工芸店・ギャラリーが並び、生活する町と観光が共存する稀有な歴史地区。歩きながらのスナップに最適。",
      "Nakamachi Street is a historical district of «kura» storehouse-style buildings in old castle-town Matsumoto. White plaster walls with black «namako» tile patterns line the street, preserving late-Edo and Meiji-era atmosphere. Renovated kura now host cafés, craft shops, and galleries — a rare living-and-tourist district perfect for strolling and snapping.",
      "中町通保留松本旧城下町的藏造老街。白漆与黑海鼠墙的土藏并列，江户末至明治风情浓厚。改造土藏开设的咖啡馆、工艺店、画廊林立，是难得的生活与观光共存的历史街区，适合漫步抓拍。",
      "中町通保留松本舊城下町的藏造老街。白漆與黑海鼠牆的土藏並列，江戶末至明治風情濃厚。改造土藏開設的咖啡館、工藝店、畫廊林立，是難得的生活與觀光共存的歷史街區，適合漫步抓拍。",
      "나카마치 거리는 마쓰모토시 옛 성하 마을에 남은 창고(쿠라) 건축의 거리. 흰 회벽과 검은 나마코 무늬 토창이 늘어서 있으며, 에도 말기-메이지 시대의 정취가 짙게 남아 있습니다. 개조된 창고에 카페·공예점·갤러리가 자리해, 생활과 관광이 공존하는 보기 드문 역사 지구로 산책하며 스냅하기 좋습니다."
    ),
    definition: lh(
      "中町通り(なかまちどおり)は長野県松本市中央2丁目の旧城下町・善光寺街道沿いに約400m続く蔵造りの町並みで、江戸末期から明治時代の白漆喰と黒なまこ壁の土蔵が連なる景観が松本市の歴史地区を象徴。1888年(明治21年)の松本大火で大半の建物が焼失したのち、防火対策として土蔵造りの建物が建てられ、現在もその姿を留めています。約20軒の蔵を改装したカフェ・工芸店・ギャラリー・蕎麦店・地酒屋が並び、生活と観光が共存する稀有な歴史地区。松本市は商都・酒どころとしての歴史を持ち、中町は商家の集まる商業中心地でした。「中町・蔵シック館」(明治時代の蔵を改装した観光案内所兼資料館)も訪問必須で、江戸の風情を残す散策・スナップ撮影に最適です。",
      "Nakamachi Street is a roughly 400 m stretch along the former Zenkoji Kaido road in 2-chome Chuo, Matsumoto City, Nagano Prefecture, lined with «kura» storehouse-style buildings. Their white plaster walls and black «namako» tile patterns (late-Edo to Meiji-era) define Matsumoto's historic district. After most of the area burned in the Great Matsumoto Fire of 1888 (Meiji 21), buildings were rebuilt as fireproof storehouses, and that streetscape survives today. About 20 renovated kura now host cafés, craft shops, galleries, soba restaurants, and local sake stores — a rare historic district where daily life and tourism coexist. As a city with deep merchant and brewing traditions, Nakamachi was Matsumoto's commercial heart, with «Nakamachi Kurashic-kan» (a Meiji-era kura converted into a tourist office and museum) a must-visit. It is ideal for strolling and snapping photographs amid Edo-period atmosphere."
    ),
    highlights: {
      ja: [
        "白壁・黒なまこ壁の蔵 — 約20軒、江戸末期〜明治の防火建築、整然と続く蔵の連なり",
        "中町・蔵シック館 — 明治の蔵を改装した観光案内所兼資料館、内部見学無料",
        "蔵カフェ・工芸店 — 改装された土蔵で営業、コーヒー・ガラス・木工・松本民芸を扱う",
        "夕方の街灯と蔵 — 暖色のライトアップで蔵が黄金色に染まる、ノスタルジックな雰囲気",
        "雨の日の石畳 — 雨に濡れた石畳と蔵壁の反射、人がいない朝の特別な被写体",
      ],
      en: [
        "White-Plaster, Black-Namako Kura — about 20 of them; the late-Edo to Meiji-era fireproof architecture creates an orderly procession of storehouses",
        "Nakamachi Kurashic-kan — a Meiji-era kura converted into a tourist office and museum, free interior tours",
        "Kura Cafés and Craft Shops — set in renovated storehouses serving coffee, glass, woodwork, and Matsumoto folk crafts",
        "Evening Streetlights with Kura — warm lighting bathes the kura in gold, with a nostalgic atmosphere",
        "Stone Paving in Rain — wet stones reflect the kura walls, a special early-morning subject when the streets are empty",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "中町通りとは?", a: "長野県松本市の旧城下町に残る約400mの蔵造りの町並み。1888年の松本大火後に防火対策で建てられた白漆喰と黒なまこ壁の土蔵約20軒が連なり、現在はカフェ・工芸店・ギャラリーとして活用される松本市の歴史地区を象徴する撮影地です。" },
        { q: "撮影に最適な時間帯は?", a: "早朝6〜8時は人通りが少なく整然とした蔵壁を撮れる。夕方の街灯が灯る時間帯はノスタルジックで、白壁が暖色に染まる。雨天の石畳も被写体として秀逸、観光客が少ない平日朝が圧倒的におすすめ。" },
        { q: "アクセスは?", a: "JR松本駅から徒歩10分、松本城から徒歩5分。中町通りは縄手通り(松本城下の女鳥羽川南岸の道)とセットで歩くと松本城下町を完全制覇。所要時間は通り全体で30分〜1時間、カフェ立ち寄り含めれば2〜3時間。" },
        { q: "蔵カフェのおすすめは?", a: "①「珈琲まるも」(築120年の蔵を改装、ブレンドコーヒー650円、ジャズBGM)②「松本ホテル花月」のラウンジ(明治期の旧家を活用、抹茶セット1,200円)③「蔵シック館」(明治期の蔵を改装した観光案内所兼ギャラリー、無料)④「ガレットカフェ・ルパティオ」(蔵の中庭に面したテラス席)。撮影と食事を組合せた半日コースに最適。" },
        { q: "工芸店・お土産は?", a: "「中町・蔵シック館」周辺に工芸店約30軒。「松本民芸家具」(柳宗悦の民芸運動から派生、家具・木工)、「ガラスショップ・コボ」(吹きガラス工房+ショップ)、「九州屋」(長野そば乾麺・地酒)、「松本てまり」(伝統工芸品)など。商品撮影は店主に一声かければ大概OK。" },
        { q: "夜の中町通りの撮影は?", a: "20時以降は店舗が閉店するため通行人がほぼいない、長秒露光で蔵の白壁を浮かび上がらせる撮影が可能。冬期(11〜2月)は街灯と冷気の組合せで暖色・寒色の対比が強く、雪化粧の蔵は年に数回のレア構図。三脚OK、車道は深夜も時々通行があるので注意。" },
      ],
      en: [
        { q: "What is Nakamachi Street?", a: "An approximately 400 m kura-storehouse-style street in Matsumoto's former castle town. After the Great Matsumoto Fire of 1888, fireproof storehouses with white-plaster walls and black namako tile patterns were built — about 20 still line the street and now host cafés, craft shops, and galleries, symbolizing Matsumoto's historic district." },
        { q: "Best time of day to photograph?", a: "6–8 AM offers empty streets and clean compositions of kura walls. Evening, when streetlights flicker on and white walls warm to amber, gives the most nostalgic mood. Wet stone paving after rain also photographs well; weekday mornings with few visitors are overwhelmingly recommended." },
        { q: "Access?", a: "10 minutes on foot from JR Matsumoto Station, or 5 minutes from Matsumoto Castle. Combine with Nawate Street (the road on the south bank of the Metoba River below the castle) for a full Matsumoto castle-town circuit. Plan 30 minutes to 1 hour for the street, or 2–3 hours including café stops." },
        { q: "Recommended kura cafés?", a: "①«Coffee Marumo» (120-year kura conversion, blend coffee ¥650, jazz BGM) ②Matsumoto Hotel Kagetsu lounge (Meiji-era former residence, matcha set ¥1,200) ③«Kurashic-kan» (Meiji kura converted to a tourist office/gallery, free) ④«Galette Café Le Patio» (terrace facing a kura courtyard). Pair shooting with food for a half-day plan." },
        { q: "Crafts and souvenirs?", a: "About 30 craft shops cluster around Kurashic-kan. Matsumoto Mingei Furniture (descended from Yanagi Soetsu's folk-craft movement; furniture and woodwork), Glass Shop Kobo (blown-glass studio + shop), Kyushuya (Shinshu soba dry noodles, local sake), and Matsumoto Temari (traditional crafts). Product shots are usually OK with a quick ask." },
        { q: "Photographing Nakamachi at night?", a: "After 20:00 most shops close — virtually no foot traffic, ideal for long exposures revealing the white kura walls. Winter (Nov–Feb) intensifies the contrast of warm streetlight and cold air; snow-clad kura is a rare frame appearing only a few days a year. Tripods OK; cars still pass occasionally late at night." },
      ],
    },
    faqs: [
      { q: d("撮影に最適な時間帯は？","Best time of day to photograph?","拍摄最佳时段？","拍攝最佳時段？","촬영 최적 시간대는?"),
        a: d("早朝6〜8時は人通りが少なく整然とした蔵壁を撮れる。夕方の街灯が灯る時間帯はノスタルジックで、白壁が暖色に染まる。","6-8 AM offers empty streets and clean compositions of kura walls. Evening, when streetlights flicker on and white walls warm to amber, gives the most nostalgic mood.","清晨6-8点人少，可拍整齐土藏墙。傍晚街灯亮起时白墙染暖色，最具怀旧感。","清晨6-8點人少，可拍整齊土藏牆。傍晚街燈亮起時白牆染暖色，最具懷舊感。","아침 6-8시는 인적이 적어 창고 벽을 깔끔히 담을 수 있습니다. 저녁 가로등이 켜질 때 흰 벽이 따뜻한 색으로 물들며 가장 노스탤직.") },
    ],
  },
  "高島公園(諏訪市)": {
    desc: d(
      "高島公園は諏訪市・諏訪藩の居城だった高島城跡を整備した公園。「諏訪の浮城」と称されたかつての姿を再建天守が伝え、堀の周囲約100本の桜が4月中旬に咲き乱れる。水鏡に映る天守と桜の構図は諏訪を代表する春景。冬はライトアップ、夏は蓮の花も見どころ。",
      "Takashima Park in Suwa City is built on the ruins of Takashima Castle, the former seat of the Suwa domain. Once known as «Suwa's Floating Castle,» its reconstructed keep evokes the past, while about 100 cherry trees around the moat bloom in mid-April. The keep mirrored in the moat with cherry blossoms is one of Suwa's signature spring scenes. Winter illumination and summer lotus flowers also draw visitors.",
      "高岛公园位于诹访市，由诹访藩居城高岛城遗址整治而成。曾被称为「诹访浮城」，重建天守再现昔日风貌，护城河四周约100棵樱花4月中旬盛放。水中倒影天守与樱花是诹访代表春景。冬季灯光、夏季莲花亦为看点。",
      "高島公園位於諏訪市，由諏訪藩居城高島城遺址整治而成。曾被稱為「諏訪浮城」，重建天守再現昔日風貌，護城河四周約100棵櫻花4月中旬盛放。水中倒影天守與櫻花是諏訪代表春景。冬季燈光、夏季蓮花亦為看點。",
      "다카시마 공원은 스와시·스와번의 거성이었던 다카시마성 터를 정비한 공원. 「스와의 떠 있는 성」이라 불렸던 옛 모습을 재건된 천수가 전합니다. 해자 주변 약 100그루 벚꽃이 4월 중순 만개. 해자에 비친 천수와 벚꽃은 스와의 대표 봄 풍경. 겨울 조명, 여름 연꽃도 볼거리."
    ),
    definition: lh(
      "高島公園(たかしまこうえん)は長野県諏訪市高島にある諏訪藩・諏訪氏の居城だった高島城跡を整備した都市公園で、面積約4ヘクタール、長野県の指定史跡。高島城は1592〜1598年に日根野織部正高吉によって築城された平城で、当時は諏訪湖の水を引き入れた堀に囲まれた水城だったため「諏訪の浮城(うきしろ)」と称され、日本三大湖城の一つに数えられた名城。現在の天守(三層三階)は1970年に外観復元、内部は諏訪藩関連の歴史博物館。堀の周囲約100本の桜(ソメイヨシノ)が4月中旬に咲き乱れ、堀の水鏡に映る桜と天守の構図は諏訪を代表する春景。冬は氷結した堀のライトアップ、夏は蓮の花、秋は紅葉と四季それぞれ被写体として優れた撮影地です。",
      "Takashima Park, in Takashima, Suwa City, Nagano Prefecture, is a roughly 4-hectare municipal park developed on the ruins of Takashima Castle — the seat of the Suwa clan and Suwa domain. Designated a Nagano Prefecture Historic Site, the castle was a flatland fortress built between 1592 and 1598 by Hineno Oribe-no-kami Takayoshi. Originally surrounded by moats fed by Lake Suwa's waters, it was known as «Suwa's Floating Castle» and counted among Japan's three great «lake castles.» The current keep (three stories, three tiers) was reconstructed in 1970 (exterior only); the interior houses a Suwa-domain history museum. About 100 Yoshino cherry trees around the moat bloom in mid-April, and the keep mirrored in the moat with cherry blossoms is one of Suwa's signature spring scenes. Winter brings illumination over the frozen moat, summer the lotus, and autumn the foliage — making the park a year-round photography destination."
    ),
    highlights: {
      ja: [
        "再建天守と堀 — 1970年外観復元の三層天守と堀の組合せ、水鏡が美しい",
        "桜と水鏡(4月中旬) — 約100本の桜と堀に映る天守、諏訪の代表的春景",
        "蓮の花(7〜8月) — 堀の蓮、ピンクと白の蓮と天守の組合せが幻想的",
        "紅葉(11月) — モミジ・カエデの紅葉と天守、堀に映る紅葉が美しい",
        "冬のライトアップ — 結氷した堀のライトアップ、青の時間帯が幻想的",
      ],
      en: [
        "Reconstructed Keep and Moat — the 1970-reconstructed three-tier keep with the moat; the mirror reflection is beautiful",
        "Cherry Blossoms with Moat Reflection (mid-April) — about 100 cherry trees and the keep mirrored on water — Suwa's signature spring frame",
        "Lotus Flowers (July–August) — pink and white lotus blossoms on the moat against the keep, fantastically dreamlike",
        "Autumn Foliage (November) — Japanese maples reflected on the moat with the keep behind",
        "Winter Illumination — illuminated over the frozen moat; blue hour is most magical",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "高島公園(諏訪市)とは?", a: "長野県諏訪市の諏訪藩・諏訪氏の居城だった高島城跡公園。「諏訪の浮城」と呼ばれた水城の伝統を継ぐ再建天守と堀、約100本の桜と水鏡の絶景は諏訪を代表する春景の撮影地です。" },
        { q: "水鏡を狙うベストポイントは?", a: "天守南側の堀端から望遠で天守と桜を圧縮。風のない朝夕の鏡面が理想。夜のライトアップ時は青の時間帯(日没後30分)が幻想的、桜のシーズンは特に混雑するため早朝5〜6時着が必須です。" },
        { q: "アクセスとベスト時期は?", a: "JR上諏訪駅から徒歩10分または車で5分。桜の4月中旬がピーク、夏の蓮(7〜8月)、紅葉の11月、冬のライトアップ(2月の御神渡りに合わせて時々開催)と四季を通じて訪問可能、所要時間1時間。" },
        { q: "天守の入場料・営業時間は?", a: "天守入場310円(小中学生150円)、9:00〜17:30(10〜3月は16:30まで)、月曜定休。1階〜3階は諏訪藩歴史資料館、3階は展望室で諏訪湖・八ヶ岳・諏訪市街を一望。1970年外観復元のため内部は鉄筋コンクリート構造、天守内の撮影はOK。" },
        { q: "「諏訪の浮城」の歴史は?", a: "1592〜98年に日根野織部正高吉が築城した水城で、諏訪湖の水を引き込んだ堀に囲まれていたため「浮城」と呼ばれた。日本三大水城(高島城・松江城・島原城)の一つ、諏訪藩の藩庁として明治維新まで諏訪氏が居城。長野県史跡。築城当時の堀の構造の一部が現存し、考古学的にも重要です。" },
        { q: "周辺の連携観光は?", a: "①高島公園(午前、桜+水鏡)②上諏訪温泉(車5分、片倉館の千人風呂、洋館建築)③諏訪大社・上社本宮(車15分、御柱祭の聖地)④諏訪湖(湖畔ジョギング、湖一周16km)⑤立石公園(車15分、夜景)。1日コースで諏訪の歴史・温泉・絶景を巡れ、宿泊は上諏訪温泉が便利。" },
      ],
      en: [
        { q: "What is Takashima Park?", a: "A municipal park in Suwa City, Nagano, on the ruins of Takashima Castle — the seat of the Suwa clan and domain. With its reconstructed keep, moat (heir to the «Suwa's Floating Castle» tradition), and about 100 cherry trees mirrored on water, it is one of Suwa's signature spring photography destinations." },
        { q: "Best spot for the moat reflection?", a: "From the south side of the moat, use a telephoto to compress the keep and cherry blossoms. Windless mornings or evenings give mirror-still water. During illumination, the blue hour (30 minutes after sunset) is most magical. Cherry season is especially crowded — arrive 5–6 AM." },
        { q: "Access and best timing?", a: "10 minutes on foot from JR Kami-Suwa Station, or 5 minutes by car. Cherry blossoms in mid-April are the peak; summer lotus (July–August), November foliage, and winter illumination (occasionally held in February for the Omiwatari ice ridges) make it a year-round destination. Allow 1 hour." },
        { q: "Keep admission and hours?", a: "Keep entry ¥310 (¥150 elementary/middle school). 9:00–17:30 (until 16:30 Oct–Mar). Closed Mondays. Floors 1–3 hold the Suwa Domain Museum; the 3rd-floor observation deck commands views of Lake Suwa, Yatsugatake, and Suwa City. The 1970 reconstruction is reinforced concrete on the inside; interior photography is fine." },
        { q: "History of «Suwa's Floating Castle»?", a: "Built 1592–98 by Hineno Oribe-no-kami Takayoshi as a water castle. Lake Suwa's waters fed the surrounding moat, earning the nickname «Floating Castle.» One of Japan's «Three Great Water Castles» (Takashima, Matsue, Shimabara), it served as the Suwa domain's administrative seat through the Meiji Restoration. A Nagano Prefecture Historic Site; parts of the original moat structure survive — archaeologically significant." },
        { q: "Combined sightseeing route?", a: "①Takashima Park (morning, cherry + reflection) ②Kami-Suwa Onsen (5 min by car, Katakurakan's «1,000-person bath» in Western architecture) ③Suwa Taisha Kamisha Honmiya (15 min by car, Onbashira Festival's sacred ground) ④Lake Suwa (lakeside jog, 16 km loop) ⑤Tateishi Park (15 min by car, night view). Full-day Suwa circuit; Kami-Suwa Onsen makes a convenient overnight base." },
      ],
    },
    faqs: [
      { q: d("水鏡を狙うベストポイントは？","Best spot for the moat reflection?","拍水中倒影最佳点？","拍水中倒影最佳點？","해자 반영 최고 포인트?"),
        a: d("天守南側の堀端から望遠で天守と桜を圧縮。風のない朝夕の鏡面が理想。夜のライトアップ時は青の時間帯が幻想的。","From the south side of the moat, use a telephoto to compress the keep and cherry blossoms. Windless mornings or evenings give mirror-still water. During illumination, the blue hour is most magical.","天守南侧护城河岸用长焦压缩天守与樱。无风的清晨或傍晚水面如镜。夜间灯光下蓝色时刻最梦幻。","天守南側護城河岸用長焦壓縮天守與櫻。無風的清晨或傍晚水面如鏡。夜間燈光下藍色時刻最夢幻。","천수 남쪽 해자 가에서 망원으로 천수와 벚꽃을 압축. 바람 없는 아침-저녁의 거울 같은 수면이 이상적. 야간 조명 시 블루아워가 환상적.") },
    ],
  },
  "諏訪湖": {
    desc: d(
      "諏訪湖は長野県中央部、標高759mのカルデラ湖で県内最大。冬の凍結時に氷がせり上がる「御神渡り（おみわたり）」現象、夏の諏訪湖花火大会、湖畔のジョギングコース、対岸の諏訪富士・八ヶ岳連峰の眺めなど四季折々の表情を持つ。映画「君の名は。」のモデル湖としても知られる。",
      "Lake Suwa, in central Nagano at 759 m elevation, is the prefecture's largest caldera lake. It is famous for the «Omiwatari» phenomenon — ice ridges that rise from the surface in deep winter — and the Suwa Lake Fireworks Festival in summer. Lakeside paths and views of the «Suwa Fuji» and Yatsugatake range across the water shift with the seasons. It is also the inspiration for the lake in the film «Your Name.»",
      "诹访湖位于长野县中部，海拔759米的破火山口湖，是县内最大湖泊。冬季冰面隆起的「御神渡」现象、夏季诹访湖花火大会、环湖步道、对岸的「诹访富士」与八岳连峰等四季表情丰富。亦是电影《你的名字。》湖泊原型。",
      "諏訪湖位於長野縣中部，海拔759米的破火山口湖，是縣內最大湖泊。冬季冰面隆起的「御神渡」現象、夏季諏訪湖花火大會、環湖步道、對岸的「諏訪富士」與八岳連峰等四季表情豐富。亦是電影《你的名字。》湖泊原型。",
      "스와호는 나가노현 중부, 해발 759m의 칼데라호로 현내 최대. 겨울 결빙 시 얼음이 솟아오르는 「오미와타리」 현상, 여름의 스와호 불꽃놀이, 호반 산책로, 건너편 「스와 후지」와 야쓰가타케 연봉의 조망 등 사계절 다양한 표정. 영화 「너의 이름은.」의 호수 모델로도 알려져 있습니다."
    ),
    definition: lh(
      "諏訪湖(すわこ)は長野県中央部、諏訪市・岡谷市・諏訪郡下諏訪町にまたがる長野県内最大の湖で、面積13.3km²・周囲16km・最大水深7.6m・標高759m。約100万年前のフォッサマグナ運動で形成された地溝湖(構造湖)で、流入河川31本に対して流出河川は天竜川1本のみ、湖面の標高は富士山の北麓の山中湖(標高980m)に次ぐ日本第2位の高地湖。冬季の厳寒期(過去30年間で約10回)に湖面全体が結氷し、温度差で氷が膨張して亀裂部分がせり上がる「御神渡り(おみわたり)」現象で世界的に有名。約700年の歴史を持つ諏訪大社の神事として記録され、夏の諏訪湖花火大会(8月15日、4万発、日本最大級)、新海誠監督の映画『君の名は。』のモデル湖としても知られる長野県を代表する撮影地です。",
      "Lake Suwa, in central Nagano Prefecture spanning Suwa City, Okaya City, and Shimo-Suwa Town, is the prefecture's largest lake at 13.3 km² with a 16 km perimeter, a maximum depth of 7.6 m, and a surface elevation of 759 m. Formed by Fossa Magna tectonic movement about a million years ago, it is a graben (structural) lake with 31 inflowing rivers and only one outflow — the Tenryu River. At 759 m elevation, it is Japan's second-highest highland lake (after Lake Yamanaka at 980 m at the northern foot of Mt. Fuji). When the entire surface freezes during severe winters (about 10 times in the past 30 years), thermal expansion produces cracks that rise into ridges — the famous «Omiwatari» phenomenon, recorded as a Suwa Taisha shrine ritual for some 700 years. The Lake Suwa Fireworks Festival (August 15, 40,000 shells — one of Japan's largest), the lake's role as inspiration for Makoto Shinkai's film «Your Name,» and its panoramic views all make it Nagano's representative photographic destination."
    ),
    highlights: {
      ja: [
        "御神渡り(おみわたり) — 厳寒期の結氷時に氷が亀裂部分でせり上がる現象、約700年の歴史的神事",
        "諏訪湖花火大会(8月15日) — 4万発の日本最大級花火、湖面の倒影が圧巻",
        "立石公園 — 標高934mの絶景展望台、映画「君の名は。」聖地、夜景の宝庫",
        "八ヶ岳の借景 — 諏訪湖東岸から望む八ヶ岳連峰、夕日に染まる稜線が絶景",
        "間欠泉センター — 上諏訪温泉のシンボル、間欠泉と湖の構図、温泉街と湖の散策路",
      ],
      en: [
        "Omiwatari — when the lake fully freezes in extreme winters and ice ridges rise from cracks; recorded as a Suwa Taisha shrine ritual for some 700 years",
        "Lake Suwa Fireworks Festival (August 15) — one of Japan's largest at 40,000 shells, with magnificent reflections on the water",
        "Tateishi Park — a 934 m vantage; «Your Name» pilgrimage spot and treasure trove of nightscapes",
        "Yatsugatake as Backdrop — the Yatsugatake range seen from the east shore, with the ridges glowing at sunset",
        "Geyser Center — the symbol of Kami-Suwa Onsen; geyser and lake compositions, plus a hot-spring promenade along the lake",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "諏訪湖とは?", a: "長野県中央部の長野県内最大の湖で、面積13.3km²・標高759m・日本第2位の高地湖。御神渡り現象、日本最大級の諏訪湖花火大会、映画『君の名は。』モデル湖として知られる、長野県を代表する撮影地です。" },
        { q: "諏訪湖の撮影ベストスポットは?", a: "立石公園(俯瞰)、諏訪湖岸通り(湖と街並み)、間欠泉センター周辺(夕日)、八ヶ岳が映る東岸が定番。御神渡りは1〜2月の早朝、花火大会は8月15日、各時期に合わせた撮影計画が必要です。" },
        { q: "ベストシーズンは?", a: "桜の4月、新緑の5月、花火の8月15日、紅葉の10月下旬、御神渡り(結氷時)の1〜2月、冬の朝霧と立石公園の夜景は冬季限定の絶景。映画『君の名は。』ファンは7〜8月に撮影したシーンの追体験ができます。" },
        { q: "御神渡りとは?", a: "湖が完全結氷した極寒期に、氷が割れてせり上がる自然現象。諏訪大社の神事として700年以上記録されており、神様が対岸の女神を訪ねる「神渡り」と伝承される。発生条件は気温-15℃以下が連続10日以上、近年は温暖化で発生頻度が減少、5年に1回程度の貴重な被写体です。" },
        { q: "諏訪湖花火大会の撮影は?", a: "8月15日(終戦記念日)夜、約40,000発の日本最大級花火大会。湖面に映る花火が圧巻。撮影ポイントは立石公園(全景俯瞰)、湖岸通り(打上場所近く、迫力)、対岸の岡谷市側(湖面の倒影)。三脚必須、ISO100・F8・5〜15秒バルブ。湖畔の宿は1年前から予約必須。" },
        { q: "アクセスは?", a: "東京新宿からJR中央線特急「あずさ」で上諏訪駅まで約2時間20分・5,830円。中央自動車道諏訪IC・岡谷ICから車で5〜10分。湖一周は車で30分・徒歩で4時間。立石公園など主要撮影地は車・タクシーが便利、レンタカー推奨です。" },
      ],
      en: [
        { q: "What is Lake Suwa?", a: "Nagano Prefecture's largest lake in its central area — 13.3 km², at 759 m elevation, Japan's second-highest highland lake. With the Omiwatari phenomenon, one of Japan's largest fireworks festivals, and its role as inspiration for the film «Your Name,» it is Nagano's representative photographic destination." },
        { q: "Best photo spots around Lake Suwa?", a: "Tateishi Park (overhead), the lakeshore promenade (lake and town), the Geyser Center area (sunset), and the eastern shore where Yatsugatake reflects. Omiwatari forms in the early mornings of January–February; the fireworks festival is August 15. Plan around each period." },
        { q: "Best seasons?", a: "Cherry blossoms in April, fresh greens in May, fireworks on August 15, autumn colors in late October, Omiwatari (when frozen) in January–February. Winter morning mist and Tateishi Park's nightscape are winter-only spectacles. Fans of «Your Name» can revisit film locations in July–August." },
        { q: "What is the Omiwatari?", a: "When the lake fully freezes in extreme winters, ice ridges rise from cracks — a natural phenomenon recorded as a Suwa Taisha ritual for over 700 years. Tradition holds that the male god crosses to visit the goddess on the far shore. Required conditions: 10+ consecutive days below -15°C; warming has made it rare — about once every 5 years, making it a precious subject." },
        { q: "Photographing the Suwa Lake Fireworks?", a: "On August 15 (end-of-WWII anniversary), about 40,000 shells — one of Japan's largest displays. Reflections on the water are spectacular. Vantages: Tateishi Park (full panorama), the lakeshore (near launch sites for drama), and the Okaya side (lake reflection). Tripod essential, ISO 100, f/8, 5–15s bulb. Lakeside ryokan book up a year ahead." },
        { q: "Access?", a: "From Shinjuku, JR Chuo Line «Azusa» limited express to Kami-Suwa Station ~2 hr 20 min, ¥5,830. From Chuo Expressway Suwa or Okaya Interchange, 5–10 min by car. Lake circuit: 30 min by car, 4 hr on foot. Tateishi Park and other key spots are best by car or taxi — a rental car is recommended." },
      ],
    },
    faqs: [
      { q: d("諏訪湖の撮影ベストスポットは？","Best photo spots around Lake Suwa?","诹访湖最佳拍摄点？","諏訪湖最佳拍攝點？","스와호 최고 촬영 포인트?"),
        a: d("立石公園（俯瞰）、諏訪湖岸通り（湖と街並み）、間欠泉センター周辺（夕日）、八ヶ岳が映る東岸が定番。御神渡りは1〜2月の早朝。","Tateishi Park (overhead view), the lakeshore promenade (lake + town), Geyser Center area (sunset), and the eastern shore where Yatsugatake reflects. Omiwatari ice ridges form in the early mornings of January-February.","立石公园（俯瞰）、诹访湖岸通（湖与街）、间歇泉中心周边（夕阳）、东岸八岳倒影为经典点。御神渡为1-2月清晨。","立石公園（俯瞰）、諏訪湖岸通（湖與街）、間歇泉中心周邊（夕陽）、東岸八岳倒影為經典點。御神渡為1-2月清晨。","다테이시 공원(부감), 스와호반 거리(호수+거리), 간헐천 센터 주변(석양), 야쓰가타케가 비치는 동쪽 호반이 정석. 오미와타리는 1-2월 이른 아침.") },
    ],
  },
  "立石公園": {
    desc: d(
      "立石公園は諏訪湖を一望する標高934mの高台公園。眼下に広がる諏訪湖と対岸の八ヶ岳・富士山までの大パノラマ、夜は宝石箱のような諏訪市の夜景が広がる。映画「君の名は。」の聖地としても有名で、桜・新緑・夕焼け・夜景・星空とすべての時間帯で絵になる長野屈指のビュースポット。",
      "Tateishi Park, perched at 934 m above Lake Suwa, offers a sweeping panorama of the lake with Yatsugatake and even Mt. Fuji beyond. By night, Suwa City glitters like a jewel box. Famous as a pilgrimage site for the film «Your Name,» the park is photogenic at every hour: cherry blossoms, fresh greenery, sunsets, night views, and starscapes.",
      "立石公园位于诹访湖之上的海拔934米高地，眼下诹访湖、对岸八岳与富士山尽收眼底。夜晚诹访市夜景如宝盒。是电影《你的名字。》圣地，樱花、新绿、夕阳、夜景、星空皆入画，是长野顶级观景点。",
      "立石公園位於諏訪湖之上的海拔934米高地，眼下諏訪湖、對岸八岳與富士山盡收眼底。夜晚諏訪市夜景如寶盒。是電影《你的名字。》聖地，櫻花、新綠、夕陽、夜景、星空皆入畫，是長野頂級觀景點。",
      "다테이시 공원은 스와호를 한눈에 내려다보는 해발 934m 고대 공원. 발 아래 스와호와 건너편 야쓰가타케·후지산까지 이어지는 대 파노라마, 밤에는 보석함 같은 스와시 야경이 펼쳐집니다. 영화 「너의 이름은.」 성지로도 유명하며, 벚꽃·신록·노을·야경·별하늘 등 모든 시간대에 그림이 되는 나가노 굴지의 뷰포인트."
    ),
    definition: lh(
      "立石公園(たていしこうえん)は長野県諏訪市上諏訪角間沢、諏訪湖を一望する標高934mの高台に位置する都市公園で、諏訪市民の憩いの場であり長野県屈指の絶景ビューポイント。眼下に広がる諏訪湖(面積13.3km²)、対岸の八ヶ岳連峰(2,899m赤岳)、晴れた日には富士山(150km先)まで望める大パノラマで、夜は諏訪市・岡谷市・茅野市の街明かりが宝石箱のように輝く諏訪盆地の夜景の聖地。新海誠監督の映画『君の名は。』(2016年公開、興行収入250億円)で糸守湖のモデルとしてベンチマークされたシーンの聖地巡礼地として、世界中から映画ファンが訪れます。展望デッキ、駐車場、トイレが整備され、夜間も自由に立ち入り可能(マナー遵守)、桜・新緑・夕焼け・夜景・星空とすべての時間帯で絵になる撮影地です。",
      "Tateishi Park, located at 934 m elevation in Kakuma-zawa, Kami-Suwa, Suwa City, Nagano Prefecture, is a municipal park overlooking Lake Suwa — a recreational space for Suwa's citizens and one of Nagano's premier scenic vantages. The sweeping panorama takes in Lake Suwa below (13.3 km²), the Yatsugatake Range (Mt. Akadake, 2,899 m) opposite, and on clear days even Mt. Fuji 150 km away. By night, the lights of Suwa, Okaya, and Chino Cities sparkle like a jewel box, making the park a sacred ground for Suwa Basin nightscapes. After being featured as the model for Lake Itomori in Makoto Shinkai's «Your Name» (released 2016, ¥25 billion box office), it has become an international pilgrimage site for film fans. With a viewing deck, parking, and restrooms — and 24-hour access (with appropriate etiquette) — it photographs beautifully at every hour: cherry blossoms, fresh greens, sunsets, night views, and starscapes."
    ),
    highlights: {
      ja: [
        "諏訪湖の俯瞰 — 標高934mから諏訪湖と諏訪盆地を一望、八ヶ岳・富士山まで見える",
        "夜景 — 諏訪市・岡谷市・茅野市の街明かりが宝石箱のような光景、ブルーアワーが至高",
        "映画『君の名は。』聖地 — 糸守湖のモデルとして世界的に有名、聖地巡礼者が多い",
        "桜と諏訪湖 — 4月中旬の桜と眼下の諏訪湖、新緑と紅葉も四季の被写体",
        "星空 — 標高934mで街明かりがあるが、新月期は意外と星も見える",
      ],
      en: [
        "Bird's-Eye View of Lake Suwa — from 934 m, the lake and Suwa Basin spread below, with Yatsugatake and even Mt. Fuji visible",
        "Nightscape — the city lights of Suwa, Okaya, and Chino glittering like a jewel box; blue hour is the absolute peak",
        "«Your Name» Pilgrimage Site — internationally famous as the model for Lake Itomori, drawing film fans worldwide",
        "Cherry Blossoms with Lake Suwa — mid-April blossoms with the lake below; fresh greens and autumn colors round out the seasons",
        "Stars — at 934 m elevation, despite some city light, new-moon nights surprisingly reveal stars",
      ],
    },
    quickAnswers: {
      ja: [
        { q: "立石公園とは?", a: "長野県諏訪市の標高934mの諏訪湖を一望する都市公園で、長野県屈指の絶景ビューポイント。新海誠監督の映画『君の名は。』(2016年)の糸守湖モデルとして世界的に有名、夜景・桜・夕焼け・星空など全ての時間帯で絵になる撮影地です。" },
        { q: "夜景・星空撮影のコツは?", a: "三脚必須。夜景はISO200・F8・10〜30秒、星はISO3200・F2.8・15秒前後。日没後20〜30分のマジックアワーが街灯と空のグラデーションで最も美しい。冬は空気が澄んで富士山も見え、夏は花火大会の時期(8/15)は混雑必至。" },
        { q: "アクセスとマナーは?", a: "JR上諏訪駅から車で約15分または徒歩で約30分(急坂)。駐車場無料、24時間アクセス可能。深夜は近隣住民への配慮で大声・大音量NG、エンジン切って静かに撮影してください。冬季は道路凍結注意、4WD推奨。" },
        { q: "『君の名は。』聖地としての魅力は?", a: "新海誠監督が「諏訪湖を糸守湖のモデルにした」と公言、特に三葉が彗星の落下を見つめるシーンの背景は立石公園からの俯瞰。世界中から聖地巡礼者が訪れ、特に7〜8月の夕暮れ時(映画と同じ時間帯)が最も人気。撮影は劇中シーンと比較しながら構図を決めると感動が深まります。" },
        { q: "撮影機材のおすすめは?", a: "①広角(16-35mm)で諏訪湖と街全景②望遠(70-200mm)で湖面の細部・対岸の山々③標準ズームで遊歩道や東屋。三脚は混雑時通行妨害にならない位置で。Vlog撮影者用にスマホ用アタッチメント持参の方も多い。冬の夜景は氷点下、レンズの結露対策と予備バッテリー必携。" },
        { q: "おすすめの組合せ訪問は?", a: "①立石公園(夕方〜夜、夜景・星空)②諏訪大社(車20分、上社本宮・下社秋宮)③高島公園(車15分、桜と水鏡)④諏訪湖花火大会(8/15、要事前計画)⑤上諏訪温泉(湖畔の宿で1泊)。1〜2泊で諏訪エリアの『君の名は。』聖地・歴史・絶景・温泉を全て撮影できます。" },
      ],
      en: [
        { q: "What is Tateishi Park?", a: "A municipal park at 934 m in Suwa City, Nagano, overlooking Lake Suwa — one of Nagano's premier scenic vantages. Internationally famous as the model for Lake Itomori in Makoto Shinkai's «Your Name» (2016), it photographs beautifully at every hour: nightscapes, cherry blossoms, sunsets, and starscapes." },
        { q: "Tips for night view and starscape?", a: "Tripod essential. For night views: ISO 200, f/8, 10–30 s. For stars: ISO 3200, f/2.8, ~15 s. The 20–30 min after sunset (magic hour) gives the loveliest gradient of city lights against twilight sky. Winter air clarity even reveals Mt. Fuji; the August 15 fireworks festival makes the area extremely crowded." },
        { q: "Access and etiquette?", a: "About 15 minutes by car from JR Kami-Suwa Station, or 30 minutes on foot (steep). Free parking, 24-hour access. Late at night, be mindful of nearby residents — no loud voices or engine noise. Watch for icy roads in winter; a 4WD is recommended." },
        { q: "Why is it a «Your Name» pilgrimage site?", a: "Director Makoto Shinkai stated Lake Suwa was the model for Lake Itomori. The view from Tateishi Park is the backdrop where Mitsuha watches the comet fall. Pilgrims arrive from around the world; July–August dusk (matching the film's hours) is the most crowded. Comparing your composition to the film deepens the experience." },
        { q: "Recommended camera gear?", a: "①Wide angle (16–35mm) for the lake and full city view ②Telephoto (70–200mm) for lake-surface detail and far-shore mountains ③Standard zoom for the trail and gazebo. Tripod placement should not block paths during crowds. Vloggers often bring smartphone rigs. Winter night shots get sub-zero — bring condensation prevention and spare batteries." },
        { q: "Combined sightseeing route?", a: "①Tateishi Park (evening to night, night view + stars) ②Suwa Taisha (20 min by car, Kamisha Honmiya and Shimosha Akimiya) ③Takashima Park (15 min by car, cherry + reflection) ④Suwa Lake Fireworks (Aug 15, pre-plan required) ⑤Kami-Suwa Onsen (overnight ryokan). A 1–2 night plan covers Suwa's «Your Name» sites, history, vistas, and onsen." },
      ],
    },
    faqs: [
      { q: d("夜景・星空撮影のコツは？","Tips for night view and starscape?","夜景与星空拍摄秘诀？","夜景與星空拍攝秘訣？","야경과 별하늘 촬영 팁?"),
        a: d("三脚必須。夜景はISO200・F8・10〜30秒、星はISO3200・F2.8・15秒前後。日没後20〜30分のマジックアワーが街灯と空のグラデーションで最も美しい。","Tripod essential. For night views: ISO 200, f/8, 10-30 s. For stars: ISO 3200, f/2.8, ~15 s. The 20-30 min after sunset (magic hour) gives the loveliest gradient of city lights against twilight sky.","三脚架必备。夜景ISO200·F8·10-30秒；星空ISO3200·F2.8·15秒。日落后20-30分钟魔幻时刻街灯与天空渐变最美。","三腳架必備。夜景ISO200·F8·10-30秒；星空ISO3200·F2.8·15秒。日落後20-30分鐘魔幻時刻街燈與天空漸變最美。","삼각대 필수. 야경은 ISO200·F8·10-30초, 별은 ISO3200·F2.8·15초 전후. 일몰 후 20-30분의 매직아워가 가로등과 하늘 그라데이션으로 가장 아름답습니다.") },
    ],
  },
};
