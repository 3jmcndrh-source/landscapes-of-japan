/**
 * ④ サーバー側だけで使う実寸データの取り出し。
 *
 * photo-dims.js は 843枚分で 91KB ある。閲覧者の初期JSに載せたくないので、
 * ページに出す写真の分だけを取り出して props で渡す
 * (撮影地ページなら数十枚なので 1KB 未満になる)。
 *
 * このファイルを client component から import しないこと。
 */
import { PHOTO_DIMS } from "./photo-dims.js";

/** 写真の配列 → { id: [幅, 高さ] }。実寸が分からない写真は入れない */
export function dimsFor(photos) {
  const out = {};
  for (const p of photos || []) {
    const d = PHOTO_DIMS[p.id];
    if (d) out[p.id] = d;
  }
  return out;
}
