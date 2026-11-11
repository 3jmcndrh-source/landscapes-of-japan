import { SITE_URL } from "../i18n-meta.js";
import { getPrefName, getLocName, cldUrl } from "../data.js";
import { latestPhotos } from "../feed-items.js";

// Cloudflare Pages 静的エクスポート対応
export const dynamic = "force-static";

export async function GET() {
  // 最近追加した50枚 (feed.xml と同じ並び・同じ日付。feed-items.js)
  const recent = latestPhotos(50);

  const items = recent.map((p) => {
    const url = `${SITE_URL}/en/${p.prefSlug}/${p.locSlug}/${p.id}`;
    const title = `${getLocName(p.loc, "en")} - ${getPrefName(p.pref, "en")}`;
    const summary = `Landscape photograph of ${getLocName(p.loc, "en")} in ${getPrefName(p.pref, "en")}, Japan${p.year ? ` (${p.year})` : ""}.`;
    const imgUrl = cldUrl(p.id, 1200);
    const datePublished = p.when.toISOString();
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
