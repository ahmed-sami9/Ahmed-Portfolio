import type { Authentication } from "@/data/caseStudies/types";
import BlockFrame from "../BlockFrame";
import CaseStudySection from "../CaseStudySection";
import CodeShowcase from "../CodeShowcase";
import PointList from "../PointList";
import AuthFlows from "./AuthFlows";
import ThreatTable from "./ThreatTable";

type AuthenticationSectionProps = {
  authentication: Authentication;
  number: number;
};

// "How do teachers get in, and what keeps others out?", read in this order:
//   1. four ways in, one session: the design at a glance
//   2. if someone tries to…: every choice next to the attack it's for
//   3. design decisions: the trade-offs, honestly
//   4. the Google linking query: the proof, in code
// The same rhythm as Database (picture → guarantees → decisions → code), so sections read alike.
//
// Each part is its own BlockFrame (border + one amber corner), so the long section reads as
// four clear blocks.
function AuthenticationSection({ authentication, number }: AuthenticationSectionProps) {
  const { summary, flows, session, threats, decisions, code } = authentication;

  return (
    <CaseStudySection
      id="authentication"
      number={number}
      title="Authentication"
      summary={summary}
    >
      <div className="space-y-6">
        <BlockFrame title="Four ways in, one session">
          <AuthFlows flows={flows} session={session} />
        </BlockFrame>

        <BlockFrame title="If someone tries to…">
          <ThreatTable threats={threats} />
        </BlockFrame>

        <BlockFrame title="Design decisions">
          <PointList points={decisions} columns={3} />
        </BlockFrame>

        <BlockFrame title="The code" subtitle={code.question}>
          <CodeShowcase sample={code} />
        </BlockFrame>
      </div>
    </CaseStudySection>
  );
}

export default AuthenticationSection;
