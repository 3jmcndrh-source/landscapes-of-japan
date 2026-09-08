/**
 * ⑦ 自由文検索で使う BERT (多言語) のトークナイザ。
 *
 * なぜ自前で書くか:
 *   文章モデルの ONNX は自分で onnxruntime-web へ渡す (1ファイル25MiB制限のため
 *   分割して配信している)。トークナイザだけのために transformers.js を
 *   画面側へ入れると、束ねる量も依存も増える。
 *   ここでやることは決まりきっているので、tokenizer.json の設定どおりに実装し、
 *   transformers.js の出力と一致することを scripts/check-wordpiece.mjs で確かめる。
 *
 * 対象の設定 (sentence-transformers/clip-ViT-B-32-multilingual-v1):
 *   normalizer     BertNormalizer clean_text=true handle_chinese_chars=true
 *                  lowercase=false strip_accents=null (= lowercase に従うので外さない)
 *   pre_tokenizer  BertPreTokenizer (空白と記号で切る)
 *   model          WordPiece  継続接頭辞 "##"  未知語 "[UNK]"  1語100文字まで
 *   post           [CLS] … [SEP]
 */

const CLS = "[CLS]", SEP = "[SEP]", UNK = "[UNK]", PAD = "[PAD]";
const MAX_CHARS_PER_WORD = 100;

/* 漢字・かな等、1文字ずつ切る範囲 (HF の is_chinese_char と同じ) */
function isCJK(cp) {
  return (
    (cp >= 0x4e00 && cp <= 0x9fff) || (cp >= 0x3400 && cp <= 0x4dbf) ||
    (cp >= 0x20000 && cp <= 0x2a6df) || (cp >= 0x2a700 && cp <= 0x2b73f) ||
    (cp >= 0x2b740 && cp <= 0x2b81f) || (cp >= 0x2b820 && cp <= 0x2ceaf) ||
    (cp >= 0xf900 && cp <= 0xfaff) || (cp >= 0x2f800 && cp <= 0x2fa1f)
  );
}

const isControl = (ch) => {
  if (ch === "\t" || ch === "\n" || ch === "\r") return false;
  return /^[\p{Cc}\p{Cf}\p{Co}\p{Cs}]$/u.test(ch);
};
const isWhitespace = (ch) => ch === " " || ch === "\t" || ch === "\n" || ch === "\r" || /^\p{Zs}$/u.test(ch);
/* HF の _is_punctuation: ASCII 記号 + Unicode の P 系 */
const isPunct = (ch) => {
  const cp = ch.codePointAt(0);
  if ((cp >= 33 && cp <= 47) || (cp >= 58 && cp <= 64) || (cp >= 91 && cp <= 96) || (cp >= 123 && cp <= 126)) return true;
  return /^\p{P}$/u.test(ch);
};

/** BertNormalizer: 制御文字を捨て、空白をまとめ、漢字の前後に空白を入れる */
function normalize(text) {
  let out = "";
  for (const ch of String(text)) {
    const cp = ch.codePointAt(0);
    if (cp === 0 || cp === 0xfffd || isControl(ch)) continue;
    if (isWhitespace(ch)) { out += " "; continue; }
    if (isCJK(cp)) { out += ` ${ch} `; continue; }
    out += ch;
  }
  return out;
}

/** BertPreTokenizer: 空白で切り、記号は1文字ずつ独立させる */
function preTokenize(text) {
  const words = [];
  for (const chunk of normalize(text).split(/\s+/)) {
    if (!chunk) continue;
    let cur = "";
    for (const ch of chunk) {
      if (isPunct(ch)) { if (cur) { words.push(cur); cur = ""; } words.push(ch); }
      else cur += ch;
    }
    if (cur) words.push(cur);
  }
  return words;
}

/**
 * 語彙 (id 順の配列) からトークナイザを作る。
 * @param {string[]} vocabList id 順のトークン
 */
export function createTokenizer(vocabList) {
  const vocab = new Map();
  vocabList.forEach((t, i) => { if (!vocab.has(t)) vocab.set(t, i); });
  const idOf = (t) => (vocab.has(t) ? vocab.get(t) : vocab.get(UNK));

  /** 1語を WordPiece で分割する (最長一致を前から) */
  function pieces(word) {
    const chars = [...word];
    if (chars.length > MAX_CHARS_PER_WORD) return [UNK];
    const out = [];
    let start = 0;
    while (start < chars.length) {
      let end = chars.length;
      let found = null;
      while (start < end) {
        const sub = (start > 0 ? "##" : "") + chars.slice(start, end).join("");
        if (vocab.has(sub)) { found = sub; break; }
        end--;
      }
      if (found === null) return [UNK];      /* 1つでも当てはまらなければ語ごと未知語 */
      out.push(found);
      start = end;
    }
    return out;
  }

  /**
   * @param {string[]} texts
   * @param {number} maxLen  [CLS]/[SEP] を含めた上限
   * @returns {{ inputIds: BigInt64Array, attentionMask: BigInt64Array, dims: number[] }}
   */
  function encode(texts, maxLen = 128) {
    const rows = texts.map((t) => {
      const ids = [idOf(CLS)];
      for (const w of preTokenize(t)) {
        for (const p of pieces(w)) {
          if (ids.length >= maxLen - 1) break;
          ids.push(idOf(p));
        }
        if (ids.length >= maxLen - 1) break;
      }
      ids.push(idOf(SEP));
      return ids;
    });
    const width = Math.max(1, ...rows.map((r) => r.length));
    const inputIds = new BigInt64Array(rows.length * width);
    const attentionMask = new BigInt64Array(rows.length * width);
    const padId = BigInt(idOf(PAD));
    rows.forEach((r, i) => {
      for (let k = 0; k < width; k++) {
        inputIds[i * width + k] = k < r.length ? BigInt(r[k]) : padId;
        attentionMask[i * width + k] = k < r.length ? 1n : 0n;
      }
    });
    return { inputIds, attentionMask, dims: [rows.length, width] };
  }

  /** 検証用: トークン文字列そのもの */
  const tokens = (text, maxLen = 128) => {
    const out = [CLS];
    for (const w of preTokenize(text)) {
      for (const p of pieces(w)) { if (out.length >= maxLen - 1) break; out.push(p); }
      if (out.length >= maxLen - 1) break;
    }
    out.push(SEP);
    return out;
  };

  return { encode, tokens, size: vocab.size };
}
