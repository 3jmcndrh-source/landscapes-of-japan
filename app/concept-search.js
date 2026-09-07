/**
 * ⑦ 入力された言葉を「画像の特徴の概念」へ結び付ける。
 *
 * なぜモデルに文章をそのまま渡さないか:
 *   使っている CLIP の文章側は英語で学習されている。25言語の自由文を
 *   そのまま渡すと、日本語や他言語では見当違いの結果になる。
 *   多言語の文章モデルを閲覧者のブラウザへ読み込ませる方式は、
 *   初期表示に数十MBを載せることになるので採らない。
 *   代わりに、概念語の各言語表示名 (app/concepts.js) と照合して概念を決め、
 *   写真の並べ替えには画像特徴 (ビルド時に計算済み) を使う。
 *
 * 入力の扱い:
 *   照合はこのブラウザの中だけで行う。入力そのものを URL・GA4・Clarity・
 *   ログのいずれにも送らない。URL に載るのは選ばれた概念キー
 *   (例 concept=snow) だけで、利用者が書いた文ではない。
 *
 * 何語まで引けるか:
 *   26概念すべてが25言語の表示名を持つ。加えて英語名とキーでも引ける。
 *   ただし「霧がかった朝の湖」のような文そのものの意味は解釈しない。
 *   文中に概念語が含まれていれば拾う、という範囲。
 */
import { CONCEPTS, conceptLabel } from "./concepts.js";
import { normalizeText, compactText } from "./search-score.js";

/** 言語ごとに 概念キー → 照合語 の表を作る (使う言語の分だけ作って使い回す) */
const _tables = new Map();
function tableFor(lang) {
  if (_tables.has(lang)) return _tables.get(lang);
  const rows = CONCEPTS.map((c) => {
    const terms = new Set();
    const add = (v) => {
      const n = normalizeText(v);
      if (n) { terms.add(n); const cp = compactText(v); if (cp) terms.add(cp); }
    };
    add(conceptLabel(c.key, lang));
    add(conceptLabel(c.key, "en"));
    add(c.key.replace(/^season-/, "").replace(/-/g, " "));
    return { key: c.key, terms: [...terms] };
  });
  _tables.set(lang, rows);
  return rows;
}

/**
 * 入力文 → 当てはまる概念キー。
 * 完全一致 → 語として含む → 部分一致 の順に強い。
 * 何も当たらなければ空配列を返す (「使えない」ではなく「一致なし」)。
 *
 * @returns {Array<{ key: string, how: "exact" | "word" | "part" }>}
 */
export function matchConcepts(text, lang, limit = 3) {
  const q = normalizeText(text);
  if (!q) return [];
  const qc = compactText(text);
  const hits = [];
  for (const row of tableFor(lang)) {
    let best = 0, how = null;
    for (const t of row.terms) {
      if (t === q || t === qc) { best = 3; how = "exact"; break; }
      /* 語として含む。空白で区切る言語と区切らない言語の両方に効くよう
         両方向で見る (「夕焼けの海」→ 夕焼け / 「a misty morning」→ mist) */
      if (q.includes(t) || qc.includes(t)) {
        if (best < 2) { best = 2; how = "word"; }
      } else if (t.startsWith(q) || t.startsWith(qc)) {
        /* 語頭の一致。「雪」→「雪景色」、「sun」→「sunset」。
           漢字・かなは1文字でも語として成り立つので、長さの下限を分ける */
        const cjk = /[぀-ヿ㐀-鿿]/.test(q);
        if ((cjk ? q.length >= 1 : q.length >= 3) && best < 1) { best = 1; how = "part"; }
      }
    }
    if (best) hits.push({ key: row.key, rank: best, how, len: row.terms.find((t) => q.includes(t) || qc.includes(t))?.length || 0 });
  }
  /* 強さ → 一致した語の長さ (長い語のほうが具体的) の順 */
  hits.sort((a, b) => b.rank - a.rank || b.len - a.len);
  return hits.slice(0, limit).map(({ key, how }) => ({ key, how }));
}
