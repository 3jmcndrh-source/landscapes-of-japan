#!/usr/bin/env node
/**
 * sameAs の同一性監査。
 *
 *   node scripts/audit-wikidata.mjs          現在の登録を全件照合し docs/wikidata-audit.json を書く
 *   node scripts/audit-wikidata.mjs --apply  監査結果から app/wikidata-verified.js を生成する
 *
 * なぜ必要か:
 *   sameAs は「その対象そのもの」を指すプロパティ。Q-ID の形が正しい、
 *   URLが200を返す、構文検証を通る、はどれも同一性の証拠にならない。
 *   実際 知床が Q380933 (空白文字)、金閣寺がメトロポリタン美術館を指していた。
 *
 * 同一性の判定 (機械的・再現可能):
 *   採用するのは、次のいずれかが成り立つときだけ。
 *     A. Wikidata の日本語ラベルが撮影地名と一致する
 *     B. Wikidata の日本語別名 (aliases) に撮影地名が含まれる
 *     C. 日本語版 Wikipedia の記事名が撮影地名と一致する
 *        (括弧の曖昧さ回避、市町村の接尾辞だけの違いは同一とみなす)
 *   加えて、健全性の確認として P17 (国) が日本であることを求める。
 *   座標の有無は判定に使わない (座標が無くても正しい項目はある。
 *   近い座標があるだけでも同一の証拠にならない)。
 *
 *   どれも成り立たない場合は「特定できない」として sameAs を省略する。
 *   推測で別のQ-IDを当てはめることはしない。
 *
 * 外部APIはこの監査を実行したときだけ呼ぶ。通常のビルドは
 * 生成済みの app/wikidata-verified.js だけを読む。
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
/* 「修正前」として比べる対象。
   初回は照合前の表 (docs/wikidata-legacy.json) を使い、
   2回目以降は現在出している app/wikidata-verified.js と比べる。 */
import { VERIFIED_LOC_QID, VERIFIED_PREF_QID } from "../app/wikidata-verified.js";
const legacy = existsSync("docs/wikidata-legacy.json")
  ? JSON.parse(readFileSync("docs/wikidata-legacy.json", "utf-8")) : null;
const LOC_WIKIDATA = Object.keys(VERIFIED_LOC_QID).length ? VERIFIED_LOC_QID : (legacy?.撮影地 || {});
const PREF_WIKIDATA = Object.keys(VERIFIED_PREF_QID).length ? VERIFIED_PREF_QID : (legacy?.都道府県 || {});
import { LOC_POINTS_SOURCE, LOC_POINTS } from "../app/loc-points.js";
import { PREFECTURES } from "../app/data.js";

const UA = "landscapes-of-japan-audit/1.0 (https://landscapes-of-japan.com)";
const OUT = "docs/wikidata-audit.json";
const apply = process.argv.includes("--apply");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** 括弧の曖昧さ回避と全角/半角の揺れを落とす */
const norm = (s) =>
  String(s || "")
    .normalize("NFKC")
    .replace(/\s*[（(][^）)]*[）)]\s*$/, "")
    .replace(/\s+/g, "")
    .trim();

/** 市町村の接尾辞だけの違いを同一とみなす (美唄 → 美唄市, 積丹 → 積丹町) */
const sameAllowingSuffix = (locName, title) => {
  const a = norm(locName), b = norm(title);
  if (a === b) return "記事名が一致";
  for (const suf of ["市", "町", "村", "区", "都", "府", "県"]) {
    if (b === a + suf) return `記事名が「${a}」+「${suf}」で一致`;
  }
  return null;
};

/** Wikidata から実体を取る (50件ずつ) */
async function fetchEntities(qids) {
  const out = {};
  const uniq = [...new Set(qids.filter(Boolean))];
  for (let i = 0; i < uniq.length; i += 50) {
    const chunk = uniq.slice(i, i + 50);
    const url = "https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&languages=ja|en"
      + "&props=labels|aliases|claims|sitelinks|descriptions&ids=" + chunk.join("|");
    const res = await fetch(url, { headers: { "User-Agent": UA, "Accept": "application/json" } });
    if (!res.ok) throw new Error(`Wikidata API ${res.status}`);
    const json = await res.json();
    Object.assign(out, json.entities || {});
    process.stdout.write(`  ${Math.min(i + 50, uniq.length)}/${uniq.length}\r`);
    await sleep(300);
  }
  console.log("");
  return out;
}

