import type { Screenshot } from "@/data/projects";

type ScreenshotStackProps = {
  screenshots: Screenshot[];
  index: number; // which one is showing
  lazy?: boolean;
};

// All screenshots stacked on top of each other; only the current one is opaque,
// so changing `index` is a smooth crossfade. Used by the card's thumbnail.
function ScreenshotStack({ screenshots, index, lazy = true }: ScreenshotStackProps) {
  return (
    <div className="relative aspect-[16/10] w-full">
      {screenshots.map((shot, i) => (
        <img
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          width={1600}
          height={1000}
          loading={lazy ? "lazy" : "eager"}
          decoding="async"
          aria-hidden={i !== index}
          className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-500 motion-reduce:transition-none ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

export default ScreenshotStack;
