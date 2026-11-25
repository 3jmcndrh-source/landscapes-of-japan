#!/usr/bin/env node
/**
 * スクリーンショットの基準画像を GitHub Release (タグ ops-baseline) に置いて出し入れする。
 * git の履歴にもクローンにも入らないので、リポジトリは大きくならない。
 *
 *   node scripts/ops/visual.mjs pull                 基準画像を ops-out/shots/baseline/ に展開 (無ければ空のまま)
 *   node scripts/ops/visual.mjs accept-from-issues   所有者が ops:accept-visual を付けた issue の画像を「受け入れ」に登録
 *   node scripts/ops/visual.mjs push                 基準画像を更新して上げ直す (下の規則)
 *   node scripts/ops/visual.mjs diffs                今日の差分 (基準・今回・差分の3枚) を diffs-YYYY-MM-DD.tar.gz として上げる。7日より古いものは消す
 *
 * push の規則 — 差分があった画像は、所有者が受け入れるまで基準を書き換えない:
 *   - 基準がまだ無いとき → 今回の全画像を基準にする
 *   - 新しく増えた画像 (ページの型や言語が増えた) → 追加する
 *   - 受け入れ済み (accept-from-issues) の画像 → 今回の画像に差し替え、その issue を閉じる
 *
 * GitHub の操作は REST の `gh api` だけを使う (クラウドでは GraphQL が使えないため)。
 */
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { api, issues, repo } from "./lib/gh.mjs";
import { OPS_OUT, args, jstDate, readJSON, writeJSON } from "./lib/common.mjs";

const TAG = "ops-baseline";
const BASE_ASSET = "baseline.tar.gz";
const KEEP_DIFF_DAYS = 7;
const SHOTS = path.join(OPS_OUT, "shots");
const dir = (n) => path.join(SHOTS, n);
const a = args();
const cmd = a._[0];
const out = (o) => console.log(JSON.stringify(o, null, 1));

function release({ create = false } = {}) {
  try { return api("GET", `repos/{repo}/releases/tags/${TAG}`); } catch (e) {
    if (e.status !== 404 || !create) { if (e.status === 404) return null; throw e; }
  }
  return api("POST", "repos/{repo}/releases", {
    tag_name: TAG, target_commitish: "cloudflare-migration", name: "ops baseline (自動・削除しないこと)", prerelease: true,
    body: "運用タスク A が使う、スクリーンショットの基準画像と差分の置き場所です。scripts/ops/visual.mjs が自動で更新します。\n手で編集しないでください。消すと次の実行で基準画像を作り直します (その日は差分を検出できません)。",
  });
}

function tar(argv, cwd) {
  const r = spawnSync("tar", argv, { cwd, encoding: "utf-8" });
  if (r.status !== 0) throw new Error(`tar ${argv.join(" ")} failed: ${r.stderr}`);
}

function download(assetId, file) {
  const r = spawnSync("gh", ["api", "-H", "Accept: application/octet-stream", `repos/${repo()}/releases/assets/${assetId}`], { maxBuffer: 1024 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`asset download failed: ${r.stderr}`);
  writeFileSync(file, r.stdout);
}

function upload(rel, file, name) {
  for (const old of rel.assets || []) if (old.name === name) api("DELETE", `repos/{repo}/releases/assets/${old.id}`);
  const url = `https://uploads.github.com/repos/${repo()}/releases/${rel.id}/assets?name=${encodeURIComponent(name)}`;
  const r = spawnSync("gh", ["api", "-X", "POST", url, "-H", "Content-Type: application/gzip", "--input", file], { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`asset upload failed: ${(r.stderr || r.stdout).slice(0, 300)}`);
  return JSON.parse(r.stdout);
}

const pngs = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith(".png")) : []);

switch (cmd) {
  case "pull": {
    rmSync(dir("baseline"), { recursive: true, force: true });
    mkdirSync(dir("baseline"), { recursive: true });
    const rel = release();
    const asset = rel?.assets?.find((x) => x.name === BASE_ASSET);
    if (!asset) { out({ baseline: false, note: "基準画像がまだありません。今回の画像がそのまま基準になります" }); break; }
    download(asset.id, path.join(SHOTS, BASE_ASSET));
    tar(["-xzf", BASE_ASSET, "-C", "baseline"], SHOTS);
    out({ baseline: true, images: pngs(dir("baseline")).length, updatedAt: asset.updated_at, sizeMB: +(asset.size / 1048576).toFixed(1) });
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
    const accepted = new Set(a["accept-all"] ? cur.map((f) => f.replace(/\.png$/, "")) : (readJSON(path.join(OPS_OUT, "accepted.json"), { ids: [] }).ids));
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
    tar(["-czf", BASE_ASSET, "-C", "next", "."], SHOTS);
    const rel = release({ create: true });
    const asset = upload(rel, path.join(SHOTS, BASE_ASSET), BASE_ASSET);
    // 受け入れた issue を閉じる
    const acc = readJSON(path.join(OPS_OUT, "accepted.json"), { issues: [] });
    for (const n of acc.issues) {
      api("POST", `repos/{repo}/issues/${n}/comments`, { body: `基準画像を今回のスクリーンショットに更新しました (${jstDate()})。この issue を閉じます。` });
      api("PATCH", `repos/{repo}/issues/${n}`, { state: "closed", state_reason: "completed" });
    }
    out({ pushed: true, added, replaced, closed: acc.issues, sizeMB: +(asset.size / 1048576).toFixed(1) });
    break;
  }
  case "diffs": {
    const shots = readJSON(path.join(OPS_OUT, "audit-shots.json"), { changed: [] });
    const rel = release({ create: true });
    // 古い差分を消す
    const limit = new Date(Date.now() - KEEP_DIFF_DAYS * 86400000).toISOString().slice(0, 10);
    for (const x of rel.assets || []) {
      const m = x.name.match(/^diffs-(\d{4}-\d{2}-\d{2})\.tar\.gz$/);
      if (m && m[1] < limit) api("DELETE", `repos/{repo}/releases/assets/${x.id}`);
    }
    if (!shots.changed?.length) { writeJSON(path.join(OPS_OUT, "visual-diffs.json"), { url: null }); out({ uploaded: false, reason: "差分なし" }); break; }
    const pack = dir("pack");
    rmSync(pack, { recursive: true, force: true });
    for (const sub of ["baseline", "current", "diff"]) {
      mkdirSync(path.join(pack, sub), { recursive: true });
      for (const id of shots.changed) {
        const f = path.join(dir(sub), `${id}.png`);
        if (existsSync(f)) cpSync(f, path.join(pack, sub, `${id}.png`));
      }
    }
    const name = `diffs-${jstDate()}.tar.gz`;
    tar(["-czf", name, "-C", "pack", "."], SHOTS);
    const asset = upload(rel, path.join(SHOTS, name), name);
    writeJSON(path.join(OPS_OUT, "visual-diffs.json"), { url: asset.browser_download_url, name, count: shots.changed.length });
    out({ uploaded: true, url: asset.browser_download_url, count: shots.changed.length });
    break;
  }
  default:
    console.error("pull | accept-from-issues | push | diffs");
    process.exit(2);
}
