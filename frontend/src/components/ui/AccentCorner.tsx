// The amber top-left corner that marks "a framed block starts here".
// The parent must be `relative` and `rounded-2xl`, so the corner follows its edge.
function AccentCorner() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -top-px -left-px h-7 w-14 rounded-tl-2xl border-t-2 border-l-2 border-accent/80"
    />
  );
}

export default AccentCorner;
