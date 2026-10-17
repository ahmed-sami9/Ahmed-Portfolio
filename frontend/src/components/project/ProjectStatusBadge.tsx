import type { ProjectStatus } from "@/data/projects";

const labels: Record<ProjectStatus, string> = {
  live: "Live",
  "in-development": "In development",
};

// Honest status up front, so nobody clicks expecting a demo that isn't deployed yet.
function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] whitespace-nowrap text-subtle">
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${status === "live" ? "bg-success" : "bg-accent"}`}
      />
      {labels[status]}
    </span>
  );
}

export default ProjectStatusBadge;
