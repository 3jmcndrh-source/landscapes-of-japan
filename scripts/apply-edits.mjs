#!/usr/bin/env node
/**
 * 複数ファイルの置換をまとめて適用する作業用スクリプト。
 * このリポジトリのファイルは CRLF なので、比較は LF に揃えてから行い、
 * 書き戻すときに元の改行へ戻す (改行だけの差分を出さないため)。
 *
 *   node scripts/apply-edits.mjs <edits.json>
 *   [{ "file": "...", "from": "...", "to": "...", "count": 1 }]
 * 見つからない置換があれば何も書かずに終了する。
 */
import { readFileSync, writeFileSync } from "node:fs";

const edits = JSON.parse(readFileSync(process.argv[2], "utf-8"));
const byFile = new Map();
for (const e of edits) {
  if (!byFile.has(e.file)) {
    const raw = readFileSync(e.file, "utf-8");
    byFile.set(e.file, { crlf: raw.includes("\r\n"), text: raw.split("\r\n").join("\n") });
  }
  const st = byFile.get(e.file);
  const from = e.from.split("\r\n").join("\n");
  const n = st.text.split(from).length - 1;
  if (n === 0) { console.error(`見つからない: ${e.file}\n  ${from.slice(0, 80)}`); process.exit(1); }
  if (e.count && n !== e.count) { console.error(`件数が違う (${n} != ${e.count}): ${e.file}`); process.exit(1); }
  st.text = st.text.split(from).join(e.to.split("\r\n").join("\n"));
}
for (const [file, st] of byFile) {
  writeFileSync(file, st.crlf ? st.text.split("\n").join("\r\n") : st.text, "utf-8");
  console.log("更新:", file);
}
