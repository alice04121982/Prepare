"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildKit,
  daysLabel,
  defaultHousehold,
  householdToQuery,
  MAX_DAYS,
  MIN_DAYS,
  retailers,
  type Household,
  type Retailer,
} from "@/data/kit-rules";
import { ExternalLink, ShoppingBasket } from "lucide-react";
import { amazonImageUrl, amazonProductUrl, productsFor, type Tier } from "@/data/products";
import { Counter, DaysControl, FixedDays, OptionRow, TickBox } from "@/components/kit/Controls";
import { ListPicker } from "@/components/kit/ListPicker";
import { TierPicker } from "@/components/kit/TierPicker";
import { DownArrow, goToBuy, StillToGetBar } from "@/components/kit/StillToGet";
import { catBgFor } from "@/components/kit/categories";
import { kitLineKey } from "@/data/have-map";
import { buysFor, packTotals } from "@/data/packs";
import AmazonBasketButton, { basketLabel } from "@/components/AmazonBasketButton";
import { useHave } from "@/lib/have";
import { daysRangeFor, defaultDaysFor, listBySlug, listForDays, type ListSlug } from "@/data/lists";

import { AMAZON_TAG as TAG } from "@/lib/amazon";

/** Quick picks under the days stepper, per list. Without a list, the original three. */
/**
 * Quick lengths beside the days box. Any whole number from MIN_DAYS to
 * MAX_DAYS can be typed; the kit follows the number (see setDays below).
 */
const PRESETS = [
  { days: 3, note: "the government minimum" },
  { days: 14, note: "2 weeks" },
  { days: 30, note: "a month" },
  { days: 90, note: "3 months" },
];

/** Small solid block of a category's label colour, or plain paper for household lines. */
function Swatch({ category }: { category: string }) {
  return (
    <span
      aria-hidden="true"
      className={`${catBgFor(category)} mt-[0.3em] inline-block h-3.5 w-3.5 flex-none border-2 border-ink`}
    />
  );
}

const DISCLOSURE =
  "Some links on this page earn us a small commission. It never changes what we recommend, and the free option is always listed first.";

/** The default buy view: the maker or specialist first, Amazon as the fallback. */
const MAKER_FIRST = {
  id: "maker",
  name: "Maker first",
  note: "Where the maker or a specialist sells it, buy there first. Amazon is the fallback.",
} as const;

type ShopId = typeof MAKER_FIRST.id | Retailer["id"];

const amazon = retailers.find((r) => r.id === "amazon")!;

const externalLink =
  "inline-flex min-h-11 items-center gap-1.5 font-extrabold underline underline-offset-4 hover:decoration-4";


/** Free option line, shown before any product on every buy view. */
function FreeOption({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="mt-1.5 text-[0.9375rem] leading-snug">
      <span className="font-extrabold">Free option:</span> {text}
    </p>
  );
}

