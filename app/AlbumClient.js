"use client";
/**
 * ⑥ 共有アルバム。
 *
 * - お気に入りから写真を選び、並べ替え、そのURLを共有する
 * - 受け取った側はログインなしで開け、Lightbox で鑑賞できる
 * - 受け取った側の既存のお気に入りは書き換えない
 * - 言語を切り替えても写真と順序は変わらない (URLに写真IDと順序が入っている)
 *
 * 編集した内容はこのブラウザの下書きにも保存する。
 * 共有URLを閲覧しただけでは、その端末の下書きを書き換えない。
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { getLocName, getPrefName, cldUrl, lbWidth } from "./data.js";
import { photoById, photoPath, photoLabel } from "./photo-model.js";
import { PHOTO_DIMS } from "./photo-dims.js";
import { getAlbumDraft, getFavorites, saveAlbumDraft } from "./local-store.js";
import { decodeAlbum, encodeAlbum, albumHref, ALBUM_MAX } from "./album-code.js";
import { ui } from "./ui-strings.js";
import { SITE_URL } from "./i18n-meta.js";
import PhotoCard from "./PhotoCard.js";
import Lightbox from "./Lightbox.js";
import SiteHeader from "./SiteHeader.js";
import CompareView from "./CompareView.js";
import { track } from "./analytics.js";

function updateAlbumUrl(ids) {
  const url = new URL(window.location.href);
  const code = encodeAlbum(ids);
  if (code) url.searchParams.set("a", code);
  else url.searchParams.delete("a");
  if (url.href !== window.location.href) {
    window.history.replaceState(window.history.state, "", url.href);
  }
}

export default function AlbumClient({ lang }) {
  const [ids, setIds] = useState([]);
  const [favs, setFavs] = useState([]);
  const [ready, setReady] = useState(false);
  const [savedHere, setSavedHere] = useState(false);
  const [note, setNote] = useState("");
  const [lightbox, setLightbox] = useState(null);
  const [compare, setCompare] = useState(null);
  const [lbW, setLbW] = useState(2400);

  /* 共有URLはその内容を優先。メニューから来たときだけ自分の下書きを開く。 */
  useEffect(() => {
    setLbW(lbWidth());
    try {
      const code = new URLSearchParams(window.location.search).get("a");
      const draft = getAlbumDraft();
      const raw = code === null ? draft : decodeAlbum(code).ids;
      const alive = raw.filter((id) => photoById(id));
      setIds(alive);
      setSavedHere(alive.length > 0 && alive.length === draft.length && alive.every((id, i) => id === draft[i]));
      if (code === null && alive.length) updateAlbumUrl(alive);
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

  /* 操作した時点で保存する。直後にページを離れても最後の変更を残す。 */
  const edit = useCallback((next) => {
    setIds(next);
    setSavedHere(saveAlbumDraft(next));
    try { updateAlbumUrl(next); } catch { /* 履歴を更新できない場合も共有ボタンは使える */ }
  }, []);

  const move = (index, dir) => {
    const dest = index + dir;
    if (dest < 0 || dest >= ids.length) return;
    const next = [...ids];
    [next[index], next[dest]] = [next[dest], next[index]];
    edit(next);
  };

  const add = (id) => {
    if (!ids.includes(id) && ids.length < ALBUM_MAX) edit([...ids, id]);
  };

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
            <button type="button" className="ex-chip" onClick={(event) => { event.currentTarget.focus({ preventScroll: true }); track("compare_open", { count: 2 }, "album"); setCompare(ids.slice(0, 2)); }}>
              {ui("compare", lang)}
            </button>
          )}
          <span className="sr-only" role="status" aria-live="polite">{note}</span>
        </div>

        <p className="al-note">
          {savedHere && photos.length > 0 && <>{ui("storedInThisBrowser", lang)} · </>}
          {ui("albumLimit", lang)} {ALBUM_MAX}
        </p>

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
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label={ui("moveUp", lang)}>↑</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === photos.length - 1} aria-label={ui("moveDown", lang)}>↓</button>
                  <button type="button" onClick={() => edit(ids.filter((id) => id !== p.id))} aria-label={ui("unfavorite", lang)}>×</button>
                </div>
              </li>
            ))}
          </ol>
        )}

        {/* お気に入りから足す。受け取った側のお気に入りは書き換えない */}
        {notInAlbum.length > 0 && (
          <section className="al-add">
            <h2 className="ex-group-t">{ui("favorites", lang)}</h2>
            <ul className="al-choices">
              {notInAlbum.map((id) => (
                <li key={id}>
                  <button type="button" className="ex-chip al-choice" onClick={() => add(id)}
                    disabled={ids.length >= ALBUM_MAX}>
                    <img src={cldUrl(id, 300)} width="72" height="54" alt="" loading="lazy" decoding="async" draggable="false" onContextMenu={(e) => e.preventDefault()} />
                    <span>{photoLabel(id, lang)}</span>
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
