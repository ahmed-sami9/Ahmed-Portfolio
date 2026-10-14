import { profile } from "@/data/profile";
import LocationNote from "./LocationNote";
import PhotoFrame from "./PhotoFrame";

// Desktop only: the large portrait inside its decorative frame,
// with the location note underneath. Mobile uses HeroAvatar instead.
function HeroPhoto() {
  const { photo } = profile;

  return (
    <figure className="relative ml-auto w-full max-w-[350px]">
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
