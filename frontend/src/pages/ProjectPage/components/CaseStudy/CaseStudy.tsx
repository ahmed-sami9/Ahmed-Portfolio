import { useMemo } from "react";
import type { CaseStudy as CaseStudyData } from "@/data/caseStudies/types";
import PanelCorners from "../PanelCorners";
import ArchitectureSection from "./architecture/ArchitectureSection";
import CaseStudyNav from "./CaseStudyNav";
import { CASE_STUDY_ID, getCaseStudySections } from "./caseStudySections";

type CaseStudyProps = {
  caseStudy: CaseStudyData;
};

// The technical deep dive: one framed box under the project panel (same frame, same corners),
// a sidebar of its sections, and the sections themselves.
//
// Always on the page, never collapsed: a visitor reaches it by clicking "Explore the technical
// details" OR by simply scrolling. Nothing is hidden behind a click.
//
// Layout: on phones/tablets the sidebar becomes a row of links above the content;
// from lg (1024px) it's a column on the left that stays in view while you scroll.
function CaseStudy({ caseStudy }: CaseStudyProps) {
  const sections = useMemo(() => getCaseStudySections(caseStudy), [caseStudy]);

  return (
    <section
      id={CASE_STUDY_ID}
      aria-labelledby="case-study-title"
      tabIndex={-1} // so "Explore the technical details" can move focus here
      className="relative mt-10 scroll-mt-24 rounded-2xl border border-line bg-text/[0.02] p-5 outline-none sm:p-7 lg:p-6 xl:p-8"
    >
      <PanelCorners />

      <h2
        id="case-study-title"
        className="font-mono text-xs tracking-[0.25em] text-accent uppercase"
      >
        Technical details
      </h2>

      {/*
        minmax(0, 1fr) on every column: a grid column otherwise grows to fit its widest content
        (here, the sidebar's one-line row of links on phones), which would push the whole box,
        and the page, wider than the screen. With a 0 minimum, the column takes the space it's
        given and the wide content scrolls inside itself instead.
      */}
      {/* The sidebar starts narrow on laptops (so the diagram fits side by side from 1024px)
          and gets its width back as the screen grows. */}
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[10.5rem_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-8 2xl:grid-cols-[13rem_minmax(0,1fr)] 2xl:gap-10">
        <CaseStudyNav sections={sections} />

        <div className="space-y-20">
          {caseStudy.architecture && <ArchitectureSection architecture={caseStudy.architecture} />}
        </div>
      </div>
    </section>
  );
}

export default CaseStudy;
