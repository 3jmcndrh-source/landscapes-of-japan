#!/usr/bin/env node
/**
 * 多言語テキストエンコーダの、言語ごとの実力を測る。
 *
 *   node scripts/eval-mclip-languages.mjs > docs/search-languages.md
 *
 * 測り方:
 *   同じ意味の問い合わせを25言語で書き、それぞれで写真を並べる。
 *   英語の結果を基準にして、上位20枚がどれだけ重なるかを見る。
 *   モデルの対応言語表ではなく、この写真集での実際の並びで判断する。
 *
 *   基準を英語にするのは、英語なら CLIP 本体 (画像ベクトルと同一空間) と
 *   照合済みで、意味的にも妥当な結果が出ることを確認しているため
 *   (scripts/verify-mclip.mjs)。
 *
 * この評価はローカルでだけ動く。
 */
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { env, AutoTokenizer } from "@xenova/transformers";
import { PREFECTURES, getLocName } from "../app/data.js";
import { LANGS } from "../app/i18n-meta.js";
import { VECTOR_IDS, VECTOR_DIM, VECTOR_SCALE } from "../app/vector-meta.js";

const require_ = createRequire(import.meta.url);
const ort = require_("onnxruntime-node");
env.cacheDir = "./.model-cache";
const DIR = ".model-cache/mclip";
const ONNX = `${DIR}/onnx_model_quint8_avx2.onnx`;
if (!existsSync(ONNX)) { console.error(`${ONNX} がありません`); process.exit(1); }

const imgBuf = readFileSync("public/search-vectors.bin");
const IMG = new Int8Array(imgBuf.buffer, imgBuf.byteOffset, imgBuf.length);
const loc = {};
for (const pf of PREFECTURES) for (const p of pf.photos) loc[p.id] = p.loc;

const session = await ort.InferenceSession.create(ONNX);
const tok = await AutoTokenizer.from_pretrained("sentence-transformers/clip-ViT-B-32-multilingual-v1");
const sBuf = readFileSync(`${DIR}/2_Dense_model.safetensors`);
const hLen = Number(sBuf.readBigUInt64LE(0));
const hdr = JSON.parse(sBuf.subarray(8, 8 + hLen).toString("utf-8"));
const [o0, o1] = hdr["linear.weight"].data_offsets;
const W = new Float32Array(sBuf.buffer.slice(sBuf.byteOffset + 8 + hLen + o0, sBuf.byteOffset + 8 + hLen + o1));

const normv = (a) => { let s = 0; for (const x of a) s += x * x; const n = Math.sqrt(s) || 1; return a.map((x) => x / n); };
async function encode(texts) {
  const enc = await tok(texts, { padding: true, truncation: true, max_length: 128 });
  const ids = enc.input_ids, mask = enc.attention_mask;
  const feeds = {};
  for (const name of session.inputNames) {
    const src = name === "attention_mask" ? mask : ids;
    feeds[name] = name === "token_type_ids"
      ? new ort.Tensor("int64", new BigInt64Array(ids.data.length), ids.dims)
      : new ort.Tensor("int64", BigInt64Array.from(Array.from(src.data, BigInt)), src.dims);
  }
  const out = await session.run(feeds);
  const hs = out[session.outputNames[0]];
  const [B, T, H] = hs.dims;
  const res = [];
  for (let b = 0; b < B; b++) {
    const pooled = new Float32Array(H);
    let n = 0;
    for (let t = 0; t < T; t++) {
      if (!Number(mask.data[b * T + t])) continue;
      n++;
      for (let h = 0; h < H; h++) pooled[h] += hs.data[(b * T + t) * H + h];
    }
    for (let h = 0; h < H; h++) pooled[h] /= (n || 1);
    const proj = new Float32Array(512);
    for (let o = 0; o < 512; o++) { let s = 0; for (let h = 0; h < H; h++) s += W[o * H + h] * pooled[h]; proj[o] = s; }
    res.push(normv(Array.from(proj)));
  }
  return res;
}
const rank = (vec) => {
  const out = [];
  for (let i = 0; i < VECTOR_IDS.length; i++) {
    let s = 0; const o = i * VECTOR_DIM;
    for (let k = 0; k < VECTOR_DIM; k++) s += IMG[o + k] * vec[k];
    out.push([VECTOR_IDS[i], s / VECTOR_SCALE]);
  }
  return out.sort((a, b) => b[1] - a[1]);
};

/* 評価に使う問い合わせ。調整に使っていない表現も混ぜる。
   6件 × 25言語。意味は各行で同じにそろえてある。 */
