// ============================================================
// Perfect Space Interior — Business Configuration
// ============================================================
// Replace placeholder values with real business information.
// Fields left as empty strings will be conditionally hidden
// throughout the website — nothing fake is displayed.
// ============================================================

import type { BusinessConfig } from "@/types";

export const business: BusinessConfig = {
  name: "Perfect Space Interior",
  tagline: "Bespoke Carpentry & Joinery",

  // TODO: Add real phone number
  phone: "",

  // TODO: Add real email address
  email: "",

  // TODO: Add real WhatsApp number (international format, e.g. 447700900000)
  // Only add if the business actively uses WhatsApp for enquiries
  whatsapp: "",

  // TODO: Add real business address (if you wish to display it)
  address: "",
  postcode: "",

  // TODO: Update to reflect the actual areas the business covers
  serviceAreas: [
    "London",
    "Surrey",
    "Hertfordshire",
    "Kent",
    "Essex",
  ],

  // TODO: Add real opening hours
  openingHours: [
    { days: "Monday – Friday", hours: "8:00am – 6:00pm" },
    { days: "Saturday", hours: "9:00am – 4:00pm" },
    { days: "Sunday", hours: "Closed" },
  ],

  socialMedia: {
    // TODO: Add real Instagram handle (without @) or leave empty
    instagram: "",
    // TODO: Add real Facebook page URL or leave empty
    facebook: "",
    // TODO: Add real Houzz profile URL or leave empty
    houzz: "",
  },
};
