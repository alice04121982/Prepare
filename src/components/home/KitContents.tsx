import { ShoppingBasket } from "lucide-react";
import type { PackBuy } from "@/data/packs";
import { amazonImageUrl } from "@/data/products";

/**
 * "See what is in it": every product the basket button will send, with its
 * photo, how many and the price band, so nothing arrives at Amazon unseen.
 * A native <details>, closed by default, so the box stays short.
 */
export default function KitContents({ buys }: { buys: PackBuy[] }) {
  return (
    <details className="group border-b border-ink">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-extrabold [&::-webkit-details-marker]:hidden">
        <span>
          See what is in it <span className="font-normal tabular-nums">({buys.length} products)</span>
        </span>
        <span aria-hidden="true" className="text-xl leading-none transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <ul className="max-h-[26rem] overflow-y-auto border-t border-ink">
        {buys.map((b) => (
          <li
            key={`${b.line.id}-${b.product.asin}`}
            className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-3 border-b border-ink py-2.5 last:border-b-0"
          >
            {b.product.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={amazonImageUrl(b.product.image, 96)}
                alt=""
                loading="lazy"
                referrerPolicy="no-referrer"
                className="aspect-square w-12 border border-ink bg-paper object-contain p-0.5"
              />
            ) : (
              <span aria-hidden="true" className="grid aspect-square w-12 place-items-center border border-ink bg-hush text-ink-2">
                <ShoppingBasket size={20} strokeWidth={1.5} />
              </span>
            )}
            <span className="min-w-0 text-[0.9375rem] leading-snug">
              <span className="block font-bold">{b.product.name}</span>
              <span className="block text-ink-2 tabular-nums">
                Buy {b.quantity} &middot; {b.product.priceBand} each
              </span>
            </span>
          </li>
        ))}
      </ul>
    </details>
  );
}
