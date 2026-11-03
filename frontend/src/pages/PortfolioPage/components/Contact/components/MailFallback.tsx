import { emailLinks } from "@/data/contact";
import type { FallbackPhase } from "./useMailtoFallback";

type MailFallbackProps = {
  phase: FallbackPhase;
};

const LINK = "text-text underline decoration-line underline-offset-4 transition-colors hover:decoration-accent";

// The way out when "Write to me" opened nothing: write from Gmail or Outlook in the browser,
// or copy the address with the button right above.
//
// The role="status" line is always in the page, empty until needed: screen readers only
// announce a status region's changes, not a region that appears already filled.
//
// Leaving: it fades out and its row closes at the same time (grid rows 1fr → 0fr), so the
// text below slides up gently instead of jumping when the line is removed.
function MailFallback({ phase }: MailFallbackProps) {
  const leaving = phase === "leaving";

  return (
    <div role="status" className="text-sm leading-relaxed text-muted">
      {phase !== "hidden" && (
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-700 ease-out motion-reduce:transition-none ${
            leaving ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
          }`}
        >
          <div className="overflow-hidden">
            <p className="pt-3 motion-safe:animate-fade-in">
              Nothing opened? Write from{" "}
              <a href={emailLinks.gmail} target="_blank" rel="noopener noreferrer" className={LINK}>
                Gmail
              </a>{" "}
              or{" "}
              <a href={emailLinks.outlook} target="_blank" rel="noopener noreferrer" className={LINK}>
                Outlook
              </a>{" "}
              in your browser, or copy the address.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MailFallback;
