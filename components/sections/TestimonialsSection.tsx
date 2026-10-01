import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function TestimonialsSection() {
  return (
    <section
      id="reviews"
      className="py-20 lg:py-28 bg-[var(--beige-light)]"
      aria-labelledby="reviews-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="mb-12 max-w-xl">
          <p className="text-xs tracking-[0.15em] uppercase font-medium text-[var(--warm-brown)] mb-3">
            Customer Reviews
          </p>
          <h2
            id="reviews-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--charcoal)]"
          >
            What Our Customers Say
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <AnimateOnScroll key={i} delay={i * 70} animation="fade-up">
              <TestimonialCard testimonial={t} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
