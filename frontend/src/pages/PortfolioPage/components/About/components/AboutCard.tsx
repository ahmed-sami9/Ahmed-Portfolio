import type { ReactNode } from "react";

type AboutCardProps = {
  label: string;
  children: ReactNode;
};

// One of the three detail blocks under the facts. Same label style for all three, so they
// read as a set; no numbers, because they have no order.
function AboutCard({ label, children }: AboutCardProps) {
  return (
    <section className="rounded-2xl border border-line bg-text/[0.015] p-5 sm:p-6">
      <h3 className="font-mono text-xs tracking-[0.25em] text-subtle uppercase">{label}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default AboutCard;
