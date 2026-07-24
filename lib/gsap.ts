"use client";

/**
 * GSAP setup — single registration point.
 *
 * ANIMATION DIVISION OF LABOR (site-wide convention):
 *  - GSAP + ScrollTrigger  → scroll-linked choreography: pins, scrubs,
 *    section reveals tied to scroll position, multi-element timelines.
 *  - Framer Motion         → simple component-level transitions: hover,
 *    tap, mount/enter, layout. (Variants live in lib/animations.ts.)
 *  Never both on the same animation — pick one per use case and note
 *  which in a comment at the call site.
 *
 * Usage in client components:
 *   import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
 *   useGSAP(() => { gsap.to(...) }, { scope: ref });
 *
 * Always import from this module (never from "gsap" directly) so plugin
 * registration is guaranteed and stays in one place. useGSAP handles
 * cleanup/reverts on unmount — prefer it over useEffect for animations.
 */
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safe to call repeatedly; guard keeps SSR from touching window-dependent code.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
