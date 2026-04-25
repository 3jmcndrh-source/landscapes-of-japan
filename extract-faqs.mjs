/**
 * base の prefectures.js + locations.js から英訳FAQ を抽出。
 * 各言語の翻訳作業の入力データに使う。
 */
import { PREFECTURE_CONTENT } from "./app/content/prefectures.js";
import { LOCATION_CONTENT } from "./app/content/locations.js";

console.log("=== PREFECTURE FAQs (en) ===\n");
for (const [k, v] of Object.entries(PREFECTURE_CONTENT)) {
  if (!v.faqs || v.faqs.length === 0) continue;
  console.log(`# ${k}`);
  v.faqs.forEach((f, i) => {
    console.log(`  Q${i + 1}: ${f.q.en}`);
    console.log(`  A${i + 1}: ${f.a.en}`);
  });
  console.log();
}

console.log("\n=== LOCATION FAQs (en) ===\n");
for (const [k, v] of Object.entries(LOCATION_CONTENT)) {
  if (!v.faqs || v.faqs.length === 0) continue;
  console.log(`# ${k}`);
  v.faqs.forEach((f, i) => {
    console.log(`  Q${i + 1}: ${f.q.en}`);
    console.log(`  A${i + 1}: ${f.a.en}`);
  });
  console.log();
}
