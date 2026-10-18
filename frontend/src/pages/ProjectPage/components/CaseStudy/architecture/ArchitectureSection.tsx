import type { Architecture } from "@/data/caseStudies/types";
import CaseStudySection from "../CaseStudySection";
import GroupFrame from "../GroupFrame";
import SectionBlock from "../SectionBlock";
import ArchitectureDiagram from "./ArchitectureDiagram";
import PointList from "./PointList";
import RequestFlow from "./RequestFlow";
import RuleCallout from "./RuleCallout";

type ArchitectureSectionProps = {
  architecture: Architecture;
};

// "How is it put together?", read in this order:
//   1. the summary and the diagram: the whole system at a glance
//   2. the backend layers, next to the rule that explains them
//   3. the frontend layers
//   4. one real request traced through all of it (numbers match the diagram)
//
// The two-column parts use a container query on this section's own width (see the
// @container below), for the same reason as the diagram: the sidebar shares the row.
function ArchitectureSection({ architecture }: ArchitectureSectionProps) {
  const { summary, diagram, backendLayers, rule, notes, frontendLayers, requestFlow } =
    architecture;

  return (
    <CaseStudySection id="architecture" title="Architecture" summary={summary}>
      <ArchitectureDiagram diagram={diagram} />

      {/* Each frame is one part of the system: the backend (its layers + the rule behind them)
          and the frontend. The frame tells the visitor the blocks inside belong together. */}
      <div className="@container mt-12 space-y-6">
        <GroupFrame>
          <div className="grid gap-8 @3xl:grid-cols-[1.2fr_1fr] @3xl:gap-6">
            <SectionBlock title="Backend layers">
              <PointList points={backendLayers} numbered />
            </SectionBlock>

            <SectionBlock title="The rule behind them">
              <div className="space-y-3">
                <RuleCallout rule={rule} />
                <PointList points={notes} />
              </div>
            </SectionBlock>
          </div>
        </GroupFrame>

        <GroupFrame>
          <SectionBlock title="Frontend layers">
            <PointList points={frontendLayers} numbered columns />
          </SectionBlock>
        </GroupFrame>
      </div>

      <SectionBlock title="Request flow" subtitle={requestFlow.title} className="mt-12">
        <RequestFlow flow={requestFlow} />
      </SectionBlock>
    </CaseStudySection>
  );
}

export default ArchitectureSection;
