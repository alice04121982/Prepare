import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

/** Pale-mint rounded aside, the site's equivalent of the offline guide's notice block. */
export default function Callout({ title, children }: Props) {
  return (
    <aside className="my-8 rounded-card bg-mint-pale px-6 py-5 text-[0.95rem] leading-relaxed">
      {title ? <p className="mb-1 font-heading font-medium text-heading">{title}</p> : null}
      <div className="prose-plain text-foreground/90">{children}</div>
    </aside>
  );
}
