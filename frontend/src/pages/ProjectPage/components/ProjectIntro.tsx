import { useEffect, useRef } from "react";
import ProjectTags from "@/components/project/ProjectTags";
import type { Project } from "@/data/projects";
import ProjectActions from "./ProjectActions";

type ProjectIntroProps = {
  project: Project;
};

// Name, what it is, the one-line summary, the stack and the two actions.
function ProjectIntro({ project }: ProjectIntroProps) {
  const { name, tagline, role, summary, stack, links } = project;
  const titleRef = useRef<HTMLHeadingElement>(null);

  // On a single-page app, opening a new "page" doesn't move keyboard/screen-reader focus
  // the way a real page load does: it stays on the link you clicked, which is now gone.
  // So we move it to the title: a screen reader announces "Diraya, heading", and Tab
  // continues from here. preventScroll: the router already handles scrolling.
  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div>
      <h1
        ref={titleRef}
        id="project-title"
        tabIndex={-1} // focusable from code, but not a Tab stop
        className="font-display text-4xl tracking-tight text-text outline-none sm:text-5xl"
      >
        {name}
      </h1>

      {/* Each part stays on one line; if they don't fit side by side, they wrap at the "·" */}
      <p className="mt-2 font-mono text-xs tracking-[0.15em] text-accent uppercase">
        <span className="whitespace-nowrap">{tagline}</span> ·{" "}
        <span className="whitespace-nowrap">{role}</span>
      </p>

      <p className="mt-4 max-w-prose leading-relaxed text-muted short:mt-3">{summary}</p>

      <div className="mt-5 short:mt-4">
        <ProjectTags tags={stack} />
      </div>

      <ProjectActions name={name} links={links} />
    </div>
  );
}

export default ProjectIntro;
