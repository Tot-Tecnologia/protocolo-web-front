import { createFileRoute } from "@tanstack/react-router";
import { CREATE_DOCUMENTO_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { CreateDocumento } from "@/presentation/views/CreateDocumento";

export const Route = createFileRoute(CREATE_DOCUMENTO_ROUTE_URL)({
  component: CreateDocumento,
});
