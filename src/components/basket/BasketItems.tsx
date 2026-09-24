"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ExternalLink, ShoppingBasket } from "lucide-react";
import { amazonBasketUrl } from "@/data/kit-rules";
import { kitLineKey } from "@/data/have-map";
import { amazonImageUrl, amazonProductUrl } from "@/data/products";
import { BOTTLED_DAYS, DURATIONS, buildPack } from "@/data/packs";
import { catBgFor } from "@/components/kit/categories";
import { useHave } from "@/lib/have";

const TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;

const externalLink =
  "mt-2 inline-flex min-h-11 items-center gap-1.5 font-extrabold underline underline-offset-4 hover:decoration-4";

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
 */
export default function BasketItems({ people, days }: { people: number; days: number }) {
  const { have } = useHave();
  const pack = useMemo(() => buildPack(people, days, (id) => have.has(kitLineKey(id))), [people, days, have]);
  const url = amazonBasketUrl(
    pack.buys.map((b) => ({ asin: b.product.asin, quantity: b.quantity })),
    TAG,
  );
  const categories = [...new Set(pack.buys.map((b) => b.line.category))];

  return (
    <div className="wrap grid gap-12 pb-20 pt-10 min-[900px]:grid-cols-[minmax(0,1fr)_22rem] min-[900px]:gap-14 min-[900px]:pb-26 min-[900px]:pt-14">
      <div className="min-w-0">
        <nav aria-label="Other lengths of time" className="flex flex-wrap gap-2">
          {DURATIONS.map((d) => (
            <Link
              key={d.days}
              href={`/basket?p=${people}&d=${d.days}`}
              aria-current={d.days === days ? "page" : undefined}
              className={`btn ${d.days === days ? "btn-primary" : "btn-secondary"} min-h-11 px-4 no-underline`}
              scroll={false}
            >
              {d.label}
            </Link>
          ))}
        </nav>

        {days > BOTTLED_DAYS ? (
          <p className="mt-6 max-w-[60ch] border-l-4 border-ink pl-4">
            Bottled water covers the first week: {pack.bottledLitres} litres. A month of bottled water would be
            hundreds of litres, and water cuts rarely last that long. After the first week, fill the containers
            from the tap while it runs. The tablets, or boiling for a minute, make any other water safe.
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
                .map(({ line, product, quantity, cost }) => (
                  <li
                    key={product.asin}
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
                      <p className="text-[0.9375rem] font-bold leading-snug text-ink-2">{line.item}</p>
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
            &pound;{pack.estimate}
          </p>
          <p className="mt-2 text-sm text-ink-2">
            {pack.buys.length} products. From the middle of each price band. Prices change, so this is a guide.
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
              send it all to my Amazon basket
            </a>
          ) : (
            <p>You have ticked off everything the basket would hold.</p>
          )}
          <p className="mt-3 text-sm leading-snug text-ink-2">
            Opens Amazon with every product on this page in your basket. You check it and pay there.
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
