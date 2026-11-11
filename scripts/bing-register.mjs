#!/usr/bin/env node
/**
 * Bing ウェブマスターツールに、いまのドメイン (landscapes-of-japan.com) を登録して認証する。
 *
 *   node scripts/bing-register.mjs add      サイトを追加し、認証ファイル public/BingSiteAuth.xml を書き出す
 *   node scripts/bing-register.mjs verify   (認証ファイルを本番へデプロイしたあと) 認証 → サイトマップ送信
 *   node scripts/bing-register.mjs status   登録状況と URL 送信の残り枠を表示するだけ
 *
 * 経緯: 2026-05 に vercel.app から landscapes-of-japan.com へ移転したとき、Bing 側の登録は
 * 旧ドメインのまま残っていた。resubmit-sitemap-bing.mjs / bing-submit-urls.mjs は新ドメインを
 * 指していたので、API は権限エラー (NotAuthorized) を返し続けていた (2026-11-11 に発見)。
 * 実際の訪問は Bing 経由がほとんど (検索流入45セッション中42) なので、ここを先に直す。
 *
 * 認証は「サイト直下に置いたファイル」で行う。DNS を触らずに済み、デプロイだけで完結する。
 * BingSiteAuth.xml は公開してよい値 (Bing が所有確認に読むだけ)。API キーは .env にあり、公開しない。
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const SITE = "https://landscapes-of-japan.com/";
const SITEMAPS = ["https://landscapes-of-japan.com/sitemap.xml", "https://landscapes-of-japan.com/sitemap-images.xml"];
const AUTH_FILE = "public/BingSiteAuth.xml";

const env = existsSync(".env")
  ? Object.fromEntries(readFileSync(".env", "utf-8").split(/\r?\n/).filter((l) => l.includes("=")).map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "")]))
  : {};
const KEY = process.env.BING_WEBMASTER_API_KEY || env.BING_WEBMASTER_API_KEY;
if (!KEY) { console.error("✗ BING_WEBMASTER_API_KEY がありません (.env)"); process.exit(1); }

const B = "https://ssl.bing.com/webmaster/api.svc/json/";
async function api(method, body, query = "") {
  const r = await fetch(`${B}${method}?apikey=${KEY}${query}`, body
    ? { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify(body) }
    : undefined);
  const t = await r.text();
  let j; try { j = t ? JSON.parse(t) : {}; } catch { j = { raw: t.slice(0, 200) }; }
  return { ok: r.ok && !j.ErrorCode, status: r.status, d: j.d, err: j.Message || j.raw || (r.ok ? "" : String(r.status)) };
}
const mySite = async () => ((await api("GetUserSites")).d || []).find((s) => s.Url.replace(/\/$/, "") === SITE.replace(/\/$/, ""));

const cmd = process.argv[2] || "status";

if (cmd === "add") {
  let s = await mySite();
  if (!s) {
    const r = await api("AddSite", { siteUrl: SITE });
    if (!r.ok) { console.error(`✗ サイトを追加できない: ${r.status} ${r.err}`); process.exit(1); }
    console.log("サイトを追加しました:", SITE);
    s = await mySite();
  } else console.log("すでに追加済み:", SITE, "(認証", s.IsVerified ? "済み)" : "まだ)");
  if (!s || !s.AuthenticationCode) { console.error("✗ 認証コードを取得できない"); process.exit(1); }
  writeFileSync(AUTH_FILE, `<?xml version="1.0"?>\n<users>\n\t<user>${s.AuthenticationCode}</user>\n</users>\n`, "utf-8");
  console.log(`${AUTH_FILE} を書き出しました。本番へデプロイしてから verify を実行してください`);
} else if (cmd === "verify") {
  const live = await fetch(SITE + "BingSiteAuth.xml").then((r) => (r.ok ? r.text() : "")).catch(() => "");
  if (!/<user>[0-9A-F]{16,}<\/user>/i.test(live)) { console.error("✗ 本番に BingSiteAuth.xml がありません。先にデプロイしてください"); process.exit(1); }
  let s = await mySite();
  if (!s) { console.error("✗ サイトが未追加です。先に add を実行してください"); process.exit(1); }
  if (!s.IsVerified) {
    const r = await api("VerifySite", { siteUrl: SITE });
    console.log("認証:", r.ok ? (r.d === false ? "失敗 (Bing がファイルを確認できなかった)" : "成功") : `エラー ${r.status} ${r.err}`);
    s = await mySite();
  }
  console.log("認証状態:", s?.IsVerified ? "済み" : "未");
  if (!s?.IsVerified) process.exit(1);
  for (const feedUrl of SITEMAPS) {
    const r = await api("SubmitFeed", { siteUrl: SITE, feedUrl });
    console.log("サイトマップ送信:", feedUrl, r.ok ? "受付" : `エラー ${r.status} ${r.err}`);
  }
  const q = await api("GetUrlSubmissionQuota", null, `&siteUrl=${encodeURIComponent(SITE)}`);
  if (q.ok && q.d) console.log(`URL 送信の残り枠: 今日 ${q.d.DailyQuota} / 今月 ${q.d.MonthlyQuota}`);
} else if (cmd === "submit") {
  /* URL の直接送信。登録したばかりのサイトは 1日100件 / 月2,000件 しか送れないので、
     全URLを先頭から送るのではなく、実際に人が来ている順に送る:
       1. トップ (中国語・英語・日本語を先頭に、全言語)
       2. 都道府県ページ (中国語・英語・日本語)
       3. コレクション (中国語・英語・日本語)
       4. 撮影地ページ (中国語・英語・日本語)
     残りは sitemap と IndexNow (notify-indexnow.mjs) から拾われる。
     送った URL は .bing-submitted.json に記録し、次の日は続きから送る。 */
  const { LANGS } = await import("../app/i18n-meta.js");
  const { PREFECTURES } = await import("../app/data.js");
  const { PREF_SLUGS, LOC_SLUGS } = await import("../app/slugs.js");
  const { COLLECTION_SLUGS } = await import("../app/collections-meta.js");
  const first = ["zh", "en", "ja", "zh-tw", "ko"];
  const langs = [...first, ...LANGS.filter((l) => !first.includes(l))];
  const main = ["zh", "en", "ja"];
  const prefs = PREFECTURES.filter((p) => p.photos.length && PREF_SLUGS[p.pref]).sort((a, b) => b.photos.length - a.photos.length);
  const list = [
    ...langs.map((l) => `${SITE}${l}`),
    ...prefs.flatMap((p) => main.map((l) => `${SITE}${l}/${PREF_SLUGS[p.pref]}`)),
    ...COLLECTION_SLUGS.flatMap((s) => main.map((l) => `${SITE}${l}/collections/${s}`)),
    ...prefs.flatMap((p) => [...new Set(p.photos.map((x) => x.loc).filter((x) => x && LOC_SLUGS[x]))].flatMap((loc) => main.map((l) => `${SITE}${l}/${PREF_SLUGS[p.pref]}/${LOC_SLUGS[loc]}`))),
  ];
  const LOG = ".bing-submitted.json";
  const sent = new Set(existsSync(LOG) ? JSON.parse(readFileSync(LOG, "utf-8")) : []);
  const q = await api("GetUrlSubmissionQuota", null, `&siteUrl=${encodeURIComponent(SITE)}`);
  const room = q.ok && q.d ? Math.min(q.d.DailyQuota, q.d.MonthlyQuota) : 0;
  const todo = list.filter((u) => !sent.has(u)).slice(0, room);
  if (!todo.length) { console.log(room ? "送るURLは残っていません" : "今日の送信枠は残っていません"); process.exit(0); }
  const r = await api("SubmitUrlBatch", { siteUrl: SITE.replace(/\/$/, ""), urlList: todo });
  if (!r.ok) { console.error(`✗ 送信できない: ${r.status} ${r.err}`); process.exit(1); }
  for (const u of todo) sent.add(u);
  writeFileSync(LOG, JSON.stringify([...sent]), "utf-8");
  console.log(`URL を ${todo.length}件 送信しました (優先順の ${sent.size}/${list.length} まで済み)。例: ${todo.slice(0, 3).map((u) => u.replace(SITE, "/")).join(", ")}`);
} else {
  const sites = (await api("GetUserSites")).d || [];
  for (const s of sites) console.log(`${s.Url}  認証: ${s.IsVerified ? "済み" : "未"}`);
  const s = await mySite();
  if (s?.IsVerified) {
    const q = await api("GetUrlSubmissionQuota", null, `&siteUrl=${encodeURIComponent(SITE)}`);
    if (q.ok && q.d) console.log(`URL 送信の残り枠: 今日 ${q.d.DailyQuota} / 今月 ${q.d.MonthlyQuota}`);
    const f = await api("GetFeeds", null, `&siteUrl=${encodeURIComponent(SITE)}`);
    for (const x of f.d || []) console.log(`サイトマップ: ${x.Url}  状態 ${x.Status}  URL数 ${x.UrlCount}`);
  }
}
