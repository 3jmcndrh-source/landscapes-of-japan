"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import { TR, getPrefName, getLocName, cldUrl, lbWidth } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { COLLECTION_SLUGS, getCollectionName } from "./collections.js";
import TopNav from "./TopNav.js";
import Lightbox from "./Lightbox.js";
import Theater from "./Theater.js";
import { ui } from "./ui-strings.js";
import { photoLang } from "./i18n-meta.js";
import { SEASONS, seasonLabel } from "./SeasonBar.js";

/* T5: 月→季節 (photo-months.js の seasonOf と同義。月は server から photo.month で渡る) */
const seasonOf = (m) => (!m ? null : m <= 2 || m === 12 ? "winter" : m <= 5 ? "spring" : m <= 8 ? "summer" : "autumn");
const ALL_LABEL = { ja: "すべて", en: "All", zh: "全部", "zh-tw": "全部", ko: "전체", de: "Alle", es: "Todas", ar: "الكل" };

export default function CollectionClient({ lang, theme, photos, desc }) {
  const t = TR[lang] || TR.en;
  const name = getCollectionName(theme, lang);

  const [imgSizes, setImgSizes] = useState({ thumbW: 1200, lbW: 2400 });
  useEffect(() => {
    const lb = lbWidth();
    if (lb !== 2400) setImgSizes({ thumbW: lb === 800 ? 600 : 1200, lbW: lb });
  }, []);

  /* T5: 季節フィルタ */
  const [seasonFilter, setSeasonFilter] = useState(null);
  const seasonCounts = useMemo(() => {
    const c = {};
    for (const p of photos) { const s = seasonOf(p.month); if (s) c[s] = (c[s] || 0) + 1; }
    return c;
  }, [photos]);
  const visible = useMemo(
    () => (seasonFilter ? photos.filter((p) => seasonOf(p.month) === seasonFilter) : photos),
    [photos, seasonFilter]
  );

  const allPhotos = useMemo(
    () => visible.map((p) => ({ ...p, url: cldUrl(p.id, imgSizes.lbW) })),
    [visible, imgSizes.lbW]
  );

  const [lightbox, setLightbox] = useState(null);
  const [lbClosing, setLbClosing] = useState(false);
  const [theater, setTheater] = useState(false);

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
        </div>
        <TopNav lang={lang} t={t} />

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
          {photos.length > 1 && (
            <div style={{ marginTop: 18 }}>
              <button className="th-launch" onClick={() => setTheater(true)} aria-label={ui("theater", lang)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 21 12 6 21" /></svg>
                {ui("theater", lang)}
              </button>
            </div>
          )}
        </header>

        {desc && (
          <p style={{ fontFamily: "var(--font-zen-kaku),'Noto Sans JP',sans-serif", fontSize: 17, lineHeight: 1.85, color: "rgba(232,228,223,.9)", marginBottom: 48, maxWidth: 820 }}>
            {desc}
          </p>
        )}

        <section>
          {/* T5: 季節フィルタチップ (2季節以上ある場合のみ) */}
          {Object.keys(seasonCounts).length >= 2 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
              <button
                onClick={() => { setSeasonFilter(null); setLightbox(null); }}
                style={{
                  background: !seasonFilter ? "rgba(220,190,100,.22)" : "rgba(255,255,255,.04)",
                  border: !seasonFilter ? "1px solid rgba(220,190,100,.55)" : "1px solid rgba(255,255,255,.12)",
                  color: !seasonFilter ? "rgba(245,225,170,1)" : "rgba(232,228,223,.7)",
                  borderRadius: 999, padding: "6px 16px", cursor: "pointer",
                  fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 12, letterSpacing: ".05em",
                  transition: "all .3s",
                }}
              >
                {ALL_LABEL[lang] || ALL_LABEL.en} ({photos.length})
              </button>
              {SEASONS.filter((s) => seasonCounts[s.key]).map((s) => {
                const active = seasonFilter === s.key;
                return (
                  <button
                    key={s.key}
                    onClick={() => { setSeasonFilter(active ? null : s.key); setLightbox(null); }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      background: active ? "rgba(220,190,100,.22)" : "rgba(255,255,255,.04)",
                      border: active ? "1px solid rgba(220,190,100,.55)" : "1px solid rgba(255,255,255,.12)",
                      color: active ? "rgba(245,225,170,1)" : "rgba(232,228,223,.7)",
                      borderRadius: 999, padding: "6px 16px", cursor: "pointer",
                      fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 12, letterSpacing: ".05em",
                      transition: "all .3s",
                    }}
                  >
                    <span style={{ fontFamily: "Apple Color Emoji,Segoe UI Emoji,sans-serif" }}>{s.icon}</span>
                    {seasonLabel(s.key, lang)} ({seasonCounts[s.key]})
                  </button>
                );
              })}
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {visible.map((photo, i) => (
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
                  decoding="async"
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

        {/* A15: 注目ロケーション (このコレクションの主要な撮影地) */}
        {(() => {
          const photoLocs = [...new Set(photos.map((p) => p.loc).filter((l) => l && LOC_SLUGS[l]))];
          if (photoLocs.length === 0) return null;
          return (
            <section style={{ marginTop: 56 }}>
              <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(220,190,100,.7)", marginBottom: 20 }}>
                {lang === "ja" ? "注目の撮影地" : "Featured Locations"}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                {photoLocs.slice(0, 12).map((l) => {
                  const photo = photos.find((p) => p.loc === l);
                  const prefSlug = photo ? PREF_SLUGS[photo.pref] : null;
                  if (!prefSlug || !LOC_SLUGS[l]) return null;
                  return (
                    <a key={l} href={`/${lang}/${prefSlug}/${LOC_SLUGS[l]}`} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(220,190,100,.18)", borderRadius: 8, padding: "12px 16px", color: "#e8e4df", textDecoration: "none", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13 }}>
                      <div style={{ fontWeight: 500 }}>{getLocName(l, lang)}</div>
                      {photo && <div style={{ fontSize: 11, color: "rgba(232,228,223,.55)", marginTop: 2 }}>{getPrefName(photo.pref, lang)}</div>}
                    </a>
                  );
                })}
              </div>
            </section>
          );
        })()}

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
        <Lightbox
          photos={allPhotos}
          index={lightbox}
          closing={lbClosing}
          lang={lang}
          onClose={closeLightbox}
          onPrev={lbPrev}
          onNext={lbNext}
          labels={(p) => ({ prefName: getPrefName(p.pref, lang), locName: getLocName(p.loc, lang), alt: `${getLocName(p.loc, lang)} - ${getPrefName(p.pref, lang)} | ${name}` })}
          photoHref={(p) => (PREF_SLUGS[p.pref] && LOC_SLUGS[p.loc] && p.id ? `/${photoLang(lang)}/${PREF_SLUGS[p.pref]}/${LOC_SLUGS[p.loc]}/${p.id}` : null)}
        />
      )}
      {theater && (
        <Theater
          photos={visible}
          lang={lang}
          onClose={() => setTheater(false)}
          labels={(p) => ({ prefName: getPrefName(p.pref, lang), locName: getLocName(p.loc, lang) })}
        />
      )}
    </div>
  );
}
