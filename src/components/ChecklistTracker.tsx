"use client";

import { bgFor, catFor } from "@/components/checklist/cats";
import { checklist } from "@/data/checklist";
import { haveKey, useHave } from "@/lib/have";
import TickBox from "@/components/TickBox";

const allItems = checklist.flatMap((c) => c.items.map((i) => ({ ...i, key: haveKey(c.slug, i.item) })));
const total = allItems.length;

/**
 * The checklist itself, and the household's record of what it already has.
 * Ticks go into the shared record in src/lib/have.ts, so the kit planner and
 * the home page see them too. Counts wait until the record has been read, so
 * the server render and the first client render match.
 */
export default function ChecklistTracker() {
  const { have, ready, toggle, clear } = useHave();

  const ticked = allItems.filter((i) => have.has(i.key)).length;
  const firstPriorityMissing = allItems.find((i) => i.priority && !have.has(i.key));
  const firstMissing = allItems.find((i) => !have.has(i.key));

  return (
    <>
      {/* What you have so far */}
      <section aria-labelledby="have-h" className="no-print border-t-[3px] border-ink">
        <div className="wrap py-7 min-[900px]:py-9">
          <h2 id="have-h" className="sr-only">
            What you have so far
          </h2>
          <p className="max-w-[56ch] text-[1.1875rem] font-extrabold leading-snug" aria-live="polite">
            {!ready ? (
              <>Tick anything you already have as you read.</>
            ) : ticked === 0 ? (
              <>Nothing ticked yet. Tick what you already have, and this page keeps count of what is left to get.</>
            ) : ticked === total ? (
              <>
                You have all <span className="tabular-nums">{total}</span>. Put a date in the calendar to check the
                batteries and the food dates in six months.
              </>
            ) : (
              <>
                You have <span className="tabular-nums">{ticked}</span> of <span className="tabular-nums">{total}</span>.{" "}
                <span className="font-normal">
                  {firstPriorityMissing
                    ? `Of the things to get first, ${firstPriorityMissing.item.toLowerCase()} is still missing.`
                    : `Everything marked "first" is ticked.${firstMissing ? ` Next on the list is ${firstMissing.item.toLowerCase()}.` : ""}`}
                </span>
              </>
            )}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-[0.9375rem] text-ink-2">
            <p>Ticks are kept in this browser, so they will not show up on your phone. Nothing is sent anywhere.</p>
            {ready && ticked > 0 ? (
              <button
                type="button"
                onClick={clear}
                className="min-h-11 font-extrabold text-ink underline decoration-2 underline-offset-[0.2em] hover:decoration-4"
              >
                clear all ticks
              </button>
            ) : null}
          </div>
        </div>
      </section>

      {/* The tins: one labelled band per category, then its items on the shelf */}
      {checklist.map((c) => (
        <section key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-h`} className="scroll-mt-24">
          <div data-cat className={`${bgFor(catFor(c.slug))} border-y-[3px] border-ink`}>
            <div className="wrap pb-7 pt-8 min-[900px]:pb-10 min-[900px]:pt-12">
              <h2
                id={`${c.slug}-h`}
                className="display text-[clamp(2rem,9vw,5rem)] [overflow-wrap:anywhere]"
                style={{ fontVariationSettings: '"wdth" 115' }}
              >
                {c.title.toLowerCase()}
              </h2>
              <p className="mt-4 max-w-[56ch] text-[1.1875rem] leading-normal">{c.intro}</p>
            </div>
          </div>

          <div className="wrap pb-14 min-[900px]:pb-20">
            <div
              aria-hidden="true"
              className="hidden grid-cols-[2.75rem_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.6fr)] gap-x-8 border-b-4 border-ink pb-2 pt-6 text-[0.9375rem] font-extrabold min-[900px]:grid"
            >
              <span>Have</span>
              <span>Item</span>
              <span>Realistic amount</span>
              <span>Shelf life and notes</span>
            </div>
            <ul>
              {c.items.map((i) => {
                const key = haveKey(c.slug, i.item);
                const got = have.has(key);
                const id = `have-${key.replace("/", "-")}`;

                return (
                  <li
                    key={i.item}
                    className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-x-3 gap-y-1.5 border-b border-ink py-5 min-[900px]:grid-cols-[2.75rem_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.6fr)] min-[900px]:gap-x-8 min-[900px]:py-6"
                  >
                    <div className="row-span-3 -mt-2 min-[900px]:row-span-1">
                      <TickBox id={id} checked={got} onChange={() => toggle(key)} />
                    </div>
                    <h3 className="col-start-2 text-[1.375rem] min-[900px]:col-start-auto min-[900px]:text-[1.5rem]">
                      <label
                        htmlFor={id}
                        className={`cursor-pointer ${got ? "text-ink-2 line-through decoration-[3px] print:text-ink print:no-underline" : ""}`}
                      >
                        {i.item}
                      </label>
                      {got ? <span className="sr-only"> (you have this)</span> : null}
                      {i.priority ? (
                        <span className="ml-2.5 inline-block translate-y-[-0.2em] rounded-[4px] bg-ink px-1.5 py-0.5 align-middle text-[0.75rem] font-extrabold tracking-normal text-paper print:border print:border-black print:bg-white print:text-black">
                          First
                        </span>
                      ) : null}
                    </h3>
                    <p className="col-start-2 font-bold tabular-nums min-[900px]:col-start-auto">
                      <span className="sr-only">Realistic amount: </span>
                      {i.amount}
                    </p>
                    <div className="col-start-2 text-ink-2 min-[900px]:col-start-auto">
                      <p className="measure">{i.notes}</p>
                      {i.products ? (
                        <ul className="mt-3 border-t-2 border-ink text-[0.9375rem]">
                          {i.products.map((p) => (
                            <li key={p.url} className="border-b border-ink py-2.5">
                              <a
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-extrabold text-ink hover:decoration-4"
                              >
                                {p.name}
                              </a>{" "}
                              <span>{p.note}</span>
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
        </section>
      ))}
    </>
  );
}
