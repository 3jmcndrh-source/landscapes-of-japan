/**
 * ⑨ 鑑賞に関する指標の集計。既存の daily-report.mjs とは独立した別モジュール。
 * 既存レポートの出力は変更しない。定期メールや通知は新設しない (手で実行する)。
 *
 *   node scripts/analytics/viewing-metrics.mjs --from 2026-09-10 --to 2026-09-16 [--json]
 *
 * 前提:
 *   .env の GA4_PROPERTY_ID と gsc-service-account.json (GA4 プロパティの閲覧者)。
 *   本番に今回のイベントを公開したあとの期間しか数えられない。
 *   公開前の期間を遡って埋めることはしない (数字が無いものは「算出不可」)。
 *
 * 数え方の約束:
 *   - 分子・分母とも同じ「セッション」で数える (sessions ディメンション基準)。
 *     イベント件数をセッション数で割って率と呼ぶことはしない。
 *   - 分子と分母は同じ期間・同じ範囲・同じタイムゾーン (プロパティは Asia/Tokyo)。
 *   - 分母が 0 のときは 0% ではなく「算出不可」と出す。
 *   - 出力には 指標名・定義・分子・分母・期間 を必ず併記する。
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

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i >= 0 ? process.argv[i + 1] : d; };
const jstToday = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
const FROM = arg("from", jstToday());
const TO = arg("to", jstToday());
const AS_JSON = process.argv.includes("--json");

async function ga(body) {
  const t = await getToken(GA_SCOPE);
  const r = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json" },
    body: JSON.stringify({ dateRanges: [{ startDate: FROM, endDate: TO }], ...body }),
  });
  if (!r.ok) throw new Error(`GA4 ${r.status}: ${(await r.text()).slice(0, 300)}`);
  return r.json();
}

const n = (v) => Number(v ?? 0);
/* ディメンション無しの問い合わせでは GA4 は totals を返さない
   (metricAggregations を指定したときだけ付く)。行の合計を自分で取る。 */
const totalOf = (res) => {
  if (res.totals?.[0]?.metricValues?.[0]?.value != null) return n(res.totals[0].metricValues[0].value);
  return (res.rows || []).reduce((sum, r) => sum + n(r.metricValues?.[0]?.value), 0);
};

/** 期間内の全セッション数 (共通の分母) */
const allSessions = () => ga({ metrics: [{ name: "sessions" }] }).then(totalOf);

/** あるイベントが1回以上起きたセッション数。イベント件数ではない */
function sessionsWithEvent(eventName, extra = null) {
  const expressions = [{ filter: { fieldName: "eventName", stringFilter: { matchType: "EXACT", value: eventName } } }];
  if (extra) expressions.push(extra);
  return ga({
    metrics: [{ name: "sessions" }],
    dimensionFilter: expressions.length === 1 ? expressions[0] : { andGroup: { expressions } },
  }).then(totalOf);
}

const paramFilter = (name, value) => ({
  filter: { fieldName: `customEvent:${name}`, stringFilter: { matchType: "EXACT", value } },
});

