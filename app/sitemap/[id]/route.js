import { LANGS, HREFLANG, SITE_URL } from "../../i18n-meta.js";
import { PREFECTURES } from "../../data.js";
import { PREF_SLUGS, LOC_SLUGS } from "../../slugs.js";
import { COLLECTION_SLUGS, COLLECTIONS } from "../../collections.js";
import { POSTS, POST_SLUGS } from "../../content/blog/posts.js";
import { TAGS, TAG_SLUGS } from "../../tags.js";

// 写真の最新 year を年-12-31 形式の lastmod に
const yearLastmod = (year) => year ? `${year}-12-31` : null;
const todayLastmod = () => new Date().toISOString().slice(0, 10);

// pref / loc の最新年を求める
function maxYearForPref(pf) {
  let m = 0;
  for (const p of pf.photos) if ((p.year || 0) > m) m = p.year;
  return m || null;
}
function maxYearForLoc(pf, locJp) {
  let m = 0;
  for (const p of pf.photos) if (p.loc === locJp && (p.year || 0) > m) m = p.year;
  return m || null;
}
function maxYearForLocs(locs) {
  let m = 0;
  // PREFECTURES は外で渡されるので関数内で参照不可。route で呼ぶ際に PREFECTURES 引数で渡す
  return m || null;
}

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

  const today = todayLastmod();
  const entries = [];

  // collection/tag locs から最新年を計算するヘルパー (PREFECTURES クロージャー使用)
  const maxYearForLocList = (locList) => {
    let m = 0;
    const set = new Set(locList);
    for (const pf of PREFECTURES) {
      for (const photo of pf.photos) {
        if (photo.loc && set.has(photo.loc) && (photo.year || 0) > m) m = photo.year;
      }
    }
    return m || null;
  };

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
      const cMaxYear = maxYearForLocList(COLLECTIONS[slug]?.locs || []);
      const cLastmod = yearLastmod(cMaxYear) || today;
      for (const lang of LANGS) {
        entries.push(buildUrlEntry({
          url: `${SITE_URL}/${lang}/collections/${slug}`,
          lastmod: cLastmod, changefreq: "monthly", priority: "0.65",
          alternates: cLangs,
        }));
      }
    }

    // blog index — 最新 post date
    const latestPostDate = POSTS.length > 0
      ? [...POSTS].sort((a, b) => b.date.localeCompare(a.date))[0].date
      : today;
    const blogIdxLangs = {};
    for (const l of LANGS) blogIdxLangs[HREFLANG[l]] = `${SITE_URL}/${l}/blog`;
    blogIdxLangs["x-default"] = `${SITE_URL}/en/blog`;
    for (const lang of LANGS) {
      entries.push(buildUrlEntry({
        url: `${SITE_URL}/${lang}/blog`,
        lastmod: latestPostDate, changefreq: "weekly", priority: "0.7",
        alternates: blogIdxLangs,
      }));
    }

    // blog posts — lastmod は post.date
    for (const post of POSTS) {
      const pLangs = {};
      for (const l of LANGS) pLangs[HREFLANG[l]] = `${SITE_URL}/${l}/blog/${post.slug}`;
      pLangs["x-default"] = `${SITE_URL}/en/blog/${post.slug}`;
      for (const lang of LANGS) {
        entries.push(buildUrlEntry({
          url: `${SITE_URL}/${lang}/blog/${post.slug}`,
          lastmod: post.date, changefreq: "monthly", priority: "0.55",
          alternates: pLangs,
        }));
      }
    }

    // tags — lastmod は含まれる写真の最新年
    for (const slug of TAG_SLUGS) {
      const tLangs = {};
      for (const l of LANGS) tLangs[HREFLANG[l]] = `${SITE_URL}/${l}/tags/${slug}`;
      tLangs["x-default"] = `${SITE_URL}/en/tags/${slug}`;
      const tMaxYear = maxYearForLocList(TAGS[slug]?.locs || []);
      const tLastmod = yearLastmod(tMaxYear) || today;
      for (const lang of LANGS) {
        entries.push(buildUrlEntry({
          url: `${SITE_URL}/${lang}/tags/${slug}`,
          lastmod: tLastmod, changefreq: "monthly", priority: "0.55",
          alternates: tLangs,
        }));
      }
    }

    for (const pf of PREFECTURES) {
      const prefSlug = PREF_SLUGS[pf.pref];
      if (!prefSlug) continue;

      const prefLangs = {};
      for (const l of LANGS) prefLangs[HREFLANG[l]] = `${SITE_URL}/${l}/${prefSlug}`;
      prefLangs["x-default"] = `${SITE_URL}/en/${prefSlug}`;

      const prefMaxYear = maxYearForPref(pf);
      const prefLastmod = yearLastmod(prefMaxYear) || today;
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

        const locMaxYear = maxYearForLoc(pf, locJp);
        const locLastmod = yearLastmod(locMaxYear) || today;
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

      const photoLangs = {};
      for (const l of LANGS) photoLangs[HREFLANG[l]] = `${SITE_URL}/${l}/${prefSlug}/${locSlug}/${photo.id}`;
      photoLangs["x-default"] = `${SITE_URL}/en/${prefSlug}/${locSlug}/${photo.id}`;

      // 写真個別: lastmod は year-12-31 (撮影年末)
      const photoLastmod = yearLastmod(photo.year) || today;
      for (const lang of LANGS) {
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
