"use client";
import { useState, useEffect, useMemo } from "react";
import { cldUrl } from "./data.js";

/**
 * T8 ヒーロー生命化: シグネチャー写真をフルカラーでゆっくりクロスフェード+微ズーム。
 *
 * - 1枚目のロード完了までは何も描画しない (下層の grayscale 静止画が見えている)
 *   → JS 無効/低速回線/reduced-motion では従来のヒーローのまま (フォールバック維持)
 * - ズーム時間 = 切替間隔に一致させ、クロスフェード時のスケール段差を無くす
 * - 次の1枚を常に先読み
 */
export default function HeroRotation({ ids, interval = 9000 }) {
  const [s, setS] = useState({ cur: 0, prev: null, tick: 0 });
  const [active, setActive] = useState(false);
  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const w = useMemo(() => {
    if (typeof window === "undefined") return 2400;
    const px = Math.max(window.innerWidth, window.innerHeight) * (window.devicePixelRatio || 1);
    return px >= 3000 ? 3840 : px >= 1400 ? 2400 : 1200;
  }, []);

  /* 1枚目を先読みし、完了後に表示開始 */
  useEffect(() => {
    if (reduced || !ids.length) return;
    let on = true;
    const im = new Image();
    im.onload = () => { if (on) setActive(true); };
    im.src = cldUrl(ids[0], w);
    return () => { on = false; };
  }, [ids, w, reduced]);

  /* ローテーション */
  useEffect(() => {
    if (!active || ids.length < 2) return;
    const t = setInterval(
      () => setS((x) => ({ cur: (x.cur + 1) % ids.length, prev: x.cur, tick: x.tick + 1 })),
      interval
    );
    return () => clearInterval(t);
  }, [active, ids.length, interval]);

  /* 次の1枚を先読み */
  useEffect(() => {
    if (!active || ids.length < 2) return;
    const im = new Image();
    im.src = cldUrl(ids[(s.cur + 1) % ids.length], w);
  }, [s.cur, active, ids, w]);

  if (reduced || !active) return null;
  return (
    <div className="cin-hero-rot" aria-hidden="true">
      {s.prev !== null && (
        <img key={`p${s.tick}`} className="hr-img hr-out" src={cldUrl(ids[s.prev], w)} alt="" draggable="false" />
      )}
      <img key={`c${s.tick}`} className="hr-img hr-in" src={cldUrl(ids[s.cur], w)} alt="" draggable="false" />
    </div>
  );
}
