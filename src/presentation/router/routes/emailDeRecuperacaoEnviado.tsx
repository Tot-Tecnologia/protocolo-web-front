import { createFileRoute } from "@tanstack/react-router";
import { RECOVER_PASSWORD_MESSAGE_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { RecoverPasswordMessage } from "@/presentation/views/RecoverPasswordMessage";

export const Route = createFileRoute(RECOVER_PASSWORD_MESSAGE_ROUTE_URL)({
  component: RecoverPasswordMessage,
});
