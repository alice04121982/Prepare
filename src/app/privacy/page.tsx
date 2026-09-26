import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy and cookies",
  description:
    "Stay Prepared sets no cookies and asks for no personal details. What is kept on your device, how visits are counted, and what happens when you follow a link to Amazon.",
};

/** The date this page last changed. Update it with any change to what is collected. */
const UPDATED = "25 September 2026";

const sections = [
  {
    id: "device",
    title: "what stays on your device",
    body: [
      "When you plan a kit and take things off your list, your choices are saved in your browser, on your device. They are never sent to us or anyone else.",
      "To remove them, clear this site's data in your browser settings.",
    ],
  },
  {
    id: "visits",
    title: "how we count visits",
    body: [
      "We count page views with Vercel Web Analytics. It sets no cookies. It records the page you visited, the site you came from, your country and your type of device. It does not tell us who you are.",
    ],
  },
  {
    id: "hosting",
    title: "hosting",
    body: [
      "Vercel hosts this site. Like any web host, it handles your IP address to deliver pages and to protect the site from attack.",
    ],
  },
  {
    id: "amazon",
    title: "links to Amazon",
    body: [
      "Some links go to Amazon and carry our Amazon Associates code, so Amazon knows you came from us. If you buy something, we may earn a small commission.",
      "Once you are on Amazon, Amazon's own privacy notice and cookies apply. Amazon tells us which items were ordered through our links, never who ordered them.",
    ],
  },
  {
    id: "offline",
    title: "the offline guide",
    body: ["The offline guide is a single file with no scripts. It makes no requests once saved."],
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <PageIntro
        title="privacy and cookies"
        lede="This site sets no cookies and asks for no personal details. There are no accounts, forms or mailing lists."
      />

      <div className="wrap pb-20 min-[900px]:pb-26">
        {sections.map((s) => (
          <section key={s.id} aria-labelledby={`${s.id}-h`} className="border-t-[3px] border-ink py-10 first:border-t-0 min-[900px]:py-14">
            <h2 id={`${s.id}-h`} className="h-sub">
              {s.title}
            </h2>
            <div className="prose-plain measure mt-4 text-lg">
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="contact-h" className="border-t-[3px] border-ink py-10 min-[900px]:py-14">
          <h2 id="contact-h" className="h-sub">
            questions
          </h2>
          <div className="prose-plain measure mt-4 text-lg">
            <p>
              Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. How we pick the products we link to
              is on <Link href="/how-we-choose-products">how we choose products</Link>.
            </p>
            <p className="text-base text-ink-2">Last updated {UPDATED}.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
