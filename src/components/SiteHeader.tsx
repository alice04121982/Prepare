"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "/kits", label: "Ready-made kits" },
  { href: "/checklist", label: "Checklist" },
  { href: "/why", label: "Why three days?" },
  { href: "/community", label: "Neighbours" },
  { href: "/worried", label: "Worried?" },
];

function Wordmark() {
  return (
    <>
      <span className="font-bold">Stay</span>{" "}
      <span className="font-normal">Prepared</span>
    </>
  );
}

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
    <header>
      <div className="flex items-center justify-between gap-x-6 px-4 py-5 sm:px-10">
        <Link
          href="/"
          className="font-heading text-xl tracking-tight text-heading"
        >
          <Wordmark />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-5 sm:flex">
          <ul className="flex gap-x-5 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="underline-offset-4 hover:text-heading hover:underline aria-[current=page]:text-heading aria-[current=page]:underline"
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

        {/* Hamburger (phones only) */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label="Open menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-heading hover:bg-tag sm:hidden"
        >
          <Menu size={24} aria-hidden="true" />
        </button>
      </div>

      {/* Full page mobile menu */}
      <div
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-0 z-50 flex flex-col bg-background sm:hidden"
      >
        <div className="flex items-center justify-between px-4 py-5">
          <Link
            href="/"
            onClick={close}
            className="font-heading text-xl tracking-tight text-heading"
          >
            <Wordmark />
          </Link>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-heading hover:bg-tag"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label="Main"
          className="flex flex-1 flex-col justify-center overflow-y-auto px-4"
        >
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/"
                onClick={close}
                aria-current={pathname === "/" ? "page" : undefined}
                className="block rounded-xl px-3 py-3 font-heading text-3xl text-muted aria-[current=page]:text-heading"
              >
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block rounded-xl px-3 py-3 font-heading text-3xl text-muted aria-[current=page]:text-heading"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 pb-8 pt-4">
          <Link
            href="/build-your-kit"
            onClick={close}
            className="btn btn-primary w-full justify-center !py-4 !text-base"
          >
            Build your kit
          </Link>
        </div>
      </div>
    </header>
  );
}
