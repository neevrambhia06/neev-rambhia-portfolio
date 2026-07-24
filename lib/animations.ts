import type { Variants } from "framer-motion";

/**
 * Shared Framer Motion variants — tuned in later phases.
 *
 * Framer Motion is for simple component-level transitions only (hover,
 * tap, mount/enter, layout). Scroll-linked choreography (pins, scrubs,
 * section reveals) uses GSAP + ScrollTrigger via lib/gsap.ts — never
 * both on the same animation.
 */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
