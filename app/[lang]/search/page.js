import { notFound } from "next/navigation";
import SearchClient from "../../SearchClient.js";
import { LANGS, HREFLANG, SITE_URL, buildHreflangMap } from "../../i18n-meta.js";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) return {};

  const searchLabel = lang === "ja" ? "検索" : lang === "zh" ? "搜索" : lang === "zh-tw" ? "搜尋" : lang === "ko" ? "검색" : "Search";
  const title = `${searchLabel} | Landscapes of Japan`;
  const description = lang === "ja"
    ? "撮影地名、ブログ記事、コレクション、タグから検索できます。"
    : "Search across locations, blog posts, collections, and tags.";

  const languages = buildHreflangMap((l) => `${SITE_URL}/${l}/search`);

  return {
    title, description,
    alternates: { canonical: `${SITE_URL}/${lang}/search`, languages },
    robots: { index: false, follow: true },  // 検索結果ページは index しない
  };
}

export default async function SearchPage({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();
  return <SearchClient lang={lang} />;
}
