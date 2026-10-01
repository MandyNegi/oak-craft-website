import type { Metadata } from "next";
import { faqs } from "@/data/faqs";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about bespoke carpentry, pricing, quotations, timescales and our process. Perfect Space Interior — made-to-measure joinery.",
};

export default function FAQPage() {
  return (
    <div className="pt-20">
      {/* Page header */}
      <div className="bg-[var(--beige)] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.15em] uppercase font-medium text-[var(--warm-brown)] mb-3">
            Frequently Asked Questions
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--charcoal)] max-w-xl">
            Your Questions, Answered
          </h1>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <FAQAccordion faqs={faqs} />
      </div>

      <ContactCTA
        heading="Still Have Questions?"
        subheading="Get in touch and we'll be happy to help with anything you'd like to know."
      />
    </div>
  );
}
