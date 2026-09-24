import type { ReactNode } from "react";
import { ShoppingBasket } from "lucide-react";

import { AMAZON_TAG as TAG } from "@/lib/amazon";

/**
 * Sends a list of products to the reader's Amazon basket.
 *
 * This is Amazon's documented "Add to Cart form", submitted with GET, rather
 * than a link to the same address. On a phone with the Amazon app installed,
 * tapping a link to amazon.co.uk hands it to the app, which opens the basket
 * and drops the items. A form submission is not handed to the app, so the
 * browser opens Amazon's "add these items" page as intended. Tested on an
 * iPhone on 24 September 2026: the link failed in the app, the page itself
 * worked in a browser.
 */
export default function AmazonBasketButton({
  items,
  className = "",
  children,
}: {
  items: { asin: string; quantity: number }[];
  className?: string;
  children: ReactNode;
}) {
  if (!items.length) return null;
  return (
    <form action="https://www.amazon.co.uk/gp/aws/cart/add.html" method="get" className={className}>
      {TAG ? <input type="hidden" name="AssociateTag" value={TAG} /> : null}
      {items.map((it, i) => (
        <span key={`${it.asin}-${i}`} hidden>
          <input type="hidden" name={`ASIN.${i + 1}`} value={it.asin} />
          <input type="hidden" name={`Quantity.${i + 1}`} value={Math.max(1, it.quantity)} />
        </span>
      ))}
      <button type="submit" className="btn btn-primary btn-lg w-full">
        <ShoppingBasket size={20} strokeWidth={2.25} aria-hidden="true" />
        {children}
      </button>
    </form>
  );
}
