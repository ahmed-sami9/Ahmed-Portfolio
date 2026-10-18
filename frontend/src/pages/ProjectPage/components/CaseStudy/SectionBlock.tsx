import type { ReactNode } from "react";

type SectionBlockProps = {
  title: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
};

// A titled group inside a deep-dive section, e.g. "Backend layers" or "Request flow".
// An h4, because the section's own title is the h3.
function SectionBlock({ title, subtitle, className = "", children }: SectionBlockProps) {
  return (
    <div className={className}>
      <h4 className="text-sm font-medium text-text">{title}</h4>
      {subtitle && <p className="mt-1 text-sm text-subtle">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default SectionBlock;
