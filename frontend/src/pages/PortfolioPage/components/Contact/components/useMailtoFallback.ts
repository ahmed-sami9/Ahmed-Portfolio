import { useEffect, useRef, useState } from "react";

// A mailto: link silently does nothing when the visitor has no email app set up (common with
// web-only Gmail, or on work laptops), and the page can't ask the browser whether it worked.
//
// What it can see: when an email app opens, the page loses focus (window blur) or gets hidden.
// So after the click, wait a moment: if neither happened, assume nothing opened and say so.
// A visitor whose app did open never sees the fallback.
export function useMailtoFallback(waitMs = 1500) {
  const [missed, setMissed] = useState(false);
  const cleanupRef = useRef<() => void>(() => {});

  useEffect(() => () => cleanupRef.current(), []);

  const onClick = () => {
    cleanupRef.current(); // a second click starts a fresh check
    setMissed(false);

    const opened = () => cleanup();
    const timer = window.setTimeout(() => {
      cleanup();
      setMissed(true);
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

  return { onClick, missed };
}
