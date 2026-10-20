import TextWithCode from "@/components/ui/TextWithCode";
import type { Point } from "@/data/caseStudies/types";

type PointListProps = {
  points: Point[];
  numbered?: boolean; // layers have an order (01, 02...); notes don't
  // side by side when the surrounding @container is wide enough. 3 has its own, wider breakpoint
  // and skips the 2-column step: three items in two columns would leave one alone on a row.
  columns?: 1 | 2 | 3;
};

const LAYOUT = {
  1: "space-y-3",
  2: "grid gap-3 @3xl:grid-cols-2",
  3: "grid gap-3 @min-[50rem]:grid-cols-3",
};

// A list of titled points, shared by every deep-dive section: layers, notes, decisions...
// Numbered = an <ol>, because the order means something (routes come before controllers).
function PointList({ points, numbered = false, columns = 1 }: PointListProps) {
  const List = numbered ? "ol" : "ul";

  return (
    <List className={LAYOUT[columns]}>
      {points.map((point, i) => (
        <li
          key={point.title}
          className="flex gap-4 rounded-lg border border-line bg-text/[0.02] px-4 py-3"
        >
          {numbered && (
            <span
              aria-hidden
              className="grid size-8 shrink-0 place-items-center rounded-full border border-glow/30 font-mono text-xs text-muted"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium text-text">
              <TextWithCode text={point.title} />
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              <TextWithCode text={point.text} />
            </p>
          </div>
        </li>
      ))}
    </List>
  );
}

export default PointList;
