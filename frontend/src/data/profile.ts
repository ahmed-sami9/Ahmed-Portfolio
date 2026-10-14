// All personal content lives here. Components only render it.
// Changing your tagline or a link never means touching a component.

export const profile = {
  name: "Ahmed Elgaml",
  initials: "AE",
  role: "Full-stack developer",
  tagline:
    "I build full-stack web applications with the MERN stack, and I learn whatever a problem needs beyond it. I make sure what I ship is reliable today and still easy to change a year from now.",
  location: "Based in Egypt",
  terminalLine: "open to remote roles",
  photo: {
    src: "/personal-photo.webp",
    alt: "Portrait of Ahmed Elgaml",
    width: 800,
    height: 1000,
  },
  links: {
    github: "https://github.com/your-username", // TODO: your real GitHub URL
    resume: "/resume.pdf", // TODO: add resume.pdf to /public
  },
} as const;
