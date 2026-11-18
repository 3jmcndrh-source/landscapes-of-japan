"use client";
/**
 * ③ 2枚比較。
 *
 * それぞれの写真の全体を確認できることを優先する。
 * 同じ撮影地点・同じ構図だと確認できていない2枚を、位置合わせした
 * ビフォーアフターとして重ねて見せることはしない (誤解を生むため)。
 * 横に並べる / 縦に並べる の切り替えだけを用意する。
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const dialogRef = useRef(null);

  useEffect(() => { setOrder(ids); }, [ids]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const prev = document.activeElement;
    dialog.showModal();
    const body = document.body;
    const overflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      dialog.close();
      body.style.overflow = overflow;
      if (prev instanceof HTMLElement && prev.isConnected) prev.focus({ preventScroll: true });
    };
  }, []);

  const onDialogKey = (event) => {
    event.stopPropagation();
    if (event.key !== "Tab") return;
    const controls = event.currentTarget.querySelectorAll("button:not([disabled]), a[href]");
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const swap = useCallback(() => {
    setOrder((o) => [...o].reverse());
    track("compare_swap", {}, "swap");
  }, []);

  if (!order.length) return null;

  return (
    <dialog ref={dialogRef} className="cmp" aria-label={ui("compare", lang)}
      onKeyDown={onDialogKey} onCancel={(event) => { event.preventDefault(); onClose(); }}>
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
    </dialog>
  );
}

export { getLocName, getPrefName };
