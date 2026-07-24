/**
 * Section anchors in page order — single source for Nav, Footer,
 * and section ids on the homepage. Keep in sync with app/page.tsx.
 */
export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "github", label: "GitHub" },
  { id: "achievements", label: "Achievements" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

/**
 * Condensed link set shown in the floating navbar pill on desktop — kept
 * short so the pill stays compact. Labels stay synced with `sections` (the
 * filter derives from it). The mobile menu still lists every section.
 */
const primaryNavIds: SectionId[] = [
  "about",
  "experience",
  "projects",
  "achievements",
];
export const primaryNav = sections.filter((s) => primaryNavIds.includes(s.id));

/** The single navbar CTA — the one action the pill promotes. */
export const navCta = { id: "contact", label: "Get in touch" } as const;
