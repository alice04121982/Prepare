import Link from "next/link";
import Arrow from "@/components/home/Arrow";
import ReachBar from "@/components/home/ReachBar";
import StopList, { type Stop } from "@/components/home/StopList";

const stops: Stop[] = [
  { id: "heating", what: "the heating goes off", helps: "Blankets, warm layers, a hot-water bottle.", cat: "bg-cat-power" },
  { id: "taps", what: "nothing comes out of the taps", helps: "3 litres of water per person per day.", cat: "bg-cat-water" },
  { id: "shops", what: "the shops run short", helps: "Tins and dry food you already eat.", cat: "bg-cat-food" },
  { id: "cash", what: "cards and cash machines stop", helps: "Some cash in small notes.", cat: "bg-cat-money" },
  { id: "networks", what: "mobile networks and the internet go down", helps: "A wind-up or battery radio.", cat: "bg-cat-news" },
  { id: "transport", what: "buses and trains stop", helps: "Knowing who nearby you can reach on foot.", cat: "bg-cat-people" },
  { id: "prescriptions", what: "prescriptions are hard to get", helps: "A week's spare medication where your GP allows.", cat: "bg-cat-health" },
];

const steps = [
  {
    title: "check what you already have",
    body: "Most cupboards hold a few days. Tins, a torch, the medicine cabinet. Tick them off against the list before you buy anything.",
    href: "/checklist",
    cta: "see the checklist",
    cat: "bg-cat-water",
  },
  {
    title: "buy what is missing",
    body: "Say who lives with you and the quantities are worked out for you. The free option comes first on every line.",
    href: "/build-your-kit",
    cta: "build your kit",
    cat: "bg-cat-food",
  },
  {
    title: "talk to your neighbours",
    body: "Two or three names and a way to check on each other. The better prepared you are, the more you can give to the neighbour who could not prepare.",
    href: "/community",
    cta: "how to start",
    cat: "bg-cat-people",
  },
];

const durations = [
  { value: "3", label: "3 days", note: "the government minimum" },
  { value: "7", label: "1 week" },
  { value: "14", label: "2 weeks" },
];

