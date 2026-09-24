"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ShoppingBasket } from "lucide-react";
import { amazonBasketUrl } from "@/data/kit-rules";
import { kitLineKey } from "@/data/have-map";
import { BUDGETS, pickLabel, starterBasket, type Budget } from "@/data/starter-baskets";
import { useHave } from "@/lib/have";

const TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;
const MAX_PEOPLE = 12;

const stepClass =
  "grid h-12 w-12 place-items-center rounded-[4px] border-[3px] border-ink text-2xl font-extrabold leading-none hover:bg-[var(--hover)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

/**
 * The hero's quick route to a basket: say how many people live with you, pick
 * a budget, and Amazon opens with the things in it. Each basket is the
 * planner's list for that household, cut to the budget (see
 * src/data/starter-baskets.ts), less anything ticked off on the checklist.
 */
export default function StarterBaskets() {
  const [people, setPeople] = useState(2);
  const [budget, setBudget] = useState<Budget>(50);
  const { have } = useHave();

  const baskets = useMemo(
    () => BUDGETS.map((b) => starterBasket(people, b, (id) => have.has(kitLineKey(id)))),
    [people, have],
  );
  const chosen = baskets.find((b) => b.budget === budget) ?? baskets[0];
  const url = amazonBasketUrl(
    chosen.picks.map((p) => ({ asin: p.product.asin, quantity: p.quantity })),
    TAG,
  );
  const things = chosen.picks.reduce((n, p) => n + p.quantity, 0);

  return (
    <div id="hero-actions" className="mt-7 border-[3px] border-ink min-[900px]:mt-10">
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
        <legend className="float-left mb-3 w-full text-lg font-extrabold">Choose a budget</legend>
        <div className="clear-both grid grid-cols-2 gap-2 min-[560px]:grid-cols-4">
          {baskets.map((b) => {
            const count = b.picks.reduce((n, p) => n + p.quantity, 0);
            return (
              <div key={b.budget}>
                <input
                  type="radio"
                  name="budget"
                  id={`budget-${b.budget}`}
                  value={b.budget}
                  checked={budget === b.budget}
                  onChange={() => setBudget(b.budget)}
                  className="peer sr-only"
                />
                <label
                  htmlFor={`budget-${b.budget}`}
                  className="flex h-full min-h-22 cursor-pointer flex-col justify-between rounded-[4px] border-2 border-ink px-3 py-2.5 hover:bg-[var(--hover)] peer-checked:border-[4px] peer-checked:bg-hush peer-checked:px-2.5 peer-checked:py-2 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ink"
                >
                  <span
                    className="display text-[2rem] tabular-nums leading-none"
                    style={{ fontVariationSettings: '"wdth" 115' }}
                  >
                    &pound;{b.budget}
                  </span>
                  <span className="mt-1.5 text-sm font-bold leading-snug">
                    {count ? `${count} ${count === 1 ? "thing" : "things"}, about £${b.estimate}` : "nothing left to add"}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <div className="border-t border-ink px-4.5 pb-4.5 pt-3.5 min-[900px]:px-6">
        {url ? (
          <>
            <p className="font-extrabold">
              In the &pound;{chosen.budget} basket for {people} {people === 1 ? "person" : "people"}
            </p>
            <p aria-live="polite" className="mt-1 text-[0.9375rem] leading-snug">
              {chosen.picks.map(pickLabel).join(", ")}.
              {chosen.leftOut
                ? ` ${chosen.leftOut} more ${chosen.leftOut === 1 ? "thing" : "things"} on the full list did not fit.`
                : ""}
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn btn-primary btn-lg mt-4 w-full no-underline"
            >
              <ShoppingBasket size={20} strokeWidth={2.25} aria-hidden="true" />
              fill my Amazon basket
            </a>
            <p className="mt-3 text-sm leading-snug text-ink-2">
              Opens Amazon with these {things} {things === 1 ? "thing" : "things"} in your basket. You check it
              and pay there, and nothing is bought until you do. Prices change, so the totals are a guide.
            </p>
          </>
        ) : (
          <p className="text-[0.9375rem]">
            You have ticked off everything a basket would hold. Water and food are next, and they are cheaper
            at a supermarket.
          </p>
        )}
        <p className="mt-3 text-sm leading-snug">
          Already have some of this?{" "}
          <Link href="/checklist" className="font-bold">
            Tick it off first
          </Link>{" "}
          and it leaves the basket. Or{" "}
          <Link href={`/build-your-kit?a=${people}&c=0&d=3`} className="font-bold">
            build the full list
          </Link>
          , with water and food.
        </p>
        <p className="mt-3 text-[0.8125rem] leading-snug text-ink-2">
          Some links here earn us a small commission. As an Amazon Associate we earn from qualifying purchases.
        </p>
      </div>
    </div>
  );
}
