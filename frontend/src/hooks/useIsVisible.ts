import { useEffect, useRef, useState } from "react";

// Steps the observer reports at, so "fully visible" is noticed close to the moment it happens
const THRESHOLDS = [0, 0.25, 0.5, 0.75, 0.9, 0.95, 1];

// true while the element is FULLY on screen, or, if it's taller than the screen, while it covers
// most of it (90%). false again once part of it leaves. Unlike useInView (true once, for one-off
// animations), this follows the element both ways, for things that should only run while
// they can be seen, like the project cards' auto-playing screenshots.
export function useIsVisible<T extends Element>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const screenHeight = entry.rootBounds?.height ?? window.innerHeight;
        const seen = entry.intersectionRect.height;
        const whole = seen >= entry.boundingClientRect.height - 2;
        const fillsScreen = seen >= screenHeight * 0.9;
        setVisible(entry.isIntersecting && (whole || fillsScreen));
      },
      { threshold: THRESHOLDS },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
