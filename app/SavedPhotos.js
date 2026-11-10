"use client";
/**
 * ③ お気に入り / 最近見た写真 の一覧。既存の「探す」エリアのタブとして出す。
 * 上部バーにボタンは増やさない。
 *
 * - 保存しているのは写真IDだけ (このブラウザの localStorage)。ログインも同期もしない。
 * - 写真を押すと、他の一覧と同じビューアがその場で開く (前後はこの一覧の並び)。
 *   リンク先 (写真ID → その言語の写真URL、photo-ref.js) はそのまま残してあるので、
 *   新しいタブで開く操作は従来どおり使える。
 * - お気に入りからは、共有アルバムと2枚比較 (/album) へ進める。
 *   以前は /album へのリンクがサイト内のどこにも無かった。
 * - 削除された写真ID・壊れた保存データは local-store.js が読み出し時に落とす。
 * - 保存できないブラウザでは、一覧が空になるだけで他の表示は壊れない。
 */
import { useEffect, useState, useCallback } from "react";
import { ui } from "./ui-strings.js";
import { cldUrl } from "./data.js";
import { photoPath, photoLabel } from "./photo-ref.js";
import { getFavorites, getHistory, clearFavorites, clearHistory } from "./local-store.js";
import { albumHref, ALBUM_MAX } from "./album-code.js";
import { isPortrait } from "./photo-meta.js";
import { usePhotoViewer, isPlainClick } from "./usePhotoViewer.js";

function List({ title, ids, lang, onClear, entry, viewer, extra = null }) {
  return (
    <div className="sv-block">
      <div className="sv-head">
        <h3 className="sv-h">{title}</h3>
        <span className="sv-n">{ids.length}</span>
        {extra}
        {ids.length > 0 && (
          <button type="button" className="flt-clear" onClick={onClear}>{ui("clearAll", lang)}</button>
        )}
      </div>
      {ids.length === 0 ? (
        <p className="sv-empty">{ui("noResults", lang)}</p>
      ) : (
        <ul className="sv-grid">
          {ids.map((id) => {
            const href = photoPath(id, lang);
            if (!href) return null;
            return (
              <li key={id} className={isPortrait(id) ? "tall" : undefined}>
                <a
                  href={href}
                  className="sv-card"
                  data-pid={id}
                  onContextMenu={(e) => e.preventDefault()}
                  onClick={(e) => {
                    if (!isPlainClick(e)) return;
                    if (viewer.open(ids, id, e.currentTarget, entry)) e.preventDefault();
                  }}
                >
                  <img src={cldUrl(id, 300)} alt={photoLabel(id, lang)} loading="lazy" decoding="async" draggable="false" />
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function SavedPhotos({ lang }) {
  /* 保存内容はブラウザにしか無い。初期HTMLと食い違わないよう、描画後に読む */
  const [favs, setFavs] = useState([]);
  const [hist, setHist] = useState([]);
  const sync = useCallback(() => { setFavs(getFavorites()); setHist(getHistory()); }, []);
  useEffect(() => { sync(); }, [sync]);
  const viewer = usePhotoViewer(lang, { entry: "favorites" });
  /* ビューアの中でお気に入りを付け外しできるので、閉じたら読み直す */
  const wasOpen = viewer.isOpen;
  useEffect(() => { if (!wasOpen) sync(); }, [wasOpen, sync]);

  return (
    <div className="sv">
      <List title={ui("favorites", lang)} ids={favs} lang={lang} entry="favorites" viewer={viewer}
        onClear={() => { clearFavorites(); sync(); }}
        extra={favs.length > 0 ? (
          /* お気に入りを並べたアルバムを作る。共有URLの発行と2枚比較はその先にある */
          <a className="sv-album" href={albumHref(lang, favs.slice(0, ALBUM_MAX))}>
            {ui("album", lang)}{favs.length >= 2 ? ` · ${ui("compare", lang)}` : ""} →
          </a>
        ) : null}
      />
      <List title={ui("recentlyViewed", lang)} ids={hist} lang={lang} entry="recent" viewer={viewer}
        onClear={() => { clearHistory(); sync(); }} />
      {/* 保存先を誤解させない短い注記。端末間で共有されないことを含意する */}
      <p className="sv-note">{ui("storedInThisBrowser", lang)}</p>
      {viewer.element}
    </div>
  );
}
