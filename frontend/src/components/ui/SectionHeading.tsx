type SectionHeadingProps = {
  eyebrow: string; // small mono label above the title, e.g. "My projects"
  title: string;
  id: string; // used by the section's aria-labelledby
  description?: string; // optional one-line intro under the title
};

// The heading pattern every section shares: amber mono eyebrow + large serif title,
// and an optional short intro line.
function SectionHeading({ eyebrow, title, id, description }: SectionHeadingProps) {
  return (
    <div>
      <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-display text-4xl tracking-tight text-text sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted">{description}</p>
      )}
    </div>
  );
}

export default SectionHeading;
