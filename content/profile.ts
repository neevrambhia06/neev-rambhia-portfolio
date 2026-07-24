/**
 * Single source of truth for personal data.
 * Every section/component imports from here — never hardcode profile text.
 */

export type Education = {
  degree: string;
  institution: string;
  location?: string;
  affiliation?: string;
  period: string;
  current?: boolean;
};

export type Profile = {
  name: string;
  role: string;
  /** One-line value proposition for the hero. */
  tagline: string;
  /** Short, bold intro statement — the lede headline of the About section. */
  aboutHeadline: string;
  /** Short bio paragraphs for the About section. */
  bio: string[];
  interests: string[];
  leadershipNote: string;
  links: {
    email: string;
    github: string;
    linkedin: string;
    phone?: string;
  };
  education: Education[];
  certifications: string[];
  skills: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    hardware: string[];
    tools: string[];
  };
};

export const profile: Profile = {
  name: "Neev Rambhia",
  role: "AI/ML Engineering Student • Full-Stack AI Developer • Product Builder",
  tagline:
    "I build AI-powered products end to end — from ML models and IoT hardware to polished full-stack web experiences.",
  aboutHeadline:
    "AI/ML engineering student and full-stack product builder — I ship real products, not just prototypes.",
  bio: [
    "I'm an AI/ML engineering student at A.P. Shah Institute of Technology (University of Mumbai, Class of 2028), with a diploma in Computer Engineering from Shri Bhagubhai Mafatlal Polytechnic.",
    "I work across the stack — machine learning in Python, full-stack web with React and Next.js, and hardware/IoT systems on ESP32 and Arduino. I care about shipping products, not just prototypes.",
  ],
  interests: [
    "AI",
    "Agentic AI",
    "Full-Stack Development",
    "Automation",
    "Product Engineering",
    "Modern Web Technologies",
  ],
  leadershipNote:
    "As Technical Head for a multi-day Jain Temple Exhibition, I led technical operations, media coverage, and volunteer coordination — experience that shaped how I run projects and teams.",
  links: {
    // TODO: confirm real handles/addresses.
    email: "neevrambhia06@gmail.com",
    phone: "+91 9372266373", // Included in data; omit from public UI if preferred.
    github: "https://github.com/neevrambhia06",
    linkedin: "https://www.linkedin.com/in/neevrambhia",
  },
  education: [
    {
      degree: "B.E. Artificial Intelligence & Machine Learning",
      institution: "A.P. Shah Institute of Technology, Thane",
      affiliation: "University of Mumbai",
      period: "Class of 2028",
      current: true,
    },
    {
      degree: "Diploma in Computer Engineering",
      institution: "Shri Bhagubhai Mafatlal Polytechnic",
      period: "Sep 2022 – Jun 2025",
    },
  ],
  certifications: [
    "Oracle Academy Java Certification",
    "Deloitte Australia Virtual Internship (Forage)",
  ],
  skills: {
    languages: ["Python", "Java", "JavaScript", "TypeScript", "C++", "PHP"],
    frameworks: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "Three.js",
      "React Three Fiber",
      "FastAPI",
    ],
    databases: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Firebase",
      "Supabase",
      "NoSQL",
    ],
    hardware: ["ESP32", "Arduino", "GPS", "DHT22", "IoT Systems"],
    tools: [
      "Git",
      "GitHub",
      "VS Code",
      "Colab",
      "Figma",
      "Claude Code",
      "Codex",
      "Cursor",
    ],
  },
};
