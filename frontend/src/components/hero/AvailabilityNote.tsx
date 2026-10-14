import { profile } from "../../data/profile";
import { MapPinIcon } from "../ui/icons";

type AvailabilityNoteProps = {
  // "inline": one row with a separator (under the desktop portrait)
  // "stacked": two lines (next to the mobile avatar)
  layout?: "inline" | "stacked";
};

// The two practical facts a recruiter checks first: where you are, and whether you're available.
function AvailabilityNote({ layout = "inline" }: AvailabilityNoteProps) {
  const isInline = layout === "inline";

  return (
    <p
      className={`flex text-xs text-subtle ${
        isInline ? "flex-wrap items-center justify-end gap-2" : "flex-col items-start gap-1.5"
      }`}
    >
      <span className="inline-flex items-center gap-1.5">
        <MapPinIcon />
        {profile.location}
      </span>

      {isInline && <span aria-hidden>·</span>}

      <span className="inline-flex items-center gap-1.5 text-muted">
        <span aria-hidden className="size-1.5 rounded-full bg-success" />
        {profile.availability}
      </span>
    </p>
  );
}

export default AvailabilityNote;
