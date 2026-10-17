import { useLocation, useNavigate } from "react-router";

// What the project page's X does. Two cases:
//
// 1. The visitor came from the portfolio (the usual case): step back in history.
//    That's exactly the browser's Back button, so the router restores the old scroll
//    position and they land on the card they clicked.
// 2. They opened the project link directly (someone shared it): there is nothing on
//    this site to go back to, and history.back() would leave the site. So instead,
//    open the portfolio at the projects section.
//
// How we tell them apart: the router gives the very first page of a visit the key "default".
export function useBackToProjects() {
  const navigate = useNavigate();
  const location = useLocation();
  const cameFromThisSite = location.key !== "default";

  return () => {
    if (cameFromThisSite) navigate(-1);
    else navigate("/#projects");
  };
}
