#!/usr/bin/env node
/**
 * ② 撮影地の代表点 → app/loc-points.js
 *
 *   node scripts/generate-loc-points.mjs [--force]
 *
 * 出典: 日本語版 Wikipedia の API (公開・認証不要・無料)。
 *   1つの問い合わせで「記事の座標 (P625 由来)」と「Wikidata の Q-ID」を取る。
 *
 * app/wikidata.js の既存 Q-ID は使わない。
 * 実測したところ 78件中61件が別物を指しており (知床→「スペース」、
 * 鎌倉→「タイプとトークンの区別」、金閣寺→メトロポリタン美術館 など)、
 * 出典として信頼できないため。
 *
 * 採用の条件 (推測で埋めないための検証):
 *   - 記事に座標があること
 *   - その都道府県の座標から 200km 以内にあること
 *     (同名の別地物・海外の地名を拾っていないかの確認)
 * どちらかを満たさないものは unknown に入れ、地図に出さない。
 *
 * 記録するもの:
 *   qid / title  どの記事から取ったか (取り違えの確認用)
 *   km           都道府県座標からの距離
 *   kind         "loc"  = その地物そのもの (寺・湖・展望台など)
 *                "area" = 市町村・半島・島など広い地域の代表点
 *
 * 広い地域名は代表点であって撮影地点ではない。
 * 写真1枚ごとの撮影位置は持たない (EXIF の精密な位置は公開しない)。
 */
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { PREFECTURES } from "../app/data.js";

const OUT = path.resolve("app", "loc-points.js");
const force = process.argv.includes("--force");
const UA = "landscapes-of-japan/1.0 (photography site; https://landscapes-of-japan.com)";
const AREA_WORDS = /(市|町|村|半島|島|郷|区|温泉|峠)$/;

/* 都道府県の座標からの許容距離。北海道と沖縄県は県域が広く、
   一律200kmだと正しい撮影地 (摩周湖264km・石垣島426km) まで棄却してしまう。 */
const MAX_KM = { "北海道": 500, "沖縄県": 700 };
const DEFAULT_MAX_KM = 200;
/* 日本の範囲。海外の同名地物を拾っていないかの最終確認 */
const IN_JAPAN = (lat, lng) => lat >= 20 && lat <= 46 && lng >= 122 && lng <= 154;

/* 記事名が撮影地名と違うもの。括弧つきの表記ゆれなどをここで吸収する */
const TITLE_OVERRIDE = {
  /* 市町村・広域 */
  "東京": "東京都", "沖縄": "那覇市", "福岡": "福岡市", "札幌": "札幌市",
  "釧路": "釧路市", "小樽": "小樽市", "室蘭": "室蘭市", "美唄": "美唄市",
  "登別": "登別市", "金沢": "金沢市", "横浜": "横浜市", "鎌倉": "鎌倉市",
  "品川": "品川区", "白糠": "白糠町", "積丹": "積丹町", "倶知安": "倶知安町",
  "日高": "日高町 (北海道)", "富良野": "富良野市", "別府": "別府市",
  "湯布院": "由布院温泉", "三段滝公園": "芦別市", "名越屋沈下橋": "いの町",
  /* 地物 */
  "阿寒": "阿寒湖", "知床": "知床半島",
  "さっぽろ雪まつり": "大通公園", "清水寺周辺": "清水寺", "法隆寺 夢殿": "法隆寺",
  "城山公園(松本市)": "城山公園 (松本市)", "高島公園(諏訪市)": "高島城",
  "松本市新村": "新村 (長野県)", "長野県天空の楽園": "阿智村",
  "おはらい町・おかげ横丁": "伊勢神宮", "夫婦岩": "二見興玉神社",
  "朝熊山展望台": "朝熊山", "亀老山展望台": "亀老山",
  "立石公園": "立石公園 (諏訪市)", "中町通り(松本市)": "松本市",
  "安養寺": "松本市", "駒つなぎの桜": "阿智村",
  /* 記事に座標が無いもの。市町村の代表点で代替し、kind=area として記録する */
  "高知城": "高知市",
  "円山動物園": "札幌市円山動物園",
};

const locPref = new Map();
for (const pf of PREFECTURES) for (const p of pf.photos) if (p.loc && !locPref.has(p.loc)) locPref.set(p.loc, pf);
const locs = [...locPref.keys()];

let prev = {}, prevMeta = {};
if (!force && existsSync(OUT)) {
  try {
    const m = await import(`file://${OUT}?t=${Date.now()}`);
    prev = { ...(m.LOC_POINTS || {}) };
    prevMeta = { ...(m.LOC_POINTS_SOURCE || {}) };
  } catch {}
}

