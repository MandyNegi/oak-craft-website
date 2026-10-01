"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <Link
        href="/quote"
        tabIndex={visible ? undefined : -1}
        className="flex items-center justify-center w-full py-4 bg-[var(--charcoal)] text-[var(--ivory)] text-sm font-medium tracking-wide hover:bg-[var(--charcoal-light)] transition-colors"
      >
        Get a Free Quote →
      </Link>
    </div>
  );
}
