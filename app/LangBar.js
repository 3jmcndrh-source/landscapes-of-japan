"use client";
import { useEffect, useRef } from "react";
import { TR } from "./data.js";

/**
 * I-4: shared language bar.
 * - auto-centers the active language inside the horizontal scroller, so
 *   on a phone you never hunt for where you are among 25 entries
 * - remembers the chosen language in localStorage (PageClient reads it on
 *   the home page to offer "continue in X?" on return visits)
 */
export default function LangBar({ lang, hrefFor }) {
  const ref = useRef(null);

  useEffect(() => {
    const bar = ref.current;
    const act = bar?.querySelector(".top-lang-btn.active");
    if (bar && act) {
      const target = act.offsetLeft - (bar.clientWidth - act.offsetWidth) / 2;
      bar.scrollLeft = Math.max(0, target);
    }
  }, [lang]);

  const remember = (code) => {
    try { localStorage.setItem("lojLang", code); } catch {}
  };

  return (
    <div className="top-langs" ref={ref}>
      {Object.keys(TR).map((c) => (
        <a
          key={c}
          href={hrefFor(c)}
          onClick={() => remember(c)}
          className={"top-lang-btn" + (lang === c ? " active" : "")}
        >
          {TR[c].name}
        </a>
      ))}
    </div>
  );
}
