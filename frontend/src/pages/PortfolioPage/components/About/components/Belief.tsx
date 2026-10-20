import { about } from "@/data/about";

// The closing line: the one amber accent in the section, on the line meant to be remembered.
// No single word highlighted: that would decide which half people read as the point.
function Belief() {
  return (
    <blockquote className="border-l-2 border-accent pl-5 sm:pl-6">
      <p className="max-w-3xl font-display text-2xl leading-snug text-balance text-text italic sm:text-3xl">
        {about.belief}
      </p>
    </blockquote>
  );
}

export default Belief;
