"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import { TR, PREFECTURES, getPrefName, getLocName, getUrl, cldUrl } from "./data.js";
import { SITE_URL, HREFLANG } from "./i18n-meta.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import TopNav from "./TopNav.js";
import { getRegionOfPref, getSiblingPrefs } from "./regions.js";

export default function PrefClient({ lang, prefJp, desc, faqs, definition, highlights, quickAnswers }) {
  const pf = PREFECTURES.find((p) => p.pref === prefJp);
  const t = TR[lang] || TR.en;
  const prefLocal = getPrefName(prefJp, lang);
  const prefSlug = PREF_SLUGS[prefJp];

  const [lightbox, setLightbox] = useState(null);
  const [lbClosing, setLbClosing] = useState(false);
  const [imgSizes, setImgSizes] = useState({ thumbW: 1200, lbW: 2400 });
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768)
      setImgSizes({ thumbW: 600, lbW: 800 });
  }, []);

  const allPhotos = useMemo(() => {
    if (!pf) return [];
    return pf.photos.map((p) => ({
      url: getUrl(p, imgSizes.lbW),
      pref: prefJp,
      loc: p.loc || "",
      year: p.year || null,
    }));
  }, [pf, prefJp, imgSizes.lbW]);

  const openLightbox = useCallback(
    (url) => setLightbox(allPhotos.findIndex((p) => p.url === url)),
    [allPhotos]
  );
  const closeLightbox = useCallback(() => {
    setLbClosing(true);
    setTimeout(() => {
      setLightbox(null);
      setLbClosing(false);
    }, 340);
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

  if (!pf) return null;

  const uniqueLocs = [...new Set(pf.photos.map((p) => p.loc).filter(Boolean))];
  const cur = lightbox !== null ? allPhotos[lightbox] : null;

  return (
    <div style={{ background: "#0a0a0a", color: "#e8e4df", minHeight: "100vh", fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
      <div className={"top-bar scrolled"}>
        <div className="top-langs">
          {Object.entries(TR).map(([c]) => (
            <a
              key={c}
              href={`/${c}/${prefSlug}`}
              className={"top-lang-btn" + (lang === c ? " active" : "")}
            >
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
          <span>{prefLocal}</span>
        </nav>

        <header style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: "clamp(40px,6vw,68px)", margin: 0, color: "#f2ece2", lineHeight: 1 }}>
            {prefLocal}
          </h1>
          {lang !== "en" && getPrefName(prefJp, "en") !== prefLocal && (
            <div style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: 22, color: "rgba(232,228,223,.5)", marginTop: 8 }}>
              {getPrefName(prefJp, "en")}
            </div>
          )}
        </header>

        {/* A14 AI Overview対応: definition (○○とは) — 最上部、AI/SERPに引用されやすい簡潔な定義 */}
        {definition && (
          <div style={{ marginBottom: 32, padding: "20px 24px", background: "rgba(220,190,100,.05)", border: "1px solid rgba(220,190,100,.18)", borderRadius: 8, maxWidth: 820 }}>
            <p style={{ fontFamily: "var(--font-zen-kaku),'Noto Sans JP',sans-serif", fontSize: 16, lineHeight: 1.85, color: "rgba(232,228,223,.95)", margin: 0 }}>
              {definition}
            </p>
          </div>
        )}

        {desc && (
          <p style={{ fontFamily: "var(--font-zen-kaku),'Noto Sans JP',sans-serif", fontSize: 17, lineHeight: 1.85, color: "rgba(232,228,223,.9)", marginBottom: 32, maxWidth: 820 }}>
            {desc}
          </p>
        )}

        {/* A14 AI Overview対応: highlights (5項目) — リスト型はAI Overviewに引用されやすい */}
        {highlights && highlights.length > 0 && (
          <section style={{ marginBottom: 48, maxWidth: 820 }}>
            <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(220,190,100,.7)", marginBottom: 16 }}>
              {lang === "ja" ? "見どころ・特徴" : lang === "zh" ? "亮点与特色" : lang === "zh-tw" ? "亮點與特色" : lang === "ko" ? "하이라이트" : "Highlights"}
            </h2>
            <ul style={{ margin: 0, paddingLeft: 22, fontFamily: "var(--font-zen-kaku),'Noto Sans JP',sans-serif", fontSize: 15.5, lineHeight: 1.9, color: "rgba(232,228,223,.88)" }}>
              {highlights.map((h, i) => (
                <li key={i} style={{ marginBottom: 8 }}>{h}</li>
              ))}
            </ul>
          </section>
        )}

        {/* A14 AI Overview対応: quickAnswers (3 Q&A) — AI Overview / Featured Snippet 直撃用 */}
        {quickAnswers && quickAnswers.length > 0 && (
          <section style={{ marginBottom: 48, maxWidth: 820 }}>
            <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(220,190,100,.7)", marginBottom: 16 }}>
              {lang === "ja" ? "クイック情報" : lang === "zh" ? "快速问答" : lang === "zh-tw" ? "快速問答" : lang === "ko" ? "빠른 답변" : "Quick Answers"}
            </h2>
            <div>
              {quickAnswers.map((qa, i) => (
                <div key={i} style={{ marginBottom: 18, paddingBottom: 14, borderBottom: i < quickAnswers.length - 1 ? "1px solid rgba(220,190,100,.1)" : "none" }}>
                  <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 15, fontWeight: 500, color: "#f2ece2", marginBottom: 6 }}>
                    {qa.q}
                  </div>
                  <div style={{ fontFamily: "var(--font-zen-kaku),'Noto Sans JP',sans-serif", fontSize: 14, lineHeight: 1.75, color: "rgba(232,228,223,.82)" }}>
                    {qa.a}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {uniqueLocs.length > 0 && (
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(220,190,100,.7)", marginBottom: 20 }}>
              {lang === "ja" ? "撮影地" : "Locations"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              {uniqueLocs.map((loc) => {
                const locSlugV = LOC_SLUGS[loc];
                if (!locSlugV) return null;
                const count = pf.photos.filter((p) => p.loc === loc).length;
                return (
                  <a
                    key={loc}
                    href={`/${lang}/${prefSlug}/${locSlugV}`}
                    style={{
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(220,190,100,.15)",
                      borderRadius: 8,
                      padding: "14px 16px",
                      color: "#e8e4df",
                      textDecoration: "none",
                      fontFamily: "var(--font-zen-kaku),sans-serif",
                      transition: "all .3s",
                    }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{getLocName(loc, lang)}</div>
                    <div style={{ fontSize: 11, color: "rgba(232,228,223,.45)", marginTop: 4 }}>
                      {count} {lang === "ja" ? "枚" : "photos"}
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        <section>
          <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(220,190,100,.7)", marginBottom: 20 }}>
            {lang === "ja" ? `全ての写真 (${pf.photos.length})` : `All photos (${pf.photos.length})`}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {pf.photos.map((photo, i) => (
              <div
                key={photo.id + i}
                className="cin-hcard"
                onClick={() => openLightbox(getUrl(photo, imgSizes.lbW))}
                onContextMenu={(e) => e.preventDefault()}
                style={{ cursor: "pointer", position: "relative", aspectRatio: "3/2", overflow: "hidden", borderRadius: 4, background: "#111" }}
              >
                <img
                  src={getUrl(photo, imgSizes.thumbW)}
                  alt={(photo.loc ? getLocName(photo.loc, lang) + " - " : "") + prefLocal + " | Landscapes of Japan"}
                  loading="lazy"
                  draggable="false"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {photo.loc && (
                  <div style={{ position: "absolute", bottom: 8, left: 8, fontSize: 11, color: "#f2ece2", background: "rgba(0,0,0,.6)", padding: "3px 8px", borderRadius: 3, fontFamily: "var(--font-zen-kaku),sans-serif", zIndex: 3 }}>
                    {getLocName(photo.loc, lang)}
                  </div>
                )}
                <div className="cin-watermark">Landscapes of Japan</div>
              </div>
            ))}
          </div>
        </section>

        {faqs && faqs.length > 0 && (
          <section style={{ marginTop: 72 }}>
            <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(220,190,100,.7)", marginBottom: 20 }}>
              {lang === "ja" ? "よくある質問" : "FAQ"}
            </h2>
            <div>
              {faqs.map((f, i) => (
                <details
                  key={i}
                  style={{ borderBottom: "1px solid rgba(220,190,100,.12)", padding: "16px 0", cursor: "pointer" }}
                >
                  <summary style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 16, fontWeight: 500, color: "#f2ece2", listStyle: "none" }}>
                    {f.q}
                  </summary>
                  <div style={{ marginTop: 12, fontSize: 15, lineHeight: 1.75, color: "rgba(232,228,223,.8)", fontFamily: "var(--font-zen-kaku),sans-serif" }}>
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* A19: PageRank流通最適化 — 同地方の他pref へのリンク */}
        {(() => {
          const region = getRegionOfPref(prefJp);
          const siblings = getSiblingPrefs(prefJp);
          if (!region || siblings.length === 0) return null;
          const siblingsCovered = siblings
            .map((s) => ({ jp: s, pf: PREFECTURES.find((p) => p.pref === s), slug: PREF_SLUGS[s] }))
            .filter((x) => x.pf && x.slug);
          if (siblingsCovered.length === 0) return null;
          const regionLocal = lang === "ja" ? region.nameJa : region.nameEn;
          return (
            <section style={{ marginTop: 64 }}>
              <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(220,190,100,.7)", marginBottom: 20 }}>
                {lang === "ja" ? `${regionLocal}地方の他の都道府県` : `Other prefectures in ${regionLocal}`}
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {siblingsCovered.map(({ jp, pf, slug }) => (
                  <a
                    key={jp}
                    href={`/${lang}/${slug}`}
                    style={{ background: "rgba(220,190,100,.06)", border: "1px solid rgba(220,190,100,.2)", borderRadius: 999, padding: "8px 16px", color: "#e8e4df", textDecoration: "none", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13 }}
                  >
                    {getPrefName(jp, lang)}
                    <span style={{ marginLeft: 8, opacity: .55, fontSize: 11 }}>({pf.photos.length})</span>
                  </a>
                ))}
              </div>
              <div style={{ marginTop: 16 }}>
                <a href={`/${lang}/all-prefectures`} style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, color: "rgba(220,190,100,.85)", textDecoration: "none" }}>
                  {lang === "ja" ? "47都道府県すべてを見る →" : "View all 47 prefectures →"}
                </a>
              </div>
            </section>
          );
        })()}
      </main>

      {lightbox !== null && cur && (
        <div
          className={"cin-lb" + (lbClosing ? " closing" : "")}
          onClick={closeLightbox}
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(10,10,10,.88)", backdropFilter: "blur(28px)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <button className="cin-lb-arrow left" onClick={(e) => { e.stopPropagation(); lbPrev(); }}>←</button>
          <div className="cin-lb-inner" onClick={(e) => { e.stopPropagation(); closeLightbox(); }} style={{ position: "relative" }}>
            <img src={cur.url} alt={(cur.loc ? getLocName(cur.loc, lang) + " - " : "") + prefLocal + " | Landscapes of Japan"} draggable="false" style={{ maxWidth: "92vw", maxHeight: "88vh", objectFit: "contain" }} onContextMenu={(e) => e.preventDefault()} />
            <div className="cin-lb-wm">Landscapes of Japan</div>
          </div>
          <button className="cin-lb-arrow right" onClick={(e) => { e.stopPropagation(); lbNext(); }}>→</button>
        </div>
      )}
    </div>
  );
}
