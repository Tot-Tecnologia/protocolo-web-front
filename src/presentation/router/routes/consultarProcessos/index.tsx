import { LIST_PROCESSOS_FILTER_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/consultarProcessos/")({
  loader: () => {
    redirect({
      to: LIST_PROCESSOS_FILTER_ROUTE_URL,
      throw: true,
      replace: true,
    });
  },
});
