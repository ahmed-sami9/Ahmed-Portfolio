// Decorative page atmosphere: two soft green glows and a dark vignette.
// It's fixed behind everything and is a SIBLING of the content, not its parent,
// so pointer-events-none and -z-10 never leak into the real page.

function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-bg
        bg-[radial-gradient(circle_at_12%_8%,rgba(25,65,55,0.42)_0%,transparent_55%),radial-gradient(circle_at_78%_35%,rgba(21,52,45,0.16)_0%,transparent_32%),radial-gradient(circle_at_center,transparent_40%,rgba(1,8,6,0.30)_100%)]"
    />
  );
}

export default Background;
