import { relationPath } from "./relationPath";

const { line, marks } = relationPath({ x: 0, y: 6 }, { x: 1, y: 0 }, [{ x: 44, y: 6 }], { x: 1, y: 0 });

// The key to the lines, in plain words: a recruiter shouldn't need to know ER notation to read
// the diagram, and a developer recognizes it at once.
//
// The hover hint only shows where hovering exists (a mouse or trackpad) and the graph is visible.
function RelationLegend() {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-4 text-xs text-subtle">
      <p className="flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-wider uppercase">one</span>
        <svg aria-hidden width={44} height={12} className="overflow-visible">
          <path d={`${line} ${marks}`} fill="none" className="stroke-text/45" strokeWidth={1.25} />
        </svg>
        <span className="font-mono text-[10px] tracking-wider uppercase">many</span>
        <span>e.g. one grade has many groups</span>
      </p>
      <p className="hidden pointer-fine:@2xl:block">Hover a table to trace its links.</p>
    </div>
  );
}

export default RelationLegend;
