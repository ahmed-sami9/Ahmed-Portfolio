import { profile } from "../../data/profile";
import { MapPinIcon } from "../ui/icons";

// "Based in Egypt" with a pin. Used under the desktop portrait and next to the mobile avatar.
function LocationNote() {
  return (
    <p className="inline-flex items-center gap-1.5 text-xs text-subtle">
      <MapPinIcon />
      {profile.location}
    </p>
  );
}

export default LocationNote;
