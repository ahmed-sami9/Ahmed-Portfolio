import { contact } from "@/data/contact";
import { useNow } from "@/hooks/useNow";

// "It's 2:32 PM in Cairo right now (UTC+3)."
// The time is formatted in the VISITOR's own style (12h or 24h), so it reads naturally to them.
// The offset is computed, not written down: Egypt switches daylight saving time on and off,
// and a hard-coded "UTC+2" would be wrong half the year.
function LocalTime() {
  const now = useNow();
  const { id, city } = contact.timeZone;

  const time = new Intl.DateTimeFormat(undefined, {
    timeZone: id,
    hour: "numeric",
    minute: "2-digit",
  }).format(now);

  const offset = new Intl.DateTimeFormat("en-US", { timeZone: id, timeZoneName: "shortOffset" })
    .formatToParts(now)
    .find((part) => part.type === "timeZoneName")
    ?.value.replace("GMT", "UTC");

  return (
    <p>
      It’s <span className="font-mono text-text">{time}</span> in {city} right now
      {offset && <span className="text-subtle"> ({offset})</span>}.
    </p>
  );
}

export default LocalTime;
