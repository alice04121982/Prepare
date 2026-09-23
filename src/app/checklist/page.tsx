import type { Metadata } from "next";
import Link from "next/link";
import PageIntro, { catBg, type Cat } from "@/components/PageIntro";
import Arrow from "@/components/home/Arrow";
import { checklist, startingPoint } from "@/data/checklist";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "Essentials checklist",
  description:
    "What to keep on hand, with realistic quantities and how long each item lasts, plus the questions people ask.",
};

/** Each checklist category wears one category colour, like the label on a tin. */
const catBySlug: Record<string, Cat> = {
  water: "water",
  food: "food",
  "power-and-light": "power",
  "first-aid-and-medication": "health",
  communication: "news",
  sanitation: "health",
  documents: "money",
  cash: "money",
  "household-specific": "people",
};

const catFor = (slug: string): Cat => catBySlug[slug] ?? "water";
const catForTitle = (title: string): Cat =>
  catFor(checklist.find((c) => c.title === title)?.slug ?? "");

/** A small square of the category colour, printed as an outline. */
function Swatch({ cat }: { cat: Cat }) {
  return (
    <span
      aria-hidden="true"
      data-cat
      className={`${catBg[cat]} inline-block size-3.5 flex-none border-2 border-ink`}
    />
  );
}

export default function ChecklistPage() {
  return (
    <main>
      <PageIntro
        cat="water"
        title="what to keep on hand"
        lede="Realistic quantities for a household to build up gradually, a few pounds a week from the shop you already use. Every figure is a planning number drawn from public emergency guidance, not a worst case."
      />

      {/* Start here: the short list */}
      <section aria-labelledby="first-h" className="wrap pb-16 pt-12 min-[900px]:pb-24 min-[900px]:pt-18">
        <div className="min-[900px]:grid min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] min-[900px]:gap-16">
          <div>
            <h2 id="first-h" className="h-section">
              get these first
            </h2>
            <p className="mt-5 max-w-[48ch] text-[1.1875rem] leading-normal">
              Check the cupboards, the torch drawer and the medicine cabinet
              before you buy anything. Then these few items cover most of the
              benefit. Get them over a few weeks and the rest can follow.
            </p>
            <Link href="/build-your-kit" className="no-print btn btn-primary btn-lg mt-7">
              work out my quantities and buy the kit <Arrow />
            </Link>
          </div>
          <ul className="mt-10 border-b-8 border-t-8 border-ink min-[900px]:mt-2">
            {startingPoint.map((i) => (
              <li
                key={i.item}
                className="grid gap-x-6 gap-y-0.5 border-t border-ink py-3.5 first:border-t-0 min-[600px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] min-[600px]:items-baseline"
              >
                <span className="flex items-baseline gap-2.5 font-extrabold">
                  <Swatch cat={catForTitle(i.category)} />
                  {i.item}
                </span>
                <span className="pl-6 text-ink-2 tabular-nums min-[600px]:pl-0">{i.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Jump to a category */}
      <nav aria-label="Categories" className="no-print border-t-[3px] border-ink">
        <ul className="wrap flex flex-wrap gap-2 py-6">
          {checklist.map((c) => (
            <li key={c.slug}>
              <a
                href={`#${c.slug}`}
                className="inline-flex min-h-11 items-center gap-2.5 rounded-[4px] border-2 border-ink px-3 font-bold no-underline hover:bg-(--hover)"
              >
                <Swatch cat={catFor(c.slug)} />
                {c.title}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#questions"
              className="inline-flex min-h-11 items-center rounded-[4px] border-2 border-ink px-3 font-bold no-underline hover:bg-(--hover)"
            >
              Questions
            </a>
          </li>
        </ul>
      </nav>

      {/* The tins: one labelled band per category, then its items on the shelf */}
      {checklist.map((c) => (
        <section key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-h`} className="scroll-mt-24">
          <div data-cat className={`${catBg[catFor(c.slug)]} border-y-[3px] border-ink`}>
            <div className="wrap pb-7 pt-8 min-[900px]:pb-10 min-[900px]:pt-12">
              <h2
                id={`${c.slug}-h`}
                className="display text-[clamp(2.5rem,11vw,5rem)]"
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
              className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.6fr)] gap-x-8 border-b-4 border-ink pb-2 pt-6 text-[0.9375rem] font-extrabold min-[900px]:grid"
            >
              <span>Item</span>
              <span>Realistic amount</span>
              <span>Shelf life and notes</span>
            </div>
            <ul>
              {c.items.map((i) => (
                <li
                  key={i.item}
                  className="grid gap-y-1.5 border-b border-ink py-5 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.6fr)] min-[900px]:gap-x-8 min-[900px]:py-6"
                >
                  <h3 className="text-[1.375rem] min-[900px]:text-[1.5rem]">
                    {i.item}
                    {i.priority ? (
                      <span className="ml-2.5 inline-block translate-y-[-0.2em] rounded-[4px] bg-ink px-1.5 py-0.5 align-middle text-[0.75rem] font-extrabold tracking-normal text-paper print:border print:border-black print:bg-white print:text-black">
                        First
                      </span>
                    ) : null}
                  </h3>
                  <p className="font-bold tabular-nums">
                    <span className="sr-only">Realistic amount: </span>
                    {i.amount}
                  </p>
                  <div className="text-ink-2">
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
              ))}
            </ul>
          </div>
        </section>
      ))}

      <div className="wrap">
        <p className="measure -mt-4 text-[0.9375rem] text-ink-2 min-[900px]:-mt-8">
          A few items link to a product so you can see what it looks like and
          roughly costs. Anything similar does the same job.
        </p>
      </div>

      {/* Questions */}
      <section id="questions" aria-labelledby="questions-h" className="wrap scroll-mt-24 pb-16 pt-16 min-[900px]:pb-24 min-[900px]:pt-24">
        <h2 id="questions-h" className="h-section">
          the questions people ask
        </h2>
        <div className="mt-9 border-t-8 border-ink">
          {faq.flatMap((group) => group.entries).map((e) => (
            <details key={e.slug} id={e.slug} className="group scroll-mt-24 border-b border-ink">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-[1.1875rem] font-extrabold leading-snug [&::-webkit-details-marker]:hidden">
                {e.question}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  aria-hidden="true"
                  className="no-print flex-none transition-transform duration-300 group-open:rotate-45"
                >
                  <path d="M9 0v18M0 9h18" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
              </summary>
              <div className="prose-plain measure pb-5">
                {e.answer.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </details>
          ))}
        </div>

        <div className="no-print mt-12 flex flex-wrap items-center gap-4">
          <Link href="/build-your-kit" className="btn btn-primary btn-lg">
            build your kit <Arrow />
          </Link>
          <a
            href="/offline/index.html"
            download="stay-prepared-offline-guide.html"
            className="btn btn-secondary btn-lg"
          >
            download the offline guide
          </a>
        </div>
      </section>
    </main>
  );
}
