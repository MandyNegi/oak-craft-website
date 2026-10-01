import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { faqs } from "@/data/faqs";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTAButton } from "@/components/ui/CTAButton";

export default function HomePage() {
  const previewFaqs = faqs.slice(0, 5);

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Trust strip */}
      <TrustStrip />

      {/* Services */}
      <ServiceGrid limit={8} showCTA />

      {/* Featured Projects */}
      <ProjectGallery limit={6} showFilters={false} />

      {/* Before & After */}
      <section className="py-20 lg:py-28 bg-white" aria-labelledby="before-after-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="mb-12 max-w-xl">
            <p className="text-xs tracking-[0.15em] uppercase font-medium text-[var(--warm-brown)] mb-3">
              Transformations
            </p>
            <h2
              id="before-after-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--charcoal)] mb-4"
            >
              From Empty Space to Something Made for You
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Every space has its quirks. We build around them.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BeforeAfterSlider
              beforeSrc="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
              afterSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
              beforeAlt="Empty alcove space before bespoke unit was fitted"
              afterAlt="Fitted alcove unit with shelving and cabinetry installed"
              label="Alcove — before & after"
            />
            <BeforeAfterSlider
              beforeSrc="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
              afterSrc="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80"
              beforeAlt="Bare spare bedroom before home office conversion"
              afterAlt="Fitted home office with desk and shelving installed"
              label="Home office — before & after"
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessSteps />

      {/* Quote CTA */}
      <ContactCTA />

      {/* Reviews */}
      <TestimonialsSection />

      {/* FAQ snippet */}
      <section className="py-20 lg:py-28 bg-white" aria-labelledby="faq-home-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="mb-10">
            <p className="text-xs tracking-[0.15em] uppercase font-medium text-[var(--warm-brown)] mb-3">
              Common Questions
            </p>
            <h2
              id="faq-home-heading"
              className="font-heading text-3xl sm:text-4xl font-semibold text-[var(--charcoal)]"
            >
              Frequently Asked Questions
            </h2>
          </AnimateOnScroll>
          <FAQAccordion faqs={previewFaqs} />
          <div className="mt-8">
            <CTAButton href="/faq" variant="outline" size="md">
              View All FAQs
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Service areas */}
      <ServiceAreaSection />
    </>
  );
}
