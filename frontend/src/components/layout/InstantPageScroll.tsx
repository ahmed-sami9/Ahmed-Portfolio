import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

// Makes the scroll jump instant when the PAGE changes (/ <-> /projects/diraya),
// while links inside the same page (#projects, #about...) keep scrolling smoothly.
//
// Why it's needed: index.css turns on `scroll-behavior: smooth` for the whole site.
// That also applies to the router's own scroll on a page change, so a new page would
// visibly slide up from where the old one was. Here we switch smooth scrolling off for
// that one jump and back on right after.
//
// Order matters: this sits before <ScrollRestoration /> in RootLayout. Layout effects of
// siblings run in order, so smooth scrolling is off before the router scrolls.
function InstantPageScroll() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = "auto";
    const frame = requestAnimationFrame(() => {
      html.style.scrollBehavior = "";
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

export default InstantPageScroll;
