import { notFound } from "next/navigation";
import PhotoClient from "../../../../PhotoClient.js";
import { PREFECTURES, getPrefName, getLocName, cldUrl } from "../../../../data.js";
import { LANGS, HREFLANG, SITE_URL, buildHreflangMap } from "../../../../i18n-meta.js";
import { PREF_SLUGS, LOC_SLUGS, prefFromSlug, locFromSlug } from "../../../../slugs.js";
import { getLocDesc } from "../../../../content/descriptions.js";

// 写真個別ページ ~10,320 通り。全ビルド時 SSG は Vercel deploy size 制限に
// かかるため、build時 pre-render は 0、on-demand ISR で生成 → CDN キャッシュ。
export const dynamicParams = true;
export const revalidate = 86400; // 24時間

export function generateStaticParams() {
  return [];
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

  const title = `${locLocal}${yearStr} - ${prefLocal} | Landscapes of Japan`;
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
        ...(photo.year && {
          dateCreated: `${photo.year}`,
          datePublished: `${photo.year}`,
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PhotoClient
        lang={lang}
        prefJp={prefJp}
        locJp={locJp}
        photo={photo}
        related={related}
      />
    </>
  );
}
