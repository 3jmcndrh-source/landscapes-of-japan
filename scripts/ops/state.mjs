#!/usr/bin/env node
/**
 * 運用タスク (A〜E) の進捗を GitHub の issue に記録・参照する。タスク間の状態の受け渡しはすべてこれを通す。
 * 出力はいつも JSON 1つ (標準出力)。同じコマンドを2回実行しても、issue・コメント・PR は重複しない。
 *
 *   node scripts/ops/state.mjs status  --task=A|B|C|E          その日の状態を判定 (開始前に必ず呼ぶ)
 *   node scripts/ops/state.mjs begin   --task=A|B|C|E          開始を記録 (作業 issue が無ければ A/E が作る)
 *   node scripts/ops/state.mjs step    --task=A --id=A3 [--note=...]   チェックリストの1項目を済みにする
 *   node scripts/ops/state.mjs set     --task=A --key=k --json='{...}'  作業 issue に機械向けのデータを保存
 *   node scripts/ops/state.mjs get     [--task=A] [--key=k]            保存したデータを読む
 *   node scripts/ops/state.mjs halt    --task=A --reason=...   止める条件に当たったことを記録
 *   node scripts/ops/state.mjs done    --task=A|B|C|E          完了を記録 (C の完了で作業 issue を閉じる)
 *   node scripts/ops/state.mjs comment --issue=N --key=K --body-file=F   同じ key のコメントは1つだけ (あれば更新)
 *   node scripts/ops/state.mjs findings --file=ops-out/findings.json [--max-new=15]   異常 issue を重複なく起票
 *   node scripts/ops/state.mjs pr      --head=claude/fix-12 --title=... --body-file=F [--issues=12,13]
 *   node scripts/ops/state.mjs labels                          必要なラベルを作る
 *   node scripts/ops/state.mjs history --days=7                過去の作業 issue のデータ (週次レポート用)
 *
 * 共通: --date=YYYY-MM-DD で対象日 (日本時間) を指定できる。省略時は今日。
 */
import { readFileSync } from "node:fs";
import { api, issues, list, repo, ensureLabels } from "./lib/gh.mjs";
import { args, jstDate } from "./lib/common.mjs";

const BASE_BRANCH = "cloudflare-migration";
const MAX_PR_PER_DAY = 3;
const RUNNING_GRACE_MIN = 90; // 開始からこの分数以内で in-progress なら「まだ動いている」とみなす

const STEPS = {
  A: [["A1", "準備とビルド"], ["A2", "HTTP ステータスとリンク検査"], ["A3", "ブラウザ監査 (390px / 1440px)"],
      ["A4", "スクリーンショット差分"], ["A5", "解析データ (GA4 / Clarity)"], ["A6", "異常の起票"], ["A7", "報告と通知"]],
  B: [["B1", "対象の選定 (auto-fix)"], ["B2", "修正と再監査"], ["B3", "結果のコメント"], ["B4", "報告"]],
  C: [["C1", "B のブランチのレビューと PR"], ["C2", "investigate の調査と修正"], ["C3", "PR の作成"], ["C4", "報告と通知"]],
  E: [["E1", "集計"], ["E2", "レポート"], ["E3", "通知"]],
};
const TITLES = { A: "A 監視", B: "B 定型修正", C: "C 調査・修正・PR" };
const PREV = { B: "A", C: "B" };

const a = args();
const cmd = a._[0];
const date = a.date || jstDate();
const out = (o) => { console.log(JSON.stringify(o, null, 2)); };

/* ---------- 作業 issue の読み書き ---------- */
function isoWeek(d) {
  const t = new Date(d + "T00:00:00Z");
  const day = (t.getUTCDay() + 6) % 7;
  t.setUTCDate(t.getUTCDate() - day + 3);
  const firstThu = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
  const w = 1 + Math.round(((t - firstThu) / 86400000 - 3 + ((firstThu.getUTCDay() + 6) % 7)) / 7);
  return `${t.getUTCFullYear()}-W${String(w).padStart(2, "0")}`;
}
const weekly = (task) => task === "E";
const titleFor = (task) => (weekly(task) ? `[ops-weekly] ${isoWeek(date)}` : `[ops] ${date}`);
const labelFor = (task) => (weekly(task) ? "ops:weekly" : "ops:daily");

function findWorkIssue(task) {
  const title = titleFor(task);
  const got = api("GET", `repos/{repo}/issues?labels=${encodeURIComponent(labelFor(task))}&state=all&sort=created&direction=desc&per_page=100`);
  const hit = (got || []).find((i) => i.title === title && !i.pull_request);
  // 一覧の本文は数秒遅れることがあるので、番号で取り直して最新の本文を使う
  return hit ? api("GET", `repos/{repo}/issues/${hit.number}`) : null;
}

