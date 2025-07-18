import { createFileRoute } from "@tanstack/react-router";
import { SIGN_IN_CIDADAO_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { makeSignIn } from "@/presentation/main/factories/views/signInFactory";

export const Route = createFileRoute(SIGN_IN_CIDADAO_ROUTE_URL)({
  component: makeSignIn,
});
