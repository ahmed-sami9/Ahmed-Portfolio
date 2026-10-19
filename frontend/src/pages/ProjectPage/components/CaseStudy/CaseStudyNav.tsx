import { useEffect, useRef, type KeyboardEvent } from "react";
import type { CaseStudySectionInfo } from "./caseStudySections";

type CaseStudyNavProps = {
  sections: CaseStudySectionInfo[];
  activeId: string | undefined;
  onSelect: (id: string) => void;
};

// The deep dive's sidebar: one tab per section. Only the selected section is shown, so the
// visitor goes through the technical details one step at a time.
//
//   phones/tablets: a horizontal row above the content; it scrolls sideways inside itself
//                   if the labels don't fit (the page itself never scrolls sideways)
//   lg and up:      a vertical list that stays in view (sticky)
//
// Accessibility: the WAI-ARIA "tabs" pattern. Screen readers announce "tab, 2 of 6, selected";
// only the selected tab is in the Tab order (roving tabindex), and the arrow keys move between
// tabs and open them (Home / End jump to the first / last).
//
// Sections that aren't built yet stay visible with "soon" so the structure is clear from day
// one. They're marked aria-disabled and the arrow keys skip them.
function CaseStudyNav({ sections, activeId, onSelect }: CaseStudyNavProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const readyIds = sections.filter((section) => section.ready).map((section) => section.id);

  // Phones: if the selected tab is outside the sideways-scrolling row, slide the ROW (not the
  // page) so it's visible. scrollIntoView would also scroll the page, so it's done by hand.
  useEffect(() => {
    const list = listRef.current;
    const tab = activeId ? tabRefs.current.get(activeId) : undefined;
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;

    const listBox = list.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();
    if (tabBox.left < listBox.left || tabBox.right > listBox.right) {
      list.scrollTo({ left: list.scrollLeft + tabBox.left - listBox.left - 8, behavior: "smooth" });
    }
  }, [activeId]);

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const current = readyIds.indexOf(activeId ?? "");
    const moves: Record<string, number> = {
      ArrowDown: current + 1,
      ArrowRight: current + 1,
      ArrowUp: current - 1,
      ArrowLeft: current - 1,
      Home: 0,
      End: readyIds.length - 1,
    };
    if (!(event.key in moves)) return;

    event.preventDefault(); // the arrow keys would otherwise also scroll the page
    // Wrap around at both ends, like most tab lists
    const nextIndex = (moves[event.key] + readyIds.length) % readyIds.length;
    const nextId = readyIds[nextIndex];
    onSelect(nextId);
    tabRefs.current.get(nextId)?.focus();
  };

  return (
    <nav aria-label="Technical details" className="lg:sticky lg:top-24 lg:self-start">
      <ul
        ref={listRef}
        role="tablist"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-1 flex gap-1 overflow-x-auto pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {sections.map(({ id, label, Icon, ready }, index) => {
          const isActive = ready && id === activeId;
          const row =
            // one line in the phone row (it scrolls sideways); free to wrap in the narrow sidebar
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm whitespace-nowrap lg:whitespace-normal";

          return (
            <li key={id} role="presentation" className="shrink-0">
              {ready ? (
                <button
                  ref={(el) => {
                    if (el) tabRefs.current.set(id, el);
                    else tabRefs.current.delete(id);
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onSelect(id)}
                  className={`${row} transition-colors ${
                    isActive
                      ? "bg-accent/10 text-text shadow-[inset_2px_0_0_var(--color-accent)]"
                      : "text-muted hover:bg-text/5 hover:text-text"
                  }`}
                >
                  <Icon className={`size-4 shrink-0 ${isActive ? "text-accent" : ""}`} />
                  <span>
                    <span aria-hidden className="mr-2 font-mono text-[11px] text-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {label}
                  </span>
                </button>
              ) : (
                <span
                  role="tab"
                  aria-disabled="true"
                  aria-selected={false}
                  tabIndex={-1}
                  className={`${row} text-subtle/70`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>
                    <span aria-hidden className="mr-2 font-mono text-[11px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {label}
                    {/* beside the label in the phone row; under it in the narrow sidebar,
                        where "Authentication" + "soon" side by side wouldn't fit */}
                    <span className="ml-2 font-mono text-[10px] tracking-wider uppercase lg:mt-0.5 lg:ml-0 lg:block">
                      soon
                    </span>
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default CaseStudyNav;
