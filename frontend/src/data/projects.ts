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
  // Optional image made for the small card (e.g. light + dark overlapping); the project page uses `src`
  card?: { src: string; alt: string };
};

export type Project = {
  slug: string; // url-safe id: the project page lives at /projects/<slug>
  name: string;
  tagline: string; // what kind of product, in a few words: shown under the name on the project page
  role: string; // what YOU did, e.g. "Solo project"
  summary: string; // one line: what it is, for anyone
  problem: string; // why it exists: who struggled with what
  features: string[]; // the big ones, phrased as what they do for the user
  highlights: string[]; // what's technically interesting, for engineers: the card's "why click" line
  stack: string[];
  status: ProjectStatus;
  // Order = the order they're shown in. The card shows the first 3 (the strongest screens),
  // the project page shows them all, starting from the same one, so the two feel connected.
  screenshots: Screenshot[];
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
  tagline: "Platform for private tutors",
  role: "Solo project",
  summary:
    "A management platform for private tutors: students, groups, attendance, exams, marks and payments in one place.",
  // TODO(Ahmed): check this is your real reason for building it, in your words
  problem:
    "Small tutoring centers track attendance, marks and payments across paper, spreadsheets and WhatsApp. Nothing is connected, so a teacher can’t see who’s falling behind or who hasn’t paid.",
  features: [
    "Reports for parents, sent on WhatsApp as text or a PDF",
    "Attendance for a whole class in one screen",
    "Exams and marks, with each student’s progress over time",
    "Payments: collected vs outstanding, month by month",
  ],
  // Shown on the card as the "why click" line: keep each to a few words
  highlights: ["Raw SQL on PostgreSQL, no ORM", "Server-side sessions + Google sign-in", "Layered Express API"],
  stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
  status: "in-development",
  // Taken from the demo account: 1440×900 at 2×, saved as 1600×1000 (16:10, the frames' shape).
  // The card shows the first three as light + dark pairs (`card`); the page shows every screen
  // full size, alternating light and dark.
  screenshots: [
    {
      src: "/projects/diraya/home.webp",
      alt: "Diraya's teacher home: students, today's attendance, papers to mark, overdue payments, today's schedule and quick actions",
      caption: "Teacher home",
      card: { src: "/projects/diraya/home-themes.webp", alt: "Diraya's teacher home in the light and the dark theme" },
    },
    {
      src: "/projects/diraya/profile.webp",
      alt: "A student's profile in the dark theme: attendance rate, average mark, this month's fee, and the last twelve sessions",
      caption: "Student profile · dark",
      card: { src: "/projects/diraya/profile-themes.webp", alt: "A student's profile in the light and the dark theme" },
    },
    {
      src: "/projects/diraya/payments.webp",
      alt: "The payments page: 83% of November collected, what's still owed, and the latest payments",
      caption: "Payments",
      card: { src: "/projects/diraya/payments-themes.webp", alt: "The payments page in the light and the dark theme" },
    },
    {
      src: "/projects/diraya/grade.webp",
      alt: "A grade's students in one group, in the dark theme, with attendance, marks and payment status per student, and drag handles to reorder them",
      caption: "Students in a grade · dark",
    },
    {
      src: "/projects/diraya/attendance.webp",
      alt: "Taking attendance for a group: everyone starts present, with a save button at the bottom",
      caption: "Take attendance",
    },
    {
      src: "/projects/diraya/exams.webp",
      alt: "The exams page in the dark theme: upcoming exams, a reminder about missing marks, and past exams with averages",
      caption: "Exams & marks · dark",
    },
    {
      src: "/projects/diraya/signin-themes.webp",
      alt: "The sign-in page in the light and the dark theme, with the theme switch in the top-right corner",
      caption: "Light and dark themes",
    },
    {
      src: "/projects/diraya/phones.webp",
      alt: "Three screens on a phone: the teacher home, a student profile and taking attendance",
      caption: "On a phone",
    },
  ],
  links: {
    // demo: "https://...",   (once it's deployed)
    // demoNote: "You get your own sandbox account with sample data. No sign-up.",
    repo: "https://github.com/ahmed-sami9/Diraya", // must be public before launch
  },
  caseStudy: dirayaCaseStudy,
};

// Order = display order. Put the strongest project first.
// TEMPORARY: the second card is a Diraya copy, holding the place of the second real project.
export const projects: Project[] = [diraya, { ...diraya, slug: "diraya-copy-2" }];

// The one place that knows the project page's URL shape.
export const projectPath = (slug: string) => `/projects/${slug}`;

// A file in a project's GitHub repo. HEAD = the default branch, so links survive a branch rename.
export const repoFileUrl = (repo: string, path: string) => `${repo}/blob/HEAD/${path}`;
