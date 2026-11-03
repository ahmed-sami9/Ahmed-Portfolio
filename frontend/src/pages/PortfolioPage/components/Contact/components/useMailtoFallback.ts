import { useEffect, useRef, useState, type RefObject } from "react";

export type FallbackPhase = "hidden" | "shown" | "leaving";

const LEAVE_MS = 700; // = the fade-out in MailFallback

// A mailto: link silently does nothing when the visitor has no email app set up (common with
// web-only Gmail, or on work laptops), and the page can't ask the browser whether it worked.
//
// What it can see: when an email app opens, the page loses focus (window blur) or gets hidden.
// So after the click, wait a moment: if neither happened, assume nothing opened and say so.
// A visitor whose app did open never sees the fallback.
//
// Once shown, a click outside the card (or Escape) fades it out: "leaving" while it fades,
// then "hidden", which removes it from the page so the next miss is announced again.
export function useMailtoFallback(cardRef: RefObject<HTMLElement | null>, waitMs = 1500) {
  const [phase, setPhase] = useState<FallbackPhase>("hidden");
  const cleanupRef = useRef<() => void>(() => {});

  useEffect(() => () => cleanupRef.current(), []);

  // While shown: dismiss on a click outside the card, or on Escape
  useEffect(() => {
    if (phase !== "shown") return;

    const leave = () => setPhase("leaving");
    const onPointerDown = (event: PointerEvent) => {
      if (!cardRef.current?.contains(event.target as Node)) leave();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") leave();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [phase, cardRef]);

  // After the fade, take it out of the page
  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = window.setTimeout(() => setPhase("hidden"), LEAVE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const onClick = () => {
    cleanupRef.current(); // a second click starts a fresh check
    setPhase("hidden");

    const opened = () => cleanup();
    const timer = window.setTimeout(() => {
      cleanup();
      setPhase("shown");
    }, waitMs);

    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("blur", opened);
      document.removeEventListener("visibilitychange", opened);
    }

    window.addEventListener("blur", opened);
    document.addEventListener("visibilitychange", opened);
    cleanupRef.current = cleanup;
  };

  return { onClick, phase };
}
