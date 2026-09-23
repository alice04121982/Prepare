"use client";

import { useEffect, useMemo, useState } from "react";
import {
  amazonBasketUrl,
  buildKit,
  defaultHousehold,
  retailers,
  type Household,
  type Retailer,
} from "@/data/kit-rules";
import { ExternalLink, ShoppingBasket } from "lucide-react";
import { amazonImageUrl, amazonProductUrl, productsFor } from "@/data/products";
import Arrow from "@/components/home/Arrow";
import { Counter, OptionRow, TickBox } from "@/components/kit/Controls";
import { catBgFor } from "@/components/kit/categories";

const TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;

function toQuery(h: Household) {
  const q = new URLSearchParams({
    a: String(h.adults),
    c: String(h.children),
    b: String(h.babies),
    e: String(h.over65),
    dogs: String(h.dogs),
    cats: String(h.cats),
    med: h.medicalNeeds ? "1" : "0",
    home: h.homeType,
    d: String(h.days),
  });
  return `?${q.toString()}`;
}

/** Small solid block of a category's label colour. */
function Swatch({ category }: { category: string }) {
  return (
    <span
      aria-hidden="true"
      className={`${catBgFor(category)} mt-[0.3em] inline-block h-3.5 w-3.5 flex-none border-2 border-ink`}
    />
  );
}

const externalLink =
  "inline-flex min-h-11 items-center gap-1.5 font-extrabold underline underline-offset-4 hover:decoration-4";

