"use client";
import { useState, useEffect } from "react";
import { TR, getPrefName, getLocName, cldUrl } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";

export default function PhotoClient({ lang, prefJp, locJp, photo, related }) {
  const t = TR[lang] || TR.en;
  const prefSlug = PREF_SLUGS[prefJp];
  const locSlug = LOC_SLUGS[locJp];
  const prefLocal = getPrefName(prefJp, lang);
  const locLocal = getLocName(locJp, lang);

  const [imgW, setImgW] = useState(2400);
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) setImgW(1200);
  }, []);

  const photoUrl = cldUrl(photo.id, imgW);
  const altText = `${locLocal} - ${prefLocal}${photo.year ? ` (${photo.year})` : ""} | Landscapes of Japan`;

  return (
    <div style={{ background: "#0a0a0a", color: "#e8e4df", minHeight: "100vh", fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
      <div className="top-bar scrolled">
        <div className="top-langs">
          {Object.entries(TR).map(([c]) => (
            <a
              key={c}
              href={`/${c}/${prefSlug}/${locSlug}/${photo.id}`}
              className={"top-lang-btn" + (lang === c ? " active" : "")}
            >
              {TR[c].name}
            </a>
          ))}
        </div>
        <div className="top-nav">
          <a className="top-nav-link" href={`/${lang}/${prefSlug}/${locSlug}`}>← {locLocal}</a>
        </div>
      </div>

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 16px 80px" }}>
        <nav aria-label="breadcrumb" style={{ fontSize: 13, color: "rgba(232,228,223,.55)", marginBottom: 24, letterSpacing: ".05em", padding: "0 8px" }}>
          <a href={`/${lang}`} style={{ color: "inherit", textDecoration: "none" }}>Landscapes of Japan</a>
          <span style={{ margin: "0 10px" }}>›</span>
          <a href={`/${lang}/${prefSlug}`} style={{ color: "inherit", textDecoration: "none" }}>{prefLocal}</a>
          <span style={{ margin: "0 10px" }}>›</span>
          <a href={`/${lang}/${prefSlug}/${locSlug}`} style={{ color: "inherit", textDecoration: "none" }}>{locLocal}</a>
          {photo.year && (<><span style={{ margin: "0 10px" }}>›</span><span>{photo.year}</span></>)}
        </nav>

        <figure style={{ margin: 0, marginBottom: 32, position: "relative", background: "#111", borderRadius: 4, overflow: "hidden" }}>
          <img
            src={photoUrl}
            alt={altText}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            style={{ width: "100%", height: "auto", display: "block", maxHeight: "85vh", objectFit: "contain", background: "#0a0a0a" }}
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
                  style={{ position: "relative", aspectRatio: "3/2", overflow: "hidden", borderRadius: 4, background: "#111", display: "block" }}
                >
                  <img
                    src={cldUrl(p.id, 600)}
                    alt={`${locLocal} - ${prefLocal}`}
                    loading="lazy"
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
      </main>
    </div>
  );
}
