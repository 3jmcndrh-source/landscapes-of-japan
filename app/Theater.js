"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { cldUrl } from "./data.js";
import { ambient } from "./photo-colors.js";

/**
 * T1 シアターモード: オーバーレイ方式の全画面スライドショー (新ページ不要)。
 *
 * Props:
 *   photos        [{ id, pref, loc, year }]
 *   lang
 *   onClose()
 *   labels        (photo) => { prefName, locName }   表示名解決 (Lightbox と同形)
 *   startIndex    開始位置 (default 0)
 *   initialShuffle 起動時シャッフル (ホームは true 推奨)
 *
 * 挙動: 8秒ごとにクロスフェード+微 Ken Burns (prefers-reduced-motion で無効)。
 * T2 のアンビエント色で背景を染める。地名/年は各スライド冒頭に出て消える。
 * 次2枚を先読み。タップ/マウス移動で UI 表示 (2.8s で自動非表示)。
 * Esc/✕ で終了。Fullscreen API は可能なら使用 (iOS 等は fixed overlay のみ)。
 */

const SLIDE_MS = 8000;

/* 画面の実効解像度からシアター用画像幅を選ぶ (T4 の 3840 を活用) */
const theaterW = () => {
  if (typeof window === "undefined") return 2400;
  const px = Math.max(window.innerWidth, window.innerHeight) * (window.devicePixelRatio || 1);
  return px >= 3000 ? 3840 : px >= 1500 ? 2400 : 1200;
};

const shuffled = (n, keepFirst) => {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (keepFirst != null) {
    const k = a.indexOf(keepFirst);
    if (k > 0) [a[0], a[k]] = [a[k], a[0]];
  }
  return a;
};

export default function Theater({ photos, lang, onClose, labels, startIndex = 0, initialShuffle = false }) {
  const n = photos.length;
  /* initialShuffle かつ開始位置指定なし → 完全ランダム開始 (毎回違う体験) */
  const [order, setOrder] = useState(() =>
    initialShuffle ? shuffled(n, startIndex > 0 ? startIndex : null) : Array.from({ length: n }, (_, i) => i)
  );
  const [shuffleOn, setShuffleOn] = useState(initialShuffle);
  const [pos, setPos] = useState(() => (initialShuffle ? 0 : startIndex));
  const [prevPos, setPrevPos] = useState(null);
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [uiVisible, setUiVisible] = useState(true);
  const [imgW] = useState(theaterW);
  const rootRef = useRef(null);
  const hideTimerRef = useRef(null);
  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const cur = photos[order[pos]];
  const prev = prevPos !== null ? photos[order[prevPos]] : null;

  const advance = useCallback((dir = 1) => {
    setPos((p) => {
      setPrevPos(p);
      return (p + dir + n) % n;
    });
    setTick((t) => t + 1);
  }, [n]);

  /* auto-advance */
  useEffect(() => {
    if (!playing || n < 2) return;
    const t = setTimeout(() => advance(1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [playing, pos, n, advance]);

  /* preload next 2 */
  useEffect(() => {
    [1, 2].forEach((d) => {
      const p = photos[order[(pos + d) % n]];
      if (p) { const im = new Image(); im.src = cldUrl(p.id, imgW); }
    });
  }, [pos, order, photos, n, imgW]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); }
      else if (e.key === "ArrowRight") advance(1);
      else if (e.key === "ArrowLeft") advance(-1);
      else if (e.key === " ") { e.preventDefault(); setPlaying((p) => !p); }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose, advance]);

  /* body scroll lock (iOS-safe, Lightbox と同パターン) */
  useEffect(() => {
    const scrollY = window.scrollY;
    const body = document.body;
    const prevSt = { overflow: body.style.overflow, position: body.style.position, top: body.style.top, width: body.style.width };
    body.style.overflow = "hidden"; body.style.position = "fixed"; body.style.top = `-${scrollY}px`; body.style.width = "100%";
    return () => {
      body.style.overflow = prevSt.overflow; body.style.position = prevSt.position; body.style.top = prevSt.top; body.style.width = prevSt.width;
      const html = document.documentElement;
      const prevBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      requestAnimationFrame(() => { html.style.scrollBehavior = prevBehavior; });
    };
  }, []);

  /* fullscreen (対応環境のみ。iOS Safari 等は fixed overlay のまま) */
  useEffect(() => {
    const el = rootRef.current;
    if (el?.requestFullscreen) el.requestFullscreen({ navigationUI: "hide" }).catch(() => {});
    return () => {
      if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
    };
  }, []);

  /* UI auto-hide */
  const showUi = useCallback(() => {
    setUiVisible(true);
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setUiVisible(false), 2800);
  }, []);
  useEffect(() => {
    showUi();
    return () => clearTimeout(hideTimerRef.current);
  }, [showUi]);

  const toggleShuffle = useCallback(() => {
    setShuffleOn((s) => {
      const next = !s;
      setOrder((o) => {
        const curIdx = o[pos];
        const newOrder = next ? shuffled(n, curIdx) : Array.from({ length: n }, (_, i) => i);
        setPos(next ? 0 : curIdx);
        return newOrder;
      });
      setPrevPos(null);
      return next;
    });
  }, [n, pos]);

  if (!cur) return null;
  const { prefName, locName } = labels(cur);
  const stop = (fn) => (e) => { e.stopPropagation(); fn(); };

  return (
    <div
      ref={rootRef}
      className={"th-root" + (reduced ? " th-reduced" : "")}
      style={{ "--amb": ambient(cur.id, 0.22) || "rgba(0,0,0,0)" }}
      onPointerMove={showUi}
      onClick={showUi}
      onContextMenu={(e) => e.preventDefault()}
      role="dialog"
      aria-label="Theater mode"
    >
      {prev && tick > 0 && (
        <img key={`o${tick}`} className="th-img th-out" src={cldUrl(prev.id, imgW)} alt="" draggable="false" />
      )}
      <img
        key={`i${tick}`}
        className={`th-img th-in th-kb${tick % 4}`}
        src={cldUrl(cur.id, imgW)}
        alt={`${locName || ""} - ${prefName || ""}`}
        draggable="false"
      />

      <div key={`c${tick}`} className="th-caption">
        <div className="th-cap-loc">{locName || prefName}</div>
        <div className="th-cap-sub">
          {locName ? prefName : ""}
          {cur.year ? <span className="th-cap-year">{cur.year}</span> : null}
        </div>
      </div>

      <div className="th-wm">Landscapes of Japan</div>

      <div className={"th-ui" + (uiVisible ? " visible" : "")}>
        <button className="th-close" onClick={stop(onClose)} aria-label="Close theater">×</button>
        <div className="th-controls" onClick={(e) => e.stopPropagation()}>
          <button className="th-btn" onClick={() => advance(-1)} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button className="th-btn th-play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"}>
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="7 4 21 12 7 20" /></svg>
            )}
          </button>
          <button className="th-btn" onClick={() => advance(1)} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
          <button className={"th-btn th-shuffle" + (shuffleOn ? " active" : "")} onClick={toggleShuffle} aria-label="Shuffle" title="Shuffle">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" /></svg>
          </button>
          <span className="th-count">{pos + 1} / {n}</span>
        </div>
      </div>
    </div>
  );
}
