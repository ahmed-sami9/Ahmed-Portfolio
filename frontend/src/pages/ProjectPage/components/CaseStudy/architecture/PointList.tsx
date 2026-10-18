import TextWithCode from "@/components/ui/TextWithCode";
import type { Point } from "@/data/caseStudies/types";

type PointListProps = {
  points: Point[];
  numbered?: boolean; // layers have an order (01, 02...); notes don't
  columns?: boolean; // two side by side when the surrounding @container is wide enough
};

// A list of titled points: the backend layers, the frontend layers, the side notes.
// Numbered = an <ol>, because the order means something (routes come before controllers).
function PointList({ points, numbered = false, columns = false }: PointListProps) {
  const List = numbered ? "ol" : "ul";

  return (
    <List className={columns ? "grid gap-3 @3xl:grid-cols-2" : "space-y-3"}>
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
