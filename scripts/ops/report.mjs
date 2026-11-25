#!/usr/bin/env node
/**
 * 監査結果 (ops-out/audit-*.json) をまとめて、issue にする単位 (指紋 fp 付き) と日本語の要約を作る。
 *
 *   node scripts/ops/report.mjs [--prev-total=N]
 *
 * 出力:
 *   ops-out/findings.json  … state.mjs findings に渡す (同じ不具合は fp が同じになるので、issue が重複しない)
 *   ops-out/summary.md     … 作業 issue と通知メールに貼る要約
 *   標準出力               … 短い JSON (件数・止める条件に当たったか)
 *
 * まとめ方: 同じ種類・同じページの型 (例 /:lang/:pref/:loc) ・同じ内容なら、何ページで出ても 1件にする。
 * 止める条件: 異常のあったページが確認したページの 20% を超える / issue にする単位が 30 を超える /
 *            前回 (--prev-total) の3倍かつ 200件を超える
 */
import path from "node:path";
import { writeFileSync } from "node:fs";
import { OPS_OUT, args, jstDate, readJSON, routeTemplate, sha, writeJSON } from "./lib/common.mjs";

const a = args();
const date = jstDate();

/* ビルドが失敗した日: node scripts/ops/report.mjs --build-failed=ops-out/build.log
   → ops-out/findings-halt.json に「ビルド失敗」1件だけを書く (指紋は日付を含まないので、直るまで同じ issue に追記される) */
if (a["build-failed"]) {
  const { readFileSync, existsSync } = await import("node:fs");
  const log = existsSync(a["build-failed"]) ? readFileSync(a["build-failed"], "utf-8").split(/\r?\n/).slice(-60).join("\n") : "(ログなし)";
  writeJSON(path.join(OPS_OUT, "findings-halt.json"), { date, fullCoverageKinds: [], findings: [{
    fp: "build:failed", kind: "build", label: "investigate", count: 1,
    title: "[監査] ビルドが失敗しています (npm run build)",
    body: `**${date}** の監視で \`npm run build\` が失敗しました。監査は行っていません。\n\nログの末尾:\n\n\`\`\`\n${log.slice(-6000)}\n\`\`\`\n\nタスク C が最初に調べます。`,
    sample: `ログの末尾:\n\n\`\`\`\n${log.split("\n").slice(-15).join("\n")}\n\`\`\``,
  }] });
  console.log(JSON.stringify({ buildFailed: true, file: "ops-out/findings-halt.json" }));
  process.exit(0);
}
const phases = ["http", "browser", "shots"].map((p) => readJSON(path.join(OPS_OUT, `audit-${p}.json`))).filter(Boolean)
  .filter((r) => r.date === date || a["any-date"]);
const visualDiffs = readJSON(path.join(OPS_OUT, "visual-diffs.json"), { url: null });

const KIND_JA = {
  http: "HTTP ステータスの異常", link: "リンク切れ", "link-client": "画面内で作るリンクの切れ", "link-meta": "sitemap・feed などのリンク切れ",
  "image-missing": "配信画像が無い", noindex: "sitemap に noindex のページ", console: "console error", pageerror: "ページの JavaScript エラー",
  "asset-404": "読み込めないファイル", overflow: "横方向のはみ出し", "alt-missing": "alt の欠け", visual: "見た目の差分",
  "load-failed": "ページを開けない", "shot-missing": "代表ページが無い", "link-check-failed": "リンク検査が動かない",
};
/** 自動修正 (B) に回すもの。それ以外は調査 (C)。翻訳・デザインに関わるかどうかは B/C が判断して needs-decision にする */
const AUTO_FIX = new Set(["alt-missing", "link", "link-client", "link-meta"]);
/** 毎日全数を見ている種類 (今日出なければ「解消した可能性」と書ける) */
const FULL_COVERAGE = ["http", "link", "link-client", "link-meta", "noindex", "visual", "shot-missing"];

