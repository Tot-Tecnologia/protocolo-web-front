import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/presentation/router";
import { useAuthContext } from "@/presentation/constants/AuthContext/common/hooks/useAuthContext";
import { useLastUserType } from "@/presentation/hooks/useLastUserType";

export function AppRouter() {
  const { firebaseUser, protocoloWebUser, isAuthenticated } = useAuthContext();

  const [lastUserType] = useLastUserType();

  return (
    <RouterProvider
      router={router}
      context={{
        firebaseUser,
        protocoloWebUser,
        isAuthenticated,
        lastUserType,
      }}
    />
  );
}
