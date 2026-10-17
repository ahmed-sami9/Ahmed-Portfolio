// Gold corner brackets on all four corners of the panel, from the design.
// They echo the bracket around the hero photo, so the project page feels like the same site.
//
// Each corner is a small box that draws only two of its borders (a 2px "L"), sitting exactly
// on the panel's corner (-1px puts it over the panel's own 1px border) with the same rounding.
// The mask fades each arm out toward its end, so the frame stays subtle: it's brightest at
// the corner itself and dissolves into the panel's normal border.
const corners = [
  "-top-px -left-px rounded-tl-2xl border-t-2 border-l-2 [mask-image:radial-gradient(circle_at_top_left,#000_40%,transparent_95%)]",
  "-top-px -right-px rounded-tr-2xl border-t-2 border-r-2 [mask-image:radial-gradient(circle_at_top_right,#000_40%,transparent_95%)]",
  "-bottom-px -left-px rounded-bl-2xl border-b-2 border-l-2 [mask-image:radial-gradient(circle_at_bottom_left,#000_40%,transparent_95%)]",
  "-bottom-px -right-px rounded-br-2xl border-r-2 border-b-2 [mask-image:radial-gradient(circle_at_bottom_right,#000_40%,transparent_95%)]",
];

function PanelCorners() {
  return (
    <>
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden
          className={`pointer-events-none absolute h-8 w-12 border-accent/80 sm:h-10 sm:w-16 ${position}`}
        />
      ))}
    </>
  );
}

export default PanelCorners;
