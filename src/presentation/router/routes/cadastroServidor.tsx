import { SIGN_UP_SERVIDOR_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { makeServidorSignUp } from "@/presentation/main/factories/views/signUpFactory";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(SIGN_UP_SERVIDOR_ROUTE_URL)({
    component: makeServidorSignUp
})