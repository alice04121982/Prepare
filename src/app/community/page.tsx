import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import SectionLabel from "@/components/SectionLabel";
import Illustration from "@/components/Illustration";
import Photo from "@/components/Photo";

export const metadata: Metadata = {
  title: "Community and mutual aid",
  description:
    "Why neighbours matter once your own household is prepared, and four things to do first where you live.",
};

const firstSteps = [
  {
    title: "Know a few neighbours by name",
    body: "Two or three is enough to start. Pay particular attention to anyone older, disabled, living alone, or with young children, because they are the people most affected when routine breaks down and the people most likely to be missed.",
  },
  {
    title: "Agree a simple check-in habit",
    body: "With a couple of neighbours or family members: if something disrupts normal life, who knocks on whose door, and by when? A plan this small is what turns a street of strangers into a network.",
  },
  {
    title: "Find the network that already exists",
    body: "Most areas have something: a mutual aid group set up in 2020 and still quietly running, a residents' association, a community flood group, a WhatsApp group for the street, a parish or community council, a place of worship, a community centre. Search your area name with 'mutual aid' or ask at the library.",
  },
  {
    title: "If nothing exists, start small",
    body: "A note through a dozen doors with your name, number, and an offer to set up a street group chat is how most neighbourhood networks begin. You do not need a constitution or a committee. You need one person willing to be the first to say hello.",
  },
];

export default function CommunityPage() {
  return (
    <main className="w-full py-4 sm:py-8">
      <PageIntro
        eyebrow="Community and mutual aid"
        title="Once your own household has what it needs, look around you"
        lede="In an emergency, help goes first to the people who need it most. Everyone else is expected to manage for a while. The better prepared your household is, the more you can do for the people near you, and a street that knows itself gets through a bad week faster."
        aside={<Illustration name="intro-community" className="w-full" />}
        photo="community"
      />

      <div className="mx-auto max-w-3xl">
        <p className="leading-relaxed">
          The evidence from decades of disasters says ordinary people are the
          first responders: they share generators, cook for strangers and
          check on people they have never spoken to. The people who come to
          harm are the ones nobody thought to check on. So sort your own
          household first, and then be the person who knocks.
        </p>

        <section className="mt-12">
          <SectionLabel>Four things to do first</SectionLabel>
          <h2 className="text-2xl font-semibold">Four things to do first</h2>
          <p className="mt-3 leading-relaxed text-muted">
            None of these cost money, and the first two take an afternoon.
          </p>
          <ol className="mt-8 space-y-8">
            {firstSteps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="font-heading mt-1 shrink-0 text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <Photo slot="together-everyday" aspect="aspect-[16/8]" caption className="mt-14" />

        <div className="mt-12 flex flex-wrap gap-4 pt-8 text-sm">
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
