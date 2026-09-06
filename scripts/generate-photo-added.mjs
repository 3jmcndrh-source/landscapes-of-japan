#!/usr/bin/env node
/**
 * ⑤ 追加日 (サイトの管理データ app/data.js へ写真が加わった日時) → app/photo-added.js
 *
 * 撮影日 (photo-dates.js = EXIF DateTimeOriginal) とは別のデータ。
 * 何年も前に撮った写真でも、いま追加すれば「新着」に出る。
 *
 * この値が表すもの / 表さないもの:
 *   表す   … その写真IDが管理データ (app/data.js) に加わった日時。
 *   表さない … 本番サイトへその写真が公開された日時。デプロイは別操作なので、
 *             ここに記録された日時と本番公開の時刻は一致しない。
 *             「公開日を確認できた」とは扱わない。
 *   テスト用の写真やアップロードに失敗した写真は data.js に入らないので、
 *   新着として数えられることはない。
 *
 * 決め方 (2つを区別する):
 *   [過去分の復元]
 *   1. すでに app/photo-added.js に記録がある写真 → そのまま。
 *      再生成・再ビルド・再解析・再圧縮・翻訳の変更で日時が動かないようにするため。
 *   2. まだ記録が無い既存写真 → app/data.js を触った各コミットを古い順にたどり、
 *      そのIDが初めて現れた「コミットの日時」を採用する。
 *      これはコミットの記録であって、公開作業の記録ではない。
 *   3. リポジトリ履歴の最初のコミット時点ですでにあった写真 → 「不明」。
 *      履歴がそこまで遡れないので日時をでっち上げない。EXIF の撮影日を
 *      流用することもしない。不明の写真は今日追加したことにもしない (新着に出さない)。
 *   [今後の追加]
 *   4. まだコミットされていない写真 (upload.mjs 実行直後) → この処理の実行時刻。
 *      写真追加処理そのものが記録する日時で、以後は 1. により変わらない。
 *
 * 言語ごとの追加日は持たない (写真は1枚で、追加日も1つ)。
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

/* ---- 現在サイトに載っている写真 ---- */
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
    console.warn("[added] git 履歴を読めませんでした。今回の実行時刻を追加日にします。");
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
  `// ⑤ 追加日 = その写真が サイトの管理データ (app/data.js) に加わった日時。\n` +
  `// 撮影日 (photo-dates.js) とも、本番サイトへの公開日時とも別物。\n` +
  `// 過去分はコミット履歴から復元した値、今後の分は写真追加処理が記録した実行時刻。\n` +
  `// 一度記録した値は再生成しても変わらない。履歴の最初から在った写真は追加日不明。\n` +
  `export const PHOTO_ADDED = {\n` +
  knownIds.map((id) => `"${id}":"${known[id]}"`).join(",\n") +
  `\n};\n` +
  `// 追加日が確認できない写真 (リポジトリ履歴の最初から在ったもの)。新着には出さない。\n` +
  `export const PHOTO_ADDED_UNKNOWN = ${JSON.stringify(unknownIds)};\n`,
  "utf-8"
);

console.log(
  `[added] 対象 ${ids.length} 枚 / 既存記録 ${ids.length - todo.length} / ` +
  `git履歴から新規 ${fromGit} / 実行時刻 ${fromNow} / 追加日不明 ${rootUnknown + unknownIds.length - rootUnknown} (今回 ${rootUnknown} 件を不明と判定)`
);
console.log(`  出力 app/photo-added.js  既知 ${knownIds.length} / 不明 ${unknownIds.length}`);
