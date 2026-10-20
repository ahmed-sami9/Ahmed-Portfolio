import type { CSSProperties } from "react";
import { useInView } from "@/hooks/useInView";

type TerminalLineProps = {
  text: string;
  href?: string; // makes the whole line a link: "#id" scrolls on this page, anything else opens a new tab
};

// The site's signature: a terminal prompt that types itself out once, then a cursor keeps blinking.
//
// Typing is pure CSS: the text box grows from 0 to N characters wide in N steps.
// 1ch = the width of one character, which only works because the font is monospace.
// It starts when the line scrolls into view, so a line further down the page
// doesn't finish typing before anyone sees it.
function TerminalLine({ text, href }: TerminalLineProps) {
  const { ref, inView } = useInView<HTMLParagraphElement>();
  const style = { "--chars": text.length } as CSSProperties;
  const isExternal = href !== undefined && !href.startsWith("#");

  const typedText = (
    <span
      style={style}
      // Before it's in view the text is collapsed (width 0), so it doesn't flash fully typed
      // and then restart. With reduced motion neither class applies: the text is just shown.
      className={`inline-block overflow-hidden whitespace-nowrap ${
        inView ? "motion-safe:animate-typing" : "motion-safe:w-0"
      }`}
    >
      {text}
    </span>
  );

  return (
    <p ref={ref} className="flex items-center gap-3 font-mono text-sm text-muted">
      <span aria-hidden className="text-accent">
        $
      </span>

      {href ? (
        <a
          href={href}
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
          className="transition-colors hover:text-accent"
        >
          {typedText}
          {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      ) : (
        typedText
      )}

      <span aria-hidden className="-ml-2 h-4 w-[2px] bg-accent motion-safe:animate-blink" />
    </p>
  );
}

export default TerminalLine;
