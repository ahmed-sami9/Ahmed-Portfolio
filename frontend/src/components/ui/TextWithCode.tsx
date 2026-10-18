type TextWithCodeProps = {
  text: string;
};

// Renders text where `backtick` parts are code, e.g. "They never touch `req` or `res`."
// The code parts get the mono font and a faint background, so file and function names
// stand out without the content (in src/data) having to contain any HTML.
//
// How: split on backticks. "a `b` c".split("`") -> ["a ", "b", " c"]:
// the odd-numbered pieces are always the ones that were inside backticks.
function TextWithCode({ text }: TextWithCodeProps) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 === 1 ? (
          <code
            key={i}
            className="rounded bg-text/[0.06] px-1 py-px font-mono text-[0.85em] text-text"
          >
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default TextWithCode;
