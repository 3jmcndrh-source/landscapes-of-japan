#!/usr/bin/env node
/**
 * Cloudflare Pages 用の post-build cleanup
 *
 * Next.js の static export は各ページに対して大量の .txt ファイル
 * (RSC payload、client-side 遷移用) を生成する。
 * これらは static hosting では不要で、Cloudflare Pages の 20k file 上限 (Free) を
 * 超過する原因になる。
 *
 * 削除しても: HTML/CSS/JS 配信は正常動作。
 * 影響: Link クリック時の soft navigation が full page load に fallback (体感差ゼロ)
 */
import fs from "fs";
import path from "path";

const OUT_DIR = "out";

let deletedTxt = 0;
let deletedDirs = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      // 削除後にディレクトリが空になったら削除
      try {
        if (fs.readdirSync(full).length === 0) {
          fs.rmdirSync(full);
          deletedDirs++;
        }
      } catch {}
    } else if (entry.isFile()) {
      // RSC payload (.txt) を削除
      if (entry.name.endsWith(".txt") || entry.name.endsWith(".map")) {
        fs.unlinkSync(full);
        deletedTxt++;
      }
    }
  }
}

console.log(`[cleanup] Scanning ${OUT_DIR}/ ...`);
const beforeCount = countFiles(OUT_DIR);
console.log(`[cleanup] Before: ${beforeCount} files`);

walk(OUT_DIR);

const afterCount = countFiles(OUT_DIR);
console.log(`[cleanup] Deleted: ${deletedTxt} .txt/.map files, ${deletedDirs} empty dirs`);
console.log(`[cleanup] After:  ${afterCount} files`);
console.log(`[cleanup] Cloudflare Pages Free limit: 20,000 files`);
if (afterCount > 20000) {
  console.error(`[cleanup] ⚠️  File count exceeds Free plan limit. Pro plan ($20/mo) required.`);
  process.exit(0); // 警告だけ、エラーで止めない
} else {
  console.log(`[cleanup] ✅ Under Free plan limit (${20000 - afterCount} files headroom)`);
}

function countFiles(dir) {
  let n = 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) n += countFiles(path.join(dir, e.name));
    else n++;
  }
  return n;
}
