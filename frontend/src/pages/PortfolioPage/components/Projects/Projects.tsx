import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";

// Placeholder shell: the project cards, hover preview and case studies come next.
function Projects() {
  return (
    <Section id="projects" labelledBy="projects-title" className="min-h-screen">
      <SectionHeading id="projects-title" eyebrow="My projects" title="Things I've built" />
    </Section>
  );
}

export default Projects;
