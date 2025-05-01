import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { LIST_PROTOCOLOS_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { ListProtocolos } from "@/presentation/views/ListProtocolos";
import { listProtocolosFilterValidationSchema } from "@/presentation/views/ListProtocolos/common/validations/listProtocolosFilterValidationSchema";

export const Route = createFileRoute(LIST_PROTOCOLOS_ROUTE_URL)({
  component: ListProtocolos,
  validateSearch: zodValidator(listProtocolosFilterValidationSchema),
});
