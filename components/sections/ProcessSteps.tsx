import { CTAButton } from "@/components/ui/CTAButton";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const steps = [
  {
    number: "01",
    title: "Tell Us What You Need",
    description:
      "Share your idea, a rough sketch, some photos or inspiration images. There's no need for precise measurements at this stage.",
  },
  {
    number: "02",
    title: "We Discuss Your Project",
    description:
      "We'll have a conversation about what you're looking for, the space you have, your budget range and any specific requirements.",
  },
  {
    number: "03",
    title: "Measure & Design",
    description:
      "Where appropriate, we arrange a site visit to take accurate measurements and finalise the design with you.",
  },
  {
    number: "04",
    title: "Receive Your Quotation",
    description:
      "You'll receive a clear, itemised quotation based on your confirmed requirements. No surprises.",
  },
  {
    number: "05",
    title: "We Build & Install",
    description:
      "Once you're happy and approve the project, we build your piece in our workshop and install it professionally in your home.",
  },
];

export function ProcessSteps() {
  return (
    <section
      id="process"
      className="py-20 lg:py-28 bg-[var(--charcoal)]"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateOnScroll className="mb-14 max-w-2xl">
          <p className="text-xs tracking-[0.15em] uppercase font-medium text-[var(--oak)] mb-3">
            The Process
          </p>
          <h2
            id="process-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4"
          >
            From Idea to Installation
          </h2>
          <p className="text-white/60 leading-relaxed">
            A straightforward, transparent process — from first conversation to
            finished room.
          </p>
        </AnimateOnScroll>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 mb-14">
          {steps.map((step, i) => (
            <AnimateOnScroll
              key={step.number}
              delay={i * 80}
              animation="fade-up"
              className="relative"
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-5 left-[calc(50%+24px)] right-[-24px] h-px bg-white/10"
                  aria-hidden="true"
                />
              )}
              <div className="relative z-10">
                <span className="font-heading text-4xl lg:text-5xl font-bold text-white/10 leading-none block mb-3">
                  {step.number}
                </span>
                <h3 className="font-heading text-base font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* CTA */}
        <AnimateOnScroll>
          <CTAButton href="/quote" variant="secondary" size="lg">
            Start Your Project
          </CTAButton>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
