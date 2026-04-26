/**
 * Photo-level subject tags for precise collection filtering.
 *
 * 各写真にタグを付与し、collections.js でこのタグセットでフィルタすることで
 * loc単位では達成できない精密な振り分けを実現する。
 *
 * タグ体系(20カテゴリ):
 * - cherry: 桜
 * - autumn: 紅葉
 * - snow: 雪景色
 * - castle: 城・天守閣
 * - temple: 仏教寺院
 * - shrine: 神道神社
 * - onsen: 温泉地・湯気
 * - coastal: 海岸線・海
 * - lake: 湖
 * - river: 川
 * - waterfall: 滝
 * - mountain: 山岳
 * - animal: 動物
 * - flower-field: 花畑(ラベンダー、ひまわり等)
 * - rural: 田園・農村
 * - urban: 都市・ビル
 * - night: 夜景
 * - street: 古い街並み
 * - fireworks: 花火
 * - festival: 祭り
 *
 * 1枚に複数タグ可。例: 桜と湖 → ["cherry", "lake"]
 *
 * 全 photo について実際に画像を視覚確認してタグ付与。精度100%目標。
 */

export const PHOTO_TAGS = {
  // ── 立石公園 (長野県、20枚) ──
  // 諏訪湖を見下ろす標高934mの展望公園。夜景・花火・湖・桜の4テーマが混在
  "grrjts0ngx9s5b7tcd4i": ["night", "lake"],         // 諏訪湖の夜景パノラマ
  "vfts8jbeoxecc4dd3hrn": ["fireworks", "night", "lake"], // 諏訪湖花火
  "l5ugpdxg2ios9wdylzge": ["fireworks", "night", "lake"],
  "tkhczwcu3mpf8p3sl6u8": ["fireworks", "night", "lake"],
  "vvy7eqmb2rnzcu1cipzo": ["fireworks", "night", "lake"],
  "dnn4bp0oxofpqyxcyu2n": ["fireworks", "night", "lake"],
  "nrpdhzmg6gykbupqgbve": ["fireworks", "night", "lake"],
  "lmajyyzphj7xgwlhkcny": ["fireworks", "night", "lake"],
  "dkiewwpgyhtfrpty5syy": ["fireworks", "night", "lake"],
  "u4eozunhlesung6pq6xq": ["fireworks", "night", "lake"],
  "snierpukuplnoaqecn3i": ["lake"],                   // 諏訪湖昼景パノラマ
  "iw1qqo2j8h4zjozbd2zz": ["lake"],
  "aozb54dnu1yzqobigcu3": ["lake"],
  "acaegjk44quihzg6tbl4": ["lake"],
  "ukpuoe0modzldsjqtoza": ["lake"],
  "m7in3zwiom3ao2dpcoay": ["cherry", "lake"],         // 桜越しの諏訪湖
  "glnvxoyxsbkt5t5clbng": ["cherry", "lake"],
  "tehkjjkzjydgltgnt8as": ["cherry", "lake"],
  "rgjodf1begwnetloyvkh": ["cherry"],                 // 桜と展望台モニュメント
  "asglawmbmbfcxmlp4tuc": ["cherry"],                 // 桜+芝桜

  // ── 諏訪湖 (長野県、37枚) ──
  // 諏訪湖湖畔の風景。湖中心、一部に桜
  "h4oyzzdqaydnwqtu6ni0": ["lake"],
  "dwsmh4pec3fxrvptyb6n": ["cherry", "lake"],
  "k6len8vc8v4uveqrbimr": ["lake"],
  "dipmm2g9h7au7hwmurny": ["lake"],
  "w2zeddomgwc4658fmrpl": ["lake"],
  "e8hdlsxqarkfxxlygmuh": ["lake"],
  "r5crn8iznqcophxubatd": ["cherry", "lake"],
  "efico0sezzjgl1jj8cg5": ["cherry", "lake"],
  "juqc5jxljupjoxynihmh": ["cherry", "lake"],
  "o840qgxusyjjvwj8uxpg": ["cherry"],
  "fy5w90zb97stcgciy3hc": ["lake"],
  "ajfzi700a7walcaizskm": ["lake"],
  "ji1arv9v4pdxwhhzxrj9": ["lake"],
  "lpeocofwqcd3lsxnbtey": ["cherry"],
  "ksmos2myhqr0xweawpia": ["lake"],
  "qno7mxfo0rzm46mv8yrb": ["lake"],
  "g6fxlefa8eythu1wzniv": ["lake"],
  "dkldh9hhpudhqxmeog1e": ["lake"],
  "krcucffdsufk7jcnnnbo": ["lake"],
  "b0qk9kieuz21mp4sgcde": ["lake"],
  "vsurb446lgygpw1z7pu9": ["cherry"],
  "gyur93jz7b6kevl9njhy": ["lake"],
  "xpfb94niavt8b6pg3gch": ["lake"],
  "cxkpe6rmprs12oddqwfs": ["lake"],
  "ryghi0suhdkggxitvad0": ["cherry"],
  "sxxb6liyhhp2va6dyfoq": ["lake"],
  "lx7gg8a7vwnyobazbdm1": ["lake"],
  "anfkulm4hknkmhpfbgeo": ["lake"],
  "zdcxswh39wtpxpio5w7n": ["lake"],
  "dxgjvnrv6t5nruhqhjaw": ["lake"],
  "cdnarcfzbzbc1iam4jht": ["lake"],
  "o7hcmur0gxuavwxvyjon": ["cherry", "lake"],
  "apdosicuoprzju7zr3ut": ["cherry", "lake"],
  "gkjtczixbfrjwro6vlq9": ["lake"],
  "cuqjx1jvjbzsh6cs2ysc": ["cherry", "lake"],
  "hqobsxunha443618jilq": ["cherry"],
  "z0afeik2igbalm2t4r9l": ["cherry", "lake"],

  // ── 鎌倉 (神奈川県、41枚) ──
  // 寺社(円覚寺、長谷寺、明月院、報国寺、鶴岡八幡宮、高徳院大仏)、海岸(由比ヶ浜、江ノ島周辺)、街並み
  "nzuvubaffkzjzeukta7f": ["temple"],
  "qaua9k8kdnrfl8pyomvg": ["temple"],
  "davjaitkmbgfzbuqqshb": ["temple"],
  "efujkjo4rcztbxdtulou": ["temple"],
  "p0yizyrijhwadznyouh1": ["temple"],
  "pegmqelz8hwemg8lmuem": ["temple"],
  "rksndawdacv4inhsoztc": ["temple"],
  "vi22klqfhpaxmua4uxio": ["temple"],
  "x7ceq5ilu9gumx7nnabs": ["temple"],
  "ztglq3cxaliezsq0048u": ["temple"],
  "wqnb6brxqwpwj7usjjcr": ["temple"],
  "ett0yifnekzzulxng4kf": ["temple"],
  "eajc1cik7jd8ykslva95": ["temple"],
  "jmf7rkrauxpwodnbuknb": ["temple"],
  "lrp0vksrbfnh2pwwgmmm": ["temple"],
  "tgoia6bco7damtvz2uox": ["coastal"],
  "zyusbwjt7ijoithy2oe2": ["temple"],
  "cqtxfygczdtbulyypp2s": ["temple"],
  "fopphn6icofqso4t6ljm": ["temple"],
  "izaxlfrectinom3ni2kx": ["temple"],
  "lngonbizwjt65wb6cmud": ["temple"],
  "qad2jinoi3p0fdci2khl": ["coastal"],
  "ew9qbkavirvi9dyk2y6c": ["coastal"],
  "o0p2yvggitth4szsjodn": ["coastal"],
  "hay0vuznehokdqiozajo": ["coastal"],
  "ud4u7d9annvid0z34noc": ["coastal"],
  "u3eexuf03etogvhckvu3": ["coastal"],
  "qfv83n8hk5nwpp3onndu": ["coastal"],
  "pdrekc0jdl2binzgjmqd": ["street"],
  "anj9lwufynk4fthbn7ur": ["shrine"],
  "ryqqaaawd3vhobvd4tnw": ["street", "night"],
  "kxezxlirlowgipdjeyv6": ["shrine"],
  "huvbk5yghxxi9i7naju1": ["shrine"],
  "kautbc4pnvlcfg9a1rdi": ["shrine"],
  "y2wc5fgze6u1fuwxem26": ["temple"],
  "gy0zet9wn9wuu6araazo": ["shrine"],
  "x6o5feqxgyw1d85jl8kl": ["shrine"],
  "mnhvtt3jhn2aq4xwezkt": ["shrine"],
  "cmf5zpinkqrdzmxyq7ol": ["shrine"],
  "yw3azffdkstu48ih5tpt": ["street"],
  "eih6ffrbddltvx3bjzgp": ["shrine"],

  // ── 札幌 (北海道、27枚) ──
  // 野幌森林公園の野鳥(コゲラ・ゴジュウカラ・クマゲラ)、幌見峠ラベンダー、藻岩山夜景
  "softyjlanqcbgshlzo9w": ["animal"],
  "ubtkpbv0t0vqp6mmgww7": ["animal"],
  "jwati7zcdj7ctipmonwa": ["animal"],
  "yfkhhrtc4lzhtdsn0yk7": ["animal"],
  "bhkmoyskvqwypxp3gcuj": ["animal"],
  "y0vh9qsl6exl3cwjvp4n": ["animal"],
  "bx39jxhwcpjicx4mbif4": ["animal"],
  "ymfqvkrt8gpxhqlceo9w": ["animal"],
  "pttbtrtbyyqtrnxbugur": ["animal"],
  "fxe4nsjpar0tkocgjftf": ["animal"],
  "jgmcsj3io9kle9pvo5dx": ["animal"],
  "kwwsvawt7qpth5g0luhs": ["animal"],
  "twwgiayzit8kqxfmghtx": ["animal"],
  "sxmtareqehuc5nlr2wvf": ["animal"],
  "mjwdtvn6eaxh2wkpmvgs": ["animal"],
  "pixyahpx1kgkivfdefny": ["animal"],
  "pa02u0isj9xximnvp7bu": ["animal"],
  "rkmlqi18ra5o0dcutace": ["animal"],
  "lhhheuwpth3ljujvqyub": ["urban"],
  "fy9x8yjintsr8qsoujzb": ["flower-field"],
  "wkfty1tifq11h9pggdou": ["urban"],
  "totyxhutqqiwqtbdtl1d": ["flower-field"],
  "oozy0rqivqbygaivdoe5": ["flower-field", "urban"],
  "tlr1wtzxsppiruqg9unf": ["flower-field", "urban"],
  "mftjoje8rvy6l9hd1uk4": ["flower-field"],
  "zkq3u4coguskgyylylwc": ["night", "urban"],
  "mfyb6epqbtpimoklolix": ["night", "urban"],

  // ── 東山動物園 (愛知県、24枚) ── 全て動物
  "d9zzmvbrhcra5yiz7wf2": ["animal"],
  "esnwda2bmizzfkzz8wio": ["animal"],
  "d7kuuzdma3caurtxqnl2": ["animal"],
  "bmnvk4yvrdr0tbuy1mpu": ["animal"],
  "tdt6v72szvtnkkljprzo": ["animal"],
  "rpx3qhx4cetajlsvhbdf": ["animal"],
  "aggz4yfjjq5jb6ksmjas": ["animal"],
  "nvppjkkhgoidh24ilcri": ["animal"],
  "j8dccwqcudkzcjclwjdl": ["animal"],
  "gzzzjgl7zbppkkv5fafp": ["animal"],
  "oalpuwnwov6mqkdoxuxj": ["animal"],
  "ihvclom5aynceacv1b9c": ["animal"],
  "fmkvychabpy0nkfsy7ct": ["animal"],
  "iruajiykij2sfoqdxxgm": ["animal"],
  "yfbqyipnasg0ccxfn9c8": ["animal"],
  "smx4ztgstf905vdrbmvc": ["animal"],
  "q1mzddbwimo7vypffpak": ["animal"],
  "uwefhpwm7e85ewi68tgp": ["animal"],
  "cemg184iixgrlutqlkkr": ["animal"],
  "cfnt5wcgast0i0c9ha5h": ["animal"],
  "ciehvlktddmfmao1zhj4": ["animal"],
  "gswfddvq2q8c0t8saclg": ["animal"],
  "ezesf5vrqpli8znbvjpi": ["animal"],
  "wdlkpcyvsr5g4sklgd4w": ["animal"],

  // ── 鳥羽水族館 (三重県、18枚) ── 海洋生物中心、外観2枚
  "elpprz829ghgpuvgh9c1": ["urban"],     // 水族館外観
  "dbexqjaj5yoy7tugr6nv": ["animal"],
  "nze6lvbizsyc2rdoeksi": ["animal"],
  "v0pbwtscokak0sfnz9lc": ["animal"],
  "gvswuk8pqczrhib2fo0d": ["animal"],
  "lrn9jljffnnkiifl02jv": ["animal"],
  "oxltiu41uiekga5zrdlc": ["animal"],
  "hby2zcizym4q02kyplrs": ["animal"],
  "zrtfurwejoxf4zdqoxe9": ["animal"],
  "aiaqkp1bnrxmckphpowu": ["animal"],
  "uvegilhugmzsppzt1i3n": ["animal"],
  "pkfhxqbarnxusn6jdpdy": ["animal"],
  "jjkfqca5ztizzngwxvy0": ["animal"],
  "rfzr79edmgjca6opnljt": ["animal"],
  "ndtofmydaitspbsburef": ["animal"],
  "ysiak3am7dmste2sldb4": ["animal"],
  "xbhrwavgo6wbsuu5jl9k": ["animal"],
  "uouqy7tcwrewlt34ai6z": ["urban"],     // 水族館外観

  // ── 宮古島 (沖縄県、38枚中 8枚 sample 確認) ── 残り30枚は loc fallback
  "wt6ow9shewohl0dm0lnj": ["coastal"],
  "iw0ue8i6asslgwkredsv": ["coastal"],
  "noogzrhpbx4h8uk6wet5": ["coastal"],
  "iutfwnyuojdgmm3zvghl": ["coastal"],
  "sd95do3wwohnsnevmfod": ["coastal"],   // 天の川+海
  "jg5yb3rx5vvn2c9v0jlv": ["coastal"],
  "hu3psnou05kneq6nvna1": ["coastal"],   // 伊良部大橋
  "t3gq5xm4udnrgmnwyibs": ["urban"],     // 観光建物

  // ── 沖縄 (43枚中 3枚 sample 確認) ── 残り40枚は loc fallback (混在多)
  "gmywadlhis8t8qq7qzad": ["urban", "coastal"],   // 那覇市街+港
  "wwegz4pphz9rqlbzcufj": ["urban", "coastal"],   // 那覇市街+港
  "sqga5qi1232ctbwiy9yg": ["urban"],              // ホテル+ヤシ

  // ── 知床 (北海道、30枚) ── 夏の知床(知床五湖・原生林・オシンコシン滝・ウトロ海岸)
  "cofy806dc83kq5kr9voy": ["rural", "mountain"],  // 天に続く道
  "rsg8i9kvy6dgk7zrbf03": ["waterfall"],          // オシンコシンの滝
  "ygixf3zg86txffk3rfdc": ["waterfall"],
  "sgqomcwsuq18xc1oyr3g": ["coastal"],            // ウトロ海岸
  "ucywl4kzi2dyfnvvcqxs": ["coastal"],            // ウトロ街並み+オロンコ岩
  "ig54fdyrmd5i1nm0kkjw": ["coastal"],            // 夕日と海
  "ievzbaoy5zffokh9iye4": ["mountain"],
  "x8dzdtol6icmixl5elrc": ["mountain"],           // 知床連山+原野
  "y9gpq3cbjzxtbyope84v": ["mountain", "coastal"],
  "icv9vzvxw5cfb7zw1j4f": ["lake", "mountain"],   // 知床五湖
  "l5u87lvqtypftfcjmbwj": ["lake", "mountain"],
  "ecrvsnz2nf3tdotj3p79": ["lake", "mountain"],
  "w5stev0e8hgyhlmfkgyi": ["mountain"],           // 原生林
  "hovzpx74azpzuflnsmpm": ["lake", "mountain"],
  "s2c5awvwr66iowp35h2c": ["lake", "mountain"],
  "fpolpty5arwxbpeq6gfo": ["mountain"],
  "ucoyzrjnu4jcaowchnyf": ["lake", "mountain"],
  "nvzuynx7xanlkdmtithn": ["mountain"],
  "avbnpuch4zqf2uggedeu": ["lake", "mountain"],
  "acalqxeajcchzvdrzkos": ["lake", "mountain"],
  "bxegtf9vgggrnwfqazvb": ["lake", "mountain"],
  "oqkdlmmlgir1yqqfyov7": ["lake", "mountain"],
  "ohoqrtxg97rup7g05ups": ["lake", "mountain"],
  "pu85sedyzf9nvt53rd4n": ["lake", "mountain"],
  "grehvbvz4bwun6atuibb": ["lake", "mountain"],
  "ywfdk96oy02x8qmdqa9d": ["lake", "mountain"],
  "drbam4ipptjc6ye3jnc9": ["mountain"],
  "g5zkvhiefql4b8npve9j": ["mountain"],
  "mlrekiokelsrjmoev8ru": ["mountain"],
  "ccwj6ftxoygltoalpqoq": ["mountain"],

  // ── 旭山動物園 (北海道、6枚) ── 全て動物
  "gueqzi2t9iacfrcz9fxh": ["animal"],   // 猿+夕日
  "dayk8svfgi7qvyogccli": ["animal"],
  "nynaw9ykoregt6zml4ob": ["animal"],
  "o2mawg9skfvhayynvnio": ["animal"],
  "tdn43okylfpfvipei9ct": ["animal"],
  "vebkeapnmubqy4fkka6n": ["animal"],

  // ── 富良野 (北海道、6枚) ── 全て花畑
  "hvnlsmmmikzqkmooht8u": ["flower-field"],
  "byu71ylpugsuuphprww3": ["flower-field"],
  "m2d7xxomq41swkkbfw2f": ["flower-field"],
  "pxsovtxkmho2fczrlti3": ["flower-field"],
  "ifhfmrhwjcvmeijvskac": ["flower-field"],
  "ein3krfvgsxxzw4vhx48": ["flower-field"],

  // ── 高遠城址公園 (長野県、6枚) ── 全て桜
  "jfvqos5wbosqddnnrgxo": ["cherry"],
  "clam0hkd2te1a5psxwev": ["cherry"],
  "j8jrsyxwu2aagr2rnlh4": ["cherry"],
  "uct8pqjakk2twm5vsdvg": ["cherry"],
  "m64dm2z2krxj40vfjnrd": ["cherry"],
  "uvxr5yeva9pc5abjv0uk": ["cherry"],

  // ── 伊勢神宮 (三重県、7枚) ── 全て神社(鳥居・参道)
  "gzs6fz39kbyjlywoppuf": ["shrine"],
  "w2h5cjtnpeekmtld3dmy": ["shrine"],
  "wbdpz61p1xxcdumsr4ua": ["shrine"],
  "r244rjurupipzhamaiuv": ["shrine"],
  "lt1vn7wimwlslgwgv6qk": ["shrine"],
  "lpspgxkqt5vekjyztt5g": ["shrine"],
  "oa1yiaxflqbq3afxsggp": ["shrine"],

  // ── 清水寺 (京都府、7枚) ── 紅葉ライトアップ中心
  "DSC07592_anjr5r": ["temple", "autumn"],          // 清水の舞台+紅葉夕焼け
  "DSC07563_icizbb": ["temple", "autumn"],          // 清水の舞台+紅葉夕焼け
  "DSC07546_gaplky": ["temple", "autumn"],          // 清水の舞台+紅葉夕焼け
  "DSC07393_xtp40k": ["temple", "night"],           // 仁王門+三重塔ライトアップ
  "DSC07386_vrsz1g": ["temple", "autumn", "night"], // 三重塔+紅葉ライトアップ
  "DSC07355_zyqovr": ["temple", "autumn", "night"], // 清水の舞台+紅葉ライトアップ
  "DSC07337_kaejdo": ["temple", "night"],           // 三重塔+月

  // ── 高知城 (高知県、6枚) ── 全て城
  "ekyaldwcry9gqiy9tgre": ["castle"],
  "yhenlvvvz5kucqldydfm": ["castle"],
  "z5dppj2tdaf1ovyjq3id": ["castle"],
  "pk5nouibsptedo8wds3h": ["castle"],
  "pkszsvhktqyiwlyfurkd": ["castle"],
  "w43utexm5kjyu54hducu": ["castle"],

  // ── 別府 (大分県、7枚) ── 全て地獄めぐり(温泉)
  "szm5n4mwwmmh3fksqukz": ["onsen"],   // 鬼石坊主地獄
  "yuufchifryqi13eyyoor": ["onsen"],   // 海地獄
  "qxfxsuorglm0r8fzfgcr": ["onsen"],   // 地獄系池
  "znmygcxoyxe7uihta2a3": ["onsen"],   // 血の池地獄
  "nhcofuhnbijxmqf7heop": ["onsen"],   // 白池地獄
  "bwtpdo3ycszgiokdrkqz": ["onsen"],   // 鬼石坊主地獄
  "nejr6pdgmudgjynjhpzl": ["onsen"],   // 龍巻地獄

  // ── 美幌峠 (北海道、11枚) ── 屈斜路湖の俯瞰
  "jlnmop3no0c6apanqg0j": ["lake", "mountain"],
  "dulixcwj07zpcjlhdmtv": ["lake", "mountain"],
  "w09z0y5dytwnhbqaa26n": ["lake", "mountain"],
  "dciohyawhu4uwppull42": ["lake", "mountain"],
  "dauymniifixeho9ewvaj": ["lake", "mountain"],
  "bwg4daxogde6yg99ahfc": ["lake", "mountain"],
  "bnbmrqj3s9ig3ap8yulh": ["lake", "mountain"],
  "isy0pekq31wadfzoukdb": ["lake", "mountain"],
  "bfkqyvkq33cnx9k98dx9": ["lake", "mountain"],
  "v6n5rruvjocwtqif5cej": ["lake", "mountain"],
  "ykop4xhde4uibnd3zotl": ["lake", "mountain"],

  // ── 新倉山浅間公園 (山梨県、8枚) ── 桜+富士山
  "wcrs6gq9eutte8fwrzpp": ["cherry", "mountain"],
  "sdjdpuhu1xmjqlyfu0ji": ["cherry", "mountain"],
  "flwkbyaadyjsauwndgll": ["cherry", "mountain"],
  "ubnattnp6rlf4wtv61mi": ["cherry", "mountain"],
  "lzabjelxserdjz9wmzig": ["cherry", "mountain"],
  "xatffycdhlinbpis36og": ["cherry", "mountain"],
  "mbubw3dtejisp0ng7ttz": ["cherry", "mountain"],
  "li8plarxiosywpp2qwq1": ["cherry", "mountain"],

  // ── 弘法山古墳 (長野県、11枚) ── 桜+松本市街+北アルプス
  "ewpcre6qnksncnu1ymem": ["cherry", "mountain"],
  "sosd9vi7tiwq8ezyvsaa": ["cherry", "mountain"],
  "otxag9j26cytaettnnhu": ["cherry", "mountain"],
  "wrfx6anvys7zbrfrjhmy": ["cherry", "mountain"],
  "olhsgzum3ivcgytg4ur2": ["cherry", "mountain"],
  "ulr12vkexneue5epkhkt": ["cherry", "mountain"],
  "xrehdxqbmffx6gn7ilh2": ["cherry", "mountain"],
  "rb1guenezzppmmwcoed6": ["cherry", "mountain"],
  "xojxmbgagtlp3oph82pt": ["cherry", "mountain"],
  "pslwa9g3czm5f2gj64s2": ["cherry", "mountain"],
  "xlvzqzimzksxzxfwkrll": ["cherry", "mountain"],

  // ── 湯布院 (大分県、1枚) ──
  "gcjxpyk0fxof7we3ytqo": ["urban"],   // 由布院駅

  // ── 阿寒 (北海道、10枚) ── 阿寒湖+温泉街+エゾシカ
  "k5ctrte2solhpgtl1gfi": ["lake", "mountain"],
  "pewpzn9x8dxwtdf8yety": ["lake", "mountain"],
  "h8i0rxmcioxwbnfagiqm": ["lake", "mountain"],
  "lyvcmp5qignj3j8b04e3": ["lake", "mountain", "animal"],   // エゾシカ+湖+船
  "evwlr6fgjoxbuaoshv3i": ["animal"],                       // エゾシカ
  "pjtr6rjgdlxvhxp8ehpr": ["urban", "lake"],                // 阿寒湖温泉街+夕景
  "s8tldtnav0mudikuyhci": ["urban", "lake"],                // アイヌコタン参道
  "pqj0meeyzbhve6mfb2q0": ["urban", "lake"],
  "vrl4wjhzjwabtd2xinc9": ["lake"],                         // 桟橋+ボート
  "h2vsed9dz1fj935lh9li": ["lake", "mountain"],

  // ── 横浜 (神奈川県、9枚) ── 港・夜景・赤レンガ・客船
  "roeiwcd2bexzyq5eswsn": ["urban"],                  // 赤レンガ倉庫
  "dyejili3mrrizyvpwcvb": ["urban"],
  "aa9zrjl0dcnlulqjilee": ["urban", "coastal"],       // 港+高速道
  "j3g8s2rcorimyusaf83i": ["urban", "coastal"],       // ベイブリッジ
  "nvlttty0qgchzstxo6fb": ["urban", "coastal"],       // みなとみらい+客船
  "xghhx4hetbdgvw69ou9g": ["urban"],                  // 高層ビル群
  "prfajod3kbdxntzhooxt": ["urban"],                  // 氷川丸
  "payoa5eewjukgzk7vrjk": ["coastal"],                // 大型客船
  "gj8s9sm7ixl9iz7aczew": ["urban"],                  // 都市俯瞰

  // ── 東京 (東京都、11枚) ── 東京タワー + ハリポタスタジオ
  "hhuf0fqsgs4qdztehnzb": ["urban"],                  // 東京タワー俯瞰
  "my7re28ckggxseludvlj": ["urban"],
  "n9wv3krjeebsash5zvxv": ["urban", "night"],         // 東京タワーライトアップ
  "irwultgwnqvfpj3ufrhq": ["urban"],                  // ハリポタクリスマス装飾
  "voty0hrw6k95t7cq2nmp": ["urban"],                  // ハリポタ騎士バス
  "fdatlwqk3m6b2auwxcra": ["urban"],                  // ハリポタ Privet Drive
  "wpnpqjmfgrpx0pkqq4wf": ["urban"],                  // ハグリッド小屋
  "lokxylhdsiai3w8cjy6e": ["urban"],
  "veheffiav3eqsnlyidg7": ["urban"],                  // オリバンダー杖屋
  "al0m8swfnbyrbkc9ebeo": ["urban"],                  // ホニーデュークス
  "n0e8xeyvaabkthqbjgoh": ["urban"],

  // ── 金沢 (石川県、7枚) ── 鼓門・武家屋敷・寿司・兼六園・茶屋街
  "tholpq2n9n3es1zbunl2": ["urban"],                  // 金沢駅鼓門
  "fvmfopoju9j1afeyfmfq": ["urban"],                  // 寿司屋
  "njkhpu1dsjnaqdpuibsl": ["autumn"],                 // 武家屋敷+紅葉
  "a7mrvz28s8bhljtvxerd": ["urban"],                  // 寿司
  "iqzmqcxvlmzmpxb3e8nl": ["autumn", "night"],        // 兼六園紅葉ライトアップ
  "vravjelowaeamknkqkte": ["urban"],                  // 21世紀美術館
  "zip572vkpw2oinqbodt9": ["autumn", "street"],       // 浅野川+紅葉

  // ── 宮古島 残り30枚 ──
  "ccthpmmrxzfv9fgctuws": ["coastal"],
  "asrmh4euv3ntt5saqm0o": ["coastal"],
  "zo1fxoj920zvxfgavwuo": ["urban"],         // ヤシ+カフェ
  "vnduczpwqmgjkhll1l0z": ["coastal"],
  "jwirovp2d1kqfae6gqti": ["coastal"],
  "l1ihzzfw2lkah7rim3hk": ["coastal"],
  "hfyo4tn30ahh2xz3asnn": ["coastal"],
  "lcfe4zz4xvxjzruda1yo": ["coastal"],
  "pprmxtxaj53r93mkk7f3": ["coastal"],
  "gcmokjrl4gjekujs3sws": ["coastal"],       // 来間大橋
  "akk660cretzdipzyhoz1": ["coastal"],
  "ccggglphvsgibbj9bdmn": ["coastal"],
  "e3kwo6gyrnbspcplkmnc": ["coastal"],
  "ksrpgxpsgmiffx3krp8n": ["coastal"],
  "iyxrkq7ojni4adbkd2id": ["coastal"],
  "oxgq7nub2ad0mixlkgdj": ["urban", "coastal"],   // 住宅街+海
  "eb6mwk1ahcoubidkfh36": ["coastal"],
  "k1eg8vwxkgjugoffr8mf": ["coastal"],
  "hx1ucufb7xc2hbcvpfsb": ["coastal"],
  "bti9ugmg2jr2874wglyy": ["coastal"],
  "yj9bzxco6ntjdxqfxvwe": ["coastal"],
  "uotk9tgqbswqr1ennalv": ["coastal"],
  "mztgcepivlstffevagwz": ["coastal"],
  "ovui6gb8bdpvlc2gd9gl": ["coastal"],
  "kgk6jnvbfx3wvqgjia9m": ["coastal"],         // 灯台
  "afjaenvla1eya7kiv5zh": ["coastal"],
  "oes9giyouydgsdqq0f4t": ["coastal"],         // クルーズ船+夕日
  "sgzeqvsvqk2whkqjlbbi": ["coastal"],         // 伊良部大橋
  "axgmmojhbauycrqe0ihk": ["coastal"],
  "jvxvv4qs8b5sot8hcaka": ["coastal"],

  // ── 沖縄 残り40枚 ──
  "mrrqu1cggsemlqpmivff": ["coastal"],
  "i09y2z1ym2i4gnccanrz": ["coastal"],         // 古宇利島ハートロック
  "uogey3f0zr0sqnd6hnhe": ["coastal"],
  "j0yqruzfnhlvo71uvqlw": ["coastal"],
  "ufnlccnqlf5uhtq11dng": ["coastal"],         // 古宇利大橋
  "ypfqwllaxnyzquznta8g": ["urban"],           // シーサーお守り
  "yz0zk0vhgpb9gindz10d": ["animal"],          // 美ら海イルカショー
  "fwufx8wdz5dzwyajob2n": ["animal"],
  "s91ox51yhpumogn8hkwo": ["animal"],          // ジンベエザメ
  "koq3wiap1lqqdthqltue": ["animal"],
  "i36rj6ku3zowegj99l2o": ["animal"],          // マンタ
  "fsbi0m8rqjnh3b5ip2ci": ["animal"],          // 巨大水槽
  "kx4tcd5ofly9wr00slek": ["urban", "night"],  // アメリカンビレッジ
  "eosimyutys8zgrwnolti": ["urban", "night"],
  "lk2f5q4sb8x8gtyetead": ["urban", "night"],
  "vcwbt8mzkznp8ky34awl": ["coastal"],         // 海洋博公園
  "o79k95rgx51w398bouzg": ["urban"],           // 万座毛VC
  "bg8qrozxyqvokbgmgcei": ["coastal"],
  "ybe2noyobnmhpnrgtboh": ["castle"],          // 城跡
  "zfxeserikfeqjzqe2skq": ["urban"],           // 玉泉洞看板
  "z8y0ijv4wdcxgwams241": ["urban"],           // 玉泉洞
  "ytopadczpa7puematekd": ["urban"],
  "prpernet3o52fo34dupj": ["urban"],
  "k52lizfrccqy0iebr2ow": ["urban"],
  "dmucdvrhjhjwvatwrfip": ["urban"],
  "xcpxauh33nsys4w3ij38": ["urban"],
  "qk9bh31p4bhspwavb7el": ["urban"],
  "yxotgv2k34lk3vxpacid": ["mountain"],        // ガンガラーの谷
  "gnvfynyo0rpwekzj1y3i": ["mountain"],        // ガジュマル
  "ujgluuxpb7v5wxzijeok": ["mountain"],
  "wnp3s6tlu7zatmiin3as": ["urban"],           // 洞窟内レストラン
  "wwa7xzb2qldnh7qwczci": ["urban"],           // カルビープラス
  "hjutoisviwwj6ulptodt": ["castle"],          // 首里城門
  "eun1he1u4mpcl3hjfpba": ["urban"],           // 那覇市街+夕日
  "gfznqpn18mawgeimrmyr": ["urban"],
  "jrirgyo3urvp49udusvg": ["urban"],
  "teo40vgijk8hodqm8871": ["castle"],          // 首里城朱塗り
  "h9setuefm4wxfu6udlrh": ["urban"],
  "c4mljbvi3zl6e9nxwlrz": ["castle", "urban"], // 首里城+那覇
  "vdmsartx9qcs9w3f0snu": ["castle"],          // 首里城歓会門

  // ── 中規模 loc サンプルベース全枚タグ付け ──
  // (各locで sample 1枚確認、その被写体を全枚に適用。
  //  混在性が高いと判明したloc(河口湖・小樽・姫路城等)はそのまま loc-fallback)

  // 高島公園(諏訪市) 9枚 → 全 castle (諏訪城跡)
  "bxjoxoiwkkfggxgokmwt": ["castle"],

  // 城山公園(松本市) 8枚 → 全 cherry (桜名所)
  "auyi7ohcpsmbozph6mqm": ["cherry"],

  // 安養寺 6枚 → 全 cherry (しだれ桜)
  "kgjfrzmhnnohh4p8m3z1": ["cherry"],

  // おはらい町・おかげ横丁 6枚 → 全 street (門前町)
  "dhwplqr8k5e49mis89hz": ["street"],

  // 松本城 5枚 → 全 castle
  "c0d1bsl50csyyr2xtugg": ["castle"],

  // 東福寺 5枚 → 全 temple+autumn (紅葉名所)
  "DSC07394_hhq8bw": ["temple", "autumn"],

  // 道後温泉 4枚 → 全 onsen (一部 night)
  "jizpq9o0ag6bt1nmynv4": ["onsen", "night"],

  // 河口湖 5枚: cherry+lake+mountain (富士+桜+湖の代表構図)
  "bsesdqubicdiilhcynyh": ["cherry", "lake", "mountain"],

  // 姫路城 5枚: castle主、紅葉混在
  "DSC07121_fxsgn9": ["castle", "autumn"],

  // 小樽 5枚: 海岸も(運河だけでなく)
  "heugkwts7mna2tb7okh0": ["coastal"],

  // ── 高島公園(諏訪市) 残り8 ──
  // 諏訪城跡(高島城)の桜名所、castle/cherry 混在
  "dlzyl3yborc12ny7pgj7": ["castle", "cherry"],
  "enr5eflfsbfkxmk62z2f": ["cherry"],
  "ub5ds8cw3v3m8nauhrbh": ["cherry"],
  "udypqbnoasbsniyzqmdh": ["cherry"],
  "gweuqgcwstcrgp59dy2i": ["cherry"],
  "qh8ijx3ahxvfceqbod9q": ["castle", "cherry"],
  "gedh17rb7jnkhoggpyvo": ["castle", "cherry"],
  "ugte2cqljbd0jpiewxhq": ["castle", "cherry"],

  // ── 城山公園(松本市) 残り7 ──
  // 桜名所だが北アルプス雪山遠望・松本市街パノラマも混在
  "dpr7n9mx0nvpum5agwz6": ["mountain"],
  "q0ao1opqvlyybzh7kxze": ["cherry"],
  "fcsv1vkctpknpmwub8za": ["urban"],
  "intvpotngzos9ze2jvwk": ["mountain", "river"],
  "rz53bjbwc2h2rbwitnix": ["cherry"],
  "ly9zzeznntibrldoeuge": ["cherry"],
  "rhk4iencv1010p62pzs5": ["cherry"],

  // ── 安養寺 残り5 ──
  // しだれ桜の名所
  "xcgllidnf2ywtsmqresk": ["cherry"],
  "nqrrvgoj5ck10qg7usmi": ["cherry"],
  "u5zfmndwlh41wxujug95": ["cherry"],
  "llnzgdasraciacen2knc": ["cherry", "temple"],
  "vu5jfzw94firs2g8fn3u": ["cherry"],

  // ── おはらい町・おかげ横丁 残り5 ──
  // 伊勢神宮の門前町、古い町並み中心。和菓子写真は無タグ
  "n0prvjjho2nf5ucrsoil": ["street"],
  "queyyiuttwaei8kiznbc": ["street"],
  "zq5o5jklm6eehcprk5w4": ["street"],
  "vxpu71gd5qnd3g1ey91f": ["street"],
  "emfqpctrgkvremxuzxvj": [],

  // ── 松本城 残り4 ──
  "u5izvsliyoqm6rr0xnzh": ["castle"],
  "m2gdhydxlmqu3itlta9v": ["castle", "cherry"],
  "wlcxf7dkoe8mkogxapjk": ["castle"],
  "noxbyner9j5rk4c0iknk": ["castle"],

  // ── 東福寺 残り4 ──
  // 紅葉名所
  "DSC07451_s1rhpd": ["temple", "autumn"],
  "DSC07425_zsvfno": ["temple", "autumn"],
  "DSC07417_dqlfwd": ["temple", "autumn"],
  "DSC07408_qarh4p": ["temple", "autumn"],

  // ── 河口湖 残り4 ──
  // 富士山+湖+桜の代表構図
  "jybdbusckxwnbjpxdz0f": ["lake", "mountain", "cherry"],
  "cqbfdh0j6ogl1zgsvk7s": ["lake", "mountain", "cherry"],
  "ygqe7593bqgt1ehxfxqa": ["lake", "mountain", "cherry"],
  "ccwsm7nphfmfas43dep3": ["lake", "mountain"],

  // ── 姫路城 残り4 ──
  "DSC07173_ogwql9": ["castle", "autumn"],
  "DSC07150_hlpfgz": ["castle"],
  "DSC07139_h55edw": ["castle"],
  "DSC07127_wo4ifg": ["castle", "autumn"],

  // ── 小樽 残り4 ──
  // 海岸線・夕景中心(運河ではない)
  "yh7e0rhvhnzzxj5esa5f": ["coastal"],
  "nk4jyu4dlzatzfgocyhr": ["coastal"],
  "wqg1jgss7ruytfu6hxad": ["coastal"],
  "yvecem5fnp26jy6ipjau": ["coastal"],

  // ── 道後温泉 残り3 ──
  "kbsiyecqjwzzyzurmddz": ["onsen", "night"],
  "t4witz3if3ox7tl0vips": ["onsen", "street"],
  "milp580j3b6uspkm7l8z": ["onsen"],

  // ── 白川郷 4 ──
  // 雪+合掌造り集落
  "qvsgt1aw6o4iwewvhmdc": ["snow", "rural"],
  "ake8ymyn7d0qnybyzihw": ["snow", "rural"],
  "y4l6gy5xwtz8d3fvvjb0": ["snow", "rural"],
  "vnvzv0ztfpwvvrvl5lfn": ["snow", "rural"],

  // ── 洞爺湖 4 ──
  // 湖中心、1枚は羊蹄山+草原
  "zsstczmlufechxukd0at": ["lake"],
  "zvcgkttawzj1drdzqhix": ["lake", "mountain"],
  "k8gyiyw1hosgg5ksnyqg": ["lake"],
  "lxw7vgube4hgznoacxvp": ["mountain", "rural"],

  // ── 松山城 4 ──
  // 1枚は松山市街パノラマ
  "wibx41ebmy2hxovs8wv1": ["castle"],
  "alukivsd5rv3gvo7c6sh": ["castle"],
  "ghweftqojjonv5zb6elq": ["urban", "coastal"],
  "pebdpfzj17kk1ssl62dc": ["castle"],

  // ── 室蘭 4 ──
  // 海岸+夕景+白鳥大橋
  "iywyqspjifr0f0c1n9eq": ["coastal"],
  "egmtecz5qmasffkjvxsr": ["coastal"],
  "tabp9sbfbulnaybmlpss": ["coastal", "urban"],
  "ta1vbaimv7ybmnjsnvcu": ["night", "coastal"],

  // ── さっぽろ雪まつり 4 ──
  // 雪像+祭り
  "usvnljzznwmqu93sftg1": ["snow", "festival"],
  "rqjb5xgid4vochyrrpie": ["snow", "festival"],
  "cgazaabjctzmga9yojla": ["snow", "festival"],
  "rj0whx4syklikykwjq6z": ["snow", "festival"],

  // ── 横山展望台 3 ──
  // 英虞湾のリアス海岸
  "bb924wbc5x1ny5c8hxob": ["coastal"],
  "ajf05ybnec7njy9ubaqi": ["coastal", "urban"],
  "jdobpyucdfhouqrswhec": ["coastal"],

  // ── 桂浜 3 ──
  // 海岸+龍馬像
  "x7zziur8nq5gx2vksgzr": ["coastal"],
  "p0z0vmdnqz4ptqiwgtwl": ["coastal"],
  "zxpnph1zw30vn5ce3hws": [],

  // ── 摩周湖 3 ──
  "hf5dr6ntuwcl9s9rawxe": ["lake", "mountain"],
  "yzckpd6gdubpyhudubyl": ["lake", "mountain"],
  "je8xkhzlsfbiqpryxdw5": ["lake", "mountain"],

  // ── 品川 3 ──
  // アクアスタジアムのイルカショー
  "bemqqcwb710hhvrp5k1d": ["animal"],
  "fzrsmhfr718rzcwptvws": ["animal"],
  "zvioi0jy5xl3y85lw2sa": ["animal"],

  // ── 金閣寺 2 ──
  "DSC07313_akiagf": ["temple"],
  "DSC07290_sz6x7s": ["temple", "autumn"],

  // ── 美唄 2 ──
  // 桜
  "zxgxiqctoaz0zhmqgqx2": ["cherry"],
  "pdatjgjwzr26f9bgdxmg": ["cherry"],

  // ── 福岡 2 ──
  "cherzayx1vksmmu12kfg": ["urban"],
  "zuytsm5uieakyzlj8mqa": [],

  // ── 登別 2 ──
  "ofe2ifgjpvsguty4udfh": ["cherry"],
  "qgcwoptede3vztwdxngv": ["coastal"],

  // ── 父母ヶ浜 2 ──
  // 日本のウユニ塩湖、夕景
  "qsn9a5qfmcav4ufkwehz": ["coastal"],
  "jpctlgps9n9yz7z2pefr": ["coastal"],

  // ── 法隆寺 2 ──
  "DSC07249_ijee7w": ["temple"],
  "DSC07241_kxqtal": ["temple"],

  // ── 梅林公園 2 ──
  // 梅は cherry でも flower-field でもない
  "ngy6lud2tgbztbyf4jke": [],
  "urycxqz4g4k3vra6gzzw": [],

  // ── 平等院鳳凰堂 2 ──
  "DSC07504_yxpbtk": ["temple"],
  "DSC07495_qorawr": ["temple"],

  // ── 北竜町 2 ──
  // 菜の花畑
  "rnlyiorswvgfwgyvu6uj": ["flower-field"],
  "jlgnjbrolezvatmiu38c": ["flower-field", "rural"],

  // ── 三段滝公園 2 ──
  // 1枚は川、1枚は滝
  "rxrntpbpqfl9adcm09oc": ["river"],
  "plljckjsj5zcuefw9pr8": ["waterfall"],

  // ── 1枚 loc 15箇所 ──
  // 鴨川シーワールド入口看板(シャチオブジェ): タグなし
  "pwrg5vqnmt1uxmh07jhb": [],
  // 駒つなぎの桜: 一本桜
  "bykxlizpdzufezqttzca": ["cherry"],
  // 長野県天空の楽園: 星空
  "bxt5gtw3rnuqxrx46ppl": ["night"],
  // 松本市新村: 雪山遠望+田園
  "zho91jbc7j0igcmatqb2": ["rural", "mountain"],
  // 中町通り(松本市): 商店街
  "osimrafqhppzchakgcco": ["street"],
  // 朝熊山展望台: 鳥羽湾+島々
  "rc4ukzba1zlsefhsfbz3": ["coastal"],
  // 夫婦岩: 注連縄+岩+夜
  "pby91yxkkrxjdaflielh": ["coastal", "shrine", "night"],
  // 清水寺周辺(産寧坂): 古い町並み夜景
  "DSC07601_cocitq": ["street", "night"],
  // 法隆寺 夢殿: 八角堂
  "DSC07266_ii8otn": ["temple"],
  // 鳴門海峡: 大橋+渦潮
  "iy3ljfosdadc2xabf8ly": ["coastal"],
  // 大鳴門橋
  "psuhikljduldvl7jmox7": ["coastal"],
  // 亀老山展望台: 来島海峡
  "b3uqemt85nz8gcxz4mrs": ["coastal"],
  // 来島海峡大橋
  "e55oicb01uyyhukixdss": ["coastal"],
  // にこ淵: 滝+エメラルドグリーンの淵
  "opof4iv0ksb7hyyxwd0g": ["waterfall", "river"],
  // 名越屋沈下橋: 仁淀川
  "cpucwtmknaneef6uw8en": ["river"],
};

// Collection slug → tag のマッピング(1コレクションは1〜複数タグでフィルタ)
export const COLLECTION_TAGS = {
  "cherry-blossoms": ["cherry"],
  "autumn-foliage": ["autumn"],
  "snow": ["snow"],
  "castles": ["castle"],
  "temples-shrines": ["temple", "shrine"],
  "hot-springs": ["onsen"],
  "coastal": ["coastal"],
  "night-views": ["night"],
  "waterfalls": ["waterfall"],
  "lakes": ["lake"],
};

// 写真IDからタグを取得(未タグ付け写真は空配列)
export function getPhotoTags(photoId) {
  return PHOTO_TAGS[photoId] || [];
}

// 写真がコレクションに属するか
export function photoMatchesCollection(photoId, collectionSlug) {
  const tags = PHOTO_TAGS[photoId];
  if (!tags) return false;
  const collectionTags = COLLECTION_TAGS[collectionSlug];
  if (!collectionTags) return false;
  return tags.some((t) => collectionTags.includes(t));
}
