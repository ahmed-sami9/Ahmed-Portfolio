// The ring of light around a project card, fading in when the card (a `group/card` parent)
// is hovered or keyboard-focused.
//
// CSS can't put a gradient directly on a border, so this is a layer sitting exactly on top of
// the card's 1px border (-inset-px). The `card-glow-ring` utility (index.css) paints the
// multi-color gradient and masks it down to a 1px ring. Only opacity animates, which is cheap.
function CardGlow() {
  return (
    <span
      aria-hidden
      className="card-glow-ring pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 group-focus-within/card:opacity-100 motion-reduce:transition-none"
    />
  );
}

export default CardGlow;
