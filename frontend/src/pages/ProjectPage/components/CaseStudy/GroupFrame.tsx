import type { ReactNode } from "react";

type GroupFrameProps = {
  className?: string;
  children: ReactNode;
};

// A soft frame that says "these blocks are one part", e.g. the backend layers together with
// the rule that explains them.
//
// It reuses the project cards' hover ring (card-glow-ring in index.css: green gradient plus a
// small gold glint), toned down to half strength. A gradient on purpose: the items inside
// already have thin grey borders, so a grey frame around them would read as "boxes in boxes";
// the gradient reads as a different, outer level.
function GroupFrame({ className = "", children }: GroupFrameProps) {
  return (
    <div className={`relative rounded-2xl p-4 sm:p-5 ${className}`}>
      <span
        aria-hidden
        className="card-glow-ring pointer-events-none absolute inset-0 rounded-2xl opacity-50"
      />
      {children}
    </div>
  );
}

export default GroupFrame;
