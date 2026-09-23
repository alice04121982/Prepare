import { catBg, type Cat } from "@/components/PageIntro";

/** Which label colour each kit category wears. Unknown categories fall back to people. */
const byCategory: Record<string, Cat> = {
  Water: "water",
  Food: "food",
  "Power and light": "power",
  Warmth: "power",
  Communication: "news",
  "First aid and medication": "health",
  Sanitation: "health",
  "Cash and documents": "money",
  Babies: "people",
  Children: "people",
  Pets: "people",
  "Older household members": "people",
};

export function catFor(category: string): Cat {
  return byCategory[category] ?? "people";
}

export function catBgFor(category: string): string {
  return catBg[catFor(category)];
}
