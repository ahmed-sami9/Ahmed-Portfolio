type ChipListProps = {
  items: readonly string[];
  label: string; // names the list for screen readers, e.g. "Built with"
  muted?: boolean; // the dimmer second tier ("Familiar")
};

// Small mono chips for tools and languages. Mono because they're literal names.
function ChipList({ items, label, muted = false }: ChipListProps) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-md px-2.5 py-1 font-mono text-xs ring-1 ring-inset ${
            muted ? "text-subtle ring-line" : "text-text/90 ring-text/15"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default ChipList;
