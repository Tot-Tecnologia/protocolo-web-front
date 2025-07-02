import { createFileRoute } from "@tanstack/react-router";
import { RECOVER_PASSWORD_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { makeRecoverPassword } from "@/presentation/main/factories/views/recoverPasswordFactory";

export const Route = createFileRoute(RECOVER_PASSWORD_ROUTE_URL)({
  component: makeRecoverPassword,
});
