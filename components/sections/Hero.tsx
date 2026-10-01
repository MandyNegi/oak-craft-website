import Image from "next/image";
import Link from "next/link";
import { CTAButton } from "@/components/ui/CTAButton";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-end">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=85"
          alt="Beautiful bespoke kitchen with handcrafted cabinetry and natural wood finishes"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlay — bottom-weighted for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.10) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-white/70 text-xs tracking-[0.2em] uppercase font-medium mb-5">
            Bespoke Carpentry & Joinery
          </p>

          {/* Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-[1.05] mb-6">
            Bespoke Carpentry,<br />
            Made for Your Home.
          </h1>

          {/* Supporting text */}
          <p className="text-white/80 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
            Made-to-measure furniture, storage and joinery, crafted with care
            and installed professionally across the UK.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <CTAButton href="/quote" variant="secondary" size="lg">
              Get a Free Quote
            </CTAButton>
            <CTAButton
              href="/our-work"
              variant="ghost"
              size="lg"
              className="bg-white/10 text-white border border-white/30 hover:bg-white/20"
            >
              View Our Work
            </CTAButton>
          </div>

          {/* Trust line */}
          <p className="text-white/50 text-xs mt-8 tracking-wide">
            Made-to-measure &nbsp;•&nbsp; Quality craftsmanship &nbsp;•&nbsp; Professional installation
          </p>
        </div>
      </div>
    </section>
  );
}
