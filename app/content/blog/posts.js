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
    slug: "lake-suwa-tateishi-overlook",
    date: "2026-04-13",
    locs: ["諏訪湖", "立石公園"],
    hero: "h4oyzzdqaydnwqtu6ni0",
    title: { ja: "諏訪湖を見下ろす丘 — 立石公園から眺める信州の湖と街", en: "The Hill Above Lake Suwa: Tateishi Park's View of a Lake and a Town" },
    excerpt: { ja: "標高934mから諏訪湖を一望する立石公園。アニメの聖地としても知られる、湖と山と街並みが折り重なる信州の眺望。", en: "Tateishi Park overlooks Lake Suwa from 934 m. Known as an anime pilgrimage spot, it offers a layered view of lake, mountains, and town nestled in the Shinshu highlands." },
    bodyJa: `長野県中央部、標高759mに広がる諏訪湖は、長野県最大の湖です。湖を取り巻くように諏訪市・岡谷市・下諏訪町の街並みが広がり、その向こうに八ヶ岳連峰や霧ヶ峰が連なります。湖畔を歩けば白鳥型の遊覧船や噴水、そしてのどかな散歩道が続いています。

この景色を最高の角度で見られるのが、湖の南側にある立石公園です。標高934m、湖面までの高低差は約170m。展望広場に立つと、諏訪湖の全形がはっきりと足元に見えて、思わず息をのむような眺望が広がります。

立石公園は近年、アニメ映画「君の名は。」の舞台モデルのひとつとされたことで一躍有名になりました。映画ファンが世界中から訪れる「聖地」です。とはいえ実際に立ってみると、特別なファンでなくても十分に感動的な景色。山と水と人の暮らしが、一枚の絵のように重なって見えます。

おすすめは夕方。日が傾くにつれて諏訪湖の水面がオレンジから紫へとゆっくり色を変え、街灯がぽつぽつと灯り始めます。夏には湖上で打ち上がる花火が立石公園から見下ろせ、夜空と湖面の両方に光が広がる珍しい花火体験ができます(諏訪湖祭湖上花火大会、毎年8月15日)。

【アクセス】JR上諏訪駅から車で約10分。駅から徒歩だと急な坂を登り40分ほど。バスは便数が少ないので、レンタカーかタクシーが現実的です。駐車場は無料、20台ほど。

【近くで楽しめること】湖畔の足湯(無料、諏訪湖ハイツ前ほか数か所)、上諏訪温泉の日帰り入浴、間欠泉センター、SUWAガラスの里。湖を一周するサイクリングロード(約16km)は半日で気軽に走れます。`,
    bodyEn: `Lake Suwa, Nagano Prefecture's largest lake, sits at 759 m elevation in the heart of central Honshu. Three towns — Suwa, Okaya, and Shimosuwa — wrap around its shoreline, with the Yatsugatake and Kirigamine mountain ranges rising beyond. Walk the lakeside and you'll find swan-shaped pleasure boats, fountains, and a gentle promenade.

For the best vantage of all this, head to Tateishi Park on the lake's southern hillside. At 934 m elevation — about 170 m above the water — the entire lake reveals itself in a single sweep. Town, lake, and mountains layer like a hand-painted scene.

Tateishi Park became famous in recent years as one of the inspirations for the anime film «Your Name» (Kimi no Na wa). Fans visit from around the world. But you don't need to know the film to be moved by the view: water, mountains, and a small town all stitched together in one frame.

Late afternoon is the best time. As the sun sets, the lake's surface shifts slowly from orange to purple, and streetlights begin to flicker on across the towns below. In summer, fireworks launched over the lake (the Lake Suwa Fireworks Festival, August 15) can be watched from above — a rare experience where the sky and the water both fill with light.

【Access】About 10 minutes by car from JR Kami-Suwa Station. Walking takes around 40 minutes uphill. Buses run infrequently, so renting a car or taking a taxi is practical. Free parking for about 20 cars.

【Nearby】Free lakeside footbaths (in front of Suwako Heights and a few other spots), day-onsen at Kami-Suwa, the Geyser Center, the Suwa Glass Village. A 16 km cycling path circles the entire lake — easy enough for an afternoon ride.`,
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
    slug: "shiretoko-summer-coast",
    date: "2025-08-10",
    locs: ["知床"],
    hero: "sgqomcwsuq18xc1oyr3g",
    title: { ja: "夏の知床 — 世界自然遺産の海と原生林を歩く", en: "Summer in Shiretoko: Walking the Coast and Forests of a UNESCO World Heritage Site" },
    excerpt: { ja: "ウトロの透き通る海、知床五湖の原生林、断崖から流れ落ちる滝。日本最後の秘境を夏に旅する。", en: "Utoro's clear coast, the primeval forests of the Five Lakes, and waterfalls cascading down sheer cliffs. A summer journey through one of Japan's last wild frontiers." },
    bodyJa: `北海道東部、オホーツク海に細長く突き出た知床半島は、2005年に世界自然遺産に登録された日本でも特別な場所です。「知床」はアイヌ語の「シリ・エトク(地の果て)」に由来します。冬の流氷で世界的に有名ですが、訪れやすいのはむしろ初夏から秋。緑が深く、空も海も澄み切ります。

半島の玄関口がウトロ。漁港から見える海はびっくりするほど透き通り、岸壁の岩には海鳥が並んでいます。海岸線の道を北東へ進むと、海から立ち上がる切り立った断崖や、突端に立つ灯台、そして名物「オロンコ岩」の上から見渡す広大な海景に出会えます。

少し内陸へ入ると知床五湖。原生林の中に静かに点在する5つの湖を、整備された木道を歩きながら巡れます。水面に映る山と森のリフレクションが美しく、運がよければエゾシカやキツネにも出会えます。クマ出没期(5〜7月)はガイドツアー制になりますので、訪問前に観光協会のサイトで確認を。

崖から海へ直接落ちる「フレペの滝」も知床らしい一景です。展望台までは草原の遊歩道を20分ほど。海と滝と空がひと続きに広がる開放感は、ここでしか味わえません。

冬の流氷は確かに圧倒的ですが、夏の知床も負けていません。むしろ「人と自然が穏やかに共存している季節」として、家族旅行や初めての北海道にも向いています。

【アクセス】女満別空港から車で約2時間、釧路空港から約3時間半。札幌からは飛行機+レンタカーが現実的。
【ベストシーズン】6〜9月。7〜8月は緑と花のピーク、9月は涼しく観光客も減ります。
【宿】ウトロ温泉に大小の宿が集中。日帰り温泉も複数。`,
    bodyEn: `The long, narrow Shiretoko Peninsula juts into the Sea of Okhotsk on Hokkaido's far eastern edge. Inscribed as a UNESCO World Heritage site in 2005, it remains one of Japan's most uncompromised wild places. The name comes from the Ainu «sir etok» — «end of the earth.» Shiretoko is famous worldwide for its winter drift ice, but the easiest and most rewarding seasons to visit are early summer through autumn, when the greens deepen and both sky and sea turn perfectly clear.

The gateway is Utoro, a small fishing port. The water along its harbor is startlingly transparent, and seabirds line the rocky shore. Drive northeast along the coastal road and you'll meet sheer cliffs rising straight out of the sea, a small lighthouse on the headland, and the famous Oronko Rock — climb it for a sweeping ocean view.

Slightly inland is Shiretoko Goko, the Five Lakes. Boardwalks lead you through dense primeval forest past five quiet lakes that mirror the surrounding mountains. Deer and foxes are common. During bear-active months (May–July), access is via guided tour only — check the local tourism office before visiting.

Furepe Falls, where water drops directly from a cliff into the sea, is another scene that captures Shiretoko's character. A 20-minute meadow walk leads to the observation deck, where ocean, waterfall, and sky stretch open in one panorama.

Winter drift ice is overwhelming, no question. But summer Shiretoko has its own quiet appeal — a season where humans and nature coexist gently, perfect for first-time Hokkaido trips and family travel.

【Access】About 2 hours by car from Memanbetsu Airport, 3.5 hours from Kushiro. From Sapporo, fly + rental car is most practical.
【Best season】June–September. July–August peak for greenery and wildflowers; September brings cooler weather and fewer tourists.
【Lodging】Utoro Onsen has hotels of all sizes plus several day-trip bath options.`,
  },
  {
    slug: "furano-summer-hills",
    date: "2025-07-20",
    locs: ["富良野"],
    hero: "hvnlsmmmikzqkmooht8u",
    title: { ja: "夏の富良野・美瑛 — 丘とパッチワークの北海道", en: "Furano & Biei in Summer: Hokkaido's Patchwork Hills" },
    excerpt: { ja: "鮮やかな花のしま、十勝岳連峰の遠望、丘の上から見下ろす平原。北海道らしい広い空の下を歩く夏の旅。", en: "Vivid flower stripes, the distant Tokachi Range, and the wide plain seen from a hilltop. A summer walk under Hokkaido's enormous sky." },
    bodyJa: `北海道のほぼ中央、富良野盆地と美瑛の丘は、日本の田園風景の中でも特に「広い」と感じる場所です。空が大きく、地平線まで畑が続き、その向こうに十勝岳連峰が穏やかに浮かびます。北海道を旅したことがない人でも、写真や絵で一度は目にしたことがあるのではないでしょうか。

夏の見どころのひとつは、農地と観光花畑が織りなす「色のしま」。赤・黄・白・紫と帯状に植えられた花が緩い丘に沿って広がり、まるでパッチワークのようです。観光花畑のなかでも「ぜるぶの丘」「四季彩の丘」は無料または数百円で入れて、家族連れにも人気。トラクターバスで畑を一周できる施設もあります。

少し車を走らせて坂道を登ると、富良野市街と平原を見下ろせる展望台があります。屋根の連なる町、その向こうに広がる緑と黄色の畑、さらに奥に十勝岳。あれもこれも一枚の風景の中にすっと収まる感覚は、関東や関西では味わえない北海道ならではのスケール感です。

夏でも朝晩は涼しく、特に朝6〜8時は空気が澄んで遠くの山までよく見えます。日中に汗ばんで、夕方には心地よい風が吹く——そんな1日を過ごすだけで、北海道に来た実感が深まります。

【アクセス】旭川空港から車で約30分、新千歳空港から約2時間半。JR富良野線も走っており、富良野駅・美瑛駅から観光バスやレンタサイクルがあります。
【ベストシーズン】6月下旬〜8月。7月中旬は花畑がピーク、8月は収穫の風景が見られます。
【近くで】青い池(美瑛)、白金温泉、富田ファーム周辺のカフェ、北海道らしい大盛りスイーツがそろう富良野マルシェ。`,
    bodyEn: `In the heart of Hokkaido, the Furano basin and the rolling hills of Biei feel uncommonly wide — even by Japanese countryside standards. The sky is enormous, fields run to the horizon, and the Tokachi mountain range floats gently in the distance. Even if you've never traveled in Hokkaido, you've probably seen this scene in photos or paintings.

A summer highlight is the «stripes of color» where farms and flower gardens align. Red, yellow, white, and purple bands of flowers follow the slope of the hills like a giant patchwork quilt. Among the popular flower parks, Zerubu-no-Oka and Shikisai-no-Oka are inexpensive and family-friendly — some even offer tractor-bus rides through the fields.

Drive up one of the gentle slopes and you'll find a viewpoint that looks down onto Furano town and the plain below. Roofs cluster together, green-and-yellow fields stretch beyond them, and the Tokachi range rises further still. Holding all of that in one quiet view feels distinctly Hokkaido — not something you encounter elsewhere in Japan.

Even in summer, mornings and evenings are cool. Between 6 and 8 a.m., the air is crisp and the distant mountains stand out clearly. A day of warm afternoons and breezy evenings is enough to leave you feeling that you've truly arrived in Hokkaido.

【Access】~30 minutes by car from Asahikawa Airport, ~2.5 hours from New Chitose. JR Furano Line connects Furano and Biei stations, where bus tours and bike rentals are easy to find.
【Best season】Late June through August. Mid-July is peak for flower fields; August adds the harvest scenery.
【Nearby】The Blue Pond in Biei, Shirogane Onsen, cafés around Farm Tomita, and Furano Marche for typically generous Hokkaido sweets.`,
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
    locs: ["東福寺", "金閣寺"],
    hero: "DSC07290_sz6x7s",
    title: { ja: "京都の紅葉 — 東福寺と金閣寺、二つの名刹を歩く", en: "Kyoto's Autumn Color: A Walk Between Tofuku-ji and Kinkaku-ji" },
    excerpt: { ja: "通天橋から見下ろすモミジの海、鏡湖池に映る金閣。1日で京都の秋の核を体感する。", en: "A sea of maples from Tsutenkyo bridge, the Golden Pavilion mirrored in Kyoko-chi pond. A single day at the heart of Kyoto's autumn." },
    bodyJa: `京都の紅葉は11月中旬から下旬にピークを迎えます。1600以上もある寺社の中で、紅葉の名所として広く知られるのが東福寺と金閣寺。京都市内の南東と北西、対極の位置にありますが、半日ずつ使えば1日で両方じっくり巡れます。

朝イチは東福寺へ。1236年創建の禅宗大本山で、通天橋(つうてんきょう)から眺める「モミジの海」が圧巻です。境内に植えられた約2,000本のカエデが、橋の下の渓谷を埋め尽くすように色づき、紅、橙、まだ青みの残る葉まで、グラデーションで広がります。8:30の開門と同時に入って通天橋へ向かうのが鉄則。橋の上は立ち止まり禁止のため、ゆっくり眺めたい人は橋の前後の境内をじっくり歩くといいでしょう。

午後は北西の金閣寺へ移動。バスで約1時間、ランチを挟むちょうどいいリズム。1397年に足利義満が造営した金閣は、今も鏡湖池(きょうこち)の水面にきれいに映り込みます。秋は周囲の紅葉が金色の楼閣を縁取り、池に紅葉と金閣が二重に映る独特の景観に。逆光になる午後の時間帯は、輝きが特に強くなります。

混雑が気になる人は、平日午前中、または紅葉ピークから少しずらした時期がおすすめ。ピークの1週間前は青みが残る葉と紅のグラデーション、ピーク後は石畳に散った落ち葉の絨毯が美しく、それぞれ違った表情を楽しめます。雨の日は人が減り、濡れた葉が深い色になるため、これも狙い目です。

時間があれば、夕方は東山エリアへ移動して産寧坂や八坂神社方面を散策するのが定番。京都の昼の紅葉と夜の街並み、両方を味わう一日になります。

【アクセス】東福寺：JR奈良線「東福寺駅」徒歩10分。金閣寺：京都市バス「金閣寺道」下車すぐ。
【拝観料】東福寺(通天橋・開山堂)600円、金閣寺500円。
【ベスト時期】11月中旬〜下旬。気温と日照に左右されるので、京都市公式観光サイトの紅葉情報で最新を確認。`,
    bodyEn: `Kyoto's autumn foliage peaks from mid-to-late November. Among the city's 1,600+ temples and shrines, two rise as the most beloved fall destinations: Tofuku-ji and Kinkaku-ji. They sit at opposite ends of the city — southeast and northwest — but with half a day each, you can take both in slowly in a single day.

Start the morning at Tofuku-ji. Founded in 1236 as a major Zen temple, its Tsutenkyo bridge offers a dazzling «sea of maples.» Some 2,000 maples planted in the valley below color the entire ravine in red, orange, and lingering green — a layered gradient. The trick is to enter right at the 8:30 opening and head straight for the bridge. Stopping on the bridge isn't allowed, so if you want to linger, walk the temple grounds at either end and enjoy the trees up close.

In the afternoon, head northwest to Kinkaku-ji. About an hour by bus, with lunch in between for a comfortable rhythm. The Golden Pavilion was built in 1397 by Ashikaga Yoshimitsu, and it still mirrors clearly in Kyoko-chi pond. In autumn, surrounding maples frame the gold tower, and the reflection doubles the scene in the water. The afternoon backlight makes the gold glow especially intensely.

To avoid crowds, weekday mornings or a few days off-peak work best. A week before peak, you get the green-to-red gradient; a week after, fallen leaves carpet the stone paths — both are beautiful in different ways. Rainy days bring fewer visitors and richer color in wet leaves, another good window.

If you have more time, ending the day east in the Higashiyama district — strolling Sannenzaka or Yasaka Shrine — completes a full Kyoto day, pairing autumn temples with the evening townscape.

【Access】Tofuku-ji: 10 min walk from JR Nara Line «Tofukuji.» Kinkaku-ji: Kyoto City Bus «Kinkaku-ji-michi.»
【Admission】Tofuku-ji (Tsutenkyo + Kaisando) ¥600, Kinkaku-ji ¥500.
【Best season】Mid-to-late November. Color depends on temperature and sunlight — check Kyoto City's tourism site for current foliage status.`,
  },
  {
    slug: "sannenzaka-night-walk",
    date: "2025-11-25",
    locs: ["清水寺周辺"],
    hero: "DSC07601_cocitq",
    title: { ja: "夜の産寧坂 — 清水寺へ続く石畳の路地を歩く", en: "Sannenzaka by Night: Walking the Lantern-Lit Lane to Kiyomizu" },
    excerpt: { ja: "京都・東山。提灯と石畳と土産物屋。観光客が引いた夕方以降、本来の京都の夜が静かに姿を現す。", en: "Higashiyama, Kyoto. Lanterns, stone paving, and old shops. As the day-trippers leave, the quiet Kyoto night gradually appears." },
    bodyJa: `清水寺へ続く参道のうち、もっとも京都らしい雰囲気が残るのが産寧坂(三年坂)・二寧坂(二年坂)です。江戸時代以前の町並みがほぼ手付かずで残り、文化財として保護された石畳の坂道に、木造の旅館や和菓子屋、漆器店が軒を連ねます。日中は世界中からの観光客で賑わい、写真や動画でも有名な「京都の代表的な路地」のひとつ。

おすすめは日が落ちてからの夕方以降。観光バスが去り、土産物店が一軒一軒灯りを点け始めると、町並みの輪郭が急に浮かび上がります。提灯の暖かいオレンジ色、店先の和紙ランプ、奥にぼんやり見える清水寺の塔のシルエット——目の前に広がるのは、昼とはまったく別の表情の京都です。

産寧坂を上りきると、そのまま清水寺の門前に出ます。秋の特別拝観の時期(11月中旬〜12月初旬)は夜の参拝も可能で、参道の灯りと境内のライトアップが連続する贅沢な体験ができます。冬は底冷えしますが、人が少なく石畳がしんと静まり返る瞬間が訪れ、これも別格。

途中には「八坂の塔」(法観寺、五重塔)を見上げる定番フォトスポットもあり、坂のカーブと塔がきれいに重なる構図はSNSでもよく見かけるかもしれません。実際にその場に立ってみると、写真より生身で感じる空気感の方がずっと印象的です。

【アクセス】京都市バス「清水道」または「五条坂」から徒歩10分、京阪「祇園四条」から徒歩20分。坂道なので歩きやすい靴で。
【ベスト時間帯】17:30〜19:30。日没直後の青い空と提灯の暖色が共存する短い時間が一番美しい。
【近くで】八坂神社、円山公園、ねねの道(高台寺)、祇園白川。夕食は近くの京料理店や老舗甘味処で。`,
    bodyEn: `Among the approaches leading to Kiyomizu-dera, Sannenzaka and Ninenzaka preserve the most quintessentially Kyoto atmosphere. Their stone-paved streets — protected as cultural heritage — are lined with wooden inns, traditional sweet shops, and lacquerware stores nearly unchanged since pre-Edo times. By day, they are among the most photographed lanes in Japan.

The real charm, though, comes after sunset. Once the tour buses leave and shopkeepers light their lanterns one by one, the outline of the lane suddenly transforms. Warm-orange paper lanterns, soft washi lights at storefronts, and the silhouette of a distant pagoda — what emerges is an entirely different Kyoto from the daytime version.

Walk up to the top of Sannenzaka and you arrive directly at Kiyomizu-dera's main gate. During the autumn special evening opening (mid-November to early December), the lantern-lit approach flows seamlessly into the temple's nighttime illumination — a rare double experience. Winter is bitterly cold, but quieter; you'll have moments where the stone paving seems to fall completely silent.

Along the way you'll pass the famous viewpoint of the Yasaka Pagoda (Hokan-ji, a five-story pagoda), where the curve of the slope frames the tower in a composition you may have seen on social media. In person, the feeling of being there is more striking than any photograph.

【Access】10 minutes on foot from Kyoto City Bus stops «Kiyomizu-michi» or «Gojo-zaka»; 20 minutes from Keihan «Gion-Shijo.» Wear comfortable shoes — these are real slopes.
【Best time】17:30–19:30. The brief window where blue twilight overlaps with warm lantern light is the most beautiful.
【Nearby】Yasaka Shrine, Maruyama Park, Nene-no-michi (Kodai-ji), and Gion-Shirakawa. For dinner, try a traditional Kyoto restaurant or a long-established sweets shop.`,
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
    slug: "okage-yokocho-walk",
    date: "2025-09-15",
    locs: ["おはらい町・おかげ横丁"],
    hero: "n0prvjjho2nf5ucrsoil",
    title: { ja: "おかげ横丁を歩く — 伊勢神宮の門前町", en: "A Walk Through Okage Yokocho: The Town at Ise's Gate" },
    excerpt: { ja: "江戸の町並みをそのまま再現したおはらい町。木造の店、人の賑わい、参拝後の甘いひと休み。", en: "An Edo-period townscape preserved in real life. Wooden shopfronts, lively crowds, and a sweet rest after the shrine visit." },
    bodyJa: `三重県伊勢市、伊勢神宮内宮の鳥居をくぐる手前、五十鈴川に沿って続くのが「おはらい町」と、その中ほどに広がる「おかげ横丁」です。約800mの石畳の参道は、江戸時代から続く街並みを残し、木造の店が軒を連ねます。神社へお参りしたあと、ちょっと甘いものを食べて、土産物を選んで帰る——そんな日本人の旅の原型がここにあります。

歩き始めると、屋根瓦の連なりや格子戸、暖簾の風合い、店先に並ぶ手書きの看板——一つひとつの細部に手をかけられた町並みであることが伝わってきます。観光地化されてはいるものの「テーマパーク的に作られた」というよりは、地元の人と参拝客が長い時間をかけて育ててきた雰囲気です。

特に名物が「赤福本店」。江戸時代から営業を続ける和菓子の老舗で、店内では出来立ての赤福餅とお茶を200円台でいただけます。ほかにも伊勢うどん、てこね寿司、地元の地酒、伊勢茶、松阪牛のコロッケなど、食べ歩きの楽しみが尽きません。

人で賑わう町並みは、平日の朝早くか夕方が比較的落ち着きます。土産物店の閉店時間(17時頃)を過ぎると一気に静かになり、提灯が灯った参道を歩く時間も独特の趣。観光客が引いた直後の暮れ方は、町並みを楽しむ一番の時間帯かもしれません。

伊勢神宮そのものは神聖な場所で、参道や本殿の撮影には細かい決まりがあります(本殿は撮影禁止など)。一方おかげ横丁は気兼ねなく町並みを楽しめる場所なので、神宮参拝とセットで「神社の凛とした空気」と「門前町の賑わい」をそれぞれ味わうのがおすすめ。

【アクセス】近鉄「宇治山田駅」「伊勢市駅」からバス15〜20分、内宮前下車すぐ。
【ベスト時間帯】平日10時前か16時以降。土日祝は終日混雑。
【関連】二見の夫婦岩、外宮(豊受大神宮)、徒歩で巡れる古市の街並み。`,
    bodyEn: `Just before the torii gate of Ise Jingu's Inner Shrine in Mie Prefecture, an 800-meter stone-paved approach winds along the Isuzu River. This is Oharaimachi, with its inner cluster of shops known as Okage Yokocho. The lane preserves an Edo-period townscape, lined with wooden shopfronts. After paying respects at the shrine, stopping for something sweet, then choosing souvenirs to bring home — this remains the archetypal Japanese travel experience.

As you walk, you notice the care put into the details: rows of tile roofs, lattice doors, the texture of fabric noren curtains, hand-painted shop signs. It's tourist-friendly, but it doesn't feel like a built-from-scratch theme park. Rather, it's an atmosphere that locals and visiting pilgrims have cultivated together over many years.

A signature stop is Akafuku Honten, an Edo-era confectioner still in operation. For a couple hundred yen you can have freshly made akafuku-mochi and green tea inside the shop. Beyond that — Ise udon, tekone-zushi, local sake, Ise green tea, Matsuzaka beef croquettes — the snacking options never run out.

The lane is busy through the day. Weekday mornings or late afternoons are calmest. After most souvenir shops close around 17:00, the place quiets dramatically, and walking the lantern-lit street takes on a particular charm. The hour just after the day-trippers leave may be the best time to truly enjoy the town.

Ise Jingu itself is a sacred site with strict rules — no photography of the main halls, for example. Okage Yokocho, by contrast, welcomes you to wander and enjoy at your own pace. Pairing the two — the quiet dignity of the shrine and the warm liveliness of the town at its gate — is the classic way to spend a day in Ise.

【Access】15–20 minutes by bus from Kintetsu Uji-Yamada or Iseshi Station. Get off at «Naiku-mae.»
【Best time】Weekdays before 10:00 or after 16:00. Weekends are crowded all day.
【Nearby】Meoto-iwa rocks at Futami, Geku (Outer Shrine), and the Furuichi old district within walking distance.`,
  },
  {
    slug: "miyakojima-blue",
    date: "2025-07-08",
    locs: ["宮古島"],
    hero: "wt6ow9shewohl0dm0lnj",
    title: { ja: "宮古ブルーを撮る — 与那覇前浜と伊良部大橋、3540mの絶景", en: "Capturing Miyako Blue: Yonaha Maehama and the 3,540 m Irabu Bridge" },
    excerpt: { ja: "日本一の透明度を誇る海。PLフィルター、時間帯、ドローンと地上の使い分け。", en: "Japan's clearest waters. Polarizing filters, timing, and the trade-offs between aerial and ground perspectives." },
    bodyJa: `沖縄県宮古島は「宮古ブルー」と呼ばれるエメラルドグリーンと深いブルーのグラデーションで知られる亜熱帯の島。透明度40m級の海は日本一級で、晴天下では海底のサンゴまでクリアに見えます。

【撮影スポット5選】①与那覇前浜：日本一の白砂ビーチ7km、来間大橋とのコラボが王道。②伊良部大橋：3,540mの無料橋として日本最長、宮古島本島と伊良部島を結ぶ。橋の上から、または対岸から橋全景を狙う。③砂山ビーチ：天然のアーチ岩が有名、夕日が抜ける構図。④池間大橋：池間島へ渡る2km橋、橋上の駐車スペースから絶景。⑤東平安名崎：島の東端、断崖と灯台、青い太平洋の俯瞰。

【ベストシーズン】6月下旬〜9月中旬、特に7〜8月は海の透明度ピーク。9月は台風シーズン要注意。冬季（12〜2月）も海は美しいが日差しが弱まり「宮古ブルー」の発色は半減。

【時間帯】太陽が高い10〜14時が最も海が鮮やかに撮れます。光が海底まで届き、エメラルドグリーンの発色が最大化。早朝・夕方は色が落ち着くため、橋やビーチのシルエット撮影向き。

【撮影テクニック】①PLフィルター必須（海面の反射を抑え、海底まで透ける）、②露出補正+0.3〜+1（白い砂浜で測光が暗くなる）、③望遠レンズで圧縮効果（砂山ビーチのアーチ）、④ドローンが本領発揮するエリア（規制区域少、ビーチ撮影解禁）。

【機材】広角〜標準ズーム（16-70mm）+望遠（70-200mm）+PL+ND（NDで日中の橋を長秒露光、波の動きを表現）。日焼け対策と熱中症対策必須。レンタカーで島内移動が必須（公共交通機関は弱い）。`,
    bodyEn: `Miyakojima in Okinawa is famed for the «Miyako Blue» — a gradient from emerald green to deep blue across these subtropical waters. Visibility reaches 40 m, among the clearest in Japan; on sunny days you can see corals on the seafloor.

【Top 5 spots】(1) Yonaha Maehama: Japan's #1 white-sand beach, a 7 km expanse, classic with Kurima Bridge in frame. (2) Irabu Bridge: Japan's longest toll-free bridge at 3,540 m, connecting the main island to Irabu — shoot from on the bridge or from the opposite shore. (3) Sunayama Beach: famous natural rock arch, sunset framing through it. (4) Ikema Bridge: 2 km span to Ikema Island, parking spots on the bridge offer epic views. (5) Higashi Hennazaki: the eastern cape, cliffs, lighthouse, and Pacific overlook.

【Best season】Late June through mid-September, with peak water clarity in July–August. Watch for typhoons in September. Winter (December–February) waters are still beautiful, but weaker sunlight halves the «Miyako Blue» saturation.

【Timing】Sun-high hours (10:00–14:00) yield the most vivid sea — light penetrates to the seafloor, maximizing emerald color. Early morning and evening tone things down, ideal for bridge or beach silhouettes.

【Techniques】(1) CPL filter is mandatory (kills sea-surface glare, reveals the seafloor); (2) exposure compensation +0.3 to +1 (white sand fools the meter); (3) telephoto compression (the Sunayama arch); (4) drones thrive here (few restricted zones, beach shooting allowed).

【Gear】Wide-to-standard zoom (16–70 mm) plus telephoto (70–200 mm) plus CPL plus ND (ND filters enable daytime long exposures of bridges, capturing wave motion). Sun protection and hydration are essential. A rental car is mandatory — public transit is sparse.`,
  },
  {
    slug: "chichibugahama-uyuni",
    date: "2025-08-20",
    locs: ["父母ヶ浜"],
    hero: "",
    title: { ja: "父母ヶ浜「日本のウユニ塩湖」を撮る — 香川の干潟夕景", en: "Chichibugahama, the «Uyuni of Japan»: Shooting Kagawa's Tidal Sunset Reflections" },
    excerpt: { ja: "干潮+夕暮れ+無風の三条件。鏡のような水面に人物シルエットを写す撮影設計。", en: "Low tide + twilight + windless: three conditions converging. Designing silhouette shots on the mirror tidepool." },
    bodyJa: `香川県三豊市の父母ヶ浜（ちちぶがはま）は、潮が引いた後の干潟に薄く水が残り、その水面が鏡のように夕焼けと人物を映す現象で「日本のウユニ塩湖」と呼ばれ、SNSで一躍世界的人気スポットになりました。

【三条件】奇跡の一枚を撮るには3つの条件が同時に揃う必要があります。①干潮時刻が日没と重なる、②風がほぼない（風速2m/秒以下）、③晴れて夕焼けが綺麗。これらは月に数日しかない貴重な日。三豊市観光交流局が「ベストコンディションカレンダー」を毎月公開しているので必ず確認を。

【撮影テクニック】①日没30分前に到着、②膝立ちか地面スレスレのアングル（水鏡を最大化）、③人物を被写体にするなら逆光シルエット、④ジャンプ撮影は連写・シャッタースピード1/500秒以上、⑤マジックアワー（日没直後10〜30分）が最も色がドラマチック。

【露出設定】夕焼けの色を残すには、空に合わせて露出を決めます。マニュアルでF8・SS1/60〜1/125・ISO200程度。HDRブラケット3〜5枚撮影で、後処理で空と地面のバランス調整。RAW撮影必須。

【機材】広角レンズ（16-35mm or 14-24mm）が必須。地面スレスレの構図のため、背面液晶チルト機能のあるカメラが便利。三脚は使えるが、地面スレスレで撮るなら手持ちまたはミニ三脚。膝立ち、地面に寝そべる用に着替えと敷物を持参。

【アクセス】高松空港から車で1時間、JR詫間駅からタクシー15分。駐車場は有料（500円）で日没3時間前から満車になる週末も。混雑期は隣の有明浜や大潮の日の津田の松原もチェック。`,
    bodyEn: `Chichibugahama in Mitoyo City, Kagawa Prefecture, became internationally famous on social media as «Japan's Uyuni Salt Flats.» When the tide retreats, a thin layer of water remains on the tidal flats, becoming a mirror that reflects sunset skies and silhouetted figures.

【Three conditions】Three conditions must align simultaneously for the miracle shot: (1) low tide coinciding with sunset; (2) near-zero wind (under 2 m/s); (3) clear skies with vivid sunset. Only a few days each month meet all three. Mitoyo City Tourism publishes a monthly «Best Conditions Calendar» — always check it.

【Techniques】(1) arrive 30 minutes before sunset; (2) shoot kneeling or ground-level (maximize the mirror); (3) for subjects, backlit silhouettes work best; (4) jump shots need continuous burst at 1/500 s or faster; (5) the magic hour (10–30 minutes after sunset) delivers the most dramatic colors.

【Exposure】Meter for the sky to preserve sunset color. Manual mode at f/8, 1/60–1/125 s, ISO ~200. Bracket 3–5 frames in HDR for post-balance between sky and ground. Always shoot RAW.

【Gear】Wide-angle lens (16–35 mm or 14–24 mm) is essential. A camera with a tilting LCD helps for ground-level compositions. A tripod works, but ground-level shots are easier handheld or with a mini-tripod. Bring extra clothing and a tarp/mat for kneeling or lying on wet sand.

【Access】1 hour by car from Takamatsu Airport; 15 minutes by taxi from JR Takuma Station. Parking is paid (¥500) and weekends fill 3 hours before sunset. During crowded periods, check nearby Ariake-hama or Tsuda no Matsubara on spring-tide days as alternates.`,
  },
  {
    slug: "himeji-castle-autumn",
    date: "2024-11-20",
    locs: ["姫路城"],
    hero: "DSC07173_ogwql9",
    title: { ja: "姫路城を秋に訪ねる — 世界遺産・白鷺城の静かな季節", en: "Himeji Castle in Autumn: A Quiet Season at the White Heron Castle" },
    excerpt: { ja: "白漆喰の天守と紅葉と石垣。桜の季節と違って人が落ち着く、世界遺産を一番じっくり味わえる時期。", en: "White-plaster keep, autumn maples, and stone walls. With crowds thinner than cherry season, fall is when you can take the World Heritage castle in slowly." },
    bodyJa: `兵庫県姫路市の姫路城は、白漆喰の優美な姿から「白鷺城(しらさぎじょう)」と呼ばれます。1993年に法隆寺とともに日本初の世界文化遺産に登録された、日本を代表する城のひとつ。1609年に現在の姿が整い、戦災や地震を奇跡的に免れて、約400年前の建築がほぼそのままの状態で残っています。

桜のシーズン(4月初旬)が圧倒的に有名ですが、実は秋(11月中旬〜下旬)もとても良い季節です。お堀の周りで色づく楓や銀杏が、白い壁に静かなアクセントを与えます。観光客は春に比べてかなり落ち着いていて、世界遺産の建築をゆっくり眺められる時間が取れる——これは秋ならではの利点です。

おすすめは三の丸広場と内堀沿い。広い芝生から見上げると、白い天守の手前に紅葉が立体的に重なり、青空との三色のコントラストが浮かび上がります。お堀の水面には城がそのまま反射し、冬枯れの始まる前の落ち着いた色合いが意外と絵になります。

天守内部にも入れます。木造の急な階段、複雑な防衛のための構造、最上階から見下ろす姫路の街並み——映画のセットでなく実物の城に上ると、戦国時代の人々の感覚が少しだけ伝わってきます。城内拝観は所要1.5〜2時間ほど。

歩き疲れたら、城の南口から続く商店街でランチを。姫路は穴子料理や姫路おでんが地元グルメとして親しまれていて、駅近くの地元食堂が居心地よくおすすめです。

【アクセス】JR姫路駅から徒歩15分。新大阪から新幹線で50分、関西空港から特急90分。
【ベストシーズン】春(4月上旬の桜)、秋(11月中旬〜下旬の紅葉)、冬の凛とした白壁も美しい。
【入城料】大人1,000円(2024年現在)。所要1.5〜2時間。
【近くで】好古園(隣接の日本庭園)、書写山圓教寺(ロープウェイ)、姫路市立美術館。`,
    bodyEn: `Himeji Castle in Hyogo Prefecture is nicknamed «White Heron Castle» (Shirasagi-jo) for its elegant white-plaster form. In 1993 it became Japan's first UNESCO World Cultural Heritage site, listed alongside Horyu-ji. The current structure was completed in 1609 and miraculously survived war and earthquakes — roughly 400 years of architecture stands almost as it was.

Cherry blossom season (early April) is overwhelmingly famous, but autumn (mid-to-late November) is quietly excellent too. Maples and ginkgo around the moat add gentle color against the white walls. Crowds are noticeably calmer than in spring — meaning you actually get the time to take in the castle slowly. That's the autumn advantage.

The best vantage is from Sannomaru Plaza and along the inner moat. Look up from the lawn and the layered scene comes together: autumn leaves in the foreground, the white keep rising behind, blue sky framing it all. The castle reflects in the moat's surface, and the muted pre-winter palette photographs surprisingly well.

You can enter the keep itself. Steep wooden stairs, intricate defensive layouts, and from the top floor a sweeping view over Himeji's streets — this isn't a movie set, it's the real thing. Standing inside, you get a small but real sense of how people experienced the warring states period. Allow about 1.5–2 hours to walk through.

When your legs are tired, head south of the castle to the shopping street for lunch. Himeji is known for anago (sea eel) dishes and Himeji oden — local diners near the station are casual and welcoming.

【Access】15 minutes on foot from JR Himeji Station. 50 minutes by Shinkansen from Shin-Osaka, 90 minutes by limited express from Kansai International Airport.
【Best season】Spring (early-April cherry blossoms), autumn (mid-to-late November maples), and the crisp white walls in winter are all beautiful in their own ways.
【Admission】¥1,000 adult (as of 2024). Allow 1.5–2 hours.
【Nearby】Koko-en (the adjacent traditional garden), Engyo-ji on Mount Shosha (cable car), and the Himeji City Museum of Art.`,
  },
  {
    slug: "otaru-coast-sunset",
    date: "2025-12-15",
    locs: ["小樽"],
    hero: "yh7e0rhvhnzzxj5esa5f",
    title: { ja: "小樽の海と夕陽 — 港町の静かな黄昏時", en: "Otaru's Coast at Sunset: Quiet Twilight in a Port Town" },
    excerpt: { ja: "石造倉庫の運河で知られる小樽だが、本当の魅力は街を抜けた先の海岸線にある。岬と灯台、紫に染まる夕焼け空。", en: "Otaru is famous for its canal of stone warehouses — but the real reward is just past town, where the coastline opens to capes, lighthouses, and a violet evening sky." },
    bodyJa: `札幌の北西、車で40分ほどの距離にある小樽は、石造の倉庫が並ぶ運河で広く知られています。観光客の多くは運河と寿司街、北一硝子だけ見て帰りますが、少し足を伸ばすと、まったく違う表情の海岸線が広がっています。

小樽の街を抜けて積丹方面へ向かう海岸沿いの道は、北海道らしい広い空と、岩礁が点在する日本海が続く爽快なドライブルート。途中、岬や灯台が現れるたびに車を停めたくなり、夕方の時間帯になると空がオレンジから紫へとゆっくり変わっていきます。

おすすめは日和山岬や祝津パノラマ展望台周辺。海に突き出した小さな岬の先端に灯台が立ち、その向こうに積丹半島の影が霞みます。日没の30分前から、空が一気に色を変える短い時間帯——いわゆるマジックアワーは、見ている側もどこか神聖な気持ちになります。

冬は厳しい風と雪で訪れにくいですが、5〜10月は穏やか。9月〜10月は観光客がぐっと減り、夕焼けの色がより深くなる季節でもあります。海岸沿いの食堂や喫茶店で温かい飲み物を飲みながら一日の終わりを待つ、そんな静かな旅にぴったりです。

帰り道に運河エリアに戻ると、ガス灯が灯り、また別の小樽の顔が見えてきます。海岸線+運河の二段構えで小樽を巡ると、よく知られた観光地が突然奥行きのある町に変わります。

【アクセス】JR小樽駅からレンタカーまたはタクシー。海岸沿いはバスでもアクセス可だが本数が少ないため車が現実的。
【ベストシーズン】5〜10月。日没時間が日々違うので、観光協会の日没時刻情報を確認。
【近くで】小樽運河、北一硝子、堺町本通り、寿司屋通り。少し足を伸ばせば積丹半島の青い海。`,
    bodyEn: `Otaru, about 40 minutes northwest of Sapporo by car, is widely known for its canal lined with stone warehouses. Most visitors see the canal, the sushi street, and Kitaichi Glass — and head home. But a short drive past town opens up an entirely different Otaru: a coastline of big skies and rocky shores.

The coastal road from Otaru toward the Shakotan Peninsula is a clean, cheerful drive — the wide Hokkaido sky on one side, the Sea of Japan on the other, with rocky outcrops appearing here and there. Each cape and lighthouse begs you to pull over, and as evening approaches, the sky shifts slowly from orange to violet.

A favorite stretch is around Cape Hiyori and the Shukutsu Panorama Lookout. A small lighthouse stands at the tip of a sea-jutting cape, with the silhouette of the Shakotan Peninsula fading in the distance. The half hour before sunset — that magic hour when the sky changes color rapidly — has a quietly sacred feeling, even from the side of the road.

Winter brings harsh winds and snow that make this drive less inviting, but May through October is gentle. September and October especially see tourist numbers drop and sunsets deepen in color. Sitting in a small coastal café with something warm to drink, watching the day fade — that's the kind of trip this stretch invites.

On the way back, return to the canal as the gas lamps come on, and Otaru shows you another face. Pairing the coast with the canal turns a familiar tourist town into something with real depth.

【Access】Rental car or taxi from JR Otaru Station. Buses cover the coast but run sparsely — driving is more practical.
【Best season】May–October. Sunset times vary daily, so check the local tourism site for current times.
【Nearby】Otaru Canal, Kitaichi Glass, the Sakaimachi shopping street, and Sushi-ya Dori. A short additional drive reaches the famously blue Shakotan coast.`,
  },
  {
    slug: "noboribetsu-spring-coast",
    date: "2025-04-25",
    locs: ["登別"],
    hero: "ofe2ifgjpvsguty4udfh",
    title: { ja: "登別の春 — 桜と海と温泉のまち", en: "Noboribetsu in Spring: Cherry Blossoms, the Sea, and a Hot-Spring Town" },
    excerpt: { ja: "温泉と地獄谷で知られる登別だが、街を出ると太平洋の海岸線と春の桜が広がる。", en: "Noboribetsu is famous for its onsen and «Hell Valley,» but step outside town and a spring coastline of cherry blossoms unfolds along the Pacific." },
    bodyJa: `北海道南西部の登別市は、湯けむり立ち上る地獄谷と、北海道屈指の温泉街で広く知られています。観光客のほとんどが温泉とその周辺だけを訪ねて帰りますが、市街を少し離れると、太平洋の海岸線と春の落ち着いた桜の風景が広がっています。

桜の時期は本州より遅く、5月のゴールデンウィーク前後がピーク。北海道の桜は南国の人がイメージする「ピンク色のソメイヨシノ」とは少し違い、エゾヤマザクラの濃いピンクが多く、咲き方も控えめでこじんまり。空気がまだ冷たいなか、ぱらぱらと花びらが落ちる光景は、にぎやかな本州の花見とは印象が大きく違います。

海岸沿いを車で走ると、青く澄んだ太平洋とその向こうに浮かぶ室蘭の白鳥大橋が見えてきます。岬の高台から見下ろす海岸線は、北海道らしい開放感そのもの。漁港と街並みが一直線に続き、その先の岬まで視線が届きます。海風はまだ冷たいですが、春の日差しは穏やかで、立ち止まってのんびりするにはちょうどよい季節です。

登別温泉そのものも、春は人が落ち着く季節で狙い目。露天風呂から眺める雪解け後の山の青々とした緑は、冬や夏とは違う柔らかさがあります。地獄谷へ続く遊歩道や大湯沼周辺の散策も、夏の混雑前の今が最も気持ちよく歩けます。

桜・海・温泉という3要素を1日で巡れるのが、春の登別の魅力。あえて冬や紅葉ではなく、「観光のオフピーク」を狙うことで、北海道の旅が一段と落ち着いたものになります。

【アクセス】札幌から特急で約1時間20分、新千歳空港からバスで約70分。市内はレンタカーが便利。
【ベストシーズン】5月上旬の桜、6〜9月の海岸ドライブ、10月下旬の紅葉、冬の温泉。一年を通じて表情豊か。
【近くで】登別温泉郷、地獄谷、大湯沼、室蘭の白鳥大橋、登別マリンパークニクス(水族館)。`,
    bodyEn: `Noboribetsu, on Hokkaido's southwestern coast, is widely known for its steaming Jigokudani («Hell Valley») and one of Japan's most popular onsen towns. Most visitors see the hot springs and head home — but a short drive outside town opens up a Pacific coastline and a quiet cherry-blossom landscape in spring.

Cherry blossom season here arrives later than on Honshu — usually around Japan's Golden Week (early May). Hokkaido's blossoms differ from the soft pink Yoshino cherries most associate with hanami; the local Ezo-yamazakura skews to a deeper pink, and trees grow more modestly. With air still cool and petals drifting down quietly, the experience contrasts noticeably with the lively Honshu cherry season.

A short drive along the coast reveals the deep blue Pacific, with Muroran's Hakucho Bridge visible across the water. From the headland, you look down a sweeping shoreline — fishing harbors, small towns, and capes stretching into the distance. Sea winds are still cold in spring, but the sun is gentle. It's the kind of season made for stopping the car and sitting still for a while.

Noboribetsu Onsen itself is at its calmest in spring, making it a strategic time to visit. The view from outdoor baths — mountains turning fresh green after the snow melts — has a softness you won't find in winter or summer. The walking paths around Jigokudani and Oyunuma are also at their most pleasant before summer crowds arrive.

Cherry blossoms, the coast, and onsen — all three in a single day is what makes spring Noboribetsu rewarding. Skipping winter and autumn for the off-peak shoulder season turns Hokkaido travel into something quieter and more personal.

【Access】About 1 hour 20 minutes by limited express from Sapporo, 70 minutes by bus from New Chitose Airport. A rental car helps for getting around the area.
【Best season】Early-May cherry blossoms, June–September coastal drives, late-October autumn colors, year-round onsen. Each season has its own character.
【Nearby】Noboribetsu Onsen, Jigokudani, Oyunuma, Muroran's Hakucho Bridge, and Noboribetsu Marine Park Nixe (aquarium).`,
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
