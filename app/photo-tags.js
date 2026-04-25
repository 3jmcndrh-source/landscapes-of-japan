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
