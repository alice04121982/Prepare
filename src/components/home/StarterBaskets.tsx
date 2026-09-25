"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AmazonBasketButton, { basketLabel, COMMISSION_NOTE as NOTE } from "@/components/AmazonBasketButton";
import { kitLineKey } from "@/data/have-map";
import { defaultHousehold, householdToQuery } from "@/data/kit-rules";
import { listForDays } from "@/data/lists";
import { DURATIONS, buildPack } from "@/data/packs";
import type { Tier } from "@/data/products";
import { TierPicker } from "@/components/kit/TierPicker";
import { LengthTiles } from "@/components/kit/LengthTiles";
import KitDrawer from "@/components/home/KitDrawer";
import { useHave } from "@/lib/have";

const MAX_PEOPLE = 12;
const TIERS: Tier[] = ["budget", "regular", "premium"];

/** The kits page, opened on this many people and days. */
const kitHref = (people: number, days: number, tier: Tier) =>
  `/kits${householdToQuery({
    ...defaultHousehold,
    adults: people,
    days,
    list: listForDays(days),
    ...(tier === "regular" ? {} : { tier }),
  })}`;

const stepClass =
  "grid h-12 w-12 place-items-center rounded-[4px] border-[3px] border-ink text-2xl font-extrabold leading-none hover:bg-[var(--hover)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

/**
 * The hero's quick route to a complete kit: say how many people live with
 * you and for how long, and Amazon opens with everything in one basket. Each
 * pack is the planner's whole list for that household (see src/data/packs.ts),
 * less anything ticked off on the checklist. Past the four set lengths,
 * any whole number of days from MIN_DAYS to MAX_DAYS can be typed in. The
 * price range (budget, regular, premium) picks which products fill it.
 */
export default function StarterBaskets() {
  const [people, setPeople] = useState(2);
  const [days, setDays] = useState(3);
  const [tier, setTier] = useState<Tier>("regular");
  const [drawer, setDrawer] = useState(false);
  const { have } = useHave();

  const owned = (id: string) => have.has(kitLineKey(id));
  const packs = useMemo(
    () => DURATIONS.map((d) => buildPack(people, d.days, (id) => have.has(kitLineKey(id)), tier)),
    [people, have, tier],
  );
  const lengthEstimates = Object.fromEntries(packs.map((p) => [p.days, p.estimate]));
  const preset = packs.find((p) => p.days === days);
  const chosen = preset ?? buildPack(people, days, owned, tier);
  // The same household and length in each range, for the picker's totals.
  const estimates = Object.fromEntries(
    TIERS.map((t) => [t, t === tier ? chosen.estimate : buildPack(people, days, owned, t).estimate]),
  ) as Record<Tier, number>;
  const url = chosen.buys.length > 0;

  return (
    <section id="hero-actions" aria-labelledby="kit-h" className="border-[3px] border-ink">
      <div className="border-b-[10px] border-ink px-4.5 pb-3.5 pt-4 min-[900px]:px-6">
        <h2
          id="kit-h"
          className="display text-[clamp(1.75rem,6vw,2.25rem)] leading-none"
          style={{ fontVariationSettings: '"wdth" 115' }}
        >
          buy a ready-made kit
        </h2>
      </div>

      <div className="min-[900px]:grid min-[900px]:grid-cols-[auto_minmax(0,2fr)_minmax(0,1.2fr)] min-[1200px]:grid-cols-[auto_minmax(0,2.6fr)_minmax(0,1fr)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-ink px-4.5 py-3.5 min-[900px]:flex-col min-[900px]:flex-nowrap min-[900px]:items-start min-[900px]:justify-start min-[900px]:border-b-0 min-[900px]:border-r min-[900px]:px-6">
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

        <fieldset className="px-4.5 pb-4 pt-3.5 min-[900px]:border-r min-[900px]:border-ink min-[900px]:px-6">
          <legend className="float-left mb-3 w-full text-lg font-extrabold">How long for</legend>
          <div className="clear-both">
            <LengthTiles days={days} onChange={setDays} estimates={lengthEstimates} wide />
          </div>
        </fieldset>

        <div className="border-t border-ink min-[900px]:border-t-0">
          <TierPicker value={tier} onChange={setTier} estimates={estimates} />
        </div>
      </div>

      <div className="border-t border-ink px-4.5 pb-4.5 pt-3.5 min-[900px]:grid min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] min-[900px]:items-start min-[900px]:gap-x-10 min-[900px]:px-6 min-[900px]:pt-4.5">
        {url ? (
          <>
            <div>
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
              <button
                type="button"
                onClick={() => setDrawer(true)}
                aria-haspopup="dialog"
                className="flex min-h-11 w-full items-center justify-between gap-3 border-b border-ink text-left font-extrabold hover:bg-[var(--hover)]"
              >
                <span>
                  See what is in it <span className="font-normal tabular-nums">({chosen.buys.length} products)</span>
                </span>
                <span aria-hidden="true" className="text-xl leading-none">
                  &rarr;
                </span>
              </button>
            </div>
            <AmazonBasketButton
              items={chosen.buys.map((b) => ({ asin: b.product.asin, quantity: b.quantity }))}
              className="mt-4 min-[900px]:mt-0"
              note={NOTE}
            >
              {basketLabel(chosen.buys.length)}
            </AmazonBasketButton>
          </>
        ) : (
          <p className="text-[0.9375rem] min-[900px]:col-span-2">
            You have ticked off everything a basket would hold.{" "}
            <Link href={kitHref(people, days, tier)} className="font-bold">
              See what is left
            </Link>
            .
          </p>
        )}
      </div>
      <KitDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        title={`${DURATIONS.find((d) => d.days === days)?.label ?? `${days} days`} for ${people} ${people === 1 ? "person" : "people"}`}
        detail={`${chosen.buys.length} products, ${tier} price range. Anything ticked on the checklist is left out.`}
        buys={chosen.buys}
        supplies={chosen.supplies}
        kitOnce={chosen.kitOnce}
        editHref={kitHref(people, days, tier)}
        note={NOTE}
      />
    </section>
  );
}
