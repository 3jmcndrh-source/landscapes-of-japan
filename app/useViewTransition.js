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
  /* 画像が未デコードだと自身の矩形が 0 になることがある。その場合は
     枠 (.cin-lb-inner) の矩形を使う。動きが「無かったこと」にしないため。 */
  let to = el.getBoundingClientRect();
  if ((!to.width || !to.height) && el.parentElement) to = el.parentElement.getBoundingClientRect();
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

/**
 * 拡大表示 → サムネイル へ戻す。
 * to が null (対応サムネイルが画面内に無い / 別写真へ移動した) 場合は短いフェード。
 * done() は必ず呼ぶ。アニメーションが失敗しても半透明のまま残さない。
 */
export function animateToRect(el, to, done) {
  const finish = () => { try { done && done(); } catch {} };
  if (!el || prefersReducedMotion() || typeof el.animate !== "function") { finish(); return; }
  let from = el.getBoundingClientRect();
  if ((!from.width || !from.height) && el.parentElement) from = el.parentElement.getBoundingClientRect();
  if (!from.width || !from.height) { finish(); return; }

  if (!to || !to.width || !to.height) {
    const a = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, easing: EASE });
    a.finished.then(finish, finish);
    return;
  }
  const scale = Math.max(to.width / from.width, to.height / from.height);
  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  const a = el.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0.85 },
    ],
    { duration: DURATION, easing: EASE, fill: "forwards" }
  );
  a.finished.then(finish, finish);
  setTimeout(finish, DURATION + 250);   // 保険: 連打や中断でも必ず後始末する
}

/**
 * 絞り込み用の FLIP。更新前の矩形を渡すと、残った写真は移動、
 * 新しく入った写真はフェードインする。写真ID を鍵にするので
 * 別の写真が同じカードとして誤って変形することはない。
 */
export function flipGrid(container, prevRects) {
  if (!container || prefersReducedMotion()) return;
  const cards = container.querySelectorAll("[data-pid]");
  const vh = window.innerHeight;
  for (const el of cards) {
    const r = el.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) continue;   // 画面外は対象外 (全件に重い処理をしない)
    const prev = prevRects.get(el.dataset.pid);
    if (prev) {
      const dx = prev.left - r.left, dy = prev.top - r.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue;
      el.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0,0)" }],
        { duration: DURATION, easing: EASE }
      );
    } else {
      el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: EASE });
    }
  }
}
export function captureGridRects(container) {
  const m = new Map();
  if (!container) return m;
  for (const el of container.querySelectorAll("[data-pid]")) {
    m.set(el.dataset.pid, el.getBoundingClientRect());
  }
  return m;
}
