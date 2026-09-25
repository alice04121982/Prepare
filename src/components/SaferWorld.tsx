"use client";

import { useEffect, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { Point } from "@/data/safer-world";
import { catBg, type Cat } from "@/components/PageIntro";

type Country = { code: string; name: string };
type Series = {
  code: string;
  name: string;
  child: Point[];
  life: Point[];
  poverty: Point[];
  water?: Point[];
  elec?: Point[];
  disasters: Point[];
  /** World only; see the conflict measure. */
  conflict?: Point[];
};

type Measure = {
  key: "child" | "life" | "poverty" | "water" | "elec" | "disasters" | "conflict";
  title: string;
  /** How a single value reads in words, e.g. "4 in 100". */
  say: (v: number) => string;
  /** How the top of the scale is labelled. */
  axis: (v: number) => string;
  /**
   * The scale never tops out below this. Without it a country where poverty
   * moves between 0.1 and 0.3 in 100 draws survey noise as a jagged climb.
   */
  minTop?: number;
  /** Bars for per-decade figures, a line for everything else. */
  kind: "line" | "bars";
  /** What the measure means, shown under every chart. */
  definition?: string;
  /** Shown under the world chart only. */
  note?: string;
  /** Shown under a single country's chart only. */
  countryNote?: string;
  /** Charted for the world only; a country gets this reason instead. */
  worldOnly?: string;
  /**
   * The kit category this measure is about, named in the chart head and
   * filling the area under the line. Measures that name no category stay ink.
   */
  cat?: Cat;
};

/** Area fill for each category that a chart can name. */
const catFill: Partial<Record<Cat, string>> = {
  water: "fill-cat-water",
  power: "fill-cat-power",
  health: "fill-cat-health",
};

/** "12 in 100", or "everyone" once the share rounds to 100. */
const reach = (v: number) => (v >= 99.5 ? "everyone" : `${Math.round(v)} in 100`);
/** A yearly rate per 100,000 people. */
const perYear = (v: number) =>
  v === 0 ? "none recorded" : v < 0.1 ? "under 0.1 a year" : v < 1 ? `${v.toFixed(1)} a year` : `${Math.round(v)} a year`;

const round = (v: number) => (v >= 10 ? Math.round(v) : Math.round(v * 10) / 10);

const MEASURES: Measure[] = [
  {
    key: "child",
    title: "children dying before 5",
    say: (v) => (v < 1 ? "under 1 in 100" : `${round(v)} in 100`),
    axis: (v) => `${v} in 100`,
    kind: "line",
    minTop: 5,
    cat: "health",
  },
  {
    key: "life",
    title: "life expectancy at birth",
    say: (v) => `${Math.round(v)} years`,
    axis: (v) => `${v} years`,
    kind: "line",
    cat: "health",
  },
  {
    key: "poverty",
    title: "people in extreme poverty",
    say: (v) => (v < 1 ? "under 1 in 100" : `${round(v)} in 100`),
    axis: (v) => `${v} in 100`,
    kind: "line",
    minTop: 5,
    definition: "Extreme poverty means living on less than $3 a day, at 2021 prices.",
    note: "1820 to 1980 are historical estimates; 1990 on are World Bank figures. 2025 and 2026 are World Bank projections.",
  },
  {
    key: "water",
    title: "people with clean drinking water",
    say: reach,
    axis: (v) => `${v} in 100`,
    kind: "line",
    minTop: 100,
    cat: "water",
    definition:
      "At least a basic supply: a safe source no more than a 30-minute round trip away. WHO and UNICEF figures.",
  },
  {
    key: "elec",
    title: "people with electricity at home",
    say: reach,
    axis: (v) => `${v} in 100`,
    kind: "line",
    minTop: 100,
    cat: "power",
    definition: "World Bank figures, from household surveys.",
  },
  {
    key: "disasters",
    title: "deaths from disasters, per 100,000 people",
    say: perYear,
    axis: (v) => `${v} a year`,
    kind: "bars",
    note: "Average per year in each decade, divided by the world's population then, so the rise from 2 billion people to 8 billion is taken into account.",
    countryNote:
      "Average per year in each decade, divided by the population then. Country records are thin before the 1960s, and deaths in heatwaves have only been counted since the 2000s, so part of any recent rise is better counting.",
  },
  {
    key: "conflict",
    title: "deaths in wars and conflicts, per 100,000 people",
    say: perYear,
    axis: (v) => `${v} a year`,
    kind: "line",
    definition:
      "Soldiers and civilians killed in fighting where at least one side is a government. Deaths from hunger and disease caused by war are not counted.",
    note: "1920 to 1945 from the Conflict Catalogue; 1946 to 2020 from PRIO and UCDP; 2022 and 2023 from UCDP. There is no comparable figure for 2021, so the line joins 2020 to 2022.",
    worldOnly:
      "Shown for the world only. The country records we can use end in 2018, before the wars of the last few years, so they would give a false picture.",
  },
];

/** At least this many years show on every chart; years with no record are dotted. */
const SPAN = 100;

/** The smallest of 1, 2, 2.5, 5 or 7.5 times a power of ten that is at least v. */
function niceMax(v: number) {
  if (v <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  const n = v / p;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : n <= 7.5 ? 7.5 : 10;
  return Math.round(step * p * 1000) / 1000;
}

function HeatNote() {
  return (
    <p className="px-4 pb-2 text-sm leading-snug">
      In the UK, recent disaster deaths are almost all from heatwaves, in 2020 and 2022. They mostly affect older
      people, and most are preventable: keep rooms cool, drink water, and check on older neighbours in hot weather.{" "}
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
  );
}

/**
 * One small multiple: the figure then and now in quantity type, then the
 * shape in ink. Every chart spans at least 100 years; where the record starts
 * later, a dotted line holds the first figure back to the start, and gaps of
 * more than 40 years are dotted too. Pointer, touch and arrow keys read out
 * any year; the table under it holds every figure.
 */
function Chart({ m, points, place, isWorld }: { m: Measure; points: Point[]; place: string; isWorld: boolean }) {
  const [active, setActive] = useState<number | null>(null);

  if (m.worldOnly && !isWorld) {
    return (
      <figure className="border-[3px] border-ink bg-paper">
        <figcaption className="border-b-[10px] border-ink px-4 py-3 font-extrabold">{m.title}</figcaption>
        <p className="px-4 py-5 text-[0.9375rem] leading-relaxed">{m.worldOnly}</p>
      </figure>
    );
  }

  if (points.length < 2) {
    return (
      <figure className="border-[3px] border-ink bg-paper">
        <figcaption className="border-b-[10px] border-ink px-4 py-3 font-extrabold">{m.title}</figcaption>
        <p className="px-4 py-5 text-ink-2">No long record for {place}.</p>
      </figure>
    );
  }
  const decades = m.key === "disasters";
  const s = decades ? "s" : "";
  const first = points[0];
  const last = points[points.length - 1];

  const W = 320;
  const H = 130;
  const PL = 4;
  const PR = 4;
  const PT = 6;
  const PB = 3;
  const x1 = last[0];
  const x0 = Math.min(first[0], x1 - SPAN);
  const yTop = niceMax(Math.max(m.minTop ?? 0, ...points.map((p) => p[1])));
  const Y = (v: number) => PT + (1 - v / yTop) * (H - PT - PB);
  const base = H - PB;
  // Decades are drawn as slots, one bar in the middle of each.
  const slots = decades ? Math.round((x1 - x0) / 10) + 1 : 0;
  const slot = decades ? (W - PL - PR) / slots : 0;
  const X = decades
    ? (yr: number) => PL + (Math.round((yr - x0) / 10) + 0.5) * slot
    : (yr: number) => PL + ((yr - x0) / (x1 - x0 || 1)) * (W - PL - PR);
  const yearAt = (px: number) =>
    decades ? x0 + Math.floor((px - PL) / slot) * 10 : x0 + ((px - PL) / (W - PL - PR)) * (x1 - x0);

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
  const lead = !decades && first[0] > x0;
  const dotted = lead || runs.length > 1;
  const barW = slot * 0.62;

  const nearest = (yr: number) =>
    points.reduce((best, p, i) => (Math.abs(p[0] - yr) < Math.abs(points[best][0] - yr) ? i : best), 0);
  const fromPointer = (e: PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setActive(nearest(yearAt(((e.clientX - r.left) / r.width) * W)));
  };
  const onKey = (e: KeyboardEvent<SVGSVGElement>) => {
    const i = active ?? points.length - 1;
    const next =
      e.key === "ArrowLeft" || e.key === "ArrowDown"
        ? Math.max(0, i - 1)
        : e.key === "ArrowRight" || e.key === "ArrowUp"
          ? Math.min(points.length - 1, i + 1)
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? points.length - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
  };
  const shown = active === null ? null : points[active];
  const valueText = (p: Point) => `${p[0]}${s}: ${m.say(p[1])}`;

  return (
    <figure className="border-[3px] border-ink bg-paper">
      <div className="border-b-[10px] border-ink px-4 pb-3 pt-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <figcaption className="text-[0.9375rem] font-extrabold">{m.title}</figcaption>
          {m.cat ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-extrabold">
              <span data-cat aria-hidden="true" className={`size-3.5 border-2 border-ink ${catBg[m.cat]}`} />
              {m.cat}
            </span>
          ) : null}
        </div>
        <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 tabular-nums">
          {m.say(first[1]) === m.say(last[1]) ? (
            <span className="sr-only">in {first[0]}{s} and now</span>
          ) : (
            <>
              <span className="text-lg font-bold text-ink-2 line-through decoration-2">{m.say(first[1])}</span>
              <span className="sr-only">in {first[0]}{s}, now</span>
            </>
          )}
          <span
            className="display text-[clamp(1.75rem,7vw,2.25rem)] leading-none"
            style={{ fontVariationSettings: '"wdth" 115' }}
          >
            {m.say(last[1])}
          </span>
        </p>
        <p className="mt-1 text-sm text-ink-2">
          {first[0]}
          {s} to {last[0]}
          {s}, {place}
        </p>
      </div>
      <div className="px-4 pb-2 pt-3">
        <p className="mb-1.5 flex min-h-6 flex-wrap items-baseline justify-between gap-x-3 text-sm tabular-nums">
          <span className="text-ink-2">{m.axis(yTop)}</span>
          <span className="font-extrabold">{shown ? valueText(shown) : <span className="font-normal text-ink-2">Touch or point at the chart to read a year</span>}</span>
        </p>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full cursor-crosshair touch-pan-y focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ink"
          tabIndex={0}
          role="slider"
          aria-label={`${m.title}, ${place}. Use the arrow keys to read each ${decades ? "decade" : "year"}.`}
          aria-valuemin={first[0]}
          aria-valuemax={last[0]}
          aria-valuenow={(shown ?? last)[0]}
          aria-valuetext={valueText(shown ?? last)}
          onPointerMove={fromPointer}
          onPointerDown={fromPointer}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") setActive(null);
          }}
          onKeyDown={onKey}
          onBlur={() => setActive(null)}
        >
          <line x1={0} y1={PT} x2={W} y2={PT} className="stroke-ink" strokeWidth={1} strokeDasharray="1 4" />
          {decades ? (
            points.map((p) => (
              <rect
                key={p[0]}
                x={X(p[0]) - barW / 2}
                y={Y(p[1])}
                width={barW}
                height={base - Y(p[1])}
                className="fill-ink"
              />
            ))
          ) : (
            <>
              {runs.map((run) => (
                <g key={run[0][0]}>
                  {run.length > 1 ? (
                    <polygon
                      points={`${X(run[0][0])},${base} ${pts(run)} ${X(run[run.length - 1][0])},${base}`}
                      {...(m.cat ? { "data-cat": true } : {})}
                      className={(m.cat && catFill[m.cat]) || "fill-hush"}
                    />
                  ) : null}
                  {run.length > 1 ? (
                    <polyline points={pts(run)} fill="none" className="stroke-ink" strokeWidth={3} strokeLinejoin="round" />
                  ) : (
                    <rect x={X(run[0][0]) - 4} y={Y(run[0][1]) - 4} width={8} height={8} className="fill-ink" />
                  )}
                </g>
              ))}
              {lead ? (
                <line
                  x1={X(x0)}
                  y1={Y(first[1])}
                  x2={X(first[0])}
                  y2={Y(first[1])}
                  className="stroke-ink"
                  strokeWidth={2.5}
                  strokeDasharray="2 6"
                  strokeLinecap="round"
                />
              ) : null}
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
          )}
          {shown ? (
            <g pointerEvents="none">
              <line x1={X(shown[0])} y1={PT} x2={X(shown[0])} y2={base} className="stroke-ink" strokeWidth={1.5} />
              <rect
                x={X(shown[0]) - 6}
                y={Y(shown[1]) - 6}
                width={12}
                height={12}
                className="fill-paper stroke-ink"
                strokeWidth={3}
              />
            </g>
          ) : null}
          <rect x={0} y={base} width={W} height={3} className="fill-ink" />
        </svg>
        <p aria-hidden="true" className="mt-1.5 flex justify-between text-sm tabular-nums text-ink-2">
          <span>
            {x0}
            {s}
          </span>
          <span>
            {x1}
            {s}
          </span>
        </p>
      </div>
      {dotted ? (
        <p className="px-4 pb-2 text-sm leading-snug text-ink-2">
          The dotted line marks years with no record{lead ? `; there is none for ${place} before ${first[0]}` : ""}.
        </p>
      ) : null}
      {m.definition ? <p className="px-4 pb-2 text-sm leading-snug text-ink-2">{m.definition}</p> : null}
      {isWorld && m.note ? <p className="px-4 pb-2 text-sm leading-snug text-ink-2">{m.note}</p> : null}
      {!isWorld && m.countryNote ? <p className="px-4 pb-2 text-sm leading-snug text-ink-2">{m.countryNote}</p> : null}
      {decades && place === "United Kingdom" ? <HeatNote /> : null}
      <details className="mt-1 border-t-2 border-ink px-4 py-2.5 text-sm">
        <summary className="cursor-pointer font-bold">
          Show the figures<span className="sr-only"> for {m.title}</span>
        </summary>
        <table className="mt-2 w-full tabular-nums">
          <thead>
            <tr className="text-left">
              <th scope="col" className="py-1 font-bold">{decades ? "Decade" : "Year"}</th>
              <th scope="col" className="py-1 text-right font-bold">{m.title}</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p[0]} className="border-t border-ink/20">
                <td className="py-0.5">
                  {p[0]}
                  {s}
                </td>
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
 * The "safest time there has ever been" figures on /worried: seven measures
 * from Our World in Data as small multiples, with a country selector. The
 * world series is bundled; other countries load from /data/safer/<code>.json.
 * Drawn to DESIGN.md: ink on paper, 3px frames, quantity type for the
 * numbers. A measure about a kit category (water, power, health) names it in
 * the head and fills its area with that colour; the rest stay ink on Hush.
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
          <Chart key={`${series.code}-${m.key}`} m={m} points={series[m.key] ?? []} place={place} isWorld={series.code === world.code} />
        ))}
      </div>
      {series.code !== world.code ? (
        <p className="mt-3 text-sm text-ink-2">
          Country records start later and are patchier than the world series. Pick the world again for the long
          view.
        </p>
      ) : null}
    </div>
  );
}
