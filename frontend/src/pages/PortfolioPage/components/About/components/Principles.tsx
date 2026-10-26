import { about } from "@/data/about";

// Numbered, because the order goes from thinking to building to handing over.
// Dividers between them: stacked rows on phones, side-by-side columns from md.
function Principles() {
  return (
    <ol className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
      {about.principles.map((principle, i) => (
        <li
          key={principle.title}
          className="py-5 first:pt-0 last:pb-0 md:px-6 md:py-0 md:first:pl-0 md:last:pr-0"
        >
          <span aria-hidden className="font-mono text-sm text-subtle">
            {String(i + 1).padStart(2, "0")}
          </span>
          {/* serif, like the headline and the closing quote: this is how I work, in my voice */}
          <p className="mt-2 font-display text-xl tracking-tight text-text lg:text-2xl">{principle.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{principle.text}</p>
        </li>
      ))}
    </ol>
  );
}

export default Principles;
