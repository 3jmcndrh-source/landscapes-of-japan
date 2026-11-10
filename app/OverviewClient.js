"use client";
/**
 * 俯瞰ビュー: 掲載している全写真を1枚のキャンバスに置き、並べ方を切り替える。
 *
 *   地図     … 撮影地の位置に集める (同じ撮影地の写真は1つのかたまりになる)
 *   季節     … 撮影月ごとに積む (どの月に何枚撮っているかが棒の高さで分かる)
 *   色から   … 色相の順に並べる (無彩色は最後)
 *   見た目から … 画像の特徴が近い写真どうしを近くに置く
 *
 * 並べ方を変えると、全写真がいまの位置から次の位置へ移動する。
 * どの写真がどこへ行ったかを目で追えることが、この画面の役目。
 *
 * データは scripts/generate-overview.mjs が作る2ファイルだけ:
 *   /overview/atlas.webp (全写真の小さなサムネイルを敷き詰めた1枚)
 *   /overview/data.json  (写真ごとの 撮影地・撮影月・色・見た目の位置)
 * どちらもこの画面を開いたときにだけ読む。他のページの初期表示には載らない。
 *
 * 操作: ホイール / ピンチ = 拡大縮小、ドラッグ = 移動、
 *       PC はクリックで写真を開く (重ねると名前が出る)、
 *       タッチは1回目のタップで選び、下に出る札を押して開く (小さな写真の押し間違いを避ける)。
 *       キーボードは ←/→ で選択を移し、Enter で開く。
 * キャンバスの中身は支援技術から読めないので、選択中の写真名を aria-live で伝え、
 * 一覧で探せる /explore へのリンクを必ず置く。
 */
import { useCallback, useEffect, useRef, useState } from "react";
import SiteHeader from "./SiteHeader.js";
import { ui } from "./ui-strings.js";
import { cldUrl, getLocName, getPrefName } from "./data.js";
import { photoById } from "./photo-ref.js";
import { usePhotoViewer } from "./usePhotoViewer.js";
import { prefersReducedMotion } from "./useViewTransition.js";
import { JAPAN_OUTLINE } from "./japan-outline.js";
import { accentStyle } from "./photo-meta.js";
import { track } from "./analytics.js";

const MODES = ["map", "season", "color", "look"];
const modeLabel = (m, lang) =>
  m === "map" ? ui("map", lang) : m === "season" ? ui("season", lang) : m === "color" ? ui("byColor", lang) : ui("byLook", lang);

const BAR_H = 60;        /* 上の切替ボタンのぶん、写真を置かない高さ */
const MOVE_MS = 760;     /* 並べ替えの移動時間 */
const WAVE_MS = 240;     /* 左から右へ少しずつ遅らせる幅 */
const MAX_ZOOM = 14;

/* ---------- 並べ方 (どれも 写真ごとの [x, y, 大きさ] を返す) ---------- */

const mercY = (lat) => (Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) * 180) / Math.PI;

/** key1 の順に列へ分け、列の中を key2 の順に並べて敷き詰める */
function layoutGrid(n, W, H, key1, key2) {
  const pad = 12;
  const w = W - pad * 2, h = H - pad * 2;
  let s = Math.floor(Math.sqrt((w * h) / n));
  while (s > 2 && Math.floor(w / s) * Math.floor(h / s) < n) s--;
  const cols = Math.max(1, Math.floor(w / s));
  const rows = Math.ceil(n / cols);
  const idx = Array.from({ length: n }, (_, i) => i).sort((a, b) => key1[a] - key1[b] || a - b);
  const used = Math.ceil(n / rows);
  const ox = (W - used * s) / 2, oy = (H - rows * s) / 2;
  const pos = new Float32Array(n * 3), order = [];
  for (let c = 0; c < used; c++) {
    const chunk = idx.slice(c * rows, (c + 1) * rows).sort((a, b) => key2[a] - key2[b] || a - b);
    chunk.forEach((i, r) => { pos[i * 3] = ox + c * s; pos[i * 3 + 1] = oy + r * s; pos[i * 3 + 2] = s; order.push(i); });
  }
  return { pos, order, labels: [], outline: null };
}

