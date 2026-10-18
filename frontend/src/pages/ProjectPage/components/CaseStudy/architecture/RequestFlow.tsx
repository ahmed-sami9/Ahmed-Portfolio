import TextWithCode from "@/components/ui/TextWithCode";
import type { Architecture } from "@/data/caseStudies/types";
import StepBadge from "./StepBadge";

type RequestFlowProps = {
  flow: Architecture["requestFlow"];
};

// One real action traced through every layer, numbered to match the diagram's badges.
// An <ol>, because the order IS the content.
// Columns follow the space this block gets (container query): 1, then 2, then 3 per row.
function RequestFlow({ flow }: RequestFlowProps) {
  const lastSpan = lastStepSpan(flow.steps.length);

  return (
    <div className="@container">
      <ol className="grid gap-3 @xl:grid-cols-2 @4xl:grid-cols-3">
        {flow.steps.map((step, i) => (
          <li
            key={step}
            className={`flex gap-3 rounded-lg border border-line bg-text/[0.02] px-4 py-3 text-sm leading-relaxed text-muted ${
              i === flow.steps.length - 1 ? lastSpan : ""
            }`}
          >
            <span className="pt-0.5">
              <StepBadge step={i + 1} />
            </span>
            <span className="min-w-0">
              <TextWithCode text={step} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// If the last step would sit alone on its own row, stretch it across the whole row, so the
// grid ends cleanly (and the final step, the end of the journey, reads as the conclusion).
// It checks both layouts: 2 columns (@xl) and 3 columns (@4xl).
function lastStepSpan(count: number) {
  const aloneIn2 = count % 2 === 1;
  const aloneIn3 = count % 3 === 1;
  return [
    aloneIn2 ? "@xl:col-span-2" : "",
    aloneIn3 ? "@4xl:col-span-3" : aloneIn2 ? "@4xl:col-span-1" : "",
  ].join(" ");
}

export default RequestFlow;
