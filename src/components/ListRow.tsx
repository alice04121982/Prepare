import type { ReactNode } from "react";

/**
 * Lilac-style list row: index at the left, small meta line, bold title,
 * right-aligned tag, optional body. Used for guidance links, sources and
 * page indexes so long lists read as one system.
 */
export default function ListRow({
  index,
  meta,
  title,
  href,
  external = false,
  tag,
  children,
}: {
  index?: number;
  meta?: string;
  title: string;
  href?: string;
  external?: boolean;
  tag?: string;
  children?: ReactNode;
}) {
  const heading = href ? (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="font-heading text-lg font-medium text-heading underline-offset-4 hover:underline"
    >
      {title}
    </a>
  ) : (
    <span className="font-heading text-lg font-medium text-heading">{title}</span>
  );
  return (
    <li className="grid gap-x-6 gap-y-1 py-5 sm:grid-cols-[3rem_1fr_auto]">
      <span className="font-heading text-sm text-muted">{index !== undefined ? String(index).padStart(2, "0") : ""}</span>
      <div className="min-w-0">
        {meta ? <p className="text-xs uppercase tracking-wider text-muted">{meta}</p> : null}
        <p className="mt-0.5">{heading}</p>
        {children ? <div className="mt-2 leading-relaxed text-foreground/90">{children}</div> : null}
      </div>
      {tag ? (
        <span className="tag self-start justify-self-start sm:justify-self-end">{tag}</span>
      ) : (
        <span />
      )}
    </li>
  );
}
