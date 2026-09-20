import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Illustration from "@/components/Illustration";
import ListRow from "@/components/ListRow";
import SectionLabel from "@/components/SectionLabel";
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
        aside={<Illustration name="intro-scenarios" className="w-full" />}
      />

      <div className="mx-auto max-w-3xl">

      <nav aria-label="Scenarios on this page" className="mb-12">
        <SectionLabel>On this page</SectionLabel>
        <ol className="divide-y divide-line border-y border-line">
          {scenarios.map((s, i) => (
            <ListRow key={s.slug} index={i + 1} meta={s.typicalDuration} title={s.title} href={`#${s.slug}`} />
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
            <SectionLabel>Scenario {String(scenarios.indexOf(s) + 1).padStart(2, "0")}</SectionLabel>
            <h2 className="text-2xl font-semibold">{s.title}</h2>
            <p className="mt-1 text-sm text-muted">
              <span className="font-medium text-foreground/80">
                Typical duration:
              </span>{" "}
              {s.typicalDuration}
            </p>
            <p className="prose-plain mt-5 leading-relaxed">{s.description}</p>
            {photoSlot[s.slug] ? <Photo slot={photoSlot[s.slug]} aspect="aspect-[16/7]" className="mt-6" /> : null}

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-card border border-line bg-surface p-6">
                <SectionLabel>What helps</SectionLabel>
                <ul className="space-y-2 leading-relaxed">
                  {s.whatHelps.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-card bg-mint-pale p-6">
                <SectionLabel>Worth knowing</SectionLabel>
                <ul className="space-y-2 leading-relaxed text-foreground/90">
                  {s.worthKnowing.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-card bg-forest px-6 py-5 text-on-forest">
              <SectionLabel onDark>Neighbours and community</SectionLabel>
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
