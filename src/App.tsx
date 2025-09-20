import React from "react";
import { createRoot } from "react-dom/client";
import Index from "./pages/Index";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./global.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Index />
    </ThemeProvider>
  </React.StrictMode>
);