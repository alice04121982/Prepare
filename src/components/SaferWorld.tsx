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
  /** What the measure means, shown under every chart. */
  definition?: string;
  /** Shown under the world chart only. */
  note?: string;
};

const round = (v: number) => (v >= 10 ? Math.round(v) : Math.round(v * 10) / 10);

const MEASURES: Measure[] = [
  { key: "child", title: "children dying before 5", say: (v) => (v < 1 ? "under 1 in 100" : `${round(v)} in 100`), kind: "line" },
  { key: "life", title: "life expectancy at birth", say: (v) => `${Math.round(v)} years`, kind: "line" },
  {
    key: "poverty",
    title: "people in extreme poverty",
    say: (v) => (v < 1 ? "under 1 in 100" : `${round(v)} in 100`),
    kind: "line",
    definition: "Extreme poverty means living on less than $3 a day, at 2021 prices.",
    note: "1820 to 1980 are historical estimates; 1990 on are World Bank figures. 2025 and 2026 are World Bank projections.",
  },
  {
    key: "disasters",
    title: "deaths from disasters, per 100,000 people",
    say: (v) => (v < 1 ? `${v.toFixed(1)} a year` : `${Math.round(v)} a year`),
    kind: "bars",
    note: "Average per year in each decade, divided by the world's population then, so the rise from 2 billion people to 8 billion is taken into account.",
  },
];

/** One small multiple: the figure then and now in quantity type, then the shape in ink. */
/**
 * Disaster deaths for a single country are not charted. Country records are
 * patchy before the 1960s and heatwave deaths were only counted from the
 * 2000s, so 143 of 218 countries show a rising line that is mostly better
 * counting. The world series is long enough to be fair; a country gets this
 * explanation instead, and the UK gets what to do about heat.
 */
function DisasterContext({ isUK }: { isUK: boolean }) {
  return (
    <figure className="border-[3px] border-ink bg-paper">
      <div className="border-b-[10px] border-ink px-4 pb-3 pt-3">
        <figcaption className="text-[0.9375rem] font-extrabold">deaths from disasters</figcaption>
        <p
          className="display mt-1.5 text-[clamp(1.75rem,7vw,2.25rem)] leading-none"
          style={{ fontVariationSettings: '"wdth" 115' }}
        >
          see the world chart
        </p>
      </div>
      <div className="grid gap-3 px-4 py-4 text-[0.9375rem] leading-relaxed">
        <p>
          We do not chart this country by country. Country records are patchy before the 1960s, and deaths in
          heatwaves have only been counted since the 2000s. So a single country&rsquo;s chart mostly shows better
          counting, not more danger. The world figures are the fairer picture: for each person alive, deaths
          from disasters have fallen by about 98% since the 1920s.
        </p>
        {isUK ? (
          <p>
            In the UK, recent disaster deaths are almost all from heatwaves, in 2020 and 2022. They mostly affect
            older people, and most are preventable: keep rooms cool, drink water, and check on older neighbours
            in hot weather.{" "}
            <a
              href="https://www.nhs.uk/conditions/heat-exhaustion-heatstroke/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              NHS advice on heat
            </a>
            .
          </p>
        ) : null}
      </div>
    </figure>
  );
}

function Chart({ m, points, place, isWorld }: { m: Measure; points: Point[]; place: string; isWorld: boolean }) {
  if (m.key === "disasters" && !isWorld) {
    return <DisasterContext isUK={place === "United Kingdom"} />;
  }
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
  const vals = points.map((p) => p[1]);
  const lo = Math.min(...vals);
  const hi = Math.max(...vals);

  // A near-zero, near-flat series is a fact, not a trend: say it in words
  // instead of stretching a 0.2 to 0.5 wobble across a whole chart.
  if (m.kind === "line" && hi < 2 && hi - lo < 2) {
    return (
      <figure className="border-[3px] border-ink bg-paper">
        <div className="border-b-[10px] border-ink px-4 pb-3 pt-3">
          <figcaption className="text-[0.9375rem] font-extrabold">{m.title}</figcaption>
          <p
            className="display mt-1.5 text-[clamp(1.75rem,7vw,2.25rem)] leading-none"
            style={{ fontVariationSettings: '"wdth" 115' }}
          >
            under {Math.ceil(hi)} in 100
          </p>
          <p className="mt-1 text-sm text-ink-2">
            {first[0]} to {last[0]}, {place}
          </p>
        </div>
        <p className="px-4 py-4 text-[0.9375rem] leading-relaxed">
          This has been under {Math.ceil(hi)} in 100 in every year on record since {first[0]}. The line would sit
          flat along the bottom, so there is nothing to chart.
        </p>
        {m.definition ? <p className="px-4 pb-3 text-sm leading-snug text-ink-2">{m.definition}</p> : null}
      </figure>
    );
  }

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
  const yMax = Math.max(...ys) * 1.05 || 1;
  const X = (yr: number) => PL + ((yr - x0) / (x1 - x0 || 1)) * (W - PL - PR);
  const Y = (v: number) => PT + (1 - v / yMax) * (H - PT - PB);
  const base = H - PB;
  // Break the line where the record has a gap of more than 40 years, and
  // bridge it with a dotted line, so centuries with no data are not drawn as
  // if known. Early estimates published every 30 or so years stay joined:
  // that spacing is how historians publish them, not a hole in the record.
  const GAP = 40;
  const runs: Point[][] = [];
  points.forEach((p, i) => {
    if (i === 0 || p[0] - points[i - 1][0] > GAP) runs.push([p]);
    else runs[runs.length - 1].push(p);
  });
  const pts = (run: Point[]) => run.map((p) => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ");
  const hasGap = runs.length > 1;
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
              {runs.map((run) => (
                <g key={run[0][0]}>
                  {run.length > 1 ? (
                    <polygon
                      points={`${X(run[0][0])},${base} ${pts(run)} ${X(run[run.length - 1][0])},${base}`}
                      className="fill-hush"
                    />
                  ) : null}
                  {run.length > 1 ? (
                    <polyline points={pts(run)} fill="none" className="stroke-ink" strokeWidth={3} strokeLinejoin="round" />
                  ) : (
                    <rect x={X(run[0][0]) - 4} y={Y(run[0][1]) - 4} width={8} height={8} className="fill-ink" />
                  )}
                </g>
              ))}
              {runs.slice(1).map((run, i) => {
                const prev = runs[i][runs[i].length - 1];
                return (
                  <line
                    key={`gap-${run[0][0]}`}
                    x1={X(prev[0])}
                    y1={Y(prev[1])}
                    x2={X(run[0][0])}
                    y2={Y(run[0][1])}
                    className="stroke-ink"
                    strokeWidth={2.5}
                    strokeDasharray="2 6"
                    strokeLinecap="round"
                  />
                );
              })}
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
      {hasGap ? (
        <p className="px-4 pb-2 text-sm leading-snug text-ink-2">The dotted line crosses years with no record.</p>
      ) : null}
      {m.definition ? <p className="px-4 pb-2 text-sm leading-snug text-ink-2">{m.definition}</p> : null}
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
          Country records start later and are patchier than the world series. The direction is the same almost
          everywhere.
        </p>
      ) : null}
    </div>
  );
}
