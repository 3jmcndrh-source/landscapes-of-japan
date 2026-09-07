"use client";
import { animateFromRect } from "./useViewTransition.js";
import { useState, useEffect, useRef, useCallback } from "react";
import { ambient } from "./photo-colors.js";
import { cldUrl } from "./data.js";
import { ui } from "./ui-strings.js";
import PhotoActions from "./PhotoActions.js";
import { pushHistory } from "./local-store.js";
import { nativeWidthFor } from "./PhotoImage.js";

/* ④ 実寸データ (91KB) は等倍表示を使うときだけ読み込む。
   Lightbox はほぼ全ページに載るので、初期JSには入れない。
   読み込めなかった場合は実寸の基準が無いので 2倍で拡大する
   (拡大そのものは動く。「実寸」と偽らないだけ)。 */
let _dims = null;
let _dimsReq = null;
function ensureDims() {
  if (_dims) return Promise.resolve(_dims);
  if (!_dimsReq) {
    _dimsReq = import("./photo-dims.js")
      .then((m) => { _dims = m.PHOTO_DIMS; return _dims; })
      .catch(() => null);
  }
  return _dimsReq;
}

/**
 * Shared lightbox (Round B): one gesture/zoom/keyboard implementation for
 * PageClient / PrefClient / LocClient.
 *
 * Props:
 *   photos    [{ id, url, pref, loc, year }]
 *   index     current index (parent owns open/close + index state)
 *   closing   parent-driven closing flag (.closing CSS animation)
 *   lang
 *   onClose() onPrev() onNext()
 *   labels    { pref, loc } resolved display names fn: (photo) => {prefName, locName, alt}
 *   photoHref (photo) => href | null  — "photo page" deep link
 *
 * Gestures: swipe L/R = prev/next, swipe down = close, double-tap/dblclick =
 * zoom toggle (2.4x at point), pinch = 1–4x, drag pans while zoomed. Single
 * tap closes (280 ms delayed so double-tap wins). ←/→/Esc on keyboard.
 * Body scroll is locked (iOS-safe) while open. Adjacent images preloaded ±2.
 */

const HINT_LABEL = { ja: "スワイプで前後の写真へ", zh: "滑动浏览照片", "zh-tw": "滑動瀏覽照片", ko: "스와이프로 사진 넘기기" };

