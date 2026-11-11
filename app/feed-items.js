/* フィード (feed.xml / feed.json) に載せる「最近追加した写真」。サーバー側 (ビルド時) 専用。
 *
 * 並びと日付は 追加日 (photo-added.js) → 撮影日 (photo-dates.js) → その年の1月1日 の順で決める。
 * 以前は「撮影年の 12月31日」を日付にしていたので、その年のあいだは未来の日付になり、
 * 並びも追加順ではなかった (年が同じ写真は data.js の先頭 = 北海道 から50枚)。
 * フィードを読む側 (RSS リーダー、Pinterest などの自動投稿) は日付で新着を判断するので、実際の日付にする。
 */
import { PREFECTURES } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { PHOTO_ADDED } from "./photo-added.js";
import { PHOTO_DATES } from "./photo-dates.js";

export function latestPhotos(n = 50) {
  const now = Date.now();
  const all = [];
  for (const pf of PREFECTURES) {
    for (const photo of pf.photos) {
      const prefSlug = PREF_SLUGS[pf.pref], locSlug = LOC_SLUGS[photo.loc];
      if (!photo.loc || !prefSlug || !locSlug) continue;
      const raw = PHOTO_ADDED[photo.id] || PHOTO_DATES[photo.id] || (photo.year ? `${photo.year}-01-01` : "");
      const t = raw ? Date.parse(raw) : NaN;
      /* 日付が読めない・未来になる場合は「いま」に丸める (未来の日付は出さない) */
      all.push({ ...photo, pref: pf.pref, prefSlug, locSlug, when: new Date(Math.min(Number.isFinite(t) ? t : now, now)) });
    }
  }
  return all.sort((a, b) => b.when - a.when).slice(0, n);   /* 同じ日時は data.js の並びのまま */
}
