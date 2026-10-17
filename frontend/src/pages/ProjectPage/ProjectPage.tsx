import { useParams } from "react-router";
import { projects } from "@/data/projects";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProjectPanel from "./components/ProjectPanel";

// /projects/:slug. Finds the project in the data and renders its panel.
// Every project uses this same page; only the data changes.
function ProjectPage() {
  const { slug } = useParams();
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) return <NotFoundPage />;

  return (
    <main className="mx-auto w-full max-w-page px-4 pt-4 pb-24 sm:px-6 lg:px-8 lg:pt-6">
      {/* key: if you go from one project straight to another, the panel starts fresh
          (first screenshot, focus on the new title) instead of keeping the old state */}
      <ProjectPanel key={projects[index].slug} project={projects[index]} number={index + 1} />
    </main>
  );
}

export default ProjectPage;
