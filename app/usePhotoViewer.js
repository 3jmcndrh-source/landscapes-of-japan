"use client";
/**
 * 写真ビューア (Lightbox) を「写真IDの並び」だけで開けるようにする共通の入口。
 *
 * 以前は、拡大表示を持つ画面 (トップの行・撮影地・コレクション・探索) と、
 * 写真詳細ページへ移動するだけの画面 (色検索・お気に入り・最近見た写真・
 * 似た写真・今日の一枚) に分かれていて、同じ写真でも入口によって開き方が違った。
 * ここを通せば、どの画面からでも同じビューアが同じ操作で開く。
 *
 * 使い方:
 *   const viewer = usePhotoViewer(lang, { entry: "color" });
 *   <a href={href} data-pid={id} onClick={(e) => { if (!isPlainClick(e)) return; e.preventDefault(); viewer.open(ids, id, e.currentTarget); }}>
 *   {viewer.element}
 *
 * - リンクは <a href> のまま残す (クロールできる。修飾キー・中クリックはブラウザ既定)。
 * - 閉じるときは、いま表示している写真の data-pid を持つ要素へ戻る
 *   (ビューアの中で別の写真へ移っていても、その写真のサムネイルへ戻る)。
 * - 履歴・URL・戻るボタンの扱いは Lightbox 側にある。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lightbox from "./Lightbox.js";
import { cldUrl, lbWidth, getPrefName, getLocName } from "./data.js";
import { photoById, photoPath, hasPhotoPages } from "./photo-ref.js";
import { richAlt } from "./title-keywords.js";
import { animateToRect } from "./useViewTransition.js";
import { track } from "./analytics.js";

/** 修飾キーなしの左クリックか (それ以外はブラウザのリンク動作に任せる) */
export const isPlainClick = (e) =>
  !(e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey);

/** いま画面に見えている、その写真のサムネイルの矩形 (無ければ null) */
export function thumbRectOf(id) {
  if (!id || typeof document === "undefined") return null;
  let sel;
  try { sel = `[data-pid="${window.CSS && CSS.escape ? CSS.escape(id) : id}"]`; } catch { return null; }
  for (const el of document.querySelectorAll(sel)) {
    const target = el.tagName === "IMG" ? el : el.querySelector("img") || el;
    const r = target.getBoundingClientRect();
    if (r.width && r.height && r.bottom > 0 && r.top < window.innerHeight) return r;
  }
  return null;
}

/**
 * @param lang
 * @param opts.entry  計測用の流入元 (photo_open の entry)
 * @param opts.selfId この写真のページ自身から開いている場合の写真ID
 *                    (その写真には「写真ページ」リンクを出さない)
 */
export function usePhotoViewer(lang, { entry = "", selfId = null } = {}) {
  const [st, setSt] = useState(null);          // { ids, index }
  const [closing, setClosing] = useState(false);
  const [lbW, setLbW] = useState(2400);
  const originRef = useRef(null);
  const stRef = useRef(null);
  stRef.current = st;
  useEffect(() => { setLbW(lbWidth()); }, []);

  const ids = st ? st.ids : null;
  const photos = useMemo(
    () => (ids || []).map((id) => {
      const p = photoById(id);
      return { id, url: cldUrl(id, lbW), pref: p.pref, loc: p.loc || "", year: p.year || null };
    }),
    [ids, lbW]
  );

  /**
   * @param list  開く写真IDの並び (ビューア内で前後に送れる範囲)
   * @param id    最初に表示する写真
   * @param el    押されたサムネイルの要素 (そこから広がって見せる。省略可)
   * @param from  計測用の流入元を呼び出しごとに変えるとき
   */
  const open = useCallback((list, id, el, from) => {
    const alive = (list || []).filter((x) => photoById(x));   /* 削除済みの写真IDは開かない */
    const i = alive.indexOf(id);
    if (i < 0) return false;
    const img = el ? (el.tagName === "IMG" ? el : el.querySelector?.("img") || el) : null;
    originRef.current = img ? img.getBoundingClientRect() : null;
    setSt({ ids: alive, index: i });
    const e = from || entry;
    /* 実際に開く操作をしたときだけ送る */
    track("photo_open", { photo_id: id, entry: e }, id + "|" + e);
    return true;
  }, [entry]);

  const close = useCallback(() => {
    const s = stRef.current;
    const rect = s ? thumbRectOf(s.ids[s.index]) : null;
    setClosing(true);
    animateToRect(document.querySelector(".cin-lb-inner img"), rect, () => {
      setSt(null);
      setClosing(false);
    });
  }, []);

  const step = useCallback((d) => {
    setSt((s) => (s ? { ...s, index: (s.index + d + s.ids.length) % s.ids.length } : s));
  }, []);
  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  const element = st && photos[st.index] ? (
    <Lightbox
      photos={photos}
      index={st.index}
      closing={closing}
      lang={lang}
      onClose={close}
      onPrev={prev}
      onNext={next}
      originRect={originRef.current}
      labels={(p) => {
        const prefName = getPrefName(p.pref, lang);
        const locName = p.loc ? getLocName(p.loc, lang) : "";
        return { prefName, locName, alt: richAlt({ locName, prefName, year: p.year, locJp: p.loc, lang }) };
      }}
      /* 写真詳細ページは PHOTO_LANGS の言語にしかない。無い言語ではリンクを出さない */
      photoHref={(p) => (p.id !== selfId && hasPhotoPages(lang) ? photoPath(p.id, lang) : null)}
    />
  ) : null;

  return { open, element, isOpen: !!st };
}
