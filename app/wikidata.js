/**
 * sameAs (schema.org) に出す同一性の参照。
 *
 * 2026-09-08 に全件を実体照合し、この表は「確認できたものだけ」を返すように直した。
 * 以前は撮影地78件・都道府県47件のQ-IDを直接持っていたが、その大半が
 * 別の対象を指していた (知床 → 空白文字 / 金閣寺 → メトロポリタン美術館 /
 * 青森県 → ドイツの経済学者 / 都道府県は連番のQ-IDが並んでいた)。
 *
 * 判定と根拠は次の2つに分かれている:
 *   app/wikidata-verified.js   採用したQ-ID (scripts/audit-wikidata.mjs が生成)
 *   docs/wikidata-audit.json   全件の判断理由・根拠URL・確認日
 *
 * 確認できなかった撮影地は sameAs ごと出力しない (プロパティを省く)。
 * 新しい撮影地も、確認が取れるまでは自動的に省略されるので、
 * 写真追加のたびに手作業は要らない。推測でQ-IDを作ることもしない。
 *
 * 通常のビルドは外部APIを呼ばない。照合をやり直すときだけ
 *   node scripts/audit-wikidata.mjs --apply
 * を実行する。
 */
import { VERIFIED_LOC_QID, VERIFIED_PREF_QID, VERIFIED_AT } from "./wikidata-verified.js";

export const wikidataUrl = (qid) => (qid ? `https://www.wikidata.org/wiki/${qid}` : null);

/** 撮影地の sameAs。確認できていなければ空配列 (呼び出し側が sameAs を出さない) */
export const getLocSameAs = (locJp) => {
  const qid = VERIFIED_LOC_QID[locJp];
  return qid ? [`https://www.wikidata.org/wiki/${qid}`] : [];
};

/** 都道府県の sameAs */
export const getPrefSameAs = (prefJp) => {
  const qid = VERIFIED_PREF_QID[prefJp];
  return qid ? [`https://www.wikidata.org/wiki/${qid}`] : [];
};

export { VERIFIED_LOC_QID, VERIFIED_PREF_QID, VERIFIED_AT };
