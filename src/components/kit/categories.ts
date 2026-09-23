import { catBg, type Cat } from "@/components/PageIntro";

/**
 * Which label colour each kit category wears. One meaning per colour: water,
 * food, power (with light and warmth), health (first aid, medication,
 * sanitation), news (communication), money (cash and documents), people
 * (neighbours). Household-specific lines (babies, children, pets, older
 * people) wear no colour: paper inside the usual ink border.
 */
const byCategory: Record<string, Cat> = {
  Water: "water",
  Food: "food",
  "Power and light": "power",
  Warmth: "power",
  Communication: "news",
  "First aid and medication": "health",
  Sanitation: "health",
  "Cash and documents": "money",
  Neighbours: "people",
};

/** The category's colour, or null when it should stay paper. */
export function catFor(category: string): Cat | null {
  return byCategory[category] ?? null;
}

/** Background class for a category: its label colour, or plain paper. */
export function catBgFor(category: string): string {
  const cat = catFor(category);
  return cat ? catBg[cat] : "bg-paper";
}
