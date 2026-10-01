"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/our-work" },
  { label: "How It Works", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/#reviews" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navBg = isHomepage && !scrolled
    ? "bg-transparent"
    : "bg-[var(--ivory)] border-b border-[var(--border)]";

  const textColor = isHomepage && !scrolled
    ? "text-white"
    : "text-[var(--charcoal)]";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          navBg
        )}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className={cn(
                "font-heading text-xl lg:text-2xl font-bold tracking-tight transition-colors",
                textColor
              )}
            >
              PERFECT SPACE INTERIOR
            </span>
            <span
              className={cn(
                "text-[9px] lg:text-[10px] tracking-[0.18em] font-medium uppercase transition-colors",
                isHomepage && !scrolled
                  ? "text-white/70"
                  : "text-[var(--text-muted)]"
              )}
            >
              Bespoke Carpentry &amp; Joinery
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:opacity-70",
                  textColor
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quote"
              className="ml-4 px-5 py-2.5 text-sm font-medium bg-[var(--charcoal)] text-[var(--ivory)] hover:bg-[var(--charcoal-light)] transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile: Quote CTA + Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href="/quote"
              className={cn(
                "px-4 py-2 text-xs font-medium transition-colors",
                isHomepage && !scrolled
                  ? "bg-white text-[var(--charcoal)]"
                  : "bg-[var(--charcoal)] text-[var(--ivory)]"
              )}
            >
              Get a Quote
            </Link>
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn("p-2 transition-colors", textColor)}
            >
              <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <>
                    <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-0 z-40 bg-[var(--ivory)] flex flex-col transition-transform duration-300 ease-in-out lg:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border)]">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-heading text-xl font-bold tracking-tight text-[var(--charcoal)]">
              PERFECT SPACE INTERIOR
            </span>
            <span className="text-[9px] tracking-[0.18em] font-medium uppercase text-[var(--text-muted)]">
              Bespoke Carpentry &amp; Joinery
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="p-2 text-[var(--charcoal)]"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-6 py-8 gap-1" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-4 text-lg font-medium text-[var(--charcoal)] border-b border-[var(--border)] hover:text-[var(--warm-brown)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/quote"
            className="mt-8 w-full py-4 text-center text-base font-medium bg-[var(--charcoal)] text-[var(--ivory)] hover:bg-[var(--charcoal-light)] transition-colors"
          >
            Get a Free Quote
          </Link>
        </nav>
      </div>
    </>
  );
}
