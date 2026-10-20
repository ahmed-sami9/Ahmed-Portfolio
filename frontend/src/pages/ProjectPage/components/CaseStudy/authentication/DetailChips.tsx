type DetailChipsProps = {
  details: string[];
};

// The technical names behind a defense ("httpOnly", "argon2"...), as small mono chips.
// <code>, because they're literal names from the codebase; nowrap keeps "SameSite=Lax" whole.
function DetailChips({ details }: DetailChipsProps) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {details.map((detail) => (
        <code
          key={detail}
          className="rounded-md px-1.5 py-0.5 font-mono text-[11px] whitespace-nowrap text-muted ring-1 ring-line ring-inset"
        >
          {detail}
        </code>
      ))}
    </span>
  );
}

export default DetailChips;
