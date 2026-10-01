import { business } from "@/data/business";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function ServiceAreaSection() {
  if (business.serviceAreas.length === 0) return null;

  const primary = business.serviceAreas.slice(0, 3).join(", ");

  return (
    <section
      className="py-16 lg:py-20 border-t border-[var(--border)]"
      aria-labelledby="service-areas-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          <p className="text-xs tracking-[0.15em] uppercase font-medium text-[var(--warm-brown)] mb-3">
            Where We Work
          </p>
          <h2
            id="service-areas-heading"
            className="font-heading text-2xl sm:text-3xl font-semibold text-[var(--charcoal)] mb-6"
          >
            Serving Customers Across {primary}{business.serviceAreas.length > 3 ? " & Beyond" : ""}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {business.serviceAreas.map((area) => (
              <span
                key={area}
                className="px-4 py-2 text-sm font-medium bg-[var(--beige)] text-[var(--charcoal)]"
              >
                {area}
              </span>
            ))}
          </div>
          <p className="text-[var(--text-muted)] text-sm mt-6 max-w-lg mx-auto">
            Not sure if we cover your area? Get in touch — we&apos;re happy to discuss your project.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
