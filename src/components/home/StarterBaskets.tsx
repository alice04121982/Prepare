"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AmazonBasketButton, { basketLabel } from "@/components/AmazonBasketButton";
import { kitLineKey } from "@/data/have-map";
import { MAX_DAYS, MIN_DAYS, defaultHousehold, householdToQuery } from "@/data/kit-rules";
import { listForDays } from "@/data/lists";
import { DURATIONS, buildPack } from "@/data/packs";
import { useHave } from "@/lib/have";

const MAX_PEOPLE = 12;

/** The kits page, opened on this many people and days. */
const kitHref = (people: number, days: number) =>
  `/kits${householdToQuery({ ...defaultHousehold, adults: people, days, list: listForDays(days) })}`;

const stepClass =
  "grid h-12 w-12 place-items-center rounded-[4px] border-[3px] border-ink text-2xl font-extrabold leading-none hover:bg-[var(--hover)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

/**
 * The hero's quick route to a complete kit: say how many people live with
 * you and for how long, and Amazon opens with everything in one basket. Each
 * pack is the planner's whole list for that household (see src/data/packs.ts),
 * less anything ticked off on the checklist. Past the four set lengths,
 * any whole number of days from MIN_DAYS to MAX_DAYS can be typed in.
 */
export default function StarterBaskets() {
  const [people, setPeople] = useState(2);
  const [days, setDays] = useState(3);
  // What is typed in the days box, kept apart from `days` so a half-typed or
  // out-of-range number never replaces the last good choice.
  const [typed, setTyped] = useState("");
  const { have } = useHave();

  const owned = (id: string) => have.has(kitLineKey(id));
  const packs = useMemo(
    () => DURATIONS.map((d) => buildPack(people, d.days, (id) => have.has(kitLineKey(id)))),
    [people, have],
  );
  const preset = packs.find((p) => p.days === days);
  const chosen = preset ?? buildPack(people, days, owned);
  const url = chosen.buys.length > 0;

  function onTyped(value: string) {
    setTyped(value);
    const n = Number(value);
    if (Number.isInteger(n) && n >= MIN_DAYS && n <= MAX_DAYS) setDays(n);
  }

  return (
    <section
      id="hero-actions"
      aria-labelledby="kit-h"
      className="mt-9 border-[3px] border-ink min-[900px]:mt-2"
    >
      <div className="border-b-[10px] border-ink px-4.5 pb-3.5 pt-4 min-[900px]:px-6">
        <h2
          id="kit-h"
          className="display text-[clamp(1.75rem,6vw,2.25rem)] leading-none"
          style={{ fontVariationSettings: '"wdth" 115' }}
        >
          buy a ready-made kit
        </h2>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-ink px-4.5 py-3.5 min-[900px]:px-6">
        <p id="people-label" className="text-lg font-extrabold">
          People in your home
        </p>
        <div role="group" aria-labelledby="people-label" className="flex items-center gap-2">
          <button
            type="button"
            className={stepClass}
            onClick={() => setPeople((n) => Math.max(1, n - 1))}
            disabled={people <= 1}
            aria-label="One fewer person"
          >
            &minus;
          </button>
          <output
            aria-live="polite"
            className="display w-12 text-center text-[2.25rem] tabular-nums"
            style={{ fontVariationSettings: '"wdth" 115' }}
          >
            {people}
          </output>
          <button
            type="button"
            className={stepClass}
            onClick={() => setPeople((n) => Math.min(MAX_PEOPLE, n + 1))}
            disabled={people >= MAX_PEOPLE}
            aria-label="One more person"
          >
            +
          </button>
        </div>
      </div>

      <fieldset className="px-4.5 pb-4 pt-3.5 min-[900px]:px-6">
        <legend className="float-left mb-3 w-full text-lg font-extrabold">How long for</legend>
        <div className="clear-both grid grid-cols-2 gap-2">
          {packs.map((p) => {
            const d = DURATIONS.find((x) => x.days === p.days)!;
            return (
              <div
                key={p.days}
                className="flex h-full flex-col rounded-[4px] border-2 border-ink hover:bg-[var(--hover)] has-checked:bg-hush has-checked:shadow-[inset_0_0_0_2px_var(--ink)] has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-ink"
              >
                <input
                  type="radio"
                  name="days"
                  id={`pack-${p.days}`}
                  value={p.days}
                  checked={days === p.days}
                  onChange={() => {
                    setDays(d.days);
                    setTyped("");
                  }}
                  className="sr-only"
                />
                <label htmlFor={`pack-${p.days}`} className="flex flex-1 cursor-pointer flex-col justify-between px-3 pt-2.5">
                  <span
                    className="display text-[1.75rem] leading-none"
                    style={{ fontVariationSettings: '"wdth" 115' }}
                  >
                    {d.label}
                  </span>
                  <span className="mt-1.5 text-sm font-bold leading-snug">
                    {p.buys.length ? `about £${p.estimate}` : "nothing left to add"}
                    {"note" in d ? <span className="block font-normal">{d.note}</span> : null}
                  </span>
                </label>
                <Link href={kitHref(people, p.days)} className="flex min-h-11 items-center px-3 text-sm font-extrabold">
                  what is in it<span className="sr-only"> for {d.label}</span>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <label htmlFor="kit-days" className="text-[0.9375rem] font-bold">
            Or a number of days
          </label>
          <input
            id="kit-days"
            type="number"
            inputMode="numeric"
            min={MIN_DAYS}
            max={MAX_DAYS}
            step={1}
            value={typed}
            onChange={(e) => onTyped(e.target.value)}
            aria-describedby="kit-days-hint"
            className="field h-12 w-24 text-lg tabular-nums"
          />
          <span id="kit-days-hint" className="text-sm text-ink-2">
            {MIN_DAYS} to {MAX_DAYS}
          </span>
          {!preset ? (
            <Link href={kitHref(people, days)} className="flex min-h-11 items-center text-sm font-extrabold">
              what is in it<span className="sr-only"> for {days} days</span>
            </Link>
          ) : null}
        </div>
      </fieldset>

      <div className="border-t border-ink px-4.5 pb-4.5 pt-3.5 min-[900px]:px-6">
        {url ? (
          <>
            <dl className="grid gap-1 border-b border-ink pb-2.5 text-[0.9375rem] tabular-nums">
              <div className="flex justify-between gap-3">
                <dt>Food, water and supplies</dt>
                <dd className="whitespace-nowrap font-extrabold">about &pound;{chosen.supplies}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Kit you buy once (torches, radio)</dt>
                <dd className="whitespace-nowrap font-extrabold">about &pound;{chosen.kitOnce}</dd>
              </div>
            </dl>
            <AmazonBasketButton
              items={chosen.buys.map((b) => ({ asin: b.product.asin, quantity: b.quantity }))}
              className="mt-4"
              note="Amazon opens and asks you to confirm. We earn a small commission, at no extra cost to you."
            >
              {basketLabel(chosen.buys.length)}
            </AmazonBasketButton>
          </>
        ) : (
          <p className="text-[0.9375rem]">
            You have ticked off everything a basket would hold.{" "}
            <Link href={kitHref(people, days)} className="font-bold">
              See what is left
            </Link>
            .
          </p>
        )}
      </div>
    </section>
  );
}
