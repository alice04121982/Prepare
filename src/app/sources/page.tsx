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
    <main>
      <PageIntro
        cat="money"
        title="where the numbers come from"
        lede="Every duration and quantity on this site is a conservative planning figure drawn from public emergency-preparedness guidance. The full citation list is still being compiled."
      />

      <section aria-labelledby="method-h" className="wrap py-16 min-[900px]:py-24">
        <h2 id="method-h" className="h-section">
          sources and methodology
        </h2>
        <div className="prose-plain measure mt-6 text-lg">
          <p>
            Guidance draws on publicly available information from national and
            international bodies, including UK gov.uk preparedness guidance,
            the Red Cross and Red Crescent, and FEMA. Durations and quantities
            are deliberately realistic rather than worst-case. Official guidance
            for your own region is updated more often than this site, so check
            it too.
          </p>
        </div>
        <Callout title="Still being written">
          <p>
            A full, linked citation list and an explanation of how each figure
            was derived will appear here so the site can be audited line by
            line.
          </p>
        </Callout>
      </section>

      <section aria-labelledby="design-h" className="border-t-[3px] border-ink py-16 min-[900px]:py-24">
        <div className="wrap">
          <h2 id="design-h" className="h-section">
            design
          </h2>
          <div className="prose-plain measure mt-6 text-lg">
            <p>
              Type is Archivo, an open-source typeface released under the SIL
              Open Font License and served from this site. The site uses no
              stock photographs or illustrations. No tracking. Some product
              links may earn a small commission; the checklist says so where
              it applies.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
