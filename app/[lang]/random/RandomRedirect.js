"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { PREFECTURES } from "../../data.js";
import { PREF_SLUGS, LOC_SLUGS } from "../../slugs.js";
import { LANGS } from "../../i18n-meta.js";

export default function RandomRedirect() {
  const router = useRouter();
  const params = useParams();
  const lang = typeof params?.lang === "string" ? params.lang : "en";

  useEffect(() => {
    const langSafe = LANGS.includes(lang) ? lang : "en";
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
    if (all.length === 0) {
      router.replace(`/${langSafe}`);
      return;
    }
    const pick = all[Math.floor(Math.random() * all.length)];
    router.replace(`/${langSafe}/${pick.prefSlug}/${pick.locSlug}/${pick.id}`);
  }, [lang, router]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#e8e4df",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-playfair),Georgia,serif",
      fontStyle: "italic",
      fontSize: 24,
    }}>
      Finding a random photo…
    </div>
  );
}
