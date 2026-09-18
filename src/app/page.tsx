import Link from "next/link";
import { scenarios } from "@/data/scenarios";

const entryPoints = [
  {
    href: "/checklist",
    label: "Start here",
    title: "The essentials checklist",
    body: "What to keep on hand, in realistic quantities, and the short list to get first if you have nothing.",
  },
  {
    href: "/scenarios",
    label: "Understand",
    title: "The scenarios",
    body: "Five realistic disruptions, how long each usually lasts, and what actually helps in each.",
  },
  {
    href: "/community",
    label: "The important part",
    title: "Community and mutual aid",
    body: "Why the people around you are the most effective preparation there is, and how to start.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <section>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-accent">
          A calm, practical guide
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
          What to keep on hand for a difficult week, and how long it really
          lasts.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Power cuts, water notices, thin shelves, bad weather. Most
          disruptions are short, local, and got through together. This site
          covers the modest preparation that helps, with honest durations and
          quantities, and treats neighbours as the first line of resilience,
          not the last.
        </p>
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-3">
        {entryPoints.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className="group flex flex-col rounded-md border border-line p-5 hover:border-accent hover:bg-soft"
          >
            <span className="mb-2 text-xs font-medium uppercase tracking-wider text-muted group-hover:text-accent">
              {e.label}
            </span>
            <span className="font-heading text-lg font-semibold">{e.title}</span>
            <span className="mt-2 text-sm leading-relaxed text-muted">{e.body}</span>
          </Link>
        ))}
      </section>

      <section className="mt-16 rounded-md bg-soft px-6 py-6">
        <h2 className="text-lg font-semibold">Why this exists, and why it is not alarmist</h2>
        <p className="mt-3 leading-relaxed">
          This is not a survival site, and it is not about fending for
          yourself. Decades of evidence say people pull together in a crisis,
          and that the households who struggle most are the ones nobody
          checked on. So the advice here is deliberately boring: a few days
          of water, food, light, and medication, built up slowly from things
          you already buy, and two neighbours you know by name. Nothing here
          asks you to prepare for the end of the world, because that is not
          what happens.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-lg font-semibold">The scenarios at a glance</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {scenarios.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/scenarios#${s.slug}`}
                className="flex flex-col gap-1 py-3 hover:text-accent sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="font-medium">{s.title}</span>
                <span className="text-sm text-muted">{s.typicalDuration}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border-t border-line pt-8">
        <a
          href="/offline/index.html"
          download="prepare-offline-guide.html"
          className="inline-block rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-ink hover:opacity-90"
        >
          Download the offline guide
        </a>
        <p className="mt-3 max-w-xl text-sm text-muted">
          A single self-contained HTML file with no external requests. Save
          it, print it, or share it before you need it. It opens with no
          internet connection at all.
        </p>
      </section>
    </main>
  );
}
