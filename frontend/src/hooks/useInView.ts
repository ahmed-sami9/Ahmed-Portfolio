import { useEffect, useRef, useState } from "react";

// Becomes true the first time the element scrolls into view, and stays true.
// Used to start animations when they can actually be seen, instead of on page load.
//
// IntersectionObserver is the browser's built-in way to ask "is this element on screen?".
// It's cheaper than listening to scroll events: the browser tells us, we don't keep checking.
export function useInView<T extends Element>(threshold = 0.6) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // once is enough: the animation only plays one time
        }
      },
      { threshold }, // 0.6 = at least 60% of the element must be visible
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
