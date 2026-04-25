/**
 * 日本8地方区分 + 都道府県のグループ化
 * - 内部リンク強化(A19 PageRank流通最適化)用に、隣接/同地方prefを取得する
 * - 各pref/locページのfooterで「同地方の撮影地」「隣の都道府県」リンク表示に使用
 */

export const REGIONS = [
  { id: "hokkaido", nameJa: "北海道", nameEn: "Hokkaido", prefs: ["北海道"] },
  { id: "tohoku", nameJa: "東北", nameEn: "Tohoku", prefs: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"] },
  { id: "kanto", nameJa: "関東", nameEn: "Kanto", prefs: ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"] },
  { id: "chubu", nameJa: "中部", nameEn: "Chubu", prefs: ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県"] },
  { id: "kansai", nameJa: "関西", nameEn: "Kansai", prefs: ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"] },
  { id: "chugoku", nameJa: "中国", nameEn: "Chugoku", prefs: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"] },
  { id: "shikoku", nameJa: "四国", nameEn: "Shikoku", prefs: ["徳島県", "香川県", "愛媛県", "高知県"] },
  { id: "kyushu", nameJa: "九州・沖縄", nameEn: "Kyushu & Okinawa", prefs: ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"] },
];

export function getRegionOfPref(prefJp) {
  return REGIONS.find((r) => r.prefs.includes(prefJp)) || null;
}

export function getRegionName(regionId, lang) {
  const r = REGIONS.find((x) => x.id === regionId);
  if (!r) return "";
  return lang === "ja" ? r.nameJa : r.nameEn;
}

// 同じ地方の他のpref(自分以外)
export function getSiblingPrefs(prefJp) {
  const region = getRegionOfPref(prefJp);
  if (!region) return [];
  return region.prefs.filter((p) => p !== prefJp);
}
