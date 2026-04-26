"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import { TR, getPrefName, getLocName, cldUrl } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { COLLECTIONS, COLLECTION_SLUGS, getCollectionName } from "./collections.js";
import TopNav from "./TopNav.js";

export default function CollectionClient({ lang, theme, photos, desc }) {
  const t = TR[lang] || TR.en;
  const name = getCollectionName(theme, lang);

  const [imgSizes, setImgSizes] = useState({ thumbW: 1200, lbW: 2400 });
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768)
      setImgSizes({ thumbW: 600, lbW: 800 });
  }, []);

  const allPhotos = useMemo(
    () => photos.map((p) => ({ ...p, url: cldUrl(p.id, imgSizes.lbW) })),
    [photos, imgSizes.lbW]
  );

  const [lightbox, setLightbox] = useState(null);
  const [lbClosing, setLbClosing] = useState(false);

  const openLightbox = useCallback(
    (idx) => setLightbox(idx),
    []
  );
  const closeLightbox = useCallback(() => {
    setLbClosing(true);
    setTimeout(() => { setLightbox(null); setLbClosing(false); }, 340);
  }, []);
  const lbPrev = useCallback(
    () => setLightbox((i) => (i <= 0 ? allPhotos.length - 1 : i - 1)),
    [allPhotos]
  );
  const lbNext = useCallback(
    () => setLightbox((i) => (i >= allPhotos.length - 1 ? 0 : i + 1)),
    [allPhotos]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, lbPrev, lbNext]);

  const cur = lightbox !== null ? allPhotos[lightbox] : null;

  // Group photos by prefecture for display
  const byPref = useMemo(() => {
    const m = new Map();
    for (const p of photos) {
      if (!m.has(p.pref)) m.set(p.pref, []);
      m.get(p.pref).push(p);
    }
    return [...m.entries()];
  }, [photos]);

  return (
    <div style={{ background: "#0a0a0a", color: "#e8e4df", minHeight: "100vh", fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
      <div className="top-bar scrolled">
        <div className="top-langs">
          {Object.entries(TR).map(([c]) => (
            <a key={c} href={`/${c}/collections/${theme}`} className={"top-lang-btn" + (lang === c ? " active" : "")}>
              {TR[c].name}
            </a>
          ))}
        </div>
        <TopNav lang={lang} t={t} />
      </div>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 80px" }}>
        <nav aria-label="breadcrumb" style={{ fontSize: 13, color: "rgba(232,228,223,.55)", marginBottom: 24, letterSpacing: ".05em" }}>
          <a href={`/${lang}`} style={{ color: "inherit", textDecoration: "none" }}>Landscapes of Japan</a>
          <span style={{ margin: "0 10px" }}>›</span>
          <span>{lang === "ja" ? "コレクション" : "Collections"}</span>
          <span style={{ margin: "0 10px" }}>›</span>
          <span>{name}</span>
        </nav>

        <header style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: "clamp(40px,6vw,68px)", margin: 0, color: "#f2ece2", lineHeight: 1 }}>
            {name}
          </h1>
          <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, color: "rgba(232,228,223,.55)", marginTop: 10, letterSpacing: ".05em" }}>
            {photos.length} {lang === "ja" ? "枚" : "photos"} · {byPref.length} {lang === "ja" ? "都道府県" : "prefectures"}
          </div>
        </header>

        {desc && (
          <p style={{ fontFamily: "var(--font-zen-kaku),'Noto Sans JP',sans-serif", fontSize: 17, lineHeight: 1.85, color: "rgba(232,228,223,.9)", marginBottom: 48, maxWidth: 820 }}>
            {desc}
          </p>
        )}

        <section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {photos.map((photo, i) => (
              <div
                key={photo.id + i}
                className="cin-hcard"
                onClick={() => openLightbox(i)}
                onContextMenu={(e) => e.preventDefault()}
                style={{ cursor: "pointer", position: "relative", aspectRatio: "3/2", overflow: "hidden", borderRadius: 4, background: "#111" }}
              >
                <img
                  src={cldUrl(photo.id, imgSizes.thumbW)}
                  alt={`${getLocName(photo.loc, lang)} - ${getPrefName(photo.pref, lang)} | ${name}`}
                  loading="lazy"
                  draggable="false"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 12px 8px", background: "linear-gradient(to top, rgba(0,0,0,.8), transparent)", color: "#f2ece2", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 12, letterSpacing: ".03em", pointerEvents: "none" }}>
                  {getLocName(photo.loc, lang)}
                  <span style={{ opacity: .7, marginLeft: 8 }}>{getPrefName(photo.pref, lang)}</span>
                </div>
                {photo.year && (
                  <div style={{ position: "absolute", top: 8, right: 8, fontSize: 11, color: "#f2ece2", background: "rgba(0,0,0,.6)", padding: "3px 8px", borderRadius: 3, fontFamily: "var(--font-playfair),serif", fontStyle: "italic", zIndex: 3 }}>
                    {photo.year}
                  </div>
                )}
                <div className="cin-watermark">Landscapes of Japan</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 72 }}>
          <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(220,190,100,.7)", marginBottom: 20 }}>
            {lang === "ja" ? "他のコレクション" : "Other Collections"}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
            {COLLECTION_SLUGS.filter((s) => s !== theme).map((s) => (
              <a key={s} href={`/${lang}/collections/${s}`} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(220,190,100,.15)", borderRadius: 8, padding: "14px 16px", color: "#e8e4df", textDecoration: "none", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14 }}>
                {getCollectionName(s, lang)}
              </a>
            ))}
          </div>
        </section>
      </main>

      {lightbox !== null && cur && (
        <div className={"cin-lb" + (lbClosing ? " closing" : "")} onClick={closeLightbox} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(10,10,10,.88)", backdropFilter: "blur(28px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button className="cin-lb-arrow left" onClick={(e) => { e.stopPropagation(); lbPrev(); }}>←</button>
          <div className="cin-lb-inner" onClick={(e) => { e.stopPropagation(); closeLightbox(); }} style={{ position: "relative" }}>
            <img src={cur.url} alt={`${getLocName(cur.loc, lang)} - ${getPrefName(cur.pref, lang)}`} draggable="false" style={{ maxWidth: "92vw", maxHeight: "88vh", objectFit: "contain" }} onContextMenu={(e) => e.preventDefault()} />
            <div className="cin-lb-wm">Landscapes of Japan</div>
          </div>
          <button className="cin-lb-arrow right" onClick={(e) => { e.stopPropagation(); lbNext(); }}>→</button>
        </div>
      )}
    </div>
  );
}