const claimIds = (ent, prop) =>
  (ent?.claims?.[prop] || [])
    .map((c) => c.mainsnak?.datavalue?.value?.id)
    .filter(Boolean);

const claimCoord = (ent) => {
  const c = (ent?.claims?.P625 || [])[0]?.mainsnak?.datavalue?.value;
  return c ? { lat: c.latitude, lng: c.longitude } : null;
};

function describe(ent) {
  if (!ent || ent.missing !== undefined) return { missing: true };
  return {
    qid: ent.id,
    labelJa: ent.labels?.ja?.value || null,
    labelEn: ent.labels?.en?.value || null,
    descJa: ent.descriptions?.ja?.value || null,
    descEn: ent.descriptions?.en?.value || null,
    aliasesJa: (ent.aliases?.ja || []).map((a) => a.value),
    instanceOf: claimIds(ent, "P31"),
    country: claimIds(ent, "P17"),
    admin: claimIds(ent, "P131"),
    articleJa: ent.sitelinks?.jawiki?.title || null,
    coord: claimCoord(ent),
  };
}

/** 同一性の判定。理由を文字列で返す (null = 特定できない) */
function identityReason(name, info) {
  if (!info || info.missing) return null;
  const n = norm(name);
  if (info.labelJa && norm(info.labelJa) === n) return "日本語ラベルが一致";
  if (info.aliasesJa.some((a) => norm(a) === n)) return "日本語別名に含まれる";
  if (info.articleJa) {
    const r = sameAllowingSuffix(name, info.articleJa);
    if (r) return r;
  }
  if (info.labelJa) {
    const r = sameAllowingSuffix(name, info.labelJa);
    if (r) return r.replace("記事名", "日本語ラベル");
  }
  return null;
}

const JAPAN = "Q17";

/**
 * 同名の候補を切り分けるための距離。
 * 座標を同一性の証拠には使わない (座標が無くても正しい項目はあるし、
 * 近いだけでも同一ではない)。ここで使うのは逆向きで、
 * 「名前も都道府県も一致する候補が複数あり得るとき、明らかに遠いものを外す」ため。
 * 安養寺 (長野県佐久市の寺) と 安養寺 (松本市) のような取り違えを防ぐ。
 */
const MAX_KM_FROM_POINT = 30;
const distKm = (a, b) => {
  const R = 6371, r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
};
/** 撮影地の代表点から遠すぎないか。判定できないときは null (不一致とはしない) */
function nearEnough(qid, locName) {
  const p = LOC_POINTS?.[locName];
  const c = info[qid]?.coord;
  if (!p || !c) return null;
  return distKm(p, c) <= MAX_KM_FROM_POINT;
}
/* 都道府県 (prefecture of Japan)。北海道は Wikidata 上で
   島 (Q35581, P31=島) と 都道府県 (Q1037393, P31=Q50337) が別項目になっている。
   都道府県ページの sameAs は「都道府県」を指さないといけないので、
   種別で絞り込む。日本語ラベルが同じでも島の項目は採らない。 */
const PREFECTURE_CLASS = "Q50337";

/** Wikidata の検索。名前から候補を出し、種別で絞るために使う */
async function searchWikidata(term, limit = 7) {
  const url = "https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json"
    + "&language=ja&uselang=ja&type=item&limit=" + limit + "&search=" + encodeURIComponent(term);
  const res = await fetch(url, { headers: { "User-Agent": UA, "Accept": "application/json" } });
  if (!res.ok) return [];
  const json = await res.json();
  await sleep(250);
  return (json.search || []).map((s) => s.id);
}

/* ---- 対象を集める ---- */
const usedLocs = [...new Set(PREFECTURES.flatMap((p) => p.photos.map((x) => x.loc)).filter(Boolean))];
const usedPrefs = [...new Set(PREFECTURES.filter((p) => p.photos.length).map((p) => p.pref))];

/* 現在の登録だけでなく、掲載中の撮影地すべてを対象にする
   (登録が無い撮影地も「省略」として明細に残す) */
const locTargets = [...new Set([...Object.keys(LOC_WIKIDATA), ...usedLocs])];

/* 撮影地 → 都道府県 (行政区分の照合に使う) */
const prefOfLoc = {};
for (const pf of PREFECTURES) for (const ph of pf.photos) if (ph.loc) prefOfLoc[ph.loc] = pf.pref;
const prefTargets = Object.keys(PREF_WIKIDATA);

