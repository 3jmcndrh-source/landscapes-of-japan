"use client";
import { useState, useEffect, useRef } from "react";
import { LANGS } from "./i18n-meta.js";

/**
 * P5: instant quick-jump search. Fetches the build-generated
 * /search-index.json (105 entries: locs + prefs + collections, each with
 * names in all 25 languages) on first open and substring-matches the query
 * against every language simultaneously — "富士" / "fuji" / "후지" all hit.
 * Zero dependencies; Enter jumps to the top hit.
 */

const PLACEHOLDER = { ja: "撮影地を検索…", zh: "搜索拍摄地…", "zh-tw": "搜尋拍攝地…", ko: "촬영지 검색…" };

export default function QuickSearch({ lang, open, onClose }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(null);
  const inputRef = useRef(null);
  const langPos = Math.max(0, LANGS.indexOf(lang));

  useEffect(() => {
    if (!open) return;
    setQ("");
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    if (!idx) {
      fetch("/search-index.json").then((r) => r.json()).then(setIdx).catch(() => {});
    }
    return () => clearTimeout(t);
  }, [open, idx]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const needle = q.trim().toLowerCase();
  let results = [];
  if (idx && needle.length >= 1) {
    const w = { loc: 0, pref: 1, col: 2 };
    for (const e of idx.entries) {
      if (e.n.some((name) => String(name).toLowerCase().includes(needle))) {
        results.push(e);
        if (results.length >= 40) break;
      }
    }
    results.sort((a, b) => (w[a.t] - w[b.t]) || ((b.c || 0) - (a.c || 0)));
    results = results.slice(0, 8);
  }

  const hrefFor = (e) =>
    e.t === "loc" ? `/${lang}/${e.p}/${e.l}` :
    e.t === "pref" ? `/${lang}/${e.p}` :
    `/${lang}/collections/${e.s}`;
  const nameFor = (e) => e.n[langPos] || e.n[1] || e.n[0];
  const badge = { loc: "📍", pref: "🗾", col: "✦" };

  return (
    <div className="qsearch-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true">
      <div className="qsearch-box">
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={PLACEHOLDER[lang] || "Search photo spots…"}
          aria-label="Search"
          onKeyDown={(e) => { if (e.key === "Enter" && results[0]) window.location.href = hrefFor(results[0]); }}
        />
        {results.length > 0 && (
          <ul className="qsearch-results">
            {results.map((e, i) => (
              <li key={`${e.t}-${e.p || ""}-${e.l || e.s || ""}`}>
                <a href={hrefFor(e)} className={i === 0 ? "first" : undefined}>
                  <span className="qs-badge">{badge[e.t]}</span>
                  <span className="qs-name">{nameFor(e)}</span>
                  {e.c ? <small>{e.c}</small> : null}
                </a>
              </li>
            ))}
          </ul>
        )}
        {idx && needle.length >= 1 && results.length === 0 && (
          <div className="qsearch-empty">— {lang === "ja" ? "見つかりません" : "no matches"} —</div>
        )}
      </div>
    </div>
  );
}
