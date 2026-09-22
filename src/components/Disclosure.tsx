import Link from "next/link";

/**
 * One plain sentence at the top of any page that carries a product link
 * (docs/monetisation-plan.md, rule 5). Works in server and client components.
 */
export default function Disclosure({ className = "" }: { className?: string }) {
  return (
    <p className={`rounded-2xl bg-mint-pale px-4 py-3 text-sm leading-relaxed text-foreground/90 ${className}`}>
      Some links on this page earn us a small commission. It never changes what
      we recommend, and the free option is always listed first.{" "}
      <Link href="/disclosure" className="underline underline-offset-4 hover:text-accent">
        How this site earns money
      </Link>
    </p>
  );
}
