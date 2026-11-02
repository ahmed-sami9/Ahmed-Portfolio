import { useLayoutEffect, useState, type RefObject } from "react";

const GAP_BEFORE_END = 40; // space between the links and the Resume link (2.5rem)

// How far the centered links move right while the page is at the top. The navbar applies it as
// a transform, and removes it once scrolled, so the links glide to the center.
//
// Where they go:
//   - a page can mark an element with `data-nav-align` (the hero photo does): the links start at
//     its left edge, so each column below has something lined up above it
//   - otherwise: they end at the bar's right edge, or just before the Resume link
//   - never further right than that edge, so they can't run into the Resume link
//
// The links' own position is measured with offsetLeft/offsetWidth, not getBoundingClientRect:
// offsets ignore transforms, so it's always their real (centered) position, even mid-slide.
// Re-measured on resize, font load, a Resume link appearing, and on every page change
// (`pathname`), since only some pages have an element to line up with.
export function useNavOffset(
  barRef: RefObject<HTMLElement | null>,
  navRef: RefObject<HTMLElement | null>,
  endRef: RefObject<HTMLElement | null>,
  pathname: string,
) {
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const nav = navRef.current;
    if (!bar || !nav) return;
    const anchor = document.querySelector<HTMLElement>("[data-nav-align]");

    const measure = () => {
      // display:none (phones) has no layout: nothing to move
      if (!nav.offsetParent) return setOffset(0);

      const end = endRef.current;
      const paddingRight = parseFloat(getComputedStyle(bar).paddingRight);
      const maxRight =
        end && end.offsetParent
          ? end.offsetLeft - GAP_BEFORE_END
          : bar.offsetLeft + bar.offsetWidth - paddingRight;
      const furthest = maxRight - (nav.offsetLeft + nav.offsetWidth);

      let wanted = furthest;
      if (anchor) {
        // The anchor lives elsewhere in the page, so compare both in screen coordinates
        const navLeft = bar.getBoundingClientRect().left - bar.offsetLeft + nav.offsetLeft;
        wanted = anchor.getBoundingClientRect().left - navLeft;
      }

      setOffset(Math.max(0, Math.round(Math.min(wanted, furthest))));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    observer.observe(nav);
    if (endRef.current) observer.observe(endRef.current);
    if (anchor) observer.observe(anchor);
    return () => observer.disconnect();
  }, [barRef, navRef, endRef, pathname]);

  return offset;
}
