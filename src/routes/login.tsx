import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@/views/SignIn";
import { SIGN_IN_ROUTE_URL } from "@/constants/routesUrl";

export const Route = createFileRoute(SIGN_IN_ROUTE_URL)({
  component: SignIn,
});
