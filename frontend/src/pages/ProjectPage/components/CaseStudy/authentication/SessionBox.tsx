import { LockIcon } from "@/components/ui/icons";
import type { Authentication } from "@/data/caseStudies/types";

type SessionBoxProps = {
  session: Authentication["session"];
};

// Where every flow ends. The only glowing element: it's the point of the diagram.
function SessionBox({ session }: SessionBoxProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-accent/80 bg-[color-mix(in_oklab,var(--color-accent)_4%,var(--color-bg))] px-4 py-3.5 shadow-accent-glow">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-text/[0.06] text-text/90">
          <LockIcon className="size-5" />
        </span>
        <div>
          <p className="font-display text-base text-text">{session.title}</p>
          <p className="text-xs text-subtle">{session.subtitle}</p>
        </div>
      </div>

      <ul className="flex flex-wrap gap-2">
        {session.facts.map((fact) => (
          <li
            key={fact}
            className="rounded-md px-2 py-1 font-mono text-[11px] text-muted ring-1 ring-line ring-inset"
          >
            {fact}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SessionBox;
