import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import DownloadRow from "@/components/DownloadRow";
import HomeProgress from "@/components/HomeProgress";
import { kits } from "@/data/kits";

export default function Home() {
  return (
    <main className="pb-8">
      {/* Hero, with the form that starts the task in it */}
      <section className="overflow-hidden rounded-card bg-mint px-6 py-12 sm:px-12 sm:py-20">
                <div className="wrap grid items-center gap-10 md:grid-cols-[1.15fr_minmax(0,22rem)]">
          <div>
            <SectionLabel onDark>Simple steps for a difficult few days</SectionLabel>
            <h1 className="max-w-[18ch] text-4xl font-normal leading-[1.05] text-forest sm:text-6xl">
              If the power went off, the water stopped and the shops were shut
              for three days, would you be all right?
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-forest/85 sm:text-lg">
              The government asks every UK household to be able to manage on
              its own for three days. Here is what that means, and how to get
              there this week.
            </p>
            <p className="mt-6 text-sm text-forest/75">
              Rather read first?{" "}
              <Link href="/checklist" className="underline underline-offset-4 hover:text-forest">
                See the checklist.
              </Link>{" "}
              Frightened by the news?{" "}
              <Link href="/worried" className="underline underline-offset-4 hover:text-forest">
                Start here instead.
              </Link>
            </p>
          </div>

          <div className="md:justify-self-end">
            <div className="rounded-card bg-surface p-6 shadow-lg">
              <p className="font-heading text-lg text-heading">Pick your household</p>
              <p className="mt-1 text-sm text-muted">
                Each one is a full list with the quantities worked out.
              </p>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {kits.map((k) => (
                  <li key={k.slug}>
                    <Link
                      href={`/kits/${k.slug}`}
                      className="flex items-baseline justify-between gap-3 py-2.5 text-sm text-foreground hover:text-forest"
                    >
                      <span>{k.title}</span>
                      <span aria-hidden className="text-muted">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">
                None of these?{" "}
                <Link
                  href="/build-your-kit"
                  className="underline underline-offset-4 hover:text-forest"
                >
                  Build your own list.
                </Link>
              </p>
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
