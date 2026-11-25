/**
 * GitHub REST API を `gh api` 経由で呼ぶ薄い部品。
 *
 * クラウドのセッションでは gh の認証はプロキシが付け、GraphQL は使えない
 * (`gh issue` / `gh pr` は 403 になる)。そのため REST の `gh api repos/...` だけを使う。
 * 手元では、あなたの gh のログインでそのまま動く。
 */
import { spawnSync } from "node:child_process";

let REPO = process.env.OPS_REPO || "";
export function repo() {
  if (REPO) return REPO;
  const r = spawnSync("git", ["remote", "get-url", "origin"], { encoding: "utf-8" });
  const m = (r.stdout || "").match(/github\.com[/:]([^/]+\/[^/.\s]+?)(?:\.git)?\s*$/);
  if (!m) throw new Error("GitHub のリポジトリ名が分かりません (OPS_REPO=owner/name を設定してください)");
  REPO = m[1];
  return REPO;
}

/** gh api を呼んで JSON を返す。path の {repo} は owner/name に置き換える */
export function api(method, p, body) {
  const url = p.replace("{repo}", repo());
  const argv = ["api", "-X", method, url, "-H", "Accept: application/vnd.github+json"];
  if (body !== undefined) argv.push("--input", "-");
  const r = spawnSync("gh", argv, {
    input: body !== undefined ? JSON.stringify(body) : undefined,
    encoding: "utf-8", maxBuffer: 64 * 1024 * 1024,
  });
  if (r.status !== 0) {
    const msg = (r.stderr || r.stdout || "").trim().slice(0, 400);
    const e = new Error(`gh api ${method} ${url} failed: ${msg}`);
    e.status = Number((msg.match(/HTTP (\d{3})/) || [])[1]) || null;
    throw e;
  }
  const out = r.stdout.trim();
  return out ? JSON.parse(out) : null;
}

/** ページを全部たどる (per_page=100) */
export function list(p, max = 2000) {
  const all = [];
  for (let page = 1; all.length < max; page++) {
    const sep = p.includes("?") ? "&" : "?";
    const got = api("GET", `${p}${sep}per_page=100&page=${page}`);
    const items = Array.isArray(got) ? got : (got?.items || []);
    all.push(...items);
    if (items.length < 100) break;
  }
  return all;
}

/** issue 一覧 (PR を除く) */
export function issues({ labels = [], state = "open", max = 1000 } = {}) {
  const q = [`state=${state}`];
  if (labels.length) q.push(`labels=${encodeURIComponent(labels.join(","))}`);
  return list(`repos/{repo}/issues?${q.join("&")}`, max).filter((i) => !i.pull_request);
}

export const LABELS = {
  "ops:daily": ["0e8a16", "毎日の作業 issue (運用タスク A〜C の進捗)"],
  "ops:weekly": ["0e8a16", "週次レポート (タスク E)"],
  "ops:in-progress": ["fbca04", "運用タスクが作業中 (止まったら追いかけ実行が続きから再開する)"],
  "ops:A-done": ["c2e0c6", "A 監視が完了"],
  "ops:B-done": ["c2e0c6", "B 定型修正が完了"],
  "ops:C-done": ["c2e0c6", "C 調査・PR が完了"],
  "ops:E-done": ["c2e0c6", "E 週次レポートが完了"],
  "ops:halted": ["b60205", "途中で止める条件に当たった (ビルド失敗・大量の異常など)"],
  "ops:stalled-twice": ["b60205", "同じ日に2回止まった (利用上限など)"],
  "ops:finding": ["d4c5f9", "監査で見つかった異常"],
  "auto-fix": ["1d76db", "定型修正 (タスク B が直す)"],
  "investigate": ["5319e7", "調査が必要 (タスク C が調べる)"],
  "needs-decision": ["e99695", "要判断: 翻訳・デザイン・構成など。所有者が決める"],
  "ops:accept-visual": ["bfdadc", "見た目の差分を正として基準画像を更新する (所有者が付ける)"],
  "ops:pr-open": ["bfdadc", "この issue の修正 PR が出ている"],
  "ops:pause": ["000000", "これが付いた open な issue があると、運用タスクは全部なにもせず終わる (一時停止)"],
};

export function ensureLabels() {
  const have = new Set(list("repos/{repo}/labels").map((l) => l.name));
  for (const [name, [color, description]] of Object.entries(LABELS)) {
    if (!have.has(name)) api("POST", "repos/{repo}/labels", { name, color, description });
  }
}
