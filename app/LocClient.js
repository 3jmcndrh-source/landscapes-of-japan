"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import { TR, PREFECTURES, getPrefName, getLocName, getUrl } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { COLLECTIONS, COLLECTION_SLUGS, getCollectionName } from "./collections.js";
import { TAGS, TAG_SLUGS, getTagName } from "./tags.js";
import { TECHNIQUES, TECHNIQUE_SLUGS, getTechniqueName } from "./techniques.js";
import { POSTS, getPostTitle } from "./content/blog/posts.js";
import { getLocInfo } from "./loc-info.js";
import TopNav from "./TopNav.js";
import { getRegionOfPref, getSiblingPrefs } from "./regions.js";
import Weather from "./Weather.js";

export default function LocClient({ lang, prefJp, locJp, desc, faqs, definition, highlights, quickAnswers }) {
  const pf = PREFECTURES.find((p) => p.pref === prefJp);
  const t = TR[lang] || TR.en;
  const prefSlug = PREF_SLUGS[prefJp];
  const locSlug = LOC_SLUGS[locJp];
  const prefLocal = getPrefName(prefJp, lang);
  const locLocal = getLocName(locJp, lang);

  const [lightbox, setLightbox] = useState(null);
  const [lbClosing, setLbClosing] = useState(false);
  const [imgSizes, setImgSizes] = useState({ thumbW: 1200, lbW: 2400 });
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768)
      setImgSizes({ thumbW: 600, lbW: 800 });
  }, []);

  const photos = useMemo(() => {
    if (!pf) return [];
    return pf.photos.filter((p) => p.loc === locJp);
  }, [pf, locJp]);

  const allPhotos = useMemo(
    () =>
      photos.map((p) => ({
        url: getUrl(p, imgSizes.lbW),
        pref: prefJp,
        loc: locJp,
        year: p.year || null,
      })),
    [photos, prefJp, locJp, imgSizes.lbW]
  );

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

  const cur = lightbox !== null ? allPhotos[lightbox] : null;
  const siblings = pf.photos
    .map((p) => p.loc)
    .filter((l) => l && l !== locJp)
    .filter((l, i, arr) => arr.indexOf(l) === i);

  return (
    <div style={{ background: "#0a0a0a", color: "#e8e4df", minHeight: "100vh", fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
      <div className="top-bar scrolled">
        <div className="top-langs">
          {Object.entries(TR).map(([c]) => (
            <a
              key={c}
              href={`/${c}/${prefSlug}/${locSlug}`}
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
          <a href={`/${lang}/${prefSlug}`} style={{ color: "inherit", textDecoration: "none" }}>{prefLocal}</a>
          <span style={{ margin: "0 10px" }}>›</span>
          <span>{locLocal}</span>
        </nav>

        <header style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: "clamp(40px,6vw,68px)", margin: 0, color: "#f2ece2", lineHeight: 1 }}>
            {locLocal}
          </h1>
          <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 15, color: "rgba(232,228,223,.55)", marginTop: 10, letterSpacing: ".05em" }}>
            {prefLocal}{lang !== "en" && getLocName(locJp, "en") !== locLocal && (
              <span style={{ marginLeft: 12, opacity: .6 }}>· {getLocName(locJp, "en")}</span>
            )}
          </div>
          {pf?.lat && pf?.lng && (
            <div style={{ marginTop: 20 }}>
              <Weather lat={pf.lat} lng={pf.lng} lang={lang} />
            </div>
          )}
        </header>

        {/* 概要説明 (definition優先、なければ desc にフォールバック)
            以前は両方表示していたが内容が重複するため一本化 (desc は SEO meta/schema で使用) */}
        {(definition || desc) && (
          <div style={{ marginBottom: 32, padding: "20px 24px", background: "rgba(220,190,100,.05)", border: "1px solid rgba(220,190,100,.18)", borderRadius: 8, maxWidth: 820 }}>
            <p style={{ fontFamily: "var(--font-zen-kaku),'Noto Sans JP',sans-serif", fontSize: 16, lineHeight: 1.85, color: "rgba(232,228,223,.95)", margin: 0 }}>
              {definition || desc}
            </p>
          </div>
        )}

        {/* A14: highlights (5項目) */}
        {highlights && highlights.length > 0 && (
          <section style={{ marginBottom: 40, maxWidth: 820 }}>
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

        {/* A14: quickAnswers (3 Q&A) */}
        {quickAnswers && quickAnswers.length > 0 && (
          <section style={{ marginBottom: 40, maxWidth: 820 }}>
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

        <section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {photos.map((photo, i) => (
              <div
                key={photo.id + i}
                className="cin-hcard"
                onClick={() => openLightbox(getUrl(photo, imgSizes.lbW))}
                onContextMenu={(e) => e.preventDefault()}
                style={{ cursor: "pointer", position: "relative", aspectRatio: "3/2", overflow: "hidden", borderRadius: 4, background: "#111" }}
              >
                <img
                  src={getUrl(photo, imgSizes.thumbW)}
                  alt={locLocal + " - " + prefLocal + " | Landscapes of Japan"}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
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

        {/* 実用情報 (#10): アクセス・駐車場・料金・所要時間・ベスト時間帯 */}
        {(() => {
          const info = getLocInfo(locJp);
          if (!info) return null;
          const labels = {
            access:   { ja: "アクセス", en: "Access" },
            parking:  { ja: "駐車場", en: "Parking" },
            fee:      { ja: "料金", en: "Admission" },
            duration: { ja: "所要時間", en: "Duration" },
            bestTime: { ja: "ベスト時間帯", en: "Best Time" },
          };
          const fields = ["access", "parking", "fee", "duration", "bestTime"];
          const isJa = lang === "ja";
          return (
            <section style={{ marginTop: 56, marginBottom: 24, padding: "24px 28px", background: "rgba(220,190,100,.06)", border: "1px solid rgba(220,190,100,.2)", borderRadius: 8 }}>
              <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(220,190,100,.8)", marginBottom: 16 }}>
                {lang === "ja" ? "実用情報" : "Practical Information"}
              </h2>
              <dl style={{ margin: 0, fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, lineHeight: 1.7 }}>
                {fields.map((f) => (
                  <div key={f} style={{ display: "grid", gridTemplateColumns: "min-content 1fr", gap: 18, marginBottom: 10 }}>
                    <dt style={{ minWidth: 100, color: "rgba(220,190,100,.85)", fontWeight: 500, whiteSpace: "nowrap" }}>
                      {labels[f][isJa ? "ja" : "en"]}
                    </dt>
                    <dd style={{ margin: 0, color: "rgba(232,228,223,.92)" }}>
                      {info[f][isJa ? "ja" : "en"]}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })()}

        {/* faqs はクイック情報と内容が重複するため UI から削除。
            データは FAQPage JSON-LD schema 用にサーバ側で使用 */}

        {siblings.length > 0 && (
          <section style={{ marginTop: 72 }}>
            <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(220,190,100,.7)", marginBottom: 20 }}>
              {lang === "ja" ? `${prefLocal}の他の場所` : `More in ${prefLocal}`}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              {siblings.map((loc) => {
                const slugV = LOC_SLUGS[loc];
                if (!slugV) return null;
                const cnt = pf.photos.filter((p) => p.loc === loc).length;
                return (
                  <a
                    key={loc}
                    href={`/${lang}/${prefSlug}/${slugV}`}
                    style={{
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(220,190,100,.15)",
                      borderRadius: 8,
                      padding: "14px 16px",
                      color: "#e8e4df",
                      textDecoration: "none",
                      fontFamily: "var(--font-zen-kaku),sans-serif",
                    }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{getLocName(loc, lang)}</div>
                    <div style={{ fontSize: 11, color: "rgba(232,228,223,.45)", marginTop: 4 }}>
                      {cnt} {lang === "ja" ? "枚" : "photos"}
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* Related categories: collections + techniques + tags + blog posts (A15 内部リンク強化) */}
        {(() => {
          const myColls = COLLECTION_SLUGS.filter((s) => COLLECTIONS[s].locs.includes(locJp));
          const myTags = TAG_SLUGS.filter((s) => TAGS[s].locs.includes(locJp));
          const myTechs = TECHNIQUE_SLUGS.filter((s) => TECHNIQUES[s].locs.includes(locJp));
          const myPosts = POSTS.filter((p) => p.locs.includes(locJp));
          if (myColls.length === 0 && myTags.length === 0 && myTechs.length === 0 && myPosts.length === 0) return null;
          return (
            <section style={{ marginTop: 64 }}>
              <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(220,190,100,.7)", marginBottom: 20 }}>
                {lang === "ja" ? "関連コンテンツ" : "Related Content"}
              </h2>

              {myPosts.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, color: "rgba(220,190,100,.5)", textTransform: "uppercase", letterSpacing: ".2em", marginBottom: 8 }}>
                    {lang === "ja" ? "ブログ記事" : "Blog Posts"}
                  </div>
                  {myPosts.slice(0, 3).map((p) => (
                    <a key={p.slug} href={`/${lang}/blog/${p.slug}`} style={{ display: "block", padding: "10px 14px", marginBottom: 6, background: "rgba(220,190,100,.06)", border: "1px solid rgba(220,190,100,.18)", borderRadius: 6, color: "#e8e4df", textDecoration: "none", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14 }}>
                      → {getPostTitle(p, lang)}
                    </a>
                  ))}
                </div>
              )}

              {myTechs.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, color: "rgba(220,190,100,.5)", textTransform: "uppercase", letterSpacing: ".2em", marginBottom: 8 }}>
                    {lang === "ja" ? "撮影技法ガイド" : "Photography Techniques"}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {myTechs.slice(0, 6).map((s) => (
                      <a key={`tech-${s}`} href={`/${lang}/techniques/${s}`} style={{ background: "rgba(220,190,100,.06)", border: "1px solid rgba(220,190,100,.22)", borderRadius: 8, padding: "8px 16px", color: "#e8e4df", textDecoration: "none", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13 }}>
                        ▸ {getTechniqueName(s, lang)}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {(myColls.length > 0 || myTags.length > 0) && (
                <div>
                  <div style={{ fontSize: 11, color: "rgba(220,190,100,.5)", textTransform: "uppercase", letterSpacing: ".2em", marginBottom: 8 }}>
                    {lang === "ja" ? "コレクション・タグ" : "Collections & Tags"}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {myColls.slice(0, 5).map((s) => (
                      <a key={`c-${s}`} href={`/${lang}/collections/${s}`} style={{ background: "rgba(220,190,100,.08)", border: "1px solid rgba(220,190,100,.25)", borderRadius: 999, padding: "6px 14px", color: "#e8e4df", textDecoration: "none", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 12 }}>
                        {getCollectionName(s, lang)}
                      </a>
                    ))}
                    {myTags.slice(0, 8).map((s) => (
                      <a key={`t-${s}`} href={`/${lang}/tags/${s}`} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(220,190,100,.15)", borderRadius: 999, padding: "6px 14px", color: "rgba(232,228,223,.85)", textDecoration: "none", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 12 }}>
                        #{getTagName(s, lang)}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })()}

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
            </section>
          );
        })()}

        {/* 47都道府県すべてを見るリンク (常に表示) */}
        <div style={{ marginTop: 32 }}>
          <a href={`/${lang}/all-prefectures`} style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, color: "rgba(220,190,100,.85)", textDecoration: "none" }}>
            {lang === "ja" ? "47都道府県すべてを見る →" : "View all 47 prefectures →"}
          </a>
        </div>
      </main>

      {lightbox !== null && cur && (
        <div
          className={"cin-lb" + (lbClosing ? " closing" : "")}
          onClick={closeLightbox}
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(10,10,10,.88)", backdropFilter: "blur(28px)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <button className="cin-lb-arrow left" onClick={(e) => { e.stopPropagation(); lbPrev(); }}>←</button>
          <div className="cin-lb-inner" onClick={(e) => { e.stopPropagation(); closeLightbox(); }} style={{ position: "relative" }}>
            <img src={cur.url} alt={locLocal + " - " + prefLocal + " | Landscapes of Japan"} draggable="false" style={{ maxWidth: "92vw", maxHeight: "88vh", objectFit: "contain" }} onContextMenu={(e) => e.preventDefault()} />
            <div className="cin-lb-wm">Landscapes of Japan</div>
          </div>
          <button className="cin-lb-arrow right" onClick={(e) => { e.stopPropagation(); lbNext(); }}>→</button>
        </div>
      )}
    </div>
  );
}
