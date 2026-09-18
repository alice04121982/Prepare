import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Callout from "@/components/Callout";
import Illustration from "@/components/Illustration";
import ListRow from "@/components/ListRow";
import SectionLabel from "@/components/SectionLabel";
import Photo from "@/components/Photo";
import { officialGuidance, guidanceLastChecked } from "@/data/official-guidance";

export const metadata: Metadata = {
  title: "Official guidance",
  description:
    "Current government and public-body guidance on preparing for emergencies, each link checked and dated. No decades-old PDFs.",
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function OfficialGuidancePage() {
  return (
    <main className="w-full py-4 sm:py-8">
      <PageIntro
        eyebrow="Official guidance"
        title="What the government currently says"
        lede="Live links to the official sources, each one opened and checked on the date shown. Other sites hand you survival PDFs from the last century. This page points you at what is actually in force now."
        aside={<Illustration name="intro-guidance" className="max-w-[260px]" />}
      />

      <Photo slot="guidance" className="mb-12" />

      <div className="mx-auto max-w-3xl">

      <p className="mb-10 text-sm text-muted">
        Last checked {formatDate(guidanceLastChecked)}. If a link has stopped
        working or the advice has changed, the offline guide and the
        checklist still hold the core of it.
      </p>

      <Callout title="The UK government's own site is called Prepare">
        <p>
          Launched in May 2024, prepare.campaign.gov.uk is short, calm, and
          worth ten minutes. Everything on this site is consistent with it.
          Where we go further, it is on how long things last, what the
          numbers mean for a real household, and the part about neighbours.
        </p>
      </Callout>

      <div className="divide-y divide-line">
        {officialGuidance.map((group) => (
          <section key={group.title} className="py-10">
            <SectionLabel>Official</SectionLabel>
            <h2 className="text-2xl font-semibold">{group.title}</h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-muted">{group.intro}</p>
            <ol className="mt-4 divide-y divide-line">
              {group.links.map((l, i) => (
                <ListRow
                  key={l.url + l.title}
                  index={i + 1}
                  meta={`${l.published ? `Published ${formatDate(l.published)} · ` : ""}Checked ${formatDate(l.lastChecked)}`}
                  title={l.title}
                  href={l.url}
                  external
                  tag={l.publisher}
                >
                  <p>{l.summary}</p>
                </ListRow>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-4 pt-8 text-sm">
        <Link href="/checklist" className="btn btn-primary">
          Back to the checklist
        </Link>
        <a
          href="/offline/index.html"
          download="stay-prepared-offline-guide.html"
          className="btn btn-secondary"
        >
          Download the offline guide
        </a>
      </div>
      </div>
    </main>
  );
}
