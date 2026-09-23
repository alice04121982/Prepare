"use client";

import { useState } from "react";
import Arrow from "@/components/home/Arrow";

const durations = [
  { value: 3, label: "3 days", note: "the government minimum" },
  { value: 7, label: "1 week" },
  { value: 14, label: "2 weeks" },
];

/** One tap for a household that does not want to fill the form in yet. Plain links, so they work without JavaScript. */
const examples = [
  { label: "two adults, three days", href: "/build-your-kit?a=2&c=0&d=3" },
  { label: "a family of four, one week", href: "/build-your-kit?a=2&c=2&d=7" },
];

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

const rowClass =
  "grid grid-cols-[1fr_auto] items-center gap-3 border-b border-ink px-4.5 py-3 min-[900px]:px-7";

/**
 * The homepage quantity panel. The drinking water figure follows the fields
 * live, using the planner's rule: 3 litres per person per day for every adult
 * and child, plus 2 litres a day for each baby's feeds. Submitting carries the
 * household into the full planner.
 */
export default function KitShortcut() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [days, setDays] = useState(3);
  const litres = 3 * (adults + children) * days + 2 * babies * days;
  const who = [
    plural(adults, "adult", "adults"),
    children ? plural(children, "child", "children") : null,
    babies ? plural(babies, "baby", "babies") : null,
  ]
    .filter(Boolean)
    .join(", ");
  const howLong = durations.find((d) => d.value === days)?.label ?? plural(days, "day", "days");

  const counters = [
    { id: "home-adults", name: "a", label: "Adults", value: adults, set: setAdults, options: range(1, 12) },
    { id: "home-children", name: "c", label: "Children (3 to 17)", value: children, set: setChildren, options: range(0, 12) },
    { id: "home-babies", name: "b", label: "Under 3s", value: babies, set: setBabies, options: range(0, 6) },
  ];

  return (
    <form
      id="kit"
      action="/build-your-kit"
      method="get"
      className="max-w-[560px] border-[3px] border-ink min-[900px]:grid min-[900px]:max-w-[980px] min-[900px]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] min-[900px]:grid-rows-[auto_1fr_auto]"
    >
      <div className="border-b-[10px] border-ink px-4.5 pb-3.5 pt-4 min-[900px]:col-span-full min-[900px]:px-7 min-[900px]:pb-4.5 min-[900px]:pt-5.5">
        <h2 id="kit-h" className="text-[clamp(2rem,8.6vw,4rem)]">
          how much for your household?
        </h2>
      </div>

      <div className="min-[900px]:col-start-1 min-[900px]:row-start-2 min-[900px]:border-r-[3px] min-[900px]:border-ink">
        {counters.map((c) => (
          <div key={c.id} className={rowClass}>
            <label htmlFor={c.id} className="font-extrabold">{c.label}</label>
            <select
              id={c.id}
              name={c.name}
              value={c.value}
              onChange={(e) => c.set(Number(e.target.value))}
              className="field min-w-22"
            >
              {c.options.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        ))}
        <fieldset className="border-b border-ink px-4.5 pb-4 pt-3 min-[900px]:border-b-0 min-[900px]:px-7">
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
                  className="flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-[4px] border-2 border-ink px-3.5 font-bold hover:bg-[var(--hover)] peer-checked:border-[4px] peer-checked:bg-hush peer-checked:px-3 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ink"
                >
                  <span>{d.label}</span>
                  {d.note ? <small className="text-sm font-normal">{d.note}</small> : null}
                </label>
              </div>
            ))}
          </div>
          <p className="mt-2.5 text-sm text-ink-2">Any other number of days on the next page.</p>
        </fieldset>
      </div>

      <div className="border-b-[10px] border-ink px-4.5 pb-4 pt-3.5 min-[900px]:col-start-2 min-[900px]:row-span-2 min-[900px]:row-start-2 min-[900px]:border-b-0 min-[900px]:px-7 min-[900px]:py-5.5">
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
          3 litres per person per day to drink, the top of the World Health
          Organisation&rsquo;s 2.5 to 3 litre minimum, as{" "}
          <a href="https://prepare.campaign.gov.uk/get-prepared-for-emergencies/">quoted by gov.uk</a>
          {babies ? ". Plus 2 litres a day for each baby's feeds." : "."}
        </p>
      </div>

      <div className="px-4.5 py-4 min-[900px]:col-start-1 min-[900px]:row-start-3 min-[900px]:border-r-[3px] min-[900px]:border-t min-[900px]:border-ink min-[900px]:px-7">
        <button type="submit" className="btn btn-primary btn-lg w-full">
          see the full list <Arrow />
        </button>
        <p className="mt-3 text-[0.9375rem]">
          Or go straight to a list for{" "}
          {examples.map((e, i) => (
            <span key={e.href}>
              {i > 0 ? " or " : null}
              <a href={e.href} className="font-bold">{e.label}</a>
            </span>
          ))}
          .
        </p>
      </div>
    </form>
  );
}
