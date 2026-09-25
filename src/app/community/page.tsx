import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Diagram from "@/components/Diagram";
import Arrow from "@/components/home/Arrow";

export const metadata: Metadata = {
  alternates: { canonical: "/community" },
  title: "Community and mutual aid",
  description:
    "Why neighbours matter once your own household is prepared, and four things to do first where you live.",
};

const firstSteps = [
  {
    title: "Know a few neighbours by name",
    body: "Two or three is enough to start. Start with anyone older, disabled, living alone or with young children. They are most likely to be missed.",
  },
  {
    title: "Agree a simple check-in habit",
    body: "With a couple of neighbours or family members: if something disrupts normal life, who knocks on whose door, and by when?",
  },
  {
    title: "Find the network that already exists",
    body: "Most areas have something: a mutual aid group set up in 2020 and still quietly running, a residents' association, a community flood group, a WhatsApp group for the street, a parish or community council, a place of worship, a community centre. Search your area name with 'mutual aid' or ask at the library.",
  },
  {
    title: "If nothing exists, start small",
    body: "A note through a dozen doors with your name, number, and an offer to set up a street group chat is how most neighbourhood networks begin. You do not need a constitution or a committee.",
  },
];

export default function CommunityPage() {
  return (
    <main>
      <PageIntro
        title="once your own household has what it needs, look around you"
        lede="In an emergency, help goes first to the people who need it most. Everyone else is expected to manage for a while. The better prepared your household is, the more you can do for the people near you."
        aside={<Diagram name="checkin" />}
      />

      <div className="wrap py-14 min-[900px]:py-20">
        <p className="measure text-[1.1875rem] leading-relaxed min-[900px]:text-[1.3125rem]">
          Research on disasters shows ordinary people are the
          first responders: they share generators, cook for strangers and
          check on people they have never spoken to. The people who come to
          harm are the ones nobody thought to check on. So sort your own
          household first, and then be the person who knocks.
        </p>
      </div>

      <section aria-labelledby="first-h" className="border-t-[3px] border-ink pb-16 pt-14 min-[900px]:pb-26 min-[900px]:pt-20">
        <div className="wrap">
          <h2 id="first-h" className="h-section">
            four things to do first
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg text-ink-2">
            None of these cost money, and the first two take an afternoon.
          </p>
          <ol className="mt-10 border-b-8 border-ink">
            {firstSteps.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[3.5rem_1fr] gap-x-4.5 border-t-8 border-ink pb-9 pt-6 min-[900px]:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.1fr)] min-[900px]:gap-x-9 min-[900px]:pb-12 min-[900px]:pt-8"
              >
                <span
                  aria-hidden="true"
                  className="display grid h-16 w-14 place-items-center bg-ink text-paper text-[2.5rem] tabular-nums min-[900px]:h-24 min-[900px]:w-20 min-[900px]:text-[3.75rem]"
                  style={{ fontVariationSettings: '"wdth" 125' }}
                >
                  {i + 1}
                </span>
                <h3 className="h-sub pt-1 lowercase min-[900px]:pt-2">{step.title}</h3>
                <p className="measure col-start-2 mt-3.5 text-[1.0625rem] leading-relaxed min-[900px]:col-start-3 min-[900px]:mt-2 min-[900px]:text-[1.1875rem]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link href="/checklist" className="btn btn-primary btn-lg">
              see the checklist <Arrow />
            </Link>
            <Link href="/kits" className="arrow-link text-lg">
              see the kits <Arrow size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
