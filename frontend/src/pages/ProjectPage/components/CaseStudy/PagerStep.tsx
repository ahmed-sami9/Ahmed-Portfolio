import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import type { CaseStudySectionInfo } from "./caseStudySections";

type PagerStepProps = {
  section: CaseStudySectionInfo;
  number: number; // its place in the list, shown as 01, 02...
  direction: "previous" | "next";
  onSelect: (id: string) => void;
};

// One side of the pager at the end of a section: "Previous" on the left, "Next" on the right,
// each showing where it leads (number + name), the way documentation sites do it.
//
// A section that isn't built yet shows as muted text with "Coming soon" instead of a button,
// so there's never a click that leads nowhere.
function PagerStep({ section, number, direction, onSelect }: PagerStepProps) {
  const isNext = direction === "next";
  const align = isNext ? "items-end text-right" : "items-start text-left";

  const label = (
    <>
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase">
        {isNext ? "Next" : "Previous"}
      </span>
      {/* bright only when it's a real link; a "Coming soon" name must not look clickable */}
      <span
        className={`font-display text-lg tracking-tight sm:text-2xl ${
          section.ready ? "text-text" : "text-muted"
        }`}
      >
        <span aria-hidden className="mr-2 text-subtle sm:mr-3">
          {String(number).padStart(2, "0")}
        </span>
        {section.label}
      </span>
    </>
  );

  if (!section.ready) {
    return (
      <div className={`flex flex-col gap-1 text-subtle ${align}`}>
        {label}
        <span className="text-sm">Coming soon</span>
      </div>
    );
  }

  const Arrow = isNext ? ArrowRightIcon : ArrowLeftIcon;
  return (
    <button
      type="button"
      onClick={() => onSelect(section.id)}
      className={`group flex items-end gap-3 text-accent ${isNext ? "flex-row-reverse" : ""}`}
    >
      <Arrow
        className={`mb-1.5 size-5 shrink-0 transition-transform ${
          isNext ? "motion-safe:group-hover:translate-x-1" : "motion-safe:group-hover:-translate-x-1"
        }`}
      />
      <span className={`flex flex-col gap-1 ${align}`}>{label}</span>
    </button>
  );
}

export default PagerStep;
