import type { SchemaTable } from "@/data/caseStudies/types";
import KeyBadge from "./KeyBadge";

type SchemaTableCardProps = {
  table: SchemaTable;
  // graph: a node of the wide diagram, columns listed top to bottom, relations drawn as lines
  // chain: a card of the narrow view, columns flowing on one or two lines to stay short
  variant: "graph" | "chain";
  // chain only: the parents the chain's line doesn't already show (e.g. exam_results →
  // students, while the line shows exam_results ← exams), written on the card instead
  otherParents?: string[];
  // chain only: the first card has no line above it, so its chips say "belongs to", not "also"
  startsChain?: boolean;
  // graph only: faded while another table is hovered and this one isn't linked to it
  dimmed?: boolean;
  className?: string; // its grid position on the wide layout
};

// One table of the schema: its name and the columns that tell its story.
//
// data-table (graph only): how useSchemaLines finds this card to measure it and draw its lines.
function SchemaTableCard({
  table,
  variant,
  otherParents = [],
  startsChain = false,
  dimmed = false,
  className = "",
}: SchemaTableCardProps) {
  const { name, columns, parents, highlight } = table;
  const isGraph = variant === "graph";

  return (
    <div
      data-table={isGraph ? name : undefined}
      className={`relative min-w-0 rounded-lg border bg-bg p-3 transition-opacity duration-200 ${
        highlight ? "border-accent/50" : "border-line"
      } ${dimmed ? "opacity-35" : ""} ${className}`}
    >
      <p className="truncate font-display text-sm leading-6 text-text @2xl:text-[13px] @4xl:text-sm">
        {name}
      </p>

      <ul className={isGraph ? "mt-1.5 space-y-1" : "mt-1.5 flex flex-wrap gap-x-4 gap-y-1"}>
        {columns.map((column) => (
          <li key={column.name} className="flex min-w-0 items-center gap-2 font-mono text-[11px] text-muted">
            <KeyBadge kind={column.key} compact={!isGraph} />
            <span className="truncate">{column.name}</span>
          </li>
        ))}
      </ul>

      {/*
        Relationships in words. Graph: screen-reader-only (sr-only), since the SVG lines are
        invisible to screen readers and this text is not. Chain: visible, for the parents the
        chain's line doesn't show.
      */}
      {isGraph && parents.length > 0 && (
        <p className="sr-only">Belongs to {parents.join(" and ")}.</p>
      )}
      {!isGraph && otherParents.length > 0 && (
        <p className="mt-2.5 flex flex-wrap gap-1.5 text-[11px] text-subtle">
          {otherParents.map((parent) => (
            <span key={parent} className="rounded-full px-2 py-0.5 ring-1 ring-line ring-inset">
              → {startsChain ? "belongs to" : "also belongs to"} {parent}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

export default SchemaTableCard;
