import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Illustration from "@/components/Illustration";
import Steps from "@/components/Steps";
import SectionLabel from "@/components/SectionLabel";
import Callout from "@/components/Callout";
import { checklist, startingPoint } from "@/data/checklist";

export const metadata: Metadata = {
  title: "Essentials checklist",
  description:
    "A categorised checklist of what to keep on hand, with realistic quantities and how long each item lasts.",
};

export default function ChecklistPage() {
  return (
    <main className="w-full py-4 sm:py-8">
      <PageIntro
        eyebrow="The essentials"
        title="What to keep on hand"
        lede="Realistic quantities for a household to build up gradually. Not bought all at once, and never more than you can rotate and actually use. Every figure here is a planning number drawn from public emergency guidance, not a worst case."
        aside={<Illustration name="intro-checklist" className="w-full" />}
        photo="checklist"
      />

      <div className="mx-auto max-w-3xl">

      <section className="mb-14">
        <SectionLabel>How this works</SectionLabel>
        <Steps
          steps={[
            { title: "Count", body: "Most cupboards already hold a few days. Check the tins, the torch drawer and the medicine cabinet before you buy anything." },
            { title: "Get essentials", body: "Water, a tin opener, torches, batteries, a power bank, a radio, a contacts card, a first aid kit, a small amount of cash. One or two a week." },
            { title: "Build the rest slowly", body: "One extra of something you already eat each shop. Rotate the oldest first. A few pounds a week, and it never goes to waste." },
          ]}
        />
      </section>

      <section className="mb-14">
        <SectionLabel>Start here</SectionLabel>
        <h2 className="text-2xl font-semibold">If you are starting from nothing</h2>
        <p className="mt-3 leading-relaxed text-muted">
          These few items cover most of the benefit for most of the scenarios.
          Get these first, over a few weeks, and the rest can follow.
        </p>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2">
          {startingPoint.map((i, idx) => (
            <li
              key={i.item}
              className="flex gap-3 rounded-2xl bg-mint-pale px-4 py-3"
            >
              <span className="font-heading text-xs text-muted">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-medium">{i.item}</span>
                <span className="block text-sm text-muted">{i.amount}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <Callout title="Build it slowly">
        <p>
          This list is meant to be built up over weeks from your normal
          shopping, a few pounds at a time. Buying one extra of something you
          already eat each time you shop gets most households to a
          week&rsquo;s cover in a couple of months, and takes nothing off the
          shelf for anyone else.
        </p>
      </Callout>

      <Callout title="About the product links">
        <p>
          A few items below link to a specific product. Those links go to
          the maker&rsquo;s own site, never to a retailer, and they are not
          affiliate links. They are there because it is useful to see what
          &ldquo;a portable power station&rdquo; actually looks like and
          roughly costs, not because you need that brand. Anything similar
          does the same job.
        </p>
      </Callout>

      <nav aria-label="Categories" className="mb-10 mt-12">
        <ul className="flex flex-wrap gap-2 text-sm">
          {checklist.map((c) => (
            <li key={c.slug}>
              <a
                href={`#${c.slug}`}
                className="tag hover:bg-tag"
              >
                {c.title}
              </a>
            </li>
          ))}
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
                                </a>{" "}
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

      <div className="mt-8 flex flex-wrap gap-4 pt-8 text-sm">
        <Link
          href="/scenarios"
          className="btn btn-primary"
        >
          See which scenario each item is for
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
