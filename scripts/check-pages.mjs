#!/usr/bin/env node
/**
 * ⑧ 公開前の自動点検。ビルド後の out/ を実ファイルとして読み、
 * 主要な入口が壊れていないかを確かめる。
 *
 *   npm run build && node scripts/check-pages.mjs
 *
 * ここで見るのは「出力された HTML の事実」だけ。
 * 実装の説明ではなく、実際に書き出された文字列を数える。
 *
 * fatal (exit 1) と note (報告のみ) を分ける。
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { LANGS, SITE_URL, PHOTO_LANGS } from "../app/i18n-meta.js";
import { PREFECTURES } from "../app/data.js";
import { PREF_SLUGS, LOC_SLUGS } from "../app/slugs.js";
import { GALLERIES } from "../app/galleries.js";
import { VERIFIED_LOC_QID, VERIFIED_PREF_QID } from "../app/wikidata-verified.js";

const OUT = "out";
const fatal = [];
const notes = [];
const ok = [];

if (!existsSync(OUT)) {
  console.error("out/ がありません。先に npm run build を実行してください");
  process.exit(1);
}

const read = (p) => (existsSync(p) ? readFileSync(p, "utf-8") : null);
const page = (rel) => read(path.join(OUT, `${rel}.html`)) ?? read(path.join(OUT, rel, "index.html"));

const check = (name, cond, detail = "") => {
  (cond ? ok : fatal).push(`${name}${detail ? ` — ${detail}` : ""}`);
};
const note = (s) => notes.push(s);

/* ---- 1. 全言語の入口 ---- */
{
  const missing = LANGS.filter((l) => !page(l));
  check(`全${LANGS.length}言語のトップ`, missing.length === 0, missing.join(","));
}

/* ---- 2. 新しい画面 (explore / album / gallery) ---- */
{
  const ex = page("ja/explore");
  const al = page("ja/album");
  check("探索画面 /ja/explore", Boolean(ex));
  check("アルバム画面 /ja/album", Boolean(al));

  /* 検索結果に出したくない画面にだけ noindex が付いていること */
  const noindexed = (h) => /<meta name="robots" content="[^"]*noindex/i.test(h || "");
  check("探索画面は noindex", noindexed(ex));
  check("アルバム画面は noindex", noindexed(al));

  const gal = page(`ja/gallery/${GALLERIES[0].slug}`);
  check(`ギャラリー /ja/gallery/${GALLERIES[0].slug}`, Boolean(gal));
  check("ギャラリーは noindex ではない", gal && !noindexed(gal));
  check("ギャラリーに canonical", /rel="canonical"/.test(gal || ""));
  const hre = (gal || "").match(/hrefLang="/g) || (gal || "").match(/hreflang="/g) || [];
  check(`ギャラリーの hreflang ${LANGS.length}言語 + x-default`, hre.length >= LANGS.length, `${hre.length}本`);

  /* 全言語でギャラリーが出ていること */
  for (const g of GALLERIES) {
    const miss = LANGS.filter((l) => !page(`${l}/gallery/${g.slug}`));
    check(`ギャラリー ${g.slug} が全言語`, miss.length === 0, miss.join(","));
  }
}

/* ---- 3. noindex が意図しないページへ漏れていないこと ---- */
{
  const targets = ["ja", "en", `ja/${PREF_SLUGS["北海道"]}`, "ja/collections"];
  const leaked = targets.filter((t) => /<meta name="robots" content="[^"]*noindex/i.test(page(t) || ""));
  check("公開ページに noindex が漏れていない", leaked.length === 0, leaked.join(","));
}

