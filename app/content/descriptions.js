/**
 * Localized descriptions and FAQs for each prefecture and location.
 * Base 5 langs (ja/en/zh/zh-tw/ko) in prefectures.js / locations.js.
 * Additional langs merged from extras/{lang}.js files.
 * Any language missing descriptions falls back to English.
 */
import { PREFECTURE_CONTENT as PREFS_BASE } from "./prefectures.js";
import { LOCATION_CONTENT as LOCS_BASE } from "./locations.js";
import es from "./extras/es.js";
import fr from "./extras/fr.js";
import de from "./extras/de.js";
import pt from "./extras/pt.js";
import it from "./extras/it.js";
import ru from "./extras/ru.js";
import ar from "./extras/ar.js";
import hi from "./extras/hi.js";
import th from "./extras/th.js";
import vi from "./extras/vi.js";
import id from "./extras/id.js";
import tr from "./extras/tr.js";
import nl from "./extras/nl.js";
import pl from "./extras/pl.js";
import sv from "./extras/sv.js";

const EXTRA_LANGS = { es, fr, de, pt, it, ru, ar, hi, th, vi, id, tr, nl, pl, sv };

function mergeExtras(base, type) {
  return Object.fromEntries(
    Object.entries(base).map(([key, val]) => {
      const extraDesc = {};
      for (const [lang, data] of Object.entries(EXTRA_LANGS)) {
        const d = data[type]?.[key];
        if (d) extraDesc[lang] = d;
      }
      return [key, { ...val, desc: { ...val.desc, ...extraDesc } }];
    })
  );
}

export const PREFECTURE_CONTENT = mergeExtras(PREFS_BASE, "prefectures");
export const LOCATION_CONTENT = mergeExtras(LOCS_BASE, "locations");

export function getPrefDesc(prefJp, lang) {
  const c = PREFECTURE_CONTENT[prefJp];
  if (!c || !c.desc) return "";
  return c.desc[lang] || c.desc.en || "";
}

export function getLocDesc(locJp, lang) {
  const c = LOCATION_CONTENT[locJp];
  if (!c || !c.desc) return "";
  return c.desc[lang] || c.desc.en || "";
}

export function getPrefFaqs(prefJp, lang) {
  const c = PREFECTURE_CONTENT[prefJp];
  if (!c || !c.faqs) return [];
  return c.faqs
    .map((f) => ({ q: f.q[lang] || f.q.en, a: f.a[lang] || f.a.en }))
    .filter((f) => f.q && f.a);
}

export function getLocFaqs(locJp, lang) {
  const c = LOCATION_CONTENT[locJp];
  if (!c || !c.faqs) return [];
  return c.faqs
    .map((f) => ({ q: f.q[lang] || f.q.en, a: f.a[lang] || f.a.en }))
    .filter((f) => f.q && f.a);
}
