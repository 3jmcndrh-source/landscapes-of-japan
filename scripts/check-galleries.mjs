#!/usr/bin/env node
/**
 * ⑤ 地域×テーマ ギャラリーの点検。
 *
 *   node scripts/check-galleries.mjs
 *
 * 写真の追加・削除で組み合わせの中身は変わる。ここでは
 *   - 掲載中の組み合わせが MIN_PHOTOS を下回っていないか
 *   - 選定時に記録した枚数・撮影地数から大きく動いていないか
 * を実データから測って知らせる。
 *
 * 自動で app/galleries.js を書き換えることはしない。
 * 「どの組み合わせを公開するか」は人が決めることなので、
 * ここは事実を出して判断材料にするだけにする。
 */
import { PREFECTURES } from "../app/data.js";
import { getCollectionPhotos } from "../app/collections.js";
import { GALLERIES, MIN_PHOTOS } from "../app/galleries.js";

let problems = 0;
console.log(`ギャラリー ${GALLERIES.length} 組の点検 (最低 ${MIN_PHOTOS} 枚)`);

for (const g of GALLERIES) {
  const photos = getCollectionPhotos(g.theme, PREFECTURES).filter((p) => p.pref === g.pref);
  const locs = new Set(photos.map((p) => p.loc).filter(Boolean)).size;
  const dp = photos.length - g.photos;
  const dl = locs - g.locs;
  const line = `  ${g.slug.padEnd(24)} ${String(photos.length).padStart(4)}枚 (${dp >= 0 ? "+" : ""}${dp})  ${locs}地点 (${dl >= 0 ? "+" : ""}${dl})`;

  if (photos.length < MIN_PHOTOS) {
    console.log(`${line}  ← ${MIN_PHOTOS}枚未満。app/galleries.js から外すか、写真を足してください`);
    problems++;
  } else if (locs < 2) {
    console.log(`${line}  ← 撮影地が1つだけ。地域×テーマとして成り立たなくなっています`);
    problems++;
  } else {
    console.log(line);
  }
}

/* 掲載していないが条件を満たす組み合わせも挙げる (候補として) */
const known = new Set(GALLERIES.map((g) => `${g.pref}/${g.theme}`));
const cand = [];
for (const slug of new Set(GALLERIES.map((g) => g.theme))) {
  const all = getCollectionPhotos(slug, PREFECTURES);
  const byPref = new Map();
  for (const p of all) {
    if (!byPref.has(p.pref)) byPref.set(p.pref, []);
    byPref.get(p.pref).push(p);
  }
  for (const [pref, list] of byPref) {
    if (known.has(`${pref}/${slug}`)) continue;
    const locs = new Set(list.map((p) => p.loc).filter(Boolean)).size;
    if (list.length >= 20 && locs >= 3) cand.push(`${pref} × ${slug} (${list.length}枚 ${locs}地点)`);
  }
}
if (cand.length) console.log(`  候補 (未掲載で20枚3地点以上): ${cand.join(" / ")}`);

if (problems) {
  console.error(`\n${problems} 組に問題があります`);
  process.exit(1);
}
console.log("問題なし");
