import { CheckIcon } from "@/components/ui/icons";
import TextWithCode from "@/components/ui/TextWithCode";
import type { KeyDecision } from "@/data/caseStudies/types";
import BlockFrame from "../BlockFrame";
import CodeRefLinks from "./CodeRefLinks";

const FACT_ROW = "grid gap-1 @xl:grid-cols-[6.5rem_minmax(0,1fr)] @xl:gap-6";

type DecisionCardProps = {
  decision: KeyDecision;
  repoUrl?: string;
};

// One decision, read top to bottom: the question (the frame's title), the obvious way beside
// what was built, then the cost and where it lives in the code.
//
// The two options are told apart without reading a word: the obvious way is dashed, muted and
// struck through ("not this"), the chosen one is solid with a faint green wash and green checks.
// Side by side once the frame has 42rem of its own width (@2xl), stacked below that.
function DecisionCard({ decision, repoUrl }: DecisionCardProps) {
  const { question, obvious, chosen, cost, code } = decision;

  return (
    <BlockFrame title={question}>
      {/* items-start: the rejected option stays as small as it is instead of stretching to
          match the chosen one, so the weight difference is visible at a glance */}
      <div className="grid items-start gap-3 @2xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="rounded-xl border border-dashed border-line px-4 py-3">
          <p className="font-mono text-[11px] tracking-wider text-subtle uppercase">
            The obvious way
          </p>
          {/* the strike is decoration: the label above already says "not this" to screen readers */}
          <p className="mt-2 text-sm text-muted line-through decoration-subtle/70">
            {obvious.option}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-subtle">
            <TextWithCode text={obvious.why} />
          </p>
        </div>

        <div className="rounded-xl border border-glow/25 bg-glow/[0.04] px-4 py-3">
          <p className="font-mono text-[11px] tracking-wider text-subtle uppercase">What I built</p>
          <p className="mt-2 text-sm font-medium text-text">{chosen.option}</p>
          <ul className="mt-2.5 space-y-1.5">
            {chosen.how.map((line) => (
              <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <CheckIcon className="mt-1 size-3.5 shrink-0 text-glow" />
                <span>
                  <TextWithCode text={line} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* A <dl>: two labelled facts. The labels get their own column when there's room,
          so the cost and the code links line up across every decision. */}
      <dl className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
        <div className={FACT_ROW}>
          <dt className="text-subtle">The cost</dt>
          <dd className="leading-relaxed text-muted">
            <TextWithCode text={cost} />
          </dd>
        </div>
        <div className={FACT_ROW}>
          <dt className="text-subtle @xl:pt-1">In the code</dt>
          <dd>
            <CodeRefLinks refs={code} repoUrl={repoUrl} />
          </dd>
        </div>
      </dl>
    </BlockFrame>
  );
}

export default DecisionCard;