function monthName(m, lang) {
  try {
    return new Intl.DateTimeFormat(lang === "zh-tw" ? "zh-TW" : lang, { month: "short" }).format(new Date(2024, m, 15));
  } catch { return String(m + 1); }
}

/** 撮影月ごとに積む。横長の画面では12本の柱、縦長では12本の帯 */
function layoutSeason(n, W, H, month, lang) {
  const groups = Array.from({ length: 12 }, () => []);
  for (let i = 0; i < n; i++) if (month[i] >= 1 && month[i] <= 12) groups[month[i] - 1].push(i);
  const rest = [];
  for (let i = 0; i < n; i++) if (!(month[i] >= 1 && month[i] <= 12)) rest.push(i);
  if (rest.length) groups[11].push(...rest);   /* 撮影月が分からない写真 (いまは0枚) は端に寄せる */
  const pad = 12;
  const pos = new Float32Array(n * 3), order = [], labels = [];
  if (W >= H) {
    const gap = 10, labelH = 28;
    const colW = (W - pad * 2 - gap * 11) / 12, avail = H - pad * 2 - labelH;
    let s = Math.floor(Math.min(colW, 60));
    const fits = (t) => groups.every((g) => Math.ceil(g.length / Math.max(1, Math.floor(colW / t))) * t <= avail);
    while (s > 2 && !fits(s)) s--;
    const per = Math.max(1, Math.floor(colW / s));
    groups.forEach((g, m) => {
      const x0 = pad + m * (colW + gap) + (colW - per * s) / 2, base = H - pad - labelH;
      g.forEach((i, k) => { pos[i * 3] = x0 + (k % per) * s; pos[i * 3 + 1] = base - (Math.floor(k / per) + 1) * s; pos[i * 3 + 2] = s; order.push(i); });
      labels.push({ x: pad + m * (colW + gap) + colW / 2, y: H - pad - 8, text: monthName(m, lang), n: g.length, align: "center" });
    });
  } else {
    const gap = 6, labelW = 44;
    const rowH = (H - pad * 2 - gap * 11) / 12, avail = W - pad * 2 - labelW;
    let s = Math.floor(Math.min(rowH, 60));
    const fits = (t) => groups.every((g) => Math.ceil(g.length / Math.max(1, Math.floor(rowH / t))) * t <= avail);
    while (s > 2 && !fits(s)) s--;
    const per = Math.max(1, Math.floor(rowH / s));
    groups.forEach((g, m) => {
      const y0 = pad + m * (rowH + gap) + (rowH - per * s) / 2;
      g.forEach((i, k) => { pos[i * 3] = pad + labelW + Math.floor(k / per) * s; pos[i * 3 + 1] = y0 + (k % per) * s; pos[i * 3 + 2] = s; order.push(i); });
      labels.push({ x: pad, y: pad + m * (rowH + gap) + rowH / 2 + 4, text: monthName(m, lang), n: g.length, align: "left" });
    });
  }
  return { pos, order, labels, outline: null };
}

