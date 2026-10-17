import type { Project } from "@/data/projects";
import CardGlow from "./CardGlow";
import ProjectLinks from "./ProjectLinks";
import ProjectStatusBadge from "./ProjectStatusBadge";
import ProjectTags from "./ProjectTags";
import ProjectThumbnail from "./ProjectThumbnail";

type ProjectCardProps = {
  project: Project;
  number: number; // display position, shown as 01, 02...
};

// The one template every project uses; all content comes from `project`.
// A wide, short card at every screen size: small thumbnail on the left, text on the right.
// It shows just enough to decide whether to look closer; the hover window and
// "View project" carry the rest.
function ProjectCard({ project, number }: ProjectCardProps) {
  const { slug, name, summary, stack, status, screenshots, links } = project;
  const titleId = `project-${slug}`;

  return (
    <li>
      <article
        aria-labelledby={titleId}
        // Hover/focus: a green gradient border (CardGlow) and a soft green glow fade in, so the
        // card reads as "selected". Green, not amber: amber is reserved for things you click.
        // No movement, only light, to stay calm.
        className="group/card relative flex h-full gap-4 rounded-2xl border border-line bg-text/[0.02] p-3 transition-[border-color,box-shadow] duration-500 hover:border-transparent hover:shadow-[0_0_36px_-14px_var(--color-glow)] focus-within:border-transparent focus-within:shadow-[0_0_36px_-14px_var(--color-glow)] sm:gap-5 sm:p-4"
      >
        <CardGlow />

        {/* self-start: the thumbnail keeps its own shape instead of stretching to the card */}
        <div className="w-32 shrink-0 self-start sm:w-44">
          <ProjectThumbnail name={name} screenshots={screenshots} />
        </div>

        {/*
          min-w-0 lets the text wrap inside the row instead of widening the card.
          @container makes this column the thing ProjectTags measures to decide how many fit.
        */}
        <div className="@container flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 id={titleId} className="font-display text-xl tracking-tight text-text">
                {name}
              </h3>
              <ProjectStatusBadge status={status} />
            </div>
            <span aria-hidden className="font-display text-base text-subtle">
              {String(number).padStart(2, "0")}
            </span>
          </div>

          {/* Capped at two lines so every card keeps the same thin height */}
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">{summary}</p>

          {/*
            Tags and links share one row when there's room (keeps the card short),
            and the links drop to their own line when there isn't. mt-auto pins this row
            to the bottom, so cards in a row line up.
          */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-1">
            <ProjectTags tags={stack} collapsedMax={3} />
            <div className="ml-auto">
              <ProjectLinks name={name} links={links} />
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

export default ProjectCard;
