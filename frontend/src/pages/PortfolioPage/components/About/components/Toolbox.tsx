import { about } from "@/data/about";
import ChipList from "./ChipList";

// Two honest tiers. A tier with nothing in it isn't shown, so "Familiar" appears once it's earned.
function Toolbox() {
  const { builtWith, familiar } = about.toolbox;

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm text-muted">Built with</p>
        <ChipList items={builtWith} label="Built with" />
      </div>
      {familiar.length > 0 && (
        <div>
          <p className="mb-2 text-sm text-muted">Familiar with</p>
          <ChipList items={familiar} label="Familiar with" muted />
        </div>
      )}
    </div>
  );
}

export default Toolbox;
