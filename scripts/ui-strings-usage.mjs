#!/usr/bin/env node
/**
 * ④ UI 文言のキーが、どの画面から使われているかを調べる。
 * 新しい画面でしか使わない文言を、全ページの初期JSから外せるか判断するため。
 */
import { readFileSync, readdirSync } from "node:fs";

const SRC = readFileSync("app/ui-strings.js", "utf-8");
const keys = [...SRC.matchAll(/^UI_STRINGS\.([A-Za-z0-9_]+)\s*=/gm)].map((m) => m[1]);

/* ①〜⑦ で新しく作った画面 */
const NEW = new Set(["ExploreClient.js", "AlbumClient.js", "GalleryClient.js", "CompareView.js", "PhotoMap.js", "PhotoCard.js"]);

const files = [];
const walk = (d) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = `${d}/${e.name}`;
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".js") && !e.name.startsWith("ui-strings")) files.push(p);
  }
};
walk("app");

const use = new Map(keys.map((k) => [k, new Set()]));
for (const p of files) {
  const s = readFileSync(p, "utf-8");
  const short = p.replace(/^app\//, "");
  for (const k of keys) {
    /* ui("key") / ui(`key`) / ui(`prefix_${...}`) は個別に見る */
    if (s.includes(`"${k}"`) || s.includes(`\`${k}\``)) use.get(k).add(short);
  }
}

const onlyNew = [], shared = [], unused = [];
for (const k of keys) {
  const u = [...use.get(k)];
  if (!u.length) unused.push(k);
  else if (u.every((f) => NEW.has(f))) onlyNew.push(k);
  else shared.push(k);
}

const bytes = (list) => {
  let t = 0;
  for (const k of list) {
    const m = SRC.match(new RegExp(`^UI_STRINGS\\.${k}\\s*=.*$`, "m"));
    if (m) t += m[0].length;
  }
  return `${(t / 1024).toFixed(1)}KB`;
};

console.log(`キー総数 ${keys.length}`);
console.log(`  新画面だけで使う ${onlyNew.length} (${bytes(onlyNew)}): ${onlyNew.join(", ")}`);
console.log(`  既存画面でも使う ${shared.length} (${bytes(shared)})`);
console.log(`  どこからも参照が見つからない ${unused.length} (${bytes(unused)}): ${unused.join(", ")}`);
