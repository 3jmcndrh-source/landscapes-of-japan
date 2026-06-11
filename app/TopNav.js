"use client";
import { useState, useEffect } from "react";

const labels = {
  ja: { blog: "ブログ", collections: "コレクション", search: "検索", random: "ランダム" },
  zh: { blog: "博客", collections: "合集", search: "搜索", random: "随机" },
  "zh-tw": { blog: "部落格", collections: "合集", search: "搜尋", random: "隨機" },
  ko: { blog: "블로그", collections: "컬렉션", search: "검색", random: "랜덤" },
};
const fallback = { blog: "Blog", collections: "Collections", search: "Search", random: "Random" };
function lab(lang, key) {
  return (labels[lang] || fallback)[key] || fallback[key];
}

export default function TopNav({ lang, t, scrollToMap, scrollToContact }) {
  const isHome = !!scrollToMap;
  const mapHref = `/${lang}#map`;
  const contactHref = `/${lang}#contact`;

  /* I-6: back-to-top FAB after 800px of scroll (every page using TopNav) */
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 800);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
    {showTop && (
      <button
        className="back-top-fab"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >↑</button>
    )}
    <div className="top-nav">
      {isHome ? (
        <button className="top-nav-link" onClick={scrollToMap}>{t.nav.map}</button>
      ) : (
        <a className="top-nav-link" href={mapHref}>{t.nav.map}</a>
      )}
      <a className="top-nav-link" href={`/${lang}/blog`}>{lab(lang, "blog")}</a>
      <a className="top-nav-link" href={`/${lang}/collections`}>{lab(lang, "collections")}</a>
      <a className="top-nav-link" href={`/${lang}/random`} rel="nofollow">🎲 {lab(lang, "random")}</a>
      <a className="top-nav-link" href={`/${lang}/search`}>{lab(lang, "search")}</a>
      {isHome ? (
        <button className="top-nav-link" onClick={scrollToContact}>{t.contact.title}</button>
      ) : (
        <a className="top-nav-link" href={contactHref}>{t.contact.title}</a>
      )}
    </div>
    </>
  );
}
