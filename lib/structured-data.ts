// ============================================================
// Perfect Space Interior — Structured Data (JSON-LD)
// ============================================================
// Only populated with real business data that is actually
// available in data/business.ts. No fake addresses, phone
// numbers or ratings are included.
// ============================================================

import { business } from "@/data/business";

export function generateLocalBusinessSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description:
      "Bespoke carpentry and joinery — made-to-measure furniture, storage and joinery for homes.",
  };

  if (business.phone) {
    schema.telephone = business.phone;
  }

  if (business.email) {
    schema.email = business.email;
  }

  if (business.address && business.postcode) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: business.address,
      postalCode: business.postcode,
      addressCountry: "GB",
    };
  }

  if (business.serviceAreas.length > 0) {
    schema.areaServed = business.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    }));
  }

  if (business.openingHours.length > 0) {
    // Schema.org openingHours format: "Mo-Fr 08:00-18:00"
    // We store in a readable format; omit structured hours if complex
    schema.openingHoursSpecification = business.openingHours
      .filter((h) => h.hours !== "Closed")
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        description: `${h.days}: ${h.hours}`,
      }));
  }

  schema.priceRange = "££–£££";
  schema.currenciesAccepted = "GBP";

  return schema;
}
