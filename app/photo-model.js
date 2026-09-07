/**
 * ⑧ 写真の共通モデルと、条件の解釈・絞り込み・並び替え。
 *
 * 地域・テーマ・色・季節・地図・画像検索で別々の一覧や判定を作らないための土台。
 * ①統合探索 ②地図 ⑤ギャラリー ⑦画像検索 はすべてここを通す。
 *
 * 初期JSを増やさないための方針:
 *   このファイルが静的に読み込むのは data.js / slugs.js / i18n-meta.js だけ
 *   (どの画面でも既に読み込んでいるもの)。
 *   撮影日・撮影月・タグ・寸法・色パレット・追加日は「ファセット」として
 *   loadFacets() で動的に読み込み、必要な画面だけが取得する。
 *   → 撮影地ページや写真詳細ページの初期JSは増えない。
 */
import { PREFECTURES, getLocName, getPrefName } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { PHOTO_LANGS, SITE_URL } from "./i18n-meta.js";

/* ------------------------------------------------------------------ *
 * 1. 基本レコード (data.js だけから作れる範囲)
 * ------------------------------------------------------------------ */

let _all = null;
/** 掲載中の全写真。id / loc / pref / year と、slug を持つ */
export function allPhotos() {
  if (_all) return _all;
  _all = [];
  for (const pf of PREFECTURES) {
    const prefSlug = PREF_SLUGS[pf.pref] || null;
    for (const p of pf.photos) {
      _all.push({
        id: p.id,
        loc: p.loc || null,
        pref: pf.pref,
        year: p.year || null,
        prefSlug,
        locSlug: p.loc ? LOC_SLUGS[p.loc] || null : null,
      });
    }
  }
  return _all;
}

let _byId = null;
export function photoById(id) {
  if (!_byId) _byId = new Map(allPhotos().map((p) => [p.id, p]));
  return _byId.get(id) || null;
}

export const hasPhotoPages = (lang) => PHOTO_LANGS.includes(lang);

/**
 * その言語でその写真を開けるパス。写真詳細が無い言語では
 * 撮影地ページ + ?photo=ID (存在しないURLを作らない)。
 * この規則は共有・お気に入り・関連・問い合わせ・アルバムで共通。
 */
export function photoPath(id, lang) {
  const p = photoById(id);
  if (!p || !p.prefSlug || !p.locSlug) return null;
  const base = `/${lang}/${p.prefSlug}/${p.locSlug}`;
  return hasPhotoPages(lang) ? `${base}/${p.id}` : `${base}?photo=${encodeURIComponent(p.id)}`;
}
export function photoUrl(id, lang) {
  const path = photoPath(id, lang);
  return path ? SITE_URL + path : null;
}
/** 表示用の短いラベル (地名のみ。説明文は足さない) */
export function photoLabel(id, lang) {
  const p = photoById(id);
  if (!p) return "";
  const loc = p.loc ? getLocName(p.loc, lang) : "";
  const pref = getPrefName(p.pref, lang);
  return loc ? `${loc} — ${pref}` : pref;
}

/* ------------------------------------------------------------------ *
 * 2. ファセット (重いデータ。使う画面だけが読み込む)
 * ------------------------------------------------------------------ */

let _facets = null;
let _facetsPromise = null;

/**
 * 絞り込みに使う付随データをまとめて読み込む。
 * 一度読んだら使い回す。読み込めなかったものは null のままにし、
 * その条件だけ使えなくする (画面全体は落とさない)。
 */
export async function loadFacets() {
  if (_facets) return _facets;
  if (_facetsPromise) return _facetsPromise;
  _facetsPromise = (async () => {
    const safe = async (fn) => { try { return await fn(); } catch { return null; } };
    const [dates, months, tags, dims, palette, added] = await Promise.all([
      safe(() => import("./photo-dates.js").then((m) => m.PHOTO_DATES)),
      safe(() => import("./photo-months.js").then((m) => m.PHOTO_MONTHS)),
      safe(() => import("./photo-tags.js").then((m) => m.PHOTO_TAGS)),
      safe(() => import("./photo-dims.js")),
      safe(() => import("./photo-palette.js").then((m) => m.PHOTO_PALETTE)),
      safe(() => import("./photo-added.js").then((m) => m.PHOTO_ADDED)),
    ]);
    _facets = { dates, months, tags, dims, palette, added, concepts: null };
    return _facets;
  })();
  return _facetsPromise;
}
/** 読み込み済みのファセット (未読なら空). サーバー側から注入する場合にも使う */
export const getFacets = () => _facets || { dates: null, months: null, tags: null, dims: null, palette: null, added: null, concepts: null };

/**
 * ⑦ 画像特徴のデータ (169KB) は「見た目から探す」を使うときだけ読み込む。
 * 初期表示では読まない。読み込めなければ null のままにし、
 * 呼び出し側が「使えない」と「0件」を区別できるようにする。
 */
