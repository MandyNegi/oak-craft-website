"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  external?: boolean;
}

export function CTAButton({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
  className,
  type = "button",
  disabled,
  fullWidth,
  external,
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[var(--charcoal)] text-[var(--ivory)] hover:bg-[var(--charcoal-light)] focus-visible:ring-[var(--charcoal)]",
    secondary:
      "bg-[var(--oak)] text-white hover:bg-[var(--warm-brown)] focus-visible:ring-[var(--oak)]",
    ghost:
      "bg-transparent text-[var(--charcoal)] hover:bg-[var(--beige)] focus-visible:ring-[var(--charcoal)]",
    outline:
      "border border-[var(--charcoal)] text-[var(--charcoal)] bg-transparent hover:bg-[var(--charcoal)] hover:text-[var(--ivory)] focus-visible:ring-[var(--charcoal)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
