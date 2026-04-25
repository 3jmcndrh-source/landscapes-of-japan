import { notFound } from "next/navigation";
import CollectionClient from "../../../CollectionClient.js";
import { PREFECTURES, getPrefName, getLocName, cldUrl } from "../../../data.js";
import { LANGS, HREFLANG, SITE_URL } from "../../../i18n-meta.js";
import { COLLECTIONS, COLLECTION_SLUGS, getCollectionName, getCollectionDesc, getCollectionPhotos } from "../../../collections.js";

export const dynamicParams = false;

export function generateStaticParams() {
  const params = [];
  for (const lang of LANGS) {
    for (const slug of COLLECTION_SLUGS) {
      params.push({ lang, theme: slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, theme } = await params;
  if (!COLLECTIONS[theme]) return {};

  const name = getCollectionName(theme, lang);
  const desc = getCollectionDesc(theme, lang);
  const title = `${name} | Landscapes of Japan`;

  const languages = {};
  for (const l of LANGS) languages[HREFLANG[l]] = `${SITE_URL}/${l}/collections/${theme}`;
  languages["x-default"] = `${SITE_URL}/en/collections/${theme}`;

  const photos = getCollectionPhotos(theme, PREFECTURES);
  const ogImage = photos.length > 0 ? cldUrl(photos[0].id, 1200) : `${SITE_URL}/og-image.jpg`;

  return {
    title,
    description: desc || `${name} — landscape photography from across Japan.`,
    alternates: {
      canonical: `${SITE_URL}/${lang}/collections/${theme}`,
      languages,
    },
    openGraph: {
      title, description: desc, type: "website",
      url: `${SITE_URL}/${lang}/collections/${theme}`,
      siteName: "Landscapes of Japan",
      images: [{ url: ogImage, width: 1200, height: 800, alt: name }],
    },
    twitter: { card: "summary_large_image", title, description: desc, images: [ogImage] },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function Page({ params }) {
  const { lang, theme } = await params;
  if (!COLLECTIONS[theme]) notFound();

  const photos = getCollectionPhotos(theme, PREFECTURES);
  if (photos.length === 0) notFound();

  const name = getCollectionName(theme, lang);
  const desc = getCollectionDesc(theme, lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageGallery",
        "@id": `${SITE_URL}/${lang}/collections/${theme}#gallery`,
        name: `${name} — Landscapes of Japan`,
        description: desc,
        url: `${SITE_URL}/${lang}/collections/${theme}`,
        inLanguage: HREFLANG[lang] || lang,
        numberOfItems: photos.length,
        image: photos.slice(0, 12).map((p) => ({
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
          { "@type": "ListItem", position: 2, name: lang === "ja" ? "コレクション" : "Collections", item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 3, name, item: `${SITE_URL}/${lang}/collections/${theme}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CollectionClient lang={lang} theme={theme} photos={photos} desc={desc} />
    </>
  );
}
