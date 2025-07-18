import { redirect } from "@tanstack/react-router";
import {
  SIGN_IN_CIDADAO_ROUTE_URL,
  SIGN_IN_SERVIDOR_ROUTE_URL,
} from "@/presentation/constants/routesUrl";
import { RouterContextValues } from "@/presentation/router/routes/__root";
import { UserType } from "@/domain/models";

type BeforeLoadUnauthenticatedHandlerArgs = {
  context: RouterContextValues;
};

export function beforeLoadUnauthenticatedHandler({
  context,
}: BeforeLoadUnauthenticatedHandlerArgs) {
  if (!context.isAuthenticated) {
    const route =
      context.lastUserType === UserType.SERVIDOR
        ? SIGN_IN_SERVIDOR_ROUTE_URL
        : SIGN_IN_CIDADAO_ROUTE_URL;

    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({ to: route });
  }
}
