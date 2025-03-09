import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@/presentation/views/SignIn";
import { SIGN_IN_ROUTE_URL } from "@/presentation/constants/routesUrl";

export const Route = createFileRoute(SIGN_IN_ROUTE_URL)({
  component: SignIn,
});
