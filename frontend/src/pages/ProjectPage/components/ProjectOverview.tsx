import FeatureList from "./FeatureList";

type ProjectOverviewProps = {
  features: string[];
  problem: string;
};

// Under the intro: what it does (key features) next to why it exists (the problem).
// Side by side from sm (640px), stacked on phones.
function ProjectOverview({ features, problem }: ProjectOverviewProps) {
  return (
    <div className="mt-8 grid gap-8 border-t border-line pt-6 sm:grid-cols-2 short:mt-6 short:pt-5">
      <section aria-labelledby="key-features">
        <h2 id="key-features" className="text-sm font-medium text-text">
          Key features
        </h2>
        <FeatureList features={features} />
      </section>

      <section aria-labelledby="the-problem">
        <h2 id="the-problem" className="text-sm font-medium text-text">
          The problem
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">{problem}</p>
      </section>
    </div>
  );
}

export default ProjectOverview;
