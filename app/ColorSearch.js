"use client";
import { useState, useMemo, useRef, useLayoutEffect } from "react";
import { PHOTO_PALETTE, PALETTE_COLORS } from "./photo-palette.js";
import { getUrl, getPrefName, getLocName } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { photoLang, PHOTO_LANGS } from "./i18n-meta.js";
import { ui, colorLabel } from "./ui-strings.js";
import { richAlt } from "./title-keywords.js";
import { flipGrid, captureGridRects } from "./useViewTransition.js";

/**
 * ⑤ 色で写真を探す。
 *
 * 判定は app/photo-palette.js (実画像のピクセルから生成) の占有率のみを使う。
 * 写真名・地名・被写体タグからの推測は一切しない。
 * 言語に依存しないデータを 25言語で共有し、同じ写真を言語別に重複表示しない
 * (対象は写真ID単位。カードのリンク先だけ言語ごとに解決する)。
 */
const SWATCH = {
  red: "#c0392b", orange: "#d97a28", yellow: "#d8b62c", green: "#3f8f4a",
  blue: "#2f6fb0", purple: "#7a5aa8", pink: "#c96b93", brown: "#7a5334",
  white: "#efeae2", gray: "#8d8d8d", black: "#1a1a1a",
};
const MIN_SHARE = 0.08;   // この色が写真の8%未満なら「その色の写真」とはみなさない

export default function ColorSearch({ lang, photos }) {
  const [active, setActive] = useState(null);
  /* 絞り込みの前後で写真の位置を比べ、残った写真は移動・新規はフェードで見せる。
     鍵は写真ID なので、別の写真が同じカードとして変形することはない。 */
  const gridRef = useRef(null);
  const prevRects = useRef(new Map());
  const pickColor = (c) => {
    prevRects.current = captureGridRects(gridRef.current);
    setActive(c);
  };
  useLayoutEffect(() => {
    if (prevRects.current.size || active) flipGrid(gridRef.current, prevRects.current);
  }, [active]);

  /* 選択色の占有率で降順。同率は元の並び (撮影日降順) を保つ */
  const results = useMemo(() => {
    if (!active) return [];
    return photos
      .map((p) => ({ p, share: PHOTO_PALETTE[p.id]?.b?.[active] || 0 }))
      .filter((x) => x.share >= MIN_SHARE)
      .sort((a, b) => b.share - a.share)
      .map((x) => x.p);
  }, [active, photos]);

  /* 未解析 = パレットに存在しない写真。件数として正直に出す */
  const unanalysed = useMemo(() => photos.filter((p) => !PHOTO_PALETTE[p.id]).length, [photos]);

  const hasPhotoPages = PHOTO_LANGS.includes(lang);

  return (
    <div className="cs">
      <div className="cs-swatches" role="group" aria-label={ui("byColor", lang)}>
        {PALETTE_COLORS.map((c) => {
          const on = active === c;
          return (
            <button
              key={c}
              type="button"
              className={"cs-sw" + (on ? " on" : "")}
              aria-pressed={on}
              onClick={() => pickColor(on ? null : c)}
            >
              <span className="cs-dot" style={{ background: SWATCH[c] }} aria-hidden="true" />
              <span className="cs-name">{colorLabel(c, lang)}</span>
            </button>
          );
        })}
      </div>

      {active && (
        <div className="cs-bar">
          <span className="cs-count">
            {colorLabel(active, lang)} · {results.length}
          </span>
          <button type="button" className="cs-clear" onClick={() => pickColor(null)}>
            {ui("clearColor", lang)}
          </button>
        </div>
      )}

      {active && results.length === 0 && (
        <p className="cs-empty">{ui("noResults", lang)}</p>
      )}

      {active && results.length > 0 && (
        <div className="cs-grid" ref={gridRef}>
          {results.map((p) => {
            const prefSlug = PREF_SLUGS[p.pref];
            const locSlug = p.loc ? LOC_SLUGS[p.loc] : null;
            const href = hasPhotoPages && prefSlug && locSlug ? `/${lang}/${prefSlug}/${locSlug}/${p.id}` : null;
            const locName = p.loc ? getLocName(p.loc, lang) : "";
            const alt = richAlt({ locName, prefName: getPrefName(p.pref, lang), year: p.year, locJp: p.loc, lang });
            const card = (
              <>
                <img
                  src={getUrl(p, 600)}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  width="600"
                  height="400"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {locName && <span className="cs-loc">{locName}</span>}
              </>
            );
            /* 右クリック抑止は既存カードと同じ対象・範囲で維持する */
            return href ? (
              <a key={p.id} data-pid={p.id} className="cin-hcard cs-card" href={href} onContextMenu={(e) => e.preventDefault()}>
                {card}
              </a>
            ) : (
              <div key={p.id} data-pid={p.id} className="cin-hcard cs-card" onContextMenu={(e) => e.preventDefault()}>
                {card}
              </div>
            );
          })}
        </div>
      )}

      {unanalysed > 0 && active && (
        <p className="cs-note">{unanalysed} / {photos.length}</p>
      )}
    </div>
  );
}
