import type { ReactNode } from "react";
import AccentCorner from "@/components/ui/AccentCorner";

type BlockFrameProps = {
  title: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
};

// One titled block of a section, in its own bordered frame, so a long section reads as a few
// clear parts ("Four ways in, one session", "If someone tries to…").
//
// The amber corner sits on the TOP-LEFT only, where the title is: it marks "a new block starts
// here". The outer Technical details box keeps all four corners (PanelCorners), so the two
// levels never look the same.
//
// The content is a @container: blocks lay themselves out by the frame's own width, which is
// what's left after the sidebar, not by the screen's.
function BlockFrame({ title, subtitle, className = "", children }: BlockFrameProps) {
  return (
    <section className={`relative rounded-2xl border border-line bg-text/[0.015] p-3.5 sm:p-5 ${className}`}>
      <AccentCorner />
      <h4 className="text-sm font-medium text-text">{title}</h4>
      {subtitle && <p className="mt-1 text-sm text-subtle">{subtitle}</p>}
      <div className="@container mt-4">{children}</div>
    </section>
  );
}

export default BlockFrame;
