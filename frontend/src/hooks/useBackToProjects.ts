import { useNavigate } from "react-router";

// What the project page's X does. Two cases:
//
// 1. The visitor came from the portfolio (the usual case): step back in history.
//    That's exactly the browser's Back button, so the router restores the old scroll
//    position and they land on the card they clicked.
// 2. They opened the project link directly (someone shared it): there is nothing on
//    this site to go back to, and history.back() would leave the site. So instead,
//    open the portfolio at the projects section.
//
// How we tell them apart: the router keeps a position counter in history.state.idx.
// It's 0 on the first page of the visit, goes up by 1 with every new page, and stays the
// same on a "replace" (like switching deep-dive sections, which rewrites ?section= in place).
// So idx > 0 means "there's a page of this site behind us".
//
// (Not location.key: a replace gives the page a new key, so after switching sections on a
// directly opened link, the key would wrongly say "came from this site".)
export function useBackToProjects() {
  const navigate = useNavigate();

  return () => {
    const position = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if (position > 0) navigate(-1);
    else navigate("/#projects");
  };
}
