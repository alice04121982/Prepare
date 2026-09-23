import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Diagram from "@/components/Diagram";
import SectionLabel from "@/components/SectionLabel";
import ChecklistTracker from "@/components/ChecklistTracker";
import { checklist, startingPoint } from "@/data/checklist";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "Essentials checklist",
  description:
    "What to keep on hand, with realistic quantities and how long each item lasts, plus the questions people ask.",
};

export default function ChecklistPage() {
  return (
    <main className="w-full py-4 sm:py-8">
      <PageIntro
        eyebrow="The essentials"
        title="What to keep on hand"
        lede="Realistic quantities for a household to build up gradually, a few pounds a week from the shop you already use. Every figure is a planning number drawn from public emergency guidance, not a worst case."
        aside={<Diagram name="water" />}
      />

      <div className="mx-auto max-w-3xl">
        <section className="mb-14">
          <SectionLabel>Start here</SectionLabel>
          <h2 className="text-2xl font-semibold">Get these first</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Check the cupboards, the torch drawer and the medicine cabinet
            before you buy anything. Then these few items cover most of the
            benefit. Get them over a few weeks and the rest can follow.
          </p>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {startingPoint.map((i, idx) => (
              <li key={i.item} className="flex gap-3 rounded-2xl bg-mint-pale px-4 py-3">
                <span className="font-heading text-xs text-muted">{String(idx + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-medium">{i.item}</span>
                  <span className="block text-sm text-muted">{i.amount}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/build-your-kit" className="btn btn-primary">
              Work out my quantities and buy the kit
            </Link>
          </div>
        </section>

        <nav aria-label="Categories" className="mb-10">
          <ul className="flex flex-wrap gap-2 text-sm">
            {checklist.map((c) => (
              <li key={c.slug}>
                <a href={`#${c.slug}`} className="tag hover:bg-tag">
                  {c.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#questions" className="tag hover:bg-tag">
                Questions
              </a>
            </li>
          </ul>
        </nav>

        <ChecklistTracker />

        <p className="mt-4 text-sm text-muted">
          A few items link to a product so you can see what it looks like and
          roughly costs. Anything similar does the same job.
        </p>

        <section id="questions" className="mt-16 scroll-mt-24">
          <SectionLabel>Questions</SectionLabel>
          <h2 className="text-2xl font-semibold">The questions people ask</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {faq.flatMap((group) => group.entries).map((e) => (
              <details key={e.slug} id={e.slug} className="group scroll-mt-24 py-4">
                <summary className="cursor-pointer list-none font-heading text-lg font-medium text-heading marker:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {e.question}
                    <span aria-hidden className="mt-1 text-muted transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <div className="prose-plain mt-3 leading-relaxed text-foreground/90">
                  {e.answer.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-4 pt-8 text-sm">
          <Link href="/build-your-kit" className="btn btn-primary">
            Build your kit
          </Link>
          <a
            href="/offline/index.html"
            download="stay-prepared-offline-guide.html"
            className="btn btn-secondary"
          >
            Download the offline guide
          </a>
        </div>
      </div>
    </main>
  );
}
