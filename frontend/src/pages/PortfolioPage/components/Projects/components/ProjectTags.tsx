type ProjectTagsProps = {
  tags: string[];
  // How many to show when the card is narrow; the rest collapse into a "+N" pill.
  collapsedMax?: number;
};

// The tech stack as filled pills, tinted with the site's green.
//
// When the card has room, every tag shows (wrapping onto a second line if needed);
// when it's narrow, only the first few + "+N". "Room" is a CSS container query: the
// nearest parent marked `@container` (the card's text column) is measured, not the screen,
// so the rule follows the card wherever it's placed. No JavaScript.
//   text column under 20rem (@xs) -> first `collapsedMax` tags + "+N"
//   20rem and up                  -> all tags
function ProjectTags({ tags, collapsedMax = 3 }: ProjectTagsProps) {
  const extra = tags.slice(collapsedMax);
  const pill = "rounded-full bg-glow/10 px-3 py-1 text-xs text-muted ring-1 ring-glow/10 ring-inset";

  return (
    <ul aria-label="Tech stack" className="flex flex-wrap gap-1.5">
      {tags.map((tag, i) => (
        <li key={tag} className={`${pill} ${i >= collapsedMax ? "hidden @xs:inline-flex" : ""}`}>
          {tag}
        </li>
      ))}

      {extra.length > 0 && (
        <li title={extra.join(", ")} className="px-1.5 py-1 text-xs text-subtle @xs:hidden">
          +{extra.length}
          {/* Only shown (and read) when the extra tags themselves are hidden */}
          <span className="sr-only">: {extra.join(", ")}</span>
        </li>
      )}
    </ul>
  );
}

export default ProjectTags;
