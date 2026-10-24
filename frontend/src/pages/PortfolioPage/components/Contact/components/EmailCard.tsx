import { useLocation } from "react-router";
import AccentCorner from "@/components/ui/AccentCorner";
import { ArrowRightIcon, MailIcon } from "@/components/ui/icons";
import { contact } from "@/data/contact";
import CopyButton from "./CopyButton";
import FrameTrace from "./FrameTrace";
import LocalTime from "./LocalTime";

// The main way to reach me, so it's the one framed card with the amber corner and the
// one solid amber button. The address is shown in full: a visitor without a mail app
// set up (common on work laptops) can still read it or copy it.
function EmailCard() {
  const { email } = contact;
  // Every navbar click to Contact is a new location (new key): remounting FrameTrace replays it.
  // Plain scrolling doesn't change the location, so the trace stays at "once".
  const location = useLocation();
  const traceKey = location.hash === "#contact" ? location.key : "scroll";

  return (
    <div className="relative flex flex-col rounded-2xl border border-line bg-text/[0.015] p-5 sm:p-7">
      <AccentCorner />
      <FrameTrace key={traceKey} />

      <p className="flex items-center gap-2 text-sm text-subtle">
        <MailIcon />
        Email
      </p>
      <p className="mt-3 font-mono text-lg break-all text-text sm:text-2xl">{email.address}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${email.address}`}
          className="group inline-flex items-center gap-2 rounded-full bg-accent-strong px-6 py-3 text-sm font-medium text-on-accent transition hover:brightness-105"
        >
          {email.cta}
          <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
        </a>
        <CopyButton text={email.address} label="email address" />
      </div>

      {/* mt-auto: when the card is stretched to the links column's height, this stays at the bottom */}
      <div className="mt-auto pt-8">
        <div className="space-y-1 border-t border-line pt-5 text-sm leading-relaxed text-muted">
          <p>{email.note}</p>
          <LocalTime />
        </div>
      </div>
    </div>
  );
}

export default EmailCard;
