import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { Screenshot } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import ScreenshotDots from "./ScreenshotDots";
import ScreenshotStack from "./ScreenshotStack";

type ProjectThumbnailProps = {
  name: string; // the project, for the dots' screen-reader labels
  screenshots: Screenshot[];
  playing: boolean; // the card is fully on screen: the screenshots play by themselves
};

const SLIDE_MS = 3500;
const ZOOM = "scale-[1.6]";

// The card's screenshot, big enough to judge the app at a glance.
//   - plays by itself while `playing` (every 3.5s), without stopping; never for reduced motion
//   - the dots jump to a screenshot, and the play carries on from there
//   - hovering (mouse/trackpad) zooms 1.6x into the part under the pointer, and holds the
//     current screenshot until the pointer leaves, so it never switches under someone reading it
// A click anywhere but the dots falls through to the card, which opens the project page.
function ProjectThumbnail({ name, screenshots, playing }: ProjectThumbnailProps) {
  const [index, setIndex] = useState(0);
  const [zooming, setZooming] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const zoomRef = useRef<HTMLDivElement>(null);
  const count = screenshots.length;
  const autoplay = playing && !zooming && !reducedMotion && count > 1;

  // A timeout per screenshot (not an interval): picking a dot changes `index`, which restarts
  // the wait, so the picked screenshot gets its full 3.5s before the next one.
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, count, index]);

  // Touch screens fire mouseenter on tap: the zoom is only for a real pointer
  const startZoom = () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setZooming(true);
  };

  // The zoom grows from under the pointer. Set straight on the element (no React state),
  // because it changes on every mouse move.
  const followPointer = (event: MouseEvent<HTMLDivElement>) => {
    const zoom = zoomRef.current;
    if (!zoom) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * 100;
    const y = ((event.clientY - box.top) / box.height) * 100;
    zoom.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <div className="relative rounded-xl border border-line bg-[color-mix(in_oklab,var(--color-glow)_7%,var(--color-bg))] px-3 pt-3 pb-7 sm:px-5 sm:pt-5 sm:pb-8">
      {/* The app sits in its own dark browser window on a green panel: its own colors
          (light, blue) stay true, but they're contained by the site's, not clashing at the card's edge. */}
      <div className="overflow-hidden rounded-lg shadow-xl ring-1 shadow-black/40 ring-text/10">
        <div aria-hidden className="flex h-5 items-center gap-1.5 bg-bg px-2.5 sm:h-6">
          <span className="size-1.5 rounded-full bg-text/20 sm:size-2" />
          <span className="size-1.5 rounded-full bg-text/20 sm:size-2" />
          <span className="size-1.5 rounded-full bg-text/20 sm:size-2" />
        </div>

        {/* The zoom's window: overflow-hidden keeps the enlarged screenshot inside its frame */}
        <div
          onMouseEnter={startZoom}
          onMouseLeave={() => setZooming(false)}
          onMouseMove={followPointer}
          className="overflow-hidden"
        >
          <div
            ref={zoomRef}
            className={`transition-transform duration-300 ease-out motion-reduce:transition-none ${
              zooming ? ZOOM : ""
            }`}
          >
            <ScreenshotStack screenshots={screenshots} index={index} />
          </div>
        </div>
      </div>

      {/* In the panel's bottom margin, so they never cover the app. Buttons: the card's click
          handler ignores clicks on buttons, so picking a dot doesn't open the project page. */}
      <div className="absolute inset-x-0 bottom-0 sm:bottom-0.5">
        <ScreenshotDots count={count} index={index} onSelect={setIndex} label={`${name} screenshot`} />
      </div>
    </div>
  );
}

export default ProjectThumbnail;
