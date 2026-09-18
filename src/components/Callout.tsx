import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

/** Soft-background aside, matching the .notice block in the offline guide. */
export default function Callout({ title, children }: Props) {
  return (
    <aside className="my-8 rounded-md border-l-4 border-accent bg-soft px-5 py-4 text-[0.95rem] leading-relaxed">
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div className="prose-plain text-foreground/90">{children}</div>
    </aside>
  );
}
