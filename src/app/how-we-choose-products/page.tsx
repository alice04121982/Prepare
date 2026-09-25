import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { products as allProducts } from "@/data/products";

// Only the products the site shows today; tiered alternatives wait for the
// tier picker and are not yet on any page.
const products = allProducts.filter((p) => !p.tier);

export const metadata: Metadata = {
  alternates: { canonical: "/how-we-choose-products" },
  title: "How we choose products",
  description:
    "The rules every product on Stay Prepared has to pass, how each one is checked by hand, and how often we recheck them.",
};

/** The public version of docs/product-policy.md. Keep the two in step. */
const rules = [
  { title: "It is on the list", body: "We only link to things on the checklist or in the kit planner. Nothing is added for the commission." },
  { title: "It does the job", body: "The right size, quantity and type for its line. A 12 litre container is not a 10 litre one." },
  { title: "It is sold in the UK", body: "By Amazon or a UK seller, with UK delivery, and in stock on the day we check." },
  { title: "The price is fair", body: "Inside the price band we show. If the price moves out of the band, the product changes." },
  { title: "It is well reviewed", body: "4 stars or more from at least 100 reviews, or a supermarket or Amazon own-brand line." },
  { title: "It is plain and safe", body: "No products sold with fear. No weapons or unregulated medicines. Electrical goods carry a UK plug and safety marking." },
  { title: "Our name matches", body: "The name on our site matches the listing: brand, model, size and pack count." },
];

export default function HowWeChooseProductsPage() {
  const verified = products.filter((p) => p.verified);
  const dates = verified.map((p) => p.checked).filter((d): d is string => Boolean(d)).sort();
  const latest = dates.at(-1);
  const latestText = latest
    ? new Date(`${latest}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    : null;

  return (
    <main>
      <PageIntro
        title="how we choose products"
        lede="Check what you already have first. When you do need to buy, every product we link to has to pass the same rules."
      />

      <section aria-labelledby="rules-h" className="wrap pb-14 min-[900px]:pb-20">
        <h2 id="rules-h" className="h-section">
          the rules
        </h2>
        <ol className="mt-6 border-t-[3px] border-ink">
          {rules.map((r, i) => (
            <li key={r.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-ink py-4">
              <span aria-hidden="true" className="display text-2xl tabular-nums leading-none">
                {i + 1}
              </span>
              <div className="measure">
                <h3 className="font-extrabold">{r.title}</h3>
                <p className="mt-1 text-ink-2">{r.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="check-h" className="border-t-[3px] border-ink py-14 min-[900px]:py-20">
        <div className="wrap prose-plain measure text-lg">
          <h2 id="check-h" className="h-section">
            how we check
          </h2>
          <p className="mt-5">
            A person opens every listing and checks it against these rules. Search results are never enough. We recheck
            every product every 3 months, and straight away if a listing changes or a reader tells us something is
            wrong.
          </p>
          <p>
            {verified.length} of {products.length} products are checked by hand
            {latestText ? `, most recently on ${latestText}` : ""}. The rest are being checked now.
          </p>
        </div>
      </section>

      <section aria-labelledby="money-h" className="border-t-[3px] border-ink py-14 min-[900px]:py-20">
        <div className="wrap prose-plain measure text-lg">
          <h2 id="money-h" className="h-section">
            how the site is paid for
          </h2>
          <p className="mt-5">
            Some links earn us a small commission when you buy. It never changes what we recommend, and nobody pays to
            be listed. As an Amazon Associate we earn from qualifying purchases.
          </p>
          <p>
            Your data: see <Link href="/privacy">privacy and cookies</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
