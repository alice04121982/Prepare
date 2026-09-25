"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, ShoppingBasket } from "lucide-react";
import AmazonBasketButton, { basketLabel } from "@/components/AmazonBasketButton";
import { kitLineKey } from "@/data/have-map";
import { amazonImageByAsin, amazonImageUrl, amazonProductUrl, type Product } from "@/data/products";
import { BOTTLED_DAYS, DURATIONS, buildPack, packTotals } from "@/data/packs";
import TickBox from "@/components/TickBox";
import { catBgFor } from "@/components/kit/categories";
import { useHave } from "@/lib/have";

import { AMAZON_TAG as TAG } from "@/lib/amazon";

const externalLink =
  "mt-2 inline-flex min-h-11 items-center gap-1.5 font-extrabold underline underline-offset-4 hover:decoration-4";

/**
 * The product photo, from Amazon. Uses the recorded image id when there is
 * one, otherwise the Associates image link by ASIN. If the photo will not
 * load (blocked, or the listing has gone), the plain basket tile shows.
 */
function ProductImage({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  // An image that failed before hydration never fires onError for React.
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) {
    return (
      <div aria-hidden className="flex aspect-square items-center justify-center border border-ink bg-hush text-ink-2">
        <ShoppingBasket size={32} strokeWidth={1.5} />
      </div>
    );
  }
  return (
    <a
      href={amazonProductUrl(product.asin, TAG)}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="flex aspect-square items-center justify-center border border-ink bg-paper p-2"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        src={product.image ? amazonImageUrl(product.image, 400) : amazonImageByAsin(product.asin, TAG)}
        alt={product.name}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="max-h-full max-w-full object-contain"
      />
    </a>
  );
}

function Swatch({ category }: { category: string }) {
  return (
    <span
      aria-hidden="true"
      className={`${catBgFor(category)} mt-[0.3em] inline-block h-3.5 w-3.5 flex-none border-2 border-ink`}
    />
  );
}

/**
 * Everything in one complete pack, grouped by category, so a reader can see
 * what the homepage button will put in their Amazon basket before pressing
 * it. Uses the same rules and the same "already have" record as the homepage.
 *
 * Every product starts ticked. Unticking one leaves it out of this basket
 * only; it is not written to the "already have" record, because not wanting
 * something is not the same as owning it. What is left out lives in the URL
 * (`x`, a list of ASINs), like the planner, so a shared link keeps it.
 */