let _conceptPromise = null;
export async function loadConcepts() {
  const f = await loadFacets();
  if (f.concepts) return f.concepts;
  if (!_conceptPromise) {
    _conceptPromise = import("./photo-concepts.js")
      .then((m) => ({ scores: m.PHOTO_CONCEPTS, keys: m.CONCEPT_KEYS, threshold: m.CONCEPT_THRESHOLD, model: m.CONCEPT_MODEL }))
      .catch(() => null);
  }
  const c = await _conceptPromise;
  if (c) f.concepts = c;
  return c;
}
export const setFacets = (f) => { _facets = f; };

/* ------------------------------------------------------------------ *
 * 3. 条件の解釈 (画面によって判定を変えない)
 *
 *   条件は { pref, loc, theme, season, month, color, orientation, bbox, ids }
 *   種類が違う条件どうしは AND。
 *   同じ種類で複数選んだ場合は OR (例: 春 か 秋)。
 *   空配列・未指定はその種類の条件なしとして扱う。
 * ------------------------------------------------------------------ */

/** 月 → 季節。既存の判定 (12,1,2=冬 / 3-5=春 / 6-8=夏 / 9-11=秋) をそのまま使う */
export const seasonOfMonth = (m) =>
  !m ? null : m <= 2 || m === 12 ? "winter" : m <= 5 ? "spring" : m <= 8 ? "summer" : "autumn";

/** 色の判定は既存の色検索と同じ閾値 (占有率 8% 以上) */
export const COLOR_MIN_SHARE = 0.08;

const asArray = (v) => (v == null ? [] : Array.isArray(v) ? v.filter((x) => x != null && x !== "") : [v]);

/** 条件を正規化する。画面から来る値のゆれをここで吸収する */
export function normalizeQuery(q = {}) {
  return {
    pref: asArray(q.pref),
    loc: asArray(q.loc),
    theme: asArray(q.theme),
    season: asArray(q.season),
    month: asArray(q.month).map(Number).filter((n) => n >= 1 && n <= 12),
    color: asArray(q.color),
    orientation: asArray(q.orientation),
    bbox: Array.isArray(q.bbox) && q.bbox.length === 4 ? q.bbox.map(Number) : null,
    ids: asArray(q.ids),
    concept: asArray(q.concept),
    sort: q.sort || "region",
  };
}

export const isEmptyQuery = (q) => {
  const n = normalizeQuery(q);
  return !n.pref.length && !n.loc.length && !n.theme.length && !n.season.length &&
         !n.month.length && !n.color.length && !n.orientation.length && !n.bbox &&
         !n.ids.length && !n.concept.length;
};

/** 条件の個数 (画面に「選択中の条件」を出すため) */
export function activeConditions(q, ctx = {}) {
  const n = normalizeQuery(q);
  const out = [];
  for (const v of n.pref) out.push({ type: "pref", value: v });
  for (const v of n.loc) out.push({ type: "loc", value: v });
  for (const v of n.theme) out.push({ type: "theme", value: v });
  for (const v of n.season) out.push({ type: "season", value: v });
  for (const v of n.month) out.push({ type: "month", value: v });
  for (const v of n.color) out.push({ type: "color", value: v });
  for (const v of n.orientation) out.push({ type: "orientation", value: v });
  for (const v of n.concept) out.push({ type: "concept", value: v });
  if (n.bbox) out.push({ type: "bbox", value: "map" });
  if (n.ids.length) out.push({ type: "ids", value: `${n.ids.length}` });
  return out;
}

/**
 * 1枚がすべての条件を満たすか。
 * facets が無い種類の条件は「判定できない」ので、その条件は無視せず
 * 「満たさない」と扱う (勝手に通さない)。ただし条件が指定されていなければ素通し。
 */
function matches(p, n, f, themeTags, locPoints, opts_themeLocs) {
  if (n.ids.length && !n.ids.includes(p.id)) return false;
  if (n.pref.length && !n.pref.includes(p.pref)) return false;
  if (n.loc.length && !n.loc.includes(p.loc)) return false;

  if (n.theme.length) {
    if (!f.tags || !themeTags) return false;
    /* テーマ = コレクション。既存の getCollectionPhotos と同じ規則にそろえる:
       タグが付いている写真はタグで判定し、タグが無い写真は撮影地で判定する
       (画面によって振り分けが変わらないよう、判定はここ1か所) */
    const t = f.tags[p.id];
    const ok = n.theme.some((slug) => {
      if (t) return (themeTags[slug] || []).some((tag) => t.includes(tag));
      const locs = (opts_themeLocs && opts_themeLocs[slug]) || null;
      return !!(locs && p.loc && locs.includes(p.loc));
    });
    if (!ok) return false;
  }

  if (n.season.length || n.month.length) {
    if (!f.months) return false;
    const m = f.months[p.id];
    if (!m) return false;
    if (n.month.length && !n.month.includes(m)) return false;
    if (n.season.length && !n.season.includes(seasonOfMonth(m))) return false;
  }

  if (n.color.length) {
    if (!f.palette) return false;
    const b = f.palette[p.id]?.b;
    if (!b) return false;
    if (!n.color.some((c) => (b[c] || 0) >= COLOR_MIN_SHARE)) return false;
  }

  if (n.orientation.length) {
    if (!f.dims) return false;
    const o = f.dims.orientationOf(p.id);
    if (!o || !n.orientation.includes(o)) return false;
  }

  if (n.concept.length) {
    /* ⑦ 画像特徴。その概念のしきい値 (平均+1.6σ) 以上なら当てはまるとみなす。
       データが読めていなければ「判定できない」ので通さない
       (呼び出し側で 0件 と 使えない を区別する) */
    const c = f.concepts;
    if (!c) return false;
    const row = c.scores[p.id];
    if (!row) return false;
    const ok = n.concept.some((key) => {
      const i = c.keys.indexOf(key);
      return i >= 0 && row[i] >= (c.threshold[key] ?? Infinity);
    });
    if (!ok) return false;
  }

  if (n.bbox) {
    const pt = locPoints && p.loc ? locPoints[p.loc] : null;
    if (!pt) return false;
    const [w, s, e, nn] = n.bbox;
    if (pt.lng < w || pt.lng > e || pt.lat < s || pt.lat > nn) return false;
  }

  return true;
}

