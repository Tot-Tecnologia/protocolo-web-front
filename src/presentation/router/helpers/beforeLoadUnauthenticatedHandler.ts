import { redirect } from "@tanstack/react-router";
import { SIGN_IN_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { RouterContextValues } from "@/presentation/router/routes/__root";

type BeforeLoadUnauthenticatedHandlerArgs = {
  context: RouterContextValues;
};

export function beforeLoadUnauthenticatedHandler({
  context,
}: BeforeLoadUnauthenticatedHandlerArgs) {
  if (!context.isAuthenticated) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({ to: SIGN_IN_ROUTE_URL });
  }
}
