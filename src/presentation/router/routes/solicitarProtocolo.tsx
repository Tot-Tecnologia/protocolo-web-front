import { createFileRoute } from "@tanstack/react-router";
import { CREATE_PROTOCOLO_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { CreateProtocolo } from "@/presentation/views/CreateProtocolo";

export const Route = createFileRoute(CREATE_PROTOCOLO_ROUTE_URL)({
  component: CreateProtocolo,
});
