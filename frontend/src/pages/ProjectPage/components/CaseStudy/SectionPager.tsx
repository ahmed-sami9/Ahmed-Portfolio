import type { CaseStudySectionInfo } from "./caseStudySections";
import PagerStep from "./PagerStep";

type SectionPagerProps = {
  sections: CaseStudySectionInfo[];
  activeIndex: number;
  onSelect: (id: string) => void;
};

// The end of every section on phones and tablets: a step back and a step forward, so the next
// (or previous) section is in reach without scrolling all the way back up to the tab row.
//
// Hidden from lg (1024px): there the sidebar is sticky and always beside the content, so a
// pager would only repeat it.
//
//   first section: only Next        middle: Previous | Next        last: only Previous
//
// From sm, two fixed columns so Next always sits on the right, even when there's no Previous,
// and both sides start on the same top line. On phones they stack: two long names side by side
// ("03 Authentication" next to "01 Architecture") don't fit in 360px.
// <nav> + its label: screen readers can list it and jump to it like any other navigation.
function SectionPager({ sections, activeIndex, onSelect }: SectionPagerProps) {
  const previous = sections[activeIndex - 1];
  const next = sections[activeIndex + 1];
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Previous and next section"
      className="mt-16 grid grid-cols-1 items-start gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:hidden"
    >
      {previous && (
        <div className="col-start-1 flex justify-start">
          <PagerStep
            section={previous}
            number={activeIndex}
            direction="previous"
            onSelect={onSelect}
          />
        </div>
      )}
      {next && (
        <div className="flex justify-end sm:col-start-2">
          <PagerStep section={next} number={activeIndex + 2} direction="next" onSelect={onSelect} />
        </div>
      )}
    </nav>
  );
}

export default SectionPager;
