import { LANGS, HREFLANG, SITE_URL, PHOTO_LANGS } from "../../i18n-meta.js";
import { PREFECTURES } from "../../data.js";
import { PREF_SLUGS, LOC_SLUGS } from "../../slugs.js";
import { COLLECTION_SLUGS, getCollectionPhotos } from "../../collections.js";
import { GALLERIES } from "../../galleries.js";
import { PHOTO_ADDED } from "../../photo-added.js";
import { PHOTO_DATES } from "../../photo-dates.js";

// Cloudflare Pages 静的エクスポート対応 — id=0 + id=1..N (per-pref) を build 時 SSG
export const dynamic = "force-static";

export function generateStaticParams() {
  const params = [{ id: "0.xml" }]; // base sitemap
  for (let i = 0; i < PREFECTURES.length; i++) {
    params.push({ id: `${i + 1}.xml` }); // per-prefecture photo sitemap
  }
  return params;
}

/* lastmod (最終更新日) は「そのページの中身が最後に変わった日」を実際の記録から出す。
   以前は撮影年の年末 (例: 2026年の写真 → 2026-12-31) を入れていたため、
   1,800件が未来の日付になっていた。検索エンジンは、当てにならない lastmod を
   サイト全体で無視するようになる (どのページが新しいかを伝える手段を自分で潰していた)。

   写真1枚の日付 = サイトに追加した日 (photo-added.js)。記録が無い写真は撮影日 (photo-dates.js)。
   一覧ページ (都道府県・撮影地・コレクション・ギャラリー) = 含まれる写真のうち最も新しい日付。
   トップと47都道府県 = 全写真のうち最も新しい日付 (= 最後に写真を足した日)。
   どれも今日より先にはしない。ビルドした日そのものは使わない
   (中身が変わっていないのに毎回日付だけ動くと、これも当てにならない日付になる)。 */
const todayLastmod = () => new Date().toISOString().slice(0, 10);
const photoStamp = (p) => {
  const d = (PHOTO_ADDED[p.id] || "").slice(0, 10) || PHOTO_DATES[p.id] || (p.year ? `${p.year}-01-01` : "");
  if (!d) return null;
  const today = todayLastmod();
  return d > today ? today : d;
};
const latestStamp = (photos) => {
  let m = "";
  for (const p of photos || []) { const d = photoStamp(p); if (d && d > m) m = d; }
  return m || null;
};
const ALL_PHOTOS = PREFECTURES.flatMap((pf) => pf.photos.map((p) => ({ ...p, pref: pf.pref })));
const SITE_LATEST = latestStamp(ALL_PHOTOS);

/**
 * 個別sitemap生成
 * - id=0: ルート + 都道府県 + 撮影地 URL (~1,780)
 * - id=1..N: 各都道府県 idx=id-1 の写真個別ページ
 */
const escape = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

function buildUrlEntry({ url, lastmod, changefreq, priority, alternates }) {
  const altLines = Object.entries(alternates || {})
    .map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escape(href)}"/>`)
    .join("\n");
  return `  <url>
    <loc>${escape(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${altLines}
  </url>`;
}

