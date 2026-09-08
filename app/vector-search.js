"use client";
/**
 * ⑦ 画像の特徴で並べるための、閲覧側の計算。
 *
 * 何を読むか:
 *   /search-vectors.bin   写真ごとの512次元ベクトル (int8)
 *   /search-phrases.bin   概念文ごとの512次元ベクトル (int8)
 *   どちらも「見た目から探す」を使ったときだけ取りに行く。
 *   通常の写真閲覧では読み込まない。
 *
 * なぜベクトルを配るのか:
 *   単独の概念だけなら、写真ごとのスコアを配れば足りる。
 *   だが「霧のかかった山」は mist と mountain の AND ではなく、
 *   「霧に覆われた山の写真」という1つの文として画像と比べたほうが、
 *   実際に入力に合う写真が上位に来る (実測で確認)。
 *   組み合わせの文をビルド時に用意し、閲覧側は内積を取るだけにしている。
 *   モデルは載せない。
 *
 * 計算量:
 *   843枚 × 512次元 の内積 = 約43万回の積和。1回の検索で数ミリ秒。
 */
import { VECTOR_IDS, PHRASE_KEYS, PHRASE_THRESHOLD, VECTOR_DIM, VECTOR_SCALE, VECTOR_VERSION } from "./vector-meta.js";

const SCALE2 = VECTOR_SCALE * VECTOR_SCALE;

let _state = null;      /* { img, phrases } */
let _req = null;

/**
 * ベクトルを取りに行く。二重に走らせない。
 * 失敗したら null を返す (呼び出し側が「使えない」と「0件」を区別できるように)。
 */
export function loadVectors() {
  if (_state) return Promise.resolve(_state);
  if (!_req) {
    _req = (async () => {
      const [a, b] = await Promise.all([
        fetch("/search-vectors.bin").then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(String(r.status))))),
        fetch("/search-phrases.bin").then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(String(r.status))))),
      ]);
      const img = new Int8Array(a);
      const phrases = new Int8Array(b);
      /* 目次と実データの大きさが合わなければ使わない
         (古い .bin が配信に残っている場合に、無関係な写真を出さないため) */
      if (img.length !== VECTOR_IDS.length * VECTOR_DIM) throw new Error("写真ベクトルの大きさが目次と合わない");
      if (phrases.length !== PHRASE_KEYS.length * VECTOR_DIM) throw new Error("概念文ベクトルの大きさが目次と合わない");
      _state = { img, phrases };
      return _state;
    })().catch(() => null);
  }
  return _req;
}

export const getVectors = () => _state;
export const vectorVersion = () => VECTOR_VERSION;

/** 概念キー(1〜2個) → 概念文の番号。順序は問わない。無ければ -1 */
export function phraseIndex(keys) {
  if (!keys || !keys.length) return -1;
  if (keys.length === 1) return PHRASE_KEYS.indexOf(keys[0]);
  const [a, b] = keys;
  const i = PHRASE_KEYS.indexOf(`${a}+${b}`);
  return i >= 0 ? i : PHRASE_KEYS.indexOf(`${b}+${a}`);
}

/** その文に当てはまると扱う下限 */
export const phraseThreshold = (pi) => (pi >= 0 ? PHRASE_THRESHOLD[pi] : Infinity);

/**
 * 写真ID → その文との近さ。
 * 返すのは Map。ベクトルが未読なら null。
 */
const _memo = new Map();   /* 同じ文を何度も計算しない (件数表示で26個ぶん呼ばれる) */
export function scoresForPhrase(pi) {
  if (_memo.has(pi)) return _memo.get(pi);
  const r = computePhrase(pi);
  if (r) { if (_memo.size > 64) _memo.clear(); _memo.set(pi, r); }
  return r;
}

function computePhrase(pi) {
  const st = _state;
  if (!st || pi < 0) return null;
  const { img, phrases } = st;
  const off = pi * VECTOR_DIM;
  const out = new Map();
  for (let i = 0; i < VECTOR_IDS.length; i++) {
    let s = 0;
    const o = i * VECTOR_DIM;
    for (let k = 0; k < VECTOR_DIM; k++) s += img[o + k] * phrases[off + k];
    out.set(VECTOR_IDS[i], s / SCALE2);
  }
  return out;
}

/**
 * 任意のベクトル (文章モデルで作ったもの) との近さ。
 * 概念に当てはまらない自由文を扱えるようになったときに使う入口。
 * @param {Float32Array|number[]} vec 正規化済み512次元
 */
export function scoresForVector(vec) {
  const st = _state;
  if (!st || !vec || vec.length !== VECTOR_DIM) return null;
  const { img } = st;
  const out = new Map();
  for (let i = 0; i < VECTOR_IDS.length; i++) {
    let s = 0;
    const o = i * VECTOR_DIM;
    for (let k = 0; k < VECTOR_DIM; k++) s += img[o + k] * vec[k];
    out.set(VECTOR_IDS[i], s / VECTOR_SCALE);
  }
  return out;
}
