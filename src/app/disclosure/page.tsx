import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import SectionLabel from "@/components/SectionLabel";
import Callout from "@/components/Callout";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "How this site earns money",
  description:
    "Stay Prepared is free to read and has no adverts. Some product links earn a small commission. This page explains how that works and the rules we keep.",
};

const rules = [
  {
    title: "Only things on the checklist",
    body: "If an item is not on the essentials checklist, it does not get a link, however well it might pay.",
  },
  {
    title: "The free option comes first",
    body: "Where you can cover something with what you already own, we say so before we name a product. A filled bath before a water container. A pan and a heat source before purification tablets.",
  },
  {
    title: "A budget option and a standard one",
    body: "Every item that has a link shows a cheaper option and an ordinary one. Never only the expensive one.",
  },
  {
    title: "The maker or a specialist shop first",
    body: "We link to the maker's own site or a specialist retailer where they run a programme. Amazon is the fallback, and it is shown second.",
  },
  {
    title: "Things we have used",
    body: "Where a product is marked as used, one of us has owned it or tested it. Where it is not marked, we have checked it against the guidance but not lived with it.",
  },
  {
    title: "Price bands, not prices",
    body: "Prices change and we cannot keep them current. We show a range so you know roughly what to expect. The shop shows the real price.",
  },
  {
    title: "No urgency",
    body: "Nothing on this site is limited, running out, or needed before it is too late. Build your kit over weeks from your normal shopping.",
  },
  {
    title: "A small list",
    body: "No more than three products for any item, and no more than about thirty across the whole site. A short list you can trust is more use than a long one you cannot.",
  },
];

const notDoing = [
  "No adverts, banners, or pop-ups.",
  "No sponsored posts or paid placements.",
  "No own-brand kits or bundles.",
  "No courses or memberships.",
  "No product links on the scenarios, community, or worried pages.",
];

export default function DisclosurePage() {
  return (
    <main className="w-full py-4 sm:py-8">
      <PageIntro
        eyebrow="Money"
        title="How this site earns money"
        lede="Stay Prepared is free to read and carries no adverts. A few product links earn us a small commission if you buy. This page says how that works and the rules that keep it honest."
      />

      <div className="mx-auto max-w-3xl">
        <section className="mb-12">
          <SectionLabel>The principle</SectionLabel>
          <h2 className="text-2xl font-semibold">We earn when you buy something you needed anyway</h2>
          <div className="prose-plain mt-3 leading-relaxed text-muted">
            <p>
              The checklist and the kit planner name specific products so you
              can see what a thing looks like and roughly what it costs. Some of
              those links carry a tag. If you follow one and buy, the shop pays
              us a small share of the price. It costs you nothing extra.
            </p>
            <p>
              The commission never changes what we recommend. We do not earn by
              making you want more. If the honest answer is that you already own
              it, or that the cheap one is fine, that is what the page says.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <SectionLabel>The rules</SectionLabel>
          <h2 className="text-2xl font-semibold">Eight rules every link has to meet</h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {rules.map((r, idx) => (
              <li key={r.title} className="flex gap-3 rounded-2xl bg-mint-pale px-4 py-3">
                <span className="font-heading text-xs text-muted">{String(idx + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-medium">{r.title}</span>
                  <span className="block text-sm text-muted">{r.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <SectionLabel>Who pays us</SectionLabel>
          <h2 className="text-2xl font-semibold">The programmes we belong to</h2>
          <div className="prose-plain mt-3 leading-relaxed text-muted">
            <p>
              As an Amazon Associate we earn from qualifying purchases. Amazon is
              our fallback for items where the maker does not run a programme of
              its own.
            </p>
            <p>
              We may also belong to affiliate networks that UK shops and makers
              use, such as Awin and Impact, and to programmes run directly by
              makers of things on the checklist. Where that is the case, the
              product link goes to their site and works the same way. This page
              is updated when a programme is added.
            </p>
            <p>
              We never see who you are or what you bought. The programmes report
              totals to us, not names.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <SectionLabel>What we do not do</SectionLabel>
          <h2 className="text-2xl font-semibold">Ways of earning we have turned down</h2>
          <ul className="mt-4 space-y-2 leading-relaxed text-muted">
            {notDoing.map((n) => (
              <li key={n} className="flex gap-3">
                <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 leading-relaxed text-muted">
            Each of these would change the voice of the site or make it look
            like the ones it exists to be an alternative to.
          </p>
        </section>

        <section className="mb-12">
          <SectionLabel>How to tell</SectionLabel>
          <h2 className="text-2xl font-semibold">Spotting a link that earns</h2>
          <div className="prose-plain mt-3 leading-relaxed text-muted">
            <p>
              Every page with a commission link carries one sentence at the top
              saying so. Links to official guidance, charities, and sources
              never earn anything. The{" "}
              <Link href="/checklist">checklist</Link> and{" "}
              <Link href="/build-your-kit">Build Your Kit</Link> are the only
              pages that carry product links.
            </p>
          </div>
        </section>

        <Callout title="Questions or a product that let you down">
          <p>
            Write to{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. If
            something we linked to was not as described, we want to know, and we
            will take the link down while we check. See also the{" "}
            <Link href="/privacy">privacy page</Link>.
          </p>
          <p className="mt-2 text-sm text-muted">Last checked {site.policiesUpdated}.</p>
        </Callout>
      </div>
    </main>
  );
}
