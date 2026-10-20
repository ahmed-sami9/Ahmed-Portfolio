// Everything the About section says. Components only render it.

export const about = {
  eyebrow: "About me",
  title: "Telecom engineer by degree, full-stack developer by choice.",
  story: [
    "I’ve always been drawn to computers: the digital world itself, not only the code behind it. After graduating in telecommunication engineering in 2023, I started learning programming, and it fit. The field never stops moving, and that suits me: I learn to become better, and to satisfy my curiosity.",
    "I’m self-taught, and I start everything from its foundations. Before building on anything, I learn what it is and how it works: computer hardware and low-level fundamentals, operating systems, networks, data structures and algorithms, how programming languages work and differ, and now system design.",
  ],

  // Decorative, so alt is empty: the text carries the meaning.
  photo: {
    src: "/about-lake.webp", // TODO: swap for the full-size Unsplash download (1200px+ wide)
    width: 1032,
    height: 581,
  },

  principles: [
    {
      title: "Understand before I build",
      text: "I look for the root cause before the fix, and I don’t ship code I can’t explain.",
    },
    {
      title: "Reliable by default",
      text: "I follow best practices from the start, and I don’t leave broken windows: small problems get fixed when I see them, before they become the norm.",
    },
    {
      title: "Built for what it actually needs, and readable by others",
      text: "I design for the real requirements, what the system needs now and where it’s heading, no less and no more, and I structure code so someone else can read it and change it without a guide.",
    },
  ],

  learning:
    "I keep what I learn with a spaced-repetition system: Anki for recall, Obsidian for the connected notes behind it. A few cards every day, so knowledge compounds instead of fading.",

  // Only what I can defend in an interview. "Familiar" stays empty until it's earned.
  toolbox: {
    builtWith: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "Git"],
    familiar: [] as string[],
  },

  lookingFor: "Full-stack roles: on-site, hybrid or remote, and open to relocating.",
  languages: [
    "English: C1 · B2 speaking", // TODO: replace with the EF SET result before applying
    "Arabic: Native",
  ],

  // The section's closing line, like "more on GitHub" ends Projects
  closingLink: { label: "let's talk", href: "#contact" },

  belief:
    "Wherever I work, I treat its success as my own: what’s ethically good for the company is good for me.",
} as const;
