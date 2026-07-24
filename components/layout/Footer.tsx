import Link from "next/link";
import { Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { sections } from "@/lib/navigation";

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

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-12 sm:py-16">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 mb-12">
          
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-8">
              {sections.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`/#${section.id}`}
                    className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <ul aria-label="Social links" className="flex items-center gap-5">
            <li>
              <a 
                href={`mailto:${profile.links.email}`}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </li>
            <li>
              <a 
                href={profile.links.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </li>
            <li>
              <a 
                href={profile.links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-border/50 pt-8 gap-4">
          <p className="text-text-muted text-sm text-center sm:text-left">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="text-text-muted text-sm">
            Designed & Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
