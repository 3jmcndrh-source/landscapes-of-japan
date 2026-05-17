#!/usr/bin/env node
/**
 * IndexNow protocol — Bing/Yandex/Naver/Seznam に新規/更新 URL を即時通知
 *
 * 使い方:
 *   node notify-indexnow.mjs <url1> <url2> ...
 *   node notify-indexnow.mjs --sitemap          # sitemap.xml index 経由で全URL送信
 *   node notify-indexnow.mjs --pref yamanashi  # 指定prefの全URL (loc + 写真個別)
 *
 * 1リクエスト最大10,000 URL。それ以上は分割。
 */

const HOST = "landscapes-of-japan.com";
const KEY = "125bd42ee2a286267e909a4b533251b4";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow"; // Bing→他エンジンに伝播

async function fetchAllSitemapUrls() {
  const idx = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  const sitemapUrls = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const all = [];
  for (const sm of sitemapUrls) {
    const body = await (await fetch(sm)).text();
    const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    all.push(...urls);
  }
  return [...new Set(all)];
}

async function fetchPrefUrls(prefSlug) {
  // sitemap-index から prefSlug に該当する sub sitemap を全部 fetch
  const idx = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  const sitemapUrls = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const all = [];
  for (const sm of sitemapUrls) {
    const body = await (await fetch(sm)).text();
    const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1])
      .filter((u) => u.includes(`/${prefSlug}/`) || u.endsWith(`/${prefSlug}`));
    all.push(...urls);
  }
  return [...new Set(all)];
}

async function notify(urls) {
  if (urls.length === 0) return;
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };
  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  return { status: r.status, urlCount: urls.length };
}

async function main() {
  const args = process.argv.slice(2);
  let urls = [];

  if (args.length === 0) {
    console.log("使い方:");
    console.log("  node notify-indexnow.mjs <url1> <url2> ...");
    console.log("  node notify-indexnow.mjs --sitemap");
    console.log("  node notify-indexnow.mjs --pref yamanashi");
    process.exit(1);
  }

  if (args[0] === "--sitemap") {
    console.log("sitemap.xml から全URL収集中...");
    urls = await fetchAllSitemapUrls();
  } else if (args[0] === "--pref" && args[1]) {
    console.log(`prefecture "${args[1]}" の全URL収集中...`);
    urls = await fetchPrefUrls(args[1]);
  } else {
    urls = args.filter((a) => a.startsWith("http"));
  }

  console.log(`通知URL数: ${urls.length}`);
  if (urls.length === 0) { console.log("URLなし。終了。"); return; }

  // 10,000ずつ分割
  const CHUNK = 10000;
  for (let i = 0; i < urls.length; i += CHUNK) {
    const slice = urls.slice(i, i + CHUNK);
    process.stdout.write(`[${i + 1}-${i + slice.length}/${urls.length}] 送信中... `);
    const res = await notify(slice);
    console.log(`HTTP ${res.status}`);
    if (res.status !== 200 && res.status !== 202) {
      console.error("⚠ 失敗の可能性あり (200/202以外)");
    }
  }
  console.log(`\n✓ IndexNow 通知完了 (Bing→Yandex/Naver/Seznamに伝播)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
