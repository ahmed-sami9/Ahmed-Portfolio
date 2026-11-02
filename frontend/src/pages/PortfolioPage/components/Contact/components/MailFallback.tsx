import { emailLinks } from "@/data/contact";

type MailFallbackProps = {
  show: boolean;
};

const LINK = "text-text underline decoration-line underline-offset-4 transition-colors hover:decoration-accent";

// The way out when "Write to me" opened nothing: write from Gmail or Outlook in the browser,
// or copy the address with the button right above.
//
// The role="status" line is always in the page, empty until needed: screen readers only
// announce a status region's changes, not a region that appears already filled.
function MailFallback({ show }: MailFallbackProps) {
  return (
    <p role="status" className="text-sm leading-relaxed text-muted">
      {show && (
        <span className="mt-3 block motion-safe:animate-fade-in">
          Nothing opened? Write from{" "}
          <a href={emailLinks.gmail} target="_blank" rel="noopener noreferrer" className={LINK}>
            Gmail
          </a>{" "}
          or{" "}
          <a href={emailLinks.outlook} target="_blank" rel="noopener noreferrer" className={LINK}>
            Outlook
          </a>{" "}
          in your browser, or copy the address.
        </span>
      )}
    </p>
  );
}

export default MailFallback;
