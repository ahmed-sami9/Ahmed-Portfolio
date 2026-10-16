import { useEffect, useRef } from "react";
import { CloseIcon } from "@/components/ui/icons";
import type { Screenshot } from "@/data/projects";
import ScreenshotDots from "./ScreenshotDots";
import ScreenshotStack from "./ScreenshotStack";

type ScreenshotViewerProps = {
  open: boolean;
  onClose: () => void;
  name: string;
  screenshots: Screenshot[];
  index: number;
  onIndexChange: (index: number) => void;
};

// The full screenshot viewer, opened by clicking or tapping a thumbnail.
// This is how touch and keyboard users get the preview, since they have no hover.
//
// Built on the native <dialog> element with showModal(): the browser itself provides
// the dark backdrop, traps keyboard focus inside, closes on Escape, and puts it above
// everything else. Re-implementing those by hand is where most custom modals go wrong.
function ScreenshotViewer({
  open,
  onClose,
  name,
  screenshots,
  index,
  onIndexChange,
}: ScreenshotViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const count = screenshots.length;
  const go = (step: number) => onIndexChange((index + step + count) % count);

  // Sync React state -> the dialog's real open state, and stop the page scrolling behind it
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && dialog.open) dialog.close();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${name} screenshots`}
      onClose={onClose} // fires on Escape too, keeping React state in sync
      // A click whose target is the <dialog> itself landed on the backdrop: close
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-4xl rounded-2xl border border-line bg-bg p-0 text-text backdrop:bg-bg/80 backdrop:backdrop-blur-sm"
    >
      <div className="p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between px-1">
          <p className="font-display text-xl">{name}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close screenshots"
            className="-mr-1 grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-text/5 hover:text-text focus-visible:rounded-full"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-line">
          <ScreenshotStack screenshots={screenshots} index={index} lazy={false} />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={count < 2}
            className="px-2 py-1 font-mono text-xs text-muted transition-colors hover:text-text disabled:invisible"
          >
            ← Prev
          </button>
          <ScreenshotDots count={count} index={index} onSelect={onIndexChange} label={`${name} screenshot`} />
          <button
            type="button"
            onClick={() => go(1)}
            disabled={count < 2}
            className="px-2 py-1 font-mono text-xs text-muted transition-colors hover:text-text disabled:invisible"
          >
            Next →
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ScreenshotViewer;
