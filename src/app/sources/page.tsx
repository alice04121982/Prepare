import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import SectionLabel from "@/components/SectionLabel";
import Illustration from "@/components/Illustration";
import { photoCredits } from "@/components/Photo";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  title: "Sources and methodology",
  description:
    "Where the durations and quantities on this site come from, and how they were derived.",
};

export default function SourcesPage() {
  return (
    <main className="w-full py-4 sm:py-8">
      <PageIntro
        eyebrow="Sources and methodology"
        title="Where the numbers come from"
        lede="Every duration and quantity on this site is a conservative planning figure drawn from public emergency-preparedness guidance. The full citation list is still being compiled."
        aside={<Illustration name="intro-sources" className="w-full" />}
      />

      <div className="mx-auto max-w-3xl">
      <section className="prose-plain leading-relaxed">
        <p>
          Guidance draws on publicly available information from national and
          international bodies, including UK gov.uk preparedness guidance,
          the Red Cross and Red Crescent, and FEMA. The specific food
          suggestions on the checklist follow nutrition guidance from the
          British Nutrition Foundation, reported by BBC News in September
          2026. Durations and quantities are deliberately realistic rather
          than worst-case. Official guidance for your own region is updated
          more often than this site, so check it too.
        </p>
      </section>
      <Callout title="Still being written">
        <p>
          A full, linked citation list and an explanation of how each figure
          was derived will appear here so the site can be audited line by
          line.
        </p>
      </Callout>
      <section className="prose-plain mt-8 leading-relaxed">
        <SectionLabel>Illustrations and design</SectionLabel>
        <h2 className="text-2xl font-semibold">Illustrations and design</h2>
        <p className="mt-3">
          Illustrations are from the Textile 3D Shapes pack on Figma Community, released under CC0. Photographs are
          from Unsplash under the Unsplash Licence, free for commercial use
          with no attribution required; we credit the photographers below
          anyway. Type is General Sans and Switzer from Fontshare. No
          tracking. Some product links may earn a small commission; the
          checklist says so where it applies.
        </p>
        <h3 className="mt-8 text-lg font-semibold">Photographers</h3>
        <ul className="mt-3 columns-2 gap-6 text-sm leading-relaxed">
          {[...new Map(photoCredits().map((c) => [c.photographer, c])).values()].map((c) => (
            <li key={c.photographer}>
              <a
                href={`${c.profile}?utm_source=stay_prepared&utm_medium=referral`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.photographer}
              </a>
            </li>
          ))}
        </ul>
      </section>
      </div>
    </main>
  );
}
