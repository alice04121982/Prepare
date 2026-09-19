import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import SectionLabel from "@/components/SectionLabel";
import Illustration from "@/components/Illustration";
import Photo from "@/components/Photo";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  title: "Community and mutual aid",
  description:
    "Why neighbours matter once your own household is prepared, and how to find or start a local network where you live.",
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

const skills = [
  {
    skill: "Basic first aid",
    why: "A half-day course covers the things that matter in the first minutes: bleeding, choking, CPR, recovery position. St John Ambulance, the Red Cross, and many councils run cheap or free sessions.",
  },
  {
    skill: "Cooking for more people than usual",
    why: "One household with a gas hob and a big pot can feed a floor of a block during a power cut. Knowing how to stretch a store cupboard is a skill, not a stockpile.",
  },
  {
    skill: "Practical repair",
    why: "Turning off a stopcock, resetting a trip switch, clearing a gutter, patching a window. Repair cafés and community sheds teach these for free.",
  },
  {
    skill: "Childcare and care swaps",
    why: "A parent who knows they can leave a child with the family next door for an hour can go and fetch water, medication, or an older relative. This is the most-used form of mutual aid there is.",
  },
  {
    skill: "Local knowledge",
    why: "Who has a car, who works nights, who is a nurse, who has a generator, which road floods first. This is the information a network holds and no kit can replace.",
  },
];

export default function CommunityPage() {
  return (
    <main className="w-full py-4 sm:py-8">
      <PageIntro
        eyebrow="Community and mutual aid"
        title="Once your own household is sorted, look around you"
        lede="In an emergency, help goes first to the people who need it most. Everyone else is expected to manage for a while. The better prepared your household is, the more you can do for the people near you, and a street that knows itself gets through a bad week faster."
        aside={<Illustration name="intro-community" className="w-full" />}
      />

      <Photo slot="community" className="mb-12" />

      <div className="mx-auto max-w-3xl">

      <section className="prose-plain leading-relaxed">
        <SectionLabel>What actually happens in a disruption</SectionLabel>
        <h2 className="text-2xl font-semibold">What actually happens in a disruption</h2>
        <p className="mt-4">
          The popular picture of a crisis is panic, looting, and every
          household for itself. The evidence, gathered across decades of
          disasters of every kind, says the opposite. Ordinary people are
          overwhelmingly the first responders: they pull neighbours from
          flooded homes, share generators, cook for strangers, and check on
          people they have never spoken to before. Researchers who study
          disasters have a name for the myth of mass panic, and they have
          found very little of it in real events.
        </p>
        <p>
          What does reliably happen is that the people most at risk are the
          ones nobody thought to check on. Heat deaths, cold deaths, and
          deaths during long power cuts fall disproportionately on people who
          are older, unwell, and alone. The single strongest predictor of
          who gets through a bad week well is not the size of their kit. It
          is whether anyone knew they were there.
        </p>
        <p>
          So the order is simple. Sort your own household first, so you are
          not the person who needs help in the first day. Then you are free
          to be the person who gives it, and that is where most of the help
          in any emergency actually comes from.
        </p>
      </section>

      <Photo slot="together-everyday" aspect="aspect-[16/8]" caption className="mt-10" />

      <Callout title="A note on the word &ldquo;mutual&rdquo;">
        <p>
          Mutual aid is not charity, and it is not a service. It is neighbours
          helping neighbours on the understanding that everyone has something
          to offer and everyone will need something at some point. The person
          who cannot carry water may be the person who knows which pharmacy
          is open. Nobody is only a giver or only a receiver.
        </p>
      </Callout>

      <section className="mt-14">
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

      <Photo slot="clap-nhs" aspect="aspect-[16/8]" caption className="mt-16" />

      <section className="mt-16">
        <SectionLabel>Skills spread further than stockpiles</SectionLabel>
        <h2 className="text-2xl font-semibold">Skills spread further than stockpiles</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
          A skill can be used any number of times and shared with anyone. A
          tin of beans can be eaten once. If you want to invest in resilience
          beyond the checklist, this is where to put your time.
        </p>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {skills.map((s) => (
            <div key={s.skill} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="font-medium">{s.skill}</dt>
              <dd className="leading-relaxed text-foreground/90">{s.why}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 prose-plain leading-relaxed">
        <SectionLabel>How to be useful without overdoing it</SectionLabel>
        <h2 className="text-2xl font-semibold">How to be useful without overdoing it</h2>
        <p className="mt-4">
          Networks that last are light. A street group chat that only gets
          used when something happens is fine, and better than one that
          burns people out with daily messages. A check-in plan that lives
          on a fridge magnet is fine. The aim is not to build an
          organisation. It is to make sure that when a disruption comes, the
          first question is &ldquo;is everyone all right?&rdquo; and someone
          already knows who to ask.
        </p>
        <p>
          If you do want to go further, the most valuable roles are usually
          the unglamorous ones: keeping a contact list up to date, knowing
          which council or utility number to ring, being the person who
          remembers the household at the end of the road with the new baby.
        </p>
      </section>

      <div className="mt-12 flex flex-wrap gap-4 pt-8 text-sm">
        <Link
          href="/checklist"
          className="btn btn-primary"
        >
          The essentials checklist
        </Link>
        <Link
          href="/faq"
          className="btn btn-secondary"
        >
          Common questions and myths
        </Link>
      </div>
      </div>
    </main>
  );
}
