import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon } from "@/components/ui/icons";
import { Link } from "react-router";
import { projectPath, type Project } from "@/data/projects";

type ProjectLinksProps = {
  slug: string; // "See details" goes to this project's page
  name: string; // makes each link's purpose clear to screen readers
  links: Project["links"];
};

// Each label says exactly where it goes, so nobody clicks expecting the running app and
// lands on a write-up:
//   "See details"  -> the project page (features + technical deep dive), same tab
//   "Live demo"    -> the running app, new tab: written out, not an icon, because it's the
//                     link people want most (only shown once the project has a demo)
//   GitHub icon    -> the code, new tab
function ProjectLinks({ slug, name, links }: ProjectLinksProps) {
  const { demo, repo } = links;

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <Link
        to={projectPath(slug)}
        className="group/link inline-flex items-center gap-1.5 text-sm text-accent"
      >
        See details
        <span className="sr-only">: {name}</span>
        <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover/link:translate-x-0.5" />
      </Link>

      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-text"
        >
          Live demo
          <ArrowUpRightIcon />
          <span className="sr-only"> of {name} (opens in a new tab)</span>
        </a>
      )}

      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} code on GitHub (opens in a new tab)`}
          title="Code on GitHub"
          className="-mx-1.5 grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-text/5 hover:text-text"
        >
          <GitHubIcon />
        </a>
      )}
    </div>
  );
}

export default ProjectLinks;
