import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  SIGN_IN_CIDADAO_ROUTE_URL,
  SIGN_IN_SERVIDOR_ROUTE_URL,
} from "@/presentation/constants/routesUrl";
import { UserType } from "@/domain/models";

export const Route = createFileRoute("/login/")({
  loader: ({ context }) => {
    redirect({
      to:
        context.lastUserType === UserType.SERVIDOR
          ? SIGN_IN_SERVIDOR_ROUTE_URL
          : SIGN_IN_CIDADAO_ROUTE_URL,
      throw: true,
      replace: true,
    });
  },
});
