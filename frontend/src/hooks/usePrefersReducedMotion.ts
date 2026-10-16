import { useEffect, useState } from "react";

const query = "(prefers-reduced-motion: reduce)";

// true when the visitor has asked their system for less motion.
// CSS handles this with motion-safe: / motion-reduce:, but JavaScript-driven motion
// (like auto-cycling screenshots) needs to know too.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
