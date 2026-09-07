"use client";
/**
 * ② 撮影地マップ。統合探索 (①) の中で「地図から絞り込む」ために使う。
 *
 * 地図データ:
 *   既存の都道府県マップと同じ GeoJSON と同じ投影 (geoMercator) を使う。
 *   外部のタイル配信サービスは使わない。
 *     - 追加費用が発生しない
 *     - 帰属表示・利用上限・デモサーバー依存の問題が起きない
 *     - Cloudflare Pages の 1ファイル25MiB 制限に当たらない
 *       (ベクタタイル1ファイルはこれを超える)
 *   地図が読めない環境でも、写真一覧と絞り込みはそのまま使える。
 *
 * マーカー:
 *   撮影地ごとに1つ。写真数を添える。座標は app/loc-points.js (出典つき)。
 *   近いマーカーは画面上の距離でまとめ、拡大すると分かれる。
 *   写真1枚ごとの位置は持たない (広域名は代表点)。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { select } from "d3-selection";
import { zoom as d3zoom, zoomIdentity } from "d3-zoom";
import { GEOJSON_URLS, MW, MH, getLocName } from "./data.js";
import { LOC_POINTS } from "./loc-points.js";
import { ui } from "./ui-strings.js";

/* 画面上でこの距離 (px) より近いマーカーはまとめる。拡大すると実距離が広がって分かれる */
const CLUSTER_PX = 34;

export default function PhotoMap({ lang, photos, onPickLoc, onBBox, selectedLocs = [], bbox = null }) {
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const [geo, setGeo] = useState(null);
  const [tf, setTf] = useState({ k: 1, x: 0, y: 0 });
  const [failed, setFailed] = useState(false);

  const projection = useMemo(
    () => geoMercator().center([137, 37.5]).scale(1800).translate([MW / 2, MH / 2]),
    []
  );
  const path = useMemo(() => geoPath().projection(projection), [projection]);

  /* 地図の形は開いたときに読み込む (使わない人には読ませない) */
  useEffect(() => {
    let alive = true;
    (async () => {
      for (const url of GEOJSON_URLS) {
        try {
          const r = await fetch(url);
          if (!r.ok) continue;
          const j = await r.json();
          if (alive) setGeo(j);
          return;
        } catch { /* 次の候補へ */ }
      }
      if (alive) setFailed(true);   /* 地図が出せなくても一覧は使える */
    })();
    return () => { alive = false; };
  }, []);

  /* 撮影地ごとの写真数 (いま絞り込まれている写真から数える) */
  const locCounts = useMemo(() => {
    const m = new Map();
    for (const p of photos) if (p.loc) m.set(p.loc, (m.get(p.loc) || 0) + 1);
    return m;
  }, [photos]);

  /* 投影した座標 */
  const points = useMemo(() => {
    const out = [];
    for (const [loc, n] of locCounts) {
      const pt = LOC_POINTS[loc];
      if (!pt) continue;                       /* 座標が無い撮影地は出さない */
      const xy = projection([pt.lng, pt.lat]);
      if (!xy) continue;
      out.push({ loc, n, x: xy[0], y: xy[1], lat: pt.lat, lng: pt.lng });
    }
    return out;
  }, [locCounts, projection]);

  /* 近いものをまとめる。拡大率が上がるほど分かれる */
  const clusters = useMemo(() => {
    const need = CLUSTER_PX / (tf.k || 1);
    const out = [];
    for (const p of points) {
      const near = out.find((c) => Math.hypot(c.x - p.x, c.y - p.y) < need);
      if (near) {
        near.items.push(p);
        near.n += p.n;
        near.x = near.items.reduce((s, i) => s + i.x, 0) / near.items.length;
        near.y = near.items.reduce((s, i) => s + i.y, 0) / near.items.length;
      } else {
        out.push({ x: p.x, y: p.y, n: p.n, items: [p] });
      }
    }
    return out;
  }, [points, tf.k]);

  /* 拡大・移動 */
  useEffect(() => {
    if (!svgRef.current) return;
    const z = d3zoom().scaleExtent([1, 12]).on("zoom", (e) => {
      setTf({ k: e.transform.k, x: e.transform.x, y: e.transform.y });
    });
    const sel = select(svgRef.current);
    sel.call(z);
    return () => { sel.on(".zoom", null); };
  }, []);

  /* いまの表示範囲を緯度経度で親へ渡す。ドラッグ中に履歴を増やさないよう、
     操作が止まってから1回だけ通知する */
  const notify = useRef(null);
  useEffect(() => {
    if (!onBBox) return;
    clearTimeout(notify.current);
    notify.current = setTimeout(() => {
      const inv = (px, py) => projection.invert([(px - tf.x) / tf.k, (py - tf.y) / tf.k]);
      const tl = inv(0, 0), br = inv(MW, MH);
      if (!tl || !br) return;
      /* 全体表示のときは範囲条件を付けない */
      if (tf.k <= 1.02) { onBBox(null); return; }
      onBBox([Math.min(tl[0], br[0]), Math.min(tl[1], br[1]), Math.max(tl[0], br[0]), Math.max(tl[1], br[1])]);
    }, 400);
    return () => clearTimeout(notify.current);
  }, [tf, onBBox, projection]);

  const reset = useCallback(() => {
    if (svgRef.current) select(svgRef.current).call(d3zoom().transform, zoomIdentity);
    setTf({ k: 1, x: 0, y: 0 });
    onBBox?.(null);
  }, [onBBox]);

  if (failed) {
    return <p className="map-fail">{ui("noResults", lang)}</p>;
  }

  return (
    <div className="pmap">
      <svg ref={svgRef} viewBox={`0 0 ${MW} ${MH}`} className="pmap-svg" role="img"
        aria-label={ui("mapArea", lang)}>
        <g ref={gRef} transform={`translate(${tf.x},${tf.y}) scale(${tf.k})`}>
          {geo && geo.features && (
            <g className="pmap-land">
              {geo.features.map((f, i) => (
                <path key={i} d={path(f) || undefined} />
              ))}
            </g>
          )}
          {clusters.map((c, i) => {
            const single = c.items.length === 1 ? c.items[0] : null;
            const on = single && selectedLocs.includes(single.loc);
            const r = Math.max(7, Math.min(20, 6 + Math.sqrt(c.n) * 1.6)) / tf.k;
            return (
              <g key={i} className={"pmap-pin" + (on ? " on" : "")} transform={`translate(${c.x},${c.y})`}
                onClick={() => { if (single && onPickLoc) onPickLoc(single.loc); }}
                role={single ? "button" : undefined}
                tabIndex={single ? 0 : undefined}
                onKeyDown={(e) => { if (single && onPickLoc && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onPickLoc(single.loc); } }}
                aria-label={single ? `${getLocName(single.loc, lang)} (${c.n})` : `${c.items.length}`}
              >
                <circle r={r} />
                <text y={4 / tf.k} style={{ fontSize: `${11 / tf.k}px` }}>{c.n}</text>
              </g>
            );
          })}
        </g>
      </svg>
      <div className="pmap-bar">
        {bbox && (
          <button type="button" className="flt-clear" onClick={reset}>
            {ui("clearFilter", lang)}
          </button>
        )}
        <span className="pmap-hint">{points.length}</span>
      </div>
    </div>
  );
}
