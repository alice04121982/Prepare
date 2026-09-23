import type { ReactNode } from "react";

export type Cat = "water" | "food" | "power" | "health" | "news" | "money" | "people";

/** Tailwind background class for each category label. */
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
  /** The category colour that labels this page, like the band on a tin. */
  cat: Cat;
  /** Optional actions or links under the lede. */
  children?: ReactNode;
};

/** Page opener: a full-width colour label with the heading in heavy lowercase and the lede under it. */
export default function PageIntro({ title, lede, cat, children }: Props) {
  return (
    <div data-cat className={`${catBg[cat]} border-b-[3px] border-ink`}>
      <div className="wrap pb-10 pt-10 min-[900px]:pb-16 min-[900px]:pt-16">
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
    </div>
  );
}
