"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import { TR, getPrefName, getLocName, cldUrl, lbWidth } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { COLLECTION_SLUGS, getCollectionName } from "./collections.js";
import SiteHeader from "./SiteHeader.js";
import Lightbox from "./Lightbox.js";
import Theater from "./Theater.js";
import { ui } from "./ui-strings.js";
import { photoLang } from "./i18n-meta.js";
import { SEASONS, seasonLabel } from "./seasons.js";
import { track } from "./analytics.js";

/* T5: 月→季節 (photo-months.js の seasonOf と同義。月は server から photo.month で渡る) */
const seasonOf = (m) => (!m ? null : m <= 2 || m === 12 ? "winter" : m <= 5 ? "spring" : m <= 8 ? "summer" : "autumn");
const PREF_SLUGS_REV = Object.fromEntries(Object.entries(PREF_SLUGS).map(([jp, sl]) => [sl, jp]));
const ALL_LABEL = { ja: "すべて", en: "All", zh: "全部", "zh-tw": "全部", ko: "전체", de: "Alle", es: "Todas", ar: "الكل" };

export default function CollectionClient({ lang, theme, photos }) {
  const t = TR[lang] || TR.en;
  const name = getCollectionName(theme, lang);

  const [imgSizes, setImgSizes] = useState({ thumbW: 1200, lbW: 2400 });
  useEffect(() => {
    const lb = lbWidth();
    if (lb !== 2400) setImgSizes({ thumbW: lb === 800 ? 600 : 1200, lbW: lb });
  }, []);

  /* ② 地域 × テーマ の絞り込み。テーマ (このコレクション) は固定で、
     そこに 地域 と 季節 を掛け合わせる。条件は「かつ」で、片方だけ当てはまる
     写真は混ぜない。URL (?pref=&season=) に持つので、再読み込みでも
     戻る/進むでも同じ結果に戻る。コレクションのURL自体は変えない。 */
  const [seasonFilter, setSeasonFilter] = useState(null);
  const [prefFilter, setPrefFilter] = useState(null);

  /* URL から条件を読む。このコレクションに存在しない地域・季節は受け取らない
     (画面の絞り込みに出ない条件のまま0件になるのを防ぐ)。 */
  const readUrl = useCallback(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const p = PREF_SLUGS_REV[q.get("pref")] || null;
      const se = q.get("season");
      const prefsHere = new Set(photos.map((x) => x.pref));
      const seasonsHere = new Set(photos.map((x) => seasonOf(x.month)).filter(Boolean));
      setPrefFilter(p && prefsHere.has(p) ? p : null);
      setSeasonFilter(seasonsHere.has(se) ? se : null);
    } catch {}
  }, [photos]);
  useEffect(() => {
    readUrl();
    window.addEventListener("popstate", readUrl);
    return () => window.removeEventListener("popstate", readUrl);
  }, [readUrl]);

  /* 条件を変えたら履歴に積む → 戻るで前の条件に戻れる */
  const applyFilter = useCallback((nextPref, nextSeason) => {
    setPrefFilter(nextPref); setSeasonFilter(nextSeason); setLightbox(null);
    try {
      const q = new URLSearchParams(window.location.search);
      if (nextPref && PREF_SLUGS[nextPref]) q.set("pref", PREF_SLUGS[nextPref]); else q.delete("pref");
      if (nextSeason) q.set("season", nextSeason); else q.delete("season");
      const qs = q.toString();
      window.history.pushState(null, "", window.location.pathname + (qs ? "?" + qs : ""));
    } catch {}
  }, []);
  const byPrefOnly = useMemo(
    () => (prefFilter ? photos.filter((p) => p.pref === prefFilter) : photos),
    [photos, prefFilter]
  );
  /* チップの顔ぶれは地域の選択で変えない。選んだ条件が画面から消えないようにする
     (件数は地域で絞った後の数を出す。0件でも条件は見えたままにする)。 */
  const allSeasonKeys = useMemo(() => {
    const set = new Set();
    for (const p of photos) { const se = seasonOf(p.month); if (se) set.add(se); }
    return set;
  }, [photos]);
  const seasonCounts = useMemo(() => {
    const c = {};
    for (const p of byPrefOnly) { const s = seasonOf(p.month); if (s) c[s] = (c[s] || 0) + 1; }
    return c;
  }, [byPrefOnly]);
  /* 地域の選択肢は季節で減らさない。選んだ条件が画面から消えないようにする
     (件数は季節で絞った後の数。0件でも選択肢は残す)。 */
  const allPrefs = useMemo(() => [...new Set(photos.map((p) => p.pref))].filter((pr) => PREF_SLUGS[pr]), [photos]);
  const prefCounts = useMemo(() => {
    const c = new Map(allPrefs.map((pr) => [pr, 0]));
    const src = seasonFilter ? photos.filter((p) => seasonOf(p.month) === seasonFilter) : photos;
    for (const p of src) c.set(p.pref, (c.get(p.pref) || 0) + 1);
    return c;
  }, [photos, seasonFilter, allPrefs]);
  /* 両方の条件を満たすものだけ */
  const visible = useMemo(
    () => byPrefOnly.filter((p) => !seasonFilter || seasonOf(p.month) === seasonFilter),
    [byPrefOnly, seasonFilter]
  );
  const filtered = !!(prefFilter || seasonFilter);

  const allPhotos = useMemo(
    () => visible.map((p) => ({ ...p, url: cldUrl(p.id, imgSizes.lbW) })),
    [visible, imgSizes.lbW]
  );

  const [lightbox, setLightbox] = useState(null);
  const [lbClosing, setLbClosing] = useState(false);
  const [theater, setTheater] = useState(false);

  const openLightbox = useCallback((idx) => {
    setLightbox(idx);
    const p = visible[idx];
    /* ⑨ 明示的に開いたときだけ。流入元はこの操作が始まった場所 */
    if (p) track("photo_open", { photo_id: p.id, entry: "collection" }, p.id + "|collection");
  }, [visible]);
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
      <SiteHeader lang={lang} langHrefFor={(c) => `/${c}/collections/${theme}`} />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 80px" }}>
        <nav aria-label={ui("breadcrumb", lang)} style={{ fontSize: 13, color: "rgba(232,228,223,.55)", marginBottom: 24, letterSpacing: ".05em" }}>
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
              <button className="th-launch" onClick={() => { setTheater(true); track("theater_open", { from: "collection" }, "collection"); }} aria-label={ui("theater", lang)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 21 12 6 21" /></svg>
                {ui("theater", lang)}
              </button>
            </div>
          )}
        </header>

        <section>
          {/* ② 絞り込み: このテーマ × 地域 × 季節。条件は「かつ」。
              ボタンを並べずに、地域は選択メニュー、季節は数個のチップにする。 */}
          {(allPrefs.length > 1 || allSeasonKeys.size >= 2) && (
            <div className="flt">
              <span className="flt-h">{ui("filter", lang)}</span>

              {allPrefs.length > 1 && (
                <span className="flt-sel">
                  <label className="sr-only" htmlFor="flt-pref">{ui("region", lang)}</label>
                  <select
                    id="flt-pref"
                    value={prefFilter ? PREF_SLUGS[prefFilter] : ""}
                    onChange={(e) => applyFilter(e.target.value ? PREF_SLUGS_REV[e.target.value] : null, seasonFilter)}
                  >
                    <option value="">{ui("region", lang)} — {ALL_LABEL[lang] || ALL_LABEL.en}</option>
                    {[...prefCounts.entries()]
                      .sort((a, b) => b[1] - a[1])
                      .map(([pr, c]) => (
                        <option key={pr} value={PREF_SLUGS[pr]}>{getPrefName(pr, lang)} ({c})</option>
                      ))}
                  </select>
                </span>
              )}

              {allSeasonKeys.size >= 2 && SEASONS.filter((se) => allSeasonKeys.has(se.key)).map((se) => {
                const active = seasonFilter === se.key;
                return (
                  <button
                    key={se.key}
                    type="button"
                    className={"flt-chip" + (active ? " on" : "")}
                    aria-pressed={active}
                    onClick={() => applyFilter(prefFilter, active ? null : se.key)}
                  >
                    <span aria-hidden="true" style={{ fontFamily: "Apple Color Emoji,Segoe UI Emoji,sans-serif" }}>{se.icon}</span>
                    {seasonLabel(se.key, lang)} ({seasonCounts[se.key] || 0})
                  </button>
                );
              })}

              {/* 選択中の条件と件数。解除は色検索と同じ言い方にそろえる */}
              <span className="flt-n" aria-live="polite">
                {visible.length}{lang === "ja" ? "枚" : ""}
              </span>
              {filtered && (
                <button type="button" className="flt-clear" onClick={() => applyFilter(null, null)}>
                  {ui("clearFilter", lang)}
                </button>
              )}
            </div>
          )}

          {/* 条件に合う写真が無いとき。短く、次の操作だけ出す */}
          {visible.length === 0 && (
            <div className="flt-empty">
              <span>{ui("noResults", lang)}</span>
              <button type="button" className="flt-clear" onClick={() => applyFilter(null, null)}>
                {ui("clearFilter", lang)}
              </button>
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
          /* ④ 写真詳細ページはPHOTO_LANGSの言語にしかない。無い言語では
             存在しないURLも作らず、英語ページへも切り替えず、リンク自体を出さない。 */
          photoHref={(p) => (hasPhotoPages(lang) && PREF_SLUGS[p.pref] && LOC_SLUGS[p.loc] && p.id ? `/${lang}/${PREF_SLUGS[p.pref]}/${LOC_SLUGS[p.loc]}/${p.id}` : null)}
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
