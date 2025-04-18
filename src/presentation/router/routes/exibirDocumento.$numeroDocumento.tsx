import { createFileRoute } from "@tanstack/react-router";
import { DETAILS_DOCUMENTO_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { DetailsDocumento } from "@/presentation/views/DetailsDocumento";

export const Route = createFileRoute(DETAILS_DOCUMENTO_ROUTE_URL)({
  component: DetailsDocumento,
});
