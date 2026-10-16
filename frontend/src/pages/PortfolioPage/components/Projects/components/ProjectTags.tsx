type ProjectTagsProps = {
  tags: string[];
  max?: number; // show at most this many, then a "+N" for the rest
};

// The tech stack as small pills, kept to one line in the compact card.
function ProjectTags({ tags, max = tags.length }: ProjectTagsProps) {
  const shown = tags.slice(0, max);
  const hidden = tags.slice(max);

  return (
    <ul aria-label="Tech stack" className="flex flex-wrap gap-1.5">
      {shown.map((tag) => (
        <li key={tag} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
          {tag}
        </li>
      ))}
      {hidden.length > 0 && (
        // The full list is still there for screen readers and on hover (title)
        <li
          title={hidden.join(", ")}
          className="rounded-full px-1.5 py-0.5 text-xs text-subtle"
        >
          +{hidden.length}
          <span className="sr-only">: {hidden.join(", ")}</span>
        </li>
      )}
    </ul>
  );
}

export default ProjectTags;
