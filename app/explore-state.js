"use client";
/**
 * ① 絞り込み条件の URL 表現と履歴の扱い。
 *
 * 方針:
 *   - 選択式の条件 (地域・テーマ・季節・色・縦横・地図範囲・並び順) は URL に持つ。
 *     共有・再読み込み・戻る/進む・言語切替で同じ結果に戻せるようにするため。
 *   - 自由入力の検索語は URL に入れない (Clarity が URL をそのまま記録するため。
 *     検索語は SearchClient が history.state で持つ)。
 *   - Next.js が history.state に持っているルーティング情報は壊さない。
 *     既存の検索状態 (lojQ) も消さない。常に「足すだけ」にする。
 *   - 入力中・地図ドラッグ中に履歴を増やさない。意味のある操作でだけ push する。
 */

/* URL のキー。短くしすぎると読めなくなるので、意味が分かる長さにする */
const KEYS = {
  pref: "pref", loc: "loc", theme: "theme", season: "season",
  month: "month", color: "color", orientation: "o", sort: "sort",
  /* ⑦ URL に載るのは概念キーだけ。利用者が書いた文そのものは載せない。
     concept    = どれか1つでも当てはまれば可 (絞り込みボタンの複数選択)。
                  以前の共有URLもこの形なので、意味を変えない。
     conceptAll = 入力文から取り出した複合条件。全部に当てはまるもの。
                  「霧のかかった山」と「霧または山」を区別するために分けている。 */
  concept: "concept",
  conceptAll: "conceptAll",
};

const list = (v) => (Array.isArray(v) ? v : v ? [v] : []).filter(Boolean);

/** 条件 → URLSearchParams (既存の他のパラメータは残す) */
export function writeQueryToParams(q, base) {
  const p = new URLSearchParams(base || "");
  for (const k of Object.values(KEYS)) p.delete(k);
  p.delete("bbox");
  for (const [field, key] of Object.entries(KEYS)) {
    if (field === "sort") continue;
    const v = list(q[field]);
    if (v.length) p.set(key, v.join(","));
  }
  if (q.sort && q.sort !== "region") p.set(KEYS.sort, q.sort);
  if (Array.isArray(q.bbox) && q.bbox.length === 4) {
    /* 地図の範囲は小数4桁で十分 (約10m)。URLを無駄に長くしない */
    p.set("bbox", q.bbox.map((n) => Number(n).toFixed(4)).join(","));
  }
  return p;
}

/** URLSearchParams → 条件 */
export function readQueryFromParams(search) {
  const p = new URLSearchParams(search || "");
  const arr = (key) => {
    const v = p.get(key);
    return v ? v.split(",").map((s) => s.trim()).filter(Boolean) : [];
  };
  const bboxRaw = p.get("bbox");
  const bbox = bboxRaw ? bboxRaw.split(",").map(Number) : null;
  return {
    pref: arr(KEYS.pref),
    loc: arr(KEYS.loc),
    theme: arr(KEYS.theme),
    season: arr(KEYS.season),
    month: arr(KEYS.month).map(Number).filter((n) => n >= 1 && n <= 12),
    color: arr(KEYS.color),
    orientation: arr(KEYS.orientation),
    concept: arr(KEYS.concept),
    conceptAll: arr(KEYS.conceptAll),
    bbox: bbox && bbox.length === 4 && bbox.every((n) => Number.isFinite(n)) ? bbox : null,
    /* 並びは「利用者が明示的に選んだときだけ」値を入れる。
       ここで既定値 region を埋めると、画像特徴で並べたい場面でも
       地域順が優先され、入力に合う写真が下へ埋もれる (実機で確認した不具合)。 */
    sort: p.get(KEYS.sort) || "",
  };
}

/** いまの URL の条件部分だけを文字列にする (変化の検出用) */
export const queryToString = (q) => writeQueryToParams(q, "").toString();

/**
 * URL を条件に合わせて書き換える。
 * @param mode "push" = 履歴に積む (条件を選んだ・外した)
 *             "replace" = 積まない (地図のドラッグ中など連続する操作)
 * history.state は既存の内容を保ったまま返す。
 */
export function applyQueryToUrl(q, mode = "push") {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const next = writeQueryToParams(q, url.search);
    const qs = next.toString();
    const target = url.pathname + (qs ? `?${qs}` : "") + url.hash;
    if (target === url.pathname + url.search + url.hash) return;   /* 変化なし */
    const state = window.history.state || {};
    if (mode === "push") window.history.pushState(state, "", target);
    else window.history.replaceState(state, "", target);
  } catch { /* 履歴が使えない環境でも絞り込み自体は動く */ }
}

/**
 * 言語を切り替えても条件を引き継ぐためのリンク先。
 * 写真詳細の有無に関わらず、探索画面は全言語に存在する。
 */
export function exploreHref(lang, q) {
  const qs = queryToString(q);
  return `/${lang}/explore${qs ? `?${qs}` : ""}`;
}

/**
 * 連続する操作をまとめるための遅延書き込み。
 * 保存前に画面を離れても最後の状態を失わないよう、flush() を用意する。
 */
export function makeUrlWriter(delay = 350) {
  let timer = null;
  let pending = null;
  const flush = () => {
    if (timer) { clearTimeout(timer); timer = null; }
    if (pending) { applyQueryToUrl(pending.q, pending.mode); pending = null; }
  };
  const write = (q, mode = "push") => {
    pending = { q, mode };
    if (timer) clearTimeout(timer);
    timer = setTimeout(flush, delay);
  };
  /* 画面を離れるときに取りこぼさない */
  if (typeof window !== "undefined") {
    window.addEventListener("pagehide", flush);
    window.addEventListener("beforeunload", flush);
  }
  return { write, flush, immediate: (q, mode = "push") => { pending = null; if (timer) clearTimeout(timer); applyQueryToUrl(q, mode); } };
}
