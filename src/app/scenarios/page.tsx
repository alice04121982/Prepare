import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Illustration from "@/components/Illustration";
import Photo from "@/components/Photo";

const photoSlot: Record<string, string> = {
  "power-outage": "scen-power",
  "water-disruption": "scen-water",
  "supply-delays": "scen-supply",
  "extreme-weather": "scen-weather",
  "armed-conflict": "scen-conflict",
};
import Callout from "@/components/Callout";
import { scenarios } from "@/data/scenarios";

export const metadata: Metadata = {
  title: "Scenarios",
  description:
    "Plain-English explainers for the realistic disruptions this site plans around, with typical durations and what actually helps.",
};

export default function ScenariosPage() {
  return (
    <main className="w-full py-4 sm:py-8">
      <PageIntro
        eyebrow="Understand the scenarios"
        title="What disruption actually looks like"
        lede="Six realistic situations, each with the duration you can reasonably plan for and the handful of things that make a real difference. Five of them are about a difficult day or week. The sixth, armed conflict, is longer and rarer, and is included because people ask, and because Ukraine has shown what it actually looks like for ordinary households."
        aside={<Illustration name="intro-scenarios" className="max-w-[260px]" />}
      />

      <div className="mx-auto max-w-4xl">

      <nav aria-label="Scenarios on this page" className="mb-12">
        <ol className="grid gap-2 sm:grid-cols-2">
          {scenarios.map((s, i) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="flex items-baseline gap-3 rounded-2xl bg-mint-pale px-4 py-3 text-sm hover:bg-tag"
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

      <Callout title="One kit covers all of them">
        <p>
          The scenarios overlap heavily. A few days of water, food, light,
          medication, and a way to hear the news covers the first five, and
          is the foundation for the sixth. Armed conflict extends the same
          kit rather than replacing it. The differences are in the details,
          which is what each section below is for.
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
            {photoSlot[s.slug] ? <Photo slot={photoSlot[s.slug]} aspect="aspect-[16/7]" className="mt-6" /> : null}

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

            <div className="mt-8 rounded-card bg-mint-pale px-6 py-5">
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-accent">
                Neighbours and community
              </p>
              <p className="leading-relaxed">{s.community}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-4 pt-8 text-sm">
        <Link
          href="/checklist"
          className="btn btn-primary"
        >
          See the essentials checklist
        </Link>
        <Link
          href="/community"
          className="btn btn-secondary"
        >
          Why community matters most
        </Link>
      </div>
      </div>
    </main>
  );
}
