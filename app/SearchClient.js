"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { buildEntries, searchEntries, entryHref } from "./search-core.js";
import { ui } from "./ui-strings.js";
import { LANGS } from "./i18n-meta.js";
import { useTrackSearch } from "./analytics.js";
import SiteHeader from "./SiteHeader.js";

/**
 * ① 検索ページ。判定・並べ替えは search-score.js、索引は search-core.js で、
 * ヘッダーの QuickSearch と共通。同じ語に対して両者の順位が食い違わない。
 * 種別ごとの見出しで区切ると順位が壊れるので、1本の順位つき一覧にする。
 */
function SearchInner({ lang }) {
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") || "");
  /* IME変換中は入力の途中。検索の確定として数えない */
  const [composing, setComposing] = useState(false);

  const index = useMemo(() => buildEntries(), []);
  const results = useMemo(
    () => searchEntries(index, q, lang, { limit: 60, langs: LANGS }),
    [q, index, lang]
  );


  /* ⑨ 入力が落ち着いてから 1回だけ。検索語そのものは送らない */
  useTrackSearch({ query: q, count: results.length, composing, source: "page" });

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px 80px" }}>
      <h1 style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: "clamp(36px,5vw,56px)", margin: 0, color: "#f2ece2", lineHeight: 1, marginBottom: 24 }}>
        {ui("search", lang)}
      </h1>

      <label className="sr-only" htmlFor="site-search-input">{ui("search", lang)}</label>
      <input
        id="site-search-input"
        type="search"
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onCompositionStart={() => setComposing(true)}
        onCompositionEnd={() => setComposing(false)}
        placeholder={ui("findPhotos", lang)}
        style={{ width: "100%", padding: "14px 18px", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 16, background: "rgba(255,255,255,.05)", border: "1px solid rgba(220,190,100,.3)", borderRadius: 8, color: "#f2ece2", outline: "none" }}
      />

      {q.trim() && (
        <div style={{ marginTop: 16, fontSize: 13, color: "rgba(232,228,223,.55)" }} aria-live="polite">
          {results.length}
        </div>
      )}

      {q.trim() && results.length === 0 && (
        <p style={{ marginTop: 32, fontSize: 15, color: "rgba(232,228,223,.6)" }}>{ui("noResults", lang)}</p>
      )}

      {results.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: "32px 0 0" }}>
          {results.map((r) => (
            <li key={`${r.t}-${r.p || ""}-${r.l || r.s || ""}`} style={{ borderBottom: "1px solid rgba(220,190,100,.08)" }}>
              <a href={entryHref(r, lang)} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", color: "#e8e4df", textDecoration: "none" }}>
                <span aria-hidden="true" style={{ opacity: .8, fontSize: 13 }}>
                  {r.t === "loc" ? "📍" : r.t === "pref" ? "🗾" : "✦"}
                </span>
                <span style={{ flex: 1, minWidth: 0, fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 15, color: "#f2ece2", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {r.name}
                </span>
                {r.c ? <small style={{ color: "rgba(232,212,148,.7)", fontSize: 11 }}>{r.c}</small> : null}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default function SearchClient({ lang }) {
  return (
    <div style={{ background: "#0a0a0a", color: "#e8e4df", minHeight: "100vh", fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
      <SiteHeader lang={lang} langHrefFor={(c) => `/${c}/search`} />
      <Suspense fallback={<div style={{ minHeight: "calc(100vh - 80px)" }} />}>
        <SearchInner lang={lang} />
      </Suspense>
    </div>
  );
}
