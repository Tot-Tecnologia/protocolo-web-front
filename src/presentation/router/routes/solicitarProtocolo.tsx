import { createFileRoute } from "@tanstack/react-router";
import { makeCreateProtocolo } from "@/presentation/main/factories/views/createProtocoloFactory";
import { CREATE_PROTOCOLO_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { beforeLoadUnauthenticatedHandler } from "@/presentation/router/helpers/beforeLoadUnauthenticatedHandler";

export const Route = createFileRoute(CREATE_PROTOCOLO_ROUTE_URL)({
  component: makeCreateProtocolo,
  beforeLoad: beforeLoadUnauthenticatedHandler,
});
