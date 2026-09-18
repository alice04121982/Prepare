import credits from "../../public/photos/credits.json";

type Credit = {
  slot: string;
  rank: number;
  file: string;
  alt: string;
  photographer: string;
  profile: string;
  page: string;
  w: number;
  h: number;
};

const all = credits as Credit[];

export function photoCredits(): Credit[] {
  return all;
}

type Props = {
  slot: string;
  /** Which of Alice's picks for this slot to show; 1 is the first. */
  rank?: number;
  /** Tailwind aspect class, e.g. "aspect-[21/9]" for a band. */
  aspect?: string;
  className?: string;
  /** Show the photographer credit under the image. */
  caption?: boolean;
  priority?: boolean;
};

/**
 * A self-hosted Unsplash photograph with the site's green tint. Files live in
 * public/photos/, chosen by Alice from the candidates page and recorded in
 * credits.json. Photographers are credited on the Sources page.
 */
export default function Photo({
  slot,
  rank = 1,
  aspect = "aspect-[21/9]",
  className = "",
  caption = false,
  priority = false,
}: Props) {
  const c = all.find((x) => x.slot === slot && x.rank === rank) ?? all.find((x) => x.slot === slot);
  if (!c) return null;
  return (
    <figure className={`wrap ${className}`}>
      <div className={`relative max-h-[560px] overflow-hidden rounded-card ${aspect}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/photos/${c.file}`}
          alt={c.alt}
          width={c.w}
          height={c.h}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover saturate-[.85]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-forest/10 mix-blend-multiply" />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-xs text-muted">
          Photo by{" "}
          <a
            href={`${c.profile}?utm_source=stay_prepared&utm_medium=referral`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-sage"
          >
            {c.photographer}
          </a>{" "}
          on Unsplash
        </figcaption>
      ) : null}
    </figure>
  );
}
