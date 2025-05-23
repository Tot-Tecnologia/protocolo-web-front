import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer, Zoom } from "react-toastify";
import { queryClient } from "@/presentation/queryClient";
import { router } from "@/presentation/router";
import "@/presentation/main/theme.css";
import { setupZodErrorMessageTranslation } from "@/presentation/config/zod";

setupZodErrorMessageTranslation();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        transition={Zoom}
        position="top-center"
        autoClose={8000}
      />
      {/* <TanStackRouterDevtools router={router} /> */}
      {/* <ReactQueryDevtools client={queryClient} /> */}
    </QueryClientProvider>
  </StrictMode>,
);
