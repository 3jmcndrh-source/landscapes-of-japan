#!/usr/bin/env node
/**
 * スクリーンショットの基準画像を、GitHub の独自の参照 `refs/ops/baseline` に置いて出し入れする。
 *
 * なぜ Release ではないか: クラウドのセッションの GitHub プロキシは JSON 以外の送信を受け付けない
 * (Release へのファイルのアップロードは HTTP 415 になる。2026-11-25 の初回の実行で判明)。
 * git のデータ API (blobs / trees / commits / refs) は JSON で送れるので、これを使う。
 * `refs/ops/*` は通常の clone / fetch では取得されない (取得するのは refs/heads と refs/tags だけ) ので、
 * リポジトリのクローンは大きくならない。古い基準画像は参照から外れ、GitHub 側でいずれ掃除される。
 *
 *   node scripts/ops/visual.mjs pull                 基準画像を ops-out/shots/baseline/ に展開 (無ければ空のまま)
 *   node scripts/ops/visual.mjs accept-from-issues   所有者が ops:accept-visual を付けた issue の画像を「受け入れ」に登録
 *   node scripts/ops/visual.mjs push                 基準画像を更新して上げ直す (下の規則)
 *   node scripts/ops/visual.mjs diffs                今日の差分 (基準・今回・差分の画像) を refs/ops/diffs/YYYY-MM-DD に置く。7日より古いものは消す
 *
 * push の規則 — 差分があった画像は、所有者が受け入れるまで基準を書き換えない:
 *   - 基準がまだ無いとき → 今回の全画像を基準にする
 *   - 新しく増えた画像 (ページの型や言語が増えた) → 追加する
 *   - 受け入れ済み (accept-from-issues) の画像 → 今回の画像に差し替え、その issue を閉じる
 */
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { api, issues, repo } from "./lib/gh.mjs";
import { OPS_OUT, args, jstDate, readJSON, writeJSON } from "./lib/common.mjs";

const BASE_REF = "ops/baseline";             // refs/ops/baseline
const DIFF_REF = (d) => `ops/diffs/${d}`;     // refs/ops/diffs/YYYY-MM-DD
const ARCHIVE = "baseline.tar.gz";
const PART = 4 * 1024 * 1024;                 // 1つの blob は 4MB まで (JSON に base64 で載せるため控えめに)
const KEEP_DIFF_DAYS = 7;
const SHOTS = path.join(OPS_OUT, "shots");
const dir = (n) => path.join(SHOTS, n);
const a = args();
const cmd = a._[0];
const out = (o) => console.log(JSON.stringify(o, null, 1));

function tar(argv, cwd) {
  const r = spawnSync("tar", argv, { cwd, encoding: "utf-8" });
  if (r.status !== 0) throw new Error(`tar ${argv.join(" ")} failed: ${r.stderr}`);
}

function getRef(ref) {
  try { return api("GET", `repos/{repo}/git/ref/${ref}`); } catch (e) { if (e.status === 404) return null; throw e; }
}
function setRef(ref, sha) {
  if (getRef(ref)) return api("PATCH", `repos/{repo}/git/refs/${ref}`, { sha, force: true });
  return api("POST", "repos/{repo}/git/refs", { ref: `refs/${ref}`, sha });
}
function blob(buf) { return api("POST", "repos/{repo}/git/blobs", { content: buf.toString("base64"), encoding: "base64" }).sha; }
/** ファイル群 [{path, buf}] を1つのコミットにして参照を向ける (親なし = 履歴を積まない) */
function commitFiles(ref, files, message) {
  const tree = api("POST", "repos/{repo}/git/trees", {
    tree: files.map((f) => ({ path: f.path, mode: "100644", type: "blob", sha: blob(f.buf) })),
  }).sha;
  const commit = api("POST", "repos/{repo}/git/commits", { message, tree, parents: [] }).sha;
  setRef(ref, commit);
  return commit;
}

const pngs = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith(".png")) : []);

