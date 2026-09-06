/**
 * ⑥ 関連写真の選び方。写真詳細ページ (サーバー側) だけで使う。
 *
 * 直したかったこと:
 *   これまでは「共通タグの数」だけで並べていたので、同点のときは data.js の
 *   並び順そのままになり、上位6枚が全部同じ撮影地になっていた。
 *   (例: 知床の鳥 → 似た写真6枚すべて札幌)
 *
 * いまの規則 (全写真に共通。写真ごとの手調整や例外表は持たない):
 *   1. 候補は「共通タグが1つ以上ある写真」だけ。現在の写真と同じ撮影地は
 *      別枠 (この場所の他の季節) なので除く。タグが重ならない写真は入れない。
 *   2. 並びは 共通タグ数 → 色の近さ (photo-palette.js のバケット占有率の重なり)
 *      → 撮影地名 で決める。同点でデータ順に流れないようにする。
 *   3. 1つの撮影地からは最大 2枚 (6枚表示のとき)。偏りを抑える共通ルール。
 *   4. 候補が少なくて枠が埋まらないときは、上限を 2 → 3 → 無制限 と段階的に
 *      緩める。それでも足りなければ少ない枚数で出す。無関係な写真で埋めない。
 *
 * 色データはサーバー側で読むだけなので、関係のないページの初期JSは増えない。
 */
import { PHOTO_TAGS } from "./photo-tags.js";
import { PHOTO_PALETTE } from "./photo-palette.js";

/** 色の近さ 0〜1。共通する色バケットの占有率の重なり (少ない方の合計) */
function colorOverlap(idA, idB) {
  const a = PHOTO_PALETTE[idA]?.b, b = PHOTO_PALETTE[idB]?.b;
  if (!a || !b) return 0;
  let sum = 0;
  for (const k of Object.keys(a)) if (b[k]) sum += Math.min(a[k], b[k]);
  return sum;
}

const perLocCap = (limit) => Math.max(1, Math.ceil(limit / 3)); // 6枚なら2枚まで

/**
 * @param photoId  いま見ている写真
 * @param locJp    いま見ている撮影地 (同locは除外する)
 * @param all      { id, loc, pref, ... } の全写真
 * @param limit    最大枚数
 */
export function relatedPhotos(photoId, locJp, all, limit = 6) {
  const tags = PHOTO_TAGS[photoId] || [];
  if (!tags.length) return [];

  const cands = [];
  for (const o of all) {
    if (o.id === photoId || o.loc === locJp) continue;
    const shared = (PHOTO_TAGS[o.id] || []).filter((t) => tags.includes(t)).length;
    if (!shared) continue;
    cands.push({ ...o, shared, color: colorOverlap(photoId, o.id) });
  }
  if (!cands.length) return [];

  cands.sort((a, b) =>
    b.shared - a.shared ||
    b.color - a.color ||
    String(a.loc).localeCompare(String(b.loc)) ||
    String(a.id).localeCompare(String(b.id))
  );

  // 撮影地の上限を段階的に緩めながら埋める
  const picked = [];
  const taken = new Set();
  const count = new Map();
  for (const cap of [perLocCap(limit), perLocCap(limit) + 1, Infinity]) {
    for (const c of cands) {
      if (picked.length >= limit) break;
      if (taken.has(c.id)) continue;
      const n = count.get(c.loc) || 0;
      if (n >= cap) continue;
      picked.push(c);
      taken.add(c.id);
      count.set(c.loc, n + 1);
    }
    if (picked.length >= limit) break;
  }
  return picked;
}
