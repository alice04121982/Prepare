import Link from "next/link";

const nav = [
  { href: "/scenarios", label: "Scenarios" },
  { href: "/checklist", label: "Checklist" },
  { href: "/community", label: "Community" },
  { href: "/faq", label: "FAQ" },
  { href: "/build-your-kit", label: "Build your kit" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-5">
        <Link
          href="/"
          className="font-heading text-xl font-semibold tracking-tight text-foreground"
        >
          Prepare
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-foreground underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
