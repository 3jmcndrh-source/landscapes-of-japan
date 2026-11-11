import { SITE_URL } from "../i18n-meta.js";
import { getPrefName, getLocName, cldUrl } from "../data.js";
import { latestPhotos } from "../feed-items.js";

// Cloudflare Pages 静的エクスポート対応
export const dynamic = "force-static";

const escape = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function GET() {
  // 最近追加した50枚 (並びと日付は feed-items.js。実際の追加日・撮影日を使う)
  const recent = latestPhotos(50);

  const lastBuild = (recent[0]?.when || new Date()).toUTCString();
  const items = recent.map((p) => {
    const pubDate = p.when.toUTCString();
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
