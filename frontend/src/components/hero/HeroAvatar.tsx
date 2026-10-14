import { profile } from "../../data/profile";
import LocationNote from "./LocationNote";

// Mobile and tablet only: a small framed photo next to the location note.
// It keeps the face visible without pushing the name and buttons below the fold.
function HeroAvatar() {
  const { photo } = profile;

  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0">
        {/* Same bracket signature as the desktop portrait, scaled down */}
        <span
          aria-hidden
          className="absolute -top-1.5 -right-1.5 size-5 border-t border-r border-accent/70"
        />
        <span
          aria-hidden
          className="absolute -bottom-1.5 -left-1.5 size-5 border-b border-l border-accent/70"
        />
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          fetchPriority="high"
          className="aspect-[4/5] w-20 rounded-sm object-cover sm:w-24"
        />
      </div>

      <LocationNote />
    </div>
  );
}

export default HeroAvatar;
