import { LIST_PROCESSOS_ROUTE_URL } from "@/constants/routesUrl";
import { ListProcessos } from "@/views/ListProcessos";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(LIST_PROCESSOS_ROUTE_URL)({
  component: ListProcessos,
});
