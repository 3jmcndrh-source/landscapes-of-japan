"use client";
import { animateFromRect, prefersReducedMotion } from "./useViewTransition.js";
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { ambient } from "./photo-colors.js";
import { cldUrl } from "./data.js";
import { ui } from "./ui-strings.js";
import PhotoActions from "./PhotoActions.js";
import { pushHistory } from "./local-store.js";
import { nativeWidthFor } from "./PhotoImage.js";
import { photoPath } from "./photo-ref.js";
import { accentStyle } from "./photo-meta.js";

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

/* ---- 履歴との連携 ----------------------------------------------------
   開いたら履歴に1件積み、URL をその写真のものに変える。ブラウザの「戻る」
   (スマホの戻る操作を含む) は、前のページへ飛ばずにこのビューアを閉じる。

   印 (lojLb) には、この文書を読み込むたびに変わる値を入れる。再読み込みや
   別ページから戻ってきたときに残っている古い印を、自分が積んだものと
   取り違えないため (取り違えると、閉じる操作で前のページへ戻ってしまう)。

   history.state は既存の内容に足すだけにする。Next.js のルーティング情報
   (__NA など) と、検索ページが持たせている検索語 (lojQ) を消さない。 */
const DOC = Math.random().toString(36).slice(2);
let _open = 0;
const ownEntry = () => {
  try { return window.history.state && window.history.state.lojLb === DOC; } catch { return false; }
};
if (typeof window !== "undefined" && !window.__lojLbPop) {
  window.__lojLbPop = true;
  /* 閉じたあとに「進む」で写真のURLへ来た場合。ビューアはもう無いので、
     そのURLを読み込み直して、URLどおりの画面 (写真詳細ページ、または
     撮影地ページ + ?photo=ID) を出す。URLと画面を食い違ったままにしない。 */
  window.addEventListener("popstate", (e) => {
    if (e.state && e.state.lojLb && _open === 0) window.location.reload();
  });
}

/**
 * 写真ビューア。サイト内の拡大表示はすべてこれを使う。
 *
 * Props:
 *   photos    [{ id, url, pref, loc, year }]
 *   index     current index (parent owns open/close + index state)
 *   closing   parent-driven closing flag (.closing CSS animation)
 *   lang
 *   onClose() onPrev() onNext()
 *   labels    (photo) => { prefName, locName, alt }
 *   photoHref (photo) => href | null  — 「写真ページ」へのリンク
 *   originRect 開いた元のサムネイルの矩形 (そこから広がって見せる)
 *
 * 操作:
 *   左右スワイプ = 前後の写真 (指に追従し、隣の写真が一緒に入ってくる)
 *   下スワイプ / 戻る / × / Esc = 閉じる
 *   1回タップ・クリック = 操作表示の切替 (閉じない)
 *   ダブルタップ / ダブルクリック = その位置を拡大、ピンチ = 1〜4倍、拡大中はドラッグで移動
 *   ホイール = 拡大縮小、←/→ +/-/0/1/F/H = キーボード操作
 */

const HINT_LABEL = { ja: "スワイプで前後の写真へ", zh: "滑动浏览照片", "zh-tw": "滑動瀏覽照片", ko: "스와이프로 사진 넘기기" };
const PANE_GAP = 16;          /* 隣り合う写真のすき間 (px)。globals.css の --lb-gap と揃える */
const SLIDE_MS = 260;
const SLIDE_EASE = "cubic-bezier(.2,.8,.2,1)";

