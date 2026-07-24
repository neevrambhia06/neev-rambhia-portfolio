export type Experience = {
  role: string;
  organization: string;
  period: string;
  summary?: string;
  highlights?: string[];
};

/**
 * Entries in display order (top-of-timeline → bottom).
 */
export const experience: Experience[] = [
  {
    role: "Technical Training Program Intern",
    organization: "Senkusha",
    period: "2024",
    summary:
      "Engineered extraction and integration logic for an expense-tracking pipeline processing Gmail receipts.",
    highlights: [
      "Engineered extraction/integration logic for Swiggy Instamart within a team-built expense-tracking pipeline, parsing 7–8 structured fields from Gmail receipts with 100% accuracy",
      "Collaborated to extend the pipeline across Swiggy Food, Zomato, and Instamart covering 3 months of receipt data",
      "Co-built Power BI dashboard visualizations segmenting spend by platform and category",
    ],
  },
  {
    role: "Product Developer",
    organization: "Voltpark",
    period: "", // TODO: add dates
    summary:
      "Owned product experience and UI for an EV charging booking platform built on React, Supabase, Tailwind CSS, and Razorpay.",
    highlights: [
      "Designed the product experience and UI",
      "Architected database schema via Supabase supporting 100 concurrent users across 5 role-based access tiers and 7 relational tables",
      "Implemented authentication and authorization using Supabase Row-Level Security across 5 user roles",
      "Integrated Razorpay payments and barcode confirmation, cutting booking confirmation time to 15–20 seconds",
      "Implemented location-based slot discovery via geolocation search, reducing manual filter steps to a single query",
      "Focused on responsive design and UX",
    ],
  },
  {
    role: "Virtual Internship Participant",
    organization: "Deloitte Australia (via Forage)",
    period: "",
    summary:
      "Designed a data visualization dashboard proposal for a simulated client engagement.",
    highlights: [
      "Designed a data visualization dashboard proposal translating actionable metrics for stakeholder decision-making",
      "Delivered a client-ready technical proposal meeting Deloitte consulting delivery standards",
    ],
  },
];
