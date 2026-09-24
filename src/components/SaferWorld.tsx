"use client";

import { useEffect, useState } from "react";
import type { Point } from "@/data/safer-world";

type Country = { code: string; name: string };
type Series = { code: string; name: string; child: Point[]; life: Point[]; poverty: Point[]; disasters: Point[] };

type Measure = {
  key: "child" | "life" | "poverty" | "disasters";
  title: string;
  /** How a single value reads in words, e.g. "4 in 100". */
  say: (v: number) => string;
  /** Bars for per-decade figures, a line for everything else. */
  kind: "line" | "bars";
  /**
   * The scale never tops out below this, so a country where the figure is
   * already near zero draws near zero instead of stretching noise to full height.
   */
  minScale?: number;
  /** Shown under the world chart only. */
  note?: string;
};

const round = (v: number) => (v >= 10 ? Math.round(v) : Math.round(v * 10) / 10);
const sig2 = (v: number) => {
  if (v < 100) return Math.round(v).toLocaleString("en-GB");
  const p = 10 ** (Math.floor(Math.log10(v)) - 1);
  return (Math.round(v / p) * p).toLocaleString("en-GB");
};

const MEASURES: Measure[] = [
  { key: "child", title: "children dying before 5", say: (v) => (v < 1 ? "under 1 in 100" : `${round(v)} in 100`), kind: "line", minScale: 10 },
  { key: "life", title: "life expectancy at birth", say: (v) => `${Math.round(v)} years`, kind: "line" },
  { key: "poverty", title: "people in extreme poverty", say: (v) => (v < 1 ? "under 1 in 100" : `${round(v)} in 100`), kind: "line", minScale: 10 },
  {
    key: "disasters",
    title: "deaths a year from disasters",
    say: (v) => sig2(v),
    kind: "bars",
    note: "Average per year in each decade. The world has four times the people it had in the 1920s.",
  },
];