const norm = (s) => String(s || "")
  .replace(/https?:\/\/[^\s)"']+/g, "<url>").replace(/\b[0-9a-f]{6,}\b/gi, "<hash>").replace(/\d+/g, "<n>").slice(0, 160);

function groupKey(f) {
  const tpl = routeTemplate(f.path || "");
  switch (f.kind) {
    case "http": return [`${f.kind}`, `${f.status}`, tpl];
    case "link": case "link-client": case "link-meta": return [f.kind, routeTemplate(String(f.target).split(/[?#]/)[0])];
    case "image-missing": return [f.kind, tpl];
    case "console": case "pageerror": return [f.kind, norm(f.text), tpl];
    case "asset-404": return [f.kind, norm(String(f.text).replace(/\?.*$/, "")), tpl];
    case "overflow": return [f.kind, f.viewport, f.detail?.offenders?.[0]?.selector || "?", tpl];
    case "alt-missing": return [f.kind, tpl];
    case "visual": return [f.kind, f.name, f.viewport];
    default: return [f.kind, tpl, norm(f.detail)];
  }
}

const groups = new Map();
const pagesBad = new Set();
let checked = 0;
for (const r of phases) {
  checked += r.checked || 0;
  for (const f of r.findings) {
    const key = groupKey(f);
    const fp = `${f.kind}:${sha(key.join("|"))}`;
    const g = groups.get(fp) || { fp, kind: f.kind, key, items: [] };
    g.items.push(f);
    groups.set(fp, g);
    if (f.path && f.path !== "-") pagesBad.add(f.path);
  }
}

function md(g) {
  const f0 = g.items[0];
  const pages = [...new Set(g.items.map((f) => f.path))];
  const L = [];
  L.push(`**種類**: ${KIND_JA[g.kind] || g.kind} / **件数**: ${g.items.length}件 / ${pages.length}ページ / **初めて見つけた日**: ${date}`);
  L.push("");
  if (g.kind === "overflow") {
    L.push(`幅 ${f0.detail.width}px の画面で、ページの幅が ${f0.detail.scrollWidth}px に広がっています。はみ出している要素:`);
    for (const o of f0.detail.offenders) L.push(`- \`${o.selector}\` (左端 ${o.left}px / 右端 ${o.right}px)`);
  } else if (g.kind === "console" || g.kind === "pageerror" || g.kind === "asset-404") {
    L.push("```"); L.push(String(f0.text).slice(0, 500)); L.push("```");
    if (f0.url) L.push(`発生元: \`${f0.url}\``);
  } else if (g.kind.startsWith("link") || g.kind === "image-missing") {
    const targets = [...new Set(g.items.map((f) => f.target))];
    L.push(`行き先 ${targets.length}種類:`);
    for (const t of targets.slice(0, 15)) {
      const it = g.items.find((f) => f.target === t);
      L.push(`- \`${t}\`${it.count ? ` ×${it.count}` : ""}${it.samples?.length ? ` (例: ${it.samples.slice(0, 2).join(", ")})` : ""}`);
    }
    if (targets.length > 15) L.push(`- … ほか ${targets.length - 15}種類`);
  } else if (g.kind === "visual") {
    const shots = g.items.map((f) => f.shot);
    L.push(`代表ページ「${f0.name}」(${f0.viewport}) のスクリーンショットが、基準画像と ${Math.max(...g.items.map((f) => f.ratio))}% 以上違います (${shots.length}言語)。`);
    if (g.items.some((f) => f.dims)) L.push(`ページの高さが変わったもの: ${g.items.filter((f) => f.dims).map((f) => `${f.shot} ${f.dims}`).slice(0, 5).join(" / ")}`);
    L.push(visualDiffs.url ? `基準・今回・差分の画像: ${visualDiffs.url} (7日で消えます)` : "差分の画像は上げられませんでした。");
    L.push("");
    L.push("意図した変更なら、所有者がこの issue に `ops:accept-visual` ラベルを付けると、次の A の実行で基準画像が更新され、この issue は閉じます。");
    L.push(`<!-- ops-shots:${shots.join(",")} -->`);
  } else if (g.kind === "alt-missing") {
    L.push(`alt 属性の無い画像 (例): ${[...new Set(g.items.flatMap((f) => f.samples || []))].slice(0, 5).map((s) => `\`${s}\``).join(", ")}`);
  } else if (f0.detail || f0.status) {
    L.push(`${f0.status ? `ステータス ${f0.status} / ` : ""}${typeof f0.detail === "string" ? f0.detail : ""}`);
  }
  L.push("");
  L.push("**出たページ (例)**");
  for (const p of pages.slice(0, 10)) {
    const vps = [...new Set(g.items.filter((f) => f.path === p).map((f) => f.viewport).filter(Boolean))];
    L.push(`- \`${p}\`${vps.length ? ` (${vps.join(", ")})` : ""}`);
  }
  if (pages.length > 10) L.push(`- … ほか ${pages.length - 10}ページ`);
  L.push("");
  L.push("**再現** (ビルド後に)");
  const phase = ["http", "link", "link-client", "link-meta", "noindex"].includes(g.kind) ? "http" : g.kind === "visual" ? "shots" : "browser";
  L.push("```");
  L.push(phase === "browser" ? `node scripts/ops/audit.mjs --phase=browser --paths=${pages.slice(0, 3).join(",")}` : `node scripts/ops/audit.mjs --phase=${phase}`);
  L.push("```");
  L.push("");
  L.push(`ラベルの意味: \`auto-fix\` = タスク B が直す / \`investigate\` = タスク C が調べる / 翻訳・デザイン・構成に関わるなら \`needs-decision\` にして提案だけにする。`);
  return L.join("\n");
}

const findings = [...groups.values()].map((g) => {
  const f0 = g.items[0];
  const tpl = routeTemplate(f0.path || "");
  const what = g.kind === "visual" ? `${f0.name} (${f0.viewport})`
    : g.kind === "overflow" ? `${f0.viewport} ${f0.detail?.offenders?.[0]?.selector || ""} @ ${tpl}`
    : g.kind.startsWith("link") || g.kind === "image-missing" ? `${[...new Set(g.items.map((f) => f.target))].length}種類 @ ${tpl}`
    : g.kind === "console" || g.kind === "pageerror" ? `${String(f0.text).slice(0, 60)} @ ${tpl}`
    : g.kind === "http" ? `${f0.status} @ ${tpl}` : tpl;
  return {
    fp: g.fp, kind: g.kind, label: AUTO_FIX.has(g.kind) ? "auto-fix" : "investigate", count: g.items.length,
    title: `[監査] ${KIND_JA[g.kind] || g.kind}: ${what}`.slice(0, 120),
    body: md(g),
    sample: `例: ${[...new Set(g.items.map((f) => f.path))].slice(0, 3).map((p) => `\`${p}\``).join(", ")}`,
  };
});

/* ---------- 止める条件 ---------- */
const browser = phases.find((r) => r.phase === "browser");
const totalPages = (browser?.paths || 0) + (phases.find((r) => r.phase === "http")?.urls || 0);
const badRatio = totalPages ? pagesBad.size / totalPages : 0;
const prevTotal = Number(a["prev-total"] || 0);
const total = findings.reduce((s, f) => s + f.count, 0);
const reasons = [];
if (badRatio > 0.2) reasons.push(`異常のあったページが確認したページの ${Math.round(badRatio * 100)}% (20% を超えた)`);
if (findings.length > 30) reasons.push(`issue にする単位が ${findings.length}件 (30件を超えた)`);
if (prevTotal && total > prevTotal * 3 && total > 200) reasons.push(`異常が ${total}件で、前回 ${prevTotal}件の3倍を超えた`);
if (phases.some((r) => r.findings.some((f) => f.kind === "link-check-failed"))) reasons.push("リンク検査そのものが動かなかった");
const halt = { should: reasons.length > 0, reasons };

/* ---------- 要約 ---------- */
const S = [];
S.push(`### 監査の結果 (${date})`);
for (const r of phases) {
  const extra = r.phase === "http" ? `sitemap ${r.urls} URL` : r.phase === "browser" ? `${r.paths}ページ × 2幅 (組 ${r.shard ?? "指定"})` : `${r.shots}枚 (新規 ${r.newShots?.length || 0} / 差分 ${r.changed?.length || 0})`;
  S.push(`- **${r.phase}**: ${extra}、${Math.round(r.durationSec / 60)}分、異常 ${r.findings.length}件${r.notes?.length ? ` — ${r.notes.join(" / ")}` : ""}`);
}
if (browser?.external && Object.keys(browser.external).length) S.push(`- 遮断した外部への通信: ${Object.entries(browser.external).map(([h, n]) => `${h} ×${n}`).join(", ")}`);
S.push("");
if (!findings.length) S.push("異常は見つかりませんでした。");
else {
  S.push("| 種類 | 件数 | 振り分け | 内容 |");
  S.push("|---|---|---|---|");
  for (const f of findings.slice(0, 40)) S.push(`| ${KIND_JA[f.kind] || f.kind} | ${f.count} | ${f.label} | ${f.title.replace(/^\[監査\] [^:]+: /, "").replace(/\|/g, "\\|")} |`);
  if (findings.length > 40) S.push(`| … | | | ほか ${findings.length - 40}件 |`);
}
if (halt.should) { S.push(""); S.push(`**止める条件に当たりました**: ${reasons.join(" / ")}`); }

writeJSON(path.join(OPS_OUT, "findings.json"), { date, findings, fullCoverageKinds: FULL_COVERAGE, halt, total, checked });
writeFileSync(path.join(OPS_OUT, "summary.md"), S.join("\n"));
// 止める条件に当たった日は、個別の issue を作らず、この1件だけを起票する (state.mjs findings --file=ops-out/findings-halt.json)
writeJSON(path.join(OPS_OUT, "findings-halt.json"), { date, fullCoverageKinds: [], findings: halt.should ? [{
  fp: `mass:${date}`, kind: "mass", label: "investigate", count: total,
  title: `[監査] 想定外の大量の異常 (${date}): ${findings.length}種類 / ${total}件`,
  body: `監査で想定外の量の異常が出たため、個別の issue は作らずにここへまとめました。\n\n理由: ${reasons.join(" / ")}\n\n${S.join("\n")}\n\n` +
    "ビルドや監査の環境そのものの不具合も疑ってください。タスク C が最初に調べます。",
  sample: "",
}] : [] });
console.log(JSON.stringify({ date, groups: findings.length, total, checked, autoFix: findings.filter((f) => f.label === "auto-fix").length, investigate: findings.filter((f) => f.label === "investigate").length, halt }, null, 1));
