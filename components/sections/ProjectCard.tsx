import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  variant?: "standard" | "tall" | "wide";
}

export function ProjectCard({ project, variant = "standard" }: ProjectCardProps) {
  const heights = {
    standard: "h-64 sm:h-72",
    tall: "h-80 sm:h-96",
    wide: "h-64 sm:h-72",
  };

  return (
    <article className="group relative overflow-hidden bg-[var(--beige)]">
      {/* Image */}
      <Link href={`/our-work/${project.slug}`} aria-label={`View project: ${project.title}`}>
        <div className={`relative overflow-hidden ${heights[variant]}`}>
          <Image
            src={project.coverImage}
            alt={project.coverImageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Overlay on hover */}
          <div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"
            aria-hidden="true"
          />
        </div>

        {/* Caption */}
        <div className="p-5">
          <p className="text-xs text-[var(--text-muted)] tracking-wide uppercase mb-1.5">
            {project.category} · {project.location}
          </p>
          <h3 className="font-heading text-lg font-semibold text-[var(--charcoal)] group-hover:text-[var(--warm-brown)] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] mt-1.5 line-clamp-2">
            {project.shortDescription}
          </p>
        </div>
      </Link>
    </article>
  );
}
