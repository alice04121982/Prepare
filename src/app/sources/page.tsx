import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  alternates: { canonical: "/sources" },
  title: "Sources and methodology",
  description:
    "Where the durations and quantities on this site come from, and how they were derived.",
};

export default function SourcesPage() {
  return (
    <main>
      <PageIntro
        title="where the numbers come from"
        lede="Every duration and quantity on this site is a conservative planning figure drawn from public emergency-preparedness guidance."
      />

      <section aria-labelledby="method-h" className="wrap py-16 min-[900px]:py-24">
        <h2 id="method-h" className="h-section">
          sources and methodology
        </h2>
        <div className="prose-plain measure mt-6 text-lg">
          <p>
            Guidance draws on publicly available information from national and
            international bodies, including UK gov.uk preparedness guidance,
            the Red Cross and Red Crescent, and FEMA. The specific food
            suggestions on the checklist follow nutrition guidance from the
            British Nutrition Foundation, reported by BBC News in September
            2026. Durations and quantities are deliberately realistic rather
            than worst-case. Official guidance
            for your own region is updated more often than this site, so check
            it too.
          </p>
        </div>
      </section>

      <section aria-labelledby="design-h" className="border-t-[3px] border-ink py-16 min-[900px]:py-24">
        <div className="wrap">
          <h2 id="design-h" className="h-section">
            design
          </h2>
          <div className="prose-plain measure mt-6 text-lg">
            <p>
              Type is Archivo, an open-source typeface released under the SIL
              Open Font License and served from this site. Diagrams are drawn
              for this site from its own figures. The site uses no stock
              photographs or illustrations. No cookies: page views are counted
              anonymously. Some product links may earn a small commission, and
              pages with product links say so.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
