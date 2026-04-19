import { notFound } from "next/navigation";
import PrefClient from "../../PrefClient.js";
import { PREFECTURES, PREF_I18N, getPrefName } from "../../data.js";
import { LANGS, HREFLANG, SITE_URL } from "../../i18n-meta.js";
import { PREF_SLUGS, prefFromSlug } from "../../slugs.js";
import { getPrefDesc, getPrefFaqs } from "../../content/descriptions.js";

export const dynamicParams = false;

export function generateStaticParams() {
  const params = [];
  for (const lang of LANGS) {
    for (const prefJp of Object.keys(PREF_SLUGS)) {
      const pf = PREFECTURES.find((p) => p.pref === prefJp);
      if (!pf) continue;
      params.push({ lang, pref: PREF_SLUGS[prefJp] });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, pref: prefSlug } = await params;
  const prefJp = prefFromSlug(prefSlug);
  if (!prefJp) return {};
  const prefLocal = getPrefName(prefJp, lang);
  const desc = getPrefDesc(prefJp, lang);

  const title = `${prefLocal} | Landscapes of Japan`;
  const description = desc || `${prefLocal} landscape photography — photos taken across ${prefLocal}, Japan.`;

  const languages = {};
  for (const l of LANGS) {
    languages[HREFLANG[l]] = `${SITE_URL}/${l}/${prefSlug}`;
  }
  languages["x-default"] = `${SITE_URL}/en/${prefSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/${prefSlug}`,
      languages,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/${lang}/${prefSlug}`,
      siteName: "Landscapes of Japan",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function Page({ params }) {
  const { lang, pref: prefSlug } = await params;
  const prefJp = prefFromSlug(prefSlug);
  if (!prefJp) notFound();

  const pf = PREFECTURES.find((p) => p.pref === prefJp);
  if (!pf) notFound();

  const desc = getPrefDesc(prefJp, lang);
  const faqs = getPrefFaqs(prefJp, lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageGallery",
        name: `${getPrefName(prefJp, lang)} | Landscapes of Japan`,
        url: `${SITE_URL}/${lang}/${prefSlug}`,
        inLanguage: HREFLANG[lang] || lang,
        description: desc,
        about: { "@type": "AdministrativeArea", name: getPrefName(prefJp, "en"), addressCountry: "JP" },
        image: pf.photos.slice(0, 10).map((p) => ({
          "@type": "Photograph",
          contentUrl: `https://res.cloudinary.com/dr53c12fo/image/upload/w_1200,f_auto,q_auto/${encodeURIComponent(p.id)}.jpg`,
          name: (p.loc ? p.loc + " - " : "") + prefJp,
        })),
      },
      faqs.length > 0 && {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Landscapes of Japan", item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 2, name: getPrefName(prefJp, lang), item: `${SITE_URL}/${lang}/${prefSlug}` },
        ],
      },
    ].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PrefClient lang={lang} prefJp={prefJp} desc={desc} faqs={faqs} />
    </>
  );
}