const currentQids = [
  ...locTargets.map((k) => LOC_WIKIDATA[k]),
  ...prefTargets.map((k) => PREF_WIKIDATA[k]),
].filter(Boolean);

/* ② で ja.wikipedia から取った Q-ID を、独立した候補として使う */
const candidateQids = Object.values(LOC_POINTS_SOURCE || {}).map((v) => v.qid).filter(Boolean);

/**
 * 都道府県の候補も日本語版 Wikipedia から引く。
 * 現行の PREF_WIKIDATA は連番の Q-ID が並んでおり、実体は無関係の人物だった
 * (青森県 → Q123384 = Gustav Höfken)。名前から推測せず、記事から取り直す。
 */
async function qidsFromJaWikipedia(titles) {
  const out = {};
  for (let i = 0; i < titles.length; i += 20) {
    const chunk = titles.slice(i, i + 20);
    const url = "https://ja.wikipedia.org/w/api.php?action=query&format=json&redirects=1"
      + "&prop=pageprops&ppprop=wikibase_item&titles=" + chunk.map(encodeURIComponent).join("|");
    const res = await fetch(url, { headers: { "User-Agent": UA, "Accept": "application/json" } });
    if (!res.ok) throw new Error("jawiki API " + res.status);
    const json = await res.json();
    const norm2 = {};
    for (const n of json.query?.normalized || []) norm2[n.to] = n.from;
    for (const r of json.query?.redirects || []) norm2[r.to] = norm2[r.from] || r.from;
    for (const p of Object.values(json.query?.pages || {})) {
      const q = p.pageprops?.wikibase_item;
      if (!q) continue;
      const asked = norm2[p.title] || p.title;
      out[asked] = { qid: q, title: p.title };
    }
    await sleep(300);
  }
  return out;
}
console.log("[audit] 都道府県の候補を日本語版 Wikipedia から取得中…");
const prefCandidates = await qidsFromJaWikipedia(prefTargets);
console.log("[audit] 都道府県の候補 " + Object.keys(prefCandidates).length + "/" + prefTargets.length);
for (const v of Object.values(prefCandidates)) candidateQids.push(v.qid);

/* 都道府県は Wikidata 検索でも候補を集める。
   記事から引いた項目が「島」だった場合 (北海道) に、都道府県の項目へ行き着くため。 */
console.log("[audit] 都道府県の候補を Wikidata 検索でも補完中…");
const prefSearch = {};
for (const name of prefTargets) {
  const ids = await searchWikidata(name);
  prefSearch[name] = ids;
  candidateQids.push(...ids);
}

/* 撮影地も Wikidata 検索で候補を広げる。
   記事から引いた候補が市町村だと (高知城 → 高知市)、そのままでは省略になる。
   検索で出た候補にも同じ同一性判定と行政区分の照合をかける。 */
console.log("[audit] 撮影地の候補を Wikidata 検索で補完中… (" + locTargets.length + "件)");
const locSearch = {};
let done = 0;
for (const name of locTargets) {
  const ids = await searchWikidata(name);
  locSearch[name] = ids;
  candidateQids.push(...ids);
  if (++done % 20 === 0) process.stdout.write("  " + done + "/" + locTargets.length + "   ");
}
console.log("");

console.log(`[audit] 現在の登録: 撮影地 ${locTargets.length} (Q-IDあり ${locTargets.filter((k) => LOC_WIKIDATA[k]).length}) / 都道府県 ${prefTargets.length}`);
console.log(`[audit] 掲載中: 撮影地 ${usedLocs.length} / 都道府県 ${usedPrefs.length}`);
console.log(`[audit] Wikidata へ問い合わせる項目 ${new Set([...currentQids, ...candidateQids]).size} 件`);

const ents = await fetchEntities([...currentQids, ...candidateQids]);
const info = {};
for (const [qid, e] of Object.entries(ents)) info[qid] = describe(e);

/* 行政区分の連鎖 (P131) を閉じるまでたどる。
   日本の階層は場所によって深さが違う
   (松本城 → 松本市 → 長野県 は2段、小樽市 → 後志総合振興局 → 北海道 も2段だが、
    施設 → 町 → 郡 → 振興局 → 道 のように4段になることもある)。
   ここで打ち切ると「県が一致しない」と誤判定するので、新しい参照が出なくなるまで取る。 */
