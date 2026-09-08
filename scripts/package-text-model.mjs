#!/usr/bin/env node
/**
 * ⑦ 自由文検索の文章モデルを配信できる形にまとめる。
 *
 *   node scripts/package-text-model.mjs
 *
 * 何をするか:
 *   .model-cache/mclip/ に取得済みのモデルを、public/ 以下へ置き直す。
 *   Cloudflare Pages は 1ファイル 25 MiB までなので、ONNX を分割する。
 *   閲覧側は分割片を順に取得して1つにつなぎ、onnxruntime-web へ渡す。
 *
 * 置くもの (中身はすべて gzip 済み。閲覧側の Worker が展開する):
 *   public/models/mclip/model.onnx.000.gz …  ONNX の分割片 (展開後 各 20 MiB 以下)
 *   public/models/mclip/dense.bin.gz         Dense(768→512) の重み (float32)
 *   public/models/mclip/vocab.txt.gz         トークナイザの語彙
 *   public/ort/*.wasm                        onnxruntime-web の実行部
 *   app/text-model-meta.js                   目次 (分割数・大きさ・対応言語)
 *
 * gzip で置く理由: Cloudflare Pages は application/octet-stream を圧縮しない。
 * この ONNX は int8 量子化済みでも gzip で 67% になり、131.6MB → 88.1MB。
 * _headers で Content-Encoding を付ける手は Pages が二重圧縮するので使えない。
 *
 * 対応言語は scripts/eval-mclip-languages.mjs の実測で決めた13言語だけ。
 * それ以外の言語では自由文をモデルへ渡さず、概念語だけで検索する。
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync, statSync, copyFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";

const SRC = ".model-cache/mclip";
const OUT = "public/models/mclip";
const ORT_SRC = "node_modules/onnxruntime-web/dist";
const ORT_OUT = "public/ort";
const CHUNK = 20 * 1024 * 1024;          /* 20 MiB。Pages の上限 25 MiB に対して余裕を取る */

/* 実測で自由文検索を有効にする言語 (docs/search-languages.md) */
const ENABLED_LANGS = ["ja", "en", "zh", "zh-tw", "es", "fr", "de", "pt", "it", "ru", "vi", "nl", "uk"];

