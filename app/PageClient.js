"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import * as d3 from "d3";
import { SEO_META, SITE_URL, OG_IMAGE, HREFLANG } from "./i18n-meta.js";
import { TR, PREFECTURES, PREF_I18N, LOC_I18N, MAP_PINS, cldUrl, getUrl, getPrefName, getLocName, GEOJSON_URLS, MW, MH } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { REGIONS } from "./regions.js";
import TopNav from "./TopNav.js";

const VIEW_ALL = {
  ja: "ガイド/詳細を見る", en: "Guide & details", zh: "查看指南与详情", "zh-tw": "查看指南與詳情",
  ko: "가이드/자세히 보기", es: "Guía y detalles", fr: "Guide & détails",
  de: "Reiseführer & Details", pt: "Guia e detalhes", it: "Guida e dettagli",
  ru: "Гид и подробности", ar: "الدليل والتفاصيل", hi: "गाइड और विवरण",
  th: "คู่มือและรายละเอียด", vi: "Hướng dẫn & chi tiết", id: "Panduan & detail",
  tr: "Rehber ve ayrıntılar", nl: "Gids & details", pl: "Przewodnik i szczegóły", sv: "Guide & detaljer",
};

/* ── Embedded Japan GeoJSON — real lat/lng, D3 projects accurately ── */
/* Format: GeoJSON [longitude, latitude] per spec */
const JP_GEO = {type:"FeatureCollection",features:[
{type:"Feature",properties:{name:"Hokkaido"},geometry:{type:"Polygon",coordinates:[[
[140.07,41.43],[140.10,41.50],[140.05,41.58],[140.08,41.65],[140.15,41.70],[140.25,41.74],
[140.40,41.76],[140.58,41.77],[140.73,41.77],[140.82,41.78],[140.95,41.80],[141.05,41.80],
[141.17,41.80],[141.20,41.75],[141.10,41.70],[140.95,41.72],[140.80,41.73],[140.60,41.72],
[140.45,41.78],[140.30,41.82],[140.25,41.80],[140.18,41.88],[140.12,42.00],[140.10,42.08],
[140.15,42.15],[140.20,42.25],[140.13,42.38],[140.10,42.50],[140.20,42.60],[140.32,42.72],
[140.45,42.82],[140.55,42.92],[140.68,43.00],[140.78,43.08],[140.85,43.15],[140.95,43.20],
[140.72,43.25],[140.52,43.28],[140.35,43.30],[140.32,43.25],[140.45,43.18],[140.55,43.05],
[140.72,42.98],[140.60,42.90],[140.38,42.85],[140.25,42.80],[140.38,42.68],[140.15,42.55],
[140.08,42.45],[140.12,42.35],[140.22,42.30],[140.15,42.20],[140.10,42.10],[140.08,42.00],
[140.55,43.08],[140.75,43.12],[140.90,43.18],[141.00,43.25],[141.05,43.32],[141.10,43.40],
[141.18,43.48],[141.30,43.58],[141.42,43.68],[141.50,43.78],[141.58,43.85],[141.65,43.95],
[141.70,44.08],[141.72,44.20],[141.73,44.35],[141.70,44.50],[141.72,44.65],[141.75,44.80],
[141.78,44.92],[141.80,45.05],[141.75,45.18],[141.78,45.28],[141.93,45.42],[142.08,45.50],
[142.22,45.48],[142.42,45.42],[142.60,45.33],[142.78,45.22],[142.95,45.10],[143.12,44.95],
[143.28,44.82],[143.48,44.68],[143.68,44.52],[143.85,44.40],[144.10,44.28],[144.35,44.18],
[144.55,44.15],[144.78,44.18],[144.95,44.25],[145.12,44.35],[145.22,44.38],[145.35,44.33],
[145.48,44.25],[145.55,44.12],[145.58,43.98],[145.60,43.85],[145.65,43.72],[145.78,43.55],
[145.80,43.40],[145.60,43.33],[145.42,43.28],[145.22,43.18],[145.05,43.08],[144.85,43.00],
[144.60,42.95],[144.38,42.90],[144.12,42.82],[143.85,42.72],[143.60,42.58],[143.38,42.45],
[143.22,42.32],[143.15,42.18],[143.08,42.05],[143.20,41.92],[143.15,42.00],[142.85,42.05],
[142.55,42.18],[142.25,42.32],[141.95,42.45],[141.70,42.55],[141.50,42.60],[141.35,42.58],
[141.15,42.52],[140.98,42.45],[141.05,42.38],[140.95,42.30],[140.82,42.25],[140.72,42.18],
[140.60,42.08],[140.48,42.00],[140.35,41.90],[140.28,41.82],[140.20,41.72],[140.15,41.60],
[140.10,41.50],[140.07,41.43]
]]}},
{type:"Feature",properties:{name:"Honshu"},geometry:{type:"Polygon",coordinates:[[
[140.20,41.25],[140.35,41.15],[140.48,41.08],[140.65,41.02],[140.85,41.02],[140.95,41.08],
[141.05,41.15],[141.18,41.25],[141.28,41.30],[141.35,41.25],[141.28,41.15],[141.18,41.08],
[141.08,41.00],[141.15,40.92],[141.30,40.82],[141.42,40.68],[141.52,40.55],[141.62,40.40],
[141.72,40.25],[141.82,40.08],[141.88,39.90],[141.95,39.72],[142.05,39.55],[142.08,39.38],
[142.00,39.22],[141.92,39.05],[141.80,38.85],[141.65,38.70],[141.50,38.55],[141.35,38.42],
[141.15,38.32],[141.00,38.18],[140.95,38.05],[140.92,37.85],[140.95,37.65],[141.00,37.45],
[141.05,37.22],[141.02,37.05],[140.98,36.85],[140.92,36.65],[140.82,36.48],[140.72,36.35],
[140.62,36.25],[140.55,36.12],[140.65,35.98],[140.78,35.85],[140.85,35.75],[140.82,35.65],
[140.65,35.58],[140.42,35.55],[140.22,35.52],[140.05,35.55],[139.92,35.50],[139.85,35.42],
[139.82,35.30],[139.80,35.18],[139.85,35.05],[139.78,34.98],[139.65,35.02],[139.55,35.08],
[139.48,35.22],[139.50,35.38],[139.58,35.48],[139.68,35.55],[139.72,35.62],[139.65,35.68],
[139.55,35.60],[139.42,35.50],[139.32,35.40],[139.22,35.32],[139.12,35.18],[139.05,35.08],
[138.98,34.98],[138.92,34.88],[138.88,34.78],[138.82,34.70],[138.72,34.65],[138.55,34.62],
[138.32,34.62],[138.05,34.65],[137.78,34.68],[137.55,34.65],[137.25,34.62],[137.02,34.58],
[136.90,34.50],[136.82,34.40],[136.72,34.30],[136.60,34.18],[136.48,34.08],[136.35,34.00],
[136.15,33.90],[135.95,33.78],[135.82,33.65],[135.75,33.50],[135.65,33.45],[135.50,33.42],
[135.38,33.48],[135.22,33.55],[135.12,33.68],[135.05,33.82],[135.02,33.98],[135.08,34.12],
[135.10,34.28],[135.12,34.42],[135.15,34.52],[135.08,34.58],[135.02,34.65],[134.85,34.68],
[134.62,34.68],[134.38,34.68],[134.12,34.62],[133.88,34.55],[133.62,34.50],[133.35,34.42],
[133.08,34.35],[132.78,34.30],[132.48,34.22],[132.22,34.18],[131.95,34.08],[131.65,34.00],
[131.38,33.98],[131.08,33.95],[130.98,33.98],[130.95,34.05],[130.98,34.15],[131.02,34.28],
[131.12,34.42],[131.30,34.55],[131.48,34.65],[131.72,34.75],[131.92,34.85],[132.12,34.98],
[132.28,35.10],[132.52,35.22],[132.72,35.32],[132.95,35.42],[133.15,35.50],[133.35,35.55],
[133.55,35.55],[133.78,35.55],[133.98,35.60],[134.15,35.62],[134.32,35.60],[134.52,35.62],
[134.72,35.60],[134.88,35.58],[135.05,35.62],[135.22,35.68],[135.38,35.72],[135.55,35.68],
[135.72,35.65],[135.88,35.68],[135.98,35.78],[136.05,35.90],[136.18,36.02],[136.35,36.12],
[136.52,36.25],[136.62,36.38],[136.68,36.52],[136.72,36.68],[136.70,36.82],[136.68,36.95],
[136.72,37.05],[136.82,37.15],[136.95,37.25],[137.08,37.35],[137.22,37.45],[137.30,37.52],
[137.20,37.48],[137.05,37.38],[136.92,37.28],[136.85,37.18],[136.92,37.12],[137.05,37.12],
[137.18,37.22],[137.35,37.32],[137.58,37.42],[137.85,37.55],[138.08,37.68],[138.30,37.78],
[138.55,37.88],[138.78,37.95],[139.00,38.05],[139.22,38.15],[139.42,38.28],[139.55,38.38],
[139.65,38.50],[139.72,38.62],[139.80,38.78],[139.85,38.92],[139.90,39.08],[139.95,39.25],
[139.98,39.42],[140.02,39.58],[140.00,39.72],[139.98,39.88],[139.95,40.02],[139.95,40.18],
[139.98,40.35],[140.00,40.52],[140.00,40.68],[140.02,40.82],[140.05,40.95],[140.08,41.08],
[140.15,41.18],[140.20,41.25]
]]}},
{type:"Feature",properties:{name:"Shikoku"},geometry:{type:"Polygon",coordinates:[[
[134.62,34.28],[134.38,34.25],[134.18,34.22],[133.88,34.18],[133.62,34.12],[133.35,34.05],
[133.05,33.92],[132.88,33.78],[132.75,33.62],[132.68,33.48],[132.58,33.32],[132.55,33.18],
[132.60,33.05],[132.72,32.98],[132.82,32.95],[132.95,33.00],[133.12,33.02],[133.28,33.02],
[133.48,33.05],[133.65,33.02],[133.82,33.02],[133.98,33.08],[134.12,33.18],[134.22,33.28],
[134.35,33.40],[134.48,33.52],[134.58,33.62],[134.65,33.72],[134.72,33.82],[134.75,33.95],
[134.72,34.05],[134.68,34.15],[134.62,34.28]
]]}},
{type:"Feature",properties:{name:"Kyushu"},geometry:{type:"Polygon",coordinates:[[
[130.88,33.95],[130.72,33.82],[130.55,33.68],[130.40,33.55],[130.28,33.42],[130.18,33.28],
[130.05,33.15],[129.92,33.02],[129.82,32.88],[129.75,32.72],[129.78,32.55],[129.82,32.42],
[129.88,32.28],[129.95,32.15],[130.05,32.02],[130.18,31.88],[130.30,31.75],[130.42,31.62],
[130.55,31.50],[130.58,31.38],[130.52,31.25],[130.55,31.15],[130.68,31.08],[130.82,31.05],
[130.95,31.08],[131.02,31.18],[130.88,31.28],[130.78,31.38],[130.72,31.48],[130.85,31.55],
[131.02,31.42],[131.15,31.35],[131.28,31.38],[131.42,31.48],[131.48,31.62],[131.55,31.78],
[131.60,31.95],[131.65,32.12],[131.70,32.30],[131.75,32.48],[131.78,32.65],[131.72,32.82],
[131.62,32.98],[131.55,33.12],[131.58,33.25],[131.55,33.32],[131.42,33.42],[131.25,33.48],
[131.08,33.52],[130.95,33.62],[130.92,33.75],[130.88,33.95]
]]}},
{type:"Feature",properties:{name:"Sado"},geometry:{type:"Polygon",coordinates:[[
[138.22,38.35],[138.18,38.22],[138.25,38.08],[138.38,37.95],[138.48,37.90],[138.55,38.00],
[138.52,38.15],[138.42,38.28],[138.32,38.35],[138.22,38.35]
]]}},
{type:"Feature",properties:{name:"Awaji"},geometry:{type:"Polygon",coordinates:[[
[134.85,34.62],[134.80,34.52],[134.82,34.40],[134.90,34.32],[134.98,34.38],[134.98,34.52],
[134.92,34.60],[134.85,34.62]
]]}},
{type:"Feature",properties:{name:"Tsushima"},geometry:{type:"Polygon",coordinates:[[
[129.42,34.72],[129.30,34.60],[129.25,34.45],[129.30,34.28],[129.42,34.18],[129.52,34.28],
[129.55,34.45],[129.50,34.62],[129.42,34.72]
]]}},
{type:"Feature",properties:{name:"Yakushima"},geometry:{type:"Polygon",coordinates:[[
[130.35,30.45],[130.28,30.35],[130.30,30.25],[130.45,30.22],[130.55,30.30],[130.55,30.42],
[130.45,30.48],[130.35,30.45]
]]}},
{type:"Feature",properties:{name:"Tanegashima"},geometry:{type:"Polygon",coordinates:[[
[131.00,30.75],[130.92,30.62],[130.95,30.45],[131.02,30.40],[131.08,30.55],[131.08,30.68],
[131.00,30.75]
]]}},
{type:"Feature",properties:{name:"Okinawa"},geometry:{type:"Polygon",coordinates:[[
[128.25,26.88],[128.12,26.78],[127.95,26.62],[127.82,26.48],[127.75,26.35],[127.70,26.22],
[127.68,26.10],[127.72,26.08],[127.78,26.15],[127.85,26.28],[127.92,26.42],[128.00,26.55],
[128.08,26.68],[128.18,26.78],[128.25,26.88]
]]}},
{type:"Feature",properties:{name:"Miyako"},geometry:{type:"Polygon",coordinates:[[
[125.38,24.82],[125.22,24.75],[125.18,24.72],[125.28,24.72],[125.38,24.78],[125.42,24.82],
[125.38,24.82]
]]}},
{type:"Feature",properties:{name:"Ishigaki"},geometry:{type:"Polygon",coordinates:[[
[124.22,24.45],[124.12,24.38],[124.15,24.32],[124.28,24.35],[124.30,24.42],[124.22,24.45]
]]}},
]};