/** 撮影地の位置に集める。重なるかたまりは押し合って離す (位置は目安になる) */
function layoutMap(n, W, H, d) {
  const pad = Math.min(W, H) * 0.05 + 12;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const l of d.locs) {
    minX = Math.min(minX, l.lng); maxX = Math.max(maxX, l.lng);
    const y = mercY(l.lat); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
  }
  const sc = Math.min((W - pad * 2) / (maxX - minX || 1), (H - pad * 2) / (maxY - minY || 1));
  const ox = (W - (maxX - minX) * sc) / 2, oy = (H - (maxY - minY) * sc) / 2;
  const P = (lat, lng) => [ox + (lng - minX) * sc, oy + (maxY - mercY(lat)) * sc];

  const s = Math.max(4, Math.min(40, Math.sqrt((0.2 * W * H) / n)));
  const members = d.locs.map(() => []);
  for (let i = 0; i < n; i++) members[d.li[i]].push(i);
  const cl = d.locs.map((l, j) => {
    const [x, y] = P(l.lat, l.lng);
    return { x, y, x0: x, y0: y, m: members[j].length, r: s * Math.sqrt(members[j].length / Math.PI) * 1.12 + s * 0.45 };
  }).filter((c) => c.m > 0);
  for (let it = 0; it < 140; it++) {
    for (let a = 0; a < cl.length; a++) for (let b = a + 1; b < cl.length; b++) {
      const A = cl[a], B = cl[b];
      let dx = B.x - A.x, dy = B.y - A.y;
      let dist = Math.hypot(dx, dy);
      const need = A.r + B.r;
      if (dist >= need) continue;
      if (dist < 0.01) { dx = Math.cos(a * 2.4 + b); dy = Math.sin(a * 2.4 + b); dist = 1; }
      const push = (need - dist) * 0.5, wa = B.m / (A.m + B.m), wb = A.m / (A.m + B.m);   /* 大きいかたまりほど動かない */
      A.x -= (dx / dist) * push * wa; A.y -= (dy / dist) * push * wa;
      B.x += (dx / dist) * push * wb; B.y += (dy / dist) * push * wb;
    }
    for (const c of cl) {
      c.x += (c.x0 - c.x) * 0.03; c.y += (c.y0 - c.y) * 0.03;
      c.x = Math.max(c.r, Math.min(W - c.r, c.x)); c.y = Math.max(c.r, Math.min(H - c.r, c.y));
    }
  }
  /* かたまりの中は、中心から近い順に格子へ置く */
  const maxM = Math.max(...cl.map((c) => c.m));
  const R = Math.ceil(Math.sqrt(maxM)) + 2;
  const offs = [];
  for (let i = -R; i <= R; i++) for (let j = -R; j <= R; j++) offs.push([i, j, i * i + j * j, Math.atan2(j, i)]);
  offs.sort((p, q) => p[2] - q[2] || p[3] - q[3]);
  const pos = new Float32Array(n * 3), order = [];
  let ci = 0;
  d.locs.forEach((_, j) => {
    if (!members[j].length) return;
    const c = cl[ci++];
    members[j].forEach((i, k) => {
      pos[i * 3] = c.x + offs[k][0] * s - s / 2; pos[i * 3 + 1] = c.y + offs[k][1] * s - s / 2; pos[i * 3 + 2] = s; order.push(i);
    });
  });
  const outline = JAPAN_OUTLINE.map((ring) => ring.map(([lng, lat]) => P(lat, lng)));
  return { pos, order, labels: [], outline };
}

function layoutFor(mode, d, W, H, lang) {
  const n = d.ids.length, h = Math.max(120, H - BAR_H);
  let L;
  if (mode === "map") L = layoutMap(n, W, h, d);
  else if (mode === "season") L = layoutSeason(n, W, h, d.month, lang);
  else if (mode === "color") {
    /* 赤から始めて色相の順。無彩色は最後にまとめる。列の中は明るい順 */
    const k1 = d.hue.map((v) => (v < 0 ? 1000 : (v + 30) % 360));
    const k2 = d.light.map((v) => -v);
    L = layoutGrid(n, W, h, k1, k2);
  } else L = layoutGrid(n, W, h, d.ex, d.ey);
  for (let i = 0; i < n; i++) L.pos[i * 3 + 1] += BAR_H;
  for (const lb of L.labels) lb.y += BAR_H;
  if (L.outline) for (const ring of L.outline) for (const p of ring) p[1] += BAR_H;
  return L;
}

/* ---------- 画面 ---------- */

