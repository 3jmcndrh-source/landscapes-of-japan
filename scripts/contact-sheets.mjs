#!/usr/bin/env node
/**
 * コレクション精査用コンタクトシート生成 (一時ツール)。
 * 全写真を loc ごとに 4×4 グリッド (w300 サムネ+セル番号) の PNG にして
 * scratchpad へ出力。sheets.json に (シート, セル) → photo id の対応を保存。
 *
 * 使い方: node scripts/contact-sheets.mjs <出力dir>
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { PREFECTURES } from "../app/data.js";

const OUT = process.argv[2];
if (!OUT) { console.error("usage: node scripts/contact-sheets.mjs <outdir>"); process.exit(1); }
mkdirSync(OUT, { recursive: true });

const DIST = "images-dist";
const CELL_W = 290, CELL_H = 200, LABEL_H = 24, COLS = 4, ROWS = 4;
const SHEET_W = CELL_W * COLS, SHEET_H = (CELL_H + LABEL_H) * ROWS;

const groups = [];
for (const pf of PREFECTURES) {
  const byLoc = new Map();
  for (const p of pf.photos) {
    const key = p.loc || "(no loc)";
    if (!byLoc.has(key)) byLoc.set(key, []);
    byLoc.get(key).push(p.id);
  }
  for (const [loc, ids] of byLoc) groups.push({ pref: pf.pref, loc, ids });
}

const manifest = [];
let sheetNo = 0;

for (const g of groups) {
  for (let off = 0; off < g.ids.length; off += COLS * ROWS) {
    sheetNo++;
    const ids = g.ids.slice(off, off + COLS * ROWS);
    const composites = [];
    const cells = [];
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const col = i % COLS, row = Math.floor(i / COLS);
      const x = col * CELL_W, y = row * (CELL_H + LABEL_H);
      const src = path.join(DIST, `${id}_w300.webp`);
      if (!existsSync(src)) continue;
      const thumb = await sharp(src).resize(CELL_W - 6, CELL_H - 6, { fit: "contain", background: { r: 18, g: 18, b: 18 } }).toBuffer();
      composites.push({ input: thumb, left: x + 3, top: y + 3 });
      const label = Buffer.from(
        `<svg width="${CELL_W}" height="${LABEL_H}"><rect width="100%" height="100%" fill="#111"/><text x="6" y="17" font-family="Arial" font-size="15" fill="#f5d98a" font-weight="bold">${i + 1}</text><text x="30" y="17" font-family="Arial" font-size="11" fill="#999">${id.slice(0, 14)}</text></svg>`
      );
      composites.push({ input: label, left: x, top: y + CELL_H });
      cells.push({ cell: i + 1, id });
    }
    const name = `sheet-${String(sheetNo).padStart(2, "0")}.png`;
    await sharp({ create: { width: SHEET_W, height: SHEET_H, channels: 3, background: { r: 10, g: 10, b: 10 } } })
      .composite(composites)
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT, name));
    manifest.push({ sheet: sheetNo, file: name, pref: g.pref, loc: g.loc, part: Math.floor(off / (COLS * ROWS)) + 1, cells });
  }
}

writeFileSync(path.join(OUT, "sheets.json"), JSON.stringify(manifest, null, 1), "utf-8");
console.log(`[done] ${sheetNo} sheets, ${groups.length} loc groups → ${OUT}`);
for (const m of manifest) console.log(`  ${m.file}: ${m.pref}/${m.loc} (part ${m.part}, ${m.cells.length}枚)`);
