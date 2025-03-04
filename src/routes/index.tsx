import { createFileRoute, redirect } from "@tanstack/react-router";
import { SIGN_IN_ROUTE_URL } from "@/constants/routesUrl";

export const Route = createFileRoute("/")({
  loader: () => {
    redirect({
      to: SIGN_IN_ROUTE_URL,
      throw: true,
      replace: true,
    });
  },
});
