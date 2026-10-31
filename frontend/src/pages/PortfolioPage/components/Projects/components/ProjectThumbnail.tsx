import { useEffect, useState } from "react";
import type { Screenshot } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import ScreenshotDots from "./ScreenshotDots";
import ScreenshotStack from "./ScreenshotStack";

type ProjectThumbnailProps = {
  screenshots: Screenshot[];
};

const SLIDE_MS = 1800;

// The card's screenshot, big enough to judge the app at a glance. Hovering it (mouse/trackpad)
// cycles through the screenshots in place. It isn't a button: a click falls through to the card,
// which opens the project page, where the full gallery is.
function ProjectThumbnail({ screenshots }: ProjectThumbnailProps) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const count = screenshots.length;

  // Touch screens fire mouseenter on tap; the hover cycle is only for a real pointer
  const startHover = () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setHovered(true);
  };

  useEffect(() => {
    if (!hovered || reducedMotion || count < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [hovered, reducedMotion, count]);

  return (
    <div
      onMouseEnter={startHover}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl border border-line bg-[color-mix(in_oklab,var(--color-glow)_7%,var(--color-bg))] px-3 pt-3 pb-7 sm:px-5 sm:pt-5 sm:pb-8"
    >
      {/* The app sits in its own dark browser window on a green panel: its own colors
          (light, blue) stay true, but they're contained by the site's, not clashing at the card's edge. */}
      <div className="overflow-hidden rounded-lg shadow-xl ring-1 shadow-black/40 ring-text/10">
        <div aria-hidden className="flex h-5 items-center gap-1.5 bg-bg px-2.5 sm:h-6">
          <span className="size-1.5 rounded-full bg-text/20 sm:size-2" />
          <span className="size-1.5 rounded-full bg-text/20 sm:size-2" />
          <span className="size-1.5 rounded-full bg-text/20 sm:size-2" />
        </div>
        <ScreenshotStack screenshots={screenshots} index={index} />
      </div>
      {/* In the panel's bottom margin: says there's more than one screen, without covering the app */}
      <div className="absolute inset-x-0 bottom-2.5 sm:bottom-3">
        <ScreenshotDots count={count} index={index} />
      </div>
    </div>
  );
}

export default ProjectThumbnail;
