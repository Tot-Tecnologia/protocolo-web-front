import { DETAILS_PROTOCOLO_SERVIDOR_ROUTE_URL } from '@/presentation/constants/routesUrl';
import { makeDetailsProtocoloServidor } from '@/presentation/main/factories/views/detailsProtocoloServidorFactory';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(DETAILS_PROTOCOLO_SERVIDOR_ROUTE_URL)({
    component: makeDetailsProtocoloServidor,
});
