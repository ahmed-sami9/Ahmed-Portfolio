import { useEffect, useRef, useState } from "react";
import type { Screenshot } from "@/data/projects";
import ScreenshotPreview from "./ScreenshotPreview";
import ScreenshotViewer from "./ScreenshotViewer";
import ScreenshotStack from "./ScreenshotStack";

type ProjectThumbnailProps = {
  name: string;
  screenshots: Screenshot[];
};

const HOVER_DELAY_MS = 300;

// Only real mouse/trackpad users get the hover window. On touch screens a tap
// opens the full viewer instead (some phones fire mouseenter on tap, so we check).
const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// The card's small image, and the two ways to see more of it:
//   hover (desktop, after a short delay) -> the floating preview that auto-cycles
//   click / tap / Enter                  -> the full viewer with controls
//
// `index` lives here and is shared by the thumbnail, the preview and the viewer,
// so the visitor always picks up on the screenshot they last saw.
function ProjectThumbnail({ name, screenshots }: ProjectThumbnailProps) {
  const [index, setIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  // The delay stops windows flashing open as the mouse just passes over the grid
  const startHover = () => {
    if (!canHover()) return;
    hoverTimer.current = window.setTimeout(() => setPreviewOpen(true), HOVER_DELAY_MS);
  };
  const endHover = () => {
    window.clearTimeout(hoverTimer.current);
    setPreviewOpen(false);
  };

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const openViewer = () => {
    endHover();
    setViewerOpen(true);
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onMouseEnter={startHover}
        onMouseLeave={endHover}
        onClick={openViewer}
        aria-label={`View ${name} screenshots`}
        aria-haspopup="dialog"
        className="block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-bg transition-colors hover:border-accent/40"
      >
        <ScreenshotStack screenshots={screenshots} index={index} />
      </button>

      <ScreenshotPreview
        open={previewOpen}
        anchorRef={buttonRef}
        screenshots={screenshots}
        index={index}
        onIndexChange={setIndex}
      />

      <ScreenshotViewer
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        name={name}
        screenshots={screenshots}
        index={index}
        onIndexChange={setIndex}
      />
    </>
  );
}

export default ProjectThumbnail;
