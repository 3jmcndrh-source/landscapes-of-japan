/**
 * ① 検索の採点部分。データ (data.js) を読み込まないので、
 * ヘッダーの QuickSearch が索引JSONだけで同じ判定を使える。
 * 索引の作り方は search-core.js を参照。
 *
 * 順位づけ (高い順):
 *   100 正規化した名前・別名の完全一致          「びえい」→ 美瑛町
 *    90 記号や空白を除いた形での完全一致
 *    75 名前・別名の前方一致                    「京都」→ 京都府
 *    60 名前の中の語頭一致 (区切りの直後)
 *    35 単なる部分一致                          「京都」→ 東京都
 *    15 親の都道府県名など、周辺情報だけの一致
 * 同点は 種別 (撮影地 → 都道府県 → テーマ) → 写真枚数の多い順。
 */
import { LANGS } from "./i18n-meta.js";

/* ---- 正規化 -------------------------------------------------------------
   NFKC で全角英数と半角カナを畳み、小文字化し、カタカナをひらがなへ寄せる。
   「ＫＹＯＴＯ」「ｷｮｳﾄ」「キョウト」「きょうと」がすべて同じ形になる。 */
export function normalizeText(s) {
  let t = String(s == null ? "" : s);
  try { t = t.normalize("NFKC"); } catch {}
  t = t.toLowerCase();
  // カタカナ → ひらがな (長音符はそのまま)
  t = t.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
  return t.replace(/\s+/g, " ").trim();
}

/** 記号・空白を落とした比較用の形。「法隆寺 夢殿」と「法隆寺夢殿」を同一視する */
export function compactText(s) {
  return normalizeText(s).replace(/[\s\-_・･,.'’()（）「」]/g, "");
}

const SEP = /[\s\-_・･,.()（）「」]/;

/* ---- 採点 --------------------------------------------------------------- */
const TYPE_RANK = { loc: 0, pref: 1, col: 2 };

function scoreField(value, q, qc) {
  const n = normalizeText(value);
  if (!n) return 0;
  if (n === q) return 100;
  const c = compactText(value);
  if (c && c === qc) return 90;
  if (n.startsWith(q)) return 75;
  const i = n.indexOf(q);
  if (i < 0) return c.includes(qc) ? 30 : 0;
  if (SEP.test(n[i - 1] || "")) return 60;   // 語頭 (区切りの直後)
  return 35;                                  // 単なる部分一致
}

/** 1件の点数。0 なら該当なし */
export function scoreEntry(entry, q, qc) {
  let best = 0;
  for (const v of entry.n || []) { const s = scoreField(v, q, qc); if (s > best) best = s; }
  for (const v of entry.a || []) { const s = scoreField(v, q, qc); if (s > best) best = s; }
  if (best) return best;
  // 名前でも別名でも当たらないときだけ、周辺情報 (都道府県名) を弱く見る
  // 偶然の部分一致 (「京都」が「東京都」に含まれる) までは拾わない。
  for (const v of entry.x || []) if (scoreField(v, q, qc) >= 60) return 15;
  return 0;
}

/**
 * 検索の本体。表示用の名前は lang の位置から取る。
 * langs は索引が作られたときの言語順 (JSONから読む場合に必要)。
 */
export function searchEntries(entries, query, lang, { limit = 40, langs = LANGS } = {}) {
  const q = normalizeText(query);
  if (!q) return [];
  const qc = compactText(query);
  const pos = Math.max(0, langs.indexOf(lang));

  const hits = [];
  for (const e of entries) {
    const s = scoreEntry(e, q, qc);
    if (s > 0) hits.push({ e, s });
  }
  hits.sort((A, B) =>
    B.s - A.s ||
    (TYPE_RANK[A.e.t] ?? 9) - (TYPE_RANK[B.e.t] ?? 9) ||
    (B.e.c || 0) - (A.e.c || 0)
  );
  return hits.slice(0, limit).map(({ e, s }) => ({
    ...e,
    score: s,
    name: e.n[pos] || e.n[1] || e.n[0],
  }));
}

/** 索引の項目 → その言語での行き先 */
export function entryHref(e, lang) {
  if (e.t === "loc") return `/${lang}/${e.p}/${e.l}`;
  if (e.t === "pref") return `/${lang}/${e.p}`;
  return `/${lang}/collections/${e.s}`;
}
