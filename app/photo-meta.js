/**
 * 一覧の見た目に使う写真ごとの最小データ (縦横 / アクセント色) の取り出し口。
 * 実データは app/photo-lite.js (自動生成、930枚で約3KB)。
 *
 * - 縦横: 一覧で写真を切らずに並べるための比率。比率は 3:2 と 2:3 の2種類だけ。
 * - アクセント色: 画面の強調色を「いま表示している写真」から作るための色相と彩度。
 *   明るさは CSS 側で固定する (globals.css の --accent)。写真が変わっても
 *   文字の読みやすさが変わらないようにするため。
 *
 * サーバー描画とブラウザで同じ結果になる (どちらも同じ静的データを読むだけ)。
 */
import { PREFECTURES } from "./data.js";
import { LITE } from "./photo-lite.js";

let _idx = null;
function indexOf(id) {
  if (!_idx) {
    _idx = new Map();
    let i = 0;
    for (const pf of PREFECTURES) for (const p of pf.photos) _idx.set(p.id, i++);
  }
  return _idx.get(id);
}

function record(id) {
  const i = indexOf(id);
  if (i === undefined) return null;
  const s = LITE.substr(i * 3, 3);
  if (s.length < 3) return null;
  const a = parseInt(s[0], 36);
  return { portrait: a >= 9, level: a % 9, hue: parseInt(s.slice(1), 36) };
}

export const isPortrait = (id) => !!record(id)?.portrait;

/** 幅 ÷ 高さ。データが無い写真は横 (3:2) として扱う */
export const aspectOf = (id) => (isPortrait(id) ? 2 / 3 : 1.5);

/**
 * 写真 (1枚または複数) からアクセント色を決める。
 * 複数のときは色相を彩度で重み付けして平均する。色がばらばらな集まりは
 * 打ち消し合って無彩色に近づく (特定の1枚の色にページ全体を染めない)。
 * @returns {{ h: number, c: number }}  c は OKLCH の彩度。0 なら無彩色
 */
export function accentOf(ids) {
  const list = Array.isArray(ids) ? ids : [ids];
  let x = 0, y = 0, n = 0;
  for (const id of list) {
    const r = record(id);
    if (!r) continue;
    n++;
    if (!r.level) continue;
    const w = r.level * 0.02;
    const rad = (r.hue * Math.PI) / 180;
    x += Math.cos(rad) * w;
    y += Math.sin(rad) * w;
  }
  if (!n) return { h: 0, c: 0 };
  const c = Math.hypot(x, y) / n;
  if (c < 0.012) return { h: 0, c: 0 };
  let h = (Math.atan2(y, x) * 180) / Math.PI;
  if (h < 0) h += 360;
  /* UI に使う彩度の範囲に収める。強すぎる色で文字や枠を塗らない */
  return { h: Math.round(h), c: Math.round(Math.min(0.13, Math.max(0.035, c * 1.15)) * 1000) / 1000 };
}

/**
 * 要素に渡す style と属性。data-accent を付けた要素の中だけ --accent が変わる。
 * 使い方: <div {...accentProps(ids)}>
 */
export function accentProps(ids) {
  const { h, c } = accentOf(ids);
  return { "data-accent": "", style: { "--accent-h": h, "--accent-c": c } };
}
export function accentStyle(ids) {
  const { h, c } = accentOf(ids);
  return { "--accent-h": h, "--accent-c": c };
}
