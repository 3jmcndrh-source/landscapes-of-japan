#!/usr/bin/env node
/**
 * ④ 一覧ページが実際に取りに行く画像の量を測る。
 *
 *   node scripts/measure-images.mjs <out ディレクトリ> [...]
 *
 * ブラウザは srcset と sizes から「表示幅 × 画素密度」に合う候補を選ぶ。
 * ここでは代表的な2つの見え方で、その選択を再現して合計バイト数を出す:
 *   PC   1280px 幅 / 画素密度 1
 *   携帯  390px 幅 / 画素密度 2
 *
 * 実ファイルは images-dist の生成済み WebP を見るので、推定ではなく実寸。
 * srcset が無い img は src の幅をそのまま数える (改修前がこれ)。
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const DIST = "images-dist";
const VIEWS = [
  { name: "PC 1280px", vw: 1280, dpr: 1 },
  { name: "携帯 390px×2", vw: 390, dpr: 2 },
];

const fileSize = (id, w) => {
  const f = path.join(DIST, `${id}_w${w}.webp`);
  return existsSync(f) ? statSync(f).size : 0;
};
const idFromUrl = (u) => {
  const m = decodeURIComponent(u).match(/\/([^/]+)_w(\d+)\.webp/);
  return m ? { id: m[1], w: Number(m[2]) } : null;
};

/** sizes 属性 → この画面幅での CSS ピクセル幅 */
function resolveSizes(sizes, vw) {
  if (!sizes) return vw;
  for (const part of sizes.split(",").map((s) => s.trim())) {
    const m = part.match(/^(?:\((.+?)\)\s+)?(.+)$/);
    if (!m) continue;
    const [, cond, val] = m;
    if (cond) {
      const mm = cond.match(/max-width:\s*(\d+)px/);
      if (mm && vw > Number(mm[1])) continue;
      const mn = cond.match(/min-width:\s*(\d+)px/);
      if (mn && vw < Number(mn[1])) continue;
    }
    const vwUnit = val.match(/^([\d.]+)vw$/);
    if (vwUnit) return (vw * Number(vwUnit[1])) / 100;
    const px = val.match(/^([\d.]+)px$/);
    if (px) return Number(px[1]);
  }
  return vw;
}

/** 1枚の img が選ぶ画像の実バイト数 */
function pick(img, view) {
  const { srcset, sizes, src } = img;
  if (!srcset) {
    const s = idFromUrl(src);
    return s ? { w: s.w, bytes: fileSize(s.id, s.w) } : { w: 0, bytes: 0 };
  }
  const cands = srcset.split(",").map((c) => c.trim()).map((c) => {
    const m = c.match(/^(\S+)\s+(\d+)w$/);
    return m ? { url: m[1], w: Number(m[2]) } : null;
  }).filter(Boolean).sort((a, b) => a.w - b.w);
  if (!cands.length) return { w: 0, bytes: 0 };
  const need = resolveSizes(sizes, view.vw) * view.dpr;
  const chosen = cands.find((c) => c.w >= need) || cands[cands.length - 1];
  const s = idFromUrl(chosen.url);
  return s ? { w: s.w, bytes: fileSize(s.id, s.w) } : { w: chosen.w, bytes: 0 };
}

function imagesIn(html) {
  const out = [];
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    const attr = (n) => {
      const a = tag.match(new RegExp(`${n}="([^"]*)"`, "i"));
      return a ? a[1].replace(/&amp;/g, "&") : null;
    };
    const src = attr("src");
    if (!src || !/_w\d+\.webp/.test(src)) continue;
    out.push({ src, srcset: attr("srcSet") || attr("srcset"), sizes: attr("sizes"), lazy: /loading="lazy"/.test(tag) });
  }
  return out;
}

const PAGES = {
  "撮影地 (美瑛町)": "ja/hokkaido/biei.html",
  "コレクション (紅葉)": "ja/collections/autumn-foliage.html",
  "都道府県 (北海道)": "ja/hokkaido.html",
};

const roots = process.argv.slice(2);
if (!roots.length) { console.error("使い方: node scripts/measure-images.mjs <out> [<out2>]"); process.exit(1); }

for (const [name, rel] of Object.entries(PAGES)) {
  console.log(`\n${name}`);
  for (const view of VIEWS) {
    const cells = roots.map((root) => {
      const f = path.join(root, rel);
      if (!existsSync(f)) return "—";
      const imgs = imagesIn(readFileSync(f, "utf-8"));
      /* 最初に見える4枚 (eager) と全体を分けて出す */
      const eager = imgs.filter((i) => !i.lazy);
      const sum = (list) => list.reduce((s, i) => s + pick(i, view).bytes, 0);
      return `${imgs.length}枚 先読み${eager.length}枚 ` +
             `最初${Math.round(sum(eager) / 1024)}KB 全部${Math.round(sum(imgs) / 1024)}KB`;
    });
    console.log(`  ${view.name.padEnd(12)} ${cells.join("   |   ")}`);
  }
}
console.log(`\n比較対象: ${roots.join("  |  ")}`);
