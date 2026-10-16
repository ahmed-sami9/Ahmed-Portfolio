import { profile } from "./profile";

// ---------------------------------------------------------------------------
// Section copy
// ---------------------------------------------------------------------------

export const projectsSection = {
  eyebrow: "My projects",
  title: "Things I’ve built",
  description:
    "A few things I’ve designed and built end to end, from the database to the interface.",
  // The section ends on a terminal line that links to GitHub
  moreLink: {
    label: "see more on github",
    href: profile.links.github,
  },
} as const;

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export type ProjectStatus = "live" | "in-development";

export type Screenshot = { src: string; alt: string };

export type Project = {
  slug: string; // url-safe id, e.g. for a future /projects/diraya page
  name: string;
  summary: string; // one line: what it is, for anyone
  highlights: string[]; // what's technically interesting, for engineers (shown joined by " · ")
  stack: string[];
  status: ProjectStatus;
  screenshots: Screenshot[]; // order = the order they're shown in; the first is the default
  links: {
    caseStudy?: string; // where "View project" goes
    demo?: string;
    repo?: string;
  };
};

const diraya: Project = {
  slug: "diraya",
  name: "Diraya",
  summary:
    "A management platform for teachers and students: attendance, exams, marks and payments in one place.",
  highlights: ["Raw SQL on PostgreSQL, no ORM", "JWT auth", "Layered Express API"],
  stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
  status: "in-development",
  // TODO: replace the placeholders with real screenshots
  screenshots: [
    { src: "/projects/diraya/placeholder-1.webp", alt: "Diraya teacher dashboard" },
    { src: "/projects/diraya/placeholder-2.webp", alt: "Diraya students list" },
    { src: "/projects/diraya/placeholder-3.webp", alt: "Diraya exams and marks" },
  ],
  links: {
    caseStudy: "#projects", // TODO: the project details view (still to be decided)
    // demo: "https://...",   (once it's deployed)
    repo: "https://github.com/your-username/diraya", // TODO: real repo URL
  },
};

// Order = display order. Put the strongest project first.
// TEMPORARY: Diraya repeated to preview the 2×2 grid. Replace with the real projects.
export const projects: Project[] = [
  diraya,
  { ...diraya, slug: "diraya-copy-2" },
  { ...diraya, slug: "diraya-copy-3" },
  { ...diraya, slug: "diraya-copy-4" },
];
