import Link from "next/link";
import Illustration from "@/components/Illustration";
import { photoCredits } from "@/components/Photo";
import SectionLabel from "@/components/SectionLabel";
import DownloadRow from "@/components/DownloadRow";
import { ClipboardCheck, ShoppingBasket, Users, type LucideIcon } from "lucide-react";

const steps: { title: string; body: string; href: string; cta: string; icon: LucideIcon }[] = [
  {
    title: "Check what you already have",
    body: "Most cupboards hold a few days. Tins, a torch, the medicine cabinet. Tick them off against the list before you buy anything.",
    href: "/checklist",
    cta: "See the list",
    icon: ClipboardCheck,
  },
  {
    title: "Buy what is missing",
    body: "Say who lives with you and we work out the quantities. One button puts the lot into a basket.",
    href: "/build-your-kit",
    cta: "Build your kit",
    icon: ShoppingBasket,
  },
  {
    title: "Tell your neighbours",
    body: "Two or three names and a check-in plan. That is what gets a street through a bad week.",
    href: "/community",
    cta: "Four things to do",
    icon: Users,
  },
];

const selectClass =
  "w-full rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-heading focus:border-accent";

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
              The government asks every UK household to be able to manage on
              its own for three days. Here is what that means, and how to get
              there this week.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/checklist" className="btn btn-primary">
                See the checklist
              </Link>
              <Link href="/build-your-kit" className="btn btn-on-dark">
                Build your kit
              </Link>
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

      {/* What to do */}
      <section className="wrap pt-20">
        <SectionLabel>What to do</SectionLabel>
        <h2 className="max-w-3xl text-3xl font-normal leading-tight sm:text-5xl">
          Three things, in this order.
        </h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.href} className="flex flex-col rounded-card bg-mint-pale p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-accent"
                >
                  <s.icon size={22} strokeWidth={1.75} />
                </span>
                <span className="font-heading text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-6 text-2xl font-medium leading-tight">{s.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{s.body}</p>
              <Link href={s.href} className="btn btn-secondary mt-6 self-start">
                {s.cta}
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Get the kit */}
      <section className="wrap mt-20 rounded-card bg-forest px-6 py-10 text-on-forest sm:px-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <SectionLabel onDark>Get the kit</SectionLabel>
            <h2 className="max-w-[18ch] text-3xl font-normal leading-tight text-on-forest sm:text-5xl">
              Get everything in one go.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed opacity-90">
              Say who lives with you and how long to cover. You get a list with
              the quantities worked out, a free option for every line, and one
              button that puts the lot into an Amazon basket. Groceries come
              from your normal shop.
            </p>
          </div>
          <form action="/build-your-kit" method="get" className="grid gap-4 rounded-card bg-surface/10 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm">
                <span className="opacity-90">Adults</span>
                <select id="home-adults" name="a" defaultValue="2" className={selectClass}>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="opacity-90">Children</span>
                <select id="home-children" name="c" defaultValue="0" className={selectClass}>
                  {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="grid gap-1.5 text-sm">
              <span className="opacity-90">How long to cover</span>
              <select id="home-days" name="d" defaultValue="3" className={selectClass}>
                <option value="3">Three days, the government minimum</option>
                <option value="7">One week</option>
                <option value="14">Two weeks</option>
                <option value="30">One month</option>
                <option value="90">Three months</option>
              </select>
            </label>
            <button type="submit" className="btn btn-primary mt-2 justify-center">
              Build my list
            </button>
          </form>
        </div>
      </section>

      {/* Why now */}
      <section id="why-now" className="wrap scroll-mt-24 pt-24">
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div>
            <SectionLabel>Why now</SectionLabel>
            <h2 className="text-3xl font-normal leading-tight sm:text-4xl">
              Why three days?
            </h2>
          </div>
          <div className="measure">
            <p className="leading-relaxed text-muted">
              Since 2024 the UK, the EU, Sweden, Finland, Norway and France
              have all asked their citizens to keep a few days of supplies at
              home. None of them say anything is imminent. All of them have
              decided it is no longer sensible to assume it cannot happen.
            </p>
            <Link href="/why" className="btn btn-secondary mt-6">
              What might stop, and what the government says
            </Link>
          </div>
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
    </main>
  );
}
