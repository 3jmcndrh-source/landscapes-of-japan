"use client";
import { useState, useEffect, useMemo } from "react";
import { PREFECTURES, getPrefName, getLocName, cldUrl } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import SiteHeader from "./SiteHeader.js";
import { richAlt } from "./title-keywords.js";
import { PHOTO_LANGS } from "./i18n-meta.js";
import { ambient } from "./photo-colors.js";
import { seasonLabel } from "./seasons.js";
import { ui } from "./ui-strings.js";
import PhotoActions from "./PhotoActions.js";
import { pushHistory } from "./local-store.js";
import { track } from "./analytics.js";
import { isPortrait, accentStyle } from "./photo-meta.js";
import { usePhotoViewer, isPlainClick } from "./usePhotoViewer.js";

const OTHER_SEASONS_TITLE = {
  ja: "この場所の他の季節", en: "Other Seasons Here", zh: "此地的其他季节", "zh-tw": "此地的其他季節",
  ko: "이 장소의 다른 계절", de: "Andere Jahreszeiten hier", es: "Otras estaciones aquí", ar: "فصول أخرى هنا",
};

export default function PhotoClient({ lang, prefJp, locJp, photo, related, similarPhotos = [], otherSeasons = [], prevHref = null, nextHref = null, position = null }) {
  const prefSlug = PREF_SLUGS[prefJp];
  const locSlug = LOC_SLUGS[locJp];
  const prefLocal = getPrefName(prefJp, lang);
  const locLocal = getLocName(locJp, lang);

  const [imgW, setImgW] = useState(2400);
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) setImgW(1200);
  }, []);

  /* ③ このページを開いた時点で、その1枚を実際に鑑賞している。
     ⑨ 一覧から開いた photo_open とは別のイベントにして、区別できるようにする。 */
  useEffect(() => {
    pushHistory(photo.id);
    track("photo_view_direct", { photo_id: photo.id }, photo.id);
  }, [photo.id]);

  /* 写真詳細ページにも、他の一覧と同じビューアを付ける。
     以前はこのページにだけ拡大も全画面も無く、いちばん大きく見たい場面で
     それができなかった。写真を押す (または拡大ボタン) とその場で開き、
     前後はこの撮影地の写真の並びになる。 */
  const viewer = usePhotoViewer(lang, { entry: "photo_page", selfId: photo.id });
  const locIds = useMemo(() => {
    const pf = PREFECTURES.find((p) => p.pref === prefJp);
    const ids = pf ? pf.photos.filter((p) => p.loc === locJp).map((p) => p.id) : [];
    return ids.includes(photo.id) ? ids : [photo.id];
  }, [prefJp, locJp, photo.id]);
  const similarIds = useMemo(() => similarPhotos.map((p) => p.id), [similarPhotos]);
  const seasonIds = useMemo(() => otherSeasons.map((p) => p.id), [otherSeasons]);

  /* I-1: ←/→ keyboard navigation between sibling photos (same loc)。
     ビューアを開いている間は、ビューア側の ←/→ に任せる */
  const viewerOpen = viewer.isOpen;
  useEffect(() => {
    if (viewerOpen) return;
    const onKey = (e) => {
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.key === "ArrowLeft" && prevHref) window.location.href = prevHref;
      else if (e.key === "ArrowRight" && nextHref) window.location.href = nextHref;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevHref, nextHref, viewerOpen]);

  /* I-1: horizontal swipe on the hero figure navigates siblings */
  const swipeRef = useState(() => ({ x: 0, y: 0, moved: false }))[0];
  const onFigTouchStart = (e) => { swipeRef.x = e.touches[0].clientX; swipeRef.y = e.touches[0].clientY; swipeRef.moved = false; };
  const onFigTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - swipeRef.x;
    const dy = e.changedTouches[0].clientY - swipeRef.y;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      swipeRef.moved = true;
      if (dx > 0 && prevHref) window.location.href = prevHref;
      else if (dx < 0 && nextHref) window.location.href = nextHref;
    }
  };
  const openHero = (e) => {
    if (swipeRef.moved) { swipeRef.moved = false; return; }
    viewer.open(locIds, photo.id, e.currentTarget);
  };

  const photoUrl = cldUrl(photo.id, imgW);
  const altText = richAlt({ locName: locLocal, prefName: prefLocal, year: photo.year, locJp, lang });
  const amb = ambient(photo.id, 0.14);
  const enName = getLocName(locJp, "en");

  /* 下の3つの一覧 (同じ撮影地 / 他の季節 / 似た写真) で共通のカード。
     リンクは残し (クロールでき、新しいタブでも開ける)、通常の左クリックだけ
     ビューアに差し替える。list はビューアの中で前後に送れる範囲。 */
  const card = (p, href, list, alt, cap, entry) => (
    <a
      key={p.id}
      href={href}
      data-pid={p.id}
      className={"jg-item" + (isPortrait(p.id) ? " tall" : "")}
      onContextMenu={(e) => e.preventDefault()}
      onClick={(e) => {
        if (!isPlainClick(e)) return;
        if (viewer.open(list, p.id, e.currentTarget, entry)) e.preventDefault();
      }}
    >
      <img src={cldUrl(p.id, 600)} alt={alt} loading="lazy" decoding="async" draggable="false" />
      {cap ? <span className="jg-cap">{cap}</span> : null}
    </a>
  );

  return (
    <div className="page-root" data-accent="" style={{ ...accentStyle(photo.id), background: amb ? `radial-gradient(120% 58% at 50% 0%, ${amb}, transparent 62%) #0a0a0a` : undefined }}>
      {/* 写真詳細は7言語ぶんしか存在しない。他18言語は同じ言語の撮影地ページ (実在) へ送り 404 を作らない */}
      <SiteHeader
        lang={lang}
        langHrefFor={(c) => (PHOTO_LANGS.includes(c) ? `/${c}/${prefSlug}/${locSlug}/${photo.id}` : `/${c}/${prefSlug}/${locSlug}`)}
      />

      <main className="pg pg-wide">
        <nav aria-label={ui("breadcrumb", lang)} className="bc">
          <a href={`/${lang}`}>Landscapes of Japan</a>
          <span className="bc-sep">›</span>
          <a href={`/${lang}/${prefSlug}`}>{prefLocal}</a>
          <span className="bc-sep">›</span>
          <a href={`/${lang}/${prefSlug}/${locSlug}`}>{locLocal}</a>
          {photo.year && (<><span className="bc-sep">›</span><span>{photo.year}</span></>)}
        </nav>

        {prevHref && <a className="photo-nav-arrow left" href={prevHref} aria-label={ui("previousPhoto", lang)} rel="prev">‹</a>}
        {nextHref && <a className="photo-nav-arrow right" href={nextHref} aria-label={ui("nextPhoto", lang)} rel="next">›</a>}
        {position && position.total > 1 && (
          <div className="photo-nav-count">{position.idx + 1} / {position.total}</div>
        )}
        <figure className="pp-fig" data-pid={photo.id} onTouchStart={onFigTouchStart} onTouchEnd={onFigTouchEnd} onClick={openHero}>
          <img
            src={photoUrl}
            srcSet={`${cldUrl(photo.id, 800)} 800w, ${cldUrl(photo.id, 1200)} 1200w, ${cldUrl(photo.id, 2400)} 2400w, ${cldUrl(photo.id, 3840)} 3840w`}
            sizes="(max-width: 768px) 100vw, min(1400px, 96vw)"
            alt={altText}
            fetchPriority="high"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            style={{ viewTransitionName: "vt-hero" }}
          />
          <div className="cin-lb-wm">Landscapes of Japan</div>
          {/* 拡大・全画面への入口。写真そのものを押しても同じ */}
          <button type="button" className="pa-btn pp-zoom" aria-label={ui("fullscreen", lang)} title={ui("fullscreen", lang)}
            onClick={(e) => { e.stopPropagation(); viewer.open(locIds, photo.id, e.currentTarget.parentElement); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
          </button>
        </figure>

        <header className="pp-head">
          {lang !== "ja" && <span className="pp-ja" lang="ja" aria-hidden="true">{locJp}</span>}
          <h1 className="pp-title" lang={lang === "ja" ? "ja" : undefined}>{locLocal}</h1>
          <div className="ph-meta">
            <a href={`/${lang}/${prefSlug}`}>{prefLocal}</a>
            {photo.year && <span>{photo.year}</span>}
            {lang === "ja" && enName !== locLocal && <span>{enName}</span>}
          </div>

          {/* ③④⑦ この写真への操作 (お気に入り / 共有 / 問い合わせ)。Lightbox と同じ部品 */}
          <PhotoActions photoId={photo.id} lang={lang} entry="photo_page" className="pa-bar-page" />
        </header>

        {related.length > 0 && (
          <section className="sec">
            <h2 className="sec-h">{lang === "ja" ? `${locLocal}の他の写真` : `More from ${locLocal}`}</h2>
            <div className="jg jg-s">
              {related.map((p) => card(p, `/${lang}/${prefSlug}/${locSlug}/${p.id}`, locIds, `${locLocal} - ${prefLocal}`, null, "photo_page"))}
            </div>
            <div style={{ marginTop: 20 }}>
              <a className="more-link" href={`/${lang}/${prefSlug}/${locSlug}`}>
                {lang === "ja" ? `${locLocal} すべての写真` : `View all ${locLocal} photos`} →
              </a>
            </div>
          </section>
        )}

        {/* T5: この場所の他の季節 (同loc・別シーズン) */}
        {otherSeasons.length > 0 && (
          <section className="sec">
            <h2 className="sec-h">{OTHER_SEASONS_TITLE[lang] || OTHER_SEASONS_TITLE.en}</h2>
            <div className="jg jg-s">
              {otherSeasons.map((p) => card(
                p, `/${lang}/${prefSlug}/${locSlug}/${p.id}`, seasonIds,
                `${locLocal} - ${seasonLabel(p.season, lang)}`,
                <>{seasonLabel(p.season, lang)}{p.year ? <span className="jg-cap-sub">{p.year}</span> : null}</>,
                "photo_page"
              ))}
            </div>
          </section>
        )}

        {/* ⑦ 似た写真。選定は写真の画像特徴で、サーバー側 (similar.js) で確定済み。
            見出しは25言語ある ui("similarPhotos") を使う */}
        {similarPhotos.length > 0 && (
          <section className="sec">
            <h2 className="sec-h">{ui("similarPhotos", lang)}</h2>
            <div className="jg jg-s">
              {similarPhotos.map((p) => {
                const sLocSlug = LOC_SLUGS[p.loc];
                const sPrefSlug = PREF_SLUGS[p.pref];
                if (!sLocSlug || !sPrefSlug) return null;
                return card(
                  p, `/${lang}/${sPrefSlug}/${sLocSlug}/${p.id}`, similarIds,
                  `${getLocName(p.loc, lang)} - ${getPrefName(p.pref, lang)}`,
                  <>{getLocName(p.loc, lang)}<span className="jg-cap-sub">{getPrefName(p.pref, lang)}</span></>,
                  "related"
                );
              })}
            </div>
          </section>
        )}
      </main>
      {viewer.element}
    </div>
  );
}
