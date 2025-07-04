import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ToastContainer, Zoom } from "react-toastify";
import { queryClient } from "@/presentation/queryClient";
import { AuthContextProvider } from "@/presentation/constants/AuthContext/common/components/AuthContextProvider";
import { setupZodErrorMessageTranslation } from "@/presentation/config/zod";
import { AppRouter } from "@/presentation/components/AppRouter";
import { makeAuthentication } from "@/presentation/main/factories/usecases/authentication";
import { makeLoadUserDetail } from "@/presentation/main/factories/usecases/loadUserDetailFactory";
import { makeUiNotification } from "@/presentation/main/factories/usecases/uiNotificationFactory";
import "@/presentation/main/theme.css";

setupZodErrorMessageTranslation();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider
        authentication={makeAuthentication()}
        loadUserDetail={makeLoadUserDetail()}
        uiNotification={makeUiNotification()}
      >
        <AppRouter />
      </AuthContextProvider>

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
