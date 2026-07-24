import { cn } from "@/lib/utils";

type DoodleSelfPortraitProps = {
  className?: string;
};

/**
 * DoodleSelfPortrait — a hand-drawn-style bust that stands in for Neev.
 *
 * opendoodles.com aesthetic: loose, confident single-weight linework with
 * rounded caps, flat accent-color fills, deliberately informal. NOT a photo,
 * NOT a realistic avatar — an abstract friendly figure.
 *
 * Fully themeable: strokes use `currentColor` (set via a text-* class at the
 * call site) and flat fills reference the design tokens directly, so the
 * illustration recolors with the palette. Drawn inline so it stays a few KB
 * and needs no network fetch.
 *
 * The `.doodle-float` idle animation (globals.css) is applied by the call
 * site on this element; the GSAP scroll reveal animates a separate wrapper so
 * the two transforms never fight.
 */
export function DoodleSelfPortrait({ className }: DoodleSelfPortraitProps) {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 3.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  return (
    <svg
      viewBox="0 0 220 240"
      role="img"
      aria-label="Doodle self-portrait of Neev Rambhia"
      className={cn("text-text-primary", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shirt / shoulders — flat pale-azure fill, ink outline */}
      <path
        d="M92 162 C68 167 44 180 38 212 L38 240 L182 240 L182 212 C176 180 152 167 128 162 C122 176 98 176 92 162 Z"
        style={{ fill: "var(--accent-subtle)" }}
        {...stroke}
      />
      {/* Collar */}
      <path d="M101 166 l9 12 l9 -12" {...stroke} />

      {/* Neck */}
      <path d="M95 146 l-3 18" {...stroke} />
      <path d="M125 146 l3 18" {...stroke} />

      {/* Head — white fill so it reads cleanly over the shirt */}
      <path
        d="M110 40 C140 40 163 62 163 92 C163 122 140 148 110 148 C80 148 57 122 57 92 C57 62 80 40 110 40 Z"
        style={{ fill: "var(--bg-elevated)" }}
        {...stroke}
      />

      {/* Hair — loose arc plus a few tousled flicks */}
      <path
        d="M60 88 C54 50 90 26 111 27 C134 28 166 48 160 90"
        {...stroke}
      />
      <path d="M82 32 l-5 -13" {...stroke} />
      <path d="M111 27 l0 -14" {...stroke} />
      <path d="M140 34 l6 -13" {...stroke} />

      {/* Brows */}
      <path d="M84 76 q9 -6 18 0" {...stroke} />
      <path d="M118 76 q9 -6 18 0" {...stroke} />

      {/* Blush — subtle flat accent-subtle */}
      <ellipse cx="82" cy="106" rx="8" ry="5" style={{ fill: "var(--accent-subtle)" }} />
      <ellipse cx="138" cy="106" rx="8" ry="5" style={{ fill: "var(--accent-subtle)" }} />

      {/* Eyes */}
      <circle cx="93" cy="90" r="3.6" style={{ fill: "currentColor" }} />
      <circle cx="127" cy="90" r="3.6" style={{ fill: "currentColor" }} />

      {/* Smile */}
      <path d="M93 114 q17 15 34 0" {...stroke} />

      {/* Sparkles — flat cobalt accent, a small "AI" nod */}
      <path
        d="M182 33 C183 40 186 43 193 44 C186 45 183 48 182 55 C181 48 178 45 171 44 C178 43 181 40 182 33 Z"
        style={{ fill: "var(--accent)" }}
      />
      <path
        d="M199 60 C199.6 63 201 64.4 204 65 C201 65.6 199.6 67 199 70 C198.4 67 197 65.6 194 65 C197 64.4 198.4 63 199 60 Z"
        style={{ fill: "var(--accent)" }}
      />
    </svg>
  );
}
