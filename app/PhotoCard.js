"use client";
/**
 * ⑧ 写真カードの共通部品。統合探索・地図の一覧・ギャラリー・アルバムで使う。
 *
 * 守ること (既存の撮影地ページと同じ挙動にそろえる):
 *   - 写真詳細ページがある言語では実際の <a href> にする (クロールできる)
 *   - 通常の左クリックだけ止めて拡大表示、修飾キー・中クリックはブラウザ既定
 *   - 右クリック抑止は a / div の両方に付ける
 *   - カードの中にリンクやボタンを入れ子にしない (a の中に a を作らない)
 */
import { getLocName, getPrefName } from "./data.js";
import { photoPath, hasPhotoPages } from "./photo-model.js";
import PhotoImage from "./PhotoImage.js";
import { richAlt } from "./title-keywords.js";

export default function PhotoCard({
  photo, lang, dims = null, sizes, widths = "grid", priority = false,
  onOpen, showLoc = true, className = "",
}) {
  const locName = photo.loc ? getLocName(photo.loc, lang) : "";
  const prefName = getPrefName(photo.pref, lang);
  const alt = richAlt({ locName, prefName, year: photo.year, locJp: photo.loc, lang });
  const href = hasPhotoPages(lang) ? photoPath(photo.id, lang) : null;

  const img = (
    <>
      <PhotoImage
        id={photo.id}
        alt={alt}
        dims={dims}
        sizes={sizes}
        widths={widths}
        priority={priority}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {showLoc && locName && (
        <span className="pc-loc">
          {locName}
          <span className="pc-pref">{prefName}</span>
        </span>
      )}
      <span className="cin-watermark">Landscapes of Japan</span>
    </>
  );

  const stopPlainClick = (e) => {
    /* 修飾キー・中クリックはブラウザに任せる (新しいタブで開ける) */
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!onOpen) return;
    e.preventDefault();
    onOpen(photo);
  };

  const common = {
    "data-pid": photo.id,
    className: `pc ${className}`,
    onContextMenu: (e) => e.preventDefault(),
  };

  return href ? (
    <a {...common} href={href} onClick={stopPlainClick}>{img}</a>
  ) : (
    <div {...common} role={onOpen ? "button" : undefined} tabIndex={onOpen ? 0 : undefined}
      onClick={onOpen ? () => onOpen(photo) : undefined}
      onKeyDown={onOpen ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(photo); } } : undefined}
    >{img}</div>
  );
}