export default function KitPlanner({ initial }: { initial?: Household }) {
  const [h, setH] = useState<Household>(initial ?? defaultHousehold);
  // The shared record of what the household has: kept in this browser and
  // ticked from either this page or the checklist.
  const { have, ready: haveReady, toggle: toggleHave, clear: clearHave } = useHave();
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [shop, setShop] = useState<ShopId>(MAKER_FIRST.id);
  const retailer = retailers.find((r) => r.id === shop);
  const shopNote = retailer ? retailer.note : MAKER_FIRST.note;

  // Desktop: the whole household column is sticky when it fits the screen;
  // otherwise only its closing block is, so no control is ever out of reach.
  const [fits, setFits] = useState(false);
  const asideRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.history.replaceState(null, "", householdToQuery(h));
  }, [h]);

  useEffect(() => {
    const aside = asideRef.current;
    const close = closeRef.current;
    if (!aside || !close) return;
    const check = () =>
      setFits(aside.offsetHeight + (listRef.current?.offsetHeight ?? 0) + close.offsetHeight + 48 <= window.innerHeight);
    const ro = new ResizeObserver(check);
    ro.observe(aside);
    ro.observe(close);
    if (listRef.current) ro.observe(listRef.current);
    window.addEventListener("resize", check);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", check);
    };
  }, []);

  const { lines, tasks } = useMemo(() => buildKit(h), [h]);
  const categories = useMemo(() => [...new Set(lines.map((l) => l.category))], [lines]);
  const toBuy = lines.filter((l) => !have.has(kitLineKey(l.id)));
  const total = lines.length;
  const ticked = total - toBuy.length;
  const remaining = toBuy.length;
  const tier: Tier = h.tier ?? "regular";
  // Babies do not change pack sizes; the basket counts adults and children.
  const basketPeople = h.adults + h.children;
  const picks = toBuy
    .map((l) => ({ line: l, product: productsFor(l.productsFrom ?? l.id, tier)[0] }))
    .map(({ line, product }) => ({
      line,
      product,
      buyQty: product ? Math.max(1, Math.ceil(line.quantity / (product.unitsPerProduct ?? 1))) : 0,
    }));
  // The basket shares its rules with the homepage packs, so a line split
  // across products (tins as beans and soup) buys each part.
  const basketBuys = buysFor(toBuy, basketPeople, tier);
  // What the same basket would roughly cost in each range, for the picker.
  const estimates = Object.fromEntries(
    (["budget", "regular", "premium"] as const).map((t) => [t, packTotals(buysFor(toBuy, basketPeople, t)).estimate]),
  ) as Record<Tier, number>;
  const setTier = (t: Tier) => setH((prev) => ({ ...prev, tier: t === "regular" ? undefined : t }));
  const basket = basketBuys.length > 0;
  const asinCount = basketBuys.length;
  const groceriesLeft = toBuy.some((l) => (l.category === "Food" || l.id === "water") && !productsFor(l.id).length);

  const set = <K extends keyof Household>(k: K, v: Household[K]) => setH((prev) => ({ ...prev, [k]: v }));

  const list = h.list ? listBySlug(h.list) : undefined;
  const isGrabBag = h.list === "grab-bag";

  // A new list keeps the days if they fit its range, otherwise starts at its default.
  // Typing a length moves to the kit that covers it, or to "your own length"
  // when none does, so the kit shown always matches the days.
  const setDays = (days: number) => setH((prev) => ({ ...prev, days, list: listForDays(days) }));
  // "Your own length" (no list) keeps the days as they are.
  const chooseList = (slug: ListSlug | undefined) =>
    setH((prev) => {
      if (!slug) return { ...prev, list: undefined };
      const { min, max } = daysRangeFor(slug);
      const days = prev.days >= min && prev.days <= max ? prev.days : defaultDaysFor(slug);
      return { ...prev, list: slug, days };
    });

  const plainText = () => {
    const people = h.adults + h.children + h.babies;
    const name = list ? `${list.title} list` : "shopping list";
    const head = `Stay Prepared ${name}: ${people} ${people === 1 ? "person" : "people"}, ${daysLabel(h.days)}\n${window.location.href}\n`;
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

  const basketBlock = basket ? (
    <div className="mt-8 max-w-md">
      <AmazonBasketButton items={basketBuys.map((b) => ({ asin: b.product.asin, quantity: b.quantity }))}>
        {basketLabel(asinCount)}
      </AmazonBasketButton>
    </div>
  ) : null;

  return (
    <div className="wrap grid gap-12 pb-28 pt-10 min-[900px]:grid-cols-[22rem_minmax(0,1fr)] min-[900px]:gap-14 min-[900px]:pb-26 min-[900px]:pt-16">
      {/* Inputs: the household panel, then (on wide screens) the closing count */}
      <div className="no-print min-w-0">
        <div className={fits ? "min-[900px]:sticky min-[900px]:top-6" : "contents"}>
          <div ref={listRef}>
            <ListPicker value={h.list} onChange={chooseList} />
            {/* How long: straight under the kit, since the two move together */}
            <div className="border-x-[3px] border-t-[3px] border-ink pt-2">
              {isGrabBag ? (
                <FixedDays label="Packed for" value="3 days" note="Enough to carry. Bottled water covers the first day and the filter bottles the rest." />
              ) : (
                <DaysControl value={h.days} onChange={setDays} min={MIN_DAYS} max={MAX_DAYS} presets={PRESETS} />
              )}
            </div>
            <div className="border-x-[3px] border-t-[3px] border-ink">
              <TierPicker value={tier} onChange={setTier} estimates={estimates} />
            </div>
          </div>
          <aside
            ref={asideRef}
            id="kit-household"
            aria-labelledby="kit-household-h"
            className="border-[3px] border-ink min-[900px]:border-b-0"
          >
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

            <fieldset
              hidden={isGrabBag}
              className="border-b border-ink px-4.5 pb-4 pt-3 min-[900px]:px-6"
            >
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

          </aside>

          <div
            ref={closeRef}
            className={`hidden border-x-[3px] border-b-[3px] border-t-[10px] border-ink bg-paper px-6 pb-4 pt-4 min-[900px]:block ${fits ? "" : "min-[900px]:sticky min-[900px]:top-6"}`}
          >
            <p className={`font-extrabold leading-tight ${haveReady ? "" : "invisible"}`}>
              {remaining ? "still to get" : "nothing left to get"}
            </p>
            <p
              className={`display mt-1 text-[3.5rem] leading-[0.95] tabular-nums ${haveReady ? "" : "invisible"}`}
              style={{ fontVariationSettings: '"wdth" 115' }}
            >
              {remaining}
            </p>
            <p className={`mt-1.5 text-ink-2 ${haveReady ? "" : "invisible"}`}>
              <span className="tabular-nums">{ticked}</span> already ticked
            </p>
            <a href="#buy" onClick={goToBuy} className="arrow-link mt-1">
              where to buy <DownArrow />
            </a>
          </div>
        </div>
      </div>

      {/* The list, then where to buy what is left */}
      <section aria-labelledby="kit-list-h" className="min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
          <div className="min-w-0">
            <h2 id="kit-list-h" className="text-[clamp(2rem,8.6vw,3.5rem)]">
              {isGrabBag ? "your grab bag" : "your list"}: {people} {people === 1 ? "person" : "people"}
              {isGrabBag ? "" : `, ${daysLabel(h.days)}`}
            </h2>
            {haveReady && ticked > 0 ? (
              <p className="mt-3 font-extrabold">
                You have <span className="tabular-nums">{ticked}</span> of <span className="tabular-nums">{total}</span>.
              </p>
            ) : null}
            <p className="mt-3 max-w-[52ch] text-ink-2">
              Tick what you already have. Ticked lines stay on the list and drop out of what to buy. Ticks are kept
              in this browser, and the link in your address bar carries your household.
            </p>
            {haveReady && ticked > 0 ? (
              <button
                type="button"
                onClick={clearHave}
                className="no-print mt-2 min-h-11 font-bold underline underline-offset-4 hover:decoration-4"
              >
                clear all ticks
              </button>
            ) : null}
          </div>
          <div className="no-print flex flex-wrap gap-2">
            <button type="button" onClick={copy} className="btn btn-secondary">
              {copyFailed ? "could not copy" : copied ? "copied" : "copy list"}
            </button>
            <button type="button" onClick={() => window.print()} className="btn btn-secondary">
              print
            </button>
            {copyFailed ? (
              <p role="status" className="basis-full max-w-[40ch] text-[0.9375rem] leading-snug text-ink-2">
                Your browser would not let the page copy the list. Print it instead, or select the list and copy it by
                hand.
              </p>
            ) : null}
          </div>
        </div>

        {/* Stage 1 */}
        <h3 id="kit-stage-1" className="h-sub mt-10">
          check what you have
        </h3>
        <div className="mt-5 border-[3px] border-ink">
          <div className="flex justify-between gap-4 border-b-[10px] border-ink px-3 pb-2 pt-3 text-[0.9375rem] font-extrabold min-[900px]:px-5">
            <span>What to get</span>
            <span>How many</span>
          </div>
          {categories.map((c, gi) => {
            const items = lines.filter((l) => l.category === c);
            return (
              <section key={c} aria-labelledby={`kit-cat-${gi}`} className={gi ? "border-t-[3px] border-ink" : ""}>
                <h4
                  id={`kit-cat-${gi}`}
                  data-cat
                  className={`${catBgFor(c)} border-b-[3px] border-ink px-3 pb-2.5 pt-3 text-[1.625rem] lowercase min-[900px]:px-5 min-[900px]:text-[2rem]`}
                >
                  {c}
                </h4>
                <ul className="divide-y divide-ink">
                  {items.map((l) => {
                    const key = kitLineKey(l.id);
                    const got = have.has(key);
                    return (
                      <li
                        key={l.id}
                        className={`grid grid-cols-[2.75rem_minmax(0,1fr)_auto] gap-x-2.5 px-1.5 py-3 break-inside-avoid min-[900px]:gap-x-4 min-[900px]:px-3.5 min-[900px]:py-4 ${got ? "bg-hush" : ""}`}
                      >
                        <TickBox checked={got} onChange={() => toggleHave(key)} label={`Already have ${l.item}`} />
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
                          <FreeOption text={l.freeOption} />
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
          </div>
          <a href="#buy" onClick={goToBuy} className="btn btn-primary btn-lg mt-5 min-[900px]:mt-0">
            where to buy it <DownArrow />
          </a>
        </div>

        {/* Stage 2 */}
        <section id="kit-buy" aria-labelledby="buy" className="no-print mt-16 border-t-[3px] border-ink pt-8">
          <h3 id="buy" tabIndex={-1} className="h-sub scroll-mt-6">
            buy what is left
          </h3>
          <p className="mt-3 max-w-[60ch] text-[0.9375rem] leading-snug text-ink-2">{DISCLOSURE}</p>
          <p className={`mt-4 max-w-[60ch] ${haveReady ? "" : "invisible"}`}>
            {remaining ? (
              <>
                You have ticked <span className="tabular-nums">{ticked}</span> of{" "}
                <span className="tabular-nums">{total}</span>. Here is where to get the other{" "}
                <span className="tabular-nums">{remaining}</span>.
              </>
            ) : (
              <>
                You have ticked all <span className="tabular-nums">{total}</span>. There is nothing left to buy.
              </>
            )}
            {remaining && groceriesLeft ? " Groceries are on your list; buy those at a supermarket." : null}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[MAKER_FIRST, ...retailers].map((r) => (
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
          <p className="mt-4 max-w-[60ch] text-ink-2">{shopNote}</p>

          {remaining === 0 ? null : shop === MAKER_FIRST.id ? (
            <>
              <ul className="mt-6 border-t-8 border-ink">
                {picks.map(({ line, product, buyQty }) => {
                  const makers = line.products?.filter((p) => p.url) ?? [];
                  const hasAmazon = !!product || !!line.search;
                  return (
                    <li key={line.id} className="border-b border-ink py-4">
                      <p className="flex items-start gap-2 text-lg font-extrabold leading-snug">
                        <Swatch category={line.category} />
                        {line.item}
                      </p>
                      <p className="mt-0.5 text-ink-2">
                        <span className="tabular-nums">{line.quantity}</span> {line.unit}
                      </p>
                      <FreeOption text={line.freeOption} />
                      {makers.map((p) => (
                        <p key={p.name} className="mt-1.5 flex flex-wrap items-center gap-x-2 leading-snug">
                          <span className="font-extrabold">From the maker:</span>
                          <a href={p.url} target="_blank" rel="noopener noreferrer sponsored" className={externalLink}>
                            {p.name} <ExternalLink size={14} strokeWidth={2.5} />
                          </a>
                          <span className="text-ink-2">{p.priceBand}</span>
                        </p>
                      ))}
                      {product ? (
                        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 leading-snug">
                          <span className="font-extrabold">{makers.length ? "Or on Amazon:" : "On Amazon:"}</span>
                          <span>
                            {product.name}, <span className="tabular-nums">{buyQty}</span> ×, {product.priceBand}
                          </span>
                          <a
                            href={amazonProductUrl(product.asin, TAG)}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className={externalLink}
                          >
                            View on Amazon <ExternalLink size={14} strokeWidth={2.5} />
                          </a>
                        </p>
                      ) : line.search ? (
                        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 leading-snug">
                          <span className="font-extrabold">{makers.length ? "Or on Amazon:" : "On Amazon:"}</span>
                          <a
                            href={amazon.search(line.search)}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className={externalLink}
                          >
                            Search Amazon <ExternalLink size={14} strokeWidth={2.5} />
                          </a>
                        </p>
                      ) : null}
                      {!makers.length && !hasAmazon && !line.freeOption ? (
                        <p className="mt-1.5 text-ink-2">No shop needed.</p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
              {basketBlock}
            </>
          ) : shop === "amazon" ? (
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
                      <FreeOption text={line.freeOption} />
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
                          {line.search && retailer ? (
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
              {basketBlock}
              <p className="mt-5 text-sm text-ink-2">Product photos are shown from Amazon and belong to their sellers.</p>
            </>
          ) : retailer ? (
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
                        <FreeOption text={line.freeOption} />
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
                {retailer.name} cannot fill a basket from another site. Add each item there.
              </p>
            </>
          ) : null}
        </section>

        <div className="mt-12 border-t-[3px] border-ink pt-5">
          <h3 className="text-[1.5rem]">check it in six months</h3>
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
                        {t.linkText ?? "More"}
                      </a>
                    </>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StillToGetBar remaining={remaining} watch="kit-stage-1" hideOver={["kit-household", "kit-buy"]} />
    </div>
  );
}
