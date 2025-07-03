import { RemoteLoadProtocoloDetails } from "@/data/usecases/loadProtocoloDetails/remoteLoadProtocoloDetails";
import { makeAuthorizeHttpClientDecorator } from "@/presentation/main/factories/decorators/authorizeHttpClientDecoratorFacoty";

export function makeLoadProtocoloDetails() {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  const fullUrl = baseUrl + "/portal-cidadao/protocolos";
  return new RemoteLoadProtocoloDetails(
    fullUrl,
    makeAuthorizeHttpClientDecorator(),
  );
}
