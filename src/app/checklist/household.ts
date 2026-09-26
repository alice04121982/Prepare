import { householdFromParams } from "@/data/kit-rules";

type Params = Record<string, string | string[] | undefined>;

/**
 * The household in a /checklist address. Links from the old /basket and
 * /kits pages (which redirect here) may carry the number of people as `p`;
 * the planner calls them adults, `a`.
 */
export function householdFromKitParams(params: Params) {
  const q = { ...params };
  if (q.p !== undefined && q.a === undefined) q.a = q.p;
  return householdFromParams(q);
}
