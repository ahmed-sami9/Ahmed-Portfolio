import { Fragment } from "react";
import TextWithCode from "@/components/ui/TextWithCode";
import type { Database } from "@/data/caseStudies/types";
import ChainLink from "./ChainLink";
import SchemaTableCard from "./SchemaTableCard";

type SchemaChainsProps = {
  tables: Database["tables"];
  chains: Database["chains"];
  notes: Database["diagramNotes"];
};

// The narrow schema (phones, small tablets): where a full graph can't be readable, the tables
// are shown as a few short families ("Structure", "Attendance", "Exams"), each a vertical chain
// of cards joined by 1 → N links. It still reads like a graph, one family at a time.
//
// A card's chips name the parents its chain doesn't show: in "Exams", the line already shows
// exam_results ← exams, so its card adds "also belongs to students". The first card of a
// chain has no line above it, so its chips just say "belongs to".
//
// Shown below 42rem of the diagram's own width (it hides at @2xl, where SchemaGraph takes over).
function SchemaChains({ tables, chains, notes }: SchemaChainsProps) {
  const byName = new Map(tables.map((table) => [table.name, table]));

  return (
    <div className="space-y-8 @2xl:hidden">
      {chains.map((chain) => (
        <section key={chain.title} aria-label={`${chain.title} tables`}>
          <h5 className="mb-3 font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">
            {chain.title}
          </h5>

          {chain.tables.map((name, i) => {
            const table = byName.get(name);
            if (!table) return null;
            const previous = chain.tables[i - 1];
            const otherParents = table.parents.filter((parent) => parent !== previous);

            return (
              <Fragment key={name}>
                {i > 0 && <ChainLink />}
                <SchemaTableCard
                  table={table}
                  variant="chain"
                  otherParents={otherParents}
                  startsChain={i === 0}
                />
              </Fragment>
            );
          })}
        </section>
      ))}

      <div className="space-y-2">
        {notes.map((note) => (
          <p key={note} className="text-xs leading-relaxed text-subtle">
            <TextWithCode text={note} />
          </p>
        ))}
      </div>
    </div>
  );
}

export default SchemaChains;
