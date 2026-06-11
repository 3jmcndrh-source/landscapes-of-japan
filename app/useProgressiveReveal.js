"use client";
import { useState, useEffect, useRef } from "react";

/**
 * P3: staged grid rendering. Render `count` items now; when the sentinel
 * scrolls within 600px of the viewport, reveal `step` more. The revealed
 * count is remembered per-pathname in sessionStorage so browser back-nav
 * can restore scroll position into an already-expanded grid.
 *
 * Falls back to revealing everything when IntersectionObserver is missing.
 *
 *   const [count, sentinelRef] = useProgressiveReveal(photos.length);
 *   ...photos.slice(0, count).map(...)
 *   {count < photos.length && <div ref={sentinelRef} style={{height:1}} />}
 */
export function useProgressiveReveal(total, step = 24) {
  const [count, setCount] = useState(Math.min(step, total));
  const sentinelRef = useRef(null);

  /* restore back-nav state */
  useEffect(() => {
    try {
      const v = parseInt(sessionStorage.getItem("lojGrid:" + location.pathname) || "0", 10);
      if (v > step) setCount(Math.min(v, total));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try { sessionStorage.setItem("lojGrid:" + location.pathname, String(count)); } catch {}
    if (count >= total) return;
    const el = sentinelRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setCount(total); return; }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setCount((c) => Math.min(c + step, total));
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [count, total, step]);

  return [Math.min(count, total), sentinelRef];
}
