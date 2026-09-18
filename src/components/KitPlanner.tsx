"use client";

import { useEffect, useMemo, useState } from "react";
import {
  amazonBasketUrl,
  buildKit,
  defaultHousehold,
  type Household,
} from "@/data/kit-rules";

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

function fromQuery(): Household | null {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search);
  if (![...q.keys()].length) return null;
  const n = (k: string, d: number) => {
    const v = parseInt(q.get(k) ?? "", 10);
    return Number.isFinite(v) ? v : d;
  };
  const days = n("d", 3);
  return {
    adults: n("a", 2),
    children: n("c", 0),
    babies: n("b", 0),
    over65: n("e", 0),
    dogs: n("dogs", 0),
    cats: n("cats", 0),
    medicalNeeds: q.get("med") === "1",
    homeType: q.get("home") === "flat" ? "flat" : "house",
    days: days === 7 || days === 14 ? days : 3,
  };
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

export default function KitPlanner() {
  const [h, setH] = useState<Household>(defaultHousehold);
  const [have, setHave] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const q = fromQuery();
    if (q) setH(q);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", toQuery(h));
  }, [h]);

  const { lines, tasks } = useMemo(() => buildKit(h), [h]);
  const categories = useMemo(() => [...new Set(lines.map((l) => l.category))], [lines]);
  const toBuy = lines.filter((l) => !have.has(l.id));
  const basket = amazonBasketUrl(lines, have, TAG);
  const asinCount = lines.filter((l) => !have.has(l.id) && l.products?.some((p) => p.asin)).length;

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
    <div className="grid gap-8 lg:grid-cols-[19rem_1fr]">
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
            className="h-5 w-5 accent-forest"
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
                className={`flex-1 rounded-full px-3 py-1.5 text-sm ${h.homeType === t ? "bg-forest text-on-forest" : "border border-line hover:bg-mint-pale"}`}
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
                className={`flex-1 rounded-full px-3 py-1.5 text-sm ${h.days === n ? "bg-forest text-on-forest" : "border border-line hover:bg-mint-pale"}`}
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
            <p className="mt-1 text-sm text-muted">
              Tick anything you already have. It drops off the list. The link in your address bar saves this household.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 print:hidden">
            <button type="button" onClick={copy} className="btn btn-secondary">
              {copied ? "Copied" : "Copy list"}
            </button>
            <button type="button" onClick={() => window.print()} className="btn btn-secondary">
              Print
            </button>
            {basket ? (
              <a href={basket} target="_blank" rel="noopener noreferrer sponsored" className="btn btn-primary">
                Add {asinCount} {asinCount === 1 ? "item" : "items"} to an Amazon basket
              </a>
            ) : null}
          </div>
        </div>

        {basket ? (
          <p className="mb-6 text-xs text-muted print:hidden">
            The Amazon button fills a basket with the items above that have a verified product code, in the
            quantities shown, and earns this site a small commission. Nothing is bought until you choose to.
          </p>
        ) : (
          <p className="mb-6 text-xs text-muted print:hidden">
            Product links are being added item by item. Until then, copy the list into any supermarket&rsquo;s
            site or take it to the shop.
          </p>
        )}

        <div className="space-y-8">
          {categories.map((c) => {
            const items = lines.filter((l) => l.category === c);
            return (
              <div key={c}>
                <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">{c}</h3>
                <ul className="divide-y divide-line rounded-card bg-surface">
                  {items.map((l) => {
                    const got = have.has(l.id);
                    return (
                      <li key={l.id} className={`flex gap-4 px-5 py-4 ${got ? "opacity-50" : ""}`}>
                        <input
                          type="checkbox"
                          aria-label={`Already have ${l.item}`}
                          checked={got}
                          onChange={() => toggleHave(l.id)}
                          className="mt-1.5 h-5 w-5 shrink-0 accent-forest print:hidden"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className={`font-medium ${got ? "line-through" : ""}`}>{l.item}</span>
                            <span className="font-heading text-heading">
                              {l.quantity ? l.quantity : ""} {l.unit}
                            </span>
                            {l.priority ? <span className="tag bg-mint text-[0.65rem]">Get first</span> : null}
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
      </section>
    </div>
  );
}
