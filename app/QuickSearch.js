"use client";
import { useState, useEffect, useRef } from "react";
import { searchEntries, entryHref } from "./search-score.js";
import { useTrackSearch } from "./analytics.js";
import { ui } from "./ui-strings.js";

/**
 * ヘッダーの絞り込み検索。build時に作られる /search-index.json (撮影地・
 * 都道府県・テーマ) を初回オープン時に読み、search-score.js の共通判定で
 * 並べる。判定は検索ページと同一なので、同じ語で違う順位にならない。
 * data.js を読み込まないので、初期バンドルは増えない。
 */

const PLACEHOLDER = { ja: "撮影地を検索…", zh: "搜索拍摄地…", "zh-tw": "搜尋拍攝地…", ko: "촬영지 검색…" };

export default function QuickSearch({ lang, open, onClose }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(null);
  /* IME変換中は「まだ入力の途中」。検索の確定とみなさない */
  const [composing, setComposing] = useState(false);
  const inputRef = useRef(null);

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

  const needle = q.trim();
  /* 採点・並べ替えは検索ページと共通 (search-score.js)。
     完全一致 → 別名一致 → 前方一致 → 部分一致 の順で、
     「京都」が「東京都」への偶然の部分一致に埋もれない。 */
  const results = open && idx && needle.length >= 1
    ? searchEntries(idx.entries, needle, lang, { limit: 8, langs: idx.langs })
    : [];

  /* ⑨ 索引が読めていて、入力が落ち着いてから 1回だけ。検索語は送らない */
  useTrackSearch({ query: idx && open ? needle : "", count: results.length, composing, source: "quick" });

  if (!open) return null;

  const hrefFor = (e) => entryHref(e, lang);
  const badge = { loc: "📍", pref: "🗾", col: "✦" };

  return (
    <div className="qsearch-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true">
      <div className="qsearch-box">
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={() => setComposing(false)}
          placeholder={PLACEHOLDER[lang] || "Search photo spots…"}
          aria-label={ui("search", lang)}
          /* IME変換中の Enter は確定操作なので拾わない (isComposing) */
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent?.isComposing && results[0]) window.location.href = hrefFor(results[0]);
          }}
        />
        {results.length > 0 && (
          <ul className="qsearch-results">
            {results.map((e, i) => (
              <li key={`${e.t}-${e.p || ""}-${e.l || e.s || ""}`}>
                <a href={hrefFor(e)} className={i === 0 ? "first" : undefined}>
                  <span className="qs-badge">{badge[e.t]}</span>
                  <span className="qs-name">{e.name}</span>
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
