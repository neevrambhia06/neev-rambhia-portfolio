import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { TextLink } from "@/components/ui/TextLink";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <main className="bg-bg pt-28">
      <h1 className="text-text-primary">Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.slug} className="mb-4">
            <Card>
              <article>
                <h2>
                  <TextLink href={`/projects/${project.slug}`}>
                    {project.title}
                  </TextLink>
                </h2>
                <p className="text-text-secondary">{project.summary}</p>
                <p>
                  {project.tech.map((tech) => (
                    <Badge key={tech} className="mr-1">
                      {tech}
                    </Badge>
                  ))}
                </p>
              </article>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}
