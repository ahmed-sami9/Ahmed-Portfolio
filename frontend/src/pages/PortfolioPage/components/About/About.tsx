import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import TerminalLine from "@/components/ui/TerminalLine";
import { about } from "@/data/about";
import AboutCard from "./components/AboutCard";
import AboutPhoto from "./components/AboutPhoto";
import Belief from "./components/Belief";
import ChipList from "./components/ChipList";
import Principles from "./components/Principles";
import Toolbox from "./components/Toolbox";

// Who I am → how I work and the details (every block framed, so each one starts and ends
// visibly) → what I stand for → the same closing as Projects: a divider and a terminal line.
function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.title} />
          <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-muted">
            {about.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <AboutPhoto />
      </div>

      <div className="mt-16 space-y-4 lg:mt-20">
        <AboutCard label="How I work">
          <Principles />
        </AboutCard>

        <div className="grid gap-4 lg:grid-cols-3">
          <AboutCard label="How I learn">
            <p className="leading-relaxed text-muted">{about.learning}</p>
          </AboutCard>
          <AboutCard label="Toolbox">
            <Toolbox />
          </AboutCard>
          <AboutCard label="Looking for">
            <p className="leading-relaxed text-muted">{about.lookingFor}</p>
            <div className="mt-4">
              <ChipList items={about.languages} label="Languages" />
            </div>
          </AboutCard>
        </div>
      </div>

      <div className="mt-16 lg:mt-20">
        <Belief />
      </div>

      <div className="mt-12 border-t border-line pt-6">
        <TerminalLine text={about.closingLink.label} href={about.closingLink.href} />
      </div>
    </Section>
  );
}

export default About;
