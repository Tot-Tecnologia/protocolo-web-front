import { LIST_DOCUMENTOS_FILTER_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/consultarDocumento/")({
  loader: () => {
    redirect({
      to: LIST_DOCUMENTOS_FILTER_ROUTE_URL,
      throw: true,
      replace: true,
    });
  },
});
