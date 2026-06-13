#!/usr/bin/env node
/**
 * T2 アンビエントカラー: 全リソース (写真587枚 + blogヒーロー等) の主要色を抽出して
 * app/photo-colors.js を生成する。
 *
 * ソース: images-dist/{id}_w300.webp (ローカル生成済みで高速) → 無ければ原本。
 * sharp .stats() の dominant (RGB) を HSL でアンビエント用に正規化:
 *   彩度 ≤ .65 (ドギツさ防止) / 明度 .30–.52 (真っ黒写真でも視認できる下限)。
 * 値は "r,g,b" 文字列で保存 → 実行時は ambient(id, alpha) が rgba() を組む。
 *
 * 生成物 (app/photo-colors.js) はコミットする — 原本庫が無い環境でも build を
 * 通すため、build チェーンには入れない。写真追加後に手動再実行:
 *   node scripts/generate-photo-colors.mjs
 */
import sharp from "sharp";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const SRC = "C:/Users/3jmcn/Pictures/cloudinary-originals";
const DIST = "images-dist";
const OUT = path.resolve("app", "photo-colors.js");

const manifest = JSON.parse(readFileSync(path.join(SRC, "manifest.json"), "utf-8"));

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [Math.round(f(h + 1 / 3) * 255), Math.round(f(h) * 255), Math.round(f(h - 1 / 3) * 255)];
}

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const colors = {};
let done = 0, missing = 0;

for (const r of manifest) {
  const fast = path.join(DIST, `${r.public_id}_w300.webp`);
  const orig = path.join(SRC, `${r.public_id}.${r.format}`);
  const src = existsSync(fast) ? fast : existsSync(orig) ? orig : null;
  if (!src) { missing++; continue; }
  try {
    const { dominant } = await sharp(src, { failOn: "none" }).stats();
    const [h, s, l] = rgbToHsl(dominant.r, dominant.g, dominant.b);
    const [nr, ng, nb] = hslToRgb(h, clamp(s, 0, 0.65), clamp(l, 0.3, 0.52));
    colors[r.public_id] = `${nr},${ng},${nb}`;
    if (++done % 100 === 0) console.log(`  ${done} colors`);
  } catch (e) {
    console.warn(`  ! ${r.public_id}: ${e.message}`);
  }
}

const body = Object.entries(colors).map(([id, c]) => `"${id}":"${c}"`).join(",\n");
writeFileSync(
  OUT,
  `// 自動生成: node scripts/generate-photo-colors.mjs (編集禁止)
// 各写真の主要色 (アンビエント用に HSL 正規化済み, "r,g,b")
export const PHOTO_COLORS = {
${body}
};

/** id の主要色を rgba() 文字列で返す (未登録 id は null) */
export const ambient = (id, alpha) =>
  PHOTO_COLORS[id] ? \`rgba(\${PHOTO_COLORS[id]},\${alpha})\` : null;
`,
  "utf-8"
);

console.log(`[done] ${done} colors → app/photo-colors.js (missing source: ${missing})`);
