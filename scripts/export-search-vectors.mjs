#!/usr/bin/env node
/**
 * ⑦「見た目から探す」が閲覧時に読むデータを、いま掲載している写真に合わせて書き出す。
 *
 *   node scripts/export-search-vectors.mjs [--check]
 *
 * 出力 (コミット対象):
 *   public/search-vectors.bin … 写真ごとの512次元ベクトル (int8 = 値×127 を丸めたもの)
 *   app/vector-meta.js        … その目次 (VECTOR_IDS) と、概念文ごとの下限 (PHRASE_THRESHOLD)
 *
 * 入力:
 *   scripts/.vector-cache.json … generate-photo-vectors.mjs が作る写真の特徴 (ローカルのみ)
 *   public/search-phrases.bin  … 概念文351件のベクトル (写真に依存しないので、ここでは作り直さない)
 *   app/vector-meta.js         … PHRASE_KEYS (概念文の並び) を引き継ぐ
 *
 * なぜ別のスクリプトなのか:
 *   generate-photo-vectors.mjs は「似た写真」(photo-similar.js) までしか書き出しておらず、
 *   この2ファイルを作る処理がリポジトリのどこにも無かった。そのため 2026-10-12 に
 *   87枚を追加したとき、似た写真は更新されたのに、こちらは 843枚のまま残った
 *   (追加した87枚が「見た目から」「霧」「夕焼け」などの検索に出なかった)。
 *   upload.mjs が generate-photo-vectors.mjs の直後にこれを実行する。
 *
 * 下限 (PHRASE_THRESHOLD) は、既定では **いまの値をそのまま引き継ぐ**。
 *   もとは「その文と全写真との近さの 平均 + 1.6σ」だが、当時の計算を再現できない
 *   (当時の概念文は今の app/concepts.js から作り直しても 351件中31件しか一致せず、
 *   下限も丸め前の値から求めたもので、配信している int8 からは同じ値にならない)。
 *   ここで求め直すと、写真を足しただけのつもりが既存の検索結果まで変わる
 *   (実測: 温泉 56枚→40枚、桜 62枚→72枚)。それは写真の追加とは別の判断なので、
 *   既定ではやらない。引き継いだ下限のまま、追加した写真が下限を超えれば結果に加わる。
 *   求め直すときは --rethreshold (閲覧側と同じ int8 どうしの内積 ÷ 127² で計算する)。
 *
 * --check:       書き出さず、いまの2ファイルが掲載写真と合っているかだけを確かめる。
 * --dry:         書き出さず、既存分のベクトルが変わらないことだけを確かめる。
 * --rethreshold: 下限を、いま掲載している全写真で求め直す (既存の検索結果も変わる)。
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { PREFECTURES } from "../app/data.js";
import * as META from "../app/vector-meta.js";

const CACHE = path.join("scripts", ".vector-cache.json");
const BIN = path.join("public", "search-vectors.bin");
const PHR = path.join("public", "search-phrases.bin");
const OUT_META = path.join("app", "vector-meta.js");
const { VECTOR_VERSION, VECTOR_DIM: DIM, VECTOR_SCALE: SCALE, PHRASE_KEYS } = META;
const THRESH_K = 1.6;
const checkOnly = process.argv.includes("--check");

const listed = new Set(PREFECTURES.flatMap((pf) => pf.photos.map((p) => p.id)));

if (checkOnly) {
  const have = new Set(META.VECTOR_IDS);
  const lack = [...listed].filter((id) => !have.has(id));
  const dead = META.VECTOR_IDS.filter((id) => !listed.has(id));
  const size = existsSync(BIN) ? readFileSync(BIN).length : -1;
  const sizeOk = size === META.VECTOR_IDS.length * DIM;
  console.log(`検索用ベクトル: 目次 ${META.VECTOR_IDS.length}枚 / 掲載 ${listed.size}枚 / 未反映 ${lack.length} / 掲載終了 ${dead.length} / 大きさ ${sizeOk ? "一致" : "不一致"}`);
  process.exit(lack.length || dead.length || !sizeOk ? 1 : 0);
}

if (!existsSync(CACHE)) {
  console.error(`${CACHE} がありません。先に node scripts/generate-photo-vectors.mjs を実行してください`);
  process.exit(1);
}
const cache = JSON.parse(readFileSync(CACHE, "utf-8"));
if (cache.__version !== VECTOR_VERSION) {
  console.error(`特徴の版が違います (キャッシュ ${cache.__version} / 目次 ${VECTOR_VERSION})。概念文のベクトルと同じモデルで作り直す必要があります`);
  process.exit(1);
}

/* 並びは写真IDの文字順 (これまでの出力と同じ) */
const ids = Object.keys(cache)
  .filter((k) => k !== "__version" && listed.has(k) && Array.isArray(cache[k].v) && cache[k].v.length === DIM)
  .sort();
