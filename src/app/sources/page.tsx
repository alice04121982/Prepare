import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  title: "Sources and methodology",
  description:
    "Where the durations and quantities on this site come from, and how they were derived.",
};

export default function SourcesPage() {
  return (
    <main className="mx-auto w-full max-w-3xl py-4 sm:py-8">
      <PageIntro
        eyebrow="Sources and methodology"
        title="Where the numbers come from"
        lede="Every duration and quantity on this site is a conservative planning figure drawn from public emergency-preparedness guidance. The full citation list is still being compiled."
      />
      <section className="prose-plain leading-relaxed">
        <p>
          Guidance draws on publicly available information from national and
          international bodies, including UK gov.uk preparedness guidance,
          the Red Cross and Red Crescent, and FEMA. Durations and quantities
          are deliberately realistic rather than worst-case. Official guidance
          for your own region is updated more often than this site, so check
          it too.
        </p>
      </section>
      <Callout title="Still being written">
        <p>
          A full, linked citation list and an explanation of how each figure
          was derived will appear here so the site can be audited line by
          line.
        </p>
      </Callout>
    </main>
  );
}
