type Props = {
  eyebrow?: string;
  title: string;
  lede: string;
  /** Optional illustration or visual to sit beside the intro on wide screens. */
  aside?: React.ReactNode;
};

/** Consistent page opener on a navy panel, held to a wide 2.9:1 shape on desktop: small label, light display heading, lede. */
export default function PageIntro({ eyebrow, title, lede, aside }: Props) {
  return (
    <div className="mb-12 flex items-center rounded-card bg-mint px-6 py-12 sm:px-12 md:aspect-[2.9/1] md:py-8">
      <div className="wrap grid w-full items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          {eyebrow ? (
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/70">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-[18ch] text-4xl font-normal leading-[1.05] text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {lede}
          </p>
        </div>
        {aside ? (
          <div className="w-full max-w-[320px] justify-self-center drop-shadow-2xl md:max-w-[min(430px,28vw)] md:justify-self-end md:pr-4">
            {aside}
          </div>
        ) : null}
      </div>
    </div>
  );
}