/* ── Location names (20 langs) ── */
const LOC = {
  ja:{l1:"富士山",l2:"京都・嵐山",l3:"厳島神社",l4:"奈良公園",l5:"白川郷",l6:"渋谷"},
  en:{l1:"Mt. Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  zh:{l1:"富士山",l2:"京都",l3:"严岛",l4:"奈良",l5:"白川乡",l6:"涩谷"},
  "zh-tw":{l1:"富士山",l2:"京都",l3:"嚴島",l4:"奈良",l5:"白川鄉",l6:"澀谷"},
  ko:{l1:"후지산",l2:"교토",l3:"이쓰쿠시마",l4:"나라",l5:"시라카와고",l6:"시부야"},
  es:{l1:"Monte Fuji",l2:"Kioto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  fr:{l1:"Mont Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  de:{l1:"Berg Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  pt:{l1:"Monte Fuji",l2:"Quioto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  it:{l1:"Monte Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  ru:{l1:"Фудзи",l2:"Киото",l3:"Ицукусима",l4:"Нара",l5:"Сиракава-го",l6:"Сибуя"},
  ar:{l1:"فوجي",l2:"كيوتو",l3:"إتسوكوشيما",l4:"نارا",l5:"شيراكاوا",l6:"شيبويا"},
  hi:{l1:"फूजी",l2:"क्योटो",l3:"इत्सुकुशिमा",l4:"नारा",l5:"शिराकावा-गो",l6:"शिबुया"},
  th:{l1:"ฟูจิ",l2:"เกียวโต",l3:"อิสึกุชิมะ",l4:"นารา",l5:"ชิราคาวา",l6:"ชิบุย่า"},
  vi:{l1:"Phú Sĩ",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  id:{l1:"G. Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  tr:{l1:"Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  nl:{l1:"Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  pl:{l1:"Fuji",l2:"Kioto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  sv:{l1:"Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
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

  /* D3 zoom for mobile pinch-to-zoom */
  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;
    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);
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
    return () => { svg.on(".zoom", null); };
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

  const { paths, okiPaths, project, okiProject } = useMemo(() => {
    if (!geoData) return { paths: [], okiPaths: [], project: () => ({ x: 0, y: 0 }), okiProject: () => ({ x: 0, y: 0 }) };

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
    return { paths: ps, okiPaths: ops, project: proj, okiProject: okiProjFn };
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
        <span style={{ fontFamily: "'Noto Sans JP','Noto Sans',sans-serif", fontSize: 20, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(232,228,223,.7)", fontWeight: 500, border: "1px solid rgba(232,228,223,.3)", padding: "8px 24px", display: "inline-block" }}>{t.mapL}</span>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontFamily: "'Noto Sans JP','Noto Sans',sans-serif", fontSize: 14, color: "rgba(220,190,100,.5)", letterSpacing: ".05em" }}>{t.mapH}</span>
        </div>
      </div>
      <svg ref={svgRef} viewBox={"0 0 " + MW + " " + MH} style={{ width: "100%", height: "auto", display: "block" }} onClick={handleSvgClick}>
        <defs>
          <radialGradient id="goldGrad" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="rgba(240,205,130,0.58)" />
            <stop offset="55%" stopColor="rgba(220,190,100,0.38)" />
            <stop offset="100%" stopColor="rgba(150,120,60,0.18)" />
          </radialGradient>
          <radialGradient id="goldGradHover" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="rgba(255,225,160,0.78)" />
            <stop offset="60%" stopColor="rgba(232,200,120,0.55)" />
            <stop offset="100%" stopColor="rgba(180,150,80,0.25)" />
          </radialGradient>
          <linearGradient id="pathNeutral" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(232,228,223,0.22)" />
            <stop offset="100%" stopColor="rgba(232,228,223,0.10)" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="goldGlowStrong" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="b" />
            <feColorMatrix in="b" type="matrix" values="1 0 0 0 0.15  0 1 0 0 0.08  0 0 1 0 0.02  0 0 0 1 0" result="c" />
            <feMerge>
              <feMergeNode in="c" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="tipBlur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
          </filter>
          <linearGradient id="okiFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(220,190,100,0)" />
            <stop offset="20%" stopColor="rgba(220,190,100,0.28)" />
            <stop offset="80%" stopColor="rgba(220,190,100,0.22)" />
            <stop offset="100%" stopColor="rgba(220,190,100,0)" />
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
            ? (isHovered || isActive ? "rgba(255,225,160,0.9)" : "rgba(220,190,100,0.55)")
            : (isHovered ? "rgba(232,228,223,0.55)" : "rgba(232,228,223,0.32)");
          const filter = isHL ? (isHovered || isActive ? "url(#goldGlowStrong)" : "url(#goldGlow)") : undefined;
          return (
            <path key={p.id} d={p.d}
              fill={fill}
              stroke={stroke}
              strokeWidth={isHL ? (isHovered || isActive ? 1.6 : 1.2) : 0.85}
              strokeLinejoin="round"
              filter={filter}
              style={{ cursor: isHL ? "pointer" : "default", transition: "fill .6s cubic-bezier(.2,.8,.2,1), stroke .5s, stroke-width .4s, filter .4s, opacity .4s", transformOrigin: "center", transformBox: "fill-box" }}
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
                <rect x={tx} y={ty} width={tipW} height={tipH} rx={10} fill="rgba(14,12,10,.82)" stroke="rgba(220,190,100,.38)" strokeWidth=".6" />
                <rect x={tx} y={ty} width={tipW} height={tipH} rx={10} fill="none" stroke="rgba(255,235,200,.15)" strokeWidth="1" filter="url(#tipBlur)" />
                <clipPath id={clipId}><rect x={tx + 7} y={ty + 8} width={46} height={32} rx={6} /></clipPath>
                <image href={pin.thumb} x={tx + 7} y={ty + 8} width={46} height={32} clipPath={"url(#" + clipId + ")"} preserveAspectRatio="xMidYMid slice" />
                <text x={tx + 62} y={ty + 24} fill="#f2ece2" fontSize="11.5" fontFamily="var(--font-zen-kaku), 'Noto Sans JP', sans-serif" fontWeight="500" letterSpacing=".04em">{getPrefName(activeHov, lang)}</text>
                <text x={tx + 62} y={ty + 44} fill="rgba(220,190,100,.72)" fontSize="8.5" fontFamily="var(--font-zen-kaku), 'Noto Sans JP', sans-serif" letterSpacing=".08em">{t.tapHint}</text>
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
            fontFamily="var(--font-playfair), 'Playfair Display', serif" fontStyle="italic" textAnchor="middle" letterSpacing=".18em">{t.oki}</text>
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
                ? (isHovered ? "rgba(255,225,160,0.9)" : "rgba(220,190,100,0.55)")
                : (isHovered ? "rgba(232,228,223,0.55)" : "rgba(232,228,223,0.32)");
              return (
                <path key={"oki" + p.id} d={p.d}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isHL ? (isHovered ? 1.4 : 1.0) : 0.75}
                  strokeLinejoin="round"
                  filter={isHL ? (isHovered ? "url(#goldGlowStrong)" : "url(#goldGlow)") : undefined}
                  style={{ cursor: isHL ? "pointer" : "default", transition: "fill .6s cubic-bezier(.2,.8,.2,1), stroke .5s, filter .4s" }}
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
                if (svgRef.current && zoomRef.current) {
                  const svg = d3.select(svgRef.current);
                  svg.transition().duration(300).call(zoomRef.current.transform, d3.zoomIdentity);
                }
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
  const closeLightbox = useCallback(() => {
    setLbClosing(true);
    setTimeout(() => { setLightbox(null); setLbClosing(false); }, 340);
    // URL hash クリア (#23: shareable photo URL)
    if (typeof window !== "undefined" && window.location.hash.startsWith("#photo=")) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  /* Responsive image sizes (default to desktop for SSR, update on client) */
  const [imgSizes, setImgSizes] = useState({ thumbW: 1200, lbW: 2400 });
  useEffect(() => {
    if (window.innerWidth <= 768) setImgSizes({ thumbW: 600, lbW: 800 });
  }, []);
  const { thumbW, lbW } = imgSizes;

  /* Flat list of all photos for lightbox navigation */
  const allPhotos = useMemo(() => {
    const list = [];
    PREFECTURES.forEach(pf => {
      pf.photos.forEach(photo => {
        list.push({ id: photo.id, url: getUrl(photo, lbW), pref: pf.pref, loc: photo.loc || "", year: photo.year || null });
      });
    });
    return list;
  }, [lbW]);

  const openLightbox = useCallback((url) => {
    const idx = allPhotos.findIndex(p => p.url === url);
    const target = idx >= 0 ? idx : 0;
    setLightbox(target);
    // URL hash 設定 (#23: shareable photo URL)
    const photoId = allPhotos[target]?.id;
    if (photoId && typeof window !== "undefined") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#photo=${photoId}`);
    }
  }, [allPhotos]);

  // 初回ロード時に #photo=xxx があれば該当ライトボックスを開く
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.location.hash.match(/^#photo=([a-zA-Z0-9_-]+)/);
    if (!m) return;
    const photoId = m[1];
    const idx = allPhotos.findIndex(p => p.id === photoId);
    if (idx >= 0) setLightbox(idx);
  }, [allPhotos]);

  const updateHash = useCallback((idx) => {
    if (typeof window === "undefined") return;
    const photoId = allPhotos[idx]?.id;
    if (photoId) window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#photo=${photoId}`);
  }, [allPhotos]);

  const lbPrev = useCallback(() => {
    setLightbox(i => {
      const next = i <= 0 ? allPhotos.length - 1 : i - 1;
      updateHash(next);
      return next;
    });
  }, [allPhotos, updateHash]);

  const lbNext = useCallback(() => {
    setLightbox(i => {
      const next = i >= allPhotos.length - 1 ? 0 : i + 1;
      updateHash(next);
      return next;
    });
  }, [allPhotos, updateHash]);
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [hlPhoto, setHlPhoto] = useState(null);
  const [pastMap, setPastMap] = useState(false);
  const [mapView, setMapView] = useState("map"); // "map" | "list"
  const cRef = useRef(null);
  const mapRef = useRef(null);
  const contactRef = useRef(null);
  const photoRefs = useRef({});
  const navigatingRef = useRef(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [formStatus, setFormStatus] = useState(null);
  const [formSending, setFormSending] = useState(false);
  const t = TR[lang];

  const handleSubmit = useCallback(() => {
    if (!formName.trim() || !formEmail.trim() || !formMsg.trim()) return;
    setFormSending(true);
    fetch("https://formspree.io/f/xzdjzyeo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formName, email: formEmail, message: formMsg }),
    })
      .then(r => { if (r.ok) { setFormStatus("ok"); setFormName(""); setFormEmail(""); setFormMsg(""); } else { setFormStatus("ng"); } })
      .catch(() => setFormStatus("ng"))
      .finally(() => setFormSending(false));
  }, [formName, formEmail, formMsg]);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  /* Reset all horizontal scrolls to left (newest photo) on mount */
  useEffect(() => {
    const scrollers = document.querySelectorAll(".cin-hscroll");
    scrollers.forEach(el => { el.scrollLeft = 0; });
  }, []);

  /* Scroll-linked fade-in for sections (IntersectionObserver) */
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    }, { root: null, threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    const targets = document.querySelectorAll(".reveal");
    targets.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  /* Keyboard navigation for lightbox */
  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") lbPrev();
      else if (e.key === "ArrowRight") lbNext();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, lbPrev, lbNext]);

  /* Preload adjacent lightbox images (±2 for faster swipe) */
  useEffect(() => {
    if (lightbox === null || !allPhotos.length) return;
    const len = allPhotos.length;
    const indices = [-2, -1, 1, 2].map(d => ((lightbox + d) % len + len) % len);
    indices.forEach(i => { const img = new Image(); img.src = allPhotos[i].url; });
  }, [lightbox, allPhotos]);

  /* Lock body scroll while lightbox is open (iOS-safe via position:fixed) */
  useEffect(() => {
    if (lightbox === null) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = { overflow: body.style.overflow, position: body.style.position, top: body.style.top, width: body.style.width };
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      const html = document.documentElement;
      const prevBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      requestAnimationFrame(() => { html.style.scrollBehavior = prevBehavior; });
    };
  }, [lightbox === null]);

  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY);
      if (mapRef.current) setPastMap(mapRef.current.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollToMap = useCallback(() => { mapRef.current && mapRef.current.scrollIntoView({ behavior: "smooth", block: "center" }); }, []);
  const scrollToContact = useCallback(() => { contactRef.current && contactRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); }, []);

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
    document.querySelectorAll('.cin-pref-group.reveal, .cin-map-wrap.reveal').forEach(r => {
      if (!r.classList.contains('is-visible')) {
        r.style.transition = 'none';
        r.classList.add('is-visible');
        void r.offsetHeight;
        r.style.transition = '';
      }
    });
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
    <div style={{ background: "#0a0a0a", color: "#e8e4df", minHeight: "100vh", fontFamily: "'Cormorant Garamond',Georgia,serif", position: "relative" }}>
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
                image: "https://res.cloudinary.com/dr53c12fo/image/upload/w_1200,f_auto,q_auto/" + encodeURIComponent(p.id) + ".jpg",
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

      <div ref={cRef}>
        <div className={"top-bar" + (scrollY > 80 ? " scrolled" : "")}>
          <div className="top-langs">
            {Object.entries(TR).map(([c, v]) => (
              <a key={c} href={`/${c}`} className={"top-lang-btn" + (lang === c ? " active" : "")}>{v.name}</a>
            ))}
          </div>
        </div>
        <TopNav lang={lang} t={t} scrollToMap={scrollToMap} scrollToContact={scrollToContact} />

        <div className="cin-hero">
          <div className={"cin-hero-bg" + (loaded ? " loaded" : "")} />
          <div className="cin-hero-content" style={{ zIndex: 2 }}>
            <h1 className="cin-hero-title">{t.hero.t}</h1>
            <p className="cin-hero-desc">{t.hero.d}</p>
          </div>
        </div>
        <section className="cin-section">
          <div className="cin-map-wrap reveal" id="map" ref={mapRef}>
            <div className="cin-map-box">
              {/* マップ/一覧 切替トグル */}
              <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 18, padding: "4px", background: "rgba(220,190,100,.06)", border: "1px solid rgba(220,190,100,.18)", borderRadius: 999, width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
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
                        background: active ? "rgba(220,190,100,.22)" : "transparent",
                        border: "none",
                        color: active ? "rgba(245,225,170,1)" : "rgba(232,228,223,.6)",
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
                        <h3 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(220,190,100,.7)", marginBottom: 14, paddingBottom: 8, borderBottom: "1px solid rgba(220,190,100,.15)" }}>
                          {lang === "ja" ? region.nameJa : region.nameEn}
                        </h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
                          {regionPrefs.map(({ prefJp, pf, slug }) => {
                            const heroId = pf.photos[0]?.id;
                            return (
                              <a key={prefJp} href={`/${lang}/${slug}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(220,190,100,.06)", border: "1px solid rgba(220,190,100,.2)", borderRadius: 8, textDecoration: "none", color: "#e8e4df" }}>
                                {heroId && (
                                  <img src={cldUrl(heroId, 100)} alt="" loading="lazy" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />
                                )}
                                <div style={{ minWidth: 0 }}>
                                  <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, color: "#f2ece2" }}>
                                    {getPrefName(prefJp, lang)}
                                  </div>
                                  <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 11, color: "rgba(232,228,223,.5)" }}>
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
          <div className="cin-gallery">
            {PREFECTURES.map((pf, pi) => {
              const prefSlug = PREF_SLUGS[pf.pref];
              const viewAllLabel = VIEW_ALL[lang] || VIEW_ALL.en;
              return (
              <div key={pf.pref} id={"pref-" + pi} className="cin-pref-group reveal">
                <div className="cin-pref">
                  {prefSlug ? (
                    <a href={`/${lang}/${prefSlug}`} className="cin-pref-link"><span>{getPrefName(pf.pref, lang)}</span></a>
                  ) : (
                    <span>{getPrefName(pf.pref, lang)}</span>
                  )}
                  {lang !== "en" && getPrefName(pf.pref, "en") !== getPrefName(pf.pref, lang) && (
                    <span className="cin-pref-jp">{getPrefName(pf.pref, "en")}</span>
                  )}
                  {prefSlug && (
                    <a href={`/${lang}/${prefSlug}`} className="cin-pref-viewall">{viewAllLabel} →</a>
                  )}
                </div>
                <div className="cin-hscroll">
                  {pf.photos.map((photo, idx) => {
                    const locSlug = photo.loc ? LOC_SLUGS[photo.loc] : null;
                    return (
                    <div key={pf.pref + idx} className="cin-hcard" onClick={() => { if (navigatingRef.current) return; openLightbox(getUrl(photo, lbW)); }} onContextMenu={e => e.preventDefault()}>
                      <div className="cin-hcard-img-wrap">
                        <img src={getUrl(photo, thumbW)} alt={(photo.loc ? getLocName(photo.loc, lang) + " - " : "") + getPrefName(pf.pref, lang) + " | Landscapes of Japan"} loading="lazy" decoding="async" draggable="false" />
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
                        <div className="cin-watermark">Landscapes of Japan</div>
                      </div>
                    </div>
                    );
                  })}
                </div>
                {pf.photos.length > 1 && <div className="cin-scroll-indicator">{t.scroll}</div>}
              </div>
              );
            })}
          </div>
        </section>

        {/* Contact Form */}
        <div style={{ width: "100%", height: 1, background: "rgba(232,228,223,.08)", maxWidth: 200, margin: "0 auto 60px" }} />
        <div className="contact-section reveal" id="contact" ref={contactRef}>
          <h2 className="contact-title">{t.contact.title}</h2>
          <div className="contact-form">
            <div className="contact-field">
              <label className="contact-label">{t.contact.name}</label>
              <input className="contact-input" type="text" value={formName} onChange={e => setFormName(e.target.value)} />
            </div>
            <div className="contact-field">
              <label className="contact-label">{t.contact.email}</label>
              <input className="contact-input" type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} />
            </div>
            <div className="contact-field">
              <label className="contact-label">{t.contact.msg}</label>
              <textarea className="contact-textarea" value={formMsg} onChange={e => setFormMsg(e.target.value)} />
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
      {lightbox !== null && (() => {
        const cur = allPhotos[lightbox];
        if (!cur) return null;
        let touchStartX = 0;
        let touchStartY = 0;
        let touchCount = 0;
        const onTouchStart = (e) => { touchCount = e.touches.length; touchStartX = e.touches[0].clientX; touchStartY = e.touches[0].clientY; };
        const onTouchEnd = (e) => {
          if (touchCount > 1) return;
          const diffX = e.changedTouches[0].clientX - touchStartX;
          const diffY = e.changedTouches[0].clientY - touchStartY;
          if (diffX > 60 && Math.abs(diffX) > Math.abs(diffY)) { lbPrev(); return; }
          if (diffX < -60 && Math.abs(diffX) > Math.abs(diffY)) { lbNext(); return; }
          // Small movement = tap → close (controls stopPropagate their own touchend so won't reach here).
          if (Math.abs(diffX) < 20 && Math.abs(diffY) < 20) closeLightbox();
        };
        const stopTouch = (fn) => (e) => { e.stopPropagation(); e.preventDefault(); fn(); };
        return (
          <div
            className={"cin-lb" + (lbClosing ? " closing" : "")}
            onContextMenu={e => e.preventDefault()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
          >
            <button
              className="cin-lb-close"
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              onTouchEnd={stopTouch(closeLightbox)}
              aria-label="Close"
            >×</button>
            <div className="cin-lb-info">
              <div className="cin-lb-pref">{getPrefName(cur.pref, lang)}</div>
              {cur.loc && <div className="cin-lb-loc">{getLocName(cur.loc, lang)}</div>}
              {cur.year && <div className="cin-lb-year">{cur.year}</div>}
            </div>
            <button
              className="cin-lb-arrow left"
              onClick={(e) => { e.stopPropagation(); lbPrev(); }}
              onTouchEnd={stopTouch(lbPrev)}
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <div className="cin-lb-inner" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>
              <img src={cur.url} alt={(cur.loc ? getLocName(cur.loc, lang) + " - " : "") + getPrefName(cur.pref, lang) + " | Landscapes of Japan"} draggable="false" />
              <div className="cin-lb-wm">Landscapes of Japan</div>
            </div>
            <button
              className="cin-lb-arrow right"
              onClick={(e) => { e.stopPropagation(); lbNext(); }}
              onTouchEnd={stopTouch(lbNext)}
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        );
      })()}
    </div>
  );
}
