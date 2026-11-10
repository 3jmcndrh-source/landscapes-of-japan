"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
/* P7: d3 (~large) is code-split out of the main bundle and fetched on demand
   the first time the map needs it. */
let _d3Promise = null;
const loadD3 = () => (_d3Promise ??= import("d3"));
import { SEO_META, SITE_URL, OG_IMAGE, HREFLANG, photoLang } from "./i18n-meta.js";
import { TR, PREFECTURES, PREF_I18N, LOC_I18N, MAP_PINS, cldUrl, getUrl, getPrefName, getLocName, GEOJSON_URLS, MW, MH, lbWidth } from "./data.js";
import { PHOTO_DATES } from "./photo-dates.js";
import { PHOTO_ADDED } from "./photo-added.js";
import { photoById, photoUrl as photoRefUrl, photoLabel, hasPhotoPages } from "./photo-ref.js";
import { track } from "./analytics.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { REGIONS } from "./regions.js";
import { richAlt } from "./title-keywords.js";
import { getCollectionName } from "./collections-meta.js";
import SiteHeader from "./SiteHeader.js";
import ExploreSection from "./ExploreSection.js";
import Lightbox from "./Lightbox.js";
import { useOriginRect, animateToRect } from "./useViewTransition.js";
import { thumbRectOf } from "./usePhotoViewer.js";
import { isPortrait, accentStyle } from "./photo-meta.js";
import Theater from "./Theater.js";
import HeroRotation from "./HeroRotation.js";
import PhotoOfTheDay from "./PhotoOfTheDay.js";
import { ui } from "./ui-strings.js";

/* I-7: hero 直下のコレクション導線 (サイトの中身が 3 秒で分かる) */
const HERO_CHIP_SLUGS = ["cherry-blossoms", "snow", "castles", "temples-shrines", "hot-springs", "coastal", "night-views", "autumn-foliage", "birds", "animals"];

/* ヒーロー (表紙) は「いまの季節に撮った写真」を出す。季節は閲覧時の日本時間の月で決める。
   以前は季節を問わない8枚の固定リストを巡回していて、真夏に雪景色が表紙になっていた。

   候補は scripts/suggest-hero.mjs が撮影月 (photo-months.js)・縦横・タグから出し、
   その一覧画像を目で見て選んだもの。差し替えはこの表を編集するだけ。順序 = 表示順。
   選ぶ基準: 横位置 / 全画面で主題が分かる / 左下の題字と重なる位置に主題が無い。
   冬は掲載写真そのものが少ない (12〜2月撮影は6枚)。白川郷は11月の初雪だが
   雪景色なので冬に入れている。 */
const HERO_BY_SEASON = {
  spring: [
    "wcrs6gq9eutte8fwrzpp", // 新倉山浅間公園 — 桜×五重塔×富士
    "ygqe7593bqgt1ehxfxqa", // 河口湖 — 桜越しの富士
    "ubnattnp6rlf4wtv61mi", // 新倉山浅間公園 — 横位置 (1枚目は縦位置で、横長の画面には出ない)
    "m2gdhydxlmqu3itlta9v", // 松本城 — 桜と天守
    "rnlyiorswvgfwgyvu6uj", // 北竜町 — 菜の花畑
    "xcgllidnf2ywtsmqresk", // 安養寺 — しだれ桜の水鏡
    "qh8ijx3ahxvfceqbod9q", // 高島城 — 桜と天守
    "uogey3f0zr0sqnd6hnhe", // 沖縄 — ハートロックの浜
    "bxt5gtw3rnuqxrx46ppl", // 天空の楽園 — 春の星空
  ],
  summer: [
    "sgqomcwsuq18xc1oyr3g", // 知床 — 断崖の海岸線
    "dsc05922-6deca0",      // 弟子屈 — 摩周湖の青
    "dsc04910-7adbbc",      // 竹富島 — 白い浜
    "dsc08239-97d4e0",      // 富良野 — 花畑
    "dsc05907-4235f3",      // 清里町 — 神の子池
    "wt6ow9shewohl0dm0lnj", // 宮古島 — エメラルドの海
    "dsc05986_2-1741dc",    // 大空町 — 丘の並木
    "dsc04851-4bd0fe",      // 竹富島 — 天の川
  ],
  autumn: [
    "DSC07290_sz6x7s",      // 金閣寺 — 金×紅葉
    "DSC07451_s1rhpd",      // 東福寺 — 紅葉
    "dsc09059-bae41e",      // 東川町 — 旭岳の紅葉と噴気
    "DSC07563_icizbb",      // 清水寺 — 夕景の舞台
    "dsc09204-6546f9",      // 網走 — 能取湖のサンゴ草
    "DSC07173_ogwql9",      // 姫路城 — 紅葉
    "qsn9a5qfmcav4ufkwehz", // 父母ヶ浜 — 夕暮れの水鏡
    "iqzmqcxvlmzmpxb3e8nl", // 金沢 — 紅葉のライトアップ
  ],
  winter: [
    "qvsgt1aw6o4iwewvhmdc", // 白川郷 — 雪の合掌集落
    "y4l6gy5xwtz8d3fvvjb0", // 白川郷 — 合掌造り
    "usvnljzznwmqu93sftg1", // さっぽろ雪まつり — 雪像
    "ake8ymyn7d0qnybyzihw", // 白川郷
    "vnvzv0ztfpwvvrvl5lfn", // 白川郷
    "rj0whx4syklikykwjq6z", // さっぽろ雪まつり
  ],
};
/* 日本時間の月 → 季節 (3-5 春 / 6-8 夏 / 9-11 秋 / 12-2 冬) */
const seasonNowJst = () => {
  const m = new Date(Date.now() + 9 * 3600e3).getUTCMonth() + 1;
  return m >= 3 && m <= 5 ? "spring" : m >= 6 && m <= 8 ? "summer" : m >= 9 && m <= 11 ? "autumn" : "winter";
};

/* 「ガイド」は 2026-07 のコンテンツ削減でガイド文自体が無くなったため文言から除去 */
const VIEW_ALL = {
  ja: "詳細を見る", en: "View details", zh: "查看详情", "zh-tw": "查看詳情",
  ko: "자세히 보기", es: "Ver detalles", fr: "Voir les détails",
  de: "Details ansehen", pt: "Ver detalhes", it: "Vedi dettagli",
  ru: "Подробнее", ar: "عرض التفاصيل", hi: "विवरण देखें",
  th: "ดูรายละเอียด", vi: "Xem chi tiết", id: "Lihat detail",
  tr: "Ayrıntıları gör", nl: "Details bekijken", pl: "Zobacz szczegóły", sv: "Visa detaljer",
};

/* ギャラリー表示モード切替 (地域別 / 撮影日順) のラベル。未対応言語は en フォールバック */
const GALLERY_MODE_LABELS = {
  region: { ja: "地域別", en: "By region", zh: "按地区", "zh-tw": "按地區", ko: "지역별", es: "Por región", fr: "Par région", de: "Nach Region", pt: "Por região", it: "Per regione", ru: "По региону", ar: "حسب المنطقة", hi: "क्षेत्र अनुसार", th: "ตามภูมิภาค", vi: "Theo vùng", id: "Per wilayah", tr: "Bölgeye göre", nl: "Op regio", pl: "Wg regionu", sv: "Efter region" },
  date: { ja: "撮影日順", en: "By date", zh: "按拍摄日期", "zh-tw": "按拍攝日期", ko: "촬영일순", es: "Por fecha", fr: "Par date", de: "Nach Datum", pt: "Por data", it: "Per data", ru: "По дате", ar: "حسب التاريخ", hi: "तिथि अनुसार", th: "ตามวันที่", vi: "Theo ngày", id: "Per tanggal", tr: "Tarihe göre", nl: "Op datum", pl: "Wg daty", sv: "Efter datum" },
};
/* 縦組みの地名は「都・府・県」を外して短く見せる (北海道はそのまま)。表示だけの加工 */
const jaShort = (pref) => (pref === "北海道" ? pref : pref.replace(/[都府県]$/, ""));
const MONTH_EN = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthLabel = (year, month, lang) => {
  if (!month) return String(year || "");
  if (lang === "ja" || lang === "zh" || lang === "zh-tw") return `${year}年${month}月`;
  if (lang === "ko") return `${year}년 ${month}월`;
  return `${MONTH_EN[month]} ${year}`;
};

