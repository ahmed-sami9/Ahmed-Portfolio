import { profile } from "@/data/profile";
import LocationNote from "./LocationNote";
import PhotoFrame from "./PhotoFrame";

// The portrait inside its decorative frame, with the location note underneath.
// Phones: left-aligned with the text above it, growing with the screen up to 26rem.
//   ml-4 and the 2rem leave room for the frame, which sticks out ~1rem on each side.
// Tablets and up: max 350px, right-aligned in its column.
function HeroPhoto() {
  const { photo } = profile;

  return (
    <figure className="relative ml-4 w-[calc(100%-2rem)] max-w-[26rem] md:mr-0 md:ml-auto md:w-[calc(100%-1rem)] md:max-w-[350px]">
      <div className="relative">
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          fetchPriority="high"
          className="aspect-[4/5] w-full rounded-[14px] object-cover shadow-2xl shadow-black/50 ring-1 ring-text/10"
        />

        {/* Soft fade on the left edge so the photo melts into the page */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-1/4 rounded-l-[14px] bg-linear-to-r from-bg/50 to-transparent"
        />

        <PhotoFrame />
      </div>

      <figcaption className="mt-8 flex justify-end">
        <LocationNote />
      </figcaption>
    </figure>
  );
}

export default HeroPhoto;
