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
import fa from "./extras/fa.js";
import he from "./extras/he.js";
import bn from "./extras/bn.js";
import tl from "./extras/tl.js";
import uk from "./extras/uk.js";

const EXTRA_LANGS = { es, fr, de, pt, it, ru, ar, hi, th, vi, id, tr, nl, pl, sv, fa, he, bn, tl, uk };

function mergeExtras(base, type) {
  // type は "prefectures" | "locations"
  const faqKey = type === "prefectures" ? "prefectureFaqs" : "locationFaqs";
  const defKey = type === "prefectures" ? "prefectureDefinitions" : "locationDefinitions";
  const hlKey = type === "prefectures" ? "prefectureHighlights" : "locationHighlights";
  const qaKey = type === "prefectures" ? "prefectureQuickAnswers" : "locationQuickAnswers";

  return Object.fromEntries(
    Object.entries(base).map(([key, val]) => {
      const newDesc = { ...val.desc };
      // 既存 faqs を deep clone (q/a の lang map に追加するため)
      const newFaqs = (val.faqs || []).map((f) => ({
        q: { ...f.q },
        a: { ...f.a },
      }));
      const newDefinition = { ...(val.definition || {}) };
      const newHighlights = { ...(val.highlights || {}) };
      const newQuickAnswers = { ...(val.quickAnswers || {}) };

      for (const [lang, data] of Object.entries(EXTRA_LANGS)) {
        // desc
        const dval = data[type]?.[key];
        if (dval) newDesc[lang] = dval;

        // faqs (per-language: extra FAQs は base index と同じ順序で対応)
        const extraFaqs = data[faqKey]?.[key];
        if (Array.isArray(extraFaqs)) {
          for (let i = 0; i < extraFaqs.length && i < newFaqs.length; i++) {
            if (extraFaqs[i]?.q) newFaqs[i].q[lang] = extraFaqs[i].q;
            if (extraFaqs[i]?.a) newFaqs[i].a[lang] = extraFaqs[i].a;
          }
        }

        // A14: definition (string)
        const def = data[defKey]?.[key];
        if (def) newDefinition[lang] = def;

        // A14: highlights (array of strings)
        const hl = data[hlKey]?.[key];
        if (Array.isArray(hl)) newHighlights[lang] = hl;

        // A14: quickAnswers (array of {q, a})
        const qa = data[qaKey]?.[key];
        if (Array.isArray(qa)) newQuickAnswers[lang] = qa;
      }
      return [key, {
        ...val,
        desc: newDesc,
        faqs: newFaqs,
        definition: newDefinition,
        highlights: newHighlights,
        quickAnswers: newQuickAnswers,
      }];
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

// A14: AI Overview対応 — definition (○○とは?), highlights (5項目), quickAnswers (3つの直結Q&A)
// いずれも英語フォールバックを最終手段とし、データなしの場合は空 (UI側で表示しない)
export function getPrefDefinition(prefJp, lang) {
  const c = PREFECTURE_CONTENT[prefJp];
  if (!c || !c.definition) return "";
  return c.definition[lang] || c.definition.en || "";
}

export function getLocDefinition(locJp, lang) {
  const c = LOCATION_CONTENT[locJp];
  if (!c || !c.definition) return "";
  return c.definition[lang] || c.definition.en || "";
}

export function getPrefHighlights(prefJp, lang) {
  const c = PREFECTURE_CONTENT[prefJp];
  if (!c || !c.highlights) return [];
  return c.highlights[lang] || c.highlights.en || [];
}

export function getLocHighlights(locJp, lang) {
  const c = LOCATION_CONTENT[locJp];
  if (!c || !c.highlights) return [];
  return c.highlights[lang] || c.highlights.en || [];
}

export function getPrefQuickAnswers(prefJp, lang) {
  const c = PREFECTURE_CONTENT[prefJp];
  if (!c || !c.quickAnswers) return [];
  return c.quickAnswers[lang] || c.quickAnswers.en || [];
}

export function getLocQuickAnswers(locJp, lang) {
  const c = LOCATION_CONTENT[locJp];
  if (!c || !c.quickAnswers) return [];
  return c.quickAnswers[lang] || c.quickAnswers.en || [];
}
