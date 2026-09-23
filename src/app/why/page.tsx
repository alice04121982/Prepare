import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Diagram from "@/components/Diagram";
import ListRow from "@/components/ListRow";
import SectionLabel from "@/components/SectionLabel";
import Callout from "@/components/Callout";
import { scenarios } from "@/data/scenarios";
import { officialGuidance, guidanceLastChecked } from "@/data/official-guidance";
import {
  Banknote,
  Bus,
  Droplet,
  Pill,
  ShoppingCart,
  Thermometer,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Why three days",
  description:
    "Why the UK government asks households to be ready for three days, what usually stops, how long it lasts, and where the official guidance is.",
};

const whatStops: { text: string; icon: LucideIcon }[] = [
  { text: "The heating goes off.", icon: Thermometer },
  { text: "The shops run short, or cannot take cards.", icon: ShoppingCart },
  { text: "Nothing comes out of the taps.", icon: Droplet },
  { text: "Cash machines and card readers stop.", icon: Banknote },
  { text: "Mobile networks and the internet go down.", icon: WifiOff },
  { text: "Buses and trains stop.", icon: Bus },
  { text: "Prescriptions are hard to get.", icon: Pill },
];

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function WhyPage() {
  return (
    <main className="w-full py-4 sm:py-8">
      <PageIntro
        eyebrow="Why now"
        title="Why the government asks you to be ready for three days"
        lede="Since 2024 the UK, the EU, Sweden, Finland, Norway and France have all asked their citizens to keep a few days of supplies at home. The reasons they give are the same: severe weather, attacks on power and water systems, cyber attacks, and the possibility of conflict in Europe. None of them say anything is imminent. All of them have decided it is no longer sensible to assume it cannot happen."
        aside={<Diagram name="duration" />}
        photo="guidance"
      />

      <div className="mx-auto max-w-3xl">
        <section>
          <SectionLabel>What might stop</SectionLabel>
          <h2 className="text-2xl font-semibold">What might actually stop</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Severe weather, a fault in the grid, a cyber attack on a water
            company, or disruption from a conflict elsewhere in Europe can all
            have the same effect at home.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {whatStops.map(({ text, icon: Icon }) => (
              <li key={text} className="flex items-center gap-4 rounded-2xl bg-mint-pale px-4 py-3 text-sm">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-accent"
                >
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <SectionLabel>How long it lasts</SectionLabel>
          <h2 className="text-2xl font-semibold">What it usually looks like</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Six realistic situations, how long each usually lasts, and the
            things that make the most difference. Five are about a difficult
            day or week. The sixth is longer and rarer.
          </p>
          <ol className="mt-6 divide-y divide-line border-y border-line">
            {scenarios.map((s, i) => (
              <ListRow key={s.slug} index={i + 1} meta={s.typicalDuration} title={s.title}>
                <p className="text-muted">{s.summary}</p>
                <p className="mt-1">
                  <span className="font-medium">What helps most:</span> {s.whatHelps.slice(0, 2).join(" ")}
                </p>
              </ListRow>
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
        </section>

        <section className="mt-16">
          <SectionLabel>Official guidance</SectionLabel>
          <h2 className="text-2xl font-semibold">What the government says</h2>
          <p className="mt-3 leading-relaxed text-muted">
            The UK government&rsquo;s own site is called Prepare. It is short,
            calm and worth ten minutes, and everything here is consistent with
            it. Every link below was opened and checked on{" "}
            {formatDate(guidanceLastChecked)}.
          </p>
          <div className="mt-6 divide-y divide-line">
            {officialGuidance.map((group) => (
              <section key={group.title} className="py-8">
                <h3 className="text-lg font-semibold">{group.title}</h3>
                <ol className="mt-2 divide-y divide-line">
                  {group.links.map((l, i) => (
                    <ListRow key={l.url + l.title} index={i + 1} title={l.title} href={l.url} external tag={l.publisher} />
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </section>

        <div className="mt-8 flex flex-wrap gap-4 pt-8 text-sm">
          <Link href="/checklist" className="btn btn-primary">
            See the checklist
          </Link>
          <Link href="/build-your-kit" className="btn btn-secondary">
            Build your kit
          </Link>
        </div>
      </div>
    </main>
  );
}
