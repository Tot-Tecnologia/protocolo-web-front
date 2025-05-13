import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { LIST_PROTOCOLOS_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { listProtocolosFilterValidationSchema } from "@/presentation/views/ListProtocolos/common/validations/listProtocolosFilterValidationSchema";
import { makeListProtocolos } from "@/presentation/main/factories/views/listProtocolosFactory";

export const Route = createFileRoute(LIST_PROTOCOLOS_ROUTE_URL)({
  component: makeListProtocolos,
  validateSearch: zodValidator(listProtocolosFilterValidationSchema),
});
