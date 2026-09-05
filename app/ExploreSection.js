"use client";
import { useState } from "react";
import ColorSearch from "./ColorSearch.js";
import { ui } from "./ui-strings.js";

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
      </div>

      <div id="ex-panel-region" role="tabpanel" aria-labelledby="ex-tab-region" hidden={tab !== "region"}>
        {regionSlot}
      </div>
      <div id="ex-panel-color" role="tabpanel" aria-labelledby="ex-tab-color" hidden={tab !== "color"}>
        <ColorSearch lang={lang} photos={photos} />
      </div>
    </section>
  );
}
