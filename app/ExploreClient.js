"use client";
/**
 * ① 写真探索を一つの画面に統合する。
 *
 * 地域・テーマ・季節・色・縦横を同じ一覧に同時に適用する。
 * 判定・並び替えは app/photo-model.js の1か所だけを通す
 * (コレクションページや色検索と結果が食い違わないようにするため)。
 *
 * 画面に出す文字は最小限: 件数・選択中の条件・「絞り込み」の開閉だけ。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { PREFECTURES, getLocName, getPrefName, cldUrl, lbWidth } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { COLLECTIONS, getCollectionName } from "./collections.js";
import { COLLECTION_TAGS } from "./photo-tags.js";
import { SEASONS, seasonLabel } from "./seasons.js";
import { ui, colorLabel } from "./ui-strings.js";
import { PALETTE_COLORS_ORDER, SWATCH } from "./color-meta.js";
import {
  selectPhotos, loadFacets, getFacets, activeConditions,
} from "./photo-model.js";
import { readQueryFromParams, makeUrlWriter, queryToString } from "./explore-state.js";
import PhotoCard from "./PhotoCard.js";
import Lightbox from "./Lightbox.js";
import SiteHeader from "./SiteHeader.js";
import { track } from "./analytics.js";
import { useOriginRect, animateToRect } from "./useViewTransition.js";
import { LOC_POINTS } from "./loc-points.js";

/* ② 地図は開いた人だけが読み込む (地図の形と d3 を初期表示に載せない) */
const PhotoMap = dynamic(() => import("./PhotoMap.js"), { ssr: false });

const ORIENTATIONS = ["landscape", "portrait", "square"];
const PAGE = 60;   /* 段階表示。初期表示で最大画像を全部取りに行かないため */

