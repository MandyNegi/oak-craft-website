import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <blockquote className="bg-white p-7 flex flex-col gap-5">
      {/* Stars */}
      <div className="flex gap-1" aria-label="5 star review">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="var(--oak)"
            aria-hidden="true"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="text-[var(--charcoal)] text-sm leading-relaxed flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Attribution */}
      <footer className="border-t border-[var(--border)] pt-4">
        <p className="font-medium text-sm text-[var(--charcoal)]">
          {testimonial.customerName}
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          {testimonial.projectType} &middot; {testimonial.location}
        </p>
        {testimonial.isPlaceholder && (
          <p className="text-xs text-[var(--text-muted)]/50 mt-1 italic">
            Example review — replace with a verified customer testimonial
          </p>
        )}
      </footer>
    </blockquote>
  );
}
