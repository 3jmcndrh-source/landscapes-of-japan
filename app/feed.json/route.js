import { SITE_URL } from "../i18n-meta.js";
import { PREFECTURES, getPrefName, getLocName, cldUrl } from "../data.js";
import { PREF_SLUGS, LOC_SLUGS } from "../slugs.js";

// Cloudflare Pages 静的エクスポート対応
export const dynamic = "force-static";

export async function GET() {
  // flatten + year desc, top 50 (mirrors feed.xml)
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

  const items = recent.map((p) => {
    const url = `${SITE_URL}/en/${p.prefSlug}/${p.locSlug}/${p.id}`;
    const title = `${getLocName(p.loc, "en")} - ${getPrefName(p.pref, "en")}`;
    const summary = `Landscape photograph of ${getLocName(p.loc, "en")} in ${getPrefName(p.pref, "en")}, Japan${p.year ? ` (${p.year})` : ""}.`;
    const imgUrl = cldUrl(p.id, 1200);
    const datePublished = p.year ? `${p.year}-12-31T00:00:00Z` : new Date().toISOString();
    return {
      id: url,
      url,
      title,
      summary,
      image: imgUrl,
      banner_image: imgUrl,
      date_published: datePublished,
      authors: [{ name: "Landscapes of Japan", url: SITE_URL }],
      tags: [getPrefName(p.pref, "en"), getLocName(p.loc, "en"), "Japan", "landscape photography"].filter(Boolean),
    };
  });

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Landscapes of Japan",
    home_page_url: `${SITE_URL}/en`,
    feed_url: `${SITE_URL}/feed.json`,
    description: "Japanese landscape photography from across the country — latest 50 images.",
    language: "en",
    authors: [{ name: "Landscapes of Japan", url: SITE_URL }],
    icon: `${SITE_URL}/favicon.ico`,
    favicon: `${SITE_URL}/favicon.ico`,
    items,
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
