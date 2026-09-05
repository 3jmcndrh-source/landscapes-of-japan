"use client";
import { useState, useRef, useEffect, useId } from "react";
import { TR } from "./data.js";
import { ui } from "./ui-strings.js";

/**
 * ① 言語切替。常時25言語を並べていた LangBar の置き換え。
 *
 * - 閉じていても中身は初期HTMLに実 <a href> として存在する (hidden 属性で隠すだけ)。
 *   検索エンジン専用の隠しリンク集ではなく、開閉する通常のメニュー。
 * - 表示は各言語自身の表記 (TR[c].name)。国旗は使わない。
 * - hrefFor(code) が null を返した言語は、その言語に同じページが無いということなので
 *   呼び出し側が用意した代替ページ (撮影地など実在するURL) へ送る。404 を作らない。
 */
export default function LangMenu({ lang, hrefFor }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const listId = useId();
  const codes = Object.keys(TR);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const remember = (code) => { try { localStorage.setItem("lojLang", code); } catch {} };

  return (
    <div className="lm-wrap" ref={wrapRef}>
      <button
        ref={btnRef}
        type="button"
        className="lm-btn"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ui("language", lang)}
        onClick={() => setOpen((v) => !v)}
      >
        {TR[lang]?.name || lang}
        <span className="lm-caret" aria-hidden="true">▾</span>
      </button>
      {/* hidden で閉じる = リンクは常に初期HTMLにある */}
      <ul className="lm-list" id={listId} hidden={!open}>
        {codes.map((c) => (
          <li key={c}>
            <a
              href={hrefFor(c)}
              hrefLang={c}
              lang={c}
              className={"lm-item" + (c === lang ? " active" : "")}
              aria-current={c === lang ? "true" : undefined}
              onClick={() => remember(c)}
            >
              {TR[c].name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
