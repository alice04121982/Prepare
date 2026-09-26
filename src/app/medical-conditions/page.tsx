import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Arrow from "@/components/home/Arrow";

export const metadata: Metadata = {
  alternates: { canonical: "/medical-conditions" },
  title: "Preparing for outages if you have a medical condition",
  description:
    "If someone at home has a chronic illness or medical condition, a power cut or water outage affects treatment. What to prepare, and which guides help.",
};

type Condition = {
  name: string;
  why: string;
  guide?: string;
  guideSlug?: string;
  questions: string[];
};

const conditions: Condition[] = [
  {
    name: "Asthma and COPD",
    why: "A nebuliser needs power. Inhalers do not need a fridge, but keep them out of extreme heat or cold.",
    questions: [
      "Can my nebuliser run on batteries, and for how long?",
      "Can I use my inhaler with a spacer if the nebuliser stops?",
      "What should I do if my breathing gets worse and I cannot reach you?",
    ],
  },
  {
    name: "Cancer and chemotherapy",
    why: "Chemotherapy can lower your defences against infection, so clean water and clean hands matter more in an outage. Keep your hospital's 24-hour chemotherapy helpline number to hand.",
    questions: [
      "What is the 24-hour helpline number, and when should I call it?",
      "Do any of my medicines need a fridge?",
      "If an appointment is cancelled, who rearranges it?",
    ],
  },
  {
    name: "Diabetes treated with insulin",
    why: "Unopened insulin is kept in a fridge. The pen or vial you are using can usually stay at room temperature for about 4 weeks, depending on the type. Insulin must never freeze, so keep it off ice packs.",
    questions: [
      "How long can my insulin stay out of the fridge?",
      "How much spare insulin and hypo treatment should I keep?",
      "What are my sick day rules?",
    ],
  },
  {
    name: "Dialysis",
    why: "Haemodialysis needs power and water, at a unit or at home. Missing a session can be dangerous. Your unit will have a plan for outages: ask for it now.",
    guide: "If you are on dialysis and there is a power cut or water outage",
    guideSlug: "dialysis-in-an-outage",
    questions: [],
  },
  {
    name: "Heart disease and heart devices",
    why: "Pacemakers and ICDs run on their own batteries, so a power cut does not stop them. A home monitoring box may stop sending readings until the power returns. A heart pump (LVAD) depends on charged batteries: follow your VAD team's plan.",
    questions: [
      "Is it safe for my home monitor to be off during a power cut?",
      "Do any of my heart medicines need a fridge?",
      "Which symptoms mean I should call 999?",
    ],
  },
  {
    name: "Home oxygen",
    why: "Oxygen concentrators need power. Backup cylinders last a set number of hours. Keep candles and flames well away from oxygen: use torches in a power cut.",
    questions: [
      "How many hours will my backup cylinders last at my flow rate?",
      "What is my oxygen supplier's 24-hour number?",
      "What should I do if the power is off for longer than that?",
    ],
  },
  {
    name: "Kidney disease (not on dialysis)",
    why: "Most kidney tablets do not need a fridge, but some injections, such as those for anaemia, do. A steady supply of your usual medicines matters.",
    questions: [
      "Do any of my medicines need a fridge?",
      "How much of each medicine should I keep at home?",
      "Who on my kidney team do I call if I cannot get a prescription?",
    ],
  },
  {
    name: "Mental health conditions",
    why: "Stopping some medicines suddenly can cause withdrawal or bring symptoms back, so keep a steady supply. If you take lithium, drink enough water: losing fluid in hot weather or a water outage can raise lithium levels.",
    questions: [
      "How much of my medicine should I keep at home?",
      "What happens if I miss doses?",
      "Who do I contact in a crisis if my usual support is unavailable?",
    ],
  },
  {
    name: "Medical equipment (general)",
    why: "Powered equipment, such as ventilators, feeding pumps and suction machines, needs electricity. Some also needs clean water.",
    guide: "If someone at home depends on medical equipment or medications",
    guideSlug: "medical-equipment-and-outages",
    questions: [],
  },
  {
    name: "Other lung conditions (pulmonary fibrosis, cystic fibrosis)",
    why: "Nebulisers, oxygen and some airway clearance devices need power. Inhalers do not.",
    questions: [
      "Can my nebuliser or airway clearance device run on batteries?",
      "If I use oxygen, how long will my backup supply last?",
      "What should I do if my equipment stops working?",
    ],
  },
  {
    name: "Thyroid disease",
    why: "Thyroid tablets do not usually need a fridge. Keep a spare supply so a delay at the pharmacy does not leave you short.",
    questions: [
      "How much thyroid medicine should I keep at home?",
      "Does my medicine need to stay cool?",
      "What should I do if I run out?",
    ],
  },
];

