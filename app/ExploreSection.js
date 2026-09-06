"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ui } from "./ui-strings.js";

/* 色検索は写真843枚ぶんの色データ (約95KB) を読む。
   「色から」を開いた人だけが取得するよう遅延読み込みにする。 */
const ColorSearch = dynamic(() => import("./ColorSearch.js"), { ssr: false });

/* ③ 保存内容はブラウザにしかないので、サーバー描画しない。
   タブを開いた人だけが読み込む (関係のないページの初期JSを増やさない)。 */
const SavedPhotos = dynamic(() => import("./SavedPhotos.js"), { ssr: false });

/**
 * ヒーロー直下の探索エリア。
 * ①でヒーロー中央にあったカテゴリ類と、右固定メニューのランダムをここへ集約した。
 * 「地域から」は既存の地図・都道府県導線 (regionSlot) をそのまま使い、
 * 同じ役割のUIを二重に作らない。テーマは既存 Collections への導線を使う。
 */
export default function ExploreSection({ lang, photos, regionSlot }) {
  const [tab, setTab] = useState("region");
  return (
    <section id="explore" className="ex" aria-label={ui("explore", lang)}>
      <div className="ex-tabs" role="tablist" aria-label={ui("explore", lang)}>
        <button
          type="button" role="tab" id="ex-tab-region"
          aria-selected={tab === "region"} aria-controls="ex-panel-region"
          className={"ex-tab" + (tab === "region" ? " on" : "")}
          onClick={() => setTab("region")}
        >{ui("byRegion", lang)}</button>
        <button
          type="button" role="tab" id="ex-tab-color"
          aria-selected={tab === "color"} aria-controls="ex-panel-color"
          className={"ex-tab" + (tab === "color" ? " on" : "")}
          onClick={() => setTab("color")}
        >{ui("byColor", lang)}</button>
        <button
          type="button" role="tab" id="ex-tab-saved"
          aria-selected={tab === "saved"} aria-controls="ex-panel-saved"
          className={"ex-tab" + (tab === "saved" ? " on" : "")}
          onClick={() => setTab("saved")}
        >{ui("favorites", lang)}</button>
      </div>

      <div id="ex-panel-region" role="tabpanel" aria-labelledby="ex-tab-region" hidden={tab !== "region"}>
        {regionSlot}
      </div>
      <div id="ex-panel-color" role="tabpanel" aria-labelledby="ex-tab-color" hidden={tab !== "color"}>
        {tab === "color" && <ColorSearch lang={lang} photos={photos} />}
      </div>
      {/* ③ お気に入り と 最近見た写真 の入口。上部バーのボタンは増やさない */}
      <div id="ex-panel-saved" role="tabpanel" aria-labelledby="ex-tab-saved" hidden={tab !== "saved"}>
        {tab === "saved" && <SavedPhotos lang={lang} />}
      </div>
    </section>
  );
}
