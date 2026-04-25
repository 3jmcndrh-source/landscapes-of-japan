import { notFound } from "next/navigation";
import TagClient from "../../../TagClient.js";
import { PREFECTURES, getPrefName, getLocName, cldUrl } from "../../../data.js";
import { LANGS, HREFLANG, SITE_URL, buildHreflangMap } from "../../../i18n-meta.js";
import { TAGS, TAG_SLUGS, getTagName, getTagDesc, getTagPhotos } from "../../../tags.js";

export const dynamicParams = false;

export function generateStaticParams() {
  const params = [];
  for (const lang of LANGS) for (const slug of TAG_SLUGS) params.push({ lang, slug });
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  if (!TAGS[slug]) return {};

  const name = getTagName(slug, lang);
  const desc = getTagDesc(slug, lang);
  const title = `${name} | Landscapes of Japan`;

  const languages = buildHreflangMap((l) => `${SITE_URL}/${l}/tags/${slug}`);

  const photos = getTagPhotos(slug, PREFECTURES);
  const ogImage = photos.length > 0 ? cldUrl(photos[0].id, 1200) : `${SITE_URL}/og-image.jpg`;

  return {
    title,
    description: desc || `${name} — landscape photography from across Japan.`,
    alternates: { canonical: `${SITE_URL}/${lang}/tags/${slug}`, languages },
    openGraph: {
      title, description: desc, type: "website",
      url: `${SITE_URL}/${lang}/tags/${slug}`,
      siteName: "Landscapes of Japan",
      images: [{ url: ogImage, width: 1200, height: 800, alt: name }],
    },
    twitter: { card: "summary_large_image", title, description: desc, images: [ogImage] },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function Page({ params }) {
  const { lang, slug } = await params;
  if (!TAGS[slug]) notFound();

  const photos = getTagPhotos(slug, PREFECTURES);
  if (photos.length === 0) notFound();

  const name = getTagName(slug, lang);
  const desc = getTagDesc(slug, lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageGallery",
        "@id": `${SITE_URL}/${lang}/tags/${slug}#gallery`,
        name: `${name} — Landscapes of Japan`,
        description: desc,
        url: `${SITE_URL}/${lang}/tags/${slug}`,
        inLanguage: HREFLANG[lang] || lang,
        numberOfItems: photos.length,
        image: photos.slice(0, 10).map((p) => ({
          "@type": "ImageObject",
          contentUrl: cldUrl(p.id, 1200),
          name: `${getLocName(p.loc, lang)} - ${getPrefName(p.pref, lang)}`,
          ...(p.year && { dateCreated: `${p.year}` }),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Landscapes of Japan", item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 2, name: lang === "ja" ? "タグ" : "Tags", item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 3, name, item: `${SITE_URL}/${lang}/tags/${slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TagClient lang={lang} slug={slug} photos={photos} desc={desc} />
    </>
  );
}
