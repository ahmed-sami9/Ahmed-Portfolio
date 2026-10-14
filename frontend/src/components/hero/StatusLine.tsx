import type { CSSProperties } from "react";

type StatusLineProps = { text: string };

// A terminal-style status line: types itself out once, then a cursor keeps blinking.
// The typing is pure CSS: the text box grows from 0 to N characters wide in N steps.
// 1ch = the width of one character, and that only works because the font is monospace.
function StatusLine({ text }: StatusLineProps) {
  const style = { "--chars": text.length } as CSSProperties;

  return (
    <p className="flex items-center gap-3 font-mono text-sm text-muted">
      <span aria-hidden className="text-accent">
        $
      </span>
      <span
        style={style}
        className="inline-block overflow-hidden whitespace-nowrap motion-safe:animate-typing"
      >
        {text}
      </span>
      <span
        aria-hidden
        className="-ml-2 h-4 w-[2px] bg-accent motion-safe:animate-blink"
      />
    </p>
  );
}

export default StatusLine;
