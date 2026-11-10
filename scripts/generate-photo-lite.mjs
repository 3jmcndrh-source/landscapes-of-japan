#!/usr/bin/env node
/**
 * 一覧の見た目に要る最小限の写真データ → app/photo-lite.js
 *
 *   node scripts/generate-photo-lite.mjs
 *
 * 入れるもの (1枚あたり 3文字):
 *   - 縦位置か横位置か     … 一覧で写真を切らずに並べるため (比率は 3:2 と 2:3 の2種類だけ)
 *   - アクセント色の色相・彩度 … 画面のアクセント色を「いま表示している写真」から作るため
 *
 * なぜ既存の生成物を直接使わないか:
 *   photo-dims.js (99KB) と photo-palette.js (107KB) は初期JSに載せない方針。
 *   photo-colors.js はアンビエント用に彩度と明度を正規化した1色で、
 *   雪や夜景でも色が付く (無彩色の写真を無彩色と判定できない)。
 *   ここでは palette の代表色から「色が無い写真は無彩色」と分かる形で取り直す。
 *
 * 形式: 写真IDをキーにせず、data.js の PREFECTURES を平たく並べた順に詰める
 *   (IDをキーにすると 930枚で約30KB。詰めると 2.8KB)。
 *   そのかわり data.js の並びと必ず一致していなければならないので、
 *   LITE_SIG (IDの並びのハッシュ) を一緒に書き出し、scripts/check-data.mjs が
 *   ビルド前に照合する。食い違えばビルドは止まる。
 *   upload.mjs が写真追加のたびに再生成する。
 *
 * 入力: app/data.js / app/photo-dims.js / app/photo-palette.js (どれもコミット済み生成物)。
 *   原本庫も images-dist も要らない。
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { PREFECTURES } from "../app/data.js";
import { PHOTO_DIMS } from "../app/photo-dims.js";
import { PHOTO_PALETTE } from "../app/photo-palette.js";

const OUT = path.resolve("app", "photo-lite.js");

/* ---- sRGB → OKLCH (Björn Ottosson の定義どおり) ---- */
const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
export function hexToOklch(hex) {
  const n = parseInt(hex, 16);
  const r = lin((n >> 16) & 255), g = lin((n >> 8) & 255), b = lin(n & 255);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B);
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { L, C, H };
}

/**
 * 代表色 (占有の多い順に3つ) からアクセント色を決める。
 *   - 彩度が低い色、暗すぎて色相が当てにならない色は候補にしない
 *   - 占有が多い色を優先しつつ、彩度も見る (面積は広いが灰色、を選ばない)
 *   - 候補が無ければ無彩色 (level 0)。雪・霧・夜景に無理に色を付けない
 * 戻り値: { h: 0..359, level: 0..8 }  level は彩度 0.02 刻み
 */
const RANK_WEIGHT = [1, 0.8, 0.6];
function accentFrom(reps) {
  let best = null;
  (reps || []).slice(0, 3).forEach((hex, i) => {
    const { L, C, H } = hexToOklch(hex);
    if (C < 0.035 || L < 0.18) return;
    const score = C * RANK_WEIGHT[i];
    if (!best || score > best.score) best = { score, C, H };
  });
  if (!best) return { h: 0, level: 0 };
  return { h: Math.round(best.H) % 360, level: Math.max(1, Math.min(8, Math.round(best.C / 0.02))) };
}

const ids = PREFECTURES.flatMap((pf) => pf.photos.map((p) => p.id));

/* IDの並びの署名 (djb2)。check-data.mjs が同じ計算で照合する */
export function sigOf(list) {
  let h = 5381;
  for (const id of list) for (let i = 0; i < id.length; i++) h = ((h << 5) + h + id.charCodeAt(i)) >>> 0;
  return h.toString(36) + "." + list.length;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve("scripts", "generate-photo-lite.mjs")) {
  let out = "";
  let portrait = 0, neutral = 0, noDims = 0, noPalette = 0;
  for (const id of ids) {
    const d = PHOTO_DIMS[id];
    if (!d) noDims++;
    const isPortrait = d ? d[1] > d[0] : false;   /* 寸法が無い写真は横として扱う (切れ方は従来どおり) */
    const pal = PHOTO_PALETTE[id];
    if (!pal) noPalette++;
    const { h, level } = accentFrom(pal?.c);
    if (isPortrait) portrait++;
    if (!level) neutral++;
    out += (level + (isPortrait ? 9 : 0)).toString(36) + h.toString(36).padStart(2, "0");
  }

  writeFileSync(
    OUT,
    `// 自動生成: node scripts/generate-photo-lite.mjs (編集禁止)\n` +
      `// 1枚 = 3文字。[0] 彩度の段階 0-8 (+9 で縦位置) / [1-2] アクセント色の色相 (36進, 0-359)。\n` +
      `// 並びは data.js の PREFECTURES を平たくした順。LITE_SIG が食い違うとビルド前の点検で止まる。\n` +
      `export const LITE_SIG = ${JSON.stringify(sigOf(ids))};\n` +
      `export const LITE = ${JSON.stringify(out)};\n`,
    "utf-8"
  );
  console.log(`photo-lite.js: ${ids.length}枚 (縦 ${portrait} / 無彩色 ${neutral})` +
    (noDims ? ` ! 寸法なし ${noDims}` : "") + (noPalette ? ` ! パレットなし ${noPalette}` : ""));
}
