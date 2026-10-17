import type { ReactNode } from "react";

type SectionProps = {
  id: string; // the anchor the navbar links to
  labelledBy: string; // id of the section's heading, so screen readers can name the region
  children: ReactNode;
  className?: string;
};

// The shared page-section wrapper: same width, side gutters and vertical rhythm everywhere.
//
// Nav jumps: the browser scrolls the section's top edge to `scroll-margin` below the screen top.
// But the heading sits under the top padding (py-24 / lg:py-32), so a plain jump would land
// it far down the screen. The scroll margin cancels most of that padding, so the heading lands
// ~2rem under the 5rem navbar:  margin = 5rem navbar + 2rem gap - top padding
//   phones/tablets: 5 + 2 - 6 =  1rem -> scroll-mt-4
//   lg and up:      5 + 2 - 8 = -1rem -> lg:-scroll-mt-4 (negative: scroll past the edge)
// Change the padding, and these two numbers must change with it.
function Section({ id, labelledBy, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`mx-auto w-full max-w-page scroll-mt-4 px-4 py-24 sm:px-6 lg:-scroll-mt-4 lg:px-8 lg:py-32 ${className}`}
    >
      {children}
    </section>
  );
}

export default Section;
