import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  title: "Build your kit",
  description:
    "An interactive planner: household size and duration target in, a realistic shopping list out. Coming in a later phase.",
};

export default function BuildYourKitPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <PageIntro
        eyebrow="Interactive planner"
        title="Build your kit"
        lede="Pick your household size and a duration target, and get a shopping list scaled to you with a rough cost band. This tool is still being built."
      />
      <Callout title="Not ready yet">
        <p>
          Until the planner is live, the checklist gives the same quantities
          as planning figures per person per day, which you can multiply by
          hand. The &ldquo;starting from nothing&rdquo; shortlist at the top
          of that page is the best place to begin.
        </p>
      </Callout>
      <Link
        href="/checklist"
        className="inline-block rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-ink hover:opacity-90"
      >
        Go to the essentials checklist
      </Link>
    </main>
  );
}
