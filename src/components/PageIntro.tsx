type Props = {
  eyebrow?: string;
  title: string;
  lede: string;
};

/** Consistent page opener: small label, heading, one-paragraph lede. */
export default function PageIntro({ eyebrow, title, lede }: Props) {
  return (
    <div className="mb-12 border-b border-line pb-8">
      {eyebrow ? (
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mb-4 text-4xl font-semibold leading-tight">{title}</h1>
      <p className="max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
    </div>
  );
}
