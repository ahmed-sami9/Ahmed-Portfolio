import type { DatabaseRule } from "@/data/caseStudies/types";

type RuleListProps = {
  rules: DatabaseRule[];
};

// The rules the database itself enforces. Each card: the rule in plain English (for anyone),
// then the constraint behind it in code (for engineers).
//
// Columns follow the space available (container query): 1, then 2, then 3 per row.
// A last card left alone on its row stretches across it, so the grid ends cleanly.
function RuleList({ rules }: RuleListProps) {
  const aloneIn2 = rules.length % 2 === 1;
  const aloneIn3 = rules.length % 3 === 1;
  const lastSpan = [
    aloneIn2 ? "@2xl:col-span-2" : "",
    aloneIn3 ? "@5xl:col-span-3" : aloneIn2 ? "@5xl:col-span-1" : "",
  ].join(" ");

  return (
    <div className="@container">
      <ul className="grid gap-3 @2xl:grid-cols-2 @5xl:grid-cols-3">
        {rules.map((rule, i) => (
          <li
            key={rule.rule}
            className={`flex flex-col justify-between gap-3 rounded-lg border border-line bg-text/[0.02] px-4 py-3 ${
              i === rules.length - 1 ? lastSpan : ""
            }`}
          >
            <p className="text-sm leading-relaxed text-text">{rule.rule}</p>
            <code className="block rounded bg-text/[0.04] px-2 py-1.5 font-mono text-[11px] leading-relaxed break-words text-muted">
              {rule.how}
            </code>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RuleList;
