import { about } from "@/data/about";

// The screening facts in one line, readable in two seconds without reading a paragraph.
// Dots are drawn by CSS (before:), so screen readers hear a plain list. Phones stack the
// facts instead: wrapped lines would start with a dot.
function FactStrip() {
  return (
    <ul className="flex flex-col gap-x-4 gap-y-2 border-y border-line py-4 font-mono sm:flex-row sm:flex-wrap text-xs text-muted">
      {about.facts.map((fact) => (
        <li
          key={fact}
          className="flex items-center gap-4 sm:not-first:before:text-subtle sm:not-first:before:content-['·']"
        >
          {fact}
        </li>
      ))}
    </ul>
  );
}

export default FactStrip;
