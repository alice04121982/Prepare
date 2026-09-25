import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Diagram from "@/components/Diagram";
import Callout from "@/components/Callout";
import Arrow from "@/components/home/Arrow";
import { scenarios } from "@/data/scenarios";
import { officialGuidance, guidanceLastChecked } from "@/data/official-guidance";

export const metadata: Metadata = {
  alternates: { canonical: "/what-might-stop" },
  title: "What might stop",
  description:
    "What usually stops in an emergency, how long it lasts, why the UK government asks households to be ready for three days, and where the official guidance is.",
};

/** What might stop, each with the category label it carries on the homepage shelf. */
const whatStops: { text: string; cat: string }[] = [
  { text: "The heating goes off.", cat: "bg-cat-power" },
  { text: "The shops run short, or cannot take cards.", cat: "bg-cat-food" },
  { text: "Nothing comes out of the taps.", cat: "bg-cat-water" },
  { text: "Cash machines and card readers stop.", cat: "bg-cat-money" },
  { text: "Mobile networks and the internet go down.", cat: "bg-cat-news" },
  { text: "Buses and trains stop.", cat: "bg-cat-people" },
  { text: "Prescriptions are hard to get.", cat: "bg-cat-health" },
];

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function WhatMightStopPage() {
  return (
    <main>
      <PageIntro
        title="what might stop, and for how long"
        lede="What can stop at home, and how long it usually lasts. Since 2024 the UK, the EU, Sweden, Finland, Norway and France have all asked people to keep a few days of supplies. Their reasons are the same: severe weather, attacks on power and water, cyber attacks, and the possibility of conflict in Europe. None of them say anything is imminent."
        aside={<Diagram name="duration" />}
      />

      {/* What might stop: a ruled list, each line carrying its category label */}
      <section aria-labelledby="stop-h" className="wrap py-16 min-[900px]:py-24">
        <h2 id="stop-h" className="h-section">
          what it looks like at home
        </h2>
        <p className="measure mt-5 text-lg">
          Severe weather, a fault in the grid, a cyber attack on a water
          company, or disruption from a conflict elsewhere in Europe can all
          have the same effect at home.
        </p>
        <ul className="mt-9 max-w-[980px] border-t-[3px] border-ink min-[900px]:grid min-[900px]:grid-cols-2 min-[900px]:gap-x-10">
          {whatStops.map(({ text, cat }) => (
            <li
              key={text}
              className="flex min-h-16 items-center gap-4 border-b border-ink py-3.5 text-[1.1875rem] font-bold leading-snug"
            >
              <span
                aria-hidden="true"
                data-cat
                className={`${cat} size-6 flex-none border-2 border-ink`}
              />
              {text}
            </li>
          ))}
        </ul>
      </section>

      {/* How long it lasts: duration on the left in tabular text */}
      <section aria-labelledby="long-h" className="border-t-[3px] border-ink py-16 min-[900px]:py-24">
        <div className="wrap">
          <h2 id="long-h" className="h-section">
            how long it usually lasts
          </h2>
          <p className="measure mt-5 text-lg">
            Six realistic situations, how long each usually lasts, and the
            things that make the most difference. Five are about a difficult
            day or week. The sixth is longer and rarer.
          </p>
          <ol className="mt-9 border-y-[3px] border-ink">
            {scenarios.map((s) => (
              <li
                key={s.slug}
                className="grid gap-y-3 border-t border-ink py-6 first:border-t-0 min-[900px]:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] min-[900px]:gap-x-10 min-[900px]:py-8"
              >
                <p className="font-bold tabular-nums text-ink-2 min-[900px]:pt-1.5">
                  {s.typicalDuration}
                </p>
                <div className="measure">
                  <h3 className="h-sub lowercase">{s.title}</h3>
                  <p className="mt-3">{s.summary}</p>
                  <p className="mt-2">
                    <b className="font-extrabold">What helps most:</b>{" "}
                    {s.whatHelps.slice(0, 2).join(" ")}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <Callout title="One kit covers all of them">
            <p>
              A few days of water, food, light, medication, and a way to hear
              the news covers the first five, and is the foundation for the
              sixth. Armed conflict extends the same kit rather than replacing
              it.
            </p>
          </Callout>
        </div>
      </section>

      {/* Official guidance: grouped ruled lists, publisher in small text */}
      <section aria-labelledby="gov-h" className="border-t-[3px] border-ink py-16 min-[900px]:py-24">
        <div className="wrap">
          <h2 id="gov-h" className="h-section">
            what the government says
          </h2>
          <p className="measure mt-5 text-lg">
            The UK government&rsquo;s own site is called Prepare. It is short
            and calm, and takes about ten minutes to read. We checked every
            link on{" "}
            <span className="tabular-nums">{formatDate(guidanceLastChecked)}</span>.
          </p>
          <div className="mt-6">
            {officialGuidance.map((group) => (
              <section key={group.title} className="mt-12 min-[900px]:mt-16">
                <h3 className="h-sub lowercase">{group.title}</h3>
                <ol className="mt-5 border-y-[3px] border-ink">
                  {group.links.map((l) => (
                    <li
                      key={l.url + l.title}
                      className="grid gap-y-1.5 border-t border-ink py-4.5 first:border-t-0 min-[900px]:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] min-[900px]:gap-x-10"
                    >
                      <p className="text-[0.9375rem] font-bold text-ink-2 min-[900px]:pt-1">
                        {l.publisher}
                      </p>
                      <div className="measure">
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-2.5 text-[1.1875rem] font-extrabold leading-snug hover:decoration-4"
                        >
                          {l.title}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        <p className="text-ink-2">{l.summary}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Next steps" className="no-print border-t-[3px] border-ink py-12 min-[900px]:py-16">
        <div className="wrap flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link href="/checklist" className="btn btn-primary btn-lg">
            see the checklist <Arrow />
          </Link>
          <Link href="/kits" className="btn btn-secondary btn-lg">
            see the kits
          </Link>
        </div>
      </section>
    </main>
  );
}
