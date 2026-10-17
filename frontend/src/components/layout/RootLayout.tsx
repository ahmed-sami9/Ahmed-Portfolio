import { Outlet, ScrollRestoration } from "react-router";
import Background from "./Background";
import InstantPageScroll from "./InstantPageScroll";
import Navbar from "./Navbar";

// The frame every page shares: background, navbar, then the current page (<Outlet />).
//
// <ScrollRestoration /> is what makes "back" feel right:
//   - opening a new page starts it at the top
//   - going back (browser Back, or the project page's X) returns to the exact spot you left,
//     so you land on the project card you clicked
//   - a link with a hash (/#projects) scrolls to that section
// InstantPageScroll must come BEFORE it: see that file for why.
function RootLayout() {
  return (
    <>
      <Background />
      <Navbar />
      <Outlet />
      <InstantPageScroll />
      <ScrollRestoration />
    </>
  );
}

export default RootLayout;
