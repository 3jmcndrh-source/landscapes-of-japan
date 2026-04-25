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
