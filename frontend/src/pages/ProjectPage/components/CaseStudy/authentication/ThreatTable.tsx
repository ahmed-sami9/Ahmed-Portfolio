import type { Authentication } from "@/data/caseStudies/types";
import DetailChips from "./DetailChips";

type ThreatTableProps = {
  threats: Authentication["threats"];
};

// "If someone tries to…" → what stops it. Each security choice paired with the attack it
// exists for: threat first, then the defense, which is also how to explain it in an interview.
// Attacks are written in plain English for recruiters; the technical names are the chips.
//
// Two layouts, one visible at a time (`hidden` = display:none, so screen readers get exactly one):
//   42rem and up: a real <table> with header cells, so it's read as rows and columns
//   below:        each row as a short stacked item, in the same reading order
function ThreatTable({ threats }: ThreatTableProps) {
  return (
    <>
      <table className="hidden w-full text-left text-sm @2xl:table">
        <thead>
          <tr className="border-b border-line text-xs text-subtle">
            <th scope="col" className="py-2 pr-4 font-normal">If someone…</th>
            <th scope="col" className="py-2 pr-4 font-normal">What stops it</th>
            <th scope="col" className="py-2 font-normal">Technical detail</th>
          </tr>
        </thead>
        <tbody>
          {threats.map((threat) => (
            <tr key={threat.attack} className="border-b border-line/60 last:border-0">
              <th scope="row" className="py-2.5 pr-4 align-top font-normal text-text">
                {threat.attack}
              </th>
              <td className="py-2.5 pr-4 align-top text-muted">{threat.defense}</td>
              <td className="py-2 align-top">
                <DetailChips details={threat.details} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="space-y-2.5 @2xl:hidden">
        {threats.map((threat) => (
          <li key={threat.attack} className="rounded-lg border border-line bg-bg px-3.5 py-3">
            <p className="text-sm text-text">
              <span className="text-subtle">If someone </span>
              {threat.attack}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{threat.defense}</p>
            <div className="mt-2">
              <DetailChips details={threat.details} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ThreatTable;
