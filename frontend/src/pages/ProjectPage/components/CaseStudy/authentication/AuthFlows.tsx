import type { Authentication } from "@/data/caseStudies/types";
import FlowCard from "./FlowCard";
import FlowLines from "./FlowLines";
import FlowTrunk from "./FlowTrunk";
import SessionBox from "./SessionBox";

type AuthFlowsProps = {
  flows: Authentication["flows"];
  session: Authentication["session"];
};

// "Four ways in, one session": the four flow cards, the lines joining them, and the one
// Session box they all lead to. It mirrors the code: every flow ends in startTeacherSession.
//
// Layout by the block's own width (@container in BlockFrame):
//   36rem and up: 2 × 2. Wide cards on purpose: four in a row made them ~200px wide, so every
//                 step wrapped and the cards grew tall. Lines join through the middle gap.
//   below:        stacked (phones), with only the trunk into the session.
// The gaps are part of the drawing: FlowLines assumes gap-x-8 and gap-y-4.
//
// Screen readers get a list of four ways in, then the session; the lines are decoration.
function AuthFlows({ flows, session }: AuthFlowsProps) {
  return (
    <div>
      <ul className="grid gap-4 @xl:grid-cols-2 @xl:gap-x-8">
        {flows.map((flow, i) => (
          <li key={flow.title} className="relative">
            <FlowCard flow={flow} />
            <FlowLines index={i} total={flows.length} />
          </li>
        ))}
      </ul>
      <FlowTrunk />
      <SessionBox session={session} />
    </div>
  );
}

export default AuthFlows;
