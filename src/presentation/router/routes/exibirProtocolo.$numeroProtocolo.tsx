import { createFileRoute } from "@tanstack/react-router";
import { DETAILS_PROTOCOLO_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { DetailsProtocolo } from "@/presentation/views/DetailsProtocolo";

export const Route = createFileRoute(DETAILS_PROTOCOLO_ROUTE_URL)({
  component: DetailsProtocolo,
});
