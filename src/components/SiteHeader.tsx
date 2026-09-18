import Link from "next/link";

const nav = [
  { href: "/scenarios", label: "Scenarios" },
  { href: "/checklist", label: "Checklist" },
  { href: "/community", label: "Community" },
  { href: "/faq", label: "FAQ" },
  { href: "/official-guidance", label: "Official guidance" },
  { href: "/worried", label: "Worried?" },
];

export default function SiteHeader() {
  return (
    <header>
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-5 sm:px-10">
        <Link
          href="/"
          className="font-heading text-xl font-semibold tracking-tight text-heading"
        >
          Stay Prepared
        </Link>
        <nav aria-label="Main" className="flex items-center gap-5">
          <ul className="hidden gap-x-5 text-sm text-muted sm:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="underline-offset-4 hover:text-heading hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/build-your-kit" className="btn btn-primary">
            Build your kit
          </Link>
        </nav>
      </div>
      <ul className="wrap flex gap-x-5 px-4 pb-3 text-sm text-muted sm:hidden">
        {nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="underline-offset-4 hover:text-heading hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