export default function KitPlanner({ initial }: { initial?: Household }) {
  const [h, setH] = useState<Household>(initial ?? defaultHousehold);
  const [have, setHave] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const [shop, setShop] = useState<Retailer["id"]>("amazon");
  const [tab, setTab] = useState<"list" | "buy">("list");
  const retailer = retailers.find((r) => r.id === shop)!;

  useEffect(() => {
    window.history.replaceState(null, "", toQuery(h));
  }, [h]);

  const { lines, tasks } = useMemo(() => buildKit(h), [h]);
  const categories = useMemo(() => [...new Set(lines.map((l) => l.category))], [lines]);
  const toBuy = lines.filter((l) => !have.has(l.id));
  const picks = toBuy
    .map((l) => ({ line: l, product: productsFor(l.id)[0] }))
    .map(({ line, product }) => ({
      line,
      product,
      buyQty: product ? Math.max(1, Math.ceil(line.quantity / (product.unitsPerProduct ?? 1))) : 0,
    }));
  const withProduct = picks.filter((p) => p.product);
  const basket = amazonBasketUrl(
    withProduct.map((p) => ({ asin: p.product!.asin, quantity: p.buyQty })),
    TAG,
  );
  const asinCount = withProduct.length;

  const set = <K extends keyof Household>(k: K, v: Household[K]) => setH((prev) => ({ ...prev, [k]: v }));
  const toggleHave = (id: string) =>
    setHave((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const plainText = () => {
    const people = h.adults + h.children + h.babies;
    const head = `Stay Prepared shopping list: ${people} ${people === 1 ? "person" : "people"}, ${h.days} days\n${window.location.href}\n`;
    const body = categories
      .map((c) => {
        const items = toBuy.filter((l) => l.category === c);
        if (!items.length) return "";
        return `\n${c}\n` + items.map((l) => `- ${l.quantity ? l.quantity + " " : ""}${l.unit ? l.unit + ": " : ""}${l.item}`).join("\n");
      })
      .join("\n");
    return head + body + "\n\nTo do\n" + tasks.map((t) => `- ${t.text}`).join("\n");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(plainText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable; the print view still works */
    }
  };

  const people = h.adults + h.children + h.babies;

  return (
    <div className="wrap grid gap-12 pb-16 pt-10 min-[900px]:grid-cols-[22rem_minmax(0,1fr)] min-[900px]:gap-14 min-[900px]:pb-26 min-[900px]:pt-16">
      {/* Inputs: the household panel */}
      <aside aria-labelledby="kit-household-h" className="no-print self-start border-[3px] border-ink">
        <div className="border-b-[10px] border-ink px-4.5 pb-3 pt-4 min-[900px]:px-6">
          <h2 id="kit-household-h" className="text-[clamp(1.875rem,8vw,2.5rem)]">
            your household
          </h2>
        </div>
        <Counter label="Adults" value={h.adults} onChange={(v) => set("adults", v)} min={1} />
        <Counter label="Children (3 to 17)" value={h.children} onChange={(v) => set("children", v)} />
        <Counter label="Under 3s" value={h.babies} onChange={(v) => set("babies", v)} />
        <Counter label="Over 65s" value={h.over65} onChange={(v) => set("over65", v)} max={h.adults} />
        <Counter label="Dogs" value={h.dogs} onChange={(v) => set("dogs", v)} />
        <Counter label="Cats" value={h.cats} onChange={(v) => set("cats", v)} />

        <div className="border-b border-ink px-4.5 py-3 min-[900px]:px-6">
          <OptionRow
            type="checkbox"
            id="kit-med"
            checked={h.medicalNeeds}
            onChange={(v) => set("medicalNeeds", v)}
          >
            Regular prescriptions or medical equipment
          </OptionRow>
        </div>

        <fieldset className="border-b border-ink px-4.5 pb-4 pt-3 min-[900px]:px-6">
          <legend className="float-left mb-2.5 w-full font-extrabold">Home</legend>
          <div className="clear-both grid grid-cols-2 gap-2">
            {(["flat", "house"] as const).map((t) => (
              <OptionRow
                key={t}
                type="radio"
                name="kit-home"
                id={`kit-home-${t}`}
                checked={h.homeType === t}
                onChange={() => set("homeType", t)}
              >
                {t === "flat" ? "Flat" : "House"}
              </OptionRow>
            ))}
          </div>
        </fieldset>

        <fieldset className="px-4.5 pb-4.5 pt-3 min-[900px]:px-6">
          <legend className="float-left mb-2.5 w-full font-extrabold">Days of cover</legend>
          <div className="clear-both grid grid-cols-3 gap-2">
            {([3, 7, 14] as const).map((n) => (
              <OptionRow
                key={n}
                type="radio"
                name="kit-days"
                id={`kit-days-${n}`}
                checked={h.days === n}
                onChange={() => set("days", n)}
              >
                {n} days
              </OptionRow>
            ))}
          </div>
          <p className="mt-3 text-[0.9375rem] leading-snug text-ink-2">
            Three days is the government minimum. Seven covers most storms and outages. Fourteen is for a long disruption.
          </p>
        </fieldset>
      </aside>

      {/* The list */}
      <section aria-labelledby="kit-list-h" className="min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
          <div className="min-w-0">
            <h2 id="kit-list-h" className="text-[clamp(2rem,8.6vw,3.5rem)]">
              your list: {people} {people === 1 ? "person" : "people"}, {h.days} days
            </h2>
            <p className="mt-3 max-w-[52ch] text-ink-2">
              Tick anything you already have. It drops off the list. The link in your address bar saves this household.
            </p>
          </div>
          <div className="no-print flex flex-wrap gap-2">
            <button type="button" onClick={copy} className="btn btn-secondary">
              {copied ? "copied" : "copy list"}
            </button>
            <button type="button" onClick={() => window.print()} className="btn btn-secondary">
              print
            </button>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="List or buy"
          className="no-print mt-8 grid grid-cols-2 border-[3px] border-ink min-[900px]:inline-grid"
        >
          {(
            [
              ["list", "your list"],
              ["buy", "buy it"],
            ] as const
          ).map(([id, label], i) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`kit-tab-${id}`}
              aria-selected={tab === id}
              aria-controls={`kit-panel-${id}`}
              onClick={() => setTab(id)}
              className={`min-h-12 whitespace-nowrap px-7 text-[1.0625rem] font-extrabold ${i ? "border-l-[3px] border-ink" : ""} ${tab === id ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-[var(--hover)]"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "buy" ? (
          <section id="kit-panel-buy" role="tabpanel" aria-labelledby="kit-tab-buy" className="no-print mt-8">
            <h3 className="h-sub max-w-[22ch]">pick a shop, see the products, one button to the basket</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {retailers.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setShop(r.id)}
                  aria-pressed={shop === r.id}
                  className={`min-h-11 rounded-[4px] border-2 border-ink px-4 font-bold ${shop === r.id ? "bg-ink text-paper" : "bg-paper hover:bg-[var(--hover)]"}`}
                >
                  {r.name}
                </button>
              ))}
            </div>
            <p className="mt-4 max-w-[60ch] text-ink-2">{retailer.note}</p>

            {shop === "amazon" ? (
              <>
                <ul className="mt-6 border-t-8 border-ink">
                  {picks.map(({ line, product, buyQty }) => (
                    <li
                      key={line.id}
                      className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 border-b border-ink py-4 min-[900px]:grid-cols-[7.5rem_minmax(0,1fr)] min-[900px]:gap-x-6"
                    >
                      {product?.image ? (
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
                          <Swatch category={line.category} />
                          {line.item}
                        </p>
                        {product ? (
                          <>
                            <p className="mt-1 text-lg font-extrabold leading-snug">{product.name}</p>
                            <p className="mt-1 text-ink-2 tabular-nums">
                              {buyQty} × · {product.priceBand}
                              {product.verified ? " · checked by hand" : ""}
                            </p>
                            <a
                              href={amazonProductUrl(product.asin, TAG)}
                              target="_blank"
                              rel="noopener noreferrer sponsored"
                              className={externalLink}
                            >
                              View on Amazon <ExternalLink size={14} strokeWidth={2.5} />
                            </a>
                          </>
                        ) : (
                          <>
                            <p className="mt-1 text-ink-2">
                              <span className="tabular-nums">{line.quantity}</span> {line.unit}. Best bought at a supermarket, or search Amazon.
                            </p>
                            {line.search ? (
                              <a
                                href={retailer.search(line.search)}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className={externalLink}
                              >
                                Search Amazon <ExternalLink size={14} strokeWidth={2.5} />
                              </a>
                            ) : null}
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                {basket ? (
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <a href={basket} target="_blank" rel="noopener noreferrer sponsored" className="btn btn-primary btn-lg no-underline">
                      <ShoppingBasket size={20} strokeWidth={2.25} />
                      Add {asinCount} {asinCount === 1 ? "item" : "items"} to my Amazon basket
                    </a>
                    <p className="max-w-md text-[0.9375rem] leading-snug text-ink-2">
                      Opens Amazon with these {asinCount} products in your basket, in the quantities shown. You check the
                      basket and pay there. Nothing is bought until you choose to. Groceries are on your list; buy those at
                      a supermarket.
                    </p>
                  </div>
                ) : null}
                <p className="mt-5 text-sm text-ink-2">Product photos are shown from Amazon and belong to their sellers.</p>
              </>
            ) : (
              <>
                <ul className="mt-6 border-t-8 border-ink">
                  {picks
                    .filter(({ line }) => line.search)
                    .map(({ line }) => (
                      <li
                        key={line.id}
                        className="grid gap-x-6 border-b border-ink py-3.5 min-[900px]:grid-cols-[minmax(0,1fr)_auto] min-[900px]:items-center"
                      >
                        <div className="min-w-0">
                          <p className="flex items-start gap-2 font-extrabold leading-snug">
                            <Swatch category={line.category} />
                            {line.item}
                          </p>
                          <p className="mt-0.5 text-ink-2">
                            <span className="tabular-nums">{line.quantity}</span> {line.unit}
                          </p>
                        </div>
                        <a
                          href={retailer.search(line.search!)}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className={externalLink}
                        >
                          Find at {retailer.name} <ExternalLink size={14} strokeWidth={2.5} />
                        </a>
                      </li>
                    ))}
                </ul>
                <p className="mt-5 max-w-2xl text-[0.9375rem] leading-snug text-ink-2">
                  {retailer.name} has no way for a website to fill your basket, so it is one click per item: each link opens
                  the search for that item, you add it there. A single basket button for supermarkets needs a partnership
                  with Samsung Food, the service behind BBC Good Food&rsquo;s shoppable recipes, which is on the plan.
                </p>
              </>
            )}
          </section>
        ) : (
          <div id="kit-panel-list" role="tabpanel" aria-labelledby="kit-tab-list" className="mt-8">
            {/* The quantity panel */}
            <div className="border-[3px] border-ink">
              <div className="flex justify-between gap-4 border-b-[10px] border-ink px-3 pb-2 pt-3 text-[0.9375rem] font-extrabold min-[900px]:px-5">
                <span>What to get</span>
                <span>How many</span>
              </div>
              {categories.map((c, gi) => {
                const items = lines.filter((l) => l.category === c);
                return (
                  <section key={c} aria-labelledby={`kit-cat-${gi}`} className={gi ? "border-t-[3px] border-ink" : ""}>
                    <h3
                      id={`kit-cat-${gi}`}
                      data-cat
                      className={`${catBgFor(c)} border-b-[3px] border-ink px-3 pb-2.5 pt-3 text-[1.625rem] lowercase min-[900px]:px-5 min-[900px]:text-[2rem]`}
                    >
                      {c}
                    </h3>
                    <ul className="divide-y divide-ink">
                      {items.map((l) => {
                        const got = have.has(l.id);
                        return (
                          <li
                            key={l.id}
                            className={`grid grid-cols-[2.75rem_minmax(0,1fr)_auto] gap-x-2.5 px-1.5 py-3 break-inside-avoid min-[900px]:gap-x-4 min-[900px]:px-3.5 min-[900px]:py-4 ${got ? "bg-hush" : ""}`}
                          >
                            <TickBox checked={got} onChange={() => toggleHave(l.id)} label={`Already have ${l.item}`} />
                            <div className={`min-w-0 max-w-[62ch] pt-2 ${got ? "text-ink-2" : ""}`}>
                              <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                                <span className={`text-lg font-extrabold leading-tight ${got ? "line-through" : ""}`}>{l.item}</span>
                                {l.priority ? (
                                  <span className="rounded-[3px] bg-ink px-1.5 py-0.5 text-[0.75rem] font-extrabold leading-none text-paper print:border print:border-ink print:bg-paper print:text-ink">
                                    Get first
                                  </span>
                                ) : null}
                              </p>
                              {l.unit ? <p className="mt-0.5 font-bold">{l.unit}</p> : null}
                              <p className="mt-1.5 text-[0.9375rem] leading-snug text-ink-2">{l.basis}</p>
                              {l.freeOption ? (
                                <p className="mt-1.5 text-[0.9375rem] leading-snug">
                                  <span className="font-extrabold">Free option:</span> {l.freeOption}
                                </p>
                              ) : null}
                              {l.products?.length ? (
                                <ul className="no-print mt-2.5 flex flex-wrap gap-2">
                                  {[...l.products]
                                    .sort((a, b) => (a.tier === "budget" ? -1 : b.tier === "budget" ? 1 : 0))
                                    .map((p) => (
                                      <li key={p.name} className="tag font-bold">
                                        {p.url ? (
                                          <a href={p.url} target="_blank" rel="noopener noreferrer sponsored" className="underline underline-offset-4 hover:decoration-4">
                                            {p.name}
                                          </a>
                                        ) : (
                                          p.name
                                        )}
                                        <span className="font-normal text-ink-2"> · {p.priceBand}</span>
                                      </li>
                                    ))}
                                </ul>
                              ) : null}
                            </div>
                            <span
                              className={`display min-w-[2.5ch] pt-1 text-right text-[2rem] tabular-nums min-[900px]:text-[2.75rem] ${got ? "text-ink-2 line-through decoration-[3px]" : ""}`}
                              style={{ fontVariationSettings: '"wdth" 115' }}
                            >
                              {l.quantity ? l.quantity : ""}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                );
              })}
            </div>

            <div className="no-print mt-12 border-t-8 border-ink pt-6 min-[900px]:grid min-[900px]:grid-cols-[minmax(0,1fr)_auto] min-[900px]:items-end min-[900px]:gap-10">
              <div>
                <h3 className="h-sub">ready to buy what is left?</h3>
                <p className="mt-3 max-w-[52ch] text-ink-2">
                  The Buy it tab shows a product for each unticked item and can fill an Amazon basket in one click.
                </p>
              </div>
              <button type="button" onClick={() => setTab("buy")} className="btn btn-primary btn-lg mt-5 min-[900px]:mt-0">
                buy it <Arrow />
              </button>
            </div>

            <div className="mt-12 border-t-[3px] border-ink pt-5">
              <h3 className="text-[1.5rem]">keep it in one place.</h3>
              <p className="mt-2 max-w-[52ch] text-ink-2">
                Put a date in the calendar to check the batteries and the food dates in six months.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="h-sub">to do, no shopping needed</h3>
              <ul className="mt-5 border-t-8 border-ink">
                {tasks.map((t) => (
                  <li key={t.id} className="flex gap-3.5 border-b border-ink py-3.5 break-inside-avoid">
                    <span aria-hidden="true" className="mt-[0.45em] h-2.5 w-2.5 flex-none bg-ink" />
                    <span className="max-w-[65ch]">
                      {t.text}
                      {t.url ? (
                        <>
                          {" "}
                          <a href={t.url} target="_blank" rel="noopener noreferrer" className="font-extrabold hover:decoration-4">
                            Link
                          </a>
                        </>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
