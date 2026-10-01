// ============================================================
// Perfect Space Interior — FAQ Data
// ============================================================

import type { FAQ } from "@/types";
import { business } from "./business";

export const faqs: FAQ[] = [
  {
    question: "How much does bespoke carpentry cost?",
    answer:
      "The cost depends on the size of the project, the materials chosen, the design complexity and the level of installation involved. A simple alcove unit will cost considerably less than a full fitted wardrobe or bespoke kitchen. The best way to get an accurate figure is to request a free quotation — we'll discuss your requirements and provide a clear, itemised quote with no obligation.",
  },
  {
    question: "Do you provide free quotations?",
    answer:
      "Yes. We're happy to discuss your project and provide a quotation at no charge and with no obligation. Simply get in touch or complete our online enquiry form and we'll come back to you promptly.",
  },
  {
    question: "Do you visit homes to take measurements?",
    answer:
      "Where appropriate, yes. For most fitted projects we arrange a site visit to take accurate measurements and assess the space properly. This allows us to provide a more precise quotation and ensures the finished result fits perfectly. For initial enquiries, approximate dimensions or photos are a great starting point.",
  },
  {
    question: "How long does a project take from enquiry to completion?",
    answer:
      "Timescales vary depending on the complexity and size of the project. Once we have discussed your requirements and agreed on a design and quotation, we can give you a clear timeline. We'll always be upfront about our current availability and lead times.",
  },
  {
    question: "Can I provide my own design ideas?",
    answer:
      "Absolutely. Many customers come to us with sketches, inspiration images, Pinterest boards or specific measurements in mind. We work around your ideas and help refine them into a practical, buildable design. If you prefer, we can also guide the design process from scratch.",
  },
  {
    question: "What areas do you cover?",
    answer: `We currently work across ${business.serviceAreas.join(", ")}. If you're unsure whether we cover your area, please get in touch — we're happy to discuss your project.`,
  },
  {
    question: "Can you work with awkward or irregular spaces?",
    answer:
      "Yes — this is precisely where bespoke carpentry excels. Because everything is made to measure, we can design and build around sloped ceilings, chimney breasts, alcoves, staircases and any other architectural feature. No two spaces are the same, and that's exactly what we design for.",
  },
  {
    question: "What materials do you use?",
    answer:
      "We work with a range of materials depending on the project, budget and aesthetic requirements. This includes solid timber, high-quality MDF, plywood, veneers and a wide selection of finishes including painted, lacquered and wood-effect options. We're happy to discuss material choices during the design consultation.",
  },
  {
    question: "Do you handle the full project, including installation?",
    answer:
      "Yes. We handle the design, manufacture and installation of all our bespoke pieces. You don't need to coordinate separate tradespeople — we manage the project from initial consultation through to a finished, installed result.",
  },
  {
    question: "What happens if something needs adjusting after installation?",
    answer:
      "We take pride in the quality of our work and want every customer to be happy with the finished result. If there is anything that needs addressing after installation, please get in touch and we'll arrange to resolve it promptly.",
  },
];
