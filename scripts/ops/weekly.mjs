#!/usr/bin/env node
/**
 * 週次レポート (タスク E) の材料を GitHub から集める。文章にするのは E のエージェント。
 *
 *   node scripts/ops/weekly.mjs [--days=7]
 *
 * 集めるもの:
 *   - 過去7日の作業 issue に保存されたデータ (解析・監査の件数・止まった回数・PR)
 *   - その週に開いた/閉じた 監査の issue (種類別)、needs-decision の未決
 *   - その週に作られた/マージされた PR
 * 出力: ops-out/weekly.json と ops-out/weekly-data.md
 */
import path from "node:path";
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { list, issues } from "./lib/gh.mjs";
import { OPS_OUT, ROOT, args, ensureDir, jstDate, writeJSON } from "./lib/common.mjs";

const a = args();
const days = Number(a.days || 7);
const today = jstDate();
const since = new Date(Date.now() - days * 86400000).toISOString();
ensureDir(OPS_OUT);

const h = spawnSync(process.execPath, ["scripts/ops/state.mjs", "history", `--days=${days}`], { cwd: ROOT, encoding: "utf-8" });
const history = JSON.parse(h.stdout || "[]");

const all = list(`repos/{repo}/issues?labels=ops:finding&state=all&since=${since}`, 1000).filter((i) => !i.pull_request);
const opened = all.filter((i) => i.created_at >= since);
const closed = all.filter((i) => i.closed_at && i.closed_at >= since);
const kindOf = (i) => (i.body?.match(/<!-- ops-fp:([^:]+):/) || [])[1] || "?";
const count = (arr) => arr.reduce((m, i) => (m[kindOf(i)] = (m[kindOf(i)] || 0) + 1, m), {});
const decisions = issues({ labels: ["needs-decision"], state: "open" }).map((i) => ({ number: i.number, title: i.title, url: i.html_url, since: i.created_at.slice(0, 10) }));
const openFindings = issues({ labels: ["ops:finding"], state: "open" }).length;

const prs = list(`repos/{repo}/pulls?state=all&sort=created&direction=desc`, 200).filter((p) => p.created_at >= since || (p.merged_at && p.merged_at >= since));
const prSummary = prs.map((p) => ({ number: p.number, title: p.title, state: p.merged_at ? "merged" : p.state, head: p.head.ref, url: p.html_url }));

const series = history.map((d) => ({
  date: d.date, users: d.data?.A?.analytics?.ga4?.users ?? null, views: d.data?.A?.analytics?.ga4?.views ?? null,
  findings: d.data?.A?.audit?.total ?? null, groups: d.data?.A?.audit?.groups ?? null,
  halted: d.labels.includes("ops:halted"), stalledTwice: d.labels.includes("ops:stalled-twice"),
  done: ["A", "B", "C"].filter((t) => d.labels.includes(`ops:${t}-done`)).join(""),
})).sort((x, y) => x.date.localeCompare(y.date));

const out = { today, days, series, opened: count(opened), closed: count(closed), openFindings, decisions, prs: prSummary };
writeJSON(path.join(OPS_OUT, "weekly.json"), out);

const L = [`### 週次の材料 (${today} まで${days}日)`, "", "| 日付 | 訪問者 | PV | 異常(件/種類) | 完了 | 止まった |", "|---|---|---|---|---|---|"];
for (const s of series) L.push(`| ${s.date} | ${s.users ?? "-"} | ${s.views ?? "-"} | ${s.findings ?? "-"} / ${s.groups ?? "-"} | ${s.done || "-"} | ${s.halted ? "停止条件" : ""}${s.stalledTwice ? " 2回停止" : ""} |`);
L.push("", `- 開いた監査 issue: ${JSON.stringify(out.opened)} / 閉じた: ${JSON.stringify(out.closed)} / 未解決 合計 ${openFindings}件`);
L.push(`- PR: ${prSummary.map((p) => `#${p.number} ${p.state}`).join(", ") || "なし"}`);
L.push(`- 要判断 (needs-decision) の未決: ${decisions.length}件`);
for (const d of decisions) L.push(`  - #${d.number} ${d.title} (${d.since}〜)`);
writeFileSync(path.join(OPS_OUT, "weekly-data.md"), L.join("\n"));
console.log(JSON.stringify({ days: series.length, opened: out.opened, closed: out.closed, prs: prSummary.length, decisions: decisions.length }, null, 1));
