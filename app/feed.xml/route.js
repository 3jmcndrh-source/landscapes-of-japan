import { SITE_URL } from "../i18n-meta.js";
import { PREFECTURES, getPrefName, getLocName, cldUrl } from "../data.js";
import { PREF_SLUGS, LOC_SLUGS } from "../slugs.js";

// Cloudflare Pages 静的エクスポート対応
export const dynamic = "force-static";

const escape = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function GET() {
  // 全写真をflatten、year desc + PREFECTURES内の出現順でsort
  const all = [];
  for (const pf of PREFECTURES) {
    for (const photo of pf.photos) {
      if (!photo.loc) continue;
      const prefSlug = PREF_SLUGS[pf.pref];
      const locSlug = LOC_SLUGS[photo.loc];
      if (!prefSlug || !locSlug) continue;
      all.push({ ...photo, pref: pf.pref, prefSlug, locSlug });
    }
  }
  all.sort((a, b) => (b.year || 0) - (a.year || 0));
  const recent = all.slice(0, 50);

  const lastBuild = new Date().toUTCString();
  const items = recent.map((p, idx) => {
    // year + 順位から fake pubDate (year-12-31 から1日ずつ遡る)
    const pubDate = p.year
      ? new Date(`${p.year}-12-31T00:00:00Z`).toUTCString()
      : new Date().toUTCString();
    const url = `${SITE_URL}/en/${p.prefSlug}/${p.locSlug}/${p.id}`;
    const title = `${getLocName(p.loc, "en")} - ${getPrefName(p.pref, "en")}`;
    const desc = `Landscape photograph of ${getLocName(p.loc, "en")} in ${getPrefName(p.pref, "en")}, Japan${p.year ? ` (${p.year})` : ""}.`;
    const imgUrl = cldUrl(p.id, 1200);
    return `    <item>
      <title>${escape(title)}</title>
      <link>${escape(url)}</link>
      <guid isPermaLink="true">${escape(url)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escape(desc)}</description>
      <media:content url="${escape(imgUrl)}" medium="image" />
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Landscapes of Japan</title>
    <link>${SITE_URL}/en</link>
    <description>Japanese landscape photography from across the country — latest 50 images.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
