/**
 * Which checklist item each planner line covers.
 *
 * The checklist is the record of what a household has, so a planner line ticks
 * the checklist item it belongs to. Where several lines map to one checklist
 * item (tins, pasta, long-life milk and oats are all "Shelf-stable staples"),
 * they move together: the record is kept at the checklist's granularity, which
 * is the coarser of the two on purpose.
 *
 * A line with no entry here gets a `kit/<id>` key of its own, so it still
 * persists. Keys are `category-slug/item-slug` from src/data/checklist.ts.
 */
export const kitLineCovers: Record<string, string> = {
  water: "water/drinking-water",
  "water-extra": "water/water-for-pets-cooking-and-washing",
  purify: "water/a-way-to-make-water-safe",

  tins: "food/shelf-stable-staples",
  carbs: "food/shelf-stable-staples",
  milk: "food/shelf-stable-staples",
  oats: "food/shelf-stable-staples",
  nocook: "food/food-that-needs-no-cooking",
  "tin-opener": "food/a-manual-tin-opener",

  torch: "power-and-light/torches",
  batteries: "power-and-light/spare-batteries",
  lantern: "power-and-light/battery-lantern",
  powerbank: "power-and-light/power-bank",
  powerstation: "power-and-light/portable-power-station-and-solar-panel",

  firstaid: "first-aid-and-medication/basic-first-aid-kit",
  otc: "first-aid-and-medication/over-the-counter-basics",
  prescriptions: "first-aid-and-medication/regular-prescriptions",
  lenses: "first-aid-and-medication/a-pair-of-glasses-even-if-you-wear-contact-lenses",

  radio: "communication/battery-or-wind-up-radio",
  contacts: "communication/paper-list-of-key-contacts",

  loo: "sanitation/toilet-paper-and-bin-bags",
  binbags: "sanitation/toilet-paper-and-bin-bags",
  wipes: "sanitation/hand-sanitiser-and-wipes",
  gel: "sanitation/hand-sanitiser-and-wipes",

  documents: "documents/copies-of-id-insurance-and-key-records",
  cash: "cash/small-amount-of-cash",

  nappies: "household-specific/babies-and-young-children",
  formula: "household-specific/babies-and-young-children",
  babywipes: "household-specific/babies-and-young-children",
  kids: "household-specific/babies-and-young-children",
  petfood: "household-specific/pets",
  hearing: "household-specific/older-or-disabled-household-members",

  // Face masks and blankets have no checklist line of their own yet.
  // They keep a kit key until they do.
};

export function kitLineKey(id: string) {
  return kitLineCovers[id] ?? `kit/${id}`;
}
