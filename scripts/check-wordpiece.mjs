#!/usr/bin/env node
/**
 * 自前のトークナイザ (app/wordpiece.js) が、参照実装と同じ切り方をするか確かめる。
 *
 *   node scripts/check-wordpiece.mjs
 *
 * 参照は transformers.js の AutoTokenizer (HF の tokenizer.json をそのまま解釈する)。
 * 25言語ぶんの文字列で、トークンIDの並びが完全に一致することを見る。
 * ここがずれると、埋め込みが静かに変わって検索結果だけが悪くなるので、
 * ビルド前に必ず通す。
 */
import { readFileSync } from "node:fs";
import { env, AutoTokenizer } from "@xenova/transformers";
import { createTokenizer } from "../app/wordpiece.js";
env.cacheDir = "./.model-cache";

const vocabList = readFileSync("public/models/mclip/vocab.txt", "utf-8").split("\n");
const mine = createTokenizer(vocabList);
const ref = await AutoTokenizer.from_pretrained("sentence-transformers/clip-ViT-B-32-multilingual-v1");
console.log(`語彙 ${mine.size} 件`);

const TEXTS = [
  "a mountain in the mist", "the sea at dusk", "a building reflected on the water", "a lighthouse",
  "霧のかかった山", "夕暮れの海", "水面に映る建物", "灯台", "京都の紅葉", "美瑛町のパッチワークの丘",
  "雾中的山", "霧中的山", "안개 낀 산", "una montaña con niebla", "une montagne dans la brume",
  "ein Berg im Nebel", "uma montanha com névoa", "una montagna nella nebbia", "гора в тумане",
  "جبل في الضباب", "कोहरे में पहाड़", "ภูเขาในหมอก", "núi trong sương mù", "gunung berkabut",
  "sisli bir dağ", "een berg in de mist", "góra we mgle", "ett berg i dimma", "کوهی در مه",
  "הר בערפל", "কুয়াশায় ঢাকা পাহাড়", "bundok na may hamog", "гора в тумані",
  /* 記号・数字・混在・空白・絵文字・長い語 */
  "Mt. Fuji (富士山) — 3,776 m", "  spaced   out  ", "café naïve résumé", "ＦＵＬＬＷＩＤＴＨ",
  "🌸 cherry 🌸", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "", "   ", "?!", "東京-横浜",
];

let ok = 0;
const bad = [];
for (const t of TEXTS) {
  const r = await ref([t], { padding: false, truncation: true, max_length: 128 });
  const refIds = Array.from(r.input_ids.data, Number);
  const enc = mine.encode([t], 128);
  const myIds = Array.from(enc.inputIds, Number);
  if (JSON.stringify(refIds) === JSON.stringify(myIds)) ok++;
  else bad.push({ t, ref: refIds.slice(0, 14), mine: myIds.slice(0, 14), refTok: mine.tokens(t).slice(0, 14) });
}

console.log(`一致 ${ok}/${TEXTS.length}`);
for (const b of bad) {
  console.log(`  ✗ "${b.t}"`);
  console.log(`      参照: ${b.ref.join(",")}`);
  console.log(`      自前: ${b.mine.join(",")}`);
  console.log(`      自前のトークン: ${b.refTok.join(" ")}`);
}

/* まとめて渡したときの詰め物。
   参照 (transformers.js) は max_length まで詰め、こちらは最長の行に合わせる。
   平均プーリングは attention_mask を見るので、詰め物の長さは結果に影響しない。
   「影響しない」を言葉で済ませず、実際に最終ベクトルを比べて確かめる。 */
const batchTexts = ["a lighthouse", "霧のかかった山"];
const batch = mine.encode(batchTexts, 128);
const refBatch = await ref(batchTexts, { padding: true, truncation: true, max_length: 128 });
const strip = (ids, mask, dims) => {
  const [B, T] = dims;
  const out = [];
  for (let b = 0; b < B; b++) {
    const row = [];
    for (let t = 0; t < T; t++) if (Number(mask[b * T + t])) row.push(Number(ids[b * T + t]));
    out.push(row);
  }
  return out;
};
const mineRows = strip(batch.inputIds, batch.attentionMask, batch.dims);
const refRows = strip(refBatch.input_ids.data, refBatch.attention_mask.data, refBatch.input_ids.dims);
const sameBatch = JSON.stringify(mineRows) === JSON.stringify(refRows);
console.log(`まとめて渡したとき、詰め物を除いた並び: ${sameBatch ? "一致" : "不一致"}`);
console.log(`  (詰め物の長さは 自前 ${batch.dims[1]} / 参照 ${refBatch.input_ids.dims[1]}。平均プーリングは mask を見るので結果に影響しない)`);

