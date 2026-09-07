/**
 * ⑤ 検索向けの 地域×テーマ ギャラリー。
 *
 * 公開する組み合わせはここで明示的に管理する。
 * 全地域×全テーマ×全色×全月の総当たり生成はしない。
 *
 * 選定の根拠 (2026-09-08 時点の実データ):
 *   - 実際に写真が揃っている組み合わせだけを選ぶ。
 *     8枚以上ある組み合わせは20組あり、そのうち枚数と撮影地点数で選んだ。
 *   - 撮影地点が複数あることを重視した。1地点だけだと
 *     「その地域のテーマ」ではなく「その場所の写真」になるため。
 *   - Search Console の検索語 (2026-06-01〜09-06 の上位40件) も確認したが、
 *     地域×テーマ の検索語は出ておらず、すべて地名単体・0クリックだった。
 *     したがって検索需要を根拠にはしていない。捏造もしていない。
 *
 * 写真が減って空になった組み合わせの扱い:
 *   MIN_PHOTOS を下回ったものはページを生成しない (中身のないURLを残さない)。
 *   公開をやめるときは、この配列から外す。
 */
export const MIN_PHOTOS = 6;

export const GALLERIES = [
  {
    slug: "okinawa-coastal",
    pref: "沖縄県",
    theme: "coastal",
    /* 選定時の実測。写真の増減で変わるので、判断の記録として残す */
    at: "2026-09-08", photos: 107, locs: 4,
    why: "枚数が最も多く、4地点にまたがる",
  },
  {
    slug: "hokkaido-birds",
    pref: "北海道",
    theme: "birds",
    at: "2026-09-08", photos: 65, locs: 6,
    why: "6地点にまたがり、北海道の被写体として内容が揃っている",
  },
  {
    slug: "nagano-cherry-blossoms",
    pref: "長野県",
    theme: "cherry-blossoms",
    at: "2026-09-08", photos: 56, locs: 9,
    why: "撮影地点が9つで最も多い",
  },
  {
    slug: "hokkaido-lakes",
    pref: "北海道",
    theme: "lakes",
    at: "2026-09-08", photos: 43, locs: 7,
    why: "7地点にまたがる",
  },
  {
    slug: "kyoto-autumn-foliage",
    pref: "京都府",
    theme: "autumn-foliage",
    at: "2026-09-08", photos: 11, locs: 3,
    why: "枚数は少ないが3地点あり、地域とテーマの結びつきが明確",
  },
];

export const galleryBySlug = (slug) => GALLERIES.find((g) => g.slug === slug) || null;
