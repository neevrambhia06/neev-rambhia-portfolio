import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false },
};

/**
 * Internal swatch reference for the light-theme design system.
 * Not linked from navigation — visit /design directly.
 */
const tokenGroups: {
  group: string;
  tokens: { name: string; hex: string; usage: string; darkText?: boolean }[];
}[] = [
  {
    group: "Backgrounds",
    tokens: [
      {
        name: "--bg",
        hex: "#FAFBFC",
        usage: "Page background — cool porcelain",
        darkText: true,
      },
      {
        name: "--bg-elevated",
        hex: "#FFFFFF",
        usage: "Cards, nav, inputs — lifts off --bg",
        darkText: true,
      },
      {
        name: "--surface",
        hex: "#F2F4F7",
        usage: "Recessed zones: footer, wells, placeholders",
        darkText: true,
      },
      {
        name: "--surface-hover",
        hex: "#E9EDF2",
        usage: "Hover for surface-toned interactive rows",
        darkText: true,
      },
    ],
  },
  {
    group: "Text",
    tokens: [
      {
        name: "--text-primary",
        hex: "#0F172A",
        usage: "Headings, body — 16.2:1 AAA",
      },
      {
        name: "--text-secondary",
        hex: "#475569",
        usage: "Supporting copy, labels — 7.6:1 AAA",
      },
      {
        name: "--text-muted",
        hex: "#64748B",
        usage: "Captions, placeholders — 4.8:1 AA",
      },
    ],
  },
  {
    group: "Borders",
    tokens: [
      {
        name: "--border",
        hex: "#E5E9F0",
        usage: "Hairline default separation",
        darkText: true,
      },
      {
        name: "--border-strong",
        hex: "#CBD5E1",
        usage: "Input borders, emphasized dividers",
        darkText: true,
      },
    ],
  },
  {
    group: "Action",
    tokens: [
      {
        name: "--primary",
        hex: "#0F172A",
        usage: "Primary buttons — slate ink",
      },
      {
        name: "--primary-hover",
        hex: "#1E293B",
        usage: "Primary button hover",
      },
      {
        name: "--accent",
        hex: "#2557D6",
        usage: "Links, active states, key CTAs only — 5.9:1 AA",
      },
      {
        name: "--accent-hover",
        hex: "#1D46B0",
        usage: "Link / CTA hover",
      },
      {
        name: "--accent-subtle",
        hex: "#EAF0FD",
        usage: "Selection, active-nav pill, chips — never text",
        darkText: true,
      },
    ],
  },
  {
    group: "Feedback",
    tokens: [
      { name: "--success", hex: "#15803D", usage: "Form success — 5.0:1 AA" },
      { name: "--error", hex: "#B91C1C", usage: "Form errors — 5.9:1 AA" },
    ],
  },
];

export default function DesignPage() {
  return (
    <main className="bg-bg text-text-primary">
      <h1>Design System — Light Theme</h1>
      <p className="text-text-secondary">
        Cool Porcelain / Slate / Cobalt. Token reference — hex values and
        intended usage. Source of truth: <code>app/globals.css</code>.
      </p>

      {tokenGroups.map((group) => (
        <section key={group.group}>
          <h2>{group.group}</h2>
          <ul>
            {group.tokens.map((token) => (
              <li key={token.name}>
                <div
                  className="border-border shadow-card border"
                  style={{
                    background: token.hex,
                    color: token.darkText ? "#0F172A" : "#FFFFFF",
                    padding: "1rem",
                  }}
                >
                  <code>{token.name}</code> <code>{token.hex}</code>
                </div>
                <p className="text-text-secondary">{token.usage}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
