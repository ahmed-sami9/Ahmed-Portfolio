import { useState } from "react";
import TextWithCode from "@/components/ui/TextWithCode";
import type { Database } from "@/data/caseStudies/types";
import LetterBadge from "./LetterBadge";
import SqlLine from "./SqlLine";

type QueryShowcaseProps = {
  query: Database["query"];
};

// A real query from the codebase, with lettered notes.
//
// Letters sit in the code's left margin, on the first line of what they explain, and the same
// letters lead the explanations. No floating bubbles pinned to pixel positions: those point at
// the wrong line as soon as the font, the width or the code changes. A margin marker can't drift.
//
// Hover (an extra, the letters already work without it): a note can explain several lines
// (BEGIN + COMMIT, a whole INSERT...), so hovering a note, or one of its lines, lights up all of
// its lines and dims the rest. It shows the extent of an idea, which one letter can't.
//
// Layout (container query): from 53rem of width (1280px+ screens), the code column is exactly
// as wide as the code (`auto`) and the notes take what's left, so the SQL never scrolls sideways
// there, whatever the sidebar's width. Below that, notes go under the code, and on phones the
// code scrolls inside its own window, never the page.
function QueryShowcase({ query }: QueryShowcaseProps) {
  const [active, setActive] = useState<string | null>(null);

  const lines = query.code.split("\n");
  // line number → the note's letter: where badges go, and which lines belong to which note
  const badgeOnLine = new Map(query.notes.map((note) => [note.lines[0], note.letter]));
  const noteOfLine = new Map(
    query.notes.flatMap((note) => note.lines.map((line) => [line, note.letter] as const)),
  );
  const activeLines = new Set(query.notes.find((note) => note.letter === active)?.lines ?? []);

  return (
    <div className="@container" onMouseLeave={() => setActive(null)}>
      <div className="grid gap-5 @min-[53rem]:grid-cols-[auto_minmax(0,1fr)] @min-[53rem]:items-start">
        <figure className="overflow-hidden rounded-xl border border-line bg-bg">
          <figcaption className="border-b border-line px-4 py-2.5 font-mono text-[11px] text-subtle">
            {query.source}
          </figcaption>

          <pre className="overflow-x-auto py-3 font-mono text-[12px] leading-[1.7] text-text/85">
            <code className="grid min-w-max">
              {lines.map((line, i) => {
                const number = i + 1;
                const letter = badgeOnLine.get(number);
                const owner = noteOfLine.get(number);
                const tint = active
                  ? activeLines.has(number)
                    ? "bg-accent/[0.12]"
                    : "opacity-35"
                  : letter
                    ? "bg-accent/[0.06]"
                    : "";

                return (
                  <span
                    key={i}
                    onMouseEnter={() => setActive(owner ?? null)}
                    className={`flex pr-3 transition-[opacity,background-color] duration-200 ${tint}`}
                  >
                    {/* the margin: a letter (if a note starts here), then the line number */}
                    <span className="flex w-9 shrink-0 justify-center pt-px">
                      {letter && <LetterBadge letter={letter} />}
                    </span>
                    <span aria-hidden className="w-7 shrink-0 pr-3 text-right text-subtle/60 select-none">
                      {number}
                    </span>
                    <span className="whitespace-pre">
                      <SqlLine line={line} />
                    </span>
                  </span>
                );
              })}
            </code>
          </pre>
        </figure>

        <div>
          <ol className="space-y-1">
            {query.notes.map((note) => (
              <li
                key={note.letter}
                onMouseEnter={() => setActive(note.letter)}
                className={`flex gap-3 rounded-lg p-2 transition-[opacity,background-color] duration-200 ${
                  active === note.letter ? "bg-text/[0.04]" : active ? "opacity-45" : ""
                }`}
              >
                <span className="pt-0.5">
                  <LetterBadge letter={note.letter} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text">{note.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    <TextWithCode text={note.text} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
          {/* only where hovering exists (a mouse or trackpad) */}
          <p className="mt-3 hidden px-2 text-xs text-subtle pointer-fine:block">
            Hover a note to see every line it explains.
          </p>
        </div>
      </div>
    </div>
  );
}

export default QueryShowcase;
