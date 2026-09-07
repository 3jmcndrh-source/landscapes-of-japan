/**
 * ⑨ 鑑賞に関する指標の集計。既存の daily-report.mjs とは独立した別モジュール。
 * 既存レポートの出力は変更しない。定期メールや通知は新設しない (手で実行する)。
 *
 *   node scripts/analytics/viewing-metrics.mjs --from 2026-09-10 --to 2026-09-16 [--json]
 *
 * 前提:
 *   .env の GA4_PROPERTY_ID と gsc-service-account.json (GA4 プロパティの閲覧者)。
 *
 * 数え方の約束:
 *   - 指標ごとに分子と分母の基準をそろえる。
 *     セッション基準の指標は、分子・分母とも「重複なしのセッション数」。
 *     検索0件率だけは検索回数 (イベント数) 基準で、セッション基準に置き換えない。
 *   - 分子と分母は同じ期間・同じ範囲・同じタイムゾーン (プロパティは Asia/Tokyo)。
 *   - 分母が 0 のときは 0% ではなく「算出不可」と出す。
 *   - イベントを本番へ公開する前の期間は「0%」ではなく「未計測」と出す。
 *     遡って埋めない。
 *   - カスタム定義の未登録・反映待ち・取得エラーは「未取得」であって
 *     「利用が0件」ではない。両者を区別して出す。
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

/* ------------------------------------------------------------------------
 * 計測が始まった日 (JST)。今回のイベントを本番へ公開した日を入れる。
 * 空のあいだは「まだ本番に出していない」= どの期間も未計測、という意味になる。
 * 公開日より前の期間を 0% と表示しないためだけのもので、数字は作らない。
 * ---------------------------------------------------------------------- */
const MEASUREMENT_START = process.env.VIEWING_METRICS_START || env.VIEWING_METRICS_START || "";

/* 公開当日は 22:33 JST から計測が始まっている。丸一日ぶんではないので、
   他の日と横並びで比較しないこと (率は使えるが、件数は少なく出る)。 */
const START_TIME_JST = "22:33";

/* ---- 本番ホストへの限定 --------------------------------------------------
 * 2026-09-05 と 09-06 に、ローカル検証 (http://localhost:4173) のアクセスが
 * 本番プロパティへ入っている。GA4 は hostName ディメンションで区別できるので、
 * この集計は既定で本番ホストだけを対象にする (--all-hosts で全ホスト)。
 *
 * これは「集計時に絞り込む」対策であって、過去に記録されたデータを消すもの
 * ではない。GA4 のデータフィルタ設定は適用後のデータにしか効かず、
 * 過去のデータには遡って適用されないので、設定を入れても過去の混入は残る。
 *   https://support.google.com/analytics/answer/13296761
 * 実測 (2026-09-06 時点, 過去30日):
 *   landscapes-of-japan.com  378 セッション
 *   localhost                  8 セッション (09-05 に4, 09-06 に4)
 * -------------------------------------------------------------------------- */
const PROD_HOST = "landscapes-of-japan.com";
const ALL_HOSTS = process.argv.includes("--all-hosts");
const hostFilter = ALL_HOSTS ? null : { filter: { fieldName: "hostName", stringFilter: { matchType: "EXACT", value: PROD_HOST } } };

/* 混入のあった期間。自動で差し引くことはしない。該当期間を含むときに注意書きを出す。 */
const CONTAMINATED = [{ from: "2026-09-05", to: "2026-09-06", note: "ローカル検証 (localhost) のアクセスが混入。GA4 は hostName で区別可能" }];

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i >= 0 ? process.argv[i + 1] : d; };
const jstToday = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
const FROM = arg("from", jstToday());
const TO = arg("to", jstToday());
const AS_JSON = process.argv.includes("--json");

/* 集計できる期間 = 指定期間 ∩ 計測開始以降 */
const START = MEASUREMENT_START && MEASUREMENT_START > FROM ? MEASUREMENT_START : FROM;
const MEASURABLE = !!MEASUREMENT_START && START <= TO;
const PARTIAL = MEASURABLE && START !== FROM;

