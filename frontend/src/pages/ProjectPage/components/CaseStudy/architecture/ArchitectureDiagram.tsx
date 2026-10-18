import { DatabaseIcon, MonitorIcon, ServerIcon } from "@/components/ui/icons";
import type { Architecture } from "@/data/caseStudies/types";
import DiagramBox from "./DiagramBox";
import DiagramLink from "./DiagramLink";

type ArchitectureDiagramProps = {
  diagram: Architecture["diagram"];
};

// Browser -> API -> database, built from HTML (not an image), so it stays sharp, uses the
// site's colors and fonts, is readable by screen readers, and reflows on small screens.
//
// @container: the layout depends on the width THIS diagram gets, not on the screen width.
// That matters here: on a laptop the sidebar takes part of the width, so "the screen is wide"
// doesn't mean "the diagram has room". At 42rem (@2xl) of its own width, the boxes go side by
// side (from lg, 1024px, with the sidebar); below that they stack, top to bottom.
function ArchitectureDiagram({ diagram }: ArchitectureDiagramProps) {
  const { client, clientToApi, api, apiToDatabase, database } = diagram;

  return (
    <figure className="@container rounded-xl border border-line bg-bg/30 p-4 sm:p-5">

      {/* Side by side: every box starts on the same top line (items-start) and keeps its own
          height, so one with less inside is simply shorter. The API, which has the most inside,
          gets the most width. */}
      <div className="flex flex-col @2xl:flex-row @2xl:items-start">
        <DiagramBox box={client} Icon={MonitorIcon} className="@2xl:flex-[1]" />
        <DiagramLink link={clientToApi} />
        <DiagramBox box={api} Icon={ServerIcon} highlight className="@2xl:flex-[1.45]" />
        <DiagramLink link={apiToDatabase} />
        <DiagramBox box={database} Icon={DatabaseIcon} className="@2xl:flex-[0.95]" />
      </div>
    </figure>
  );
}

export default ArchitectureDiagram;
