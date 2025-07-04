import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  CREATE_PROTOCOLO_ROUTE_URL,
  LIST_PROTOCOLOS_ROUTE_URL,
  SIGN_IN_ROUTE_URL,
} from "@/presentation/constants/routesUrl";
import { UserType } from "@/domain/models";

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    if (!context.isAuthenticated) {
      redirect({
        to: SIGN_IN_ROUTE_URL,
        throw: true,
        replace: true,
      });
      return;
    }

    const route =
      context.protocoloWebUser?.tipoUsuario === UserType.CIDADAO
        ? CREATE_PROTOCOLO_ROUTE_URL
        : LIST_PROTOCOLOS_ROUTE_URL;

    redirect({
      to: route,
      throw: true,
      replace: true,
    });
  },
});
