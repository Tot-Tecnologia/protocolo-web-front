import { createFileRoute } from "@tanstack/react-router";
import { DETAILS_PROTOCOLO_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { makeDetailsProtocolo } from "@/presentation/main/factories/views/detailsProtocoloFactory";

export const Route = createFileRoute(DETAILS_PROTOCOLO_ROUTE_URL)({
  component: makeDetailsProtocolo,
});
