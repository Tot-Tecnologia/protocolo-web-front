import { RouterProvider, createRouter } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "@/presentation/router/generated/routeTree.gen";
import "@/presentation/main/theme.css";

export const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <TanStackRouterDevtools router={router} /> */}
  </StrictMode>,
);
