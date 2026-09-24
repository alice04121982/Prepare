"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ExternalLink, ShoppingBasket } from "lucide-react";
import { amazonBasketUrl } from "@/data/kit-rules";
import { kitLineKey } from "@/data/have-map";
import { amazonImageUrl, amazonProductUrl } from "@/data/products";
import { BUDGETS, pickLabel, starterBasket, type Budget } from "@/data/starter-baskets";
import { catBgFor } from "@/components/kit/categories";
import { useHave } from "@/lib/have";

const TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;

const externalLink =
  "mt-2 inline-flex min-h-11 items-center gap-1.5 font-extrabold underline underline-offset-4 hover:decoration-4";

/**
 * Everything in one budget basket, line by line, so a reader can see what
 * the homepage button will put in their Amazon basket before pressing it.
 * Uses the same rules and the same "already have" record as the homepage.
 */
export default function BasketItems({ people, budget }: { people: number; budget: Budget }) {
  const { have } = useHave();
  const basket = useMemo(
    () => starterBasket(people, budget, (id) => have.has(kitLineKey(id))),
    [people, budget, have],
  );
  const url = amazonBasketUrl(
    basket.picks.map((p) => ({ asin: p.product.asin, quantity: p.quantity })),
    TAG,
  );
  const things = basket.picks.reduce((n, p) => n + p.quantity, 0);

  return (
    <div className="wrap grid gap-12 pb-20 pt-10 min-[900px]:grid-cols-[minmax(0,1fr)_22rem] min-[900px]:gap-14 min-[900px]:pb-26 min-[900px]:pt-14">
      <div className="min-w-0">
        <nav aria-label="Other budgets" className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <Link
              key={b}
              href={`/basket?p=${people}&b=${b}`}
              aria-current={b === budget ? "page" : undefined}
              className={`btn ${b === budget ? "btn-primary" : "btn-secondary"} min-h-11 px-4 no-underline`}
              scroll={false}
            >
              &pound;{b}
            </Link>
          ))}
        </nav>

        {basket.picks.length ? (
          <ul className="mt-8 border-t-[3px] border-ink">
            {basket.picks.map(({ line, product, quantity, cost }) => (
              <li
                key={line.id}
                className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 border-b border-ink py-4 min-[900px]:grid-cols-[7.5rem_minmax(0,1fr)] min-[900px]:gap-x-6"
              >
                {product.image ? (
                  <a
                    href={amazonProductUrl(product.asin, TAG)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex aspect-square items-center justify-center border border-ink bg-paper p-2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={amazonImageUrl(product.image, 400)}
                      alt={product.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain"
                    />
                  </a>
                ) : (
                  <div aria-hidden className="flex aspect-square items-center justify-center border border-ink bg-hush text-ink-2">
                    <ShoppingBasket size={32} strokeWidth={1.5} />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="flex items-start gap-2 text-[0.9375rem] font-bold leading-snug text-ink-2">
                    <span
                      aria-hidden="true"
                      className={`${catBgFor(line.category)} mt-[0.3em] inline-block h-3.5 w-3.5 flex-none border-2 border-ink`}
                    />
                    {line.item}
                  </p>
                  <p className="mt-1 text-lg font-extrabold leading-snug">{product.name}</p>
                  <p className="mt-1 text-ink-2 tabular-nums">
                    {quantity} &times; {product.priceBand}, about &pound;{Math.round(cost)}
                  </p>
                  <a
                    href={amazonProductUrl(product.asin, TAG)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className={externalLink}
                  >
                    View on Amazon <ExternalLink size={14} strokeWidth={2.5} aria-hidden="true" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-lg">
            You have ticked off everything this basket would hold. Water and food are next, and they are cheaper at
            a supermarket.
          </p>
        )}

        {basket.missing.length ? (
          <div className="mt-10">
            <h2 className="h-sub">not in this basket</h2>
            <p className="mt-2 max-w-[60ch]">
              These are on the full list for {people} {people === 1 ? "person" : "people"} but did not fit &pound;
              {budget}: {basket.missing.join(", ")}.
            </p>
          </div>
        ) : null}
      </div>

      <aside className="order-first self-start border-[3px] border-ink min-[900px]:order-none min-[900px]:sticky min-[900px]:top-10">
        <div className="border-b-[3px] border-ink px-4.5 py-4">
          <p className="font-extrabold">Estimated total</p>
          <p
            className="display mt-1 text-[3rem] tabular-nums leading-none"
            style={{ fontVariationSettings: '"wdth" 115' }}
          >
            &pound;{basket.estimate}
          </p>
          <p className="mt-2 text-sm text-ink-2">
            {things} {things === 1 ? "thing" : "things"}. From the middle of each price band. Prices change, so this
            is a guide.
          </p>
        </div>
        <div className="px-4.5 py-4">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn btn-primary btn-lg w-full no-underline"
            >
              <ShoppingBasket size={20} strokeWidth={2.25} aria-hidden="true" />
              fill my Amazon basket
            </a>
          ) : null}
          <p className="mt-3 text-sm leading-snug text-ink-2">
            Opens Amazon with {basket.picks.map(pickLabel).join(", ") || "nothing"} in your basket. You check it and
            pay there.
          </p>
          <p className="mt-3 text-sm leading-snug">
            Already have some of this?{" "}
            <Link href="/checklist" className="font-bold">
              Tick it off first
            </Link>{" "}
            and it leaves the basket.
          </p>
          <p className="mt-3 text-[0.8125rem] leading-snug text-ink-2">
            Some links here earn us a small commission. As an Amazon Associate we earn from qualifying purchases.
          </p>
        </div>
      </aside>
    </div>
  );
}
