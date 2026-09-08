#!/usr/bin/env node
/**
 * 多言語テキストエンコーダの検証。
 *
 *   node scripts/verify-mclip.mjs
 *
 * 確かめること:
 *   1. ONNX + 平均プーリング + Dense(768→512) を自前で組んだ結果が、
 *      既存の画像ベクトルと同じ空間に載っているか。
 *      「次元が同じ」では確認にならないので、次の2つで見る。
 *        a. 英語入力について、CLIP 本体の文章側 (既存の画像ベクトルと同一空間、
 *           整列が保証されている) と、写真の並び順がどれだけ一致するか
 *        b. 各言語の入力で、上位に出る写真の撮影地が妥当か
 *   2. 25言語で実際に検索できるか (bn / tl を含む)
 *
 * この検証はローカルでだけ動く。閲覧者へは別途ブラウザ実装で配る。
 */
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
const require_ = createRequire(import.meta.url);
const ort = require_("onnxruntime-node");
import { env, AutoTokenizer, CLIPTextModelWithProjection } from "@xenova/transformers";
import { PREFECTURES, getLocName } from "../app/data.js";
import { VECTOR_IDS, VECTOR_DIM, VECTOR_SCALE } from "../app/vector-meta.js";

env.cacheDir = "./.model-cache";
const DIR = ".model-cache/mclip";
const ONNX = `${DIR}/onnx_model_quint8_avx2.onnx`;
if (!existsSync(ONNX)) { console.error(`${ONNX} がありません`); process.exit(1); }

/* ---- 画像ベクトル (配信しているものと同じ int8) ---- */
const imgBuf = readFileSync("public/search-vectors.bin");
const IMG = new Int8Array(imgBuf.buffer, imgBuf.byteOffset, imgBuf.length);
const loc = {};
for (const pf of PREFECTURES) for (const p of pf.photos) loc[p.id] = p.loc;

const rank = (vec) => {
  const out = [];
  for (let i = 0; i < VECTOR_IDS.length; i++) {
    let s = 0;
    const o = i * VECTOR_DIM;
    for (let k = 0; k < VECTOR_DIM; k++) s += IMG[o + k] * vec[k];
    out.push([VECTOR_IDS[i], s / VECTOR_SCALE]);
  }
  return out.sort((a, b) => b[1] - a[1]);
};
const normv = (a) => { let s = 0; for (const x of a) s += x * x; const n = Math.sqrt(s) || 1; return a.map((x) => x / n); };

/* ---- 多言語エンコーダ ---- */
console.log("[verify] ONNX 読み込み中…");
const t0 = Date.now();
const session = await ort.InferenceSession.create(ONNX);
console.log(`[verify] 読み込み ${((Date.now() - t0) / 1000).toFixed(1)}秒 / 入力 ${session.inputNames.join(",")} / 出力 ${session.outputNames.join(",")}`);

const tok = await AutoTokenizer.from_pretrained("sentence-transformers/clip-ViT-B-32-multilingual-v1");

/* Dense(768→512, bias なし) */
const sBuf = readFileSync(`${DIR}/2_Dense_model.safetensors`);
const hLen = Number(sBuf.readBigUInt64LE(0));
const hdr = JSON.parse(sBuf.subarray(8, 8 + hLen).toString("utf-8"));
const [off0, off1] = hdr["linear.weight"].data_offsets;
const W = new Float32Array(sBuf.buffer.slice(sBuf.byteOffset + 8 + hLen + off0, sBuf.byteOffset + 8 + hLen + off1));
console.log(`[verify] Dense 重み ${hdr["linear.weight"].shape.join("x")} = ${W.length} 要素`);

async function encode(texts) {
  const enc = await tok(texts, { padding: true, truncation: true, max_length: 128 });
  const ids = enc.input_ids, mask = enc.attention_mask;
  const feeds = {};
  for (const name of session.inputNames) {
    if (name === "input_ids") feeds[name] = new ort.Tensor("int64", BigInt64Array.from(Array.from(ids.data, BigInt)), ids.dims);
    else if (name === "attention_mask") feeds[name] = new ort.Tensor("int64", BigInt64Array.from(Array.from(mask.data, BigInt)), mask.dims);
    else if (name === "token_type_ids") feeds[name] = new ort.Tensor("int64", new BigInt64Array(ids.data.length), ids.dims);
  }
  const out = await session.run(feeds);
  const hs = out[session.outputNames[0]];
  const [B, T, H] = hs.dims;
  const res = [];
  for (let b = 0; b < B; b++) {
    /* 平均プーリング (attention_mask で重み付け) */
    const pooled = new Float32Array(H);
    let n = 0;
    for (let t = 0; t < T; t++) {
      const m = Number(mask.data[b * T + t]);
      if (!m) continue;
      n++;
      for (let h = 0; h < H; h++) pooled[h] += hs.data[(b * T + t) * H + h];
    }
    for (let h = 0; h < H; h++) pooled[h] /= (n || 1);
    /* Dense: W は [512, 768] */
    const proj = new Float32Array(512);
    for (let o = 0; o < 512; o++) {
      let s = 0;
      for (let h = 0; h < H; h++) s += W[o * H + h] * pooled[h];
      proj[o] = s;
    }
    res.push(normv(Array.from(proj)));
  }
  return res;
}

