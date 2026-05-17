import { notFound } from "next/navigation";
import PhotoClient from "../../../../PhotoClient.js";
import { PREFECTURES, getPrefName, getLocName, cldUrl } from "../../../../data.js";
import { LANGS, HREFLANG, SITE_URL, buildHreflangMap } from "../../../../i18n-meta.js";
import { PREF_SLUGS, LOC_SLUGS, prefFromSlug, locFromSlug } from "../../../../slugs.js";
import { getLocDesc, getLocHighlights, getLocDefinition } from "../../../../content/descriptions.js";
import { PHOTO_TAGS } from "../../../../photo-tags.js";
import { TAGS, TAG_SLUGS, getTagName } from "../../../../tags.js";
import { getLocTitleKw, getLocTitleKwEnFallback } from "../../../../title-keywords.js";
import { POSTS, getPostTitle, getPostExcerpt } from "../../../../content/blog/posts.js";
import { ui } from "../../../../ui-strings.js";

// Cloudflare Pages 静的エクスポート: 全 写真 × 25 言語 を build 時に pre-render
// 約 400 photos × 25 langs = ~10,000 pages (Cloudflare Pages 20k file 上限内)
export const dynamicParams = false;

export function generateStaticParams() {
  const params = [];
  for (const lang of LANGS) {
    for (const pf of PREFECTURES) {
      const prefSlug = PREF_SLUGS[pf.pref];
      if (!prefSlug) continue;
      for (const photo of pf.photos) {
        if (!photo.loc) continue;
        const locSlug = LOC_SLUGS[photo.loc];
        if (!locSlug) continue;
        params.push({ lang, pref: prefSlug, loc: locSlug, photoId: photo.id });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, pref: prefSlug, loc: locSlug, photoId } = await params;
  const prefJp = prefFromSlug(prefSlug);
  const locJp = locFromSlug(locSlug);
  if (!prefJp || !locJp) return {};

  const pf = PREFECTURES.find((p) => p.pref === prefJp);
  if (!pf) return {};
  const photo = pf.photos.find((p) => p.id === photoId && p.loc === locJp);
  if (!photo) return {};

  const prefLocal = getPrefName(prefJp, lang);
  const locLocal = getLocName(locJp, lang);
  const desc = getLocDesc(locJp, lang);
  const yearStr = photo.year ? ` (${photo.year})` : "";

  // Use loc title keyword (en/ja native, others EN parens fallback) so photo
  // pages also surface high-impression search terms.
  const titleKw = getLocTitleKw(locJp, lang);
  const titleKwEN = getLocTitleKwEnFallback(locJp);
  let title;
  if (titleKw) {
    title = `${locLocal}${yearStr}: ${titleKw} | Landscapes of Japan`;
  } else if (titleKwEN && lang !== "en") {
    title = `${locLocal}${yearStr} (${titleKwEN}) - ${prefLocal} | Landscapes of Japan`;
  } else {
    title = `${locLocal}${yearStr} - ${prefLocal} | Landscapes of Japan`;
  }
  const description = desc
    ? `${locLocal}, ${prefLocal} — ${desc.slice(0, 140)}`
    : `Photograph of ${locLocal}, ${prefLocal}, Japan${yearStr}.`;

  const languages = buildHreflangMap((l) => `${SITE_URL}/${l}/${prefSlug}/${locSlug}/${photoId}`);

  const ogImage = cldUrl(photoId, 1200);

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}/${photoId}`,
      languages,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}/${photoId}`,
      siteName: "Landscapes of Japan",
      images: [{ url: ogImage, width: 1200, height: 800, alt: `${locLocal} - ${prefLocal}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function Page({ params }) {
  const { lang, pref: prefSlug, loc: locSlug, photoId } = await params;
  const prefJp = prefFromSlug(prefSlug);
  const locJp = locFromSlug(locSlug);
  if (!prefJp || !locJp) notFound();

  const pf = PREFECTURES.find((p) => p.pref === prefJp);
  if (!pf) notFound();
  const photo = pf.photos.find((p) => p.id === photoId && p.loc === locJp);
  if (!photo) notFound();

  const prefLocal = getPrefName(prefJp, lang);
  const locLocal = getLocName(locJp, lang);

  // 同loc の他写真 (現在の写真を除く) を 6枚まで
  const sameLoc = pf.photos.filter((p) => p.loc === locJp && p.id !== photoId);
  const related = sameLoc.slice(0, 6);

  // A13: この写真のタグ + 同タグを持つ別 loc の写真 (最大 6 枚)
  const photoTags = PHOTO_TAGS[photoId] || [];
  const similarByTag = [];
  if (photoTags.length > 0) {
    for (const otherPf of PREFECTURES) {
      for (const otherPhoto of otherPf.photos) {
        if (otherPhoto.id === photoId) continue;
        if (otherPhoto.loc === locJp) continue; // 同locは別セクションなのでスキップ
        const otherTags = PHOTO_TAGS[otherPhoto.id] || [];
        const sharedCount = otherTags.filter((tag) => photoTags.includes(tag)).length;
        if (sharedCount > 0) {
          similarByTag.push({ ...otherPhoto, pref: otherPf.pref, sharedCount });
        }
      }
    }
    // 共通タグ数が多い順でソートし、上位 6 件
    similarByTag.sort((a, b) => b.sharedCount - a.sharedCount);
  }
  const similarPhotos = similarByTag.slice(0, 6);

  const photoUrl = cldUrl(photoId, 2400);
  const photoUrlLarge = cldUrl(photoId, 1200);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Photograph",
        "@id": `${SITE_URL}/${lang}/${prefSlug}/${locSlug}/${photoId}#photo`,
        name: `${locLocal} - ${prefLocal}`,
        description: getLocDesc(locJp, lang) || `Photograph of ${locLocal}, ${prefLocal}.`,
        contentUrl: photoUrl,
        thumbnailUrl: photoUrlLarge,
        url: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}/${photoId}`,
        inLanguage: HREFLANG[lang] || lang,
        encodingFormat: "image/jpeg",
        width: { "@type": "QuantitativeValue", value: 2400, unitCode: "E37" },
        height: { "@type": "QuantitativeValue", value: 1600, unitCode: "E37" },
        keywords: [getLocName(locJp, "en"), getPrefName(prefJp, "en"), "Japanese landscape", "landscape photography", "Japan", photo.year ? String(photo.year) : null, ...((PHOTO_TAGS[photoId] || []).map((tag) => TAGS[tag] ? getTagName(tag, "en") : tag))].filter(Boolean).join(", "),
        creator: {
          "@type": "Person",
          name: "Landscapes of Japan",
          url: SITE_URL,
        },
        copyrightHolder: { "@type": "Person", name: "Landscapes of Japan" },
        copyrightNotice: "© Landscapes of Japan. Unauthorized reproduction prohibited.",
        license: `${SITE_URL}/${lang}`,
        acquireLicensePage: `${SITE_URL}/${lang}#contact`,
        creditText: "Landscapes of Japan",
        isAccessibleForFree: true,
        ...(photo.year && {
          dateCreated: `${photo.year}-01-01`,
          datePublished: `${photo.year}-12-31`,
          copyrightYear: photo.year,
        }),
        contentLocation: {
          "@type": "Place",
          name: `${locLocal}, ${prefLocal}, Japan`,
          address: {
            "@type": "PostalAddress",
            addressRegion: getPrefName(prefJp, "en"),
            addressCountry: "JP",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Landscapes of Japan", item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 2, name: prefLocal, item: `${SITE_URL}/${lang}/${prefSlug}` },
          { "@type": "ListItem", position: 3, name: locLocal, item: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}` },
          { "@type": "ListItem", position: 4, name: `${locLocal}${photo.year ? ` (${photo.year})` : ""}`, item: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}/${photoId}` },
        ],
      },
    ],
  };

  // SEO content enrichment — photo pages are currently very thin (image +
  // breadcrumb + related thumbnails). Adding the location description and
  // its highlights gives Google substantial unique text per location, and
  // cross-linking blog posts gives those posts inbound link signals.
  const locDesc = getLocDesc(locJp, lang);
  const locHighlights = getLocHighlights(locJp, lang);
  const relatedPosts = POSTS.filter((p) => p.locs && p.locs.includes(locJp));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PhotoClient
        lang={lang}
        prefJp={prefJp}
        locJp={locJp}
        photo={photo}
        related={related}
        photoTags={photoTags}
        similarPhotos={similarPhotos}
      />
      {(locDesc || locHighlights.length > 0 || relatedPosts.length > 0) && (
        <section style={{ background: "#0a0a0a", color: "#e8e4df", padding: "60px 16px", borderTop: "1px solid rgba(220,190,100,.15)" }}>
          <div style={{ maxWidth: 980, margin: "0 auto" }}>
            {locDesc && (
              <>
                <h2 style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: "clamp(22px,3vw,32px)", color: "#f2ece2", margin: "0 0 18px", letterSpacing: ".01em" }}>
                  {ui("aboutThisLocation", lang)}: {locLocal}
                </h2>
                <p style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 15, color: "rgba(232,228,223,.78)", lineHeight: 1.85, margin: "0 0 36px" }}>
                  {locDesc}
                </p>
              </>
            )}
            {locHighlights.length > 0 && (
              <>
                <h3 style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: "clamp(18px,2.4vw,24px)", color: "#f2ece2", margin: "0 0 16px" }}>
                  {ui("keyFeatures", lang)}
                </h3>
                <ul style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, color: "rgba(232,228,223,.72)", lineHeight: 1.75, paddingLeft: 22, margin: "0 0 40px" }}>
                  {locHighlights.slice(0, 5).map((h, i) => (
                    <li key={i} style={{ marginBottom: 10 }}>{h}</li>
                  ))}
                </ul>
              </>
            )}
            {relatedPosts.length > 0 && (
              <>
                <h3 style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: "clamp(18px,2.4vw,24px)", color: "#f2ece2", margin: "0 0 16px" }}>
                  {ui("relatedGuides", lang)}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                  {relatedPosts.map((p) => (
                    <a key={p.slug} href={`/${lang}/blog/${p.slug}`} style={{ display: "block", padding: 18, background: "rgba(220,190,100,.05)", border: "1px solid rgba(220,190,100,.18)", borderRadius: 6, textDecoration: "none", color: "#e8e4df" }}>
                      <h4 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontWeight: 500, fontSize: 15, margin: "0 0 8px", color: "#f2ece2", lineHeight: 1.4 }}>
                        {getPostTitle(p, lang)}
                      </h4>
                      <p style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 12, color: "rgba(232,228,223,.65)", margin: 0, lineHeight: 1.6 }}>
                        {getPostExcerpt(p, lang)}
                      </p>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