export default function MedicalConditionsPage() {
  return (
    <main>
      <PageIntro
        title="preparing for outages if you have a medical condition"
        lede="A power cut or water outage affects treatment, medication storage and access to healthcare. Ask your healthcare team now what happens to your condition in an outage."
      />

      <div className="wrap pb-20 min-[900px]:pb-26">
        <section className="py-10 min-[900px]:py-14">
          <h2 className="h-sub measure">what to do now</h2>
          <div className="prose-plain measure mt-4 text-lg space-y-4">
            <p>
              For each condition below, there are questions to ask your healthcare team. Write the answers down. Keep
              them where you can find them in a crisis.
            </p>
            <p>
              Also: <Link href="/medical-disclaimer" className="font-bold">
                read the medical disclaimer
              </Link>
              . This site gives preparedness guidance, not medical advice.
            </p>
            <p>
              Register with the{" "}
              <a
                href="https://www.thepsr.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold"
              >
                Priority Services Register
              </a>{" "}
              if you rely on medical equipment or medications. It gets you early warning of planned outages and priority
              help if one happens.
            </p>
          </div>
        </section>

        <section className="border-t-[3px] border-ink py-10 min-[900px]:py-14">
          <h2 className="h-sub measure">conditions and what to ask</h2>
          <div className="mt-8 space-y-12">
            {conditions.map((c) => (
              <div key={c.name} className="border-b border-ink pb-10 last:border-b-0">
                <h3 className="text-[1.3125rem] font-extrabold min-[900px]:text-[1.5rem]">{c.name}</h3>
                <p className="mt-2 text-[1.125rem] leading-relaxed text-ink-2">{c.why}</p>

                {c.guide ? (
                  <div className="mt-4">
                    <Link
                      href={`/guides/${c.guideSlug}`}
                      className="inline-flex min-h-11 items-center gap-2 font-bold text-ink hover:underline"
                    >
                      {c.guide} <Arrow />
                    </Link>
                  </div>
                ) : (
                  <div className="mt-4">
                    <p className="font-bold">Ask your healthcare team:</p>
                    <ul className="mt-2 ml-6 space-y-2">
                      {c.questions.map((q) => (
                        <li key={q} className="text-[1.125rem] leading-relaxed list-disc">
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="border-t-[3px] border-ink py-10 min-[900px]:py-14">
          <h2 className="h-sub measure">if your condition is not listed</h2>
          <div className="prose-plain measure mt-4 text-lg space-y-4">
            <p>
              This list covers common conditions. If yours is not here, the same principle applies: ask your healthcare
              team what happens to your treatment, medication and monitoring in a power cut or water outage.
            </p>
            <p>
              Start with:{" "}
              <Link href="/guides/medical-equipment-and-outages" className="font-bold">
                If someone at home depends on medical equipment or medications
              </Link>
              . It walks through the three-part plan (safe timeframe, backup power, emergency contacts) that applies to
              all medical conditions.
            </p>
          </div>
        </section>

        <section className="border-t-[3px] border-ink py-10 min-[900px]:py-14">
          <h2 className="h-sub measure">related guides and resources</h2>
          <ul className="measure mt-4 space-y-3">
            <li>
              <Link
                href="/guides/medical-equipment-and-outages"
                className="inline-flex min-h-11 items-center gap-2 font-bold text-ink hover:underline"
              >
                If someone at home depends on medical equipment or medications <Arrow />
              </Link>
            </li>
            <li>
              <Link
                href="/guides/priority-services-register"
                className="inline-flex min-h-11 items-center gap-2 font-bold text-ink hover:underline"
              >
                The Priority Services Register explained <Arrow />
              </Link>
            </li>
            <li>
              <Link
                href="/medical-disclaimer"
                className="inline-flex min-h-11 items-center gap-2 font-bold text-ink hover:underline"
              >
                Medical disclaimer <Arrow />
              </Link>
            </li>
            <li>
              <a
                href="https://111.nhs.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 font-bold text-ink hover:underline"
              >
                NHS 111 (urgent care) <Arrow />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
