"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AmazonBasketButton, { basketLabel } from "@/components/AmazonBasketButton";
import { kitLineKey } from "@/data/have-map";
import { BOTTLED_DAYS, DURATIONS, buildPack, durationLabel, type PackDays } from "@/data/packs";
import { useHave } from "@/lib/have";

const MAX_PEOPLE = 12;

const stepClass =
  "grid h-12 w-12 place-items-center rounded-[4px] border-[3px] border-ink text-2xl font-extrabold leading-none hover:bg-[var(--hover)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

/**
 * The hero's quick route to a complete kit: say how many people live with
 * you and for how long, and Amazon opens with everything in one basket. Each
 * pack is the planner's whole list for that household (see src/data/packs.ts),
 * less anything ticked off on the checklist.
 */
export default function StarterBaskets() {
  const [people, setPeople] = useState(2);
  const [days, setDays] = useState<PackDays>(3);
  const { have } = useHave();

  const packs = useMemo(
    () => DURATIONS.map((d) => buildPack(people, d.days, (id) => have.has(kitLineKey(id)))),
    [people, have],
  );
  const chosen = packs.find((p) => p.days === days) ?? packs[0];
  const url = chosen.buys.length > 0;
  const who = `${people} ${people === 1 ? "person" : "people"}`;
  // The planner's drinking water rule: 3 litres per person per day.
  const litres = 3 * people * days;

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
          a ready-made kit
        </h2>
        <p className="mt-2 text-[0.9375rem] leading-snug">
          Choose who it is for and how long it should last.
        </p>
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
                  onChange={() => setDays(d.days)}
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
                <Link href={`/basket?p=${people}&d=${p.days}`} className="flex min-h-11 items-center px-3 text-sm font-extrabold">
                  what is in it<span className="sr-only"> for {d.label}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </fieldset>

      <div className="border-t border-ink px-4.5 pb-4.5 pt-3.5 min-[900px]:px-6">
        {url ? (
          <>
            <p className="font-extrabold">
              Everything for {who} for {durationLabel(days)}
            </p>
            <p aria-live="polite" className="mt-1 text-[0.9375rem] leading-snug">
              {chosen.buys.length} products.
              {days > BOTTLED_DAYS
                ? ` Bottled water covers the first week. After that, you fill the containers from the tap.`
                : ""}
            </p>
            <p className="mt-2 text-[0.9375rem] leading-snug">
              Drinking water: <strong className="tabular-nums">{litres} litres</strong>. That is 3 litres per person
              per day, the figure{" "}
              <a href="https://prepare.campaign.gov.uk/get-prepared-for-emergencies/">quoted by gov.uk</a>.
            </p>
            <dl className="mt-3 grid gap-1 border-y border-ink py-2.5 text-[0.9375rem] tabular-nums">
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
            >
              {basketLabel(chosen.buys.length)}
            </AmazonBasketButton>
          </>
        ) : (
          <p className="text-[0.9375rem]">
            You have ticked off everything a basket would hold.{" "}
            <Link href={`/basket?p=${people}&d=${days}`} className="font-bold">
              See what is left
            </Link>
            .
          </p>
        )}
        <p className="mt-3 text-sm leading-snug">
          Already have some?{" "}
          <Link href="/checklist" className="font-bold">
            Tick it off
          </Link>
        </p>
        <p className="mt-1 text-sm leading-snug">
          Babies, pets or older people?{" "}
          <Link href={`/build-your-kit?a=${people}&c=0&d=${days}`} className="font-bold">
            Plan for your household
          </Link>
        </p>
        <p className="mt-2 text-[0.8125rem] leading-snug text-ink-2">
          As an Amazon Associate we earn from qualifying purchases.
        </p>
      </div>
    </section>
  );
}
