import { ArrowRightIcon, GitHubIcon } from "@/components/ui/icons";
import type { Project } from "@/data/projects";

type ProjectActionsProps = {
  name: string;
  links: Project["links"];
};

// The two things a visitor can do: try it, or read the code.
// Both open in a new tab: they leave this site, and the visitor shouldn't lose the portfolio.
//
// "Live demo" always shows. Until the project has a demo URL in the data, it's a button that
// does nothing, marked aria-disabled so screen readers say it's unavailable.
// TEMPORARY: must be a real link (or removed) before the portfolio goes public.
// See "Before launch" in CLAUDE.md.
function ProjectActions({ name, links }: ProjectActionsProps) {
  const { demo, demoNote, repo } = links;
  const primary =
    "group inline-flex items-center gap-2 rounded-full bg-accent-strong px-5 py-2.5 text-sm font-medium text-on-accent transition hover:brightness-105";
  const arrow = (
    <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
  );

  return (
    <div className="mt-6 short:mt-5">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {demo ? (
          <a href={demo} target="_blank" rel="noopener noreferrer" className={primary}>
            Live demo
            <span className="sr-only">of {name} (opens in a new tab)</span>
            {arrow}
          </a>
        ) : (
          <button type="button" aria-disabled="true" title="Demo coming soon" className={primary}>
            Live demo
            <span className="sr-only">: coming soon</span>
            {arrow}
          </button>
        )}

        {repo && (
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
          >
            <GitHubIcon />
            Source code
            <span className="sr-only">of {name} on GitHub (opens in a new tab)</span>
          </a>
        )}
      </div>

      {demo && demoNote && <p className="mt-3 text-xs text-subtle">{demoNote}</p>}
    </div>
  );
}

export default ProjectActions;
