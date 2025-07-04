import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/presentation/router";
import { useAuthContext } from "@/presentation/constants/AuthContext/common/hooks/useAuthContext";
import { UserType } from "@/domain/models";
import {
  CREATE_PROTOCOLO_ROUTE_URL,
  LIST_PROTOCOLOS_ROUTE_URL,
} from "@/presentation/constants/routesUrl";
import { useEffect } from "react";

export function AppRouter() {
  const { firebaseUser, protocoloWebUser, isAuthenticated, loading } =
    useAuthContext();

  useEffect(() => {
    if (!loading && isAuthenticated && protocoloWebUser?.tipoUsuario) {
      const route =
        protocoloWebUser.tipoUsuario === UserType.CIDADAO
          ? CREATE_PROTOCOLO_ROUTE_URL
          : LIST_PROTOCOLOS_ROUTE_URL;

      void router.navigate({ to: route });
    }
  }, [protocoloWebUser?.tipoUsuario, loading, isAuthenticated]);

  if (loading) {
    // TODO: criar componente de loading bacana
    return "Carregando...";
  }

  return (
    <RouterProvider
      router={router}
      context={{ firebaseUser, protocoloWebUser, isAuthenticated }}
    />
  );
}
