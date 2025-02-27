import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "../views/SignUp";
import { SIGN_UP_ROUTE_URL } from "../constants/routesUrl";

export const Route = createFileRoute(SIGN_UP_ROUTE_URL)({
  component: SignUp,
});
