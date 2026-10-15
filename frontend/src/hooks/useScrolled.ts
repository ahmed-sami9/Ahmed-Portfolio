import { useEffect, useState } from "react";

// true once the page has scrolled past `threshold` pixels.
// Used by the navbar to fade its background in after you leave the top.
export function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);

    update(); // the page may load already scrolled (refresh, or a #link)
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return scrolled;
}