const STATE_RE = /<!-- ops-state:(\{.*?\}) -->/s;
function readState(issue) {
  const m = (issue?.body || "").match(STATE_RE);
  try { return m ? JSON.parse(m[1]) : {}; } catch { return {}; }
}
function writeBody(issue, state, mutate = (b) => b) {
  let body = mutate(issue.body || "");
  const block = `<!-- ops-state:${JSON.stringify(state)} -->`;
  body = STATE_RE.test(body) ? body.replace(STATE_RE, block) : body + "\n\n" + block;
  const updated = api("PATCH", `repos/{repo}/issues/${issue.number}`, { body });
  Object.assign(issue, updated);
  return issue;
}

function newBody(task) {
  const tasks = weekly(task) ? ["E"] : ["A", "B", "C"];
  const L = [weekly(task)
    ? `週次レポートの作業 issue です (${isoWeek(date)})。タスク E が進捗を記録します。`
    : `${date} (日本時間) の運用の作業 issue です。A → B → C の順に、各タスクが区切りごとにチェックを付けます。\n止まった場合は、追いかけ実行がチェックの付いていない項目から再開します。`];
  for (const t of tasks) {
    if (!weekly(task)) L.push(`\n### ${TITLES[t]}`);
    for (const [id, name] of STEPS[t]) L.push(`- [ ] ${id} ${name}`);
  }
  return L.join("\n");
}

function addLabels(n, labels) { api("POST", `repos/{repo}/issues/${n}/labels`, { labels }); }
function removeLabel(n, label) {
  try { api("DELETE", `repos/{repo}/issues/${n}/labels/${encodeURIComponent(label)}`); } catch (e) { if (e.status !== 404) throw e; }
}
const hasLabel = (issue, l) => (issue.labels || []).some((x) => (x.name || x) === l);
const firstOpenStep = (issue, task) => {
  for (const [id] of STEPS[task]) if (new RegExp(`- \\[ \\] ${id} `).test(issue.body || "")) return id;
  return null;
};

/** 同じ key のコメントは1つだけ。あれば本文を差し替える */
function upsertComment(n, key, body) {
  const marker = `<!-- ops-key:${key} -->`;
  const full = `${body}\n\n${marker}`;
  const existing = list(`repos/{repo}/issues/${n}/comments`).find((c) => (c.body || "").includes(marker));
  if (existing) {
    if (existing.body !== full) api("PATCH", `repos/{repo}/issues/comments/${existing.id}`, { body: full });
    return { id: existing.id, action: existing.body === full ? "unchanged" : "updated" };
  }
  const c = api("POST", `repos/{repo}/issues/${n}/comments`, { body: full });
  return { id: c.id, action: "created" };
}

/* ---------- コマンド ---------- */
function status(task) {
  // 一時停止: ラベル ops:pause の付いた open な issue が1件でもあれば、全タスクが何もせず終わる
  const paused = issues({ labels: ["ops:pause"], state: "open", max: 1 });
  if (paused.length) return { date, task, verdict: "paused", reason: `#${paused[0].number} に ops:pause が付いているので、何もせず終了する` };
  const issue = findWorkIssue(task);
  const prev = PREV[task];
  const base = { date, task, issue: issue?.number ?? null, url: issue?.html_url ?? null };
  if (prev) {
    if (!issue || !hasLabel(issue, `ops:${prev}-done`)) {
      return { ...base, verdict: "wait-prev", reason: `${prev} がその日の作業を終えていない。何もせず終了し、追いかけ実行に任せる` };
    }
    if (task === "B" && hasLabel(issue, "ops:halted") && !hasLabel(issue, "ops:B-done")) {
      return { ...base, verdict: "skip-halted", reason: "A が止める条件に当たった日。B は修正せず done だけ記録する" };
    }
  }
  if (!issue) return { ...base, verdict: "start" };
  const st = readState(issue);
  if (hasLabel(issue, `ops:${task}-done`)) return { ...base, verdict: "done", reason: "その日の作業は完了済み。何もせず終了する" };
  const last = st.lastBegin?.[task];
  if (hasLabel(issue, "ops:in-progress") && last && Date.now() - Date.parse(last) < RUNNING_GRACE_MIN * 60000) {
    return { ...base, verdict: "running", reason: `${RUNNING_GRACE_MIN}分以内に開始した実行がまだ動いている可能性がある。何もせず終了する` };
  }
  const starts = st.starts?.[task] || 0;
  if (!starts) return { ...base, verdict: "start" };
  return { ...base, verdict: "resume", resumeFrom: firstOpenStep(issue, task), starts, data: st.data?.[task] || {} };
}

