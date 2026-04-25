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
      ],
      en: [
        { q: "What is Miyakojima?", a: "The main island of Okinawa's Miyako archipelago — a flat coral-uplift island of about 158 km². Famous for its «Miyako Blue» — among the world's clearest waters — Yonaha Maehama (Asia's whitest sand), and the Irabu Bridge, it draws over a million visitors a year as a subtropical paradise." },
        { q: "When does Miyako Blue shine brightest?", a: "Midday (11–14:00) on clear days. With the sun high, light reaches the seabed and shallow water turns white-cyan while deeper water becomes deep blue, producing the most vivid gradient. A polarizing filter cuts surface glare to deepen the blue further." },
        { q: "Best season and flight time?", a: "May to September for water clarity, peaking in July and August. September is typhoon season — watch warnings. October and April best avoid crowds. 45 minutes by air from Naha; 3 hr 20 min direct from Tokyo." },
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
      ],
      en: [
        { q: "What is Okinawa Main Island?", a: "The heart of Okinawa Prefecture — a 106 km long subtropical island. From 1429 to 1879 it was the independent «Ryukyu Kingdom,» whose distinctive culture is symbolized by Shurijo Castle. With Manzamo, Kouri Bridge, Churaumi Aquarium and more, it fuses tropical nature with Ryukyu heritage." },
        { q: "Suggested one-day shooting route on the main island?", a: "Morning at Shurijo → noon at Manzamo and Cape Zanpa → sunset at Kouri Bridge and Beach → night on Kokusai-dori. A car is essential for the north; given the distances, focus on either south or north for efficiency." },
        { q: "Best season and access?", a: "May to September for sea and sky (peak July–August; watch typhoons in September). October and April best avoid crowds. From Naha Airport, central Naha is 20 min by car; the northern Churaumi Aquarium is about 2 hours." },
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
      ],
      en: [
        { q: "What is Yokohama?", a: "The capital of Kanagawa Prefecture and Japan's second-largest city (about 3.77 million residents). Since opening in 1859 it has been Japan's gateway for international trade. With Minato Mirai 21's skyscrapers, the Red Brick Warehouse, Chinatown, and Yamashita Park, it is one of Kanto's premier nightscape destinations." },
        { q: "Best night-view spots in Yokohama?", a: "Osanbashi, the Red Brick Warehouse area, the Kisha-michi promenade, and Yamashita Park (Hikawa-maru) are the four classics. A wide lens framing Cosmo Clock 21 is the canonical shot. Blue hour (30 min after sunset) gives the best balance of sky and city lights." },
        { q: "When is the best season to photograph Yokohama?", a: "Nightscapes work year-round (clearer in winter), and Ferris-wheel illumination is brightest in winter. The Yokohama Port Festival fireworks (June) and the Christmas-season special illumination are particularly spectacular." },
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
      ],
      en: [
        { q: "What is Kamakura?", a: "An ancient capital in southeastern Kanagawa Prefecture, where Minamoto no Yoritomo founded Japan's first samurai government — the Kamakura Shogunate — in 1185. With 100+ temples and shrines, the National Treasure Great Buddha, Hasedera, Tsurugaoka Hachimangu, the Enoden coast, it offers history and sea in a single day's outing." },
        { q: "Must-see photo spots in Kamakura?", a: "The Great Buddha, Hasedera (hydrangeas, autumn colors), Tsurugaoka Hachimangu, Hokokuji's bamboo grove, and the Enoden Kamakurakokomae crossing (a «Slam Dunk» landmark). To cover all five in a day, plan an early-morning start." },
        { q: "When is the best season?", a: "Cherry blossoms early April, Hasedera's hydrangeas mid-June, autumn colors late November to early December, and Mt. Fuji with Enoshima in winter. Hasedera and Meigetsu-in see long lines during hydrangea season — go on a weekday morning." },
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
    definition: lh(
      "伊勢神宮は三重県伊勢市にある日本神道の最高位の神社で、全国約8万社の神社の頂点に位置する天照大神(皇室の祖神)を祀る聖地。皇大神宮(内宮、ないくう)と豊受大神宮(外宮、げくう)の2つの正宮を中心に、計125の宮社から構成され、その総称が「神宮」または「伊勢神宮」。約2,000年の歴史を持ち、20年ごとに社殿・神宝・装束のすべてを造り替える「式年遷宮(しきねんせんぐう)」(西暦690年から続く、次回は2033年)により常に瑞々しさを保つ世界でも稀有な祭祀文化を継承しています。",
      "Ise Jingu is the highest-ranking Shinto shrine in Japan, situated in Ise City, Mie Prefecture. As the head of approximately 80,000 shrines nationwide, it enshrines Amaterasu Omikami — the imperial ancestor deity. Centered on the two main sanctuaries — Naiku (Kotai Jingu) and Geku (Toyouke Daijingu) — it comprises 125 shrines in total, all known collectively as «Jingu» or «Ise Jingu.» With about 2,000 years of history, the shrine perpetuates the «Shikinen Sengu» — the rebuilding of every sanctuary, sacred treasure, and vestment every 20 years (a tradition unbroken since 690 AD; the next occurs in 2033) — preserving a ritual culture nearly without parallel in the world."
    ),
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
    },
    quickAnswers: {
      ja: [
        { q: "伊勢神宮とは?", a: "三重県伊勢市にある日本神道の最高位の神社で、全国約8万社の神社の頂点。天照大神を祀る内宮と豊受大神を祀る外宮を中心に125の宮社から成る、約2,000年の歴史を持つ日本の精神的中心です。" },
        { q: "内宮と外宮どちらから参拝?", a: "古来の慣習では外宮→内宮の順。両宮は約5km離れ、バスで15分。早朝5時から参拝可、人の少ない朝6〜8時が撮影にも最適です。所要時間は両宮で半日程度を見込んでください。" },
        { q: "撮影マナーは?", a: "正宮(御正宮)の中は撮影禁止。鳥居から内側は節度ある撮影にとどめ、参拝者や神職を直接撮らないのが原則。三脚使用は事前確認、内宮の朝5時開門が最も静かで光も柔らかいです。" },
      ],
      en: [
        { q: "What is Ise Jingu?", a: "The highest-ranking Shinto shrine in Japan, located in Ise City, Mie Prefecture. As the head of about 80,000 shrines nationwide, it enshrines Amaterasu Omikami at Naiku and Toyouke at Geku, comprising 125 shrines in total — Japan's spiritual heart with about 2,000 years of history." },
        { q: "Naiku or Geku first?", a: "Tradition: Geku first, then Naiku. The two sanctuaries are about 5 km apart, 15 minutes by bus. Both open from 5 AM, and 6–8 AM is best for photography with fewest visitors. Allow about half a day to visit both." },
        { q: "Photography etiquette?", a: "Inside the main sanctuaries is strictly off-limits. Keep photography modest within the torii gates, and avoid shooting worshippers or priests directly. Confirm tripod use in advance; Naiku's 5 AM opening offers the calmest, softest light." },
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
      ],
      en: [
        { q: "What are the Meoto Iwa?", a: "Two rocks rising from the sea before Futami Okitama Shrine in Ise, Mie Prefecture, joined by a 35 m, 40 kg sacred rope. Symbols of marital harmony, they offer one of the world's rarest sights: the sun rising directly between them around the summer solstice." },
        { q: "Specific dates and times for sunrise shots?", a: "Mid-May to late July, peaking around the solstice (June 21). Sunrise 4:40–5:00 AM. Arrive with tripod and telephoto lens an hour before. The miraculous mornings with Mt. Fuji silhouette occur only under specific conditions from December to February." },
        { q: "How do I get there?", a: "15 minutes on foot from JR Futaminoura Station, or 15 minutes by car from Ise Jingu Naiku. Free parking available. For sunrise shoots, arriving before dawn is essential — staying at Futamiura Onsen or Toba accommodations is most practical." },
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
    definition: lh(
      "清水寺は778年創建、京都府京都市東山区の真言宗系の単立寺院で、世界遺産「古都京都の文化財」の構成資産の一つ。本堂(国宝)の「清水の舞台」は釘を一本も使わない懸造り(かけづくり)技法による木造建築で、高さ13mの崖上から京都市街を一望できます。年間600万人以上が訪れる京都最大の集客地で、千手観音菩薩を本尊とし、平安時代から続く観音信仰の聖地として、また春の桜・秋の紅葉・冬の雪・夜のライトアップで日本写真の象徴的存在です。",
      "Kiyomizu-dera, founded in 778 in Kyoto's Higashiyama Ward, is an independent Shingon-school temple and a constituent property of the UNESCO «Historic Monuments of Ancient Kyoto.» Its National Treasure main hall — the famous «Kiyomizu Stage» — was built without a single nail using the kakezukuri stilt-construction method, projecting 13 m above a hillside with panoramic Kyoto views. Drawing more than 6 million visitors a year, it is Kyoto's most visited site. Enshrining a thousand-armed Kannon, it has been a center of Kannon worship since the Heian period, and its cherry blossoms, autumn colors, winter snow, and night illumination make it iconic in Japanese photography."
    ),
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
    },
    quickAnswers: {
      ja: [
        { q: "清水寺とは?", a: "778年創建、京都市東山区の世界遺産寺院。本堂「清水の舞台」は釘を一本も使わない懸造りの木造建築で、高さ13mから京都市街を一望。年間600万人以上が訪れる京都最大の集客地です。" },
        { q: "拝観時間と料金は?", a: "通常6:00開門、18:00閉門(時期で変動)、大人400円。春・夏・秋の特別夜間拝観時は21時頃まで(別途700円程度)。早朝6時開門時が人が最も少なく光も柔らかい撮影タイムです。" },
        { q: "撮影ベストシーズンは?", a: "桜の3月下旬〜4月上旬、新緑の5月、紅葉の11月下旬〜12月初旬がピーク。夜間ライトアップは特別期間のみで圧倒的に幻想的。雪が積もる冬は年に数回だけのレア構図です。" },
      ],
      en: [
        { q: "What is Kiyomizu-dera?", a: "A UNESCO World Heritage temple founded in 778 in Kyoto's Higashiyama Ward. The «Kiyomizu Stage» of the main hall — built without a single nail in kakezukuri stilt construction — projects 13 m above the hillside, offering panoramic city views. Over 6 million visitors annually make it Kyoto's most popular site." },
        { q: "What are opening hours and fees?", a: "Generally 6:00 to 18:00 (varies seasonally), ¥400 for adults. Special evening illumination periods in spring, summer, and autumn extend to ~21:00 (additional ¥700). The 6 AM opening is the quietest and offers the softest light for photography." },
        { q: "When is the best season to photograph it?", a: "Cherry blossoms peak late March to early April, fresh greenery in May, autumn colors late November to early December. The night illumination, held only during special periods, is the most magical. Winter snow shots are rare — possible only a few times a year." },
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
      ],
      en: [
        { q: "What is Kinkaku-ji?", a: "A Rinzai Zen temple — formally Rokuon-ji — founded on the site of the Kitayama Villa built in 1397 by shogun Ashikaga Yoshimitsu. Its three-tier reliquary hall covered entirely in gold leaf is called «Kinkaku» (Golden Pavilion) and the temple is a constituent property of UNESCO's «Historic Monuments of Ancient Kyoto.»" },
        { q: "Tips for photographing Kinkaku?", a: "Right at 9 AM opening in forward light (facing south) is best. A polarizing filter helps tune the water reflection for a vivid mirror image. After rain also yields beautiful mirror shots. Tripod use is restricted in some zones — confirm in advance." },
        { q: "When is the best season to visit?", a: "Beautiful year-round, but cherry blossoms in late March, fresh green in May, and autumn colors mid-to-late November all add color. Snow-capped Kinkaku is rare — only a few days from late December to February. Winter mornings below 0 °C produce the clearest pond mirror." },
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
      ],
      en: [
        { q: "What is Byodoin Phoenix Hall?", a: "A UNESCO World Heritage temple in Uji, Kyoto Prefecture, built in 1053 by Fujiwara no Yorimichi. Its symmetrical silhouette floating on Aji Pond — depicted on the reverse of the ¥10 coin — is one of Japan's foremost works of historic architecture, embodying the Pure Land that Heian aristocrats yearned for." },
        { q: "Best photo position?", a: "The classic shot is from the south side of Aji Pond, in forward light. The 8:30 AM opening offers the calmest water and brightest mirror reflection. Wisteria in late April, autumn colors in late November, and rare winter snow each add unique character." },
        { q: "What are admission fees and time required?", a: "Garden plus Hosho-kan Museum is ¥600 for adults; interior tours of Phoenix Hall are an additional ¥300 (timed entry, capacity 50). Plan two hours for the gardens, three including the interior." },
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
      ],
      en: [
        { q: "What is Tofuku-ji?", a: "A Rinzai Zen head temple founded in 1236 in Kyoto's Higashiyama Ward. One of Kyoto's largest Zen temples, with a National Treasure Sanmon Gate, the famous «sea of maples» from Tsuten-kyo Bridge, the Mirei Shigemori-designed hojo garden, and 25 sub-temples." },
        { q: "When are autumn colors at their best?", a: "Peak is typically late November to early December. Photography from Tsuten-kyo is restricted during peak weeks to ease congestion. Early morning right after the 8:30 opening offers thin crowds. Track sudden cold snaps that trigger color." },
        { q: "What are admission fees and time required?", a: "About ¥400 for Tsuten-kyo and the Founder's Hall, ¥400 for the hojo garden, ~¥1,000 for the combined ticket. Including sub-temples, allow 2–3 hours. During peak weeks, traffic and entry restrictions apply — check in advance." },
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
      ],
      en: [
        { q: "What is Dogo Onsen?", a: "One of Japan's oldest hot springs (about 3,000 years) in Matsuyama City, Ehime. Dogo Onsen Honkan (built 1894) is an Important Cultural Property, the setting of Soseki's «Botchan» and one of the inspirations for the bathhouse in «Spirited Away» — the very symbol of Shikoku hot-spring culture." },
        { q: "Can I bathe at the Honkan now?", a: "Under major restoration since 2019, with full reopening expected December 2024. Some floors remain open for bathing and viewing during works. The exterior is photogenic both day and night, especially the wooden three-tier illumination in the evening." },
        { q: "Best photography times and etiquette?", a: "Exteriors at dawn (few visitors) and evening/night illumination are the two best windows. Try alley-framed compositions behind the building. Some interior areas are off-limits to respect bathers' privacy — check signage carefully." },
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
      ],
      en: [
        { q: "What is Matsuyama Castle?", a: "A flatland-mountain castle in Matsuyama City, Ehime, built atop the 132 m Mt. Katsuyama and one of Japan's 12 surviving original keeps. Completed in 1627 with the keep rebuilt in 1854, its connected keep structure, 21 Important Cultural Property buildings, and Shikoku-leading status make it remarkable." },
        { q: "Ropeway or chairlift?", a: "If weather permits, the open chairlift offers a more immersive ride for the panorama (about 3 minutes). A combined ticket covers both. The ropeway is safer in rain or strong wind." },
        { q: "When is the best season to photograph it?", a: "Cherry blossoms in early April (500 Yoshino cherries on the Honmaru plaza), autumn colors in late November, rare winter snow shots, and year-round night illumination. Arrive at the 6 AM opening for thin crowds and softest light." },
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
      ],
      en: [
        { q: "What is Nikobuchi?", a: "A sacred pool on the upper Edagawa River (a tributary of the Niyodo River system) in Ino Town, Kochi Prefecture. It is the most vivid spot to witness «Niyodo Blue,» the phenomenon born of Japan's last clear river, and locally revered as a water deity's dwelling." },
        { q: "When is the blue strongest?", a: "Clear midday (10:00–14:00), especially summer to early autumn. After rain the water is high and turbid — dry weather is ideal. Carry a polarizing filter; suppressing surface reflections deepens the blue." },
        { q: "Access and precautions?", a: "About 1 hour by car from Kochi City; from the parking lot, descend ~10 minutes of steep stairs. Non-slip footwear required. Swimming, eating, camping, and drones are strictly forbidden — photograph quietly out of respect for this sacred site." },
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
      ],
      en: [
        { q: "What is Katsurahama?", a: "A 400 m bow-shaped beach in Kochi City facing the Pacific, celebrated in the Kokin Wakashu as a great moon-viewing site. The Sakamoto Ryoma statue makes it «the symbol of Tosa,» and the surrounding Katsurahama Park includes an aquarium, the Ryoma Memorial Museum, and observatories — Kochi's largest sightseeing site." },
        { q: "Best angle for the Ryoma statue?", a: "From low angle on the seaside, reached by climbing the stairs behind the pedestal — pairs Ryoma with the Pacific backdrop. Sunset gives a striking silhouette; clear daytime light produces a sky-blue portrait. Both work." },
        { q: "Best photography times?", a: "Sunrise (with the sun rising over the Pacific to the east) and twilight (with the western sun illuminating the statue) are best. The mid-autumn full moon (September) is especially rare — moonlight over the sea. Winter's pounding surf is also dramatic." },
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
      ],
      en: [
        { q: "What is Beppu?", a: "A hot-spring resort in Beppu City, Oita Prefecture, with about 2,288 sources and Japan's greatest output. Comprising eight districts (Beppu Hatto), seven naturally erupting Hells like Sea Hell and Blood Pond Hell, and citywide steam plumes, Beppu offers a photographic landscape unmatched anywhere." },
        { q: "How long does the Hells tour take?", a: "All 7 Hells take 2–3 hours; the combined ticket (Jigoku Kyotsu, ¥2,200 for adults) saves money. Sea Hell, Blood Pond Hell, and Tatsumaki Geyser are the top three photo spots — time your visit around the geyser's eruption schedule." },
        { q: "When are steam plumes thickest?", a: "On winter (December–February) mornings, especially below freezing, when the gap between air and water temperature produces the densest steam. Wait at the Kannawa Yukemuri Observatory before sunrise — the moment first light strikes the town is the golden shot." },
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
      ],
      en: [
        { q: "What is Yufuin?", a: "A hot-spring town in Yufu City, Oita Prefecture, on a 400–500 m plateau beneath Mt. Yufu (1,583 m). Since 1995, regulated community-led development has shaped one of Japan's most refined onsen towns. With 852 sources (Japan's second-most) and the famous Lake Kinrin morning mist, it is especially popular with women travelers." },
        { q: "Conditions for morning mist at Lake Kinrin?", a: "Clear mornings November to March with temperatures below 5 °C. The thermal gap between hot-spring water and air creates the mist, densest from just before sunrise to one hour after. From the lakeside foot bath you can see steam and mist rising in double layers — pure fantasy." },
        { q: "How does Yufuin differ from Beppu?", a: "Beppu impresses with sheer onsen volume and the dramatic Hells; Yufuin offers quiet, highland refinement. About 1 hour by car from Beppu, near Yufuin IC. You can visit both in a single day, but staying overnight in Yufuin is ideal to capture the night and morning mist." },
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
    definition: lh(
      "姫路城(ひめじじょう)は兵庫県姫路市本町68番地に位置する平山城で、1346年に赤松貞範が築いた砦が起源、1601〜1609年に池田輝政が現在の大規模な大改築を行った日本最大級の木造城郭。1993年に法隆寺と並んで日本初の世界文化遺産として登録、現存12天守の中でも唯一の世界遺産であり国宝。白漆喰総塗籠の優美な姿が白鷺(しらさぎ)が羽を広げたようだとして「白鷺城(はくろじょう)」と称されます。2009〜2015年の「平成の大修理」で漆喰を塗り直し、純白の姿を取り戻した今、桜・新緑・雪との組合せは日本を代表する絵画的風景です。",
      "Himeji Castle, located at 68 Honmachi, Himeji City, Hyogo Prefecture, is a flatland-mountain castle whose origins trace to a 1346 fort built by Akamatsu Sadanori, with Ikeda Terumasa carrying out the major reconstruction we see today between 1601 and 1609. One of Japan's largest wooden castles, it was registered in 1993 as Japan's first World Cultural Heritage site (alongside Horyu-ji), making it both the only UNESCO-listed castle among the 12 surviving original keeps and a National Treasure. Its white-stucco silhouette is likened to a white heron spreading its wings, earning the name «White Heron Castle» (Hakuro-jo). After the 2009–2015 «Heisei Restoration» renewed the plaster, its now-pristine white form combined with cherry blossoms, fresh greenery, or snow creates a portrait of Japan that few other places can match."
    ),
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
    },
    quickAnswers: {
      ja: [
        { q: "姫路城とは?", a: "兵庫県姫路市の平山城で、1601〜1609年に池田輝政が大改築した日本最大級の木造城郭。1993年に日本初の世界文化遺産・国宝、現存12天守唯一の世界遺産で、白漆喰の優美な姿から「白鷺城」と呼ばれる名城です。" },
        { q: "桜と姫路城を撮るベスト時期は?", a: "例年4月上旬、特に3月末〜4月第1週がピーク。三の丸広場、西の丸庭園、シロトピア記念公園、男山配水池公園の4箇所が定番。早朝6時開門時が人少なく光柔らか、夕焼けの白鷺城も絶景。" },
        { q: "撮影ベストポイントは?", a: "大手門前(正面)、三の丸広場(桜と共に)、西の丸庭園(側面)、シロトピア記念公園(俯瞰)、男山配水池公園(真正面の俯瞰、知る人ぞ知る穴場)。1日かけて全方位から撮ると圧巻です。" },
      ],
      en: [
        { q: "What is Himeji Castle?", a: "A flatland-mountain castle in Himeji City, Hyogo, with the major reconstruction we see today carried out by Ikeda Terumasa between 1601 and 1609. One of Japan's largest wooden castles, it was registered in 1993 as Japan's first World Cultural Heritage site, is a National Treasure, and is the only UNESCO castle among the 12 surviving originals — nicknamed «White Heron Castle» for its graceful white silhouette." },
        { q: "Best time to shoot the castle with cherry blossoms?", a: "Typically early April, especially late March to first week of April. Classic spots: Sannomaru Plaza, Nishi-no-Maru Garden, Shirotopia Memorial Park, and Otoko-yama Park. The 6 AM opening offers thin crowds and soft light. The white silhouette at sunset is also exceptional." },
        { q: "Best photography spots?", a: "Front of Otemon (frontal), Sannomaru Plaza (with cherry blossoms), Nishi-no-Maru Garden (side view), Shirotopia Memorial Park (elevated view), and Otoko-yama Park (a hidden hilltop vantage). A full-day circuit yields stunning variety." },
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
      ],
      en: [
        { q: "What is Shirakawa-go?", a: "A gassho-zukuri village in Shirakawa Village, Gifu, UNESCO-listed in 1995. The Ogimachi village preserves 114 farmhouses with 60° thatched roofs that supported extended families across 3–4 generations — the embodiment of the Japanese rural landscape." },
        { q: "Shooting from the observatory?", a: "Ogimachi Castle Ruins Observatory overlooks the entire village — the classic vantage. Autumn-winter mist, January–February snow, and May greenery each yield masterpieces. Reach by a 20-minute walk or paid shuttle, with parking nearby." },
        { q: "When is the light-up?", a: "Held on a limited number of dates (about six per year) in January and February. Observatory access is reservation-only (paid since 2024); only village guests or lottery winners may enter. Early planning is essential." },
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
      ],
      en: [
        { q: "What is Chichibugahama?", a: "A shallow beach in Nio, Mitoyo City, Kagawa Prefecture, that rose to global fame as «Japan's Uyuni Salt Flat» from around 2017. Tidal pools at low tide reflect sky and setting sun, enabling silhouette photography that produces almost otherworldly images." },
        { q: "What conditions create the mirror reflection?", a: "①Low tide coinciding with sunset ②Near-zero wind ③Clouds in the sky (a clear sky looks flat). Mitoyo City Tourism publishes the «Sky Mirror Calendar» — confirm before going. The golden window is 15 minutes before to 30 minutes after sunset." },
        { q: "Tips for silhouette photography?", a: "Spread arms and jump, hold the sun in a pinch, or lie down — dynamic poses photograph best. Lower the camera nearly to ground level for a low angle. Have your subject stand behind the puddle so the reflection is clean." },
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
      ],
      en: [
        { q: "What is Horyu-ji?", a: "The head temple of the Shotoku sect in Ikaruga, Nara, said to have been founded in 607 by Prince Shotoku — preserving the world's oldest wooden architecture. Registered in 1993 as one of Japan's first World Cultural Heritage sites, its Kondo and five-story pagoda still stand from about 1,300 years ago, and the temple holds some 4,600 designated cultural assets — the supreme repository of Japanese Buddhist art." },
        { q: "Photography rules?", a: "The exterior buildings are open for photography; statues inside the halls are mostly off-limits. No tripods or flashes even outdoors; be mindful of worshippers. Early morning (8 AM opening) and late afternoon offer thin crowds and soft light." },
        { q: "Access and admission fees?", a: "From JR Horyu-ji Station: 20-minute walk or 7-minute bus. The combined ticket (Sai-in, Daihozoin, To-in) is ¥1,500. Allow 2–3 hours. Day trips from Kyoto or Nara are easy — about 45 minutes from Kyoto Station by rapid train." },
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
    faqs: [
      { q: d("夜景・星空撮影のコツは？","Tips for night view and starscape?","夜景与星空拍摄秘诀？","夜景與星空拍攝秘訣？","야경과 별하늘 촬영 팁?"),
        a: d("三脚必須。夜景はISO200・F8・10〜30秒、星はISO3200・F2.8・15秒前後。日没後20〜30分のマジックアワーが街灯と空のグラデーションで最も美しい。","Tripod essential. For night views: ISO 200, f/8, 10-30 s. For stars: ISO 3200, f/2.8, ~15 s. The 20-30 min after sunset (magic hour) gives the loveliest gradient of city lights against twilight sky.","三脚架必备。夜景ISO200·F8·10-30秒；星空ISO3200·F2.8·15秒。日落后20-30分钟魔幻时刻街灯与天空渐变最美。","三腳架必備。夜景ISO200·F8·10-30秒；星空ISO3200·F2.8·15秒。日落後20-30分鐘魔幻時刻街燈與天空漸變最美。","삼각대 필수. 야경은 ISO200·F8·10-30초, 별은 ISO3200·F2.8·15초 전후. 일몰 후 20-30분의 매직아워가 가로등과 하늘 그라데이션으로 가장 아름답습니다.") },
    ],
  },
};
