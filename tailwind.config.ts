import type { Config } from "tailwindcss";

/**
 * Tailwind v4 config — extends the CSS-first setup in app/globals.css.
 *
 * Design tokens live as CSS variables in globals.css (:root).
 * Mapping them here compiles utilities like `bg-bg`, `bg-bg-elevated`,
 * `text-text-primary`, `border-border-strong`, `bg-accent-subtle` against
 * the variables, so palette changes touch globals.css only.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "var(--bg)",
          elevated: "var(--bg-elevated)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          hover: "var(--surface-hover)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          subtle: "var(--accent-subtle)",
        },
        success: "var(--success)",
        error: "var(--error)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      /*
       * Type scale — compiles `text-display`, `text-h1` … against the
       * CSS variables in globals.css (single source of truth). Each
       * utility sets size + line-height (+ tracking where defined), so
       * `text-h2 font-heading` is a complete heading style.
       */
      fontSize: {
        display: [
          "var(--text-display)",
          {
            lineHeight: "var(--leading-display)",
            letterSpacing: "var(--tracking-display)",
          },
        ],
        h1: [
          "var(--text-h1)",
          {
            lineHeight: "var(--leading-h1)",
            letterSpacing: "var(--tracking-h1)",
          },
        ],
        h2: [
          "var(--text-h2)",
          {
            lineHeight: "var(--leading-h2)",
            letterSpacing: "var(--tracking-h2)",
          },
        ],
        h3: [
          "var(--text-h3)",
          {
            lineHeight: "var(--leading-h3)",
            letterSpacing: "var(--tracking-h3)",
          },
        ],
        "body-lg": [
          "var(--text-body-lg)",
          { lineHeight: "var(--leading-body-lg)" },
        ],
        body: ["var(--text-body)", { lineHeight: "var(--leading-body)" }],
        caption: [
          "var(--text-caption)",
          { lineHeight: "var(--leading-caption)" },
        ],
        label: [
          "var(--text-label)",
          {
            lineHeight: "var(--leading-label)",
            letterSpacing: "var(--tracking-label)",
          },
        ],
      },
      letterSpacing: {
        eyebrow: "var(--tracking-eyebrow)",
      },
    },
  },
};

export default config;