function begin(task) {
  let issue = findWorkIssue(task);
  if (!issue) {
    if (PREV[task]) throw new Error(`作業 issue がありません (${titleFor(task)})。${PREV[task]} が先に動く必要があります`);
    ensureLabels();
    issue = api("POST", "repos/{repo}/issues", { title: titleFor(task), body: newBody(task), labels: [labelFor(task)] });
  }
  const st = readState(issue);
  st.starts = { ...(st.starts || {}), [task]: (st.starts?.[task] || 0) + 1 };
  st.lastBegin = { ...(st.lastBegin || {}), [task]: new Date().toISOString() };
  const n = st.starts[task];
  let stalledTwice = false;
  if (n >= 3 && !st.stallNotified?.[task]) {
    stalledTwice = true;
    st.stallNotified = { ...(st.stallNotified || {}), [task]: true };
  }
  writeBody(issue, st);
  addLabels(issue.number, ["ops:in-progress", ...(stalledTwice ? ["ops:stalled-twice"] : [])]);
  if (n >= 2) {
    upsertComment(issue.number, `resume:${task}:${n}`,
      `${TITLES[task] || "E 週次レポート"}: ${n}回目の開始です。前回は途中で止まりました (利用上限など)。` +
      `${firstOpenStep(issue, task) || "最後"} から再開します。` + (stalledTwice ? "\n\n**同じ日に2回止まりました。** 所有者に通知します。" : ""));
  }
  return { date, task, issue: issue.number, url: issue.html_url, starts: n, resumeFrom: firstOpenStep(issue, task), stalledTwice, notify: stalledTwice };
}

function step(task, id, note) {
  const issue = findWorkIssue(task);
  if (!issue) throw new Error("作業 issue がありません");
  const st = readState(issue);
  const re = new RegExp(`- \\[[ x]\\] ${id} ([^\\n]*)`);
  writeBody(issue, st, (b) => b.replace(re, (m, rest) => {
    const name = rest.replace(/ — .*$/, "");
    return `- [x] ${id} ${name}${note ? ` — ${note}` : ""}`;
  }));
  return { issue: issue.number, step: id, checked: true };
}

function setData(task, key, value) {
  const issue = findWorkIssue(task);
  if (!issue) throw new Error("作業 issue がありません");
  const st = readState(issue);
  st.data = st.data || {};
  st.data[task] = { ...(st.data[task] || {}), [key]: value };
  writeBody(issue, st);
  return { issue: issue.number, task, key, saved: true };
}

function getData(task, key) {
  const issue = findWorkIssue(task || "A");
  const st = issue ? readState(issue) : {};
  const d = task ? st.data?.[task] || {} : st.data || {};
  return { issue: issue?.number ?? null, value: key ? d[key] ?? null : d };
}

function halt(task, reason) {
  const issue = findWorkIssue(task);
  if (!issue) throw new Error("作業 issue がありません");
  addLabels(issue.number, ["ops:halted"]);
  upsertComment(issue.number, `halt:${task}`, `**${TITLES[task] || task}: 止める条件に当たりました。**\n\n${reason}`);
  return { issue: issue.number, halted: true };
}

function done(task) {
  const issue = findWorkIssue(task);
  if (!issue) throw new Error("作業 issue がありません");
  addLabels(issue.number, [`ops:${task}-done`]);
  removeLabel(issue.number, "ops:in-progress");
  if (task === "C" || task === "E") api("PATCH", `repos/{repo}/issues/${issue.number}`, { state: "closed", state_reason: "completed" });
  return { issue: issue.number, task, done: true };
}

