import type { ReactNode } from "react";

type SectionProps = {
  id: string; // the anchor the navbar links to
  labelledBy: string; // id of the section's heading, so screen readers can name the region
  children: ReactNode;
  className?: string;
};

// The shared page-section wrapper: same width, side gutters and vertical rhythm everywhere.
function Section({ id, labelledBy, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32 ${className}`}
    >
      {children}
    </section>
  );
}

export default Section;
