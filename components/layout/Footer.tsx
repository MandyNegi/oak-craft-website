import Link from "next/link";
import { business } from "@/data/business";
import { formatTelLink } from "@/lib/utils";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/our-work" },
  { label: "About", href: "/about" },
  { label: "FAQs", href: "/faq" },
  { label: "Get a Quote", href: "/quote" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hasContact = business.phone || business.email;
  const hasAddress = business.address && business.postcode;
  const hasSocial =
    business.socialMedia.instagram ||
    business.socialMedia.facebook ||
    business.socialMedia.houzz;

  return (
    <footer className="bg-[var(--charcoal)] text-[var(--ivory)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex flex-col leading-none mb-4">
              <span className="font-heading text-2xl font-bold tracking-tight">
                OAK & CRAFT
              </span>
              <span className="text-[10px] tracking-[0.18em] font-medium uppercase text-white/50 mt-0.5">
                Bespoke Carpentry &amp; Joinery
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Made-to-measure furniture, storage and joinery. Every piece
              designed around your home.
            </p>
            {business.serviceAreas.length > 0 && (
              <p className="text-white/40 text-xs mt-4">
                Serving: {business.serviceAreas.join(" · ")}
              </p>
            )}
            {/* Social Icons */}
            {hasSocial && (
              <div className="flex gap-4 mt-6">
                {business.socialMedia.instagram && (
                  <a
                    href={`https://instagram.com/${business.socialMedia.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Oak & Craft on Instagram"
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                )}
                {business.socialMedia.facebook && (
                  <a
                    href={business.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Oak & Craft on Facebook"
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                )}
                {business.socialMedia.houzz && (
                  <a
                    href={business.socialMedia.houzz}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Oak & Craft on Houzz"
                    className="text-white/50 hover:text-white transition-colors text-xs font-bold"
                  >
                    Houzz
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs tracking-[0.15em] uppercase font-medium text-white/40 mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-[0.15em] uppercase font-medium text-white/40 mb-5">
              Get in Touch
            </h3>
            {hasContact ? (
              <ul className="space-y-3">
                {business.phone && (
                  <li>
                    <a
                      href={`tel:${formatTelLink(business.phone)}`}
                      className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.06-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      {business.phone}
                    </a>
                  </li>
                )}
                {business.email && (
                  <li>
                    <a
                      href={`mailto:${business.email}`}
                      className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      {business.email}
                    </a>
                  </li>
                )}
              </ul>
            ) : (
              <Link
                href="/quote"
                className="text-sm text-white/70 hover:text-white transition-colors underline underline-offset-4"
              >
                Request a free quote →
              </Link>
            )}
            {hasAddress && (
              <p className="text-xs text-white/40 mt-4 leading-relaxed">
                {business.address}
                <br />
                {business.postcode}
              </p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {year} {business.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
