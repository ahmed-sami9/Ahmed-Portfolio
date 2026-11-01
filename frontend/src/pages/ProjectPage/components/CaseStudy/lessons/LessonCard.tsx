import TextWithCode from "@/components/ui/TextWithCode";
import type { Lesson } from "@/data/caseStudies/types";
import BlockFrame from "../BlockFrame";
import CodeRefLinks from "../CodeRefLinks";

type LessonCardProps = {
  lesson: Lesson;
  repoUrl?: string;
};

// One lesson as three steps, read left to right (stacked on narrow frames): what went wrong,
// how it was fixed, what I'd decide from the start. An <ol>, because the order is the story.
// The last step gets the faint green wash, like "What I built" in Key decisions: it's the
// takeaway, so it's the one block that stands out.
function LessonCard({ lesson, repoUrl }: LessonCardProps) {
  const { title, problem, fix, lesson: takeaway, code } = lesson;
  const steps = [
    { label: "What went wrong", text: problem },
    { label: "How I fixed it", text: fix },
    { label: "What I’d do from the start", text: takeaway },
  ];

  return (
    <BlockFrame title={title}>
      <ol className="grid gap-3 @3xl:grid-cols-3">
        {steps.map((step, i) => {
          const isTakeaway = i === steps.length - 1;
          return (
            <li
              key={step.label}
              className={`rounded-xl border px-4 py-3 ${
                isTakeaway ? "border-glow/25 bg-glow/[0.04]" : "border-line"
              }`}
            >
              <p className="font-mono text-[11px] tracking-wider text-subtle uppercase">
                {step.label}
              </p>
              <p
                className={`mt-2 text-sm leading-relaxed ${isTakeaway ? "text-text" : "text-muted"}`}
              >
                <TextWithCode text={step.text} />
              </p>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 grid gap-1 border-t border-line pt-4 text-sm @xl:grid-cols-[6.5rem_minmax(0,1fr)] @xl:gap-6">
        <p className="text-subtle @xl:pt-1">In the code</p>
        <CodeRefLinks refs={code} repoUrl={repoUrl} />
      </div>
    </BlockFrame>
  );
}

export default LessonCard;
