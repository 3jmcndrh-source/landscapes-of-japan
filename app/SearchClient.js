"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TR, PREFECTURES, PREF_I18N, LOC_I18N, getPrefName, getLocName, cldUrl } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { COLLECTIONS, COLLECTION_SLUGS, getCollectionName, getCollectionDesc } from "./collections.js";
import { TAGS, TAG_SLUGS, getTagName, getTagDesc } from "./tags.js";
import { POSTS, getPostTitle, getPostExcerpt } from "./content/blog/posts.js";
import TopNav from "./TopNav.js";

function normalize(s) { return String(s || "").toLowerCase(); }

function buildIndex(lang) {
  const items = [];

  // Prefectures
  for (const pref of Object.keys(PREF_I18N)) {
    const slug = PREF_SLUGS[pref];
    if (!slug) continue;
    const names = Object.values(PREF_I18N[pref] || {});
    items.push({
      type: "prefecture",
      url: `/${lang}/${slug}`,
      title: getPrefName(pref, lang),
      subtitle: lang === "ja" ? "都道府県" : "Prefecture",
      searchText: [pref, ...names].map(normalize).join(" "),
    });
  }

  // Locations + 写真用エントリ
  for (const pf of PREFECTURES) {
    const prefSlug = PREF_SLUGS[pf.pref];
    if (!prefSlug) continue;
    const seenLocs = new Set();
    for (const photo of pf.photos) {
      if (!photo.loc) continue;
      const locSlug = LOC_SLUGS[photo.loc];
      if (!locSlug) continue;
      if (!seenLocs.has(photo.loc)) {
        seenLocs.add(photo.loc);
        const locNames = Object.values(LOC_I18N[photo.loc] || {});
        items.push({
          type: "location",
          url: `/${lang}/${prefSlug}/${locSlug}`,
          title: getLocName(photo.loc, lang),
          subtitle: getPrefName(pf.pref, lang),
          searchText: [photo.loc, ...locNames, pf.pref].map(normalize).join(" "),
        });
      }
    }
  }

  // Collections
  for (const slug of COLLECTION_SLUGS) {
    const c = COLLECTIONS[slug];
    const names = Object.values(c.name || {});
    items.push({
      type: "collection",
      url: `/${lang}/collections/${slug}`,
      title: getCollectionName(slug, lang),
      subtitle: lang === "ja" ? "コレクション" : "Collection",
      searchText: [slug, ...names].map(normalize).join(" "),
    });
  }

  // Tags
  for (const slug of TAG_SLUGS) {
    const t = TAGS[slug];
    const names = Object.values(t.name || {});
    items.push({
      type: "tag",
      url: `/${lang}/tags/${slug}`,
      title: getTagName(slug, lang),
      subtitle: lang === "ja" ? "タグ" : "Tag",
      searchText: [slug, ...names].map(normalize).join(" "),
    });
  }

  // Blog posts
  for (const post of POSTS) {
    const titles = Object.values(post.title || {});
    const excerpts = Object.values(post.excerpt || {});
    items.push({
      type: "post",
      url: `/${lang}/blog/${post.slug}`,
      title: getPostTitle(post, lang),
      subtitle: lang === "ja" ? "ブログ記事" : "Blog post",
      hero: post.hero,
      searchText: [post.slug, ...titles, ...excerpts].map(normalize).join(" "),
    });
  }

  return items;
}