export default function Home() {
  return (
    <main>
      {/* Hero: what the site is, then one action */}
      <section aria-labelledby="hero-h" className="wrap pb-12 pt-10 min-[900px]:pb-22 min-[900px]:pt-18">
        <h1
          id="hero-h"
          className="display max-w-[14ch] text-[clamp(2.75rem,12vw,6.5rem)]"
          style={{ fontVariationSettings: '"wdth" 108' }}
        >
          a practical guide to being ready at home
        </h1>
        <p className="mt-7 max-w-[40ch] text-[1.1875rem] leading-normal min-[900px]:mt-10 min-[900px]:text-[1.375rem]">
          What to keep, how much, how long it lasts and what to do first, if the
          power, water or shops stop for a few days.
        </p>
        <div id="hero-actions" className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 min-[900px]:mt-11">
          <Link href="/checklist" className="btn btn-primary btn-lg">
            check your cupboard <Arrow />
          </Link>
          <Link href="/why" className="inline-flex min-h-11 items-center font-bold">
            why three days?
          </Link>
        </div>
        <p className="mt-7 text-ink-2">
          Frightened by the news?{" "}
          <Link href="/worried" className="font-bold text-ink">
            Start here instead.
          </Link>
        </p>
      </section>

      {/* What might stop: the tins */}
      <section aria-labelledby="stop-h" className="border-t-[3px] border-ink py-16 min-[900px]:py-26">
        <div className="wrap">
          <h2 id="stop-h" className="max-w-[20ch] text-[clamp(2rem,8.5vw,4.25rem)]">
            if the power went off, the water stopped and the shops were shut
            for three days, would you be all right?
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg">
            The government asks every UK household to be able to manage on its
            own for three days. Severe weather, a fault in the grid, a cyber
            attack on a water company, or disruption from a conflict elsewhere
            in Europe can all have the same effect at home. This is what might
            stop.
          </p>
        </div>
        <StopList stops={stops} />
        <div className="wrap">
          <p className="mt-8 max-w-[52ch] text-[1.1875rem] leading-normal">
            Most of these last hours or days, not weeks. All of them are easier
            with a few things in the cupboard and a plan you made while
            everything worked.
          </p>
        </div>
      </section>

      {/* Three things: the shelf */}
      <section aria-labelledby="three-h" className="wrap pb-16 min-[900px]:pb-26">
        <h2 id="three-h" className="text-[clamp(2.5rem,11vw,5.25rem)]">
          three things, in this order
        </h2>
        <ol className="mt-10 border-b-8 border-ink">
          {steps.map((s, i) => (
            <li
              key={s.href}
              className="grid grid-cols-[4rem_1fr] gap-x-4.5 border-t-8 border-ink pb-9 pt-6 min-[900px]:grid-cols-[6rem_minmax(0,1.1fr)_minmax(0,1fr)] min-[900px]:gap-x-9 min-[900px]:pb-12 min-[900px]:pt-8"
            >
              <span
                aria-hidden="true"
                data-cat
                className={`${s.cat} display grid h-20 w-16 place-items-center border-[3px] border-t-0 border-ink text-[3.25rem] tabular-nums min-[900px]:h-30 min-[900px]:w-24 min-[900px]:text-[5rem]`}
                style={{ fontVariationSettings: '"wdth" 125' }}
              >
                {i + 1}
              </span>
              <h3 className="pt-1 text-[clamp(1.75rem,7.4vw,3rem)] min-[900px]:pt-2 min-[900px]:text-[3.25rem]">
                {s.title}
              </h3>
              <div className="col-start-2 mt-3.5 min-[900px]:col-start-3 min-[900px]:mt-3">
                <p className="measure min-[900px]:text-[1.1875rem]">{s.body}</p>
                <Link href={s.href} className="arrow-link mt-4 text-lg">
                  {s.cta} <Arrow size={18} />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* How much for your household: a quantity panel */}
      <section aria-labelledby="kit-h" className="border-t-[3px] border-ink py-16 min-[900px]:py-26">
        <div className="wrap">
          <form
            action="/build-your-kit"
            method="get"
            className="max-w-[560px] border-[3px] border-ink min-[900px]:grid min-[900px]:max-w-[980px] min-[900px]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
          >
            <div className="border-b-[10px] border-ink px-4.5 pb-3.5 pt-4 min-[900px]:col-span-full min-[900px]:px-7 min-[900px]:pb-4.5 min-[900px]:pt-5.5">
              <h2 id="kit-h" className="text-[clamp(2rem,8.6vw,4rem)]">
                how much for your household?
              </h2>
            </div>
            <div className="min-[900px]:border-r-[3px] min-[900px]:border-ink">
              <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-ink px-4.5 py-3 min-[900px]:px-7">
                <label htmlFor="home-adults" className="font-extrabold">Adults</label>
                <select id="home-adults" name="a" defaultValue="2" className="field min-w-22">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-ink px-4.5 py-3 min-[900px]:px-7">
                <label htmlFor="home-children" className="font-extrabold">Children</label>
                <select id="home-children" name="c" defaultValue="0" className="field min-w-22">
                  {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <fieldset className="border-b border-ink px-4.5 pb-4 pt-3 min-[900px]:px-7">
                <legend className="float-left mb-2.5 w-full font-extrabold">How long</legend>
                <div className="clear-both grid gap-2">
                  {durations.map((d) => (
                    <div key={d.value}>
                      <input
                        type="radio"
                        name="d"
                        id={`home-d${d.value}`}
                        value={d.value}
                        defaultChecked={d.value === "3"}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`home-d${d.value}`}
                        className="flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-[4px] border-2 border-ink px-3.5 font-bold hover:bg-[var(--hover)] peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ink"
                      >
                        {d.label}
                        {d.note ? <small className="text-sm font-normal opacity-80">{d.note}</small> : null}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <div className="border-b-[10px] border-ink px-4.5 py-4 min-[900px]:border-b-0 min-[900px]:px-7">
                <button type="submit" className="btn btn-primary btn-lg w-full">
                  work it out
                </button>
              </div>
            </div>
            <div className="px-4.5 pb-4 pt-3.5 min-[900px]:px-7 min-[900px]:py-5.5">
              <div className="flex justify-between border-b-4 border-ink pb-1.5 text-[0.9375rem] font-extrabold">
                <span>For example</span>
                <span>drinking water</span>
              </div>
              <dl>
                <div className="flex items-baseline justify-between gap-3 border-b border-ink pb-1.5 pt-2.5">
                  <dt className="font-bold">2 adults, 3 days</dt>
                  <dd
                    className="display text-[2rem] tabular-nums min-[900px]:text-[3.5rem]"
                    style={{ fontVariationSettings: '"wdth" 115' }}
                  >
                    18 <small className="text-base font-bold tracking-normal">litres</small>
                  </dd>
                </div>
              </dl>
              <p className="mt-2.5 text-sm text-ink-2">
                3 litres per person per day, the gov.uk figure.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Why three days: the health band */}
      <section aria-labelledby="why-h" data-cat className="border-t-[3px] border-ink bg-cat-health py-16 min-[900px]:py-26">
        <div className="wrap min-[900px]:grid min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] min-[900px]:items-start min-[900px]:gap-16">
          <h2 id="why-h" className="text-[clamp(2.5rem,11vw,5.25rem)]">
            why three days?
          </h2>
          <div>
            <p className="mt-5 max-w-[50ch] text-[1.1875rem] leading-normal min-[900px]:mt-3">
              Since 2024 the UK, the EU, Sweden, Finland, Norway and France have
              all asked their citizens to keep a few days of supplies at home.
              None of them say anything is imminent. All of them have decided it
              is no longer sensible to assume it cannot happen.
            </p>
            <p className="mt-7 max-w-[50ch] border-t-[3px] border-ink pt-5 text-[1.1875rem] font-semibold leading-normal">
              For the very worst cases there is little any household can do. For
              everything short of that, three days of supplies make a real
              difference.
            </p>
            <Link href="/why" className="arrow-link mt-5 text-lg">
              what the government says <Arrow size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Offline guide: the water band */}
      <section aria-labelledby="off-h" data-cat className="border-t-[3px] border-ink bg-cat-water py-16 min-[900px]:py-26">
        <div className="wrap min-[900px]:grid min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] min-[900px]:items-start min-[900px]:gap-16">
          <h2 id="off-h" className="max-w-[14ch] text-[clamp(2.5rem,11vw,5.25rem)]">
            keep a copy offline
          </h2>
          <div>
            <p className="mt-5 max-w-[50ch] text-[1.1875rem] leading-normal min-[900px]:mt-3">
              One file, no internet needed. Save it, print it, share it before
              you need it.
            </p>
            <a
              href="/offline/index.html"
              download="stay-prepared-offline-guide.html"
              className="btn btn-secondary btn-lg mt-7"
            >
              <svg width="16" height="20" viewBox="0 0 16 20" aria-hidden="true" className="flex-none">
                <path d="M8 0v13M2 8l6 6 6-6M0 18.5h16" fill="none" stroke="currentColor" strokeWidth="2.6" />
              </svg>
              download the offline guide
            </a>
          </div>
        </div>
      </section>

      <ReachBar watch="hero-actions" />
    </main>
  );
}
