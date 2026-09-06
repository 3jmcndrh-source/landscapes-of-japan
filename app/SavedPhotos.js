"use client";
/**
 * ③ お気に入り / 最近見た写真 の一覧。既存の「探す」エリアのタブとして出す。
 * 上部バーにボタンは増やさない。
 *
 * - 保存しているのは写真IDだけ (このブラウザの localStorage)。ログインも同期もしない。
 * - 表示は 写真ID → その言語の写真URL に解決する (photo-ref.js)。
 *   写真詳細ページが無い言語では 撮影地ページ + ?photo=ID を開く。
 *   言語を切り替えても同じ写真が二重に並ぶことはない (保存は言語に依存しない)。
 * - 削除された写真ID・壊れた保存データは local-store.js が読み出し時に落とす。
 * - 保存できないブラウザでは、一覧が空になるだけで他の表示は壊れない。
 */
import { useEffect, useState, useCallback } from "react";
import { ui } from "./ui-strings.js";
import { cldUrl } from "./data.js";
import { photoPath, photoLabel } from "./photo-ref.js";
import { getFavorites, getHistory, clearFavorites, clearHistory } from "./local-store.js";
import { track } from "./analytics.js";

function List({ title, ids, lang, onClear, entry }) {
  return (
    <div className="sv-block">
      <div className="sv-head">
        <h3 className="sv-h">{title}</h3>
        <span className="sv-n">{ids.length}</span>
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
              <li key={id}>
                <a
                  href={href}
                  className="sv-card"
                  onContextMenu={(e) => e.preventDefault()}
                  onClick={() => track("photo_open", { photo_id: id, entry }, id + "|" + entry)}
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

  return (
    <div className="sv">
      <List title={ui("favorites", lang)} ids={favs} lang={lang} entry="favorites"
        onClear={() => { clearFavorites(); sync(); }} />
      <List title={ui("recentlyViewed", lang)} ids={hist} lang={lang} entry="recent"
        onClear={() => { clearHistory(); sync(); }} />
      {/* 保存先を誤解させない短い注記。端末間で共有されないことを含意する */}
      <p className="sv-note">{ui("storedInThisBrowser", lang)}</p>
    </div>
  );
}
