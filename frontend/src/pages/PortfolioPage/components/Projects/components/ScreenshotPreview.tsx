import { useEffect, useLayoutEffect, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import type { Screenshot } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import ScreenshotDots from "./ScreenshotDots";
import ScreenshotStack from "./ScreenshotStack";

type ScreenshotPreviewProps = {
  open: boolean;
  anchorRef: RefObject<HTMLElement | null>; // the thumbnail it grows out of
  screenshots: Screenshot[];
  index: number;
  onIndexChange: (index: number) => void;
};

const SLIDE_MS = 1800;
const MIN_WIDTH = 520;
const MAX_WIDTH = 760;
const GROWTH = 1.4; // always clearly bigger than the thumbnail it opens from
const EDGE = 16; // keep this far from the screen edges
const NAVBAR = 80; // never slide under the sticky navbar

// The floating window that opens over a thumbnail on hover (desktop only).
// It's purely visual: pointer-events are off, so the mouse is still "on" the thumbnail
// underneath, and moving away closes it.
//
// Rendered into document.body with a portal so no parent's overflow or border can clip it,
// and positioned with `fixed` coordinates from the thumbnail's place on screen,
// clamped so it never runs off the edge of the window.
function ScreenshotPreview({
  open,
  anchorRef,
  screenshots,
  index,
  onIndexChange,
}: ScreenshotPreviewProps) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: MIN_WIDTH });
  const reducedMotion = usePrefersReducedMotion();

  // Measure before paint (useLayoutEffect) so the window never flashes in the wrong spot,
  // and keep it attached to the thumbnail while the page scrolls or resizes.
  useLayoutEffect(() => {
    if (!open) return;

    const place = () => {
      const anchor = anchorRef.current?.getBoundingClientRect();
      if (!anchor) return;
      const clamp = (value: number, min: number, max: number) =>
        Math.min(Math.max(value, min), max);

      // Width: 1.4x the thumbnail, between 520 and 760px, and never more than the screen
      // allows, horizontally or vertically (the image is 16:10, plus a 40px row of dots).
      const fitsHeight = (window.innerHeight - NAVBAR - 8 - EDGE - 40) * (16 / 10);
      const width = Math.min(
        clamp(anchor.width * GROWTH, MIN_WIDTH, MAX_WIDTH),
        window.innerWidth - EDGE * 2,
        fitsHeight,
      );
      const height = (width * 10) / 16 + 40;

      setPosition({
        width,
        left: clamp(anchor.left + anchor.width / 2 - width / 2, EDGE, window.innerWidth - width - EDGE),
        top: clamp(
          anchor.top + anchor.height / 2 - height / 2,
          NAVBAR + 8,
          window.innerHeight - height - EDGE,
        ),
      });
    };

    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [open, anchorRef]);

  // Auto-advance while open, continuing from wherever the visitor left off last time
  useEffect(() => {
    if (!open || reducedMotion || screenshots.length < 2) return;
    const timer = window.setInterval(
      () => onIndexChange((index + 1) % screenshots.length),
      SLIDE_MS,
    );
    return () => window.clearInterval(timer);
  }, [open, reducedMotion, screenshots.length, index, onIndexChange]);

  return createPortal(
    <div
      aria-hidden // decorative duplicate of the thumbnail; screen readers use the viewer instead
      style={{ top: position.top, left: position.left, width: position.width }}
      className={`pointer-events-none fixed z-40 origin-center rounded-2xl border border-accent/30 bg-bg p-2 shadow-2xl shadow-black/60 transition-[opacity,scale] duration-200 ease-out motion-reduce:transition-none ${
        open ? "scale-100 opacity-100" : "invisible scale-95 opacity-0"
      }`}
    >
      <div className="overflow-hidden rounded-xl">
        <ScreenshotStack screenshots={screenshots} index={index} />
      </div>
      <div className="py-3">
        <ScreenshotDots count={screenshots.length} index={index} />
      </div>
    </div>,
    document.body,
  );
}

export default ScreenshotPreview;
