// Four short gold corners framing a project card. They fade out on hover/focus, when the
// green glow (CardGlow) takes over, so the card never shows two frames at once.
// The parent must be `relative`, `rounded-2xl` and a `group/card`.
const CORNERS = [
  "-top-px -left-px rounded-tl-2xl border-t-[3px] border-l-[3px]",
  "-top-px -right-px rounded-tr-2xl border-t-[3px] border-r-[3px]",
  "-bottom-px -left-px rounded-bl-2xl border-b-[3px] border-l-[3px]",
  "-bottom-px -right-px rounded-br-2xl border-b-[3px] border-r-[3px]",
];

function CardCorners() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover/card:opacity-0 group-focus-within/card:opacity-0 motion-reduce:transition-none"
    >
      {CORNERS.map((position) => (
        <span key={position} className={`absolute size-6 border-accent/80 ${position}`} />
      ))}
    </span>
  );
}

export default CardCorners;
