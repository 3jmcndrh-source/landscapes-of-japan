import PageClient from "../PageClient.js";
import { LANGS, SEO_META, HREFLANG, SITE_URL, OG_IMAGE } from "../i18n-meta.js";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const meta = SEO_META[lang];
  if (!meta) return {};

  const languages = {};
  for (const l of LANGS) {
    languages[HREFLANG[l]] = `${SITE_URL}/${l}`;
  }
  languages["x-default"] = `${SITE_URL}/en`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `${SITE_URL}/${lang}`,
      siteName: "Landscapes of Japan",
      locale: meta.ogLocale,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [OG_IMAGE],
    },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  };
}

export default async function Page({ params }) {
  const { lang } = await params;
  return <PageClient initialLang={lang} />;
}
