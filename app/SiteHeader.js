"use client";
import { useState, useEffect, useRef } from "react";
import LangMenu from "./LangMenu.js";
import QuickSearch from "./QuickSearch.js";
import { ui } from "./ui-strings.js";

/**
 * ① 細い上部バー。右側の固定縦メニュー + 常時25言語バーをここへ統合した。
 *
 * 移設元 → 移設先
 *   右固定メニュー「撮影地」   → Explore (トップの探索エリアへのリンク)
 *   右固定メニュー「コレクション」→ Collections (従来どおり別ページ)
 *   右固定メニュー「ランダム」  → Explore 内 (トップ) / モバイルメニュー
 *   右固定メニュー「検索」     → 上部バーの検索ボタン (QuickSearch、"/" キーも従来どおり)
 *   右固定メニュー「お問い合わせ」→ モバイルメニュー内 + フッター
 *   常時25言語バー           → 言語メニュー (LangMenu)
 *
 * 移動はリンク、開閉はボタン。ホバーだけに依存する操作は無い。
 */
/**
 * langHrefFor: 関数 (クライアントから) または "/{lang}/collections" のようなテンプレート文字列
 * (サーバーコンポーネントからは関数を渡せないため)。{lang} を言語コードに差し替える。
 */
export default function SiteHeader({ lang, langHrefFor, langHrefTemplate, exploreHref, onExplore }) {
  const hrefFor =
    typeof langHrefFor === "function"
      ? langHrefFor
      : (c) => (langHrefTemplate || "/{lang}").replace("{lang}", c);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const panelRef = useRef(null);

  /* 従来どおり "/" で検索を開く */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target?.tagName || "")) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* モバイルメニュー: Escape で閉じ、フォーカスを起点のボタンへ戻す */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") { setMenuOpen(false); menuBtnRef.current?.focus(); }
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll("a[href],button:not([disabled])");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("a[href],button")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const home = `/${lang}`;
  const explore = exploreHref || `${home}#explore`;
  const onExploreClick = (e) => {
    if (onExplore) { e.preventDefault(); onExplore(); }
  };

  return (
    <>
      <header className="sh" role="banner">
        <a className="sh-brand" href={home}>Landscapes of Japan</a>

        <nav className="sh-nav" aria-label={ui("menu", lang)}>
          <a className="sh-link" href={explore} onClick={onExploreClick}>{ui("explore", lang)}</a>
          <a className="sh-link" href={`${home}/collections`}>{ui("collections", lang)}</a>
          <button type="button" className="sh-link sh-btn" onClick={() => setSearchOpen(true)}>
            {ui("search", lang)}
          </button>
          <LangMenu lang={lang} hrefFor={hrefFor} />
        </nav>

        {/* モバイル: 検索とメニューだけ出す */}
        <div className="sh-mobile">
          <button type="button" className="sh-icon" onClick={() => setSearchOpen(true)} aria-label={ui("search", lang)}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
            </svg>
          </button>
          <button
            ref={menuBtnRef}
            type="button"
            className="sh-icon"
            aria-expanded={menuOpen}
            aria-controls="sh-panel"
            aria-label={ui("menu", lang)}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      {/* モバイルメニュー。言語一覧はこの中でさらに開閉する (縦長にしない) */}
      <div id="sh-panel" className={"sh-panel" + (menuOpen ? " open" : "")} hidden={!menuOpen} ref={panelRef}>
        <div className="sh-panel-head">
          <span className="sh-panel-title">{ui("menu", lang)}</span>
          <button type="button" className="sh-icon" onClick={() => { setMenuOpen(false); menuBtnRef.current?.focus(); }} aria-label={ui("close", lang)}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <a className="sh-panel-link" href={explore} onClick={(e) => { setMenuOpen(false); onExploreClick(e); }}>{ui("explore", lang)}</a>
        <a className="sh-panel-link" href={`${home}/collections`}>{ui("collections", lang)}</a>
        <a className="sh-panel-link" href={`${home}#contact`} onClick={() => setMenuOpen(false)}>{ui("contact", lang)}</a>
        <div className="sh-panel-lang">
          <LangMenu lang={lang} hrefFor={hrefFor} />
        </div>
      </div>

      <QuickSearch lang={lang} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
