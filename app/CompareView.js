"use client";
/**
 * ③ 2枚比較。
 *
 * それぞれの写真の全体を確認できることを優先する。
 * 同じ撮影地点・同じ構図だと確認できていない2枚を、位置合わせした
 * ビフォーアフターとして重ねて見せることはしない (誤解を生むため)。
 * 横に並べる / 縦に並べる の切り替えだけを用意する。
 */
import { useCallback, useEffect, useState } from "react";
import { getLocName, getPrefName } from "./data.js";
import { photoPath, photoLabel } from "./photo-model.js";
import { PHOTO_DIMS } from "./photo-dims.js";
import PhotoImage from "./PhotoImage.js";
import { ui } from "./ui-strings.js";
import { track } from "./analytics.js";

export default function CompareView({ ids, lang, onClose, onRemove }) {
  const [side, setSide] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 820 ? "stack" : "row"
  );
  const [order, setOrder] = useState(ids);

  useEffect(() => { setOrder(ids); }, [ids]);

  /* 開いたら閉じるボタンへ移し、閉じたら元へ戻す (呼び出し側が復帰させる) */
  useEffect(() => {
    const prev = document.activeElement;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const body = document.body;
    const overflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      body.style.overflow = overflow;
      try { if (prev && prev.focus && document.contains(prev)) prev.focus(); } catch { /* 復帰できなくても閉じる */ }
    };
  }, [onClose]);

  const swap = useCallback(() => {
    setOrder((o) => [...o].reverse());
    track("compare_swap", {}, "swap");
  }, []);

  if (!order.length) return null;

  return (
    <div className="cmp" role="dialog" aria-modal="true" aria-label={ui("compare", lang)}>
      <div className="cmp-bar">
        <button type="button" className="pa-btn" onClick={onClose} aria-label={ui("close", lang)}>×</button>
        <button type="button" className="ex-chip" onClick={() => setSide((s) => (s === "row" ? "stack" : "row"))}>
          {side === "row" ? ui("stackView", lang) : ui("sideBySide", lang)}
        </button>
        {order.length === 2 && (
          <button type="button" className="ex-chip" onClick={swap}>{ui("swap", lang)}</button>
        )}
      </div>

      <div className={"cmp-body " + side}>
        {order.map((id) => {
          const dims = PHOTO_DIMS[id] || null;
          const href = photoPath(id, lang);
          return (
            <figure key={id} className="cmp-item">
              {/* 写真全体が見えるように contain で収める */}
              <PhotoImage
                id={id}
                alt={photoLabel(id, lang)}
                dims={dims}
                sizes={side === "row" ? "48vw" : "94vw"}
                widths="view"
                onContextMenu={(e) => e.preventDefault()}
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
              <figcaption className="cmp-cap">
                <span>{photoLabel(id, lang)}</span>
                {href && <a href={href}>{ui("photoPage", lang)}</a>}
                {onRemove && (
                  <button type="button" onClick={() => onRemove(id)} aria-label={ui("clearFilter", lang)}>×</button>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

export { getLocName, getPrefName };
