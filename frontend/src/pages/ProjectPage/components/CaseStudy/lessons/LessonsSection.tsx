import type { Lessons } from "@/data/caseStudies/types";
import CaseStudySection from "../CaseStudySection";
import LessonCard from "./LessonCard";

type LessonsSectionProps = {
  lessons: Lessons;
  number: number;
  repoUrl?: string;
};

// "What did you get wrong, and what did it teach you?": a few honest stories, each complete
// on its own. It's the counterweight to Key decisions: there, choices that worked; here, the
// ones I had to fix, which is what makes the rest believable.
function LessonsSection({ lessons, number, repoUrl }: LessonsSectionProps) {
  const { summary, items } = lessons;

  return (
    <CaseStudySection id="lessons" number={number} title="Challenges & lessons" summary={summary}>
      <div className="space-y-6">
        {items.map((lesson) => (
          <LessonCard key={lesson.title} lesson={lesson} repoUrl={repoUrl} />
        ))}
      </div>
    </CaseStudySection>
  );
}

export default LessonsSection;
