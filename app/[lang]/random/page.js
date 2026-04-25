import { redirect } from "next/navigation";
import { PREFECTURES } from "../../data.js";
import { PREF_SLUGS, LOC_SLUGS } from "../../slugs.js";
import { LANGS } from "../../i18n-meta.js";

// 毎回ランダム写真にリダイレクト — キャッシュ無効
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Random Photo | Landscapes of Japan",
  description: "Discover a random photograph from across Japan.",
  robots: { index: false, follow: true },
};

export default async function RandomPage({ params }) {
  const { lang } = await params;
  const langSafe = LANGS.includes(lang) ? lang : "en";

  // 全写真をフラット化
  const all = [];
  for (const pf of PREFECTURES) {
    for (const photo of pf.photos) {
      if (!photo.loc) continue;
      const prefSlug = PREF_SLUGS[pf.pref];
      const locSlug = LOC_SLUGS[photo.loc];
      if (!prefSlug || !locSlug) continue;
      all.push({ id: photo.id, prefSlug, locSlug });
    }
  }

  if (all.length === 0) redirect(`/${langSafe}`);

  const pick = all[Math.floor(Math.random() * all.length)];
  redirect(`/${langSafe}/${pick.prefSlug}/${pick.locSlug}/${pick.id}`);
}
