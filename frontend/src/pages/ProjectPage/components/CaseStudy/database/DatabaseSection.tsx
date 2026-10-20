import type { Database } from "@/data/caseStudies/types";
import CaseStudySection from "../CaseStudySection";
import CodeShowcase from "../CodeShowcase";
import GroupFrame from "../GroupFrame";
import PointList from "../PointList";
import RuleCallout from "../RuleCallout";
import SectionBlock from "../SectionBlock";
import RuleList from "./RuleList";
import SchemaDiagram from "./SchemaDiagram";

type DatabaseSectionProps = {
  database: Database;
  number: number;
};

// "How is the data kept correct?", read in this order:
//   1. the schema: what the data looks like
//   2. the rules the database enforces: what it guarantees (framed: one idea, + its conclusion)
//   3. design decisions: why it's built this way
//   4. a real query: the proof, in code (framed: with the rules, the section's two key blocks)
//   5. safety: how raw SQL stays safe
function DatabaseSection({ database, number }: DatabaseSectionProps) {
  const { summary, tables, chains, diagramNotes, rules, rulesCallout, decisions, query, safety } =
    database;

  return (
    <CaseStudySection id="database" number={number} title="Database" summary={summary}>
      <SchemaDiagram tables={tables} chains={chains} notes={diagramNotes} />

      <GroupFrame className="mt-12">
        <SectionBlock title="Rules the database enforces">
          <div className="space-y-3">
            <RuleList rules={rules} />
            <RuleCallout rule={rulesCallout} />
          </div>
        </SectionBlock>
      </GroupFrame>

      <div className="@container mt-12">
        <SectionBlock title="Design decisions">
          <PointList points={decisions} columns={2} />
        </SectionBlock>
      </div>

      <GroupFrame className="mt-12">
        <SectionBlock title="The query" subtitle={query.question}>
          <CodeShowcase sample={query} />
        </SectionBlock>
      </GroupFrame>

      <div className="@container mt-12">
        <SectionBlock title="Safety with raw SQL">
          <PointList points={safety} columns={2} />
        </SectionBlock>
      </div>
    </CaseStudySection>
  );
}

export default DatabaseSection;
