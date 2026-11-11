#!/usr/bin/env node
/**
 * 共有用の画像 (リンクを LINE / X / Slack などに貼ったときに出る画像) を作る。
 *
 *   node scripts/generate-og-images.mjs [--force | --redo-portrait]
 *
 * 出力: images-dist/{id}_og.jpg  (1200×630 の JPEG。全掲載写真ぶん)
 *
 * なぜ別に作るのか:
 *   - 以前は写真詳細とコレクションだけが共有用画像を持ち、都道府県・撮影地・ギャラリー・
 *     コレクション一覧・47都道府県 のページには無かった (貼っても画像が出ない)。
 *   - 持っていたページも WebP (_w1200.webp) を指していた。WebP を共有画像として
 *     表示できないサービスがあるので、どこでも出る JPEG にそろえる。
 *   - 1200×630 は各サービスが想定している比率 (約1.91:1)。こちらで切っておけば、
 *     サービス側の機械的な中央切り抜きで主題が外れることが減る。
 *     切る位置は sharp の attention (目立つ部分を残す) に任せる。
 *
 * 一覧やビューアに出す写真そのものは切らない。これは共有時の小さな見出し画像だけの話。
 *
 * 入力: 原本庫 (manifest.json が台帳)。既にあるファイルは作り直さない (--force で作り直す)。
 * upload.mjs が写真追加のたびに、追加分だけ作る。
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { PREFECTURES } from "../app/data.js";
import { PHOTO_DIMS } from "../app/photo-dims.js";

const SRC = "C:/Users/3jmcn/Pictures/cloudinary-originals";
const OUT = "images-dist";
const force = process.argv.includes("--force");
const redoTall = process.argv.includes("--redo-portrait");   /* 縦位置だけ作り直す */
mkdirSync(OUT, { recursive: true });

export const OG_W = 1200, OG_H = 630;
/**
 * 1枚ぶんの変換 (upload.mjs からも使う)。戻り値は sharp の出力情報。
 *   横位置 … 1200×630 に切る (上下を少し落とすだけ。位置は attention = 目立つ部分を残す)
 *   縦位置 … 切らない。写真全体を中央に置き、左右は同じ写真をぼかして暗くした背景で埋める。
 *            縦位置を 1.91:1 に切ると高さの3分の1しか残らず、主題 (塔・桟橋など) が
 *            枠の外へ出ることがあった (実際に生成して確認した)。
 */
export async function writeOg(input, out) {
  const base = sharp(input, { failOn: "none" }).rotate();
  const meta = await sharp(input, { failOn: "none" }).metadata();
  const rotated = [5, 6, 7, 8].includes(meta.orientation || 1);
  const w = rotated ? meta.height : meta.width, h = rotated ? meta.width : meta.height;
  if (!w || !h || w >= h) {
    return base.resize({ width: OG_W, height: OG_H, fit: "cover", position: sharp.strategy.attention })
      .jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  }
  const small = await base.clone().resize({ height: OG_H }).toBuffer();          /* 写真全体 (高さ630) */
  const bg = await sharp(small).resize({ width: OG_W, height: OG_H, fit: "cover" }).blur(28).modulate({ brightness: 0.45, saturation: 0.9 }).toBuffer();
  return sharp(bg).composite([{ input: small, gravity: "centre" }]).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve("scripts", "generate-og-images.mjs")) {
  const manifest = JSON.parse(readFileSync(path.join(SRC, "manifest.json"), "utf-8"));
  const fmtOf = Object.fromEntries(manifest.map((m) => [m.public_id, m.format]));
  const ids = PREFECTURES.flatMap((pf) => pf.photos.map((p) => p.id));
  sharp.concurrency(2);
  let made = 0, skipped = 0, bytes = 0;
  const failed = [];
  let next = 0;
  async function worker() {
    while (next < ids.length) {
      const id = ids[next++];
      const out = path.join(OUT, `${id}_og.jpg`);
      const tall = PHOTO_DIMS[id] && PHOTO_DIMS[id][1] > PHOTO_DIMS[id][0];
      if (!force && existsSync(out) && !(redoTall && tall)) { skipped++; continue; }
      const input = path.join(SRC, `${id}.${fmtOf[id] || "jpg"}`);
      if (!existsSync(input)) { failed.push(`${id}: 原本なし`); continue; }
      try {
        const info = await writeOg(input, out);
        made++; bytes += info.size;
        if (made % 100 === 0) console.log(`  ${made + skipped}/${ids.length}`);
      } catch (e) { failed.push(`${id}: ${String(e.message).slice(0, 60)}`); }
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  console.log(`[og] 作成 ${made} / 既存 ${skipped} / 失敗 ${failed.length}` + (made ? ` / 平均 ${(bytes / made / 1024).toFixed(0)} KB` : ""));
  if (failed.length) { console.log(failed.slice(0, 10).join("\n")); process.exitCode = 1; }
}
