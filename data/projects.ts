// ============================================================
// Perfect Space Interior — Projects Data
// ============================================================
// Real completed projects appear first (no isPlaceholder flag).
// Demo/placeholder entries are kept below for reference and
// should be replaced with real photography before going live.
// ============================================================

import type { Project } from "@/types";

export const projects: Project[] = [
  // ── REAL PROJECTS ──────────────────────────────────────────
  {
    slug: "fitted-wardrobe-with-internal-storage",
    title: "Fitted Wardrobe with Internal Storage",
    category: "Wardrobes",
    location: "UK",
    coverImage: "/projects/project-1-b.jpg",
    coverImageAlt:
      "Fitted wardrobe in warm oak finish with brushed steel bar handles",
    shortDescription:
      "A full-height fitted wardrobe in a warm oak finish, with a bespoke internal layout combining hanging rail, shelving and a six-drawer chest.",
    description:
      "This fitted wardrobe was designed to make the most of an alcove space in the bedroom. The exterior is finished in a warm oak foil with slim brushed-steel bar handles, sitting flush from floor to ceiling for a clean, built-in look. Inside, the layout is fully bespoke — a hanging rail at the top, adjustable shelves in the centre, and a generous six-drawer chest below. LED strip lighting inside the carcass adds a premium finishing touch.",
    images: [
      {
        src: "/projects/project-1-b.jpg",
        alt: "Fitted wardrobe exterior in warm oak finish, floor-to-ceiling with brushed steel handles",
      },
      {
        src: "/projects/project-1-c.jpg",
        alt: "Wardrobe interior showing hanging rail, shelves and six-drawer chest with LED lighting",
      },
      {
        src: "/projects/project-1-a.jpg",
        alt: "Close-up of wardrobe interior shelving section and drawer chest from the side",
      },
    ],
  },
  {
    slug: "media-wall-with-fluted-panel-and-led-shelving",
    title: "Media Wall with Fluted Panel & LED Shelving",
    category: "Media Units",
    location: "UK",
    coverImage: "/projects/project-1-d.jpg",
    coverImageAlt:
      "Full-width bespoke media wall with fluted centre panel, large TV recess, LED-lit open shelving and lower cabinets with matte black handles",
    shortDescription:
      "A full-width media wall featuring a fluted centre panel, LED-lit open shelving and lower storage cabinets — all finished in a soft warm grey.",
    description:
      "A standout feature wall for a living room, designed and built to run the full width of the room. The centrepiece is a fluted vertical panel behind the TV recess, adding texture and depth without overwhelming the space. Open shelving either side is fitted with warm LED strip lighting, creating an elegant ambient glow. Lower cabinets with matte black bar handles provide generous hidden storage. The whole unit is finished in a soft warm grey, complementing the existing décor perfectly.",
    images: [
      {
        src: "/projects/project-1-d.jpg",
        alt: "Full-width media wall with fluted panel, LED shelving and lower cabinets in warm grey",
      },
    ],
  },

  // ── DEMO / PLACEHOLDER PROJECTS ────────────────────────────
  // Replace these with real photography and project details.
  {
    slug: "bespoke-walk-in-wardrobe-london",
    title: "Bespoke Walk-In Wardrobe",
    category: "Wardrobes",
    location: "London",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    coverImageAlt:
      "Spacious bespoke walk-in wardrobe with fitted shelving and hanging rail",
    shortDescription:
      "A full walk-in wardrobe fitted into a spare bedroom, making the most of every wall.",
    description:
      "This project transformed an underused spare bedroom into a beautifully organised walk-in wardrobe. Full-height units line three walls, with a combination of hanging space, shelving and drawers. Integrated LED lighting makes the space practical as well as impressive.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
        alt: "Walk-in wardrobe overview showing fitted units on three walls",
      },
      {
        src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
        alt: "Detail of wardrobe hanging rail and shelving section",
      },
    ],
    isPlaceholder: true,
  },
  {
    slug: "oak-media-wall-surrey",
    title: "Oak Media Wall",
    category: "Media Units",
    location: "Surrey",
    coverImage:
      "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=1200&q=80",
    coverImageAlt: "Full-width oak media wall with integrated TV recess and surrounding cabinetry",
    shortDescription:
      "A full-width media wall in natural oak veneer with integrated storage and ambient lighting.",
    description:
      "A full-width media wall running the length of the living room. Built in a natural oak veneer with a central TV recess, flanking cabinets for storage, and ambient LED strips integrated into the shelving. Cable management was built in from the start, keeping everything clean and minimal.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=1200&q=80",
        alt: "Full media wall with TV mounted in central recess",
      },
    ],
    isPlaceholder: true,
  },
  {
    slug: "under-stairs-storage-hertfordshire",
    title: "Under-Stairs Storage",
    category: "Storage",
    location: "Hertfordshire",
    coverImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    coverImageAlt:
      "Bespoke under-stairs storage with fitted cupboards built around staircase angles",
    shortDescription:
      "A fully fitted under-stairs cupboard with pull-out drawers and integrated shelving.",
    description:
      "The space beneath this staircase was previously unused. We fitted a combination of pull-out drawers and cupboard storage that follows the exact angles of the staircase above. The result is a neat, practical space that adds real storage to a family home.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        alt: "Under-stairs storage unit with open doors showing internal drawers",
      },
    ],
    isPlaceholder: true,
  },
  {
    slug: "fitted-home-office-kent",
    title: "Fitted Home Office",
    category: "Home Offices",
    location: "Kent",
    coverImage:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80",
    coverImageAlt: "Fitted home office with built-in desk and full-height shelving units",
    shortDescription:
      "A spare bedroom converted into a proper fitted office with a desk, shelving and storage.",
    description:
      "A spare bedroom transformed into a purpose-built home office. A full-width fitted desk runs across one wall, with floor-to-ceiling shelving on either side. A cupboard section provides storage for files and equipment. The whole unit is painted in a deep charcoal to create a focused working environment.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80",
        alt: "Fitted home office overview with desk and surrounding shelving",
      },
    ],
    isPlaceholder: true,
  },
  {
    slug: "alcove-shelving-essex",
    title: "Alcove Shelving & Cupboards",
    category: "Storage",
    location: "Essex",
    coverImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    coverImageAlt:
      "Built-in alcove shelving with open shelves above and cupboards below either side of a chimney breast",
    shortDescription:
      "Classic alcove units with open shelving above and cupboards below, fitted either side of a chimney breast.",
    description:
      "One of our most common projects — and one that makes an enormous difference to a living room. Fitted alcove units either side of a chimney breast, with open shelving above for display and cupboards below for hidden storage. Painted in a warm white to complement the existing décor.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
        alt: "Alcove units with open shelving above and painted cupboards below",
      },
    ],
    isPlaceholder: true,
  },
  {
    slug: "shaker-kitchen-london",
    title: "Shaker Kitchen Refit",
    category: "Kitchens",
    location: "London",
    coverImage:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    coverImageAlt:
      "Bespoke shaker-style kitchen in sage green with stone worktop and brass hardware",
    shortDescription:
      "A complete kitchen refit in a classic shaker style with sage green cabinetry and brass hardware.",
    description:
      "A complete kitchen design and installation project in a Victorian terraced house. The brief was classic shaker style with modern proportions — sage green cabinetry, stone effect worktops and warm brass hardware. We designed the layout to maximise storage whilst keeping the space feeling open and light.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
        alt: "Sage green shaker kitchen with stone worktop and brass hardware",
      },
    ],
    isPlaceholder: true,
  },
];
