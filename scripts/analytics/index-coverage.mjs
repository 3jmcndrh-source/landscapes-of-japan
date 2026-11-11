#!/usr/bin/env node
/**
 * Google にどれだけ登録 (インデックス) されているかを、ページの種類ごとに抜き取りで見る (読み取り専用)。
 *
 *   node scripts/analytics/index-coverage.mjs [--per=12]
 *
 * Search Console の URL 検査 API を使う (1日2,000件まで。ここでは種類ごとに数件ずつ)。
 * 検索流入が少ない原因が「登録されていない」のか「登録されているが順位が低い」のかを
 * 切り分けるためのもの。sitemap の送信状況もあわせて出す。
 */
import { getToken } from "./google-auth.mjs";
import { PREFECTURES } from "../../app/data.js";
import { PREF_SLUGS, LOC_SLUGS } from "../../app/slugs.js";
import { LANGS, PHOTO_LANGS, SITE_URL } from "../../app/i18n-meta.js";
import { COLLECTION_SLUGS } from "../../app/collections-meta.js";

const PROPERTY = "sc-domain:landscapes-of-japan.com";
const per = Number((process.argv.find((a) => a.startsWith("--per=")) || "").split("=")[1]) || 12;
const tok = await getToken("https://www.googleapis.com/auth/webmasters.readonly");
const H = { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" };

/* 種類ごとに、偏らないよう等間隔で抜き取る */
const pick = (arr, n) => arr.filter((_, i) => i % Math.max(1, Math.floor(arr.length / n)) === 0).slice(0, n);
const prefs = PREFECTURES.filter((p) => p.photos.length && PREF_SLUGS[p.pref]);
const locs = prefs.flatMap((pf) => [...new Set(pf.photos.map((p) => p.loc).filter((l) => l && LOC_SLUGS[l]))].map((l) => ({ pref: pf.pref, loc: l })));
const photos = prefs.flatMap((pf) => pf.photos.filter((p) => p.loc && LOC_SLUGS[p.loc]).map((p) => ({ pref: pf.pref, loc: p.loc, id: p.id })));
const groups = {
  "トップ (25言語)": LANGS.map((l) => `/${l}`),
  "都道府県 ja/en": pick(prefs, per / 2).flatMap((p) => [`/ja/${PREF_SLUGS[p.pref]}`, `/en/${PREF_SLUGS[p.pref]}`]),
  "都道府県 その他の言語": pick(prefs, per).map((p, i) => `/${LANGS.filter((l) => !["ja", "en"].includes(l))[i % 23]}/${PREF_SLUGS[p.pref]}`),
  "撮影地 ja/en": pick(locs, per / 2).flatMap((x) => [`/ja/${PREF_SLUGS[x.pref]}/${LOC_SLUGS[x.loc]}`, `/en/${PREF_SLUGS[x.pref]}/${LOC_SLUGS[x.loc]}`]),
  "撮影地 その他の言語": pick(locs, per).map((x, i) => `/${LANGS.filter((l) => !["ja", "en"].includes(l))[(i * 3) % 23]}/${PREF_SLUGS[x.pref]}/${LOC_SLUGS[x.loc]}`),
  "写真詳細": pick(photos, per).map((x, i) => `/${PHOTO_LANGS[i % PHOTO_LANGS.length]}/${PREF_SLUGS[x.pref]}/${LOC_SLUGS[x.loc]}/${x.id}`),
  "コレクション": pick(COLLECTION_SLUGS, per / 2).flatMap((s) => [`/ja/collections/${s}`, `/en/collections/${s}`]),
};

async function inspect(p) {
  const r = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST", headers: H, body: JSON.stringify({ inspectionUrl: SITE_URL + p, siteUrl: PROPERTY }),
  });
  const j = await r.json();
  if (j.error) return { state: "ERR " + j.error.message.slice(0, 60) };
  const s = j.inspectionResult?.indexStatusResult || {};
  return { state: s.coverageState || "?", crawl: (s.lastCrawlTime || "").slice(0, 10), gCanon: s.googleCanonical || "", uCanon: s.userCanonical || "", fetch: s.pageFetchState || "", robots: s.robotsTxtState || "" };
}

const total = {};
for (const [name, urls] of Object.entries(groups)) {
  const res = [];
  for (let i = 0; i < urls.length; i += 6) res.push(...(await Promise.all(urls.slice(i, i + 6).map(async (u) => ({ u, ...(await inspect(u)) })))));
  const c = {};
  for (const r of res) { c[r.state] = (c[r.state] || 0) + 1; total[r.state] = (total[r.state] || 0) + 1; }
  console.log(`\n## ${name} (${res.length}件)`);
  for (const [k, v] of Object.entries(c).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(3)}  ${k}`);
  const diff = res.filter((r) => r.gCanon && r.uCanon && r.gCanon !== r.uCanon);
  if (diff.length) console.log(`  Google が別のURLを正規と判断: ${diff.length}件  例: ${diff[0].u} → ${diff[0].gCanon.replace(SITE_URL, "")}`);
  const crawled = res.filter((r) => r.crawl).map((r) => r.crawl).sort();
  if (crawled.length) console.log(`  最後に取りに来た日: ${crawled[0]} 〜 ${crawled[crawled.length - 1]} (${crawled.length}/${res.length}件に記録あり)`);
  for (const r of res.slice(0, 3)) console.log(`     例 ${r.u}  ${r.state}  ${r.crawl}`);
}
console.log("\n## 抜き取り全体");
for (const [k, v] of Object.entries(total).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(3)}  ${k}`);

/* sitemap の送信状況 */
const sm = await (await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(PROPERTY)}/sitemaps`, { headers: H })).json();
console.log("\n## sitemap");
for (const s of sm.sitemap || []) console.log(`  ${s.path.replace(SITE_URL, "")}  最終取得 ${(s.lastDownloaded || "").slice(0, 10)}  エラー ${s.errors} 警告 ${s.warnings}  ${(s.contents || []).map((c) => `${c.type}: 送信 ${c.submitted}`).join(" / ")}${s.isPending ? " (処理待ち)" : ""}`);
if (sm.error) console.log("  取得できない: " + sm.error.message);
