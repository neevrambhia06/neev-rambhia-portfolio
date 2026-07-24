"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Award } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { achievements } from "@/content/achievements";

export function Achievements() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".achievement-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: container }
  );

  // We are only displaying certifications based on current requirements
  const certs = achievements.filter((a) => a.category === "certification");

  if (certs.length === 0) return null;

  return (
    <section id="achievements" ref={container} aria-labelledby="achievements-heading" className="bg-bg py-24 sm:py-32 border-t border-border/40 relative">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <p className="text-label text-accent mb-4 font-semibold uppercase tracking-eyebrow">
          Milestones
        </p>
        <h2 id="achievements-heading" className="text-h2 font-heading text-text-primary mb-12">
          Achievements &amp; Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((achievement) => (
            <Card 
              key={achievement.title} 
              className="achievement-card p-6 sm:p-8 flex flex-col group hover:-translate-y-1 transition-transform duration-300 border border-border/60"
            >
              <div className="flex items-start gap-5 mb-4">
                <div className="bg-accent/10 text-accent p-3 rounded-lg shrink-0 group-hover:bg-accent group-hover:text-bg transition-colors duration-300">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-h4 font-heading text-text-primary leading-snug">
                    {achievement.title}
                  </h3>
                  {achievement.issuer && (
                    <p className="text-text-muted text-sm mt-1 font-medium">
                      {achievement.issuer}
                    </p>
                  )}
                </div>
              </div>
              {achievement.description && (
                <p className="text-text-secondary text-sm mt-2 leading-relaxed">
                  {achievement.description}
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
