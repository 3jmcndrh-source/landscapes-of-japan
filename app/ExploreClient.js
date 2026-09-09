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
import { COLLECTION_SLUGS, COLLECTION_META, getCollectionName } from "./collections-meta.js";
import { COLLECTION_TAGS } from "./photo-tags.js";
import { SEASONS, seasonLabel } from "./seasons.js";
import { ui, colorLabel } from "./ui-strings.js";
import { PALETTE_COLORS_ORDER, SWATCH } from "./color-meta.js";
import {
  selectPhotos, loadFacets, loadConcepts, getFacets, activeConditions,
} from "./photo-model.js";
import { CONCEPTS, conceptLabel } from "./concepts.js";
import { matchConcepts } from "./concept-search.js";
import {
  canUseFreeText, TOTAL_BYTES as FREE_BYTES,
  loadTextModel, encodeText, abortTextModel, textModelStatus,
} from "./text-encoder.js";
import { freeView, initialFree, isBusy, formatSizeMB } from "./free-search-state.js";
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
  const [query, setQuery] = useState(() => ({ pref: [], loc: [], theme: [], season: [], month: [], color: [], orientation: [], concept: [], conceptAll: [], bbox: null, sort: "" }));
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

  /* ⑦ 見た目から探す。
     入力はこのブラウザの中だけで概念へ変換する。入力そのものは
     URL・GA4・Clarity のどれにも送らない (URL に載るのは概念キーだけ)。
     conceptState: "idle" 未読込 / "loading" / "ready" / "error"
     読み込めなかった場合は「使えない」と表示し、0件とは区別する。 */
  const [lookText, setLookText] = useState("");
  const [conceptState, setConceptState] = useState("idle");
  const lookTimer = useRef(null);

  /* ⑦ 自由文で探す。概念語に当てはまらない表現を、文章モデルで直接評価する。
     モデルは大きい (圧縮後で約95MB) ので、押したときだけ取りに行く。
     通常の閲覧・概念語検索では取得しない。読み込み中も失敗時も、
     概念語の検索と写真の閲覧はそのまま使える。
     結果は URL に載せない (入力文を URL へ置かないため)。

     状態は app/free-search-state.js で1か所にまとめてある。
     未実行・取得中・準備中・推論中・完了0件・中止・失敗を混ぜないこと。
     free: { phase, pct, result: { order: Map<id,順位>, ids: Set<id>, count } | null } */
  const [free, setFree] = useState(initialFree);
  /* モデルの取得状況。初回に何MB要るかを案内に出すため。
     中止したあとは、残っている分だけを出す (毎回 全量とは言わない)。
     単位は十進 MB。formatSizeMB() が唯一の出どころ */
  const [model, setModel] = useState({ cached: false, pendingBytes: FREE_BYTES });
  /* 実行ごとの通し番号。遅れて返った古い検索が、今の入力を上書きしないようにする */
  const runId = useRef(0);
  const cancelledRun = useRef(-1);
  const alive = useRef(true);
  useEffect(() => () => { alive.current = false; }, []);

  const refreshCached = useCallback(() => {
    textModelStatus().then((s2) => { if (alive.current) setModel(s2); }).catch(() => {});
  }, []);

  const themeLocs = useMemo(
    () => Object.fromEntries(COLLECTION_SLUGS.map((s) => [s, COLLECTION_META[s].locs || []])),
    []
  );
  const opts = useMemo(() => ({ themeTags: COLLECTION_TAGS, themeLocs, locPoints: LOC_POINTS }), [themeLocs]);


  /* 画像特徴データ (169KB) は使うときだけ読み込む。初期表示には載せない */
  const conceptReq = useRef(null);
  const ensureConcepts = useCallback(async () => {
    /* 読み込み中に何度呼ばれても1回にまとめ、待っている側には結果を返す
       (状態変数で判定すると、読み込み中の呼び出しが false を受け取ってしまう) */
    if (!conceptReq.current) {
      setConceptState("loading");
      conceptReq.current = loadConcepts().then((c) => {
        setConceptState(c ? "ready" : "error");
        return Boolean(c);
      });
    }
    return conceptReq.current;
  }, []);

  /* ---- 起動時: URL から条件を読み、絞り込み用のデータを読み込む ---- */
  useEffect(() => {
    const q0 = readQueryFromParams(window.location.search);
    setQuery(q0);
    (async () => {
      await loadFacets();
      /* URL に概念が入っているときは、画像特徴データが届くまで
         「準備完了」にしない。先に絞り込むと、判定材料が無いので
         0件になってしまう (共有された ?concept= のURLで実際に起きた) */
      if (q0.concept.length || q0.conceptAll.length) await ensureConcepts();
      setReady(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setLookText("");
    runId.current++;
    setFree(initialFree);
    update({ pref: [], loc: [], theme: [], season: [], month: [], color: [], orientation: [], concept: [], conceptAll: [], bbox: null, sort: query.sort });
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

  /* ⑦ 入力された言葉を概念へ変換して条件に入れる。
     - 変換はこのブラウザの中だけ。入力文はどこへも送らない
     - 履歴は増やさない (入力のたびに戻るが効かなくなるのを避ける) */
  const onLook = useCallback((text) => {
    setLookText(text);
    /* 入力が変わったら前の自由文の結果は捨てる。
       遅れて返った古い検索が新しい入力を上書きしないようにする。
       取得中はその表示を残す (通信は続いているので、中止操作を隠さない) */
    runId.current++;
    setFree((f) => (isBusy(f.phase) ? { ...f, result: null } : initialFree));
    if (text.trim()) refreshCached();
    if (lookTimer.current) clearTimeout(lookTimer.current);
    lookTimer.current = setTimeout(async () => {
      const ok = await ensureConcepts();
      if (!ok) return;                        /* 読めなければ既存の条件はそのまま */
      /* 入力文から取り出した語は「全部に当てはまる」条件にする。
         「霧のかかった山」は 霧 と 山 の和ではなく、両方に合う写真のこと。
         絞り込みボタンの複数選択 (concept) とは別の欄に入れるので、
         北海道と沖縄を同時に選ぶような使い方は今までどおり両方出る。
         上位2語までを使う (組み合わせた文をビルド時に用意してある範囲)。 */
      const keys = matchConcepts(text, lang).map((h) => h.key).slice(0, 2);
      setQuery((prev) => {
        const nextAll = keys.length >= 2 ? keys : [];
        const nextOne = keys.length === 1 ? keys : [];
        if (prev.conceptAll.join(",") === nextAll.join(",") && prev.concept.join(",") === nextOne.join(",")) return prev;
        const next = { ...prev, concept: nextOne, conceptAll: nextAll };
        writer.current?.write(next, "replace");
        return next;
      });
      setShown(PAGE);
      /* 送るのは「使われたかどうか」と当たった数だけ。入力語は送らない */
      track("look_search", { hits: keys.length }, "look");
    }, 250);
  }, [ensureConcepts, lang, refreshCached]);

  /* 絞り込みボタンの選択は従来どおり「どれかに当てはまる」。
     入力欄で作った複合条件があれば、それは解除する (混ざると分かりにくい) */
  const toggleConcept = useCallback(async (key) => {
    const ok = await ensureConcepts();
    if (!ok) return;
    setLookText("");
    runId.current++;
    setFree(initialFree);
    setQuery((prev) => {
      const cur = prev.concept || [];
      const has = cur.includes(key);
      const next = {
        ...prev,
        concept: has ? cur.filter((v) => v !== key) : [...cur, key],
        conceptAll: [],
      };
      writer.current?.immediate(next, "push");
      track("explore_filter", { field: "concept", on: !has }, `concept:${key}`);
      return next;
    });
    setShown(PAGE);
  }, [ensureConcepts]);

  /* ⑦ 自由文で探す。押したときだけモデルを取りに行く。
     入力文は端末の中だけで扱い、URL・GA4・Clarity のどれにも送らない。
     画面にも入力欄以外へ出さない (画面記録に残さないため)。

     状態の移り変わり:
       downloading → preparing → running → done / empty
       途中で 中止 なら aborted、通信・初期化・推論の失敗なら failed。
     どれも「0件」とは別物として扱う。 */
  const runFreeSearch = useCallback(async () => {
    const text = lookText.trim();
    if (!text || !canUseFreeText(lang)) return;
    if (isBusy(free.phase)) return;          /* 連打しても同じ取得を二重に走らせない */
    const my = ++runId.current;
    /* この実行が中止されたか。中止後は表示済みの「中止」を上書きしない */
    const gone = () => !alive.current || cancelledRun.current === my;
    setFree({ phase: "downloading", pct: 0, result: null });
    try {
      const vs = await (async () => { await ensureConcepts(); return import("./vector-search.js"); })();
      /* 取得の進み具合は、この実行だけのものではなくモデル全体のもの。
         入力を書き換えても通信は続くので、通し番号では止めない
         (止めると割合が途中で凍りついて、実際と違う値を見せてしまう)。
         いま取得中の表示を出しているときだけ書き換える。 */
      const r = await loadTextModel({
        onProgress: (loaded, total) => {
          if (!alive.current) return;
          setFree((f) => (f.phase === "downloading" ? { ...f, pct: total ? loaded / total : 0 } : f));
        },
        onPhase: (p) => {
          if (!alive.current) return;
          if (p === "prepare") setFree((f) => (f.phase === "downloading" ? { ...f, phase: "preparing" } : f));
        },
      });
      refreshCached();
      if (gone()) return;
      if (runId.current !== my) {
        /* 入力が変わったあとに終わった取得。取得中の表示だけ畳む */
        setFree((f) => (isBusy(f.phase) ? initialFree : f));
        return;
      }
      if (!r.ok) {
        setFree({ phase: r.reason === "aborted" ? "aborted" : "failed", pct: 0, result: null });
        return;
      }
      setFree((f) => ({ ...f, phase: "running", pct: 1 }));
      const vec = await encodeText(text);
      if (gone() || runId.current !== my) return;
      const scores = vec ? vs.scoresForVector(vec) : null;
      if (!scores) { setFree({ phase: "failed", pct: 0, result: null }); return; }
      /* しきい値は概念語と同じ考え方 (この問い合わせでの平均 + 1.6σ)。
         合う写真が無ければ 0件。関係のない写真で枠を埋めない。 */
      const vals = [...scores.values()];
      const m = vals.reduce((a, b) => a + b, 0) / vals.length;
      const sd = Math.sqrt(vals.reduce((a, b) => a + (b - m) ** 2, 0) / vals.length);
      const th = m + 1.6 * sd;
      const ranked = [...scores.entries()].filter(([, s]) => s >= th).sort((a, b) => b[1] - a[1]);
      const order = new Map(ranked.map(([id], i) => [id, i]));
      setFree(order.size
        ? { phase: "done", pct: 1, result: { order, ids: new Set(order.keys()), count: order.size } }
        : { phase: "empty", pct: 1, result: null });
      setShown(PAGE);
      /* 送るのは使われたことと件数だけ。入力語は送らない */
      track("free_text_search", { results: order.size }, "free");
    } catch {
      if (!gone() && runId.current === my) setFree({ phase: "failed", pct: 0, result: null });
    }
  }, [lookText, lang, ensureConcepts, free.phase, refreshCached]);

  /* 取得を止める。表示を消すだけにせず、Worker ごと終了させて通信も止める */
  const cancelFree = useCallback(() => {
    cancelledRun.current = runId.current;
    abortTextModel();
    setFree({ phase: "aborted", pct: 0, result: null });
    refreshCached();
  }, [refreshCached]);

  const clearFree = useCallback(() => { runId.current++; setFree(initialFree); setShown(PAGE); }, []);

  const removeOne = useCallback((type, value) => {
    if (type === "bbox") return update({ ...query, bbox: null });
    update({ ...query, [type]: (query[type] || []).filter((v) => String(v) !== String(value)) });
  }, [query, update]);

  /* ---- 絞り込み結果 ---- */
  const facets = ready ? getFacets() : null;
  const results = useMemo(() => {
    if (!ready) return [];
    /* 自由文の結果があるときは、地域などの明示条件で絞ったうえで
       入力文に近い順に並べる。明示条件は今までどおり効く。 */
    if (free.result) {
      const base = selectPhotos({ ...query, sort: "region" }, opts);
      return base
        .filter((p) => free.result.ids.has(p.id))
        .sort((a, b) => free.result.order.get(a.id) - free.result.order.get(b.id));
    }
    return selectPhotos(query, opts);
    /* conceptState も見る。画像特徴データは後から届くので、
       届いた時点で数え直さないと古い結果が残る */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, query, opts, conceptState, free.result]);
  const visible = results.slice(0, shown);
  const conditions = activeConditions(query);

  /* いま自由文の欄に何を出すか。判断は1か所 (free-search-state.js) に寄せる */
  const fv = freeView({
    free,
    text: lookText.trim(),
    supported: canUseFreeText(lang),
    cached: model.cached,
  });

  /* 選択肢は条件で消さない。件数だけを添える (選択が勝手に外れないようにするため) */
  const countFor = useCallback((field, value) => {
    if (!ready) return null;
    const q2 = { ...query, [field]: [value] };
    return selectPhotos(q2, opts).length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, query, opts, conceptState]);

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
          {(conditions.length > 0 || free.result) && (
            <button type="button" className="flt-clear" onClick={clearAll}>{ui("clearFilter", lang)}</button>
          )}
        </div>

        {(conditions.length > 0 || free.result) && (
          <ul className="ex-active">
            {free.result && (
              <li key="free">
                <button type="button" onClick={clearFree}
                  aria-label={`${ui("freeChip", lang)} — ${ui("clearFilter", lang)}`}>
                  {ui("freeChip", lang)} <span aria-hidden="true">×</span>
                </button>
              </li>
            )}
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
            {COLLECTION_SLUGS.map((s) => chip(query.theme.includes(s), getCollectionName(s, lang), countFor("theme", s), () => toggle("theme", s), s))}
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
          {/* ⑦ 見た目から探す。写真の画像特徴で選ぶ (タグの一致ではない)。
              入力欄の文字はこのブラウザの中だけで概念に変換し、送信しない */}
          <Group title={ui("byLook", lang)}>
            <div className="ex-look">
              <input
                type="search"
                className="ex-look-in"
                value={lookText}
                onChange={(e) => onLook(e.target.value)}
                onFocus={ensureConcepts}
                placeholder={ui("lookPlaceholder", lang)}
                aria-label={ui("byLook", lang)}
                autoComplete="off"
                enterKeyHint="search"
                inputMode="search"
              />
            </div>
            {conceptState === "error" && <p className="ex-note" role="status">{ui("lookUnavailable", lang)}</p>}
            {/* ⑦ 概念語に当てはまらない言葉は、押したときだけモデルを取りに行って探す。
                入力した言葉そのものは画面の他の場所へ出さない (画面記録に残さないため)。
                どれを出すかは app/free-search-state.js が決める。
                探す前に「見つからない」と言わないこと (これが直した不具合)。 */}
            {fv.note === "unsupported" && <p className="ex-note" role="status">{ui("freeUnsupported", lang)}</p>}
            {fv.note === "aborted" && <p className="ex-note" role="status">{ui("freeAborted", lang)}</p>}
            {fv.note === "failed" && <p className="ex-note" role="status">{ui("freeUnavailable", lang)}</p>}
            {fv.note === "empty" && <p className="ex-note" role="status">{ui("freeNoResults", lang)}</p>}
            {(fv.showRun || fv.showRetry) && (
              <p className="ex-note">
                <button type="button" className="ex-chip" onClick={runFreeSearch}>
                  {fv.showRetry ? ui("freeRetry", lang) : ui("freeSearch", lang)}
                  {fv.showBytes ? ` (${formatSizeMB(model.pendingBytes)})` : ""}
                </button>
              </p>
            )}
            {fv.showCancel && (
              <p className="ex-note">
                {/* 割合は読み上げに載せない (数字が動くたびに読み直されるため) */}
                <span role="status">
                  {fv.pct == null ? ui("freeLoading", lang) : ui("freeDownloading", lang)}
                </span>
                {fv.pct != null && <span aria-hidden="true">{` ${Math.round(fv.pct * 100)}%`}</span>}{" "}
                <button type="button" className="ex-chip" onClick={cancelFree}>{ui("freeCancel", lang)}</button>
              </p>
            )}
            <div className="ex-group-b">
              {CONCEPTS.map((c) => chip(
                query.concept.includes(c.key),
                conceptLabel(c.key, lang),
                conceptState === "ready" ? countFor("concept", c.key) : null,
                () => toggleConcept(c.key),
                c.key
              ))}
            </div>
          </Group>
          <Group title={ui("orientation", lang)}>
            {ORIENTATIONS.map((o) => chip(query.orientation.includes(o), ui(`orientation_${o}`, lang), countFor("orientation", o), () => toggle("orientation", o), o))}
          </Group>
          <Group title={ui("galleryOrder", lang)}>
            {["region", "date", "added"].map((s) => (
              <button key={s} type="button" className={"ex-chip" + ((query.sort || "region") === s ? " on" : "")}
                aria-pressed={(query.sort || "region") === s} onClick={() => update({ ...query, sort: s })}>
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
                <button type="button" aria-label={ui("showMore", lang)} onClick={() => setShown((v) => v + PAGE)}>
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
    case "concept": return conceptLabel(c.value, lang);
    case "conceptAll": return conceptLabel(c.value, lang);
    case "month": return `${c.value}`;
    case "bbox": return ui("mapArea", lang);
    default: return String(c.value);
  }
}
