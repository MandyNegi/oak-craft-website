"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import type { ProjectCategory } from "@/types";

const CATEGORIES: Array<{ label: string; value: ProjectCategory | "All" }> = [
  { label: "All", value: "All" },
  { label: "Wardrobes", value: "Wardrobes" },
  { label: "Kitchens", value: "Kitchens" },
  { label: "Storage", value: "Storage" },
  { label: "Media Units", value: "Media Units" },
  { label: "Home Offices", value: "Home Offices" },
  { label: "Furniture", value: "Furniture" },
  { label: "Other", value: "Other" },
];

interface ProjectGalleryProps {
  limit?: number;
  showFilters?: boolean;
  showHeader?: boolean;
}

export function ProjectGallery({
  limit,
  showFilters = true,
  showHeader = true,
}: ProjectGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">(
    "All"
  );

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  // Masonry-like layout: alternate tall/standard cards
  const getVariant = (i: number): "standard" | "tall" => {
    const pattern = [0, 2, 4]; // these indices are tall
    return pattern.includes(i % 6) ? "tall" : "standard";
  };

  return (
    <section
      id="our-work"
      aria-labelledby="work-heading"
      className="py-20 lg:py-28 bg-[var(--ivory-dark)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <AnimateOnScroll className="mb-10 max-w-2xl">
            <p className="text-xs tracking-[0.15em] uppercase font-medium text-[var(--warm-brown)] mb-3">
              Portfolio
            </p>
            <h2
              id="work-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--charcoal)] mb-4"
            >
              Our Recent Work
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              A selection of spaces we&apos;ve helped transform.
            </p>
          </AnimateOnScroll>
        )}

        {/* Filter tabs */}
        {showFilters && (
          <div
            className="flex flex-wrap gap-2 mb-10"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {CATEGORIES.map((cat) => {
              const count =
                cat.value === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === cat.value).length;
              if (count === 0 && cat.value !== "All") return null;
              return (
                <button
                  key={cat.value}
                  role="tab"
                  aria-selected={activeCategory === cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.value
                      ? "bg-[var(--charcoal)] text-[var(--ivory)]"
                      : "bg-white text-[var(--charcoal)] hover:bg-[var(--beige)]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Grid */}
        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayed.map((project, i) => (
              <AnimateOnScroll key={project.slug} delay={i * 60} animation="fade-up">
                <ProjectCard project={project} variant={getVariant(i)} />
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <p className="text-[var(--text-muted)] text-center py-16">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
