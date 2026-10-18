import { LightbulbIcon } from "@/components/ui/icons";

type RuleCalloutProps = {
  rule: string;
};

// The one principle behind the whole architecture, highlighted in amber.
// It's the sentence an interviewer should remember, so it's the only warm-colored block.
function RuleCallout({ rule }: RuleCalloutProps) {
  return (
    <p className="flex gap-3 rounded-xl border border-accent/40 bg-accent/5 px-4 py-4 text-sm leading-relaxed text-accent">
      <LightbulbIcon className="mt-0.5 size-5 shrink-0" />
      <span>{rule}</span>
    </p>
  );
}

export default RuleCallout;
