"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/content/profile";
import { navCta, primaryNav, sections } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Floating glass navbar — persists across the whole site via (site)/layout.
 *
 * - Fixed, inset from the top so it *hovers* over content (never docks flush).
 * - Uses the `.glass` utility (translucent white + backdrop blur + hairline
 *   border + soft shadow) so scrolled content shows through, blurred.
 * - Rounded pill; compact: name mark, condensed links (primaryNav), one CTA.
 * - Subtly shrinks/settles on scroll — padding + shadow only, no color flip.
 * - Mobile: stays floating + glass; links collapse into a menu button whose
 *   panel (framer-motion, per the GSAP/Framer division in lib/gsap.ts) lists
 *   every section plus the CTA.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Scroll shrink — flip once past a small threshold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy — highlight the section currently under the top-center band.
  // Only the home page has these anchors; elsewhere it stays inactive.
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.5, 1] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // While the mobile menu is open: close on Escape, and close if the viewport
  // grows to the desktop breakpoint (where the full nav is shown instead).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4 sm:top-4">
      <nav
        aria-label="Main navigation"
        className={cn(
          "glass mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full transition-all duration-300",
          scrolled ? "px-3 py-1.5 sm:px-4 bg-bg-elevated/95 shadow-md backdrop-blur-xl border-border" : "px-4 py-2.5 sm:px-5 bg-surface/40 shadow-sm backdrop-blur-md"
        )}
      >
        {/* Name mark */}
        <Link
          href="/"
          className="text-text-primary font-heading shrink-0 rounded-full px-1.5 text-base font-semibold tracking-tight sm:text-lg"
        >
          {profile.name}
        </Link>

        {/* Condensed links — desktop only */}
        <ul className="hidden items-center gap-1 md:flex">
          {primaryNav.map((section) => {
            const isActive = active === section.id;
            return (
              <li key={section.id}>
                <Link
                  href={`/#${section.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "text-label block rounded-full px-3 py-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    isActive
                      ? "bg-accent-subtle text-accent"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface/60"
                  )}
                >
                  {section.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA — desktop only */}
        <Link
          href={`/#${navCta.id}`}
          className="bg-primary hover:bg-primary-hover text-label hidden shrink-0 rounded-full px-4 py-1.5 font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent md:inline-flex"
        >
          {navCta.label}
        </Link>

        {/* Menu toggle — mobile only */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="text-text-primary hover:bg-surface/60 -mr-1 inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            {open ? (
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            ) : (
              <>
                <path
                  d="M2.5 6.5h13"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
                <path
                  d="M2.5 11.5h13"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel — floating + glass, full section list + CTA */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="glass mx-auto mt-2 max-w-3xl rounded-3xl p-2 md:hidden"
          >
            <ul className="flex flex-col">
              {sections.map((section) => {
                const isActive = active === section.id;
                return (
                  <li key={section.id}>
                    <Link
                      href={`/#${section.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "text-body block rounded-2xl px-4 py-2.5 font-medium transition-colors",
                        isActive
                          ? "bg-accent-subtle text-accent"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface/70"
                      )}
                    >
                      {section.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="p-2 pt-1">
              <Link
                href={`/#${navCta.id}`}
                onClick={() => setOpen(false)}
                className="bg-primary hover:bg-primary-hover text-label flex items-center justify-center rounded-2xl px-4 py-2.5 font-medium text-white transition-colors"
              >
                {navCta.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
