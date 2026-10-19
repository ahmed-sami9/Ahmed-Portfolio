import { useSearchParams } from "react-router";
import type { CaseStudySectionInfo } from "./caseStudySections";

// Which deep-dive section is open, kept in the URL: /projects/diraya?section=database
//
// Why the URL and not useState:
//   - a refresh keeps you on the section you were reading
//   - a link can open a section directly ("look at the database part")
//
// Why `replace` + `preventScrollReset` when switching:
//   - replace: switching sections rewrites the current history entry instead of adding one,
//     so the browser's Back still means "close the project", not "previous section"
//   - preventScrollReset: any URL change normally makes the router scroll to the top of the
//     page (ScrollRestoration); a section switch must not do that
//
// An unknown or not-yet-built ?section= falls back to the first ready section.
export function useCaseStudyTab(sections: CaseStudySectionInfo[]) {
  const [params, setParams] = useSearchParams();
  const readyIds = sections.filter((section) => section.ready).map((section) => section.id);

  const requested = params.get("section");
  const activeId = requested && readyIds.includes(requested) ? requested : readyIds[0];

  const select = (id: string) => {
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        next.set("section", id);
        return next;
      },
      { replace: true, preventScrollReset: true },
    );
  };

  return { activeId, readyIds, select };
}