const QUERIES = [
  { key: "misty-mountain", ja: "霧のかかった山", en: "a mountain in the mist", zh: "雾中的山", "zh-tw": "霧中的山", ko: "안개 낀 산", es: "una montaña con niebla", fr: "une montagne dans la brume", de: "ein Berg im Nebel", pt: "uma montanha com névoa", it: "una montagna nella nebbia", ru: "гора в тумане", ar: "جبل في الضباب", hi: "कोहरे में पहाड़", th: "ภูเขาในหมอก", vi: "núi trong sương mù", id: "gunung berkabut", tr: "sisli bir dağ", nl: "een berg in de mist", pl: "góra we mgle", sv: "ett berg i dimma", fa: "کوهی در مه", he: "הר בערפל", bn: "কুয়াশায় ঢাকা পাহাড়", tl: "bundok na may hamog", uk: "гора в тумані" },
  { key: "sea-at-dusk", ja: "夕暮れの海", en: "the sea at dusk", zh: "黄昏的大海", "zh-tw": "黃昏的大海", ko: "황혼의 바다", es: "el mar al atardecer", fr: "la mer au crépuscule", de: "das Meer in der Abenddämmerung", pt: "o mar ao anoitecer", it: "il mare al tramonto", ru: "море на закате", ar: "البحر عند الغروب", hi: "शाम को समुद्र", th: "ทะเลยามพลบค่ำ", vi: "biển lúc hoàng hôn", id: "laut saat senja", tr: "alacakaranlıkta deniz", nl: "de zee in de schemering", pl: "morze o zmierzchu", sv: "havet i skymningen", fa: "دریا در غروب", he: "הים בין הערביים", bn: "সন্ধ্যার সমুদ্র", tl: "ang dagat sa dapit-hapon", uk: "море на заході сонця" },
  { key: "building-reflection", ja: "水面に映る建物", en: "a building reflected on the water", zh: "倒映在水面的建筑", "zh-tw": "倒映在水面的建築", ko: "물에 비친 건물", es: "un edificio reflejado en el agua", fr: "un bâtiment reflété sur l'eau", de: "ein Gebäude spiegelt sich im Wasser", pt: "um edifício refletido na água", it: "un edificio riflesso sull'acqua", ru: "здание, отражающееся в воде", ar: "مبنى ينعكس على الماء", hi: "पानी में प्रतिबिंबित इमारत", th: "อาคารสะท้อนบนน้ำ", vi: "tòa nhà phản chiếu trên mặt nước", id: "bangunan terpantul di air", tr: "suda yansıyan bir bina", nl: "een gebouw weerspiegeld in het water", pl: "budynek odbity w wodzie", sv: "en byggnad speglad i vattnet", fa: "ساختمانی منعکس در آب", he: "מבנה המשתקף במים", bn: "জলে প্রতিফলিত ভবন", tl: "gusaling nasasalamin sa tubig", uk: "будівля, відображена у воді" },
  { key: "lighthouse", ja: "灯台", en: "a lighthouse", zh: "灯塔", "zh-tw": "燈塔", ko: "등대", es: "un faro", fr: "un phare", de: "ein Leuchtturm", pt: "um farol", it: "un faro", ru: "маяк", ar: "منارة بحرية", hi: "प्रकाशस्तंभ", th: "ประภาคาร", vi: "ngọn hải đăng", id: "mercusuar", tr: "deniz feneri", nl: "een vuurtoren", pl: "latarnia morska", sv: "en fyr", fa: "فانوس دریایی", he: "מגדלור", bn: "বাতিঘর", tl: "parola", uk: "маяк" },
  { key: "snow-monkey", ja: "雪の中の動物", en: "an animal in the snow", zh: "雪中的动物", "zh-tw": "雪中的動物", ko: "눈 속의 동물", es: "un animal en la nieve", fr: "un animal dans la neige", de: "ein Tier im Schnee", pt: "um animal na neve", it: "un animale nella neve", ru: "животное на снегу", ar: "حيوان في الثلج", hi: "बर्फ में जानवर", th: "สัตว์ในหิมะ", vi: "một con vật trong tuyết", id: "hewan di salju", tr: "karda bir hayvan", nl: "een dier in de sneeuw", pl: "zwierzę na śniegu", sv: "ett djur i snön", fa: "حیوانی در برف", he: "חיה בשלג", bn: "তুষারে একটি প্রাণী", tl: "hayop sa niyebe", uk: "тварина на снігу" },
  { key: "night-city", ja: "夜の街の明かり", en: "city lights at night", zh: "夜晚的城市灯光", "zh-tw": "夜晚的城市燈光", ko: "밤의 도시 불빛", es: "luces de la ciudad de noche", fr: "les lumières de la ville la nuit", de: "Stadtlichter bei Nacht", pt: "luzes da cidade à noite", it: "luci della città di notte", ru: "огни города ночью", ar: "أضواء المدينة ليلاً", hi: "रात में शहर की रोशनी", th: "แสงไฟเมืองยามค่ำคืน", vi: "ánh đèn thành phố về đêm", id: "lampu kota di malam hari", tr: "gece şehir ışıkları", nl: "stadslichten in de nacht", pl: "światła miasta nocą", sv: "stadens ljus på natten", fa: "چراغ‌های شهر در شب", he: "אורות העיר בלילה", bn: "রাতে শহরের আলো", tl: "mga ilaw ng lungsod sa gabi", uk: "вогні міста вночі" },
];

