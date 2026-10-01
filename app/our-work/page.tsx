import type { Metadata } from "next";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Browse our portfolio of bespoke carpentry projects — fitted wardrobes, kitchens, alcove units, media walls, home offices and more.",
};

export default function OurWorkPage() {
  return (
    <div className="pt-20">
      {/* Page header */}
      <div className="bg-[var(--beige)] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.15em] uppercase font-medium text-[var(--warm-brown)] mb-3">
            Portfolio
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--charcoal)] max-w-xl mb-4">
            Our Work
          </h1>
          <p className="text-[var(--text-muted)] max-w-xl">
            A selection of bespoke carpentry and joinery projects we&apos;ve
            completed. Use the filters below to browse by type.
          </p>
        </div>
      </div>

      <div className="bg-[var(--ivory)]">
        <ProjectGallery showHeader={false} />
      </div>

      <ContactCTA />
    </div>
  );
}
