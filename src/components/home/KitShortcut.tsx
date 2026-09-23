"use client";

import { useState } from "react";

const durations = [
  { value: 3, label: "3 days", note: "the government minimum" },
  { value: 7, label: "1 week" },
  { value: 14, label: "2 weeks" },
];

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/**
 * The homepage quantity panel. The drinking water figure follows the
 * selects live, using the planner's rule: 3 litres per person per day for
 * every adult and child.
 */
export default function KitShortcut() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [days, setDays] = useState(3);
  const litres = 3 * (adults + children) * days;
  const who = [plural(adults, "adult", "adults"), children ? plural(children, "child", "children") : null]
    .filter(Boolean)
    .join(", ");
  const howLong = durations.find((d) => d.value === days)?.label ?? `${days} days`;

  return (
    <form
      id="kit"
      action="/build-your-kit"
      method="get"
      className="max-w-[560px] border-[3px] border-ink min-[900px]:grid min-[900px]:max-w-[980px] min-[900px]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
    >
      <div className="border-b-[10px] border-ink px-4.5 pb-3.5 pt-4 min-[900px]:col-span-full min-[900px]:px-7 min-[900px]:pb-4.5 min-[900px]:pt-5.5">
        <h2 id="kit-h" className="text-[clamp(2rem,8.6vw,4rem)]">
          how much for your household?
        </h2>
      </div>
      <div className="min-[900px]:border-r-[3px] min-[900px]:border-ink">
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-ink px-4.5 py-3 min-[900px]:px-7">
          <label htmlFor="home-adults" className="font-extrabold">Adults</label>
          <select
            id="home-adults"
            name="a"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="field min-w-22"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-ink px-4.5 py-3 min-[900px]:px-7">
          <label htmlFor="home-children" className="font-extrabold">Children</label>
          <select
            id="home-children"
            name="c"
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="field min-w-22"
          >
            {[0, 1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <fieldset className="border-b border-ink px-4.5 pb-4 pt-3 min-[900px]:px-7">
          <legend className="float-left mb-2.5 w-full font-extrabold">How long</legend>
          <div className="clear-both grid gap-2">
            {durations.map((d) => (
              <div key={d.value}>
                <input
                  type="radio"
                  name="d"
                  id={`home-d${d.value}`}
                  value={d.value}
                  checked={days === d.value}
                  onChange={() => setDays(d.value)}
                  className="peer sr-only"
                />
                <label
                  htmlFor={`home-d${d.value}`}
                  className="flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-[4px] border-2 border-ink px-3.5 font-bold hover:bg-[var(--hover)] peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ink"
                >
                  {d.label}
                  {d.note ? <small className="text-sm font-normal">{d.note}</small> : null}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
        <div className="border-b-[10px] border-ink px-4.5 py-4 min-[900px]:border-b-0 min-[900px]:px-7">
          <button type="submit" className="btn btn-primary btn-lg w-full">
            work it out
          </button>
        </div>
      </div>
      <div className="px-4.5 pb-4 pt-3.5 min-[900px]:px-7 min-[900px]:py-5.5">
        <p className="border-b-4 border-ink pb-1.5 text-[0.9375rem] font-extrabold">Drinking water</p>
        <dl aria-live="polite">
          <div className="flex items-baseline justify-between gap-3 border-b border-ink pb-1.5 pt-2.5">
            <dt className="font-bold">
              {who}, {howLong}
            </dt>
            <dd
              className="display whitespace-nowrap text-[2rem] tabular-nums min-[900px]:text-[3.5rem]"
              style={{ fontVariationSettings: '"wdth" 115' }}
            >
              {litres} <small className="text-base font-bold tracking-normal">litres</small>
            </dd>
          </div>
        </dl>
        <p className="mt-2.5 text-sm text-ink-2">
          3 litres per person per day, the gov.uk figure.
        </p>
      </div>
    </form>
  );
}
