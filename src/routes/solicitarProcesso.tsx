import { createFileRoute } from "@tanstack/react-router";
import { CREATE_SOLICITATION_ROUTE_URL } from "@/constants/routesUrl";
import { CreateSolicitation } from "@/views/CreateSolicitation";

export const Route = createFileRoute(CREATE_SOLICITATION_ROUTE_URL)({
  component: CreateSolicitation,
});
