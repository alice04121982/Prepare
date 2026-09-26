"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { PRICE_NOTE } from "@/lib/amazon";
import { Pictogram } from "@/components/kit/Pictogram";
import AmazonBasketButton, { basketLabel } from "@/components/AmazonBasketButton";
import type { PackBuy } from "@/data/packs";

/**
 * Everything in a kit before it goes to Amazon: a drawer from the right on
 * wide screens and a sheet from the bottom on phones, with the list
 * scrolling between a fixed header and a fixed footer that holds the totals
 * and the basket button (the pattern in shipped carts and "shop this look"
 * panels on Mobbin, 25 September 2026: lululemon, Uvodo, Hims, Shopee).
 * A native modal <dialog>, so Escape closes it, focus stays inside and the
 * page behind is inert. No slide: DESIGN.md keeps motion to the reach bar.
 */
export default function KitDrawer({
  open,
  onClose,
  title,
  detail,
  buys,
  supplies,
  kitOnce,
  editHref,
  note,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  detail: string;
  buys: PackBuy[];
  supplies: number;
  kitOnce: number;
  editHref: string;
  note: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    // Keep the page behind still while the drawer is open.
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="kit-drawer-h"
      onClose={onClose}
      // A click on the backdrop lands on the dialog itself, not its content.
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="mx-0 mb-0 mt-auto max-h-[88dvh] w-full max-w-none border-t-[3px] border-ink bg-paper p-0 text-ink backdrop:bg-ink/50 min-[900px]:ml-auto min-[900px]:mr-0 min-[900px]:mt-0 min-[900px]:h-dvh min-[900px]:max-h-dvh min-[900px]:w-[30rem] min-[900px]:border-l-[3px] min-[900px]:border-t-0"
    >
      <div className="flex max-h-[inherit] flex-col min-[900px]:h-full">
        <div className="flex items-start justify-between gap-4 border-b-[10px] border-ink px-4.5 pb-3.5 pt-4 min-[900px]:px-6">
          <div>
            <h2
              id="kit-drawer-h"
              className="display text-[clamp(1.625rem,6vw,2rem)] leading-none"
              style={{ fontVariationSettings: '"wdth" 115' }}
            >
              {title}
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-snug text-ink-2">{detail}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-11 w-11 flex-none place-items-center rounded-[4px] border-[3px] border-ink hover:bg-[var(--hover)]"
          >
            <X size={22} strokeWidth={2.6} aria-hidden="true" />
          </button>
        </div>

        {/* Products, totals and the edit link scroll together; only the
            basket button, with its disclosure, stays pinned below. */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4.5 min-[900px]:px-6">
          <ul>
            {buys.map((b) => (
              <li
                key={`${b.line.id}-${b.product.asin}`}
                className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-3.5 border-b border-ink py-3"
              >
                <Pictogram lineId={b.product.lineId} className="h-11 w-11" />
                <span className="block min-w-0 leading-snug">
                  <span className="block font-bold">{b.product.name}</span>
                  <span className="mt-0.5 block text-[0.9375rem] text-ink-2 tabular-nums">
                    Buy {b.quantity}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-3.5 grid gap-1 text-[0.9375rem] tabular-nums">
            <div className="flex justify-between gap-3">
              <dt>Food, water and supplies</dt>
              <dd className="whitespace-nowrap font-extrabold">about &pound;{supplies}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Kit you buy once (torches, radio)</dt>
              <dd className="whitespace-nowrap font-extrabold">about &pound;{kitOnce}</dd>
            </div>
          </dl>
          <p className="mt-2 text-sm leading-snug text-ink-2">{PRICE_NOTE}</p>
          <Link href={editHref} className="mb-2 mt-1 inline-flex min-h-11 items-center text-sm font-extrabold">
            change quantities or products on your list
          </Link>
        </div>

        <div className="border-t-[3px] border-ink px-4.5 pb-4 pt-3 min-[900px]:px-6">
          <AmazonBasketButton
            items={buys.map((b) => ({ asin: b.product.asin, quantity: b.quantity }))}
            note={note}
          >
            {basketLabel(buys.length)}
          </AmazonBasketButton>
        </div>
      </div>
    </dialog>
  );
}
