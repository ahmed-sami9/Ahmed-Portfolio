import ProjectStatusBadge from "@/components/project/ProjectStatusBadge";
import type { Project } from "@/data/projects";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import CloseButton from "./CloseButton";
import ExploreDetailsButton from "./ExploreDetailsButton";
import PanelCorners from "./PanelCorners";
import ProjectGallery from "./ProjectGallery";
import ProjectIntro from "./ProjectIntro";
import ProjectOverview from "./ProjectOverview";

type ProjectPanelProps = {
  project: Project;
  number: number; // its position in the portfolio, shown as "Project 01"
};

// The project's first level: one framed panel with everything a visitor needs to decide
// whether it's worth a closer look. Screenshots on the left, the intro on the right,
// then the key features next to the problem it solves, and a button down to the deep dive.
//
// Layout: one column on phones and tablets (screenshots first, since they're the proof),
// two columns from lg (1024px).
function ProjectPanel({ project, number }: ProjectPanelProps) {
  useDocumentTitle(project.name);

  return (
    <article
      aria-labelledby="project-title"
      className="relative rounded-2xl border border-line bg-text/[0.02] p-5 sm:p-7 lg:p-8 short:py-6"
    >
      <PanelCorners />

      {/* Header row: which project and its status on the left, close on the right.
          The status sits here, with the facts about the project, not in the title area. */}
      <div className="mb-5 flex items-center justify-between gap-4 short:mb-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
            Project {String(number).padStart(2, "0")}
          </p>
          <ProjectStatusBadge status={project.status} />
        </div>
        <CloseButton />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <ProjectGallery screenshots={project.screenshots} />

        <div>
          <ProjectIntro project={project} />
          <ProjectOverview features={project.features} problem={project.problem} />
        </div>
      </div>

      <ExploreDetailsButton />
    </article>
  );
}

export default ProjectPanel;
