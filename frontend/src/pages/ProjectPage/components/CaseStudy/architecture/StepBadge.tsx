type StepBadgeProps = {
  step: number;
};

// A solid amber numbered circle. The same badges appear in the diagram and in the request
// flow below it, so "step 3" in the walkthrough is instantly the ③ in the diagram.
// Solid (not outlined) on purpose: they must read as one numbered sequence at a glance,
// standing out from everything else in the boxes. The faint ring is a halo that lifts
// them off busy backgrounds.
function StepBadge({ step }: StepBadgeProps) {
  return (
    <span className="inline-grid size-5 shrink-0 place-items-center rounded-full bg-accent font-mono text-[11px] font-medium text-on-accent ring-4 ring-accent/15">
      <span className="sr-only">Step </span>
      {step}
    </span>
  );
}

export default StepBadge;
