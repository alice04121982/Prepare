import { ExternalLink } from "lucide-react";
import { amazonProductUrl, type Product } from "@/data/products";
import { AMAZON_TAG, priceTime, type Offer } from "@/lib/amazon";

/**
 * One Amazon product on a shopping list line: its name, how many, and a
 * link to the listing. A live price and photo show only when they came from
 * the Product Advertising API (`offer`), with the time they were fetched;
 * otherwise the link invites the reader to check the price on Amazon.
 */
export function AmazonPick({ product, quantity, offer }: { product: Product; quantity: number; offer?: Offer }) {
  const url = amazonProductUrl(product.asin, AMAZON_TAG);
  return (
    <div className={`mt-2.5 border border-ink p-2.5 ${offer?.image ? "grid grid-cols-[3.5rem_minmax(0,1fr)] gap-2.5" : ""}`}>
      {offer?.image ? (
        <a href={url} target="_blank" rel="noopener noreferrer sponsored" className="flex aspect-square items-center justify-center bg-paper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={offer.image}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full object-contain"
          />
        </a>
      ) : null}
      <div className="min-w-0">
        <p className="text-[0.9375rem] leading-snug">
          <span className="font-extrabold">On Amazon:</span> {product.name}
        </p>
        <p className="mt-0.5 text-[0.9375rem] text-ink-2 tabular-nums">
          Buy {quantity}
          {offer?.price ? (
            <>
              {" "}
              &middot; <span className="font-extrabold text-ink">{offer.price}</span> each, price as of{" "}
              {priceTime(offer.fetchedAt)}
            </>
          ) : null}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          aria-label={`${offer?.price ? "View" : "Check the price of"} ${product.name} on Amazon`}
          className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap font-extrabold underline underline-offset-4 hover:decoration-4"
        >
          {offer?.price ? "view listing" : "check price"} <ExternalLink size={14} strokeWidth={2.5} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
