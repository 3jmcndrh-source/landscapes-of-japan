"use client";
/**
 * ⑦ 自由文を512次元へ変換する部分 (閲覧側の入口)。
 *
 * 使うモデル: sentence-transformers/clip-ViT-B-32-multilingual-v1 (Apache-2.0)
 *   CLIP ViT-B/32 の画像側と同じ空間へ投影するように蒸留された文章モデル。
 *   構成は DistilBERT(多言語) → 平均プーリング → Dense(768→512)。
 *   Dense は ONNX に含まれないので、重みを別に読んで自前で掛ける。
 *   同じ空間であることは scripts/verify-mclip.mjs で実測済み
 *   (英語入力で CLIP 本体と上位10枚の7.3件が一致し、意味的にも妥当)。
 *   トークナイザが参照実装と一致することは scripts/check-wordpiece.mjs で確認済み。
 *
 * 取得と実行:
 *   - 「この言葉で探す」を押したときだけ取りに行く。
 *     通常の閲覧・概念語での検索では取得しない。
 *   - Cloudflare Pages は 1ファイル 25 MiB までなので ONNX は分割してある。
 *     順に取ってつなぎ、onnxruntime-web へ渡す。
 *   - 取れた分は Cache Storage に置く。2回目は通信しない。
 *   - 重い処理は Worker で行う。読み込み中も写真の閲覧と概念語の検索は止まらない。
 *   - 実行部 (wasm) も自前配信。CSP を外部へ広げない。
 *   - 入力文は端末の中だけで扱う。外部へ送らない。
 *
 * 中止:
 *   abortTextModel() で Worker を終了させる。Worker が消えると、その中で
 *   走っていた取得も一緒に止まる (画面から表示を消すだけにしない)。
 *   取り終わっている分は Cache Storage に残るので、やり直しはそこから続く。
 *
 * 失敗・中止は { ok:false, reason } で返す。呼び出し側が 0件 と区別できるように、
 * 「読めなかった」と「合う写真が無い」を同じ値にしない。
 */
import {
  TEXT_MODEL_BASE, TEXT_MODEL_PARTS, TEXT_MODEL_TOTAL_BYTES, TEXT_DOWNLOAD_BYTES,
  TEXT_MODEL_ASSET_BYTES, ORT_WASM_BYTES,
  TEXT_MODEL_VERSION, TEXT_HIDDEN, TEXT_OUT, TEXT_MODEL_LANGS,
} from "./text-model-meta.js";

export const TOTAL_BYTES = TEXT_MODEL_TOTAL_BYTES;
export const canUseFreeText = (lang) => TEXT_MODEL_LANGS.includes(lang);
export { TEXT_MODEL_LANGS };

const STORE = `mclip-${TEXT_MODEL_VERSION}`;
const ASSET_NAMES = [...TEXT_MODEL_PARTS, "dense.bin", "vocab.txt"];

let worker = null;
let readyPromise = null;
let seq = 0;
const pending = new Map();

function ensureWorker() {
  if (worker) return worker;
  /* 自前配信の古典 Worker。onnxruntime-web は importScripts で読む。
     (ES モジュールの Worker だと束ね方によって ORT が動かないため。
      中身は scripts/package-text-model.mjs が app/wordpiece.js から生成する) */
  worker = new Worker("/ort/text-worker.js");
  worker.onmessage = (e) => {
    const m = e.data || {};
    if (m.type === "progress") { pending.get("__progress")?.(m.loaded, m.total); return; }
    if (m.type === "phase") { pending.get("__phase")?.(m.phase); return; }
    if (m.type === "ready") { pending.get("__ready")?.({ ok: true }); return; }
    if (m.type === "vector") { pending.get(m.id)?.resolve?.(m.vector); pending.delete(m.id); return; }
    if (m.type === "error") {
      if (m.id == null) pending.get("__ready")?.({ ok: false, reason: "failed" });
      else { pending.get(m.id)?.resolve?.(null); pending.delete(m.id); }
    }
  };
  worker.onerror = () => pending.get("__ready")?.({ ok: false, reason: "failed" });
  return worker;
}

/**
 * モデルを取りに行く。押し直しても二重には走らせない
 * (同じ取得の進捗を、後から来た呼び出しにも渡す)。
 *
 * @param {{onProgress?:(loaded:number,total:number)=>void, onPhase?:(p:string)=>void}} cb
 * @returns {Promise<{ok:true}|{ok:false, reason:"aborted"|"failed"}>}
 */