for (let depth = 0; depth < 5; depth++) {
  const adminQids = Object.values(info).flatMap((v) => (v && !v.missing ? v.admin : []));
  const need = [...new Set(adminQids)].filter((q) => !info[q]);
  if (!need.length) break;
  console.log("[audit] 行政区分 " + (depth + 1) + "段目: " + need.length + " 件を追加取得");
  const more = await fetchEntities(need);
  for (const [qid, e] of Object.entries(more)) info[qid] = describe(e);
}

const today = new Date().toISOString().slice(0, 10);
const rows = [];

/**
 * 行政区分の照合。
 * その項目の P131 (所在する行政区画) を2段までたどり、
 * 期待する都道府県の Q-ID に届くかを見る。
 * 同名の別施設 (松山城が愛媛か岡山か、梅林公園がどの市か) を取り違えないため。
 * P131 が無いなど判定できないときは null を返し「照合できず」として扱う。
 */
function adminMatches(qid, expectPrefQid) {
  if (!expectPrefQid) return null;
  if (!info[qid] || info[qid].missing) return null;
  const seen = new Set();
  const queue = [qid];
  let walked = 0;
  while (queue.length) {
    const q = queue.shift();
    if (seen.has(q)) continue;
    seen.add(q);
    if (q === expectPrefQid) return true;
    const e = info[q];
    if (!e || e.missing) continue;
    for (const a of e.admin || []) { queue.push(a); walked++; }
  }
  /* 1つも上位をたどれなかった = 照合できない (不一致とは言えない) */
  return walked ? false : null;
}

function judge(kind, name, currentQid, candidateQid, candidateTitle, expectPrefQid) {
  const row = {
    種別: kind, 撮影地: name,
    修正前: currentQid ? `https://www.wikidata.org/wiki/${currentQid}` : null,
    確認日: today,
  };

  /* 1. いまの登録がそのものを指しているか */
  const cur = currentQid ? info[currentQid] : null;
  const curReason = currentQid ? identityReason(name, cur) : null;
  const curInJapan = cur && !cur.missing ? cur.country.includes(JAPAN) : false;

  const curAdmin = currentQid ? adminMatches(currentQid, expectPrefQid) : null;
  if (currentQid && curReason && curInJapan && curAdmin !== false) {
    row.結果 = "維持";
    row.行政区分 = curAdmin === true ? "都道府県が一致" : "照合できず (名称の一致のみ)";
    row.修正後 = row.修正前;
    row.採用Q = currentQid;
    row.理由 = `${curReason} (${cur.labelJa || cur.labelEn})`;
    row.根拠 = [`https://www.wikidata.org/wiki/${currentQid}`, cur.articleJa ? `https://ja.wikipedia.org/wiki/${encodeURIComponent(cur.articleJa)}` : null].filter(Boolean);
    return row;
  }

  /* 2. ja.wikipedia 由来の候補がそのものを指しているか */
  const cand = candidateQid ? info[candidateQid] : null;
  const candReason = candidateQid ? identityReason(name, cand) : null;
  const candInJapan = cand && !cand.missing ? cand.country.includes(JAPAN) : false;

  const candAdmin = candidateQid ? adminMatches(candidateQid, expectPrefQid) : null;
  if (candidateQid && candReason && candInJapan && candAdmin !== false && candidateQid !== currentQid) {
    row.結果 = "修正";
    row.行政区分 = candAdmin === true ? "都道府県が一致" : "照合できず (名称の一致のみ)";
    row.修正後 = `https://www.wikidata.org/wiki/${candidateQid}`;
    row.採用Q = candidateQid;
    row.理由 = `${candReason} (${cand.labelJa || cand.labelEn})。修正前は「${cur && !cur.missing ? (cur.labelJa || cur.labelEn) : "存在しない項目"}」を指していた`;
    row.根拠 = [`https://www.wikidata.org/wiki/${candidateQid}`, cand.articleJa ? `https://ja.wikipedia.org/wiki/${encodeURIComponent(cand.articleJa)}` : null].filter(Boolean);
    return row;
  }
  if (candidateQid && candReason && candInJapan && candAdmin !== false && candidateQid === currentQid) {
    /* 現行と候補が同じで、上の1で落ちた = 国の確認に失敗したケース */
    row.結果 = "維持";
    row.修正後 = row.修正前;
    row.採用Q = currentQid;
    row.理由 = `${candReason} (${cand.labelJa || cand.labelEn})`;
    row.根拠 = [`https://www.wikidata.org/wiki/${currentQid}`];
    return row;
  }

  /* 3. どちらも同一性を示せない → 省略 */
  row.結果 = "省略";
  row.修正後 = null;
  row.採用Q = null;
  const bits = [];
  if (curAdmin === false) bits.push("現行 " + currentQid + " は所在する都道府県が一致しない (同名の別の場所)");
  if (candAdmin === false) bits.push("候補 " + candidateQid + " は所在する都道府県が一致しない (同名の別の場所)");
  if (currentQid) {
    bits.push(cur && !cur.missing
      ? `現行 ${currentQid} は「${cur.labelJa || cur.labelEn || "(ラベルなし)"}」(${cur.descJa || cur.descEn || "説明なし"}) で別の対象`
      : `現行 ${currentQid} は存在しない項目`);
  } else {
    bits.push("現行の登録なし");
  }
  if (candidateQid) {
    bits.push(cand && !cand.missing
      ? `Wikipedia 由来の候補 ${candidateQid}「${candidateTitle}」は撮影地そのものではない`
      : `候補 ${candidateQid} を取得できない`);
  }
  row.理由 = bits.join(" / ") + " → 同一性を示せないので省略";
  row.根拠 = [currentQid ? `https://www.wikidata.org/wiki/${currentQid}` : null, candidateQid ? `https://www.wikidata.org/wiki/${candidateQid}` : null].filter(Boolean);
  return row;
}

