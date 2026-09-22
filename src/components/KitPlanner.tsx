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
import { kitLineKey } from "@/data/have-map";
import { useHave } from "@/lib/have";

const TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;

function Counter({
  label,
  value,
  onChange,
  min = 0,
  max = 12,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-surface px-4 py-3">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Fewer ${label}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="h-8 w-8 rounded-full border border-line text-lg leading-none hover:bg-mint-pale"
        >
          -
        </button>
        <span className="w-6 text-center font-heading text-lg">{value}</span>
        <button
          type="button"
          aria-label={`More ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="h-8 w-8 rounded-full border border-line text-lg leading-none hover:bg-mint-pale"
        >
          +
        </button>
      </div>
    </div>
  );
}

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

export default function KitPlanner({ initial }: { initial?: Household }) {
  const [h, setH] = useState<Household>(initial ?? defaultHousehold);
  const { have, ready: haveReady, toggle: toggleHave, clear: clearHave } = useHave();
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [shop, setShop] = useState<Retailer["id"]>("amazon");
  const [tab, setTab] = useState<"list" | "buy">("list");
  const retailer = retailers.find((r) => r.id === shop)!;

  useEffect(() => {
    window.history.replaceState(null, "", toQuery(h));
  }, [h]);

  const { lines, tasks } = useMemo(() => buildKit(h), [h]);
  const categories = useMemo(() => [...new Set(lines.map((l) => l.category))], [lines]);
  const toBuy = lines.filter((l) => !have.has(kitLineKey(l.id)));
  const haveCount = lines.length - toBuy.length;
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
      setCopyFailed(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Older browsers, and any page not served over https, refuse this.
      // Say so and name the two routes that do work.
      setCopyFailed(true);
    }
  };

  const people = h.adults + h.children + h.babies;

  return (
    <div className="wrap grid gap-8 lg:grid-cols-[19rem_1fr]">
      {/* Inputs */}
      <aside className="space-y-3 rounded-card bg-mint-pale p-5 print:hidden lg:sticky lg:top-6 lg:self-start">
        <h2 className="text-lg font-semibold">Your household</h2>
        <Counter label="Adults" value={h.adults} onChange={(v) => set("adults", v)} min={1} />
        <Counter label="Children (3 to 17)" value={h.children} onChange={(v) => set("children", v)} />
        <Counter label="Under 3s" value={h.babies} onChange={(v) => set("babies", v)} />
        <Counter label="Over 65s" value={h.over65} onChange={(v) => set("over65", v)} max={h.adults} />
        <Counter label="Dogs" value={h.dogs} onChange={(v) => set("dogs", v)} />
        <Counter label="Cats" value={h.cats} onChange={(v) => set("cats", v)} />

        <label className="flex items-center justify-between gap-4 rounded-2xl bg-surface px-4 py-3 text-sm font-medium">
          Regular prescriptions or medical equipment
          <input
            type="checkbox"
            checked={h.medicalNeeds}
            onChange={(e) => set("medicalNeeds", e.target.checked)}
            className="h-5 w-5 accent-accent"
          />
        </label>

        <div className="rounded-2xl bg-surface px-4 py-3">
          <p className="mb-2 text-sm font-medium">Home</p>
          <div className="flex gap-2">
            {(["flat", "house"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("homeType", t)}
                className={`flex-1 rounded-full px-3 py-1.5 text-sm ${h.homeType === t ? "bg-accent text-accent-ink" : "border border-line hover:bg-mint-pale"}`}
              >
                {t === "flat" ? "Flat" : "House"}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-surface px-4 py-3">
          <p className="mb-2 text-sm font-medium">Days of cover</p>
          <div className="flex gap-2">
            {([3, 7, 14] as const).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => set("days", n)}
                className={`flex-1 rounded-full px-3 py-1.5 text-sm ${h.days === n ? "bg-accent text-accent-ink" : "border border-line hover:bg-mint-pale"}`}
              >
                {n} days
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            Three days is the government minimum. Seven covers most storms and outages. Fourteen is for a long disruption.
          </p>
        </div>
      </aside>

      {/* List */}
      <section>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">
              Your list: {people} {people === 1 ? "person" : "people"}, {h.days} days
            </h2>
            <p className="mt-1 max-w-xl text-sm text-muted">
              {haveReady && haveCount > 0 ? (
                <span className="font-medium text-heading">
                  You have <span className="tabular-nums">{haveCount}</span> of{" "}
                  <span className="tabular-nums">{lines.length}</span>.{" "}
                </span>
              ) : null}
              Tick what you already have. Ticked lines stay on the list and drop out of the basket. Ticks are
              kept in this browser; the link in your address bar carries your household.
            </p>
            {haveReady && haveCount > 0 ? (
              <button
                type="button"
                onClick={clearHave}
                className="mt-2 text-sm text-muted underline underline-offset-4 hover:text-heading print:hidden"
              >
                Clear all ticks
              </button>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2 print:hidden">
            <button type="button" onClick={copy} className="btn btn-secondary">
              {copyFailed ? "Could not copy" : copied ? "Copied" : "Copy list"}
            </button>
            <button type="button" onClick={() => window.print()} className="btn btn-secondary">
              Print
            </button>
            {copyFailed ? (
              <p role="status" className="basis-full text-sm text-muted sm:max-w-sm">
                Your browser would not let the page copy the list. Print it instead, or select the list and
                copy it by hand.
              </p>
            ) : null}
          </div>
        </div>

        <div role="tablist" aria-label="List or buy" className="mb-8 flex gap-1 rounded-full bg-mint-pale p-1 print:hidden sm:inline-flex">
          {(
            [
              ["list", "Your list"],
              ["buy", "Buy it"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`kit-tab-${id}`}
              aria-selected={tab === id}
              aria-controls={`kit-panel-${id}`}
              onClick={() => setTab(id)}
              className={`flex-1 whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium transition ${tab === id ? "bg-accent text-accent-ink shadow-sm" : "text-heading hover:bg-surface"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "buy" ? (
          <section
            id="kit-panel-buy"
            role="tabpanel"
            aria-labelledby="kit-tab-buy"
            className="rounded-card border border-line bg-surface p-5 print:hidden sm:p-6"
          >
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted">Buy it</p>
                <h3 className="mt-1 text-xl font-semibold">Pick a shop, see the products, one button to the basket</h3>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {retailers.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setShop(r.id)}
                  aria-pressed={shop === r.id}
                  className={`rounded-full px-4 py-1.5 text-sm ${shop === r.id ? "bg-accent text-accent-ink" : "border border-line hover:bg-mint-pale"}`}
                >
                  {r.name}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted">{retailer.note}</p>

            {shop === "amazon" ? (
              <>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {picks.map(({ line, product, buyQty }) => (
                    <li key={line.id} className="flex flex-col overflow-hidden rounded-2xl bg-mint-pale">
                      {product?.image ? (
                        <a
                          href={amazonProductUrl(product.asin, TAG)}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="flex h-40 items-center justify-center bg-white p-4"
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
                        <div aria-hidden className="flex h-40 items-center justify-center bg-surface text-muted/50">
                          <ShoppingBasket size={40} strokeWidth={1.25} />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-4">
                        <p className="text-xs uppercase tracking-wider text-muted">{line.item}</p>
                        {product ? (
                          <>
                            <p className="mt-1 font-medium leading-snug">{product.name}</p>
                            <p className="mt-1 text-sm text-muted">
                              {buyQty} × · {product.priceBand}
                              {product.verified ? " · checked by hand" : ""}
                            </p>
                            <a
                              href={amazonProductUrl(product.asin, TAG)}
                              target="_blank"
                              rel="noopener noreferrer sponsored"
                              className="mt-auto inline-flex items-center gap-1 pt-3 text-sm text-heading underline underline-offset-4 hover:text-accent"
                            >
                              View on Amazon <ExternalLink size={12} />
                            </a>
                          </>
                        ) : (
                          <>
                            <p className="mt-1 text-sm text-muted">
                              {line.quantity} {line.unit}. Best bought at a supermarket, or search Amazon.
                            </p>
                            {line.search ? (
                              <a
                                href={retailer.search(line.search)}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="mt-auto inline-flex items-center gap-1 pt-3 text-sm text-heading underline underline-offset-4 hover:text-accent"
                              >
                                Search Amazon <ExternalLink size={12} />
                              </a>
                            ) : null}
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                {basket ? (
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <a href={basket} target="_blank" rel="noopener noreferrer sponsored" className="btn btn-primary !px-6 !py-3.5 !text-base">
                      <ShoppingBasket size={18} />
                      Add {asinCount} {asinCount === 1 ? "item" : "items"} to my Amazon basket
                    </a>
                    <p className="max-w-md text-xs text-muted">
                      Opens Amazon with these {asinCount} products in your basket, in the quantities shown. You check the
                      basket and pay there. Nothing is bought until you choose to. Groceries are on your list; buy those at
                      a supermarket.
                    </p>
                  </div>
                ) : null}
                <p className="mt-4 text-xs text-muted">Product photos are shown from Amazon and belong to their sellers.</p>
              </>
            ) : (
              <>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {picks
                    .filter(({ line }) => line.search)
                    .map(({ line }) => (
                      <li key={line.id} className="flex flex-col rounded-2xl bg-mint-pale p-4">
                        <p className="text-xs uppercase tracking-wider text-muted">{line.item}</p>
                        <p className="mt-1 text-sm text-muted">
                          {line.quantity} {line.unit}
                        </p>
                        <a
                          href={retailer.search(line.search!)}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="mt-auto inline-flex items-center gap-1 pt-3 text-sm text-heading underline underline-offset-4 hover:text-accent"
                        >
                          Find at {retailer.name} <ExternalLink size={12} />
                        </a>
                      </li>
                    ))}
                </ul>
                <p className="mt-4 max-w-2xl text-xs text-muted">
                  {retailer.name} has no way for a website to fill your basket, so it is one click per item. Each link
                  opens the search for that item, and you add it there.
                </p>
              </>
            )}
          </section>
        ) : (
          <div id="kit-panel-list" role="tabpanel" aria-labelledby="kit-tab-list" className="space-y-8">
            {categories.map((c) => {
              const items = lines.filter((l) => l.category === c);
              return (
                <div key={c}>
                  <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">{c}</h3>
                  <ul className="divide-y divide-line rounded-card bg-surface">
                    {items.map((l) => {
                      const key = kitLineKey(l.id);
                      const got = have.has(key);
                      return (
                        <li key={l.id} className={`flex gap-4 px-5 py-4 ${got ? "opacity-50" : ""}`}>
                          <input
                            type="checkbox"
                            aria-label={`Already have ${l.item}`}
                            checked={got}
                            onChange={() => toggleHave(key)}
                            className="mt-1.5 h-5 w-5 shrink-0 accent-accent print:hidden"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                <span className={`font-medium ${got ? "line-through" : ""}`}>{l.item}</span>
                                {l.priority ? <span className="tag text-[0.65rem]">Get first</span> : null}
                              </span>
                              <span className="font-heading tabular-nums text-heading sm:text-right">
                                {l.quantity ? l.quantity : ""} {l.unit}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-muted">{l.basis}</p>
                            {l.freeOption ? (
                              <p className="mt-1 text-sm">
                                <span className="font-medium text-heading">Free option:</span> {l.freeOption}
                              </p>
                            ) : null}
                            {l.products?.length ? (
                              <ul className="mt-2 flex flex-wrap gap-2 print:hidden">
                                {[...l.products]
                                  .sort((a, b) => (a.tier === "budget" ? -1 : b.tier === "budget" ? 1 : 0))
                                  .map((p) => (
                                    <li key={p.name} className="tag">
                                      {p.url ? (
                                        <a href={p.url} target="_blank" rel="noopener noreferrer sponsored" className="underline underline-offset-4 hover:text-sage">
                                          {p.name}
                                        </a>
                                      ) : (
                                        p.name
                                      )}
                                      <span className="text-muted"> · {p.priceBand}</span>
                                    </li>
                                  ))}
                              </ul>
                            ) : null}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-card bg-forest px-6 py-5 text-on-forest print:hidden">
              <div>
                <p className="font-heading text-lg font-medium">Ready to buy what is left?</p>
                <p className="mt-1 text-sm opacity-90">
                  The Buy it tab shows a product for each unticked item and can fill an Amazon basket in one click.
                </p>
              </div>
              <button type="button" onClick={() => setTab("buy")} className="btn btn-on-dark">
                <ShoppingBasket size={16} />
                Buy it
              </button>
            </div>

            <div className="rounded-card bg-mint-pale px-6 py-5">
              <p className="font-heading text-lg font-medium">Keep it in one place.</p>
              <p className="mt-1 text-sm text-muted">
                Put a date in the calendar to check the batteries and the food dates in six months.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">To do, no shopping needed</h3>
              <ul className="space-y-2 rounded-card bg-mint-pale px-5 py-4 text-sm leading-relaxed">
                {tasks.map((t) => (
                  <li key={t.id} className="flex gap-3">
                    <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                    <span>
                      {t.text}
                      {t.url ? (
                        <>
                          {" "}
                          <a href={t.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-sage">
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
