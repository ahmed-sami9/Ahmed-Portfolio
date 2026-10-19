import { useMemo, useState, type MouseEvent } from "react";
import TextWithCode from "@/components/ui/TextWithCode";
import type { Database, SchemaTable } from "@/data/caseStudies/types";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SchemaTableCard from "./SchemaTableCard";
import { useSchemaLines } from "./useSchemaLines";

type SchemaGraphProps = {
  tables: Database["tables"];
  notes: Database["diagramNotes"];
};

// Tailwind only generates classes it can find written out in full, so the grid positions are
// listed here instead of being built from strings like `col-start-${n}`.
const COL = { 1: "col-start-1", 2: "col-start-2", 3: "col-start-3", 4: "col-start-4" };
const ROW = { 1: "row-start-1", 2: "row-start-2", 3: "row-start-3" };
const NOTE_CELLS = ["col-start-1 row-start-2", "col-start-1 row-start-3"];

// Draw-in timing: each level of the tree starts this long after the one above it
const LEVEL_DELAY_MS = 220;
const DRAW_MS = 500; // = the duration of animate-draw-line in index.css

// The wide schema: a 4 × 3 grid, each table in the `cell` from the data, and the relationships
// drawn by an SVG laid over the grid (useSchemaLines measures where the tables really are).
// The two notes fill the empty cells under `teachers`.
//
// Two bits of motion, both there to show something, not to decorate:
//   - draw-in, once, when the diagram scrolls into view: lines grow parent → child, level by
//     level from `teachers` down, so the direction of ownership is visible in a second.
//     Skipped entirely for prefers-reduced-motion (the lines are simply there).
//   - hover a table: its lines brighten and unrelated tables fade, so "what is this connected
//     to?" is answered without tracing lines by eye. Only an extra: everything is readable
//     without it, which matters since it needs a mouse.
//
// Only shown when the diagram has 42rem of its own width (@2xl on SchemaDiagram), which is
// reached from 1024px laptops, beside the sidebar. Gaps and names are a little tighter there
// and grow at @4xl (56rem).
function SchemaGraph({ tables, notes }: SchemaGraphProps) {
  const { ref: gridRef, inView } = useInView<HTMLDivElement>(0.3);
  const reducedMotion = usePrefersReducedMotion();
  const lines = useSchemaLines(gridRef, tables);
  const depths = useMemo(() => tableDepths(tables), [tables]);
  const [hovered, setHovered] = useState<string | null>(null);

  // Which tables are linked to the hovered one (itself, its parents, its children)
  const related = useMemo(() => {
    if (!hovered) return null;
    const names = new Set([hovered]);
    for (const line of lines) {
      if (line.parent === hovered) names.add(line.child);
      if (line.child === hovered) names.add(line.parent);
    }
    return names;
  }, [hovered, lines]);

  // One handler on the grid instead of one per card: whatever card the pointer is over
  const onMouseOver = (event: MouseEvent) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>("[data-table]");
    setHovered(card?.dataset.table ?? null);
  };

  // Before the diagram is seen, the lines aren't rendered, so the draw-in plays when it's visible
  const showLines = inView || reducedMotion;

  return (
    <div
      ref={gridRef}
      onMouseOver={onMouseOver}
      onMouseLeave={() => setHovered(null)}
      className="relative hidden grid-cols-4 items-start gap-x-7 gap-y-10 @2xl:grid @4xl:gap-x-10 @4xl:gap-y-12"
    >
      {tables.map((table) => (
        <SchemaTableCard
          key={table.name}
          table={table}
          variant="graph"
          dimmed={related !== null && !related.has(table.name)}
          className={`${COL[table.cell.col]} ${ROW[table.cell.row]}`}
        />
      ))}

      {notes.map((note, i) => (
        <p
          key={note}
          className={`text-xs leading-relaxed text-subtle transition-opacity duration-200 ${
            related ? "opacity-40" : ""
          } ${NOTE_CELLS[i] ?? ""}`}
        >
          <TextWithCode text={note} />
        </p>
      ))}

      {/* The lines: decoration for sighted readers (each card states its relations for screen readers) */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 size-full overflow-visible">
        {showLines &&
          lines.map((line) => {
            const state = !hovered
              ? "stroke-text/30"
              : line.parent === hovered || line.child === hovered
                ? "stroke-text/80"
                : "stroke-text/10";

            const delay = (depths.get(line.parent) ?? 0) * LEVEL_DELAY_MS;
            const animate = !reducedMotion;
            const common = `${state} transition-[stroke] duration-200`;

            return (
              <g key={line.key} fill="none" strokeWidth={1.25}>
                {/* pathLength=1 lets the draw-in work in fractions (0 → 1) whatever the length */}
                <path
                  d={line.line}
                  pathLength={1}
                  strokeDasharray={1}
                  className={`${common} ${animate ? "animate-draw-line" : ""}`}
                  style={{ animationDelay: `${delay}ms` }}
                />
                {/* the bar and fork appear as the line reaches them */}
                <path
                  d={line.marks}
                  className={`${common} ${animate ? "animate-fade-in" : ""}`}
                  style={{ animationDelay: `${delay + DRAW_MS - 150}ms` }}
                />
              </g>
            );
          })}
      </svg>
    </div>
  );
}

// How deep each table sits in the ownership tree: teachers 0, grades 1, groups/exams 2...
// A table with two parents takes the deeper one, so it's drawn after both.
function tableDepths(tables: SchemaTable[]): Map<string, number> {
  const byName = new Map(tables.map((table) => [table.name, table]));
  const depths = new Map<string, number>();

  const depthOf = (name: string): number => {
    const known = depths.get(name);
    if (known !== undefined) return known;
    const parents = byName.get(name)?.parents ?? [];
    const depth = parents.length ? Math.max(...parents.map(depthOf)) + 1 : 0;
    depths.set(name, depth);
    return depth;
  };

  tables.forEach((table) => depthOf(table.name));
  return depths;
}

export default SchemaGraph;