export default function ExploreClient({ lang }) {
  const [query, setQuery] = useState(() => ({ pref: [], loc: [], theme: [], season: [], month: [], color: [], orientation: [], bbox: null, sort: "region" }));
  const [ready, setReady] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [shown, setShown] = useState(PAGE);
  const [lightbox, setLightbox] = useState(null);
  const [lbClosing, setLbClosing] = useState(false);
  /* ② 一覧と地図の切り替え。切り替えても条件は同じものを使うので選択は失われない */
  const [view, setView] = useState("list");
  /* 拡大表示に渡す画像幅。画面に合わせて選ぶ (一覧の小さい画像を使い回さない) */
  const [lbW, setLbW] = useState(2400);
  useEffect(() => { setLbW(lbWidth()); }, []);

  const writer = useRef(null);
  if (!writer.current && typeof window !== "undefined") writer.current = makeUrlWriter();

  const themeLocs = useMemo(
    () => Object.fromEntries(Object.entries(COLLECTIONS).map(([s, c]) => [s, c.locs || []])),
    []
  );
  const opts = useMemo(() => ({ themeTags: COLLECTION_TAGS, themeLocs, locPoints: LOC_POINTS }), [themeLocs]);

  /* ---- 起動時: URL から条件を読み、絞り込み用のデータを読み込む ---- */
  useEffect(() => {
    setQuery(readQueryFromParams(window.location.search));
    loadFacets().then(() => setReady(true));
  }, []);

  /* 戻る・進むで条件を復元する */
  useEffect(() => {
    const onPop = () => { setQuery(readQueryFromParams(window.location.search)); setShown(PAGE); };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  /* ---- 条件の変更 ---- */
  const update = useCallback((next, mode = "push") => {
    setQuery(next);
    setShown(PAGE);
    writer.current?.immediate(next, mode);
  }, []);

  const toggle = useCallback((field, value) => {
    setQuery((prev) => {
      const cur = prev[field] || [];
      const has = cur.includes(value);
      const next = { ...prev, [field]: has ? cur.filter((v) => v !== value) : [...cur, value] };
      writer.current?.immediate(next, "push");
      track("explore_filter", { field, on: !has }, `${field}:${value}`);
      return next;
    });
    setShown(PAGE);
  }, []);

  const clearAll = useCallback(() => {
    update({ pref: [], loc: [], theme: [], season: [], month: [], color: [], orientation: [], bbox: null, sort: query.sort });
  }, [update, query.sort]);

  /* 地図の範囲は連続して変わるので履歴に積まない。条件としては他と同じ扱い */
  const setBBox = useCallback((bbox) => {
    setQuery((prev) => {
      const same = JSON.stringify(prev.bbox) === JSON.stringify(bbox);
      if (same) return prev;
      const next = { ...prev, bbox };
      writer.current?.write(next, "replace");
      return next;
    });
    setShown(PAGE);
  }, []);

  const pickLoc = useCallback((loc) => {
    setQuery((prev) => {
      const cur = prev.loc || [];
      const next = { ...prev, loc: cur.includes(loc) ? cur.filter((l) => l !== loc) : [...cur, loc] };
      writer.current?.immediate(next, "push");
      track("map_pick_loc", {}, loc);
      return next;
    });
    setShown(PAGE);
  }, []);

  const removeOne = useCallback((type, value) => {
    if (type === "bbox") return update({ ...query, bbox: null });
    update({ ...query, [type]: (query[type] || []).filter((v) => String(v) !== String(value)) });
  }, [query, update]);

  /* ---- 絞り込み結果 ---- */
  const facets = ready ? getFacets() : null;
  const results = useMemo(
    () => (ready ? selectPhotos(query, opts) : []),
    [ready, query, opts]
  );
  const visible = results.slice(0, shown);
  const conditions = activeConditions(query);

  /* 選択肢は条件で消さない。件数だけを添える (選択が勝手に外れないようにするため) */
  const countFor = useCallback((field, value) => {
    if (!ready) return null;
    const q2 = { ...query, [field]: [value] };
    return selectPhotos(q2, opts).length;
  }, [ready, query, opts]);

  /* ---- 拡大表示 ---- */
  const origin = useOriginRect();
  const cardRefs = useRef(new Map());
  const lbRef = useRef(null);
  useEffect(() => { lbRef.current = lightbox; }, [lightbox]);

  const lbPhotos = useMemo(
    () => visible.map((p) => ({ id: p.id, url: cldUrl(p.id, lbW), pref: p.pref, loc: p.loc, year: p.year })),
    [visible, lbW]
  );

  const openAt = useCallback((photo) => {
    const i = visible.findIndex((p) => p.id === photo.id);
    if (i < 0) return;
    const el = cardRefs.current.get(photo.id);
    if (el) origin.capture(el);
    setLightbox(i);
    track("photo_open", { photo_id: photo.id, entry: "explore" }, `${photo.id}|explore`);
  }, [visible, origin]);

  const closeLightbox = useCallback(() => {
    const i = lbRef.current;
    const id = i !== null && visible[i] ? visible[i].id : null;
    const card = id ? cardRefs.current.get(id) : null;
    let rect = null;
    if (card) {
      const r = card.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) rect = r;
    }
    setLbClosing(true);
    animateToRect(document.querySelector(".cin-lb-inner img"), rect, () => {
      setLightbox(null); setLbClosing(false);
    });
  }, [visible]);

  const lbPrev = useCallback(() => setLightbox((i) => (i <= 0 ? visible.length - 1 : i - 1)), [visible.length]);
  const lbNext = useCallback(() => setLightbox((i) => (i >= visible.length - 1 ? 0 : i + 1)), [visible.length]);

  /* ---- 選択肢の一覧 ---- */
  const prefs = useMemo(() => PREFECTURES.filter((p) => p.photos.length).map((p) => p.pref), []);
  const locsOfSelectedPrefs = useMemo(() => {
    const src = query.pref.length ? PREFECTURES.filter((p) => query.pref.includes(p.pref)) : PREFECTURES;
    return [...new Set(src.flatMap((p) => p.photos.map((x) => x.loc)).filter(Boolean))].filter((l) => LOC_SLUGS[l]);
  }, [query.pref]);

  const chip = (on, label, count, onClick, key) => (
    <button key={key} type="button" className={"ex-chip" + (on ? " on" : "")} aria-pressed={on} onClick={onClick}>
      {label}{count != null && <span className="ex-n">{count}</span>}
    </button>
  );

  return (
    <div className="ex-page">
      <SiteHeader lang={lang} langHrefFor={(c) => `/${c}/explore${queryToString(query) ? `?${queryToString(query)}` : ""}`} />

      <main className="ex-main">
        {/* 常時見えるのは 件数・選択中の条件・絞り込みを開く操作 だけ */}
        <div className="ex-bar">
          <button type="button" className="ex-toggle" aria-expanded={panelOpen} aria-controls="ex-panel" onClick={() => setPanelOpen((v) => !v)}>
            {ui("filter", lang)}
          </button>
          <span className="ex-count" aria-live="polite">
            {ready ? results.length : ""}
          </span>
          <div className="ex-view" role="tablist" aria-label={ui("explore", lang)}>
            {["list", "map"].map((v) => (
              <button key={v} type="button" role="tab" aria-selected={view === v}
                className={"ex-chip" + (view === v ? " on" : "")}
                onClick={() => setView(v)}>
                {v === "list" ? ui("byRegion", lang) : ui("mapArea", lang)}
              </button>
            ))}
          </div>
          {conditions.length > 0 && (
            <button type="button" className="flt-clear" onClick={clearAll}>{ui("clearFilter", lang)}</button>
          )}
        </div>

        {conditions.length > 0 && (
          <ul className="ex-active">
            {conditions.map((c) => (
              <li key={`${c.type}-${c.value}`}>
                <button type="button" onClick={() => removeOne(c.type, c.value)}
                  aria-label={`${labelOf(c, lang)} — ${ui("clearFilter", lang)}`}>
                  {labelOf(c, lang)} <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div id="ex-panel" className="ex-panel" hidden={!panelOpen}>
          <Group title={ui("region", lang)}>
            {prefs.map((p) => chip(query.pref.includes(p), getPrefName(p, lang), countFor("pref", p), () => toggle("pref", p), p))}
          </Group>
          {locsOfSelectedPrefs.length > 1 && (
            <Group title={ui("byRegion", lang)}>
              {locsOfSelectedPrefs.map((l) => chip(query.loc.includes(l), getLocName(l, lang), countFor("loc", l), () => toggle("loc", l), l))}
            </Group>
          )}
          <Group title={ui("theme", lang)}>
            {Object.keys(COLLECTIONS).map((s) => chip(query.theme.includes(s), getCollectionName(s, lang), countFor("theme", s), () => toggle("theme", s), s))}
          </Group>
          <Group title={ui("season", lang)}>
            {SEASONS.map((s) => chip(query.season.includes(s.key), `${s.icon} ${seasonLabel(s.key, lang)}`, countFor("season", s.key), () => toggle("season", s.key), s.key))}
          </Group>
          <Group title={ui("byColor", lang)}>
            {PALETTE_COLORS_ORDER.map((c) => (
              <button key={c} type="button" className={"ex-swatch" + (query.color.includes(c) ? " on" : "")}
                aria-pressed={query.color.includes(c)} aria-label={colorLabel(c, lang)} title={colorLabel(c, lang)}
                style={{ background: SWATCH[c] }} onClick={() => toggle("color", c)} />
            ))}
          </Group>
          <Group title={ui("orientation", lang)}>
            {ORIENTATIONS.map((o) => chip(query.orientation.includes(o), ui(`orientation_${o}`, lang), countFor("orientation", o), () => toggle("orientation", o), o))}
          </Group>
          <Group title={ui("galleryOrder", lang)}>
            {["region", "date", "added"].map((s) => (
              <button key={s} type="button" className={"ex-chip" + (query.sort === s ? " on" : "")}
                aria-pressed={query.sort === s} onClick={() => update({ ...query, sort: s })}>
                {s === "region" ? ui("byRegion", lang) : s === "date" ? ui("byDate", lang) : ui("newArrivals", lang)}
              </button>
            ))}
          </Group>
        </div>

        {!ready && <p className="ex-empty">{ui("loading", lang)}</p>}

        {ready && results.length === 0 && (
          <div className="flt-empty">
            <span>{ui("noResults", lang)}</span>
            <button type="button" className="flt-clear" onClick={clearAll}>{ui("clearFilter", lang)}</button>
          </div>
        )}

        {ready && view === "map" && (
          <PhotoMap
            lang={lang}
            photos={results}
            selectedLocs={query.loc}
            bbox={query.bbox}
            onPickLoc={pickLoc}
            onBBox={setBBox}
          />
        )}

        {ready && results.length > 0 && (
          <>
            <div className="ex-grid">
              {visible.map((p, i) => (
                <div key={p.id} ref={(el) => { if (el) cardRefs.current.set(p.id, el); else cardRefs.current.delete(p.id); }}>
                  <PhotoCard
                    photo={p}
                    lang={lang}
                    dims={facets?.dims?.PHOTO_DIMS?.[p.id] || null}
                    sizes="(max-width: 600px) 45vw, (max-width: 1100px) 30vw, 22vw"
                    widths="grid"
                    priority={i < 4}
                    onOpen={openAt}
                  />
                </div>
              ))}
            </div>
            {shown < results.length && (
              <div className="ex-more">
                <button type="button" onClick={() => setShown((v) => v + PAGE)}>
                  {results.length - shown}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {lightbox !== null && lbPhotos[lightbox] && (
        <Lightbox
          photos={lbPhotos}
          index={lightbox}
          closing={lbClosing}
          lang={lang}
          onClose={closeLightbox}
          onPrev={lbPrev}
          onNext={lbNext}
          originRect={origin.take()}
          labels={(p) => ({
            prefName: getPrefName(p.pref, lang),
            locName: p.loc ? getLocName(p.loc, lang) : "",
            alt: `${p.loc ? getLocName(p.loc, lang) : ""} - ${getPrefName(p.pref, lang)}`,
          })}
          photoHref={(p) => (PREF_SLUGS[p.pref] && p.loc && LOC_SLUGS[p.loc] ? `/${lang}/${PREF_SLUGS[p.pref]}/${LOC_SLUGS[p.loc]}/${p.id}` : null)}
        />
      )}
    </div>
  );
}

function Group({ title, children }) {
  return (
    <section className="ex-group">
      <h2 className="ex-group-t">{title}</h2>
      <div className="ex-group-b">{children}</div>
    </section>
  );
}

function labelOf(c, lang) {
  switch (c.type) {
    case "pref": return getPrefName(c.value, lang);
    case "loc": return getLocName(c.value, lang);
    case "theme": return getCollectionName(c.value, lang);
    case "season": return seasonLabel(c.value, lang);
    case "color": return colorLabel(c.value, lang);
    case "orientation": return ui(`orientation_${c.value}`, lang);
    case "month": return `${c.value}`;
    case "bbox": return ui("mapArea", lang);
    default: return String(c.value);
  }
}
