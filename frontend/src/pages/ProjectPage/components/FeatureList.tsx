import { CheckIcon } from "@/components/ui/icons";

type FeatureListProps = {
  features: string[];
};

// The key features as a checklist: a small amber tick, then the feature.
function FeatureList({ features }: FeatureListProps) {
  return (
    <ul className="mt-3 space-y-2.5">
      {features.map((feature) => (
        <li key={feature} className="flex gap-2.5 text-sm leading-relaxed text-muted">
          <CheckIcon className="mt-1 size-3.5 shrink-0 text-accent" />
          {feature}
        </li>
      ))}
    </ul>
  );
}

export default FeatureList;