const K = 20;
const result = {};   /* lang → [{id, agree}] */
for (const q of QUERIES) {
  const texts = LANGS.map((l) => q[l]).filter(Boolean);
  const vecs = await encode(LANGS.map((l) => q[l] || q.en));
  const refIdx = LANGS.indexOf("en");
  const ref = rank(vecs[refIdx]).slice(0, K).map(([id]) => id);
  LANGS.forEach((l, i) => {
    const r = rank(vecs[i]).slice(0, K).map(([id]) => id);
    (result[l] = result[l] || []).push({ key: q.key, agree: r.filter((x) => ref.includes(x)).length, top: rank(vecs[i]).slice(0, 3).map(([id]) => loc[id]) });
  });
  if (texts.length !== LANGS.length) console.error(`  ! ${q.key}: 訳が足りない言語がある`);
}

const avg = (l) => result[l].reduce((a, r) => a + r.agree, 0) / result[l].length;
const GOOD = 12;   /* 上位20のうち12件以上が英語と重なれば「使える」とみなす */

console.log("# 見た目から探す — 言語ごとの実力");
console.log("");
console.log(`測定: \`node scripts/eval-mclip-languages.mjs\` / ${new Date().toISOString().slice(0, 10)}`);
console.log("");
console.log("## 方式");
console.log("");
console.log("2段構えになっている。");
console.log("");
console.log("1. **概念語** (26語 + 2語の組み合わせ325通り)。ビルド時に文と画像の近さを計算済み。");
console.log("   モデルの読み込みは不要で、25言語すべてで同じように動く。");
console.log("   「霧のかかった山」のような、語彙の範囲内の複合表現はここで処理する。");
console.log("2. **自由文** (語彙に無い表現)。`sentence-transformers/clip-ViT-B-32-multilingual-v1`");
console.log("   (Apache-2.0) をブラウザへ遅延読み込みし、入力文を512次元へ変換して写真と比べる。");
console.log("   入力文は端末の中だけで処理し、外部へ送らない。");
console.log("");
console.log("## 言語ごとの測定");
console.log("");
console.log(`同じ意味の問い合わせ ${QUERIES.length}件を25言語で書き、上位${K}枚が英語の結果とどれだけ重なるかを見た。`);
console.log("英語を基準にするのは、英語では CLIP 本体 (画像ベクトルと同じ空間) と照合済みで、");
console.log("意味的にも妥当な結果が出ることを確認しているため。");
console.log("");
console.log(`**自由文検索を有効にする基準: 平均 ${GOOD}/${K} 以上。** 下回る言語では自由文をモデルに渡さず、`);
console.log("概念語だけで検索する (合わない結果を「対応済み」として出さないため)。");
console.log("");
console.log("| 言語 | 平均一致 (/" + K + ") | " + QUERIES.map((q) => q.key).join(" | ") + " | 自由文検索 |");
console.log(`|---|---|${QUERIES.map(() => "---").join("|")}|---|`);
const enabled = [];
for (const l of LANGS) {
  const a = avg(l);
  const on = a >= GOOD;
  if (on) enabled.push(l);
  console.log(`| ${l} | **${a.toFixed(1)}** | ${result[l].map((r) => r.agree).join(" | ")} | ${on ? "有効" : "無効 (概念語のみ)"} |`);
}
console.log("");
console.log(`自由文検索を有効にする言語: ${enabled.length}/${LANGS.length} — ${enabled.join(", ")}`);
console.log(`概念語のみの言語: ${LANGS.filter((l) => !enabled.includes(l)).join(", ") || "なし"}`);
console.log("");
console.log("```json");
console.log(JSON.stringify(enabled));
console.log("```");
