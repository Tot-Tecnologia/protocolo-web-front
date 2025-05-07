import { createFileRoute } from "@tanstack/react-router";
import { CREATE_PROTOCOLO_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { makeCreateProtocolo } from "@/presentation/main/factories/views/createProtocoloFactory";

export const Route = createFileRoute(CREATE_PROTOCOLO_ROUTE_URL)({
  component: makeCreateProtocolo,
});
