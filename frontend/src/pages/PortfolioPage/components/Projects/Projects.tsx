import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import TerminalLine from "@/components/ui/TerminalLine";
import { projects, projectsSection } from "@/data/projects";
import ProjectCard from "./components/ProjectCard";

function Projects() {
  const { eyebrow, title, description, moreLink } = projectsSection;

  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeading
        id="projects-title"
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      {/* One project per row at every width: a few strong projects, each given its own space */}
      <ul aria-label="Projects" className="mt-14 grid gap-6 lg:mt-16 lg:gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} number={index + 1} />
        ))}
      </ul>

      {/* The section ends on the site's terminal signature, here doing a job: linking to GitHub */}
      <div className="mt-12 border-t border-line pt-6">
        <TerminalLine text={moreLink.label} href={moreLink.href} />
      </div>
    </Section>
  );
}

export default Projects;