const onnx = path.join(SRC, "onnx_model_quint8_avx2.onnx");
if (!existsSync(onnx)) {
  console.error(`${onnx} がありません。先にモデルを取得してください`);
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
mkdirSync(ORT_OUT, { recursive: true });
/* 古い分割片を消す (数が減ったとき・圧縮の有無が変わったときに取り残さない) */
for (const f of readdirSync(OUT)) if (/^(model\.onnx\.\d+|dense\.bin|vocab\.txt)(\.gz)?$/.test(f)) unlinkSync(path.join(OUT, f));

/* ---- 配信は gzip 済みで置く ----
   Cloudflare Pages は application/octet-stream を圧縮しない (実測)。
   この ONNX は int8 量子化済みだが gzip で 57% まで縮む。
   _headers で Content-Encoding を付ける方法は Pages が二重圧縮するので使えない
   (プレビュー配信で実測)。そこで **中身を gzip にしたファイルをそのまま置き**、
   閲覧側の Worker が DecompressionStream で戻す。
   拡張子 .gz / 未知の拡張子 / .bin のどれでも Pages はバイト列をそのまま返すことを
   プレビュー配信で確認済み。 */
const gzip = (b) => gzipSync(b, { level: 9 });
const putGz = (name, raw) => {
  const gz = gzip(raw);
  writeFileSync(path.join(OUT, `${name}.gz`), gz);
  return { name: `${name}.gz`, bytes: gz.length, raw: raw.length };
};

/* ---- ONNX を分割 (分割は展開後の大きさで行う) ---- */
const buf = readFileSync(onnx);
const parts = [];
for (let i = 0, n = 0; i < buf.length; i += CHUNK, n++) {
  const slice = buf.subarray(i, Math.min(i + CHUNK, buf.length));
  parts.push(putGz(`model.onnx.${String(n).padStart(3, "0")}`, slice));
}
const partsGz = parts.reduce((a, p) => a + p.bytes, 0);
console.log(`[model] ONNX ${(buf.length / 1048576).toFixed(1)} MB → ${parts.length} 分割 → gzip 後 ${(partsGz / 1048576).toFixed(1)} MB (${Math.round(100 * partsGz / buf.length)}%)`);

/* ---- Dense(768→512, bias なし) を素の float32 で出す ---- */
const sBuf = readFileSync(path.join(SRC, "2_Dense_model.safetensors"));
const hLen = Number(sBuf.readBigUInt64LE(0));
const hdr = JSON.parse(sBuf.subarray(8, 8 + hLen).toString("utf-8"));
const w = hdr["linear.weight"];
if (!w || w.dtype !== "F32" || w.shape[0] !== 512 || w.shape[1] !== 768) {
  console.error("Dense の重みの形が想定と違う:", JSON.stringify(w));
  process.exit(1);
}
const [d0, d1] = w.data_offsets;
const denseEntry = putGz("dense.bin", sBuf.subarray(8 + hLen + d0, 8 + hLen + d1));
console.log(`[model] Dense ${w.shape.join("x")} → ${denseEntry.name} ${(denseEntry.bytes / 1048576).toFixed(2)} MB (展開後 ${(denseEntry.raw / 1048576).toFixed(2)} MB)`);

/* ---- トークナイザ ----
   閲覧側が要るのは語彙だけなので、tokenizer.json (1.9MB) ではなく
   id 順のトークンを改行で並べた素のテキストにする。
   設定が想定と違えば止める (黙って別の切り方をしないため)。 */
const tj = JSON.parse(readFileSync(path.join(SRC, "tokenizer.json"), "utf-8"));
if (tj.model?.type !== "WordPiece") { console.error("WordPiece ではない:", tj.model?.type); process.exit(1); }
if (tj.normalizer?.lowercase !== false || tj.normalizer?.handle_chinese_chars !== true) {
  console.error("normalizer の設定が想定と違う:", JSON.stringify(tj.normalizer)); process.exit(1);
}
const vocabList = [];
for (const [tokStr, id] of Object.entries(tj.model.vocab)) vocabList[id] = tokStr;
for (let i = 0; i < vocabList.length; i++) if (vocabList[i] === undefined) vocabList[i] = "[UNK]";
const vocabEntry = putGz("vocab.txt", Buffer.from(vocabList.join("\n"), "utf-8"));
console.log(`[model] トークナイザ → ${vocabEntry.name} ${(vocabEntry.bytes / 1048576).toFixed(2)} MB (展開後 ${(vocabEntry.raw / 1048576).toFixed(2)} MB)`);

/* ---- onnxruntime-web の実行部 ----
   端末の対応に応じて1つだけ取得される (simd / threads の有無で選ばれる)。
   自前配信にするのは、CSP を外部CDNへ広げないため。 */
/* スレッドを使わない設定 (numThreads=1) で動かすので、
   threaded 版は配らない。SIMD の有無で1つだけ取得される。 */
const wasms = readdirSync(ORT_SRC).filter((f) => f.endsWith(".wasm") && !f.includes("threaded"));
for (const f of readdirSync(ORT_OUT)) if (f.endsWith(".wasm") && !wasms.includes(f)) unlinkSync(path.join(ORT_OUT, f));
for (const f of wasms) copyFileSync(path.join(ORT_SRC, f), path.join(ORT_OUT, f));
const wasmSizes = wasms.map((f) => ({ name: f, bytes: statSync(path.join(ORT_OUT, f)).size }));
console.log(`[model] onnxruntime-web の wasm ${wasms.length} 種 (実行時は1つだけ取得): ` +
  wasmSizes.map((w2) => `${w2.name} ${(w2.bytes / 1048576).toFixed(1)}MB`).join(", "));

/* ---- 目次 ----
   「実際に流れる量 (gzip後)」と「展開後の大きさ」を分けて持つ。
   画面に出す MB と進捗の分母は前者、整合の確認は後者を使う。 */
const tokBytes = vocabEntry.bytes;          /* 配信される大きさ (gzip後) */
const denseBytes = denseEntry.bytes;
const modelBytes = parts.reduce((a, p) => a + p.bytes, 0);
const rawModelBytes = parts.reduce((a, p) => a + p.raw, 0);   /* 展開後 = 元の ONNX の大きさ */
const typicalWasm = Math.max(...wasmSizes.map((w2) => w2.bytes));
/* 実行部は Cloudflare が brotli で圧縮して配る (実測)。
   画面に出すめやすは、実際に流れる量に近い gzip 後の値を使う。 */
const wasmOnWire = Math.min(...wasms.map((f) => gzip(readFileSync(path.join(ORT_OUT, f))).length));

writeFileSync(
  "app/text-model-meta.js",
  `// 自動生成: node scripts/package-text-model.mjs (手で編集しない)\n` +
  `// ⑦ 自由文検索の文章モデルの目次。\n` +
  `// sentence-transformers/clip-ViT-B-32-multilingual-v1 (Apache-2.0) を\n` +
  `// int8 量子化した ONNX。既存の画像ベクトルと同じ512次元へ投影される。\n` +
  `// Cloudflare Pages の 1ファイル 25 MiB 制限のため分割してある。\n` +
  `// 取得は「自由文で探す」を押したときだけ。通常の閲覧・概念語検索では取らない。\n` +
  `export const TEXT_MODEL_BASE = "/models/mclip";\n` +
  `export const TEXT_MODEL_PARTS = ${JSON.stringify(parts.map((p) => p.name))};\n` +
  `export const TEXT_MODEL_BYTES = ${modelBytes};\n` +
  `export const TEXT_DENSE_BYTES = ${denseBytes};\n` +
  `export const TEXT_TOKENIZER_BYTES = ${tokBytes};\n` +
  `export const ORT_WASM_BYTES = ${wasmOnWire};\n` +
  `/** 初回に流れる量のめやす (gzip後のモデル + Dense + トークナイザ + 実行部1つ) */\n` +
  `export const TEXT_MODEL_TOTAL_BYTES = ${modelBytes + denseBytes + tokBytes + wasmOnWire};\n` +
  `/** 進捗の分母。閲覧側が自分で数えられる分だけ (実行部は ORT が読むので数えられない)。\n` +
  ` *  gzip 後の値。画面の割合は「実際に受け取ったバイト数」で動く。 */\n` +
  `export const TEXT_DOWNLOAD_BYTES = ${modelBytes + denseBytes + tokBytes};\n` +
  `/** 展開後の ONNX の大きさ。つなぎ終わったものがこの値でなければ使わない */\n` +
  `export const TEXT_MODEL_RAW_BYTES = ${rawModelBytes};\n` +
  `/** ファイルごとの大きさ (gzip後)。取得済みを差し引いて「あと何MB要るか」を出す */\n` +
  `export const TEXT_MODEL_ASSET_BYTES = ${JSON.stringify(
    Object.fromEntries([...parts.map((p) => [p.name, p.bytes]), [denseEntry.name, denseBytes], [vocabEntry.name, tokBytes]])
  )};\n` +
  `/** 取得済みの置き場を分ける鍵。モデルを入れ替えると値が変わる */\n` +
  `export const TEXT_MODEL_VERSION = ${JSON.stringify(`gz-${modelBytes}-${denseBytes}-${tokBytes}`)};\n` +
  `export const TEXT_VOCAB_SIZE = ${vocabList.length};\n` +
  `export const TEXT_HIDDEN = 768;\n` +
  `export const TEXT_OUT = 512;\n` +
  `/** 実測で自由文検索を有効にする言語 (docs/search-languages.md)。\n` +
  ` *  ここに無い言語では自由文をモデルへ渡さず、概念語だけで検索する。 */\n` +
  `export const TEXT_MODEL_LANGS = ${JSON.stringify(ENABLED_LANGS)};\n`,
  "utf-8"
);

const total = modelBytes + denseBytes + tokBytes + wasmOnWire;
console.log(`[model] 初回に流れる量のめやす ${(total / 1048576).toFixed(1)} MB ` +
  `(ONNX ${(modelBytes / 1048576).toFixed(1)} + Dense ${(denseBytes / 1048576).toFixed(1)} + ` +
  `トークナイザ ${(tokBytes / 1048576).toFixed(1)} + 実行部 ${(wasmOnWire / 1048576).toFixed(1)})`);
console.log(`[model] 展開後は ${((rawModelBytes + denseEntry.raw + vocabEntry.raw) / 1048576).toFixed(1)} MB ` +
  `→ 圧縮して配ることで ${((rawModelBytes + denseEntry.raw + vocabEntry.raw - modelBytes - denseBytes - tokBytes) / 1048576).toFixed(1)} MB 減らしている`);
console.log(`[model] 自由文検索を有効にする言語 ${ENABLED_LANGS.length}/25: ${ENABLED_LANGS.join(", ")}`);

const tooBig = readdirSync(OUT).filter((f) => statSync(path.join(OUT, f)).size > 25 * 1024 * 1024);
if (tooBig.length) { console.error(`[model] 25 MiB を超えるファイルがある: ${tooBig.join(", ")}`); process.exit(1); }
console.log(`[model] ${OUT} のファイルはすべて 25 MiB 未満`);

/* ---- 自由文の変換を行う Worker を組み立てる ----
   重い処理を画面と同じスレッドで動かすと、読み込み中に操作が止まる。
   ES モジュールの Worker は束ね方によって onnxruntime-web が動かないので、
   公式に対応している古典 Worker + importScripts で組む。
   トークナイザは app/wordpiece.js を唯一の元にして埋め込む
   (別実装を持つと、検証したものと配るものがずれるため)。 */
copyFileSync(path.join(ORT_SRC, "ort.min.js"), path.join(ORT_OUT, "ort.min.js"));
const wordpiece = readFileSync("app/wordpiece.js", "utf-8")
  .replace(/^export\s+/gm, "");          /* 古典 Worker では import/export を使えない */

const workerBody = `/* 自動生成: node scripts/package-text-model.mjs (手で編集しない)
   元: app/wordpiece.js + scripts/package-text-model.mjs のひな形 */
importScripts("/ort/ort.min.js");
${wordpiece}

let session = null, tokenizer = null, dense = null, HIDDEN = 768, OUT = 512;

/* 取得済みの分を置いておく場所。
   2回目以降はここから読むので、通信は起きない (HTTPキャッシュ任せにしない)。
   使えない環境 (プライベートウィンドウなど) では素の fetch へ落とす。 */
async function openStore(version) {
  try {
    if (typeof caches === "undefined") return null;
    return await caches.open("mclip-" + version);
  } catch (e) { return null; }
}

/* 配信ファイルは gzip 済み。ここで戻す。
   Cloudflare Pages は octet-stream を圧縮しないので、圧縮は自分で持つしかない。
   20MB の分割片1つで約87ms (実測)。 */
async function gunzip(bytes) {
  const s = new Response(bytes).body.pipeThrough(new DecompressionStream("gzip"));
  return new Uint8Array(await new Response(s).arrayBuffer());
}

async function init(msg) {
  HIDDEN = msg.hidden; OUT = msg.out;
  if (typeof DecompressionStream === "undefined") {
    throw new Error("このブラウザは DecompressionStream に対応していない");
  }
  ort.env.wasm.wasmPaths = "/ort/";
  ort.env.wasm.numThreads = 1;
  const store = await openStore(msg.version);
  let loaded = 0;
  /* 進捗は実際に受け取ったバイト数 (= 圧縮された状態の量) だけで出す。
     展開後の大きさで数えると、実際より速く進んでいるように見えてしまう。 */
  const bump = (n) => { loaded += n; self.postMessage({ type: "progress", loaded, total: msg.total }); };
  const grab = async (name) => {
    const url = msg.base + "/" + name;
    let bytes = null;
    if (store) {
      const hit = await store.match(url);
      /* 置き場には圧縮したまま入れてある (端末の容量も節約できる) */
      if (hit) { const b = new Uint8Array(await hit.arrayBuffer()); bump(b.length); bytes = b; }
    }
    if (!bytes) {
      const res = await fetch(url);
      if (!res.ok) throw new Error(name + ": " + res.status);
      if (res.body && res.body.getReader) {
        /* 少しずつ数えて進捗を動かす (分割片の単位で飛ばない) */
        const reader = res.body.getReader();
        const got = [];
        let n = 0;
        for (;;) {
          const r = await reader.read();
          if (r.done) break;
          got.push(r.value); n += r.value.length; bump(r.value.length);
        }
        bytes = new Uint8Array(n);
        let at2 = 0;
        for (const c of got) { bytes.set(c, at2); at2 += c.length; }
      } else {
        bytes = new Uint8Array(await res.arrayBuffer());
        bump(bytes.length);
      }
      if (store) {
        /* 完全に受け取れた分だけ残す。途中で止めた分は残さない */
        try { await store.put(url, new Response(bytes)); } catch (e) {}
      }
    }
    return gunzip(bytes);
  };
  const chunks = [];
  for (const p of msg.parts) chunks.push(await grab(p));
  const size = chunks.reduce((a, c) => a + c.length, 0);
  /* 展開してつないだ結果が目次と合わなければ使わない。
     配信側が勝手に展開して返すようになった場合などに、黙って壊れないため。 */
  if (size !== msg.rawBytes) throw new Error("展開後の大きさが目次と合わない: " + size + " / " + msg.rawBytes);
  const model = new Uint8Array(size);
  let at = 0;
  for (const c of chunks) { model.set(c, at); at += c.length; }
  chunks.length = 0;
  const denseRaw = await grab("dense.bin.gz");
  dense = new Float32Array(denseRaw.buffer, denseRaw.byteOffset, denseRaw.length / 4);
  if (dense.length !== OUT * HIDDEN) throw new Error("Dense の大きさが目次と合わない");
  const vbuf = await grab("vocab.txt.gz");
  tokenizer = createTokenizer(new TextDecoder().decode(vbuf).split("\\n"));
  /* ここから先は総量が分からない (実行部の読み込みと初期化)。
     割合を作らず「準備中」として伝える */
  self.postMessage({ type: "phase", phase: "prepare" });
  session = await ort.InferenceSession.create(model, { executionProviders: ["wasm"] });
}

async function encode(text) {
  const enc = tokenizer.encode([String(text || "")], 128);
  const feeds = {};
  for (const name of session.inputNames) {
    feeds[name] = name === "token_type_ids"
      ? new ort.Tensor("int64", new BigInt64Array(enc.inputIds.length), enc.dims)
      : new ort.Tensor("int64", name === "attention_mask" ? enc.attentionMask : enc.inputIds, enc.dims);
  }
  const res = await session.run(feeds);
  const hs = res[session.outputNames[0]];
  const T = hs.dims[1], H = hs.dims[2];
  const pooled = new Float32Array(H);
  let n = 0;
  for (let k = 0; k < T; k++) {
    if (!Number(enc.attentionMask[k])) continue;
    n++;
    for (let h = 0; h < H; h++) pooled[h] += hs.data[k * H + h];
  }
  for (let h = 0; h < H; h++) pooled[h] /= (n || 1);
  const proj = new Float32Array(OUT);
  for (let o = 0; o < OUT; o++) {
    let s = 0; const b = o * H;
    for (let h = 0; h < H; h++) s += dense[b + h] * pooled[h];
    proj[o] = s;
  }
  let norm = 0;
  for (const x of proj) norm += x * x;
  norm = Math.sqrt(norm) || 1;
  for (let o = 0; o < OUT; o++) proj[o] /= norm;
  return proj;
}

self.onmessage = async (e) => {
  const msg = e.data || {};
  try {
    if (msg.type === "init") { await init(msg); self.postMessage({ type: "ready" }); }
    else if (msg.type === "encode") {
      if (!session) throw new Error("まだ準備できていない");
      const v = await encode(msg.text);
      self.postMessage({ type: "vector", id: msg.id, vector: v }, [v.buffer]);
    }
  } catch (err) {
    self.postMessage({ type: "error", id: msg.id, message: String((err && err.message) || err) });
  }
};
`;
writeFileSync(path.join(ORT_OUT, "text-worker.js"), workerBody, "utf-8");
console.log(`[model] Worker: ${ORT_OUT}/text-worker.js (${(statSync(path.join(ORT_OUT, "text-worker.js")).size / 1024).toFixed(0)} KB) + ort.min.js ${(statSync(path.join(ORT_OUT, "ort.min.js")).size / 1024).toFixed(0)} KB`);
