import { Link } from "react-router";
import { ArrowRightIcon } from "@/components/ui/icons";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

// Shown for any URL that doesn't exist, including /projects/<a slug that doesn't exist>.
// Better than a blank page: it says what happened and gives one way out.
function NotFoundPage() {
  useDocumentTitle("Page not found");

  return (
    <main className="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-page flex-col justify-center px-4 pb-20 sm:px-6 lg:px-8">
      <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">404</p>
      <h1 className="mt-4 font-display text-4xl tracking-tight text-text sm:text-5xl">
        This page doesn’t exist
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-muted">
        The link may be old or mistyped. Everything I’ve built is on the home page.
      </p>
      <Link
        to="/#projects"
        className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-accent-strong px-6 py-3 text-sm font-medium text-on-accent transition hover:brightness-105"
      >
        See my projects
        <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
      </Link>
    </main>
  );
}

export default NotFoundPage;
