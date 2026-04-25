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
