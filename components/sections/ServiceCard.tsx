import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

export function ServiceCard({ service, featured }: ServiceCardProps) {
  return (
    <article
      className={`group bg-white overflow-hidden transition-shadow duration-300 hover:shadow-lg ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${featured ? "h-72 lg:h-96" : "h-52"}`}
      >
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold text-[var(--charcoal)] mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
          {service.shortDescription}
        </p>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--charcoal)] hover:text-[var(--warm-brown)] transition-colors"
          aria-label={`Learn more about ${service.title}`}
        >
          Learn More
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
