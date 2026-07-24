"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";
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

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    const form = e.target as HTMLFormElement;
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    // Fallback to simulation if no API key is provided
    if (!accessKey) {
      console.warn("No Web3Forms access key found. Simulating form submission.");
      setTimeout(() => {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          form.reset();
        }, 5000);
      }, 1200);
      return;
    }

    // Real submission via Web3Forms
    try {
      const formData = new FormData(form);
      formData.append("access_key", accessKey);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          form.reset();
        }, 5000);
      } else {
        console.error("Form submission failed:", data);
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-bg py-24 sm:py-32">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
          
          {/* ── CTA & Direct Links ── */}
          <div className="flex flex-col justify-center">
            <p className="text-label text-accent mb-4 font-semibold uppercase tracking-eyebrow">
              What&apos;s Next
            </p>
            <h2 id="contact-heading" className="text-h2 font-heading text-text-primary mb-6">
              Let&apos;s build something together.
            </h2>
            <p className="text-text-secondary text-lg mb-10 max-w-md leading-relaxed">
              Whether you have a question, a project proposal, or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            
            <div className="flex flex-col space-y-4">
              <a 
                href={`mailto:${profile.links.email}`}
                className="flex items-center gap-4 text-text-secondary hover:text-accent transition-colors font-medium w-fit group"
              >
                <div className="bg-surface border border-border p-3 rounded-lg group-hover:border-accent/50 group-hover:bg-accent/5 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                {profile.links.email}
              </a>
              <a 
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-text-secondary hover:text-accent transition-colors font-medium w-fit group"
              >
                <div className="bg-surface border border-border p-3 rounded-lg group-hover:border-accent/50 group-hover:bg-accent/5 transition-colors">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                LinkedIn
              </a>
              <a 
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-text-secondary hover:text-accent transition-colors font-medium w-fit group"
              >
                <div className="bg-surface border border-border p-3 rounded-lg group-hover:border-accent/50 group-hover:bg-accent/5 transition-colors">
                  <GithubIcon className="w-5 h-5" />
                </div>
                GitHub
              </a>
            </div>
          </div>

          {/* ── Contact Form ── */}
          <div className="bg-surface border border-border p-6 sm:p-8 rounded-2xl relative overflow-hidden flex flex-col justify-center">
            {status === "success" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/95 backdrop-blur-sm z-10 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-h3 font-heading text-text-primary mb-2">Message sent!</h3>
                <p className="text-text-secondary text-center max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
              </div>
            )}
            
            {status === "error" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/95 backdrop-blur-sm z-10 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold">!</span>
                </div>
                <h3 className="text-h3 font-heading text-text-primary mb-2">Something went wrong</h3>
                <p className="text-text-secondary text-center max-w-xs mb-6">
                  There was an error sending your message. Please try emailing me directly instead.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="bg-surface border border-border px-4 py-2 rounded-full text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-text-primary">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="bg-bg border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted transition-all"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-text-primary">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="bg-bg border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted transition-all"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-text-primary">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="How can I help you?"
                  className="bg-bg border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted transition-all resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-text-primary text-bg hover:bg-text-secondary transition-colors py-3.5 px-6 rounded-lg font-medium flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
                {status !== "submitting" && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
