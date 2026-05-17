import { SITE_URL } from "../i18n-meta.js";
import { PREFECTURES } from "../data.js";

// Cloudflare Pages 静的エクスポート対応 — build 時に 1 回だけ実行
export const dynamic = "force-static";

/**
 * Sitemap index: lists all sub-sitemaps.
 * - /sitemap/0.xml = base (root + pref + loc URLs)
 * - /sitemap/1.xml to /sitemap/N.xml = photo URLs per prefecture
 */
export async function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const sitemaps = [];

  // base
  sitemaps.push(`<sitemap><loc>${SITE_URL}/sitemap/0.xml</loc><lastmod>${lastmod}</lastmod></sitemap>`);

  // per-prefecture photo sitemaps
  for (let i = 0; i < PREFECTURES.length; i++) {
    sitemaps.push(`<sitemap><loc>${SITE_URL}/sitemap/${i + 1}.xml</loc><lastmod>${lastmod}</lastmod></sitemap>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.join("\n")}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
