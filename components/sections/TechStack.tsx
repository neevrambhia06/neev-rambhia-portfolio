"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Code2, Blocks, Database, Cpu, Wrench } from "lucide-react";
import { techstack } from "@/content/techstack";

// Map each category to a specific Lucide icon to ensure a single, consistent icon language
const iconMap: Record<string, React.ElementType> = {
  "Languages & OOP": Code2,
  "Frameworks & Libraries": Blocks,
  "Databases": Database,
  "Hardware & IoT": Cpu,
  "Tools": Wrench,
};

export function TechStack() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Stagger reveal the category clusters on scroll
      gsap.from(".tech-cluster", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      id="tech-stack"
      ref={container}
      aria-labelledby="tech-stack-heading"
      className="bg-bg py-24 sm:py-32 border-t border-border/40 relative"
    >
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <p className="text-label text-accent mb-4 font-semibold uppercase tracking-eyebrow">
          Arsenal
        </p>
        <h2
          id="tech-stack-heading"
          className="text-h2 font-heading text-text-primary mb-12"
        >
          Tech Stack
        </h2>

        {/* 
          Using a masonry-like flex layout or grid for clusters.
          Grid works well to naturally flow the unequal height lists.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 lg:gap-x-12">
          {techstack.map((category) => {
            const Icon = iconMap[category.label] || Code2;

            return (
              <div key={category.label} className="tech-cluster flex flex-col">
                <h3 className="text-h3 font-heading text-text-primary mb-6 flex items-center gap-2.5">
                  <span className="bg-accent/10 text-accent flex h-8 w-8 items-center justify-center rounded-lg">
                    <Icon className="h-4 w-4" />
                  </span>
                  {category.label}
                </h3>
                
                <ul className="flex flex-wrap gap-2.5">
                  {category.items.map((item) => (
                    <li key={item}>
                      <div className="bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-border-strong hover:bg-surface-hover transition-colors rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 cursor-default select-none">
                        <Icon className="h-3.5 w-3.5 opacity-50" />
                        {item}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
