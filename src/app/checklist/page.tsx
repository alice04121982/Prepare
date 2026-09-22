import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Illustration from "@/components/Illustration";
import SectionLabel from "@/components/SectionLabel";
import Disclosure from "@/components/Disclosure";
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
        aside={<Illustration name="intro-checklist" className="w-full" />}
        photo="checklist"
      />

      <div className="mx-auto max-w-3xl">
        <Disclosure className="mb-12" />

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

        <div className="divide-y divide-line">
          {checklist.map((c) => (
            <section key={c.slug} id={c.slug} className="scroll-mt-24 py-10">
              <SectionLabel>{c.title}</SectionLabel>
              <h2 className="text-2xl font-semibold">{c.title}</h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-muted">{c.intro}</p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-[0.95rem]">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-muted">
                      <th className="w-[30%] py-2 pr-4 font-semibold">Item</th>
                      <th className="w-[30%] py-2 pr-4 font-semibold">Realistic amount</th>
                      <th className="py-2 font-semibold">Shelf life and notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {c.items.map((i) => (
                      <tr key={i.item} className="align-top">
                        <td className="py-3 pr-4 font-medium">
                          {i.item}
                          {i.priority ? (
                            <span className="ml-2 inline-block rounded-full bg-tag px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wider text-heading">
                              First
                            </span>
                          ) : null}
                        </td>
                        <td className="py-3 pr-4">{i.amount}</td>
                        <td className="py-3 text-muted">
                          {i.notes}
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
                                  </a>
                                  {p.priceBand ? <span className="text-muted"> · {p.priceBand}</span> : null}
                                  {p.usedIt ? (
                                    <span className="ml-2 inline-block rounded-full bg-tag px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wider text-heading">
                                      Used it
                                    </span>
                                  ) : null}{" "}
                                  <span>{p.note}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>

        <p className="mt-4 text-sm text-muted">
          A few items link to a product so you can see what it looks like and
          roughly costs. Anything similar does the same job. Some of those
          links earn us a small commission; see{" "}
          <Link href="/disclosure" className="underline underline-offset-4">
            how this site earns money
          </Link>
          .
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