/* 先に都道府県を確定させ、その Q-ID を撮影地の行政区分照合に使う */
/* 都道府県は「日本語ラベルが一致 かつ P31 に都道府県が入っている」項目だけを採る */
const isPrefItem = (q) => {
  const e = info[q];
  return e && !e.missing && (e.instanceOf || []).includes(PREFECTURE_CLASS);
};
const prefRows = prefTargets.map((name) => {
  const pool = [PREF_WIKIDATA[name], prefCandidates[name]?.qid, ...(prefSearch[name] || [])].filter(Boolean);
  const hit = pool.find((q) => isPrefItem(q) && identityReason(name, info[q]) && (info[q].country || []).includes(JAPAN))
    || pool.find((q) => isPrefItem(q) && identityReason(name, info[q]));
  const cur = PREF_WIKIDATA[name] || null;
  const row = {
    種別: "都道府県", 撮影地: name,
    修正前: cur ? "https://www.wikidata.org/wiki/" + cur : null,
    確認日: today,
  };
  if (!hit) {
    row.結果 = "省略"; row.修正後 = null; row.採用Q = null;
    row.理由 = "日本語ラベルが一致し、かつ P31 が都道府県 (" + PREFECTURE_CLASS + ") の項目を特定できなかった";
    row.根拠 = pool.map((q) => "https://www.wikidata.org/wiki/" + q);
    return row;
  }
  const e = info[hit];
  row.結果 = hit === cur ? "維持" : "修正";
  row.修正後 = "https://www.wikidata.org/wiki/" + hit;
  row.採用Q = hit;
  row.行政区分 = "P31 が都道府県";
  const before = cur ? (info[cur] && !info[cur].missing ? (info[cur].labelJa || info[cur].labelEn) : "存在しない項目") : "登録なし";
  row.理由 = identityReason(name, e) + " (" + (e.labelJa || e.labelEn) + ", " + (e.descJa || e.descEn || "") + ")"
    + (hit === cur ? "" : "。修正前は「" + before + "」を指していた");
  row.根拠 = ["https://www.wikidata.org/wiki/" + hit, e.articleJa ? "https://ja.wikipedia.org/wiki/" + encodeURIComponent(e.articleJa) : null].filter(Boolean);
  return row;
});
const prefQidOf = {};
for (const r of prefRows) if (r.採用Q) prefQidOf[r.撮影地] = r.採用Q;

