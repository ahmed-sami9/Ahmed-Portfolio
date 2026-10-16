import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ProjectScreenshotsProps = {
  name: string;
  screenshots: Project["screenshots"];
  playing: boolean; // true while the card is hovered or focused
};

const SLIDE_MS = 1800;

// The card's image area. Shows the first screenshot; while the card is hovered (or focused
// with the keyboard) it crossfades through the rest. The dots let anyone, including touch
// and keyboard users, switch screenshots by hand.
function ProjectScreenshots({ name, screenshots, playing }: ProjectScreenshotsProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const canCycle = screenshots.length > 1;

  useEffect(() => {
    if (!playing || reducedMotion || !canCycle) return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % screenshots.length),
      SLIDE_MS,
    );
    return () => window.clearInterval(timer);
  }, [playing, reducedMotion, canCycle, screenshots.length]);

  // When the pointer leaves, ease back to the cover image.
  // (Adjusting state during render is React's recommended way to react to a prop change.)
  const [wasPlaying, setWasPlaying] = useState(playing);
  if (playing !== wasPlaying) {
    setWasPlaying(playing);
    if (!playing) setIndex(0);
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-bg">
      {/* All screenshots are stacked; only the active one is opaque, so switching is a crossfade */}
      <div className="relative aspect-[16/10]">
        {screenshots.map((shot, i) => (
          <img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            width={1600}
            height={1000}
            loading="lazy"
            decoding="async"
            aria-hidden={i !== index}
            className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-500 motion-reduce:transition-none ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {canCycle && (
        <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5 bg-linear-to-t from-bg/80 to-transparent pt-6 pb-3">
          {screenshots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${name} screenshot ${i + 1} of ${screenshots.length}`}
              aria-current={i === index}
              // The visible dot is small, but the button around it is a comfortable tap target
              className="grid size-6 place-items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-4 bg-accent" : "w-1.5 bg-text/40"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectScreenshots;