export default function Lightbox({ photos, index, closing, lang, onClose, onPrev, onNext, labels, photoHref, originRect = null }) {
  const cur = photos[index];
  const [zoom, setZoom] = useState({ s: 1, tx: 0, ty: 0 });
  const [gesturing, setGesturing] = useState(false);
  const [showHint, setShowHint] = useState(false);
  /* ③ 操作表示を隠す (写真だけを見る) */
  const [bare, setBare] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const innerRef = useRef(null);
  const rootRef = useRef(null);
  const closeBtnRef = useRef(null);
  const touchRef = useRef({});
  const tapTimerRef = useRef(null);
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  const zoomed = zoom.s > 1.05;
  const resetZoom = useCallback(() => setZoom({ s: 1, tx: 0, ty: 0 }), []);

  const clampPan = useCallback((s, tx, ty) => {
    const el = innerRef.current?.querySelector("img");
    const r = el ? el.getBoundingClientRect() : { width: 800, height: 600 };
    const mx = (r.width * (s - 1)) / 2 / (zoomRef.current.s || 1) + 40;
    const my = (r.height * (s - 1)) / 2 / (zoomRef.current.s || 1) + 40;
    return { s, tx: Math.max(-mx, Math.min(mx, tx)), ty: Math.max(-my, Math.min(my, ty)) };
  }, []);

  /* ③ 等倍表示。基準は「公開している配信画像の実寸」で、
     原寸データや RAW を出すわけではない。実寸を超えて引き伸ばしたものを
     高画質とは呼ばないため、倍率は実寸/表示幅で決める。 */
  const nativeScale = useCallback(() => {
    const el = innerRef.current?.querySelector("img");
    if (!el) return 2;
    const shown = el.getBoundingClientRect().width;
    if (!shown) return 2;
    const dims = _dims ? _dims[photos[index]?.id] : null;
    const deliverable = nativeWidthFor(dims);
    return Math.max(1, Math.min(6, deliverable / shown));
  }, [index, photos]);

  const toggleNative = useCallback(() => {
    if (zoomRef.current.s > 1.05) { setZoom({ s: 1, tx: 0, ty: 0 }); return; }
    /* 実寸データが届いてから倍率を決める。届かなければ nativeScale が
       既定の2倍を返すので、拡大操作そのものは失敗しない */
    ensureDims().then(() => setZoom({ s: nativeScale(), tx: 0, ty: 0 }));
  }, [nativeScale]);

  /* ③ 全画面 (対応している環境でのみ) */
  const toggleFull = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) el.requestFullscreen?.().then(() => setIsFull(true)).catch(() => {});
      else document.exitFullscreen?.().then(() => setIsFull(false)).catch(() => {});
    } catch { /* 非対応環境では何もしない */ }
  }, []);
  useEffect(() => {
    const onFs = () => setIsFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  /* keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
      /* ③ PCでの明示的な拡大・縮小。入力欄では拾わない */
      else if (e.key === "+" || e.key === "=") { e.preventDefault(); setZoom((z) => clampPan(Math.min(6, z.s * 1.4), z.tx, z.ty)); }
      else if (e.key === "-") { e.preventDefault(); setZoom((z) => (z.s / 1.4 <= 1.05 ? { s: 1, tx: 0, ty: 0 } : clampPan(z.s / 1.4, z.tx, z.ty))); }
      else if (e.key === "0") { e.preventDefault(); resetZoom(); }
      else if (e.key === "1") { e.preventDefault(); toggleNative(); }
      else if (e.key === "f" || e.key === "F") { e.preventDefault(); toggleFull(); }
      else if (e.key === "h" || e.key === "H") { e.preventDefault(); setBare((v) => !v); }
      else if (e.key === "Tab") {
        /* ⑧ 開いている間、フォーカスがダイアログの外へ出ないようにする */
        const f = rootRef.current?.querySelectorAll("button, a[href]");
        if (!f || !f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext, clampPan, resetZoom, toggleNative, toggleFull]);

  /* index change → reset zoom */
  useEffect(() => { resetZoom(); }, [index, resetZoom]);

  /* ③ 最近見た写真。ここで記録するのは「実際に開いて表示している1枚」だけで、
     サムネイルの表示や先読み (下の ±2 プリロード) では記録しない。 */
  const shownId = photos[index]?.id;
  useEffect(() => { if (shownId) pushHistory(shownId); }, [shownId]);

  /* ⑧ 開いたら閉じるボタンへフォーカスを移し、閉じたら元の位置へ戻す。
     キーボードだけで見ている人が、閉じたあとに写真一覧の同じ場所へ帰れるようにする。 */
  useEffect(() => {
    const prev = typeof document !== "undefined" ? document.activeElement : null;
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      clearTimeout(t);
      try { if (prev && prev.focus && document.contains(prev)) prev.focus(); } catch {}
    };
  }, []);



  /* preload ±2 */
  useEffect(() => {
    const len = photos.length;
    if (!len) return;
    [-2, -1, 1, 2].forEach((d) => {
      const p = photos[((index + d) % len + len) % len];
      if (p) { const im = new Image(); im.src = p.url; }
    });
  }, [index, photos]);

  /* body scroll lock (iOS-safe position:fixed + restore) */
  useEffect(() => {
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = { overflow: body.style.overflow, position: body.style.position, top: body.style.top, width: body.style.width };
    body.style.overflow = "hidden"; body.style.position = "fixed"; body.style.top = `-${scrollY}px`; body.style.width = "100%";
    return () => {
      body.style.overflow = prev.overflow; body.style.position = prev.position; body.style.top = prev.top; body.style.width = prev.width;
      const html = document.documentElement;
      const prevBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      requestAnimationFrame(() => { html.style.scrollBehavior = prevBehavior; });
    };
  }, []);

  /* one-time swipe hint (touch devices, multi-photo) */
  useEffect(() => {
    if (photos.length < 2) return;
    if (typeof window === "undefined" || !window.matchMedia("(hover:none)").matches) return;
    try {
      if (localStorage.getItem("lojLbHint")) return;
      localStorage.setItem("lojLbHint", "1");
    } catch { return; }
    setShowHint(true);
    const t = setTimeout(() => setShowHint(false), 2400);
    return () => clearTimeout(t);
  }, [photos.length]);



  const toggleZoomAt = useCallback((clientX, clientY) => {
    const z = zoomRef.current;
    if (z.s > 1.05) { resetZoom(); return; }
    const el = innerRef.current?.querySelector("img");
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = clientX - (r.left + r.width / 2);
    const py = clientY - (r.top + r.height / 2);
    const s = 2.4;
    setZoom(clampPan(s, px * (1 - s), py * (1 - s)));
  }, [resetZoom, clampPan]);

  const scheduleTapClose = useCallback(() => {
    clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => { if (zoomRef.current.s <= 1.05) onClose(); }, 280);
  }, [onClose]);
  const cancelTapClose = useCallback(() => clearTimeout(tapTimerRef.current), []);
  useEffect(() => () => clearTimeout(tapTimerRef.current), []);

  /* ---- touch gestures ---- */
  const dist = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  const onTouchStart = (e) => {
    const T = touchRef.current;
    T.moved = 0;
    if (e.touches.length === 2) {
      setGesturing(true);
      T.pinch = { d0: dist(e.touches), s0: zoomRef.current.s, tx0: zoomRef.current.tx, ty0: zoomRef.current.ty };
    } else if (e.touches.length === 1) {
      const t0 = e.touches[0];
      T.start = { x: t0.clientX, y: t0.clientY, tx0: zoomRef.current.tx, ty0: zoomRef.current.ty };
      if (zoomRef.current.s > 1.05) setGesturing(true);
    }
  };
  const onTouchMove = (e) => {
    const T = touchRef.current;
    if (e.touches.length === 2 && T.pinch) {
      e.preventDefault();
      const s = Math.max(1, Math.min(4, T.pinch.s0 * (dist(e.touches) / T.pinch.d0)));
      setZoom(clampPan(s, T.pinch.tx0, T.pinch.ty0));
      T.moved = 99;
    } else if (e.touches.length === 1 && T.start) {
      const t0 = e.touches[0];
      const dx = t0.clientX - T.start.x, dy = t0.clientY - T.start.y;
      T.moved = Math.max(T.moved || 0, Math.abs(dx), Math.abs(dy));
      if (zoomRef.current.s > 1.05) {
        e.preventDefault();
        setZoom((z) => clampPan(z.s, T.start.tx0 + dx, T.start.ty0 + dy));
      }
    }
  };
  const onTouchEnd = (e) => {
    const T = touchRef.current;
    if (e.touches.length > 0) return; // wait for all fingers up
    setGesturing(false);
    if (T.pinch) {
      if (zoomRef.current.s < 1.1) resetZoom();
      T.pinch = null; T.start = null;
      return;
    }
    if (!T.start) return;
    const c = e.changedTouches[0];
    const dx = c.clientX - T.start.x, dy = c.clientY - T.start.y;
    T.start = null;
    if (zoomRef.current.s > 1.05) return; // panned while zoomed — no nav/close
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) { cancelTapClose(); (dx > 0 ? onPrev : onNext)(); return; }
    if (dy > 80 && Math.abs(dy) > Math.abs(dx)) { cancelTapClose(); onClose(); return; }
    if ((T.moved || 0) < 12) {
      // tap: double-tap zooms, lone tap closes (delayed)
      const now = Date.now();
      if (now - (T.lastTap || 0) < 300) { T.lastTap = 0; cancelTapClose(); toggleZoomAt(c.clientX, c.clientY); }
      else { T.lastTap = now; scheduleTapClose(); }
    }
  };

  /* ---- mouse (PC) ---- */
  const mouseRef = useRef(null);
  const onMouseDown = (e) => {
    if (zoomRef.current.s > 1.05 && e.button === 0) {
      mouseRef.current = { x: e.clientX, y: e.clientY, tx0: zoomRef.current.tx, ty0: zoomRef.current.ty, moved: 0 };
      setGesturing(true);
      e.preventDefault();
    }
  };
  useEffect(() => {
    const move = (e) => {
      const M = mouseRef.current;
      if (!M) return;
      const dx = e.clientX - M.x, dy = e.clientY - M.y;
      M.moved = Math.max(M.moved, Math.abs(dx), Math.abs(dy));
      setZoom((z) => clampPan(z.s, M.tx0 + dx, M.ty0 + dy));
    };
    const up = () => { if (mouseRef.current) { mouseRef.current = null; setGesturing(false); } };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [clampPan]);

  if (!cur) return null;
  const { prefName, locName, alt } = labels(cur);
  const href = photoHref ? photoHref(cur) : null;
  const pageLabel = ui("photoPage", lang);
  const stopTouch = (fn) => (e) => { e.stopPropagation(); e.preventDefault(); fn(); };

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={[locName, prefName].filter(Boolean).join(" — ")}
      className={"cin-lb" + (closing ? " closing" : "")}
      onContextMenu={(e) => e.preventDefault()}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={(e) => { if (e.target === e.currentTarget && !zoomed) onClose(); }}
      style={{ touchAction: "none", overscrollBehavior: "contain", "--amb": ambient(cur.id, 0.16) || "rgba(0,0,0,0)" }}
    >
      <button ref={closeBtnRef} className="cin-lb-close" hidden={bare} onClick={(e) => { e.stopPropagation(); onClose(); }} onTouchEnd={stopTouch(onClose)} aria-label={ui("close", lang)}>×</button>
      <div className="cin-lb-info" hidden={bare}>
        <div className="cin-lb-pref">{prefName}</div>
        {locName && <div className="cin-lb-loc">{locName}</div>}
        {cur.year && <div className="cin-lb-year">{cur.year}</div>}
      </div>
      {photos.length > 1 && !zoomed && !bare && (
        <button className="cin-lb-arrow left" onClick={(e) => { e.stopPropagation(); onPrev(); }} onTouchEnd={stopTouch(onPrev)} aria-label={ui("previousPhoto", lang)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
      )}
      <div className="cin-lb-inner" ref={innerRef} onMouseDown={onMouseDown}
        onClick={(e) => { e.stopPropagation(); if (mouseRef.current?.moved > 8) return; if (!zoomed) scheduleTapClose(); }}
        onDoubleClick={(e) => { e.stopPropagation(); cancelTapClose(); toggleZoomAt(e.clientX, e.clientY); }}
      >
        {/* ③ サムネイルと同じ transition 名を付けて、拡大表示へ「つながって」見せる。
            zoom 中は transform が走るので名前を外す (二重変形を避ける)。 */}
        <img
          /* ③ 等倍のときは、いちばん大きい配信画像に切り替える。
             小さい画像を引き伸ばしたものを等倍とは呼ばないため。 */
          src={zoomed ? cldUrl(cur.id, nativeWidthFor(_dims ? _dims[cur.id] : null)) : cur.url}
          alt={alt}
          draggable="false"
          style={{
            maxWidth: "92vw", maxHeight: "88vh", objectFit: "contain",
            transform: `translate3d(${zoom.tx}px, ${zoom.ty}px, 0) scale(${zoom.s})`,
            transition: gesturing ? "none" : "transform .28s cubic-bezier(.2,.8,.2,1)",
            cursor: zoomed ? "grab" : "zoom-in",
            willChange: "transform",
          }}
          ref={(el) => {
            /* ③ 開いた直後だけ、サムネイルの位置から本来の位置へ戻す。
               別の写真へ移動したあとは originRect を使わない (無関係な写真へ変形させない) */
            if (!el || el.dataset.flipped) return;
            el.dataset.flipped = "1";
            /* ref が呼ばれた時点では画像が未読込で矩形が 0×0 のことがある。
               その状態で測ると動きが出ないので、読込とレイアウト確定を待つ。 */
            const go = () => requestAnimationFrame(() => animateFromRect(el, originRect));
            if (el.complete && el.naturalWidth) go();
            else el.addEventListener("load", go, { once: true });
          }}
        />
        <div className="cin-lb-wm">Landscapes of Japan</div>
      </div>
      {photos.length > 1 && !zoomed && !bare && (
        <button className="cin-lb-arrow right" onClick={(e) => { e.stopPropagation(); onNext(); }} onTouchEnd={stopTouch(onNext)} aria-label={ui("nextPhoto", lang)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      )}
      {bare && (
        <button type="button" className="cin-lb-unbare" onClick={(e) => { e.stopPropagation(); setBare(false); }}
          aria-label={ui("showControls", lang)} title={ui("showControls", lang)}>▣</button>
      )}
      <div className="cin-lb-bottom" hidden={bare} onClick={(e) => e.stopPropagation()}>
        {photos.length > 1 && <span className="cin-lb-count">{index + 1} / {photos.length}</span>}
        {/* ③ 等倍・全画面・操作表示の切替 */}
        <button type="button" className="pa-btn" onClick={(e) => { e.stopPropagation(); toggleNative(); }}
          aria-pressed={zoomed} aria-label={ui("actualSize", lang)} title={ui("actualSize", lang)}>1:1</button>
        <button type="button" className="pa-btn" onClick={(e) => { e.stopPropagation(); toggleFull(); }}
          aria-pressed={isFull} aria-label={ui("fullscreen", lang)} title={ui("fullscreen", lang)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
          </svg>
        </button>
        <button type="button" className="pa-btn" onClick={(e) => { e.stopPropagation(); setBare(true); }}
          aria-label={ui("hideControls", lang)} title={ui("hideControls", lang)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
          </svg>
        </button>
        {/* ③④⑦ 対象は「いま表示している写真」。次へ移動すればこちらも切り替わる */}
        <PhotoActions photoId={cur.id} lang={lang} entry="lightbox" />
        {href && (
          <a
            className="cin-lb-pagelink"
            href={href}
            onClick={(e) => {
              e.stopPropagation();
              // P2: name the lightbox image so the cross-document view
              // transition morphs it into the photo page hero (vt-hero).
              const im = innerRef.current?.querySelector("img");
              if (im) im.style.viewTransitionName = "vt-hero";
            }}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            {pageLabel} →
          </a>
        )}
      </div>
      {showHint && (
        <div className="cin-lb-hint">← {HINT_LABEL[lang] || "Swipe to browse photos"} →</div>
      )}
    </div>
  );
}
