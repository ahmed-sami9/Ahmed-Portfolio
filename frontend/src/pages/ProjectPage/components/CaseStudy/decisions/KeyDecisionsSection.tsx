import type { KeyDecisions } from "@/data/caseStudies/types";
import CaseStudySection from "../CaseStudySection";
import RuleCallout from "../RuleCallout";
import DecisionCard from "./DecisionCard";

type KeyDecisionsSectionProps = {
  keyDecisions: KeyDecisions;
  number: number;
  repoUrl?: string;
};

// "Why is it built this way?", as a stack of short decision records, then the one idea they
// share. Each decision is complete on its own, so a visitor can stop after any of them.
// Unlike the other sections, there's no diagram or code block: the proof is a link to the
// real file, under every decision.
function KeyDecisionsSection({ keyDecisions, number, repoUrl }: KeyDecisionsSectionProps) {
  const { summary, decisions, principle } = keyDecisions;

  return (
    <CaseStudySection id="key-decisions" number={number} title="Key decisions" summary={summary}>
      <div className="space-y-6">
        {decisions.map((decision) => (
          <DecisionCard key={decision.question} decision={decision} repoUrl={repoUrl} />
        ))}
      </div>

      <div className="mt-8">
        <RuleCallout rule={principle} />
      </div>
    </CaseStudySection>
  );
}

export default KeyDecisionsSection;
