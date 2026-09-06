"use client";
/**
 * ③④⑦ 写真1枚に対する操作 — お気に入り / 共有 / この写真について問い合わせる。
 * Lightbox と 写真詳細ページ の両方でこの1つを使う (画面ごとに別実装を作らない)。
 *
 * - 表示は控えめなアイコンだけ。画面上の文字は増やさない。
 *   操作名は 25言語の ui-strings.js から aria-label として与える (⑧)。
 * - 共有するのは「そのページのURL」。画像ファイルは配らない。
 *   写真詳細ページが無い言語では、撮影地ページ + ?photo=ID を共有する。
 * - Lightbox で次の写真へ移ったあとは、いま表示している写真が対象になる
 *   (photoId が変わればこのコンポーネントの状態も追従する)。
 * - 問い合わせは「押しただけでは送信しない」。既存の問い合わせフォームへ
 *   写真を指定して移動するだけで、送信はフォーム側の操作で行う。
 */
import { useCallback, useEffect, useState } from "react";
import { ui } from "./ui-strings.js";
import { photoUrl, photoById } from "./photo-ref.js";
import { isFavorite, toggleFavorite } from "./local-store.js";
import { track } from "./analytics.js";

export default function PhotoActions({ photoId, lang, entry = "", className = "" }) {
  const [fav, setFav] = useState(false);
  const [note, setNote] = useState("");     // 状態変化の短い読み上げ (aria-live)

  /* 保存状態はブラウザにしか無いので、描画後に読む。
     初期HTMLと食い違わないよう、最初は必ず「未登録」で描く (ハイドレーション対策)。 */
  useEffect(() => { setFav(isFavorite(photoId)); setNote(""); }, [photoId]);

  const onFav = useCallback((e) => {
    e.preventDefault(); e.stopPropagation();
    const { ok, on } = toggleFavorite(photoId);
    if (!ok) return;                         // 保存できない環境では状態を偽らない
    setFav(on);
    /* 状態は aria-pressed の変化として支援技術に伝わる。
       ここで操作名を読み上げると「追加」「削除」が逆に聞こえるので、
       お気に入りでは別途の読み上げを足さない。 */
    track(on ? "favorite_add" : "favorite_remove", { photo_id: photoId }, photoId);
  }, [photoId, lang]);

  const onShare = useCallback(async (e) => {
    e.preventDefault(); e.stopPropagation();
    const url = photoUrl(photoId, lang);
    if (!url) return;
    const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
    track("photo_share", { photo_id: photoId, method: canShare ? "share" : "copy" }, photoId);
    if (canShare) {
      try {
        await navigator.share({ url });
        track("photo_share_done", { photo_id: photoId, method: "share" }, photoId);
      } catch {
        /* 共有シートのキャンセルは成功ではない。何も表示しない */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setNote(ui("linkCopied", lang));
      track("photo_share_done", { photo_id: photoId, method: "copy" }, photoId);
    } catch {
      setNote(ui("copyFailed", lang));       // コピーできていないのに「コピーしました」とは出さない
    }
  }, [photoId, lang]);

  if (!photoById(photoId)) return null;      // 削除済みIDでは操作を出さない

  /* ⑦ 既存の問い合わせフォーム (トップページの #contact) へ写真を指定して移動する。
     写真は data.js の写真IDから引き直すので、外部から渡されたURLやHTMLは使わない。 */
  const contactHref = `/${lang}?photo_ref=${encodeURIComponent(photoId)}#contact`;

  return (
    <div className={`pa-bar ${className}`} onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        className={"pa-btn" + (fav ? " on" : "")}
        aria-pressed={fav}
        aria-label={ui(fav ? "unfavorite" : "favorite", lang)}
        title={ui(fav ? "unfavorite" : "favorite", lang)}
        onClick={onFav}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
      </button>

      <button
        type="button"
        className="pa-btn"
        aria-label={ui("share", lang)}
        title={ui("share", lang)}
        onClick={onShare}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
          <line x1="8.6" y1="10.5" x2="15.4" y2="6.5" /><line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
        </svg>
      </button>

      <a
        className="pa-btn"
        href={contactHref}
        aria-label={ui("askAboutPhoto", lang)}
        title={ui("askAboutPhoto", lang)}
        onClick={(e) => { e.stopPropagation(); track("photo_contact_open", { photo_id: photoId, entry }, photoId); }}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.4-.6L3 21l1.8-5.1A8.3 8.3 0 0 1 3.6 11.5a8.4 8.4 0 0 1 8.4-8.4 8.4 8.4 0 0 1 9 8.4z" />
        </svg>
      </a>

      {/* 状態の変化だけを短く伝える。画面レイアウトは動かさない */}
      <span className="sr-only" role="status" aria-live="polite">{note}</span>
    </div>
  );
}
