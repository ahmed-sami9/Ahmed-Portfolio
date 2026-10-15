import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";

// Placeholder shell: the about text and "How I build" approach come later.
function About() {
  return (
    <Section id="about" labelledBy="about-title" className="min-h-screen">
      <SectionHeading id="about-title" eyebrow="About me" title="More than just code" />
    </Section>
  );
}

export default About;