const km = (a, b) => {
  const R = 6371, r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

/** 記事名 → { lat, lng, qid, title } (座標が無ければ null) */
async function fromWikipedia(title) {
  const url = "https://ja.wikipedia.org/w/api.php?action=query&format=json&formatversion=2" +
    "&prop=coordinates|pageprops&ppprop=wikibase_item&redirects=1&titles=" + encodeURIComponent(title);
  const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  const page = j.query?.pages?.[0];
  if (!page || page.missing) return null;
  const c = page.coordinates?.[0];
  if (!c) return null;
  return { lat: c.lat, lng: c.lon, qid: page.pageprops?.wikibase_item || null, title: page.title };
}

const points = {}, meta = {}, unknown = [];
let fetched = 0, reused = 0, rejected = 0;

for (const loc of locs) {
  if (prev[loc] && prevMeta[loc]) { points[loc] = prev[loc]; meta[loc] = prevMeta[loc]; reused++; continue; }
  const pf = locPref.get(loc);
  const prefPt = { lat: pf.lat, lng: pf.lng };
  const candidates = [TITLE_OVERRIDE[loc], loc].filter(Boolean);

  let got = null, why = "記事が見つからない、または座標が無い";
  for (const title of candidates) {
    let hit = null;
    for (let attempt = 0; attempt < 2 && !hit; attempt++) {
      try { hit = await fromWikipedia(title); }
      catch (e) { why = e.message; await new Promise((r) => setTimeout(r, 600)); }
    }
    if (!hit) continue;
    const d = km(prefPt, { lat: hit.lat, lng: hit.lng });
    const limit = MAX_KM[pf.pref] || DEFAULT_MAX_KM;
    if (!IN_JAPAN(hit.lat, hit.lng)) { why = `${hit.title} は日本の範囲外 — 取り違え`; rejected++; continue; }
    if (d > limit) { why = `${hit.title} は都道府県座標から ${d.toFixed(0)}km (許容 ${limit}km) — 取り違えの可能性`; rejected++; continue; }
    got = { ...hit, d };
    break;
  }
  await new Promise((r) => setTimeout(r, 150));

  if (!got) { unknown.push({ loc, why }); continue; }
  points[loc] = { lat: Math.round(got.lat * 1e5) / 1e5, lng: Math.round(got.lng * 1e5) / 1e5 };
    /* 撮影地名そのものが広域か、代替した記事が市町村なら「代表点」と記録する */
  const isArea = AREA_WORDS.test(loc) || AREA_WORDS.test(got.title) || got.title !== loc;
  meta[loc] = { qid: got.qid, title: got.title, km: Math.round(got.d), kind: isArea ? "area" : "loc" };
  fetched++;
}

const sorted = Object.keys(points).sort();
writeFileSync(
  OUT,
  `// 自動生成: node scripts/generate-loc-points.mjs (編集禁止)\n` +
  `// ② 撮影地の代表点。出典は日本語版 Wikipedia (LOC_POINTS_SOURCE に記事名と Q-ID)。\n` +
  `// 採用条件: 記事に座標があり、その都道府県の座標から200km以内にあること。\n` +
  `// kind: "loc" = その地物そのもの / "area" = 市町村・半島・島など広い地域の代表点。\n` +
  `// area は「その地域のどこか」を示す代表点であって撮影地点ではない。\n` +
  `// 写真1枚ごとの撮影位置は持たない (EXIF の精密な位置は公開しない)。\n` +
  `export const LOC_POINTS = {\n` +
  sorted.map((l) => `${JSON.stringify(l)}:{lat:${points[l].lat},lng:${points[l].lng}}`).join(",\n") +
  `\n};\n` +
  `export const LOC_POINTS_SOURCE = ${JSON.stringify(meta)};\n` +
  `// 座標を採用しなかった撮影地 (地図には出さない)\n` +
  `export const LOC_POINTS_UNKNOWN = ${JSON.stringify(unknown.map((u) => u.loc))};\n`,
  "utf-8"
);

console.log(`[loc-points] 撮影地 ${locs.length} / 取得 ${fetched} / 再利用 ${reused} / 採用せず ${unknown.length} (距離で棄却 ${rejected})`);
const areas = sorted.filter((l) => meta[l]?.kind === "area").length;
console.log(`  地物そのもの ${sorted.length - areas} / 広い地域の代表点 ${areas}`);
if (unknown.length) { console.log("  採用しなかったもの:"); for (const u of unknown) console.log(`    - ${u.loc}: ${u.why}`); }
