"use client";
import { useState, useEffect, useRef } from "react";
import { searchEntries, entryHref } from "./search-score.js";
import { useTrackSearch } from "./analytics.js";
import { ui } from "./ui-strings.js";

/**
 * ヘッダーの検索。入口はこれ1本にする。
 *
 * 引けるもの:
 *   1. 撮影地・都道府県・テーマ … build時に作られる /search-index.json (約120件)
 *   2. 見た目の言葉 (霧・夕焼け・星空 など) … app/concepts.js の概念語。
 *      選ぶと /explore?concept=… へ送り、画像の特徴で写真を並べる。
 *
 * 以前は 1 だけが対象で、「霧」「夕焼け」は「見つかりません」になっていた。
 * 同じ言葉が /explore の「見た目から」では写真を返していたので、検索が2本に
 * 分かれている状態だった。
 *
 * 判定は検索ページと同じ search-score.js、概念語は /explore と同じ concept-search.js。
 * 同じ語で画面ごとに違う結果にならない。
 * 入力した言葉そのものは URL に載せない。載るのは選ばれた概念キーだけ
 * (/explore の方針と同じ)。
 * 概念語の表 (約12KB) は検索を開いたときに読み込む。初期バンドルは増えない。
 */

const PLACEHOLDER = { ja: "地名・テーマ・見た目 (霧、夕焼け…)", zh: "搜索拍摄地…", "zh-tw": "搜尋拍攝地…", ko: "촬영지 검색…" };

export default function QuickSearch({ lang, open, onClose }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(null);
  const [cs, setCs] = useState(null);   // { matchConcepts, conceptLabel }
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
    if (!cs) {
      Promise.all([import("./concept-search.js"), import("./concepts.js")])
        .then(([a, b]) => setCs({ matchConcepts: a.matchConcepts, conceptLabel: b.conceptLabel }))
        .catch(() => {});   /* 読めなければ地名検索だけで動く */
    }
    return () => clearTimeout(t);
  }, [open, idx, cs]);

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
  const places = open && idx && needle.length >= 1
    ? searchEntries(idx.entries, needle, lang, { limit: 8, langs: idx.langs })
    : [];

  /* 見た目の言葉。2語とも当たれば「両方に合う写真」(conceptAll)、1語ならその概念。
     /explore の入力欄と同じ決め方にしてある */
  const hits = open && cs && needle.length >= 1 ? cs.matchConcepts(needle, lang) : [];
  const looks = [];
  if (hits.length >= 2 && hits[0].how !== "part" && hits[1].how !== "part") {
    const keys = hits.slice(0, 2).map((h) => h.key);
    looks.push({
      key: keys.join("+"),
      name: keys.map((k) => cs.conceptLabel(k, lang)).join(" × "),
      href: `/${lang}/explore?conceptAll=${keys.join(",")}`,
      exact: false,
    });
  }
  for (const h of hits) {
    looks.push({
      key: h.key,
      name: cs.conceptLabel(h.key, lang),
      href: `/${lang}/explore?concept=${h.key}`,
      exact: h.how === "exact",
    });
  }

  /* 並び: 言葉そのものが概念名と一致したら見た目を先に、そうでなければ地名を先に */
  const lookFirst = looks.some((l) => l.exact) || places.length === 0;
  const rows = [
    ...(lookFirst ? looks : []).map((l) => ({ type: "look", ...l })),
    ...places.map((e) => ({ type: "place", key: `${e.t}-${e.p || ""}-${e.l || e.s || ""}`, name: e.name, href: entryHref(e, lang), badge: e.t, count: e.c })),
    ...(lookFirst ? [] : looks).map((l) => ({ type: "look", ...l })),
  ];

  /* ⑨ 索引が読めていて、入力が落ち着いてから 1回だけ。検索語は送らない */
  useTrackSearch({ query: idx && open ? needle : "", count: rows.length, composing, source: "quick" });

  if (!open) return null;

  const badge = { loc: "📍", pref: "🗾", col: "✦" };
  const ready = idx && cs;

  return (
    <div className="qsearch-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true">
      <div className="qsearch-box">
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={() => setComposing(false)}
          placeholder={PLACEHOLDER[lang] || "Places, themes, looks (mist, sunset…)"}
          aria-label={ui("search", lang)}
          enterKeyHint="search"
          autoComplete="off"
          /* IME変換中の Enter は確定操作なので拾わない (isComposing) */
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent?.isComposing && rows[0]) window.location.href = rows[0].href;
          }}
        />
        {rows.length > 0 && (
          <ul className="qsearch-results">
            {rows.map((r, i) => (
              <li key={r.type + r.key}>
                <a href={r.href} className={i === 0 ? "first" : undefined}>
                  <span className="qs-badge" aria-hidden="true">{r.type === "look" ? "◐" : badge[r.badge]}</span>
                  <span className="qs-name">{r.name}</span>
                  {r.type === "look" ? <small>{ui("byLook", lang)}</small> : r.count ? <small>{r.count}</small> : null}
                </a>
              </li>
            ))}
          </ul>
        )}
        {/* 何も当たらないときも行き止まりにしない。条件を組み合わせて探せる画面へ送る */}
        {ready && needle.length >= 1 && rows.length === 0 && (
          <div className="qsearch-empty">
            <span>{ui("noResults", lang)}</span>
            <a href={`/${lang}/explore`}>{ui("explorePhotos", lang)} →</a>
          </div>
        )}
      </div>
    </div>
  );
}
