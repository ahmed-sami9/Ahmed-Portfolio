import type { ReactNode } from "react";

type CaseStudySectionProps = {
  id: string; // must match the id in caseStudySections.ts, so the sidebar can find it
  title: string;
  summary: string;
  children: ReactNode;
};

// The shared wrapper of every deep-dive section: anchor, heading, one-paragraph summary,
// then the section's own content. Every section looks consistent without repeating this.
function CaseStudySection({ id, title, summary, children }: CaseStudySectionProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      tabIndex={-1} // so the sidebar can move focus here
      className="scroll-mt-24 outline-none"
    >
      <h3 id={headingId} className="font-display text-3xl tracking-tight text-text sm:text-4xl">
        {title}
      </h3>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted">{summary}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default CaseStudySection;