/** 異常 issue の起票。同じ指紋 (fp) の open issue があればコメントの追記だけにする */
function findings(file, maxNew) {
  const items = JSON.parse(readFileSync(file, "utf-8"));
  const fullCoverageKinds = new Set(items.fullCoverageKinds || []);
  const list_ = Array.isArray(items) ? items : items.findings;
  ensureLabels();
  const open = issues({ labels: ["ops:finding"], state: "open" });
  const byFp = new Map();
  for (const i of open) { const m = (i.body || "").match(/<!-- ops-fp:([^ ]+) -->/); if (m) byFp.set(m[1], i); }
  // 一覧 API は作った直後の issue を数秒〜数十秒返さないことがある。途中で止まって再開したときに
  // 二重に起票しないよう、作った issue の番号を作業 issue にもすぐ記録し、そちらも見る。
  const work = findWorkIssue("A");
  const wst = work ? readState(work) : {};
  const madeToday = { ...(wst.data?.A?.fps || {}) };
  for (const [fp, n] of Object.entries(madeToday)) {
    if (!byFp.has(fp)) {
      const i = api("GET", `repos/{repo}/issues/${n}`);
      if (i.state === "open") byFp.set(fp, i);
    }
  }
  const created = [], updated = [], overflow = [];
  for (const f of list_) {
    const hit = byFp.get(f.fp);
    if (hit) {
      upsertComment(hit.number, `seen:${date}`, `${date} の監査でも出ています (${f.count}件)。\n\n${f.sample || ""}`.trim());
      updated.push(hit.number);
      continue;
    }
    if (created.length >= maxNew) { overflow.push(f.title); continue; }
    const i = api("POST", "repos/{repo}/issues", {
      title: f.title, body: `${f.body}\n\n<!-- ops-fp:${f.fp} -->`, labels: ["ops:finding", f.label],
    });
    created.push(i.number);
    if (work) {
      madeToday[f.fp] = i.number;
      const st = readState(work);
      st.data = st.data || {};
      st.data.A = { ...(st.data.A || {}), fps: madeToday };
      writeBody(work, st);
    }
  }
  // 毎日全数を見ている種類で、今日は出なかったもの → 「解消した可能性」を1回だけ書く (自動では閉じない)
  const todays = new Set(list_.map((f) => f.fp));
  const gone = [];
  for (const [fp, i] of byFp) {
    const kind = fp.split(":")[0];
    if (fullCoverageKinds.has(kind) && !todays.has(fp)) {
      upsertComment(i.number, `gone:${date}`, `${date} の監査では出ていません。直っていれば閉じてください。`);
      gone.push(i.number);
    }
  }
  return { created, updated, overflow, gone };
}

function pr(head, title, bodyFile, issueNums) {
  const owner = repo().split("/")[0];
  const existing = api("GET", `repos/{repo}/pulls?state=open&head=${encodeURIComponent(`${owner}:${head}`)}`) || [];
  const body = readFileSync(bodyFile, "utf-8");
  if (existing.length) {
    const p = existing[0];
    if (p.body !== body || p.title !== title) api("PATCH", `repos/{repo}/pulls/${p.number}`, { title, body });
    return { pr: p.number, url: p.html_url, action: "updated" };
  }
  const daily = findWorkIssue("A");
  const st = daily ? readState(daily) : {};
  const todays = st.data?.C?.prs || [];
  if (todays.length >= MAX_PR_PER_DAY) return { action: "refused", reason: `今日はすでに PR を ${MAX_PR_PER_DAY} 件作っています (上限)`, prs: todays };
  const p = api("POST", "repos/{repo}/pulls", { title, body, head, base: BASE_BRANCH, draft: false });
  if (daily) {
    st.data = st.data || {};
    st.data.C = { ...(st.data.C || {}), prs: [...todays, p.number] };
    writeBody(daily, st);
  }
  for (const n of issueNums) { try { addLabels(n, ["ops:pr-open"]); } catch { /* issue が無くても PR は作れている */ } }
  return { pr: p.number, url: p.html_url, action: "created" };
}

function history(days) {
  const got = api("GET", `repos/{repo}/issues?labels=ops:daily&state=all&sort=created&direction=desc&per_page=${Math.min(100, days + 3)}`) || [];
  const from = new Date(Date.parse(date + "T00:00:00Z") - days * 86400000).toISOString().slice(0, 10);
  return got.filter((i) => i.title.slice(6) >= from && i.title.slice(6) <= date)
    .map((i) => ({ date: i.title.slice(6), issue: i.number, labels: i.labels.map((l) => l.name), data: readState(i).data || {} }));
}

try {
  const task = a.task;
  switch (cmd) {
    case "status": out(status(task)); break;
    case "begin": out(begin(task)); break;
    case "step": out(step(task, a.id, a.note)); break;
    case "set": out(setData(task, a.key, JSON.parse(a.json))); break;
    case "get": out(getData(task, a.key)); break;
    case "halt": out(halt(task, a.reason || "")); break;
    case "done": out(done(task)); break;
    case "comment": out(upsertComment(Number(a.issue), a.key, readFileSync(a["body-file"], "utf-8"))); break;
    case "findings": out(findings(a.file, Number(a["max-new"] ?? 15))); break;
    case "pr": out(pr(a.head, a.title, a["body-file"], String(a.issues || "").split(",").filter(Boolean).map(Number))); break;
    case "labels": ensureLabels(); out({ ok: true }); break;
    case "history": out(history(Number(a.days || 7))); break;
    default:
      console.error("使い方は scripts/ops/state.mjs の先頭のコメントを見てください");
      process.exit(2);
  }
} catch (e) {
  out({ error: e.message });
  process.exit(1);
}
