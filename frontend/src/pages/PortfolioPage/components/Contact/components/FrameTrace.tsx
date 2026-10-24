import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// The Contact signature: the first time the email card is seen, a gold line traces its border
// once, starting from the amber corner (a rect's stroke starts top-left and runs clockwise),
// then fades into the normal border and is removed. Same draw-in idea as the schema lines on
// the project page, so it reads as the site's motif, not a one-off effect.
//
// The SVG is sized from the card's real pixel size (ResizeObserver): a percentage-sized rect
// would stretch its rounded corners.
// The parent must be `relative` and `rounded-2xl`.
const RADIUS = 15.5; // rounded-2xl (16px), minus half the stroke so it sits on the border
const STROKE = 1.5;

function FrameTrace() {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>(0.6);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || done) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, done]);

  const play = inView && !reduced && !done && size;

  return (
    // -inset-px: on top of the card's own 1px border, not inside it
    <span ref={ref} aria-hidden className="pointer-events-none absolute -inset-px">
      {play && (
        <svg width={size.width} height={size.height} className="absolute inset-0 overflow-visible">
          <rect
            x={STROKE / 2}
            y={STROKE / 2}
            width={size.width - STROKE}
            height={size.height - STROKE}
            rx={RADIUS}
            pathLength={1}
            strokeDasharray={1}
            strokeWidth={STROKE}
            className="animate-frame-trace fill-none stroke-accent drop-shadow-accent-line"
            onAnimationEnd={() => setDone(true)} // played once: nothing stays in the page
          />
        </svg>
      )}
    </span>
  );
}

export default FrameTrace;
