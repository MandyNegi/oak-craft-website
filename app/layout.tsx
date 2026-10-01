import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { generateLocalBusinessSchema } from "@/lib/structured-data";
import { business } from "@/data/business";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oakandcraft.co.uk";
const serviceAreaString =
  business.serviceAreas.length > 0
    ? business.serviceAreas.slice(0, 3).join(", ")
    : "the UK";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Bespoke Carpentry & Joinery | ${business.name}`,
    template: `%s | ${business.name}`,
  },
  description: `Made-to-measure carpentry, bespoke furniture and joinery for homes across ${serviceAreaString}. Request a free quotation from ${business.name}.`,
  keywords: [
    "bespoke carpentry",
    "fitted wardrobes",
    "bespoke kitchens",
    "alcove units",
    "under stairs storage",
    "home office",
    "media wall",
    "joinery",
    "made to measure",
    ...business.serviceAreas,
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: business.name,
    title: `Bespoke Carpentry & Joinery | ${business.name}`,
    description: `Made-to-measure carpentry, bespoke furniture and joinery for homes across ${serviceAreaString}.`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${business.name} — Bespoke Carpentry & Joinery`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Bespoke Carpentry & Joinery | ${business.name}`,
    description: `Made-to-measure carpentry, bespoke furniture and joinery for homes across ${serviceAreaString}.`,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = generateLocalBusinessSchema();

  return (
    <html lang="en-GB" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
