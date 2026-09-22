import Link from "next/link";
import { photoCredits } from "@/components/Photo";
import SectionLabel from "@/components/SectionLabel";
import DownloadRow from "@/components/DownloadRow";
import HomeProgress from "@/components/HomeProgress";

const selectClass =
  "w-full rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-heading focus:border-accent";

/** One tap for a household that does not want to fill the form in yet. */
const examples = [
  { label: "Two adults, three days", href: "/build-your-kit?a=2&c=0&d=3" },
  { label: "A family of four, one week", href: "/build-your-kit?a=2&c=2&d=7" },
];

export default function Home() {
  const hero = photoCredits().find((c) => c.slot === "home-hero" && c.rank === 1);
  return (
    <main className="pb-8">
      {/* Hero, with the form that starts the task in it */}
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
        <div className="wrap relative grid items-center gap-10 md:grid-cols-[1.15fr_minmax(0,22rem)]">
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
            <p className="mt-6 text-sm text-white/75">
              Rather read first?{" "}
              <Link href="/checklist" className="underline underline-offset-4 hover:text-white">
                See the checklist.
              </Link>{" "}
              Frightened by the news?{" "}
              <Link href="/worried" className="underline underline-offset-4 hover:text-white">
                Start here instead.
              </Link>
            </p>
          </div>

          <div className="md:justify-self-end">
            <form
              action="/build-your-kit"
              method="get"
              className="grid gap-4 rounded-card bg-white/10 p-6 backdrop-blur-sm"
            >
              <p className="font-heading text-lg text-white">Start with your household</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-sm text-white/90">
                  <span>Adults</span>
                  <select id="home-adults" name="a" defaultValue="2" className={selectClass}>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1.5 text-sm text-white/90">
                  <span>Children</span>
                  <select id="home-children" name="c" defaultValue="0" className={selectClass}>
                    {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="grid gap-1.5 text-sm text-white/90">
                <span>How long to cover</span>
                <select id="home-days" name="d" defaultValue="3" className={selectClass}>
                  <option value="3">Three days, the government minimum</option>
                  <option value="7">One week</option>
                  <option value="14">Two weeks</option>
                </select>
              </label>
              <button type="submit" className="btn btn-primary mt-1 justify-center">
                Build my list
              </button>
            </form>

            <div className="mt-3 flex flex-wrap gap-2">
              {examples.map((e) => (
                <Link
                  key={e.href}
                  href={e.href}
                  className="rounded-full border border-white/30 px-3 py-1.5 text-sm text-white/85 hover:border-white/60 hover:text-white"
                >
                  {e.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The three steps, as rows carrying their own state */}
      <section className="wrap pt-20">
        <SectionLabel>What to do</SectionLabel>
        <h2 className="max-w-3xl text-3xl font-normal leading-tight sm:text-5xl">
          Three things, in this order.
        </h2>
        <HomeProgress />
      </section>

      {/* Why now */}
      <section id="why-now" className="wrap scroll-mt-24 pt-20">
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