export async function GET(_req, { params }) {
  const p = await params;
  const idStr = String(p.id || "").replace(/\.xml$/i, "");
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id) || id < 0) {
    return new Response("Not Found", { status: 404 });
  }

  const today = SITE_LATEST || todayLastmod();   /* 「写真に結び付かないページ」の日付 = 最後に写真を足した日 */
  const entries = [];

  if (id === 0) {
    // base: root + pref + loc
    const rootLangs = {};
    for (const l of LANGS) rootLangs[HREFLANG[l]] = `${SITE_URL}/${l}`;
    rootLangs["x-default"] = `${SITE_URL}/en`;

    for (const lang of LANGS) {
      entries.push(buildUrlEntry({
        url: `${SITE_URL}/${lang}`,
        lastmod: today, changefreq: "weekly",
        priority: lang === "ja" || lang === "en" ? "1.0" : "0.8",
        alternates: rootLangs,
      }));
    }

    // collections — lastmod は含まれる写真の最新 year-12-31
    for (const slug of COLLECTION_SLUGS) {
      const cLangs = {};
      for (const l of LANGS) cLangs[HREFLANG[l]] = `${SITE_URL}/${l}/collections/${slug}`;
      cLangs["x-default"] = `${SITE_URL}/en/collections/${slug}`;
      const cLastmod = latestStamp(getCollectionPhotos(slug, PREFECTURES)) || today;
      for (const lang of LANGS) {
        entries.push(buildUrlEntry({
          url: `${SITE_URL}/${lang}/collections/${slug}`,
          lastmod: cLastmod, changefreq: "monthly", priority: "0.65",
          alternates: cLangs,
        }));
      }
    }

    /* ⑤ 地域×テーマ ギャラリー。
       索引に載せる設定 (index, follow + canonical + hreflang) にしてあるので、
       サイトマップにも載せる。探索画面 (/explore) と共有アルバム (/album) は
       noindex なので、ここには入れない。 */
    for (const g of GALLERIES) {
      const gLangs = {};
      for (const l of LANGS) gLangs[HREFLANG[l]] = `${SITE_URL}/${l}/gallery/${g.slug}`;
      gLangs["x-default"] = `${SITE_URL}/en/gallery/${g.slug}`;
      const gLastmod = latestStamp(getCollectionPhotos(g.theme, PREFECTURES).filter((p) => p.pref === g.pref)) || today;
      for (const lang of LANGS) {
        entries.push(buildUrlEntry({
          url: `${SITE_URL}/${lang}/gallery/${g.slug}`,
          lastmod: gLastmod, changefreq: "monthly", priority: "0.6",
          alternates: gLangs,
        }));
      }
    }

    // all-prefectures index (1 × 20 langs = 20 URLs)
    const allPrefLangs = {};
    for (const l of LANGS) allPrefLangs[HREFLANG[l]] = `${SITE_URL}/${l}/all-prefectures`;
    allPrefLangs["x-default"] = `${SITE_URL}/en/all-prefectures`;
    for (const lang of LANGS) {
      entries.push(buildUrlEntry({
        url: `${SITE_URL}/${lang}/all-prefectures`,
        lastmod: today, changefreq: "monthly", priority: "0.6",
        alternates: allPrefLangs,
      }));
    }

    for (const pf of PREFECTURES) {
      const prefSlug = PREF_SLUGS[pf.pref];
      if (!prefSlug) continue;

      const prefLangs = {};
      for (const l of LANGS) prefLangs[HREFLANG[l]] = `${SITE_URL}/${l}/${prefSlug}`;
      prefLangs["x-default"] = `${SITE_URL}/en/${prefSlug}`;

      const prefLastmod = latestStamp(pf.photos) || today;
      for (const lang of LANGS) {
        entries.push(buildUrlEntry({
          url: `${SITE_URL}/${lang}/${prefSlug}`,
          lastmod: prefLastmod, changefreq: "monthly", priority: "0.7",
          alternates: prefLangs,
        }));
      }

      const uniqueLocs = [...new Set(pf.photos.map((p) => p.loc).filter(Boolean))];
      for (const locJp of uniqueLocs) {
        const locSlug = LOC_SLUGS[locJp];
        if (!locSlug) continue;

        const locLangs = {};
        for (const l of LANGS) locLangs[HREFLANG[l]] = `${SITE_URL}/${l}/${prefSlug}/${locSlug}`;
        locLangs["x-default"] = `${SITE_URL}/en/${prefSlug}/${locSlug}`;

        const locLastmod = latestStamp(pf.photos.filter((p) => p.loc === locJp)) || today;
        for (const lang of LANGS) {
          entries.push(buildUrlEntry({
            url: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}`,
            lastmod: locLastmod, changefreq: "monthly", priority: "0.6",
            alternates: locLangs,
          }));
        }
      }
    }
  } else {
    // id 1..N: 各pref の写真個別ページ
    const idx = id - 1;
    const pf = PREFECTURES[idx];
    if (!pf) return new Response("Not Found", { status: 404 });
    const prefSlug = PREF_SLUGS[pf.pref];
    if (!prefSlug) return new Response("Not Found", { status: 404 });

    for (const photo of pf.photos) {
      if (!photo.loc) continue;
      const locSlug = LOC_SLUGS[photo.loc];
      if (!locSlug) continue;

      // 2026-06: 写真個別ページは PHOTO_LANGS (7言語) のみ生成・登載
      const photoLangs = {};
      for (const l of PHOTO_LANGS) photoLangs[HREFLANG[l]] = `${SITE_URL}/${l}/${prefSlug}/${locSlug}/${photo.id}`;
      photoLangs["x-default"] = `${SITE_URL}/en/${prefSlug}/${locSlug}/${photo.id}`;

      // 写真個別: サイトに追加した日 (記録が無ければ撮影日)
      const photoLastmod = photoStamp(photo) || today;
      for (const lang of PHOTO_LANGS) {
        entries.push(buildUrlEntry({
          url: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}/${photo.id}`,
          lastmod: photoLastmod, changefreq: "yearly", priority: "0.4",
          alternates: photoLangs,
        }));
      }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
