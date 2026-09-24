import type { ReactNode } from "react";

export type Cat = "water" | "food" | "power" | "health" | "news" | "money" | "people";

/** Tailwind background class for each category label, shared by the checklist and the kit planner. */
export const catBg: Record<Cat, string> = {
  water: "bg-cat-water",
  food: "bg-cat-food",
  power: "bg-cat-power",
  health: "bg-cat-health",
  news: "bg-cat-news",
  money: "bg-cat-money",
  people: "bg-cat-people",
};

type Props = {
  title: string;
  lede: ReactNode;
  /** Optional actions or links under the lede. */
  children?: ReactNode;
  /** Optional explanatory diagram, beside the text on wide screens and under it on phones. */
  aside?: ReactNode;
};

/**
 * Page opener: the heading in heavy lowercase and the lede under it, closed by
 * an ink rule. Plain paper on purpose: colour is kept for categories.
 */
export default function PageIntro({ title, lede, children, aside }: Props) {
  return (
    <div className="border-b-[3px] border-ink">
      <div
        className={`wrap grid items-start gap-x-16 gap-y-8 pb-10 pt-10 min-[900px]:pb-16 min-[900px]:pt-16 ${aside ? "min-[900px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]" : ""}`}
      >
        <div>
          <h1
            className="display max-w-[16ch] text-[clamp(2.5rem,11vw,5.5rem)]"
            style={{ fontVariationSettings: '"wdth" 112' }}
          >
            {title}
          </h1>
          <div className="mt-6 max-w-[48ch] text-[1.1875rem] leading-normal min-[900px]:mt-8 min-[900px]:text-[1.375rem]">
            {lede}
          </div>
          {children ? <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">{children}</div> : null}
        </div>
        {aside ? <div className="mx-auto w-full max-w-[440px] text-ink">{aside}</div> : null}
      </div>
    </div>
  );
}
