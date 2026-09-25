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
    why: "Reliever inhalers may need refrigeration (some formulations). Nebulisers need power.",
    questions: [
      "Do my inhalers need to stay cool? Which ones?",
      "Do I use a nebuliser? Can it run on battery or generator power?",
      "How long can I safely go without my medications?",
    ],
  },
  {
    name: "Cancer and chemotherapy",
    why: "Some chemotherapy drugs need refrigeration. Treatment appointments depend on healthcare access.",
    questions: [
      "Which of my medications need to stay cool?",
      "Where is my oncology center? Are there backup centers nearby?",
      "If an appointment is delayed, is that safe?",
    ],
  },
  {
    name: "Diabetes (insulin-dependent)",
    why: "Insulin must be refrigerated. Blood glucose meters and strips need to be kept in cool, dry conditions.",
    questions: [
      "How should I store insulin without a fridge? Ice packs? Cool box?",
      "How much insulin should I keep as backup?",
      "How long can I safely go without checking blood sugar?",
    ],
  },
  {
    name: "Dialysis",
    why: "Dialysis treatment depends on electricity and clean water. Missing even one session is dangerous.",
    guide: "If you are on dialysis and there is a power cut or water outage",
    guideSlug: "dialysis-in-an-outage",
    questions: [],
  },
  {
    name: "Heart disease and cardiac devices",
    why: "Pacemakers and implantable cardioverter-defibrillators (ICDs) have battery life limits. Some heart medications need monitoring.",
    questions: [
      "When was my device last checked? When is the battery due to be replaced?",
      "Do any of my heart medications need to stay cool?",
      "What are the warning signs something is wrong with my device?",
    ],
  },
  {
    name: "Home oxygen",
    why: "Oxygen concentrators and ventilators need reliable power. Backup oxygen cylinders have limited duration.",
    questions: [
      "How long will my backup oxygen last if power goes out?",
      "Can my oxygen concentrator run on battery or generator?",
      "What do I do if I run out of oxygen?",
    ],
  },
  {
    name: "Kidney disease (non-dialysis)",
    why: "Some kidney medications need refrigeration. Missed doses of blood pressure or potassium-lowering drugs can be serious.",
    questions: [
      "Which of my medications need to stay cool?",
      "How much of each medication should I keep at home?",
      "How long can I safely wait to see my nephrologist?",
    ],
  },
  {
    name: "Mental health conditions",
    why: "Some psychiatric medications need refrigeration. Interruption in medication or support can be serious.",
    questions: [
      "Which of my medications need to stay cool?",
      "How much should I keep at home as backup?",
      "Who do I contact in crisis if my usual support is unavailable?",
    ],
  },
  {
    name: "Medical equipment (general)",
    why: "Powered medical equipment (ventilators, feeding pumps, BiPAP) needs electricity. Many depend on clean water.",
    guide: "If someone at home depends on medical equipment or medications",
    guideSlug: "medical-equipment-and-outages",
    questions: [],
  },
  {
    name: "Respiratory conditions (severe asthma, pulmonary fibrosis, cystic fibrosis)",
    why: "Nebulisers and inhalers may need power. Oxygen and airway clearance equipment are critical.",
    questions: [
      "Do I use a nebuliser? Can it run on battery or backup power?",
      "Do I need home oxygen? How long will backup supplies last?",
      "What equipment do I use for airway clearance? Can it run without mains power?",
    ],
  },
  {
    name: "Thyroid disease",
    why: "Thyroid medication is taken daily and cannot be easily replaced if lost in a power cut or water contamination.",
    questions: [
      "How much thyroid medication should I keep at home as backup?",
      "Does my medication need to stay cool?",
      "How long can I safely go without a dose?",
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
        <section className="border-t-[3px] border-ink py-10 min-[900px]:py-14">
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
