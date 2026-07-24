/**
 * Font loaders — Phase 3 pairing (replaces Phase 0 placeholders).
 *
 * Heading: Bricolage Grotesque — characterful grotesk; optical-size axis
 *          gives display sizes extra personality without a second font.
 * Body:    Figtree — clean humanist sans, cool-neutral against the slate
 *          palette, highly legible at 16px.
 * Mono:    JetBrains Mono — code snippets, tech-stack chips, timestamps.
 *
 * The exported `--font-heading` / `--font-body` / `--font-mono` variable
 * names are the stable contract — globals.css and tailwind.config.ts
 * (font-heading / font-body / font-mono utilities) reference them, so a
 * future swap touches this file only.
 */
import {
  Bricolage_Grotesque,
  Figtree,
  JetBrains_Mono,
} from "next/font/google";

export const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  // Load the optical-size + width axes of the variable font so display
  // sizes render with the wider, higher-contrast cut. Axis tags are the
  // 4-letter Google Fonts tokens (wdth, not "width") — next/font validates
  // these against its font table and throws at build time on a bad tag.
  axes: ["opsz", "wdth"],
});

export const fontBody = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
