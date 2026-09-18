type Props = {
  eyebrow?: string;
  title: string;
  lede: string;
  /** Optional illustration or visual to sit beside the intro on wide screens. */
  aside?: React.ReactNode;
};

/** Consistent page opener on a mint panel: small label, light display heading, lede. */
export default function PageIntro({ eyebrow, title, lede, aside }: Props) {
  return (
    <div className="mb-12 rounded-card bg-mint px-6 py-12 sm:px-12 sm:py-16">
      <div className="wrap grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          {eyebrow ? (
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/70">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-[18ch] text-4xl font-normal leading-[1.05] text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {lede}
          </p>
        </div>
        {aside ? <div className="w-full max-w-[360px] justify-self-center rounded-card bg-surface p-8 md:justify-self-end">{aside}</div> : null}
      </div>
    </div>
  );
}
