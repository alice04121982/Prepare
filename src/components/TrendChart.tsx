"use client";

import { useId, useState } from "react";
import type { Point } from "@/data/safer-world";

type Props = {
  title: string;
  subtitle?: string;
  data: Point[];
  /** "line" for a continuous series, "bar" for per-decade values. */
  kind: "line" | "bar";
  unit?: string;
  /** How to print values: one decimal, whole number, or compact (12k, 1.5M). */
  valueFormat?: "decimal" | "int" | "compact";
  /** Print the x value as a year or as a decade ("1900s"). */
  xFormat?: "year" | "decade";
  source: { label: string; url: string };
};

const W = 640;
const H = 260;
const PAD = { top: 16, right: 24, bottom: 36, left: 52 };

function niceTicks(max: number, count = 4): number[] {
  const raw = max / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
  // Always run to the first tick at or above the maximum so no mark is clipped.
  const ticks: number[] = [];
  for (let v = 0; ; v += step) {
    ticks.push(Number(v.toFixed(6)));
    if (v >= max) break;
  }
  return ticks;
}

const formats = {
  compact: (v: number) =>
    v >= 1_000_000
      ? `${Number((v / 1_000_000).toFixed(1))}M`
      : v >= 1000
        ? `${Math.round(v / 1000)}k`
        : `${Math.round(v * 10) / 10}`,
  decimal: (v: number) => `${Math.round(v * 10) / 10}`,
  int: (v: number) => `${Math.round(v)}`,
};

