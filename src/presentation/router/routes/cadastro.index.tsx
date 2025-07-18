import { createFileRoute, redirect } from "@tanstack/react-router";
import { SIGN_UP_CIDADAO_ROUTE_URL } from "@/presentation/constants/routesUrl";

export const Route = createFileRoute("/cadastro/")({
  loader: () => {
    redirect({
      to: SIGN_UP_CIDADAO_ROUTE_URL,
      throw: true,
      replace: true,
    });
  },
});
