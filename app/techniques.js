/**
 * 撮影技法ガイド (Techniques) — タグ (被写体属性) とは別軸の「撮影手法」コンテンツ。
 * 8 topics × 20言語 = 160URL.
 * 各topic: name (20言語), desc (5言語), 関連loc, howTo (5言語のsteps).
 */

export const TECHNIQUES = {
  "long-exposure": {
    locs: ["小樽", "三段滝公園", "横浜", "宮古島", "立石公園", "洞爺湖"],
    name: { ja:"長時間露光", en:"Long Exposure", zh:"长曝光", "zh-tw":"長曝光", ko:"장노출", es:"Larga exposición", fr:"Pose longue", de:"Langzeitbelichtung", pt:"Longa exposição", it:"Lunga esposizione", ru:"Длинная выдержка", ar:"تعريض طويل", hi:"लंबा एक्सपोज़र", th:"เปิดรับแสงนาน", vi:"Phơi sáng lâu", id:"Pencahayaan Lama", tr:"Uzun Pozlama", nl:"Lange sluitertijd", pl:"Długi czas naświetlania", sv:"Lång exponering" },
    desc: {
      ja: "シャッタースピードを長くして、水・雲・光跡を流動的に表現する技法。三脚必須、NDフィルターが鍵。",
      en: "Slow shutter speeds that smooth water, clouds, and light trails into flowing motion. Tripod required; ND filters are the key tool.",
      zh: "慢快门让水流、云朵和光迹呈现流动质感。三脚架必备，ND滤镜是关键。",
      "zh-tw": "慢快門讓水流、雲朵和光跡呈現流動質感。三腳架必備，ND濾鏡是關鍵。",
      ko: "느린 셔터 속도로 물, 구름, 빛의 궤적을 흐르듯 표현하는 기법. 삼각대 필수, ND 필터가 관건.",
    },
    steps: [
      { ja: "三脚をしっかり固定", en: "Lock down a sturdy tripod" },
      { ja: "ISO100、絞りF8〜F16", en: "ISO 100, f/8–f/16" },
      { ja: "ND8〜ND1000で日中の光量調整", en: "ND8–ND1000 to cut daytime light" },
      { ja: "シャッタースピード1〜30秒", en: "Shutter 1–30 sec" },
      { ja: "レリーズ or 2秒タイマーで振動排除", en: "Use remote or 2-sec timer to eliminate vibration" },
    ],
  },
  "blue-hour": {
    locs: ["小樽", "横浜", "立石公園", "東京", "中町通り(松本市)", "清水寺"],
    name: { ja:"ブルーアワー", en:"Blue Hour", zh:"蓝色时刻", "zh-tw":"藍色時刻", ko:"블루아워", es:"Hora azul", fr:"Heure bleue", de:"Blaue Stunde", pt:"Hora azul", it:"Ora blu", ru:"Синий час", ar:"الساعة الزرقاء", hi:"नीला घंटा", th:"ชั่วโมงสีน้ำเงิน", vi:"Giờ xanh", id:"Jam Biru", tr:"Mavi Saat", nl:"Blauwe uur", pl:"Niebieska godzina", sv:"Blå timmen" },
    desc: {
      ja: "日没後10〜30分、空が深い青色を残す時間帯。街灯の暖色との対比が最も美しい撮影タイム。",
      en: "The 10–30 minutes after sunset when deep blue lingers in the sky. The contrast with warm streetlights makes this the most beautiful shooting window.",
      zh: "日落后10-30分钟，天空残留深蓝色的时段。街灯暖色对比下，景色最美。",
      "zh-tw": "日落後10-30分鐘，天空殘留深藍色的時段。街燈暖色對比下，景色最美。",
      ko: "일몰 후 10-30분간 하늘이 깊은 푸른빛을 띠는 시간. 가로등의 따뜻한 빛과 대비가 가장 아름답습니다.",
    },
    steps: [
      { ja: "日没時刻を確認 (天気アプリ・PhotoPills)", en: "Check sunset time (weather app or PhotoPills)" },
      { ja: "日没15分前までに到着、構図確定", en: "Arrive 15 min before sunset to lock composition" },
      { ja: "三脚＋低ISO (100-400)", en: "Tripod with low ISO (100–400)" },
      { ja: "ホワイトバランス4000K前後で青を強調", en: "WB ~4000 K to intensify the blue" },
      { ja: "日没後10〜30分の窓を逃さない", en: "Don't miss the 10–30 min window post-sunset" },
    ],
  },
  "golden-hour": {
    locs: ["新倉山浅間公園", "河口湖", "夫婦岩", "横山展望台", "立石公園", "弘法山古墳", "亀老山展望台", "美幌峠"],
    name: { ja:"ゴールデンアワー", en:"Golden Hour", zh:"黄金时刻", "zh-tw":"黃金時刻", ko:"골든아워", es:"Hora dorada", fr:"Heure dorée", de:"Goldene Stunde", pt:"Hora dourada", it:"Ora dorata", ru:"Золотой час", ar:"الساعة الذهبية", hi:"सुनहरा घंटा", th:"ชั่วโมงทอง", vi:"Giờ vàng", id:"Jam Emas", tr:"Altın Saat", nl:"Gouden uur", pl:"Złota godzina", sv:"Gyllene timmen" },
    desc: {
      ja: "日の出直後と日没直前の1時間。太陽が低く、暖色の柔らかい光が風景を美しく染める時間帯。",
      en: "The hour after sunrise and before sunset. The sun sits low and soft warm light bathes landscapes — the most flattering light of the day.",
      zh: "日出后及日落前的一小时。太阳低悬，暖色柔光为风景染上最美的色调。",
      "zh-tw": "日出後及日落前的一小時。太陽低懸，暖色柔光為風景染上最美的色調。",
      ko: "일출 직후와 일몰 직전 1시간. 태양이 낮고 따뜻한 부드러운 빛이 풍경을 아름답게 물들이는 시간대.",
    },
    steps: [
      { ja: "日の出/日没時刻を1日前に確認", en: "Check sunrise/sunset time the day before" },
      { ja: "30分前に現地到着して構図準備", en: "Arrive 30 min ahead to set composition" },
      { ja: "順光で被写体を浮かび上がらせる", en: "Front-light brings subjects forward" },
      { ja: "逆光でシルエット・レンズフレア活用", en: "Backlight for silhouettes and lens flare" },
      { ja: "WB日陰モードで暖色を強調", en: "Use 'shade' WB to enhance warm tones" },
    ],
  },
  "astrophotography": {
    locs: ["長野県天空の楽園", "駒つなぎの桜", "立石公園"],
    name: { ja:"星景写真", en:"Astrophotography", zh:"星空摄影", "zh-tw":"星空攝影", ko:"별 사진", es:"Astrofotografía", fr:"Astrophotographie", de:"Astrofotografie", pt:"Astrofotografia", it:"Astrofotografia", ru:"Астрофотография", ar:"تصوير الفلك", hi:"खगोल फोटोग्राफी", th:"การถ่ายภาพดาราศาสตร์", vi:"Nhiếp ảnh thiên văn", id:"Astrofotografi", tr:"Astrofotoğrafçılık", nl:"Astrofotografie", pl:"Astrofotografia", sv:"Astrofotografi" },
    desc: {
      ja: "天の川や星空を撮影する技法。新月期・暗い空・F2.8明るいレンズが必須。500ルールでブレを防ぐ。",
      en: "Capturing the Milky Way and stars. New-moon timing, dark skies, and a fast f/2.8 lens are essential. Use the 500 rule to avoid star trails.",
      zh: "拍摄银河与星空的技法。新月期、暗空、F2.8明亮镜头必备。500规则防止星轨。",
      "zh-tw": "拍攝銀河與星空的技法。新月期、暗空、F2.8明亮鏡頭必備。500規則防止星軌。",
      ko: "은하수와 별을 촬영하는 기법. 신월기·어두운 하늘·F2.8 밝은 렌즈가 필수. 500법칙으로 흔들림 방지.",
    },
    steps: [
      { ja: "新月期±3日の晴天を狙う", en: "Target ±3 days from new moon, clear sky" },
      { ja: "光害マップで暗い場所を探す", en: "Use light pollution maps to find dark skies" },
      { ja: "広角F2.8、ISO3200-6400、SS15-25秒 (500/焦点距離)", en: "Wide f/2.8, ISO 3200–6400, 15–25 s (500/focal length)" },
      { ja: "RAW撮影、ホワイトバランス3500-4000K", en: "Shoot RAW, WB 3500–4000 K" },
      { ja: "前景に山や桜などを入れて奥行きを出す", en: "Add foreground (mountain, tree) for depth" },
    ],
  },
  "reflection": {
    locs: ["河口湖", "諏訪湖", "父母ヶ浜", "高島公園(諏訪市)", "平等院鳳凰堂", "駒つなぎの桜", "摩周湖"],
    name: { ja:"水鏡", en:"Reflection", zh:"水镜倒影", "zh-tw":"水鏡倒影", ko:"수경 반사", es:"Reflejo", fr:"Reflet", de:"Spiegelung", pt:"Reflexo", it:"Riflesso", ru:"Отражение", ar:"انعكاس", hi:"प्रतिबिंब", th:"เงาสะท้อน", vi:"Phản chiếu", id:"Refleksi", tr:"Yansıma", nl:"Weerspiegeling", pl:"Odbicie", sv:"Reflektion" },
    desc: {
      ja: "湖面・水たまり・濡れた地面に被写体を映す撮影法。逆さ富士や逆さ桜の幻想的な構図が代表的。",
      en: "Mirroring subjects on lake surfaces, puddles, or wet ground. The «inverted Fuji» or «inverted sakura» represents this technique's most iconic frames.",
      zh: "在湖面、水洼、湿地表面映出被摄物体。逆富士、逆樱花是代表性的梦幻构图。",
      "zh-tw": "在湖面、水窪、濕地表面映出被攝物體。逆富士、逆櫻花是代表性的夢幻構圖。",
      ko: "호수면, 물웅덩이, 젖은 지면에 피사체를 비추는 기법. 거꾸로 후지, 거꾸로 사쿠라가 대표적인 환상적 구도.",
    },
    steps: [
      { ja: "風がない時間帯 (早朝・夕方) を選ぶ", en: "Pick windless times (dawn or dusk)" },
      { ja: "PLフィルターは弱め (強すぎると反射消失)", en: "Use CPL gently — too strong erases the reflection" },
      { ja: "水面ぎりぎりにカメラを下げる", en: "Lower camera close to water surface" },
      { ja: "対称構図のため水平器使用", en: "Use a level for symmetric composition" },
      { ja: "後処理で上下バランスを微調整", en: "Fine-tune top/bottom balance in post" },
    ],
  },
  "silhouette": {
    locs: ["父母ヶ浜", "夫婦岩", "桂浜", "立石公園"],
    name: { ja:"シルエット", en:"Silhouette", zh:"剪影", "zh-tw":"剪影", ko:"실루엣", es:"Silueta", fr:"Silhouette", de:"Silhouette", pt:"Silhueta", it:"Silhouette", ru:"Силуэт", ar:"ظلال", hi:"छायाचित्र", th:"เงา", vi:"Bóng", id:"Siluet", tr:"Silüet", nl:"Silhouet", pl:"Sylwetka", sv:"Siluett" },
    desc: {
      ja: "明るい背景に対して被写体を真っ黒に写す技法。夕焼け空をバックにした人物・建物が定番構図。",
      en: "Subjects rendered as solid black against a bright background. Sunset sky behind people or structures is the classic frame.",
      zh: "明亮背景下让被摄物体呈现纯黑色。夕阳背景下的人或建筑剪影是经典构图。",
      "zh-tw": "明亮背景下讓被攝物體呈現純黑色。夕陽背景下的人或建築剪影是經典構圖。",
      ko: "밝은 배경에 피사체를 검게 처리하는 기법. 노을을 배경으로 한 인물·건물 실루엣이 정석.",
    },
    steps: [
      { ja: "光源 (太陽) を被写体の真後ろに", en: "Place the light source directly behind subject" },
      { ja: "スポット測光で背景の空に合わせる", en: "Spot-meter on the bright background sky" },
      { ja: "露出補正-1〜-2EVで黒を引き締める", en: "Exposure compensation -1 to -2 EV" },
      { ja: "輪郭がくっきり分かる被写体を選ぶ", en: "Choose subjects with clear outlines" },
      { ja: "RAW撮影で後で微調整", en: "Shoot RAW for post-processing flexibility" },
    ],
  },
  "fog-mist": {
    locs: ["白川郷", "湯布院", "美幌峠", "摩周湖", "知床"],
    name: { ja:"霧・もや", en:"Fog & Mist", zh:"雾・霾", "zh-tw":"霧・霾", ko:"안개", es:"Niebla y bruma", fr:"Brouillard et brume", de:"Nebel und Dunst", pt:"Névoa e bruma", it:"Nebbia e foschia", ru:"Туман и дымка", ar:"الضباب", hi:"धुंध और कोहरा", th:"หมอกและไอน้ำ", vi:"Sương và mù", id:"Kabut", tr:"Sis ve Pus", nl:"Mist en nevel", pl:"Mgła i mgiełka", sv:"Dimma och dis" },
    desc: {
      ja: "霧や朝靄を使った幻想的な撮影。秋から冬の早朝、温度差が大きい盆地で発生しやすい。",
      en: "Atmospheric photography using fog or morning mist. Most likely in autumn-winter dawn, in basins with large temperature gaps.",
      zh: "利用雾气或晨霭的梦幻摄影。秋冬清晨温差大的盆地最易出现。",
      "zh-tw": "利用霧氣或晨靄的夢幻攝影。秋冬清晨溫差大的盆地最易出現。",
      ko: "안개나 아침 안개를 활용한 환상적 촬영. 가을~겨울 새벽, 온도차가 큰 분지에서 가장 잘 발생.",
    },
    steps: [
      { ja: "前夜の天気予報で気温差・湿度確認", en: "Check temp differential and humidity the night before" },
      { ja: "盆地や湖の周辺、日の出30分前到着", en: "Arrive at basins/lakes 30 min before sunrise" },
      { ja: "光が霧に差し込むタイミングを狙う", en: "Capture light rays piercing the fog" },
      { ja: "露出補正+1EVで霧を白く保つ", en: "+1 EV exposure to keep fog white" },
      { ja: "コントラスト弱めの柔らかい仕上げ", en: "Soft, low-contrast post-processing" },
    ],
  },
  "panorama": {
    locs: ["美幌峠", "立石公園", "亀老山展望台", "朝熊山展望台", "横山展望台", "弘法山古墳", "城山公園(松本市)"],
    name: { ja:"パノラマ", en:"Panorama", zh:"全景", "zh-tw":"全景", ko:"파노라마", es:"Panorama", fr:"Panorama", de:"Panorama", pt:"Panorama", it:"Panorama", ru:"Панорама", ar:"بانوراما", hi:"मनोरम", th:"พาโนรามา", vi:"Toàn cảnh", id:"Panorama", tr:"Panorama", nl:"Panorama", pl:"Panorama", sv:"Panorama" },
    desc: {
      ja: "複数枚を撮影して合成し、超広角の風景を表現。展望台や山頂からの大パノラマに最適。",
      en: "Shoot multiple frames and stitch them for ultra-wide vistas. Ideal from observation decks and mountain summits.",
      zh: "拍多张合成超广角风景。展望台、山顶大全景最适合。",
      "zh-tw": "拍多張合成超廣角風景。展望台、山頂大全景最適合。",
      ko: "여러 장을 촬영해 합성하여 초광각 풍경을 표현. 전망대나 산 정상의 대 파노라마에 최적.",
    },
    steps: [
      { ja: "三脚 + パノラマ雲台で水平回転", en: "Tripod + panoramic head for level rotation" },
      { ja: "縦構図で30%以上重ねながら撮影", en: "Vertical frames with 30%+ overlap" },
      { ja: "マニュアル露出・WB固定", en: "Lock exposure and WB manually" },
      { ja: "Lightroom / PhotoshopのPhoto Mergeで合成", en: "Stitch with Lightroom or Photoshop Photo Merge" },
      { ja: "周辺の歪みを後処理で補正", en: "Correct edge distortion in post" },
    ],
  },
  "macro": {
    locs: ["新倉山浅間公園", "高遠城址公園", "梅林公園", "駒つなぎの桜", "安養寺", "三段滝公園"],
    name: { ja:"マクロ撮影", en:"Macro Photography", zh:"微距摄影", "zh-tw":"微距攝影", ko:"매크로 촬영", es:"Fotografía macro", fr:"Macro photographie", de:"Makrofotografie", pt:"Fotografia macro", it:"Fotografia macro", ru:"Макросъёмка", ar:"التصوير المقرّب", hi:"मैक्रो फोटोग्राफी", th:"ถ่ายภาพมาโคร", vi:"Nhiếp ảnh macro", id:"Fotografi makro", tr:"Makro fotoğrafçılık", nl:"Macrofotografie", pl:"Makrofotografia", sv:"Makrofotografering" },
    desc: {
      ja: "桜の花弁、紅葉の葉脈、苔、霜、雪の結晶など、肉眼では見えない世界を捉える技法。被写界深度が極めて浅いため正確なピント合わせが鍵。",
      en: "Capture worlds invisible to the naked eye — cherry petals, leaf veins, moss, frost, snowflakes. Depth of field is extremely shallow, so precise focus is the key.",
      zh: "捕捉肉眼看不见的世界——樱花瓣、红叶脉、青苔、霜、雪花。景深极浅，精确对焦是关键。",
      "zh-tw": "捕捉肉眼看不見的世界——櫻花瓣、紅葉脈、青苔、霜、雪花。景深極淺，精確對焦是關鍵。",
      ko: "벚꽃 꽃잎, 단풍잎 잎맥, 이끼, 서리, 눈 결정 등 육안으로는 보이지 않는 세계를 포착하는 기법. 피사계심도가 매우 얕아 정확한 핀 맞춤이 관건.",
    },
    steps: [
      { ja: "マクロレンズ(90mm or 100mm)を使用", en: "Use a macro lens (90mm or 100mm)" },
      { ja: "三脚必須・1cmのズレで写真が変わる", en: "Tripod essential — 1cm shift changes the shot" },
      { ja: "F8〜F16で被写界深度を稼ぐ", en: "Stop down to f/8–f/16 for depth" },
      { ja: "風がない瞬間を待つ(屋外)", en: "Wait for windless moments outdoors" },
      { ja: "フォーカスブラケット+合成で被写界深度を拡張", en: "Focus bracket + stack to extend DOF" },
    ],
  },
  "composition": {
    locs: ["新倉山浅間公園", "東福寺", "金閣寺", "平等院鳳凰堂", "父母ヶ浜", "立石公園", "夫婦岩"],
    name: { ja:"構図", en:"Composition", zh:"构图", "zh-tw":"構圖", ko:"구도", es:"Composición", fr:"Composition", de:"Bildkomposition", pt:"Composição", it:"Composizione", ru:"Композиция", ar:"التكوين", hi:"रचना", th:"องค์ประกอบ", vi:"Bố cục", id:"Komposisi", tr:"Kompozisyon", nl:"Compositie", pl:"Kompozycja", sv:"Komposition" },
    desc: {
      ja: "三分割法、リーディングライン、シンメトリー、フレーミングなど、被写体を効果的に配置する基本ルール。風景写真の質を決める最も重要な要素。",
      en: "Rule of thirds, leading lines, symmetry, framing — fundamental rules for placing subjects effectively. The single most important factor in landscape quality.",
      zh: "三分法、引导线、对称、框景等被摄体有效配置的基本规则。决定风景摄影品质的最重要因素。",
      "zh-tw": "三分法、引導線、對稱、框景等被攝體有效配置的基本規則。決定風景攝影品質的最重要因素。",
      ko: "3분할법, 리딩 라인, 대칭, 프레이밍 등 피사체를 효과적으로 배치하는 기본 규칙. 풍경 사진의 질을 결정하는 가장 중요한 요소.",
    },
    steps: [
      { ja: "三分割線の交点に主役を置く", en: "Place subject at rule-of-thirds intersections" },
      { ja: "前景・中景・遠景の3層で奥行き", en: "Three layers — foreground, mid, background — for depth" },
      { ja: "リーディングライン(道・川・桜並木)で視線誘導", en: "Use leading lines (paths, rivers, cherry rows) to guide the eye" },
      { ja: "シンメトリー(寺社の参道、湖面の映り込み)", en: "Symmetry works for shrine paths and lake reflections" },
      { ja: "余白(空間)を恐れず引き算の構図", en: "Don't fear negative space — subtraction makes power" },
    ],
  },
  "backlight": {
    locs: ["新倉山浅間公園", "東福寺", "父母ヶ浜", "立石公園", "夫婦岩", "美幌峠", "亀老山展望台"],
    name: { ja:"逆光撮影", en:"Backlight Photography", zh:"逆光摄影", "zh-tw":"逆光攝影", ko:"역광 촬영", es:"Fotografía a contraluz", fr:"Photographie à contre-jour", de:"Gegenlichtfotografie", pt:"Fotografia em contraluz", it:"Fotografia in controluce", ru:"Контровое освещение", ar:"التصوير بالإضاءة الخلفية", hi:"बैकलाइट फोटोग्राफी", th:"ถ่ายภาพย้อนแสง", vi:"Chụp ngược sáng", id:"Fotografi backlight", tr:"Geri ışık fotoğrafçılığı", nl:"Tegenlichtfotografie", pl:"Fotografia pod światło", sv:"Motljusfotografering" },
    desc: {
      ja: "光源(太陽、街灯)を被写体の後ろに置き、シルエットや透過光、フレアを活用する技法。桜・紅葉・霧・湯けむりが最も鮮やかに撮れる。",
      en: "Place the light source (sun, lamp) behind the subject to create silhouettes, glow-through, and flare. Cherry, foliage, fog, and steam look most vivid in backlight.",
      zh: "将光源(太阳、街灯)置于被摄体后方，运用剪影、透射光、光晕。樱花、红叶、雾、汤烟在逆光下最鲜艳。",
      "zh-tw": "將光源(太陽、街燈)置於被攝體後方，運用剪影、透射光、光暈。櫻花、紅葉、霧、湯煙在逆光下最鮮艷。",
      ko: "광원(태양, 가로등)을 피사체 뒤에 두고 실루엣, 투과광, 플레어를 활용하는 기법. 벚꽃·단풍·안개·김이 가장 선명히 찍힌다.",
    },
    steps: [
      { ja: "太陽を画面端に隠して光芒(サンスター)を作る", en: "Hide sun at frame edge to create sunstars" },
      { ja: "F11〜F16で絞りの羽根による光芒が綺麗", en: "f/11–f/16 — aperture blades create the cleanest stars" },
      { ja: "露出は被写体側に合わせ-0.3〜-0.7EV", en: "Expose for subject; -0.3 to -0.7EV preserves detail" },
      { ja: "レンズフードでフレア軽減 or 意図的にフレア活用", en: "Use hood to cut flare — or embrace flare creatively" },
      { ja: "RAW撮影でハイライト復元の余地を確保", en: "Shoot RAW to recover highlights in post" },
    ],
  },
  "winter-cold": {
    locs: ["さっぽろ雪まつり", "白川郷", "知床", "摩周湖", "洞爺湖", "登別", "美幌峠"],
    name: { ja:"寒冷地撮影", en:"Cold-Weather Photography", zh:"严寒摄影", "zh-tw":"嚴寒攝影", ko:"한랭지 촬영", es:"Fotografía en frío extremo", fr:"Photo en grand froid", de:"Kalt-Wetter-Fotografie", pt:"Fotografia em frio extremo", it:"Fotografia al freddo", ru:"Съёмка в мороз", ar:"التصوير في البرد القارس", hi:"ठंड में फोटोग्राफी", th:"ถ่ายภาพในที่หนาวจัด", vi:"Chụp ảnh nơi lạnh giá", id:"Fotografi cuaca dingin", tr:"Soğuk havada fotoğraf", nl:"Koudeweerfotografie", pl:"Fotografia w zimnie", sv:"Vinterfotografering" },
    desc: {
      ja: "-15℃以下の北海道、白川郷の雪夜、知床の流氷など、極寒環境での撮影技術。電池消耗対策、結露防止、防寒服装が成否を分ける。",
      en: "Shooting in Hokkaido below -15°C, Shirakawa-go's snowy nights, Shiretoko's drift ice. Battery drain mitigation, condensation prevention, and proper layering decide success.",
      zh: "在-15℃以下的北海道、白川乡雪夜、知床流冰等极寒环境中拍摄。电池续航、防结露、保暖服装是成败关键。",
      "zh-tw": "在-15℃以下的北海道、白川鄉雪夜、知床流冰等極寒環境中拍攝。電池續航、防結露、保暖服裝是成敗關鍵。",
      ko: "-15℃ 이하의 홋카이도, 시라카와고 눈 밤, 시레토코 유빙 등 극한 환경에서의 촬영 기술. 전지 소모 대책, 결로 방지, 방한 복장이 성패를 가른다.",
    },
    steps: [
      { ja: "予備電池3個以上、ポケットで体温保温", en: "3+ spare batteries, kept warm in inside pockets" },
      { ja: "結露防止:ビニール袋密封で1時間室温化", en: "Prevent condensation: plastic bag seal + 1hr acclimation" },
      { ja: "三脚はカーボン+大型石突きで雪面安定", en: "Carbon tripod with large feet for snow stability" },
      { ja: "薄手+厚手の重ね着、手袋は指先操作可", en: "Layer thin+thick; gloves with finger-tip control" },
      { ja: "息でファインダーが曇るので液晶 or EVF活用", en: "Breath fogs the viewfinder — use LCD or EVF" },
    ],
  },
  "tide-timing": {
    locs: ["父母ヶ浜", "夫婦岩", "鳴門海峡", "大鳴門橋", "桂浜"],
    name: { ja:"潮汐タイミング", en:"Tide Timing", zh:"潮汐时机", "zh-tw":"潮汐時機", ko:"조석 타이밍", es:"Sincronización de mareas", fr:"Timing des marées", de:"Gezeiten-Timing", pt:"Sincronização das marés", it:"Sincronizzazione delle maree", ru:"Тайминг приливов", ar:"توقيت المد والجزر", hi:"ज्वार-भाटा समय", th:"จังหวะน้ำขึ้นน้ำลง", vi:"Thời điểm thủy triều", id:"Pengaturan waktu pasang surut", tr:"Gelgit zamanlaması", nl:"Getijden timing", pl:"Synchronizacja pływów", sv:"Tidvattenstiming" },
    desc: {
      ja: "父母ヶ浜の鏡面リフレクション、夫婦岩の日の出、鳴門の渦潮——日本の海岸絶景は潮汐スケジュールで決まる。事前リサーチが成功の鍵。",
      en: "Chichibugahama's mirror reflections, Meoto-iwa's sunrise, Naruto's whirlpools — Japan's coastal masterpieces are governed by tide schedules. Pre-research is the key.",
      zh: "父母滨镜面倒影、夫妻岩日出、鸣门涡潮——日本海岸绝景由潮汐表决定。事前调研是成功关键。",
      "zh-tw": "父母濱鏡面倒影、夫妻岩日出、鳴門渦潮——日本海岸絕景由潮汐表決定。事前調研是成功關鍵。",
      ko: "지치부가하마의 거울 반사, 메오토이와의 일출, 나루토의 소용돌이——일본 해안의 절경은 조석 일정으로 결정된다. 사전 조사가 성공의 관건.",
    },
    steps: [
      { ja: "気象庁または海上保安部の潮汐表で確認", en: "Check JMA or Coast Guard tide tables" },
      { ja: "父母ヶ浜:日没+干潮の重なる日のみ撮影可", en: "Chichibugahama: shoot only when sunset and low tide coincide" },
      { ja: "夫婦岩:夏至前後3日が太陽中央位置", en: "Meoto-iwa: solstice ±3 days centers the sun" },
      { ja: "鳴門:大潮(春・秋)+干満時刻±1時間以内", en: "Naruto: ohshio (spring/autumn) within ±1hr of peak tide" },
      { ja: "現地到着は予定時刻の30分前で構図確認", en: "Arrive 30 min before peak time to lock composition" },
    ],
  },
};

export const TECHNIQUE_SLUGS = Object.keys(TECHNIQUES);

export function getTechniquePhotos(slug, PREFECTURES) {
  const t = TECHNIQUES[slug];
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

export const getTechniqueName = (slug, lang) => {
  const t = TECHNIQUES[slug];
  if (!t) return slug;
  return t.name[lang] || t.name.en || slug;
};
export const getTechniqueDesc = (slug, lang) => {
  const t = TECHNIQUES[slug];
  if (!t) return "";
  if (lang === "ja" && t.desc.ja) return t.desc.ja;
  return t.desc.en || "";
};
export const getTechniqueSteps = (slug, lang) => {
  const t = TECHNIQUES[slug];
  if (!t || !t.steps) return [];
  return t.steps.map((s) => (lang === "ja" ? s.ja : s.en));
};
