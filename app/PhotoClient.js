"use client";
import { useState, useEffect } from "react";
import { TR, getPrefName, getLocName, cldUrl } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import TopNav from "./TopNav.js";
import { TAGS, getTagName } from "./tags.js";
import { richAlt } from "./title-keywords.js";
import LangBar from "./LangBar.js";
import { PHOTO_LANGS } from "./i18n-meta.js";
import { ambient } from "./photo-colors.js";
import { SEASONS, seasonLabel } from "./SeasonBar.js";

const OTHER_SEASONS_TITLE = {
  ja: "この場所の他の季節", en: "Other Seasons Here", zh: "此地的其他季节", "zh-tw": "此地的其他季節",
  ko: "이 장소의 다른 계절", de: "Andere Jahreszeiten hier", es: "Otras estaciones aquí", ar: "فصول أخرى هنا",
};
const SEASON_ICON = Object.fromEntries(SEASONS.map((s) => [s.key, s.icon]));

export default function PhotoClient({ lang, prefJp, locJp, photo, related, photoTags = [], similarPhotos = [], otherSeasons = [], prevHref = null, nextHref = null, position = null }) {
  const t = TR[lang] || TR.en;
  const prefSlug = PREF_SLUGS[prefJp];
  const locSlug = LOC_SLUGS[locJp];
  const prefLocal = getPrefName(prefJp, lang);
  const locLocal = getLocName(locJp, lang);

  const [imgW, setImgW] = useState(2400);
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) setImgW(1200);
  }, []);

  /* I-1: ←/→ keyboard navigation between sibling photos (same loc) */
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.key === "ArrowLeft" && prevHref) window.location.href = prevHref;
      else if (e.key === "ArrowRight" && nextHref) window.location.href = nextHref;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevHref, nextHref]);

  /* I-1: horizontal swipe on the hero figure navigates siblings */
  const swipeRef = useState(() => ({ x: 0, y: 0 }))[0];
  const onFigTouchStart = (e) => { swipeRef.x = e.touches[0].clientX; swipeRef.y = e.touches[0].clientY; };
  const onFigTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - swipeRef.x;
    const dy = e.changedTouches[0].clientY - swipeRef.y;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx > 0 && prevHref) window.location.href = prevHref;
      else if (dx < 0 && nextHref) window.location.href = nextHref;
    }
  };

  const photoUrl = cldUrl(photo.id, imgW);
  const altText = richAlt({ locName: locLocal, prefName: prefLocal, year: photo.year, locJp, lang });
  const amb = ambient(photo.id, 0.14);

  return (
    <div style={{ background: amb ? `radial-gradient(120% 58% at 50% 0%, ${amb}, transparent 62%) #0a0a0a` : "#0a0a0a", color: "#e8e4df", minHeight: "100vh", fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
      <div className="top-bar scrolled">
        <LangBar lang={lang} langs={PHOTO_LANGS} hrefFor={(c) => `/${c}/${prefSlug}/${locSlug}/${photo.id}`} />
      </div>
      <TopNav lang={lang} t={t} />

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 16px 80px" }}>
        <nav aria-label="breadcrumb" className="photo-breadcrumb-sticky" style={{ fontSize: 13, color: "rgba(232,228,223,.7)", marginBottom: 24, letterSpacing: ".05em" }}>
          <a href={`/${lang}`} style={{ color: "inherit", textDecoration: "none" }}>Landscapes of Japan</a>
          <span className="bc-sep" style={{ margin: "0 10px" }}>›</span>
          <a href={`/${lang}/${prefSlug}`} style={{ color: "inherit", textDecoration: "none" }}>{prefLocal}</a>
          <span className="bc-sep" style={{ margin: "0 10px" }}>›</span>
          <a href={`/${lang}/${prefSlug}/${locSlug}`} style={{ color: "inherit", textDecoration: "none" }}>{locLocal}</a>
          {photo.year && (<><span className="bc-sep" style={{ margin: "0 10px" }}>›</span><span>{photo.year}</span></>)}
        </nav>

        {prevHref && <a className="photo-nav-arrow left" href={prevHref} aria-label="Previous photo" rel="prev">‹</a>}
        {nextHref && <a className="photo-nav-arrow right" href={nextHref} aria-label="Next photo" rel="next">›</a>}
        {position && position.total > 1 && (
          <div className="photo-nav-count">{position.idx + 1} / {position.total}</div>
        )}
        <figure style={{ margin: 0, marginBottom: 32, position: "relative", background: "#111", borderRadius: 4, overflow: "hidden" }} onTouchStart={onFigTouchStart} onTouchEnd={onFigTouchEnd}>
          <img
            src={photoUrl}
            srcSet={`${cldUrl(photo.id, 800)} 800w, ${cldUrl(photo.id, 1200)} 1200w, ${cldUrl(photo.id, 2400)} 2400w, ${cldUrl(photo.id, 3840)} 3840w`}
            sizes="(max-width: 768px) 100vw, min(1400px, 96vw)"
            alt={altText}
            fetchPriority="high"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            style={{ width: "100%", height: "auto", display: "block", maxHeight: "85vh", objectFit: "contain", background: "#0a0a0a", viewTransitionName: "vt-hero" }}
          />
          <div className="cin-watermark" style={{ position: "absolute", bottom: 12, right: 16, fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: 14, color: "rgba(242,236,226,.55)", textShadow: "0 1px 4px rgba(0,0,0,.6)", pointerEvents: "none" }}>
            Landscapes of Japan
          </div>
        </figure>

        <header style={{ marginBottom: 48, padding: "0 8px" }}>
          <h1 style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: "clamp(28px,4vw,48px)", margin: 0, color: "#f2ece2", lineHeight: 1.1 }}>
            {locLocal}
          </h1>
          <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, color: "rgba(232,228,223,.55)", marginTop: 10, letterSpacing: ".05em" }}>
            <a href={`/${lang}/${prefSlug}`} style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid rgba(220,190,100,.3)" }}>
              {prefLocal}
            </a>
            {photo.year && (
              <span style={{ marginLeft: 16, fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: 16, color: "rgba(220,190,100,.7)" }}>
                {photo.year}
              </span>
            )}
            {lang !== "en" && getLocName(locJp, "en") !== locLocal && (
              <span style={{ marginLeft: 12, opacity: .55 }}>· {getLocName(locJp, "en")}</span>
            )}
          </div>

          {/* A13: フォトタグ表示 (この写真の被写体属性) */}
          {photoTags.length > 0 && (
            <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "rgba(220,190,100,.5)", textTransform: "uppercase", letterSpacing: ".15em", marginRight: 4 }}>
                {lang === "ja" ? "被写体" : lang === "ko" ? "피사체" : lang === "zh" ? "主题" : lang === "zh-tw" ? "主題" : "Subjects"}
              </span>
              {photoTags.map((tag) => (
                TAGS[tag] ? (
                  <a key={tag} href={`/${lang}/tags/${tag}`} style={{ background: "rgba(220,190,100,.10)", border: "1px solid rgba(220,190,100,.28)", borderRadius: 999, padding: "4px 12px", color: "#e8e4df", textDecoration: "none", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 11 }}>
                    #{getTagName(tag, lang)}
                  </a>
                ) : null
              ))}
            </div>
          )}
        </header>

        {related.length > 0 && (
          <section style={{ marginTop: 56, padding: "0 8px" }}>
            <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(220,190,100,.65)", marginBottom: 20 }}>
              {lang === "ja" ? `${locLocal}の他の写真` : `More from ${locLocal}`}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
              {related.map((p) => (
                <a
                  key={p.id}
                  href={`/${lang}/${prefSlug}/${locSlug}/${p.id}`}
                  className="cin-hcard"
                  onContextMenu={(e) => e.preventDefault()}
                  onClick={(e) => { const im = e.currentTarget.querySelector("img"); if (im) im.style.viewTransitionName = "vt-hero"; }}
                  style={{ position: "relative", aspectRatio: "3/2", overflow: "hidden", borderRadius: 4, background: "#111", display: "block" }}
                >
                  <img
                    src={cldUrl(p.id, 600)}
                    alt={`${locLocal} - ${prefLocal}`}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  {p.year && (
                    <div style={{ position: "absolute", top: 8, right: 8, fontSize: 11, color: "#f2ece2", background: "rgba(0,0,0,.6)", padding: "3px 8px", borderRadius: 3, fontFamily: "var(--font-playfair),serif", fontStyle: "italic", zIndex: 3 }}>
                      {p.year}
                    </div>
                  )}
                </a>
              ))}
            </div>
            <div style={{ marginTop: 24, textAlign: "center" }}>
              <a
                href={`/${lang}/${prefSlug}/${locSlug}`}
                style={{ display: "inline-block", padding: "10px 24px", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(220,190,100,.85)", border: "1px solid rgba(220,190,100,.35)", borderRadius: 999, textDecoration: "none" }}
              >
                {lang === "ja" ? `${locLocal} すべての写真` : `View all ${locLocal} photos`}
              </a>
            </div>
          </section>
        )}

        {/* T5: この場所の他の季節 (同loc・別シーズン) */}
        {otherSeasons.length > 0 && (
          <section style={{ marginTop: 56, padding: "0 8px" }}>
            <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(220,190,100,.65)", marginBottom: 20 }}>
              {OTHER_SEASONS_TITLE[lang] || OTHER_SEASONS_TITLE.en}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
              {otherSeasons.map((p) => (
                <a
                  key={`season-${p.id}`}
                  href={`/${lang}/${prefSlug}/${locSlug}/${p.id}`}
                  className="cin-hcard"
                  onContextMenu={(e) => e.preventDefault()}
                  onClick={(e) => { const im = e.currentTarget.querySelector("img"); if (im) im.style.viewTransitionName = "vt-hero"; }}
                  style={{ position: "relative", aspectRatio: "3/2", overflow: "hidden", borderRadius: 4, background: "#111", display: "block" }}
                >
                  <img
                    src={cldUrl(p.id, 600)}
                    alt={`${locLocal} - ${seasonLabel(p.season, lang)}`}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <div style={{ position: "absolute", top: 8, left: 8, display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#f2ece2", background: "rgba(0,0,0,.6)", padding: "3px 10px", borderRadius: 999, fontFamily: "var(--font-zen-kaku),sans-serif", zIndex: 3 }}>
                    <span style={{ fontFamily: "Apple Color Emoji,Segoe UI Emoji,sans-serif" }}>{SEASON_ICON[p.season]}</span>
                    {seasonLabel(p.season, lang)}
                  </div>
                  {p.year && (
                    <div style={{ position: "absolute", top: 8, right: 8, fontSize: 11, color: "#f2ece2", background: "rgba(0,0,0,.6)", padding: "3px 8px", borderRadius: 3, fontFamily: "var(--font-playfair),serif", fontStyle: "italic", zIndex: 3 }}>
                      {p.year}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* A13: 同タグの別 loc 写真 ("Similar style") */}
        {similarPhotos.length > 0 && (
          <section style={{ marginTop: 56, padding: "0 8px" }}>
            <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(220,190,100,.65)", marginBottom: 20 }}>
              {lang === "ja" ? "似た雰囲気の写真" : lang === "ko" ? "비슷한 분위기의 사진" : lang === "zh" ? "相似氛围的照片" : lang === "zh-tw" ? "相似氛圍的照片" : "Similar Style Photos"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
              {similarPhotos.map((p) => {
                const sLocSlug = LOC_SLUGS[p.loc];
                const sPrefSlug = PREF_SLUGS[p.pref];
                if (!sLocSlug || !sPrefSlug) return null;
                return (
                  <a
                    key={p.id}
                    href={`/${lang}/${sPrefSlug}/${sLocSlug}/${p.id}`}
                    className="cin-hcard"
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={(e) => { const im = e.currentTarget.querySelector("img"); if (im) im.style.viewTransitionName = "vt-hero"; }}
                    style={{ position: "relative", aspectRatio: "3/2", overflow: "hidden", borderRadius: 4, background: "#111", display: "block", textDecoration: "none" }}
                  >
                    <img
                      src={cldUrl(p.id, 600)}
                      alt={`${getLocName(p.loc, lang)} - ${getPrefName(p.pref, lang)}`}
                      loading="lazy"
                      draggable="false"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 12px 8px", background: "linear-gradient(to top, rgba(0,0,0,.85), transparent)", color: "#f2ece2", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 12 }}>
                      <div style={{ fontWeight: 500 }}>{getLocName(p.loc, lang)}</div>
                      <div style={{ opacity: .65, fontSize: 11, marginTop: 2 }}>{getPrefName(p.pref, lang)}</div>
                    </div>
                    {p.year && (
                      <div style={{ position: "absolute", top: 8, right: 8, fontSize: 11, color: "#f2ece2", background: "rgba(0,0,0,.6)", padding: "3px 8px", borderRadius: 3, fontFamily: "var(--font-playfair),serif", fontStyle: "italic", zIndex: 3 }}>
                        {p.year}
                      </div>
                    )}
                  </a>
                );
              })}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
