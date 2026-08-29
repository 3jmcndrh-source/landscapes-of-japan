/**
 * 毎朝の訪問者レポート: GA4 (実際の閲覧者) + Microsoft Clarity (行動の質) を
 * 1つの日本語サマリーにまとめて標準出力へ出す。
 *
 *   node scripts/analytics/daily-report.mjs [--json]
 *
 * 前提:
 *   .env に CLARITY_API_TOKEN / CLARITY_PROJECT_ID / GA4_PROPERTY_ID
 *   gsc-service-account.json が GA4 プロパティの「閲覧者」であること
 *
 * 注意: Clarity API は 1プロジェクト1日10回まで。毎朝1回の実行を前提にしている。
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getToken } from "./google-auth.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const env = Object.fromEntries(
  readFileSync(path.join(ROOT, ".env"), "utf-8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i), l.slice(i + 1)]; })
);

const PROPERTY = env.GA4_PROPERTY_ID;
const GA_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

/* ── GA4 ── */
async function ga(body) {
  const t = await getToken(GA_SCOPE);
  const r = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`GA4 ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

const num = (v) => Number(v ?? 0);
const rows = (res) => (res.rows || []).map((row) => ({
  keys: (row.dimensionValues || []).map((d) => d.value),
  vals: (row.metricValues || []).map((m) => num(m.value)),
}));
const total = (res, i = 0) => num(res.totals?.[0]?.metricValues?.[i]?.value);

/** 昨日と一昨日を JST で求める (GA4 のタイムゾーンは Asia/Tokyo 設定済み) */
function jstDates() {
  const now = new Date(Date.now() + 9 * 3600 * 1000);
  const d = (offset) => new Date(now.getTime() - offset * 86400000).toISOString().slice(0, 10);
  // --date=YYYY-MM-DD で対象日を上書きできる (動作確認・過去分の再出力用)
  const arg = process.argv.find((a) => a.startsWith("--date="));
  if (arg) {
    const target = arg.slice(7);
    const prev = new Date(new Date(target + "T00:00:00Z").getTime() - 86400000).toISOString().slice(0, 10);
    return { yesterday: target, dayBefore: prev };
  }
  return { yesterday: d(1), dayBefore: d(2) };
}

async function collectGA4() {
  const { yesterday, dayBefore } = jstDates();
  const range = [{ startDate: yesterday, endDate: yesterday }];
  const prevRange = [{ startDate: dayBefore, endDate: dayBefore }];

  const [summary, prev, pages, countries, sources, devices, langs] = await Promise.all([
    ga({ dateRanges: range, metrics: [
      { name: "activeUsers" }, { name: "newUsers" }, { name: "sessions" },
      { name: "screenPageViews" }, { name: "averageSessionDuration" }, { name: "bounceRate" },
    ]}),
    ga({ dateRanges: prevRange, metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }] }),
    ga({ dateRanges: range, dimensions: [{ name: "pagePath" }], metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }], limit: 8 }),
    ga({ dateRanges: range, dimensions: [{ name: "country" }], metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }], limit: 6 }),
    ga({ dateRanges: range, dimensions: [{ name: "sessionDefaultChannelGroup" }], metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 6 }),
    ga({ dateRanges: range, dimensions: [{ name: "deviceCategory" }], metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }], limit: 4 }),
    ga({ dateRanges: range, dimensions: [{ name: "language" }], metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }], limit: 5 }),
  ]);

  return {
    date: yesterday,
    users: total(summary, 0), newUsers: total(summary, 1), sessions: total(summary, 2),
    views: total(summary, 3), avgDuration: total(summary, 4), bounceRate: total(summary, 5),
    prevUsers: total(prev, 0), prevViews: total(prev, 1),
    pages: rows(pages), countries: rows(countries), sources: rows(sources),
    devices: rows(devices), langs: rows(langs),
  };
}

/* ── Clarity ── */
async function collectClarity() {
  const r = await fetch("https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=1", {
    headers: { Authorization: `Bearer ${env.CLARITY_API_TOKEN}` },
  });
  if (!r.ok) throw new Error(`Clarity ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const raw = await r.json();
  const out = {};
  for (const m of raw) {
    const info = m.information?.[0] || {};
    out[m.metricName] = {
      sessions: num(info.sessionsCount),
      pct: Number(info.sessionsWithMetricPercentage ?? 0),
      pages: num(info.pagesViews),
      subTotal: num(info.subTotal),
    };
  }
  return out;
}