/* ── Translations (20 langs, compact) ── */
function JapanMap({ lang, photos, onPinClick, hlId }) {
  const [hov, setHov] = useState(null);
  const [tapped, setTapped] = useState(null); /* mobile: first tap shows name */
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const zoomRef = useRef(null);
  const t = TR[lang];

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width:768px)").matches);
    const mq = window.matchMedia("(max-width:768px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* D3 zoom for mobile pinch-to-zoom (d3 lazy-loaded) */
  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;
    let alive = true;
    let svgSel = null;
    loadD3().then((d3) => {
      if (!alive || !svgRef.current || !gRef.current) return;
      const svg = d3.select(svgRef.current);
      const g = d3.select(gRef.current);
      svgSel = svg;
      const zoomBehavior = d3.zoom()
        .scaleExtent([1, 5])
        .on("zoom", (e) => {
          g.attr("transform", e.transform);
          setZoomScale(e.transform.k);
        });
      zoomRef.current = zoomBehavior;
      if (isMobile && zoomEnabled) {
        svg.call(zoomBehavior);
        svg.style("touch-action", "none");
      } else {
        svg.on(".zoom", null);
        svg.style("touch-action", "pan-y");
        /* Reset zoom when disabling */
        if (gRef.current) {
          g.attr("transform", d3.zoomIdentity);
          svg.call(zoomBehavior.transform, d3.zoomIdentity);
          setZoomScale(1);
        }
      }
    });
    return () => { alive = false; if (svgSel) svgSel.on(".zoom", null); };
  }, [isMobile, zoomEnabled]);

  const photoPrefSet = useMemo(() => {
    const s = new Set();
    PREFECTURES.forEach(pf => s.add(pf.pref));
    return s;
  }, []);

  const prefMap = useMemo(() => {
    const m = {};
    photos.forEach(p => { m[p.pref] = p; });
    return m;
  }, [photos]);

  useEffect(() => {
    let cancelled = false;
    async function loadMap() {
      for (const url of GEOJSON_URLS) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            if (!cancelled) { setGeoData(data); setLoading(false); }
            return;
          }
        } catch (e) { /* try next */ }
      }
      /* External GeoJSON sources both failed — keep map hidden rather than show the
         English-named JP_GEO fallback which would mismatch prefMap keys and let
         taps land on the wrong prefecture. */
    }
    loadMap();
    return () => { cancelled = true; };
  }, []);

  /* Map zoom/pan disabled — prevents scroll hijack on both PC and mobile */

  /* Helper: compute centroid of a polygon ring */
  const ringCentroid = (ring) => {
    let sx = 0, sy = 0;
    ring.forEach(c => { sx += c[0]; sy += c[1]; });
    return [sx / ring.length, sy / ring.length];
  };

  /* Okinawa inset box dimensions within the SVG */
  const OKI_BOX = { x: 10, y: 140, w: 200, h: 130 };

  const [mapShapes, setMapShapes] = useState({ paths: [], okiPaths: [], project: () => ({ x: 0, y: 0 }), okiProject: () => ({ x: 0, y: 0 }) });
  const { paths, okiPaths, project, okiProject } = mapShapes;
  useEffect(() => {
    if (!geoData) return;
    let alive = true;
    loadD3().then((d3) => {
    if (!alive) return;

    /* Main projection */
    const projection = d3.geoMercator().center([137, 37.5]).scale(1800).translate([MW / 2, MH / 2]);
    const pathGen = d3.geoPath().projection(projection);

    /* Okinawa inset projection */
    const okiProj = d3.geoMercator().center([127.5, 26.5]).scale(3800).translate([OKI_BOX.w / 2, OKI_BOX.h / 2 + 8]);
    const okiPathGen = d3.geoPath().projection(okiProj);

    const ps = [];
    const ops = [];
    let idx = 0;

    const isOkinawaArea = (f) => {
      const name = f.properties.nam_ja || f.properties.name || "";
      if (name === "沖縄県") return true;
      /* Check centroid for unnamed features that might be Okinawa */
      try {
        const coords = f.geometry.type === "MultiPolygon" ? f.geometry.coordinates[0][0] : f.geometry.coordinates[0];
        const cent = ringCentroid(coords);
        return cent[1] < 30 && cent[0] < 132;
      } catch (e) { return false; }
    };

    geoData.features.forEach((f) => {
      const name = f.properties.nam_ja || f.properties.name || "";
      const isPrefWithPhotos = photoPrefSet.has(name);

      if (isOkinawaArea(f)) {
        /* Okinawa goes to inset */
        ops.push({ d: okiPathGen(f), id: idx++, name: name, hasPhotos: isPrefWithPhotos });
      } else if (name === "東京都" && f.geometry.type === "MultiPolygon") {
        f.geometry.coordinates.forEach((polyCoords) => {
          const cent = ringCentroid(polyCoords[0]);
          const isMainland = cent[1] > 34.5;
          const subFeature = { type: "Feature", properties: f.properties, geometry: { type: "Polygon", coordinates: polyCoords } };
          ps.push({ d: pathGen(subFeature), id: idx++, name: name, hasPhotos: isPrefWithPhotos && isMainland });
        });
      } else if (name === "東京都" && f.geometry.type === "Polygon") {
        const cent = ringCentroid(f.geometry.coordinates[0]);
        const isMainland = cent[1] > 34.5;
        ps.push({ d: pathGen(f), id: idx++, name: name, hasPhotos: isPrefWithPhotos && isMainland });
      } else {
        ps.push({ d: pathGen(f), id: idx++, name: name, hasPhotos: isPrefWithPhotos });
      }
    });

    const proj = (lat, lng) => { const p = projection([lng, lat]); return p ? { x: p[0], y: p[1] } : { x: 0, y: 0 }; };
    const okiProjFn = (lat, lng) => { const p = okiProj([lng, lat]); return p ? { x: p[0] + OKI_BOX.x, y: p[1] + OKI_BOX.y } : { x: 0, y: 0 }; };
    setMapShapes({ paths: ps, okiPaths: ops, project: proj, okiProject: okiProjFn });
    });
    return () => { alive = false; };
  }, [geoData, photoPrefSet]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <div style={{ width: 20, height: 20, border: "2px solid rgba(232,228,223,.12)", borderTopColor: "rgba(232,228,223,.4)", borderRadius: "50%", margin: "0 auto 12px", animation: "mapSpin 1s linear infinite" }} />
      </div>
    );
  }

  const handlePrefInteraction = (prefName) => {
    if (!prefMap[prefName]) return;
    if (isMobile) {
      if (tapped === prefName) {
        onPinClick(prefMap[prefName].id);
        setTapped(null);
      } else {
        setTapped(prefName);
        setHov(prefName);
      }
    } else {
      onPinClick(prefMap[prefName].id);
    }
  };

  /* Clear tapped state when tapping outside */
  const handleSvgClick = (e) => {
    if (e.target.tagName === "svg") { setTapped(null); setHov(null); }
  };

  const activeHov = isMobile ? tapped : hov;

  return (
    <div className="cin-map-responsive">
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <span style={{ fontFamily: "'Noto Sans JP','Noto Sans',sans-serif", fontSize: 20, letterSpacing: ".08em", color: "rgba(232,228,223,.7)", fontWeight: 500, border: "1px solid rgba(232,228,223,.3)", padding: "8px 24px", display: "inline-block" }}>{t.mapL}</span>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontFamily: "'Noto Sans JP','Noto Sans',sans-serif", fontSize: 14, color: "color-mix(in srgb,var(--accent) 50%,transparent)", letterSpacing: ".05em" }}>{t.mapH}</span>
        </div>
      </div>
      <svg ref={svgRef} viewBox={"0 0 " + MW + " " + MH} style={{ width: "100%", height: "auto", display: "block" }} onClick={handleSvgClick}>
        <defs>
          <radialGradient id="goldGrad" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="color-mix(in srgb,var(--accent-hi) 58%,transparent)" />
            <stop offset="55%" stopColor="color-mix(in srgb,var(--accent) 38%,transparent)" />
            <stop offset="100%" stopColor="color-mix(in srgb,var(--accent) 18%,transparent)" />
          </radialGradient>
          <radialGradient id="goldGradHover" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="color-mix(in srgb,var(--accent-hi) 78%,transparent)" />
            <stop offset="60%" stopColor="color-mix(in srgb,var(--accent-hi) 55%,transparent)" />
            <stop offset="100%" stopColor="color-mix(in srgb,var(--accent) 25%,transparent)" />
          </radialGradient>
          <linearGradient id="pathNeutral" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(232,228,223,0.22)" />
            <stop offset="100%" stopColor="rgba(232,228,223,0.10)" />
          </linearGradient>
          <filter id="tipBlur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
          </filter>
          <linearGradient id="okiFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in srgb,var(--accent) 0%,transparent)" />
            <stop offset="20%" stopColor="color-mix(in srgb,var(--accent) 28%,transparent)" />
            <stop offset="80%" stopColor="color-mix(in srgb,var(--accent) 22%,transparent)" />
            <stop offset="100%" stopColor="color-mix(in srgb,var(--accent) 0%,transparent)" />
          </linearGradient>
        </defs>
        <g ref={gRef}>
        {paths.map(p => {
          if (!p.d) return null;
          const isHL = p.hasPhotos;
          const isHovered = activeHov === p.name;
          const isActive = hlId && prefMap[p.name] && prefMap[p.name].id === hlId;
          const fill = isHL
            ? (isHovered || isActive ? "url(#goldGradHover)" : "url(#goldGrad)")
            : (isHovered ? "rgba(232,228,223,0.30)" : "url(#pathNeutral)");
          const stroke = isHL
            ? (isHovered || isActive ? "color-mix(in srgb,var(--accent-hi) 90%,transparent)" : "color-mix(in srgb,var(--accent) 55%,transparent)")
            : (isHovered ? "rgba(232,228,223,0.55)" : "rgba(232,228,223,0.32)");
          return (
            <path key={p.id} d={p.d}
              fill={fill}
              stroke={stroke}
              strokeWidth={isHL ? (isHovered || isActive ? 1.6 : 1.2) : 0.85}
              strokeLinejoin="round"
              style={{ cursor: isHL ? "pointer" : "default", transition: "fill .3s, stroke .3s, stroke-width .3s" }}
              onClick={(e) => { e.stopPropagation(); if (isHL) { handlePrefInteraction(p.name); } else if (isMobile) { setTapped(p.name); setHov(p.name); } }}
              onMouseEnter={() => !isMobile && p.name && setHov(p.name)}
              onMouseLeave={() => !isMobile && setHov(null)}
            />
          );
        })}
        {/* Tooltip — with photo (thumbnail + link) or name only */}
        {activeHov && (() => {
          const hasPhoto = !!prefMap[activeHov];
          const pin = prefMap[activeHov];
          /* Compute position: use pin lat/lng if available, otherwise find centroid from path data */
          let pos;
          if (pin) {
            pos = project(pin.lat, pin.lng);
          } else {
            /* Find the path for this prefecture and compute SVG centroid */
            const matchPath = paths.find(pp => pp.name === activeHov && pp.d);
            if (matchPath) {
              const tmp = document.createElementNS("http://www.w3.org/2000/svg", "path");
              tmp.setAttribute("d", matchPath.d);
              const len = tmp.getTotalLength();
              let sx = 0, sy = 0, samples = 20;
              for (let s = 0; s < samples; s++) { const pt = tmp.getPointAtLength(len * s / samples); sx += pt.x; sy += pt.y; }
              pos = { x: sx / samples, y: sy / samples };
            } else {
              return null;
            }
          }

          const tipGap = isMobile ? 36 : 10;
          if (hasPhoto) {
            const tipW = 168, tipH = 66;
            const flipX = pos.x + tipW + tipGap > MW - 20;
            const tx = flipX ? pos.x - tipW - tipGap : pos.x + tipGap;
            const ty = Math.max(5, Math.min(MH - tipH - 5, pos.y - tipH / 2));
            const clipId = "hovClip_" + activeHov;
            const tipTap = isMobile ? (e) => { e.stopPropagation(); handlePrefInteraction(activeHov); } : undefined;
            return (
              <g style={{ pointerEvents: isMobile ? "auto" : "none", cursor: isMobile ? "pointer" : "default" }} onClick={tipTap}>
                <rect x={tx} y={ty} width={tipW} height={tipH} rx={10} fill="rgba(14,12,10,.82)" stroke="color-mix(in srgb,var(--accent) 38%,transparent)" strokeWidth=".6" />
                <rect x={tx} y={ty} width={tipW} height={tipH} rx={10} fill="none" stroke="color-mix(in srgb,var(--accent-hi) 15%,transparent)" strokeWidth="1" filter="url(#tipBlur)" />
                <clipPath id={clipId}><rect x={tx + 7} y={ty + 8} width={46} height={32} rx={6} /></clipPath>
                <image href={pin.thumb} x={tx + 7} y={ty + 8} width={46} height={32} clipPath={"url(#" + clipId + ")"} preserveAspectRatio="xMidYMid slice" />
                <text x={tx + 62} y={ty + 24} fill="#f2ece2" fontSize="11.5" fontFamily="var(--font-zen-kaku), 'Noto Sans JP', sans-serif" fontWeight="500" letterSpacing=".04em">{getPrefName(activeHov, lang)}</text>
                <text x={tx + 62} y={ty + 44} fill="color-mix(in srgb,var(--accent) 72%,transparent)" fontSize="8.5" fontFamily="var(--font-zen-kaku), 'Noto Sans JP', sans-serif" letterSpacing=".08em">{t.tapHint}</text>
              </g>
            );
          } else {
            /* Name-only tooltip for prefectures without photos */
            const tipW = 118, tipH = 32;
            const flipX = pos.x + tipW + tipGap > MW - 20;
            const tx = flipX ? pos.x - tipW - tipGap : pos.x + tipGap;
            const ty = Math.max(5, Math.min(MH - tipH - 5, pos.y - tipH / 2));
            return (
              <g style={{ pointerEvents: "none" }}>
                <rect x={tx} y={ty} width={tipW} height={tipH} rx={8} fill="rgba(14,12,10,.76)" stroke="rgba(232,228,223,.18)" strokeWidth=".6" />
                <text x={tx + tipW / 2} y={ty + 20} fill="rgba(232,228,223,.7)" fontSize="10" fontFamily="var(--font-zen-kaku), 'Noto Sans JP', sans-serif" textAnchor="middle" letterSpacing=".06em">{getPrefName(activeHov, lang)}</text>
              </g>
            );
          }
        })()}
        {/* ── Okinawa Inset (soft gradient divider) ── */}
        <g>
          <defs>
            <clipPath id="okiClip"><rect x={0} y={0} width={OKI_BOX.w} height={OKI_BOX.h} /></clipPath>
          </defs>
          <line x1={OKI_BOX.x} y1={OKI_BOX.y + 6} x2={OKI_BOX.x + OKI_BOX.w} y2={OKI_BOX.y + 6}
            stroke="url(#okiFade)" strokeWidth=".8" />
          <text x={OKI_BOX.x + OKI_BOX.w / 2} y={OKI_BOX.y + 16} fill="rgba(232,228,223,.42)" fontSize="9"
            fontFamily="var(--font-serif)" textAnchor="middle" letterSpacing=".18em">{t.oki}</text>
          <g transform={"translate(" + OKI_BOX.x + "," + OKI_BOX.y + ")"} clipPath="url(#okiClip)">
            <rect
              x={0} y={0} width={OKI_BOX.w} height={OKI_BOX.h}
              fill="#000" fillOpacity={0.001}
              pointerEvents="all"
              style={{ cursor: prefMap["沖縄県"] ? "pointer" : "default" }}
              onClick={(e) => { e.stopPropagation(); if (prefMap["沖縄県"]) handlePrefInteraction("沖縄県"); }}
            />
            {okiPaths.map(p => {
              if (!p.d) return null;
              const isHL = p.hasPhotos;
              const isHovered = activeHov === p.name;
              const fill = isHL
                ? (isHovered ? "url(#goldGradHover)" : "url(#goldGrad)")
                : (isHovered ? "rgba(232,228,223,0.30)" : "url(#pathNeutral)");
              const stroke = isHL
                ? (isHovered ? "color-mix(in srgb,var(--accent-hi) 90%,transparent)" : "color-mix(in srgb,var(--accent) 55%,transparent)")
                : (isHovered ? "rgba(232,228,223,0.55)" : "rgba(232,228,223,0.32)");
              return (
                <path key={"oki" + p.id} d={p.d}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isHL ? (isHovered ? 1.4 : 1.0) : 0.75}
                  strokeLinejoin="round"
                  style={{ cursor: isHL ? "pointer" : "default", transition: "fill .3s, stroke .3s" }}
                  onClick={(e) => { e.stopPropagation(); if (isHL) { handlePrefInteraction(p.name); } else if (isMobile) { setTapped(p.name); setHov(p.name); } }}
                  onMouseEnter={() => !isMobile && p.name && setHov(p.name)}
                  onMouseLeave={() => !isMobile && setHov(null)}
                />
              );
            })}
          </g>
        </g>
        </g>
      </svg>
      {isMobile && (
        <div className="map-zoom-controls">
          <button
            className={"map-zoom-btn" + (zoomEnabled ? " map-zoom-btn-active" : "")}
            onClick={() => setZoomEnabled(z => !z)}
            aria-label={zoomEnabled ? t.mapZoomOff : t.mapZoomOn}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              {!zoomEnabled && <><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></>}
            </svg>
            <span>{zoomEnabled ? t.mapZoomOff : t.mapZoomOn}</span>
          </button>
          {zoomEnabled && zoomScale > 1 && (
            <button
              className="map-zoom-btn"
              onClick={() => {
                loadD3().then((d3) => {
                  if (svgRef.current && zoomRef.current) {
                    const svg = d3.select(svgRef.current);
                    svg.transition().duration(300).call(zoomRef.current.transform, d3.zoomIdentity);
                  }
                });
              }}
              aria-label={t.mapZoomReset}
            >
              {t.mapZoomReset}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function PageClient({ initialLang = "ja" }) {
  const [lang, setLang] = useState(initialLang);
  const [lightbox, setLightbox] = useState(null);
  const [lbClosing, setLbClosing] = useState(false);
  const [theaterOpen, setTheaterOpen] = useState(false);
  const [galleryMode, setGalleryMode] = useState("region"); // "region" | "date" | "added"
  /* 閉じるときは「いま表示している写真」のサムネイルへ戻す (画面に無ければフェード)。
     URL と履歴は Lightbox が扱う (開くと写真のURLになり、戻るで閉じて元のURLへ戻る)。
     以前ここで書いていた #photo=ID は履歴に積まれず、スマホの「戻る」で
     ビューアが閉じずに前のページへ飛んでいた。 */
  const lightboxRef = useRef(null);
  useEffect(() => { lightboxRef.current = lightbox; }, [lightbox]);
  const activeRef = useRef([]);
  const closeLightbox = useCallback(() => {
    const i = lightboxRef.current;
    const id = i !== null && activeRef.current[i] ? activeRef.current[i].id : null;
    setLbClosing(true);
    animateToRect(document.querySelector(".cin-lb-inner img"), thumbRectOf(id), () => {
      setLightbox(null);
      setLbClosing(false);
    });
  }, []);
  const origin = useOriginRect();

  /* Responsive image sizes (default to desktop for SSR, update on client) */
  const [imgSizes, setImgSizes] = useState({ thumbW: 1200, lbW: 2400 });
  useEffect(() => {
    const lb = lbWidth();
    if (lb !== 2400) setImgSizes({ thumbW: lb === 800 ? 600 : 1200, lbW: lb });
  }, []);
  const { thumbW, lbW } = imgSizes;

  /* Flat list of all photos for lightbox navigation (region order) */
  const allPhotos = useMemo(() => {
    const list = [];
    PREFECTURES.forEach(pf => {
      pf.photos.forEach(photo => {
        list.push({ id: photo.id, url: getUrl(photo, lbW), pref: pf.pref, loc: photo.loc || "", year: photo.year || null });
      });
    });
    return list;
  }, [lbW]);

  /* 撮影日順の並び (都道府県をまたいだ厳密な時系列, 新しい順)。撮影日不明は年で代替。 */
  const datePhotos = useMemo(() => {
    return [...allPhotos].sort((a, b) => {
      const da = PHOTO_DATES[a.id] || (a.year ? `${a.year}-00-00` : "0000-00-00");
      const db = PHOTO_DATES[b.id] || (b.year ? `${b.year}-00-00` : "0000-00-00");
      return db < da ? -1 : db > da ? 1 : 0; // desc
    });
  }, [allPhotos]);

  /* ⑤ 新着 = 追加日 (サイトの管理データに写真が加わった日時) の新しい順。
     撮影日とは別データなので、何年も前に撮った写真でも、いま追加すればここに出る。
     本番サイトへの公開日時とは別物。追加日が確認できない写真
     (リポジトリ履歴の最初から在ったもの) は新着に出さない。 */
  const addedPhotos = useMemo(
    () => allPhotos
      .filter((p) => PHOTO_ADDED[p.id])
      .sort((a, b) => (PHOTO_ADDED[b.id] < PHOTO_ADDED[a.id] ? -1 : PHOTO_ADDED[b.id] > PHOTO_ADDED[a.id] ? 1 : 0)),
    [allPhotos]
  );

  /* ライトボックスと共有要素は現在の表示順に追従する */
  const activePhotos = galleryMode === "date" ? datePhotos : galleryMode === "added" ? addedPhotos : allPhotos;
  activeRef.current = activePhotos;

  const openLightbox = useCallback((url, entry = "home", el = null) => {
    const idx = activePhotos.findIndex(p => p.url === url);
    const target = idx >= 0 ? idx : 0;
    /* 押したサムネイルの矩形を覚えてから開く (拡大表示がそこから広がる) */
    origin.capture(el ? el.querySelector("img") : null);
    setLightbox(target);
    /* ⑨ 実際に開く操作をしたときだけ。entry はこの操作が始まった場所そのもの */
    if (activePhotos[target]) track("photo_open", { photo_id: activePhotos[target].id, entry }, activePhotos[target].id + "|" + entry);
  }, [activePhotos, origin]);

  /* 以前の共有リンク (/{lang}#photo=ID) は引き続き開ける。読むのは最初の1回だけで、
     読んだら URL から外す (並び替えのたびに開き直さないため)。 */
  const hashRead = useRef(false);
  useEffect(() => {
    if (hashRead.current || typeof window === "undefined") return;
    hashRead.current = true;
    const m = window.location.hash.match(/^#photo=([a-zA-Z0-9_-]+)/);
    if (!m) return;
    const idx = activePhotos.findIndex(p => p.id === m[1]);
    try { window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search); } catch {}
    if (idx >= 0) setLightbox(idx);
  }, [activePhotos]);

  const lbPrev = useCallback(() => {
    setLightbox(i => (i <= 0 ? activePhotos.length - 1 : i - 1));
  }, [activePhotos]);

  const lbNext = useCallback(() => {
    setLightbox(i => (i >= activePhotos.length - 1 ? 0 : i + 1));
  }, [activePhotos]);

  /* 撮影日順 / 新着 表示: 年月ごとにグルーピング (新しい順)。同じ見た目を使い回す */
  const dateGroups = useMemo(() => {
    if (galleryMode !== "date") return [];
    const groups = [];
    let cur = null;
    for (const p of datePhotos) {
      const d = PHOTO_DATES[p.id];
      const key = d ? d.slice(0, 7) : (p.year ? `${p.year}-00` : "0000-00");
      if (!cur || cur.key !== key) {
        cur = { key, year: d ? d.slice(0, 4) : (p.year || ""), month: d ? parseInt(d.slice(5, 7), 10) : 0, photos: [] };
        groups.push(cur);
      }
      cur.photos.push(p);
    }
    return groups;
  }, [galleryMode, datePhotos]);

  const addedGroups = useMemo(() => {
    if (galleryMode !== "added") return [];
    const groups = [];
    let cur = null;
    for (const p of addedPhotos) {
      const key = PHOTO_ADDED[p.id].slice(0, 7);
      if (!cur || cur.key !== key) {
        cur = { key, year: key.slice(0, 4), month: parseInt(key.slice(5, 7), 10), photos: [] };
        groups.push(cur);
      }
      cur.photos.push(p);
    }
    return groups;
  }, [galleryMode, addedPhotos]);
  /* I-4: return-visit language suggestion — if a previously chosen language
     differs from the page language, offer a one-tap switch (session-dismissable). */
  const [langSuggest, setLangSuggest] = useState(null);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lojLang");
      if (saved && saved !== lang && TR[saved] && !sessionStorage.getItem("lojLangDismiss")) {
        setLangSuggest(saved);
      } else {
        setLangSuggest(null);
      }
    } catch {}
  }, [lang]);
  const dismissLangSuggest = useCallback(() => {
    try { sessionStorage.setItem("lojLangDismiss", "1"); } catch {}
    setLangSuggest(null);
  }, []);

  /* P3: per-row staged rendering on home — first 16 cards, more revealed as
     the row is scrolled horizontally (sentinel observed with root=scroller). */
  const [rowCounts, setRowCounts] = useState({});
  const rowMaxFor = (pf) => Math.min(rowCounts[pf.pref] ?? 16, pf.photos.length);

  const [loaded, setLoaded] = useState(false);
  const [hlPhoto, setHlPhoto] = useState(null);
  /* 表紙に出す写真。季節は閲覧時の日付で決まるので、描画後に決める
     (ビルド時の季節で初期HTMLを作ると、公開後に季節が変わっても古いままになる) */
  const [heroIds, setHeroIds] = useState(null);
  useEffect(() => { setHeroIds(HERO_BY_SEASON[seasonNowJst()]); }, []);
  /* アクセント色を「いま表紙に出ている写真」に合わせる。
     state に入れるとトップ全体 (930枚ぶんの行) を再描画するので、CSS 変数を直接書く。
     色の移り変わりは CSS 側 (@property + transition) がなめらかにする。 */
  const rootRef = useRef(null);
  const onHeroShow = useCallback((id) => {
    const el = rootRef.current;
    if (!el) return;
    const a = accentStyle(id);
    el.style.setProperty("--accent-h", a["--accent-h"]);
    el.style.setProperty("--accent-c", a["--accent-c"]);
  }, []);
  const [mapView, setMapView] = useState("map"); // "map" | "list"
  const mapRef = useRef(null);
  /* ⑤ 色検索の対象はサイト全体の掲載写真 (言語別URLで重複させない) */
  const allSitePhotos = useMemo(
    () => PREFECTURES.flatMap((pf) => pf.photos.map((p) => ({ ...p, pref: pf.pref }))),
    []
  );
  const navigatingRef = useRef(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [formStatus, setFormStatus] = useState(null);
  const [formSending, setFormSending] = useState(false);

  /* ⑦ 写真を指定した問い合わせ。/{lang}?photo_ref=ID#contact で入ってくる。
     URLから受け取るのは写真IDだけで、写真の情報は data.js から引き直す
     (外部から渡されたURLやHTMLをそのまま扱わない)。存在しないIDは無視する。
     読み取りは初回だけ。再レンダーで入力済みの本文を消さない。 */
  const [contactPhoto, setContactPhoto] = useState(null);
  useEffect(() => {
    try {
      const id = new URLSearchParams(window.location.search).get("photo_ref");
      if (id && photoById(id)) setContactPhoto(id);
    } catch {}
  }, []);
  const t = TR[lang];

  const handleSubmit = useCallback(() => {
    if (!formName.trim() || !formEmail.trim() || !formMsg.trim()) return;
    setFormSending(true);
    fetch("https://formspree.io/f/xzdjzyeo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      /* ⑦ 画面に出しているだけでなく、実際の送信内容にも写真の識別子を入れる */
      body: JSON.stringify({
        name: formName,
        email: formEmail,
        message: formMsg,
        ...(contactPhoto ? { photo_id: contactPhoto, photo_url: photoRefUrl(contactPhoto, lang) || "" } : {}),
      }),
    })
      .then(r => {
        if (r.ok) {
          setFormStatus("ok"); setFormName(""); setFormEmail(""); setFormMsg("");
          /* ⑨ 送信できたときだけ。本文・氏名・メールは送らない */
          track("contact_submit", { with_photo: !!contactPhoto }, "contact");
        } else { setFormStatus("ng"); }
      })
      .catch(() => setFormStatus("ng"))
      .finally(() => setFormSending(false));
  }, [formName, formEmail, formMsg, contactPhoto, lang]);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  /* Reset all horizontal scrolls to left (newest photo) on mount */
  useEffect(() => {
    const scrollers = document.querySelectorAll(".cin-hscroll");
    scrollers.forEach(el => { el.scrollLeft = 0; });
  }, []);

  /* I-5: PC drag-to-scroll + edge-fade state for horizontal rows */
  const suppressClickRef = useRef(false);
  const hscrollBy = useCallback((e, dir) => {
    e.stopPropagation();
    const sc = e.currentTarget.closest(".cin-hwrap")?.querySelector(".cin-hscroll");
    if (!sc) return;
    // 写真の切れ目に合わせる: 約1ページ先で最も近いカード左端へスナップ
    const cards = Array.from(sc.querySelectorAll(".cin-hcard, .cin-endcard"));
    if (!cards.length) { sc.scrollBy({ left: dir * Math.round(sc.clientWidth * 0.85), behavior: "smooth" }); return; }
    const base = cards[0].offsetLeft; // 先頭カードの位置 = scrollLeft 0 相当
    const target = sc.scrollLeft + dir * sc.clientWidth * 0.85;
    let bestIdx = 0, bestD = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs((c.offsetLeft - base) - target);
      if (d < bestD) { bestD = d; bestIdx = i; }
    });
    // 現在位置と同じカードに丸まった場合は最低1枚ぶん進める
    let left = cards[bestIdx].offsetLeft - base;
    if (Math.abs(left - sc.scrollLeft) < 8) {
      const next = cards[bestIdx + dir];
      if (next) left = next.offsetLeft - base;
    }
    sc.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, []);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const cleanups = Array.from(document.querySelectorAll(".cin-hwrap")).map((wrap) => {
      const sc = wrap.querySelector(".cin-hscroll");
      if (!sc) return () => {};
      const update = () => {
        wrap.classList.toggle("can-left", sc.scrollLeft > 4);
        wrap.classList.toggle("can-right", sc.scrollLeft < sc.scrollWidth - sc.clientWidth - 4);
      };
      update();
      // 画像ロードで scrollWidth が伸びても scroll イベントは発火しない —
      // 未ロード画像の load と保険のタイマーでも再評価する (初回マウントと
      // 撮影日順↔地域別トグル直後に矢印が出ないバグの本修正)。
      sc.querySelectorAll("img").forEach((im) => {
        if (!im.complete) im.addEventListener("load", update, { once: true });
      });
      const updateTimer = setTimeout(update, 1200);
      window.addEventListener("resize", update);
      sc.addEventListener("scroll", update, { passive: true });
      let dragging = false, startX = 0, startLeft = 0, moved = 0;
      const down = (e) => { if (e.button !== 0) return; dragging = true; moved = 0; startX = e.clientX; startLeft = sc.scrollLeft; sc.classList.add("dragging"); };
      const move = (e) => { if (!dragging) return; const dx = e.clientX - startX; moved = Math.max(moved, Math.abs(dx)); sc.scrollLeft = startLeft - dx; };
      const up = () => {
        if (!dragging) return;
        dragging = false;
        sc.classList.remove("dragging");
        if (moved > 8) { suppressClickRef.current = true; setTimeout(() => { suppressClickRef.current = false; }, 60); }
      };
      sc.addEventListener("mousedown", down);
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
      return () => {
        clearTimeout(updateTimer);
        window.removeEventListener("resize", update);
        sc.removeEventListener("scroll", update);
        sc.removeEventListener("mousedown", down);
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };
    });
    return () => cleanups.forEach((fn) => fn());
    // galleryMode を含める: トグルで .cin-hwrap が再マウントされるため、
    // can-left/can-right (矢印表示) とドラッグを張り直す。
  }, [lang, galleryMode]);

  /* P3: reveal more cards when a row is actually scrolled near its right
     edge. Scroll-distance based (not IO) so collapsed not-yet-loaded image
     widths can't trigger a phantom reveal-all cascade. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const cleanups = Array.from(document.querySelectorAll(".cin-hscroll")).map((sc) => {
      const pref = sc.dataset.pref;
      if (!pref) return () => {};
      const onScroll = () => {
        if (sc.scrollWidth - sc.scrollLeft - sc.clientWidth < 1600) {
          setRowCounts((c) => {
            const cur = c[pref] ?? 16;
            return { ...c, [pref]: cur + 24 };
          });
        }
      };
      sc.addEventListener("scroll", onScroll, { passive: true });
      return () => sc.removeEventListener("scroll", onScroll);
    });
    return () => cleanups.forEach((fn) => fn());
    // galleryMode: トグル後の再マウントでも行の段階展開が効くように張り直す。
  }, [lang, galleryMode]);

  /* セクションの現れ方は CSS のスクロール連動アニメーション (globals.css の .reveal) に任せる。
     以前は IntersectionObserver でクラスを付けていたため、JS が動くまで中身が
     透明のままで、並び替えのたびに張り直しも必要だった。いまは対応ブラウザ
     (Chrome 系 / Safari 26 以降) でだけ動き、それ以外では最初から見えている。 */

  /* Keyboard / preload / scroll-lock now live inside shared <Lightbox/> */

  /* 以前ここにあった scroll リスナーは scrollY / pastMap を state に入れていたが、
     どちらも描画に使っておらず、スクロールのたびにトップページ全体 (930枚ぶんの行) を
     再描画していた。リスナーごと削除した。 */

  useEffect(() => {
    if (typeof window === "undefined") return;
    const h = window.location.hash;
    if (!h) return;
    const tries = [200, 800, 1600];
    tries.forEach((d) => setTimeout(() => {
      const el = document.getElementById(h.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: h === "#map" ? "center" : "start" });
    }, d));
  }, []);
  const handlePin = useCallback(id => {
    const m = String(id).match(/^p(\d+)$/);
    const el = m ? document.getElementById("pref-" + m[1]) : null;
    if (!el) return;
    navigatingRef.current = true;
    setTimeout(() => { navigatingRef.current = false; }, 1200);
    const computeTarget = () => {
      const rect = el.getBoundingClientRect();
      const absTop = rect.top + window.scrollY;
      const wantedY = absTop - 80;
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      if (wantedY > maxY) {
        const centered = absTop - Math.max(0, (window.innerHeight - rect.height) / 2);
        return Math.min(Math.max(centered, 0), maxY);
      }
      return Math.max(wantedY, 0);
    };
    window.scrollTo({ top: computeTarget(), behavior: "smooth" });
    /* Lazy-loaded images may shift layout mid-scroll, so re-snap to the
       correct Y a few times until the position settles. */
    [400, 900, 1500].forEach(delay => setTimeout(() => {
      const target = computeTarget();
      if (Math.abs(window.scrollY - target) > 20) {
        window.scrollTo({ top: target, behavior: "auto" });
      }
    }, delay));
    setHlPhoto(id);
    setTimeout(() => setHlPhoto(null), 2500);
  }, []);

  return (
    <div ref={rootRef} data-accent="" className="page-root" style={{ position: "relative" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify((() => {
        const meta = SEO_META[lang] || SEO_META.en;
        const pageUrl = `${SITE_URL}/${lang}`;
        const personId = `${SITE_URL}/#person`;
        const websiteId = `${SITE_URL}/#website`;
        const locSet = new Map();
        PREFECTURES.forEach(pf => pf.photos.forEach(p => {
          if (p.loc && !locSet.has(p.loc)) locSet.set(p.loc, pf.pref);
        }));
        return {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": personId,
              name: "Landscapes of Japan",
              url: SITE_URL,
              image: OG_IMAGE,
              description: meta.description,
              jobTitle: "Landscape Photographer",
            },
            {
              "@type": "WebSite",
              "@id": websiteId,
              name: "Landscapes of Japan",
              url: SITE_URL,
              description: meta.description,
              inLanguage: HREFLANG[lang] || lang,
              publisher: { "@id": personId },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/${lang}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "WebPage",
              "@id": `${pageUrl}#webpage`,
              url: pageUrl,
              name: meta.title,
              description: meta.description,
              inLanguage: HREFLANG[lang] || lang,
              isPartOf: { "@id": websiteId },
              author: { "@id": personId },
              primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: meta.title, item: pageUrl },
              ],
            },
            {
              "@type": "ImageGallery",
              "@id": `${pageUrl}#gallery`,
              name: meta.title,
              url: pageUrl,
              description: meta.description,
              inLanguage: HREFLANG[lang] || lang,
              author: { "@id": personId },
              about: { "@type": "Country", name: "Japan" },
              image: PREFECTURES.flatMap(pf => pf.photos.slice(0, 3).map(p => ({
                "@type": "Photograph",
                name: (p.loc ? getLocName(p.loc, lang) + " - " : "") + getPrefName(pf.pref, lang),
                contentLocation: {
                  "@type": "Place",
                  name: p.loc ? getLocName(p.loc, lang) : getPrefName(pf.pref, lang),
                  address: { "@type": "PostalAddress", addressRegion: getPrefName(pf.pref, lang), addressCountry: "JP" },
                },
                image: cldUrl(p.id, 1200),
                dateCreated: p.year ? String(p.year) : undefined,
                author: { "@id": personId },
              }))),
            },
            ...Array.from(locSet.entries()).map(([loc, pref]) => ({
              "@type": "TouristDestination",
              name: getLocName(loc, lang),
              containedInPlace: {
                "@type": "AdministrativeArea",
                name: getPrefName(pref, lang),
                address: { "@type": "PostalAddress", addressRegion: getPrefName(pref, lang), addressCountry: "JP" },
              },
              touristType: "Landscape Photography",
              inLanguage: HREFLANG[lang] || lang,
            })),
          ],
        };
      })()) }} />

      <div>
        <SiteHeader lang={lang} langHrefFor={(c) => `/${c}`} />

        {/* ② ヒーロー: 斜体をやめ、左下に置く。文字の背後だけ局所的に落とす */}
        <div className="cin-hero">
          <div className={"cin-hero-bg" + (loaded ? " loaded" : "")} />
          {heroIds && <HeroRotation ids={heroIds} onShow={onHeroShow} />}
          <div className="hero-scrim" />
          <div className="cin-hero-content hero-left" style={{ zIndex: 2 }}>
            <h1 className="hero-title-plain">{t.hero.t}</h1>
            <p className="hero-sub-plain">{t.hero.d}</p>
            {/* ① 主なボタンは2つに整理。カテゴリ類は探索エリアへ移設した */}
            <div className="hero-cta">
              {/* 絞り込み画面 (地域×テーマ×季節×色×地図) への入口。以前はページ内の
                  #explore へスクロールするだけで、/explore へ行く道がどこにも無かった */}
              <a className="primary" href={`/${lang}/explore`}>
                {ui("findPhotos", lang)}
              </a>
              <button className="secondary" type="button" onClick={() => { setTheaterOpen(true); track("theater_open", { from: "home" }, "home"); }}>
                {ui("theater", lang)}
              </button>
            </div>
          </div>
        </div>

        {/* ⑤ ヒーロー直下の探索エリア: 地域から / 色から */}
        <div>
          <ExploreSection
            lang={lang}
            photos={allSitePhotos}
            regionSlot={
              <nav className="cin-chips" aria-label={ui("collections", lang)}>
                {HERO_CHIP_SLUGS.map((slug) => (
                  <a key={slug} className="cin-chip" href={`/${lang}/collections/${slug}`}>
                    {getCollectionName(slug, lang)}
                  </a>
                ))}
                <a className="cin-chip" href={`/${lang}/all-prefectures`}>{ui("byRegion", lang)}</a>
                <a className="cin-chip" href={`/${lang}/random`} rel="nofollow">{ui("random", lang)}</a>
              </nav>
            }
          />
        </div>
        <section className="cin-section">
          <div className="cin-map-wrap reveal" id="map" ref={mapRef}>
            <div className="cin-map-box">
              {/* マップ/一覧 切替トグル */}
              <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 18, padding: "4px", background: "color-mix(in srgb,var(--accent) 6%,transparent)", border: "1px solid color-mix(in srgb,var(--accent) 18%,transparent)", borderRadius: 999, width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
                {[
                  { id: "map", labelJa: "マップ", labelEn: "Map" },
                  { id: "list", labelJa: "一覧", labelEn: "List" },
                ].map((opt) => {
                  const active = mapView === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setMapView(opt.id)}
                      style={{
                        background: active ? "color-mix(in srgb,var(--accent) 22%,transparent)" : "transparent",
                        border: "none",
                        color: active ? "var(--accent-hi)" : "rgba(232,228,223,.6)",
                        fontFamily: "var(--font-zen-kaku),'Noto Sans JP',sans-serif",
                        fontSize: 12,
                        fontWeight: 500,
                        letterSpacing: ".1em",
                        padding: "7px 22px",
                        borderRadius: 999,
                        cursor: "pointer",
                        transition: "all .3s ease",
                      }}
                    >
                      {lang === "ja" ? opt.labelJa : opt.labelEn}
                    </button>
                  );
                })}
              </div>

              {mapView === "map" ? (
                <JapanMap lang={lang} photos={MAP_PINS} onPinClick={handlePin} hlId={hlPhoto} />
              ) : (
                <div style={{ padding: "8px 0" }}>
                  {REGIONS.map((region) => {
                    const regionPrefs = region.prefs
                      .map((prefJp) => ({ prefJp, pf: PREFECTURES.find((p) => p.pref === prefJp), slug: PREF_SLUGS[prefJp] }))
                      .filter((x) => x.pf && x.slug && x.pf.photos.length > 0);
                    if (regionPrefs.length === 0) return null;
                    return (
                      <section key={region.id} style={{ marginBottom: 32 }}>
                        <h3 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, letterSpacing: ".08em", color: "color-mix(in srgb,var(--accent) 70%,transparent)", marginBottom: 14, paddingBottom: 8, borderBottom: "1px solid color-mix(in srgb,var(--accent) 15%,transparent)" }}>
                          {lang === "ja" ? region.nameJa : region.nameEn}
                        </h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
                          {regionPrefs.map(({ prefJp, pf, slug }) => {
                            const heroId = pf.photos[0]?.id;
                            return (
                              <a key={prefJp} href={`/${lang}/${slug}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "color-mix(in srgb,var(--accent) 6%,transparent)", border: "1px solid color-mix(in srgb,var(--accent) 20%,transparent)", borderRadius: 8, textDecoration: "none", color: "#e8e4df" }}>
                                {heroId && (
                                  <img src={cldUrl(heroId, 100)} alt="" loading="lazy" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />
                                )}
                                <div style={{ minWidth: 0 }}>
                                  <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, color: "#f2ece2" }}>
                                    {getPrefName(prefJp, lang)}
                                  </div>
                                  <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 12, color: "rgba(232,228,223,.5)" }}>
                                    {pf.photos.length} {lang === "ja" ? "枚" : "photos"}
                                  </div>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <PhotoOfTheDay lang={lang} />

          {/* 表示モード切替: 地域別 / 撮影日順 */}
          <div className="cin-gallery-modes" role="tablist" aria-label={ui("galleryOrder", lang)}>
            {["region", "date", "added"].map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={galleryMode === m}
                className={"cin-gmode-btn" + (galleryMode === m ? " active" : "")}
                onClick={() => setGalleryMode(m)}
              >
                {m === "added" ? ui("newArrivals", lang) : (GALLERY_MODE_LABELS[m][lang] || GALLERY_MODE_LABELS[m].en)}
              </button>
            ))}
          </div>

          {galleryMode === "date" || galleryMode === "added" ? (
            <div className="cin-dategrid-wrap">
              {(galleryMode === "added" ? addedGroups : dateGroups).map((g) => (
                <section key={g.key} className="cin-datemonth">
                  <h3 className="cin-datemonth-h">
                    {monthLabel(g.year, g.month, lang)}
                    <span className="cin-datemonth-n">{g.photos.length}</span>
                  </h3>
                  <div className="cin-dategrid">
                    {g.photos.map((p) => (
                      <div key={p.id} data-pid={p.id} className={"cin-datecard" + (isPortrait(p.id) ? " tall" : "")} onClick={(e) => openLightbox(p.url, galleryMode === "added" ? "new" : "date", e.currentTarget)} onContextMenu={(e) => e.preventDefault()}>
                        <img
                          src={cldUrl(p.id, thumbW)}
                          alt={richAlt({ locName: p.loc ? getLocName(p.loc, lang) : "", prefName: getPrefName(p.pref, lang), year: p.year, locJp: p.loc, lang })}
                          loading="lazy"
                          decoding="async"
                          draggable="false"
                        />
                        {p.loc && (
                          <div className="cin-datecard-loc">
                            {getLocName(p.loc, lang)}
                            <span className="cin-datecard-pref">{getPrefName(p.pref, lang)}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
          <div className="cin-gallery">
            {PREFECTURES.map((pf, pi) => {
              const prefSlug = PREF_SLUGS[pf.pref];
              const viewAllLabel = VIEW_ALL[lang] || VIEW_ALL.en;
              return (
              <div key={pf.pref} id={"pref-" + pi} className="cin-pref-group reveal" data-accent="" style={accentStyle(pf.photos.slice(0, 24).map((p) => p.id))}>
                {/* 地名を主役にする: 日本語の地名を明朝の縦組みで行の背に置き、
                    各言語の地名は小さく添える。日本語ページでは英語名を添える。 */}
                {/* 縦組みは飾り (同じリンクが下の見出しにある)。読み上げとタブ移動からは外す */}
                <div className="cin-spine" lang="ja" aria-hidden="true">
                  {prefSlug ? <a href={`/${lang}/${prefSlug}`} tabIndex={-1}>{jaShort(pf.pref)}</a> : jaShort(pf.pref)}
                </div>
                <div className="cin-pref">
                  <h2 className="cin-pref-name">
                    {prefSlug ? (
                      <a href={`/${lang}/${prefSlug}`} className="cin-pref-link" aria-label={lang === "ja" ? pf.pref : undefined}>{lang === "ja" ? getPrefName(pf.pref, "en") : getPrefName(pf.pref, lang)}</a>
                    ) : (
                      <span>{lang === "ja" ? getPrefName(pf.pref, "en") : getPrefName(pf.pref, lang)}</span>
                    )}
                  </h2>
                  <span className="cin-pref-n">{pf.photos.length}</span>
                  {prefSlug && (
                    <a href={`/${lang}/${prefSlug}`} className="cin-pref-viewall" aria-label={`${getPrefName(pf.pref, lang)} — ${viewAllLabel}`}>{viewAllLabel} →</a>
                  )}
                </div>
                <div className="cin-hwrap">
                  <button className="cin-hbtn left" aria-label={ui("scrollLeft", lang)} onClick={(e) => hscrollBy(e, -1)}>‹</button>
                  <button className="cin-hbtn right" aria-label={ui("scrollRight", lang)} onClick={(e) => hscrollBy(e, 1)}>›</button>
                <div className="cin-hscroll" data-pref={pf.pref}>
                  {pf.photos.slice(0, rowMaxFor(pf)).map((photo, idx) => {
                    const locSlug = photo.loc ? LOC_SLUGS[photo.loc] : null;
                    return (
                    <div key={pf.pref + idx} data-pid={photo.id} className={"cin-hcard" + (isPortrait(photo.id) ? " tall" : "")} onClick={(e) => { if (navigatingRef.current || suppressClickRef.current) return; openLightbox(getUrl(photo, lbW), "home", e.currentTarget); }} onContextMenu={e => e.preventDefault()}>
                      <div className="cin-hcard-img-wrap">
                        <img src={getUrl(photo, thumbW)} alt={richAlt({ locName: photo.loc ? getLocName(photo.loc, lang) : "", prefName: getPrefName(pf.pref, lang), year: photo.year, locJp: photo.loc, lang })} loading="lazy" decoding="async" draggable="false" />
                        {photo.loc && (
                          locSlug && prefSlug ? (
                            <a
                              href={`/${lang}/${prefSlug}/${locSlug}`}
                              className="cin-hcard-loc cin-hcard-loc-link"
                              onClick={e => e.stopPropagation()}
                            >
                              <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
                              {getLocName(photo.loc, lang)}
                            </a>
                          ) : (
                            <div className="cin-hcard-loc"><svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>{getLocName(photo.loc, lang)}</div>
                          )
                        )}
                        {photo.year && <div className="cin-hcard-year">{photo.year}</div>}
                      </div>
                    </div>
                    );
                  })}
                  {prefSlug && pf.photos.length > 4 && (
                    <a className="cin-endcard" href={`/${lang}/${prefSlug}`} onClick={(e) => e.stopPropagation()}>
                      {viewAllLabel}<br />({pf.photos.length}) →
                    </a>
                  )}
                </div>
                </div>
              </div>
              );
            })}
          </div>
          )}
        </section>

        {/* Contact Form */}
        <div style={{ width: "100%", height: 1, background: "rgba(232,228,223,.08)", maxWidth: 200, margin: "0 auto 60px" }} />
        <div className="contact-section reveal" id="contact">
          <h2 className="contact-title">{t.contact.title}</h2>
          <div className="contact-form">
            {/* ⑦ どの写真についての問い合わせかを、送信前に確認・解除できるようにする */}
            {contactPhoto && (
              <div className="contact-photo">
                <img src={cldUrl(contactPhoto, 300)} alt="" draggable="false" onContextMenu={e => e.preventDefault()} />
                <span className="contact-photo-t">
                  <b>{ui("photoInQuestion", lang)}</b>
                  {photoLabel(contactPhoto, lang)}
                </span>
                <button type="button" className="pa-btn" aria-label={ui("clearFilter", lang)} onClick={() => setContactPhoto(null)}>×</button>
              </div>
            )}
            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-name">{t.contact.name}</label>
              <input id="contact-name" className="contact-input" type="text" value={formName} onChange={e => setFormName(e.target.value)} />
            </div>
            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-email">{t.contact.email}</label>
              <input id="contact-email" className="contact-input" type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} />
            </div>
            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-msg">{t.contact.msg}</label>
              <textarea id="contact-msg" className="contact-textarea" value={formMsg} onChange={e => setFormMsg(e.target.value)} />
            </div>
            <button className="contact-send" disabled={formSending || !formName.trim() || !formEmail.trim() || !formMsg.trim()} onClick={handleSubmit}>
              {formSending ? "..." : t.contact.send}
            </button>
            {formStatus === "ok" && <div className="contact-msg ok">{t.contact.sent}</div>}
            {formStatus === "ng" && <div className="contact-msg ng">{t.contact.err}</div>}
          </div>
        </div>

        <footer className="cin-footer">© 2026 Landscapes of Japan<br/>{t.footer2}</footer>
      </div>
      {langSuggest && (
        <div className="lang-suggest" role="status">
          <a href={`/${langSuggest}`} onClick={() => { try { localStorage.setItem("lojLang", langSuggest); } catch {} }}>
            {TR[langSuggest].name} →
          </a>
          <button aria-label={ui("dismiss", lang)} onClick={dismissLangSuggest}>×</button>
        </div>
      )}
      {lightbox !== null && activePhotos[lightbox] && (
        <Lightbox
          originRect={origin.peek()}
          photos={activePhotos}
          index={lightbox}
          closing={lbClosing}
          lang={lang}
          onClose={closeLightbox}
          onPrev={lbPrev}
          onNext={lbNext}
          labels={(p) => ({
            prefName: getPrefName(p.pref, lang),
            locName: p.loc ? getLocName(p.loc, lang) : "",
            alt: richAlt({ locName: p.loc ? getLocName(p.loc, lang) : "", prefName: getPrefName(p.pref, lang), year: p.year, locJp: p.loc, lang }),
          })}
          /* ④ 写真詳細ページはPHOTO_LANGSの言語にしかない。無い言語では
             存在しないURLも作らず、英語ページへも切り替えず、リンクを出さない。 */
          photoHref={(p) => {
            const ps = PREF_SLUGS[p.pref];
            const ls = p.loc ? LOC_SLUGS[p.loc] : null;
            return hasPhotoPages(lang) && ps && ls && p.id ? `/${lang}/${ps}/${ls}/${p.id}` : null;
          }}
        />
      )}
      {theaterOpen && (
        <Theater
          photos={allPhotos}
          lang={lang}
          onClose={() => setTheaterOpen(false)}
          initialShuffle
          labels={(p) => ({ prefName: getPrefName(p.pref, lang), locName: p.loc ? getLocName(p.loc, lang) : "" })}
        />
      )}
    </div>
  );
}
