type SqlLineProps = {
  line: string;
};

// The SQL words worth coloring. Not a full highlighter: just enough that the statement's
// shape (INSERT ... ON CONFLICT ... DO UPDATE) jumps out.
const KEYWORDS = new Set([
  "AND", "AS", "BEGIN", "COMMIT", "CONFLICT", "CONSTRAINT", "DO", "EXCLUDED", "FROM", "INSERT",
  "INTO", "JOIN", "ON", "RETURNING", "ROLLBACK", "SELECT", "SET", "UPDATE", "VALUES", "WHERE",
]);

// One line of SQL with light syntax coloring:
//   keywords   → amber      parameters ($1, $2...) → green, they're the injection-safe part
//   comments   → dim        everything else         → normal text
function SqlLine({ line }: SqlLineProps) {
  const commentAt = line.indexOf("--");
  const code = commentAt === -1 ? line : line.slice(0, commentAt);
  const comment = commentAt === -1 ? "" : line.slice(commentAt);

  // Split into words, parameters and everything between (kept, so spacing is preserved)
  const tokens = code.split(/(\$\d+|\b[A-Za-z_]+\b)/);

  return (
    <>
      {tokens.map((token, i) => {
        if (KEYWORDS.has(token)) return <span key={i} className="text-accent/90">{token}</span>;
        if (/^\$\d+$/.test(token)) return <span key={i} className="text-glow">{token}</span>;
        return token;
      })}
      {comment && <span className="text-subtle italic">{comment}</span>}
    </>
  );
}

export default SqlLine;
