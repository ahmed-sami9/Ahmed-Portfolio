type SectionHeadingProps = {
  eyebrow: string; // small mono label above the title, e.g. "My projects"
  title: string;
  id: string; // used by the section's aria-labelledby
};

// The heading pattern every section shares: amber mono eyebrow + large serif title.
function SectionHeading({ eyebrow, title, id }: SectionHeadingProps) {
  return (
    <div>
      <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-display text-4xl tracking-tight text-text sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}

export default SectionHeading;
