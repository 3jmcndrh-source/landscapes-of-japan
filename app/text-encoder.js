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
 *   - 重い処理は Worker で行う。読み込み中も写真の閲覧と概念語の検索は止まらない。
 *   - 実行部 (wasm) も自前配信。CSP を外部へ広げない。
 *   - 入力文は端末の中だけで扱う。外部へ送らない。
 *
 * 失敗したら false / null を返す。呼び出し側は概念語だけの検索へ戻す。
 */
import {
  TEXT_MODEL_BASE, TEXT_MODEL_PARTS, TEXT_MODEL_TOTAL_BYTES,
  TEXT_HIDDEN, TEXT_OUT, TEXT_MODEL_LANGS,
} from "./text-model-meta.js";

export const TOTAL_BYTES = TEXT_MODEL_TOTAL_BYTES;
export const canUseFreeText = (lang) => TEXT_MODEL_LANGS.includes(lang);
export { TEXT_MODEL_LANGS };

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
    if (m.type === "ready") { pending.get("__ready")?.(true); return; }
    if (m.type === "vector") { pending.get(m.id)?.resolve?.(m.vector); pending.delete(m.id); return; }
    if (m.type === "error") {
      if (m.id == null) pending.get("__ready")?.(false);
      else { pending.get(m.id)?.resolve?.(null); pending.delete(m.id); }
    }
  };
  worker.onerror = () => pending.get("__ready")?.(false);
  return worker;
}

/**
 * モデルを取りに行く。二重に走らせない。
 * @param {(loaded:number, total:number) => void} onProgress
 * @returns 使えるようになったら true
 */
export function loadTextModel(onProgress) {
  if (readyPromise) {
    if (onProgress) pending.set("__progress", onProgress);
    return readyPromise;
  }
  readyPromise = new Promise((resolve) => {
    try {
      const w = ensureWorker();
      pending.set("__ready", (ok) => { if (!ok) readyPromise = null; resolve(Boolean(ok)); });
      if (onProgress) pending.set("__progress", onProgress);
      w.postMessage({
        type: "init",
        base: TEXT_MODEL_BASE,
        parts: TEXT_MODEL_PARTS,
        hidden: TEXT_HIDDEN,
        out: TEXT_OUT,
        total: TEXT_MODEL_TOTAL_BYTES,
      });
    } catch {
      readyPromise = null;
      resolve(false);
    }
  });
  return readyPromise;
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
