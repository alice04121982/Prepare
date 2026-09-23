import { catBg, type Cat } from "@/components/PageIntro";
import { checklist } from "@/data/checklist";

/**
 * Each checklist category wears the colour of its tin: one meaning per colour
 * across the site. Household-specific lines (babies, pets, older people) are
 * not a tin, so they stay plain paper.
 */
const catBySlug: Record<string, Cat> = {
  water: "water",
  food: "food",
  "power-and-light": "power",
  "first-aid-and-medication": "health",
  communication: "news",
  sanitation: "health",
  documents: "money",
  cash: "money",
};

export const catFor = (slug: string): Cat | undefined => catBySlug[slug];
export const catForTitle = (title: string): Cat | undefined =>
  catFor(checklist.find((c) => c.title === title)?.slug ?? "");
export const bgFor = (cat: Cat | undefined) => (cat ? catBg[cat] : "bg-paper");

/** A small square of the category colour, printed as an outline. */
export function Swatch({ cat }: { cat: Cat | undefined }) {
  return (
    <span
      aria-hidden="true"
      data-cat
      className={`${bgFor(cat)} inline-block size-3.5 flex-none border-2 border-ink`}
    />
  );
}
