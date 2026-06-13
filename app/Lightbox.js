"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ambient } from "./photo-colors.js";

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
const PAGE_LABEL = { ja: "写真ページ", zh: "照片页", "zh-tw": "照片頁", ko: "사진 페이지" };

export default function Lightbox({ photos, index, closing, lang, onClose, onPrev, onNext, labels, photoHref }) {
  const cur = photos[index];
  const [zoom, setZoom] = useState({ s: 1, tx: 0, ty: 0 });
  const [gesturing, setGesturing] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const innerRef = useRef(null);
  const touchRef = useRef({});
  const tapTimerRef = useRef(null);
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  const zoomed = zoom.s > 1.05;
  const resetZoom = useCallback(() => setZoom({ s: 1, tx: 0, ty: 0 }), []);

  /* index change → reset zoom */
  useEffect(() => { resetZoom(); }, [index, resetZoom]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

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

  const clampPan = useCallback((s, tx, ty) => {
    const el = innerRef.current?.querySelector("img");
    const r = el ? el.getBoundingClientRect() : { width: 800, height: 600 };
    const mx = (r.width * (s - 1)) / 2 / (zoomRef.current.s || 1) + 40;
    const my = (r.height * (s - 1)) / 2 / (zoomRef.current.s || 1) + 40;
    return { s, tx: Math.max(-mx, Math.min(mx, tx)), ty: Math.max(-my, Math.min(my, ty)) };
  }, []);

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
  const pageLabel = PAGE_LABEL[lang] || "Photo page";
  const stopTouch = (fn) => (e) => { e.stopPropagation(); e.preventDefault(); fn(); };

  return (
    <div
      className={"cin-lb" + (closing ? " closing" : "")}
      onContextMenu={(e) => e.preventDefault()}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={(e) => { if (e.target === e.currentTarget && !zoomed) onClose(); }}
      style={{ touchAction: "none", overscrollBehavior: "contain", "--amb": ambient(cur.id, 0.16) || "rgba(0,0,0,0)" }}
    >
      <button className="cin-lb-close" onClick={(e) => { e.stopPropagation(); onClose(); }} onTouchEnd={stopTouch(onClose)} aria-label="Close">×</button>
      <div className="cin-lb-info">
        <div className="cin-lb-pref">{prefName}</div>
        {locName && <div className="cin-lb-loc">{locName}</div>}
        {cur.year && <div className="cin-lb-year">{cur.year}</div>}
      </div>
      {photos.length > 1 && (
        <button className="cin-lb-arrow left" onClick={(e) => { e.stopPropagation(); onPrev(); }} onTouchEnd={stopTouch(onPrev)} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
      )}
      <div className="cin-lb-inner" ref={innerRef} onMouseDown={onMouseDown}
        onClick={(e) => { e.stopPropagation(); if (mouseRef.current?.moved > 8) return; if (!zoomed) scheduleTapClose(); }}
        onDoubleClick={(e) => { e.stopPropagation(); cancelTapClose(); toggleZoomAt(e.clientX, e.clientY); }}
      >
        <img
          src={cur.url}
          alt={alt}
          draggable="false"
          style={{
            maxWidth: "92vw", maxHeight: "88vh", objectFit: "contain",
            transform: `translate3d(${zoom.tx}px, ${zoom.ty}px, 0) scale(${zoom.s})`,
            transition: gesturing ? "none" : "transform .28s cubic-bezier(.2,.8,.2,1)",
            cursor: zoomed ? "grab" : "zoom-in",
            willChange: "transform",
          }}
        />
        <div className="cin-lb-wm">Landscapes of Japan</div>
      </div>
      {photos.length > 1 && (
        <button className="cin-lb-arrow right" onClick={(e) => { e.stopPropagation(); onNext(); }} onTouchEnd={stopTouch(onNext)} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      )}
      <div className="cin-lb-bottom" onClick={(e) => e.stopPropagation()}>
        {photos.length > 1 && <span className="cin-lb-count">{index + 1} / {photos.length}</span>}
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
