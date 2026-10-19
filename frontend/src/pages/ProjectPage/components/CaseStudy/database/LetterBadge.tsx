type LetterBadgeProps = {
  letter: string;
};

// An outlined amber letter that marks a line of code and its explanation.
// Outlined, unlike the solid numbered StepBadge: numbers mean "steps in order",
// letters mean "look here". Different meaning, different look.
function LetterBadge({ letter }: LetterBadgeProps) {
  return (
    <span className="inline-grid size-5 shrink-0 place-items-center rounded-full border border-accent/70 font-mono text-[10px] text-accent">
      {letter}
    </span>
  );
}

export default LetterBadge;
