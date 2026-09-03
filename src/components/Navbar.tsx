"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { navigateTo } from "@/lib/pageTransition";
import { Logo } from "./Logo";
import { PillButton } from "./PillButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNav(e: MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    if (href === "/" && pathname === "/") {
      navigateTo("#top");
    } else {
      navigateTo(href);
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_20px_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 lg:px-10">
        <Link
          href="/"
          onClick={(e) => handleNav(e, "/")}
          className="flex items-center transition-transform duration-300 hover:scale-[1.04]"
        >
          <Logo size={56} />
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className={`group relative py-1 text-sm transition-colors hover:text-forest ${
                  active ? "font-bold text-ink" : "font-medium text-ink/55"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    active ? "scale-x-100" : ""
                  }`}
                />
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <button
            aria-label="Search"
            className="text-ink/70 transition-all duration-300 hover:scale-110 hover:text-forest"
          >
            <Search size={19} />
          </button>
          <PillButton as="a" href="/contact">
            Get in Touch
          </PillButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/5 text-forest lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-forest/10 bg-white px-6 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  handleNav(e, link.href);
                  setOpen(false);
                }}
                className="text-base font-medium text-ink/80"
              >
                {link.label}
              </a>
            ))}
            <PillButton as="a" href="/contact" className="mt-2 justify-center" onClick={() => setOpen(false)}>
              Get in Touch
            </PillButton>
          </div>
        </div>
      )}
    </header>
  );
}