switch (cmd) {
  case "pull": {
    rmSync(dir("baseline"), { recursive: true, force: true });
    mkdirSync(dir("baseline"), { recursive: true });
    const ref = getRef(BASE_REF);
    if (!ref) { out({ baseline: false, note: "基準画像がまだありません。今回の画像がそのまま基準になります" }); break; }
    const commit = api("GET", `repos/{repo}/git/commits/${ref.object.sha}`);
    const tree = api("GET", `repos/{repo}/git/trees/${commit.tree.sha}`);
    const parts = tree.tree.filter((t) => t.path.startsWith(ARCHIVE + ".part")).sort((x, y) => x.path.localeCompare(y.path));
    const buf = Buffer.concat(parts.map((p) => Buffer.from(api("GET", `repos/{repo}/git/blobs/${p.sha}`).content, "base64")));
    writeFileSync(path.join(SHOTS, ARCHIVE), buf);
    tar(["-xzf", ARCHIVE, "-C", "baseline"], SHOTS);
    out({ baseline: true, images: pngs(dir("baseline")).length, updated: commit.message, sizeMB: +(buf.length / 1048576).toFixed(1) });
    break;
  }
  case "accept-from-issues": {
    const ids = new Set(), nums = [];
    for (const i of issues({ labels: ["ops:accept-visual"], state: "open" })) {
      const m = (i.body || "").match(/<!-- ops-shots:([^ ]+) -->/);
      if (!m) continue;
      m[1].split(",").forEach((x) => ids.add(x));
      nums.push(i.number);
    }
    writeJSON(path.join(OPS_OUT, "accepted.json"), { ids: [...ids], issues: nums });
    out({ accepted: ids.size, issues: nums });
    break;
  }
  case "push": {
    const cur = pngs(dir("current"));
    if (!cur.length) { out({ pushed: false, reason: "今回のスクリーンショットがありません (audit --phase=shots を先に)" }); break; }
    const base = new Set(pngs(dir("baseline")));
    const accepted = new Set(a["accept-all"] ? cur.map((f) => f.replace(/\.png$/, "")) : (readJSON(path.join(OPS_OUT, "accepted.json"), { ids: [] }).ids || []));
    const next = dir("next");
    rmSync(next, { recursive: true, force: true });
    mkdirSync(next, { recursive: true });
    if (base.size) cpSync(dir("baseline"), next, { recursive: true });
    let added = 0, replaced = 0;
    for (const f of cur) {
      const id = f.replace(/\.png$/, "");
      if (!base.has(f)) { cpSync(path.join(dir("current"), f), path.join(next, f)); added++; }
      else if (accepted.has(id)) { cpSync(path.join(dir("current"), f), path.join(next, f)); replaced++; }
    }
    if (!added && !replaced) { out({ pushed: false, reason: "基準画像に変更なし" }); break; }
    tar(["-czf", ARCHIVE, "-C", "next", "."], SHOTS);
    const buf = readFileSync(path.join(SHOTS, ARCHIVE));
    const files = [];
    for (let i = 0, n = 0; i < buf.length; i += PART, n++) files.push({ path: `${ARCHIVE}.part${String(n).padStart(3, "0")}`, buf: buf.subarray(i, i + PART) });
    const commit = commitFiles(BASE_REF, files, `ops baseline ${jstDate()} (+${added} / 差し替え ${replaced})`);
    const acc = readJSON(path.join(OPS_OUT, "accepted.json"), { issues: [] });
    for (const n of acc.issues || []) {
      api("POST", `repos/{repo}/issues/${n}/comments`, { body: `基準画像を今回のスクリーンショットに更新しました (${jstDate()})。この issue を閉じます。` });
      api("PATCH", `repos/{repo}/issues/${n}`, { state: "closed", state_reason: "completed" });
    }
    out({ pushed: true, added, replaced, closed: acc.issues || [], parts: files.length, sizeMB: +(buf.length / 1048576).toFixed(1), commit });
    break;
  }
  case "diffs": {
    // 古い差分を消す
    const limit = new Date(Date.now() - KEEP_DIFF_DAYS * 86400000).toISOString().slice(0, 10);
    let old = [];
    try { old = api("GET", "repos/{repo}/git/matching-refs/ops/diffs/") || []; } catch { /* まだ無い */ }
    for (const r of old) {
      const d = r.ref.split("/").pop();
      if (d < limit) api("DELETE", `repos/{repo}/git/${r.ref}`);
    }
    const shots = readJSON(path.join(OPS_OUT, "audit-shots.json"), { changed: [] });
    if (!shots.changed?.length) { writeJSON(path.join(OPS_OUT, "visual-diffs.json"), { url: null }); out({ uploaded: false, reason: "差分なし" }); break; }
    const files = [];
    for (const id of shots.changed) {
      for (const sub of ["diff", "current", "baseline"]) {
        const f = path.join(dir(sub), `${id}.png`);
        if (existsSync(f)) files.push({ path: `${sub}/${id}.png`, buf: readFileSync(f) });
      }
    }
    const date = jstDate();
    const commit = commitFiles(DIFF_REF(date), files, `ops diffs ${date} (${shots.changed.length}件)`);
    const url = `https://github.com/${repo()}/tree/${commit}`;
    writeJSON(path.join(OPS_OUT, "visual-diffs.json"), { url, commit, count: shots.changed.length });
    out({ uploaded: true, url, count: shots.changed.length });
    break;
  }
  default:
    console.error("pull | accept-from-issues | push | diffs");
    process.exit(2);
}