for (const name of locTargets) {
  const src = LOC_POINTS_SOURCE?.[name];
  const expect = prefQidOf[prefOfLoc[name]] || null;
  let row = judge("撮影地", name, LOC_WIKIDATA[name] || null, src?.qid || null, src?.title || null, expect);
  if (row.結果 === "省略") {
    /* 検索で出た候補のうち、同一性と行政区分の両方を満たすものを探す */
    for (const q of locSearch[name] || []) {
      const e = info[q];
      if (!e || e.missing) continue;
      const reason = identityReason(name, e);
      if (!reason) continue;
      if (!(e.country || []).includes(JAPAN)) continue;
      if (adminMatches(q, expect) !== true) continue;
      /* 撮影地に都道府県そのものを当てない (「沖縄」に 沖縄県 を当てない) */
      if (q === expect) continue;
      /* 同名の別施設を外す (安養寺: 松本市 と 佐久市) */
      if (nearEnough(q, name) === false) continue;
      /* 記事から引いた候補が市町村なら、検索候補はその市町村の中に無ければならない。
         高知城 は 高知市 の中にあるので通す。
         沖縄市 は 那覇市 の中に無いので通さない
         (撮影地「沖縄」が指すのは那覇周辺で、沖縄市は別の市)。
         記事の候補が公園や施設のときはこの条件を課さない
         (さっぽろ雪まつり ↔ 大通公園 のように、含む/含まれるの関係にないため)。 */
      const areaQ = src?.qid;
      const areaLabel = areaQ ? (info[areaQ]?.labelJa || "") : "";
      if (areaQ && /[市町村区]$/.test(areaLabel) && q !== areaQ && adminMatches(q, areaQ) !== true) continue;
      const before = LOC_WIKIDATA[name]
        ? (info[LOC_WIKIDATA[name]] && !info[LOC_WIKIDATA[name]].missing
            ? (info[LOC_WIKIDATA[name]].labelJa || info[LOC_WIKIDATA[name]].labelEn) : "存在しない項目")
        : "登録なし";
      row = {
        種別: "撮影地", 撮影地: name,
        修正前: LOC_WIKIDATA[name] ? "https://www.wikidata.org/wiki/" + LOC_WIKIDATA[name] : null,
        確認日: today,
        結果: LOC_WIKIDATA[name] === q ? "維持" : "修正",
        修正後: "https://www.wikidata.org/wiki/" + q,
        採用Q: q,
        行政区分: "都道府県が一致",
        理由: reason + " (" + (e.labelJa || e.labelEn) + ", " + (e.descJa || e.descEn || "説明なし") + ")"
          + "。Wikidata 検索で特定。修正前は「" + before + "」",
        根拠: ["https://www.wikidata.org/wiki/" + q, e.articleJa ? "https://ja.wikipedia.org/wiki/" + encodeURIComponent(e.articleJa) : null].filter(Boolean),
      };
      break;
    }
  }
  rows.push(row);
}
rows.push(...prefRows);

const tally = rows.reduce((a, r) => { a[r.結果] = (a[r.結果] || 0) + 1; return a; }, {});
console.log(`[audit] 維持 ${tally["維持"] || 0} / 修正 ${tally["修正"] || 0} / 省略 ${tally["省略"] || 0} = ${rows.length}`);

if (!existsSync("docs")) mkdirSync("docs");
writeFileSync(OUT, JSON.stringify({
  確認日: today,
  方法: "Wikidata wbgetentities で日本語ラベル・別名・jawiki記事名・P17(国) を取得し、撮影地名との同一性のみで判定。座標は判定に使わない。",
  対象件数: rows.length,
  内訳: tally,
  明細: rows,
}, null, 1), "utf-8");
console.log(`[audit] ${OUT} に書き出しました`);

if (apply) {
  const locOut = {}, prefOut = {};
  for (const r of rows) {
    if (r.結果 === "省略") continue;
    if (r.種別 === "撮影地") locOut[r.撮影地] = r.採用Q;
    else prefOut[r.撮影地] = r.採用Q;
  }
  const body =
`// 自動生成: node scripts/audit-wikidata.mjs --apply (手で編集しない)
// sameAs に出す Wikidata 項目。同一性を確認できたものだけを載せる。
//
// 判定方法 (docs/wikidata-audit.json に全件の根拠あり):
//   日本語ラベル一致 / 日本語別名に含まれる / jawiki 記事名が一致
//   (括弧の曖昧さ回避・市町村の接尾辞の違いは同一とみなす)
//   に加えて P17 (国) が日本であること。座標は判定に使わない。
// 確認できなかった撮影地はここに載せず、sameAs ごと出力しない。
// 確認日: ${today}
export const VERIFIED_LOC_QID = ${JSON.stringify(locOut, null, 1)};

export const VERIFIED_PREF_QID = ${JSON.stringify(prefOut, null, 1)};

export const VERIFIED_AT = ${JSON.stringify(today)};
`;
  writeFileSync("app/wikidata-verified.js", body, "utf-8");
  console.log(`[audit] app/wikidata-verified.js: 撮影地 ${Object.keys(locOut).length} / 都道府県 ${Object.keys(prefOut).length}`);
}