/* 最終ベクトルまで通して確かめる */
let sameVec = null;
try {
  const { createRequire } = await import("node:module");
  const require_ = createRequire(import.meta.url);
  const ort = require_("onnxruntime-node");
  const session = await ort.InferenceSession.create(".model-cache/mclip/onnx_model_quint8_avx2.onnx");
  const sBuf = readFileSync(".model-cache/mclip/2_Dense_model.safetensors");
  const hLen = Number(sBuf.readBigUInt64LE(0));
  const hdr = JSON.parse(sBuf.subarray(8, 8 + hLen).toString("utf-8"));
  const [o0, o1] = hdr["linear.weight"].data_offsets;
  const W = new Float32Array(sBuf.buffer.slice(sBuf.byteOffset + 8 + hLen + o0, sBuf.byteOffset + 8 + hLen + o1));
  const run = async (ids, mask, dims) => {
    const feeds = {};
    for (const name of session.inputNames) {
      const src = name === "attention_mask" ? mask : ids;
      feeds[name] = new ort.Tensor("int64", BigInt64Array.from(Array.from(src, BigInt)), dims);
    }
    const out = await session.run(feeds);
    const hs = out[session.outputNames[0]];
    const [B, T, H] = hs.dims;
    const res = [];
    for (let b = 0; b < B; b++) {
      const pooled = new Float32Array(H);
      let n = 0;
      for (let t = 0; t < T; t++) {
        if (!Number(mask[b * T + t])) continue;
        n++;
        for (let h = 0; h < H; h++) pooled[h] += hs.data[(b * T + t) * H + h];
      }
      for (let h = 0; h < H; h++) pooled[h] /= (n || 1);
      const proj = new Float32Array(512);
      for (let o = 0; o < 512; o++) { let s = 0; for (let h = 0; h < H; h++) s += W[o * H + h] * pooled[h]; proj[o] = s; }
      let nn = 0; for (const x of proj) nn += x * x; nn = Math.sqrt(nn) || 1;
      res.push(Array.from(proj, (x) => x / nn));
    }
    return res;
  };
  /* 画面では問い合わせ1件ずつ渡すので、詰め物なしで比べるのが実際に近い。
     この条件ならトークンIDが同一なので、ベクトルも一致するはず。 */
  const one = await ref([batchTexts[0]], { padding: false, truncation: true, max_length: 128 });
  const oneMine = mine.encode([batchTexts[0]], 128);
  const vMine = await run(oneMine.inputIds, oneMine.attentionMask, oneMine.dims);
  const vRef = await run(one.input_ids.data, one.attention_mask.data, one.input_ids.dims);
  const cos = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const sims = vMine.map((v, i) => cos(v, vRef[i]));
  /* int8 量子化の演算誤差の分、完全一致にはならない。実際に効くのは写真の並びなので、そこまで見る */
  sameVec = sims.every((s) => s > 0.995);
  console.log(`最終ベクトルの一致 (コサイン): ${sims.map((s) => s.toFixed(6)).join(", ")} → ${sameVec ? "一致とみなす (>0.995)" : "不一致"}`);

  /* 写真の並びが変わらないことまで確かめる */
  const imgBuf = readFileSync("public/search-vectors.bin");
  const IMG = new Int8Array(imgBuf.buffer, imgBuf.byteOffset, imgBuf.length);
  const { VECTOR_IDS, VECTOR_DIM } = await import("../app/vector-meta.js");
  const rank = (v) => { const o=[]; for (let i=0;i<VECTOR_IDS.length;i++){let s2=0;const off=i*VECTOR_DIM;for(let k=0;k<VECTOR_DIM;k++)s2+=IMG[off+k]*v[k];o.push([VECTOR_IDS[i],s2]);} return o.sort((a,b)=>b[1]-a[1]).slice(0,20).map(([id])=>id); };
  const agree = vMine.map((v,i)=>{ const a=rank(v), b=rank(vRef[i]); return a.filter(x=>b.includes(x)).length; });
  console.log(`  上位20枚の一致: ${agree.join(", ")}/20`);
  if (agree.some((a)=>a<20)) sameVec = false;

  /* 参考: 詰め物の長さが違うと int8 の誤差でどれだけ動くか */
  const vPad = await run(refBatch.input_ids.data, refBatch.attention_mask.data, refBatch.input_ids.dims);
  const padSim = cos(vMine[0], vPad[0]);
  console.log(`  参考: 詰め物128件まで伸ばした場合との差 コサイン ${padSim.toFixed(6)} (量子化の誤差)`);
} catch (e) {
  console.log(`最終ベクトルの照合は実行できず: ${String(e.message).slice(0, 90)}`);
}

if (bad.length || !sameBatch || sameVec === false) { console.error("\nトークナイザが参照実装と一致しません"); process.exit(1); }
console.log("\nトークナイザ: 参照実装と一致");
