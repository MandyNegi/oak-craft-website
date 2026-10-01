import { services } from "@/data/services";
import { ServiceCard } from "./ServiceCard";
import { CTAButton } from "@/components/ui/CTAButton";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

interface ServiceGridProps {
  limit?: number;
  showCTA?: boolean;
}

export function ServiceGrid({ limit, showCTA = true }: ServiceGridProps) {
  const displayed = limit ? services.slice(0, limit) : services;

  return (
    <section
      id="services"
      className="py-20 lg:py-28"
      style={{ background: "var(--ivory)" }}
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateOnScroll className="mb-12 lg:mb-16 max-w-2xl">
          <p className="text-xs tracking-[0.15em] uppercase font-medium text-[var(--warm-brown)] mb-3">
            Our Services
          </p>
          <h2
            id="services-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--charcoal)] mb-4"
          >
            Made Around Your Space
          </h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            Every home is different. We design and build bespoke pieces that make
            the most of your space, style and requirements.
          </p>
        </AnimateOnScroll>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayed.map((service, i) => (
            <AnimateOnScroll key={service.slug} delay={i * 60} animation="fade-up">
              <ServiceCard service={service} />
            </AnimateOnScroll>
          ))}
        </div>

        {/* CTA */}
        {showCTA && limit && services.length > limit && (
          <div className="mt-12 text-center">
            <CTAButton href="/services" variant="outline" size="lg">
              View All Services
            </CTAButton>
          </div>
        )}

        {showCTA && !limit && (
          <div className="mt-12 text-center">
            <CTAButton href="/quote" variant="primary" size="lg">
              Get a Free Quote
            </CTAButton>
          </div>
        )}
      </div>
    </section>
  );
}
