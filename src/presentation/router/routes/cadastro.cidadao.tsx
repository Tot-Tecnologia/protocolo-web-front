import { createFileRoute } from "@tanstack/react-router";
import { SIGN_UP_CIDADAO_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { makeSignUp } from "@/presentation/main/factories/views/signUpFactory";

export const Route = createFileRoute(SIGN_UP_CIDADAO_ROUTE_URL)({
  component: makeSignUp,
});
