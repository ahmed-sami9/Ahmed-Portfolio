import { useState } from "react";
import type { Screenshot } from "@/data/projects";

type ProjectGalleryProps = {
  screenshots: Screenshot[];
};

// One big screenshot, a caption saying which screen it is, and a row of thumbnails to switch.
// The first screenshot shows by default, so nothing needs a click to be useful.
// With a single screenshot there's nothing to switch, so no thumbnails.
function ProjectGallery({ screenshots }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = screenshots[activeIndex];
  if (!active) return null;

  const pad = (n: number) => String(n).padStart(2, "0"); // 1 -> "01"

  return (
    <div>
      <figure>
        {/*
          The screenshot's frame: the same gradient ring the project cards show on hover
          (card-glow-ring in index.css), always on here and toned down (opacity-60), so it
          frames the screenshot without competing with it.
        */}
        <div className="relative rounded-xl">
          <span
            aria-hidden
            className="card-glow-ring pointer-events-none absolute -inset-px z-10 rounded-xl opacity-60"
          />
          <img
            src={active.src}
            alt={active.alt}
            // 16:10 is a laptop screen's shape: every screenshot gets the same frame, so
            // switching never makes the page jump
            className="aspect-[16/10] w-full rounded-xl object-cover object-top"
          />
        </div>
        <figcaption className="mt-3 font-mono text-[11px] text-subtle">
          {pad(activeIndex + 1)} / {pad(screenshots.length)} · {active.caption}
        </figcaption>
      </figure>

      {screenshots.length > 1 && (
        <ul aria-label="Screenshots" className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
          {screenshots.map((shot, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={shot.src}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Show screenshot: ${shot.caption}`}
                  aria-pressed={isActive}
                  className={`block w-full overflow-hidden rounded-md ring-1 transition ${
                    isActive ? "ring-accent" : "opacity-60 ring-text/10 hover:opacity-100"
                  }`}
                >
                  {/* alt="" because the button's label already says what it is */}
                  <img
                    src={shot.src}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover object-top"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ProjectGallery;
