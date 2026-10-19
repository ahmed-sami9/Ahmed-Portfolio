import type { SchemaColumn } from "@/data/caseStudies/types";

type KeyBadgeProps = {
  kind: SchemaColumn["key"];
  // compact: columns flow inline (narrow view), so plain columns get no empty spacer
  compact?: boolean;
};

const labels = { pk: "PK", fk: "FK", "pk-fk": "PK·FK" } as const;

// PK / FK marker in front of a column. Neutral on purpose: amber in this section is kept for
// the central table, the query letters and the key idea, so badges must not compete with them.
// PK is slightly brighter than FK because it identifies the row.
//
// In the graph, columns without a key keep an empty spacer the badge's width, so all the
// column names line up.
function KeyBadge({ kind, compact = false }: KeyBadgeProps) {
  if (!kind) return compact ? null : <span aria-hidden className="w-10 shrink-0" />;

  const isPrimary = kind !== "fk";
  return (
    <span
      className={`shrink-0 rounded px-1 py-px text-center font-mono text-[9px] tracking-wide ${
        compact ? "" : "w-10"
      } ${isPrimary ? "bg-text/10 text-text/90" : "text-subtle ring-1 ring-line ring-inset"}`}
    >
      {labels[kind]}
    </span>
  );
}

export default KeyBadge;
