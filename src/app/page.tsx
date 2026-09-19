import Link from "next/link";
import Illustration from "@/components/Illustration";
import Photo, { photoCredits } from "@/components/Photo";
import SectionLabel from "@/components/SectionLabel";
import DownloadRow from "@/components/DownloadRow";
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
import { scenarios } from "@/data/scenarios";

const whatStops: { text: string; icon: LucideIcon }[] = [
  { text: "The heating goes off.", icon: Thermometer },
  { text: "The shops run short, or cannot take cards.", icon: ShoppingCart },
  { text: "Nothing comes out of the taps.", icon: Droplet },
  { text: "Cash machines and card readers stop.", icon: Banknote },
  { text: "Mobile networks and the internet go down.", icon: WifiOff },
  { text: "Buses and trains stop.", icon: Bus },
  { text: "Prescriptions are hard to get.", icon: Pill },
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
    body: "Once your own household has what it needs, the people around you. Who to check on, how to find the group that already exists, and what to agree in advance.",
    tags: ["Check-ins", "Skills", "Local groups"],
    illustration: "community",
  },
];

const audiences = [
  {
    title: "You have seen the news",
    sub: "A sensible starting point",
    body: "A weather warning, a cyber attack in the headlines, a shortage. You want a clear answer to what you should actually do.",
  },
  {
    title: "You have little time or money",
    sub: "A few pounds a week",
    body: "A prioritised list built up from the shop you already use, over a few weeks, with nothing going to waste.",
  },
  {
    title: "You want the actual figures",
    sub: "Litres and days, sourced",
    body: "How much water a family of four needs for three days, and how long most disruptions really last.",
  },
];


export default function Home() {
  const hero = photoCredits().find((c) => c.slot === "home-hero" && c.rank === 1);
  return (
    <main className="pb-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-card bg-mint px-6 py-12 sm:px-12 sm:py-20">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/photos/${hero.file}`}
            alt=""
            width={hero.w}
            height={hero.h}
            className="absolute inset-0 h-full w-full object-cover opacity-40 saturate-[.6]"
          />
        ) : null}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-mint via-mint/85 to-mint/40" />
        <div className="wrap relative grid items-center gap-10 md:grid-cols-[1.25fr_1fr]">
          <div>
            <SectionLabel onDark>Simple steps for a difficult few days</SectionLabel>
            <h1 className="max-w-[18ch] text-4xl font-normal leading-[1.05] text-white sm:text-6xl">
              If the power went off, the water stopped and the shops were shut
              for three days, would you be all right?
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
              The government now asks every UK household to be able to cope on
              its own for seventy-two hours. This site takes that advice and
              makes it practical: what to keep, how much, how long it lasts,
              and what to do first.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/checklist" className="btn btn-primary">
                Start with the checklist
              </Link>
              <a href="#why-now" className="btn btn-on-dark">
                Why three days?
              </a>
            </div>
            <p className="mt-6 text-sm text-white/75">
              Frightened by the news?{" "}
              <Link href="/worried" className="underline underline-offset-4 hover:text-white">
                Start here instead.
              </Link>
            </p>
          </div>
          <div className="mx-auto w-full max-w-[420px] md:justify-self-end">
            <Illustration name="hero" alt="" className="drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* What might actually stop */}
      <section className="px-4 pt-20">
        <div className="wrap grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
          <div>
            <SectionLabel>What might stop</SectionLabel>
            <h2 className="text-3xl font-normal leading-tight sm:text-4xl">
              What might actually stop
            </h2>
          </div>
          <div className="measure">
            <p className="leading-relaxed text-muted">
              An emergency can mean the things we rely on stop working for a
              while. Severe weather, a fault in the grid, a cyber attack on a
              water company, or disruption from a conflict elsewhere in Europe
              can all have the same effect at home:
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
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
        <div className="flex justify-center">
          <SectionLabel>What this site covers</SectionLabel>
        </div>
        <h2 className="text-3xl font-normal leading-tight sm:text-5xl">
          <span className="block text-left">Have the essentials at home to tide you over</span>
          <span className="block text-right">until the council, the utilities or the government can fix the problem or get help to you.</span>
        </h2>
        <p className="mt-4 text-muted">Three pages cover it. Read them in this order.</p>
      </section>

      {/* Alternating cards */}
      <section className="wrap space-y-6">
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
              <div className="mb-2 flex items-center justify-between">
                <SectionLabel>{s.eyebrow}</SectionLabel>
                <span className="font-heading mb-4 text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              </div>
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
      <section className="wrap px-4 pt-24">
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div>
            <SectionLabel>Who this is for</SectionLabel>
            <h2 className="text-3xl font-normal leading-tight sm:text-4xl">
              Ordinary households, with ordinary amounts of time and money.
            </h2>
          </div>
          <p className="measure leading-relaxed text-muted md:pt-2">
            This is not a survival site. It is a short list, the real
            figures, and a plan you can make in an evening. For the very
            worst events there is little any household can do, and this site
            will not pretend otherwise. For everything short of that, which
            is nearly everything that happens, a few days of supplies and a
            plan make a difficult week manageable.
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
      <section className="wrap mt-24 grid gap-6 md:grid-cols-2">
        <div className="rounded-card bg-forest p-8 text-on-forest sm:p-10">
          <SectionLabel onDark>The order of things</SectionLabel>
          <h2 className="text-3xl font-normal leading-tight text-on-forest">
            First you and yours. Then everyone else.
          </h2>
          <p className="mt-4 max-w-prose leading-relaxed opacity-90">
            In any emergency, help goes first to the people who need it most.
            Everyone else is expected to manage for a while. So make sure your
            own household has what it needs: water, food, light, warmth,
            medication, a way to hear the news. Then look around you. The better prepared you are,
            the less you need, and the more you can give to the neighbour who
            could not prepare. Communities do pull together in a crisis. They
            pull together faster when fewer households are in trouble.
          </p>
          <Link href="/community" className="btn btn-on-dark mt-8">
            Neighbours and local groups
          </Link>
        </div>
        <Photo slot="home-household" rank={6} aspect="aspect-[4/3] md:aspect-auto md:h-full" />
      </section>

      <Photo slot="home-community" aspect="aspect-[16/8]" className="mt-6" />

      {/* Why now */}
      <section id="why-now" className="mx-auto max-w-3xl scroll-mt-24 px-4 pt-24">
        <SectionLabel>Why now</SectionLabel>
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
            So be prepared. Buy the essentials and store them away, so you
            have what you need if the power goes off, the water stops or the
            shelves are empty.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/official-guidance" className="btn btn-secondary">
            What the government currently says
          </Link>
        </div>
      </section>

      <section className="wrap mt-16">
        <DownloadRow
          href="/offline/index.html"
          download="stay-prepared-offline-guide.html"
          title="Download the offline guide"
          detail="One file, no internet needed. Save it, print it, share it before you need it."
        />
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h2 className="text-3xl font-normal leading-tight sm:text-5xl">
          Three days of supplies and a plan your household knows. Taking
          action now makes a difficult few days much easier to manage.
        </h2>
        <Link href="/build-your-kit" className="btn btn-primary mt-8">
          Build your list
        </Link>
      </section>
    </main>
  );
}
