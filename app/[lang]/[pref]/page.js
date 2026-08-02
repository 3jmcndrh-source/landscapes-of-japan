import { notFound } from "next/navigation";
import PrefClient from "../../PrefClient.js";
import { PREFECTURES, PREF_I18N, getPrefName, cldUrl } from "../../data.js";
import { LANGS, HREFLANG, SITE_URL, buildHreflangMap } from "../../i18n-meta.js";
import { PREF_SLUGS, prefFromSlug } from "../../slugs.js";
import { getPrefDesc, getPrefFaqs } from "../../content/descriptions.js";
import { getPrefSameAs } from "../../wikidata.js";
import { getPrefTitleKw, getPrefTitleKwEnFallback } from "../../title-keywords.js";
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

  const titleKw = getPrefTitleKw(prefJp, lang);
  const titleKwEN = getPrefTitleKwEnFallback(prefJp);
  let title;
  if (titleKw) {
    title = `${prefLocal}: ${titleKw} | Landscapes of Japan`;
  } else if (titleKwEN && lang !== "en") {
    title = `${prefLocal} (${titleKwEN}) | Landscapes of Japan`;
  } else {
    title = `${prefLocal} | Landscapes of Japan`;
  }
  const description = desc || `${prefLocal} landscape photography — photos taken across ${prefLocal}, Japan.`;

  const languages = buildHreflangMap((l) => `${SITE_URL}/${l}/${prefSlug}`);

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

  // desc/faqs は UI からは 2026-07 に削除済み。SEO meta + JSON-LD 用にのみ残す。
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
        about: {
          "@type": "AdministrativeArea",
          name: getPrefName(prefJp, "en"),
          addressCountry: "JP",
          ...(getPrefSameAs(prefJp).length > 0 && { sameAs: getPrefSameAs(prefJp) }),
        },
        image: pf.photos.slice(0, 10).map((p) => ({
          "@type": "Photograph",
          contentUrl: cldUrl(p.id, 1200),
          name: (p.loc ? p.loc + " - " : "") + prefJp,
        })),
      },
      faqs.length > 0 && {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/${lang}/${prefSlug}#faq`,
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
      <PrefClient lang={lang} prefJp={prefJp} />
    </>
  );
}
