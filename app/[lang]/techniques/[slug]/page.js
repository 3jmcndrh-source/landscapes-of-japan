import { notFound } from "next/navigation";
import TagClient from "../../../TagClient.js";
import { PREFECTURES, getPrefName, getLocName, cldUrl } from "../../../data.js";
import { LANGS, HREFLANG, SITE_URL, buildHreflangMap } from "../../../i18n-meta.js";
import { TECHNIQUES, TECHNIQUE_SLUGS, getTechniqueName, getTechniqueDesc, getTechniqueSteps, getTechniquePhotos } from "../../../techniques.js";

export const dynamicParams = false;

export function generateStaticParams() {
  const params = [];
  for (const lang of LANGS) for (const slug of TECHNIQUE_SLUGS) params.push({ lang, slug });
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  if (!TECHNIQUES[slug]) return {};

  const name = getTechniqueName(slug, lang);
  const desc = getTechniqueDesc(slug, lang);
  const labelLang = lang === "ja" ? "撮影技法" : lang === "ko" ? "촬영 기법" : lang === "zh" ? "摄影技巧" : lang === "zh-tw" ? "攝影技巧" : "Photography Technique";
  const title = `${name} — ${labelLang} | Landscapes of Japan`;

  const languages = buildHreflangMap((l) => `${SITE_URL}/${l}/techniques/${slug}`);
  const photos = getTechniquePhotos(slug, PREFECTURES);
  const ogImage = photos.length > 0 ? cldUrl(photos[0].id, 1200) : `${SITE_URL}/og-image.jpg`;

  return {
    title,
    description: desc || `Photography technique guide: ${name}.`,
    alternates: { canonical: `${SITE_URL}/${lang}/techniques/${slug}`, languages },
    openGraph: { title, description: desc, type: "article", url: `${SITE_URL}/${lang}/techniques/${slug}`, siteName: "Landscapes of Japan", images: [{ url: ogImage, width: 1200, height: 800, alt: name }] },
    twitter: { card: "summary_large_image", title, description: desc, images: [ogImage] },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function TechniquePage({ params }) {
  const { lang, slug } = await params;
  if (!TECHNIQUES[slug]) notFound();

  const photos = getTechniquePhotos(slug, PREFECTURES);
  const name = getTechniqueName(slug, lang);
  const desc = getTechniqueDesc(slug, lang);
  const steps = getTechniqueSteps(slug, lang);
  const labelLang = lang === "ja" ? "撮影技法" : lang === "ko" ? "촬영 기법" : lang === "zh" ? "摄影技巧" : lang === "zh-tw" ? "攝影技巧" : "Techniques";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/${lang}/techniques/${slug}#howto`,
        name,
        description: desc,
        url: `${SITE_URL}/${lang}/techniques/${slug}`,
        inLanguage: HREFLANG[lang] || lang,
        step: steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          text: s,
        })),
        ...(photos.length > 0 && { image: cldUrl(photos[0].id, 1200) }),
      },
      ...(photos.length > 0 ? [{
        "@type": "ItemList",
        "@id": `${SITE_URL}/${lang}/techniques/${slug}#itemlist`,
        name: `${name} — example photos`,
        numberOfItems: photos.length,
        itemListElement: photos.slice(0, 20).map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "ImageObject",
            contentUrl: cldUrl(p.id, 1200),
            name: `${getLocName(p.loc, lang)} - ${getPrefName(p.pref, lang)}`,
          },
        })),
      }] : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Landscapes of Japan", item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 2, name: labelLang, item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 3, name, item: `${SITE_URL}/${lang}/techniques/${slug}` },
        ],
      },
    ],
  };

  // Compose desc + steps as combined desc for client (steps shown as bullet list)
  const composedDesc = desc + (steps.length > 0 ? "\n\n" + steps.map((s, i) => `${i + 1}. ${s}`).join("\n") : "");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TagClient lang={lang} slug={slug} photos={photos} desc={composedDesc} />
    </>
  );
}
