#!/usr/bin/env node
/**
 * ⑤ 掲載日 (サイトに追加された日時) → app/photo-added.js
 *
 * 撮影日 (photo-dates.js = EXIF DateTimeOriginal) とは別のデータ。
 * 何年も前に撮った写真でも、いま追加すれば「新着」に出る。
 *
 * 掲載日の定義:
 *   その写真IDが app/data.js に初めて載った日時。
 *   公開手順上、data.js に載った時点で全ページから参照できる = 掲載可能になった時点。
 *   テスト用の写真やアップロードに失敗した写真は data.js に入らないので、
 *   新着として数えられることはない。
 *
 * 決め方:
 *   1. すでに app/photo-added.js に記録がある写真 → そのまま (再生成しても変わらない)。
 *      再ビルド・再解析・再圧縮・翻訳の変更で掲載日が動かないようにするため。
 *   2. まだ記録が無い写真 → app/data.js を触った各コミットを古い順にたどり、
 *      そのIDが初めて現れたコミットの日時を採用する。
 *   3. リポジトリ履歴の最初のコミット時点ですでにあった写真 → 「不明」。
 *      履歴がそこまで遡れないので、掲載日をでっち上げない。EXIF の撮影日を
 *      掲載日として流用することもしない。不明の写真は新着扱いにしない。
 *   4. まだコミットされていない写真 (upload.mjs 実行直後) → 実行時刻。
 *      これがこの写真が掲載可能になった時点そのもの。
 *
 * 言語ごとの掲載日は持たない (写真は1枚で、掲載日も1つ)。
 *
 * 使い方: node scripts/generate-photo-added.mjs
 *   upload.mjs が写真追加時に自動実行する。
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { PREFECTURES } from "../app/data.js";

const OUT = path.resolve("app", "photo-added.js");
const ID_RE = /id:\s*"([^"]+)"/g;

const git = (args) => execFileSync("git", args, { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 });

/* ---- 現在の掲載写真 ---- */
const ids = [];
for (const pf of PREFECTURES) for (const p of pf.photos) ids.push(p.id);
const idSet = new Set(ids);

/* ---- 既存の記録を読む (上書きしない) ---- */
let prevAdded = {}, prevUnknown = [];
if (existsSync(OUT)) {
  const mod = await import(`file://${OUT}?t=${Date.now()}`);
  prevAdded = { ...(mod.PHOTO_ADDED || {}) };
  prevUnknown = [...(mod.PHOTO_ADDED_UNKNOWN || [])];
}

const known = {};
for (const id of ids) if (prevAdded[id]) known[id] = prevAdded[id];
const unknown = new Set(prevUnknown.filter((id) => idSet.has(id)));

const todo = ids.filter((id) => !known[id] && !unknown.has(id));

/* ---- git 履歴から初出コミットを探す ---- */
let fromGit = 0, fromNow = 0, rootUnknown = 0;
if (todo.length) {
  let shas = [];
  try {
    shas = git(["log", "--reverse", "--format=%H %aI", "--", "app/data.js"])
      .trim().split("\n").filter(Boolean).map((l) => {
        const i = l.indexOf(" ");
        return { sha: l.slice(0, i), date: l.slice(i + 1) };
      });
  } catch {
    console.warn("[added] git 履歴を読めませんでした。今回の実行時刻を掲載日にします。");
  }

  const pending = new Set(todo);
  for (const [i, c] of shas.entries()) {
    if (!pending.size) break;
    let blob;
    try { blob = git(["show", `${c.sha}:app/data.js`]); } catch { continue; }
    const seen = new Set();
    let m;
    ID_RE.lastIndex = 0;
    while ((m = ID_RE.exec(blob)) !== null) seen.add(m[1]);
    for (const id of [...pending]) {
      if (!seen.has(id)) continue;
      pending.delete(id);
      if (i === 0) { unknown.add(id); rootUnknown++; }  // 履歴の最初から居た = 遡れない
      else { known[id] = c.date; fromGit++; }
    }
  }
  const now = new Date().toISOString();
  for (const id of pending) { known[id] = now; fromNow++; }   // 未コミットの新規追加
}

/* ---- 出力 ---- */
const knownIds = Object.keys(known).sort();
const unknownIds = [...unknown].sort();
writeFileSync(
  OUT,
  `// 自動生成: node scripts/generate-photo-added.mjs (編集禁止)\n` +
  `// ⑤ 掲載日 = その写真が data.js に初めて載った日時 (撮影日 photo-dates.js とは別物)。\n` +
  `// 一度記録した値は再生成しても変わらない。履歴の最初から在った写真は掲載日不明。\n` +
  `export const PHOTO_ADDED = {\n` +
  knownIds.map((id) => `"${id}":"${known[id]}"`).join(",\n") +
  `\n};\n` +
  `// 掲載日が確認できない写真 (リポジトリ履歴の最初から在ったもの)。新着には出さない。\n` +
  `export const PHOTO_ADDED_UNKNOWN = ${JSON.stringify(unknownIds)};\n`,
  "utf-8"
);

console.log(
  `[added] 掲載中 ${ids.length} 枚 / 既存記録 ${ids.length - todo.length} / ` +
  `git履歴から新規 ${fromGit} / 実行時刻 ${fromNow} / 掲載日不明 ${rootUnknown + unknownIds.length - rootUnknown} (今回 ${rootUnknown} 件を不明と判定)`
);
console.log(`  出力 app/photo-added.js  既知 ${knownIds.length} / 不明 ${unknownIds.length}`);
