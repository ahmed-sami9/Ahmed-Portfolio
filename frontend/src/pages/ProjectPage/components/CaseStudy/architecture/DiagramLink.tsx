import { ArrowRightIcon } from "@/components/ui/icons";
import type { DiagramLink as DiagramLinkData } from "@/data/caseStudies/types";
import LinkLabel from "./LinkLabel";

type DiagramLinkProps = {
  link: DiagramLinkData;
};

// The two-way connection between two diagram boxes, kept abstract so it reads in a glance:
// what goes there (the request) and what comes back (the response). Nothing else.
//
// The same shape at every size, just turned (a container query on ArchitectureDiagram):
//   boxes side by side: "Request" above a  ←——→  line, "Response" below it; it sits at the
//                       height of the boxes' titles (pt-12), since the boxes are top-aligned
//   boxes stacked:      "Request" left of a vertical ↕ line, "Response" right of it
//                       (a 3-column grid: label | line | label, centered)
function DiagramLink({ link }: DiagramLinkProps) {
  const { request, response } = link;

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-3 py-1 @2xl:flex @2xl:w-28 @2xl:shrink-0 @2xl:flex-col @2xl:items-center @2xl:gap-2 @2xl:px-2 @2xl:pt-12 @2xl:pb-0 @4xl:w-32">
      <span className="justify-self-end">
        <LinkLabel side={request} />
      </span>

      {/* The line with an arrowhead at each end: vertical when stacked, horizontal side by side */}
      <span
        aria-hidden
        className="flex flex-col items-center justify-self-center text-accent @2xl:w-full @2xl:flex-row"
      >
        <ArrowRightIcon className="-mb-1.5 size-3.5 shrink-0 -rotate-90 @2xl:mb-0 @2xl:-mr-1.5 @2xl:rotate-180" />
        <span className="h-10 w-px bg-accent/60 @2xl:h-px @2xl:w-auto @2xl:flex-1" />
        <ArrowRightIcon className="-mt-1.5 size-3.5 shrink-0 rotate-90 @2xl:mt-0 @2xl:-ml-1.5 @2xl:rotate-0" />
      </span>

      <span className="justify-self-start">
        <LinkLabel side={response} />
      </span>
    </div>
  );
}

export default DiagramLink;
