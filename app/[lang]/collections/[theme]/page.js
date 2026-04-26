import { notFound } from "next/navigation";
import CollectionClient from "../../../CollectionClient.js";
import { PREFECTURES, getPrefName, getLocName, cldUrl } from "../../../data.js";
import { LANGS, HREFLANG, SITE_URL, buildHreflangMap } from "../../../i18n-meta.js";
import { COLLECTIONS, COLLECTION_SLUGS, getCollectionName, getCollectionDesc, getCollectionPhotos, getCollectionGuide } from "../../../collections.js";

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

  const languages = buildHreflangMap((l) => `${SITE_URL}/${l}/collections/${theme}`);

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
  const guide = getCollectionGuide(theme, lang);

  // A8: ガイドラベル (server-side, JSON-LD 用)
  const GUIDE_LABEL_TITLES = {
    ja: { bestSeason: "最適な季節", bestTime: "最適な時間帯", technique: "撮影テクニック", equipment: "推奨機材", tips: "実践のヒント" },
    en: { bestSeason: "Best Season", bestTime: "Best Time", technique: "Technique", equipment: "Equipment", tips: "Field Tips" },
    zh: { bestSeason: "最佳季节", bestTime: "最佳时间", technique: "摄影技巧", equipment: "推荐器材", tips: "实战建议" },
    "zh-tw": { bestSeason: "最佳季節", bestTime: "最佳時間", technique: "攝影技巧", equipment: "推薦器材", tips: "實戰建議" },
    ko: { bestSeason: "최적 시즌", bestTime: "최적 시간대", technique: "촬영 기법", equipment: "추천 장비", tips: "실전 팁" },
  };
  const labelMap = GUIDE_LABEL_TITLES[lang] || GUIDE_LABEL_TITLES.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...(guide ? [{
        "@type": "HowTo",
        "@id": `${SITE_URL}/${lang}/collections/${theme}#guide`,
        name: `${name} — ${labelMap.technique}`,
        description: desc,
        inLanguage: HREFLANG[lang] || lang,
        step: [
          { "@type": "HowToStep", position: 1, name: labelMap.bestSeason, text: guide.bestSeason },
          { "@type": "HowToStep", position: 2, name: labelMap.bestTime, text: guide.bestTime },
          { "@type": "HowToStep", position: 3, name: labelMap.technique, text: guide.technique },
          { "@type": "HowToStep", position: 4, name: labelMap.equipment, text: guide.equipment },
          { "@type": "HowToStep", position: 5, name: labelMap.tips, text: guide.tips },
        ].filter((s) => s.text),
      }] : []),
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
        "@type": "ItemList",
        "@id": `${SITE_URL}/${lang}/collections/${theme}#itemlist`,
        name: `${name} — Landscapes of Japan`,
        numberOfItems: photos.length,
        itemListElement: photos.slice(0, 30).map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "ImageObject",
            contentUrl: cldUrl(p.id, 1200),
            name: `${getLocName(p.loc, lang)} - ${getPrefName(p.pref, lang)}`,
          },
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
