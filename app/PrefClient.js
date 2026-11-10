"use client";
import { ui } from "./ui-strings.js";
import PhotoImage from "./PhotoImage.js";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { PREFECTURES, getPrefName, getLocName, getUrl, cldPlaceholder, lbWidth } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
/* ④ 写真詳細ページの有無は photo-ref.js の1か所で判定する
   (PHOTO_LANGS の7言語だけに存在。無い言語では詳細URLを作らない) */
import { hasPhotoPages } from "./photo-ref.js";
import SiteHeader from "./SiteHeader.js";
import { getRegionOfPref, getSiblingPrefs } from "./regions.js";
import { richAlt } from "./title-keywords.js";
import Lightbox from "./Lightbox.js";
import { useProgressiveReveal } from "./useProgressiveReveal.js";
import { useOriginRect, animateToRect } from "./useViewTransition.js";
import { thumbRectOf } from "./usePhotoViewer.js";
import { isPortrait, accentStyle } from "./photo-meta.js";
import { track } from "./analytics.js";

/* 縦組みの地名は「都・府・県」を外して短く見せる (北海道はそのまま)。表示だけの加工 */
const jaShort = (pref) => (pref === "北海道" ? pref : pref.replace(/[都府県]$/, ""));

export default function PrefClient({ lang, prefJp, dims = {} }) {
  const pf = PREFECTURES.find((p) => p.pref === prefJp);
  const prefLocal = getPrefName(prefJp, lang);
  const prefSlug = PREF_SLUGS[prefJp];

  const [lightbox, setLightbox] = useState(null);
  const [lbClosing, setLbClosing] = useState(false);
  const [imgSizes, setImgSizes] = useState({ thumbW: 1200, lbW: 2400 });
  useEffect(() => {
    const lb = lbWidth();
    if (lb !== 2400) setImgSizes({ thumbW: lb === 800 ? 600 : 1200, lbW: lb });
  }, []);

  const allPhotos = useMemo(() => {
    if (!pf) return [];
    return pf.photos.map((p) => ({
      id: p.id,
      url: getUrl(p, imgSizes.lbW),
      pref: prefJp,
      loc: p.loc || "",
      year: p.year || null,
    }));
  }, [pf, prefJp, imgSizes.lbW]);

  /* P3: staged grid rendering (24 + reveal-on-approach) */
  const [gridCount, gridSentinelRef] = useProgressiveReveal(pf ? pf.photos.length : 0);

  const origin = useOriginRect();
  const lightboxRef = useRef(null);
  useEffect(() => { lightboxRef.current = lightbox; }, [lightbox]);

  const openLightbox = useCallback((url, el) => {
    const i = allPhotos.findIndex((p) => p.url === url);
    if (i < 0) return;
    origin.capture(el ? el.querySelector("img") : null);
    setLightbox(i);
    track("photo_open", { photo_id: allPhotos[i].id, entry: "pref" }, allPhotos[i].id + "|pref");
  }, [allPhotos, origin]);
  const closeLightbox = useCallback(() => {
    const i = lightboxRef.current;
    const id = i !== null && allPhotos[i] ? allPhotos[i].id : null;
    setLbClosing(true);
    animateToRect(document.querySelector(".cin-lb-inner img"), thumbRectOf(id), () => {
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

  const uniqueLocs = [...new Set(pf.photos.map((p) => p.loc).filter(Boolean))];
  const cur = lightbox !== null ? allPhotos[lightbox] : null;
  const enName = getPrefName(prefJp, "en");
  const tate = jaShort(prefJp);

  return (
    <div className="page-root" data-accent="" style={accentStyle(pf.photos.slice(0, 60).map((p) => p.id))}>
      <SiteHeader lang={lang} langHrefFor={(c) => `/${c}/${prefSlug}`} />

      <main className="pg">
        <nav aria-label={ui("breadcrumb", lang)} className="bc">
          <a href={`/${lang}`}>Landscapes of Japan</a>
          <span className="bc-sep">›</span>
          <span>{prefLocal}</span>
        </nav>

        {/* 地名を主役にする (撮影地ページと同じ組み方)。日本語ページでは縦組みが h1 */}
        <header className="ph">
          {lang === "ja"
            ? <h1 className="ph-tate" lang="ja" aria-label={prefJp} style={{ "--n": [...tate].length }}>{tate}</h1>
            : <div className="ph-tate" lang="ja" aria-hidden="true" style={{ "--n": [...tate].length }}>{tate}</div>}
          <div className="ph-side">
            {lang !== "ja"
              ? <h1 className="ph-name">{prefLocal}</h1>
              : enName !== prefJp && <div className="ph-name">{enName}</div>}
            <div className="ph-meta"><span>{pf.photos.length}</span></div>

            {/* 撮影地へのリンク。以前は1件ずつ箱にして並べていたため、撮影地が34ある北海道では
                スマホで1列になり、最初の写真まで約3.5画面あった。横に送れるチップにして、
                写真をすぐ下に置く。リンクは全部初期HTMLにある (横に隠れているだけ)。 */}
            {uniqueLocs.length > 0 && (
              <nav className="chips scroll ph-locs" aria-label={lang === "ja" ? "撮影地" : "Locations"}>
                {uniqueLocs.map((loc) => {
                  const locSlugV = LOC_SLUGS[loc];
                  if (!locSlugV) return null;
                  const count = pf.photos.filter((p) => p.loc === loc).length;
                  return (
                    <a key={loc} className="chip" href={`/${lang}/${prefSlug}/${locSlugV}`}>
                      {getLocName(loc, lang)}<span className="chip-n">{count}</span>
                    </a>
                  );
                })}
              </nav>
            )}
          </div>
        </header>

        <section>
          <div className="jg">
            {pf.photos.slice(0, gridCount).map((photo, i) => {
              const locName = photo.loc ? getLocName(photo.loc, lang) : "";
              return (
                <div
                  key={photo.id + i}
                  data-pid={photo.id}
                  className={"jg-item" + (isPortrait(photo.id) ? " tall" : "")}
                  role="button"
                  tabIndex={0}
                  onClick={(e) => openLightbox(getUrl(photo, imgSizes.lbW), e.currentTarget)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(getUrl(photo, imgSizes.lbW), e.currentTarget); } }}
                  onMouseEnter={() => { if (typeof window !== "undefined") { new window.Image().src = getUrl(photo, imgSizes.lbW); } }}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ backgroundImage: `url(${cldPlaceholder(photo.id)})` }}
                >
                  <PhotoImage
                    id={photo.id}
                    alt={richAlt({ locName, prefName: prefLocal, year: photo.year, locJp: photo.loc, lang })}
                    dims={dims[photo.id] || null}
                    sizes="(max-width: 600px) 48vw, (max-width: 1024px) 32vw, 300px"
                    widths="grid"
                    priority={i < 2}
                  />
                  {locName && <span className="jg-cap">{locName}</span>}
                </div>
              );
            })}
          </div>
          {gridCount < pf.photos.length && <div ref={gridSentinelRef} aria-hidden="true" style={{ height: 1 }} />}
        </section>

        {/* faqs はクイック情報と内容が重複するため UI から削除。
            データは FAQPage JSON-LD schema 用に getPrefFaqs から取得してサーバ側で使用 */}

        {/* A19: PageRank流通最適化 — 同地方の他pref へのリンク */}
        {(() => {
          const region = getRegionOfPref(prefJp);
          const siblings = getSiblingPrefs(prefJp);
          if (!region || siblings.length === 0) return null;
          const covered = siblings
            .map((s) => ({ jp: s, pf: PREFECTURES.find((p) => p.pref === s), slug: PREF_SLUGS[s] }))
            .filter((x) => x.pf && x.slug);
          if (covered.length === 0) return null;
          const regionLocal = lang === "ja" ? region.nameJa : region.nameEn;
          return (
            <section className="sec">
              <h2 className="sec-h">{lang === "ja" ? `${regionLocal}地方の他の都道府県` : `Other prefectures in ${regionLocal}`}</h2>
              <div className="chips">
                {covered.map(({ jp, pf: p2, slug }) => (
                  <a key={jp} className="chip" href={`/${lang}/${slug}`}>
                    {getPrefName(jp, lang)}<span className="chip-n">{p2.photos.length}</span>
                  </a>
                ))}
              </div>
            </section>
          );
        })()}

        {/* 北海道など同地方が自pref のみの場合でもリンク表示するため独立セクションに分離 */}
        <div className="sec">
          <a className="more-link" href={`/${lang}/all-prefectures`}>
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
          labels={(p) => ({ prefName: prefLocal, locName: p.loc ? getLocName(p.loc, lang) : "", alt: richAlt({ locName: p.loc ? getLocName(p.loc, lang) : "", prefName: prefLocal, year: p.year, locJp: p.loc, lang }) })}
          /* ④ 写真詳細ページはPHOTO_LANGSの言語にしかない。無い言語では
             存在しないURLも作らず、英語ページへも切り替えず、リンク自体を出さない。 */
          photoHref={(p) => (hasPhotoPages(lang) && prefSlug && p.loc && LOC_SLUGS[p.loc] && p.id ? `/${lang}/${prefSlug}/${LOC_SLUGS[p.loc]}/${p.id}` : null)}
        />
      )}
    </div>
  );
}
