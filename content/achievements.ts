export type Achievement = {
  title: string;
  category: "hackathon" | "certification" | "leadership";
  issuer?: string;
  date?: string;
  description?: string;
};

export const achievements: Achievement[] = [
  {
    title: "Oracle Academy Java Certification",
    category: "certification",
    issuer: "Oracle Academy",
  },
  {
    title: "Deloitte Australia Virtual Internship",
    category: "certification",
    issuer: "Forage",
    description:
      "Designed a data visualization dashboard proposal for a simulated client engagement, translating actionable metrics for stakeholder decision-making. Delivered a client-ready technical proposal meeting Deloitte consulting delivery standards.",
  },
];
