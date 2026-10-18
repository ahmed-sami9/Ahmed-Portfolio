import type { LinkSide } from "@/data/caseStudies/types";
import StepBadge from "./StepBadge";

type LinkLabelProps = {
  side: LinkSide;
};

// One label of a diagram connection: "② Request" or "⑥ Response".
function LinkLabel({ side }: LinkLabelProps) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs whitespace-nowrap text-muted">
      {side.step !== undefined && <StepBadge step={side.step} />}
      {side.label}
    </span>
  );
}

export default LinkLabel;
