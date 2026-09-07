"use client";
/**
 * ⑨ 計測。既存の GA4 (gtag, G-SZG99MQG5Z / app/[lang]/layout.js) にイベントを
 * 足すだけで、別の計測基盤は追加しない。GTM は使っていない。
 *
 * 守っていること:
 *   - gtag が無い / 遮断されている / 同意が無い場合は何もしない。例外も投げない。
 *     計測が動かなくてもサイトの動作は一切変わらない。
 *   - 自由入力 (検索語、氏名、メールアドレス、問い合わせ本文) は送らない。
 *     送るのは写真ID・撮影地スラッグ・件数・真偽値など、こちらで決めた値だけ。
 *   - 同じ操作の二重送信を防ぐ (React の再レンダー、ハイドレーション、
 *     親子両方に付いたクリックハンドラ)。同じイベント+キーは 1.2秒 抑制する。
 *
 * イベント一覧:
 *   photo_open        写真を明示的に開いて鑑賞した (クリック/タップ)。entry= 流入元
 *   photo_view_direct 写真詳細ページを直接開いた (一覧からの操作ではない)
 *   theater_open      シアターを開始した (自動送りは送らない)
 *   color_select      色検索で色を選んだ
 *   site_search       サイト内検索が「確定」した (results= 件数)
 *   favorite_add / favorite_remove
 *   photo_share       共有操作を始めた (method= share|copy)
 *   photo_share_done  共有シートが完了 / リンクのコピーに成功した
 *                     ※ 受け手が実際に見たことの証拠ではない
 *   photo_contact_open  「この写真について問い合わせる」を押した (送信ではない)
 *   contact_submit    問い合わせフォームを送信した (with_photo= 真偽値)
 *
 * 今回の追加 (①〜⑦):
 *   explore_filter    探索画面で条件を切り替えた (field= 条件の種類, on= 真偽値)
 *   map_pick_loc      地図で撮影地を選んだ (撮影地名。自由入力ではない)
 *   look_search       見た目から探すを使った (hits= 当たった概念の数)
 *                     ※ 入力された言葉そのものは送らない
 *   compare_open      2枚を並べて比較を開いた
 *   compare_swap      比較の左右を入れ替えた
 *   album_share       共有アルバムの共有操作を始めた (count= 枚数)
 *   album_share_done  共有シート完了 / リンクのコピーに成功した
 */

const recent = new Map();

/** 二重送信よけ。同じ event+key は 1.2 秒以内なら捨てる */
function fresh(event, key) {
  const k = `${event}:${key}`;
  const now = Date.now();
  const last = recent.get(k) || 0;
  if (now - last < 1200) return false;
  recent.set(k, now);
  if (recent.size > 200) for (const [kk, v] of recent) if (now - v > 60000) recent.delete(kk);
  return true;
}

export function track(event, params = {}, dedupeKey = "") {
  try {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;   // 未読込・遮断・同意なし
    if (!fresh(event, dedupeKey || JSON.stringify(params))) return;
    window.gtag("event", event, params);
  } catch { /* 計測の失敗で操作を止めない */ }
}

/**
 * 写真を開いた。サムネイル表示・先読み・シアターの自動送りからは呼ばない。
 * entry は「その操作が実際に始まった場所」。前の色検索の値を持ち越さない。
 */
export const trackPhotoOpen = (photoId, entry) =>
  track("photo_open", { photo_id: photoId, entry }, `${photoId}|${entry}`);

/**
 * ⑨ サイト内検索の計測。0件率の分母をはっきりさせるための「1回の検索」の定義:
 *   入力が 800ms 止まり、IME変換中でなく、直前に送った語と違うとき = 1回。
 *   1文字ごと・変換途中・同じ語の再レンダーでは送らない。
 * 検索語そのものは送らない (自由入力)。送るのは件数と入力元だけ。
 */
import { useEffect, useRef } from "react";
import { normalizeText } from "./search-score.js";

export function useTrackSearch({ query, count, composing, source }) {
  const lastRef = useRef("");
  const timerRef = useRef(null);
  useEffect(() => {
    const q = normalizeText(query || "");
    clearTimeout(timerRef.current);
    if (!q || composing) return;
    timerRef.current = setTimeout(() => {
      if (q === lastRef.current) return;      // 同じ語の再送はしない
      lastRef.current = q;
      track("site_search", {
        source,
        results: count,
        has_results: count > 0,
        query_length: q.length,               // 語そのものではなく長さだけ
      }, `${source}|${q}`);
    }, 800);
    return () => clearTimeout(timerRef.current);
  }, [query, count, composing, source]);
}
