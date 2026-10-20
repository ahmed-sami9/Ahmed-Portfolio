import { about } from "@/data/about";

// A quiet pause beside the story, in its own matted frame like a print.
// Zoomed from the bottom edge, so the bright sky is cropped out and the forest and its reflection stay.
function AboutPhoto() {
  const { photo } = about;

  return (
    <div className="rounded-2xl border border-line bg-text/[0.02] p-2">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={photo.src}
          alt=""
          width={photo.width}
          height={photo.height}
          loading="lazy"
          className="aspect-[4/3] w-full origin-bottom scale-[1.4] object-cover"
        />
        {/* Slightly darker, fading in from the top, so it sits in the page instead of on it */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-bg/45 via-bg/15 to-bg/10"
        />
      </div>
    </div>
  );
}

export default AboutPhoto;
