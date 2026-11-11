#!/usr/bin/env node
/**
 * ヒーロー (トップの表紙) 候補を季節ごとに出す。選ぶのは人の目。
 *
 *   node scripts/suggest-hero.mjs [出力先ディレクトリ] [--portrait]
 *
 * --portrait: 縦位置の候補を出す (スマホの縦長の画面用。HERO_BY_SEASON_TALL に書く)。
 *
 * 撮影月 (photo-months.js) で季節に振り分け、横位置で、風景のタグが付いていて、
 * 動物・鳥・街並み・祭りではない写真を候補にする。同じ撮影地からは3枚まで。
 * 候補を1枚の一覧画像 (season-*.jpg) にして、番号と写真IDの対応を表示する。
 * 一覧を見て選んだIDを app/PageClient.js の HERO_BY_SEASON に書く。
 *
 * 自動で差し替えない理由: 表紙は全画面で出るので、構図や天気まで見て選ぶ必要がある。
 * タグと撮影月だけでは「その季節らしい良い1枚」かどうかは決められない。
 */
import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { PREFECTURES } from "../app/data.js";
import { PHOTO_MONTHS } from "../app/photo-months.js";
import { PHOTO_DIMS } from "../app/photo-dims.js";
import { PHOTO_TAGS } from "../app/photo-tags.js";

const tall = process.argv.includes("--portrait");
const OUT = process.argv.slice(2).find((a) => !a.startsWith("--")) || "hero-candidates";
const DIST = "images-dist";
mkdirSync(OUT, { recursive: true });

const SEASON = (m) => (m >= 3 && m <= 5 ? "spring" : m >= 6 && m <= 8 ? "summer" : m >= 9 && m <= 11 ? "autumn" : "winter");
const AVOID = new Set(["animal", "bird", "street", "festival"]);
const PER_LOC = 3, MAX = 48, COLS = tall ? 12 : 8, TW = tall ? 200 : 300, TH = tall ? 300 : 200;

const pools = { spring: [], summer: [], autumn: [], winter: [] };
for (const pf of PREFECTURES) {
  for (const p of pf.photos) {
    const m = PHOTO_MONTHS[p.id], d = PHOTO_DIMS[p.id], tags = PHOTO_TAGS[p.id] || [];
    if (!m || !d || (tall ? d[1] <= d[0] : d[1] > d[0]) || !tags.length || tags.some((t) => AVOID.has(t))) continue;
    pools[SEASON(m)].push({ id: p.id, loc: p.loc || "", pref: pf.pref, tags, m });
  }
}

for (const [season, pool] of Object.entries(pools)) {
  /* 撮影地ごとに順番に1枚ずつ取り、偏りを減らす */
  const byLoc = new Map();
  for (const p of pool) { if (!byLoc.has(p.loc)) byLoc.set(p.loc, []); byLoc.get(p.loc).push(p); }
  const picked = [];
  for (let round = 0; round < PER_LOC && picked.length < MAX; round++) {
    for (const list of byLoc.values()) {
      /* 撮影地の中では等間隔に取る (連写の似た写真を続けて取らない) */
      const idx = Math.floor((list.length * (round + 0.5)) / PER_LOC);
      const p = list[Math.min(list.length - 1, idx)];
      if (p && !picked.includes(p) && picked.length < MAX) picked.push(p);
    }
  }
  if (!picked.length) { console.log(`\n== ${season}: 候補なし`); continue; }   /* 冬の縦位置など、1枚も無い季節がある */
  const rows = Math.ceil(picked.length / COLS);
  const tiles = [];
  for (let i = 0; i < picked.length; i++) {
    const f = path.join(DIST, `${picked[i].id}_w300.webp`);
    if (!existsSync(f)) continue;
    const label = Buffer.from(`<svg width="${TW}" height="${TH}"><rect width="46" height="26" fill="rgba(0,0,0,.75)"/><text x="6" y="19" font-size="18" font-family="sans-serif" fill="#fff">${i + 1}</text></svg>`);
    const buf = await sharp(f).resize(TW, TH, { fit: "cover" }).composite([{ input: label, top: 0, left: 0 }]).jpeg({ quality: 78 }).toBuffer();
    tiles.push({ input: buf, left: (i % COLS) * TW, top: Math.floor(i / COLS) * TH });
  }
  await sharp({ create: { width: COLS * TW, height: rows * TH, channels: 3, background: "#111" } })
    .composite(tiles).jpeg({ quality: 80 }).toFile(path.join(OUT, `season-${season}${tall ? "-tall" : ""}.jpg`));
  console.log(`\n== ${season}: 候補 ${pool.length}枚 から ${picked.length}枚`);
  picked.forEach((p, i) => console.log(`${String(i + 1).padStart(2)} ${p.id}  ${p.pref} ${p.loc} (${p.m}月) [${p.tags.join(",")}]`));
}
