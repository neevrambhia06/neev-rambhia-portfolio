"use client";

import { motion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { TextLink } from "@/components/ui/TextLink";
import { projects } from "@/content/projects";

/**
 * FeaturedProjects — a bento-style grid highlighting key work.
 * 
 * Layout:
 * - Uses a 6-column CSS grid on desktop to allow varied sizing.
 * - The first project (Voltpark) spans 4 columns and 2 rows to act as a flagship feature.
 * - Subsequent projects span 2 or 3 columns to create an asymmetric, interlocking grid.
 * - Stacks to a single column on mobile.
 * 
 * Interaction:
 * - Built using Framer Motion for a simple stagger-in on scroll.
 * - Hover state uses a subtle custom lift (-translate-y-1) and a soft glow/shadow
 *   to feel polished without relying on premium UI libraries.
 */

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.6 },
  },
};

export function FeaturedProjects() {
  const featured = projects.filter((project) => project.featured);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-bg py-24 sm:py-32 border-t border-border/40 relative">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <p className="text-label text-accent mb-4 font-semibold uppercase tracking-eyebrow">
          Work
        </p>
        <h2 id="projects-heading" className="text-h2 font-heading text-text-primary mb-12">
          Featured Projects
        </h2>

        <motion.ul
          className="grid grid-cols-1 md:grid-cols-6 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featured.map((project, i) => {
            // Grid sizing logic for 3 text-heavy items without cover images:
            // Item 0 (Voltpark): flagship, spans full width of the first row (6 cols)
            // Item 1, 2: half width, span 3 cols each on the second row
            let spanClass = "md:col-span-6";
            if (i === 0) spanClass = "md:col-span-6 lg:col-span-6";
            else spanClass = "md:col-span-6 lg:col-span-3";

            return (
              <motion.li key={project.slug} className={spanClass} variants={item}>
                <Card className="h-full group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col p-8">
                  {/* Subtle hover gradient/glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <article className="flex flex-col h-full z-10 relative">
                    <h3 className="text-h3 font-heading text-text-primary mb-3">
                      <TextLink
                        href={`/projects/${project.slug}`}
                        className="before:absolute before:inset-0"
                      >
                        {project.title}
                      </TextLink>
                    </h3>
                    <p className="text-text-secondary text-body mb-8 flex-grow">
                      {project.summary}
                    </p>
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((tech) => (
                          <Badge key={tech} className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-label text-accent font-medium group-hover:text-accent-hover transition-colors inline-flex items-center">
                        Read case study
                        <span className="ml-1 transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </p>
                    </div>
                  </article>
                </Card>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
