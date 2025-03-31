import { createFileRoute } from "@tanstack/react-router";
import { LIST_DOCUMENTOS_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { ListDocumentos } from "@/presentation/views/ListDocumentos";

export const Route = createFileRoute(LIST_DOCUMENTOS_ROUTE_URL)({
  component: ListDocumentos,
});