export default function TrendChart({ title, subtitle, data, kind, unit = "", valueFormat = "compact", xFormat = "year", source }: Props) {
  const format = formats[valueFormat];
  const formatX = (x: number) => (xFormat === "decade" ? (x >= 2020 ? `${x}s so far` : `${x}s`) : String(x));
  const id = useId();
  const [hover, setHover] = useState<number | null>(null);
  const [table, setTable] = useState(false);

  const xs = data.map((d) => d[0]);
  const ys = data.map((d) => d[1]);
  const xMin = Math.min(...xs);
  const xMax = kind === "bar" ? Math.max(...xs) + 10 : Math.max(...xs);
  const ticks = niceTicks(Math.max(...ys));
  const yMax = ticks[ticks.length - 1];
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const sx = (x: number) => PAD.left + ((x - xMin) / (xMax - xMin)) * plotW;
  const sy = (y: number) => PAD.top + plotH - (y / yMax) * plotH;

  const first = data[0];
  const last = data[data.length - 1];
  const xTicks = kind === "bar" ? xs.filter((_, i) => i % 2 === 0) : [xMin, Math.round((xMin + xMax) / 2 / 10) * 10, last[0]];

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    let best = 0;
    let bestD = Infinity;
    data.forEach((d, i) => {
      const cx = kind === "bar" ? sx(d[0] + 5) : sx(d[0]);
      const dd = Math.abs(cx - x);
      if (dd < bestD) {
        bestD = dd;
        best = i;
      }
    });
    setHover(best);
  };

  const hv = hover === null ? null : data[hover];

  return (
    <figure className="rounded-card bg-surface p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <p className="font-heading text-lg font-medium text-heading">{title}</p>
          {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
        </div>
        <button
          type="button"
          onClick={() => setTable((t) => !t)}
          className="text-xs text-muted underline underline-offset-4 hover:text-accent"
          aria-pressed={table}
        >
          {table ? "Show chart" : "Show table"}
        </button>
      </figcaption>

      {table ? (
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted">
              <th className="py-1 pr-4 font-medium">{kind === "bar" ? "Decade" : "Year"}</th>
              <th className="py-1 font-medium">{unit || "Value"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {data.map(([x, y]) => (
              <tr key={x}>
                <td className="py-1 pr-4">{formatX(x)}</td>
                <td className="py-1 tabular-nums">{format(y)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="relative mt-3">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full"
            role="img"
            aria-labelledby={`${id}-t`}
            onMouseMove={onMove}
            onMouseLeave={() => setHover(null)}
          >
            <title id={`${id}-t`}>{title}</title>
            {ticks.map((t) => (
              <g key={t}>
                <line x1={PAD.left} x2={W - PAD.right} y1={sy(t)} y2={sy(t)} stroke="var(--line)" strokeWidth={1} />
                <text x={PAD.left - 8} y={sy(t)} textAnchor="end" dominantBaseline="middle" fontSize={11} fill="var(--muted)">
                  {format(t)}
                </text>
              </g>
            ))}
            {xTicks.map((t) => (
              <text key={t} x={kind === "bar" ? sx(t + 5) : sx(t)} y={H - PAD.bottom + 18} textAnchor="middle" fontSize={11} fill="var(--muted)">
                {formatX(t)}
              </text>
            ))}

            {kind === "line" ? (
              <>
                <path
                  d={data.map(([x, y], i) => `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`).join(" ")}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d={`${data.map(([x, y], i) => `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`).join(" ")} L${sx(last[0]).toFixed(1)},${sy(0)} L${sx(first[0]).toFixed(1)},${sy(0)} Z`}
                  fill="var(--accent)"
                  fillOpacity={0.08}
                />
                {[first, last].map(([x, y]) => (
                  <circle key={x} cx={sx(x)} cy={sy(y)} r={4} fill="var(--accent)" stroke="var(--surface)" strokeWidth={2} />
                ))}
                <text
                  x={sx(first[0]) + 8}
                  y={sy(first[1]) < PAD.top + 16 ? sy(first[1]) + 18 : sy(first[1]) - 8}
                  fontSize={12}
                  fill="var(--foreground)"
                  fontWeight={500}
                >
                  {format(first[1])}
                  {unit ? ` ${unit}` : ""}
                </text>
                <text
                  x={sx(last[0]) - 6}
                  y={sy(last[1]) < PAD.top + 16 ? sy(last[1]) + 18 : sy(last[1]) - 10}
                  textAnchor="end"
                  fontSize={12}
                  fill="var(--foreground)"
                  fontWeight={500}
                >
                  {format(last[1])}
                  {unit ? ` ${unit}` : ""}
                </text>
              </>
            ) : (
              data.map(([x, y], i) => {
                const bw = Math.min(24, (plotW / data.length) * 0.7);
                const cx = sx(x + 5);
                const top = sy(y);
                const h = sy(0) - top;
                const r = Math.min(4, h);
                return (
                  <path
                    key={x}
                    d={`M${cx - bw / 2},${sy(0)} V${top + r} a${r},${r} 0 0 1 ${r},-${r} H${cx + bw / 2 - r} a${r},${r} 0 0 1 ${r},${r} V${sy(0)} Z`}
                    fill="var(--accent)"
                    fillOpacity={hover === null || hover === i ? 1 : 0.5}
                  />
                );
              })
            )}

            {hv ? (
              <line
                x1={kind === "bar" ? sx(hv[0] + 5) : sx(hv[0])}
                x2={kind === "bar" ? sx(hv[0] + 5) : sx(hv[0])}
                y1={PAD.top}
                y2={H - PAD.bottom}
                stroke="var(--muted)"
                strokeWidth={1}
              />
            ) : null}
            {hv && kind === "line" ? (
              <circle cx={sx(hv[0])} cy={sy(hv[1])} r={5} fill="var(--accent)" stroke="var(--surface)" strokeWidth={2} />
            ) : null}
          </svg>
          {hv ? (
            <div
              className="pointer-events-none absolute top-2 rounded-lg bg-heading px-3 py-1.5 text-xs text-on-forest shadow"
              style={{
                left: `${(((kind === "bar" ? sx(hv[0] + 5) : sx(hv[0])) / W) * 100).toFixed(1)}%`,
                transform: "translateX(-50%)",
              }}
            >
              <span className="opacity-80">{formatX(hv[0])}</span> · {format(hv[1])}
              {unit ? ` ${unit}` : ""}
            </div>
          ) : null}
        </div>
      )}
      <p className="mt-3 text-xs text-muted">
        Source:{" "}
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-accent">
          {source.label}
        </a>
      </p>
    </figure>
  );
}
