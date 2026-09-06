"use client";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { TR, PREFECTURES, getPrefName, getLocName, getUrl, cldUrl, cldPlaceholder, lbWidth } from "./data.js";
import { photoLang, PHOTO_LANGS } from "./i18n-meta.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { getCollectionName } from "./collections.js";
import { richAlt } from "./title-keywords.js";
import SiteHeader from "./SiteHeader.js";
import Lightbox from "./Lightbox.js";
import Theater from "./Theater.js";
import { track } from "./analytics.js";
import { ui } from "./ui-strings.js";
import { useOriginRect, animateToRect } from "./useViewTransition.js";
import { getRegionOfPref, getSiblingPrefs } from "./regions.js";
import Weather from "./Weather.js";
import SunTimes from "./SunTimes.js";

export default function LocClient({ lang, prefJp, locJp, collections = [] }) {
  const pf = PREFECTURES.find((p) => p.pref === prefJp);
  const t = TR[lang] || TR.en;
  const prefSlug = PREF_SLUGS[prefJp];
  const locSlug = LOC_SLUGS[locJp];
  const prefLocal = getPrefName(prefJp, lang);
  const locLocal = getLocName(locJp, lang);

  const [lightbox, setLightbox] = useState(null);
  const [lbClosing, setLbClosing] = useState(false);
  const [theater, setTheater] = useState(false);
  const [imgSizes, setImgSizes] = useState({ thumbW: 1200, lbW: 2400 });
  useEffect(() => {
    const lb = lbWidth();
    if (lb !== 2400) setImgSizes({ thumbW: lb === 800 ? 600 : 1200, lbW: lb });
  }, []);

  const photos = useMemo(() => {
    if (!pf) return [];
    return pf.photos.filter((p) => p.loc === locJp);
  }, [pf, locJp]);

  /* 以前は 24枚ずつの段階表示だったが、初期HTMLに載らない写真の詳細ページへ
     リンクが張れないため全件描画に変更 (画像は loading="lazy" のまま)。
     写真詳細ページは PHOTO_LANGS の7言語ぶんしか生成していない。
     ここが false の言語では写真カードをリンクにしない (存在しないURLを作らないため)。 */
  const hasPhotoPages = PHOTO_LANGS.includes(lang);
  /* ③ 押したサムネイルの位置を覚えて、拡大表示をそこから開く */
  const origin = useOriginRect();
  /* 閉じるとき「今表示している写真」のサムネイルへ戻すため、カードをIDで引けるようにする */
  const cardRefs = useRef(new Map());
  const lightboxRef = useRef(null);
  useEffect(() => { lightboxRef.current = lightbox; }, [lightbox]);

  const allPhotos = useMemo(
    () =>
      photos.map((p) => ({
        id: p.id,
        url: getUrl(p, imgSizes.lbW),
        pref: prefJp,
        loc: locJp,
        year: p.year || null,
      })),
    [photos, prefJp, locJp, imgSizes.lbW]
  );

  const openLightbox = useCallback((url, entry = "loc") => {
    const i = allPhotos.findIndex((p) => p.url === url);
    setLightbox(i);
    /* ⑨ 実際に開いたときだけ。サムネイル表示や先読みでは送らない */
    if (allPhotos[i]) track("photo_open", { photo_id: allPhotos[i].id, entry }, allPhotos[i].id + "|" + entry);
  }, [allPhotos]);

  /* ④ 写真詳細ページが無い言語では、共有リンクが
     /{lang}/{pref}/{loc}?photo={id} で届く。その写真を開いた状態にする。
     無効・削除済みのIDのときは、何もせず通常の撮影地ページのままにする。
     戻る/進むでも同じ状態に戻す。 */
  const openFromUrl = useCallback(() => {
    try {
      const id = new URLSearchParams(window.location.search).get("photo");
      if (!id) return;
      const i = allPhotos.findIndex((p) => p.id === id);
      if (i >= 0) setLightbox(i);
    } catch {}
  }, [allPhotos]);
  useEffect(() => {
    openFromUrl();
    window.addEventListener("popstate", openFromUrl);
    return () => window.removeEventListener("popstate", openFromUrl);
  }, [openFromUrl]);
  const closeLightbox = useCallback(() => {
    /* ③ 「今 Lightbox に出ている写真」のサムネイルへ戻す。
       Lightbox 内で別写真へ移動していた場合も、戻り先はその写真のカードになるので
       無関係な写真へ変形しない。画面外なら rect が取れないのでフェードになる。 */
    const idx = lightboxRef.current;
    const curId = idx !== null && allPhotos[idx] ? allPhotos[idx].id : null;
    const card = curId ? cardRefs.current.get(curId) : null;
    let rect = null;
    if (card) {
      const r = card.getBoundingClientRect();
      const inView = r.bottom > 0 && r.top < window.innerHeight;
      if (inView) rect = r;
    }
    const lbImg = document.querySelector(".cin-lb-inner img");
    setLbClosing(true);
    animateToRect(lbImg, rect, () => {
      setLightbox(null);
      setLbClosing(false);
    });
  }, [allPhotos]);
  const lbPrev = useCallback(
    () => setLightbox((i) => (i <= 0 ? allPhotos.length - 1 : i - 1)),
    [allPhotos]
  );
  const lbNext = useCallback(
    () => setLightbox((i) => (i >= allPhotos.length - 1 ? 0 : i + 1)),
    [allPhotos]
  );

  if (!pf) return null;

  const cur = lightbox !== null ? allPhotos[lightbox] : null;
  const siblings = pf.photos
    .map((p) => p.loc)
    .filter((l) => l && l !== locJp)
    .filter((l, i, arr) => arr.indexOf(l) === i);

  return (
    <div style={{ background: "#0a0a0a", color: "#e8e4df", minHeight: "100vh", fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
      <SiteHeader lang={lang} langHrefFor={(c) => `/${c}/${prefSlug}/${locSlug}`} />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 80px" }}>
        <nav aria-label={ui("breadcrumb", lang)} style={{ fontSize: 13, color: "rgba(232,228,223,.55)", marginBottom: 24, letterSpacing: ".05em" }}>
          <a href={`/${lang}`} style={{ color: "inherit", textDecoration: "none" }}>Landscapes of Japan</a>
          <span className="bc-sep" style={{ margin: "0 10px" }}>›</span>
          <a href={`/${lang}/${prefSlug}`} style={{ color: "inherit", textDecoration: "none" }}>{prefLocal}</a>
          <span className="bc-sep" style={{ margin: "0 10px" }}>›</span>
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
            <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
              <Weather lat={pf.lat} lng={pf.lng} lang={lang} />
              <SunTimes lat={pf.lat} lng={pf.lng} lang={lang} />
            </div>
          )}
        </header>

        <section id="photos" style={{ scrollMarginTop: 70 }}>
          {photos.length > 1 && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
              <button className="th-launch" onClick={() => { setTheater(true); track("theater_open", { from: "loc" }, "loc"); }} aria-label={ui("theater", lang)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 21 12 6 21" /></svg>
                {ui("theater", lang)}
              </button>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {photos.map((photo, i) => {
              /* 写真詳細ページが存在する言語だけ実リンクにする。
                 存在しない18言語では href を作らず、従来どおり div + Lightbox のまま。 */
              const detailHref = hasPhotoPages && prefSlug && locSlug && photo.id
                ? `/${lang}/${prefSlug}/${locSlug}/${photo.id}`
                : null;
              const cardStyle = { cursor: "pointer", position: "relative", aspectRatio: "3/2", overflow: "hidden", borderRadius: 4, backgroundColor: "#111", backgroundImage: `url(${cldPlaceholder(photo.id)})`, backgroundSize: "cover", backgroundPosition: "center" };
              const preload = () => { if (typeof window !== "undefined") { new window.Image().src = getUrl(photo, imgSizes.lbW); } };
              /* 通常の左クリックだけ Lightbox に差し替える。Ctrl/Cmd/Shift/Alt・中クリックは
                 ブラウザ既定のリンク動作に任せる。
                 右クリックは変更前と同じく抑止しているため、コンテキストメニュー経由では開けない。 */
              const onCardClick = (e) => {
                if (detailHref) {
                  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                  e.preventDefault();
                }
                /* ③ 押したサムネイルの矩形を記録してから開く (拡大表示がそこから広がる) */
                origin.capture(e.currentTarget.querySelector("img"));
                openLightbox(getUrl(photo, imgSizes.lbW));
              };
              const inner = (
                <>
                <img
                  src={getUrl(photo, imgSizes.thumbW)}
                  srcSet={`${getUrl(photo, 600)} 600w, ${getUrl(photo, 1200)} 1200w`}
                  sizes="(max-width: 600px) 92vw, (max-width: 1024px) 45vw, 380px"
                  alt={richAlt({ locName: locLocal, prefName: prefLocal, year: photo.year, locJp, lang })}
                  loading={i < 4 ? "eager" : "lazy"}
                  fetchPriority={i < 2 ? "high" : undefined}
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
                </>
              );
              /* 見た目は div 版と同一。a は既定の下線・色を打ち消し、
                 リンクテキストは img の alt がそのまま担う (別途ラベルを足さない)。 */
              /* 閉じるときの戻り先を写真IDで引けるよう、カード自身を登録する */
              const setCardRef = (el) => {
                if (el) cardRefs.current.set(photo.id, el);
                else cardRefs.current.delete(photo.id);
              };
              return detailHref ? (
                <a
                  key={photo.id + i}
                  ref={setCardRef}
                  data-pid={photo.id}
                  href={detailHref}
                  className="cin-hcard"
                  onClick={onCardClick}
                  onMouseEnter={preload}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ ...cardStyle, display: "block", textDecoration: "none", color: "inherit" }}
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={photo.id + i}
                  ref={setCardRef}
                  data-pid={photo.id}
                  className="cin-hcard"
                  onClick={onCardClick}
                  onMouseEnter={preload}
                  onContextMenu={(e) => e.preventDefault()}
                  style={cardStyle}
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

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

        {/* この撮影地の写真が実際に入っているコレクション (server 側で写真単位に集計。
            旧実装は collection.locs の loc 単位判定で、写真タグ由来の鳥/動物が出なかった) */}
        {collections.length > 0 && (
          <section id="related" style={{ marginTop: 64, scrollMarginTop: 70 }}>
            <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(220,190,100,.7)", marginBottom: 20 }}>
              {lang === "ja" ? "コレクション" : "Collections"}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {collections.map((c) => (
                <a key={`c-${c.slug}`} href={`/${lang}/collections/${c.slug}`} style={{ display: "inline-flex", alignItems: "baseline", gap: 7, background: "rgba(220,190,100,.08)", border: "1px solid rgba(220,190,100,.25)", borderRadius: 999, padding: "6px 14px", color: "#e8e4df", textDecoration: "none", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 12 }}>
                  {getCollectionName(c.slug, lang)}
                  <span style={{ fontSize: 10.5, color: "rgba(220,190,100,.75)" }}>{c.count}</span>
                </a>
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
        <Lightbox
          originRect={origin.peek()}
          photos={allPhotos}
          index={lightbox}
          closing={lbClosing}
          lang={lang}
          onClose={closeLightbox}
          onPrev={lbPrev}
          onNext={lbNext}
          labels={(p) => ({ prefName: prefLocal, locName: locLocal, alt: richAlt({ locName: locLocal, prefName: prefLocal, year: p.year, locJp, lang }) })}
          /* ④ 写真詳細ページはPHOTO_LANGSの言語にしかない。無い言語では
             存在しないURLも作らず、英語ページへも切り替えず、リンク自体を出さない。 */
          photoHref={(p) => (hasPhotoPages && prefSlug && locSlug && p.id ? `/${lang}/${prefSlug}/${locSlug}/${p.id}` : null)}
        />
      )}
      {theater && (
        <Theater
          photos={photos.map((p) => ({ id: p.id, pref: prefJp, loc: locJp, year: p.year || null }))}
          lang={lang}
          onClose={() => setTheater(false)}
          labels={() => ({ prefName: prefLocal, locName: locLocal })}
        />
      )}
    </div>
  );
}
