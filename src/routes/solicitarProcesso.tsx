import { createFileRoute } from "@tanstack/react-router";
import { CREATE_PROCESSO_ROUTE_URL } from "@/constants/routesUrl";
import { CreateProcesso } from "@/views/CreateProcesso";

export const Route = createFileRoute(CREATE_PROCESSO_ROUTE_URL)({
  component: CreateProcesso,
});
