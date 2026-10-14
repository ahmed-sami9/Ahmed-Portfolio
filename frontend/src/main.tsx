import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Only the weights the design actually uses. Each import is a font file the visitor downloads.
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/jetbrains-mono/400.css";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
