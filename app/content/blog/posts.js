/**
 * ブログ記事 20本のメタデータ.
 * - slug, date, locs (関連LOC_I18Nキー)
 * - title: 20言語 (ja/en は完備、他は en フォールバック前提で順次追加)
 * - excerpt: 20言語 (簡潔)
 * - bodyJa / bodyEn: 本文 (HTML/プレーン文字列、改行で段落)
 * - 他言語 body は en フォールバック
 */

export const POSTS = [
  {
    slug: "mt-fuji-arakurayama",
    date: "2026-04-12",
    locs: ["新倉山浅間公園", "河口湖"],
    hero: "wcrs6gq9eutte8fwrzpp",
    title: { ja: "新倉山浅間公園で撮る、富士山と五重塔と桜の三段構図", en: "Mt. Fuji + Pagoda + Cherry Blossoms: Shooting the Iconic Three-Tier Composition at Arakurayama Sengen Park" },
    excerpt: { ja: "「日本」と聞いて誰もが思い浮かべる、あの一枚を撮るための完全ガイド。アクセスから時間帯、構図、機材まで。", en: "The complete guide to shooting Japan's most iconic cherry-blossom-and-Fuji frame: access, timing, composition, and gear." },
    bodyJa: `山梨県富士吉田市の新倉山浅間公園は、世界中のカメラマンが憧れる「日本」を象徴する一枚——富士山と五重塔（忠霊塔）と桜が一フレームに収まる三段構図——を撮れる場所です。富士急行線「下吉田駅」から徒歩約10分、新倉富士浅間神社の境内を抜け、398段の咲くや姫階段を登った先に展望デッキがあります（高齢の方にはスロープの迂回ルートあり）。

ベストシーズンは4月中旬の桜満開期。例年4月10日前後から咲き始め、4月15日前後にピークを迎えますが、年によって1週間ほど前後します。富士山の冠雪は3〜5月が美しく、桜と雪富士の組み合わせはこの時期だけの限定景観です。

時間帯は夜明け前到着が必須。日の出の30分前から空が紫からピンク、そしてゴールドに変化する「マジックアワー」、日の出直後の朝焼けに染まる富士山「赤富士」が最高の瞬間です。展望デッキは混雑するため、5時台に到着して三脚位置を確保しましょう。日中は順光、夕方は富士山が逆光のシルエットになります。

レンズは標準〜中望遠（35〜85mm相当）が王道。三段構図を圧縮するには70mm前後が最適です。広角は塔と富士の間が空きすぎて締まりません。F8〜F11で全域シャープに、ISOは100基本。三脚必須（手持ちは避ける）。

注意点として、桜の盛期は世界中の観光客で展望デッキが満員になります。前後左右のスペースは狭く、譲り合いの精神が必要。ドローンは禁止、フラッシュも避けましょう。撮影後は河口湖まで車で30分、湖面に映る逆さ富士をハシゴすれば1日で2大絶景が完成します。`,
    bodyEn: `Arakurayama Sengen Park in Fujiyoshida, Yamanashi, is the spot every photographer dreams of — the place where Mt. Fuji, the Chureito Pagoda, and cherry blossoms align in a single iconic «three-tier» frame. From Shimo-Yoshida Station on the Fujikyu Line, walk 10 minutes to Arakura Fuji Sengen Shrine, then climb 398 «Sakuyahime» steps to the viewing deck (a gentler slope path is available for visitors with limited mobility).

Peak season is mid-April, when the cherry trees reach full bloom. Blossoms typically begin around April 10 and peak around the 15th, though timing shifts a week or so each year. Mt. Fuji is most beautifully snow-capped from March through May, making the combination of cherry blossoms with a snowy Fuji a window unique to this period.

Arrive before dawn. The 30 minutes before sunrise — the «magic hour» — bring purple-to-pink-to-gold sky transitions, while sunrise itself paints Fuji red in the famous «aka-fuji» phenomenon. The deck fills quickly, so secure your tripod position by 5 a.m. Daytime gives front-lit Fuji; evening turns it into a backlit silhouette.

For lenses, normal-to-short-telephoto (35–85 mm equivalent) works best. To compress the three-tier composition, around 70 mm is ideal. Wide angles leave too much space between pagoda and mountain. Shoot at f/8–f/11 for edge-to-edge sharpness, ISO 100 base. A tripod is essential — handheld is unreliable.

A few cautions: at peak bloom the viewing deck is packed with international visitors. Lateral space is tight, so cooperate with neighbors. Drones are prohibited, and avoid flash. After your morning shoot, drive 30 minutes to Lake Kawaguchi for the «inverted Fuji» mirror reflection — two icons captured in one day.`,
  },
  {
    slug: "takato-castle-cherry",
    date: "2026-04-13",
    locs: ["高遠城址公園"],
    hero: "jfvqos5wbosqddnnrgxo",
    title: { ja: "「天下第一の桜」高遠城址公園 — 1500本のタカトオコヒガンザクラ撮影ガイド", en: "«No.1 Cherry Under Heaven»: Photographing 1,500 Takato Kohigan Cherry Trees at Takato Castle Park" },
    excerpt: { ja: "薄紅色の固有種で日本三大桜に数えられる高遠の桜。混雑回避、ライトアップ、北アルプス背景の構図まで。", en: "A pale-pink endemic species and one of Japan's three great sakura sites. Crowd avoidance, illumination, and composition with the Central Alps." },
    bodyJa: `長野県伊那市・武田氏の旧城跡である高遠城址公園には、約1500本のタカトオコヒガンザクラが咲きます。ソメイヨシノよりも小ぶりで濃いめの薄紅色、固有種ならではの透き通る花色が特徴で、「天下第一の桜」と称され弘前公園・吉野山と並ぶ日本三大桜の名所です。

見頃は4月上旬〜中旬。標高800m弱の盆地気候のため、平地より1週間ほど遅く咲きます。開花情報は伊那市公式サイトで毎日更新されるので必ず確認を。満開期は週末の早朝7時前にすでに駐車場満車となるため、車なら6時着が目標、JRなら伊那市駅からタクシー15分が確実です。

ベスト構図は3つ。①南ゲート入口の太鼓櫓と桜のトンネル（縦構図、35mm）、②本丸の高遠閣を背景にした桜雲（標準〜中望遠）、③白山観音からの俯瞰で中央アルプスと桜の三段構図（70-200mm望遠圧縮）。雪を残す中央アルプス越しの桜雲はこの場所最大の特権です。

夜のライトアップ「天下第一の桜まつり」は18時〜22時。提灯の暖色光と桜のピンクの対比は幻想的で、橋の上から見下ろす夜桜の海は息を呑みます。長秒露光（ISO400・F4・1/4秒前後）で人通りをブラします。三脚は園内多くの場所で許可されていますが混雑時は譲り合いを。

混雑回避は早朝5時台か、ライトアップ閉園間際の21時以降が穴場。週末より平日。撮影後は隣接する高遠そば屋で名物の「行者そば」を。`,
    bodyEn: `Takato Castle Park in Ina City, Nagano, sits on the ruins of a castle once held by the Takeda clan. About 1,500 «Takato Kohigan» cherry trees bloom here — a smaller, deeper-pink endemic species whose translucent color earned it the title «No.1 cherry under heaven,» placing Takato alongside Hirosaki Park and Yoshinoyama as one of Japan's three great sakura sites.

Peak bloom runs early-to-mid April. Because the basin sits near 800 m elevation, it blooms roughly a week later than the lowlands. Check the daily bloom status on Ina City's official site. On weekends during peak, parking fills before 7 a.m., so target a 6 a.m. arrival by car. By rail, a 15-minute taxi from Ina-shi Station is reliable.

Three top compositions: (1) the cherry tunnel at the South Gate framed by Taiko Yagura tower (vertical, 35 mm); (2) the «Takato-kaku» pavilion backed by clouds of blossoms in the inner bailey (normal to short telephoto); (3) the elevated panorama from Hakusan Kannon — the three-tier frame of cherry clouds before the snow-capped Central Alps (70–200 mm telephoto). The Alps over a sea of pink is this park's signature.

The evening illumination «Tenka Daiichi no Sakura Matsuri» runs 18:00–22:00. The contrast of warm lantern light against pink blossoms is dreamlike, and the view down across the dark sea of sakura from the bridge is breathtaking. Use long exposures (ISO 400, f/4, ~1/4 s) to blur passersby. Tripods are permitted in most areas — be considerate when crowded.

To avoid crowds, aim for 5 a.m. or after 21:00 near closing. Weekdays are quieter than weekends. Reward yourself afterward with «Gyoja soba,» a local specialty, at a nearby shop.`,
  },
  {
    slug: "lake-kawaguchi-fuji",
    date: "2026-04-12",
    locs: ["河口湖"],
    hero: "bsesdqubicdiilhcynyh",
    title: { ja: "河口湖の「逆さ富士」を撮る — 風と光と季節の方程式", en: "Shooting the «Inverted Fuji» Reflection at Lake Kawaguchi: The Equation of Wind, Light, and Season" },
    excerpt: { ja: "湖面に映る富士山。鏡のような水面を捉える条件と、春の桜・冬の冠雪の組合せベスト。", en: "Mt. Fuji mirrored in the lake. The conditions for glassy water, plus the best season pairings — spring blossoms and winter snow." },
    bodyJa: `富士五湖のひとつ河口湖は、湖面に逆さ富士を映す撮影地として最も有名です。鏡のような水面に富士山が映り込む条件は、①無風（風速1m/秒以下）、②朝の冷え込みによる空気の透明感、③湖面に波立つボートが出る前の早朝、の三つが揃ったときに限られます。

撮影スポットは大きく4つ。①北岸の大石公園（春は芝桜、夏はラベンダー、秋はコキアと一緒に）、②産屋ヶ崎（湖を最も狭く渡るアングル、桜の名所）、③長崎公園（無人で静か）、④八木崎公園（ラベンダーと富士）。すべて湖の北岸〜西岸に集中し、富士山が南東方向にあるため朝の順光〜逆光まで条件が揃います。

ベスト時間は日の出30分前〜1時間後。冬（12〜2月）は空気が最も澄み、富士山の冠雪量も多くシャープに写ります。逆さ富士は冬のほうが圧倒的に成功率が高く、夏は霞や入道雲、湖面の波で難易度が上がります。

機材は標準ズーム（24-70mm）が万能。NDフィルターで湖面の波を滑らかに、PLフィルターで湖面の反射をコントロール（PLは弱めに、強くしすぎると逆さ富士が消える）。三脚必須、レリーズかセルフタイマー10秒で振動を排除。露出はマニュアルでF8・ISO100・SS自動、HDRブラケット3枚撮影が安心です。

冬の早朝は氷点下まで下がります。手袋（指先タッチ操作可能なもの）とバッテリー予備を必携。撮影後は河口湖駅周辺のカフェで暖を。富士急行線で30分の新倉山浅間公園と組み合わせるのが王道ルートです。`,
    bodyEn: `Lake Kawaguchi, one of the Fuji Five Lakes, is the most famous spot for the «inverted Fuji» reflection. Three conditions must align for a true mirror: (1) windless (under 1 m/s), (2) clear air from cold morning temperatures, and (3) early arrival before sightseeing boats stir the surface.

Four top shooting spots, all on the north and west shores: (1) Oishi Park (paired with shibazakura in spring, lavender in summer, kochia in autumn); (2) Ubuyagasaki (the narrowest crossing of the lake, also a cherry-blossom site); (3) Nagasaki Park (quiet, uncrowded); (4) Yagisaki Park (lavender with Fuji). Mt. Fuji sits to the southeast, so morning light gives front-lit through soft-light angles.

Best timing is 30 min before sunrise to one hour after. Winter (December–February) brings the clearest air and the most snow on Fuji's slopes — making winter dramatically more successful for inverted-Fuji shots. Summer faces haze, thunderclouds, and choppy water.

For gear, a standard zoom (24–70 mm) is versatile. Use ND filters to smooth water and a CPL to manage reflections — but use the CPL gently; overdoing it eliminates the very reflection you came for. Tripod essential. Use a remote or 10-second timer to eliminate vibration. Manual mode at f/8, ISO 100, with auto-shutter and 3-frame HDR bracketing is safe.

Winter mornings drop below freezing. Bring touchscreen-compatible gloves and spare batteries. Warm up at a café near Kawaguchiko Station afterwards, then head 30 minutes by Fujikyu Line to Arakurayama Sengen Park — the classic two-spot day.`,
  },
  {
    slug: "lake-suwa-omiwatari",
    date: "2026-04-13",
    locs: ["諏訪湖", "立石公園"],
    hero: "h4oyzzdqaydnwqtu6ni0",
    title: { ja: "諏訪湖の御神渡り — 神が渡る氷の道を撮る冬の朝", en: "Lake Suwa's Omiwatari: Photographing the Path of the Gods on Winter Mornings" },
    excerpt: { ja: "湖面の氷がせり上がる神秘的な現象。御神渡りが現れる条件と、立石公園からの絶景撮影点。", en: "A mystical phenomenon where lake ice rises into ridges. Conditions for Omiwatari and the best vantage from Tateishi Park above." },
    bodyJa: `諏訪湖の「御神渡り（おみわたり）」は、湖面の全面結氷後、氷が膨張収縮を繰り返してせり上がり、湖面を縦断する氷の山脈を形成する自然現象です。古来より「諏訪大社上社の男神が下社の女神を訪ねた跡」とされ、出現すると諏訪市八剱神社の宮司が「拝観式」を執り行います。

出現条件は厳しく、近年は地球温暖化で全面結氷自体が稀。出現するのはおおむね5年に1回、1月下旬〜2月中旬の早朝、最低気温-10℃以下が連続3〜5日続いた後です。最新情報は八剱神社や諏訪市公式SNSで毎朝発表されます。

撮影は2つのアングル。①湖畔（諏訪市湖岸通り、間欠泉センター周辺）から氷の隆起を間近に。霜と朝靄が漂う中、太陽が差し込み氷が黄金色に輝く瞬間が最高潮。②立石公園（標高934m）から俯瞰で湖全体と御神渡りの線をフレームに。八ヶ岳〜富士山を背景にした構図はここだけ。

時間は日の出30分前到着が必須。マイナス10℃以下になることが多く、装備は本気の冬山登山レベルが必要です。カメラのバッテリーは保温ポケットへ、予備は必須。レンズの結露対策にレンズフード+ジップロックも忘れずに。

機材は広角〜標準（16-70mm）。氷の質感を活かすため横方向の光線（朝日のサイドライト）が決め手。三脚必須ですが氷上には立てないこと（湖畔のみ）。御神渡りが出ない年は「明けの海（あけのうみ）」と呼ばれる氷の湖面そのものが幻想的で、これも諏訪冬の絶景です。`,
    bodyEn: `«Omiwatari» on Lake Suwa is a winter phenomenon: after the lake fully freezes, repeated expansion and contraction of the ice creates jagged ridges that traverse the surface like miniature mountain ranges. Folklore holds that this is the path of the male god of Upper Suwa Shrine visiting the female god of the Lower Shrine, and when it appears, the priest of Yatsurugi Shrine performs an official «viewing ceremony.»

Conditions are strict, and global warming makes even full freezing rare. Omiwatari now appears roughly once every five years, in the early mornings of late January to mid-February, after 3–5 consecutive days below −10 °C. Check the latest status via Yatsurugi Shrine or Suwa City social media each morning.

Two angles: (1) up close from the lakeshore (Suwa lakeside drive, near the Geyser Center), where frost and morning mist drift across rising ice ridges that turn gold under the rising sun — this is the peak moment. (2) elevated from Tateishi Park (934 m), where the entire lake and the Omiwatari ridgelines fit in frame, with the Yatsugatake range or even Mt. Fuji as backdrop — only available here.

Arrive 30 minutes before sunrise. Temperatures often drop below −10 °C, so dress for serious winter mountaineering. Keep camera batteries warm in inner pockets and bring spares. Use a lens hood plus a ziplock bag against condensation as you re-enter warm spaces.

Wide-to-normal lenses (16–70 mm) are ideal. Side light from the rising sun reveals ice texture best. A tripod is essential, but never on the ice itself — only from shore. In years without Omiwatari, the «Akenoumi» (frozen lake surface) is itself ethereal and remains one of Suwa's signature winter scenes.`,
  },
  {
    slug: "matsumoto-castle-seasons",
    date: "2026-04-12",
    locs: ["松本城"],
    hero: "u5izvsliyoqm6rr0xnzh",
    title: { ja: "国宝・松本城 四季の撮影 — 烏城と北アルプスを一枚に", en: "National Treasure Matsumoto Castle Through the Seasons: Framing the Crow Castle with the Northern Alps" },
    excerpt: { ja: "現存12天守の漆黒の名城。桜・新緑・紅葉・雪化粧、それぞれの構図と時間帯を解説。", en: "One of Japan's 12 surviving original keeps. Compositions and timing for sakura, fresh greens, autumn foliage, and snow." },
    bodyJa: `松本城は長野県松本市にある国宝で、現存12天守のひとつ。漆黒の壁から「烏城（からすじょう）」とも呼ばれる五重六階の天守は戦国時代の威容を今に伝えます。後ろに広がる北アルプスの白い稜線、内堀の水鏡、そして四季の変化が一年中異なる表情を見せます。

【春】4月中旬の桜。本丸と二の丸の桜約300本が満開になり、内堀の埋橋（うずみばし）越しに天守と桜と北アルプスを一枚に収める構図が王道。早朝6時前ならアルプスにモルゲンロート（朝焼け）がかかり、最も劇的な瞬間が撮れます。

【夏〜初夏】5月の新緑と6月の早朝の朝霧。湖面のような朝靄に天守が浮かぶ姿は墨絵のような幻想美。雨上がりの晴天を狙うとアルプスのコントラストが最大化します。

【秋】10月下旬〜11月上旬の紅葉。城内の桜と楓が朱・黄・橙に染まり、漆黒の天守を彩ります。秋は空気が澄み、北アルプスの稜線がくっきりと見える絶好のシーズン。夕方は西日が天守を金色に染めます。

【冬】1〜2月の雪化粧。雪が積もった天守と凍った内堀、白く輝く北アルプスは「水墨画」と称される松本城の冬景。雪降りの日は無風で穏やかになることが多く、雪と天守のコラボが撮りやすい。

撮影ポイントは①埋橋（縦構図、王道）、②黒門の桜トンネル、③城公園北側の松本郷土資料館前から内堀越しの俯瞰、④大手門井戸付近の高台。レンズは24-70mm標準ズーム1本でほぼ対応可能。北アルプスを引き寄せる場合は70-200mm望遠で圧縮効果を。`,
    bodyEn: `Matsumoto Castle in Nagano is a National Treasure and one of Japan's 12 surviving original keeps. Its jet-black walls earned the nickname «Crow Castle.» The five-tier, six-story keep evokes Sengoku-era power, framed by the white ridges of the Northern Alps behind, the mirror-still inner moat, and a year-round shift through the seasons.

【Spring】Mid-April cherry blossoms. About 300 cherry trees in the inner and second baileys reach full bloom. The classic shot is from across the inner moat at Uzumi Bridge, framing the keep, blossoms, and Alps in a single image. Arrive before 6 a.m. for the most dramatic moment — alpenglow on the snowy peaks behind.

【Early Summer】May greenery and June dawn mist. On misty mornings the keep appears to float on a sea of fog like an ink-wash painting. Target clear skies after rain to maximize contrast against the Alps.

【Autumn】Late October to early November foliage. The cherry and maple trees within the grounds turn crimson, yellow, and orange against the black keep. Autumn brings the clearest air and sharpest views of the Alps' ridgelines. Late afternoon paints the keep gold in the western light.

【Winter】January–February snow. Snow on the keep, frozen inner moat, and white-shining Alps create what locals call Matsumoto Castle's «sumi-e (ink painting) season.» Snow days often bring still, calm air — ideal for capturing snow and keep together.

Top vantages: (1) Uzumi Bridge for the classic vertical; (2) the cherry tunnel at Kuromon Gate; (3) the elevated view from the Matsumoto Local History Museum north of the park, looking across the moat; (4) the high ground near the Otemon well. A 24–70 mm standard zoom covers most needs. Use a 70–200 mm telephoto to compress the Alps closer to the keep.`,
  },
  {
    slug: "komatsunagi-cherry-stars",
    date: "2026-04-13",
    locs: ["駒つなぎの桜"],
    hero: "bykxlizpdzufezqttzca",
    title: { ja: "駒つなぎの桜と星空 — 阿智村に立つ樹齢400年の一本桜", en: "The Komatsunagi Cherry Tree Under the Stars: A 400-Year-Old Solitary Sakura in Achi Village" },
    excerpt: { ja: "源義経が馬を繋いだという伝説の一本桜。棚田の水鏡と銀河を一枚に収める撮影テクニック。", en: "A legendary cherry tree said to have tethered Yoshitsune's horse. Techniques for capturing the rice-paddy reflection with the Milky Way." },
    bodyJa: `長野県阿智村智里、山あいの棚田の畔にぽつんと立つ樹齢400年超のエドヒガンザクラ。それが「駒つなぎの桜」です。源義経が奥州へ下る途中で馬を繋いだという伝説からこの名がつき、孤高の佇まいは古武士のような風格を漂わせます。

撮影シーズンは4月中旬〜下旬。標高約700mの山あいで、平地より1〜2週間遅く咲きます。この時期は田植え前の棚田に水が張られ、桜と星空が水面に映る奇跡の構図が成立します。「水鏡の一本桜」と呼ばれるこのアングルは、世界的にも類を見ない一枚です。

撮影には3条件が必要：①新月期（月明かりがあると星が消える）、②無風（水面の鏡面状態キープ）、③晴天（雲一つない透明度）。年に数日しかない奇跡の組み合わせを狙うため、村のSNSや天気予報を毎日確認しましょう。

撮影テクニック：星空と桜を一枚に収める「比較明合成」が王道。カメラ1台では桜の暗部と星の明るさを両立できないため、①桜と棚田を露出ブレンド（前景）、②星空を露出ブレンド（背景）、③Photoshopで合成、という流れ。または1枚撮りでISO3200・F2.8・15秒・桜にリモコンライトで微弱補光、もアリ。

機材：広角レンズ（14-24mm or 16-35mm F2.8）、しっかりした三脚、ライトペインティング用のLED（弱光、暖色フィルター）、レリーズ。寒さ対策として上下ダウン+カイロ。トイレは現地になく、阿智村中心部から30分以上かかります。

注意：駐車場は数台分のみ。深夜から場所取りする撮影者多数。地元の方の生活圏なので、田んぼには絶対に踏み込まず、ライトは最小限に、静かに撮影を。`,
    bodyEn: `«Komatsunagi-no-Sakura,» a 400+ year-old Edohigan cherry tree, stands alone beside terraced rice paddies in the mountain hamlet of Chisato, Achi Village, Nagano. Legend has it that Minamoto no Yoshitsune tethered his horse here on his way to Oshu — hence the name «horse-tying cherry.» Its solitary stance carries the dignity of an old warrior.

Peak bloom is mid-to-late April. At about 700 m elevation in a mountain valley, it blooms 1–2 weeks later than the lowlands. This is also when the paddies are flooded for planting — creating the miraculous composition of cherry tree and stars mirrored in still water. This «mirror-pond solitary cherry» frame is one of the rarest in the world.

Three conditions must align: (1) new moon (any moonlight washes out the stars); (2) no wind (preserve the mirror); (3) cloudless skies. Such combinations occur only a few nights a year — check local SNS and weather daily.

Technique: «brightness blending» of two exposures is the classic approach. A single camera cannot expose both the dark cherry tree and bright stars correctly, so: (1) expose for tree and paddy reflection (foreground); (2) expose for stars (background); (3) blend in Photoshop. A single-frame alternative: ISO 3200, f/2.8, 15 s, with a soft warm-toned LED faintly illuminating the tree.

Gear: wide-angle lens (14–24 mm or 16–35 mm f/2.8), solid tripod, light-painting LED (low output, warm filter), and remote shutter. Bring serious cold-weather layers and warmers. There are no toilets nearby — the village center is 30+ minutes away.

Notes: parking holds only a few cars; many photographers stake spots from late evening. This is local farmland — never step into the paddies, keep lights to a minimum, and shoot quietly out of respect.`,
  },
  {
    slug: "achi-stargazing",
    date: "2026-04-13",
    locs: ["長野県天空の楽園"],
    hero: "bxt5gtw3rnuqxrx46ppl",
    title: { ja: "日本一の星空 阿智村 — 標高1400mの「天空の楽園」で星を撮る", en: "Japan's No.1 Starry Sky in Achi Village: Stargazing Photography at 1,400 m «Tenku no Rakuen»" },
    excerpt: { ja: "環境省が日本一と認定した星空。新月期と冬の透明度、ナイトツアー予約のコツ。", en: "Officially Japan's clearest night sky. New-moon timing, winter transparency, and night-tour booking tips." },
    bodyJa: `長野県阿智村は2006年、環境省の全国星空継続観察で「星が最も輝いて見える場所」第1位に認定されました。標高1400mの富士見台高原は、周囲の山に囲まれ街の光が届かない、日本有数の暗い空を持ちます。

撮影は「スタービレッジ阿智」が運営する『ナイトツアー（天空の楽園）』への参加が最も確実。富士見台高原ロープウェイで山頂駅へ上がり、消灯時間中は完全な暗闇の中で満点の星空を体験できます（4月〜11月開催、12〜3月は冬季ツアー）。料金は3500〜4500円程度、人気期は1ヶ月前完売も。

ベストシーズンは2つ。①夏（6〜8月）：天の川の中心部（いて座方向）が最も濃く輝く。22時頃に天頂を横切り、迫力満点。②冬（12〜2月）：空気の透明度が最高で、銀河は薄まるがオリオン座・冬の大三角・すばる（プレアデス）が鋭く写る。雪の上に立つ撮影では満天の星と雪のリフレクションが別世界。

新月期は必須条件。月齢カレンダーで確認し、新月±3日以内の晴天を狙います。月が出るとISO感度を上げても銀河が消えるため、新月期外の撮影は厳しい。

機材：広角レンズ（14-24mm F2.8 or 20mm単焦点）、しっかりした三脚、レリーズ。設定はマニュアル：ISO3200〜6400、F2.8、SS15〜25秒（500ルール）、ホワイトバランス3500〜4000K。RAW撮影必須、後処理で銀河を強調。

ヒント：①ヘッドライトは赤色LEDモード（暗順応を妨げない）、②熱対策にレンズヒーターでレンズの結露防止、③カメラ予備バッテリーは保温ポケットへ。ナイトツアー以外でも、阿智村中心部の道の駅周辺で十分撮影可能ですが、ロープウェイ山頂が圧倒的に暗いです。`,
    bodyEn: `In 2006 Japan's Ministry of the Environment designated Achi Village in Nagano as the country's No.1 location for «the brightest visible stars.» Fujimidai Highlands, at 1,400 m elevation and surrounded by mountains shielding it from urban light, holds one of Japan's darkest skies.

The most reliable approach is the «Star Village Achi» Night Tour (Tenku no Rakuen). The Fujimidai Highland Ropeway carries visitors to the summit station, where during designated lights-out hours the experience of a fully dark sky filled with stars is unforgettable (April–November regular tours; December–March winter tours). Tickets run roughly ¥3,500–¥4,500; peak nights sell out a month in advance.

Two top seasons: (1) Summer (June–August): the dense Milky Way core (Sagittarius direction) crosses the zenith around 22:00 — overwhelming. (2) Winter (December–February): air transparency peaks; while the galactic core fades, Orion, the Winter Triangle, and the Pleiades render sharply. Snow-covered ground in winter adds a reflective brightness that feels otherworldly.

New moon is mandatory. Use a moon-phase calendar and target clear nights within ±3 days of new moon. Moonlight at any phase washes out the Milky Way regardless of ISO.

Gear: wide lens (14–24 mm f/2.8 or 20 mm prime), solid tripod, remote shutter. Manual settings: ISO 3200–6400, f/2.8, 15–25 s exposure (500 rule), white balance 3500–4000 K. Always shoot RAW and recover Milky Way detail in post.

Tips: (1) red-LED headlamp mode preserves dark adaptation; (2) lens heaters prevent dew; (3) keep spare camera batteries in inner pockets. Outside the night tour, decent shooting is possible near the village center «michi-no-eki,» but the ropeway summit is dramatically darker.`,
  },
  {
    slug: "sapporo-snow-festival",
    date: "2026-02-08",
    locs: ["さっぽろ雪まつり"],
    hero: "usvnljzznwmqu93sftg1",
    title: { ja: "さっぽろ雪まつり完全撮影ガイド — 200万人が訪れる白銀の祭典", en: "The Complete Photographer's Guide to the Sapporo Snow Festival: Two Million Visitors and a Silver Spectacle" },
    excerpt: { ja: "巨大雪像、市民像、氷彫刻、夜のライトアップ。三脚・低ISO・防寒の実践テクニック。", en: "Massive sculptures, citizen-built works, ice carvings, and night illumination. Practical tripod, low-ISO, and cold-weather techniques." },
    bodyJa: `さっぽろ雪まつりは毎年2月初旬、札幌市中心部の大通公園・すすきの・つどーむの3会場で開催される日本最大級の雪と氷の祭典です。1950年に地元高校生6人が雪像を作ったのが始まりで、今や200万人以上が訪れる国際的イベントに成長しました。

会場はそれぞれ性格が違います。①大通公園会場：1〜12丁目に並ぶ大雪像と市民雪像のメインステージ。15mを超える巨大雪像はテレビ番組や歴史建築をテーマに毎年新作。②すすきの会場：氷彫刻のミニ会場、繁華街のネオンと氷のコントラストが◎。③つどーむ会場：滑り台や雪遊び、家族向け。

ベスト時間帯は3つ：①日没直後〜18時のマジックアワー（青の時間帯と暖色イルミの対比が美しい）、②夜のライトアップ20〜21時（人混みが減り三脚も使いやすい）、③朝7時の開場直後（人がいない静かな雪像）。三脚利用エリアは「指定区域のみ」なので必ず公式サイトで確認を。

設定：日中はISO100・F8・1/250秒で雪の質感を残す。露出補正+1〜+2EVで白を白く。ライトアップ撮影はISO400〜800・F4・SS1秒前後。手持ちなら手ブレ補正必須。

防寒は本気で。札幌の2月は氷点下5〜10℃が常で、風があると体感は更に低下。ダウン上下、防水手袋、雪上対応ブーツ、カイロ最低3個（手・足・腰）、フェイスマスクが推奨。カメラはバッテリー消耗が早いので予備2個、レンズヒーターは結露防止に有効。

撮影マナー：他の観光客の進路を塞がない、雪像に触れない、フラッシュは雪像が「白飛び」するため不要。ドローンは禁止です。`,
    bodyEn: `The Sapporo Snow Festival, held in early February at three venues across central Sapporo (Odori Park, Susukino, and Tsudome), is Japan's largest snow-and-ice festival. It began in 1950 when six local high-school students built sculptures, and has since grown into an international event drawing over 2 million visitors annually.

Each venue has its own character: (1) Odori Park (main): massive snow sculptures and citizen-built works line the 1st through 12th blocks; the 15+ m headline sculptures are themed on movies, anime, or historical architecture and remade each year. (2) Susukino: ice sculptures in the entertainment district — nightlife neon against ice is striking. (3) Tsudome: slides and snow play for families.

Three best windows: (1) 30 minutes after sunset to 18:00 (the magic-hour contrast between blue twilight and warm illumination is gorgeous); (2) night illumination 20:00–21:00 (crowds thin, tripods workable); (3) 7 a.m. opening (silent, empty sculptures). Tripods are allowed only in designated zones — always check the official site.

Settings: Daytime ISO 100, f/8, 1/250 s preserves snow texture. Exposure compensation +1 to +2 EV keeps whites white. Illumination: ISO 400–800, f/4, ~1 s. Handheld requires image stabilization.

Dress seriously: Sapporo February runs −5 to −10 °C; wind chill drops it further. Down jacket and pants, waterproof gloves, snow-rated boots, three+ heat packs (hands, feet, lower back), and a face cover. Cameras drain batteries fast — bring two spares. Lens heaters help with condensation.

Etiquette: don't block other visitors' paths; never touch sculptures; flash flattens snow detail (skip it); drones are prohibited.`,
  },
  {
    slug: "shiretoko-drift-ice",
    date: "2025-02-15",
    locs: ["知床"],
    hero: "sgqomcwsuq18xc1oyr3g",
    title: { ja: "知床の流氷を撮る — 1月〜3月、世界自然遺産の冬", en: "Shooting Drift Ice at Shiretoko: January–March in a UNESCO Natural Heritage Winter" },
    excerpt: { ja: "オホーツクから流れ着く氷原。ウトロ発のクルーズと陸上撮影、それぞれのベストポジション。", en: "Ice fields drifting from the Sea of Okhotsk. Best vantage from cruise boats out of Utoro, and from land." },
    bodyJa: `知床半島は世界自然遺産で、冬はオホーツク海から流れ着く流氷で覆われます。流氷シーズンは1月下旬〜3月上旬。極寒のシベリアから1000km以上を漂流して接岸する氷原は、北半球で最も低緯度（北緯44度）まで到達する流氷として世界的にも稀有な存在です。

撮影は2つのアプローチ。①ウトロ港発の流氷クルーズ船「おーろら」（所要1時間、流氷の中を航行、ワシ・アザラシ遭遇率高）。②陸からのウトロ高台、知床五湖、フレペの滝展望台。クルーズは流氷接岸状況によって運休・コース変更があるので、前日の運航状況確認必須。

ベスト時期は2月上旬〜中旬。流氷が最も多く接岸し、晴天日も比較的多い時期。早朝の朝焼けに染まる流氷、夕焼けに沈むオレンジの氷原、夜の星空+流氷の組み合わせはこの時期だけ。日中は青空と白い氷のコントラストがハイライト。

撮影テクニックは3点。①露出補正+1〜+1.5EV（雪と氷で測光が暗く出る）、②PLフィルターで氷の青みと水面反射をコントロール、③白い被写体に対しスポット測光で適正露出。望遠レンズ（70-200mm）でオオワシ・オジロワシも狙えます。

機材保護は徹底を。氷点下20℃以下も普通で、強風時は体感-30℃。バッテリー消耗が極端に早く、内ポケットで温め予備3個必携。レンズの結露を防ぐため、屋外から暖かい船内へ戻る時はジップロック密封してから。

知床は野生動物の宝庫。エゾシカ、キタキツネ、運が良ければオオワシ・オジロワシ・シャチも。流氷の上で羽を広げるオオワシは究極の被写体です。`,
    bodyEn: `The Shiretoko Peninsula is a UNESCO Natural Heritage site, and in winter it is enveloped by drift ice flowing in from the Sea of Okhotsk. Drift-ice season runs from late January through early March. Ice originating in extreme-cold Siberia drifts over 1,000 km to reach Shiretoko's coast — the lowest latitude (~44° N) of any drift ice in the Northern Hemisphere, a globally rare phenomenon.

Two approaches: (1) the «Aurora» drift-ice cruise from Utoro Port (about 1 hour, navigating through the ice with high chances of seeing eagles and seals); (2) land-based vantages from Utoro highlands, Shiretoko Goko (Five Lakes), and Furepe Falls observation deck. Cruise schedules and routes shift with ice conditions — check the day-before status.

Best timing is early-to-mid February when ice coverage peaks and clear days are more common. Sunrise turning the ice red, sunset bathing the floes orange, and night skies with starlit ice are unique to this window. Daytime offers stark blue-sky-and-white-ice contrast.

Three techniques: (1) exposure compensation +1 to +1.5 EV (snow and ice fool the meter into underexposure); (2) CPL filter to manage ice's blue cast and water reflections; (3) spot-meter on white subjects for accurate exposure. A 70–200 mm telephoto also catches Steller's sea eagles and white-tailed eagles.

Take gear protection seriously. Below −20 °C is routine, with wind chill reaching −30 °C. Batteries drain dramatically — keep three spares in inner pockets. To prevent lens condensation when returning from outside to a warm cabin, seal the camera in a ziplock bag first.

Shiretoko teems with wildlife: ezo deer, foxes, and with luck, Steller's eagles, white-tailed eagles, and even orcas. A Steller's eagle spreading its wings on drifting ice is the ultimate subject.`,
  },
  {
    slug: "furano-lavender",
    date: "2025-07-20",
    locs: ["富良野"],
    hero: "hvnlsmmmikzqkmooht8u",
    title: { ja: "富良野ラベンダー畑の絶景 — 7月中旬の紫の絨毯を狙う", en: "Furano's Lavender Fields: Targeting the Purple Carpet of Mid-July" },
    excerpt: { ja: "ファーム富田を中心とした花畑。早朝の光線、構図、混雑回避のための時間帯。", en: "Flower fields centered on Farm Tomita. Morning light, composition, and the timing that avoids crowds." },
    bodyJa: `北海道富良野市は日本一のラベンダー産地。1903年から始まったラベンダー栽培は、町の風景そのものになりました。代表的な「ファーム富田」を中心に、ハイランドふらの、彩香の里、フラワーランドかみふらのなど10以上の花畑が点在します。

ベストシーズンは7月中旬〜下旬。例年7月15日前後に満開となり、20日頃にピークを迎えます。8月初旬には収穫が始まるため、撮影できる窓は約2週間と短く、計画は1ヶ月前から。富良野市公式サイトの開花情報で日々確認を。

ファーム富田は無料開放。最も有名な「彩りの畑」は7色のしましま花畑で、彩りの撮影には標準〜中望遠（35-85mm）で圧縮効果を。「トラディショナルラベンダー畑」は紫一色の絨毯で、広角（16-35mm）で空・山・畑を一フレームに。背景に十勝岳連峰の冠雪を入れた構図は富良野ならでは。

時間帯は早朝6時前到着が必須。8時を過ぎると国内外の観光バスが押し寄せ、構図に人が入ります。9時〜15時は混雑ピーク。日没後の17時以降も人が引いて狙い目で、夕日に染まる紫のラベンダーは別格の美しさ。

機材：標準ズーム（24-70mm）一本+中望遠で十分。PLフィルターで葉の反射を抑え花の色を鮮やかに。マクロレンズがあればミツバチや滴も狙えます。三脚は混雑時迷惑になるので一脚 or 手持ち推奨。

注意：花畑には絶対に入らない（私有地、踏み荒らし禁止）。決められた通路から撮影。ドローンは禁止。撮影後はファーム富田名物のラベンダーソフトクリームを忘れずに。`,
    bodyEn: `Furano in central Hokkaido is Japan's premier lavender region. Cultivation began in 1903 and has shaped the town's identity. Centered on the famous Farm Tomita, the area includes Highland Furano, Saika no Sato, and Flowerland Kamifurano — ten-plus flower fields scattered across the basin.

Peak season is mid-to-late July. Full bloom typically arrives around July 15, peaking near the 20th. Harvest begins early August, leaving a roughly two-week window. Plan a month ahead and check Furano City's daily bloom updates.

Farm Tomita is free to enter. The famous «Irodori-no-Hatake» (rainbow-stripe field) is best with a normal-to-short-telephoto (35–85 mm) using compression. The «Traditional Lavender Field» is a pure purple carpet — wide angle (16–35 mm) frames sky, mountains, and field together. Including the snow-capped Tokachi Range in the background is the signature Furano composition.

Arrive before 6 a.m. From 8:00 onward, domestic and international tour buses fill the paths. 9:00–15:00 is peak congestion. After 17:00 the crowds thin again — sunset-lit lavender is breathtakingly different. Cooler air also produces better photos.

Gear: a standard zoom (24–70 mm) plus a short telephoto suffices. A CPL filter dampens leaf glare and saturates flower color. A macro lens captures bees and dewdrops. Tripods can obstruct other visitors during crowded hours — handheld or monopod is preferred.

Critical etiquette: never step into the flower beds (private land, plants are damaged easily). Stay on designated paths. Drones are prohibited. After shooting, don't miss Farm Tomita's signature lavender soft-serve ice cream.`,
  },
  {
    slug: "shirakawa-go-snow",
    date: "2024-02-10",
    locs: ["白川郷"],
    hero: "qvsgt1aw6o4iwewvhmdc",
    title: { ja: "白川郷の雪景色 — 世界遺産・合掌造りに降り積もる冬", en: "Shirakawa-go in Snow: Winter on a UNESCO Gassho-zukuri Village" },
    excerpt: { ja: "茅葺き屋根に積もる雪、ライトアップの幻想、展望台からの俯瞰。冬撮影の入門。", en: "Snow piled on thatched roofs, the magic of evening illumination, and the elevated view from the observation deck." },
    bodyJa: `岐阜県大野郡白川村の合掌造り集落は、1995年に世界文化遺産に登録された日本を代表する山村風景です。急勾配の茅葺き屋根は豪雪地帯特有の構造で、冬は屋根に1m以上の雪が積もり、おとぎ話のような世界が広がります。

撮影シーズンは1月中旬〜2月下旬。例年1月から雪が積もり始め、2月中旬に最も深く積雪します。「白川郷ライトアップ」は1月中旬〜2月の特定日（要事前予約、近年は完全予約制）の17:30〜19:30開催。ライトアップ時の集落は雪に光が反射し幻想的な金色の世界に。

撮影スポットは2つに集約。①集落内の道：合掌造り民家を間近に。明善寺、和田家など重要文化財建築が点在。②荻町城跡展望台（村営シャトルバスで5分）：集落全体を俯瞰する王道アングル。展望台撮影はライトアップ時間内のみ大人気で混雑、開始30分前到着を。

機材：標準ズーム（24-70mm）+望遠（70-200mm）。展望台では70mm前後で集落をフレームいっぱいに。手持ち撮影の場合手振れ補正必須。三脚はライトアップ時の指定エリアのみ可。

冬装備は本気で。岐阜の山間部は氷点下5〜15℃、深い雪で足元が悪い。防水ブーツ、スノーゲイター、雪上対応の靴底ピン、手袋（タッチ操作可能なもの）必携。バッテリー予備2個、レンズの結露を防ぐためジップロック持参。

注意：①住民の生活集落なので、夜間の私有地敷地内立入禁止、フラッシュは民家に向けない、②夏期と違ってドライブで来る場合は冬タイヤ必須、③ライトアップは予約のみ。日帰り撮影なら高山駅・金沢駅から日帰りバスツアーが便利です。`,
    bodyEn: `The gassho-zukuri village of Shirakawa-go in Ono District, Gifu, was inscribed as UNESCO World Cultural Heritage in 1995 — a quintessential Japanese mountain village. Its steeply-pitched thatched roofs are designed for heavy snow country, and in winter they accumulate over 1 m of snow, creating a fairy-tale landscape.

Peak season is mid-January to late February. Snow typically begins accumulating in January and depth peaks in mid-February. The «Shirakawa-go Light-up» runs on selected days from mid-January through February (now fully reservation-only) from 17:30 to 19:30. During illumination, snow reflects the light into a golden, dreamlike world.

Two main vantages: (1) within the village, where you photograph gassho farmhouses up close, including Important Cultural Property buildings like Myozenji and the Wada Residence. (2) Ogimachi Castle Ruin Observation Deck (5 minutes by village shuttle bus) — the classic elevated view of the entire village. The deck during light-up is extremely popular; arrive 30 minutes before start.

Gear: standard zoom (24–70 mm) and a telephoto (70–200 mm). At the deck, ~70 mm fills the frame with the village. Image stabilization is essential for handheld. Tripods are restricted to designated areas during light-up.

Take winter prep seriously. Gifu's mountain region runs −5 to −15 °C; deep snow makes walking difficult. Waterproof boots, snow gaiters, ice-grip soles, touchscreen-compatible gloves are essential. Two spare batteries, plus ziplocks to prevent lens condensation when re-entering warm spaces.

Notes: (1) the village is inhabited — don't enter private property at night, never aim flash at residences; (2) winter tires are mandatory if driving (unlike summer); (3) light-up is reservation-only. For day trips, bus tours from Takayama or Kanazawa stations are convenient.`,
  },
  {
    slug: "kyoto-autumn-temples",
    date: "2025-11-20",
    locs: ["東福寺", "清水寺", "金閣寺"],
    hero: "",
    title: { ja: "京都の紅葉と寺社 — 11月、千年の都を歩く", en: "Kyoto's Autumn Foliage and Temples: November in the Thousand-Year Capital" },
    excerpt: { ja: "東福寺の通天橋、清水寺、金閣寺。混雑を避けて朝イチで巡るルートと時間配分。", en: "Tofuku-ji's Tsutenkyo, Kiyomizu-dera, and Kinkaku-ji. An early-morning route plan that beats the crowds." },
    bodyJa: `京都の紅葉は11月中旬〜下旬がピーク。1600以上の寺社のうち、特にカメラマンが目指すのが東福寺、清水寺、金閣寺の三大スポットです。1日で全部回るには朝6時開始の超早朝ルートが鉄則。

【06:30 東福寺】最初に向かうべきは東福寺。通天橋から眺める2,000本のモミジの紅葉は息を呑む景観です。8:30の開門前から行列ができるため、開門と同時に通天橋へ。狭い橋上で立ち止まらないルールがあるので、構図は事前に決めておく。順光は午前中、午後は逆光のシルエット撮影が狙い目。退去9:30まで。

【10:30 清水寺】徒歩・タクシーで30分。清水の舞台と紅葉、子安の塔と紅葉を狙う。本堂の舞台からは京都市街と紅葉が見渡せます。所要1.5時間、混雑のため三脚不可、手持ちで素早く。退去12:00。

【14:00 金閣寺】昼食後、北西へ移動（バス1時間）。鏡湖池に映る金閣と紅葉のリフレクションが王道。逆光になる午後がドラマチック。所要45分、退去14:45。

【夕方 補足スポット】時間があれば永観堂（モミジの数No.1）、嵐山（渡月橋＋紅葉）、瑠璃光院（床紅葉）も。瑠璃光院は秋限定公開（10月〜12月初旬）で要予約。

混雑回避のコツ：①平日狙い、②朝7時前後に最重要スポット、③紅葉ピーク前後を1週間ずらす（前は青紅葉ミックス、後は散り紅葉が美しい）、④傘の日は人が減り、雨に濡れた紅葉が深く色づく。

機材：標準ズーム（24-70mm）+望遠（70-200mm）。PLフィルターで葉の反射を抑え赤を鮮明に。三脚禁止スポット多いので一脚 or 手持ち中心。`,
    bodyEn: `Kyoto's autumn foliage peaks from mid-to-late November. Among the city's 1,600+ temples and shrines, three rise as photographer's icons: Tofuku-ji, Kiyomizu-dera, and Kinkaku-ji. Hitting all three in a day requires an extreme-early-morning route.

【06:30 Tofuku-ji】Start here. The 2,000 maples viewed from Tsutenkyo bridge form a breathtaking carpet. Lines form before the 8:30 opening — be at the gate when it opens and head straight to Tsutenkyo. The bridge has a no-stopping rule, so pre-plan your composition. Front light arrives in the morning; afternoon offers backlit silhouette opportunities. Exit by 9:30.

【10:30 Kiyomizu-dera】30 minutes by foot or taxi. Target the wooden stage with foliage, plus the Koyasu Pagoda framed by leaves. The stage offers panoramic Kyoto cityscape with autumn color. Allow 90 minutes. Tripods aren't allowed — shoot handheld, work fast. Exit by 12:00.

【14:00 Kinkaku-ji】After lunch, head northwest (1 hour by bus). The classic shot is the Golden Pavilion mirrored in Kyoko-chi pond among reds. Afternoon backlight is most dramatic. Allow 45 minutes; exit by 14:45.

【Evening extras】If time permits: Eikan-do (most maples in Kyoto), Arashiyama (Togetsukyo Bridge + foliage), Ruriko-in (the famous lacquered floor reflection — fall-only, requires advance booking, October to early December).

Crowd avoidance: (1) target weekdays; (2) hit top spots before 7 a.m.; (3) shift dates 1 week off-peak (earlier = green-and-red mix, later = beautifully fallen leaves); (4) rainy days bring fewer visitors and deeper colors on wet leaves.

Gear: standard zoom (24–70 mm) plus telephoto (70–200 mm). A CPL filter cuts leaf glare and saturates reds. Many spots ban tripods — monopod or handheld is the rule.`,
  },
  {
    slug: "kiyomizu-illumination",
    date: "2025-11-25",
    locs: ["清水寺"],
    hero: "",
    title: { ja: "清水寺 紅葉ライトアップ — 京都の夜、舞台に灯る秋", en: "Kiyomizu-dera Autumn Illumination: Kyoto Nights, the Lit Stage of Fall" },
    excerpt: { ja: "13mの懸造り舞台と紅葉を青空の時間帯に撮る。三脚不可の制約下での実践設定。", en: "Shooting the 13 m wooden stage with autumn leaves at blue hour. Practical settings under the no-tripod restriction." },
    bodyJa: `世界遺産・清水寺の「秋の夜の特別拝観」は11月中旬〜12月初旬の限定開催。日没後17:30〜21:00（受付20:30まで）、釘を使わず組み上げた高さ13mの「清水の舞台」と境内の紅葉が青白いライトと暖色で照らされ、別世界の景観が広がります。

最大の特権は「青の時間帯（ブルーアワー）」。日没10〜30分後、空がまだ深い青色を残している間が最も美しい瞬間です。空が真っ黒になる夜より、青空の中に浮かび上がる朱色の三重塔と赤い紅葉のコントラストが圧倒的に映えます。

時間配分：①17:00受付前到着し列に並ぶ、②17:30開場と同時に「奥の院」（舞台を正面から見られる撮影ポイント）へ直行、③ブルーアワー（17:50〜18:30）に最高の構図を決める、④18:30以降は他のアングルや三重塔、子安の塔も巡る、⑤20:30受付終了前に音羽の滝へ。

【三脚不可】境内全域で三脚使用禁止。手持ちで撮るには高ISO耐性のあるカメラが必要。設定例：ISO3200〜6400、F2.8〜4、SS1/30〜1/60秒、手ブレ補正ON、連写3枚で歩留まり向上。レンズは明るい標準ズーム（24-70mm F2.8）か単焦点（35mm F1.8 or 50mm F1.8）が最強。

【撮影マナー】①フラッシュ禁止、②三脚不可（一脚も実質不可）、③進路を塞いで構図を固定しない（流動的な撮影を）、④境内は神聖な場、私語は最小限。京都市バスの「五条坂」または「清水道」から徒歩10分、夜は人が多くタクシー混雑のため公共交通機関推奨。`,
    bodyEn: `UNESCO World Heritage Kiyomizu-dera holds its «Autumn Night Special Viewing» for a limited window from mid-November to early December. From 17:30 to 21:00 (last entry 20:30), the 13 m nail-free wooden «stage» and the temple's autumn foliage are illuminated under cool blue and warm light, creating an otherworldly scene.

The crown jewel is blue hour. From 10 to 30 minutes after sunset, while deep blue lingers in the sky, the contrast between the vermilion three-story pagoda, red maples, and the blue twilight is unforgettable — far more striking than later when the sky is fully black.

Itinerary: (1) arrive before 17:00 to queue; (2) at 17:30 opening, head straight to «Okuno-in» — the prime vantage facing the stage; (3) lock down your top composition during blue hour (17:50–18:30); (4) after 18:30 explore other angles, the three-story pagoda, and Koyasu Pagoda; (5) finish at Otowa Falls before the 20:30 last entry.

【No tripods】Tripods are banned throughout the temple. Handheld shooting requires a camera with strong high-ISO performance. Practical settings: ISO 3200–6400, f/2.8–4, 1/30–1/60 s, image stabilization on, three-frame burst for keeper rate. A fast standard zoom (24–70 mm f/2.8) or fast prime (35 mm f/1.8 or 50 mm f/1.8) is the strongest tool.

【Etiquette】(1) no flash, (2) no tripods (monopods are also impractical), (3) don't block paths to lock compositions — keep moving, (4) the grounds are sacred, so keep talk minimal. Take Kyoto City Bus to «Gojozaka» or «Kiyomizu-michi» (10-minute walk). At night, taxi traffic is heavy — public transit is recommended.`,
  },
  {
    slug: "byodoin-phoenix-hall",
    date: "2024-12-05",
    locs: ["平等院鳳凰堂"],
    hero: "",
    title: { ja: "平等院鳳凰堂 — 10円玉に刻まれた1000年の対称美", en: "Byodo-in Phoenix Hall: A Thousand Years of Symmetry Engraved on the 10-Yen Coin" },
    excerpt: { ja: "阿字池に映る鳳凰堂。風のない朝の鏡面と、紅葉・雪との季節構図。", en: "The hall reflected in Aji Pond. Mirror-still mornings, plus seasonal pairings with autumn leaves and snow." },
    bodyJa: `京都府宇治市の平等院鳳凰堂は、平安時代1053年（藤原頼通による）の建立で、世界文化遺産にして10円硬貨と1万円札（旧新両面）の図柄。左右対称の美しい姿が阿字池の水面に映る景観は、平安貴族が思い描いた「極楽浄土」そのものです。

撮影は4つの季節で表情が違います。①春（4月上旬）：藤の花と桜が境内に。境内入口の藤棚は推定樹齢280年。②秋（11月下旬）：境内の紅葉が朱色に染まり、鳳凰堂の朱と紅葉が共鳴。③冬（12〜2月）：雪化粧の鳳凰堂、雪と金箔のコントラストは別格。④初夏（5月中下旬）：青葉と蓮の花。

ベスト時間は8:30の開門直後。朝のうちは風が穏やかで、阿字池の水面が鏡のような状態を保ちます。風が出る前の30分間が勝負時間。観光客が増える10時以降は人物が映り込みます。

【撮影スポット】①池の南東岸（最も有名な「鳳凰堂正面」アングル、王道）、②南西岸（堂を斜めから捉える）、③橋上（高さがあり俯瞰可能）。14時頃から夕方は逆光になり、シルエットの鳳凰堂と夕焼け空のドラマチックな構図が狙えます。

【機材】広角〜標準ズーム（24-70mm）が万能。完全な対称構図を作るため水平器使用、または三脚で慎重に構図を整える。三脚は許可エリアのみ可（境内入口で確認）。PLフィルターで水面反射をコントロール、ただし強くしすぎると逆さの像が消える。

ヒント：①新緑の朝は霧が出やすく幻想的、②有料拝観で内部の阿弥陀如来像も拝観可（撮影禁止）、③隣接する平等院ミュージアム鳳翔館は鳳凰像など国宝多数。宇治茶も忘れずに。`,
    bodyEn: `Byodo-in Phoenix Hall in Uji, Kyoto, was built in 1053 by Fujiwara no Yorimichi during the Heian period. It is a UNESCO World Heritage site and the design featured on Japan's 10-yen coin and 10,000-yen note (old/new). Its perfectly symmetric form mirrored on Aji Pond visualizes the Heian aristocracy's vision of the «Pure Land» paradise.

Four seasons offer distinct moods: (1) spring (early April): wisteria and cherry blossoms — the wisteria trellis at the entrance is estimated to be 280 years old; (2) autumn (late November): grounds turn crimson, harmonizing with the hall's vermilion; (3) winter (December–February): snow on the hall, with snow and gold-leaf creating a singular contrast; (4) early summer (mid-late May): fresh greens and lotus flowers.

Best time is right after the 8:30 opening. Mornings are calm and Aji Pond holds a mirror-still surface — the 30 minutes before wind picks up are your window. After 10 a.m. crowds reflect into your frame.

【Vantages】(1) southeast pond bank (the iconic full-front view); (2) southwest bank (oblique angle); (3) the bridge (slightly elevated overhead). After 14:00, the hall becomes backlit, allowing dramatic silhouette compositions against sunset skies.

【Gear】Wide to standard zoom (24–70 mm) is versatile. Use a level for true symmetry, or compose carefully on a tripod. Tripods are allowed only in designated areas — check at the entrance. CPL filter manages water reflection; too strong and the inverted reflection disappears.

Tips: (1) misty mornings in spring are ethereal; (2) paid admission lets you view the Amida Nyorai statue inside (no photography); (3) the adjacent Hosho-kan museum holds national treasures including the original phoenix statues. Don't leave without trying Uji matcha.`,
  },
  {
    slug: "ise-jingu-pilgrimage",
    date: "2025-09-15",
    locs: ["伊勢神宮", "おはらい町・おかげ横丁"],
    hero: "",
    title: { ja: "伊勢神宮 参拝と撮影 — 神域の杜を歩く", en: "Ise Jingu Pilgrimage and Photography: Walking the Sacred Grove" },
    excerpt: { ja: "外宮・内宮の参拝順路、撮影マナー、おかげ横丁の食と街並み。日本の心を巡る一日。", en: "Outer/Inner shrine route, photography etiquette, and the food and streets of Okage Yokocho. A day at Japan's spiritual heart." },
    bodyJa: `三重県伊勢市の伊勢神宮は、日本全国8万社の頂点に立つ最高位の神社。皇室の祖神とされる天照大御神を祀る「内宮」と、衣食住・産業の神である豊受大御神を祀る「外宮」の2宮を中心に、125社で構成されます。20年に一度社殿を新しく建て替える「式年遷宮」が今も続く、世界的にも稀有な神社です。

【正式な参拝順】古来「外宮先祭」が正式。①7:30 外宮（豊受大神宮）から。北御門口入口、約30〜45分で本殿。②9:00 内宮（皇大神宮）へバス20分。宇治橋を渡り五十鈴川御手洗場で清め、約45分〜1時間で本殿。③11:00 おかげ横丁・おはらい町で食事と街並み撮影。

【撮影マナー絶対遵守】①本殿撮影禁止（ご正宮の階段から先は撮影不可、白い御幌も）、②鳥居の前で撮影スタッフが立つのは止めましょう、③参拝者の顔は写さない、④三脚は参道では使用不可（広場のみ可、混雑時遠慮）、⑤神域での飲食喫煙禁止。

【撮影ポイント】①宇治橋（朝日が橋を照らす早朝が美しい）、②五十鈴川御手洗場（清らかな川と緑）、③樹齢千年超の杉並木（縦構図、参道の奥行き）、④おかげ横丁の街並み（江戸〜明治の町並みを再現）、⑤夫婦岩（隣接、日の出と二見興玉神社）。

【機材】標準ズーム（24-70mm）が万能。神域は深い杉に囲まれ薄暗いので、F2.8〜F4の明るいレンズが有利。手ブレ補正必須。PLフィルターで川面の反射、苔の発色を活かす。

ヒント：①早朝（朝6時の開門）が最も静謐で人が少ない。②伊勢神宮は3度参拝すると願いが叶うとされる。③おかげ横丁の「赤福本店」の赤福餅、伊勢うどん、てこね寿司は伊勢の三大グルメ。`,
    bodyEn: `Ise Jingu in Mie Prefecture is the most prestigious shrine in Japan, standing atop the country's 80,000+ Shinto shrines. It centers on two main shrines — the «Naiku» (Inner) enshrining Amaterasu Omikami, the imperial ancestral deity, and the «Geku» (Outer) enshrining Toyouke Omikami, deity of food, clothing, shelter, and industry — together with 125 affiliated shrines. The «Shikinen Sengu» tradition of rebuilding the entire main hall every 20 years remains alive — a world-rare practice.

【Proper visit order】Tradition dictates «Geku first.» (1) 7:30 — start at the Outer Shrine (Toyouke Daijingu) via the Kitamikadoguchi entrance, ~30–45 minutes to reach the main hall. (2) 9:00 — bus 20 minutes to Naiku (Kotai Jingu). Cross Uji Bridge, purify at the Isuzu River Mitarashi pavilion, ~45–60 minutes to the main hall. (3) 11:00 — head to Okage Yokocho and Oharaimachi for food and streetscape photography.

【Etiquette is non-negotiable】(1) no photographs of the main halls (no shooting beyond the steps of Goshogu, including the white curtain); (2) don't have someone pose blocking the torii gate; (3) don't capture other worshippers' faces; (4) tripods are forbidden on the approach paths (allowed only in plazas, and best avoided when crowded); (5) no eating, drinking, or smoking in sacred areas.

【Vantages】(1) Uji Bridge — gorgeous when morning sun strikes the bridge; (2) Isuzu River Mitarashi (pure river and greenery); (3) the 1000+ year-old cedar avenues (vertical compositions of approach depth); (4) Okage Yokocho streetscape (Edo-to-Meiji period reconstruction); (5) Meoto-iwa nearby (sunrise and Futami Okitama Shrine).

【Gear】Standard zoom (24–70 mm) is versatile. The grove is dim — fast f/2.8–f/4 lenses help. Image stabilization essential. CPL filter enhances river reflections and moss saturation.

Tips: (1) very early morning (6 a.m. opening) is most serene; (2) tradition holds that visiting Ise Jingu three times grants your wishes; (3) Okage Yokocho's Akafuku Honten (akafuku rice cakes), Ise udon, and tekone-zushi are the three Ise food classics.`,
  },
  {
    slug: "miyakojima-blue",
    date: "2025-07-08",
    locs: ["宮古島"],
    hero: "wt6ow9shewohl0dm0lnj",
    title: { ja: "宮古ブルーを撮る — 与那覇前浜と伊良部大橋、3540mの絶景", en: "Capturing Miyako Blue: Yonaha Maehama and the 3,540 m Irabu Bridge" },
    excerpt: { ja: "日本一の透明度を誇る海。PLフィルター、時間帯、ドローンと地上の使い分け。", en: "Japan's clearest waters. Polarizing filters, timing, and the trade-offs between aerial and ground perspectives." },
    bodyJa: "",
    bodyEn: "",
  },
  {
    slug: "chichibugahama-uyuni",
    date: "2025-08-20",
    locs: ["父母ヶ浜"],
    hero: "",
    title: { ja: "父母ヶ浜「日本のウユニ塩湖」を撮る — 香川の干潟夕景", en: "Chichibugahama, the «Uyuni of Japan»: Shooting Kagawa's Tidal Sunset Reflections" },
    excerpt: { ja: "干潮+夕暮れ+無風の三条件。鏡のような水面に人物シルエットを写す撮影設計。", en: "Low tide + twilight + windless: three conditions converging. Designing silhouette shots on the mirror tidepool." },
    bodyJa: "",
    bodyEn: "",
  },
  {
    slug: "himeji-castle-spring",
    date: "2024-04-05",
    locs: ["姫路城"],
    hero: "",
    title: { ja: "姫路城 春 — 世界遺産・白鷺城と1000本の桜", en: "Himeji Castle in Spring: UNESCO White Heron Castle and 1,000 Cherry Trees" },
    excerpt: { ja: "白漆喰の天守と桜のコントラスト。三の丸広場・西の丸からの王道構図と裏ビュー。", en: "White-plaster keep against pink blossoms. Classic compositions from Sannomaru and Nishinomaru, plus lesser-known angles." },
    bodyJa: "",
    bodyEn: "",
  },
  {
    slug: "otaru-canal-night",
    date: "2025-12-15",
    locs: ["小樽"],
    hero: "yh7e0rhvhnzzxj5esa5f",
    title: { ja: "小樽運河の夜 — ガス灯が灯るノスタルジー", en: "Otaru Canal at Night: A Nostalgia Lit by Gas Lamps" },
    excerpt: { ja: "石造倉庫とガス灯の温かい光。雪の運河、青の時間帯、長秒露光のテクニック。", en: "Stone warehouses and warm gaslight. The snowy canal, blue hour, and long-exposure techniques." },
    bodyJa: "",
    bodyEn: "",
  },
  {
    slug: "noboribetsu-jigokudani",
    date: "2025-10-15",
    locs: ["登別"],
    hero: "",
    title: { ja: "登別 地獄谷 — 火山と湯けむりの撮影地", en: "Noboribetsu Jigokudani: A Volcanic, Steam-Veiled Photo Spot" },
    excerpt: { ja: "硫黄の蒸気と紅葉、エメラルドの大湯沼。北海道随一の温泉郷で湯けむりを撮る。", en: "Sulfur steam, autumn foliage, and the emerald Oyunuma. Shooting steam in Hokkaido's premier onsen valley." },
    bodyJa: "",
    bodyEn: "",
  },
];

export const POST_SLUGS = POSTS.map((p) => p.slug);
export const getPost = (slug) => POSTS.find((p) => p.slug === slug);
export const getPostTitle = (post, lang) => post.title[lang] || post.title.en || post.slug;
export const getPostExcerpt = (post, lang) => post.excerpt[lang] || post.excerpt.en || "";
export const getPostBody = (post, lang) => {
  if (lang === "ja" && post.bodyJa) return post.bodyJa;
  return post.bodyEn || "";
};
