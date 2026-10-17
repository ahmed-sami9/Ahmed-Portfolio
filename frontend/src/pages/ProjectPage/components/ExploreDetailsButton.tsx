import { ArrowRightIcon } from "@/components/ui/icons";

// The section the button leads to. The technical deep dive (next phase) will use this id.
export const TECHNICAL_DETAILS_ID = "technical-details";

// "Explore the technical details": the bridge from the panel (for everyone) to the deep dive
// (for engineers) below it. It scrolls down to that section, smoothly unless the visitor
// prefers reduced motion (the global scroll-behavior in index.css handles that).
//
// A button, not a #link: the section is on this same page, and a link would add a history
// entry, so Back would first scroll up again instead of closing the project.
// Until the deep dive exists there's nothing to scroll to, so the click does nothing.
function ExploreDetailsButton() {
  const scrollToDetails = () => {
    document.getElementById(TECHNICAL_DETAILS_ID)?.scrollIntoView();
  };

  return (
    <button
      type="button"
      onClick={scrollToDetails}
      className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-accent/40 py-3 text-sm text-accent transition-colors hover:bg-accent/5 short:mt-6"
    >
      Explore the technical details
      <ArrowRightIcon className="size-4 rotate-90 transition-transform motion-safe:group-hover:translate-y-0.5" />
    </button>
  );
}

export default ExploreDetailsButton;