/* ---- 1a. 英語で CLIP 本体と比べる ---- */
console.log("\n=== 1a. 英語入力: CLIP本体 と 多言語版 の一致 ===");
const clipTok = await AutoTokenizer.from_pretrained("Xenova/clip-vit-base-patch32");
const clipTxt = await CLIPTextModelWithProjection.from_pretrained("Xenova/clip-vit-base-patch32", { quantized: true });
async function clipEncode(texts) {
  const o = await clipTxt(await clipTok(texts, { padding: true, truncation: true }));
  const [, d] = o.text_embeds.dims;
  return texts.map((_, i) => normv(Array.from(o.text_embeds.data.slice(i * d, (i + 1) * d))));
}

const enTests = [
  "a photo of a mountain covered in mist and fog",
  "the sea at sunset",
  "a building reflected on the water surface",
  "a lighthouse",
  "cherry blossoms in front of a castle",
  "a red bridge in autumn",
];
const mEn = await encode(enTests);
const cEn = await clipEncode(enTests);
let sumTop10 = 0, sumTop30 = 0;
for (let i = 0; i < enTests.length; i++) {
  const rm = rank(mEn[i]).slice(0, 30).map(([id]) => id);
  const rc = rank(cEn[i]).slice(0, 30).map(([id]) => id);
  const o10 = rm.slice(0, 10).filter((x) => rc.slice(0, 10).includes(x)).length;
  const o30 = rm.filter((x) => rc.includes(x)).length;
  sumTop10 += o10; sumTop30 += o30;
  console.log(`  "${enTests[i]}"`);
  console.log(`     上位10の一致 ${o10}/10  上位30の一致 ${o30}/30`);
  console.log(`     多言語版: ${rank(mEn[i]).slice(0, 5).map(([id]) => loc[id]).join(", ")}`);
  console.log(`     CLIP本体: ${rank(cEn[i]).slice(0, 5).map(([id]) => loc[id]).join(", ")}`);
}
console.log(`  平均: 上位10で ${(sumTop10 / enTests.length).toFixed(1)}/10、上位30で ${(sumTop30 / enTests.length).toFixed(1)}/30 が一致`);

/* ---- 2. 25言語 ---- */
console.log("\n=== 2. 各言語で「霧のかかった山」相当を入力 ===");
const misty = {
  ja: "霧のかかった山", en: "a mountain in the mist", zh: "雾中的山", "zh-tw": "霧中的山", ko: "안개 낀 산",
  es: "una montaña con niebla", fr: "une montagne dans la brume", de: "ein Berg im Nebel", pt: "uma montanha com névoa",
  it: "una montagna nella nebbia", ru: "гора в тумане", ar: "جبل في الضباب", hi: "कोहरे में पहाड़",
  th: "ภูเขาในหมอก", vi: "núi trong sương mù", id: "gunung berkabut", tr: "sisli bir dağ",
  nl: "een berg in de mist", pl: "góra we mgle", sv: "ett berg i dimma", fa: "کوهی در مه",
  he: "הר בערפל", bn: "কুয়াশায় ঢাকা পাহাড়", tl: "bundok na may hamog", uk: "гора в тумані",
};
const langs = Object.keys(misty);
const mAll = await encode(langs.map((l) => misty[l]));
const refIds = rank(mAll[langs.indexOf("en")]).slice(0, 20).map(([id]) => id);
for (let i = 0; i < langs.length; i++) {
  const r = rank(mAll[i]).slice(0, 20).map(([id]) => id);
  const agree = r.filter((x) => refIds.includes(x)).length;
  console.log(`  ${langs[i].padEnd(6)} 英語と上位20で ${String(agree).padStart(2)}/20 一致  ${rank(mAll[i]).slice(0, 4).map(([id]) => loc[id]).join(", ")}`);
}

/* ---- 3. 語彙にない表現 ---- */
console.log("\n=== 3. 既存26概念に無い表現 ===");
const oov = [["ja", "夕暮れの海"], ["ja", "水面に映る建物"], ["en", "a lighthouse"], ["de", "ein Leuchtturm"], ["ar", "منارة"], ["bn", "বাতিঘর"], ["tl", "parola sa dagat"]];
const mOov = await encode(oov.map(([, t]) => t));
for (let i = 0; i < oov.length; i++) {
  console.log(`  ${oov[i][0]} "${oov[i][1]}" → ${rank(mOov[i]).slice(0, 6).map(([id, s]) => `${loc[id]}(${s.toFixed(3)})`).join(", ")}`);
}
