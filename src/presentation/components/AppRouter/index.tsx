import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/presentation/router";
import { useAuthContext } from "@/presentation/constants/AuthContext/common/hooks/useAuthContext";

export function AppRouter() {
  const { firebaseUser, protocoloWebUser, isAuthenticated } = useAuthContext();

  return (
    <RouterProvider
      router={router}
      context={{ firebaseUser, protocoloWebUser, isAuthenticated }}
    />
  );
}
