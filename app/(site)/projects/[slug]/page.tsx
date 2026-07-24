import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, type CaseStudySection } from "@/content/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
  };
}

/**
 * Case Study Section — renders content blocks as long-form article text.
 * Support for standard sections and distinctive 'callout' treatments.
 */
function Section({
  section,
  isCallout = false,
}: {
  section: CaseStudySection;
  isCallout?: boolean;
}) {
  if (section.body.length === 0 && !section.bullets?.length) return null;

  if (isCallout) {
    return (
      <section
        id={section.id}
        aria-labelledby={`${section.id}-heading`}
        className="my-16"
      >
        <div className="border-l-4 border-accent pl-6 py-4 bg-gradient-to-r from-accent-subtle/40 to-transparent rounded-r-2xl">
          <h2
            id={`${section.id}-heading`}
            className="text-h3 font-heading text-text-primary mb-4"
          >
            {section.heading}
          </h2>
          <div className="space-y-4">
            {section.body.map((paragraph, i) => (
              <p
                key={i}
                className="text-body-lg text-text-primary font-medium leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-5 space-y-3">
                {section.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="text-body-lg text-text-primary font-medium flex items-start gap-3"
                  >
                    <span
                      className="text-accent mt-[6px] shrink-0 text-sm"
                      aria-hidden="true"
                    >
                      ✦
                    </span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="my-14"
    >
      <h2
        id={`${section.id}-heading`}
        className="text-h2 font-heading text-text-primary mb-6"
      >
        {section.heading}
      </h2>
      <div className="text-body text-text-secondary">
        {section.body.map((paragraph, i) => (
          <p key={i} className="mb-6 leading-relaxed">
            {paragraph}
          </p>
        ))}
        {section.bullets && (
          <ul className="space-y-3 mt-6">
            {section.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="bg-border-strong mt-[10px] block h-1.5 w-1.5 shrink-0 rounded-full"
                  aria-hidden="true"
                />
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { caseStudy } = project;

  // Emphasize key metric sections with the callout treatment
  const isCallout = (id: string) => id === "results" || id === "problem-statement";

  // Filter out any sections that don't exist
  const orderedSections = [
    caseStudy.overview,
    caseStudy.problemStatement,
    caseStudy.research,
    caseStudy.planning,
    caseStudy.architecture,
    caseStudy.features,
    caseStudy.techStack,
    caseStudy.developmentProcess,
    caseStudy.challenges,
    caseStudy.results,
    caseStudy.futureImprovements,
  ].filter(Boolean);

  return (
    <main className="bg-bg min-h-svh pb-32">
      {/* ── Header ── */}
      <header className="pt-32 pb-16 px-6 sm:px-8 border-b border-border bg-bg-elevated">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/#projects"
            className="text-label text-text-muted hover:text-text-primary inline-flex items-center mb-8 transition-colors"
          >
            ← Back to projects
          </Link>
          <h1 className="text-display font-heading text-text-primary mb-6 text-balance">
            {project.title}
          </h1>
          <p className="text-body-lg text-text-secondary mb-10 text-balance leading-relaxed">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tech.map((t) => (
              <span
                key={t}
                className="bg-surface text-text-secondary text-label rounded-full px-4 py-1.5"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary-hover text-white text-label rounded-full px-6 py-2.5 transition-colors font-medium"
              >
                View Live Site
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border-strong text-text-primary hover:bg-surface text-label rounded-full px-6 py-2.5 transition-colors font-medium"
              >
                View Source Code
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ── Long-form Article Body ── */}
      <article className="mx-auto max-w-3xl px-6 sm:px-8 mt-12">
        {orderedSections.map((section) => (
          <Section
            key={section.id}
            section={section}
            isCallout={isCallout(section.id)}
          />
        ))}

        {caseStudy.gallery && caseStudy.gallery.length > 0 && (
          <section
            id="case-gallery"
            aria-labelledby="case-gallery-heading"
            className="my-16"
          >
            <h2
              id="case-gallery-heading"
              className="text-h2 font-heading text-text-primary mb-8"
            >
              Gallery
            </h2>
            <div className="grid gap-6">
              {caseStudy.gallery.map((image, i) => (
                <div
                  key={i}
                  className="aspect-[16/10] bg-surface rounded-2xl flex items-center justify-center border border-border overflow-hidden"
                >
                  <span className="text-text-muted text-label">
                    [{image.alt} — Asset coming soon]
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
