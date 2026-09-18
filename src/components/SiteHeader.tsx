"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

const NAV_LINKS = [
  { href: "/scenarios", label: "Scenarios" },
  { href: "/checklist", label: "Checklist" },
  { href: "/build-your-kit", label: "Build your kit" },
  { href: "/community", label: "Community" },
  { href: "/faq", label: "FAQ" },
  { href: "/sources", label: "Sources" },
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Close the menu whenever the route changes (state derived during render,
  // which avoids a cascading setState inside an effect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }
  const close = () => setOpen(false);

  // Lock page scroll and close on Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40">
      {/* backdrop-blur lives on this inner bar, not the header, so the fixed
          full page menu below is positioned against the viewport. */}
      <div className="relative z-50 border-b border-neutral-200 bg-background/95 backdrop-blur dark:border-neutral-800">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link
            href="/"
            className="font-heading text-lg font-semibold tracking-tight"
            aria-label="Prepare home"
          >
            Prepare
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm font-medium">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={
                      isActive(href)
                        ? "text-foreground underline underline-offset-8 decoration-2"
                        : "text-neutral-600 hover:text-foreground dark:text-neutral-400 dark:hover:text-foreground"
                    }
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hamburger button (mobile only) */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md md:hidden hover:bg-neutral-100 dark:hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          >
            <span aria-hidden="true" className="relative block h-4 w-6">
              <span
                className={`absolute left-0 h-0.5 w-6 rounded bg-current transition-transform duration-200 ${
                  open ? "top-[7px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-6 rounded bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-6 rounded bg-current transition-transform duration-200 ${
                  open ? "top-[7px] -rotate-45" : "top-[14px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Full page mobile menu */}
      <div
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col bg-background md:hidden"
      >
        <nav
          aria-label="Mobile primary"
          className="flex flex-1 flex-col justify-center px-6 pt-16"
        >
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                onClick={close}
                className={`block rounded-md px-3 py-3 font-heading text-3xl font-semibold ${
                  pathname === "/"
                    ? "text-foreground"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              >
                Home
              </Link>
            </li>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  onClick={close}
                  className={`block rounded-md px-3 py-3 font-heading text-3xl font-semibold ${
                    isActive(href)
                      ? "text-foreground"
                      : "text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-6 pb-10">
          <a
            href="/offline/index.html"
            download="prepare-offline-guide.html"
            className="block rounded-md bg-neutral-900 px-5 py-3 text-center text-sm font-medium text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
          >
            Download the offline guide
          </a>
        </div>
      </div>
    </header>
  );
}