export default function BasketItems({
  people,
  days,
  initialLeftOut,
}: {
  people: number;
  days: number;
  initialLeftOut: string[];
}) {
  const { have } = useHave();
  const pack = useMemo(() => buildPack(people, days, (id) => have.has(kitLineKey(id))), [people, days, have]);
  const [leftOut, setLeftOut] = useState<Set<string>>(() => new Set(initialLeftOut));
  const chosen = pack.buys.filter((b) => !leftOut.has(b.product.asin));
  const totals = packTotals(chosen);
  // Only codes that are rows in this pack go back into links.
  const leftOutHere = pack.buys.map((b) => b.product.asin).filter((a) => leftOut.has(a));
  const hrefFor = (d: number, x: string[]) => `/basket?p=${people}&d=${d}${x.length ? `&x=${x.join(",")}` : ""}`;
  const categories = [...new Set(pack.buys.map((b) => b.line.category))];

  const update = (next: Set<string>) => {
    setLeftOut(next);
    const x = pack.buys.map((b) => b.product.asin).filter((a) => next.has(a));
    try {
      window.history.replaceState(null, "", hrefFor(days, x));
    } catch {
      // The page still works; the link just will not carry the choice.
    }
  };
  const toggle = (asin: string) => {
    const next = new Set(leftOut);
    if (next.has(asin)) next.delete(asin);
    else next.add(asin);
    update(next);
  };

  return (
    <div className="wrap grid gap-12 pb-20 pt-10 min-[900px]:grid-cols-[minmax(0,1fr)_22rem] min-[900px]:gap-14 min-[900px]:pb-26 min-[900px]:pt-14">
      <div className="min-w-0">
        <nav aria-label="Other lengths of time" className="flex flex-wrap gap-2">
          {DURATIONS.map((d) => (
            <Link
              key={d.days}
              href={hrefFor(d.days, leftOutHere)}
              aria-current={d.days === days ? "page" : undefined}
              className={`btn ${d.days === days ? "btn-primary" : "btn-secondary"} min-h-11 px-4 no-underline`}
              scroll={false}
            >
              {d.label}
            </Link>
          ))}
        </nav>

        {pack.buys.length ? (
          <p className="mt-6 max-w-[60ch]">Untick anything you do not want.</p>
        ) : null}

        {days > BOTTLED_DAYS ? (
          <p className="mt-6 max-w-[60ch] border-l-4 border-ink pl-4">
            Bottled water covers the first week: {pack.bottledLitres} litres. After that, fill the containers from
            the tap while it runs. Purifying tablets, or boiling for a minute, make other water safe to drink.
          </p>
        ) : null}

        {categories.map((c) => (
          <section key={c} className="mt-10" aria-labelledby={`cat-${c}`}>
            <h2 id={`cat-${c}`} className="h-sub flex items-center gap-2.5">
              <Swatch category={c} />
              {c.toLowerCase()}
            </h2>
            <ul className="mt-3 border-t-[3px] border-ink">
              {pack.buys
                .filter((b) => b.line.category === c)
                .map(({ line, product, quantity, cost }) => {
                  const inBasket = !leftOut.has(product.asin);
                  return (
                  <li
                    key={product.asin}
                    className="grid grid-cols-[2.75rem_5rem_minmax(0,1fr)] gap-x-3 border-b border-ink py-4 min-[900px]:grid-cols-[2.75rem_7.5rem_minmax(0,1fr)] min-[900px]:gap-x-6"
                  >
                    <TickBox
                      id={`in-${product.asin}`}
                      checked={inBasket}
                      onChange={() => toggle(product.asin)}
                      label={`${product.name}: in the basket`}
                    />
                    <div className={inBasket ? undefined : "opacity-40 grayscale"}>
                      <ProductImage product={product} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.9375rem] font-bold leading-snug text-ink-2">{line.item}</p>
                      <p
                        className={`mt-1 text-lg font-extrabold leading-snug ${inBasket ? "" : "line-through decoration-2"}`}
                      >
                        {product.name}
                      </p>
                      <p className="mt-1 text-ink-2 tabular-nums">
                        {inBasket ? (
                          <>
                            {quantity} &times; {product.priceBand}, about &pound;{Math.round(cost)}
                          </>
                        ) : (
                          <>Left out of the basket</>
                        )}
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
                  );
                })}
            </ul>
          </section>
        ))}

        {pack.elsewhere.length ? (
          <section className="mt-12" aria-labelledby="elsewhere-h">
            <h2 id="elsewhere-h" className="h-sub">
              also on your list, not in the basket
            </h2>
            <p className="mt-2 max-w-[60ch]">
              Some of these are not things to buy online. For the rest, what you already have usually does.
            </p>
            <ul className="mt-4 border-t-[3px] border-ink">
              {pack.elsewhere.map((l) => (
                <li key={l.id} className="border-b border-ink py-3.5">
                  <p className="flex items-start gap-2 font-extrabold leading-snug">
                    <Swatch category={l.category} />
                    {l.item}
                  </p>
                  <p className="mt-1 max-w-[60ch] pl-5.5 text-[0.9375rem] text-ink-2">
                    {l.quantity ? `${l.quantity} ` : ""}
                    {l.unit}
                    {l.freeOption ? `. ${l.freeOption}` : "."}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <aside className="order-first self-start border-[3px] border-ink min-[900px]:order-none min-[900px]:sticky min-[900px]:top-10">
        <div className="border-b-[3px] border-ink px-4.5 py-4">
          <p className="font-extrabold">Estimated total</p>
          <p
            className="display mt-1 text-[3rem] tabular-nums leading-none"
            style={{ fontVariationSettings: '"wdth" 115' }}
          >
            &pound;{totals.estimate}
          </p>
          <p className="mt-2 text-sm text-ink-2">
            {chosen.length} {chosen.length === 1 ? "product" : "products"}. From the middle of each price band. Prices change, so this is a guide.
          </p>
          <dl className="mt-3 grid gap-1 border-y border-ink py-2.5 text-[0.9375rem] tabular-nums">
            <div className="flex justify-between gap-3">
              <dt>Food, water and supplies</dt>
              <dd className="whitespace-nowrap font-extrabold">about &pound;{totals.supplies}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Kit you buy once (torches, radio)</dt>
              <dd className="whitespace-nowrap font-extrabold">about &pound;{totals.kitOnce}</dd>
            </div>
          </dl>
        </div>
        <div className="px-4.5 py-4">
          {chosen.length ? (
            <AmazonBasketButton items={chosen.map((b) => ({ asin: b.product.asin, quantity: b.quantity }))}>
              {basketLabel(chosen.length)}
            </AmazonBasketButton>
          ) : pack.buys.length ? (
            <p>Nothing is ticked. Tick a product to add it to the basket.</p>
          ) : (
            <p>You have ticked off everything the basket would hold.</p>
          )}
          {leftOutHere.length ? (
            <button
              type="button"
              onClick={() => update(new Set())}
              className="mt-3 min-h-11 font-extrabold underline underline-offset-4 hover:decoration-4"
            >
              Tick everything again
            </button>
          ) : null}
          <p className="mt-3 text-sm leading-snug">
            Already have some of this?{" "}
            <Link href="/checklist" className="font-bold">
              Mark it on the checklist
            </Link>{" "}
            and it leaves the basket.
          </p>
          <p className="mt-3 text-[0.8125rem] leading-snug text-ink-2">
            As an Amazon Associate we earn from qualifying purchases.
          </p>
        </div>
      </aside>
    </div>
  );
}
