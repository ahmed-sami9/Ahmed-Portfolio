import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

type CopyButtonProps = {
  text: string; // what gets copied
  label: string; // what it is, for screen readers: "email address"
};

type Status = "idle" | "copied" | "failed";

const VISIBLE = { idle: "Copy", copied: "Copied", failed: "Couldn’t copy" } as const;

// Copies to the clipboard and says so for 2 seconds.
// The visible label changes for sighted users; the role="status" line announces the result
// to screen readers, which don't re-read a button just because its text changed.
function CopyButton({ text, label }: CopyButtonProps) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      // No clipboard access (old browser, or not allowed): the address is still on screen to select
      setStatus("failed");
    }
  }

  const Icon = status === "copied" ? CheckIcon : CopyIcon;

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-muted transition-colors hover:border-subtle hover:text-text"
      >
        <Icon className={`size-4 ${status === "copied" ? "text-accent" : ""}`} />
        {VISIBLE[status]}
        <span className="sr-only"> {label}</span>
      </button>
      <span role="status" className="sr-only">
        {status === "copied" && `${label} copied`}
        {status === "failed" && `Couldn’t copy the ${label}`}
      </span>
    </>
  );
}

export default CopyButton;
