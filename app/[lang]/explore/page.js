import { notFound } from "next/navigation";
import ExploreClient from "../../ExploreClient.js";
import { LANGS, SITE_URL, buildHreflangMap } from "../../i18n-meta.js";
import { ui } from "../../ui-strings.js";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) return {};

  const title = `${ui("explorePhotos", lang)} | Landscapes of Japan`;
  const languages = buildHreflangMap((l) => `${SITE_URL}/${l}/explore`);

  return {
    title,
    alternates: { canonical: `${SITE_URL}/${lang}/explore`, languages },
    /* 自由に条件を組み合わせる画面。条件つきURLを検索対象として量産しないため
       index はしない (検索向けのギャラリーは ⑤ で別に用意する)。
       リンクはたどってよいので follow は残す。 */
    robots: { index: false, follow: true },
  };
}

export default async function ExplorePage({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();
  return <ExploreClient lang={lang} />;
}
