// The decorative frame around the desktop portrait (all aria-hidden, purely visual).
// Must be placed inside a `relative` wrapper the same size as the photo.
//
//   right side   : a hairline rail joined to the photo's top corner by a small tick,
//                  with one short, bright, thicker bar sitting on it near the top
//   bottom-left  : an L-bracket: bright vertical stroke, horizontal stroke that fades out,
//                  and a small glowing dot where the two meet
function PhotoFrame() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Right rail + top tick */}
      <span className="absolute top-0 -right-3 h-px w-3 bg-accent/30" />
      <span className="absolute top-0 -right-3 bottom-6 w-px bg-accent/30" />

      {/* Bright bar on the rail */}
      <span className="absolute top-[16%] -right-[13px] h-[19%] w-[3px] rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />

      {/* Bottom-left L-bracket */}
      <span className="absolute -bottom-4 -left-4 h-20 w-[2px] rounded-full bg-accent" />
      <span className="absolute -bottom-4 -left-4 h-px w-36 bg-linear-to-r from-accent/80 to-transparent" />

      {/* Corner dot */}
      <span className="absolute -bottom-[19px] -left-[19px] size-2 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
    </div>
  );
}

export default PhotoFrame;