/** 写真を開いた流入元の内訳 (セッション数ではなくイベント数。内訳なので率にしない) */
function entryBreakdown() {
  return ga({
    dimensions: [{ name: "customEvent:entry" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: { filter: { fieldName: "eventName", stringFilter: { matchType: "EXACT", value: "photo_open" } } },
  }).then((res) => (res.rows || [])
    .map((r) => ({ entry: r.dimensionValues[0].value, count: n(r.metricValues[0].value) }))
    .sort((a, b) => b.count - a.count));
}

const rate = (num, den) =>
  num === null || den === null ? "算出不可 (データ取得不可)"
  : den > 0 ? `${((num / den) * 100).toFixed(1)}%` : "算出不可 (分母0)";

/* カスタム定義 (entry / has_results) が GA4 側にまだ登録されていない期間は
   そのディメンションを使う問い合わせが 400 になる。全体を落とさず、
   その指標だけ「取得不可」として理由を残す。数字を推測で埋めない。 */
const missing = [];
async function optional(label, fn) {
  try { return await fn(); }
  catch (e) { missing.push(`${label}: ${String(e.message).slice(0, 120)}`); return null; }
}

const M = [];
const push = (name, def, num, den) => M.push({ 指標: name, 定義: def, 分子: num, 分母: den, 割合: rate(num, den) });

async function main() {
  const sessions = await allSessions();

  // 1. 写真を開いて鑑賞したセッションの割合
  const opened = await sessionsWithEvent("photo_open");
  const direct = await sessionsWithEvent("photo_view_direct");
  push(
    "写真を開いたセッション率",
    "photo_open (一覧から明示的に開いた) が1回以上あったセッション ÷ 全セッション。サムネイル表示・先読み・シアターの自動送りは含まない",
    opened, sessions
  );
  push(
    "写真詳細ページに直接来たセッション率",
    "photo_view_direct が1回以上あったセッション ÷ 全セッション。一覧から開いた操作 (photo_open) とは別に数える",
    direct, sessions
  );

  // 2. シアターを使ったセッションの割合
  const theater = await sessionsWithEvent("theater_open");
  push("シアターを使ったセッション率", "theater_open が1回以上あったセッション ÷ 全セッション。自動送りは送っていないので回数では膨らまない", theater, sessions);

  // 3. 色検索を使ったセッションのうち、その結果から写真を開いたセッションの割合
  const colorSessions = await sessionsWithEvent("color_select");
  const colorOpen = await optional("色検索からの写真表示 (customEvent:entry)", () => sessionsWithEvent("photo_open", paramFilter("entry", "color")));
  push(
    "色検索から写真を開いたセッション率",
    "entry=color の photo_open があったセッション ÷ color_select があったセッション。分母は色検索を使ったセッションで、全セッションではない",
    colorOpen, colorSessions
  );

  // 4. サイト内検索で0件だった検索の割合
  //    「1回の検索」= 入力が800ms止まり、IME変換中でなく、直前と違う語になったとき。
  const searches = await ga({
    metrics: [{ name: "eventCount" }],
    dimensionFilter: { filter: { fieldName: "eventName", stringFilter: { matchType: "EXACT", value: "site_search" } } },
  }).then(totalOf);
  const zero = await optional("0件検索 (customEvent:has_results)", () => ga({
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      andGroup: {
        expressions: [
          { filter: { fieldName: "eventName", stringFilter: { matchType: "EXACT", value: "site_search" } } },
          paramFilter("has_results", "false"),
        ],
      },
    },
  }).then(totalOf));
  push(
    "0件だった検索の割合",
    "has_results=false の site_search 件数 ÷ site_search 件数。1回の検索 = 入力が800ms止まり、IME変換中でなく、直前に数えた語と違う語になったとき。1文字ごとには数えない",
    zero, searches
  );

  // 補助: お気に入り・共有・写真を指定した問い合わせ
  const favAdd = await sessionsWithEvent("favorite_add");
  const share = await sessionsWithEvent("photo_share");
  const contact = await sessionsWithEvent("photo_contact_open");
  push("お気に入りに追加したセッション率", "favorite_add が1回以上あったセッション ÷ 全セッション", favAdd, sessions);
  push("共有操作を始めたセッション率", "photo_share が1回以上あったセッション ÷ 全セッション。共有した相手が実際に見たことの証拠ではない", share, sessions);
  push("写真を指定した問い合わせを開いたセッション率", "photo_contact_open が1回以上あったセッション ÷ 全セッション。押しただけで送信ではない", contact, sessions);

  const entries = (await optional("流入元の内訳 (customEvent:entry)", entryBreakdown)) || [];

  if (AS_JSON) {
    console.log(JSON.stringify({ period: { from: FROM, to: TO, timezone: "Asia/Tokyo" }, sessions, metrics: M, photo_open_entries: entries, unavailable: missing }, null, 2));
    return;
  }

  console.log(`\n=== 鑑賞に関する指標 ${FROM} 〜 ${TO} (Asia/Tokyo, GA4 プロパティ ${PROPERTY}) ===`);
  console.log(`全セッション: ${sessions}\n`);
  for (const m of M) {
    console.log(`■ ${m.指標}: ${m.割合}`);
    console.log(`   定義: ${m.定義}`);
    console.log(`   分子 ${m.分子} / 分母 ${m.分母}\n`);
  }
  console.log("■ 写真を開いた操作の流入元の内訳 (photo_open のイベント数。割合ではない)");
  if (!entries.length) console.log("   データなし");
  for (const e of entries) console.log(`   ${e.entry}: ${e.count}`);
  console.log("\n注: 今回のイベントを本番へ公開する前の期間は数えられない (遡って埋めない)。");
}

main().catch((e) => { console.error("集計できませんでした:", e.message); process.exit(1); });