/* ---- 4. 撮影地ページ: 画像の配信と写真詳細リンク ---- */
{
  const pf = PREFECTURES.find((p) => p.pref === "北海道");
  const locJp = pf.photos.find((p) => p.loc)?.loc;
  const rel = `ja/${PREF_SLUGS[pf.pref]}/${LOC_SLUGS[locJp]}`;
  const h = page(rel);
  check(`撮影地ページ /${rel}`, Boolean(h));
  if (h) {
    const srcset = (h.match(/srcSet="|srcset="/g) || []).length;
    check("撮影地ページに srcset がある", srcset > 0, `${srcset}件`);
    /* width/height が入っていること (読み込み中に高さが動かないため) */
    const wh = (h.match(/ width="\d+" height="\d+"/g) || []).length;
    check("撮影地ページの画像に width/height", wh > 0, `${wh}件`);
    /* 一覧で 2400/3840 を取りに行っていないこと */
    const big = (h.match(/_w(2400|3840)\.webp \d+w/g) || []).length;
    check("一覧の srcset に 2400/3840 を混ぜていない", big === 0, `${big}件`);
    /* 写真詳細への実リンク */
    const links = (h.match(/href="\/ja\/[a-z0-9-]+\/[a-z0-9-]+\/[A-Za-z0-9_-]+"/g) || []).length;
    check("撮影地ページから写真詳細への実リンク", links > 0, `${links}本`);
  }
}

/* ---- 5. 写真詳細: 似た写真 と 言語 ---- */
{
  const pf = PREFECTURES.find((p) => p.pref === "京都府") || PREFECTURES[0];
  const ph = pf.photos.find((p) => p.loc);
  const rel = `ja/${PREF_SLUGS[pf.pref]}/${LOC_SLUGS[ph.loc]}/${ph.id}`;
  const h = page(rel);
  check(`写真詳細 /${rel}`, Boolean(h));
  if (h) {
    check("写真詳細に「似た写真」がある", h.includes("似た写真"));
    check("写真詳細に canonical", /rel="canonical"/.test(h));
    check("写真詳細に JSON-LD", h.includes('"@type":"Photograph"'));
  }
  /* 写真詳細を出す言語だけに出ていること */
  const shouldNot = LANGS.filter((l) => !PHOTO_LANGS.includes(l))
    .filter((l) => page(`${l}/${PREF_SLUGS[pf.pref]}/${LOC_SLUGS[ph.loc]}/${ph.id}`));
  check("写真詳細が対象外の言語に出ていない", shouldNot.length === 0, shouldNot.join(","));
}

