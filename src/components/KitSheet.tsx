import Link from "next/link";
import { ExternalLink, ShoppingBasket } from "lucide-react";
import { amazonBasketUrl, buildKit } from "@/data/kit-rules";
import { amazonProductUrl, productsFor } from "@/data/products";
import { estimate, peopleIn, plannerHref, type Kit } from "@/data/kits";
import SectionLabel from "@/components/SectionLabel";

const TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;

/**
 * A ready-made kit, rendered from the same engine as the planner.
 *
 * Server component on purpose: these pages are the ones meant to be found
 * and shared, so they are static HTML with no query string. The interactive
 * version, with ticking and the shop picker, is the planner.
 */
export default function KitSheet({ kit }: { kit: Kit }) {
  const { lines, tasks } = buildKit(kit.household);
  const categories = [...new Set(lines.map((l) => l.category))];
  const people = peopleIn(kit.household);

  const picks = lines.map((line) => {
    const product = productsFor(line.id)[0];
    return {
      line,
      product,
      buyQty: product ? Math.max(1, Math.ceil(line.quantity / (product.unitsPerProduct ?? 1))) : 0,
    };
  });

  const withProduct = picks.filter((p) => p.product);
  const basket = amazonBasketUrl(
    withProduct.map((p) => ({ asin: p.product!.asin, quantity: p.buyQty })),
    TAG,
  );
  const cost = estimate(lines, (id) => productsFor(id)[0]);

  return (
    <div className="mx-auto max-w-3xl">
      {/* What this kit is, in figures */}
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { k: "People", v: String(people) },
          { k: "Days covered", v: String(kit.household.days) },
          { k: "Things to get", v: String(lines.length) },
          {
            k: "Estimated cost",
            v: cost.priced ? `£${cost.low} to £${cost.high}` : "See below",
          },
        ].map((s) => (
          <div key={s.k} className="rounded-2xl bg-mint-pale px-4 py-3">
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">{s.k}</dt>
            <dd className="mt-1 font-heading text-xl tabular-nums text-heading">{s.v}</dd>
          </div>
        ))}
      </dl>

      {cost.priced ? (
        <p className="mt-3 text-sm text-muted">
          The estimate covers the {cost.priced} of {cost.total} items with a product listed, which are
          the durable things: the torch, the radio, the power bank and so on. Food and water come from
          your normal shop and cost a few pounds a week rather than a lump sum.
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        {basket ? (
          <a
            href={basket}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn btn-primary"
          >
            <ShoppingBasket size={18} />
            Add {withProduct.length} {withProduct.length === 1 ? "item" : "items"} to an Amazon basket
          </a>
        ) : null}
        <Link href={plannerHref(kit.household)} className="btn btn-secondary">
          Adjust this for my household
        </Link>
      </div>

      {basket ? (
        <p className="mt-3 max-w-xl text-sm text-muted">
          The basket opens on Amazon with these items in it, in the quantities shown. You check it and
          pay there. Nothing is bought until you choose to.
        </p>
      ) : null}

      {/* The list */}
      <div className="mt-12 space-y-8">
        {categories.map((c) => {
          const items = picks.filter((p) => p.line.category === c);
          return (
            <section key={c}>
              <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">{c}</h2>
              <ul className="divide-y divide-line rounded-card bg-surface">
                {items.map(({ line, product, buyQty }) => (
                  <li key={line.id} className="px-5 py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-medium">{line.item}</span>
                        {line.priority ? <span className="tag text-[0.65rem]">Get first</span> : null}
                      </span>
                      <span className="font-heading tabular-nums text-heading sm:text-right">
                        {line.quantity ? line.quantity : ""} {line.unit}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{line.basis}</p>
                    {line.freeOption ? (
                      <p className="mt-1 text-sm">
                        <span className="font-medium text-heading">Free option:</span> {line.freeOption}
                      </p>
                    ) : null}
                    {product ? (
                      <p className="mt-2 text-sm">
                        <a
                          href={amazonProductUrl(product.asin, TAG)}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="inline-flex items-center gap-1 font-medium text-heading underline underline-offset-4 hover:text-accent"
                        >
                          {product.name} <ExternalLink size={12} />
                        </a>{" "}
                        <span className="text-muted">
                          {buyQty} × · {product.priceBand}
                        </span>
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Things that cost nothing */}
      <section className="mt-12">
        <SectionLabel>No shopping needed</SectionLabel>
        <h2 className="text-2xl font-semibold">Four things that cost nothing</h2>
        <ul className="mt-4 space-y-2 rounded-card bg-mint-pale px-5 py-4 text-sm leading-relaxed">
          {tasks.map((t) => (
            <li key={t.id} className="flex gap-3">
              <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
              <span>
                {t.text}
                {t.url ? (
                  <>
                    {" "}
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-sage"
                    >
                      Link
                    </a>
                  </>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-sm text-muted">
        As an Amazon Associate we earn from qualifying purchases. It changes nothing you pay, and the
        free option is listed first on every line that has one.{" "}
        <Link href="/disclosure" className="underline underline-offset-4 hover:text-heading">
          How this site makes money
        </Link>
        .
      </p>
    </div>
  );
}
