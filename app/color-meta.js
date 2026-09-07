/**
 * ⑧ 色の見本と並び順。色検索 (ColorSearch) と統合探索 (ExploreClient) で共有する。
 * 色の判定そのものは photo-model.js の COLOR_MIN_SHARE と photo-palette.js。
 * ここは「画面に出す見本の色」と「並べる順番」だけ。
 */
export const SWATCH = {
  red: "#c0392b", orange: "#d97a28", yellow: "#d8b62c", green: "#3f8f4a",
  blue: "#2f6fb0", purple: "#7a5aa8", pink: "#c96b93", brown: "#7a5334",
  white: "#efeae2", gray: "#8d8d8d", black: "#1a1a1a",
};
export const PALETTE_COLORS_ORDER = [
  "red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "white", "gray", "black",
];
