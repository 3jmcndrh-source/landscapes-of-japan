#!/usr/bin/env node
/**
 * ⑦ で足りない UI 文言を app/ui-strings.js へ追記する。
 * 既にあるキーは触らない。25言語すべて揃っていないキーは書き込まない
 * (英語だけ入れて「対応済み」に見せない)。
 */
import { readFileSync, writeFileSync } from "node:fs";
import { LANGS } from "../app/i18n-meta.js";
import { UI_STRINGS } from "../app/ui-strings.js";

const ADD = {
  /* 見た目から探す (⑦ の入口) */
  byLook: { ja: "見た目から", en: "By look", zh: "按画面内容", "zh-tw": "依畫面內容", ko: "화면 내용으로", es: "Por aspecto", fr: "Par aspect", de: "Nach Bildinhalt", pt: "Pela aparência", it: "Per aspetto", ru: "По содержанию", ar: "حسب المظهر", hi: "दिखावट से", th: "จากภาพ", vi: "Theo hình ảnh", id: "Dari tampilan", tr: "Görünüme göre", nl: "Op beeld", pl: "Po wyglądzie", sv: "Efter utseende", fa: "بر اساس ظاهر", he: "לפי המראה", bn: "চেহারা অনুসারে", tl: "Ayon sa hitsura", uk: "За виглядом" },
  lookPlaceholder: { ja: "霧、夕焼け、星空…", en: "mist, sunset, starry sky…", zh: "雾、日落、星空…", "zh-tw": "霧、日落、星空…", ko: "안개, 노을, 별하늘…", es: "niebla, atardecer, cielo estrellado…", fr: "brume, coucher de soleil, ciel étoilé…", de: "Nebel, Sonnenuntergang, Sternenhimmel…", pt: "névoa, pôr do sol, céu estrelado…", it: "nebbia, tramonto, cielo stellato…", ru: "туман, закат, звёздное небо…", ar: "ضباب، غروب، سماء مرصعة بالنجوم…", hi: "कोहरा, सूर्यास्त, तारों भरा आकाश…", th: "หมอก พระอาทิตย์ตก ท้องฟ้าเต็มไปด้วยดาว…", vi: "sương mù, hoàng hôn, bầu trời đầy sao…", id: "kabut, matahari terbenam, langit berbintang…", tr: "sis, gün batımı, yıldızlı gökyüzü…", nl: "mist, zonsondergang, sterrenhemel…", pl: "mgła, zachód słońca, rozgwieżdżone niebo…", sv: "dimma, solnedgång, stjärnhimmel…", fa: "مه، غروب آفتاب، آسمان پرستاره…", he: "ערפל, שקיעה, שמיים זרועי כוכבים…", bn: "কুয়াশা, সূর্যাস্ত, তারাভরা আকাশ…", tl: "hamog, paglubog ng araw, mabituing langit…", uk: "туман, захід сонця, зоряне небо…" },
  lookNoMatch: { ja: "この言葉に当たる見た目はありません", en: "No matching look for that word", zh: "没有与该词对应的画面内容", "zh-tw": "沒有與該詞對應的畫面內容", ko: "그 단어에 해당하는 화면 내용이 없습니다", es: "Ninguna coincidencia para esa palabra", fr: "Aucune correspondance pour ce mot", de: "Kein passender Bildinhalt zu diesem Wort", pt: "Nenhuma correspondência para essa palavra", it: "Nessuna corrispondenza per questa parola", ru: "Для этого слова нет совпадений", ar: "لا يوجد مظهر مطابق لهذه الكلمة", hi: "इस शब्द के लिए कोई मिलान नहीं", th: "ไม่พบภาพที่ตรงกับคำนี้", vi: "Không có hình ảnh khớp với từ này", id: "Tidak ada yang cocok dengan kata itu", tr: "Bu kelimeye uyan görünüm yok", nl: "Geen overeenkomend beeld voor dat woord", pl: "Brak dopasowania do tego słowa", sv: "Ingen matchning för det ordet", fa: "برای این واژه موردی یافت نشد", he: "אין התאמה למילה הזו", bn: "এই শব্দের সাথে কিছু মেলেনি", tl: "Walang tugma sa salitang iyon", uk: "Немає відповідників для цього слова" },
  lookUnavailable: { ja: "見た目の検索を読み込めませんでした", en: "Could not load look search", zh: "无法加载画面内容检索", "zh-tw": "無法載入畫面內容檢索", ko: "화면 내용 검색을 불러오지 못했습니다", es: "No se pudo cargar la búsqueda por aspecto", fr: "Impossible de charger la recherche par aspect", de: "Bildinhalt-Suche konnte nicht geladen werden", pt: "Não foi possível carregar a busca por aparência", it: "Impossibile caricare la ricerca per aspetto", ru: "Не удалось загрузить поиск по содержанию", ar: "تعذر تحميل البحث حسب المظهر", hi: "दिखावट खोज लोड नहीं हो सकी", th: "โหลดการค้นหาจากภาพไม่สำเร็จ", vi: "Không tải được tìm kiếm theo hình ảnh", id: "Gagal memuat pencarian tampilan", tr: "Görünüme göre arama yüklenemedi", nl: "Beeldzoeken kon niet worden geladen", pl: "Nie udało się wczytać wyszukiwania po wyglądzie", sv: "Kunde inte ladda utseendesökning", fa: "جست‌وجوی ظاهری بارگذاری نشد", he: "לא ניתן לטעון חיפוש לפי מראה", bn: "চেহারা অনুসন্ধান লোড করা যায়নি", tl: "Hindi ma-load ang paghahanap ayon sa hitsura", uk: "Не вдалося завантажити пошук за виглядом" },
  similarPhotos: { ja: "似た写真", en: "Similar photos", zh: "相似照片", "zh-tw": "相似照片", ko: "비슷한 사진", es: "Fotos similares", fr: "Photos similaires", de: "Ähnliche Fotos", pt: "Fotos semelhantes", it: "Foto simili", ru: "Похожие фотографии", ar: "صور مشابهة", hi: "समान तस्वीरें", th: "ภาพที่คล้ายกัน", vi: "Ảnh tương tự", id: "Foto serupa", tr: "Benzer fotoğraflar", nl: "Vergelijkbare foto's", pl: "Podobne zdjęcia", sv: "Liknande foton", fa: "عکس‌های مشابه", he: "תמונות דומות", bn: "অনুরূপ ছবি", tl: "Mga katulad na larawan", uk: "Схожі фотографії" },
};

const src = readFileSync("app/ui-strings.js", "utf-8");
const lines = [];
let added = 0, skipped = [];
for (const [key, map] of Object.entries(ADD)) {
  if (UI_STRINGS[key]) { skipped.push(`${key} (既存)`); continue; }
  const miss = LANGS.filter((l) => !map[l]);
  if (miss.length) { skipped.push(`${key} (${miss.join(",")} が無い)`); continue; }
  const ordered = {};
  for (const l of LANGS) ordered[l] = map[l];
  lines.push(`UI_STRINGS.${key} = ${JSON.stringify(ordered)};`);
  added++;
}

if (lines.length) {
  const marker = "export function ui(key, lang) {";
  const at = src.indexOf(marker);
  if (at < 0) throw new Error("ui-strings.js: 追記位置が見つからない");
  const out = src.slice(0, at) + "/* ⑦ 見た目から探す */\n" + lines.join("\n") + "\n\n" + src.slice(at);
  writeFileSync("app/ui-strings.js", out, "utf-8");
}
console.log(`ui-strings.js: ${added} キー追加`);
if (skipped.length) console.log("  見送り: " + skipped.join(" / "));
