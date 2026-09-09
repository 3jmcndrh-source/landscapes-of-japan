"use client";
/**
 * ④ 画像配信の共通部品。一覧・Lightbox・拡大・比較でこれを使う。
 *
 * やること:
 *   - srcset / sizes で「表示幅と画素密度に合う画像」をブラウザに選ばせる
 *   - width / height を必ず出して、読み込み前後で高さが動かないようにする
 *   - 画面外は遅延読み込み、最初に見える1枚だけ優先
 *   - 一覧で最大画像を取りに行かない (候補幅を用途ごとに絞る)
 *
 * やらないこと:
 *   - 公開済み画像URLの変更 (既存リンクを壊さない)
 *   - 画像の色・明るさ・構図の加工
 *   - 小さい画像を引き伸ばして「高画質」と呼ぶこと
 *     (等倍表示の基準は配信画像の実寸。photo-dims.js を見る)
 */
import { IMG_BASE, cldPlaceholder } from "./data.js";

/* 生成済みの配信幅。scripts/generate-variants.mjs と upload.mjs がこの5種類を作る。
   ここを増やすときは生成側も揃えること。 */
export const IMG_WIDTHS = [300, 600, 1200, 2400, 3840];

const srcFor = (id, w) => `${IMG_BASE}/${encodeURIComponent(id)}_w${w}.webp`;

/** 用途ごとの候補幅。一覧に 2400/3840 を混ぜないのが要点 */
export const WIDTH_SETS = {
  /* 一覧のサムネイル。1枚あたり最大でも 1200 まで */
  grid: [300, 600, 1200],
  /* 撮影地ページなど、やや大きめのカード */
  card: [600, 1200],
  /* Lightbox の全体表示 */
  view: [1200, 2400, 3840],
  /* 等倍・比較。実寸に近いものを選ばせる */
  full: [2400, 3840],
};

/**
 * @param id       写真ID
 * @param dims     [幅, 高さ] (photo-dims.js。無ければ縦横比を出さない)
 * @param sizes    CSS の sizes 属性。表示幅を正しく伝えるほど無駄な取得が減る
 * @param widths   WIDTH_SETS のキー、または幅の配列
 * @param priority 最初に見える重要な画像だけ true (同期デコードまで含む)
 * @param eager    画面に入っている画像。すぐ取りに行くが、デコードは非同期のまま。
 *                 大量に同期デコードさせると描画が詰まるので priority とは分ける。
 */
export default function PhotoImage({
  id, alt = "", dims = null, sizes = "100vw", widths = "grid",
  priority = false, eager = false, className, style, draggable = false, onContextMenu, ...rest
}) {
  const set = Array.isArray(widths) ? widths : (WIDTH_SETS[widths] || WIDTH_SETS.grid);
  const srcSet = set.map((w) => `${srcFor(id, w)} ${w}w`).join(", ");
  /* src は候補の中間を既定にする (srcset 非対応環境でも極端に重くならない) */
  const fallback = set[Math.min(1, set.length - 1)];

  /* 縦横比が分かるときだけ width/height を出す。分からないものに
     でっち上げの比率を入れない (レイアウトが逆にずれる) */
  const dim = Array.isArray(dims) && dims[0] > 0 && dims[1] > 0 ? { width: dims[0], height: dims[1] } : {};

  return (
    <img
      src={srcFor(id, fallback)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      {...dim}
      loading={priority || eager ? "eager" : "lazy"}
      fetchPriority={priority || eager ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      draggable={draggable ? undefined : "false"}
      onContextMenu={onContextMenu}
      className={className}
      style={style}
      {...rest}
    />
  );
}

/** 読み込み中の下地 (既存の LQIP をそのまま使う) */
export const placeholderUrl = (id) => cldPlaceholder(id);

/**
 * 等倍表示の基準になる配信画像の幅を選ぶ。
 * 実寸より大きい配信画像は無いので、実寸を超えない範囲で最大のものを返す。
 * 「引き伸ばして高画質」にしないための共通ルール。
 */
export function nativeWidthFor(dims) {
  const real = Array.isArray(dims) ? dims[0] : 0;
  if (!real) return 2400;
  const fit = [...IMG_WIDTHS].reverse().find((w) => w <= real);
  return fit || IMG_WIDTHS[0];
}
export const imageSrc = srcFor;
