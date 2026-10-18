import { ArrowRightIcon } from "@/components/ui/icons";
import { scrollToSection } from "@/utils/scrollToSection";
import { CASE_STUDY_ID } from "./CaseStudy/caseStudySections";

// "Explore the technical details": the bridge from the panel (for everyone) to the deep dive
// (for engineers) below it. It scrolls down to the deep-dive box and moves focus there
// (scrollToSection explains why it's a button and not a #link).
// If a project has no deep dive yet, there's nothing to scroll to and the click does nothing.
function ExploreDetailsButton() {
  return (
    <button
      type="button"
      onClick={() => scrollToSection(CASE_STUDY_ID)}
      className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-accent/40 py-3 text-sm text-accent transition-colors hover:bg-accent/5 short:mt-6"
    >
      Explore the technical details
      <ArrowRightIcon className="size-4 rotate-90 transition-transform motion-safe:group-hover:translate-y-0.5" />
    </button>
  );
}

export default ExploreDetailsButton;
