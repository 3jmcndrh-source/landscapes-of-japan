import exifr from "exifr";
import { readdirSync } from "fs";
import { resolve, join } from "path";

const dir = process.argv[2];
if (!dir) { console.log("使い方: node check-gps.mjs <フォルダパス>"); process.exit(1); }

const files = readdirSync(dir).filter(f => /\.(jpg|jpeg)$/i.test(f)).sort();
for (const f of files) {
  const fp = resolve(dir, f);
  try {
    const gps = await exifr.gps(fp);
    if (gps && gps.latitude && gps.longitude) {
      console.log(`${f}: lat=${gps.latitude.toFixed(5)}, lng=${gps.longitude.toFixed(5)}`);
    } else {
      console.log(`${f}: GPS無し`);
    }
  } catch (e) {
    console.log(`${f}: エラー (${e.message})`);
  }
}
