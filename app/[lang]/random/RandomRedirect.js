"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { LANGS } from "../../i18n-meta.js";
import { allPhotos, photoPath } from "../../photo-ref.js";

export default function RandomRedirect() {
  const router = useRouter();
  const params = useParams();
  const lang = typeof params?.lang === "string" ? params.lang : "en";

  useEffect(() => {
    const langSafe = LANGS.includes(lang) ? lang : "en";
    /* 行き先は photo-ref.js の photoPath に任せる。
       写真詳細ページがあるのは PHOTO_LANGS の7言語だけで、以前はここで
       /{lang}/{pref}/{loc}/{id} を直に組み立てていたため、残り18言語では
       存在しないURLへ飛んで 404 になっていた。photoPath は その言語に
       詳細ページが無ければ 撮影地ページ + ?photo=ID (そこで拡大表示が開く) を返す。 */
    const paths = allPhotos().map((p) => photoPath(p.id, langSafe)).filter(Boolean);
    if (paths.length === 0) {
      router.replace(`/${langSafe}`);
      return;
    }
    router.replace(paths[Math.floor(Math.random() * paths.length)]);
  }, [lang, router]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#e8e4df",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-mincho),Georgia,serif",
      fontSize: 20,
    }}>
      …
    </div>
  );
}
