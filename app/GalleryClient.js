"use client";
/**
 * ⑤ 地域×テーマ ギャラリーの表示。
 *
 * 短い見出しと写真一覧が中心。説明文は増やさない。
 * 写真は初期HTMLに含まれ、写真詳細がある言語では実際のリンクになる。
 */
import { useCallback, useMemo, useRef, useState } from "react";
import { cldUrl, lbWidth } from "./data.js";
import PhotoImage from "./PhotoImage.js";
import Lightbox from "./Lightbox.js";
import SiteHeader from "./SiteHeader.js";
import { ui } from "./ui-strings.js";
import { track } from "./analytics.js";
import { useOriginRect, animateToRect } from "./useViewTransition.js";

export default function GalleryClient({
  lang, heading, count, items, prefHref, prefName, themeHref, themeName,
  locLinks = [], others = [], exploreHref,
}) {
  const [lightbox, setLightbox] = useState(null);
  const [closing, setClosing] = useState(false);
  const origin = useOriginRect();
  const cardRefs = useRef(new Map());
  const lbRef = useRef(null);

  const lbW = typeof window === "undefined" ? 2400 : lbWidth();
  const photos = useMemo(
    () => items.map((p) => ({ id: p.id, url: cldUrl(p.id, lbW), pref: p.pref, loc: p.loc, year: p.year })),
    [items, lbW]
  );

  const open = useCallback((i, id) => {
    const el = cardRefs.current.get(id);
    if (el) origin.capture(el);
    setLightbox(i); lbRef.current = i;
    track("photo_open", { photo_id: id, entry: "gallery" }, `${id}|gallery`);
  }, [origin]);

  const close = useCallback(() => {
    const i = lbRef.current;
    const id = i != null && items[i] ? items[i].id : null;
    const card = id ? cardRefs.current.get(id) : null;
    let rect = null;
    if (card) {
      const r = card.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) rect = r;
    }
    setClosing(true);
    animateToRect(document.querySelector(".cin-lb-inner img"), rect, () => { setLightbox(null); setClosing(false); });
  }, [items]);

  return (
    <div className="ex-page">
      <SiteHeader lang={lang} langHrefFor={(c) => `/${c}/gallery/${typeof window !== "undefined" ? window.location.pathname.split("/").pop() : ""}`} />
      <main className="ex-main">
        <nav aria-label={ui("breadcrumb", lang)} className="gal-bc">
          <a href={`/${lang}`}>Landscapes of Japan</a>
          {prefHref && <><span aria-hidden="true"> › </span><a href={prefHref}>{prefName}</a></>}
          <span aria-hidden="true"> › </span><a href={themeHref}>{themeName}</a>
        </nav>

        <header className="gal-head">
          <h1>{heading}</h1>
          <span className="gal-n">{count}</span>
        </header>

        <div className="ex-grid">
          {items.map((p, i) => {
            const inner = (
              <>
                <PhotoImage
                  id={p.id}
                  alt={`${p.locName} - ${p.prefName}`}
                  dims={p.dims}
                  sizes="(max-width: 600px) 45vw, (max-width: 1100px) 30vw, 22vw"
                  widths="grid"
                  priority={i < 4}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <span className="pc-loc">{p.locName}<span className="pc-pref">{p.prefName}</span></span>
                <span className="cin-watermark">Landscapes of Japan</span>
              </>
            );
            const common = {
              className: "pc",
              "data-pid": p.id,
              ref: (el) => { if (el) cardRefs.current.set(p.id, el); else cardRefs.current.delete(p.id); },
              onContextMenu: (e) => e.preventDefault(),
            };
            /* 写真詳細がある言語では実際のリンク。通常クリックだけ拡大表示にする */
            return p.href ? (
              <a key={p.id} {...common} href={p.href}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault(); open(i, p.id);
                }}>{inner}</a>
            ) : (
              <div key={p.id} {...common} role="button" tabIndex={0}
                onClick={() => open(i, p.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i, p.id); } }}
              >{inner}</div>
            );
          })}
        </div>

        {/* 関連する実在ページへの導線 */}
        <nav className="gal-links" aria-label={ui("byRegion", lang)}>
          {locLinks.map((l) => <a key={l.href} href={l.href}>{l.name}</a>)}
        </nav>
        <nav className="gal-links" aria-label={ui("collections", lang)}>
          {others.map((o) => <a key={o.href} href={o.href}>{o.name}</a>)}
          <a href={exploreHref}>{ui("explorePhotos", lang)}</a>
        </nav>
      </main>

      {lightbox !== null && photos[lightbox] && (
        <Lightbox
          photos={photos}
          index={lightbox}
          closing={closing}
          lang={lang}
          onClose={close}
          onPrev={() => setLightbox((i) => { const n = i <= 0 ? photos.length - 1 : i - 1; lbRef.current = n; return n; })}
          onNext={() => setLightbox((i) => { const n = i >= photos.length - 1 ? 0 : i + 1; lbRef.current = n; return n; })}
          originRect={origin.take()}
          labels={(p) => {
            const it = items.find((x) => x.id === p.id) || {};
            return { prefName: it.prefName || "", locName: it.locName || "", alt: `${it.locName || ""} - ${it.prefName || ""}` };
          }}
          photoHref={(p) => items.find((x) => x.id === p.id)?.href || null}
        />
      )}
    </div>
  );
}
