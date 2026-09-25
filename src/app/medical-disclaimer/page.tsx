import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  alternates: { canonical: "/medical-disclaimer" },
  title: "Medical disclaimer",
  description:
    "Stay Prepared gives preparedness guidance, not medical advice. If someone at home has a medical condition, talk to your healthcare team now about what happens in a power cut or water outage.",
};

export default function MedicalDisclaimerPage() {
  return (
    <main>
      <PageIntro
        title="medical disclaimer"
        lede="This site gives preparedness guidance for households and families. Some of that guidance touches on health and medical conditions. This page explains what that means and what it does not."
      />

      <div className="wrap pb-20 min-[900px]:pb-26">
        <section className="border-t-[3px] border-ink py-10 min-[900px]:py-14">
          <h2 className="h-sub">what this site does</h2>
          <div className="prose-plain measure mt-4 text-lg">
            <p>
              Stay Prepared turns government and NHS guidance into practical steps: what to keep at home, how much,
              and what to do in a power cut, water outage or other disruption.
            </p>
            <p>
              The site sources figures from the UK government, NHS, and official bodies. Every number and every piece
              of advice names its source.
            </p>
            <p>Some guides mention health and medical conditions, because they affect how to prepare. For example:</p>
            <ul className="ml-6 list-disc space-y-2 py-3">
              <li>A guide on dialysis during a power cut explains what to do before an outage happens.</li>
              <li>
                A guide on cooking mentions staying cool and drinking water, because heat-related deaths rise in power
                cuts.
              </li>
              <li>A guide on water outages mentions hand washing and hygiene because water stops that.</li>
            </ul>
          </div>
        </section>

        <section className="border-t-[3px] border-ink py-10 min-[900px]:py-14">
          <h2 className="h-sub">what this site does not do</h2>
          <div className="prose-plain measure mt-4 text-lg">
            <p>
              Stay Prepared is not a substitute for medical advice, diagnosis or treatment. Nothing on this site is
              medical advice.
            </p>
            <p>This site does not:</p>
            <ul className="ml-6 list-disc space-y-2 py-3">
              <li>Tell you whether to take or stop a medication.</li>
              <li>Tell you how to treat an illness or condition.</li>
              <li>Recommend one treatment over another.</li>
              <li>Replace talking to your GP, nurse, pharmacist or hospital team.</li>
            </ul>
            <p>
              If you have a medical condition or take regular medication, your healthcare team are the only people
              who can advise you on what to do in a power cut or water outage.
            </p>
          </div>
        </section>

        <section className="border-t-[3px] border-ink py-10 min-[900px]:py-14">
          <h2 className="h-sub">if someone at home has a medical condition</h2>
          <div className="prose-plain measure mt-4 text-lg">
            <div className="my-8">
              <Callout title="Talk to your healthcare team now">
                <p>
                  Ask your GP, your hospital team, or your specialist: what happens to my treatment in a power cut?
                  Where would I go? Do they have a backup plan? How long can treatment safely be delayed?
                </p>
                <p>Write the answers down and keep them somewhere you can find them in a crisis.</p>
              </Callout>
            </div>

            <p>
              Guides on this site that mention specific medical conditions (dialysis, oxygen, insulin) are designed to
              help you prepare. They explain what to think about and what to ask your healthcare team. They are not
              instructions for treating the condition.
            </p>
            <p>
              If you are worried about your health, or you think you are having a medical emergency, call your GP, NHS
              111 or 999. Do not rely on this site for medical help.
            </p>
          </div>
        </section>

        <section className="border-t-[3px] border-ink py-10 min-[900px]:py-14">
          <h2 className="h-sub">which guides mention health</h2>
          <div className="prose-plain measure mt-4 text-lg">
            <p>The following guides mention medical conditions or health:</p>
            <ul className="ml-6 list-disc space-y-2 py-3">
              <li>
                <Link href="/guides/medical-equipment-and-outages" className="font-bold">
                  If someone at home depends on medical equipment or medications
                </Link>{" "}
                (general preparedness for powered medical equipment and refrigerated medications)
              </li>
              <li>
                <Link href="/guides/dialysis-in-an-outage" className="font-bold">
                  If you are on dialysis and there is a power cut or water outage
                </Link>
              </li>
              <li>
                <Link href="/guides/cook-without-electricity" className="font-bold">
                  How to cook safely without electricity
                </Link>
                (mentions heat exhaustion)
              </li>
              <li>
                <Link href="/guides/power-cut" className="font-bold">
                  What to do in a power cut
                </Link>
                (mentions medication storage)
              </li>
            </ul>
            <p className="mt-4">Each of these guides says: talk to your healthcare team for advice on your condition.</p>
          </div>
        </section>

        <section className="border-t-[3px] border-ink py-10 min-[900px]:py-14">
          <h2 className="h-sub">your data</h2>
          <div className="prose-plain measure mt-4 text-lg">
            <p>
              Stay Prepared asks for no personal information and collects no health data. The site does not know who
              you are or what condition you have.
            </p>
            <p>
              When you visit, Vercel Web Analytics counts that you visited a page. It does not know who you are or
              why. Read the <Link href="/privacy">privacy page</Link> for what is recorded.
            </p>
          </div>
        </section>

        <section className="border-t-[3px] border-ink py-10 min-[900px]:py-14">
          <h2 className="h-sub">when to seek medical help</h2>
          <div className="prose-plain measure mt-4 text-lg">
            <ul className="ml-6 list-disc space-y-3 py-3">
              <li>
                <span className="font-bold">Chest pain, shortness of breath, or loss of consciousness:</span> call 999.
              </li>
              <li>
                <span className="font-bold">You think you have a medical emergency:</span> call 999.
              </li>
              <li>
                <span className="font-bold">You are worried about your health or a symptom:</span> call NHS 111 or
                your GP.
              </li>
              <li>
                <span className="font-bold">You have a long-term condition and a power cut happens:</span> contact
                your hospital or GP. If you cannot reach them, call NHS 111.
              </li>
              <li>
                <span className="font-bold">You have mental health concerns:</span> call NHS 111, Samaritans (116 123)
                or Shout (text SHOUT to 85258).
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
