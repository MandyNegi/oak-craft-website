import type { Metadata } from "next";
import { CTAButton } from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Oak & Craft — bespoke carpentry and joinery built around your home. Learn about our approach to made-to-measure craftsmanship.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Page header */}
      <div className="bg-[var(--charcoal)] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.15em] uppercase font-medium text-[var(--oak)] mb-4">
            About Oak & Craft
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-white max-w-xl leading-tight">
            Craftsmanship That Fits Your Space
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Story */}
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[var(--charcoal)] mb-6">
              Our Story
            </h2>
            {/* TODO: Replace with real company story */}
            <div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
              <p>
                [Add company story here — how you got started, what drives you,
                why you do what you do.]
              </p>
              <p>
                [Add years of experience if applicable, e.g. &ldquo;With over X years
                working in carpentry and joinery...&rdquo;]
              </p>
              <p>
                [Add any qualifications, certifications or memberships if
                applicable.]
              </p>
            </div>
          </div>

          {/* Values */}
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[var(--charcoal)] mb-6">
              How We Work
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Made to Measure",
                  body: "Every piece is designed around your specific space, dimensions and requirements. Nothing is off-the-shelf.",
                },
                {
                  title: "Attention to Detail",
                  body: "Good joinery is in the details — the way a door sits, how drawers run, how a finish is applied. We take these things seriously.",
                },
                {
                  title: "Practical Design",
                  body: "Beautiful work that also functions well in daily life. We design for how spaces are actually used.",
                },
                {
                  title: "Clear Communication",
                  body: "We keep you informed throughout the project. No surprises — just straightforward, honest communication.",
                },
                {
                  title: "Quality Materials",
                  body: "We use materials that are appropriate for the project and built to last. We're happy to discuss options to suit your requirements and budget.",
                },
                {
                  title: "Professional Installation",
                  body: "We handle the installation ourselves. The standard of the installation is as important as the quality of the piece.",
                },
              ].map((value) => (
                <div key={value.title} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-1 bg-[var(--oak)]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-heading font-semibold text-[var(--charcoal)] mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {value.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team / placeholder */}
        <div className="mt-20 pt-16 border-t border-[var(--border)]">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[var(--charcoal)] mb-6">
            The Team
          </h2>
          <div className="bg-[var(--beige-light)] p-8 text-sm text-[var(--text-muted)] leading-relaxed max-w-xl">
            [Add team information here — who is involved in the business, their
            backgrounds and what they bring to each project.]
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[var(--charcoal)] mb-4">
            Ready to Discuss Your Project?
          </h2>
          <p className="text-[var(--text-muted)] mb-6 max-w-md mx-auto text-sm">
            We&apos;d love to hear about what you have in mind. Get in touch for a
            free, no-obligation quotation.
          </p>
          <CTAButton href="/quote" variant="primary" size="lg">
            Get a Free Quote
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
