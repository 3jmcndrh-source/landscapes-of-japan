#!/usr/bin/env node
/**
 * Cloudflare Pages 用の post-build cleanup
 *
 * Next.js static export は各ページに対して大量の .txt ファイル
 * (RSC payload、client-side 遷移用) を生成する。
 * static hosting では不要、Cloudflare Pages 20k 上限を超過する原因。
 *
 * 削除対象:
 * - .map (source maps)
 * - .txt で RSC payload (__next/__PAGE__ パスを含む or ペア HTML/dir がある)
 *
 * 保護対象 (user files in public/):
 * - robots.txt, llms.txt, ads.txt 等
 * - GSC 認証ファイル (.html in public/) 等
 * - public/ にあった全ファイル
 */
import fs from "fs";
import path from "path";

const OUT_DIR = "out";
const PUBLIC_DIR = "public";

// public/ にある全ファイル名を読み取り → 保護リスト作成
const PROTECTED = new Set();
function collectPublic(dir, rel = "") {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) collectPublic(path.join(dir, e.name), r);
    else PROTECTED.add(r); // 相対パス保持
  }
}
collectPublic(PUBLIC_DIR);
console.log(`[cleanup] Protected files from public/: ${PROTECTED.size}`);

let deletedTxt = 0;
let deletedMap = 0;
let deletedDirs = 0;

function shouldDelete(filePath) {
  const rel = path.relative(OUT_DIR, filePath).replace(/\\/g, "/");
  // public/ 由来のファイルは絶対保護
  if (PROTECTED.has(rel)) return false;
  // source map は常に削除
  if (filePath.endsWith(".map")) return true;
  if (!filePath.endsWith(".txt")) return false;
  // RSC payload patterns
  if (rel.includes("__next") || rel.includes("__PAGE__")) return true;
  // sibling .html (e.g., /ja/hokkaido.txt の隣に /ja/hokkaido.html)
  if (fs.existsSync(filePath.replace(/\.txt$/, ".html"))) return true;
  // sibling dir (e.g., /ja.txt の隣に /ja/ dir)
  const dirPair = filePath.replace(/\.txt$/, "");
  if (fs.existsSync(dirPair)) {
    try { if (fs.statSync(dirPair).isDirectory()) return true; } catch {}
  }
  return false;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      try {
        if (fs.readdirSync(full).length === 0) {
          fs.rmdirSync(full);
          deletedDirs++;
        }
      } catch {}
    } else if (entry.isFile() && shouldDelete(full)) {
      if (entry.name.endsWith(".map")) deletedMap++;
      else deletedTxt++;
      fs.unlinkSync(full);
    }
  }
}

console.log(`[cleanup] Scanning ${OUT_DIR}/ ...`);
const beforeCount = countFiles(OUT_DIR);
console.log(`[cleanup] Before: ${beforeCount} files`);

walk(OUT_DIR);

const afterCount = countFiles(OUT_DIR);
console.log(`[cleanup] Deleted: ${deletedTxt} RSC .txt, ${deletedMap} .map, ${deletedDirs} empty dirs`);
console.log(`[cleanup] After:  ${afterCount} files`);
console.log(`[cleanup] Cloudflare Pages Free limit: 20,000 files`);
if (afterCount > 20000) {
  console.error(`[cleanup] ⚠️  File count exceeds Free plan limit. Need Pro ($20/mo) or further reduction.`);
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
