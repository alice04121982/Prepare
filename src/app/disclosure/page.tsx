import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "How this site makes money",
  description:
    "Stay Prepared earns a commission on some product links. What that means, which programmes are used, and the rules the site holds itself to.",
};

export default function DisclosurePage() {
  return (
    <main className="w-full py-4 sm:py-8">
      <PageIntro
        eyebrow="Affiliate disclosure"
        title="How this site makes money"
        lede="Some links to products earn a commission. It costs you nothing extra, and it does not change what goes on the list."
      />

      <div className="prose-plain mx-auto max-w-3xl leading-relaxed">
        <p className="text-lg">As an Amazon Associate we earn from qualifying purchases.</p>

        <h2 className="mt-10 text-2xl font-semibold">What that means</h2>
        <p className="mt-3">
          Some of the product links on this site are affiliate links. If you follow one and buy
          something, the retailer pays us a small percentage of what you spent. You pay the same price
          you would have paid anyway.
        </p>
        <p>
          Any page carrying those links says so. Nothing is hidden behind a redirect.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">The rules we hold to</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            The site earns when you buy something you actually needed. It never earns by talking you
            into more than you need.
          </li>
          <li>
            Where an item can be covered by something you already own, that free option is listed
            first, above any product.
          </li>
          <li>
            Quantities come from public emergency guidance, not from what is profitable to sell. The
            figures are the same whether a line has a product attached or not.
          </li>
          <li>
            Prices are shown as bands rather than exact figures, because a price quoted on a page goes
            out of date and the Amazon Associates terms do not allow it.
          </li>
          <li>No sponsored posts, no display advertising, no own-brand kits.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">Programmes we use</h2>
        <p className="mt-3">
          Amazon Associates UK, for the broad catalogue where a maker or specialist retailer has no
          programme of its own. Where a maker does run one, we link to the maker first.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">Questions</h2>
        <p className="mt-3">
          If something on the site reads like a sales pitch rather than a list, that is a mistake and
          worth telling us about.
        </p>

        <p className="mt-10">
          <Link href="/sources" className="underline underline-offset-4 hover:text-accent">
            Sources and credits
          </Link>
        </p>
      </div>
    </main>
  );
}
