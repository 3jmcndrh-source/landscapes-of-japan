/**
 * T6 ゴールデンアワー: NOAA/Almanac 法の太陽位置近似計算 (依存なし)。
 * 撮影地は日本国内のみなので JST (UTC+9, DST なし) 決め打ちで "HH:MM" を返す。
 *
 * zenith 90.833° = 公式の日の出/日の入り (大気差+視半径)
 * zenith 84°     = 太陽高度 6° — ゴールデンアワーの内側境界の通例値
 */
const rad = Math.PI / 180;

function calcUT(N, lat, lng, rising, zenith) {
  const lngHour = lng / 15;
  const t = N + ((rising ? 6 : 18) - lngHour) / 24;
  const M = 0.9856 * t - 3.289;
  let L = M + 1.916 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 282.634;
  L = ((L % 360) + 360) % 360;
  let RA = Math.atan(0.91764 * Math.tan(L * rad)) / rad;
  RA = ((RA % 360) + 360) % 360;
  RA += (Math.floor(L / 90) - Math.floor(RA / 90)) * 90; // L と同じ象限へ
  RA /= 15;
  const sinDec = 0.39782 * Math.sin(L * rad);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.cos(zenith * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
  if (cosH > 1 || cosH < -1) return null; // 白夜/極夜 (日本では起きない)
  const H = (rising ? 360 - Math.acos(cosH) / rad : Math.acos(cosH) / rad) / 15;
  const T = H + RA - 0.06571 * t - 6.622;
  return (((T - lngHour) % 24) + 24) % 24;
}

const fmtJST = (ut) => {
  if (ut == null) return null;
  let h = (((ut + 9) % 24) + 24) % 24;
  let hh = Math.floor(h);
  let mm = Math.round((h - hh) * 60);
  if (mm === 60) { mm = 0; hh = (hh + 1) % 24; }
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};

/** 今日 (JST) の日の出/日の入り/ゴールデンアワー境界。全て "HH:MM" 文字列 */
export function sunTimes(lat, lng, date = new Date()) {
  const jst = new Date(date.getTime() + 9 * 3600e3);
  const N = Math.floor(
    (Date.UTC(jst.getUTCFullYear(), jst.getUTCMonth(), jst.getUTCDate()) - Date.UTC(jst.getUTCFullYear(), 0, 0)) / 864e5
  );
  return {
    sunrise: fmtJST(calcUT(N, lat, lng, true, 90.833)),
    sunset: fmtJST(calcUT(N, lat, lng, false, 90.833)),
    goldenEndAM: fmtJST(calcUT(N, lat, lng, true, 84)),   // 朝 GH = sunrise → これ
    goldenStartPM: fmtJST(calcUT(N, lat, lng, false, 84)), // 夕 GH = これ → sunset
  };
}
