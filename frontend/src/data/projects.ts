import { dirayaCaseStudy } from "./caseStudies/diraya";
import type { CaseStudy } from "./caseStudies/types";
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

export type Screenshot = {
  src: string;
  alt: string; // what's in the image, for screen readers
  caption: string; // short screen name shown under it on the project page, e.g. "Students"
};

export type Project = {
  slug: string; // url-safe id: the project page lives at /projects/<slug>
  name: string;
  tagline: string; // what kind of product, in a few words: shown under the name on the project page
  role: string; // what YOU did, e.g. "Solo project"
  summary: string; // one line: what it is, for anyone
  problem: string; // why it exists: who struggled with what
  features: string[]; // the big ones, phrased as what they do for the user
  highlights: string[]; // what's technically interesting, for engineers
  stack: string[];
  status: ProjectStatus;
  screenshots: Screenshot[]; // order = the order they're shown in; the first is the default
  links: {
    demo?: string;
    demoNote?: string; // one line under the demo button, e.g. how the demo account works
    repo?: string;
  };
  caseStudy?: CaseStudy; // the technical deep dive under the panel (its own file in caseStudies/)
};

const diraya: Project = {
  slug: "diraya",
  name: "Diraya",
  tagline: "Teacher–student platform",
  role: "Solo project",
  summary:
    "A management platform for teachers and students: attendance, exams, marks and payments in one place.",
  // TODO(Ahmed): check this is your real reason for building it, in your words
  problem:
    "Small tutoring centers track attendance, marks and payments across paper, spreadsheets and WhatsApp. Nothing is connected, so a teacher can’t see who’s falling behind or who hasn’t paid.",
  features: [
    "Separate teacher and student dashboards",
    "Attendance for a whole class in one screen",
    "Exams and marks, with each student’s progress over time",
    "Payments: collected vs outstanding, month by month",
  ],
  highlights: ["Raw SQL on PostgreSQL, no ORM", "JWT auth", "Layered Express API"],
  stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
  status: "in-development",
  // TODO: replace the placeholders with real screenshots (one per key feature works best)
  screenshots: [
    {
      src: "/projects/diraya/placeholder-1.webp",
      alt: "Diraya teacher dashboard",
      caption: "Teacher dashboard",
    },
    {
      src: "/projects/diraya/placeholder-2.webp",
      alt: "Diraya students list",
      caption: "Students",
    },
    {
      src: "/projects/diraya/placeholder-3.webp",
      alt: "Diraya exams and marks",
      caption: "Exams & marks",
    },
  ],
  links: {
    // demo: "https://...",   (once it's deployed)
    // demoNote: "You get your own sandbox account with sample data. No sign-up.",
    repo: "https://github.com/your-username/diraya", // TODO: real repo URL
  },
  caseStudy: dirayaCaseStudy,
};

// Order = display order. Put the strongest project first.
// TEMPORARY: Diraya repeated to preview the 2×2 grid. Replace with the real projects.
export const projects: Project[] = [
  diraya,
  { ...diraya, slug: "diraya-copy-2" },
  { ...diraya, slug: "diraya-copy-3" },
  { ...diraya, slug: "diraya-copy-4" },
];

// The one place that knows the project page's URL shape.
export const projectPath = (slug: string) => `/projects/${slug}`;
