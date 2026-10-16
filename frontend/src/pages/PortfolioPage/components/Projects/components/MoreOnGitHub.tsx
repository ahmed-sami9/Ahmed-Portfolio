import { ArrowRightIcon } from "@/components/ui/icons";
import { projectsSection } from "@/data/projects";

// The quiet way out at the end of the section: everything that didn't make the cut lives on GitHub.
function MoreOnGitHub() {
  const { label, href } = projectsSection.moreLink;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
    >
      {label}
      <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
    </a>
  );
}

export default MoreOnGitHub;
