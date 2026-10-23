import { useMemo, useRef } from "react";
import type { CaseStudy as CaseStudyData } from "@/data/caseStudies/types";
import FrameCorners from "@/components/ui/FrameCorners";
import ArchitectureSection from "./architecture/ArchitectureSection";
import AuthenticationSection from "./authentication/AuthenticationSection";
import CaseStudyNav from "./CaseStudyNav";
import { CASE_STUDY_ID, getCaseStudySections } from "./caseStudySections";
import DatabaseSection from "./database/DatabaseSection";
import KeyDecisionsSection from "./decisions/KeyDecisionsSection";
import SectionPager from "./SectionPager";
import { useCaseStudyTab } from "./useCaseStudyTab";

type CaseStudyProps = {
  caseStudy: CaseStudyData;
  repoUrl?: string; // the project's GitHub repo: sections link their claims to the real files
};

// The technical deep dive: one framed box under the project panel (same frame, same corners),
// with a sidebar of tabs and ONE section at a time, so the details are read step by step
// instead of as one long wall. Below lg, each section ends with Previous / Next steps (from lg
// the sticky sidebar is always in view, so they'd only repeat it).
//
// The open section lives in the URL (?section=), see useCaseStudyTab.
//
// Layout: on phones/tablets the tabs are a row above the content; from lg (1024px) they're a
// column on the left that stays in view.
function CaseStudy({ caseStudy, repoUrl }: CaseStudyProps) {
  const sections = useMemo(() => getCaseStudySections(caseStudy), [caseStudy]);
  const { activeId, select } = useCaseStudyTab(sections);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeIndex = sections.findIndex((section) => section.id === activeId);
  const number = activeIndex + 1; // a section's number is its place in the list: 01, 02...

  // A new section starts at its beginning: if the top of the box has scrolled out of view,
  // bring it back (smoothly, per the global scroll-behavior, which respects reduced motion).
  const showTopOfBox = () => {
    const box = document.getElementById(CASE_STUDY_ID);
    if (box && box.getBoundingClientRect().top < 0) box.scrollIntoView();
  };

  const openSection = (id: string) => {
    select(id);
    showTopOfBox();
  };

  // From the pager the focus must move too: the pager is replaced along with the old section,
  // so keyboard and screen-reader users continue from the new section's beginning.
  const openFromPager = (id: string) => {
    openSection(id);
    requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));
  };

  return (
    <section
      id={CASE_STUDY_ID}
      aria-labelledby="case-study-title"
      tabIndex={-1} // so "Explore the technical details" can move focus here
      className="relative mt-10 scroll-mt-24 rounded-2xl border border-line bg-text/[0.02] p-5 outline-none sm:p-7 lg:p-6 xl:p-8"
    >
      <FrameCorners />

      <h2
        id="case-study-title"
        className="font-mono text-xs tracking-[0.25em] text-accent uppercase"
      >
        Technical details
      </h2>

      {/*
        minmax(0, 1fr) on every column: a grid column otherwise grows to fit its widest content
        (here, the tabs' one-line row on phones), which would push the whole box, and the page,
        wider than the screen. With a 0 minimum, the column takes the space it's given and the
        wide content scrolls inside itself instead.
        The sidebar starts narrow on laptops (so the diagrams fit beside it from 1024px) and
        gets its width back as the screen grows.
      */}
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[10.5rem_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-8 2xl:grid-cols-[13rem_minmax(0,1fr)] 2xl:gap-10">
        <CaseStudyNav sections={sections} activeId={activeId} onSelect={openSection} />

        {activeId && (
          <div
            ref={panelRef}
            role="tabpanel"
            id={`panel-${activeId}`}
            aria-labelledby={`tab-${activeId}`}
            tabIndex={-1}
            className="outline-none"
          >
            {activeId === "architecture" && caseStudy.architecture && (
              <ArchitectureSection architecture={caseStudy.architecture} number={number} />
            )}
            {activeId === "database" && caseStudy.database && (
              <DatabaseSection database={caseStudy.database} number={number} />
            )}
            {activeId === "authentication" && caseStudy.authentication && (
              <AuthenticationSection authentication={caseStudy.authentication} number={number} />
            )}
            {activeId === "key-decisions" && caseStudy.keyDecisions && (
              <KeyDecisionsSection
                keyDecisions={caseStudy.keyDecisions}
                number={number}
                repoUrl={repoUrl}
              />
            )}

            <SectionPager sections={sections} activeIndex={activeIndex} onSelect={openFromPager} />
          </div>
        )}
      </div>
    </section>
  );
}

export default CaseStudy;
