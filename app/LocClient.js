"use client";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import PhotoImage from "./PhotoImage.js";
import { PREFECTURES, getPrefName, getLocName, getUrl, cldPlaceholder, lbWidth } from "./data.js";
import { PHOTO_LANGS } from "./i18n-meta.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { getCollectionName } from "./collections-meta.js";
import { richAlt } from "./title-keywords.js";
import SiteHeader from "./SiteHeader.js";
import Lightbox from "./Lightbox.js";
import Theater from "./Theater.js";
import { track } from "./analytics.js";
import { ui } from "./ui-strings.js";
import { useOriginRect, animateToRect } from "./useViewTransition.js";
import { thumbRectOf } from "./usePhotoViewer.js";
import { isPortrait, accentStyle } from "./photo-meta.js";
import { getRegionOfPref, getSiblingPrefs } from "./regions.js";
import Weather from "./Weather.js";
import SunTimes from "./SunTimes.js";

export default function LocClient({ lang, prefJp, locJp, collections = [], dims = {} }) {
  const pf = PREFECTURES.find((p) => p.pref === prefJp);
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
     読むのは最初の1回だけ。開いたあとの「戻る」(= 閉じる) と URL の書き換えは
     Lightbox が扱うので、ここで popstate を見て開き直すことはしない。 */
  const urlRead = useRef(false);
  useEffect(() => {
    if (urlRead.current) return;
    urlRead.current = true;
    try {
      const id = new URLSearchParams(window.location.search).get("photo");
      if (!id) return;
      const i = allPhotos.findIndex((p) => p.id === id);
      if (i >= 0) setLightbox(i);
    } catch {}
  }, [allPhotos]);

  const closeLightbox = useCallback(() => {
    /* ③ 「今 Lightbox に出ている写真」のサムネイルへ戻す。
       Lightbox 内で別写真へ移動していた場合も、戻り先はその写真のカードになるので
       無関係な写真へ変形しない。画面外なら rect が取れないのでフェードになる。 */
    const idx = lightboxRef.current;
    const curId = idx !== null && allPhotos[idx] ? allPhotos[idx].id : null;
    setLbClosing(true);
    animateToRect(document.querySelector(".cin-lb-inner img"), thumbRectOf(curId), () => {
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
  const enName = getLocName(locJp, "en");

  return (
    /* アクセント色はこの撮影地の写真から作る (紅葉の名所なら朱、海なら青に寄る) */
    <div className="page-root" data-accent="" style={accentStyle(photos.map((p) => p.id))}>
      <SiteHeader lang={lang} langHrefFor={(c) => `/${c}/${prefSlug}/${locSlug}`} />

      <main className="pg">
        <nav aria-label={ui("breadcrumb", lang)} className="bc">
          <a href={`/${lang}`}>Landscapes of Japan</a>
          <span className="bc-sep">›</span>
          <a href={`/${lang}/${prefSlug}`}>{prefLocal}</a>
          <span className="bc-sep">›</span>
          <span>{locLocal}</span>
        </nav>

        {/* 地名を主役にする: 日本語の地名を明朝の縦組みで大きく置き、各言語の地名は小さく添える。
            日本語ページでは縦組みそのものが見出し (h1)。他の言語では縦組みは飾りで、
            その言語の地名が h1 になる (検索結果とページ見出しの言語をそろえる)。 */}
        <header className="ph">
          {lang === "ja"
            ? <h1 className="ph-tate" lang="ja" style={{ "--n": [...locJp].length }}>{locJp}</h1>
            : <div className="ph-tate" lang="ja" aria-hidden="true" style={{ "--n": [...locJp].length }}>{locJp}</div>}
          <div className="ph-side">
            {lang !== "ja"
              ? <h1 className="ph-name">{locLocal}</h1>
              : enName !== locJp && <div className="ph-name">{enName}</div>}
            <div className="ph-meta">
              <a href={`/${lang}/${prefSlug}`}>{prefLocal}</a>
              <span>{photos.length}</span>
            </div>
            {photos.length > 1 && (
              <button className="th-launch" onClick={() => { setTheater(true); track("theater_open", { from: "loc" }, "loc"); }} aria-label={ui("theater", lang)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 21 12 6 21" /></svg>
                {ui("theater", lang)}
              </button>
            )}
          </div>
          {/* 天気と日の出は題の横 (PC) / 題の下に全幅 (スマホ)。狭い列に押し込むとはみ出す */}
          {pf?.lat && pf?.lng && (
            <div className="ph-info">
              <Weather lat={pf.lat} lng={pf.lng} lang={lang} />
              <SunTimes lat={pf.lat} lng={pf.lng} lang={lang} />
            </div>
          )}
        </header>

        <section id="photos">
          {/* 縦位置の写真も切らずに並べる (.jg = 行の高さをそろえて全体を見せる並べ方) */}
          <div className="jg">
            {photos.map((photo, i) => {
              /* 写真詳細ページが存在する言語だけ実リンクにする。
                 存在しない18言語では href を作らず、従来どおり div + Lightbox のまま。 */
              const detailHref = hasPhotoPages && prefSlug && locSlug && photo.id
                ? `/${lang}/${prefSlug}/${locSlug}/${photo.id}`
                : null;
              const cls = "jg-item" + (isPortrait(photo.id) ? " tall" : "");
              const cardStyle = { backgroundImage: `url(${cldPlaceholder(photo.id)})` };
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
                <PhotoImage
                  id={photo.id}
                  alt={richAlt({ locName: locLocal, prefName: prefLocal, year: photo.year, locJp, lang })}
                  dims={dims[photo.id] || null}
                  sizes="(max-width: 600px) 48vw, (max-width: 1024px) 32vw, 300px"
                  widths="grid"
                  priority={i < 2}
                />
              );
              /* a は既定の下線・色を打ち消し、リンクテキストは img の alt がそのまま担う
                 (別途ラベルを足さない)。data-pid は閉じるときの戻り先を引くための印。 */
              return detailHref ? (
                <a
                  key={photo.id + i}
                  data-pid={photo.id}
                  href={detailHref}
                  className={cls}
                  onClick={onCardClick}
                  onMouseEnter={preload}
                  onContextMenu={(e) => e.preventDefault()}
                  style={cardStyle}
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={photo.id + i}
                  data-pid={photo.id}
                  className={cls}
                  role="button"
                  tabIndex={0}
                  onClick={onCardClick}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onCardClick(e); } }}
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
          <section className="sec">
            <h2 className="sec-h">{lang === "ja" ? `${prefLocal}の他の場所` : `More in ${prefLocal}`}</h2>
            <div className="chips scroll">
              {siblings.map((loc) => {
                const slugV = LOC_SLUGS[loc];
                if (!slugV) return null;
                const cnt = pf.photos.filter((p) => p.loc === loc).length;
                return (
                  <a key={loc} className="chip" href={`/${lang}/${prefSlug}/${slugV}`}>
                    {getLocName(loc, lang)}<span className="chip-n">{cnt}</span>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* この撮影地の写真が実際に入っているコレクション (server 側で写真単位に集計。
            旧実装は collection.locs の loc 単位判定で、写真タグ由来の鳥/動物が出なかった) */}
        {collections.length > 0 && (
          <section id="related" className="sec">
            <h2 className="sec-h">{ui("collections", lang)}</h2>
            <div className="chips">
              {collections.map((c) => (
                <a key={`c-${c.slug}`} className="chip" href={`/${lang}/collections/${c.slug}`}>
                  {getCollectionName(c.slug, lang)}<span className="chip-n">{c.count}</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* A19: PageRank流通最適化 — 同地方の他pref へのリンク */}
        {(() => {
          const region = getRegionOfPref(prefJp);
          const sibs = getSiblingPrefs(prefJp);
          if (!region || sibs.length === 0) return null;
          const covered = sibs
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

        {/* 47都道府県すべてを見るリンク (常に表示) */}
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
