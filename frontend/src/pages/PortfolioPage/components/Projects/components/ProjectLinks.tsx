import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon } from "@/components/ui/icons";
import type { Project } from "@/data/projects";

type ProjectLinksProps = {
  name: string; // makes each link's purpose clear to screen readers
  links: Project["links"];
};

// "View project" as the main action, then small icon links for the demo and the code.
// Each one only renders if the project has that link.
function ProjectLinks({ name, links }: ProjectLinksProps) {
  const { caseStudy, demo, repo } = links;
  if (!caseStudy && !demo && !repo) return null;

  const iconLink =
    "grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-text/5 hover:text-text";

  return (
    <div className="flex items-center gap-3">
      {caseStudy && (
        <a href={caseStudy} className="group/link inline-flex items-center gap-1.5 text-sm text-accent">
          View project
          <span className="sr-only">: {name}</span>
          <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover/link:translate-x-0.5" />
        </a>
      )}

      <div className="-mr-1.5 flex items-center gap-1">
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} live demo (opens in a new tab)`}
            title="Live demo"
            className={iconLink}
          >
            <ArrowUpRightIcon />
          </a>
        )}
        {repo && (
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} code on GitHub (opens in a new tab)`}
            title="Code on GitHub"
            className={iconLink}
          >
            <GitHubIcon />
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectLinks;