function SearchInner({ lang }) {
  const sp = useSearchParams();
  const initialQ = sp.get("q") || "";
  const [q, setQ] = useState(initialQ);
  const t = TR[lang] || TR.en;

  const index = useMemo(() => buildIndex(lang), [lang]);

  const results = useMemo(() => {
    const query = normalize(q.trim());
    if (!query) return [];
    return index.filter((it) => it.searchText.includes(query)).slice(0, 80);
  }, [q, index]);

  // Group by type
  const grouped = useMemo(() => {
    const g = { post: [], collection: [], tag: [], prefecture: [], location: [] };
    for (const r of results) (g[r.type] || []).push(r);
    return g;
  }, [results]);

  const sectionLabels = {
    post: { ja: "ブログ記事", en: "Blog Posts" },
    collection: { ja: "コレクション", en: "Collections" },
    tag: { ja: "タグ", en: "Tags" },
    prefecture: { ja: "都道府県", en: "Prefectures" },
    location: { ja: "撮影地", en: "Locations" },
  };
  const searchLabel = lang === "ja" ? "検索" : lang === "zh" ? "搜索" : lang === "zh-tw" ? "搜尋" : lang === "ko" ? "검색" : "Search";
  const placeholderLabel = lang === "ja" ? "撮影地、記事、タグを検索" : "Search locations, posts, tags…";

  return (
    <>
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px 80px" }}>
        <h1 style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: "clamp(36px,5vw,56px)", margin: 0, color: "#f2ece2", lineHeight: 1, marginBottom: 24 }}>
          {searchLabel}
        </h1>

        <input
          type="search"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholderLabel}
          style={{ width: "100%", padding: "14px 18px", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 16, background: "rgba(255,255,255,.05)", border: "1px solid rgba(220,190,100,.3)", borderRadius: 8, color: "#f2ece2", outline: "none" }}
        />

        {q.trim() && (
          <div style={{ marginTop: 16, fontSize: 13, color: "rgba(232,228,223,.55)" }}>
            {results.length} {lang === "ja" ? "件" : "results"}
          </div>
        )}

        {!q.trim() && (
          <p style={{ marginTop: 32, fontSize: 15, color: "rgba(232,228,223,.6)", lineHeight: 1.7 }}>
            {lang === "ja"
              ? "撮影地名（日本語または各国言語）、ブログ記事、コレクション、タグを検索できます。例: 富士山、桜、kyoto、cherry blossoms"
              : "Search across locations (in any of 20 languages), blog posts, collections, and tags. e.g. Fuji, sakura, kyoto, cherry blossoms"}
          </p>
        )}

        {q.trim() && results.length === 0 && (
          <p style={{ marginTop: 32, fontSize: 15, color: "rgba(232,228,223,.6)" }}>
            {lang === "ja" ? "該当する結果がありません。" : "No results found."}
          </p>
        )}

        {Object.entries(grouped).map(([type, items]) => items.length > 0 && (
          <section key={type} style={{ marginTop: 48 }}>
            <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 12, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(220,190,100,.65)", marginBottom: 16 }}>
              {sectionLabels[type]?.[lang] || sectionLabels[type]?.en || type} ({items.length})
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {items.map((r) => (
                <li key={r.url} style={{ borderBottom: "1px solid rgba(220,190,100,.08)" }}>
                  <a href={r.url} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", color: "#e8e4df", textDecoration: "none" }}>
                    {r.hero && (
                      <img src={cldUrl(r.hero, 200)} alt="" style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} loading="lazy" />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 15, color: "#f2ece2", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {r.title}
                      </div>
                      <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 12, color: "rgba(232,228,223,.5)" }}>
                        {r.subtitle}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </>
  );
}

export default function SearchClient({ lang }) {
  const t = TR[lang] || TR.en;
  return (
    <div style={{ background: "#0a0a0a", color: "#e8e4df", minHeight: "100vh", fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
      <div className="top-bar scrolled">
        <div className="top-langs">
          {Object.entries(TR).map(([c]) => (
            <a key={c} href={`/${c}/search`} className={"top-lang-btn" + (lang === c ? " active" : "")}>
              {TR[c].name}
            </a>
          ))}
        </div>
      </div>
      <TopNav lang={lang} t={t} />
      <Suspense fallback={<div style={{ minHeight: "calc(100vh - 80px)" }} />}>
        <SearchInner lang={lang} />
      </Suspense>
    </div>
  );
}