export default function Lightbox({ photos, index, closing, lang, onClose, onPrev, onNext, labels, photoHref, originRect = null }) {
  const cur = photos[index];
  const len = photos.length;
  const [zoom, setZoom] = useState({ s: 1, tx: 0, ty: 0 });
  const [gesturing, setGesturing] = useState(false);
  const [showHint, setShowHint] = useState(false);
  /* 操作表示を隠す (写真だけを見る)。1回タップで切り替わる */
  const [bare, setBare] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [canFull, setCanFull] = useState(false);
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const innerRef = useRef(null);
  const imgRef = useRef(null);
  const closeBtnRef = useRef(null);
  const touchRef = useRef({});
  const tapTimerRef = useRef(null);
  const slidingRef = useRef(false);
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  /* 親から渡される関数は描画ごとに作り直されることがある。履歴の処理は
     開いたときに1回だけ登録したいので、最新のものを ref 経由で呼ぶ */
  const cb = useRef({ onClose, onPrev, onNext });
  cb.current = { onClose, onPrev, onNext };

  const zoomed = zoom.s > 1.05;
  const resetZoom = useCallback(() => setZoom({ s: 1, tx: 0, ty: 0 }), []);

  /* ---- 履歴: 開く = 1件積む / 戻る = 閉じる ---- */
  const ownsEntry = useRef(false);
  const backFallback = useRef(null);
  const urlFor = useCallback((p) => (p ? photoPath(p.id, lang) : null), [lang]);

  useEffect(() => {
    _open++;
    try {
      const url = urlFor(photos[index]) || undefined;
      const st = { ...(window.history.state || {}), lojLb: DOC };
      /* すでに自分の項目の上に居る (開発時の二重マウント) なら、積まずに使い回す */
      if (ownEntry()) window.history.replaceState(st, "", url);
      else window.history.pushState(st, "", url);
      ownsEntry.current = true;
    } catch { ownsEntry.current = false; }

    const onPop = () => {
      /* 自分の項目から外へ出た = 「戻る」が押された。前のページへは行かず閉じる */
      if (ownEntry()) return;
      clearTimeout(backFallback.current);
      if (!ownsEntry.current) return;
      ownsEntry.current = false;
      cb.current.onClose();
    };
    window.addEventListener("popstate", onPop);
    return () => {
      _open--;
      window.removeEventListener("popstate", onPop);
      clearTimeout(backFallback.current);
      /* 履歴を戻さないまま外された場合 (親が直接閉じた) の後始末。
         すぐ開き直されたときは戻さない (開発時の二重マウントで閉じてしまうため) */
      if (ownsEntry.current) {
        ownsEntry.current = false;
        setTimeout(() => { if (_open === 0 && ownEntry()) { try { window.history.back(); } catch {} } }, 0);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 写真を送ったら URL もその写真に合わせる (履歴は増やさない) */
  useEffect(() => {
    if (!ownsEntry.current || !ownEntry()) return;
    const url = urlFor(photos[index]);
    if (!url) return;
    try { window.history.replaceState(window.history.state, "", url); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  /* 画面上の操作で閉じる。履歴を1つ戻し、その popstate で実際に閉じる
     (URL も元に戻る)。戻れない環境では直接閉じる */
  const closeAsked = useRef(false);
  const requestClose = useCallback(() => {
    /* 閉じる操作は1回だけ受け付ける。× の連打や Esc の押しっぱなしで history.back() が
       2回走ると、ビューアを閉じたうえに前のページまで戻ってしまう */
    if (closeAsked.current) return;
    closeAsked.current = true;
    if (ownsEntry.current && ownEntry()) {
      clearTimeout(backFallback.current);
      backFallback.current = setTimeout(() => {
        if (!ownsEntry.current) return;
        ownsEntry.current = false;
        cb.current.onClose();
      }, 600);
      try { window.history.back(); return; } catch {}
    }
    ownsEntry.current = false;
    cb.current.onClose();
  }, []);

  /* body scroll lock (iOS-safe position:fixed + restore)。
     履歴に積んだ後に固定する (順序が逆だと、一覧のスクロール位置が 0 で記録される) */
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

  /* ---- 写真の列 (前・今・次) を動かす ---- */
  const setTrack = useCallback((x, y, animate) => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = animate ? `transform ${SLIDE_MS}ms ${SLIDE_EASE}` : "none";
    el.style.transform = x || y ? `translate3d(${x}px,${y}px,0)` : "";
    /* 下へ引くほど背景を薄くして、閉じる操作だと分かるようにする */
    if (rootRef.current) rootRef.current.style.setProperty("--lb-dim", y > 0 ? String(Math.max(0.3, 1 - y / 420)) : "1");
  }, []);

  /* 写真が替わった直後、描画の前に列を中央へ戻す。
     直前まで横に見えていた写真が同じ位置のまま中央の枠に入るので、ちらつかない */
  useLayoutEffect(() => {
    slidingRef.current = false;
    setTrack(0, 0, false);
  }, [index, setTrack]);

  const slide = useCallback((dir) => {
    if (len < 2 || slidingRef.current) return;
    const go = () => (dir > 0 ? cb.current.onNext : cb.current.onPrev)();
    if (prefersReducedMotion()) { go(); return; }
    slidingRef.current = true;
    setTrack(-dir * (window.innerWidth + PANE_GAP), 0, true);
    setTimeout(() => {
      if (!slidingRef.current) return;
      go();
      /* 親が写真を替えなかった場合の保険 (列が画面の外に残ったままにしない) */
      setTimeout(() => { if (slidingRef.current) { slidingRef.current = false; setTrack(0, 0, false); } }, 400);
    }, SLIDE_MS + 10);
  }, [len, setTrack]);

  const clampPan = useCallback((s, tx, ty) => {
    const el = imgRef.current;
    const r = el ? el.getBoundingClientRect() : { width: 800, height: 600 };
    const mx = (r.width * (s - 1)) / 2 / (zoomRef.current.s || 1) + 40;
    const my = (r.height * (s - 1)) / 2 / (zoomRef.current.s || 1) + 40;
    return { s, tx: Math.max(-mx, Math.min(mx, tx)), ty: Math.max(-my, Math.min(my, ty)) };
  }, []);

  /* 等倍表示。基準は「公開している配信画像の実寸」で、原寸データや RAW を
     出すわけではない。実寸を超えて引き伸ばしたものを高画質とは呼ばないため、
     倍率は実寸/表示幅で決める。 */
  const nativeScale = useCallback(() => {
    const el = imgRef.current;
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

  /* 全画面 (対応している環境でのみ。iPhone の Safari は画像の全画面に非対応なので
     ボタンごと出さない — 押しても何も起きないボタンを置かない) */
  const toggleFull = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) el.requestFullscreen?.().then(() => setIsFull(true)).catch(() => {});
      else document.exitFullscreen?.().then(() => setIsFull(false)).catch(() => {});
    } catch { /* 非対応環境では何もしない */ }
  }, []);
  useEffect(() => {
    setCanFull(!!(document.fullscreenEnabled && rootRef.current && rootRef.current.requestFullscreen));
    const onFs = () => setIsFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      document.removeEventListener("fullscreenchange", onFs);
      try { if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {}); } catch {}
    };
  }, []);

  /* keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
      else if (e.key === "ArrowLeft") slide(-1);
      else if (e.key === "ArrowRight") slide(1);
      /* PCでの明示的な拡大・縮小 */
      else if (e.key === "+" || e.key === "=") { e.preventDefault(); setZoom((z) => clampPan(Math.min(6, z.s * 1.4), z.tx, z.ty)); }
      else if (e.key === "-") { e.preventDefault(); setZoom((z) => (z.s / 1.4 <= 1.05 ? { s: 1, tx: 0, ty: 0 } : clampPan(z.s / 1.4, z.tx, z.ty))); }
      else if (e.key === "0") { e.preventDefault(); resetZoom(); }
      else if (e.key === "1") { e.preventDefault(); toggleNative(); }
      else if (e.key === "f" || e.key === "F") { e.preventDefault(); toggleFull(); }
      else if (e.key === "h" || e.key === "H") { e.preventDefault(); setBare((v) => !v); }
      else if (e.key === "Tab") {
        /* 開いている間、フォーカスがダイアログの外へ出ないようにする */
        const f = rootRef.current?.querySelectorAll("button:not([hidden]), a[href]");
        if (!f || !f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose, slide, clampPan, resetZoom, toggleNative, toggleFull]);

  /* index change → reset zoom */
  useEffect(() => { resetZoom(); }, [index, resetZoom]);

  /* 最近見た写真。ここで記録するのは「実際に開いて表示している1枚」だけで、
     サムネイルの表示や先読み (隣の写真・下の ±2 プリロード) では記録しない。 */
  const shownId = cur?.id;
  useEffect(() => { if (shownId) pushHistory(shownId); }, [shownId]);

  /* 開いたら閉じるボタンへフォーカスを移し、閉じたら元の位置へ戻す。
     キーボードだけで見ている人が、閉じたあとに写真一覧の同じ場所へ帰れるようにする。 */
  useEffect(() => {
    const prev = typeof document !== "undefined" ? document.activeElement : null;
    const t = setTimeout(() => closeBtnRef.current?.focus({ preventScroll: true }), 0);
    return () => {
      clearTimeout(t);
      try { if (prev && prev.focus && document.contains(prev)) prev.focus({ preventScroll: true }); } catch {}
    };
  }, []);

  /* 開いた直後だけ、サムネイルの位置から本来の位置へ広げる。
     ここで呼ばれた時点では画像が未読込で矩形が 0×0 のことがある。
     その状態で測ると動きが出ないので、読込とレイアウト確定を待つ。 */
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const go = () => requestAnimationFrame(() => animateFromRect(el, originRect));
    if (el.complete && el.naturalWidth) go();
    else el.addEventListener("load", go, { once: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* preload ±2 (隣の1枚は列の中に描いてあるので、その先の分) */
  useEffect(() => {
    if (!len) return;
    [-2, 2].forEach((d) => {
      const p = photos[((index + d) % len + len) % len];
      if (p) { const im = new Image(); im.src = p.url; }
    });
  }, [index, photos, len]);

  /* one-time swipe hint (touch devices, multi-photo) */
  useEffect(() => {
    if (len < 2) return;
    if (typeof window === "undefined" || !window.matchMedia("(hover:none)").matches) return;
    try {
      if (localStorage.getItem("lojLbHint")) return;
      localStorage.setItem("lojLbHint", "1");
    } catch { return; }
    setShowHint(true);
    const t = setTimeout(() => setShowHint(false), 2400);
    return () => clearTimeout(t);
  }, [len]);

  const toggleZoomAt = useCallback((clientX, clientY) => {
    const z = zoomRef.current;
    if (z.s > 1.05) { resetZoom(); return; }
    const el = imgRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = clientX - (r.left + r.width / 2);
    const py = clientY - (r.top + r.height / 2);
    const s = 2.4;
    setZoom(clampPan(s, px * (1 - s), py * (1 - s)));
  }, [resetZoom, clampPan]);

  /* 1回タップ = 操作表示の切替。ダブルタップ (拡大) と区別するため少し待つ。
     以前は「閉じる」だったが、写真を見ている最中に触れただけで閉じてしまうので変えた */
  const scheduleTapToggle = useCallback(() => {
    clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => setBare((v) => !v), 260);
  }, []);
  const cancelTap = useCallback(() => clearTimeout(tapTimerRef.current), []);
  useEffect(() => () => clearTimeout(tapTimerRef.current), []);

  /* ---- touch gestures ---- */
  const dist = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  /* ボタン・リンクの上で始まったタッチは、ここでは一切扱わない。
     以前は操作ボタンの touchend がここまで届いて「1回タップ」と数えられ、
     0.3秒後にビューアごと閉じていた (等倍・全画面・操作を隠す の各ボタン)。 */
  const onUi = (e) => !!(e.target && e.target.closest && e.target.closest("button,a,[data-lb-ui]"));
  const onTouchStart = (e) => {
    const T = touchRef.current;
    T.ui = onUi(e);
    if (T.ui) return;
    T.moved = 0; T.axis = null;
    if (e.touches.length === 2) {
      setGesturing(true);
      setTrack(0, 0, false);
      T.pinch = { d0: dist(e.touches), s0: zoomRef.current.s, tx0: zoomRef.current.tx, ty0: zoomRef.current.ty };
    } else if (e.touches.length === 1) {
      const t0 = e.touches[0];
      T.start = { x: t0.clientX, y: t0.clientY, tx0: zoomRef.current.tx, ty0: zoomRef.current.ty, t: Date.now() };
      if (zoomRef.current.s > 1.05) setGesturing(true);
    }
  };
  const onTouchMove = (e) => {
    const T = touchRef.current;
    if (T.ui) return;
    if (e.touches.length === 2 && T.pinch) {
      const s = Math.max(1, Math.min(4, T.pinch.s0 * (dist(e.touches) / T.pinch.d0)));
      setZoom(clampPan(s, T.pinch.tx0, T.pinch.ty0));
      T.moved = 99;
    } else if (e.touches.length === 1 && T.start) {
      const t0 = e.touches[0];
      const dx = t0.clientX - T.start.x, dy = t0.clientY - T.start.y;
      T.moved = Math.max(T.moved || 0, Math.abs(dx), Math.abs(dy));
      if (zoomRef.current.s > 1.05) {
        setZoom((z) => clampPan(z.s, T.start.tx0 + dx, T.start.ty0 + dy));
        return;
      }
      if (slidingRef.current) return;
      /* 最初に動いた向きで横 (写真送り) か縦 (閉じる) かを決め、途中で切り替えない */
      if (!T.axis && T.moved > 8) T.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (T.axis === "x") setTrack(len > 1 ? dx : dx * 0.25, 0, false);   /* 1枚しか無いときは少しだけ動いて戻る */
      else if (T.axis === "y") setTrack(0, dy > 0 ? dy : dy * 0.2, false);
    }
  };
  const onTouchEnd = (e) => {
    const T = touchRef.current;
    if (T.ui) { if (e.touches.length === 0) T.ui = false; return; }
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
    const dt = Math.max(1, Date.now() - T.start.t);
    const axis = T.axis;
    T.start = null; T.axis = null;
    if (zoomRef.current.s > 1.05) return; // panned while zoomed — no nav/close
    if (axis === "x") {
      /* 画面幅の2割ほど引くか、短くても速く払えば次の写真へ。足りなければ元に戻る */
      const far = Math.abs(dx) > Math.min(120, window.innerWidth * 0.2);
      const flick = Math.abs(dx) > 24 && Math.abs(dx) / dt > 0.45;
      if (len > 1 && (far || flick)) slide(dx < 0 ? 1 : -1);
      else setTrack(0, 0, true);
      return;
    }
    if (axis === "y") {
      if (dy > 90 || (dy > 36 && dy / dt > 0.5)) requestClose();
      else setTrack(0, 0, true);
      return;
    }
    if ((T.moved || 0) < 10) {
      /* タップ。このあとブラウザが作る click は使わない (二重に数えないため) */
      if (e.cancelable) e.preventDefault();
      const now = Date.now();
      if (now - (T.lastTap || 0) < 300) { T.lastTap = 0; cancelTap(); toggleZoomAt(c.clientX, c.clientY); }
      else { T.lastTap = now; scheduleTapToggle(); }
    }
  };

  /* ---- mouse (PC) ---- */
  const mouseRef = useRef(null);
  const lastDrag = useRef(0);
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
    const up = () => { if (mouseRef.current) { const m = mouseRef.current; mouseRef.current = null; setGesturing(false); lastDrag.current = m.moved; } };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [clampPan]);
  const onWheel = (e) => {
    if (!e.deltaY) return;
    const z = zoomRef.current;
    const s = Math.max(1, Math.min(6, z.s * (e.deltaY < 0 ? 1.18 : 1 / 1.18)));
    if (s <= 1.03) { if (z.s !== 1) resetZoom(); return; }
    setZoom(clampPan(s, z.tx, z.ty));
  };

  if (!cur) return null;
  const { prefName, locName, alt } = labels(cur);
  const href = photoHref ? photoHref(cur) : null;
  const pageLabel = ui("photoPage", lang);
  const stopTouch = (fn) => (e) => { e.stopPropagation(); e.preventDefault(); fn(); };

  /* 前・今・次 の3枚を並べる。キーは写真IDなので、送ったあとも同じ <img> が
     そのまま中央の枠に移る (読み込み直しも、ちらつきも無い)。
     2枚しか無いときは前と次が同じ写真になるので、片方に別のキーを付ける。 */
  const at = (d) => photos[((index + d) % len + len) % len];
  const panes = [{ p: cur, off: 0, k: cur.id }];
  if (len > 1) {
    const prev = at(-1), next = at(1);
    panes.unshift({ p: prev, off: -1, k: prev.id === next.id ? prev.id + "::prev" : prev.id });
    panes.push({ p: next, off: 1, k: next.id });
  }

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={[locName, prefName].filter(Boolean).join(" — ")}
      className={"cin-lb" + (closing ? " closing" : "") + (bare ? " bare" : "")}
      data-accent=""
      onContextMenu={(e) => e.preventDefault()}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
      onClick={(e) => { if (e.target === e.currentTarget && !zoomed) requestClose(); }}
      style={{ touchAction: "none", overscrollBehavior: "contain", "--amb": ambient(cur.id, 0.16) || "rgba(0,0,0,0)", ...accentStyle(cur.id) }}
    >
      <div className="cin-lb-track" ref={trackRef}>
        {panes.map(({ p, off, k }) => {
          const isCur = off === 0;
          const l = isCur ? null : labels(p);
          return (
            <div
              key={k}
              className="cin-lb-pane"
              aria-hidden={isCur ? undefined : "true"}
              style={off ? { transform: `translate3d(calc(${off} * (100% + ${PANE_GAP}px)),0,0)` } : undefined}
            >
              <div
                className={isCur ? "cin-lb-fig cin-lb-inner" : "cin-lb-fig"}
                ref={isCur ? innerRef : undefined}
                onMouseDown={isCur ? onMouseDown : undefined}
                onClick={isCur ? (e) => {
                  e.stopPropagation();
                  if (lastDrag.current > 8) { lastDrag.current = 0; return; }   /* 拡大中のドラッグの終わり */
                  if (!zoomed) scheduleTapToggle();
                } : undefined}
                onDoubleClick={isCur ? (e) => { e.stopPropagation(); cancelTap(); toggleZoomAt(e.clientX, e.clientY); } : undefined}
              >
                <img
                  ref={isCur ? imgRef : undefined}
                  /* 等倍のときは、いちばん大きい配信画像に切り替える。
                     小さい画像を引き伸ばしたものを等倍とは呼ばないため。 */
                  src={isCur && zoomed ? cldUrl(p.id, nativeWidthFor(_dims ? _dims[p.id] : null)) : p.url}
                  alt={isCur ? alt : l.alt}
                  draggable="false"
                  style={isCur ? {
                    transform: `translate3d(${zoom.tx}px, ${zoom.ty}px, 0) scale(${zoom.s})`,
                    transition: gesturing ? "none" : "transform .28s cubic-bezier(.2,.8,.2,1)",
                    cursor: zoomed ? "grab" : "zoom-in",
                  } : undefined}
                />
                <div className="cin-lb-wm">Landscapes of Japan</div>
              </div>
            </div>
          );
        })}
      </div>

      <button ref={closeBtnRef} className="cin-lb-close" hidden={bare} onClick={(e) => { e.stopPropagation(); requestClose(); }} onTouchEnd={stopTouch(requestClose)} aria-label={ui("close", lang)}>×</button>
      <div className="cin-lb-info" hidden={bare}>
        {locName && <div className="cin-lb-loc">{locName}</div>}
        <div className="cin-lb-pref">{prefName}{cur.year ? <span className="cin-lb-year">{cur.year}</span> : null}</div>
      </div>
      {len > 1 && !zoomed && !bare && (
        <button className="cin-lb-arrow left" onClick={(e) => { e.stopPropagation(); slide(-1); }} onTouchEnd={stopTouch(() => slide(-1))} aria-label={ui("previousPhoto", lang)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
      )}
      {len > 1 && !zoomed && !bare && (
        <button className="cin-lb-arrow right" onClick={(e) => { e.stopPropagation(); slide(1); }} onTouchEnd={stopTouch(() => slide(1))} aria-label={ui("nextPhoto", lang)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      )}
      {bare && (
        <button type="button" className="cin-lb-unbare" onClick={(e) => { e.stopPropagation(); setBare(false); }}
          aria-label={ui("showControls", lang)} title={ui("showControls", lang)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      )}
      <div className="cin-lb-bottom" data-lb-ui="" hidden={bare} onClick={(e) => e.stopPropagation()}>
        {len > 1 && <span className="cin-lb-count">{index + 1} / {len}</span>}
        {/* 等倍・全画面・操作表示の切替 */}
        <button type="button" className="pa-btn" onClick={(e) => { e.stopPropagation(); toggleNative(); }}
          aria-pressed={zoomed} aria-label={ui("actualSize", lang)} title={ui("actualSize", lang)}>1:1</button>
        {canFull && (
          <button type="button" className="pa-btn" onClick={(e) => { e.stopPropagation(); toggleFull(); }}
            aria-pressed={isFull} aria-label={ui("fullscreen", lang)} title={ui("fullscreen", lang)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
          </button>
        )}
        <button type="button" className="pa-btn cin-lb-hidebtn" onClick={(e) => { e.stopPropagation(); setBare(true); }}
          aria-label={ui("hideControls", lang)} title={ui("hideControls", lang)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 3l18 18M10.6 6.2A9.7 9.7 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.2 3.7M6.5 7.6A16.6 16.6 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 3.3-.6" />
          </svg>
        </button>
        {/* 対象は「いま表示している写真」。次へ移動すればこちらも切り替わる */}
        <PhotoActions photoId={cur.id} lang={lang} entry="lightbox" />
        {href && (
          <a
            className="cin-lb-pagelink"
            href={href}
            onClick={(e) => {
              e.stopPropagation();
              // P2: name the lightbox image so the cross-document view
              // transition morphs it into the photo page hero (vt-hero).
              const im = imgRef.current;
              if (im) im.style.viewTransitionName = "vt-hero";
            }}
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
