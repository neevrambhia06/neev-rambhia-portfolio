import { profile } from './profile';

export type TechCategory = {
  label: string;
  items: string[];
};

/**
 * Derived from profile.ts so skill data stays single-sourced.
 * Labels refined per Phase 5 content update.
 */
export const techstack: TechCategory[] = [
  { label: 'Languages & OOP', items: profile.skills.languages },
  { label: 'Frameworks & Libraries', items: profile.skills.frameworks },
  { label: 'Databases', items: profile.skills.databases },
  { label: 'Hardware & IoT', items: profile.skills.hardware },
  { label: 'Tools', items: profile.skills.tools },
];
