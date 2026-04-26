"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import { TR, getPrefName, getLocName, cldUrl } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { COLLECTIONS, COLLECTION_SLUGS, getCollectionName, getCollectionGuide } from "./collections.js";
import { TECHNIQUES, TECHNIQUE_SLUGS, getTechniqueName } from "./techniques.js";
import TopNav from "./TopNav.js";

// A8: ガイドセクションのラベル翻訳 (5 base langs + 15 langs は en fallback)
const GUIDE_LABELS = {
  ja: { title: "撮影ガイド", bestSeason: "最適な季節", bestTime: "最適な時間帯", technique: "撮影テクニック", equipment: "推奨機材", tips: "実践のヒント" },
  en: { title: "Photography Guide", bestSeason: "Best Season", bestTime: "Best Time", technique: "Technique", equipment: "Equipment", tips: "Field Tips" },
  zh: { title: "摄影指南", bestSeason: "最佳季节", bestTime: "最佳时间", technique: "摄影技巧", equipment: "推荐器材", tips: "实战建议" },
  "zh-tw": { title: "攝影指南", bestSeason: "最佳季節", bestTime: "最佳時間", technique: "攝影技巧", equipment: "推薦器材", tips: "實戰建議" },
  ko: { title: "촬영 가이드", bestSeason: "최적 시즌", bestTime: "최적 시간대", technique: "촬영 기법", equipment: "추천 장비", tips: "실전 팁" },
  fr: { title: "Guide photographique", bestSeason: "Meilleure saison", bestTime: "Meilleur moment", technique: "Technique", equipment: "Équipement", tips: "Conseils pratiques" },
  de: { title: "Fotoguide", bestSeason: "Beste Jahreszeit", bestTime: "Beste Zeit", technique: "Technik", equipment: "Ausrüstung", tips: "Praxistipps" },
  es: { title: "Guía fotográfica", bestSeason: "Mejor temporada", bestTime: "Mejor momento", technique: "Técnica", equipment: "Equipo", tips: "Consejos prácticos" },
  pt: { title: "Guia fotográfico", bestSeason: "Melhor estação", bestTime: "Melhor horário", technique: "Técnica", equipment: "Equipamento", tips: "Dicas práticas" },
  it: { title: "Guida fotografica", bestSeason: "Migliore stagione", bestTime: "Miglior momento", technique: "Tecnica", equipment: "Attrezzatura", tips: "Consigli pratici" },
  ru: { title: "Гид по фотосъёмке", bestSeason: "Лучший сезон", bestTime: "Лучшее время", technique: "Техника", equipment: "Оборудование", tips: "Практические советы" },
  nl: { title: "Fotografiegids", bestSeason: "Beste seizoen", bestTime: "Beste tijd", technique: "Techniek", equipment: "Uitrusting", tips: "Praktijktips" },
  pl: { title: "Przewodnik fotograficzny", bestSeason: "Najlepsza pora", bestTime: "Najlepszy czas", technique: "Technika", equipment: "Sprzęt", tips: "Wskazówki praktyczne" },
  sv: { title: "Fotoguide", bestSeason: "Bästa säsong", bestTime: "Bästa tidpunkt", technique: "Teknik", equipment: "Utrustning", tips: "Praktiska tips" },
  tr: { title: "Fotoğraf rehberi", bestSeason: "En iyi mevsim", bestTime: "En iyi zaman", technique: "Teknik", equipment: "Ekipman", tips: "Pratik ipuçları" },
  id: { title: "Panduan Fotografi", bestSeason: "Musim terbaik", bestTime: "Waktu terbaik", technique: "Teknik", equipment: "Peralatan", tips: "Tips praktis" },
  vi: { title: "Hướng dẫn nhiếp ảnh", bestSeason: "Mùa tốt nhất", bestTime: "Thời điểm tốt nhất", technique: "Kỹ thuật", equipment: "Thiết bị", tips: "Mẹo thực hành" },
  th: { title: "คู่มือถ่ายภาพ", bestSeason: "ฤดูที่ดีที่สุด", bestTime: "เวลาที่ดีที่สุด", technique: "เทคนิค", equipment: "อุปกรณ์", tips: "คำแนะนำภาคสนาม" },
  hi: { title: "फोटोग्राफी गाइड", bestSeason: "सबसे अच्छा मौसम", bestTime: "सबसे अच्छा समय", technique: "तकनीक", equipment: "उपकरण", tips: "व्यावहारिक सुझाव" },
  ar: { title: "دليل التصوير", bestSeason: "أفضل موسم", bestTime: "أفضل وقت", technique: "تقنية", equipment: "المعدات", tips: "نصائح عملية" },
};

export default function CollectionClient({ lang, theme, photos, desc }) {
  const t = TR[lang] || TR.en;
  const name = getCollectionName(theme, lang);
  const guide = getCollectionGuide(theme, lang);
  const guideLabels = GUIDE_LABELS[lang] || GUIDE_LABELS.en;

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
        </header>

        {desc && (
          <p style={{ fontFamily: "var(--font-zen-kaku),'Noto Sans JP',sans-serif", fontSize: 17, lineHeight: 1.85, color: "rgba(232,228,223,.9)", marginBottom: 48, maxWidth: 820 }}>
            {desc}
          </p>
        )}

        {guide && (
          <section style={{ marginBottom: 56, maxWidth: 900 }}>
            <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(220,190,100,.8)", marginBottom: 24, fontWeight: 500 }}>
              {guideLabels.title}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 22 }}>
              {[
                ["bestSeason", guide.bestSeason],
                ["bestTime", guide.bestTime],
                ["technique", guide.technique],
                ["equipment", guide.equipment],
                ["tips", guide.tips],
              ].filter(([_, v]) => v).map(([k, v]) => (
                <div key={k} style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(220,190,100,.14)", borderRadius: 10, padding: "20px 22px" }}>
                  <h3 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(220,190,100,.85)", margin: 0, marginBottom: 10, fontWeight: 600 }}>
                    {guideLabels[k]}
                  </h3>
                  <p style={{ fontFamily: "var(--font-zen-kaku),'Noto Sans JP',sans-serif", fontSize: 15, lineHeight: 1.78, color: "rgba(232,228,223,.88)", margin: 0 }}>
                    {v}
                  </p>
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

        {/* A15: 関連テクニック (このコレクションの被写体に役立つ撮影技法) */}
        {(() => {
          const colLocs = new Set(COLLECTIONS[theme].locs);
          const relatedTechs = TECHNIQUE_SLUGS.filter((s) => {
            const techLocs = TECHNIQUES[s].locs;
            return techLocs.some((l) => colLocs.has(l));
          });
          if (relatedTechs.length === 0) return null;
          return (
            <section style={{ marginTop: 72 }}>
              <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(220,190,100,.7)", marginBottom: 20 }}>
                {lang === "ja" ? "関連の撮影技法" : "Related Photography Techniques"}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                {relatedTechs.slice(0, 8).map((s) => (
                  <a key={s} href={`/${lang}/techniques/${s}`} style={{ background: "rgba(220,190,100,.05)", border: "1px solid rgba(220,190,100,.22)", borderRadius: 8, padding: "12px 16px", color: "#e8e4df", textDecoration: "none", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14 }}>
                    ▸ {getTechniqueName(s, lang)}
                  </a>
                ))}
              </div>
            </section>
          );
        })()}

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
