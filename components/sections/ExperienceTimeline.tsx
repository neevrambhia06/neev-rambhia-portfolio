"use client";

import { useRef } from "react";
import { Card } from "@/components/ui/Card";
import { experience } from "@/content/experience";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * ExperienceTimeline — vertical connected timeline with GSAP scroll-scrub.
 *
 * Structure:
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  Central vertical rail (.timeline-rail)                 │
 *   │    ├ drawn line (.timeline-line) — scaleY scrubbed 0→1  │
 *   │    ├ node ● (.timeline-node)                            │
 *   │    ├ card  (.timeline-card) — alternates left/right     │
 *   │    ├ node ●                                             │
 *   │    └ card                                               │
 *   └──────────────────────────────────────────────────────────┘
 *
 * Desktop: alternating left/right cards via CSS grid columns.
 * Mobile:  collapses to single-column with rail on the left edge.
 *
 * GSAP (scroll-linked choreography per lib/gsap.ts convention):
 *  - The connecting line scrubs its scaleY from 0→1 as you scroll through
 *    the section — smooth and continuous, not stepped.
 *  - Each card + node fades/slides in when it enters the viewport (once).
 *  - All motion gated behind matchMedia(prefers-reduced-motion).
 */
export function ExperienceTimeline() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── Progressive line draw via scroll scrub ── */
        gsap.fromTo(
          ".timeline-line",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "power2.out",
            duration: 0.8,
            scrollTrigger: {
              trigger: root.current,
              start: "top 70%",
              once: true,
            },
          }
        );

        /* ── Reveal each entry (node + card) as it enters ── */
        const entries = gsap.utils.toArray<HTMLElement>(".timeline-entry");
        entries.forEach((entry, i) => {
          const card = entry.querySelector(".timeline-card");
          const node = entry.querySelector(".timeline-node");
          const isLeft = i % 2 === 0;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: entry,
              start: "top 82%",
              once: true,
            },
          });

          /* Node pops in */
          if (node) {
            tl.from(node, {
              scale: 0,
              opacity: 0,
              duration: 0.4,
              ease: "back.out(2)",
            });
          }

          /* Card slides in from the side it's placed on */
          if (card) {
            tl.from(
              card,
              {
                opacity: 0,
                x: isLeft ? -32 : 32,
                duration: 0.5,
                ease: "power2.out",
              },
              "-=0.2"
            );
          }
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      id="experience"
      ref={root}
      aria-labelledby="experience-heading"
      className="bg-bg py-24 sm:py-32 border-t border-border/40 relative"
    >
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        {/* ── Eyebrow + heading ── */}
        <p className="text-label text-accent mb-4 font-semibold uppercase tracking-eyebrow">
          Experience
        </p>
        <h2
          id="experience-heading"
          className="text-h2 font-heading text-text-primary"
        >
          Where I&rsquo;ve contributed
        </h2>

        {/* ── Timeline ── */}
        <ol
          className="timeline-rail relative mt-14"
          aria-label="Experience timeline"
        >
          {/* Connecting line — anchored top-to-bottom of the rail.
              transform-origin is top so scaleY(0→1) draws downward. */}
          <li aria-hidden="true" className="pointer-events-none">
            {/* Mobile: left-aligned line | Desktop: center-aligned line */}
            <div className="timeline-line bg-border-strong absolute top-0 left-[11px] h-full w-[2px] origin-top lg:left-1/2 lg:-translate-x-1/2" />
          </li>

          {experience.map((entry, i) => {
            const isLeft = i % 2 === 0;
            return (
              <li
                key={`${entry.role}-${entry.organization}`}
                className={`timeline-entry relative grid gap-x-8 pb-14 last:pb-0 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10 ${
                  isLeft
                    ? "lg:[&>.timeline-card]:col-start-1 lg:[&>.timeline-node-col]:col-start-2 lg:[&>.timeline-spacer]:col-start-3"
                    : "lg:[&>.timeline-spacer]:col-start-1 lg:[&>.timeline-node-col]:col-start-2 lg:[&>.timeline-card]:col-start-3"
                }`}
              >
                {/* ── Node column (the dot on the rail) ── */}
                <div className="timeline-node-col absolute left-0 top-1 z-10 flex items-center justify-center lg:static lg:row-start-1">
                  <span
                    className="timeline-node bg-accent block h-[24px] w-[24px] rounded-full border-[4px] border-white shadow-card"
                    aria-hidden="true"
                  />
                </div>

                {/* ── Card ── */}
                <div className="timeline-card pl-10 lg:row-start-1 lg:pl-0">
                  <Card className="relative">
                    <article>
                      <h3 className="text-h3 font-heading text-text-primary">
                        {entry.role}{" "}
                        <span className="text-text-muted font-normal">
                          — {entry.organization}
                        </span>
                      </h3>
                      {entry.period && (
                        <p className="text-caption text-text-muted mt-1 font-mono">
                          {entry.period}
                        </p>
                      )}
                      {entry.summary && (
                        <p className="text-body text-text-secondary mt-3">
                          {entry.summary}
                        </p>
                      )}
                      {entry.highlights && (
                        <ul className="mt-4 space-y-2">
                          {entry.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="text-body text-text-secondary flex items-start gap-2"
                            >
                              <span
                                className="bg-accent mt-[9px] block h-[5px] w-[5px] shrink-0 rounded-full"
                                aria-hidden="true"
                              />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </Card>
                </div>

                {/* ── Spacer (opposite side on desktop, hidden on mobile) ── */}
                <div
                  className="timeline-spacer hidden lg:block lg:row-start-1"
                  aria-hidden="true"
                />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
