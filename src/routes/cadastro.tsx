import { createFileRoute } from "@tanstack/react-router";
import { SIGN_UP_ROUTE_URL } from "@/constants/routesUrl";
import { SignUp } from "@/views/SignUp";

export const Route = createFileRoute(SIGN_UP_ROUTE_URL)({
  component: SignUp,
});
