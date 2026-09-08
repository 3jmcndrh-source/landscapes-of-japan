#!/usr/bin/env node
/** ⑦ 自由文検索の UI 文言を app/ui-strings.js へ追記する。25言語すべて揃っていなければ書かない。 */
import { readFileSync, writeFileSync } from "node:fs";
import { LANGS } from "../app/i18n-meta.js";
import { UI_STRINGS } from "../app/ui-strings.js";

const ADD = {
  freeSearch: { ja: "この言葉で探す", en: "Search by these words", zh: "用这些词搜索", "zh-tw": "用這些詞搜尋", ko: "이 말로 검색", es: "Buscar con estas palabras", fr: "Chercher avec ces mots", de: "Mit diesen Worten suchen", pt: "Buscar com estas palavras", it: "Cerca con queste parole", ru: "Искать по этим словам", ar: "ابحث بهذه الكلمات", hi: "इन शब्दों से खोजें", th: "ค้นหาด้วยคำเหล่านี้", vi: "Tìm bằng những từ này", id: "Cari dengan kata ini", tr: "Bu kelimelerle ara", nl: "Zoeken met deze woorden", pl: "Szukaj tymi słowami", sv: "Sök med dessa ord", fa: "با این واژه‌ها بگرد", he: "חפש במילים אלה", bn: "এই শব্দ দিয়ে খুঁজুন", tl: "Hanapin sa mga salitang ito", uk: "Шукати цими словами" },
  freeLoading: { ja: "検索の準備中", en: "Preparing search", zh: "正在准备搜索", "zh-tw": "正在準備搜尋", ko: "검색 준비 중", es: "Preparando la búsqueda", fr: "Préparation de la recherche", de: "Suche wird vorbereitet", pt: "Preparando a busca", it: "Preparazione della ricerca", ru: "Подготовка поиска", ar: "جارٍ تجهيز البحث", hi: "खोज तैयार हो रही है", th: "กำลังเตรียมการค้นหา", vi: "Đang chuẩn bị tìm kiếm", id: "Menyiapkan pencarian", tr: "Arama hazırlanıyor", nl: "Zoeken wordt voorbereid", pl: "Przygotowywanie wyszukiwania", sv: "Förbereder sökning", fa: "در حال آماده‌سازی جست‌وجو", he: "מכין את החיפוש", bn: "অনুসন্ধান প্রস্তুত হচ্ছে", tl: "Inihahanda ang paghahanap", uk: "Підготовка пошуку" },
  freeUnavailable: { ja: "この言葉での検索を読み込めませんでした", en: "Could not load word search", zh: "无法加载词语搜索", "zh-tw": "無法載入詞語搜尋", ko: "이 말로 하는 검색을 불러오지 못했습니다", es: "No se pudo cargar la búsqueda por palabras", fr: "Impossible de charger la recherche par mots", de: "Wortsuche konnte nicht geladen werden", pt: "Não foi possível carregar a busca por palavras", it: "Impossibile caricare la ricerca per parole", ru: "Не удалось загрузить поиск по словам", ar: "تعذر تحميل البحث بالكلمات", hi: "शब्द खोज लोड नहीं हो सकी", th: "โหลดการค้นหาด้วยคำไม่สำเร็จ", vi: "Không tải được tìm kiếm bằng từ", id: "Gagal memuat pencarian kata", tr: "Kelime araması yüklenemedi", nl: "Woordzoeken kon niet worden geladen", pl: "Nie udało się wczytać wyszukiwania słownego", sv: "Kunde inte ladda ordsökning", fa: "جست‌وجوی واژگانی بارگذاری نشد", he: "לא ניתן לטעון חיפוש לפי מילים", bn: "শব্দ অনুসন্ধান লোড করা যায়নি", tl: "Hindi ma-load ang paghahanap sa salita", uk: "Не вдалося завантажити пошук за словами" },
  freeUnsupported: { ja: "この言語では、言葉そのものからの検索はまだ確認できていません", en: "Search from your own words is not yet verified for this language", zh: "该语言尚未验证按词句搜索", "zh-tw": "該語言尚未驗證依詞句搜尋", ko: "이 언어에서는 문장 검색이 아직 확인되지 않았습니다", es: "La búsqueda por texto libre aún no está verificada en este idioma", fr: "La recherche en texte libre n'est pas encore vérifiée pour cette langue", de: "Die Freitextsuche ist für diese Sprache noch nicht geprüft", pt: "A busca por texto livre ainda não foi verificada neste idioma", it: "La ricerca a testo libero non è ancora verificata per questa lingua", ru: "Поиск по свободному тексту для этого языка ещё не проверен", ar: "لم يتم التحقق بعد من البحث بالنص الحر لهذه اللغة", hi: "इस भाषा में मुक्त पाठ खोज अभी सत्यापित नहीं है", th: "ยังไม่ได้ตรวจสอบการค้นหาด้วยข้อความอิสระสำหรับภาษานี้", vi: "Tìm kiếm bằng văn bản tự do chưa được kiểm chứng cho ngôn ngữ này", id: "Pencarian teks bebas belum diverifikasi untuk bahasa ini", tr: "Bu dil için serbest metin araması henüz doğrulanmadı", nl: "Vrij zoeken is voor deze taal nog niet geverifieerd", pl: "Wyszukiwanie dowolnym tekstem nie zostało jeszcze zweryfikowane dla tego języka", sv: "Fritextsökning är ännu inte verifierad för detta språk", fa: "جست‌وجوی متن آزاد برای این زبان هنوز تأیید نشده است", he: "חיפוש בטקסט חופשי טרם אומת לשפה זו", bn: "এই ভাষার জন্য মুক্ত লেখা অনুসন্ধান এখনও যাচাই করা হয়নি", tl: "Hindi pa napapatunayan ang malayang paghahanap sa wikang ito", uk: "Пошук довільним текстом для цієї мови ще не перевірено" },
  freeChip: { ja: "入力した言葉", en: "Your words", zh: "输入的词语", "zh-tw": "輸入的詞語", ko: "입력한 말", es: "Tus palabras", fr: "Vos mots", de: "Ihre Worte", pt: "Suas palavras", it: "Le tue parole", ru: "Ваши слова", ar: "كلماتك", hi: "आपके शब्द", th: "คำที่คุณพิมพ์", vi: "Từ bạn nhập", id: "Kata Anda", tr: "Girdiğiniz kelimeler", nl: "Uw woorden", pl: "Twoje słowa", sv: "Dina ord", fa: "واژه‌های شما", he: "המילים שלך", bn: "আপনার শব্দ", tl: "Ang iyong mga salita", uk: "Ваші слова" },
};

const src = readFileSync("app/ui-strings.js", "utf-8");
const lines = [];
let added = 0; const skipped = [];
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
  writeFileSync("app/ui-strings.js", src.slice(0, at) + "/* ⑦ 自由文で探す */\n" + lines.join("\n") + "\n\n" + src.slice(at), "utf-8");
}
console.log(`ui-strings.js: ${added} キー追加`);
if (skipped.length) console.log("  見送り: " + skipped.join(" / "));
