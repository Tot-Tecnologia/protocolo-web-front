import { createFileRoute } from "@tanstack/react-router";
import { RECOVER_PASSWORD_ROUTE_URL } from "../constants/routesUrl";

export const Route = createFileRoute(RECOVER_PASSWORD_ROUTE_URL)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Recuperar senha.</div>;
}
