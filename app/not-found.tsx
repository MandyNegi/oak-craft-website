import Link from "next/link";
import { CTAButton } from "@/components/ui/CTAButton";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20" style={{ background: "var(--ivory)" }}>
      <div className="text-center px-4">
        <p className="font-heading text-8xl font-bold text-[var(--beige)] mb-6 select-none" aria-hidden="true">
          404
        </p>
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-[var(--charcoal)] mb-3">
          Page Not Found
        </h1>
        <p className="text-[var(--text-muted)] mb-8 max-w-sm mx-auto text-sm">
          Sorry, we couldn&apos;t find the page you were looking for. It may have
          moved, or the link may be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <CTAButton href="/" variant="primary" size="md">
            Back to Home
          </CTAButton>
          <CTAButton href="/quote" variant="outline" size="md">
            Get a Free Quote
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
