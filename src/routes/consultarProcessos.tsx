import { LIST_SOLICITATIONS_ROUTE_URL } from "@/constants/routesUrl";
import { ListSolicitations } from "@/views/ListSolicitations";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(LIST_SOLICITATIONS_ROUTE_URL)({
  component: ListSolicitations,
});
