import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Diagram from "@/components/Diagram";
import ChecklistTracker from "@/components/ChecklistTracker";
import { catFor, catForTitle, Swatch } from "@/components/checklist/cats";
import PrintButton from "@/components/PrintButton";
import Arrow from "@/components/home/Arrow";
import { checklist, startingPoint } from "@/data/checklist";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  alternates: { canonical: "/checklist" },
  title: "Essentials checklist",
  description:
    "What to keep on hand, with realistic quantities and how long each item lasts, plus the questions people ask.",
};

/**
 * The questions below as schema.org FAQPage data, so search results can show
 * the answers. Built from faq.ts, the same source the page renders.
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq
    .flatMap((group) => group.entries)
    .map((e) => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: { "@type": "Answer", text: e.answer.join("\n\n") },
    })),
};

export default function ChecklistPage() {
  return (
    <main>
      <PageIntro
        title="what to keep on hand"
        aside={<Diagram name="water" />}
        lede="Realistic quantities for a household to build up gradually, a few pounds a week from the shop you already use. Every figure is a planning number drawn from public emergency guidance, not a worst case."
      >
        <PrintButton />
      </PageIntro>

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
              work out my quantities <Arrow />
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

      <ChecklistTracker />

      <div className="wrap">
        <p className="measure -mt-4 text-[0.9375rem] text-ink-2 min-[900px]:-mt-8">
          A few items link to a product so you can see what it looks like and
          roughly costs. Anything similar does the same job.
        </p>
      </div>

      {/* Questions */}
      <script
        type="application/ld+json"
        // Escaping "<" keeps the data from ever closing the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
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
