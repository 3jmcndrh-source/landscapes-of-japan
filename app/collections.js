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
      ja: "日本の春を象徴する桜の名所。新倉山浅間公園の富士山+五重塔+桜の三段構図、天下第一と称される高遠城址公園、樹齢400年超の駒つなぎの一本桜、松本の弘法山古墳と城山公園(さくら名所100選)、樹齢百年のしだれ桜が美しい安養寺、諏訪湖畔の高島公園など、4月の絶景を集めました。",
      en: "Iconic cherry blossom spots that define Japanese spring. The three-tier composition of Mt. Fuji + Chureito Pagoda + sakura at Arakurayama Sengen Park, the «No.1 cherry under heaven» at Takato Castle Park, the 400-year-old solitary cherry at Komatsunagi, Matsumoto's Kobo-yama Tumulus and Joyama Park (a Top-100 Sakura Site), the century-old weeping cherry at Anyo-ji, and Takashima Park beside Lake Suwa — April's finest scenes.",
      zh: "代表日本春天的樱花名所。新仓山浅间公园富士山+五重塔+樱花三段构图、被誉为「天下第一樱」的高远城址公园、树龄超过400年的驹系一本樱、松本的弘法山古坟与城山公园(樱花名所100选)、树龄百年垂枝樱的安养寺、诹访湖畔的高岛公园等,汇集4月绝景。",
      "zh-tw": "代表日本春天的櫻花名所。新倉山淺間公園富士山+五重塔+櫻花三段構圖、被譽為「天下第一櫻」的高遠城址公園、樹齡超過400年的駒繫一本櫻、松本的弘法山古墳與城山公園(櫻花名所100選)、樹齡百年垂枝櫻的安養寺、諏訪湖畔的高島公園等,匯集4月絕景。",
      ko: "일본의 봄을 상징하는 벚꽃 명소. 아라쿠라야마 센겐 공원의 후지산+5층탑+벚꽃 3단 구도, 「천하제일 벚꽃」 다카토 성지 공원, 수령 400년이 넘는 고마쓰나기 한 그루 벚꽃, 마쓰모토의 고보야마 고분과 조야마 공원(벚꽃 명소 100선), 수령 100년의 수양벚꽃이 아름다운 안요지, 스와호반의 다카시마 공원 등 4월의 절경을 모았습니다.",
    },
    guide: {
      ja: {
        bestSeason: `4月初旬〜中旬がピーク。標高や緯度で前後し、富士山麓の新倉山浅間公園は4月10日前後、長野・松本は4月中旬、高遠城址公園(標高900m)は4月中旬〜下旬と遅め。安養寺のしだれ桜は4月10日頃が見頃。気象庁の桜開花予想で前年実績を確認するのが確実。`,
        bestTime: `早朝5:30〜7:00と夕方17:00以降が最適。早朝は観光客が少なく光が柔らかい。新倉山浅間公園の富士山+五重塔+桜は朝の順光、夕焼け空とのコラボは夕方。ライトアップ実施箇所(高遠・松本城)は日没後30分の「ブルーアワー」が桜の白とのコントラストが最も美しい。`,
        technique: `桜は枝が細くピントが外れやすい。f/8〜f/11で被写界深度を深く取る。逆光で桜を半透過させる撮り方も効果的。富士山+桜のような大景写真は広角(16-35mm)、しだれ桜のディテールは中望遠(70-200mm)。ホワイトバランスは「曇天」設定でピンクを強調できる。`,
        equipment: `三脚は早朝・夕暮れの低照度で必須。NDフィルターで日中スローシャッター(枝の揺れを表現)。偏光フィルター(C-PL)で空の青を濃く、葉の反射を抑制。広角〜中望遠の標準ズーム1本で大半をカバー可能。雨天対応のレインカバーもあると安心。`,
        tips: `風が強い日は枝の揺れでピンボケが多発するため、シャッタースピードは1/250秒以上を確保。三脚使用時は風防(自分の体)で機材を守る。桜は咲き始めから5〜7日が見頃のピークだが、天気とのバランスで「8分咲き+晴天」のほうが満開後の曇天より美しく撮れる場合が多い。`,
      },
      en: {
        bestSeason: `Early to mid-April is peak. Timing varies by altitude and latitude — Arakurayama Sengen Park at the foot of Mt. Fuji peaks around April 10, Matsumoto in mid-April, Takato Castle Park (900m) mid-to-late April. Anyo-ji's weeping cherry peaks around April 10. Check the Japan Meteorological Agency forecast against prior-year actuals.`,
        bestTime: `Early morning 5:30–7:00 and after 17:00 are ideal. Mornings are less crowded with softer light. Mt. Fuji + Chureito Pagoda + sakura works best with morning front-light; sunset-sky compositions work later. Where night illumination runs (Takato, Matsumoto Castle), the 30-minute «blue hour» after sunset gives the strongest white-vs-blue contrast.`,
        technique: `Cherry branches are thin and easy to miss focus. Stop down to f/8–f/11 for depth. Backlight with petals semi-translucent is highly effective. Wide-angle (16–35mm) for grand scenes like Fuji + sakura; medium-tele (70–200mm) for weeping-cherry detail. White-balance set to «Cloudy» pushes the pinks.`,
        equipment: `Tripod essential for early/late low-light. ND filter for daytime slow-shutter (branch motion). Circular polarizer (C-PL) deepens sky blue and cuts leaf reflection. A single 24–105 standard zoom covers most cases. Bring a rain cover — Japan's spring weather is unstable.`,
        tips: `Wind blurs branches — keep shutter ≥1/250s. Use your body as a windbreak when on a tripod. Peak bloom lasts 5–7 days, but «80% bloom + clear sky» often photographs better than «full bloom + overcast». Monitor cherry-front maps daily during the chase.`,
      },
      zh: {
        bestSeason: `4月初〜中旬为巅峰。海拔和纬度影响时机——富士山麓的新仓山浅间公园在4月10日前后,松本在4月中旬,高远城址公园(海拔900米)在4月中下旬较晚。安养寺垂枝樱4月10日左右最盛。气象厅的樱花开花预报对照前年实绩可参考。`,
        bestTime: `清晨5:30〜7:00和傍晚17:00之后最佳。清晨游客少且光线柔和。富士山+五重塔+樱花在早上顺光最佳;与晚霞天空的组合在傍晚。夜间灯光(高远、松本城)实施处,日落后30分钟的「蓝调时刻」白樱与蓝天对比最美。`,
        technique: `樱花枝条细容易跑焦。f/8〜f/11获得足够景深。逆光让花瓣半透明效果显著。广角(16-35mm)适合富士山+樱花的大景,中长焦(70-200mm)拍垂枝樱细节。白平衡设「阴天」可强调粉色。`,
        equipment: `三脚架在清晨黄昏的低光下必备。ND滤镜用于白天慢门(表现枝条摇曳)。偏振镜(CPL)加深天空蓝、抑制叶面反光。一支24-105标准变焦覆盖大半场景。带雨罩——日本春季天气多变。`,
        tips: `大风天枝条摇动会跑焦,快门速度应保持1/250秒以上。三脚架使用时用身体挡风。盛开期5〜7天,但「八分开+晴天」往往比「满开+多云」更美。追樱期间每日监测樱前线地图。`,
      },
      "zh-tw": {
        bestSeason: `4月初〜中旬為巔峰。海拔和緯度影響時機——富士山麓的新倉山淺間公園在4月10日前後,松本在4月中旬,高遠城址公園(海拔900米)在4月中下旬較晚。安養寺垂枝櫻4月10日左右最盛。氣象廳的櫻花開花預報對照前年實績可參考。`,
        bestTime: `清晨5:30〜7:00和傍晚17:00之後最佳。清晨遊客少且光線柔和。富士山+五重塔+櫻花在早上順光最佳;與晚霞天空的組合在傍晚。夜間燈光(高遠、松本城)實施處,日落後30分鐘的「藍調時刻」白櫻與藍天對比最美。`,
        technique: `櫻花枝條細容易跑焦。f/8〜f/11獲得足夠景深。逆光讓花瓣半透明效果顯著。廣角(16-35mm)適合富士山+櫻花的大景,中長焦(70-200mm)拍垂枝櫻細節。白平衡設「陰天」可強調粉色。`,
        equipment: `三腳架在清晨黃昏的低光下必備。ND濾鏡用於白天慢門(表現枝條搖曳)。偏振鏡(CPL)加深天空藍、抑制葉面反光。一支24-105標準變焦覆蓋大半場景。帶雨罩——日本春季天氣多變。`,
        tips: `大風天枝條搖動會跑焦,快門速度應保持1/250秒以上。三腳架使用時用身體擋風。盛開期5〜7天,但「八分開+晴天」往往比「滿開+多雲」更美。追櫻期間每日監測櫻前線地圖。`,
      },
      ko: {
        bestSeason: `4월 초〜중순이 절정. 고도와 위도에 따라 차이——후지산 기슭의 아라쿠라야마 센겐 공원은 4월 10일 전후, 마쓰모토는 4월 중순, 다카토 성지 공원(해발 900m)은 4월 중하순으로 늦다. 안요지의 수양벚꽃은 4월 10일경 절정. 기상청 벚꽃 개화 예보를 전년도 실적과 대조하면 확실.`,
        bestTime: `이른 아침 5:30〜7:00과 저녁 17:00 이후가 최적. 아침은 관광객이 적고 빛이 부드럽다. 후지산+5층탑+벚꽃은 아침 순광이 최고, 노을 하늘과의 조합은 저녁. 라이트업 실시처(다카토, 마쓰모토성)는 일몰 후 30분의 「블루 아워」가 흰 벚꽃과 푸른 하늘의 대비가 가장 아름답다.`,
        technique: `벚꽃 가지는 가늘어 초점이 쉽게 빗나간다. f/8〜f/11로 피사계심도 확보. 역광으로 꽃잎을 반투명하게 하는 기법도 효과적. 광각(16-35mm)은 후지산+벚꽃 같은 큰 풍경, 중망원(70-200mm)은 수양벚꽃 디테일. 화이트밸런스를 「흐림」으로 설정하면 핑크가 강조된다.`,
        equipment: `삼각대는 새벽·저녁의 저조도에서 필수. ND 필터로 낮 슬로우셔터(가지 흔들림 표현). 편광필터(C-PL)로 하늘의 푸른색을 진하게, 잎의 반사를 억제. 24-105 표준줌 한 개로 대부분의 장면 커버. 우비 — 일본의 봄 날씨는 변덕스럽다.`,
        tips: `바람이 강한 날은 가지 흔들림으로 초점이 흔들려서 셔터스피드는 1/250초 이상 확보. 삼각대 사용 시 자신의 몸으로 바람을 막는다. 만개기는 5〜7일이지만 「8분 개화+맑음」이 「만개+흐림」보다 더 아름답게 찍히는 경우가 많다. 추적 기간 동안 벚꽃 전선 지도를 매일 확인.`,
      },
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
      ja: "日本の秋を象徴する紅葉の名所。京都・東福寺の通天橋から眺める2,000本のモミジ、清水寺の紅葉ライトアップ、金閣寺の朱と金が織りなす11月の絶景を掲載。",
      en: "Iconic autumn foliage spots of Japan. The 2,000 maples viewed from Tofuku-ji's Tsutenkyo bridge in Kyoto, the night illumination at Kiyomizu-dera, and the crimson-gold splendor of Kinkaku-ji in November.",
      zh: "代表日本秋天的红叶名所。京都东福寺通天桥俯瞰的2000棵枫树、清水寺夜间灯光秀、11月金阁寺朱红与金色辉映的绝景。",
      "zh-tw": "代表日本秋天的紅葉名所。京都東福寺通天橋俯瞰的2000棵楓樹、清水寺夜間燈光秀、11月金閣寺朱紅與金色輝映的絕景。",
      ko: "일본의 가을을 상징하는 단풍 명소. 교토 도후쿠지 쓰텐교에서 바라보는 2,000그루 단풍, 기요미즈데라 단풍 야간 조명, 11월 금각사의 주홍빛과 금빛이 어우러지는 절경을 수록.",
    },
    guide: {
      ja: {
        bestSeason: `京都の紅葉ピークは11月中旬〜下旬。東福寺は11月20日前後、清水寺は11月25日〜12月初旬、金閣寺は11月下旬。標高で前後し、北部・標高高い場所(貴船・鞍馬)は11月初旬から色付き始める。日本気象協会の紅葉前線で進捗確認。`,
        bestTime: `早朝7:00開門と夕方ライトアップ(東福寺は不催行のため日中、清水寺は17:30〜21:00)が最適。日中は西日が当たる午後14:00〜16:00が紅葉が透過光で輝く。曇天時は色がフラットに撮れて発色を活かしやすい。`,
        technique: `紅葉は逆光・透過光で最も鮮やかに撮れる。露出は-0.3〜-0.7EVでモミジの赤を濃く出す。広角で空+紅葉の構図、中望遠で紅葉のレイヤー、マクロで葉のディテール——焦点距離で表現が変わる。WB「太陽光」が忠実、「日陰」で温度感UP。`,
        equipment: `通天橋など人気スポットは混雑するため三脚使用不可・自撮り棒禁止が多い。手持ちでも撮れる明るいレンズ(F2.8〜F4)推奨。C-PLフィルターで葉面反射を抑え、紅葉の発色を上げる。ライトアップは高ISO耐性カメラと明るいレンズが必須。`,
        tips: `東福寺通天橋は混雑するため平日早朝7:00入場推奨。清水寺ライトアップは予約不要だが17:00以降待ち時間あり。雨上がりは葉に水滴が残り、苔の緑とのコントラストが美しい。落葉した時期も「散紅葉」として絨毯のような構図が撮れる。`,
      },
      en: {
        bestSeason: `Kyoto's foliage peak is mid- to late November. Tofuku-ji peaks around November 20, Kiyomizu-dera November 25–early December, Kinkaku-ji late November. Higher-altitude areas (Kibune, Kurama) start coloring in early November. Track via the Japan Meteorological Association autumn-front map.`,
        bestTime: `Early morning 7:00 opening and evening illumination work best (Tofuku-ji has no illumination — daytime only; Kiyomizu-dera 17:30–21:00). Mid-afternoon 14:00–16:00 lights leaves with backlit translucence. Overcast days flatten the color but reveal saturation more cleanly.`,
        technique: `Foliage is most vivid in backlight and transmitted light. Underexpose by -0.3 to -0.7EV to deepen reds. Wide-angle for sky+foliage compositions, telephoto for layered foliage, macro for leaf detail — focal length defines the story. White-balance «Daylight» is faithful; «Shade» adds warmth.`,
        equipment: `Popular spots (Tsutenkyo bridge) ban tripods and selfie sticks. Bring fast lenses (f/2.8–f/4) for hand-holding. C-PL filter cuts leaf reflections and boosts foliage color. Illumination requires high-ISO cameras and fast glass.`,
        tips: `Tofuku-ji Tsutenkyo is congested — weekday 7:00 entry recommended. Kiyomizu illumination needs no reservation but waits build after 17:00. Post-rain days leave water droplets on leaves and stunning moss contrast. Even after fall, «chiri-momiji» (carpet of fallen leaves) makes beautiful compositions.`,
      },
      zh: {
        bestSeason: `京都红叶巅峰为11月中下旬。东福寺11月20日前后、清水寺11月25日〜12月初、金阁寺11月下旬。海拔影响进度,北部高地(贵船、鞍马)11月初开始变色。日本气象协会红叶前线可查进度。`,
        bestTime: `清晨7:00开门和晚间灯光(东福寺无灯光仅白天,清水寺17:30〜21:00)最佳。下午14:00〜16:00西阳为红叶带来透射光辉煌。阴天色调平,饱和度反易呈现。`,
        technique: `红叶在逆光、透射光下最鲜艳。曝光-0.3〜-0.7EV加深红色。广角拍空+红叶,中长焦拍层次,微距拍叶脉细节——焦段决定叙事。白平衡「日光」忠实,「阴影」加暖。`,
        equipment: `通天桥等热门点禁用三脚架和自拍杆。建议带大光圈镜头(F2.8〜F4)便于手持。CPL滤镜减少叶面反光、提升红叶色彩。灯光场景需要高ISO相机和大光圈镜头。`,
        tips: `东福寺通天桥拥挤,建议工作日早7:00入场。清水寺灯光不需预约但17:00后排队。雨后叶面带水珠,与青苔对比绝美。即使落叶时期,「散红叶」如地毯般构图同样美丽。`,
      },
      "zh-tw": {
        bestSeason: `京都紅葉巔峰為11月中下旬。東福寺11月20日前後、清水寺11月25日〜12月初、金閣寺11月下旬。海拔影響進度,北部高地(貴船、鞍馬)11月初開始變色。日本氣象協會紅葉前線可查進度。`,
        bestTime: `清晨7:00開門和晚間燈光(東福寺無燈光僅白天,清水寺17:30〜21:00)最佳。下午14:00〜16:00西陽為紅葉帶來透射光輝煌。陰天色調平,飽和度反易呈現。`,
        technique: `紅葉在逆光、透射光下最鮮豔。曝光-0.3〜-0.7EV加深紅色。廣角拍空+紅葉,中長焦拍層次,微距拍葉脈細節——焦段決定敘事。白平衡「日光」忠實,「陰影」加暖。`,
        equipment: `通天橋等熱門點禁用三腳架和自拍桿。建議帶大光圈鏡頭(F2.8〜F4)便於手持。CPL濾鏡減少葉面反光、提升紅葉色彩。燈光場景需要高ISO相機和大光圈鏡頭。`,
        tips: `東福寺通天橋擁擠,建議工作日早7:00入場。清水寺燈光不需預約但17:00後排隊。雨後葉面帶水珠,與青苔對比絕美。即使落葉時期,「散紅葉」如地毯般構圖同樣美麗。`,
      },
      ko: {
        bestSeason: `교토 단풍 절정은 11월 중〜하순. 도후쿠지는 11월 20일 전후, 기요미즈데라는 11월 25일〜12월 초, 금각사는 11월 하순. 고도에 따라 차이가 있어 북부 고지(기부네, 구라마)는 11월 초부터 물들기 시작. 일본 기상협회 단풍 전선으로 진행 상황 확인.`,
        bestTime: `이른 아침 7:00 개문과 야간 라이트업(도후쿠지는 없고 주간만, 기요미즈데라 17:30〜21:00)이 최적. 오후 14:00〜16:00 서양은 단풍을 투과광으로 빛나게 한다. 흐린 날은 색조가 평평해도 채도는 잘 드러난다.`,
        technique: `단풍은 역광·투과광에서 가장 선명. 노출 -0.3〜-0.7EV로 단풍의 빨강을 진하게. 광각으로 하늘+단풍, 중망원으로 단풍의 레이어, 매크로로 잎 디테일——초점거리로 표현이 달라진다. 화이트밸런스 「태양광」 충실, 「그늘」로 따뜻함 UP.`,
        equipment: `통천교 등 인기 장소는 삼각대·셀카봉 금지가 많다. 손에 들고 촬영 가능한 밝은 렌즈(f/2.8〜f/4) 추천. C-PL 필터로 잎 반사 억제하고 단풍 발색 향상. 라이트업은 고감도 카메라와 밝은 렌즈가 필수.`,
        tips: `도후쿠지 통천교는 혼잡하므로 평일 아침 7:00 입장 권장. 기요미즈데라 라이트업은 예약 불필요하지만 17:00 이후 대기. 비 온 후엔 잎에 물방울이 남아 이끼의 녹색과 대비가 아름답다. 낙엽 시기도 「치리모미지」(낙엽 카펫)로 양탄자 같은 구도 가능.`,
      },
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
    guide: {
      ja: {
        bestSeason: `1月下旬〜2月下旬がベスト。さっぽろ雪まつりは2月初旬の1週間限定、白川郷ライトアップは1月中旬〜2月中旬の特定夜のみ(要予約)、知床流氷は1月下旬〜3月初旬。気温は北海道-15℃以下、白川郷-5〜0℃を想定。`,
        bestTime: `朝焼け(6:30〜7:30)と夕焼け(16:00〜17:00)が最適。雪面が朝陽で薄ピンク、夕陽で金色に染まる。曇天時は雪と空の境界が消えるハイキー写真が撮れる。ライトアップは日没後30分のブルーアワーで、白い雪+暖色光+青い空のトリプルが最も映える。`,
        technique: `雪は明るい被写体なのでカメラの自動露出は暗く写す傾向。+0.7〜+1.3EVで補正し白を白く。WBは「太陽光」が忠実、「日陰」で温度感UP。流氷や雪原は単調になりがちなので前景(人物・木)を入れて奥行きを作る。雪の結晶や霜はマクロで超寄り。`,
        equipment: `防寒対策必須。カメラは寒冷地で電池消耗が早いため予備2-3個。電池をポケットで保温。レンズの結露防止のため室内に戻る前にビニール袋に入れて密封、室温で1時間以上放置。三脚は雪面で沈むので大型石突き+雪面用シューズ。グローブは指先操作可能なもの。`,
        tips: `白川郷ライトアップは展望台行きシャトルバスが事前予約制(野外駐車券+展望台券のセット)。例年12月上旬予約開始。空き枠争奪戦のため早めに。流氷は風向きに左右され、岸に接近する日とそうでない日がある。気象庁の流氷分布図と現地の海上保安部情報をチェック。`,
      },
      en: {
        bestSeason: `Late January to late February is best. Sapporo Snow Festival runs one week in early February. Shirakawa-go illumination: select nights mid-January to mid-February (reservation required). Shiretoko drift ice: late January to early March. Expect Hokkaido temperatures below -15°C, Shirakawa-go -5 to 0°C.`,
        bestTime: `Sunrise (6:30–7:30) and sunset (16:00–17:00) are ideal. Morning sun tints snow pink; evening sun gold. Overcast days enable high-key photos where snow and sky merge. Illumination peaks during the 30-minute blue hour after sunset — white snow + warm light + blue sky creates the strongest triple contrast.`,
        technique: `Snow is bright; auto-exposure tends to underexpose. Apply +0.7 to +1.3EV to keep whites white. WB «Daylight» is faithful, «Shade» adds warmth. Drift ice and snow fields can be monotonous — add foreground (figures, trees) for depth. Snowflakes and frost reward macro work.`,
        equipment: `Cold-weather gear essential. Camera batteries drain fast — bring 2–3 spares, kept warm in inside pockets. To prevent condensation, seal the camera in a plastic bag before re-entering warm rooms; let it acclimate 1+ hours. Tripods sink in snow — use large feet or snow shoes. Gloves with finger-tip control.`,
        tips: `Shirakawa-go illumination requires advance shuttle/parking reservation (sells out by early December). Drift ice depends on wind — some days it reaches shore, others it doesn't. Check JMA drift-ice distribution maps and the local Coast Guard reports.`,
      },
      zh: {
        bestSeason: `1月下旬〜2月下旬最佳。札幌雪祭2月初一周。白川乡灯光:1月中〜2月中特定夜晚(需预约)。知床流冰:1月下〜3月初。北海道气温-15℃以下,白川乡-5〜0℃。`,
        bestTime: `朝霞(6:30〜7:30)与晚霞(16:00〜17:00)最佳。晨光为雪染粉,夕阳染金。阴天可拍雪与天空融合的高调照。灯光场景日落后30分钟蓝调时刻三重对比(白雪+暖光+蓝天)最佳。`,
        technique: `雪面明亮,自动曝光倾向欠曝。+0.7〜+1.3EV曝光补偿保持白色。白平衡「日光」忠实、「阴影」加暖。流冰与雪原单调,加前景(人物、树木)增加层次。雪花霜花用微距特写。`,
        equipment: `防寒必备。低温下电池消耗快,备2-3块,贴身保温。镜头防结露:进室前装密封袋静置1小时以上。三脚架雪地下沉,大型脚钉+雪鞋。手套需指尖操作。`,
        tips: `白川乡灯光需提前预约接驳巴士(连展望台券),12月上旬开放抢票。流冰随风向变化,有时近岸有时远海。查询气象厅流冰分布图与当地海上保安部信息。`,
      },
      "zh-tw": {
        bestSeason: `1月下旬〜2月下旬最佳。札幌雪祭2月初一週。白川鄉燈光:1月中〜2月中特定夜晚(需預約)。知床流冰:1月下〜3月初。北海道氣溫-15℃以下,白川鄉-5〜0℃。`,
        bestTime: `朝霞(6:30〜7:30)與晚霞(16:00〜17:00)最佳。晨光為雪染粉,夕陽染金。陰天可拍雪與天空融合的高調照。燈光場景日落後30分鐘藍調時刻三重對比(白雪+暖光+藍天)最佳。`,
        technique: `雪面明亮,自動曝光傾向欠曝。+0.7〜+1.3EV曝光補償保持白色。白平衡「日光」忠實、「陰影」加暖。流冰與雪原單調,加前景(人物、樹木)增加層次。雪花霜花用微距特寫。`,
        equipment: `防寒必備。低溫下電池消耗快,備2-3塊,貼身保溫。鏡頭防結露:進室前裝密封袋靜置1小時以上。三腳架雪地下沉,大型腳釘+雪鞋。手套需指尖操作。`,
        tips: `白川鄉燈光需提前預約接駁巴士(連展望台券),12月上旬開放搶票。流冰隨風向變化,有時近岸有時遠海。查詢氣象廳流冰分布圖與當地海上保安部資訊。`,
      },
      ko: {
        bestSeason: `1월 하순〜2월 하순이 베스트. 삿포로 눈축제는 2월 초 1주일 한정, 시라카와고 라이트업은 1월 중〜2월 중 특정 야간만(예약 필요), 시레토코 유빙은 1월 하순〜3월 초. 기온은 홋카이도 -15℃ 이하, 시라카와고 -5〜0℃ 예상.`,
        bestTime: `여명(6:30〜7:30)과 노을(16:00〜17:00)이 최적. 설면이 아침해에 분홍, 석양에 황금색으로 물든다. 흐린 날은 눈과 하늘의 경계가 사라지는 하이키 사진. 라이트업은 일몰 후 30분 블루아워에 흰 눈+따뜻한 빛+푸른 하늘 트리플이 가장 빛난다.`,
        technique: `눈은 밝은 피사체라 자동 노출이 어둡게 찍는 경향. +0.7〜+1.3EV로 보정하여 흰색을 흰색으로. WB 「태양광」 충실, 「그늘」로 따뜻함 UP. 유빙과 설원은 단조로워지기 쉬우므로 전경(인물·나무)을 넣어 깊이감 만들기. 눈 결정이나 서리는 매크로로 클로즈업.`,
        equipment: `방한 대책 필수. 카메라는 한랭지에서 전지 소모가 빠르므로 예비 2-3개, 주머니에 보온. 렌즈 결로 방지를 위해 실내 복귀 전 비닐봉지 밀봉, 실온에서 1시간 이상 방치. 삼각대는 설면에서 가라앉으므로 대형 발+설면용 슈즈. 장갑은 손끝 조작 가능한 것.`,
        tips: `시라카와고 라이트업은 전망대 셔틀버스 사전 예약제(주차권+전망대권 세트). 매년 12월 상순 예약 개시. 빈자리 쟁탈전이므로 일찍. 유빙은 바람에 좌우되어 해안 접근일과 그렇지 않은 일이 있다. 기상청 유빙 분포도와 현지 해상보안부 정보 체크.`,
      },
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
    guide: {
      ja: {
        bestSeason: `桜の時期(4月)と紅葉(11月)が最も美しいが、春霞・梅雨・台風のない秋(10月下旬〜11月下旬)が最も天候が安定。冬の雪化粧した松本城(国宝・烏城)も国内屈指の絶景。姫路城は白漆喰のため、桜・新緑・紅葉どの季節も背景としてバエる。`,
        bestTime: `早朝(7:00〜9:00)が観光客が少なく、城の白漆喰や黒板張りが朝陽で映える。夕焼け17:00以降に天守の輪郭が空に浮かぶシルエット撮影。ライトアップ実施城(松本・松山・高知・姫路)は日没後30分のブルーアワーが最高。一日2回の「マジックアワー」を狙う。`,
        technique: `城は遠景・中景・近景の3層構成が基本。広角(16-35mm)で空+城+人物の三層、中望遠(70-200mm)で天守の細部、望遠(200-400mm)で遠方の城との空気感。シンメトリー構図(姫路城正面)とリーディングライン(石段・桜並木)を活用。HDR撮影で明部の空と暗部の天守石垣を両立。`,
        equipment: `三脚は早朝・夜間で必須(姫路城内部は禁止のため要注意)。広角ズーム(16-35mm)+標準ズーム(24-105mm)で十分。望遠は高遠城のような遠望が必要な場面のみ。C-PLフィルターで空の青を強調。雲台はクイックリリース対応推奨。`,
        tips: `姫路城は土日祝混雑で入城まで30分待つこともあるため平日推奨。松本城は黒漆喰のため曇天や雨天で逆に質感UP。高遠城址公園の桜+城址石垣は4月中旬〜下旬で最も美しい。金沢城下は雪+石垣+紅殻格子の組み合わせが冬の限定絶景。`,
      },
      en: {
        bestSeason: `Cherry blossom (April) and autumn leaves (November) are most beautiful, but late October to late November offers the most stable weather (no spring haze, monsoon, or typhoons). Snow-capped Matsumoto «Crow» Castle in winter is one of Japan's premier castle scenes. Himeji's white plaster looks brilliant against any season's backdrop.`,
        bestTime: `Early morning (7:00–9:00) is least crowded; white plaster and dark cladding catch the morning sun beautifully. Sunset 17:00+ silhouettes towers against the sky. Castles with night illumination (Matsumoto, Matsuyama, Kochi, Himeji) shine brightest in the 30-minute blue hour after sunset. Two magic hours per day.`,
        technique: `Castles photograph well in 3-layer compositions: foreground, mid-ground, background. Wide-angle (16–35mm) for sky+castle+people three-layer; medium-tele (70–200mm) for tower details; tele (200–400mm) for distant castles in atmospheric haze. Symmetry (Himeji frontal) and leading lines (steps, cherry rows) are powerful. HDR balances bright sky against dark stone walls.`,
        equipment: `Tripod essential for early-morning and night shots (forbidden inside Himeji's keep — note this). Wide zoom (16–35mm) + standard zoom (24–105mm) covers most scenes. Telephoto only needed for distant castles like Takato. C-PL deepens sky blue. Tripod head with quick-release plate recommended.`,
        tips: `Himeji is crowded on weekends — 30-minute entry waits possible. Visit weekdays. Matsumoto's black lacquer benefits from overcast/rain (texture stronger). Takato Castle Park's sakura + ruined stone walls peak mid-to-late April. Kanazawa's snow + stone walls + reddish lattice windows is a winter-only scene.`,
      },
      zh: {
        bestSeason: `樱花期(4月)与红叶期(11月)最美,但10月下〜11月下天气最稳定(无春雾、梅雨、台风)。冬季雪覆松本城(国宝、乌城)是日本顶级绝景。姬路城白漆灰背景对四季皆然出彩。`,
        bestTime: `清晨(7:00〜9:00)游客少,城堡白灰与黑板墙朝阳下闪耀。日落17:00后天守轮廓浮现剪影。夜间灯光城(松本、松山、高知、姬路)日落后30分钟蓝调时刻最佳。每日两次「魔法时刻」。`,
        technique: `城堡需3层构图:前景、中景、远景。广角(16-35mm)拍空+城+人三层、中长焦(70-200mm)拍天守细节、长焦(200-400mm)隔空气感拍远城。对称构图(姬路城正面)与引导线(石阶、樱花列)。HDR平衡明暗。`,
        equipment: `三脚架在清晨夜间必备(姬路城内禁用,注意)。广角变焦(16-35mm)+标准变焦(24-105mm)覆盖大半。长焦仅在高远城等远景需要。CPL滤镜加深天蓝。云台快装板。`,
        tips: `姬路城周末拥挤,排队入城30分钟。建议工作日。松本城黑漆灰阴雨天反而质感更佳。高远城址公园樱花+石垣4月中下旬最美。金泽雪+石垣+红格子是冬季限定绝景。`,
      },
      "zh-tw": {
        bestSeason: `櫻花期(4月)與紅葉期(11月)最美,但10月下〜11月下天氣最穩定(無春霧、梅雨、颱風)。冬季雪覆松本城(國寶、烏城)是日本頂級絕景。姬路城白漆灰背景對四季皆然出彩。`,
        bestTime: `清晨(7:00〜9:00)遊客少,城堡白灰與黑板牆朝陽下閃耀。日落17:00後天守輪廓浮現剪影。夜間燈光城(松本、松山、高知、姬路)日落後30分鐘藍調時刻最佳。每日兩次「魔法時刻」。`,
        technique: `城堡需3層構圖:前景、中景、遠景。廣角(16-35mm)拍空+城+人三層、中長焦(70-200mm)拍天守細節、長焦(200-400mm)隔空氣感拍遠城。對稱構圖(姬路城正面)與引導線(石階、櫻花列)。HDR平衡明暗。`,
        equipment: `三腳架在清晨夜間必備(姬路城內禁用,注意)。廣角變焦(16-35mm)+標準變焦(24-105mm)覆蓋大半。長焦僅在高遠城等遠景需要。CPL濾鏡加深天藍。雲台快裝板。`,
        tips: `姬路城週末擁擠,排隊入城30分鐘。建議工作日。松本城黑漆灰陰雨天反而質感更佳。高遠城址公園櫻花+石垣4月中下旬最美。金澤雪+石垣+紅格子是冬季限定絕景。`,
      },
      ko: {
        bestSeason: `벚꽃 시기(4월)와 단풍(11월)이 가장 아름답지만 봄 안개·장마·태풍이 없는 가을(10월 하순〜11월 하순)이 가장 날씨가 안정적. 겨울 눈 덮인 마쓰모토성(국보·까마귀성)도 일본 최고급 절경. 히메지성은 백회벽이라 벚꽃·신록·단풍 어느 계절이든 배경으로 빛난다.`,
        bestTime: `이른 아침(7:00〜9:00)은 관광객이 적고 성의 백회벽과 흑판벽이 아침해에 빛난다. 노을 17:00 이후엔 천수의 윤곽이 하늘에 떠오르는 실루엣. 라이트업 실시 성(마쓰모토·마쓰야마·고치·히메지)은 일몰 후 30분 블루아워가 최고. 하루 2번의 「매직 아워」.`,
        technique: `성은 원경·중경·근경의 3층 구성이 기본. 광각(16-35mm)으로 하늘+성+인물 3층, 중망원(70-200mm)으로 천수의 세부, 망원(200-400mm)으로 원방의 성 공기감. 대칭 구도(히메지성 정면)와 리딩 라인(돌계단·벚꽃 가로수). HDR 촬영으로 명부의 하늘과 암부의 천수 석벽을 양립.`,
        equipment: `삼각대는 이른 아침·야간에 필수(히메지성 내부는 금지이므로 주의). 광각 줌(16-35mm)+표준 줌(24-105mm)으로 충분. 망원은 다카토성 같은 원경이 필요한 장면만. C-PL 필터로 하늘의 푸른색 강조. 운대는 퀵릴리스 대응 추천.`,
        tips: `히메지성은 주말 혼잡으로 입성까지 30분 대기 가능. 평일 권장. 마쓰모토성은 흑칠벽이라 흐림·우천에서 오히려 질감 UP. 다카토 성지공원의 벚꽃+성지 석벽은 4월 중〜하순이 가장 아름답다. 가나자와 성하는 눈+석벽+홍각자(베나리시)의 조합이 겨울 한정 절경.`,
      },
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
    guide: {
      ja: {
        bestSeason: `通年訪れることが可能だが、紅葉(11月中旬〜下旬)・桜(4月初旬)・新緑(5月初旬)・雪(1〜2月)が特に美しい。伊勢神宮は20年に一度の式年遷宮(次回2033年)も歴史的瞬間。法隆寺は梅雨明け(7月)の青空+白雲+白壁の構図がベスト。`,
        bestTime: `早朝6:00〜9:00が最も静寂で精神性を捉えやすい。観光客が来る前の参道や本堂の空気感は早朝でしか撮れない。夕方17:00〜18:00は西日が当たる方向の伽藍が金色に染まる。雨上がり直後は石畳・苔・木造建築の質感が最も高まる。`,
        technique: `寺社は左右対称(参道・本堂・五重塔)が基本。広角(16-35mm)で伽藍全体、中望遠(70-200mm)で軒裏・組物・彫刻のディテール、マクロで仏像の細部・苔。WBは「太陽光」が忠実、「日陰」で暖色系UP、「曇天」で建築の朱色強調。露出はマイナス補正で陰影を残す。`,
        equipment: `三脚は屋外可だが本堂内・宝物殿は禁止が多い(三脚禁止表示確認)。広角ズーム+標準ズームで十分。マクロレンズ(90mm or 100mm)で仏像・蓮・苔の精密撮影。雨天対応のレインカバー。靴は脱ぎやすいスリッポンが便利(本堂入場時)。`,
        tips: `多くの寺社は撮影禁止区域がある(本尊・宝物殿等)。表示確認とフラッシュ厳禁。早朝(開門6:00)は人混み回避と神聖な空気を捉える絶好機。お守り・絵馬は被写体として美しいが、人物の祈りの様子はマナー上避ける。お賽銭・お祈りの後に撮影開始がスマート。`,
      },
      en: {
        bestSeason: `Year-round, but autumn (mid–late November), cherry blossom (early April), fresh greenery (early May), and snow (Jan–Feb) are exceptional. Ise Jingu's once-in-20-years Shikinen Sengu (next 2033) is a historic moment. Horyu-ji's post-monsoon (July) blue sky + white clouds + white plaster is ideal.`,
        bestTime: `Early morning 6:00–9:00 — quietest, most spiritual. The atmosphere of empty paths and prayer halls only exists before the crowds. Evening 17:00–18:00 lights west-facing halls golden. Just-after-rain heightens stone-pavement, moss, and wooden-architecture textures.`,
        technique: `Shrines and temples favor symmetry (approach paths, main halls, pagodas). Wide-angle (16–35mm) for whole compounds; medium-tele (70–200mm) for eave details, brackets, carvings; macro for Buddha statues and moss. White-balance «Daylight» faithful, «Shade» warmer, «Cloudy» pushes vermillion. Slight underexposure preserves shadow detail.`,
        equipment: `Tripods OK outdoors but forbidden inside main halls and treasure houses (check signage). Wide zoom + standard zoom suffice. Macro lens (90mm or 100mm) for Buddha details, lotus, moss. Rain cover for monsoon. Slip-on shoes — entering main halls requires removing shoes.`,
        tips: `Many sites have no-photography zones (main deities, treasure houses). Check signage; never use flash. Early entry (6:00 openings) avoids crowds and captures sacred atmosphere. Amulets and ema plaques photograph well, but avoid candid shots of people in prayer — etiquette dictates capturing the place, not the worshipper.`,
      },
      zh: {
        bestSeason: `全年皆可,但红叶(11月中下)、樱花(4月初)、新绿(5月初)、雪(1〜2月)最美。伊势神宫每20年式年迁宫(下次2033)是历史瞬间。法隆寺梅雨过后(7月)蓝天白云白壁构图最佳。`,
        bestTime: `清晨6:00〜9:00最静、最具精神性。游客到来前的参道与本堂气韵只在清晨可拍。傍晚17:00〜18:00西阳照下伽蓝染金。雨后石板、苔、木建筑质感最强。`,
        technique: `寺社以左右对称(参道、本堂、五重塔)为本。广角(16-35mm)拍伽蓝全景、中长焦(70-200mm)拍檐角、斗拱、雕刻细节、微距拍佛像、苔。白平衡「日光」忠实、「阴影」暖色系UP、「阴天」朱色强调。曝光略减保留阴影。`,
        equipment: `三脚架室外可,本堂内与宝物殿多禁(查看标志)。广角+标准变焦足够。微距镜头(90或100mm)拍佛像、莲、苔。雨罩。脱穿方便的鞋(进本堂需脱鞋)。`,
        tips: `许多寺社有禁摄区(本尊、宝物殿等)。查看标志,严禁闪光。早入场(6:00开门)避人潮、捕神圣气韵。御守、绘马是美丽题材,但勿拍祈祷者人物——礼仪上拍摄场所而非朝拜者。`,
      },
      "zh-tw": {
        bestSeason: `全年皆可,但紅葉(11月中下)、櫻花(4月初)、新綠(5月初)、雪(1〜2月)最美。伊勢神宮每20年式年遷宮(下次2033)是歷史瞬間。法隆寺梅雨過後(7月)藍天白雲白壁構圖最佳。`,
        bestTime: `清晨6:00〜9:00最靜、最具精神性。遊客到來前的參道與本堂氣韻只在清晨可拍。傍晚17:00〜18:00西陽照下伽藍染金。雨後石板、苔、木建築質感最強。`,
        technique: `寺社以左右對稱(參道、本堂、五重塔)為本。廣角(16-35mm)拍伽藍全景、中長焦(70-200mm)拍簷角、斗拱、雕刻細節、微距拍佛像、苔。白平衡「日光」忠實、「陰影」暖色系UP、「陰天」朱色強調。曝光略減保留陰影。`,
        equipment: `三腳架室外可,本堂內與寶物殿多禁(查看標誌)。廣角+標準變焦足夠。微距鏡頭(90或100mm)拍佛像、蓮、苔。雨罩。脫穿方便的鞋(進本堂需脫鞋)。`,
        tips: `許多寺社有禁攝區(本尊、寶物殿等)。查看標誌,嚴禁閃光。早入場(6:00開門)避人潮、捕神聖氣韻。御守、繪馬是美麗題材,但勿拍祈禱者人物——禮儀上拍攝場所而非朝拜者。`,
      },
      ko: {
        bestSeason: `연중 방문 가능하지만 단풍(11월 중〜하순)·벚꽃(4월 초순)·신록(5월 초순)·눈(1〜2월)이 특히 아름답다. 이세 신궁은 20년에 한 번의 시키넨 센구(다음은 2033년)도 역사적 순간. 호류지는 장마 후(7월)의 푸른 하늘+흰 구름+흰 벽 구도가 최고.`,
        bestTime: `이른 아침 6:00〜9:00이 가장 고요하고 정신성이 잘 잡힌다. 관광객이 오기 전 참도와 본당의 공기감은 이른 아침에만 찍을 수 있다. 저녁 17:00〜18:00은 서양이 비치는 방향의 가람이 황금색으로 물든다. 비 온 직후엔 돌 포장·이끼·목조 건축의 질감이 가장 높아진다.`,
        technique: `사찰과 신사는 좌우대칭(참도·본당·5층탑)이 기본. 광각(16-35mm)으로 가람 전체, 중망원(70-200mm)으로 처마·공포·조각 디테일, 매크로로 불상 세부·이끼. WB 「태양광」 충실, 「그늘」로 따뜻한 계열 UP, 「흐림」으로 건축의 주홍 강조. 노출은 마이너스 보정으로 음영 보존.`,
        equipment: `삼각대는 옥외 가능하지만 본당 내·보물전은 금지가 많다(삼각대 금지 표시 확인). 광각 줌+표준 줌으로 충분. 매크로 렌즈(90mm or 100mm)로 불상·연꽃·이끼 정밀 촬영. 우천 대응 우비. 신발은 벗기 쉬운 슬립온이 편리(본당 입장 시).`,
        tips: `많은 사찰엔 촬영 금지 구역이 있다(본존·보물전 등). 표시 확인 후 플래시 엄금. 이른 아침(개문 6:00)은 인파 회피와 신성한 분위기 포착의 절호 기회. 부적·에마는 피사체로 아름답지만 사람의 기도 모습은 매너상 피한다. 새전·기도 후에 촬영 시작이 스마트.`,
      },
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
    guide: {
      ja: {
        bestSeason: `冬(12月〜2月)の湯けむりと雪化粧の組み合わせが最も絵になる。気温が低いほど湯気が濃く立ち上るため別府の地獄や登別の地獄谷は冬がベスト。秋(11月)の紅葉+湯けむりも美しい。雨や霧の日は湯気の白とのコントラストが強まる。`,
        bestTime: `早朝6:00〜8:00が湯気が最も濃い。気温と湯温の差が大きいほど蒸気量が増える。湯布院の朝霧と金鱗湖の湯気が混ざる風景は7:00前後の限定。夕方17:00以降の湯けむり+ライトアップは別府温泉郷の名物。`,
        technique: `湯気は逆光で最も鮮明に映る。露出は+0.3〜+0.7EVで湯気の白を残す。広角で温泉街の全景、中望遠で湯気のディテールと建物のシルエット。シャッタースピード1/60〜1/15秒で湯気の流れを表現。WB「曇天」で湯気が温かみを持つ。`,
        equipment: `カメラ・レンズが湯気で曇りやすいため防滴対応推奨。タオルや吸湿クロスで頻繁に拭く。三脚は湯気スポットでは結露しやすいため使用後即座に乾拭き。望遠レンズは温泉街全景の遠望に有効。NDフィルターで日中スローシャッター。`,
        tips: `日帰り入浴の前後で撮影。脱衣場・湯船内は撮影禁止が原則。地獄めぐり(別府)はプロカメラマン以外も歓迎の観光地のためトライポッド可。湯布院は朝市があり、地元の人の活気と湯気の風景が同時に撮れる。冬は冷気で機材結露しやすいため室内戻る前にビニール袋密封。`,
      },
      en: {
        bestSeason: `Winter (December–February) — steam plus snow is the most cinematic combination. Lower temperatures produce thicker rising vapor, so Beppu's hells and Noboribetsu's Jigokudani are best in winter. Autumn (November) foliage + steam is also gorgeous. Rain and fog days strengthen the white-vapor contrast.`,
        bestTime: `Early morning 6:00–8:00 — steam is densest. The greater the air-water temperature gap, the more vapor. Yufuin's morning mist mixing with Lake Kinrin's steam is a 7:00 specialty. Evening 17:00+ steam + illumination is iconic in Beppu Onsen.`,
        technique: `Steam shows best in backlight. Slight overexposure +0.3 to +0.7EV preserves vapor whites. Wide-angle for onsen-town scenes; medium-tele for steam details with silhouetted architecture. Shutter 1/60–1/15s captures steam flow. WB «Cloudy» adds warmth to vapor.`,
        equipment: `Cameras and lenses fog up easily — weather-sealing recommended. Frequent wipes with absorbent cloth. Tripods condense readily — wipe immediately after use. Telephoto useful for distant onsen-town views. ND filter for daytime slow shutter.`,
        tips: `Shoot before/after bathing — changing rooms and tubs are off-limits. Beppu's «Hells Tour» welcomes photographers; tripods OK there. Yufuin morning market combines local activity with steam scenes. In winter, condensation on equipment is common when entering warm rooms — seal in plastic bag first.`,
      },
      zh: {
        bestSeason: `冬季(12〜2月)汤烟与雪景组合最入画。气温越低蒸气越浓,别府地狱与登别地狱谷冬季最佳。秋(11月)红叶+汤烟也美。阴雨雾天蒸气白与背景对比最强。`,
        bestTime: `清晨6:00〜8:00蒸气最浓。气温与水温差大蒸气量大。汤布院晨雾与金鳞湖蒸气混合景象仅7:00前后限定。傍晚17:00后汤烟+灯光是别府温泉乡名物。`,
        technique: `蒸气在逆光下最鲜明。曝光+0.3〜+0.7EV保留汤烟白。广角拍温泉街全景、中长焦拍蒸气细节与建筑剪影。快门1/60〜1/15秒表现汤烟流动。白平衡「阴天」让蒸气有温暖感。`,
        equipment: `相机镜头易蒸气模糊,推荐防滴机型。带毛巾或吸湿布频繁擦拭。三脚架在汤烟处易结露,使用后即擦干。长焦适合远拍温泉街。ND滤镜白天慢门用。`,
        tips: `日归温泉前后拍摄。更衣处与浴池内禁摄为原则。别府地狱巡游欢迎摄影者,可使用三脚架。汤布院有早市,可同时拍当地人与汤烟。冬天冷气下机材易结露,入室前装密封袋。`,
      },
      "zh-tw": {
        bestSeason: `冬季(12〜2月)湯煙與雪景組合最入畫。氣溫越低蒸氣越濃,別府地獄與登別地獄谷冬季最佳。秋(11月)紅葉+湯煙也美。陰雨霧天蒸氣白與背景對比最強。`,
        bestTime: `清晨6:00〜8:00蒸氣最濃。氣溫與水溫差大蒸氣量大。湯布院晨霧與金鱗湖蒸氣混合景象僅7:00前後限定。傍晚17:00後湯煙+燈光是別府溫泉鄉名物。`,
        technique: `蒸氣在逆光下最鮮明。曝光+0.3〜+0.7EV保留湯煙白。廣角拍溫泉街全景、中長焦拍蒸氣細節與建築剪影。快門1/60〜1/15秒表現湯煙流動。白平衡「陰天」讓蒸氣有溫暖感。`,
        equipment: `相機鏡頭易蒸氣模糊,推薦防滴機型。帶毛巾或吸濕布頻繁擦拭。三腳架在湯煙處易結露,使用後即擦乾。長焦適合遠拍溫泉街。ND濾鏡白天慢門用。`,
        tips: `日歸溫泉前後拍攝。更衣處與浴池內禁攝為原則。別府地獄巡遊歡迎攝影者,可使用三腳架。湯布院有早市,可同時拍當地人與湯煙。冬天冷氣下機材易結露,入室前裝密封袋。`,
      },
      ko: {
        bestSeason: `겨울(12월〜2월)의 김 + 눈 화장 조합이 가장 그림이 된다. 기온이 낮을수록 김이 진하게 올라와 벳푸 지옥과 노보리베쓰 지옥계곡은 겨울이 베스트. 가을(11월)의 단풍+김도 아름답다. 비나 안개 날엔 김의 흰색과 대비가 강해진다.`,
        bestTime: `이른 아침 6:00〜8:00이 김이 가장 진하다. 기온과 수온의 차이가 클수록 증기량이 늘어난다. 유후인의 아침 안개와 긴린호의 김이 섞이는 풍경은 7:00 전후 한정. 저녁 17:00 이후 김+라이트업은 벳푸 온천향의 명물.`,
        technique: `김은 역광에서 가장 선명히 비친다. 노출은 +0.3〜+0.7EV로 김의 흰색을 보존. 광각으로 온천가 전경, 중망원으로 김 디테일과 건물 실루엣. 셔터스피드 1/60〜1/15초로 김의 흐름 표현. WB 「흐림」으로 김에 따뜻함이 더해진다.`,
        equipment: `카메라·렌즈가 김으로 흐려지기 쉬우므로 방적 대응 추천. 수건이나 흡습 천으로 자주 닦는다. 삼각대는 김 스팟에서 결로하기 쉬우므로 사용 후 즉시 마른 닦기. 망원 렌즈는 온천가 전경 원망에 유효. ND 필터로 낮 슬로우 셔터.`,
        tips: `당일 입욕 전후로 촬영. 탈의실·욕탕 내는 촬영 금지가 원칙. 지옥 순례(벳푸)는 프로 카메라맨 외에도 환영의 관광지라 삼각대 가능. 유후인은 아침 시장이 있어 현지인의 활기와 김 풍경을 동시에 찍을 수 있다. 겨울은 냉기로 기재 결로하기 쉬우므로 실내 복귀 전 비닐봉지 밀봉.`,
      },
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
    guide: {
      ja: {
        bestSeason: `沖縄・宮古島は4〜6月および10〜11月(梅雨と台風を避ける)、父母ヶ浜は4〜9月の夕陽が美しい時期、夫婦岩の夏至日の出は5月〜7月の限定撮影、鳴門海峡渦潮は春・秋の大潮(中潮ではない)。冬は太平洋側でも空気が澄み水平線がシャープに撮れる。`,
        bestTime: `日の出・日の入りが最重要。父母ヶ浜は日没30〜40分前の干潮+無風が映り込みベストコンディション。夫婦岩は夏至前後の日の出。鳴門海峡は大潮の干満時刻+1時間以内。海岸でのマジックアワー(ブルーアワー)は日没後20〜40分の青の時間が最美。`,
        technique: `海は反射を活かすかカットするかで構図が大きく変わる。CPLで反射カット、NDで長秒露光(波の動きを糸状に)。広角でダイナミックレンジ広い空+海+前景の三層、望遠で島・岩・船など特定被写体を圧縮。HDRで明るい空+暗い前景を両立。三脚必須。`,
        equipment: `三脚は強風と波で安定性重要——重めの三脚+風防ストーン。NDフィルター(8〜400)で長秒露光、ハーフNDで空との明暗差軽減。CPLで偏光、塩害対策のため撮影後はカメラ・三脚を真水で洗浄するか塩除去ウェットティッシュで拭く。レインカバー必携。`,
        tips: `父母ヶ浜は干潮時刻が日没と重なる日のみ撮影可。観光協会サイトで「干潮+日没」カレンダーを公開しているので確認。夫婦岩の太陽は1日2cmずつ動くため夏至前後3日が最も中央に来る。鳴門の渦潮は予測サイト(本州四国連絡高速道路)で時刻確認。沖縄は台風シーズン(7-10月)は天候リスク高。`,
      },
      en: {
        bestSeason: `Okinawa/Miyakojima: April–June and October–November (avoid monsoon and typhoons). Chichibugahama: April–September for best sunsets. Meoto-iwa summer-solstice sunrise: May–July only. Naruto whirlpools: spring/autumn ohshio (great tide). Winter sharpens horizons even on Pacific coasts.`,
        bestTime: `Sunrise and sunset are critical. Chichibugahama: 30–40 min before sunset at low tide with no wind for mirror reflections. Meoto-iwa: summer solstice ±3 days for sun centered between rocks. Naruto: ±1 hour from peak high or low tide. Coastal magic hour (blue hour) — 20–40 min after sunset is most magical.`,
        technique: `Sea reflections — keep or cut, your choice. CPL kills reflection; ND enables long exposure (silken waves). Wide-angle for dynamic-range sky+sea+foreground three-layer; telephoto compresses islands, rocks, boats. HDR balances bright sky and dark foreground. Tripod essential.`,
        equipment: `Tripods need stability against wind and waves — heavy tripod + windbreak stone. ND filters (8–400) for long exposure; graduated ND for sky balance. CPL for polarization. Salt-water care: rinse camera and tripod with fresh water or salt-removal wipes after each shoot. Rain cover essential.`,
        tips: `Chichibugahama is shootable only on days when low tide and sunset coincide. The tourist board publishes a tide+sunset calendar — check it. Meoto-iwa's sun moves 2cm per day; summer solstice ±3 days centers it. Naruto whirlpools — check the bridge company's prediction site. Okinawa typhoon season (Jul–Oct) carries weather risk.`,
      },
      zh: {
        bestSeason: `冲绳/宫古岛:4〜6月与10〜11月(避梅雨与台风)。父母滨:4〜9月夕阳最美。夫妻岩夏至日出:仅5〜7月。鸣门涡潮:春秋大潮(非中潮)。冬季太平洋侧空气清澈水平线锐利。`,
        bestTime: `日出日落最关键。父母滨日落前30〜40分干潮无风为映射最佳。夫妻岩夏至±3天太阳居中。鸣门涡潮干满潮±1小时。海岸的魔法时刻(蓝调时刻)日落后20〜40分最神秘。`,
        technique: `海面反射要留要除自选。CPL消反射、ND长曝(波纹丝状)。广角拍空+海+前景三层、长焦压缩岛石船。HDR平衡明暗。三脚架必备。`,
        equipment: `三脚架需在风浪中稳定——重型+防风石。ND滤镜(8〜400)长曝、渐变ND平衡天空。CPL偏振。盐害防护:拍后用淡水或除盐湿巾清洁。雨罩必备。`,
        tips: `父母滨仅在「干潮+日落」同时的日子可拍。观光协会网站有日历查询。夫妻岩太阳每日动2cm,夏至±3日居中。鸣门涡潮查桥梁公司预测。冲绳台风季(7-10月)天气风险高。`,
      },
      "zh-tw": {
        bestSeason: `沖繩/宮古島:4〜6月與10〜11月(避梅雨與颱風)。父母濱:4〜9月夕陽最美。夫妻岩夏至日出:僅5〜7月。鳴門渦潮:春秋大潮(非中潮)。冬季太平洋側空氣清澈水平線銳利。`,
        bestTime: `日出日落最關鍵。父母濱日落前30〜40分乾潮無風為映射最佳。夫妻岩夏至±3天太陽居中。鳴門渦潮乾滿潮±1小時。海岸的魔法時刻(藍調時刻)日落後20〜40分最神秘。`,
        technique: `海面反射要留要除自選。CPL消反射、ND長曝(波紋絲狀)。廣角拍空+海+前景三層、長焦壓縮島石船。HDR平衡明暗。三腳架必備。`,
        equipment: `三腳架需在風浪中穩定——重型+防風石。ND濾鏡(8〜400)長曝、漸變ND平衡天空。CPL偏振。鹽害防護:拍後用淡水或除鹽濕巾清潔。雨罩必備。`,
        tips: `父母濱僅在「乾潮+日落」同時的日子可拍。觀光協會網站有日歷查詢。夫妻岩太陽每日動2cm,夏至±3日居中。鳴門渦潮查橋樑公司預測。沖繩颱風季(7-10月)天氣風險高。`,
      },
      ko: {
        bestSeason: `오키나와·미야코지마는 4〜6월 및 10〜11월(장마와 태풍 회피), 지치부가하마는 4〜9월의 노을이 아름다운 시기, 메오토이와의 하지 일출은 5월〜7월 한정 촬영, 나루토해협 소용돌이는 봄·가을의 오시오(중조 아님). 겨울엔 태평양 측에서도 공기가 맑아 수평선이 샤프하게 찍힌다.`,
        bestTime: `일출·일몰이 가장 중요. 지치부가하마는 일몰 30〜40분 전 간조+무풍이 반사 최적. 메오토이와는 하지 전후의 일출. 나루토해협은 오시오의 간만 시각+1시간 이내. 해안에서의 매직 아워(블루 아워)는 일몰 후 20〜40분의 푸른 시간이 가장 아름답다.`,
        technique: `바다는 반사를 살리거나 제거하느냐로 구도가 크게 달라진다. CPL로 반사 컷, ND로 장시간 노출(파도의 움직임을 실 모양으로). 광각으로 다이내믹 레인지 넓은 하늘+바다+전경 3층, 망원으로 섬·바위·배 등 특정 피사체 압축. HDR로 밝은 하늘+어두운 전경 양립. 삼각대 필수.`,
        equipment: `삼각대는 강풍과 파도로 안정성 중요——무거운 삼각대+풍방 스톤. ND 필터(8〜400)로 장시간 노출, 하프 ND로 하늘과 명암 차 경감. CPL로 편광, 염해 대책으로 촬영 후 카메라·삼각대를 맑은 물로 세척하거나 염제거 웻티슈로 닦는다. 우비 필수.`,
        tips: `지치부가하마는 간조 시각이 일몰과 겹치는 날에만 촬영 가능. 관광협회 사이트에 「간조+일몰」 캘린더가 공개되어 있으니 확인. 메오토이와의 태양은 하루 2cm씩 움직이므로 하지 전후 3일이 가장 중앙에 온다. 나루토 소용돌이는 예측 사이트(혼슈시코쿠연락고속도로)에서 시각 확인. 오키나와는 태풍 시즌(7-10월)에 날씨 리스크 높음.`,
      },
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
    guide: {
      ja: {
        bestSeason: `年間を通じて撮影可能だが、空気が澄む冬(12〜2月)が最も遠景までクリアに撮れる。夏は湿度で霞みやすい。台風の接近後は空気が一掃されて翌日の夜景が最高。新月の夜は星と街並みの両方が撮れる。`,
        bestTime: `日没後30〜45分の「ブルーアワー」が最重要。空が深い藍色のうちは街灯と空のバランスが取れる。完全な暗夜になると街灯部分が白飛びしやすい。三脚を立てて日没前から30分間の連続撮影で、空の青の変化を捉える。`,
        technique: `三脚必須。シャッタースピード5〜30秒、ISO100〜400、絞りf/8〜f/11で被写界深度と画質を両立。長秒露光で車のテールライトを光の線に。WBは街灯のナトリウム灯と LED の混在で「太陽光」または「白色蛍光灯」が好バランス。HDR3枚撮影で明部の街灯と暗部の空を両立。`,
        equipment: `三脚は雲台ガタなしの安定タイプ必須。リモートシャッターまたは2秒タイマー(三脚ブレ防止)。広角ズーム(16-35mm)+標準ズーム(24-105mm)。望遠は遠景の摩天楼に。NDフィルターは不要(夜景は遅いシャッターが基本)。レンズフードで街灯のフレア軽減。`,
        tips: `立石公園の諏訪湖夜景は秋〜冬の冷えた夜、街灯の「キラキラ」が最も多い。横浜みなとみらいは観覧車のライトショーが日没後20〜30分間。札幌・藻岩山は夜のロープウェイで上がる必要があるため終発時刻に注意。冬は機材結露対策のためビニール袋封入が必須。`,
      },
      en: {
        bestSeason: `Year-round shootable, but clear-air winter (Dec–Feb) gives sharpest distance. Summer humidity creates haze. The night after a typhoon clears the atmosphere — peak conditions. New-moon nights allow stars + cityscape together.`,
        bestTime: `The 30–45 minute «blue hour» after sunset is critical. While the sky stays deep blue, streetlights and sky balance perfectly. Full darkness causes streetlight blowouts. Set up before sunset and shoot continuously for 30 minutes to capture the sky's blue evolution.`,
        technique: `Tripod essential. Shutter 5–30s, ISO 100–400, aperture f/8–f/11 balances DOF and quality. Long exposure converts car taillights into light streaks. WB: streetlight sodium and LED mix; «Daylight» or «White fluorescent» works best. HDR (3 frames) balances bright streetlights and dark sky.`,
        equipment: `Tripod must be solid head with no slack. Remote shutter or 2s timer prevents camera shake. Wide zoom (16–35mm) + standard zoom (24–105mm). Telephoto for distant skylines. ND filters unnecessary (night = already slow). Lens hood reduces streetlight flare.`,
        tips: `Tateishi Park's Suwa Lake nightscape glitters most on cold autumn-winter nights. Yokohama Minato Mirai's ferris-wheel light show runs 20–30 min post-sunset. Sapporo Mt. Moiwa requires the night ropeway — note last departure. Winter equipment condensation: seal in plastic bag before re-entering warm rooms.`,
      },
      zh: {
        bestSeason: `年间皆可,但冬季(12〜2月)空气清澈远景最锐。夏季湿度高易雾。台风过后空气清扫翌夜最佳。新月夜可同时拍星空与城市。`,
        bestTime: `日落后30〜45分钟的「蓝调时刻」最关键。深蓝天空下街灯与天空平衡。全黑后街灯易过曝。日落前架三脚架连续拍30分钟捕捉蓝色变化。`,
        technique: `三脚架必备。快门5〜30秒、ISO 100〜400、光圈f/8〜f/11兼顾景深与画质。长曝车尾灯成光线。白平衡街灯钠灯LED混合,「日光」或「白色荧光」最佳。HDR三张平衡明暗。`,
        equipment: `三脚架云台需稳无晃动。遥控快门或2秒延时防机震。广角(16-35mm)+标准(24-105mm)变焦。长焦拍远景摩天楼。ND不需(夜景本身慢门)。遮光罩减街灯眩光。`,
        tips: `立石公园诹访湖夜景秋冬冷夜街灯「闪烁」最多。横滨港未来摩天轮灯光秀日落后20〜30分。札幌藻岩山夜间缆车须注意末班。冬天机材结露对策必装密封袋入室。`,
      },
      "zh-tw": {
        bestSeason: `年間皆可,但冬季(12〜2月)空氣清澈遠景最銳。夏季濕度高易霧。颱風過後空氣清掃翌夜最佳。新月夜可同時拍星空與城市。`,
        bestTime: `日落後30〜45分鐘的「藍調時刻」最關鍵。深藍天空下街燈與天空平衡。全黑後街燈易過曝。日落前架三腳架連續拍30分鐘捕捉藍色變化。`,
        technique: `三腳架必備。快門5〜30秒、ISO 100〜400、光圈f/8〜f/11兼顧景深與畫質。長曝車尾燈成光線。白平衡街燈鈉燈LED混合,「日光」或「白色螢光」最佳。HDR三張平衡明暗。`,
        equipment: `三腳架雲台需穩無晃動。遙控快門或2秒延時防機震。廣角(16-35mm)+標準(24-105mm)變焦。長焦拍遠景摩天樓。ND不需(夜景本身慢門)。遮光罩減街燈眩光。`,
        tips: `立石公園諏訪湖夜景秋冬冷夜街燈「閃爍」最多。橫濱港未來摩天輪燈光秀日落後20〜30分。札幌藻岩山夜間纜車須注意末班。冬天機材結露對策必裝密封袋入室。`,
      },
      ko: {
        bestSeason: `연중 촬영 가능하지만 공기가 맑은 겨울(12〜2월)이 가장 원경까지 클리어하게 찍힌다. 여름은 습도로 흐려지기 쉽다. 태풍 접근 후엔 공기가 일소되어 다음날 야경이 최고. 신월의 밤엔 별과 거리 풍경을 동시에 찍을 수 있다.`,
        bestTime: `일몰 후 30〜45분의 「블루 아워」가 가장 중요. 하늘이 깊은 남색 동안에는 가로등과 하늘의 밸런스가 맞는다. 완전한 어둠이 되면 가로등 부분이 화이트홀이 되기 쉽다. 삼각대를 세우고 일몰 전부터 30분간의 연속 촬영으로 하늘의 푸른 변화 포착.`,
        technique: `삼각대 필수. 셔터스피드 5〜30초, ISO 100〜400, 조리개 f/8〜f/11로 피사계심도와 화질을 양립. 장시간 노출로 자동차 테일라이트를 빛의 선으로. WB는 가로등의 나트륨등과 LED 혼재이므로 「태양광」 또는 「백색 형광등」이 호밸런스. HDR 3장 촬영으로 명부의 가로등과 암부의 하늘 양립.`,
        equipment: `삼각대는 운대 흔들림 없는 안정 타입 필수. 리모트 셔터 또는 2초 타이머(삼각대 흔들림 방지). 광각 줌(16-35mm)+표준 줌(24-105mm). 망원은 원경의 마천루에. ND 필터는 불필요(야경은 느린 셔터가 기본). 렌즈 후드로 가로등 플레어 경감.`,
        tips: `다테이시 공원의 스와호 야경은 가을〜겨울의 차가운 밤에 가로등의 「반짝임」이 가장 많다. 요코하마 미나토미라이는 관람차의 라이트쇼가 일몰 후 20〜30분간. 삿포로 모이와산은 밤 로프웨이로 올라가야 하므로 막차 시각 주의. 겨울엔 기재 결로 대책으로 비닐봉지 봉입 필수.`,
      },
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
    guide: {
      ja: {
        bestSeason: `滝は雪解け水増水期(4月下旬〜5月)と新緑(5月)が最美。三段滝は新緑、にこ淵は5月〜10月の青さがピーク(ただし雨後の濁流時は避ける)。紅葉(10月下旬〜11月)も滝+紅葉の絶景。冬の凍結滝(三段滝など)は2月の限定撮影。`,
        bestTime: `曇天〜小雨の日が最適。直射日光は滝のハイライトを白飛びさせ、影とのコントラストが強すぎる。雨上がり直後は岩・苔の彩度が最高。森の木漏れ日が滝壺に当たる午前10〜11時の限定的な瞬間も狙い目。早朝は霧と組み合わせ可能。`,
        technique: `スローシャッター(1/4〜2秒)で滝の流れを糸状に表現。1/30秒以下では水の動きが部分的に止まり、立体感が出る。NDフィルター(8〜64)で日中スローシャッター。CPLで岩面の反射カット、苔の緑強調。広角で滝全体、中望遠で水の動きの一部分。三脚必須。`,
        equipment: `三脚は水しぶきがかかる場所のため防水カバー必携。NDフィルター8〜64。CPL。レインカバー。レンズへの水しぶき対策の吸水クロスを多めに。三段滝・にこ淵は遊歩道があり装備運搬は困難ではないが、足元滑りやすいので滑り止めの靴。`,
        tips: `にこ淵は晴天日の正午前後が水底まで透ける「青」が最強。神聖な場所のため(神祭場跡)、観光ルールを守る。三段滝は周辺の駐車場が小規模で土日は混雑のため平日推奨。雨後3〜5日後が最適タイミング——濁流が落ち着いた青さに戻った頃。`,
      },
      en: {
        bestSeason: `Waterfalls are most beautiful during snowmelt (late April–May) and fresh greenery (May). Sandan Falls peak in spring; Niko-buchi's blue peaks May–October (avoid post-storm muddy flows). Autumn (late October–November) gives waterfall + foliage spectacle. Frozen waterfalls (Sandan etc.) are a February-only shot.`,
        bestTime: `Overcast to light rain is ideal. Direct sunlight blows out highlights and creates harsh contrast. Just-after-rain peaks rock and moss saturation. The 10:00–11:00 window when forest light reaches the waterfall basin is fleeting but magical. Early morning combines with mist.`,
        technique: `Slow shutter (1/4–2s) renders water as silken threads. Below 1/30s the motion partially freezes, adding depth. ND filter (8–64) enables daytime slow shutter. CPL cuts rock reflections and boosts moss green. Wide-angle for whole falls; medium-tele for water-motion details. Tripod essential.`,
        equipment: `Tripod with waterproof cover (spray exposure). ND filter 8–64. CPL. Rain cover. Plenty of absorbent cloths for lens spray. Sandan and Niko-buchi have trails — gear transport is OK, but bring grippy shoes for wet footing.`,
        tips: `Niko-buchi's «blue» is at peak around noon on clear days when sunlight reaches the bottom. The site is sacred (former ritual ground) — observe etiquette. Sandan Falls has small parking, weekends crowded — visit weekdays. Best timing is 3–5 days after rain — once muddy flow returns to calm blue.`,
      },
      zh: {
        bestSeason: `瀑布在融雪增水期(4月下〜5月)与新绿(5月)最美。三段瀑布春最佳;仁淀蓝5〜10月最蓝(雨后浊流期回避)。红葉(10月下〜11月)瀑布+红叶绝景。冬季冰冻瀑布(三段等)2月限定。`,
        bestTime: `阴天〜小雨最佳。直射日光令瀑布过曝。雨后岩石青苔饱和度最高。林间光10:00〜11:00短暂时刻也佳。清晨可与雾结合。`,
        technique: `慢门(1/4〜2秒)将水流化为丝。1/30秒以下水动部分凝结,立体感更强。ND8〜64白天慢门。CPL消岩反光、强调青苔绿。广角拍全瀑、中长焦拍水流细节。三脚架必备。`,
        equipment: `三脚架需防水罩(水花)。ND8〜64。CPL。雨罩。多准备吸水布给镜头。三段、仁淀蓝有步道,装备搬运不难,但路滑需防滑鞋。`,
        tips: `仁淀蓝晴天正午水底通透「青」最强。神圣场所(祭神遗址)守规矩。三段瀑布停车少,周末挤,推荐工作日。雨后3〜5天为最佳——浊流转为青色之时。`,
      },
      "zh-tw": {
        bestSeason: `瀑布在融雪增水期(4月下〜5月)與新綠(5月)最美。三段瀑布春最佳;仁淀藍5〜10月最藍(雨後濁流期迴避)。紅葉(10月下〜11月)瀑布+紅葉絕景。冬季冰凍瀑布(三段等)2月限定。`,
        bestTime: `陰天〜小雨最佳。直射日光令瀑布過曝。雨後岩石青苔飽和度最高。林間光10:00〜11:00短暫時刻也佳。清晨可與霧結合。`,
        technique: `慢門(1/4〜2秒)將水流化為絲。1/30秒以下水動部分凝結,立體感更強。ND8〜64白天慢門。CPL消岩反光、強調青苔綠。廣角拍全瀑、中長焦拍水流細節。三腳架必備。`,
        equipment: `三腳架需防水罩(水花)。ND8〜64。CPL。雨罩。多準備吸水布給鏡頭。三段、仁淀藍有步道,裝備搬運不難,但路滑需防滑鞋。`,
        tips: `仁淀藍晴天正午水底通透「青」最強。神聖場所(祭神遺址)守規矩。三段瀑布停車少,週末擠,推薦工作日。雨後3〜5天為最佳——濁流轉為青色之時。`,
      },
      ko: {
        bestSeason: `폭포는 눈 녹은 물 증수기(4월 하순〜5월)와 신록(5월)이 가장 아름답다. 산단타키는 신록, 니코부치는 5월〜10월의 푸른빛이 절정(단 비 후 탁류 시는 회피). 단풍(10월 하순〜11월)도 폭포+단풍의 절경. 겨울 동결 폭포(산단타키 등)는 2월의 한정 촬영.`,
        bestTime: `흐림〜가랑비 날이 최적. 직사광선은 폭포의 하이라이트를 화이트홀시키고 그림자와의 콘트라스트가 너무 강하다. 비 온 직후엔 바위·이끼의 채도가 최고. 숲의 햇살이 폭포 웅덩이에 닿는 오전 10〜11시의 한정적 순간도 노릴 만. 이른 아침엔 안개와 조합 가능.`,
        technique: `슬로우 셔터(1/4〜2초)로 폭포의 흐름을 실 모양으로 표현. 1/30초 이하에선 물의 움직임이 부분적으로 멈춰 입체감이 나온다. ND 필터(8〜64)로 낮 슬로우 셔터. CPL로 바위 면 반사 컷, 이끼의 녹색 강조. 광각으로 폭포 전체, 중망원으로 물의 움직임 일부. 삼각대 필수.`,
        equipment: `삼각대는 물 튀는 곳이라 방수 커버 필수. ND 필터 8〜64. CPL. 우비. 렌즈 물방울 대책의 흡수 천을 많이. 산단타키·니코부치는 산책로가 있어 장비 운반이 어렵지 않지만 발 밑 미끄러우니 미끄럼 방지 신발.`,
        tips: `니코부치는 맑은 날 정오 전후가 물 밑까지 비치는 「푸른빛」이 가장 강하다. 신성한 장소(신제장 터)이므로 관광 규칙 준수. 산단타키는 주변 주차장이 작고 주말 혼잡하므로 평일 권장. 비 온 후 3〜5일 후가 최적 타이밍——탁류가 가라앉은 푸른빛으로 돌아왔을 때.`,
      },
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
    guide: {
      ja: {
        bestSeason: `湖はそれぞれベストシーズンが異なる:摩周湖は秋(10月)の霧晴の日、洞爺湖は夏(7-8月)の長期間花火大会、河口湖は冬(12-2月)の冠雪富士+逆さ富士、諏訪湖は冬(1-2月)の御神渡り(数年に一度)。新緑期(5月)の湖面+若葉も穏やか。`,
        bestTime: `早朝の風がない時間(5:00〜7:00)が逆さ風景の絶対条件。摩周湖は霧の日が多いため日中の霧晴れ瞬間を狙う。河口湖の逆さ富士は晩秋〜冬の早朝、温度差で水面が凪ぐ時。日没後のブルーアワーは湖面が深い藍色に染まり夢幻的。`,
        technique: `逆さ風景は完全な無風が条件——わずかな風でも水面の波で映り込みが消える。広角(16-35mm)で湖+山+空の三層、中望遠でリフレクション部分を圧縮。露出はリフレクション側の暗部を基準にすると上下対称が美しい。三脚必須。CPLは水面下の透明感を出すか反射を残すかで判断。`,
        equipment: `三脚は湖畔の岩場や砂地での安定性のため大型推奨。NDフィルターで日中の長秒(波を平滑に)。CPLで水面の透明感UP・反射軽減。広角ズーム+標準ズーム+望遠ズーム3本構成が望ましい。湖は霧が出やすいためレインカバー・吸水クロス。`,
        tips: `摩周湖は霧深く晴天日が年の30%以下のため複数日訪問予定で。展望台3カ所(第一・第三・裏摩周)で異なる絶景。洞爺湖花火は4月〜10月の毎晩20:45〜21:05打ち上げ。河口湖の逆さ富士は風予報・気象庁の風速データを毎時確認。諏訪湖の御神渡り発生は気温-15℃以下が連続10日以上必要。`,
      },
      en: {
        bestSeason: `Each lake has a different peak: Mashu in autumn (October) on rare clear days, Toya in summer (Jul–Aug) for nightly fireworks, Kawaguchi in winter (Dec–Feb) for snow-capped Fuji + inverted reflection, Suwa in winter (Jan–Feb) for «Omiwatari» ice ridges (every few years). Fresh greenery (May) gives gentle lakeside scenes too.`,
        bestTime: `Early-morning windless hours (5:00–7:00) are essential for inverted reflections. Mashu is often foggy — target the brief clearings. Kawaguchi's inverted Fuji works best late autumn–winter at dawn when temperature differential calms the surface. Post-sunset blue hour deepens lake into navy — dreamlike.`,
        technique: `Inverted reflections demand zero wind — even faint breeze ruins the mirror. Wide-angle (16–35mm) for lake+mountain+sky three-layer; medium-tele compresses reflection. Expose for shadow side (reflection) for symmetric result. Tripod essential. CPL: keep or kill reflection — your call.`,
        equipment: `Tripod needs heft for rocky/sandy lakeside. ND for daytime long-exposure (smoothed water). CPL boosts subsurface clarity or cuts surface reflection. Three-zoom kit (wide+standard+tele) ideal. Lakes attract mist — bring rain cover and absorbent cloths.`,
        tips: `Mashu is foggy — clear days under 30% of year. Plan multi-day visits. Three observatories (Lookouts 1, 3, Ura-Mashu) offer different views. Toya fireworks April–October nightly 20:45–21:05. Kawaguchi inverted Fuji needs hourly wind data check. Suwa Omiwatari requires 10+ consecutive days below -15°C.`,
      },
      zh: {
        bestSeason: `各湖最佳季节不同:摩周湖秋季(10月)雾散日;洞爷湖夏(7-8月)每夜花火;河口湖冬(12-2月)雪覆富士+倒影;诹访湖冬(1-2月)御神渡(数年一遇)。新绿期(5月)湖面+嫩叶亦柔。`,
        bestTime: `清晨无风时(5:00〜7:00)为倒影绝对条件。摩周湖雾多需追雾散瞬间。河口湖倒富士晚秋〜冬清晨温差使湖面平静。日落后蓝调时刻湖面深蓝梦幻。`,
        technique: `倒影需完全无风——微风即破镜面。广角(16-35mm)拍湖+山+空三层、中长焦压缩倒影。曝光以倒影暗部为基准上下对称美。三脚架必备。CPL视情留或消反光。`,
        equipment: `三脚架需大型(湖畔岩沙不稳)。ND白天慢门(波纹平滑)。CPL增水底透明度或减反光。广角+标准+长焦三镜头组合佳。湖区多雾需雨罩、吸水布。`,
        tips: `摩周湖雾大晴天年30%以下,多日访问规划。三处展望台(一、三、里摩周)景各异。洞爷湖花火4-10月每晚20:45〜21:05。河口湖倒富士需查气象厅风速数据。诹访御神渡需-15℃连续10日以上。`,
      },
      "zh-tw": {
        bestSeason: `各湖最佳季節不同:摩周湖秋季(10月)霧散日;洞爺湖夏(7-8月)每夜煙花;河口湖冬(12-2月)雪覆富士+倒影;諏訪湖冬(1-2月)御神渡(數年一遇)。新綠期(5月)湖面+嫩葉亦柔。`,
        bestTime: `清晨無風時(5:00〜7:00)為倒影絕對條件。摩周湖霧多需追霧散瞬間。河口湖倒富士晚秋〜冬清晨溫差使湖面平靜。日落後藍調時刻湖面深藍夢幻。`,
        technique: `倒影需完全無風——微風即破鏡面。廣角(16-35mm)拍湖+山+空三層、中長焦壓縮倒影。曝光以倒影暗部為基準上下對稱美。三腳架必備。CPL視情留或消反光。`,
        equipment: `三腳架需大型(湖畔岩沙不穩)。ND白天慢門(波紋平滑)。CPL增水底透明度或減反光。廣角+標準+長焦三鏡頭組合佳。湖區多霧需雨罩、吸水布。`,
        tips: `摩周湖霧大晴天年30%以下,多日訪問規劃。三處展望台(一、三、裡摩周)景各異。洞爺湖煙花4-10月每晚20:45〜21:05。河口湖倒富士需查氣象廳風速數據。諏訪御神渡需-15℃連續10日以上。`,
      },
      ko: {
        bestSeason: `호수마다 베스트 시즌이 다르다: 마슈호는 가을(10월) 안개 갠 날, 도야호는 여름(7-8월)의 장기간 불꽃 대회, 가와구치호는 겨울(12-2월)의 설관 후지+역 후지, 스와호는 겨울(1-2월)의 오미와타리(몇 년에 한 번). 신록기(5월)의 호수면+새잎도 온화.`,
        bestTime: `이른 아침 바람이 없는 시간(5:00〜7:00)이 역 풍경의 절대 조건. 마슈호는 안개 일이 많아 한낮의 안개 갠 순간을 노린다. 가와구치호의 역 후지는 늦가을〜겨울 새벽, 온도 차로 수면이 잔잔해질 때. 일몰 후 블루아워는 호수면이 깊은 남색으로 물들어 몽환적.`,
        technique: `역 풍경은 완전 무풍이 조건——약간의 바람이라도 수면의 파도로 비침이 사라진다. 광각(16-35mm)으로 호수+산+하늘 3층, 중망원으로 리플렉션 부분을 압축. 노출은 리플렉션 쪽 암부 기준으로 상하 대칭이 아름답다. 삼각대 필수. CPL은 수면 아래 투명감을 낼지 반사를 남길지 판단.`,
        equipment: `삼각대는 호반의 바위터·모래 안정성을 위해 대형 추천. ND 필터로 한낮 장시간(파도 평탄화). CPL로 수면 투명감 UP·반사 경감. 광각 줌+표준 줌+망원 줌 3본 구성이 바람직. 호수는 안개가 끼기 쉬우므로 우비·흡수 천.`,
        tips: `마슈호는 안개 깊어 청천일이 연 30% 이하이므로 여러 날 방문 예정으로. 전망대 3곳(제1·제3·우라마슈)에서 다른 절경. 도야호 불꽃은 4월〜10월 매일 밤 20:45〜21:05 발사. 가와구치호의 역 후지는 풍속 예보·기상청 풍속 데이터를 매시 확인. 스와호의 오미와타리 발생은 기온 -15℃ 이하가 연속 10일 이상 필요.`,
      },
    },
  },
};

export const COLLECTION_SLUGS = Object.keys(COLLECTIONS);

// Get all photos matching a collection.
// Strategy: photo個別tag(PHOTO_TAGS)があればそれでフィルタ(精密)。
// なければ collection.locs での loc-level fallback(暫定、tag付け前のloc用)。
import { PHOTO_TAGS, COLLECTION_TAGS } from "./photo-tags.js";

export function getCollectionPhotos(slug, PREFECTURES) {
  const c = COLLECTIONS[slug];
  if (!c) return [];
  const collectionTags = COLLECTION_TAGS[slug] || [];
  const locSet = new Set(c.locs);
  const result = [];
  for (const pf of PREFECTURES) {
    for (const photo of pf.photos) {
      const tags = PHOTO_TAGS[photo.id];
      if (tags) {
        // タグ付け済写真:タグでフィルタ(loc は無視、より精密)
        if (tags.some((t) => collectionTags.includes(t))) {
          result.push({ ...photo, pref: pf.pref });
        }
      } else {
        // 未タグ付け写真:loc 単位で fallback
        if (photo.loc && locSet.has(photo.loc)) {
          result.push({ ...photo, pref: pf.pref });
        }
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

// A8: コレクション撮影ガイド (5 langs base, 残 15 langs は en にフォールバック)
export const getCollectionGuide = (slug, lang) => {
  const c = COLLECTIONS[slug];
  if (!c || !c.guide) return null;
  return c.guide[lang] || c.guide.en || null;
};
