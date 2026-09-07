"use client";
/**
 * ⑥ 共有アルバム。
 *
 * - お気に入りから写真を選び、並べ替え、そのURLを共有する
 * - 受け取った側はログインなしで開け、Lightbox で鑑賞できる
 * - 受け取った側の既存のお気に入りは書き換えない
 * - 言語を切り替えても写真と順序は変わらない (URLに写真IDと順序が入っている)
 *
 * 保存は共有URLだけ。データベースもアカウントも要らない。
 * 「閲覧できる共有URL」であって、本人しか見られないものではない。
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { getLocName, getPrefName, cldUrl, lbWidth } from "./data.js";
import { photoById, photoPath, photoLabel } from "./photo-model.js";
import { PHOTO_DIMS } from "./photo-dims.js";
import { getFavorites } from "./local-store.js";
import { decodeAlbum, encodeAlbum, albumHref, ALBUM_MAX } from "./album-code.js";
import { ui } from "./ui-strings.js";
import { SITE_URL } from "./i18n-meta.js";
import PhotoCard from "./PhotoCard.js";
import Lightbox from "./Lightbox.js";
import SiteHeader from "./SiteHeader.js";
import CompareView from "./CompareView.js";
import { track } from "./analytics.js";

export default function AlbumClient({ lang }) {
  const [ids, setIds] = useState([]);
  const [favs, setFavs] = useState([]);
  const [ready, setReady] = useState(false);
  const [note, setNote] = useState("");
  const [lightbox, setLightbox] = useState(null);
  const [compare, setCompare] = useState(null);
  const [lbW, setLbW] = useState(2400);

  /* URL から読み、存在しない写真IDは落とす (削除済み・壊れたデータの扱い) */
  useEffect(() => {
    setLbW(lbWidth());
    try {
      const code = new URLSearchParams(window.location.search).get("a");
      const { ids: raw } = decodeAlbum(code || "");
      const alive = raw.filter((id) => photoById(id));
      setIds(alive);
      if (raw.length && alive.length < raw.length) {
        setNote(`${raw.length - alive.length}`);   /* 開けなかった枚数だけ短く示す */
      }
    } catch { /* URLが壊れていてもページは開く */ }
    setFavs(getFavorites());
    setReady(true);
  }, []);

  const photos = useMemo(
    () => ids.map((id) => photoById(id)).filter(Boolean),
    [ids]
  );

  const move = useCallback((id, dir) => {
    setIds((cur) => {
      const i = cur.indexOf(id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= cur.length) return cur;
      const next = [...cur];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }, []);

  const remove = useCallback((id) => setIds((cur) => cur.filter((x) => x !== id)), []);
  const add = useCallback((id) => {
    setIds((cur) => (cur.includes(id) || cur.length >= ALBUM_MAX ? cur : [...cur, id]));
  }, []);

  /* 共有: URL をコピー、または端末の共有シート */
  const share = useCallback(async () => {
    const url = SITE_URL + albumHref(lang, ids);
    const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
    track("album_share", { count: ids.length, method: canShare ? "share" : "copy" }, "album");
    if (canShare) {
      /* 共有シートのキャンセルは成功ではない。何も表示しない */
      try { await navigator.share({ url }); track("album_share_done", { method: "share" }, "album"); } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setNote(ui("linkCopied", lang));
      track("album_share_done", { method: "copy" }, "album");
    } catch {
      setNote(ui("copyFailed", lang));   /* コピーできていないのに成功と出さない */
    }
  }, [ids, lang]);

  /* URL を現在の内容に合わせる (履歴は増やさない) */
  useEffect(() => {
    if (!ready) return;
    try {
      const code = encodeAlbum(ids);
      const target = window.location.pathname + (code ? `?a=${encodeURIComponent(code)}` : "");
      if (target !== window.location.pathname + window.location.search) {
        window.history.replaceState(window.history.state || {}, "", target);
      }
    } catch {}
  }, [ids, ready]);

  const lbPhotos = useMemo(
    () => photos.map((p) => ({ id: p.id, url: cldUrl(p.id, lbW), pref: p.pref, loc: p.loc, year: p.year })),
    [photos, lbW]
  );

  const notInAlbum = favs.filter((id) => !ids.includes(id) && photoById(id));

  return (
    <div className="ex-page">
      <SiteHeader lang={lang} langHrefFor={(c) => albumHref(c, ids)} />
      <main className="ex-main">
        <div className="ex-bar">
          <span className="ex-count" aria-live="polite">{photos.length}</span>
          {photos.length > 0 && (
            <button type="button" className="ex-toggle" onClick={share}>{ui("shareAlbum", lang)}</button>
          )}
          {photos.length >= 2 && (
            <button type="button" className="ex-chip" onClick={() => { track("compare_open", { count: 2 }, "album"); setCompare(ids.slice(0, 2)); }}>
              {ui("compare", lang)}
            </button>
          )}
          <span className="sr-only" role="status" aria-live="polite">{note}</span>
        </div>

        {/* 共有URLであることを短く示す。「本人しか見られない」とは書かない */}
        <p className="al-note">{ui("storedInThisBrowser", lang)} · {ui("albumLimit", lang)} {ALBUM_MAX}</p>

        {ready && photos.length === 0 && <p className="ex-empty">{ui("noResults", lang)}</p>}

        {photos.length > 0 && (
          <ol className="al-list">
            {photos.map((p, i) => (
              <li key={p.id}>
                <PhotoCard
                  photo={p}
                  lang={lang}
                  dims={PHOTO_DIMS[p.id] || null}
                  sizes="(max-width: 600px) 45vw, 22vw"
                  widths="grid"
                  priority={i < 4}
                  onOpen={() => setLightbox(i)}
                />
                <div className="al-ops">
                  <button type="button" onClick={() => move(p.id, -1)} disabled={i === 0} aria-label={ui("moveUp", lang)}>↑</button>
                  <button type="button" onClick={() => move(p.id, 1)} disabled={i === photos.length - 1} aria-label={ui("moveDown", lang)}>↓</button>
                  <button type="button" onClick={() => remove(p.id)} aria-label={ui("unfavorite", lang)}>×</button>
                </div>
              </li>
            ))}
          </ol>
        )}

        {/* お気に入りから足す。受け取った側のお気に入りは書き換えない */}
        {notInAlbum.length > 0 && (
          <section className="al-add">
            <h2 className="ex-group-t">{ui("favorites", lang)}</h2>
            <ul className="ex-group-b">
              {notInAlbum.map((id) => (
                <li key={id}>
                  <button type="button" className="ex-chip" onClick={() => add(id)}
                    disabled={ids.length >= ALBUM_MAX}>
                    {photoLabel(id, lang)}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      {lightbox !== null && lbPhotos[lightbox] && (
        <Lightbox
          photos={lbPhotos}
          index={lightbox}
          closing={false}
          lang={lang}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox((i) => (i <= 0 ? lbPhotos.length - 1 : i - 1))}
          onNext={() => setLightbox((i) => (i >= lbPhotos.length - 1 ? 0 : i + 1))}
          labels={(p) => ({
            prefName: getPrefName(p.pref, lang),
            locName: p.loc ? getLocName(p.loc, lang) : "",
            alt: photoLabel(p.id, lang),
          })}
          photoHref={(p) => photoPath(p.id, lang)}
        />
      )}

      {compare && (
        <CompareView ids={compare} lang={lang} onClose={() => setCompare(null)} />
      )}
    </div>
  );
}
