import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

/** A boxed note: heavy ink border, a thick rule under the title, like the panel on the back of a pack. */
export default function Callout({ title, children }: Props) {
  return (
    <aside className="my-8 max-w-[65ch] border-[3px] border-ink">
      {title ? (
        <p className="border-b-[6px] border-ink px-4.5 py-3 text-lg font-extrabold">{title}</p>
      ) : null}
      <div className="prose-plain px-4.5 py-4">{children}</div>
    </aside>
  );
}
