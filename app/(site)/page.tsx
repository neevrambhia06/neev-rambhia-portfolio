import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Gallery } from "@/components/sections/Gallery";
import { GitHubOpenSource } from "@/components/sections/GitHubOpenSource";
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <ExperienceTimeline />
      <FeaturedProjects />
      <TechStack />
      <GitHubOpenSource />
      <Achievements />
      <Gallery />
      <Contact />
    </main>
  );
}
