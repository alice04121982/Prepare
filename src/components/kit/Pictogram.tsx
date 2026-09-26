import type { ReactNode } from "react";

/**
 * Flat ink drawings of what each product line is, standing in for product
 * photos (which the Amazon Associates agreement allows only through its API).
 * Drawn like the diagram pictograms (DESIGN.md, Diagrams): solid ink or paper
 * with a 2.6px ink outline on a 48 unit grid, no tile, no background and no
 * colour. Keyed by the product's `lineId` in products.ts, so grab bag lines
 * that borrow the home kit's products get the same drawing. Decorative: the
 * product name beside it says what it is.
 */

const O = { fill: "var(--paper)", stroke: "currentColor", strokeWidth: 2.6, strokeLinejoin: "round" as const };
const I = { fill: "currentColor" };
const L = { fill: "none", stroke: "currentColor", strokeWidth: 2.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const DRAWINGS: Record<string, ReactNode> = {
  // Bottle of water: cap, neck, body with a label band.
  water: (
    <>
      <rect x="20" y="3" width="8" height="5" {...I} />
      <path d="M20 8h8v5l6 5v24a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V18l6-5z" {...O} />
      <rect x="14" y="24" width="20" height="9" {...I} />
    </>
  ),
  // Water container with a tap.
  "water-extra": (
    <>
      <path d="M17 11V6h14v5" {...L} />
      <rect x="9" y="11" width="32" height="32" rx="3" {...O} />
      <rect x="15" y="17" width="20" height="8" {...I} />
      <rect x="3" y="33" width="7" height="5" {...I} />
    </>
  ),
  // A tin with a wide label.
  tins: (
    <>
      <rect x="11" y="8" width="26" height="36" rx="2" {...O} />
      <rect x="11" y="16" width="26" height="20" {...I} />
      <path d="M15 12h18M15 40h18" {...L} />
    </>
  ),
  // Bag of pasta with a window.
  carbs: (
    <>
      <rect x="12" y="4" width="24" height="7" {...I} />
      <path d="M12 11h24l3 33H9z" {...O} />
      <path d="M17 27l3-3 3 3 3-3 3 3 3-3M17 34l3-3 3 3 3-3 3 3 3-3" {...L} />
    </>
  ),
  // Long-life milk carton.
  milk: (
    <>
      <path d="M14 16l5-10h10l5 10v28H14z" {...O} />
      <path d="M14 16h20" {...L} />
      <rect x="14" y="24" width="20" height="10" {...I} />
      <rect x="26" y="6" width="5" height="5" {...I} />
    </>
  ),
  // Box of oats with a bowl on the front.
  oats: (
    <>
      <rect x="11" y="6" width="26" height="38" {...O} />
      <rect x="11" y="6" width="26" height="8" {...I} />
      <path d="M16 26h16a8 8 0 0 1-16 0z" {...I} />
    </>
  ),
  // A wrapped cereal bar with crimped ends.
  nocook: (
    <>
      <path d="M8 16l-4 3 4 3-4 3 4 3-4 3 4 3h32l4-3-4-3 4-3-4-3 4-3-4-3z" {...O} />
      <rect x="16" y="16" width="16" height="18" {...I} />
    </>
  ),
  // Toilet roll, end on, with a sheet hanging.
  loo: (
    <>
      <rect x="20" y="20" width="13" height="24" {...O} />
      <circle cx="20" cy="20" r="13" {...O} />
      <circle cx="20" cy="20" r="4.5" {...I} />
    </>
  ),
  // Blister pack of tablets.
  purify: (
    <>
      <rect x="8" y="8" width="32" height="36" rx="2" {...O} />
      <circle cx="18" cy="16" r="4" {...I} />
      <circle cx="30" cy="16" r="4" {...I} />
      <circle cx="18" cy="26" r="4" {...I} />
      <circle cx="30" cy="26" r="4" {...I} />
      <circle cx="18" cy="36" r="4" {...I} />
      <circle cx="30" cy="36" r="4" {...I} />
    </>
  ),
  // Pump bottle of hand gel.
  gel: (
    <>
      <rect x="20" y="4" width="16" height="4" {...I} />
      <rect x="21" y="8" width="6" height="8" {...I} />
      <rect x="14" y="16" width="20" height="28" rx="3" {...O} />
      <rect x="14" y="26" width="20" height="8" {...I} />
    </>
  ),
  // Manual tin opener: closed handles, the round cutter and its turning key.
  "tin-opener": (
    <>
      <rect x="18" y="20" width="12" height="25" rx="3" {...I} />
      <path d="M24 24v18" stroke="var(--paper)" strokeWidth="2" />
      <circle cx="24" cy="13" r="8" {...O} />
      <circle cx="24" cy="13" r="2.5" {...I} />
      <rect x="32" y="11" width="5" height="4" {...I} />
      <rect x="37" y="4" width="7" height="18" rx="1.5" {...I} />
    </>
  ),
  // Two AA batteries.
  batteries: (
    <>
      <rect x="13" y="6" width="5" height="4" {...I} />
      <rect x="9" y="10" width="13" height="34" rx="1.5" {...O} />
      <rect x="9" y="10" width="13" height="9" {...I} />
      <rect x="30" y="6" width="5" height="4" {...I} />
      <rect x="26" y="10" width="13" height="34" rx="1.5" {...O} />
      <rect x="26" y="10" width="13" height="9" {...I} />
    </>
  ),
  // Head torch on its strap, with its beam.
  torch: (
    <>
      <path d="M4 34c0-8 9-12 20-12s20 4 20 12" {...L} />
      <rect x="15" y="26" width="18" height="14" rx="2" {...I} />
      <rect x="19" y="29" width="10" height="8" fill="var(--paper)" />
      <path d="M24 16V6M15 18l-5-8M33 18l5-8" {...L} />
    </>
  ),
  // Camping lantern.
  lantern: (
    <>
      <path d="M15 10V9a9 9 0 0 1 18 0v1" {...L} />
      <rect x="13" y="10" width="22" height="5" {...I} />
      <rect x="15" y="15" width="18" height="20" {...O} />
      <rect x="21" y="19" width="6" height="12" {...I} />
      <rect x="12" y="35" width="24" height="9" {...I} />
    </>
  ),
  // Power bank with a charge bolt.
  powerbank: (
    <>
      <rect x="12" y="5" width="24" height="39" rx="3" {...O} />
      <rect x="20" y="5" width="8" height="3" {...I} />
      <path d="M26 13l-8 13h6l-2 11 8-14h-6z" {...I} />
    </>
  ),
  // Wind-up radio: aerial, speaker, dial and crank.
  radio: (
    <>
      <path d="M31 16L41 4" {...L} />
      <rect x="5" y="16" width="38" height="26" rx="2" {...O} />
      <path d="M10 23h14M10 29h14M10 35h14" {...L} />
      <rect x="29" y="22" width="9" height="14" {...I} />
      <path d="M43 30h3v8" {...L} />
    </>
  ),
  // Folded face mask with ear loops.
  masks: (
    <>
      <path d="M9 19c-5 0-5 12 0 12M39 19c5 0 5 12 0 12" {...L} />
      <path d="M9 16c10-5 20-5 30 0v14c-10 7-20 7-30 0z" {...O} />
      <path d="M13 21h22M13 26h22" {...L} />
    </>
  ),
  // First aid case with a cross.
  firstaid: (
    <>
      <path d="M18 14V8h12v6" {...L} />
      <rect x="5" y="14" width="38" height="30" rx="2" {...O} />
      <path d="M21 20h6v6h6v6h-6v6h-6v-6h-6v-6h6z" {...I} />
    </>
  ),
};

export function hasPictogram(lineId: string) {
  return lineId in DRAWINGS;
}

export function Pictogram({ lineId, className = "h-12 w-12" }: { lineId: string; className?: string }) {
  const drawing = DRAWINGS[lineId];
  if (!drawing) return null;
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={`text-ink ${className}`}>
      {drawing}
    </svg>
  );
}
