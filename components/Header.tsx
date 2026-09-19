"use client";

import { useState } from "react";
import { BookingButton } from "@/components/BookingButton";
import { navLinks, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-end justify-between gap-4 px-5 py-5 sm:px-8">
        <a
          href="#top"
          className="font-serif text-2xl leading-none tracking-tight text-navy"
        >
          {site.name}
        </a>

        <nav className="hidden items-center gap-7 text-[13px] text-gray md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b border-transparent pb-0.5 transition hover:border-navy hover:text-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 items-center text-[13px] font-semibold uppercase tracking-[0.14em] text-navy md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="h-px bg-gray-line" />
      </div>

      {open ? (
        <div id="mobile-nav" className="px-5 py-5 md:hidden sm:px-8">
          <nav className="flex flex-col gap-4 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray hover:text-navy"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <BookingButton className="mt-2 w-full">
              Book a Revenue Recovery Review
            </BookingButton>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
