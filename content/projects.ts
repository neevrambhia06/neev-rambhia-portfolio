export type CaseStudySection = {
  /** Stable anchor id within the case study page. */
  id: string;
  heading: string;
  /** Plain paragraphs for now; richer content types can come later. */
  body: string[];
  /** Optional bullet list rendered after body paragraphs. */
  bullets?: string[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tech: string[];
  links?: {
    github?: string;
    live?: string;
  };
  featured?: boolean;
  caseStudy: {
    overview: CaseStudySection;
    problemStatement: CaseStudySection;
    research: CaseStudySection;
    planning: CaseStudySection;
    architecture: CaseStudySection;
    features: CaseStudySection;
    techStack: CaseStudySection;
    developmentProcess: CaseStudySection;
    challenges: CaseStudySection;
    results: CaseStudySection;
    futureImprovements: CaseStudySection;
    /** Image placeholders until real assets land. */
    gallery: { alt: string }[];
  };
};

/** Helper keeps section boilerplate down while content is placeholder. */
function section(
  id: string,
  heading: string,
  body: string[] = [],
  bullets?: string[]
): CaseStudySection {
  return { id, heading, body, bullets };
}

export const projects: Project[] = [
  {
    slug: "codeatlas",
    title: "CodeAtlas (AI Software Reasoning Engine)",
    summary:
      "AI-powered Software Reasoning Engine that analyzes source code repositories to reconstruct business capabilities, user journeys, architecture, and logic gaps using knowledge graphs and evidence-backed AI reasoning.",
    tech: ["Next.js", "TypeScript", "FastAPI", "Neo4j", "PostgreSQL", "OpenAI"],
    featured: true,
    caseStudy: {
      overview: section("overview", "Overview", [
        "CodeAtlas is an AI-powered Software Reasoning Engine designed to help developers understand unfamiliar codebases without manually reading thousands of lines of code. It parses repositories, builds a software knowledge graph, infers the application's business domain, reconstructs user journeys, detects implemented capabilities, and identifies potential logic gaps with explainable, evidence-backed reasoning.",
        "Unlike AI coding assistants that generate code, CodeAtlas focuses on understanding existing software systems by transforming source code into actionable architectural and business insights."
      ]),
      problemStatement: section("problem-statement", "Problem Statement", [
        "Developers onboarding onto unfamiliar codebases spend days reading thousands of lines of code to understand what a system actually does. There was no tool that could transform an existing repository into business-level insight — capabilities, user journeys, and logic gaps — with evidence to back every claim."
      ]),
      research: section("research", "Research", []),
      planning: section("planning", "Planning", []),
      architecture: section("architecture", "Architecture", [
        "I designed the complete Software Reasoning architecture: an AST-based repository parsing pipeline feeds a software knowledge graph (Neo4j), which powers a Domain Inference Engine, Capability Intelligence modules with confidence scoring, Journey Reconstruction workflows, and Logic Gap Detection. A FastAPI backend serves the analysis to a Next.js dashboard, with PostgreSQL handling application data and JWT-based authentication."
      ]),
      features: section(
        "features",
        "Key Features",
        [],
        [
          "Repository upload via ZIP or Git URL with AST-based parsing.",
          "Interactive Software Knowledge Graph visualized with React Flow.",
          "Domain Inference Engine that identifies the application's business domain.",
          "Capability Intelligence with confidence scoring for detected features.",
          "User Journey Reconstruction from code-level evidence.",
          "Logic Gap Detection surfacing missing or incomplete flows.",
          "Evidence-backed AI explanations for every insight.",
          "Interactive analysis dashboard with report generation."
        ]
      ),
      techStack: section("tech-stack", "Tech Stack", [
        "Next.js, React, TypeScript, and Tailwind CSS on the frontend; FastAPI and Python on the backend; PostgreSQL and Neo4j for data and graph storage; OpenAI / OpenRouter for LLM reasoning; React Flow for graph visualization; JWT authentication; Docker for deployment."
      ]),
      developmentProcess: section("development-process", "Development Process", []),
      challenges: section("challenges", "Challenges", []),
      results: section("results", "Results", [
        "Transforms raw source code into business insight: repositories are parsed into a knowledge graph, then reasoned over to produce domains, capabilities, journeys, and logic gaps — each backed by explainable evidence and confidence scores."
      ]),
      futureImprovements: section("future-improvements", "Future Improvements", []),
      gallery: [
        { alt: "CodeAtlas knowledge graph visualization" },
        { alt: "CodeAtlas analysis dashboard" },
      ],
    },
  },
  {
    slug: "voltpark",
    title: "Voltpark (Smart Parking & EV Charging)",
    summary:
      "EV charging booking and management platform — product experience, authentication, dashboards, and booking workflows built on React, Supabase, Tailwind CSS, and Razorpay.",
    tech: ["React", "Supabase", "Tailwind CSS", "Razorpay"],
    links: {
      github: "https://github.com/neevrambhia06/Voltpark",
      live: "https://voltpark-kappa.vercel.app/",
    },
    featured: true,
    caseStudy: {
      overview: section("overview", "Overview", [
        "Voltpark is a smart parking and EV charging platform designed to simplify the booking and management experience. I worked as a Product Developer, taking ownership of the product's UI and architecting core full-stack workflows from the ground up."
      ]),
      problemStatement: section("problem-statement", "Problem Statement", [
        "EV drivers needed a fast, reliable way to discover and book charging slots without manual filtering, while station owners needed a secure system to manage tiers of access and payments."
      ]),
      research: section("research", "Research", []),
      planning: section("planning", "Planning", []),
      architecture: section("architecture", "Architecture", [
        "I architected the database schema and system design using Supabase to support 100 concurrent users across 5 role-based access tiers and 7 relational tables. The architecture securely separates the owner dashboard from the admin dashboard and user booking flows."
      ]),
      features: section(
        "features",
        "Key Features",
        ["The platform covers the entire lifecycle of EV charging:"],
        [
          "Location-based slot discovery via geolocation search, reducing manual filter steps to a single query.",
          "Authentication and authorization using Supabase Row-Level Security across 5 user roles, preventing cross-role data access.",
          "Integrated Razorpay payments and barcode confirmation.",
          "Distinct dashboards for end-users, station owners, and global admins.",
          "Responsive, mobile-first booking flow."
        ]
      ),
      techStack: section("tech-stack", "Tech Stack", [
        "Built on React and Tailwind CSS for the frontend, with Supabase handling data, auth, and Row-Level Security. Razorpay powers the payment gateway."
      ]),
      developmentProcess: section("development-process", "Development Process", []),
      challenges: section("challenges", "Challenges", []),
      results: section("results", "Results", [
        "15–20 second bookings: By replacing manual verification with Razorpay payments and barcode confirmation, we cut the booking confirmation time drastically (validated across 15 simulated transactions)."
      ]),
      futureImprovements: section("future-improvements", "Future Improvements", [
        "Future iterations will include deeper map integrations and expanded payment gateway options."
      ]),
      gallery: [
        { alt: "Voltpark dashboard screenshot" },
        { alt: "Voltpark booking flow screenshot" },
      ],
    },
  },
  {
    slug: "employee-payroll-system",
    title: "Employee Payroll Management System",
    summary:
      "Automated payroll calculation for 1,000 employee records, replacing manual computation with a single MVC-driven workflow.",
    tech: ["Java", "Servlets", "JSP", "JDBC", "SQLite", "HTML/CSS"],
    featured: true,
    caseStudy: {
      overview: section("overview", "Overview", [
        "An enterprise-grade payroll management system built in Java. The system automates the calculation of base pay, deductions, and tax, providing a streamlined workflow for HR administrators."
      ]),
      problemStatement: section("problem-statement", "Problem Statement", [
        "Manual payroll processing for large workforces required 10–15 steps per employee. The process was heavily error-prone, time-consuming, and failed to scale for a 1,000+ employee headcount."
      ]),
      research: section("research", "Research", []),
      planning: section("planning", "Planning", []),
      architecture: section("architecture", "Architecture", [
        "The system is built on a robust MVC (Model-View-Controller) architecture. Java Servlets handle the core business logic, a JSP-based dynamic UI serves the presentation layer, and JDBC connects to an SQLite database for persistent storage."
      ]),
      features: section(
        "features",
        "Key Features",
        [],
        [
          "CRUD-based employee management module.",
          "Automated payroll calculation handling base pay, deductions, and tax brackets.",
          "Dedicated report generation module.",
          "JSP-based dynamic UI that simplifies the user experience."
        ]
      ),
      techStack: section("tech-stack", "Tech Stack", [
        "Java, Servlets, JSP, JDBC, SQLite, HTML/CSS."
      ]),
      developmentProcess: section("development-process", "Development Process", []),
      challenges: section("challenges", "Challenges", []),
      results: section("results", "Results", [
        "1,000 employee records automated successfully.",
        "Streamlined payroll processing from 10–15 manual steps down to just 3–4 system-driven steps via the new dynamic UI."
      ]),
      futureImprovements: section("future-improvements", "Future Improvements", []),
      gallery: [{ alt: "Payroll system dashboard screenshot" }],
    },
  },
  {
    slug: "flex-gym-management",
    title: "Flex Gym Management System",
    summary:
      "Membership and payment management system supporting 4 membership tiers, tracking 500 active member records via MySQL.",
    tech: ["HTML", "CSS", "PHP", "MySQL"],
    featured: true,
    caseStudy: {
      overview: section("overview", "Overview", [
        "A complete membership and payment management system designed for gym administrators to track active members, class schedules, and revenue in real time."
      ]),
      problemStatement: section("problem-statement", "Problem Statement", [
        "Manual membership tracking and physical class scheduling led to frequent double-booking conflicts, lost records, and unreliable revenue reporting."
      ]),
      research: section("research", "Research", []),
      planning: section("planning", "Planning", []),
      architecture: section("architecture", "Architecture", [
        "A classic LAMP-stack approach: a PHP backend serving an HTML/CSS frontend, with MySQL handling all relational data including members, payments, schedules, and reports."
      ]),
      features: section(
        "features",
        "Key Features",
        [],
        [
          "Database-driven class scheduling system.",
          "Admin dashboard surfacing real-time reports on revenue, active members, and expiring memberships.",
          "Support for 4 distinct membership tiers with integrated payment tracking."
        ]
      ),
      techStack: section("tech-stack", "Tech Stack", [
        "HTML, CSS, PHP, MySQL."
      ]),
      developmentProcess: section("development-process", "Development Process", []),
      challenges: section("challenges", "Challenges", []),
      results: section("results", "Results", [
        "Zero double-bookings: Replaced manual class scheduling with a database-driven system, completely eliminating conflicts.",
        "Successfully tracked 500 active member records via the MySQL database."
      ]),
      futureImprovements: section("future-improvements", "Future Improvements", []),
      gallery: [{ alt: "Gym management dashboard screenshot" }],
    },
  },
];
