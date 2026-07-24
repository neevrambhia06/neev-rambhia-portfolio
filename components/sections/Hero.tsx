"use client";

import Link from "next/link";
import { useRef } from "react";
import { profile } from "@/content/profile";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Hero — first impression of the site.
 *
 * Signature element: the hand-rolled "aurora" (soft drifting cobalt/azure
 * blobs) defined in globals.css. One ambient effect only, kept restrained so
 * the headline stays the focus.
 *
 * Entrance: GSAP timeline staggers the aurora fade-in then headline → role →
 * tagline → CTAs — exactly the choreographed sequence GSAP is reserved for
 * (see the division of labor in lib/gsap.ts). Gated behind matchMedia so
 * visitors who prefer reduced motion get the final, static layout with no
 * flash (useGSAP runs in a layout effect, before paint).
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out", duration: 0.8 },
        });
        tl.from(".hero-aurora", {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        }).from(
          ".hero-reveal",
          { opacity: 0, y: 24, stagger: 0.12 },
          "-=0.9"
        );
      });
    },
    { scope: root }
  );

  return (
    <section
      id="hero"
      ref={root}
      aria-label="Introduction"
      className="bg-bg relative isolate flex min-h-svh items-center overflow-hidden"
    >
      <div className="hero-aurora" aria-hidden="true">
        <span className="hero-blob hero-blob--1" />
        <span className="hero-blob hero-blob--2" />
        <span className="hero-blob hero-blob--3" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 pt-28 pb-20 sm:px-8 lg:pt-32">
        <h1 className="hero-reveal text-display font-heading text-text-primary max-w-4xl">
          {profile.name}
        </h1>

        <p className="hero-reveal text-text-primary mt-4 text-body-lg font-medium sm:mt-5">
          {profile.role}
        </p>

        <p className="hero-reveal text-text-secondary mt-4 max-w-2xl text-body-lg">
          {profile.tagline}
        </p>

        {/* Two CTAs, deliberately weighted: solid slate primary draws the eye
            to the work; quieter outline secondary offers contact without
            competing (primary/secondary composition per cta.gallery). */}
        <div className="hero-reveal mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
          <Link
            href="#projects"
            className="bg-primary hover:bg-primary-hover text-label group inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            View Featured Projects
            <span
              aria-hidden="true"
              className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
          <Link
            href="#contact"
            className="border-border-strong bg-bg-elevated/70 text-text-primary hover:bg-surface text-label inline-flex items-center justify-center rounded-full border px-6 py-3 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
