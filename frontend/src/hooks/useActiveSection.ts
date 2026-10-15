import { useEffect, useState } from "react";

// Returns the id of the section the visitor is currently reading.
//
// Rule: the active section is the last one whose top has passed an imaginary line
// 40% down the screen. Near the very bottom of the page the last section wins,
// because a short final section (like Contact) may never reach that line.
export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const line = window.innerHeight * 0.4;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      let current = ids[0];
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) current = id;
      }
      setActiveId(atBottom ? ids[ids.length - 1] : current);
    };

    // Scroll events fire many times per frame; requestAnimationFrame
    // makes sure we measure at most once per painted frame.
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return activeId;
}
