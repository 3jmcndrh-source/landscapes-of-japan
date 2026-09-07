/**
 * ⑦ 「似た写真」の選び方。写真詳細ページ (サーバー側) だけで使う。
 *
 * 何を根拠にしているか:
 *   app/photo-similar.js — 写真そのものの画像特徴 (CLIP) から求めた近さ。
 *   タグの一致ではないので、タグが付いていない写真も、タグが違う写真も、
 *   見た目が近ければ出る。
 *
 * 規則:
 *   1. 同じ撮影地の写真は出さない。別枠 (この場所の写真 / 他の季節) があるため。
 *   2. 1つの撮影地から最大2枚。ビルド時に既にその上限で選んでいるが、
 *      同撮影地を除いた後に再度数え直す。
 *   3. 画像特徴が無い写真 (解析できなかったもの) は、従来のタグ+色の規則
 *      (related.js) にそのまま落とす。0件にはしない。
 *   4. どちらで選んだかを source として返す。画面では区別しないが、
 *      「画像特徴で選べているか」を検証できるようにしておく。
 *
 * このモジュールはサーバー側でしか読まないので、閲覧者の初期JSは増えない。
 */
import { PHOTO_SIMILAR } from "./photo-similar.js";
import { relatedPhotos } from "./related.js";

const PER_LOC_CAP = 2;

/**
 * @param {string} photoId  基準の写真
 * @param {string} locJp    基準の撮影地 (これと同じ撮影地は除く)
 * @param {Array}  all      { id, loc, pref, year } の全写真
 * @param {number} limit    枚数
 * @returns {{ items: Array, source: "image" | "tag" | "none" }}
 */
export function similarPhotos(photoId, locJp, all, limit = 6) {
  const byId = new Map(all.map((p) => [p.id, p]));
  const ranked = PHOTO_SIMILAR[photoId];

  if (ranked && ranked.length) {
    const out = [];
    const count = new Map();
    for (const [oid, score] of ranked) {
      if (out.length >= limit) break;
      const p = byId.get(oid);
      if (!p || p.loc === locJp) continue;          /* 同じ撮影地は別枠 */
      const n = count.get(p.loc) || 0;
      if (n >= PER_LOC_CAP) continue;
      out.push({ ...p, score });
      count.set(p.loc, n + 1);
    }
    if (out.length) return { items: out, source: "image" };
  }

  /* 画像特徴が無い写真だけ、従来の規則へ落とす */
  const fallback = relatedPhotos(photoId, locJp, all, limit);
  return { items: fallback, source: fallback.length ? "tag" : "none" };
}