/* ── 整形 ── */
const pct = (a, b) => (b === 0 ? (a === 0 ? "±0" : "新規") : `${a >= b ? "+" : ""}${Math.round(((a - b) / b) * 100)}%`);
const mmss = (s) => `${Math.floor(s / 60)}分${String(Math.round(s % 60)).padStart(2, "0")}秒`;

function render(g, c, cErr) {
  const L = [];
  L.push(`Landscapes of Japan — ${g.date} の訪問者`);
  L.push("");

  if (g.users === 0) {
    L.push("この日の訪問者は 0 人でした。");
  } else {
    L.push(`訪問者 ${g.users}人 (前日比 ${pct(g.users, g.prevUsers)}) / うち新規 ${g.newUsers}人`);
    L.push(`セッション ${g.sessions} / ページビュー ${g.views} (前日比 ${pct(g.views, g.prevViews)})`);
    L.push(`平均滞在 ${mmss(g.avgDuration)} / 直帰率 ${Math.round(g.bounceRate * 100)}%`);
  }
  L.push("");

  const list = (title, arr, unit, limit = 5) => {
    const nz = arr.filter((r) => r.vals[0] > 0).slice(0, limit);
    if (!nz.length) return;
    L.push(`${title}: ` + nz.map((r) => `${r.keys[0]} ${r.vals[0]}${unit}`).join(" / "));
  };
  list("よく見られたページ", g.pages, "回", 6);
  list("国", g.countries, "人");
  list("流入", g.sources, "件");
  list("端末", g.devices, "人", 3);
  list("言語", g.langs, "人", 4);

  L.push("");
  if (cErr) {
    L.push(`Clarity: 取得できず (${cErr})`);
  } else {
    const s = c.RageClickCount?.sessions || 0;
    if (s === 0) {
      L.push("Clarity: この日の記録セッションはまだありません。");
    } else {
      L.push(`Clarity (記録 ${s}セッション):`);
      const q = [];
      if (c.RageClickCount?.pct) q.push(`イライラクリック ${c.RageClickCount.pct}%`);
      if (c.DeadClickCount?.pct) q.push(`反応しないクリック ${c.DeadClickCount.pct}%`);
      if (c.ExcessiveScroll?.pct) q.push(`過剰スクロール ${c.ExcessiveScroll.pct}%`);
      if (c.QuickbackClick?.pct) q.push(`即戻り ${c.QuickbackClick.pct}%`);
      if (c.ScriptErrorCount?.pct) q.push(`JSエラー ${c.ScriptErrorCount.pct}%`);
      L.push(q.length ? "  " + q.join(" / ") : "  問題の兆候は検出されていません。");
    }
  }

  /* 気づいた点 */
  const notes = [];
  if (g.users > 0 && g.prevUsers > 0 && g.users >= g.prevUsers * 2) notes.push("訪問者が前日の2倍以上に増えています。");
  if (g.users > 0 && g.prevUsers > 0 && g.users <= g.prevUsers * 0.5) notes.push("訪問者が前日の半分以下に減っています。");
  if (g.users > 0 && g.bounceRate > 0.8) notes.push(`直帰率が ${Math.round(g.bounceRate * 100)}% と高めです。`);
  if (g.users > 0 && g.avgDuration > 120) notes.push(`平均滞在 ${mmss(g.avgDuration)} とよく読まれています。`);
  if (!cErr && c.ScriptErrorCount?.pct > 5) notes.push(`JSエラーが ${c.ScriptErrorCount.pct}% のセッションで出ています。`);
  if (!cErr && c.RageClickCount?.pct > 10) notes.push(`イライラクリックが ${c.RageClickCount.pct}% と多め。押せそうで押せない要素があるかもしれません。`);
  if (notes.length) { L.push(""); L.push("気づいた点:"); notes.forEach((n) => L.push(`  - ${n}`)); }

  return L.join("\n");
}

/* ── main ── */
const g = await collectGA4();
let c = null, cErr = null;
try { c = await collectClarity(); } catch (e) { cErr = e.message.slice(0, 80); }

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ ga4: g, clarity: c, clarityError: cErr }, null, 2));
} else {
  console.log(render(g, c, cErr));
}
