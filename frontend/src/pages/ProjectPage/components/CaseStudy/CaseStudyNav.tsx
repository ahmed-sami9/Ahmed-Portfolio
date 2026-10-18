import { useMemo } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToSection } from "@/utils/scrollToSection";
import type { CaseStudySectionInfo } from "./caseStudySections";

type CaseStudyNavProps = {
  sections: CaseStudySectionInfo[];
};

// The deep dive's sidebar: one entry per section, the one you're reading highlighted.
// It reuses useActiveSection, the same hook that highlights the navbar on the home page.
//
//   phones/tablets: a horizontal row above the content; it scrolls sideways inside itself
//                   if the labels don't fit (the page itself never scrolls sideways)
//   lg and up:      a vertical list that stays in view (sticky) while the sections scroll
//
// Sections that aren't built yet stay visible but muted with "soon", so the structure of the
// deep dive is clear from day one. They aren't buttons, so they can't be clicked or tabbed to.
function CaseStudyNav({ sections }: CaseStudyNavProps) {
  const readyIds = useMemo(
    () => sections.filter((section) => section.ready).map((section) => section.id),
    [sections],
  );
  const activeId = useActiveSection(readyIds);

  return (
    <nav aria-label="Technical details sections" className="lg:sticky lg:top-24 lg:self-start">
      <ul className="-mx-1 flex gap-1 overflow-x-auto pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:pb-0">
        {sections.map(({ id, label, Icon, ready }) => {
          const isActive = ready && id === activeId;
          const row =
            // one line in the phone row (it scrolls sideways); free to wrap in the narrow sidebar
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm whitespace-nowrap lg:whitespace-normal";

          return (
            <li key={id} className="shrink-0">
              {ready ? (
                <button
                  type="button"
                  onClick={() => scrollToSection(id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`${row} transition-colors ${
                    isActive
                      ? "bg-accent/10 text-text shadow-[inset_2px_0_0_var(--color-accent)]"
                      : "text-muted hover:bg-text/5 hover:text-text"
                  }`}
                >
                  <Icon className={`size-4 shrink-0 ${isActive ? "text-accent" : ""}`} />
                  {label}
                </button>
              ) : (
                <span className={`${row} text-subtle/70`}>
                  <Icon className="size-4 shrink-0" />
                  {label}
                  <span className="ml-auto pl-2 font-mono text-[10px] tracking-wider uppercase">
                    soon
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default CaseStudyNav;
