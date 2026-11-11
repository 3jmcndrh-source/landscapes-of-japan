#!/usr/bin/env node
/**
 * 訪問者がどこから来ているかを1回で見る (読み取り専用)。
 *
 *   node scripts/analytics/traffic-sources.mjs [--days=28]
 *
 * Search Console: 検索の種類ごと (ウェブ / 画像 / Discover) の表示回数・クリック、
 *                 上位の検索語・ページ・国・端末
 * GA4:            流入経路 (検索 / 直接 / 参照 / SNS)、参照元、国、入口になったページ
 *
 * 施策を考える前に「いま何が効いていて、何が効いていないか」を数字で確かめるためのもの。
 * Clarity は叩かない (1日10回の制限があるため。daily-report.mjs が使う)。
 */
import { getToken } from "./google-auth.mjs";

const GSC_PROPERTY = "sc-domain:landscapes-of-japan.com";
const GA4_PROPERTY = "552016515";
const days = Number((process.argv.find((a) => a.startsWith("--days=")) || "").split("=")[1]) || 28;

const fmt = (d) => d.toISOString().slice(0, 10);
const end = new Date(Date.now() - 2 * 864e5);          /* Search Console は2日ほど遅れる */
const start = new Date(end.getTime() - (days - 1) * 864e5);
const prevEnd = new Date(start.getTime() - 864e5);
const prevStart = new Date(prevEnd.getTime() - (days - 1) * 864e5);

const gscTok = await getToken("https://www.googleapis.com/auth/webmasters.readonly");
async function gsc(body) {
  const r = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_PROPERTY)}/searchAnalytics/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${gscTok}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const j = await r.json();
  if (j.error) return { error: j.error.message };
  return j;
}
const row = (r) => `${String(r.clicks).padStart(5)} クリック ${String(r.impressions).padStart(7)} 表示  CTR ${((r.ctr || 0) * 100).toFixed(1).padStart(4)}%${r.position != null ? `  順位 ${r.position.toFixed(1).padStart(5)}` : ""}`;   /* Discover には順位が無い */

console.log(`# Search Console  ${fmt(start)} 〜 ${fmt(end)} (${days}日) / 比較 ${fmt(prevStart)} 〜 ${fmt(prevEnd)}`);
for (const type of ["web", "image", "discover", "news", "video"]) {
  const [cur, prev] = await Promise.all([
    gsc({ startDate: fmt(start), endDate: fmt(end), type }),
    gsc({ startDate: fmt(prevStart), endDate: fmt(prevEnd), type }),
  ]);
  const c = cur.rows?.[0], p = prev.rows?.[0];
  if (cur.error) { console.log(`  ${type.padEnd(8)} 取得できない: ${cur.error.slice(0, 80)}`); continue; }
  console.log(`  ${type.padEnd(8)} ${c ? row(c) : "    0 クリック       0 表示"}   (前の期間: ${p ? `${p.clicks} クリック / ${p.impressions} 表示` : "0"})`);
}

for (const type of ["web", "image"]) {
  console.log(`\n## ${type === "web" ? "ウェブ検索" : "画像検索"}`);
  for (const [dim, n, label] of [["query", 25, "検索語"], ["page", 20, "ページ"], ["country", 12, "国"], ["device", 3, "端末"]]) {
    const r = await gsc({ startDate: fmt(start), endDate: fmt(end), type, dimensions: [dim], rowLimit: n });
    console.log(`### ${label} 上位`);
    for (const x of r.rows || []) console.log(`  ${row(x)}  ${String(x.keys[0]).replace("https://landscapes-of-japan.com", "").slice(0, 70)}`);
    if (!r.rows?.length) console.log("  (なし)");
  }
}

/* 表示は多いのにクリックされていないページ (ウェブ + 画像)。題名や見え方に伸びしろがある */
for (const type of ["web", "image"]) {
  const r = await gsc({ startDate: fmt(start), endDate: fmt(end), type, dimensions: ["page"], rowLimit: 2000 });
  const rows = r.rows || [];
  const kind = (u) => {
    const s = u.replace("https://landscapes-of-japan.com", "").split("?")[0].split("/").filter(Boolean);
    if (s.length <= 1) return "トップ";
    if (s[1] === "collections") return "コレクション";
    if (s[1] === "gallery") return "ギャラリー";
    if (["explore", "search", "album", "overview", "random", "all-prefectures"].includes(s[1])) return s[1];
    return s.length === 2 ? "都道府県" : s.length === 3 ? "撮影地" : "写真詳細";
  };
  const agg = {};
  const langAgg = {};
  for (const x of rows) {
    const k = kind(x.keys[0]);
    agg[k] = agg[k] || { pages: 0, clicks: 0, impressions: 0 };
    agg[k].pages++; agg[k].clicks += x.clicks; agg[k].impressions += x.impressions;
    const lang = x.keys[0].replace("https://landscapes-of-japan.com/", "").split("/")[0] || "?";
    langAgg[lang] = langAgg[lang] || { clicks: 0, impressions: 0 };
    langAgg[lang].clicks += x.clicks; langAgg[lang].impressions += x.impressions;
  }
  console.log(`\n## ${type === "web" ? "ウェブ検索" : "画像検索"}: ページの種類ごと (表示のあったページ ${rows.length})`);
  for (const [k, v] of Object.entries(agg).sort((a, b) => b[1].impressions - a[1].impressions)) console.log(`  ${k.padEnd(10)} ${String(v.pages).padStart(5)}ページ ${String(v.clicks).padStart(5)} クリック ${String(v.impressions).padStart(7)} 表示`);
  console.log(`### 言語ごと`);
  console.log("  " + Object.entries(langAgg).sort((a, b) => b[1].impressions - a[1].impressions).map(([l, v]) => `${l} ${v.clicks}/${v.impressions}`).join("  "));
}

/* ---- GA4 ---- */
const gaTok = await getToken("https://www.googleapis.com/auth/analytics.readonly");
async function ga(body) {
  const r = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${gaTok}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return r.json();
}
const gaEnd = new Date(Date.now() - 864e5), gaStart = new Date(gaEnd.getTime() - (days - 1) * 864e5);
const range = [{ startDate: fmt(gaStart), endDate: fmt(gaEnd) }];
console.log(`\n# GA4  ${fmt(gaStart)} 〜 ${fmt(gaEnd)}`);
for (const [dim, label, n] of [
  ["sessionDefaultChannelGroup", "流入経路", 10], ["sessionSource", "参照元", 15], ["country", "国", 12],
  ["landingPage", "入口になったページ", 15], ["deviceCategory", "端末", 3],
]) {
  const r = await ga({ dateRanges: range, dimensions: [{ name: dim }], metrics: [{ name: "sessions" }, { name: "engagedSessions" }, { name: "activeUsers" }], orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: n });
  console.log(`## ${label}`);
  if (r.error) { console.log("  取得できない: " + r.error.message.slice(0, 100)); continue; }
  for (const x of r.rows || []) console.log(`  ${String(x.metricValues[0].value).padStart(5)} セッション (うち関与 ${String(x.metricValues[1].value).padStart(4)})  ${String(x.metricValues[2].value).padStart(5)} 人  ${x.dimensionValues[0].value.slice(0, 70)}`);
}
