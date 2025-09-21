import React from "react";
import { createRoot } from "react-dom/client";
import Index from "./pages/Index";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./global.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);