async function ga(body) {
  const t = await getToken(GA_SCOPE);
  const r = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json" },
    body: JSON.stringify({ dateRanges: [{ startDate: START, endDate: TO }], ...body }),
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

const eventIs = (names) => ({
  filter: {
    fieldName: "eventName",
    inListFilter: { values: [].concat(names) },
  },
});
const paramFilter = (name, value) => ({
  filter: { fieldName: `customEvent:${name}`, stringFilter: { matchType: "EXACT", value } },
});
const and = (...ex) => {
  const e = ex.filter(Boolean);
  return e.length === 1 ? e[0] : { andGroup: { expressions: e } };
};
/* 既定では本番ホストのぶんだけを数える (検証アクセスを混ぜない) */
const withHost = (f) => and(f, hostFilter) || undefined;

/** 対象セッション数 (すべてのセッション基準の指標で共通の分母) */
const allSessions = () => ga({ metrics: [{ name: "sessions" }], ...(hostFilter ? { dimensionFilter: hostFilter } : {}) }).then(totalOf);

/**
 * 指定したイベントのいずれかが1回以上あった「重複なしのセッション数」。
 * inListFilter を1本の問い合わせで使うので、
 * 2つのイベントが同じセッションで起きても二重に数えない
 * (2回問い合わせて足すと二重になる。それはしない)。
 */
const sessionsWith = (names, extra = null) =>
  ga({
    metrics: [{ name: "sessions" }],
    dimensionFilter: withHost(and(eventIs(names), extra)),
  }).then(totalOf);

/** イベント件数 (検索回数のように、回数で数えるものだけに使う) */
const eventsWith = (names, extra = null) =>
  ga({
    metrics: [{ name: "eventCount" }],
    dimensionFilter: withHost(and(eventIs(names), extra)),
  }).then(totalOf);

/* ---- 未取得と「0件」の区別 ---------------------------------------------
   カスタム定義 (entry / has_results) は GA4 管理画面で登録して初めて
   customEvent:… として問い合わせられる。未登録なら 400、登録直後は
   通常レポートへ反映されるまで時間がかかることがある (最大48時間程度)。
   どちらも「利用が0件」ではないので、null (未取得) として理由を残す。 */
const unavailable = [];
async function optional(label, fn) {
  try { return await fn(); }
  catch (e) {
    const msg = String(e.message);
    const kind = /not a valid dimension/i.test(msg)
      ? "カスタム定義が未登録、または登録後まだ反映されていない"
      : "取得エラー";
    unavailable.push(`${label}: ${kind} (${msg.slice(0, 120)})`);
    return null;
  }
}

/* ---- カスタム定義の値が実際に付いているかを見る ------------------------
   GA4 のカスタム定義は登録した時点より前に収集されたイベントには
   遡って適用されない。その期間のイベントは値が "(not set)" になり、
   値で絞り込む問い合わせは必ず 0 件になる。
   これを「実際に0件だった」と読み違えないための確認。
     https://support.google.com/analytics/answer/14239696 */
async function paramCoverage(eventName, paramName) {
  try {
    const res = await ga({
      dimensions: [{ name: `customEvent:${paramName}` }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: withHost(eventIs(eventName)),
    });
    let total = 0, withValue = 0;
    for (const r of res.rows || []) {
      const v = r.dimensionValues[0].value;
      const c = n(r.metricValues[0].value);
      total += c;
      if (v && v !== "(not set)") withValue += c;
    }
    return { ok: true, total, withValue };
  } catch (e) {
    return { ok: false, reason: String(e.message).slice(0, 120) };
  }
}

/** 値が1件も付いていないなら、分子は「未取得」として扱う */
function coverageBlocks(label, cov, paramName) {
  if (!cov.ok) { unavailable.push(`${label}: 取得エラー (${cov.reason})`); return true; }
  if (cov.total > 0 && cov.withValue === 0) {
    unavailable.push(`${label}: 対象イベントは ${cov.total} 件あるが customEvent:${paramName} の値がすべて (not set)。` +
      `カスタム定義の登録より前に収集されたぶんには値が付かない (遡って適用されない)`);
    return true;
  }
  return false;
}

const M = [];
function push(name, def, num, den, basis) {
  let value;
  if (!MEASURABLE) value = "未計測 (このイベントを本番へ公開していない期間)";
  else if (num === null || den === null) value = "未取得 (下の「取得できなかったもの」を参照)";
  else if (den > 0) value = `${((num / den) * 100).toFixed(1)}%`;
  else value = "算出不可 (分母0)";
  M.push({ 指標: name, 基準: basis, 定義: def, 分子: num, 分母: den, 値: value });
}

async function main() {
  if (!MEASURABLE) {
    /* 公開前は API を叩かない。0 を取ってきて 0% に見せないため。 */
    push("写真を鑑賞したセッション率", "photo_open または photo_view_direct が1回以上あった重複なしのセッション数 ÷ 対象セッション数", null, null, "セッション");
    push("シアター利用率", "theater_open が1回以上あった重複なしのセッション数 ÷ 対象セッション数", null, null, "セッション");
    push("色検索からの鑑賞率", "entry=color の photo_open があったセッション数 ÷ color_select があったセッション数", null, null, "セッション");
    push("検索0件率", "has_results=false の site_search 件数 ÷ 有効な site_search 件数", null, null, "検索回数");
    report(null, null, null);
    return;
  }

  const sessions = await allSessions();

  /* 1. 写真を鑑賞したセッション率 — 一覧から開いた操作と写真詳細への直接訪問の
        どちらも「鑑賞した」とみなす。同じセッションで両方起きても1と数える。 */
  const viewed = await sessionsWith(["photo_open", "photo_view_direct"]);
  push(
    "写真を鑑賞したセッション率",
    "photo_open (一覧から明示的に開いた) または photo_view_direct (写真詳細ページに直接来た) が1回以上あった重複なしのセッション数 ÷ 対象セッション数。両方あるセッションも1と数える。サムネイル表示・先読み・シアターの自動送りは含まない",
    viewed, sessions, "セッション"
  );

  /* 内訳 (合計は上の値と一致しない。同じセッションが両方に入りうるため) */
  const openedOnly = await sessionsWith("photo_open");
  const directOnly = await sessionsWith("photo_view_direct");

  /* 2. シアター利用率 */
  const theater = await sessionsWith("theater_open");
  push(
    "シアター利用率",
    "theater_open (シアターを開始した) が1回以上あった重複なしのセッション数 ÷ 対象セッション数。自動送りはイベントを送っていないので回数で膨らまない",
    theater, sessions, "セッション"
  );

  /* 3. 色検索からの鑑賞率 — 分母は色検索を使ったセッションで、全セッションではない */
  const colorUsed = await sessionsWith("color_select");
  const entryCov = await paramCoverage("photo_open", "entry");
  const colorOpen = coverageBlocks("色検索からの鑑賞 (customEvent:entry)", entryCov, "entry")
    ? null
    : await optional("色検索からの鑑賞 (customEvent:entry)", () => sessionsWith("photo_open", paramFilter("entry", "color")));
  push(
    "色検索からの鑑賞率",
    "entry=color の photo_open が1回以上あった重複なしのセッション数 ÷ color_select が1回以上あった重複なしのセッション数",
    colorOpen, colorUsed, "セッション"
  );

  /* 4. 検索0件率 — 検索回数基準。セッション基準に置き換えない。
        「1回の検索」= 入力が800msとまり、IME変換中でなく、
        直前に数えた語と違う語になったとき。1文字ごとには数えない。 */
  const searches = await eventsWith("site_search");
  const hrCov = await paramCoverage("site_search", "has_results");
  const zero = coverageBlocks("0件検索 (customEvent:has_results)", hrCov, "has_results")
    ? null
    : await optional("0件検索 (customEvent:has_results)", () => eventsWith("site_search", paramFilter("has_results", "false")));
  push(
    "検索0件率",
    "has_results=false の site_search イベント件数 ÷ 有効な site_search イベント件数。1回の検索 = 入力が800ms止まり、IME変換中でなく、直前に数えた語と違う語になったとき",
    zero, searches, "検索回数"
  );

  /* 補助指標 (セッション基準) */
  push("お気に入り追加率", "favorite_add が1回以上あった重複なしのセッション数 ÷ 対象セッション数", await sessionsWith("favorite_add"), sessions, "セッション");
  push("共有開始率", "photo_share が1回以上あった重複なしのセッション数 ÷ 対象セッション数。共有した相手が実際に見たことの証拠ではない", await sessionsWith("photo_share"), sessions, "セッション");
  push("写真を指定した問い合わせ開始率", "photo_contact_open が1回以上あった重複なしのセッション数 ÷ 対象セッション数。押しただけで送信ではない", await sessionsWith("photo_contact_open"), sessions, "セッション");

  /* 写真を開いた操作の流入元の内訳 (イベント数。割合にしない) */
  const entries = (await optional("流入元の内訳 (customEvent:entry)", () =>
    ga({
      dimensions: [{ name: "customEvent:entry" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: withHost(eventIs("photo_open")),
    }).then((res) => (res.rows || [])
      .map((r) => ({ entry: r.dimensionValues[0].value, count: n(r.metricValues[0].value) }))
      .sort((a, b) => b.count - a.count))
  ));

  report(sessions, entries, { openedOnly, directOnly });
}

function report(sessions, entries, sub) {
  const period = { requested: { from: FROM, to: TO }, aggregated: MEASURABLE ? { from: START, to: TO } : null, timezone: "Asia/Tokyo", measurement_start: MEASUREMENT_START || null, host: ALL_HOSTS ? "all" : PROD_HOST };
  const contaminated = CONTAMINATED.filter((c) => c.from <= TO && c.to >= FROM);

  if (AS_JSON) {
    console.log(JSON.stringify({ period, sessions, metrics: M, photo_open_entries: entries, unavailable, contaminated }, null, 2));
    return;
  }

  console.log(`\n=== 鑑賞に関する指標 (GA4 プロパティ ${PROPERTY}, Asia/Tokyo) ===`);
  console.log(`対象ホスト: ${ALL_HOSTS ? "すべて (--all-hosts)" : PROD_HOST + " のみ"}`);
  console.log(`指定期間: ${FROM} 〜 ${TO}`);
  if (!MEASUREMENT_START) {
    console.log("集計可能な期間: なし — 今回のイベントをまだ本番へ公開していない。");
    console.log("  公開後、.env の VIEWING_METRICS_START に公開日 (JST, YYYY-MM-DD) を入れると集計が始まる。");
  } else if (!MEASURABLE) {
    console.log(`集計可能な期間: なし — 指定期間はすべて計測開始 (${MEASUREMENT_START}) より前。`);
  } else {
    console.log(`集計可能な期間: ${START} 〜 ${TO}` + (PARTIAL ? `  ※ 指定期間のうち ${FROM} 〜 前日は計測開始前のため未計測` : ""));
    if (MEASUREMENT_START >= START && MEASUREMENT_START <= TO) {
      console.log(`   ※ ${MEASUREMENT_START} は公開当日。${START_TIME_JST} JST から計測開始のため丸一日ぶんではない。`);
      console.log("     率の比較には使えるが、件数を他の日と横並びにしないこと。");
    }
    console.log(`対象セッション: ${sessions}`);
  }
  if (contaminated.length) {
    console.log("\n注意: 指定期間に、本番以外からのアクセスが混入している日が含まれる");
    for (const c of contaminated) console.log(`   ${c.from} 〜 ${c.to}: ${c.note}`);
    console.log(ALL_HOSTS
      ? "   いまは --all-hosts なので混入ぶんも含まれている"
      : "   この集計は本番ホストに限定しているため、混入ぶんは入っていない");
    console.log("   記録済みのデータ自体は残る。GA4 のデータフィルタは過去データには適用されない");
  }
  console.log("");

  for (const m of M) {
    console.log(`■ ${m.指標} [${m.基準}基準]: ${m.値}`);
    console.log(`   定義: ${m.定義}`);
    console.log(`   分子 ${m.分子 === null ? "未取得" : m.分子} / 分母 ${m.分母 === null ? "未取得" : m.分母}\n`);
  }

  if (sub) {
    console.log("■ 鑑賞セッションの内訳 (重複するので合計は上の分子と一致しない)");
    console.log(`   一覧から開いた (photo_open) があったセッション: ${sub.openedOnly}`);
    console.log(`   写真詳細に直接来た (photo_view_direct) があったセッション: ${sub.directOnly}\n`);
  }

  console.log("■ 写真を開いた操作の流入元の内訳 (photo_open のイベント数。割合ではない)");
  if (entries === null) console.log("   未取得");
  else if (!entries.length) console.log("   0件");
  else {
    for (const e of entries) console.log(`   ${e.entry}: ${e.count}`);
    if (entries.every((e) => e.entry === "(not set)"))
      console.log("   ※ すべて (not set)。カスタム定義の登録より前に収集されたイベントには値が付かない");
  }

  if (unavailable.length) {
    console.log("\n取得できなかったもの (「利用が0件」ではない):");
    for (const m of unavailable) console.log(`   - ${m}`);
    console.log("   カスタム定義は登録しても通常レポートへ反映されるまで時間がかかることがある");
    console.log("   (Google の案内では最大48時間程度)。登録直後に必ず出るとは限らない。");
  }
  console.log("\n注: 計測開始前の期間は遡って埋めない。");
}

main().catch((e) => { console.error("集計できませんでした:", e.message); process.exit(1); });
