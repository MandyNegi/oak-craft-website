import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description:
    "Request a free quotation for your bespoke carpentry project. Tell us about your space and we'll get back to you promptly.",
};

export default function QuotePage() {
  return (
    <div className="pt-24 pb-20 min-h-screen" style={{ background: "var(--ivory)" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.15em] uppercase font-medium text-[var(--warm-brown)] mb-3">
            Free Quotation
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-[var(--charcoal)] mb-3">
            Tell Us About Your Project
          </h1>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed">
            A few details is all we need to get started. No obligation — we'll
            review your enquiry and get back to you to discuss the possibilities.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-6 sm:p-10 border border-[var(--border)]">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
