/**
 * 撮影テクニックHowTo schema用ステップ定義 (Google Rich Results対応)
 * post slug → 撮影手順のマップ。記事本文と並行して構造化データ提供。
 */
export const HOWTO = {
  "lake-kawaguchi-fuji": {
    nameJa: "河口湖で逆さ富士を撮影する方法",
    nameEn: "How to Photograph the Inverted Fuji at Lake Kawaguchi",
    totalTime: "PT2H",
    supplyJa: ["カメラ本体", "三脚", "PLフィルター", "防寒着"],
    supplyEn: ["Camera body", "Tripod", "CPL filter", "Warm clothing"],
    steps: [
      { nameJa: "撮影スポット選定", textJa: "湖の北岸にある大石公園、産屋ヶ崎、長崎公園、八木崎公園のいずれかに移動する。富士山が南東方向に見える位置を選ぶ。", nameEn: "Choose your spot", textEn: "Head to one of the north-shore vantages: Oishi Park, Ubuyagasaki, Nagasaki Park, or Yagisaki Park. Pick a position with Mt. Fuji to the southeast." },
      { nameJa: "条件確認", textJa: "風速1m/秒以下、晴天、日の出前到着の3条件を満たす日を選ぶ。冬（12〜2月）が最も成功率が高い。", nameEn: "Verify conditions", textEn: "Aim for a day with under 1 m/s wind, clear skies, and arrival before sunrise. Winter (Dec–Feb) has the highest success rate." },
      { nameJa: "三脚と機材設置", textJa: "日の出30分前に到着し三脚を設置。標準ズーム（24-70mm）にPLフィルターを装着、PLは弱めに調整して逆さ富士の像を残す。", nameEn: "Set up gear", textEn: "Arrive 30 min before sunrise. Mount a 24–70 mm zoom on a tripod and attach a CPL filter — set the polarization weakly to preserve the reflection." },
      { nameJa: "露出決定", textJa: "マニュアルF8・ISO100・SS自動 (Av or M)、HDRブラケット3枚撮影設定。RAW記録ON。", nameEn: "Set exposure", textEn: "Manual mode at f/8, ISO 100, auto shutter (Av or M), with 3-frame HDR bracketing. RAW capture on." },
      { nameJa: "シャッターレリーズ", textJa: "風が止んだ瞬間にレリーズかセルフタイマーで撮影。マジックアワー (日の出前後30分) に集中して撮る。", nameEn: "Trigger the shutter", textEn: "Wait for windless moments and trigger via remote or self-timer. Concentrate shooting during the magic hour (30 min around sunrise)." },
    ],
  },
  "mt-fuji-arakurayama": {
    nameJa: "新倉山浅間公園で富士山+五重塔+桜の三段構図を撮る方法",
    nameEn: "How to Shoot the Mt. Fuji + Pagoda + Cherry Blossoms Three-Tier Frame at Arakurayama Sengen Park",
    totalTime: "PT3H",
    supplyJa: ["カメラ本体", "標準〜中望遠ズーム", "三脚", "防寒・暖かい飲み物"],
    supplyEn: ["Camera body", "Normal-to-short telephoto zoom", "Tripod", "Warm clothing & drinks"],
    steps: [
      { nameJa: "アクセス", textJa: "富士急行線「下吉田駅」から徒歩10分で新倉富士浅間神社到着。社殿を経て398段の咲くや姫階段を登る（迂回スロープあり）。", nameEn: "Access", textEn: "From Shimo-Yoshida Station on the Fujikyu Line, walk 10 min to Arakura Fuji Sengen Shrine. From the shrine grounds, climb the 398 «Sakuyahime» steps (a gentler slope path is also available)." },
      { nameJa: "早朝到着", textJa: "夜明け前到着が必須。日の出30分前から場所取り、三脚位置を確保する。", nameEn: "Arrive predawn", textEn: "Predawn arrival is essential. Secure your tripod position 30 minutes before sunrise." },
      { nameJa: "構図決定", textJa: "70mm前後で五重塔・桜・富士山を一フレームに圧縮。広角は塔と富士の間が空きすぎるため避ける。", nameEn: "Compose", textEn: "Use ~70 mm to compress the pagoda, cherry blossoms, and Mt. Fuji into a single frame. Avoid wide angles, which create too much space between elements." },
      { nameJa: "露出設定", textJa: "F8〜F11、ISO100、SSはマジックアワーの空に合わせる。RAW撮影必須。", nameEn: "Exposure", textEn: "f/8–f/11, ISO 100, with shutter speed metered for the magic-hour sky. RAW is essential." },
      { nameJa: "ベストモーメント撮影", textJa: "日の出直後の朝焼けで富士山が赤く染まる「赤富士」の瞬間が最高。連写でブラケット記録。", nameEn: "Capture the peak moment", textEn: "Just after sunrise, Mt. Fuji glows red — the famous «aka-fuji.» Burst-shoot to capture every variation." },
    ],
  },
  "chichibugahama-uyuni": {
    nameJa: "父母ヶ浜で「日本のウユニ塩湖」夕景を撮影する方法",
    nameEn: "How to Capture the «Uyuni-of-Japan» Sunset at Chichibugahama",
    totalTime: "PT2H",
    supplyJa: ["カメラ本体", "広角レンズ", "三脚", "着替え・敷物"],
    supplyEn: ["Camera body", "Wide-angle lens", "Tripod", "Change of clothes and tarp"],
    steps: [
      { nameJa: "三条件チェック", textJa: "干潮時刻と日没が重なる日、無風（風速2m/秒以下）、晴天の三条件を三豊市観光交流局公式カレンダーで確認。", nameEn: "Check three conditions", textEn: "Verify on Mitoyo City's tourism calendar that low tide coincides with sunset, wind is under 2 m/s, and skies are clear." },
      { nameJa: "現地到着", textJa: "日没30分前に到着し、潮が引いた干潟に薄く水が残るエリアを見つける。", nameEn: "Arrive on site", textEn: "Arrive 30 min before sunset and find a shallow tidepool where the retreating tide leaves a thin water layer." },
      { nameJa: "ローアングル設定", textJa: "膝立ちか地面スレスレに広角レンズ（16-35mm）で構える。チルト液晶があればさらに低い視点が可能。", nameEn: "Get low", textEn: "Kneel or get nearly ground-level with a 16–35 mm wide angle. A tilting LCD enables even lower angles." },
      { nameJa: "シルエット撮影", textJa: "人物を逆光シルエットに、カメラはマニュアルF8・SS1/60〜1/125・ISO200。HDRブラケット3〜5枚。", nameEn: "Shoot silhouettes", textEn: "Place subjects as backlit silhouettes. Manual mode at f/8, 1/60–1/125 s, ISO 200. Bracket 3–5 HDR frames." },
      { nameJa: "マジックアワー", textJa: "日没後10〜30分のマジックアワーが色彩のピーク。RAWで残し後処理で空と地面のバランスを整える。", nameEn: "Magic hour", textEn: "10–30 min after sunset is color peak. Capture in RAW and balance sky-vs-ground in post." },
    ],
  },
  "achi-stargazing": {
    nameJa: "阿智村で天の川と星空を撮影する方法",
    nameEn: "How to Photograph the Milky Way and Stars in Achi Village",
    totalTime: "PT4H",
    supplyJa: ["カメラ (高ISO耐性)", "広角単焦点 or F2.8ズーム", "三脚", "ヘッドライト (赤色LED)", "レンズヒーター"],
    supplyEn: ["High-ISO camera", "Fast wide prime or f/2.8 zoom", "Tripod", "Red-LED headlamp", "Lens heater"],
    steps: [
      { nameJa: "新月期の予約", textJa: "月齢カレンダーで新月±3日以内の晴天を狙い、スタービレッジ阿智ナイトツアーを1ヶ月前から予約する。", nameEn: "Book during new moon", textEn: "Target a clear night within ±3 days of new moon and book the Star Village Achi night tour a month ahead." },
      { nameJa: "ロープウェイ移動", textJa: "富士見台高原ロープウェイで標高1400mの山頂駅へ。消灯時間帯まで暗順応を待つ。", nameEn: "Take the ropeway", textEn: "Ride the Fujimidai Highland Ropeway to the 1,400 m summit station. Allow eyes to dark-adapt during the lights-out period." },
      { nameJa: "三脚と構図", textJa: "三脚を設置し広角レンズ（14-24mm or 20mm単焦点）で水平。前景に山稜や木を入れて奥行き表現。", nameEn: "Tripod and composition", textEn: "Set up the tripod with a wide lens (14–24 mm or 20 mm prime), level it. Include ridgeline or trees as foreground for depth." },
      { nameJa: "設定値", textJa: "マニュアル: ISO3200〜6400、F2.8、SS15〜25秒（500ルール）、ホワイトバランス3500〜4000K、RAW。", nameEn: "Settings", textEn: "Manual: ISO 3200–6400, f/2.8, 15–25 s (500 rule), white balance 3500–4000 K, RAW." },
      { nameJa: "比較明合成", textJa: "前景と星空をそれぞれ最適露出で撮影し、Photoshopで比較明合成。または1枚撮りでLEDで微弱補光。", nameEn: "Brightness blending", textEn: "Shoot foreground and stars separately at their optimal exposures and blend in Photoshop. Alternatively, light-paint the foreground with a soft LED in a single frame." },
    ],
  },
  "lake-suwa-omiwatari": {
    nameJa: "諏訪湖の御神渡りを撮影する方法",
    nameEn: "How to Photograph Omiwatari Ice Ridges on Lake Suwa",
    totalTime: "PT3H",
    supplyJa: ["カメラ本体", "広角〜標準ズーム", "三脚", "極寒装備", "予備バッテリー"],
    supplyEn: ["Camera body", "Wide-to-standard zoom", "Tripod", "Extreme cold gear", "Spare batteries"],
    steps: [
      { nameJa: "出現確認", textJa: "1月下旬〜2月中旬、最低気温-10℃以下が3〜5日続いた後の早朝、八剱神社や諏訪市公式SNSで御神渡り出現状況を確認。", nameEn: "Check appearance", textEn: "From late January to mid-February, after 3–5 consecutive days below −10 °C, check Yatsurugi Shrine or Suwa City SNS for the latest Omiwatari status." },
      { nameJa: "撮影地選定", textJa: "諏訪市湖岸通りの間欠泉センター周辺（接近撮影）か、立石公園展望台（俯瞰）を選ぶ。", nameEn: "Choose vantage", textEn: "Pick the Geyser Center area on the lakeshore (close shots) or Tateishi Park observatory (elevated overview)." },
      { nameJa: "防寒準備", textJa: "氷点下20℃以下になることもあるため、本格的冬山装備、カメラ予備バッテリー2〜3個を保温ポケットに入れて持参。", nameEn: "Prepare for cold", textEn: "Temperatures can drop below −20 °C — wear serious winter mountaineering gear and keep 2–3 spare batteries warm in inner pockets." },
      { nameJa: "日の出前到着", textJa: "日の出30分前到着、三脚を陸上に設置（氷上は厳禁）。広角〜標準（16-70mm）で氷の隆起ラインを構図。", nameEn: "Arrive predawn", textEn: "Be on site 30 min before sunrise. Tripod on shore only — never on ice. Compose with 16–70 mm to capture the ridge lines." },
      { nameJa: "サイドライト撮影", textJa: "朝日の横方向の光線（サイドライト）が氷の質感を最大化。ISO200・F8・SSは適正で霜と氷を露光。", nameEn: "Capture in side light", textEn: "Morning side light maximizes ice texture. ISO 200, f/8, with shutter speed metered for proper exposure of frost and ice." },
    ],
  },
};

export const getHowTo = (slug) => HOWTO[slug];
