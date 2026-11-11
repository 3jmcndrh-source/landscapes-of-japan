import { notFound } from "next/navigation";
import SearchClient from "../../SearchClient.js";
import { LANGS, HREFLANG, SITE_URL, buildHreflangMap } from "../../i18n-meta.js";
import { shareImages } from "../../og.js";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) return {};

  const searchLabel = lang === "ja" ? "検索" : lang === "zh" ? "搜索" : lang === "zh-tw" ? "搜尋" : lang === "ko" ? "검색" : "Search";
  const title = `${searchLabel} | Landscapes of Japan`;
  /* 以前は「ブログ記事」「タグ」と書いていたが、どちらも 2026-07 に廃止済み。いま引けるものに合わせる */
  const description = lang === "ja"
    ? "撮影地・都道府県・テーマ、霧や夕焼けなど見た目の言葉から写真を探せます。"
    : "Search photos by location, prefecture, theme, or by look — mist, sunset and more.";

  const languages = buildHreflangMap((l) => `${SITE_URL}/${l}/search`);

  return {
    title, description,
    alternates: { canonical: `${SITE_URL}/${lang}/search`, languages },
    openGraph: { title, description, type: "website", siteName: "Landscapes of Japan", images: shareImages(null).og },
    twitter: { card: "summary_large_image", title, description, images: shareImages(null).tw },
    robots: { index: false, follow: true },  // 検索結果ページは index しない
  };
}

export default async function SearchPage({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();
  return <SearchClient lang={lang} />;
}
