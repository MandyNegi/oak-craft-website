import { CTAButton } from "@/components/ui/CTAButton";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

interface ContactCTAProps {
  heading?: string;
  subheading?: string;
  dark?: boolean;
}

export function ContactCTA({
  heading = "Have a Space in Mind?",
  subheading = "Tell us what you'd like to create and we'll get back to you about your project.",
  dark = false,
}: ContactCTAProps) {
  const bg = dark ? "bg-[var(--charcoal)]" : "bg-[var(--beige)]";
  const headingColor = dark ? "text-white" : "text-[var(--charcoal)]";
  const textColor = dark ? "text-white/60" : "text-[var(--text-muted)]";

  return (
    <section
      className={`${bg} py-20 lg:py-24`}
      aria-labelledby="contact-cta-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="max-w-2xl mx-auto text-center">
          <h2
            id="contact-cta-heading"
            className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold ${headingColor} mb-5`}
          >
            {heading}
          </h2>
          <p className={`${textColor} text-base leading-relaxed mb-8 max-w-lg mx-auto`}>
            {subheading}
          </p>
          <CTAButton href="/quote" variant="secondary" size="lg">
            Get Your Free Quote
          </CTAButton>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
