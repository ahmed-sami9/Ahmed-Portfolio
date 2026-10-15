// Each id is the id of a section on the page; the link points at it with "#id".
export const navLinks = [
  { label: "Home", id: "home" },
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
] as const;

export const sectionIds = navLinks.map((link) => link.id);