/** One small multiple: the figure then and now in quantity type, then the shape in ink. */
function Chart({ m, points, place, isWorld }: { m: Measure; points: Point[]; place: string; isWorld: boolean }) {
  if (points.length < 2) {
    return (
      <figure className="border-[3px] border-ink bg-paper">
        <figcaption className="border-b-[10px] border-ink px-4 py-3 font-extrabold">{m.title}</figcaption>
        <p className="px-4 py-5 text-ink-2">No long record for {place}.</p>
      </figure>
    );
  }
  const first = points[0];
  const last = points[points.length - 1];
  const W = 320;
  const H = 130;
  const PL = 4;
  const PR = 4;
  const PT = 10;
  const PB = 3;
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const yMax = Math.max(Math.max(...ys) * 1.05, m.minScale ?? 0) || 1;
  const X = (yr: number) => PL + ((yr - x0) / (x1 - x0 || 1)) * (W - PL - PR);
  const Y = (v: number) => PT + (1 - v / yMax) * (H - PT - PB);
  const base = H - PB;
  const line = points.map((p) => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ");
  const barW = Math.max(4, ((W - PL - PR) / points.length) * 0.62);

  return (
    <figure className="border-[3px] border-ink bg-paper">
      <div className="border-b-[10px] border-ink px-4 pb-3 pt-3">
        <figcaption className="text-[0.9375rem] font-extrabold">{m.title}</figcaption>
        <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 tabular-nums">
          <span className="text-lg font-bold text-ink-2 line-through decoration-2">{m.say(first[1])}</span>
          <span className="sr-only">in {first[0]}, now</span>
          <span
            className="display text-[clamp(1.75rem,7vw,2.25rem)] leading-none"
            style={{ fontVariationSettings: '"wdth" 115' }}
          >
            {m.say(last[1])}
          </span>
        </p>
        <p className="mt-1 text-sm text-ink-2">
          {first[0]} to {last[0]}
          {m.key === "disasters" ? "s" : ""}, {place}
        </p>
      </div>
      <div className="px-4 pb-2 pt-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" aria-hidden="true">
          {m.kind === "line" ? (
            <>
              <polygon points={`${X(first[0])},${base} ${line} ${X(last[0])},${base}`} className="fill-hush" />
              <polyline points={line} fill="none" className="stroke-ink" strokeWidth={3} strokeLinejoin="round" />
              <rect x={X(last[0]) - 5} y={Y(last[1]) - 5} width={10} height={10} className="fill-ink" />
            </>
          ) : (
            points.map((p) => (
              <rect
                key={p[0]}
                x={Math.min(Math.max(X(p[0]) - barW / 2, PL), W - PR - barW)}
                y={Y(p[1])}
                width={barW}
                height={base - Y(p[1])}
                className="fill-ink"
              />
            ))
          )}
          <rect x={0} y={base} width={W} height={3} className="fill-ink" />
        </svg>
        <p aria-hidden="true" className="mt-1.5 flex justify-between text-sm tabular-nums text-ink-2">
          <span>{first[0]}</span>
          <span>
            {last[0]}
            {m.key === "disasters" ? "s" : ""}
          </span>
        </p>
      </div>
      {m.note && isWorld ? <p className="px-4 pb-3 text-sm leading-snug text-ink-2">{m.note}</p> : null}
      <details className="border-t-2 border-ink px-4 py-2.5 text-sm">
        <summary className="cursor-pointer font-bold">Show the figures</summary>
        <table className="mt-2 w-full tabular-nums">
          <thead>
            <tr className="text-left">
              <th scope="col" className="py-1 font-bold">{m.key === "disasters" ? "Decade" : "Year"}</th>
              <th scope="col" className="py-1 text-right font-bold">{m.title}</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p[0]} className="border-t border-ink/20">
                <td className="py-0.5">{p[0]}{m.key === "disasters" ? "s" : ""}</td>
                <td className="py-0.5 text-right">{m.say(p[1])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

/**
 * The "safest time there has ever been" figures on /worried: four measures
 * from Our World in Data as small multiples, with a country selector. The
 * world series is bundled; other countries load from /data/safer/<code>.json.
 * Drawn to DESIGN.md: ink on paper, no category colour (these are not kit
 * categories), 3px frames, quantity type for the numbers.
 */
export default function SaferWorld({ world }: { world: Series }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [code, setCode] = useState(world.code);
  const [fetched, setFetched] = useState<Series | null>(null);

  useEffect(() => {
    fetch("/data/safer/index.json")
      .then((r) => r.json())
      .then((list: Country[]) => setCountries(list.filter((c) => c.code !== world.code && c.code !== "GBR")))
      .catch(() => {
        /* the world figures still show; the list just stays short */
      });
  }, [world.code]);

  useEffect(() => {
    if (code === world.code) return;
    let cancelled = false;
    fetch(`/data/safer/${code}.json`)
      .then((r) => r.json())
      .then((s: Series) => {
        if (!cancelled) setFetched(s);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [code, world.code]);

  const series = code === world.code ? world : fetched && fetched.code === code ? fetched : world;
  const loading = code !== world.code && series.code !== code;
  const place = series.code === world.code ? "the world" : series.name;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="safer-country" className="font-extrabold">
          Show the figures for
        </label>
        <select id="safer-country" value={code} onChange={(e) => setCode(e.target.value)} className="field">
          <option value={world.code}>the world</option>
          <option value="GBR">United Kingdom</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
        <span aria-live="polite" className="text-ink-2">
          {loading ? "Loading" : ""}
        </span>
      </div>
      <div className="mt-6 grid gap-4 min-[700px]:grid-cols-2">
        {MEASURES.map((m) => (
          <Chart key={m.key} m={m} points={series[m.key]} place={place} isWorld={series.code === world.code} />
        ))}
      </div>
      {series.code !== world.code ? (
        <p className="mt-3 text-sm text-ink-2">
          Country records start later and are patchier than the world series. A small country&rsquo;s disaster
          figures can be dominated by one event. The direction is the same almost everywhere.
        </p>
      ) : null}
    </div>
  );
}
