import Link from "next/link";
import Illustration from "@/components/Illustration";
import Photo from "@/components/Photo";
import { scenarios } from "@/data/scenarios";

const whatStops = [
  "The heating goes off.",
  "The shops run short, or cannot take cards.",
  "Nothing comes out of the taps.",
  "Cash machines and card readers stop.",
  "Mobile networks and the internet go down.",
  "Buses and trains stop.",
  "Prescriptions are hard to get.",
];

const sections = [
  {
    href: "/checklist",
    eyebrow: "Start here",
    title: "The checklist",
    body: "What to keep at home, how much, and how long it lasts. Nine things to get first, then the rest over a few weeks from your normal shop.",
    tags: ["Water", "Food", "Light", "Warmth", "Medication", "Cash"],
    illustration: "checklist",
  },
  {
    href: "/scenarios",
    eyebrow: "What to expect",
    title: "The scenarios",
    body: "What a power cut, a water notice, a supply gap, a storm or a longer disruption actually looks like at home, and how long each usually lasts.",
    tags: scenarios.map((s) => s.title),
    illustration: "scenarios",
  },
  {
    href: "/community",
    eyebrow: "Then everyone else",
    title: "Neighbours",
    body: "Once your own household is sorted, the people around you. Who to check on, how to find the group that already exists, and what to agree in advance.",
    tags: ["Check-ins", "Skills", "Local groups"],
    illustration: "community",
  },
];

const audiences = [
  {
    title: "Just watched the news",
    sub: "A sensible starting point",
    body: "A storm warning, a cyber attack in the headlines, a shortage. You want a short, calm answer to what you should actually do.",
  },
  {
    title: "Busy households",
    sub: "Limited time and budget",
    body: "A prioritised list that costs a few pounds a week from the shop you already use, not a weekend and a full car boot.",
  },
  {
    title: "Want the real numbers",
    sub: "Litres and days, sourced",
    body: "How much water a family of four really needs for three days, and what most disruptions actually look like.",
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
              Simple steps for a difficult few days
            </p>
            <h1 className="text-4xl font-normal leading-[1.05] text-forest sm:text-6xl">
              If the power, water or shops stopped for three days, would you be
              all right?
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-forest/85 sm:text-lg">
              The government now asks every UK household to be able to cope on
              its own for seventy-two hours. It would not ask if it did not
              think it might be needed. This site takes that advice and makes
              it doable: what to keep, how much, how long it lasts, and what to
              do first.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/checklist" className="btn btn-primary">
                Start with the checklist
              </Link>
              <a href="#why-now" className="btn btn-secondary">
                Why three days?
              </a>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[380px]">
            <Illustration name="hero" alt="" />
          </div>
        </div>
      </section>

      <Photo slot="home-hero" priority className="mt-6" />

      {/* What might actually stop */}
      <section className="px-4 pt-20">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
          <h2 className="text-3xl font-normal leading-tight sm:text-4xl">
            What might actually stop
          </h2>
          <div>
            <p className="leading-relaxed text-muted">
              An emergency can mean the things we rely on stop working for a
              while. Severe weather, a fault in the grid, a cyber attack on a
              water company, or disruption from a conflict elsewhere in Europe
              can all have the same effect at home:
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {whatStops.map((line) => (
                <li key={line} className="flex gap-3 rounded-2xl bg-mint-pale px-4 py-3 text-sm">
                  <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-5 leading-relaxed text-muted">
              Most of these last hours or days, not weeks. All of them are
              easier with a few things in the cupboard and a plan you made
              while everything worked.
            </p>
          </div>
        </div>
      </section>

      {/* Section header */}
      <section className="mx-auto max-w-2xl px-4 pb-10 pt-20 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
          What this site covers
        </p>
        <h2 className="text-3xl font-normal leading-tight sm:text-5xl">
          A few days of supplies, built slowly. That is most of it.
        </h2>
        <p className="mt-4 text-muted">Three pages do the work. Read them in this order.</p>
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
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">{s.eyebrow}</p>
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
            Written for people who want a sensible answer, not a hobby.
          </h2>
          <p className="leading-relaxed text-muted md:pt-2">
            No bunkers, no bravado, no one selling you a hundred things. A
            short list, honest numbers, and the people on your street. For
            the very worst cases there is little any household can do, and
            this site will not pretend otherwise. For everything short of
            that, which is nearly everything that happens, a few days of
            supplies and a plan is the difference between a bad week and a
            frightening one.
          </p>
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

      {/* Household first, then everyone else */}
      <section className="mt-24 grid gap-6 md:grid-cols-2">
        <div className="rounded-card bg-forest p-8 text-on-forest sm:p-10">
          <h2 className="text-3xl font-normal leading-tight text-on-forest">
            First you and yours. Then everyone else.
          </h2>
          <p className="mt-4 max-w-md leading-relaxed opacity-90">
            In any emergency, help goes first to the people who need it most.
            Everyone else is expected to manage for a while. So sort your own
            household out: water, food, light, warmth, medication, a way to
            hear the news. Then look around you. The better prepared you are,
            the less you need, and the more you can give to the neighbour who
            could not prepare. Communities do pull together in a crisis. They
            pull together faster when fewer households are in trouble.
          </p>
          <Link href="/community" className="btn btn-on-dark mt-8">
            Neighbours and local groups
          </Link>
        </div>
        <Photo slot="home-household" aspect="aspect-[4/3] md:aspect-auto md:h-full" />
      </section>

      <Photo slot="home-community" className="mt-6" />

      {/* Why now */}
      <section id="why-now" className="mx-auto max-w-3xl scroll-mt-24 px-4 pt-24">
        <h2 className="text-3xl font-normal leading-tight sm:text-4xl">Why now</h2>
        <div className="prose-plain mt-5 leading-relaxed">
          <p>
            Since 2024 the UK, the EU, Sweden, Finland, Norway and France have
            all asked their citizens to keep a few days of supplies at home.
            The reasons they give are the same: severe weather, attacks on
            power and water systems, cyber attacks, and the possibility of
            conflict in Europe. None of them say an attack is imminent. All of
            them have decided it is no longer sensible to assume it cannot
            happen.
          </p>
          <p>
            That is as far as the worry needs to go. The rest is a shopping
            list.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/official-guidance" className="btn btn-secondary">
            What the government currently says
          </Link>
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h2 className="text-3xl font-normal leading-tight sm:text-5xl">
          Three days of supplies and a plan on the fridge. That is the whole
          job.
        </h2>
        <Link href="/build-your-kit" className="btn btn-primary mt-8">
          Build your list
        </Link>
      </section>
    </main>
  );
}
