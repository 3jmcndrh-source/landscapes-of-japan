"use client";
import { useCallback, useRef } from "react";

/**
 * ③ サムネイル → 拡大表示 を「つながって」見せる。
 *
 * View Transition API は採用を検討したが見送った。理由:
 *   startViewTransition のコールバック内で React の状態更新が同期的に反映されず
 *   (React 19 の並行レンダリング)、flushSync を挟んでも Lightbox が開かなくなった。
 *   実測で「API は呼ばれるが画面が変わらない」状態になったため、
 *   既存の Lightbox 構造を壊さない軽量な代替 (FLIP) に切り替えた。
 *
 * FLIP: 押したサムネイルの矩形を記録し、拡大表示の画像をその矩形から
 *   本来の位置へ Web Animations API で戻す。回転・バウンド・引き伸ばしはしない。
 */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const DURATION = 280;   // 200-350ms の範囲。短く控えめに
const EASE = "cubic-bezier(.2,.8,.2,1)";

/** 起点の矩形を覚えるだけのフック。状態更新には一切干渉しない */
export function useOriginRect() {
  const ref = useRef(null);
  const capture = useCallback((el) => {
    ref.current = el ? el.getBoundingClientRect() : null;
  }, []);
  const take = useCallback(() => {
    const r = ref.current;
    ref.current = null;
    return r;
  }, []);
  return { capture, take, peek: () => ref.current };
}

/**
 * 拡大表示の画像を、記録した矩形から本来の位置へ動かす。
 * from が無い (対応サムネイルが画面内に無い) 場合は短いフェードにする。
 */
export function animateFromRect(el, from) {
  if (!el || prefersReducedMotion() || typeof el.animate !== "function") return;
  const to = el.getBoundingClientRect();
  if (!to.width || !to.height) return;

  if (!from || !from.width || !from.height) {
    el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, easing: EASE });
    return;
  }
  /* 縦横比を保つため scale は 1つの値にする (引き伸ばさない) */
  const scale = Math.max(from.width / to.width, from.height / to.height);
  const dx = from.left + from.width / 2 - (to.left + to.width / 2);
  const dy = from.top + from.height / 2 - (to.top + to.height / 2);
  el.animate(
    [
      { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0.85 },
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
    ],
    { duration: DURATION, easing: EASE }
  );
}