/* ---- 5b. sameAs: 出力HTMLの JSON-LD を実際にパースして照合 ----
   Q-ID の形が正しい・URLが200を返す、では同一性の確認にならない。
   ここでは「検証済みの表に載っている値だけが出ているか」を見る。
   配列・@graph・入れ子のどこにある sameAs も拾う。 */
{
  const allowed = new Set([
    ...Object.values(VERIFIED_LOC_QID).map((q) => `https://www.wikidata.org/wiki/${q}`),
    ...Object.values(VERIFIED_PREF_QID).map((q) => `https://www.wikidata.org/wiki/${q}`),
  ]);
  const collectSameAs = (node, out = []) => {
    if (Array.isArray(node)) { for (const n of node) collectSameAs(n, out); return out; }
    if (node && typeof node === "object") {
      for (const [k, v] of Object.entries(node)) {
        if (k === "sameAs") { for (const s of [].concat(v)) out.push(String(s)); }
        else collectSameAs(v, out);
      }
    }
    return out;
  };

  const pf = PREFECTURES.find((p) => p.pref === "北海道");
  const locJp = pf.photos.find((p) => p.loc)?.loc;
  const samples = [
    `ja/${PREF_SLUGS[pf.pref]}`,
    `ja/${PREF_SLUGS[pf.pref]}/${LOC_SLUGS[locJp]}`,
    `ja/${PREF_SLUGS["京都府"]}/${LOC_SLUGS["金閣寺"]}`,
    `en/${PREF_SLUGS["京都府"]}/${LOC_SLUGS["金閣寺"]}`,
    `ar/${PREF_SLUGS["北海道"]}/${LOC_SLUGS["知床"]}`,
  ].filter(Boolean);

  let parsed = 0, found = 0;
  const bad = [];
  for (const rel of samples) {
    const h = page(rel);
    if (!h) { bad.push(`${rel} が無い`); continue; }
    for (const m of h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      let json;
      try { json = JSON.parse(m[1]); } catch (e) { bad.push(`${rel} の JSON-LD が壊れている: ${String(e.message).slice(0, 60)}`); continue; }
      parsed++;
      for (const s of collectSameAs(json)) {
        found++;
        if (!allowed.has(s)) bad.push(`${rel}: 検証済みでない sameAs ${s}`);
      }
    }
  }
  check("JSON-LD をパースできる", parsed > 0, `${parsed}件`);
  check("出力の sameAs はすべて検証済みの値", bad.length === 0, bad.slice(0, 3).join(" / "));
  note(`sameAs 出力 ${found}件 / 検証済み ${allowed.size}件 (撮影地 ${Object.keys(VERIFIED_LOC_QID).length} + 都道府県 ${Object.keys(VERIFIED_PREF_QID).length})`);

  /* 同一性を確認できなかった撮影地では sameAs ごと出ていないこと */
  const omitted = "阿寒";
  const hOmit = page(`ja/${PREF_SLUGS["北海道"]}/${LOC_SLUGS[omitted]}`);
  if (hOmit) {
    const ldSameAs = [...hOmit.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
      .flatMap((m) => { try { return collectSameAs(JSON.parse(m[1])); } catch { return []; } });
    const locLevel = ldSameAs.filter((s) => s !== `https://www.wikidata.org/wiki/${VERIFIED_PREF_QID["北海道"]}`);
    check(`確認できない撮影地 (${omitted}) は sameAs を出さない`, locLevel.length === 0, locLevel.join(","));
  }
}

/* ---- 6. 計測が本番ホスト以外で動かない仕掛けが残っていること ---- */
{
  const h = page("ja") || "";
  const hasGuard = h.includes("landscapes-of-japan.com");
  check("計測のホスト判定が出力に残っている", hasGuard);
  const ga = h.includes("G-SZG99MQG5Z");
  const cl = h.includes("clarity");
  note(`計測タグ: GA4 ${ga ? "あり" : "なし"} / Clarity ${cl ? "あり" : "なし"} (どちらもホスト判定の内側)`);
}

/* ---- 7. 生成物の規模 ---- */
{
  let files = 0, html = 0;
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else { files++; if (e.name.endsWith(".html")) html++; }
    }
  };
  walk(OUT);
  note(`出力 ${files} ファイル (HTML ${html})`);
  if (files > 19000) fatal.push(`ファイル数 ${files} が Cloudflare Pages の 20,000 に近い`);

  /* 初期JS (最初のHTMLが読む script の合計) */
  const measure = (rel) => {
    const h = page(rel);
    if (!h) return null;
    const srcs = [...h.matchAll(/<script src="(\/_next\/[^"]+)"/g)].map((m) => m[1]);
    let sum = 0;
    for (const s of new Set(srcs)) {
      const f = path.join(OUT, s);
      if (existsSync(f)) sum += statSync(f).size;
    }
    return { n: new Set(srcs).size, kb: Math.round(sum / 1024) };
  };
  const pfs = PREF_SLUGS["北海道"];
  const locJp = PREFECTURES.find((p) => p.pref === "北海道").photos.find((p) => p.loc).loc;
  for (const [name, rel] of [
    ["トップ", "ja"],
    ["撮影地", `ja/${pfs}/${LOC_SLUGS[locJp]}`],
    ["コレクション", "ja/collections/cherry-blossoms"],
    ["探索", "ja/explore"],
    ["ギャラリー", `ja/gallery/${GALLERIES[0].slug}`],
  ]) {
    const m = measure(rel);
    note(`初期JS ${name.padEnd(6)} ${m ? `${m.kb} KB (${m.n}本)` : "測れず"}`);
  }
}

/* ---- 結果 ---- */
console.log(`合格 ${ok.length}`);
for (const s of ok) console.log(`  ✓ ${s}`);
if (notes.length) { console.log("参考:"); for (const s of notes) console.log(`  · ${s}`); }
if (fatal.length) {
  console.error(`\n不合格 ${fatal.length}`);
  for (const s of fatal) console.error(`  ✗ ${s}`);
  process.exit(1);
}
console.log("\n公開前点検: 問題なし");
