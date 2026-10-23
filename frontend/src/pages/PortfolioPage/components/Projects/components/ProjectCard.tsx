import ProjectStatusBadge from "@/components/project/ProjectStatusBadge";
import ProjectTags from "@/components/project/ProjectTags";
import FrameCorners from "@/components/ui/FrameCorners";
import type { Project } from "@/data/projects";
import CardGlow from "./CardGlow";
import ProjectHighlights from "./ProjectHighlights";
import ProjectLinks from "./ProjectLinks";
import ProjectThumbnail from "./ProjectThumbnail";

type ProjectCardProps = {
  project: Project;
  number: number; // display position, shown as 01, 02...
};

// The one template every project uses; all content comes from `project`.
// One project per row, as a large rectangle: with only a few projects, each one gets the room
// to look like serious work, and the screenshot (what people judge first) is big enough to read.
//   phones: screenshot on top, text under it
//   md+:    screenshot on the left (46%), text beside it, vertically centered
function ProjectCard({ project, number }: ProjectCardProps) {
  const { slug, name, summary, highlights, stack, status, screenshots, links } = project;
  const titleId = `project-${slug}`;

  return (
    <li>
      <article
        aria-labelledby={titleId}
        // Hover/focus: a green gradient border (CardGlow) and a soft green glow fade in, so the
        // card reads as "selected". Green, not amber: amber is reserved for things you click.
        // No movement, only light, to stay calm.
        className="group/card relative flex flex-col gap-5 rounded-2xl border border-line bg-text/[0.02] p-3 transition-[border-color,box-shadow] duration-500 hover:border-transparent hover:shadow-[0_0_36px_-14px_var(--color-glow)] focus-within:border-transparent focus-within:shadow-[0_0_36px_-14px_var(--color-glow)] sm:p-4 md:flex-row md:items-center md:gap-8 lg:gap-10 lg:p-5"
      >
        <CardGlow />
        {/* the gold corners hand over to the green glow on hover, so the card never shows two frames */}
        <FrameCorners className="transition-opacity duration-500 group-hover/card:opacity-0 group-focus-within/card:opacity-0 motion-reduce:transition-none" />

        <div className="shrink-0 md:w-[46%]">
          <ProjectThumbnail name={name} screenshots={screenshots} />
        </div>

        {/* min-w-0 lets long text wrap inside the column instead of widening the card */}
        <div className="flex min-w-0 flex-1 flex-col px-1 pb-1 md:px-0 md:py-2 md:pr-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 id={titleId} className="font-display text-2xl tracking-tight text-text lg:text-3xl">
                {name}
              </h3>
              <ProjectStatusBadge status={status} />
            </div>
            <span aria-hidden className="font-display text-base text-subtle lg:text-lg">
              {String(number).padStart(2, "0")}
            </span>
          </div>

          <p className="mt-3 leading-relaxed text-pretty text-muted">{summary}</p>

          <div className="mt-4">
            <ProjectHighlights items={highlights} />
          </div>

          <div className="mt-5">
            <ProjectTags tags={stack} />
          </div>

          <div className="mt-5 border-t border-line pt-4">
            <ProjectLinks slug={slug} name={name} links={links} />
          </div>
        </div>
      </article>
    </li>
  );
}

export default ProjectCard;