export function loadTextModel(cb = {}) {
  if (cb.onProgress) pending.set("__progress", cb.onProgress);
  if (cb.onPhase) pending.set("__phase", cb.onPhase);
  if (readyPromise) return readyPromise;
  readyPromise = new Promise((resolve) => {
    try {
      const w = ensureWorker();
      pending.set("__ready", (r) => { if (!r.ok) reset(); resolve(r); });
      w.postMessage({
        type: "init",
        base: TEXT_MODEL_BASE,
        parts: TEXT_MODEL_PARTS,
        hidden: TEXT_HIDDEN,
        out: TEXT_OUT,
        total: TEXT_DOWNLOAD_BYTES,
        version: TEXT_MODEL_VERSION,
      });
    } catch {
      reset();
      resolve({ ok: false, reason: "failed" });
    }
  });
  return readyPromise;
}

/**
 * 失敗・中止のあと始末。次の「もう一度試す」を必ず効かせるための後片付け。
 *
 * Worker を捨てるのが要点。初期化に失敗した Worker を使い回して init を
 * もう一度送っても、取得が始まらないことがある (通信断→再試行で実測)。
 * 終了させれば、走っている通信も一緒に止まる。
 * 取り終わっている分割片は Cache Storage に残るので、やり直しはそこから続く。
 */
function reset() {
  readyPromise = null;
  pending.delete("__ready");
  pending.delete("__progress");
  pending.delete("__phase");
  if (worker) { try { worker.terminate(); } catch { /* すでに無い */ } }
  worker = null;
}

/**
 * 取得を止める。Worker ごと終了させるので、走っている通信も実際に止まる。
 * 待っている loadTextModel には「中止」を返す。
 */
export function abortTextModel() {
  const notify = pending.get("__ready");
  for (const [k, v] of pending) if (typeof k === "number") v?.resolve?.(null);
  reset();
  notify?.({ ok: false, reason: "aborted" });
}

/** いま取得中か (画面が中止操作を出すかどうかの判断に使う) */
export const isLoadingTextModel = () => Boolean(readyPromise);

/**
 * 取得の状況。初回の大きな取得が要るかを画面に伝えるために使う。
 *
 * @returns {Promise<{cached:boolean, pendingBytes:number}>}
 *   cached       分割片がすべて揃っている (欠けが1つでもあれば false)
 *   pendingBytes まだ取っていない分のめやす。揃っていれば 0。
 *                中止したあとに「あと何MB」を出すため、取得済みの分を差し引く。
 *                実行部 (wasm) は ORT が読むので有無を確かめられない。
 *                揃っていないときだけ、要るものとして足しておく。
 */
export async function textModelStatus() {
  const all = { cached: false, pendingBytes: TEXT_MODEL_TOTAL_BYTES };
  try {
    if (typeof caches === "undefined") return all;
    /* 問い合わせるだけで置き場を作らない (open は無い場合に作ってしまう) */
    if (!(await caches.has(STORE))) return all;
    const store = await caches.open(STORE);
    const hits = await Promise.all(ASSET_NAMES.map((n) => store.match(`${TEXT_MODEL_BASE}/${n}`)));
    const missing = ASSET_NAMES.filter((_, i) => !hits[i]);
    if (!missing.length) return { cached: true, pendingBytes: 0 };
    const bytes = missing.reduce((a, n) => a + (TEXT_MODEL_ASSET_BYTES[n] || 0), 0);
    return { cached: false, pendingBytes: bytes + ORT_WASM_BYTES };
  } catch {
    return all;
  }
}

/**
 * 文字列 → 正規化済み512次元 (Float32Array)。使えなければ null。
 * 遅れて返った結果で新しい検索を上書きしないよう、呼び出し側で
 * 最後の問い合わせかどうかを確かめること。
 */
export function encodeText(text) {
  if (!worker) return Promise.resolve(null);
  const id = ++seq;
  return new Promise((resolve) => {
    pending.set(id, { resolve });
    worker.postMessage({ type: "encode", id, text: String(text || "") });
    /* 応答が来ないまま放置しない */
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); resolve(null); } }, 30000);
  });
}
