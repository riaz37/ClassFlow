import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "@/pages/routes/router.tsx";
import { AuthProvider } from "@/hooks/AuthProvider";
import { ThemeProvider } from "@/components/provider/theme";

import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <StrictMode>
      <HelmetProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthProvider>
      </HelmetProvider>
    </StrictMode>
  </ThemeProvider>,
);
