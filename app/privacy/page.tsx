import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Oak & Craft privacy policy — how we handle your personal information.",
};

export default function PrivacyPage() {
  const year = new Date().getFullYear();

  return (
    <div className="pt-24 pb-20 min-h-screen" style={{ background: "var(--ivory)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <li><Link href="/" className="hover:text-[var(--charcoal)] transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li>Privacy Policy</li>
          </ol>
        </nav>

        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-[var(--charcoal)] mb-4">
          Privacy Policy
        </h1>
        <p className="text-[var(--text-muted)] text-sm mb-10">
          Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="prose prose-sm max-w-none text-[var(--text-body)] space-y-8">
          <section>
            <h2 className="font-heading text-xl font-semibold text-[var(--charcoal)] mb-3">
              Who we are
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              {/* TODO: Replace with real business details */}
              Oak & Craft is a bespoke carpentry and joinery business based in the UK.
              [Add full business name, address and contact details here once available.]
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[var(--charcoal)] mb-3">
              What information we collect
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed mb-3">
              When you submit a quotation enquiry through our website, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[var(--text-muted)] text-sm">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your phone number (if provided)</li>
              <li>Your postcode and property details</li>
              <li>Details about your project</li>
              <li>Any images you choose to upload</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[var(--charcoal)] mb-3">
              How we use your information
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              We use the information you provide solely to respond to your
              enquiry and to discuss your project with you. We will not use
              your personal information for marketing purposes without your
              explicit consent, and we will not sell or share your information
              with third parties except where necessary to process your enquiry
              (for example, using an email service provider).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[var(--charcoal)] mb-3">
              How long we keep your information
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              We retain enquiry information only for as long as is necessary to
              respond to and process your request. If your project does not
              proceed, we will delete your personal information within a
              reasonable period.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[var(--charcoal)] mb-3">
              Your rights
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Under UK GDPR, you have the right to request access to, correction
              or deletion of your personal information. To exercise any of these
              rights, please contact us using the details on our website.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-[var(--charcoal)] mb-3">
              Cookies
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              This website does not currently use tracking cookies or analytics
              beyond what is technically necessary to operate the website.
              [Update this section if analytics are added.]
            </p>
          </section>

          <p className="text-xs text-[var(--text-muted)] pt-4 border-t border-[var(--border)]">
            &copy; {year} Oak & Craft. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
