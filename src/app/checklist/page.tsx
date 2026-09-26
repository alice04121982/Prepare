import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Diagram from "@/components/Diagram";
import KitPlanner from "@/components/KitPlanner";
import Arrow from "@/components/home/Arrow";
import { faq } from "@/data/faq";
import { defaultHousehold } from "@/data/kit-rules";
import { defaultDaysFor } from "@/data/lists";
import { getOffers } from "@/lib/paapi";
import { householdFromKitParams } from "./household";

export const metadata: Metadata = {
  alternates: { canonical: "/checklist" },
  title: "What to get: emergency kit checklist for UK households",
  description:
    "What to keep at home and how much, worked out for your household: a 72 hour kit, 2 weeks to a month, 3 months or a grab bag. Take off what you already have and send the rest to one basket.",
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

/**
 * The one page for what to get (merged with the kits page, 26 September
 * 2026): the planner, where you choose a kit and say who lives with you, see
 * the shopping list, take off what you already have and send the rest to
 * Amazon, then the common questions. /kits and /kits/[slug] redirect here.
 */
export default async function ChecklistPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const initial = householdFromKitParams(await searchParams) ?? {
    ...defaultHousehold,
    list: "72-hours" as const,
    days: defaultDaysFor("72-hours"),
  };
  // Live Amazon prices and photos; empty until the API keys are set.
  const offers = await getOffers();

  return (
    <main>
      <PageIntro
        title="what to get"
        aside={<Diagram name="water" />}
        lede="Say who lives with you and see your shopping list, with every amount worked out. Take off anything you already have, then send the rest to Amazon. Every figure comes from public emergency guidance."
      />

      {/* The planner: choose a kit, say who lives with you, tick, buy */}
      <div id="your-kit" className="scroll-mt-4">
        <KitPlanner initial={initial} offers={offers} />
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
          <a href="#your-kit" className="btn btn-primary btn-lg">
            back to your list <Arrow />
          </a>
          <a
            href="/offline-guide"
            download="Offline guide.html"
            className="btn btn-secondary btn-lg"
          >
            download the offline guide
          </a>
        </div>
      </section>
    </main>
  );
}
