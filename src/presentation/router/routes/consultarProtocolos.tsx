import { createFileRoute } from "@tanstack/react-router";
import { LIST_PROTOCOLOS_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { ListProtocolos } from "@/presentation/views/ListProtocolos";

export const Route = createFileRoute(LIST_PROTOCOLOS_ROUTE_URL)({
  component: ListProtocolos,
});
