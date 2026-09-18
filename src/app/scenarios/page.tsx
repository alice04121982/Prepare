import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Callout from "@/components/Callout";
import { scenarios } from "@/data/scenarios";

export const metadata: Metadata = {
  title: "Scenarios",
  description:
    "Plain-English explainers for the realistic disruptions this site plans around, with typical durations and what actually helps.",
};

export default function ScenariosPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <PageIntro
        eyebrow="Understand the scenarios"
        title="What disruption actually looks like"
        lede="Five realistic situations, each with the duration you can reasonably plan for and the handful of things that make a real difference. Nothing here is about the end of the world. It is about a difficult day or week, and getting through it well."
      />

      <nav aria-label="Scenarios on this page" className="mb-12">
        <ol className="grid gap-2 sm:grid-cols-2">
          {scenarios.map((s, i) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="flex items-baseline gap-3 rounded-md border border-line px-4 py-3 text-sm hover:border-accent hover:bg-soft"
              >
                <span className="font-heading text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-medium">{s.title}</span>
                  <span className="block text-muted">{s.typicalDuration}</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <Callout title="One kit covers all five">
        <p>
          The scenarios overlap heavily. A few days of water, food, light,
          medication, and a way to hear the news covers every one of them.
          The differences are in the details, which is what each section
          below is for.
        </p>
      </Callout>

      <div className="divide-y divide-line">
        {scenarios.map((s) => (
          <article
            key={s.slug}
            id={s.slug}
            className="scroll-mt-24 py-12 first:pt-4"
          >
            <h2 className="text-2xl font-semibold">{s.title}</h2>
            <p className="mt-1 text-sm text-muted">
              <span className="font-medium text-foreground/80">
                Typical duration:
              </span>{" "}
              {s.typicalDuration}
            </p>
            <p className="prose-plain mt-5 leading-relaxed">{s.description}</p>

            <h3 className="mt-8 text-lg font-semibold">What helps</h3>
            <ul className="mt-3 space-y-2 leading-relaxed">
              {s.whatHelps.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-lg font-semibold">Worth knowing</h3>
            <ul className="mt-3 space-y-2 leading-relaxed text-foreground/90">
              {s.worthKnowing.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-muted"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-md bg-soft px-5 py-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-accent">
                Neighbours and community
              </p>
              <p className="leading-relaxed">{s.community}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-4 border-t border-line pt-8 text-sm">
        <Link
          href="/checklist"
          className="rounded-md bg-accent px-5 py-3 font-medium text-accent-ink hover:opacity-90"
        >
          See the essentials checklist
        </Link>
        <Link
          href="/community"
          className="rounded-md border border-line px-5 py-3 font-medium hover:bg-soft"
        >
          Why community matters most
        </Link>
      </div>
    </main>
  );
}