const noVec = [...listed].filter((id) => !ids.includes(id));

const img = new Int8Array(ids.length * DIM);
ids.forEach((id, i) => {
  const v = cache[id].v;
  for (let d = 0; d < DIM; d++) img[i * DIM + d] = Math.max(-127, Math.min(127, Math.round(v[d] * SCALE)));
});

const phrBuf = readFileSync(PHR);
if (phrBuf.length !== PHRASE_KEYS.length * DIM) {
  console.error("概念文ベクトルの大きさが目次と合いません。search-phrases.bin を作り直す必要があります");
  process.exit(1);
}
const phr = new Int8Array(phrBuf.buffer, phrBuf.byteOffset, phrBuf.length);
const rethreshold = process.argv.includes("--rethreshold");
const computed = PHRASE_KEYS.map((_, pi) => {
  let sum = 0, sq = 0;
  for (let i = 0; i < ids.length; i++) {
    let s = 0;
    for (let d = 0; d < DIM; d++) s += img[i * DIM + d] * phr[pi * DIM + d];
    s /= SCALE * SCALE;
    sum += s; sq += s * s;
  }
  const m = sum / ids.length;
  const sd = Math.sqrt(Math.max(0, sq / ids.length - m * m));
  return Math.round((m + THRESH_K * sd) * 1e4) / 1e4;
});
const kept = Array.isArray(META.PHRASE_THRESHOLD) && META.PHRASE_THRESHOLD.length === PHRASE_KEYS.length;
const thresholds = rethreshold || !kept ? computed : META.PHRASE_THRESHOLD;

if (process.argv.includes("--dry")) {
  /* 書き出さずに、いまのファイルとの差だけを見る (書き出し方が以前と同じかの確認用) */
  const old = existsSync(BIN) ? readFileSync(BIN) : Buffer.alloc(0);
  let same = 0, differ = 0;
  META.VECTOR_IDS.forEach((id, oi) => {
    const ni = ids.indexOf(id);
    if (ni < 0) return;
    let eq = true;
    for (let d = 0; d < DIM && eq; d++) if (old.readInt8(oi * DIM + d) !== img[ni * DIM + d]) eq = false;
    eq ? same++ : differ++;
  });
  const maxT = Math.max(...thresholds.map((t, i) => Math.abs(t - (META.PHRASE_THRESHOLD[i] ?? 0))));
  console.log(`[dry] ${ids.length}枚 (これまで ${META.VECTOR_IDS.length}枚)。既存分のベクトル: 一致 ${same} / 相違 ${differ}。下限: ${rethreshold ? `求め直す (変化 最大 ${maxT.toFixed(4)})` : "引き継ぐ"}`);
  process.exit(0);
}

writeFileSync(BIN, Buffer.from(img.buffer));
writeFileSync(
  OUT_META,
  `// 自動生成: node scripts/export-search-vectors.mjs (手で編集しない)\n` +
    `// ⑦ 検索用ベクトルの目次。実データは public/search-vectors.bin と\n` +
    `// public/search-phrases.bin (int8, 値を ${SCALE} 倍して丸めたもの)。\n` +
    `// 閲覧側は「見た目から探す」を使うときだけ取得する。\n` +
    `// モデル: Xenova/clip-vit-base-patch32 (${VECTOR_VERSION})\n` +
    `export const VECTOR_VERSION = ${JSON.stringify(VECTOR_VERSION)};\n` +
    `export const VECTOR_DIM = ${DIM};\n` +
    `export const VECTOR_SCALE = ${SCALE};\n` +
    `export const VECTOR_IDS = ${JSON.stringify(ids)};\n` +
    `export const PHRASE_KEYS = ${JSON.stringify(PHRASE_KEYS)};\n` +
    `// その文に当てはまると扱う下限 (全写真での平均 + ${THRESH_K}σ として決めた値)。\n` +
    `// 写真を足すだけのときは引き継ぐ。求め直すのは export-search-vectors.mjs --rethreshold\n` +
    `export const PHRASE_THRESHOLD = ${JSON.stringify(thresholds)};\n`,
  "utf-8"
);
console.log(`検索用ベクトル: ${ids.length}枚 → ${BIN} (${(img.length / 1024).toFixed(0)} KB)` +
  (noVec.length ? ` ! 特徴が無く入らなかった写真 ${noVec.length}枚: ${noVec.slice(0, 5).join(", ")}` : ""));
