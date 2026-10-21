import { useEffect, useState } from "react";

// The current time, refreshed on every step boundary (every whole minute by default),
// so a clock showing hours and minutes changes exactly when a real one does.
export function useNow(stepMs = 60_000) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timer: number;
    const scheduleNext = () => {
      timer = window.setTimeout(() => {
        setNow(new Date());
        scheduleNext();
      }, stepMs - (Date.now() % stepMs));
    };
    scheduleNext();
    return () => window.clearTimeout(timer);
  }, [stepMs]);

  return now;
}
