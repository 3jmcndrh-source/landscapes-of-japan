#!/usr/bin/env node
/**
 * 前日 (日本時間) の解析データを取る。中身は scripts/analytics/daily-report.mjs と同じ。
 *
 *   node scripts/ops/analytics.mjs [--no-clarity] [--date=YYYY-MM-DD]
 *
 * Clarity の API は 1プロジェクト1日10回まで。運用では1日1回だけ呼ぶ:
 *   作業 issue のデータ (state.mjs get --task=A --key=analytics) に clarity が記録済みなら --no-clarity を付ける。
 *   失敗しても再試行しない。
 *
 * 出力: ops-out/analytics.json (作業 issue に保存する短いデータ) / ops-out/analytics.md (本文)
 * 鍵: 手元は .env と gsc-service-account.json、クラウドは環境変数 GA4_SA_JSON_B64 / GA4_PROPERTY_ID と
 *     Clarity のネットワークシークレット (www.clarity.ms に Authorization を付ける)。
 */
import path from "node:path";
import { writeFileSync } from "node:fs";
import { OPS_OUT, args, ensureDir, writeJSON } from "./lib/common.mjs";
import { collectGA4, collectClarity, render } from "../analytics/daily-report.mjs";

const a = args();
ensureDir(OPS_OUT);
let g = null, gErr = null, c = null, cErr = null;
try { g = await collectGA4(); } catch (e) { gErr = e.message.slice(0, 200); }
if (a["no-clarity"]) cErr = "skipped";
else { try { c = await collectClarity(); } catch (e) { cErr = e.message.slice(0, 120); } }

const top = (rows, n = 5) => (rows || []).slice(0, n).map((r) => [r.keys.join(" / "), r.vals[0]]);
const data = g ? {
  date: g.date, users: g.users, newUsers: g.newUsers, sessions: g.sessions, engagedSessions: g.engagedSessions,
  views: g.views, avgDuration: Math.round(g.avgDuration), bounceRate: Math.round(g.bounceRate * 100) / 100,
  prevUsers: g.prevUsers, prevViews: g.prevViews,
  pages: top(g.pages), countries: top(g.countries), sources: top(g.sources), langs: top(g.langs),
} : null;
const clarity = c ? Object.fromEntries(Object.entries(c).map(([k, v]) => [k, { sessions: v.sessions, pct: v.pct }])) : null;
const short = { ga4: data, ga4Error: gErr, clarity, clarityError: cErr, clarityCalled: !a["no-clarity"] };
writeJSON(path.join(OPS_OUT, "analytics.json"), short);
const text = g ? render(g, c, cErr === "skipped" ? "(今日はすでに取得済みのため省略)" : cErr) : `GA4 の取得に失敗しました: ${gErr}`;
writeFileSync(path.join(OPS_OUT, "analytics.md"), "### 解析データ (前日)\n\n```\n" + text + "\n```\n");
console.log(JSON.stringify({ ok: !!g, ga4Error: gErr, clarity: !!c, clarityError: cErr, users: data?.users, views: data?.views }, null, 1));
if (!g) process.exit(1);
