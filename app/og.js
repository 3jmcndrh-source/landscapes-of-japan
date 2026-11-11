/**
 * 共有用の画像 (リンクを LINE / X / Slack などに貼ったときに出る画像) の指定を1か所にまとめる。
 * 各ページの generateMetadata から使う。**サーバー側専用** (photo-dims.js を読むので、
 * client component から import しないこと)。
 *
 * 画像は scripts/generate-og-images.mjs が作る {id}_og.jpg (1200×630 の JPEG)。
 * 以前は写真詳細とコレクションだけが画像を持ち、しかも WebP を指していた。
 * 都道府県・撮影地・ギャラリー・一覧ページには画像の指定そのものが無かった。
 */
import { IMG_BASE } from "./data.js";
import { PHOTO_DIMS } from "./photo-dims.js";

/** サイト全体の共有用画像 (特定の写真に結び付かないページ用) */
const SITE_IMAGE = `${IMG_BASE}/og.jpg`;

export const ogUrl = (id) => `${IMG_BASE}/${encodeURIComponent(id)}_og.jpg`;

/**
 * そのページの表紙にする1枚。横位置の最初の写真を選ぶ
 * (共有用画像は横長なので、縦位置の写真だと大きく切ることになる)。
 * 横位置が1枚も無ければ最初の写真。写真が無ければ null (→ サイト全体の画像)。
 */
export function coverId(photos) {
  const list = (photos || []).filter((p) => p && p.id);
  const wide = list.find((p) => { const d = PHOTO_DIMS[p.id]; return d && d[0] > d[1]; });
  return (wide || list[0])?.id || null;
}

/**
 * metadata に渡す画像の指定。
 *   const img = shareImages(coverId(photos), "知床 - 北海道");
 *   openGraph: { ..., images: img.og }, twitter: { card: "summary_large_image", ..., images: img.tw }
 */
export function shareImages(id, alt = "Landscapes of Japan") {
  const url = id ? ogUrl(id) : SITE_IMAGE;
  return {
    og: [{ url, width: 1200, height: 630, type: "image/jpeg", alt }],
    tw: [url],
  };
}
