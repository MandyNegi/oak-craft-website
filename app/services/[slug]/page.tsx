import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CTAButton } from "@/components/ui/CTAButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const relatedProjects = projects
    .filter((p) =>
      service.slug.includes(
        p.category.toLowerCase().replace(" ", "-").replace("&", "")
      )
    )
    .slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative h-80 lg:h-[500px]">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center gap-2 text-xs text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90">{service.title}</li>
            </ol>
          </nav>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
            {service.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main */}
          <div className="lg:col-span-2">
            <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-8">
              {service.fullDescription}
            </p>

            {/* Features */}
            <h2 className="font-heading text-xl font-semibold text-[var(--charcoal)] mb-5">
              What&apos;s Included
            </h2>
            <ul className="space-y-3 mb-10">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-[var(--text-body)]">
                  <svg className="flex-shrink-0 mt-0.5 text-[var(--warm-brown)]" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <CTAButton href="/quote" variant="primary" size="lg">
              Get a Free Quote for {service.title}
            </CTAButton>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="bg-[var(--beige)] p-7">
              <h3 className="font-heading text-lg font-semibold text-[var(--charcoal)] mb-4">
                Ready to discuss your project?
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                Tell us about your space and requirements. We&apos;ll review your
                enquiry and get back to you.
              </p>
              <CTAButton href="/quote" variant="primary" size="md" fullWidth>
                Get a Free Quote
              </CTAButton>
              <div className="mt-5 pt-5 border-t border-[var(--border)]">
                <p className="text-xs text-[var(--text-muted)]">
                  No commitment required. Free quotation service.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16 lg:mt-24 pt-12 border-t border-[var(--border)]">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[var(--charcoal)] mb-8">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <ContactCTA />
    </div>
  );
}