/* ------------------------------------------------------------------ *
 * 4. 並び替え (1か所)
 * ------------------------------------------------------------------ */

export const SORTS = ["region", "date", "added"];

/** ⑦ 概念を選んでいるときの並び。近いものほど上へ */
function sortByConcept(list, keys, f) {
  const c = f.concepts;
  if (!c) return list;
  const idx = keys.map((k) => c.keys.indexOf(k)).filter((i) => i >= 0);
  if (!idx.length) return list;
  /* しきい値からどれだけ上かで比べる。概念ごとに水準が違うため、
     生の類似度をそのまま足すと水準の高い概念だけが効いてしまう */
  const base = keys.map((k) => c.threshold[k] ?? 0);
  const score = (p) => {
    const row = c.scores[p.id];
    if (!row) return -Infinity;
    let best = -Infinity;
    idx.forEach((i, k) => { const v = row[i] - base[k]; if (v > best) best = v; });
    return best;
  };
  return [...list].sort((a, b) => score(b) - score(a));
}

function sortPhotos(list, sort, f) {
  if (sort === "date") {
    /* 撮影日の新しい順。撮影日が無ければ年で代替 */
    const key = (p) => (f.dates && f.dates[p.id]) || (p.year ? `${p.year}-00-00` : "0000-00-00");
    return [...list].sort((a, b) => (key(b) < key(a) ? -1 : key(b) > key(a) ? 1 : 0));
  }
  if (sort === "added") {
    /* 追加日の新しい順。追加日が分からない写真は後ろへ回し、
       元の並び (地域順) を保って安定させる */
    const key = (p) => (f.added && f.added[p.id]) || "";
    const withDate = list.filter((p) => key(p));
    const without = list.filter((p) => !key(p));
    withDate.sort((a, b) => (key(b) < key(a) ? -1 : key(b) > key(a) ? 1 : 0));
    return [...withDate, ...without];
  }
  return list;  /* region = data.js の並び (都道府県 → 撮影日降順) */
}

/* ------------------------------------------------------------------ *
 * 5. 入口
 * ------------------------------------------------------------------ */

/**
 * 条件で絞り込み、並べ替えた写真を返す。
 * @param q         条件
 * @param opts.themeTags  コレクション slug → タグ配列 (collections.js の COLLECTION_TAGS)
 * @param opts.locPoints  撮影地 → { lat, lng } (②地図の範囲絞り込み用)
 * @param opts.facets     省略時は読み込み済みのものを使う
 * @param opts.source     省略時は掲載中の全写真
 */
export function selectPhotos(q, opts = {}) {
  const n = normalizeQuery(q);
  const f = opts.facets || getFacets();
  const src = opts.source || allPhotos();
  const filtered = src.filter((p) => matches(p, n, f, opts.themeTags, opts.locPoints, opts.themeLocs));
  /* 概念を選んでいるときは「近い順」を既定にする。
     利用者が並びを明示的に変えた場合はそちらを優先する */
  if (n.concept.length && !q.sort) return sortByConcept(filtered, n.concept, f);
  return sortPhotos(filtered, n.sort, f);
}

/** 各選択肢が「いま何枚に当たるか」。選択肢を消さずに件数だけ出すために使う */
export function facetCounts(q, opts = {}) {
  const n = normalizeQuery(q);
  const f = opts.facets || getFacets();
  const src = opts.source || allPhotos();
  const count = (type, value) => {
    const q2 = { ...n, [type]: [value] };
    /* 同じ種類の条件は置き換えて数える (その選択肢を選んだときの件数) */
    return src.filter((p) => matches(p, normalizeQuery(q2), f, opts.themeTags, opts.locPoints, opts.themeLocs)).length;
  };
  return count;
}
