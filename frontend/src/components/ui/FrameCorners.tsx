// Gold corner brackets on all four corners of a framed box: the project cards, the project
// panel and the Technical details box. They echo the bracket around the hero photo, so every
// framed thing on the site reads as one family.
//
// Each corner is a small box that draws only two of its borders (a 2px "L"), sitting exactly
// on the parent's corner (-1px puts it over the parent's own 1px border) with the same rounding.
// The mask fades each arm out toward its end, so the frame stays subtle: brightest at the
// corner itself, dissolving into the normal border.
//
// The parent must be `relative` and `rounded-2xl`. `className` lets a parent add behavior,
// e.g. the project card fading the corners out on hover.
const CORNERS = [
  "-top-px -left-px rounded-tl-2xl border-t-2 border-l-2 [mask-image:radial-gradient(circle_at_top_left,#000_40%,transparent_95%)]",
  "-top-px -right-px rounded-tr-2xl border-t-2 border-r-2 [mask-image:radial-gradient(circle_at_top_right,#000_40%,transparent_95%)]",
  "-bottom-px -left-px rounded-bl-2xl border-b-2 border-l-2 [mask-image:radial-gradient(circle_at_bottom_left,#000_40%,transparent_95%)]",
  "-bottom-px -right-px rounded-br-2xl border-r-2 border-b-2 [mask-image:radial-gradient(circle_at_bottom_right,#000_40%,transparent_95%)]",
];

type FrameCornersProps = {
  className?: string;
};

function FrameCorners({ className = "" }: FrameCornersProps) {
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {CORNERS.map((position) => (
        <span
          key={position}
          className={`absolute h-8 w-12 border-accent/80 sm:h-10 sm:w-16 ${position}`}
        />
      ))}
    </span>
  );
}

export default FrameCorners;
