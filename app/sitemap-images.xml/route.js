import { PREFECTURES, getLocName, getPrefName, cldUrl } from "../data.js";
import { PREF_SLUGS, LOC_SLUGS } from "../slugs.js";
import { SITE_URL } from "../i18n-meta.js";

// Cloudflare Pages 静的エクスポート対応
export const dynamic = "force-static";

/**
 * Google image sitemap — Photos on each loc/pref page, canonical Japanese URLs.
 * Google Image Search discovers images across all language variants via the
 * canonical page's HTML, so listing /ja/ URLs here is sufficient.
 */
export async function GET() {
  const escapeXml = (s = "") =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const urls = [];

  for (const pf of PREFECTURES) {
    const prefSlug = PREF_SLUGS[pf.pref];
    if (!prefSlug) continue;
    const prefJp = pf.pref;
    const prefJa = getPrefName(prefJp, "ja");

    // Prefecture page: include first 10 photos from the prefecture
    const prefUrl = `${SITE_URL}/ja/${prefSlug}`;
    const prefImages = pf.photos.slice(0, 10).map((p) => ({
      loc: cldUrl(p.id, 1200),
      title: (p.loc ? getLocName(p.loc, "ja") + " - " : "") + prefJa,
    }));
    urls.push({ loc: prefUrl, images: prefImages });

    // Location pages: all photos of each loc
    const uniqueLocs = [...new Set(pf.photos.map((ph) => ph.loc).filter(Boolean))];
    for (const locJp of uniqueLocs) {
      const locSlug = LOC_SLUGS[locJp];
      if (!locSlug) continue;
      const locJa = getLocName(locJp, "ja");
      const photos = pf.photos.filter((ph) => ph.loc === locJp);
      const locUrl = `${SITE_URL}/ja/${prefSlug}/${locSlug}`;
      const locImages = photos.map((p) => ({
        loc: cldUrl(p.id, 1200),
        title: `${locJa} - ${prefJa}`,
        caption: p.year ? `${locJa} (${p.year})` : locJa,
      }));
      urls.push({ loc: locUrl, images: locImages });

      // Photo detail pages: one URL per photo, one image entry each.
      // This boosts Google Images traffic: each photo gets a dedicated indexable page.
      for (const photo of photos) {
        const photoUrl = `${SITE_URL}/ja/${prefSlug}/${locSlug}/${photo.id}`;
        urls.push({
          loc: photoUrl,
          images: [{
            loc: cldUrl(photo.id, 2400),  // 2400px for highest quality reference
            title: `${locJa} - ${prefJa}${photo.year ? ` (${photo.year})` : ""}`,
            caption: `${locJa}, ${prefJa}, Japan${photo.year ? ` — ${photo.year}` : ""}`,
          }],
        });
      }
    }
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n` +
          `    <loc>${escapeXml(u.loc)}</loc>\n` +
          u.images
            .map(
              (img) =>
                `    <image:image>\n` +
                `      <image:loc>${escapeXml(img.loc)}</image:loc>\n` +
                `      <image:title>${escapeXml(img.title)}</image:title>\n` +
                (img.caption ? `      <image:caption>${escapeXml(img.caption)}</image:caption>\n` : "") +
                `    </image:image>\n`
            )
            .join("") +
          `  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
