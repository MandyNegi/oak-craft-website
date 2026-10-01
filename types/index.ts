// ============================================================
// Oak & Craft — Shared TypeScript Types
// ============================================================

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  imageAlt: string;
  icon: string; // SVG path or emoji placeholder
  features: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  coverImage: string;
  coverImageAlt: string;
  images: ProjectImage[];
  description: string;
  shortDescription: string;
  /** Clearly marked: demo/placeholder content only */
  isPlaceholder: boolean;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export type ProjectCategory =
  | "Wardrobes"
  | "Kitchens"
  | "Storage"
  | "Media Units"
  | "Home Offices"
  | "Furniture"
  | "Other";

export interface Testimonial {
  quote: string;
  customerName: string;
  projectType: string;
  location: string;
  /** Clearly marked: placeholder/demo testimonial */
  isPlaceholder: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  /** Leave empty until real details are available */
  phone: string;
  /** Leave empty until real details are available */
  email: string;
  /** Leave empty until real WhatsApp number is confirmed */
  whatsapp: string;
  /** Leave empty until real address is available */
  address: string;
  postcode: string;
  serviceAreas: string[];
  openingHours: OpeningHours[];
  socialMedia: SocialMedia;
}

export interface OpeningHours {
  days: string;
  hours: string;
}

export interface SocialMedia {
  /** Leave empty if no account exists */
  instagram: string;
  facebook: string;
  houzz: string;
}

export interface QuoteFormData {
  // Step 1
  services: string[];
  // Step 2
  postcode: string;
  propertyType: string;
  projectStatus: string;
  width: string;
  height: string;
  depth: string;
  // Step 3
  budget: string;
  images: File[];
  // Step 4
  fullName: string;
  email: string;
  phone: string;
  contactMethod: string;
  additionalInfo: string;
  consent: boolean;
}