export default function OverviewClient({ lang }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const E = useRef({ k: 1, tx: 0, ty: 0, hover: -1, sel: -1, hi: new Map(), loading: 0, anim: 0, raf: 0 });
  const [mode, setMode] = useState("map");
  const [state, setState] = useState("loading");     // loading | ready | failed
  const [hover, setHover] = useState(null);          // { i, left, top }  (PC)
  const [sel, setSel] = useState(-1);                // 選択中の写真 (タッチ・キーボード)
  const [zoomed, setZoomed] = useState(false);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const viewer = usePhotoViewer(lang, { entry: "overview" });
  const viewerRef = useRef(viewer);
  viewerRef.current = viewer;

  /* ---- 描画 ---- */
  const draw = useCallback(() => {
    const e = E.current, cv = canvasRef.current;
    if (!cv || !e.d || !e.cur) return;
    const ctx = cv.getContext("2d");
    const { dpr, k, tx, ty, d } = e;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.setTransform(dpr * k, 0, 0, dpr * k, dpr * tx, dpr * ty);
    ctx.imageSmoothingQuality = "high";
    /* 地図のときだけ、島の輪郭を薄く下に敷く */
    if (e.outline && e.outlineAlpha > 0.01) {
      ctx.strokeStyle = `rgba(232,228,223,${0.16 * e.outlineAlpha})`;
      ctx.lineWidth = 1 / k;
      for (const ring of e.outline) {
        ctx.beginPath();
        ring.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.stroke();
      }
    }
    const n = d.ids.length, cell = d.cell, cols = d.cols, cur = e.cur;
    for (let i = 0; i < n; i++) {
      const x = cur[i * 3], y = cur[i * 3 + 1], s = cur[i * 3 + 2];
      const g = Math.min(1, s * 0.07);
      const hi = e.hi.get(i);
      if (hi && hi.ok) {
        /* 拡大したときは w300 の画像に差し替える。中央を正方形に切って同じ枠に入れる */
        const iw = hi.img.naturalWidth, ih = hi.img.naturalHeight, m = Math.min(iw, ih);
        ctx.drawImage(hi.img, (iw - m) / 2, (ih - m) / 2, m, m, x + g / 2, y + g / 2, s - g, s - g);
      } else {
        ctx.drawImage(e.atlas, (i % cols) * cell, Math.floor(i / cols) * cell, cell, cell, x + g / 2, y + g / 2, s - g, s - g);
      }
    }
    const mark = e.hover >= 0 ? e.hover : e.sel;
    if (mark >= 0) {
      ctx.strokeStyle = e.accent || "#fff";
      ctx.lineWidth = 2 / k;
      ctx.strokeRect(cur[mark * 3], cur[mark * 3 + 1], cur[mark * 3 + 2], cur[mark * 3 + 2]);
    }
    if (e.labels && e.labelAlpha > 0.01) {
      ctx.fillStyle = `rgba(232,228,223,${0.78 * e.labelAlpha})`;
      ctx.font = `12px ${e.font || "sans-serif"}`;
      for (const lb of e.labels) {
        ctx.textAlign = lb.align;
        ctx.fillText(lb.text, lb.x, lb.y);
      }
    }
  }, []);

  const schedule = useCallback(() => {
    const e = E.current;
    if (e.raf) return;
    e.raf = requestAnimationFrame(() => { e.raf = 0; draw(); });
  }, [draw]);

  /* 拡大して写真が大きく見えているときだけ、見えている分の w300 を読む */
  const loadHiRes = useCallback(() => {
    const e = E.current;
    if (!e.d || !e.cur || e.anim) return;
    const n = e.d.ids.length;
    for (let i = 0; i < n && e.loading < 6; i++) {
      const s = e.cur[i * 3 + 2] * e.k;
      if (s * e.dpr < 84) continue;
      const x = e.tx + e.cur[i * 3] * e.k, y = e.ty + e.cur[i * 3 + 1] * e.k;
      if (x + s < 0 || y + s < 0 || x > e.W || y > e.H) continue;
      if (e.hi.has(i)) continue;
      if (e.hi.size > 260) break;           /* 読みすぎない。足りなければ粗いまま */
      const img = new Image();
      const rec = { img, ok: false };
      e.hi.set(i, rec);
      e.loading++;
      img.onload = () => { rec.ok = true; e.loading--; schedule(); loadHiRes(); };
      img.onerror = () => { e.loading--; };
      img.src = cldUrl(e.d.ids[i], 300);
    }
  }, [schedule]);

  const clampView = useCallback(() => {
    const e = E.current;
    e.k = Math.max(1, Math.min(MAX_ZOOM, e.k));
    if (e.k <= 1.001) { e.k = 1; e.tx = 0; e.ty = 0; }
    else {
      e.tx = Math.min(0, Math.max(e.W - e.W * e.k, e.tx));
      e.ty = Math.min(0, Math.max(e.H - e.H * e.k, e.ty));
    }
    setZoomed(e.k > 1.001);
  }, []);

  /* ---- 並べ方を当てる (animate = いまの位置から移動させる) ---- */
  const apply = useCallback((m, animate) => {
    const e = E.current;
    if (!e.d || !e.W) return;
    const L = layoutFor(m, e.d, e.W, e.H, lang);
    e.order = L.order;
    e.labels = L.labels;
    const n = e.d.ids.length;
    cancelAnimationFrame(e.anim); e.anim = 0;
    if (!e.cur) e.cur = new Float32Array(L.pos);
    if (!animate || prefersReducedMotion()) {
      e.cur.set(L.pos);
      e.outline = L.outline; e.outlineAlpha = 1; e.labelAlpha = 1;
      schedule(); loadHiRes();
      return;
    }
    const from = new Float32Array(e.cur), to = L.pos;
    const hadOutline = !!e.outline;
    if (L.outline) e.outline = L.outline;
    const t0 = performance.now();
    const step = (now) => {
      const t = now - t0;
      let busy = false;
      for (let i = 0; i < n; i++) {
        /* 行き先が左の写真から順に動き出す (全部が同時に動くと、追えない) */
        const delay = Math.max(0, Math.min(1, to[i * 3] / e.W)) * WAVE_MS;
        let p = (t - delay) / MOVE_MS;
        p = p < 0 ? 0 : p > 1 ? 1 : p;
        if (p < 1) busy = true;
        const q = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        for (let c = 0; c < 3; c++) e.cur[i * 3 + c] = from[i * 3 + c] + (to[i * 3 + c] - from[i * 3 + c]) * q;
      }
      const g = Math.min(1, t / (MOVE_MS + WAVE_MS));
      e.outlineAlpha = L.outline ? (hadOutline ? 1 : g) : (hadOutline ? 1 - g : 0);
      e.labelAlpha = g;
      draw();
      if (busy) e.anim = requestAnimationFrame(step);
      else { e.anim = 0; e.outline = L.outline; e.outlineAlpha = L.outline ? 1 : 0; e.labelAlpha = 1; draw(); loadHiRes(); }
    };
    e.anim = requestAnimationFrame(step);
  }, [lang, draw, schedule, loadHiRes]);

  /* ---- 読み込み ---- */
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const d = await fetch("/overview/data.json").then((r) => { if (!r.ok) throw new Error("data"); return r.json(); });
        const atlas = new Image();
        await new Promise((ok, ng) => { atlas.onload = ok; atlas.onerror = ng; atlas.src = `/overview/atlas.webp?v=${encodeURIComponent(d.v)}`; });
        if (!alive) return;
        const e = E.current;
        e.d = d; e.atlas = atlas;
        /* URL の ?by= で並べ方を引き継ぐ (共有・再読み込み・言語切替で同じ並びに戻る) */
        let m0 = "map";
        try { const by = new URLSearchParams(window.location.search).get("by"); if (MODES.includes(by)) m0 = by; } catch {}
        setMode(m0); modeRef.current = m0;
        setState("ready");
      } catch { if (alive) setState("failed"); }
    })();
    return () => { alive = false; };
  }, []);

  /* ---- 大きさ合わせ ---- */
  useEffect(() => {
    if (state !== "ready") return;
    const wrap = wrapRef.current, cv = canvasRef.current;
    const e = E.current;
    const fit = () => {
      const r = wrap.getBoundingClientRect();
      if (!r.width || !r.height) return;
      e.dpr = Math.min(2.5, window.devicePixelRatio || 1);
      e.W = r.width; e.H = r.height;
      cv.width = Math.round(r.width * e.dpr); cv.height = Math.round(r.height * e.dpr);
      const cs = getComputedStyle(wrap);
      e.accent = cs.getPropertyValue("--accent-hi").trim() || "#fff";
      e.font = cs.fontFamily;
      e.k = 1; e.tx = 0; e.ty = 0; setZoomed(false);
      apply(modeRef.current, false);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => { ro.disconnect(); cancelAnimationFrame(e.anim); cancelAnimationFrame(e.raf); e.anim = 0; e.raf = 0; };
  }, [state, apply]);

  const pick = useCallback((m) => {
    if (m === modeRef.current) return;
    setMode(m); modeRef.current = m;
    setHover(null); E.current.hover = -1;
    const e = E.current;
    e.k = 1; e.tx = 0; e.ty = 0; setZoomed(false);
    apply(m, true);
    try {
      const u = new URL(window.location.href);
      if (m === "map") u.searchParams.delete("by"); else u.searchParams.set("by", m);
      window.history.replaceState(window.history.state, "", u.pathname + u.search);
    } catch {}
    track("overview_mode", { mode: m }, "overview:" + m);
  }, [apply]);

  /* ---- 指・マウス ---- */
  const hit = useCallback((px, py) => {
    const e = E.current;
    if (!e.cur) return -1;
    const wx = (px - e.tx) / e.k, wy = (py - e.ty) / e.k;
    for (let i = e.d.ids.length - 1; i >= 0; i--) {
      const x = e.cur[i * 3], y = e.cur[i * 3 + 1], s = e.cur[i * 3 + 2];
      if (wx >= x && wx < x + s && wy >= y && wy < y + s) return i;
    }
    return -1;
  }, []);

  const openAt = useCallback((i) => {
    const e = E.current;
    if (i < 0 || !e.order) return;
    const ids = e.order.map((j) => e.d.ids[j]);
    viewerRef.current.open(ids, e.d.ids[i], null);
  }, []);

  useEffect(() => {
    if (state !== "ready") return;
    const cv = canvasRef.current, e = E.current;
    const pts = new Map();
    let drag = null, pinch = null;
    const local = (ev) => { const r = cv.getBoundingClientRect(); return [ev.clientX - r.left, ev.clientY - r.top]; };
    const showHover = (i) => {
      if (i === e.hover) return;
      e.hover = i;
      if (i < 0) { setHover(null); schedule(); return; }
      const s = e.cur[i * 3 + 2] * e.k, x = e.tx + e.cur[i * 3] * e.k, y = e.ty + e.cur[i * 3 + 1] * e.k;
      const cw = 220, chh = 190;
      const left = x + s + 12 + cw > e.W ? Math.max(8, x - cw - 12) : x + s + 12;
      const top = Math.max(BAR_H, Math.min(e.H - chh - 8, y + s / 2 - chh / 2));
      setHover({ i, left, top });
      schedule();
    };
    const down = (ev) => {
      try { cv.setPointerCapture?.(ev.pointerId); } catch { /* 掴めなくても操作は続けられる */ }
      const [x, y] = local(ev);
      pts.set(ev.pointerId, { x, y });
      if (pts.size === 1) { drag = { x, y, tx: e.tx, ty: e.ty, moved: 0 }; pinch = null; }
      else if (pts.size === 2) {
        const [a, b] = [...pts.values()];
        pinch = { d0: Math.hypot(a.x - b.x, a.y - b.y) || 1, k0: e.k, wx: ((a.x + b.x) / 2 - e.tx) / e.k, wy: ((a.y + b.y) / 2 - e.ty) / e.k };
        drag = null;
      }
    };
    const move = (ev) => {
      const [x, y] = local(ev);
      if (pts.has(ev.pointerId)) pts.set(ev.pointerId, { x, y });
      if (pinch && pts.size >= 2) {
        const [a, b] = [...pts.values()];
        e.k = pinch.k0 * (Math.hypot(a.x - b.x, a.y - b.y) / pinch.d0);
        e.k = Math.max(1, Math.min(MAX_ZOOM, e.k));
        e.tx = (a.x + b.x) / 2 - pinch.wx * e.k; e.ty = (a.y + b.y) / 2 - pinch.wy * e.k;
        clampView(); showHover(-1); schedule();
        return;
      }
      if (drag) {
        const dx = x - drag.x, dy = y - drag.y;
        drag.moved = Math.max(drag.moved, Math.abs(dx), Math.abs(dy));
        if (drag.moved > 5 && e.k > 1) { e.tx = drag.tx + dx; e.ty = drag.ty + dy; clampView(); showHover(-1); schedule(); }
        return;
      }
      if (ev.pointerType === "mouse" && !e.anim) showHover(hit(x, y));
    };
    const up = (ev) => {
      const [x, y] = local(ev);
      const was = drag;
      pts.delete(ev.pointerId);
      if (pts.size < 2) pinch = null;
      if (pts.size === 0) drag = null;
      if (was && was.moved <= 5 && !e.anim) {
        const i = hit(x, y);
        if (ev.pointerType === "mouse") { if (i >= 0) openAt(i); }
        else { e.sel = i; setSel(i); schedule(); }     /* タッチ: まず選ぶ。開くのは下の札から */
      }
      loadHiRes();
    };
    const leave = () => { if (!pts.size) showHover(-1); };
    const wheel = (ev) => {
      ev.preventDefault();
      const [x, y] = local(ev);
      const k1 = Math.max(1, Math.min(MAX_ZOOM, e.k * Math.exp(-ev.deltaY * 0.0016)));
      e.tx = x - ((x - e.tx) * k1) / e.k; e.ty = y - ((y - e.ty) * k1) / e.k; e.k = k1;
      clampView(); showHover(-1); schedule(); loadHiRes();
    };
    const key = (ev) => {
      if (!e.order || e.anim) return;
      if (ev.key === "ArrowRight" || ev.key === "ArrowLeft") {
        ev.preventDefault();
        const at = e.sel >= 0 ? e.order.indexOf(e.sel) : -1;
        const nx = (at + (ev.key === "ArrowRight" ? 1 : -1) + e.order.length) % e.order.length;
        e.sel = e.order[nx]; setSel(e.sel); schedule();
      } else if ((ev.key === "Enter" || ev.key === " ") && e.sel >= 0) { ev.preventDefault(); openAt(e.sel); }
      else if (ev.key === "Escape") { e.sel = -1; setSel(-1); schedule(); }
    };
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", up);
    cv.addEventListener("pointerleave", leave);
    cv.addEventListener("wheel", wheel, { passive: false });
    cv.addEventListener("keydown", key);
    return () => {
      cv.removeEventListener("pointerdown", down);
      cv.removeEventListener("pointermove", move);
      cv.removeEventListener("pointerup", up);
      cv.removeEventListener("pointercancel", up);
      cv.removeEventListener("pointerleave", leave);
      cv.removeEventListener("wheel", wheel);
      cv.removeEventListener("keydown", key);
    };
  }, [state, hit, openAt, schedule, clampView, loadHiRes]);

  const resetZoom = useCallback(() => {
    const e = E.current;
    e.k = 1; e.tx = 0; e.ty = 0; setZoomed(false); schedule();
  }, [schedule]);

  const info = (i) => {
    const d = E.current.d;
    if (!d || i < 0) return null;
    const p = photoById(d.ids[i]);
    if (!p) return null;
    return { id: p.id, loc: p.loc ? getLocName(p.loc, lang) : "", pref: getPrefName(p.pref, lang), year: p.year || "" };
  };
  const hv = hover ? info(hover.i) : null;
  const sl = info(sel);
  const total = E.current.d ? E.current.d.ids.length : 0;

  return (
    <div className="page-root ov-page" data-accent="" style={sl ? accentStyle(sl.id) : hv ? accentStyle(hv.id) : undefined}>
      <SiteHeader lang={lang} langHrefFor={(c) => `/${c}/overview${mode === "map" ? "" : `?by=${mode}`}`} />
      <main className="ov-main" ref={wrapRef}>
        <h1 className="sr-only">{ui("overview", lang)}</h1>
        <div className="ov-bar" role="tablist" aria-label={ui("overview", lang)}>
          {MODES.map((m) => (
            <button key={m} type="button" role="tab" aria-selected={mode === m} className={"ov-tab" + (mode === m ? " on" : "")}
              disabled={state !== "ready"} onClick={() => pick(m)}>
              {modeLabel(m, lang)}
            </button>
          ))}
          {state === "ready" && <span className="ov-n" aria-hidden="true">{total}</span>}
        </div>

        {state === "ready" && (
          <canvas
            ref={canvasRef}
            className="ov-canvas"
            tabIndex={0}
            role="img"
            aria-label={`${ui("overview", lang)} — ${modeLabel(mode, lang)} (${total})`}
            onContextMenu={(e) => e.preventDefault()}
          />
        )}
        {state === "loading" && <p className="ov-msg" role="status">{ui("loading", lang)}</p>}
        {/* 読めなかったときも行き止まりにしない。同じ写真を一覧で探せる画面へ送る */}
        {state === "failed" && (
          <p className="ov-msg" role="status">
            <a className="more-link" href={`/${lang}/explore`}>{ui("explorePhotos", lang)} →</a>
          </p>
        )}

        {zoomed && (
          <button type="button" className="ov-reset pa-btn" onClick={resetZoom} aria-label="1:1" title="1:1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" /></svg>
          </button>
        )}

        {/* PC: 重ねた写真の名前と少し大きい画像 */}
        {hover && hv && (
          <div className="ov-card" style={{ left: hover.left, top: hover.top }} aria-hidden="true">
            <img src={cldUrl(hv.id, 300)} alt="" draggable="false" />
            <div className="ov-card-t">{hv.loc || hv.pref}<span>{hv.loc ? hv.pref : ""}{hv.year ? ` ${hv.year}` : ""}</span></div>
          </div>
        )}

        {/* タッチ・キーボード: 選んだ写真。ここを押すと開く */}
        {sl && (
          <div className="ov-sel">
            <button type="button" className="ov-sel-open" onClick={() => openAt(sel)}>
              <img src={cldUrl(sl.id, 300)} alt="" draggable="false" />
              <span className="ov-card-t">{sl.loc || sl.pref}<span>{sl.loc ? sl.pref : ""}{sl.year ? ` ${sl.year}` : ""}</span></span>
              <span className="ov-sel-go" aria-hidden="true">→</span>
            </button>
            <button type="button" className="pa-btn" aria-label={ui("close", lang)} onClick={() => { E.current.sel = -1; setSel(-1); schedule(); }}>×</button>
          </div>
        )}
        <p className="sr-only" role="status" aria-live="polite">{sl ? `${sl.loc} ${sl.pref}` : ""}</p>
        <a className="sr-only" href={`/${lang}/explore`}>{ui("explorePhotos", lang)}</a>
      </main>
      {viewer.element}
    </div>
  );
}
