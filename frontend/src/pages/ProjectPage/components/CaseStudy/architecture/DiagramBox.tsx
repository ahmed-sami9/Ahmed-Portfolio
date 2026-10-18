import type { DiagramBox as DiagramBoxData } from "@/data/caseStudies/types";
import type { MonitorIcon } from "@/components/ui/icons";
import StepBadge from "./StepBadge";

type DiagramBoxProps = {
  box: DiagramBoxData;
  Icon: typeof MonitorIcon;
  highlight?: boolean; // the API is the heart of the system: a warmer border sets it apart
  className?: string; // lets the diagram give each box its share of the width
};

// One box of the architecture diagram: icon, name, what it's built with, and its inner parts.
function DiagramBox({ box, Icon, highlight = false, className = "" }: DiagramBoxProps) {
  const { title, subtitle, rows, step } = box;

  return (
    <div
      className={`relative min-w-0 rounded-xl border bg-bg/50 p-4 ${
        highlight ? "border-accent/40" : "border-line"
      } ${className}`}
    >
      {/* Icon beside the title, except when the boxes are side by side but still narrow
          (@2xl to @4xl on the diagram): there the icon moves above the title, so the title
          gets the box's full width. */}
      <div className="flex items-center gap-3 pr-7 @2xl:flex-col @2xl:items-start @2xl:pr-0 @4xl:flex-row @4xl:items-center @4xl:pr-7">
        {/* Light icon on the page's own dark green: amber stays reserved for the step numbers,
            so in this diagram amber means only one thing */}
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-bg text-text/90 ring-1 ring-line ring-inset">
          <Icon className="size-6" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-lg leading-tight text-text @2xl:text-base @4xl:text-lg">{title}</p>
          <p className="mt-0.5 text-xs text-muted">{subtitle}</p>
        </div>
      </div>
      {step !== undefined && (
        <span className="absolute top-4 right-4">
          <StepBadge step={step} />
        </span>
      )}

      {rows.length > 0 && (
        <ul className="mt-4 space-y-2">
          {rows.map((row) => (
            <li
              key={row.text}
              className="flex items-start gap-3 rounded-md bg-text/[0.03] px-3 py-2 font-mono text-[11px] leading-relaxed text-muted ring-1 ring-line ring-inset"
            >
              <span className="min-w-0 flex-1">{row.text}</span>
              {row.step !== undefined && <StepBadge step={row.step} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DiagramBox;
