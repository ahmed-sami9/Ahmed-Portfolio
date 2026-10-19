import type { ReactNode } from "react";
import TextWithCode from "@/components/ui/TextWithCode";

type CaseStudySectionProps = {
  id: string; // must match the id in caseStudySections.ts
  number: number; // its position in the deep dive, shown as 01, 02...
  title: string;
  summary: string; // may contain `code`
  children: ReactNode;
};

// The shared wrapper of every deep-dive section: anchor, heading with its number,
// one-paragraph summary, then the section's own content.
// The number echoes the project cards (01, 02...) so the deep dive reads as one numbered document.
function CaseStudySection({ id, number, title, summary, children }: CaseStudySectionProps) {
  const headingId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={headingId}>
      <div className="flex items-baseline justify-between gap-4">
        <h3 id={headingId} className="font-display text-3xl tracking-tight text-text sm:text-4xl">
          {title}
        </h3>
        <span aria-hidden className="font-display text-xl text-subtle">
          {String(number).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted">
        <TextWithCode text={summary} />
      </p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default CaseStudySection;
