"use client";

import { useEffect, useState } from "react";
import { BookOpen, Star, GitFork, ExternalLink, Activity } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { profile } from "@/content/profile";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

type Repo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
};

export function GitHubOpenSource() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Extract GitHub username dynamically from the profile URL
  const username = profile.links.github.split("/").pop() || "neevrambhia06";

  useEffect(() => {
    // Fetch the 4 most recently updated non-fork repositories to represent active "pinned" work.
    // The GitHub REST API doesn't expose a direct "pinned" endpoint, so this is the cleanest proxy.
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        const originalRepos = data.filter((repo: { fork: boolean }) => !repo.fork).slice(0, 4);
        setRepos(originalRepos);
      })
      .catch((err) => {
        console.error("GitHub API error:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  return (
    <section id="github" aria-labelledby="github-heading" className="bg-bg py-24 sm:py-32 border-t border-border/40 relative">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-label text-accent mb-4 font-semibold uppercase tracking-eyebrow">
              Open Source
            </p>
            <h2 id="github-heading" className="text-h2 font-heading text-text-primary">
              GitHub Activity
            </h2>
          </div>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-surface hover:bg-surface-hover border border-border text-text-primary text-label px-5 py-2.5 rounded-full transition-colors font-medium"
          >
            <GithubIcon className="w-4 h-4" />
            View Profile
          </a>
        </div>

        {/* ── Contribution Graph ── */}
        <div className="mb-12">
          <Card className="p-6 sm:p-8 overflow-hidden flex flex-col bg-surface/50 border-border/50">
            <h3 className="text-h4 font-heading text-text-primary mb-6 flex items-center gap-2">
              <Activity className="h-4 w-4 text-accent" />
              Contributions in the last year
            </h3>
            <div className="w-full overflow-x-auto pb-2">
              {/* ghchart allows tinting the graph via hex codes in the URL. 2563eb is our accent blue. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://ghchart.rshah.org/2563eb/${username}`}
                alt={`GitHub Contribution Graph for ${username}`}
                className="min-w-[700px] w-full mix-blend-multiply opacity-90"
              />
            </div>
          </Card>
        </div>

        {/* ── Repositories Row ── */}
        <h3 className="text-h4 font-heading text-text-primary mb-6 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-accent" />
          Recent Repositories
        </h3>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6 h-40 flex flex-col justify-center">
                <div className="animate-pulse flex flex-col space-y-4">
                  <div className="h-4 bg-border rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-border rounded w-full"></div>
                    <div className="h-3 bg-border rounded w-5/6"></div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <div className="h-3 bg-border rounded w-12"></div>
                    <div className="h-3 bg-border rounded w-8"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : error || repos.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fallback Static Cards in case of API rate limiting / failure */}
            <Card className="p-6 h-full flex flex-col group hover:-translate-y-1 transition-all duration-300">
              <h4 className="text-h4 font-heading text-text-primary mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-text-muted" />
                <span>Voltpark</span>
              </h4>
              <p className="text-text-secondary text-sm mb-6 flex-grow">
                EV charging booking and management platform.
              </p>
              <div className="flex items-center gap-4 text-xs text-text-muted font-medium">
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500" /> TypeScript
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" /> 3
                </span>
              </div>
            </Card>
            <Card className="p-6 h-full flex flex-col group hover:-translate-y-1 transition-all duration-300">
              <h4 className="text-h4 font-heading text-text-primary mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-text-muted" />
                <span>portfolio-v2</span>
              </h4>
              <p className="text-text-secondary text-sm mb-6 flex-grow">
                My personal portfolio website built with Next.js 15.
              </p>
              <div className="flex items-center gap-4 text-xs text-text-muted font-medium">
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" /> JavaScript
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" /> 1
                </span>
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.map((repo) => (
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                key={repo.id}
                className="block group h-full"
              >
                <Card className="p-6 h-full flex flex-col group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="flex justify-between items-start mb-3 z-10">
                    <h4 className="text-h4 font-heading text-text-primary flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-text-muted group-hover:text-accent transition-colors" />
                      <span className="group-hover:text-accent transition-colors truncate">
                        {repo.name}
                      </span>
                    </h4>
                    <ExternalLink className="h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-4" />
                  </div>

                  <p className="text-text-secondary text-sm mb-6 flex-grow z-10 line-clamp-2">
                    {repo.description || "No description provided."}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-text-muted font-medium z-10">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-accent opacity-70" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-surface border border-border text-text-primary text-label px-5 py-2.5 rounded-full font-medium"
          >
            <GithubIcon className="w-4 h-4" />
            View Full Profile
          </a>
        </div>
      </div>
    </section>
  );
}
