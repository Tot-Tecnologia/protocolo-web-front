import { LIST_USUARIOS_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { ListUsuarios } from "@/presentation/views/ListUsuarios";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(LIST_USUARIOS_ROUTE_URL)({
  component: ListUsuarios,
});
