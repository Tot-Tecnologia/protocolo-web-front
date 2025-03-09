import { createFileRoute } from "@tanstack/react-router";
import { SIGN_UP_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { SignUp } from "@/presentation/views/SignUp";

export const Route = createFileRoute(SIGN_UP_ROUTE_URL)({
  component: SignUp,
});
