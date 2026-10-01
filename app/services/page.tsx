import type { Metadata } from "next";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Bespoke carpentry and joinery services — fitted wardrobes, kitchens, alcove units, TV & media units, home offices and more. Made-to-measure by Oak & Craft.",
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Page header */}
      <div className="bg-[var(--beige)] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.15em] uppercase font-medium text-[var(--warm-brown)] mb-3">
            What We Do
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--charcoal)] max-w-xl">
            Our Services
          </h1>
        </div>
      </div>

      {/* Services grid — show all */}
      <ServiceGrid showCTA={false} />

      {/* CTA */}
      <ContactCTA dark />
    </div>
  );
}
