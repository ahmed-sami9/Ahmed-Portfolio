import { CloseIcon } from "@/components/ui/icons";
import { useBackToProjects } from "@/hooks/useBackToProjects";

// The X in the panel's corner. It closes the project and returns you to the card you
// clicked (useBackToProjects explains how). It's a button, not a link, because what it
// does depends on where you came from.
function CloseButton() {
  const backToProjects = useBackToProjects();

  return (
    <button
      type="button"
      onClick={backToProjects}
      aria-label="Close project and go back to all projects"
      title="Back to projects"
      className="-mr-2 grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-text/5 hover:text-text"
    >
      <CloseIcon className="size-5" />
    </button>
  );
}

export default CloseButton;
