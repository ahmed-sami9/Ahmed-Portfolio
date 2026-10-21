import { ArrowUpIcon } from "@/components/ui/icons";
import { footer } from "@/data/footer";
import { profile } from "@/data/profile";

// The page's quiet ending, shared by every page. "Source on GitHub" matters more than it looks:
// for a developer's portfolio, the site's own code is one more work sample.
//
// "Back to top" is a button, not a link: it scrolls (smoothly, unless reduced motion is on,
// via the global scroll-behavior) and then moves keyboard focus to the navbar's first link,
// so the next Tab continues from the top instead of jumping back down here.
function Footer() {
  function backToTop() {
    window.scrollTo({ top: 0 });
    document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true });
  }

  return (
    <footer className="mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-t border-line py-8 text-sm text-subtle md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-display text-lg text-text">
            {profile.initials}
            <span className="text-accent">.</span>
          </span>
          <span className="ml-3">
            © {new Date().getFullYear()} {profile.name}
          </span>
        </p>

        <p>
          {footer.builtWith} ·{" "}
          <a
            href={profile.links.source}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {footer.sourceLabel}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>

        <button
          type="button"
          onClick={backToTop}
          className="inline-flex items-center gap-2 self-start text-muted transition-colors hover:text-text md:self-auto"
        >
          {footer.backToTop}
          <ArrowUpIcon />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
