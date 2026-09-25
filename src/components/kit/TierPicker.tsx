import { OptionRow } from "@/components/kit/Controls";
import type { Tier } from "@/data/products";

const TIERS: { id: Tier; label: string }[] = [
  { id: "budget", label: "budget" },
  { id: "regular", label: "regular" },
  { id: "premium", label: "premium" },
];

/**
 * Budget, regular or premium: which products fill the basket. Each row shows
 * the whole basket's rough cost in that range for this household, less
 * anything already ticked. Lines with nothing in a range use the regular pick.
 */
export function TierPicker({
  value,
  onChange,
  estimates,
}: {
  value: Tier;
  onChange: (tier: Tier) => void;
  estimates: Record<Tier, number>;
}) {
  return (
    <fieldset className="px-4.5 pb-4.5 pt-3.5 min-[900px]:px-6">
      <legend className="float-left mb-2.5 w-full font-extrabold leading-tight">Price range</legend>
      <div className="clear-both grid gap-2">
        {TIERS.map((t) => (
          <OptionRow
            key={t.id}
            type="radio"
            name="kit-tier"
            id={`kit-tier-${t.id}`}
            checked={value === t.id}
            onChange={() => onChange(t.id)}
            note={estimates[t.id] > 0 ? <span className="tabular-nums">about £{estimates[t.id]}</span> : "nothing to buy"}
          >
            {t.label}
          </OptionRow>
        ))}
      </div>
    </fieldset>
  );
}
