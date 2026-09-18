import Link from "next/link";
import Illustration from "@/components/Illustration";
import { scenarios } from "@/data/scenarios";

const sections = [
  {
    href: "/checklist",
    eyebrow: "Start here",
    title: "The essentials checklist",
    body: "What to keep on hand, in realistic quantities, and the short list to get first if you have nothing. Built up slowly from things you already buy.",
    tags: ["Water", "Food", "Light", "Medication", "Cash"],
    illustration: "checklist",
  },
  {
    href: "/scenarios",
    eyebrow: "Understand",
    title: "The scenarios",
    body: "Realistic disruptions, how long each usually lasts, and the handful of things that make a real difference in each one.",
    tags: scenarios.map((s) => s.title),
    illustration: "scenarios",
  },
  {
    href: "/community",
    eyebrow: "The important part",
    title: "Community and mutual aid",
    body: "Why the people around you are the most effective preparation there is, and four no-cost things to do this week.",
    tags: ["Neighbours", "Check-ins", "Skills", "Local groups"],
    illustration: "community",
  },
];

const audiences = [
  {
    title: "Just watched the news",
    sub: "A sensible starting point",
    body: "A war, a warning, a heatwave, a shortage. You want a short, calm answer to \"what can I actually do\", not a rabbit hole.",
  },
  {
    title: "Busy households",
    sub: "Limited time and budget",
    body: "You want a prioritised list that costs a few pounds a week, not a weekend and a full car boot.",
  },
  {
    title: "Wanting honest numbers",
    sub: "Real durations, not worst cases",
    body: "You want to know how long a 72-hour kit actually lasts a family of four, and what most disruptions really look like.",
  },
];

export default function Home() {
  return (
    <main className="pb-8">
      {/* Hero */}
      <section className="rounded-card bg-mint px-6 py-12 sm:px-12 sm:py-16">
        <div className="grid items-center gap-10 md:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-forest/80">
              A calm, practical guide
            </p>
            <h1 className="text-4xl font-normal leading-[1.05] text-forest sm:text-6xl">
              The news is worse. Here is what is actually in your hands.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-forest/85 sm:text-lg">
              War in Europe, authoritarian politics, a climate that no longer
              behaves, and a widening gap between people who can afford to
              adapt and people who cannot. Most of that is beyond any one
              household. A surprising amount of the rest is not. This site is
              about that part: what to keep on hand, how long it lasts, and
              who you know.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/checklist" className="btn btn-primary">
                See the checklist
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
          <div className="mx-auto w-full max-w-[380px]">
            <Illustration name="hero" alt="" />
          </div>
        </div>
      </section>

      {/* Section header */}
      <section className="mx-auto max-w-2xl px-4 pb-10 pt-20 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
          What this site covers
        </p>
        <h2 className="text-3xl font-normal leading-tight sm:text-5xl">
          A few days of cover, built slowly, and neighbours you know by name.
        </h2>
        <p className="mt-4 text-muted">
          Three pages do most of the work. Read them in any order.
        </p>
      </section>

      {/* Alternating cards */}
      <section className="space-y-6">
        {sections.map((s, i) => (
          <Link
            key={s.href}
            href={s.href}
            className={`group grid items-center gap-8 rounded-card bg-mint-pale p-6 sm:p-10 md:grid-cols-2 ${
              i % 2 === 1 ? "md:ml-24" : "md:mr-24"
            }`}
          >
            <div className={`mx-auto w-full max-w-xs ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <Illustration name={s.illustration} />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
                {s.eyebrow}
              </p>
              <h3 className="text-2xl font-medium sm:text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-foreground/85">{s.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-block text-sm font-medium text-heading underline-offset-4 group-hover:underline">
                Read more
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Who it's for */}
      <section className="px-4 pt-24">
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-start">
          <h2 className="text-3xl font-normal leading-tight sm:text-4xl">
            Written for people who feel helpless watching the news, and would
            rather not.
          </h2>
          <div className="prose-plain leading-relaxed text-muted md:pt-2">
            <p>
              Turn on the news and it is hard not to feel that everything is
              out of your hands. Some of it genuinely is. For the very worst
              cases there is little any household can do, and this site will
              not sell you the idea that a cupboard full of tins changes that.
            </p>
            <p>
              But almost everything short of that, which is almost everything
              that actually happens, is different. Power cuts, water notices,
              thin shelves, a bad storm, a long winter of rolling outages like
              the one Ukraine has lived through. Those are got through, and
              they are got through by ordinary people who had a few things
              ready and knew their neighbours. Doing the small, sensible
              things is not a fantasy of control. It is control, over the
              part that is yours.
            </p>
            <p>
              That is the part we cover. No bunkers, no bravado, no one
              selling you a hundred things. A short list, honest numbers, and
              the people on your street.
            </p>
          </div>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {audiences.map((a) => (
            <div key={a.title} className="border-l-2 border-sage-light pl-5">
              <h3 className="text-xl font-medium">{a.title}</h3>
              <p className="mt-1 text-sm text-sage">{a.sub}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Two-card CTA */}
      <section className="mt-24 grid gap-6 md:grid-cols-2">
        <div className="rounded-card bg-forest p-8 text-on-forest sm:p-10">
          <h2 className="text-3xl font-normal leading-tight text-on-forest">
            The most effective preparation is other people
          </h2>
          <p className="mt-4 max-w-md leading-relaxed opacity-90">
            A stocked cupboard helps one household for a few days. A street
            that knows itself helps everyone on it, for as long as it takes.
          </p>
          <Link href="/community" className="btn btn-on-dark mt-8">
            Community and mutual aid
          </Link>
        </div>
        <div className="flex items-center justify-center rounded-card bg-mint-light p-8">
          <div className="w-full max-w-xs">
            <Illustration name="neighbours" />
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h2 className="text-3xl font-normal leading-tight sm:text-5xl">
          Preparation is something you do with your neighbours, not against
          them. Start with three days and two names.
        </h2>
        <Link href="/checklist" className="btn btn-primary mt-8">
          Start with the checklist
        </Link>
      </section>
    </main>
  );
}
