// The "why click" lines: what's technically interesting, a few words each.
// Stacked, not joined by dots: a dot-joined line wraps with a stray dot starting the next line.
function ProjectHighlights({ items }: { items: string[] }) {
  return (
    <ul aria-label="Highlights" className="space-y-1 font-mono text-xs text-subtle">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden className="text-accent/70">
            ›
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default ProjectHighlights;
