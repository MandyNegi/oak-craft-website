import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { CTAButton } from "@/components/ui/CTAButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative h-80 lg:h-[560px]">
        <Image
          src={project.coverImage}
          alt={project.coverImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center gap-2 text-xs text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/our-work" className="hover:text-white transition-colors">Our Work</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90">{project.title}</li>
            </ol>
          </nav>
          <p className="text-white/60 text-xs uppercase tracking-widest mb-2">
            {project.category} · {project.location}
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {project.isPlaceholder && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 text-sm text-amber-800">
            <strong>Note:</strong> This is a placeholder / demo project used for illustration purposes only.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Description */}
          <div className="lg:col-span-2">
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project meta */}
          <aside>
            <div className="bg-[var(--beige)] p-7">
              <h2 className="font-heading text-lg font-semibold text-[var(--charcoal)] mb-5">
                Project Details
              </h2>
              <dl className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <dt className="text-[var(--text-muted)]">Type</dt>
                  <dd className="font-medium text-[var(--charcoal)]">{project.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--text-muted)]">Location</dt>
                  <dd className="font-medium text-[var(--charcoal)]">{project.location}</dd>
                </div>
              </dl>
              <div className="border-t border-[var(--border)] pt-5">
                <p className="text-sm font-medium text-[var(--charcoal)] mb-3">
                  Have a similar project?
                </p>
                <CTAButton href="/quote" variant="primary" size="md" fullWidth>
                  Get a Free Quote
                </CTAButton>
              </div>
            </div>
          </aside>
        </div>

        {/* Image gallery */}
        {project.images.length > 1 && (
          <div className="mt-14">
            <h2 className="font-heading text-xl font-semibold text-[var(--charcoal)] mb-6">
              Project Images
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.images.map((img, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 pt-10 border-t border-[var(--border)] text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[var(--charcoal)] mb-4">
            Have a Similar Project?
          </h2>
          <p className="text-[var(--text-muted)] mb-6 max-w-md mx-auto text-sm">
            Get in touch to discuss your requirements and request a free
            quotation.
          </p>
          <CTAButton href="/quote" variant="secondary" size="lg">
            Get a Free Quote
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
