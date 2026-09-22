"use client";

import SectionLabel from "@/components/SectionLabel";
import { checklist } from "@/data/checklist";
import { haveKey, useHave } from "@/lib/have";

const allItems = checklist.flatMap((c) => c.items.map((i) => ({ ...i, key: haveKey(c.slug, i.item) })));
const total = allItems.length;

export default function ChecklistTracker() {
  const { have, ready, toggle, clear } = useHave();

  const ticked = allItems.filter((i) => have.has(i.key)).length;
  const firstPriorityMissing = allItems.find((i) => i.priority && !have.has(i.key));
  const firstMissing = allItems.find((i) => !have.has(i.key));

  return (
    <>
      <section aria-labelledby="progress-heading" className="mb-10 rounded-card bg-mint-pale px-5 py-5 sm:px-6">
        <h2 id="progress-heading" className="sr-only">
          What you have so far
        </h2>
        <p className="font-heading text-lg leading-snug text-heading">
          {!ready ? (
            <>Tick anything you already have as you read.</>
          ) : ticked === 0 ? (
            <>Nothing ticked yet. Tick what you already have, and this page keeps the count of what is left to get.</>
          ) : ticked === total ? (
            <>All {total} ticked. Put a date in the calendar to check the batteries and the food dates in six months.</>
          ) : (
            <>
              You have <span className="tabular-nums">{ticked}</span> of{" "}
              <span className="tabular-nums">{total}</span>.{" "}
              {firstPriorityMissing
                ? `Of the things to get first, ${firstPriorityMissing.item.toLowerCase()} is still missing.`
                : `Everything marked "first" is ticked. ${firstMissing ? `Next on the list is ${firstMissing.item.toLowerCase()}.` : ""}`}
            </>
          )}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <p>Ticks are kept in this browser, so they will not show up on your phone. Nothing is sent anywhere.</p>
          {ready && ticked > 0 ? (
            <button
              type="button"
              onClick={clear}
              className="underline underline-offset-4 hover:text-heading print:hidden"
            >
              Clear all ticks
            </button>
          ) : null}
        </div>
      </section>

      <div className="divide-y divide-line">
        {checklist.map((c) => {
          const keys = c.items.map((i) => haveKey(c.slug, i.item));
          const done = keys.filter((k) => have.has(k)).length;

          return (
            <details key={c.slug} id={c.slug} open className="group scroll-mt-24 py-8">
              <summary className="cursor-pointer list-none marker:hidden">
                <SectionLabel>{c.title}</SectionLabel>
                <span className="flex items-baseline justify-between gap-4">
                  <span className="font-heading text-2xl font-semibold text-heading">{c.title}</span>
                  <span className="shrink-0 text-sm tabular-nums text-muted">
                    {ready ? (
                      <>
                        {done} of {c.items.length}
                      </>
                    ) : (
                      <>{c.items.length} items</>
                    )}
                  </span>
                </span>
              </summary>

              <p className="mt-2 max-w-2xl leading-relaxed text-muted">{c.intro}</p>

              <ul className="mt-5 divide-y divide-line border-y border-line">
                {c.items.map((i) => {
                  const key = haveKey(c.slug, i.item);
                  const got = have.has(key);

                  return (
                    <li key={i.item} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 py-4">
                      <input
                        type="checkbox"
                        id={key}
                        checked={got}
                        onChange={() => toggle(key)}
                        className="mt-1 h-5 w-5 shrink-0 accent-accent"
                      />
                      <div className={`min-w-0 ${got ? "opacity-60" : ""}`}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <label
                            htmlFor={key}
                            className={`cursor-pointer font-medium ${got ? "line-through" : ""}`}
                          >
                            {i.item}
                            {i.priority ? (
                              <span className="ml-2 inline-block rounded-full bg-tag px-2 py-0.5 align-middle text-[0.7rem] font-medium uppercase tracking-wider text-heading">
                                First
                              </span>
                            ) : null}
                          </label>
                          <span className="text-sm tabular-nums text-heading sm:text-right">{i.amount}</span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{i.notes}</p>
                        {i.products ? (
                          <ul className="mt-2 space-y-1.5 border-l-2 border-sage-light pl-3 text-sm">
                            {i.products.map((p) => (
                              <li key={p.url}>
                                <a
                                  href={p.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium text-heading underline underline-offset-4 hover:text-sage"
                                >
                                  {p.name}
                                </a>{" "}
                                <span className="text-muted">{p.note}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </details>
          );
        })}
      </div>
    </>
  );
}
