import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/layout/RootLayout";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import PortfolioPage from "./pages/PortfolioPage/PortfolioPage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";

// The site's URLs. Every page renders inside RootLayout (background + navbar).
//   /                -> the portfolio (one long page of sections)
//   /projects/diraya -> one project's page
//   anything else    -> 404
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <PortfolioPage /> },
      { path: "projects/:slug", element: <ProjectPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
