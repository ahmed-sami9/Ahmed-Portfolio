import type { Database } from "@/data/caseStudies/types";
import RelationLegend from "./RelationLegend";
import SchemaChains from "./SchemaChains";
import SchemaGraph from "./SchemaGraph";

type SchemaDiagramProps = {
  tables: Database["tables"];
  chains: Database["chains"];
  notes: Database["diagramNotes"];
};

// The schema, in whichever form fits the width the diagram gets (@container):
//   42rem and up (laptops and wider): SchemaGraph, every table and every line in one view
//   below that (phones, small tablets): SchemaChains, the same tables as short vertical families
//
// Under both, one legend for the lines (the same "one" bar and "many" fork in both views).
//
// Both views are always rendered; CSS shows exactly one (`hidden` = display:none, which also removes
// the other from screen readers), so there's no JavaScript deciding the layout.
function SchemaDiagram({ tables, chains, notes }: SchemaDiagramProps) {
  return (
    <figure className="@container rounded-xl border border-line bg-bg/30 p-4 sm:p-5">
      <SchemaGraph tables={tables} notes={notes} />
      <SchemaChains tables={tables} chains={chains} notes={notes} />
      <RelationLegend />
    </figure>
  );
}

export default SchemaDiagram;
