import {
  DatabaseIcon,
  FlagIcon,
  LayersIcon,
  LightbulbIcon,
  LockIcon,
  RotateIcon,
} from "@/components/ui/icons";
import type { CaseStudy } from "@/data/caseStudies/types";

// The id of the whole deep-dive box: "Explore the technical details" scrolls here.
export const CASE_STUDY_ID = "technical-details";

export type CaseStudySectionInfo = {
  id: string; // the section's anchor, also its sidebar link target
  label: string;
  Icon: typeof LayersIcon;
  ready: boolean; // false = shown in the sidebar as "soon", not clickable
};

// Every section of the deep dive, in reading order.
// A section is "ready" once the project's data has content for it, so the sidebar
// updates by itself as sections get built: no list to keep in sync by hand.
export function getCaseStudySections(caseStudy: CaseStudy): CaseStudySectionInfo[] {
  return [
    { id: "architecture", label: "Architecture", Icon: LayersIcon, ready: !!caseStudy.architecture },
    { id: "database", label: "Database", Icon: DatabaseIcon, ready: !!caseStudy.database },
    { id: "authentication", label: "Authentication", Icon: LockIcon, ready: !!caseStudy.authentication },
    { id: "key-decisions", label: "Key decisions", Icon: LightbulbIcon, ready: !!caseStudy.keyDecisions },
    { id: "challenges", label: "Challenges", Icon: FlagIcon, ready: false },
    { id: "what-id-do-differently", label: "What I’d do differently", Icon: RotateIcon, ready: false },
  ];
}
