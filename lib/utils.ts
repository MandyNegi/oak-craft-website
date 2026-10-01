// ============================================================
// Perfect Space Interior — Utility Functions
// ============================================================

/** Format a phone number for tel: links (strips spaces, dashes, brackets) */
export function formatTelLink(phone: string): string {
  return phone.replace(/[\s\-()]/g, "");
}

/** Format a WhatsApp number for wa.me links (must be international, digits only) */
export function formatWhatsAppLink(number: string): string {
  return `https://wa.me/${number.replace(/[^\d]/g, "")}`;
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Join class names, filtering out falsy values */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Convert a slug to a readable title */
export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
