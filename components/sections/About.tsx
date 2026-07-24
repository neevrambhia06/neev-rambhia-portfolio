"use client";

import { useRef } from "react";
import { profile } from "@/content/profile";
import { gsap, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/Badge";
import { TextLink } from "@/components/ui/TextLink";
import { DoodleSelfPortrait } from "@/components/ui/DoodleSelfPortrait";

/**
 * About — bio, education, interests, leadership nod.
 *
 * Layout: asymmetric two-column on desktop (content-heavy left, doodle + at-a-
 * glance right); stacks on mobile. The short bold `aboutHeadline` leads,
 * followed by structured bio paragraphs, then supporting blocks (education,
 * interests, leadership).
 *
 * Scroll entrance: GSAP ScrollTrigger staggers child elements in, matching the
 * Hero's `power3.out / 0.8s` timing + `0.12s` stagger. The doodle wrapper
 * fades+scales separately so its idle `.doodle-float` CSS animation starts
 * only after the reveal (GSAP sets it to `paused` initially by toggling a
 * class). Motion-respecting via matchMedia.
 */
export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── Left column: staggered text reveals ── */
        gsap.from(".about-reveal", {
          opacity: 0,
          y: 28,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            once: true,
          },
        });

        /* ── Right column: doodle fades + scales in ── */
        gsap.from(".about-doodle-reveal", {
          opacity: 0,
          scale: 0.92,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            once: true,
          },
          onComplete: () => {
            /* Start the idle float only after the entrance finishes */
            const el = root.current?.querySelector(".doodle-float");
            if (el) (el as HTMLElement).style.animationPlayState = "running";
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      id="about"
      ref={root}
      aria-labelledby="about-heading"
      className="bg-bg py-24 sm:py-32 border-t border-border/40 relative"
    >
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        {/* ── Eyebrow ── */}
        <p className="about-reveal text-label text-accent mb-4 font-semibold uppercase tracking-eyebrow">
          About
        </p>

        {/* ── Two-column grid ── */}
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* ─── Left: content column ─── */}
          <div>
            {/* Headline */}
            <h2
              id="about-heading"
              className="about-reveal text-h2 font-heading text-text-primary"
            >
              {profile.aboutHeadline}
            </h2>

            {/* Bio paragraphs */}
            <div className="mt-6 space-y-3">
              {profile.bio.map((paragraph) => (
                <p
                  key={paragraph}
                  className="about-reveal text-body-lg text-text-secondary max-w-2xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* ── Education ── */}
            <div className="mt-10">
              <h3 className="about-reveal text-h3 font-heading text-text-primary">
                Education
              </h3>
              <div className="mt-4 space-y-4">
                {profile.education.map((entry) => (
                  <div
                    key={entry.degree}
                    className="about-reveal border-border rounded-xl border p-4"
                  >
                    <p className="text-label font-semibold text-text-primary">
                      {entry.degree}
                      {entry.current && (
                        <span className="bg-accent-subtle text-accent ml-2 inline-block rounded-full px-2 py-0.5 text-caption font-medium">
                          Current
                        </span>
                      )}
                    </p>
                    <p className="text-body text-text-secondary mt-1">
                      {entry.institution}
                      {entry.affiliation ? ` — ${entry.affiliation}` : null}
                    </p>
                    <p className="text-caption text-text-muted mt-0.5">
                      {entry.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Core Interests ── */}
            <div className="mt-10">
              <h3 className="about-reveal text-h3 font-heading text-text-primary">
                Core Interests
              </h3>
              <div className="about-reveal mt-4 flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <Badge
                    key={interest}
                    className="text-label rounded-full px-3 py-1"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* ── Leadership nod ── */}
            <div className="mt-10">
              <h3 className="about-reveal text-h3 font-heading text-text-primary">
                Leadership
              </h3>
              <p className="about-reveal text-body text-text-secondary mt-3 max-w-2xl">
                {profile.leadershipNote}{" "}
                <TextLink href="#experience">
                  See the full timeline →
                </TextLink>
              </p>
            </div>
          </div>

          {/* ─── Right: doodle column ─── */}
          <div className="about-doodle-reveal flex items-start justify-center lg:pt-8">
            <div
              className="doodle-float"
              style={{ animationPlayState: "paused" }}
            >
              <DoodleSelfPortrait className="h-48 w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
